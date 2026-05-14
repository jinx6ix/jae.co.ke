import { tours } from "@/lib/tours-data"
import { vehicles } from "@/lib/vehicles-data"
import { budgetTours } from "@/lib/budget-tours-data"
import { destinations } from "@/lib/destinations-data"
import { blogPosts } from "@/lib/blog-data"

export const dynamic = "force-dynamic"
export const revalidate = 3600

const BASE = "https://www.jaetravel.co.ke"

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE}/sitemap.xml/main</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-videos.xml</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>
</sitemapindex>`

export async function GET() {
  return new Response(sitemapIndexXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}