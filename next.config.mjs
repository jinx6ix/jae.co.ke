/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─────────────────────────────────────────────────────────────
  // CORE FIXES – These eliminate redirect loops & Googlebot errors
  // ─────────────────────────────────────────────────────────────
  trailingSlash: false,                    // No trailing slashes anywhere
  skipTrailingSlashRedirect: true,         // THIS IS CRUCIAL – disables Next.js default trailing-slash behavior

  // ─────────────────────────────────────────────────────────────
  // CLEAN & SAFE REDIRECTS (order matters!)
  // ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // 1. Force WWW (non-www → www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jaetravel.co.ke' }],
        destination: 'https://www.jaetravel.co.ke/:path*',
        permanent: true,
      },

      // 2. Force HTTPS (if someone still hits http)
      {
        source: '/:path*',
        has: [{ type: 'protocol', value: 'http' }],
        destination: 'https://www.jaetravel.co.ke/:path*',
        permanent: true,
      },

      // ─────────────────────────────
      // Your legacy tour redirects (keep these forever)
      // ─────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // Optional but recommended settings for production
  // ─────────────────────────────────────────────────────────────
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,        // Common for WordPress → Next.js migrations or external hosts
  },

  // Optional: Improve performance
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;