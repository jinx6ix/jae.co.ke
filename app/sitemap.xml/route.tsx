import { tours } from "@/lib/tours-data"
import { vehicles } from "@/lib/vehicles-data"

export async function GET() {
  const baseUrl = "https://jaetravel.co.ke"

  const staticPages = [
    "",
    "/tours",
    "/toyota-landcruiser",
    "/wheelchair-vehicle",
    "/vehicle-hire",
    "/vehicles",
    "/destinations",
    "/destinations/kenya",
    "/destinations/tanzania",
    "/destinations/rwanda",
    "/destinations/uganda",
    "/vehicle-hire",
    "/disability-tours",
    "/about",
    "/blog",
    "/blog/blog-gallery",
    "/contact",
  ]

  const tourPages = tours.map((tour) => `/tours/${tour.slug}`)
  const vehiclePages = vehicles.map((vehicle) => `/vehicle-hire/${vehicle.slug}`)

  const allPages = [...staticPages, ...tourPages, ...vehiclePages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === "" ? "daily" : page.includes("/tours/") || page.includes("/vehicle-hire/") ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : page.includes("/tours/") || page.includes("/disability-tours") ? "0.9" : "0.8"}</priority>
  </url>`,
    )
    .join("")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
