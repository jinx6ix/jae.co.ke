// app/sitemap.xml/route.tsx — MULTILINGUAL SITEMAP WITH ALL LANGUAGE VERSIONS
// Includes: hreflang xhtml annotations, all language prefixes, all slug pages
import { tours } from "@/lib/tours-data"
import { vehicles } from "@/lib/vehicles-data"
import { budgetTours } from "@/lib/budget-tours-data"
import { destinations } from "@/lib/destinations-data"
import { blogPosts } from "@/lib/blog-data"

export const dynamic = "force-dynamic"
export const revalidate = 3600

const BASE = "https://www.jaetravel.co.ke"
const LANGS = ["en","fr","de","it","hi","ar","zh"] as const
const LANG_PREFIX: Record<string,string> = { en:"", fr:"/fr", de:"/de", it:"/it", hi:"/hi", ar:"/ar", zh:"/zh" }

function buildUrl(path: string, lang: string) {
  const prefix = LANG_PREFIX[lang] ?? ""
  return `${BASE}${prefix}${path}`
}

function urlEntry(path: string, changefreq: string, priority: string, lastmod: string) {
  const altLinks = LANGS.map(lang =>
    `    <xhtml:link rel="alternate" hreflang="${lang}" href="${buildUrl(path, lang)}" />`
  ).join("\n")
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${path}" />`
  return `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${altLinks}
${xDefault}
  </url>`
}

export async function GET() {
  const today = new Date().toISOString().split("T")[0]

  const safeTours = Array.isArray(tours) ? tours : []
  const safeBudget = Array.isArray(budgetTours) ? budgetTours : []
  const safeVehicles = Array.isArray(vehicles) ? vehicles : []
  const safeDests = Array.isArray(destinations) ? destinations : []
  const safeBlog = Array.isArray(blogPosts) ? blogPosts : []

  const staticPages = [
    { path: "/", freq: "daily", pri: "1.0" },
    { path: "/tours", freq: "weekly", pri: "0.9" },
    { path: "/budget-tours", freq: "weekly", pri: "0.9" },
    { path: "/vehicle-hire", freq: "weekly", pri: "0.9" },
    { path: "/vehicles", freq: "weekly", pri: "0.8" },
    { path: "/destinations", freq: "weekly", pri: "0.8" },
    { path: "/destinations/kenya", freq: "weekly", pri: "0.9" },
    { path: "/destinations/tanzania", freq: "weekly", pri: "0.9" },
    { path: "/destinations/rwanda", freq: "weekly", pri: "0.9" },
    { path: "/destinations/uganda", freq: "weekly", pri: "0.9" },
    { path: "/blog", freq: "weekly", pri: "0.8" },
    { path: "/about", freq: "monthly", pri: "0.7" },
    { path: "/contact", freq: "monthly", pri: "0.7" },
    { path: "/maasai-mara-great-migration", freq: "weekly", pri: "0.9" },
    { path: "/wheelchair-accessible-safari-landcruiser", freq: "weekly", pri: "0.95" },
    { path: "/wheelchair-accessible-maasai-mara-migration", freq: "weekly", pri: "0.95" },
    { path: "/disability-tours", freq: "weekly", pri: "0.9" },
    { path: "/gorilla-trekking-tours", freq: "weekly", pri: "0.9" },
    { path: "/serengeti-safaris", freq: "weekly", pri: "0.9" },
    { path: "/amboseli-safaris", freq: "weekly", pri: "0.8" },
    { path: "/ngorongoro-safaris", freq: "weekly", pri: "0.8" },
    { path: "/great-migration-safaris", freq: "weekly", pri: "0.9" },
    { path: "/kenya-circuit-safaris", freq: "weekly", pri: "0.8" },
    { path: "/tanzania-circuit-safaris", freq: "weekly", pri: "0.8" },
    { path: "/uganda-circuit-safaris", freq: "weekly", pri: "0.8" },
    { path: "/adventure-trekking", freq: "weekly", pri: "0.8" },
    { path: "/beach-holidays", freq: "weekly", pri: "0.8" },
    { path: "/cultural-tours", freq: "weekly", pri: "0.8" },
    { path: "/birdwatching-safaris-east-africa", freq: "weekly", pri: "0.8" },
    { path: "/luxury-roof-top-camping", freq: "weekly", pri: "0.8" },
    { path: "/flamingo-safari-tours", freq: "weekly", pri: "0.8" },
    { path: "/big-five", freq: "weekly", pri: "0.8" },
    { path: "/short-safaris", freq: "weekly", pri: "0.8" },
    { path: "/other-services", freq: "monthly", pri: "0.7" },
    { path: "/terms", freq: "monthly", pri: "0.4" },
    { path: "/wheelchair-vehicle", freq: "weekly", pri: "0.9" },
    { path: "/toyota-landcruiser", freq: "monthly", pri: "0.8" },
    { path: "/toyota-prado", freq: "monthly", pri: "0.8" },
  ]

  const dynamicEntries = [
    ...safeTours.map(t => ({ path: `/tour/${t.slug}`, freq: "weekly", pri: "0.9" })),
    ...safeBudget.map(t => ({ path: `/budget-tours/${t.slug}`, freq: "weekly", pri: "0.9" })),
    ...safeVehicles.map(v => ({ path: `/vehicle-hire/${v.slug}`, freq: "weekly", pri: "0.9" })),
    ...safeDests.map(d => ({ path: `/destinations/${d.country.toLowerCase()}`, freq: "weekly", pri: "0.85" })),
    ...safeBlog.map(b => ({ path: `/blog/${b.slug}`, freq: "monthly", pri: "0.7" })),
  ]

  const allEntries = [...staticPages, ...dynamicEntries]
  const seen = new Set<string>()
  const unique = allEntries.filter(e => { if (seen.has(e.path)) return false; seen.add(e.path); return true })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${unique.map(e => urlEntry(e.path, e.freq, e.pri, today)).join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
