export async function GET() {
  const robotsTxt = `# JaeTravel Expeditions - Robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://jaetravel.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

# Allow all tours and pages
Allow: /tours/
Allow: /destinations/
Allow: /vehicle-hire/
Allow: /disability-tours/
Allow: /blog/
Allow: /about/
Allow: /contact/
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
