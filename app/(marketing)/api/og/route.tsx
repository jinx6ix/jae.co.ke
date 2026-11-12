// app/(marketing)/api/og/route.tsx
//
// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Open Graph / Twitter card image.
//
// Why
// ───
// The site referenced per-page OG images such as
// /og-vehicle-hire.jpg, /og-disability-tours.jpg and
// /og-budget-tours.jpg — none of which exist in /public. Every share of
// those pages therefore rendered a broken preview.
//
// This route generates a real 1200×630 card for any page, using the
// page's own title, description and (optionally) a photo, so a shared
// link always shows something meaningful without maintaining a static
// image per page.
//
// Usage
// ──────
//   /api/og?title=...&subtitle=...&image=<absolute-url>
//
// It is also reachable as /api/og/<slug> — see the dynamic segment
// route below.
//
// Rendering uses `next/og`'s ImageResponse, which runs on the edge
// runtime and needs no external image service.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

const BRAND = "JaeTravel Expeditions"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = (searchParams.get("title") || "Accessible East Africa Safaris").slice(
    0,
    120
  )
  const subtitle = (
    searchParams.get("subtitle") ||
    "Wheelchair-accessible safaris and vehicle hire in Kenya, Tanzania, Rwanda and Uganda"
  ).slice(0, 180)
  const image = searchParams.get("image")
  const badge = searchParams.get("badge")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Scrim so the text stays legible over any photo. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 100%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#c2410c",
              color: "white",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            J
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
              color: "white",
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
              {BRAND}
            </div>
            <div style={{ fontSize: 22, opacity: 0.85 }}>East Africa Safari Experts</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          {badge ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "10px 22px",
                borderRadius: 999,
                background: "#c2410c",
                color: "white",
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              {badge}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              marginBottom: 22,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.88)",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            borderTop: "2px solid rgba(255,255,255,0.25)",
            paddingTop: 26,
            color: "rgba(255,255,255,0.85)",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>www.jaetravel.co.ke</div>
          <div style={{ display: "flex" }}>Kenya · Tanzania · Rwanda · Uganda</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  )
}
