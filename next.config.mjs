/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  // ❌ Removed (can break routing + assets on Vercel)
  // skipTrailingSlashRedirect: true,

  // Image Optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jaetravel.co.ke',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,

  async headers() {
    return [
      // ❌ REMOVED: NEVER touch _next/static or _next/image on Vercel
      // This was the root cause of your MIME type error

      // ✅ Cache fonts only (safe)
      {
        source: '/(.*).(woff2|woff|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // 🚫 SEO CONTROL
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },

      // 🔐 Security headers (safe globally)
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jaetravel.co.ke' }],
        destination: 'https://www.jaetravel.co.ke/:path*',
        permanent: true,
      },

      // Legacy redirects
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'p', value: '2056' }],
        destination: 'https://www.jaetravel.co.ke/tour/kenya-cultural-tour',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'p', value: '2121' }],
        destination: 'https://www.jaetravel.co.ke/tour/tanzania-wildlife-adventure',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'p', value: '2092' }],
        destination: 'https://www.jaetravel.co.ke/tour/rwanda-gorilla-trekking',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          { type: 'query', key: 'post_type', value: 'ht_tour' },
          { type: 'query', key: 'p', value: '2672' },
        ],
        destination: 'https://www.jaetravel.co.ke/tour/east-africa-luxury-safari',
        permanent: true,
      },
    ];
  },

  // Build (cleaned for Next.js 16)
  typescript: { ignoreBuildErrors: true },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  transpilePackages: [],
};

export default nextConfig;