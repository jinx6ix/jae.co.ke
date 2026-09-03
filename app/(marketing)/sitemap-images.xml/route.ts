// app/(marketing)/sitemap-images.xml/route.ts
//
// Image sitemap per Google's image extension spec:
//   https://www.sitemaps.org/protocol.html#images
//
// One <url> per page that has a primary image (and optionally additional
// <image:image> children for gallery items). Each <image:image> entry
// requires at minimum <image:loc>; we add <image:title> and
// <image:caption> for richer Google Images search results.
//
// Google caps image entries at 1000 per doc; we cap defensively.
//
// Sources (combined, deduped):
//   - lib/tours-data.ts, lib/budget-tours-data.ts → /tour/<slug>, hero only
//   - lib/vehicles-data.ts → /vehicle-hire/<slug>, hero + gallery
//   - lib/destinations-data.ts → /destinations/<country>, hero only
//   - lib/blog-data.ts ∪ CMS posts → /blog/<slug>, hero only
//
// Static-data URLs are prepended with the production BASE. Some static
// records point at third-party CDNs (e.g. imagekit.io) — those are
// passed through verbatim, Google accepts them as long as the URL is
// crawlable and the host is allowed in robots.txt.

import { tours } from '@/lib/tours-data'
import { vehicles } from '@/lib/vehicles-data'
import { budgetTours } from '@/lib/budget-tours-data'
import { destinations } from '@/lib/destinations-data'
import { blogPosts } from '@/lib/blog-data'
import { getAllPosts } from '@/lib/posts'
import { toLocalMediaUrl } from '@/lib/marketing-media'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

const BASE = 'https://www.jaetravel.co.ke'
const MAX_IMAGES_PER_URL = 1000

function absUrl(src: string): string {
  if (!src) return ''
  if (/^https?:\/\//i.test(src)) return src
  return `${BASE}${src.startsWith('/') ? '' : '/'}${src}`
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

interface ImageRecord {
  loc: string
  title?: string
  caption?: string
}

interface PageRecord {
  pageUrl: string
  images: ImageRecord[]
}

function buildImageBlock(imgs: ImageRecord[]): string {
  return imgs
    .filter((i) => i.loc)
    .slice(0, MAX_IMAGES_PER_URL)
    .map((i) => {
      const title = i.title ? `\n      <image:title>${escapeXml(i.title)}</image:title>` : ''
      const caption = i.caption ? `\n      <image:caption>${escapeXml(i.caption)}</image:caption>` : ''
      return `    <image:image>
      <image:loc>${escapeXml(i.loc)}</image:loc>${title}${caption}
    </image:image>`
    })
    .join('\n')
}

function buildUrlBlock(rec: PageRecord): string {
  const body = buildImageBlock(rec.images)
  if (!body) return ''
  return `  <url>
    <loc>${escapeXml(rec.pageUrl)}</loc>
${body}
  </url>`
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const records: PageRecord[] = []

  // Tours (static)
  for (const t of tours ?? []) {
    if (!t.slug || !t.image) continue
    records.push({
      pageUrl: `${BASE}/tour/${t.slug}`,
      images: [{ loc: absUrl(t.image), title: t.title, caption: t.description?.slice(0, 200) }],
    })
  }

  // Budget tours (static)
  for (const t of budgetTours ?? []) {
    if (!t.slug || !t.image) continue
    records.push({
      pageUrl: `${BASE}/budget-tours/${t.slug}`,
      images: [{ loc: absUrl(t.image), title: t.title, caption: t.description?.slice(0, 200) }],
    })
  }

  // Vehicles — hero + gallery
  for (const v of vehicles ?? []) {
    if (!v.slug) continue
    const imgs: ImageRecord[] = []
    if (v.image) imgs.push({ loc: absUrl(v.image), title: v.name, caption: v.description?.slice(0, 200) })
    if (Array.isArray(v.gallery)) {
      for (const g of v.gallery) {
        if (g && g !== v.image) imgs.push({ loc: absUrl(g), title: v.name })
      }
    }
    if (imgs.length) records.push({ pageUrl: `${BASE}/vehicle-hire/${v.slug}`, images: imgs })
  }

  // Destinations
  for (const d of destinations ?? []) {
    if (!d.country) continue
    const imgs: ImageRecord[] = []
    if (d.heroImage) imgs.push({ loc: absUrl(d.heroImage), title: d.title, caption: d.description?.slice(0, 200) })
    if (imgs.length) records.push({ pageUrl: `${BASE}/destinations/${d.country.toLowerCase()}`, images: imgs })
  }

  // Blog — static fallback
  for (const b of blogPosts ?? []) {
    if (!b.slug || !b.image) continue
    records.push({
      pageUrl: `${BASE}/blog/${b.slug}`,
      images: [{ loc: absUrl(b.image), title: b.title, caption: b.excerpt?.slice(0, 200) }],
    })
  }

  // Blog — CMS posts (authoritative). heroImage is a Media relationship.
  try {
    const posts = await getAllPosts()
    for (const p of posts) {
      const slug = (p as { slug?: string }).slug
      if (!slug) continue
      const hero = p.heroImage as { url?: string } | string | null | undefined
      const heroUrl = typeof hero === 'object' && hero?.url ? toLocalMediaUrl(hero.url) : ''
      if (!heroUrl) continue
      records.push({
        pageUrl: `${BASE}/blog/${slug}`,
        images: [
          {
            loc: absUrl(heroUrl),
            title: p.title,
            caption: p.meta?.description?.slice(0, 200) ?? '',
          },
        ],
      })
    }
  } catch (err) {
    // CMS unreachable — static blog list still covers the important URLs.
    console.warn('[sitemap-images] CMS post fetch failed:', err)
  }

  // Dedupe on pageUrl; merge images from duplicates if they ever appear.
  const byUrl = new Map<string, PageRecord>()
  for (const r of records) {
    const existing = byUrl.get(r.pageUrl)
    if (existing) {
      existing.images.push(...r.images)
    } else {
      byUrl.set(r.pageUrl, r)
    }
  }
  const final = Array.from(byUrl.values())
    .map((r) => buildUrlBlock(r))
    .filter(Boolean)

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${BASE}/</loc>
    <lastmod>${today}</lastmod>
${buildImageBlock([{ loc: `${BASE}/jaetravel-logo.png`, title: 'JaeTravel Expeditions' }])}
  </url>
${final.join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
