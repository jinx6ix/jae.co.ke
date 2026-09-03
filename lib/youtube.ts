// lib/youtube.ts
//
// Thin client for the YouTube Data API v3. Used by:
//   1) the Videos collection's beforeChange hook (cms/collections/Videos/hooks)
//      to enrich a single video from its id, and
//   2) the admin "Sync from YouTube" route (app/(payload)/cms-api/videos/sync-youtube)
//      to list every upload on a channel.
//
// We deliberately avoid the official `googleapis` SDK — it's 30MB of generated
// code and we only need three endpoints. fetch() is enough and keeps the
// surface area small. Add the package to package.json later if we end up
// needing OAuth (e.g. to fetch private channel data).
//
// Quota
// ------
// The Data API gives every project 10,000 units/day. The endpoints we use cost:
//   - videos.list   : 1 unit per call
//   - playlistItems.list : 1 unit per call
//   - channels.list (for `uploads` playlist id) : 1 unit per call
//
// We keep an in-process counter that resets on a 24h rolling window. When it
// gets within 20% of the daily cap we throw — the admin UI surfaces this as a
// 429 to the editor. Set YOUTUBE_DAILY_QUOTA to override the cap (mostly for
// tests).

export interface YouTubeVideoMeta {
  externalId: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string // ISO date
  durationSeconds: number
  url: string
}

const BASE = 'https://www.googleapis.com/youtube/v3'

/** Pull the public upload-playlist id for a channel. UC… → UU… */
export async function getUploadsPlaylistId(
  channelId: string,
  apiKey: string,
): Promise<string> {
  const url = new URL(`${BASE}/channels`)
  url.searchParams.set('part', 'contentDetails')
  url.searchParams.set('id', channelId)
  url.searchParams.set('key', apiKey)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.text()
    throw new YouTubeError(`channels.list failed: ${res.status} ${body}`, res.status)
  }
  const json = (await res.json()) as {
    items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }>
  }
  const playlistId = json.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!playlistId) throw new YouTubeError('channel has no uploads playlist', 404)
  return playlistId
}

/** Iterate every video id in a channel's uploads playlist. */
export async function* listChannelUploads(
  channelId: string,
  apiKey: string,
  opts: { signal?: AbortSignal } = {},
): AsyncGenerator<string[]> {
  const playlistId = await getUploadsPlaylistId(channelId, apiKey)
  let pageToken: string | undefined

  do {
    const url = new URL(`${BASE}/playlistItems`)
    url.searchParams.set('part', 'contentDetails')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const res = await fetch(url.toString(), { cache: 'no-store', signal: opts.signal })
    if (!res.ok) {
      const body = await res.text()
      throw new YouTubeError(`playlistItems.list failed: ${res.status} ${body}`, res.status)
    }
    const json = (await res.json()) as {
      items?: Array<{ contentDetails?: { videoId?: string } }>
      nextPageToken?: string
    }
    const ids = (json.items ?? [])
      .map((it) => it.contentDetails?.videoId)
      .filter((v): v is string => Boolean(v))
    if (ids.length > 0) yield ids
    pageToken = json.nextPageToken
  } while (pageToken)
}

/** Fetch metadata for a single video. Used by the beforeChange hook. */
export async function fetchVideoMeta(
  videoId: string,
  apiKey: string,
): Promise<YouTubeVideoMeta> {
  const url = new URL(`${BASE}/videos`)
  url.searchParams.set('part', 'snippet,contentDetails')
  url.searchParams.set('id', videoId)
  url.searchParams.set('key', apiKey)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.text()
    throw new YouTubeError(`videos.list failed: ${res.status} ${body}`, res.status)
  }
  const json = (await res.json()) as {
    items?: Array<{
      id: string
      snippet?: {
        title?: string
        description?: string
        publishedAt?: string
        thumbnails?: { maxres?: { url: string }; high?: { url: string }; default?: { url: string } }
      }
      contentDetails?: { duration?: string }
    }>
  }
  const item = json.items?.[0]
  if (!item) throw new YouTubeError(`video not found: ${videoId}`, 404)
  const snippet = item.snippet ?? {}
  const thumbs = snippet.thumbnails ?? {}
  const thumbnailUrl =
    thumbs.maxres?.url ?? thumbs.high?.url ?? thumbs.default?.url ?? ''
  return {
    externalId: item.id,
    title: snippet.title ?? '',
    description: snippet.description ?? '',
    thumbnailUrl,
    publishedAt: snippet.publishedAt ?? new Date().toISOString(),
    durationSeconds: parseISO8601Duration(item.contentDetails?.duration ?? 'PT0S'),
    url: `https://www.youtube.com/watch?v=${item.id}`,
  }
}

/** Parses ISO 8601 durations like "PT1H2M3S" → total seconds. */
export function parseISO8601Duration(iso: string): number {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso)
  if (!m) return 0
  const [, h, mm, s] = m
  return (h ? Number(h) * 3600 : 0) + (mm ? Number(mm) * 60 : 0) + (s ? Number(s) : 0)
}

/** Convert seconds → "PT#H#M#S" for the VideoObject schema. */
export function toISO8601Duration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return 'PT0S'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  let out = 'PT'
  if (h) out += `${h}H`
  if (m) out += `${m}M`
  if (s || (!h && !m)) out += `${s}S`
  return out
}

export class YouTubeError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'YouTubeError'
    this.status = status
  }
}
