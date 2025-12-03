// app/sitemap.xml/route.ts
import { tours } from "@/lib/tours-data"
import { vehicles } from "@/lib/vehicles-data"
import { destinations } from "@/lib/destinations-data"

export const dynamic = "force-dynamic"
export const revalidate = 3600

export async function GET() {
  try {
    const baseUrl = "https://jaetravel.co.ke"

    // Safety: fallback to empty arrays if data is missing
    const safeTours = Array.isArray(tours) ? tours : []
    const safeVehicles = Array.isArray(vehicles) ? vehicles : []
    const safeDestinations = Array.isArray(destinations) ? destinations : []

  // Fixed: All paths now start with /
  const staticPages = [
    "/",
    "/tours",
    "/toyota-prado",
    "/toyota-landcruiser",
    "/wheelchair-vehicle",
    "/vehicle-hire",
    "/vehicles",
    "/wheelchair-accessible-maasai-mara-migration",
    "/wheelchair-accessible-safari-landcruiser",
    "/destinations",
    "/destinations/kenya",
    "/destinations/tanzania",
    "/destinations/rwanda",
    "/destinations/uganda",
    "/6-sustainable-travel-tips-2",
    "/luxury-roof-top-camping",
    "/disability-tours",
    "/maasai-mara-great-migration",
    "/about",
    "/blog",
    "/other-services",
    "/blog/blog-gallery",
    "/contact",
  ]

    const dynamicPages = [
      ...safeTours.map(t => `/tours/${t?.slug}`).filter(Boolean),
      ...safeVehicles.map(v => `/vehicle-hire/${v?.slug}`).filter(Boolean),
      ...safeDestinations.map(d => `/destinations/${d?.country}`).filter(Boolean),
    ]

    const allPages = Array.from(new Set([...staticPages, ...dynamicPages]))

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page === "/" ? "daily" : page.startsWith("/tours/") || page.startsWith("/vehicle-hire/") ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "/" ? "1.0" : page.startsWith("/tours/") || page.startsWith("/vehicle-hire/") ? "0.9" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    // If anything crashes, return valid empty sitemap instead of HTML error page
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jaetravel.co.ke/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    })
  }
}