// app/(marketing)/sitemap-videos.xml/route.ts

import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const BASE = 'https://www.jaetravel.co.ke'

interface VideoDocument {
  slug?: string | null
  title?: string | null
  description?: string | null
  thumbnailUrl?: string | null
  publishedAt?: string | null

  provider?: 'youtube' | 'instagram' | null
  externalId?: string | null
  externalUrl?: string | null

  duration?: number | null
  durationSeconds?: number | null
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function normalizeUrl(value: string): string {
  return value.trim()
}

function youtubeEmbedUrl(video: VideoDocument): string | null {
  if (video.externalId) {
    return `https://www.youtube.com/embed/${encodeURIComponent(
      video.externalId,
    )}`
  }

  if (video.externalUrl) {
    try {
      const url = new URL(video.externalUrl)

      const host = url.hostname.toLowerCase()

      if (
        host === 'youtube.com' ||
        host === 'www.youtube.com' ||
        host === 'youtu.be' ||
        host === 'www.youtu.be'
      ) {
        let id = ''

        if (host.includes('youtu.be')) {
          id = url.pathname.replace(/^\/+/, '')
        } else {
          id = url.searchParams.get('v') || ''
        }

        if (id) {
          return `https://www.youtube.com/embed/${encodeURIComponent(id)}`
        }
      }
    } catch {
      return null
    }
  }

  return null
}

function instagramEmbedUrl(video: VideoDocument): string | null {
  if (video.externalUrl) {
    try {
      const url = new URL(video.externalUrl)

      const host = url.hostname.toLowerCase()

      if (
        host === 'instagram.com' ||
        host === 'www.instagram.com'
      ) {
        return `${url.origin}${url.pathname}embed`
      }
    } catch {
      return null
    }
  }

  return null
}

function getPlayerUrl(video: VideoDocument): string | null {
  if (video.provider === 'youtube') {
    return youtubeEmbedUrl(video)
  }

  if (video.provider === 'instagram') {
    return instagramEmbedUrl(video)
  }

  return null
}

function durationToIso(duration: unknown): string | null {
  if (typeof duration !== 'number' || !Number.isFinite(duration)) {
    return null
  }

  if (duration <= 0) {
    return null
  }

  const seconds = Math.floor(duration)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result = 'PT'

  if (hours > 0) {
    result += `${hours}H`
  }

  if (minutes > 0) {
    result += `${minutes}M`
  }

  if (remainingSeconds > 0 || result === 'PT') {
    result += `${remainingSeconds}S`
  }

  return result
}

function buildVideoEntry(video: VideoDocument): string | null {
  const slug = video.slug?.trim()
  const title = video.title?.trim()
  const thumbnailUrl = video.thumbnailUrl?.trim()
  const publishedAt = video.publishedAt?.trim()
  const playerUrl = getPlayerUrl(video)

  // A video sitemap entry requires enough information to
  // identify an actual public video.
  if (!slug || !title || !thumbnailUrl || !publishedAt || !playerUrl) {
    return null
  }

  const watchUrl = `${BASE}/watch/${encodeURIComponent(slug)}`

  const description =
    video.description?.trim() ||
    `${title} — JaeTravel Expeditions`

  const duration =
    durationToIso(video.duration) ||
    durationToIso(video.durationSeconds)

  const publicationDate = new Date(publishedAt)

  if (Number.isNaN(publicationDate.getTime())) {
    return null
  }

  const lines = [
    '  <url>',
    `    <loc>${escapeXml(watchUrl)}</loc>`,
    '    <video:video>',
    `      <video:thumbnail_loc>${escapeXml(
      normalizeUrl(thumbnailUrl),
    )}</video:thumbnail_loc>`,
    `      <video:title>${escapeXml(title)}</video:title>`,
    `      <video:description>${escapeXml(description)}</video:description>`,
    `      <video:player_loc>${escapeXml(playerUrl)}</video:player_loc>`,
    `      <video:publication_date>${publicationDate.toISOString()}</video:publication_date>`,
  ]

  if (duration) {
    lines.push(`      <video:duration>${duration}</video:duration>`)
  }

  lines.push(
    '      <video:family_friendly>yes</video:family_friendly>',
    '    </video:video>',
    '  </url>',
  )

  return lines.join('\n')
}

export async function GET() {
  try {
    console.log('[sitemap-videos] Starting generation')

    const payload = await getPayload({ config })

    console.log('[sitemap-videos] Payload initialized')

    /*
     * IMPORTANT:
     *
     * The Videos collection does not use Payload drafts/versions,
     * so it does NOT have the automatically generated `_status` field.
     *
     * We therefore fetch the video documents normally and use
     * `publishedAt` as the publication indicator.
     */
    const result = await payload.find({
      collection: 'videos',
      limit: 1000,
      depth: 0,
      sort: '-publishedAt',
      overrideAccess: true,
    })

    console.log(
      `[sitemap-videos] Payload returned ${result.docs.length} documents`,
    )

    const entries: string[] = []

    for (const document of result.docs) {
      const video = document as VideoDocument

      // Only videos with a publication date are considered public.
      if (!video.publishedAt) {
        continue
      }

      const entry = buildVideoEntry(video)

      if (entry) {
        entries.push(entry)
      }
    }

    console.log(
      `[sitemap-videos] Generated ${entries.length} valid video entries`,
    )

    /*
     * Never return an empty <urlset>.
     *
     * If there are currently no valid public videos, returning 404
     * is preferable to returning malformed XML.
     */
    if (entries.length === 0) {
      return new Response(
        'No published videos available for sitemap.',
        {
          status: 404,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        },
      )
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${entries.join('\n')}
</urlset>`

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('[sitemap-videos] FAILED:', error)

    return new Response(
      'Unable to generate video sitemap',
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}