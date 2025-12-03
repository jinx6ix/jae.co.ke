// app/sitemap.xml/route.ts  (or api/sitemap.xml/route.ts)
import { tours } from "@/lib/tours-data"
import { vehicles } from "@/lib/vehicles-data"
import { destinations } from "@/lib/destinations-data"

export const dynamic = "force-dynamic" // or remove if you want static
export const revalidate = 3600 // revalidate every hour

export async function GET() {
  const baseUrl = "https://jaetravel.co.ke"

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

  const tourPages = tours.map((tour) => `/tours/${tour.slug}`)
  const vehiclePages = vehicles.map((vehicle) => `/vehicle-hire/${vehicle.slug}`)
  const destinationPages = destinations.map((destination) => `/destinations/${destination.country}`)

  // Combine and remove duplicates
  const allPages = Array.from(new Set([...staticPages, ...tourPages, ...vehiclePages, ...destinationPages]))

  const now = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
  .map((page) => {
    const isHome = page === "/"
    const isTour = page.startsWith("/tours/")
    const isVehicle = page.startsWith("/vehicle-hire/")
    const isDisabilityTour = page.includes("/disability-tours") || page.includes("wheelchair")

    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${isHome ? "daily" : isTour || isVehicle ? "weekly" : "monthly"}</changefreq>
    <priority>${isHome ? "1.0" : isTour || isDisabilityTour ? "0.9" : "0.8"}</priority>
  </url>`
  })
  .join("\n")}
</urlset>`.trim()

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}