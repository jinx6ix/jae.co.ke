// app/robots.txt/route.ts   (or wherever you have it)
export async function GET() {
  const robotsTxt = `# JAE Travel Expeditions – robots.txt
User-agent: *
Allow: /

# Explicitly allow all Next.js static assets (THIS IS REQUIRED)
Allow: /_next/static/
Allow: /_next/image
Allow: /favicon.ico

# Only block truly private areas
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Optional: keep your marketing paths explicit if you want
Allow: /tours/
Allow: /destinations/
Allow: /blog/
Allow: /about/
Allow: /contact/

# Sitemap
Sitemap: https://www.jaetravel.co.ke/sitemap.xml

# Remove crawl-delay (Google ignores it anyway and it can hurt crawl budget)
# Crawl-delay: 1
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=60", // 1 hour cache is enough
    },
  })
}