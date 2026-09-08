import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const BASE = 'https://www.jaetravel.co.ke'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Build a YouTube player URL.
 */
function getYouTubeEmbedUrl(externalId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    externalId,
  )}`
}

/**
 * Build an Instagram embed URL from the canonical Instagram URL.
 *
 * We intentionally use the stored URL instead of assuming that
 * externalId is a reel shortcode.
 */
function getInstagramEmbedUrl(sourceUrl: string): string | null {
  if (!sourceUrl) {
    return null
  }

  try {
    const parsed = new URL(sourceUrl)

    const match = parsed.pathname.match(
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
 * Google Video Sitemap duration is an INTEGER number of seconds.
 *
 * This is different from Schema.org VideoObject duration,
 * which uses ISO-8601 values such as PT23S.
 */
function getDurationSeconds(value: unknown): number | null {
  if (typeof value === 'number') {
    if (Number.isFinite(value) && value > 0) {
      return Math.round(value)
    }

    return null
  }

  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  /**
   * Plain number:
   *
   * "23"
   */
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    const seconds = Number(trimmed)

    return Number.isFinite(seconds) && seconds > 0
      ? Math.round(seconds)
      : null
  }

  /**
   * HH:MM:SS
   */
  const hms = trimmed.match(
    /^(\d+):(\d{1,2}):(\d{1,2})$/,
  )

  if (hms) {
    const hours = Number(hms[1])
    const minutes = Number(hms[2])
    const seconds = Number(hms[3])

    if (
      Number.isFinite(hours) &&
      Number.isFinite(minutes) &&
      Number.isFinite(seconds)
    ) {
      return (
        hours * 3600 +
        minutes * 60 +
        seconds
      )
    }
  }

  /**
   * MM:SS
   */
  const ms = trimmed.match(
    /^(\d+):(\d{1,2})$/,
  )

  if (ms) {
    const minutes = Number(ms[1])
    const seconds = Number(ms[2])

    if (
      Number.isFinite(minutes) &&
      Number.isFinite(seconds)
    ) {
      return (
        minutes * 60 +
        seconds
      )
    }
  }

  /**
   * ISO-8601 fallback.
   *
   * This allows existing records that may contain
   * values such as PT23S to still work.
   */
  const iso = trimmed.match(
    /^PT(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?$/i,
  )

  if (iso) {
    const hours = Number(iso[1] || 0)
    const minutes = Number(iso[2] || 0)
    const seconds = Number(iso[3] || 0)

    const total =
      hours * 3600 +
      minutes * 60 +
      seconds

    return total > 0
      ? Math.round(total)
      : null
  }

  return null
}

export async function GET() {
  try {
    const payload = await getPayload({
      config,
    })

    const result = await payload.find({
      collection: 'videos',
      limit: 1000,
      depth: 0,
      sort: '-publishedAt',
      overrideAccess: true,
    })

    const blocks: string[] = []

    let skippedNoDate = 0
    let skippedNoSlug = 0
    let skippedNoThumbnail = 0
    let skippedNoPlayer = 0
    let skippedBadDate = 0

    for (const raw of result.docs) {
      const video = raw as any

      /**
       * Only videos with publishedAt are public.
       */
      if (!video.publishedAt) {
        skippedNoDate++
        continue
      }

      const publicationDate = new Date(
        video.publishedAt,
      )

      if (
        Number.isNaN(
          publicationDate.getTime(),
        )
      ) {
        skippedBadDate++
        continue
      }

      /**
       * Public watch-page slug.
       */
      const slug =
        typeof video.slug === 'string'
          ? video.slug.trim()
          : ''

      if (!slug) {
        skippedNoSlug++
        continue
      }

      /**
       * Thumbnail is required by Google Video Sitemap.
       */
      const thumbnail =
        typeof video.thumbnailUrl === 'string'
          ? video.thumbnailUrl.trim()
          : typeof video.thumbnail === 'string'
            ? video.thumbnail.trim()
            : ''

      if (!thumbnail) {
        skippedNoThumbnail++
        continue
      }

      /**
       * Title is required by Google.
       *
       * Some Instagram records have an empty title.
       * Therefore use a useful fallback rather than
       * dropping the video.
       */
      const existingTitle =
        typeof video.title === 'string'
          ? video.title.trim()
          : ''

      const description =
        typeof video.description === 'string'
          ? video.description.trim()
          : ''

      const firstDescriptionLine =
        description
          .split(/\r?\n/)
          .map((line: string) => line.trim())
          .find(Boolean) || ''

      const title =
        existingTitle ||
        firstDescriptionLine ||
        'JaeTravel Expeditions Video'

      /**
       * Description is also required.
       *
       * If the record has no description, use the
       * title as a safe fallback.
       */
      const videoDescription =
        description ||
        `Watch ${title} on JaeTravel Expeditions.`

      /**
       * Determine provider.
       */
      const provider =
        typeof video.provider === 'string'
          ? video.provider
              .toLowerCase()
              .trim()
          : ''

      const externalId =
        typeof video.externalId === 'string'
          ? video.externalId.trim()
          : typeof video.videoId === 'string'
            ? video.videoId.trim()
            : ''

      const sourceUrl =
        typeof video.url === 'string'
          ? video.url.trim()
          : ''

      let playerLoc: string | null = null

      /**
       * YouTube.
       */
      if (
        provider === 'youtube' &&
        externalId
      ) {
        playerLoc =
          getYouTubeEmbedUrl(
            externalId,
          )
      }

      /**
       * Instagram.
       *
       * Use the canonical stored Instagram URL
       * to determine the shortcode.
       */
      if (
        provider === 'instagram' ||
        provider === 'instagram_reel'
      ) {
        playerLoc =
          getInstagramEmbedUrl(
            sourceUrl,
          )
      }

      /**
       * Existing explicit embed URL fallback.
       */
      if (
        !playerLoc &&
        typeof video.embedUrl === 'string' &&
        video.embedUrl.trim()
      ) {
        playerLoc =
          video.embedUrl.trim()
      }

      /**
       * Last-resort source URL.
       *
       * This keeps records with a valid external URL
       * discoverable even if an embed URL cannot be
       * constructed.
       */
      if (
        !playerLoc &&
        sourceUrl
      ) {
        playerLoc = sourceUrl
      }

      if (!playerLoc) {
        skippedNoPlayer++
        continue
      }

      /**
       * Google Video Sitemap duration:
       * integer seconds.
       */
      const durationSeconds =
        getDurationSeconds(
          video.durationSeconds ??
            video.duration,
        )

      const watchUrl =
        `${BASE}/watch/${encodeURIComponent(slug)}`

      const videoXml = [
        `<video:video>`,

        `<video:thumbnail_loc>${escapeXml(
          thumbnail,
        )}</video:thumbnail_loc>`,

        `<video:title>${escapeXml(
          title.slice(0, 2000),
        )}</video:title>`,

        `<video:description>${escapeXml(
          videoDescription.slice(0, 2048),
        )}</video:description>`,

        `<video:player_loc>${escapeXml(
          playerLoc,
        )}</video:player_loc>`,

        `<video:publication_date>${publicationDate.toISOString()}</video:publication_date>`,

        durationSeconds !== null
          ? `<video:duration>${durationSeconds}</video:duration>`
          : '',

        `<video:family_friendly>yes</video:family_friendly>`,

        `</video:video>`,
      ]
        .filter(Boolean)
        .join('')

      blocks.push(
        `<url><loc>${escapeXml(
          watchUrl,
        )}</loc>${videoXml}</url>`,
      )
    }

    console.log(
      '[sitemap-videos]',
      JSON.stringify({
        payloadVideos: result.docs.length,
        validSitemapVideos: blocks.length,
        skippedNoDate,
        skippedNoSlug,
        skippedNoThumbnail,
        skippedNoPlayer,
        skippedBadDate,
      }),
    )

    /**
     * IMPORTANT:
     *
     * Never return a 200 XML sitemap containing
     * an empty <urlset>.
     *
     * Google reports:
     *
     * "Missing XML tag"
     *
     * when there are no <url> entries.
     */
    if (blocks.length === 0) {
      return new Response(
        'No published videos available for sitemap.',
        {
          status: 404,
          headers: {
            'Content-Type':
              'text/plain; charset=utf-8',
            'Cache-Control':
              'no-store',
          },
        },
      )
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${blocks.join('\n')}
</urlset>`

    return new Response(
      xml,
      {
        status: 200,
        headers: {
          'Content-Type':
            'application/xml; charset=utf-8',
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (error) {
    console.error(
      '[sitemap-videos] FAILED:',
      error,
    )

    return new Response(
      'Unable to generate video sitemap.',
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