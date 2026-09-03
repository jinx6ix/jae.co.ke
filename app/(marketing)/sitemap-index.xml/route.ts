// app/(marketing)/sitemap-index.xml/route.ts
//
// Root sitemap index. Google Search Console's recommended layout is
// one index that points to per-content child sitemaps:
//
//   /sitemap-index.xml      ← this file
//   /sitemap.xml            ← all public pages (no hreflang noise)
//   /sitemap-images.xml     ← images discoverable via Google Images
//   /sitemap-videos.xml     ← YouTube + IG embeds, picked up by Google Video
//
// Why an index and not one big file:
//   - Search Console's Sitemaps report separates per file, so the editor
//     can see "185 pages in sitemap.xml, 90 images in sitemap-images.xml,
//     N videos in sitemap-videos.xml" when diagnosing coverage.
//   - Each child can be up to 50,000 URLs or 50 MB; the index pattern
//     scales without a future rewrite.
//   - Google's video search specifically indexes sitemap-videos.xml
//     (or the RSS feed). The single-file approach doesn't qualify.

import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

const BASE = 'https://www.jaetravel.co.ke'

interface ChildSitemap {
  loc: string
  /** ISO date — when this child was last meaningfully updated. */
  lastmod: string
}

async function getChildLastmods(): Promise<{ images: string; videos: string; pages: string }> {
  // Default to today; will be tightened per-source below.
  const today = new Date().toISOString().split('T')[0]
  let images = today
  let videos = today
  let pages = today

  try {
    const payload = await getPayload({ config })
    // Pages — for sitemap.xml, lastmod = newest page updatedAt.
    const pagesRes = await payload.find({
      collection: 'pages',
      where: { _status: { equals: 'published' } },
      limit: 1,
      sort: '-updatedAt',
      depth: 0,
      overrideAccess: true,
    })
    const newestPage = pagesRes.docs[0] as { updatedAt?: string } | undefined
    if (newestPage?.updatedAt) pages = newestPage.updatedAt.split('T')[0]

    // Posts — drive sitemap-images.xml lastmod.
    const postsRes = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 1,
      sort: '-updatedAt',
      depth: 0,
      overrideAccess: true,
    })
    const newestPost = postsRes.docs[0] as { updatedAt?: string } | undefined
    if (newestPost?.updatedAt) images = newestPost.updatedAt.split('T')[0]

    // Videos — drive sitemap-videos.xml lastmod.
    const videosRes = await payload.find({
      collection: 'videos',
      limit: 1,
      sort: '-syncedAt',
      depth: 0,
      overrideAccess: true,
    })
    const newestVideo = videosRes.docs[0] as { syncedAt?: string } | undefined
    if (newestVideo?.syncedAt) videos = newestVideo.syncedAt.split('T')[0]
  } catch (err) {
    // If the CMS is unreachable, lastmod falls back to "today" — the
    // sitemap is still valid, just not as informative.
    console.warn('[sitemap-index] CMS lastmod lookup failed:', err)
  }

  return { images, videos, pages }
}

export async function GET() {
  const { images, videos, pages } = await getChildLastmods()
  const children: ChildSitemap[] = [
    { loc: `${BASE}/sitemap.xml`, lastmod: pages },
    { loc: `${BASE}/sitemap-images.xml`, lastmod: images },
    { loc: `${BASE}/sitemap-videos.xml`, lastmod: videos },
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children
  .map(
    (c) =>
      `  <sitemap>\n    <loc>${c.loc}</loc>\n    <lastmod>${c.lastmod}</lastmod>\n  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
