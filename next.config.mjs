/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "www.jaetravel.co.ke", pathname: "/**" }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,

  // ── I18n — tells Next.js about all locale prefixes ──
  // NOTE: Using manual subdirectory routing (not Next.js i18n routing)
  // so we do NOT set i18n here — subdirectory pages are in app/fr/, app/de/ etc.

  async headers() {
    return [
      // ── Language-specific cache headers ──
      {
        source: "/(fr|de|it|hi|ar|zh)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
          { key: "Vary", value: "Accept-Language" },
        ],
      },
      // ── Font caching ──
      {
        source: "/(.*).(woff2|woff|ttf|otf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // ── Block private paths ──
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      // ── Security headers (global) ──
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // ── www canonical ──
      {
        source: "/:path*",
        has: [{ type: "host", value: "jaetravel.co.ke" }],
        destination: "https://www.jaetravel.co.ke/:path*",
        permanent: true,
      },
      // ── Legacy redirects ──
      { source: "/:path*", has: [{ type: "query", key: "p", value: "2056" }], destination: "https://www.jaetravel.co.ke/tour/kenya-cultural-tour", permanent: true },
      { source: "/:path*", has: [{ type: "query", key: "p", value: "2121" }], destination: "https://www.jaetravel.co.ke/tour/tanzania-wildlife-adventure", permanent: true },
      { source: "/:path*", has: [{ type: "query", key: "p", value: "2092" }], destination: "https://www.jaetravel.co.ke/tour/rwanda-gorilla-trekking", permanent: true },
      // ── Old French routes redirect to new structure ──
      { source: "/fr/author/:path*", destination: "/fr", permanent: true },
      { source: "/fr/produit/:path*", destination: "/fr/vehicle-hire", permanent: true },
    ]
  },

  typescript: { ignoreBuildErrors: true },
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
}

export default nextConfig
