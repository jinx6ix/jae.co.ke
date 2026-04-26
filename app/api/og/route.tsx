import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "JaeTravel Expeditions";
  const image = searchParams.get("image") || "https://www.jaetravel.co.ke/og-default.jpg";
  const locale = searchParams.get("locale") || "en";

  const isRTL = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          position: "relative",
          fontFamily: "sans-serif",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* Background */}
        <img
          title="OG Image Background"
          src={image}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: "#f97316",
              fontWeight: 600,
            }}
          >
            JaeTravel Expeditions
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}