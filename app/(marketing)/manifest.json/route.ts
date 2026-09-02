export async function GET() {
  const manifest = {
    name: "JaeTravel Expeditions",
    short_name: "JaeTravel",
    description:
      "East Africa Safari Tours & Accessible Travel - Kenya, Tanzania, Rwanda, Uganda wildlife safaris and gorilla trekking",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
