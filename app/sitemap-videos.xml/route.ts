export const dynamic = "force-dynamic";

const BASE = "https://www.jaetravel.co.ke";

export async function GET() {
  // Video sitemap for JaeTravel Expeditions
  // Add videos as they are created/uploaded
  const videos = [
    {
      loc: `${BASE}/videos/WhatsApp Video 2025-10-14 at 5.15.38 PM.mp4`,
      title: "Wheelchair Accessible Safari Kenya 2026 - Hydraulic Lift Demo",
      description: "See our German hydraulic lift wheelchair accessible safari vehicle in action. 400kg capacity, stay in your own wheelchair, expert guides for Masai Mara, gorilla trekking and all East Africa destinations.",
      thumbnail_loc: `${BASE}/accessible-safari-wheelchair.jpg`,
      publication_date: "2025-10-14",
      family_friendly: "yes",
      tag: "wheelchair safari, accessible safari kenya, disabled travel africa, safari vehicle, masai mara",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos.map((video) => `  <url>
    <loc>${BASE}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnail_loc}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${video.loc}</video:content_loc>
      <video:player_loc allow_embed="yes" autoplay="autoplay=1">${video.loc}</video:player_loc>
      <video:publication_date>${video.publication_date}</video:publication_date>
      <video:family_friendly>${video.family_friendly}</video:family_friendly>
      <video:tag>${video.tag}</video:tag>
      <video:category>Travel</video:category>
      <video:restriction relationship="allow">all</video:restriction>
      <video:gallery_loc title="JaeTravel Expeditions">${BASE}/tours</video:gallery_loc>
    </video:video>
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