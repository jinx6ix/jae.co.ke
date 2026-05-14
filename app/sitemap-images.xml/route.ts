import { tours } from "@/lib/tours-data";
import { budgetTours } from "@/lib/budget-tours-data";
import { vehicles } from "@/lib/vehicles-data";
import { blogPosts } from "@/lib/blog-data";

export const dynamic = "force-dynamic";

const BASE = "https://www.jaetravel.co.ke";

export async function GET() {
  const safeTours = Array.isArray(tours) ? tours : [];
  const safeBudget = Array.isArray(budgetTours) ? budgetTours : [];
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const safeBlog = Array.isArray(blogPosts) ? blogPosts : [];

  // Collect all images from tours
  const tourImages = safeTours.map((t) => ({
    loc: `${BASE}${t.image || "/placeholder.jpg"}`,
    caption: t.title,
    title: t.title,
  }));

  // Collect all images from budget tours
  const budgetImages = safeBudget.map((t) => ({
    loc: `${BASE}${t.image || "/placeholder.jpg"}`,
    caption: t.title,
    title: t.title,
  }));

  // Collect all images from vehicles
  const vehicleImages = safeVehicles.map((v) => ({
    loc: `${BASE}${v.image || "/placeholder.jpg"}`,
    caption: v.name,
    title: v.name,
  }));

  // Collect all images from blog posts
  const blogImages = safeBlog.map((p) => ({
    loc: `${BASE}${p.image || "/placeholder.jpg"}`,
    caption: p.title,
    title: p.title,
  }));

  // Static site images
  const staticImages = [
    { loc: `${BASE}/og-image.jpg`, caption: "JaeTravel Expeditions Safari Tours", title: "Homepage OG Image" },
    { loc: `${BASE}/logo.png`, caption: "JaeTravel Expeditions Logo", title: "Logo" },
    { loc: `${BASE}/accessible-safari-wheelchair.jpg`, caption: "Wheelchair Accessible Safari in Kenya", title: "Wheelchair Safari" },
    { loc: `${BASE}/masai-mara-migration.jpg`, caption: "Masai Mara Great Migration", title: "Migration" },
    { loc: `${BASE}/tanzania-serengeti.jpg`, caption: "Serengeti National Park", title: "Serengeti" },
    { loc: `${BASE}/mountain-gorilla-trekking.jpg`, caption: "Mountain Gorilla Trekking", title: "Gorilla Trekking" },
    { loc: `${BASE}/kenya-safari-landscape.jpg`, caption: "Kenya Safari Landscape", title: "Safari" },
    { loc: `${BASE}/Amboseli-National-Park-Elephantsssss.jpg`, caption: "Elephants in Amboseli", title: "Amboseli" },
    { loc: `${BASE}/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg`, caption: "Serengeti Safari", title: "Serengeti" },
    { loc: `${BASE}/ngorongoro-header-3.jpg`, caption: "Ngorongoro Crater", title: "Ngorongoro" },
    { loc: `${BASE}/bwindi-forest-uganda-gorilla-safaris.jpg`, caption: "Bwindi Forest Uganda", title: "Bwindi" },
    { loc: `${BASE}/Volcanoes-National-Park-Rwanda-Natural-World-Kenya-Safaris.jpg`, caption: "Volcanoes NP Rwanda", title: "Volcanoes" },
    { loc: `${BASE}/lake-nakuru-flamingos-in-red-sunset-590x390.jpg`, caption: "Lake Nakuru Flamingos", title: "Lake Nakuru" },
    { loc: `${BASE}/Samburu_National_Reserve,_Kenya-26December2012.jpg`, caption: "Samburu National Reserve", title: "Samburu" },
    { loc: `${BASE}/tsavo-west-national-park-chyulu-gate.jpg.webp`, caption: "Tsavo West National Park", title: "Tsavo" },
    { loc: `${BASE}/rwanda-mountain-gorillas.jpg`, caption: "Mountain Gorillas Rwanda", title: "Gorillas" },
  ];

  const allImages = [...staticImages, ...tourImages, ...budgetImages, ...vehicleImages, ...blogImages];

  // Remove duplicates based on URL
  const uniqueImages = allImages.filter((img, index, self) =>
    index === self.findIndex((t) => t.loc === img.loc)
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${uniqueImages.map((img) => `  <url>
    <loc>${img.loc.replace(BASE, BASE)}</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}