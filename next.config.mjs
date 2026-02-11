/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true, // This kills all trailing-slash issues forever

  // CSS Optimization for Performance
  experimental: {
    inlineCss: true, // Automatically optimizes and inlines critical CSS
  },

  // Image Optimization ni mbaya
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
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compression & Performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,

  // Headers for Caching
  async headers() {
    return [
      // Cache CSS, JS, fonts aggressively
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/_next/image/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache fonts
      {
        source: '/(.*).(woff2|woff|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security headers
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

  // Redirects (keeping your existing redirects)
  async redirects() {
    return [
      // 1. Non-www → www (works perfectly on Vercel)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jaetravel.co.ke' }],
        destination: 'https://www.jaetravel.co.ke/:path*',
        permanent: true,
      },

      // 2. HTTP → HTTPS is handled automatically by Vercel
      //    → No need for a redirect rule anymore (and it breaks the build if you try)

      // Your legacy tour redirects (keep these)
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

  // Build optimizations
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Transpile critical dependencies if needed
  transpilePackages: [],
};

export default nextConfig;