// app/(marketing)/sitemap.xml/route.ts
//
// Flat list of all public pages on the site. hreflang has been moved
// off this file (the parent sitemap-index.xml + per-page hreflang is
// handled in <link rel="alternate"> tags rendered by each page's
// metadata — see the `alternates.languages` block in app/(marketing)/layout.tsx
// and the per-page generateMetadata functions). Keeping this file
// hreflang-free matches Google's recommended plain-urlset layout, which
// the Search Console Sitemaps report expects.
//
// Sources of URLs (combined, deduped):
//   - Hardcoded static pages (homepage, /tours, /about, etc.)
//   - lib/tours-data.ts         (Tours collection static fallback)
//   - lib/budget-tours-data.ts  (BudgetTours static fallback)
//   - lib/vehicles-data.ts
//   - lib/destinations-data.ts
//   - lib/blog-data.ts ∪ CMS posts (Posts collection via getAllBlogSlugs)

import { getAllPagesPath } from '@/lib/all-pages'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const BASE = 'https://www.jaetravel.co.ke'

function urlEntry(path: string, changefreq: string, priority: string, lastmod: string) {
  return `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const allEntries = await getAllPagesPath();

  // Assign dummy frequencies/priorities as we don't have them in the unified list
  const entriesWithMeta = allEntries.map(e => ({
      ...e,
      freq: 'weekly',
      pri: '0.8'
  }))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entriesWithMeta.map((e) => urlEntry(e.path, e.freq, e.pri, today)).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
