
// app/(marketing)/sitemap-index.xml/route.ts
//
// Main sitemap index for JaeTravel Expeditions.
//
// Public sitemap architecture:
//
//   /sitemap-index.xml
//        ├── /sitemap.xml
//        ├── /sitemap-images.xml
//        └── /sitemap-videos.xml
//
// Only public URLs belong here.
// Payload admin/CMS URLs are NEVER added.
//
// The video sitemap is included only when there is at least one
// published video with enough metadata to create a valid video
// sitemap entry.

import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600

const BASE = 'https://www.jaetravel.co.ke'

interface ChildSitemap {
  loc: string
  lastmod: string
}

/**
 * Return an ISO date in YYYY-MM-DD format.
 */
function dateOnly(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString().split('T')[0]
}

/**
 * Get information required for the sitemap index.
 *
 * Only published content is considered.
 */
async function getSitemapInfo() {
  const today = new Date().toISOString().split('T')[0]

  const payload = await getPayload({
    config,
  })

  let pagesLastmod = today
  let postsLastmod = today
  let videosLastmod = today

  let validVideoCount = 0

  /*
   * ─────────────────────────────────────────────
   * PAGES
   * ─────────────────────────────────────────────
   */
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 1,
      sort: '-updatedAt',
      depth: 0,
      overrideAccess: true,
    })

    const page = pages.docs[0]

    if (page?.updatedAt) {
      const pageDate = dateOnly(page.updatedAt)

      if (pageDate) {
        pagesLastmod = pageDate
      }
    }
  } catch (error) {
    console.warn(
      '[sitemap-index] Pages lookup failed:',
      error,
    )
  }

  /*
   * ─────────────────────────────────────────────
   * POSTS
   * ─────────────────────────────────────────────
   */
  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 1,
      sort: '-updatedAt',
      depth: 0,
      overrideAccess: true,
    })

    const post = posts.docs[0]

    if (post?.updatedAt) {
      const postDate = dateOnly(post.updatedAt)

      if (postDate) {
        postsLastmod = postDate
      }
    }
  } catch (error) {
    console.warn(
      '[sitemap-index] Posts lookup failed:',
      error,
    )
  }

  /*
   * ─────────────────────────────────────────────
   * VIDEOS
   * ─────────────────────────────────────────────
   *
   * A video is considered sitemap-valid when it has:
   *
   *   - published status
   *   - slug
   *   - title
   *   - thumbnail
   *   - publication date
   *   - YouTube externalId OR Instagram URL
   *
   * This mirrors the requirements used by sitemap-videos.xml.
   */
  try {
    const videos = await payload.find({
      collection: 'videos',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 100,
      sort: '-publishedAt',
      depth: 0,
      overrideAccess: true,
    })

    for (const video of videos.docs) {
      const provider = video.provider

      const slug =
        typeof video.slug === 'string'
          ? video.slug.trim()
          : ''

      const title =
        typeof video.title === 'string'
          ? video.title.trim()
          : ''

      const thumbnailUrl =
        typeof video.thumbnailUrl === 'string'
          ? video.thumbnailUrl.trim()
          : ''

      const publishedAt =
        typeof video.publishedAt === 'string'
          ? video.publishedAt
          : ''

      const externalId =
        typeof video.externalId === 'string'
          ? video.externalId.trim()
          : ''

      const url =
        typeof video.url === 'string'
          ? video.url.trim()
          : ''

      const validYouTube =
        provider === 'youtube' &&
        Boolean(externalId)

      const validInstagram =
        provider === 'instagram' &&
        Boolean(url)

      const valid =
        Boolean(slug) &&
        Boolean(title) &&
        Boolean(thumbnailUrl) &&
        Boolean(publishedAt) &&
        (validYouTube || validInstagram)

      if (!valid) {
        continue
      }

      validVideoCount++

      /*
       * Videos are sorted newest-first, so the first valid
       * published video gives us the appropriate lastmod.
       */
      if (validVideoCount === 1) {
        const videoDate = dateOnly(publishedAt)

        if (videoDate) {
          videosLastmod = videoDate
        }
      }
    }
  } catch (error) {
    console.warn(
      '[sitemap-index] Videos lookup failed:',
      error,
    )
  }

  return {
    pagesLastmod,
    postsLastmod,
    videosLastmod,
    validVideoCount,
  }
}

/**
 * Generate the sitemap index.
 */
export async function GET() {
  try {
    const {
      pagesLastmod,
      postsLastmod,
      videosLastmod,
      validVideoCount,
    } = await getSitemapInfo()

    const children: ChildSitemap[] = [
      {
        loc: `${BASE}/sitemap.xml`,
        lastmod: pagesLastmod,
      },
      {
        loc: `${BASE}/sitemap-images.xml`,
        lastmod: postsLastmod,
      },
    ]

    /*
     * Only advertise sitemap-videos.xml when there is
     * at least one valid published video.
     */
    if (validVideoCount > 0) {
      children.push({
        loc: `${BASE}/sitemap-videos.xml`,
        lastmod: videosLastmod,
      })
    }

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children
  .map(
    (child) => `  <sitemap>
    <loc>${child.loc}</loc>
    <lastmod>${child.lastmod}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control':
          'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error(
      '[sitemap-index] Failed to generate sitemap index:',
      error,
    )

    return new Response(
      'Unable to generate sitemap index',
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
