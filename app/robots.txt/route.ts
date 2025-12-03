// app/robots.txt/route.ts
export const dynamic = "force-dynamic"  // optional – removes it from static rendering if you prefer
export const revalidate = 3600          // re-generate every hour (good enough)

export async function GET() {
  const baseUrl = "https://jaetravel.co.ke"

  const robotsTxt = `# JAETravel Expeditions – robots.txt
# Updated: ${new Date().toISOString().split("T")[0]}

User-agent: *
Allow: /

# Essential Next.js assets (must be allowed)
Allow: /_next/
Allow: /favicon.ico
Allow: /images/

# Block truly private or unnecessary paths
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /draft/
Disallow: /temp/

# (Optional but nice) Explicitly encourage crawling of important sections
Allow: /tours/
Allow: /vehicle-hire/
Allow: /destinations/
Allow: /blog/
Allow: /about/
Allow: /contact/
Allow: /disability-tours/

# Sitemap – correct domain!
Sitemap: ${baseUrl}/sitemap.xml

# Host directive (only needed for very old Googlebot versions – harmless to keep)
Host: ${baseUrl}
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}