// lib/instagram.ts
//
// Thin client for the Instagram Graph API. Used to:
//   1) pull the metadata of a single Reel/media by id (Videos beforeChange hook), and
//   2) iterate every media item on the connected Business account
//      (the admin "Sync from Instagram" route).
//
// Setup
// -----
// Requires a Facebook App with Instagram Graph API product enabled, an
// Instagram Business or Creator account connected to a Facebook Page, and a
// long-lived access token with `instagram_basic` + (for Reels) `instagram_manage_insights`.
// See https://developers.facebook.com/docs/instagram-api/getting-started.
//
// The Graph API returns 25 items per page for /me/media with a `paging.cursors.after`
// token. Reels surface as MEDIA_TYPE = "VIDEO" with media_type = "REEL" on the
// newer endpoint. We accept both shapes.

export interface InstagramMediaMeta {
  externalId: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  url: string
  mediaType: 'REEL' | 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM'
}

import { META_GRAPH_VERSION } from './instagram-auth'

const GRAPH = `https://graph.facebook.com/${META_GRAPH_VERSION}`

/** Iterate every media id on the connected IG Business account. */
export async function* listAccountMedia(
  igUserId: string,
  accessToken: string,
  opts: { signal?: AbortSignal } = {},
): AsyncGenerator<string[]> {
  let after: string | undefined
  do {
    const url = new URL(`${GRAPH}/${igUserId}/media`)
    url.searchParams.set(
      'fields',
      'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,username',
    )
    url.searchParams.set('limit', '50')
    url.searchParams.set('access_token', accessToken)
    if (after) url.searchParams.set('after', after)
    const res = await fetch(url.toString(), { cache: 'no-store', signal: opts.signal })
    if (!res.ok) {
      const body = await res.text()
      throw new InstagramError(`IG media list failed: ${res.status} ${body}`, res.status)
    }
    const json = (await res.json()) as {
      data?: Array<{ id: string; media_type?: string }>
      paging?: { cursors?: { after?: string }; next?: string }
    }
    const ids = (json.data ?? [])
      // Reels, regular videos, image posts, carousels. We store all of them; the
      // VideoBlock component knows how to render each.
      .map((it) => it.id)
      .filter(Boolean)
    if (ids.length > 0) yield ids
    after = json.paging?.cursors?.after
  } while (after)
}

/** Fetch one media item's metadata. */
export async function fetchMediaMeta(
  mediaId: string,
  accessToken: string,
): Promise<InstagramMediaMeta> {
  const url = new URL(`${GRAPH}/${mediaId}`)
  url.searchParams.set(
    'fields',
    'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,username',
  )
  url.searchParams.set('access_token', accessToken)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.text()
    throw new InstagramError(`IG media fetch failed: ${res.status} ${body}`, res.status)
  }
  const json = (await res.json()) as {
    id: string
    media_type?: 'REEL' | 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM'
    media_url?: string
    thumbnail_url?: string
    permalink?: string
    caption?: string
    timestamp?: string
  }
  // Reels come through as media_type=VIDEO on /me/media but are tagged REEL on
  // the newer /me/reels endpoint. Fall back to the URL heuristic.
  const mediaType: InstagramMediaMeta['mediaType'] = (() => {
    if (json.media_type === 'REEL' || json.media_type === 'VIDEO' ||
        json.media_type === 'IMAGE' || json.media_type === 'CAROUSEL_ALBUM') {
      return json.media_type
    }
    if (json.permalink?.includes('/reel/') || json.permalink?.includes('/reels/')) {
      return 'REEL'
    }
    return 'IMAGE'
  })()
  return {
    externalId: json.id,
    title: '', // IG has no separate "title" — caption is the only text. Leave blank.
    description: json.caption ?? '',
    thumbnailUrl: json.thumbnail_url ?? json.media_url ?? '',
    publishedAt: json.timestamp ?? new Date().toISOString(),
    url: json.permalink ?? `https://www.instagram.com/p/${json.id}/`,
    mediaType,
  }
}

export class InstagramError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'InstagramError'
    this.status = status
  }
}
