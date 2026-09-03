// app/robots.txt/route.ts — UPDATED with language paths + AI crawlers
export const dynamic = "force-dynamic"
export const revalidate = 3600

export async function GET() {
  const base = "https://www.jaetravel.co.ke"
  const txt = `# JaeTravel Expeditions — robots.txt
# Updated: ${new Date().toISOString().split("T")[0]}

User-agent: *
Allow: /

# ── Language subdirectories (all indexable) ──
Allow: /fr/
Allow: /de/
Allow: /it/
Allow: /hi/
Allow: /ar/
Allow: /zh/

# ── Key content directories ──
Allow: /tours/
Allow: /tour/
Allow: /budget-tours/
Allow: /vehicle-hire/
Allow: /vehicles/
Allow: /destinations/
Allow: /blog/
Allow: /about/
Allow: /contact/
Allow: /_next/static/

# ── Block private/API paths ──
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /draft/
Disallow: /checkout/
Disallow: /book-now/

# ── AI crawlers — allow for AI search visibility ──
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

# ── Sitemaps ──
# Point at the index; the index points at the per-content children
# (sitemap.xml, sitemap-images.xml, sitemap-videos.xml). This is the
# layout Google Search Console's Sitemaps report expects.
Sitemap: ${base}/sitemap-index.xml
Sitemap: ${base}/sitemap.xml
Sitemap: ${base}/sitemap-images.xml
Sitemap: ${base}/sitemap-videos.xml
Host: ${base}
`
  return new Response(txt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
