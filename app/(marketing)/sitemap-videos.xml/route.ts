// app/(marketing)/sitemap-videos.xml/route.ts
//
// Google Video Sitemap for JaeTravel Expeditions.
//
// Public video architecture:
//
//   YouTube / Instagram
//          ↓
//      Payload CMS
//          ↓
//   /watch/[slug]
//          ↓
//   VideoObject JSON-LD
//          ↓
//   sitemap-videos.xml
//
// IMPORTANT:
// - Only published videos are included.
// - No Payload admin/CMS URLs are included.
// - No fake /videos/*.mp4 URLs are generated.
// - YouTube and Instagram remain the actual video hosts.
// - /watch/[slug] is the public JaeTravel watch page.
// - No geographic restriction is applied.
// - A temporary CMS failure returns a valid HTTP 500 rather than
//   pretending that there are zero videos.
// - An actually empty published video collection returns valid XML
//   rather than a 404 sitemap.

import { getPayload } from 'payload'
import config from '@payload-config'

import type { PublicVideo } from '@/lib/videos'

export const revalidate = 3600

const BASE = 'https://www.jaetravel.co.ke'

const PAGE_SIZE = 100

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Convert a YouTube duration in seconds to ISO 8601.
 */
function durationToIso(
  seconds: number | null | undefined,
): string | null {
  if (
    typeof seconds !== 'number' ||
    !Number.isFinite(seconds) ||
    seconds <= 0
  ) {
    return null
  }

  const total = Math.floor(seconds)

  const hours = Math.floor(total / 3600)

  const minutes = Math.floor(
    (total % 3600) / 60,
  )

  const remainingSeconds =
    total % 60

  let value = 'PT'

  if (hours > 0) {
    value += `${hours}H`
  }

  if (minutes > 0) {
    value += `${minutes}M`
  }

  if (
    remainingSeconds > 0 ||
    (hours === 0 && minutes === 0)
  ) {
    value += `${remainingSeconds}S`
  }

  return value
}

/**
 * YouTube privacy-enhanced player.
 */
function youtubeEmbedUrl(
  externalId: string,
): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    externalId,
  )}`
}

/**
 * Convert an Instagram permalink to the public embed URL.
 *
 * Supports:
 *   /reel/ID/
 *   /reels/ID/
 *   /p/ID/
 */
function instagramEmbedUrl(
  url: string,
): string | null {
  try {
    const parsed = new URL(url)

    const match =
      parsed.pathname.match(
        /^\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)\/?$/,
      )

    if (!match) {
      return null
    }

    return `https://www.instagram.com/p/${match[1]}/embed/`
  } catch {
    return null
  }
}

/**
 * Validate the minimum information required for a video
 * sitemap entry.
 */
function isValidVideo(
  video: PublicVideo,
): boolean {
  if (!video.slug) {
    return false
  }

  if (!video.thumbnailUrl) {
    return false
  }

  if (!video.title) {
    return false
  }

  if (!video.publishedAt) {
    return false
  }

  if (
    video.provider === 'youtube' &&
    !video.externalId
  ) {
    return false
  }

  if (
    video.provider === 'instagram' &&
    !video.url
  ) {
    return false
  }

  return true
}

/**
 * Build one <video:video> entry.
 */
function buildVideoEntry(
  video: PublicVideo,
): string | null {
  if (!isValidVideo(video)) {
    console.warn(
      `[sitemap-videos] Skipping invalid video: ${video.slug}`,
    )

    return null
  }

  const pageUrl =
    `${BASE}/watch/${encodeURIComponent(video.slug)}`

  const title =
    video.title?.trim() ||
    'JaeTravel Expeditions Video'

  const description =
    video.description?.trim() ||
    `Watch ${title} on JaeTravel Expeditions.`

  const thumbnail =
    video.thumbnailUrl!.trim()

  let playerLoc: string | null = null

  if (
    video.provider === 'youtube' &&
    video.externalId
  ) {
    playerLoc =
      youtubeEmbedUrl(video.externalId)
  }

  if (
    video.provider === 'instagram' &&
    video.url
  ) {
    playerLoc =
      instagramEmbedUrl(video.url)
  }

  if (!playerLoc) {
    console.warn(
      `[sitemap-videos] No player URL for ${video.slug}`,
    )

    return null
  }

  const publicationDate =
    new Date(video.publishedAt!)

  if (
    Number.isNaN(
      publicationDate.getTime(),
    )
  ) {
    console.warn(
      `[sitemap-videos] Invalid publication date for ${video.slug}`,
    )

    return null
  }

  const duration =
    video.provider === 'youtube'
      ? durationToIso(video.durationSeconds)
      : null

  const lines: string[] = []

  lines.push(
    `      <video:thumbnail_loc>${escapeXml(
      thumbnail,
    )}</video:thumbnail_loc>`,
  )

  lines.push(
    `      <video:title>${escapeXml(
      title,
    )}</video:title>`,
  )

  lines.push(
    `      <video:description>${escapeXml(
      description.slice(0, 2048),
    )}</video:description>`,
  )

  lines.push(
    `      <video:player_loc allow_embed="yes">${escapeXml(
      playerLoc,
    )}</video:player_loc>`,
  )

  if (duration) {
    lines.push(
      `      <video:duration>${duration}</video:duration>`,
    )
  }

  lines.push(
    `      <video:publication_date>${publicationDate.toISOString()}</video:publication_date>`,
  )

  lines.push(
    `      <video:family_friendly>yes</video:family_friendly>`,
  )

  return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <video:video>
${lines.join('\n')}
    </video:video>
  </url>`
}

/**
 * Fetch published videos directly.
 *
 * This intentionally does NOT use getAllVideos() because that helper
 * catches errors and returns [], which could make a database failure
 * look like a legitimate empty sitemap.
 */
async function fetchPublishedVideos(): Promise<PublicVideo[]> {
  const payload = await getPayload({
    config,
  })

  const videos: PublicVideo[] = []

  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'videos',

      where: {
        _status: {
          equals: 'published',
        },
      },

      page,

      limit: PAGE_SIZE,

      depth: 0,

      overrideAccess: true,

      sort: '-publishedAt',
    })

    for (const doc of result.docs) {
      const raw =
        doc as unknown as Record<string, unknown>

      const slug =
        typeof raw.slug === 'string'
          ? raw.slug.trim()
          : ''

      if (!slug) {
        continue
      }

      const provider =
        typeof raw.provider === 'string'
          ? raw.provider
          : 'youtube'

      const externalId =
        typeof raw.externalId === 'string'
          ? raw.externalId.trim()
          : ''

      const url =
        typeof raw.url === 'string'
          ? raw.url.trim()
          : ''

      const title =
        typeof raw.title === 'string'
          ? raw.title.trim()
          : null

      const description =
        typeof raw.description === 'string'
          ? raw.description.trim()
          : null

      const thumbnailUrl =
        typeof raw.thumbnailUrl === 'string'
          ? raw.thumbnailUrl.trim()
          : null

      const publishedAt =
        typeof raw.publishedAt === 'string'
          ? raw.publishedAt
          : null

      const durationSeconds =
        typeof raw.durationSeconds === 'number'
          ? raw.durationSeconds
          : null

      const syncedAt =
        typeof raw.syncedAt === 'string'
          ? raw.syncedAt
          : null

      videos.push({
        id:
          (raw.id as number | string | undefined) ??
          '',

        provider:
          provider as PublicVideo['provider'],

        externalId,

        url,

        slug,

        title,

        description,

        thumbnailUrl,

        publishedAt,

        durationSeconds,

        syncedAt,
      })
    }

    if (
      result.hasNextPage !== true ||
      result.nextPage == null
    ) {
      break
    }

    page = result.nextPage
  }

  return videos
}

export async function GET() {
  try {
    const allVideos =
      await fetchPublishedVideos()

    const entries = allVideos
      .map(buildVideoEntry)
      .filter(
        (entry): entry is string =>
          Boolean(entry),
      )

    console.log(
      `[sitemap-videos] Published videos: ${allVideos.length}; valid entries: ${entries.length}`,
    )

    /**
     * IMPORTANT:
     * An empty sitemap is still valid XML.
     *
     * Do NOT return 404 here.
     *
     * The sitemap index controls whether this sitemap is linked.
     */
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n')}
</urlset>`

    return new Response(body, {
      status: 200,

      headers: {
        'Content-Type':
          'application/xml; charset=utf-8',

        'Cache-Control':
          'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error(
      '[sitemap-videos] Failed to generate sitemap:',
      error,
    )

    /**
     * A CMS/database failure is a server error, not
     * an empty sitemap.
     */
    return new Response(
      'Unable to generate video sitemap',
      {
        status: 500,

        headers: {
          'Content-Type':
            'text/plain; charset=utf-8',

          'Cache-Control':
            'no-store',
        },
      },
    )
  }
}