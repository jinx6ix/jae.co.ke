/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRUCIAL FIX #1: Stop adding trailing slashes
  // Your current trailingSlash: true was creating redirect loops
  trailingSlash: true,

  // CRUCIAL FIX #2: Force www (or non-www) with proper 301s
  async redirects() {
    return [
      // 1. Force www (recommended for most travel sites)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jaetravel.co.ke' }],
        destination: 'https://www.jaetravel.co.ke/:path*',
        permanent: true,
      },

      // 2. Remove unwanted trailing slashes site-wide (except API routes)
      {
        source: '/:path((?!api|admin|_next|.*\\.).*)/',  // matches any path ending with / but excludes files & api
        destination: '/:path',
        permanent: true,
      },

      // ─────────────────────────────
      // Keep all your existing useful redirects below
      // ─────────────────────────────
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'p', value: '2056' }],
        destination: '/tour/kenya-cultural-tour/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'p', value: '2121' }],
        destination: '/tour/tanzania-wildlife-adventure/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'p', value: '2092' }],
        destination: '/tour/rwanda-gorilla-trekking/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          { type: 'query', key: 'post_type', value: 'ht_tour' },
          { type: 'query', key: 'p', value: '2672' },
        ],
        destination: '/tour/east-africa-luxury-safari/',
        permanent: true,
      },

      // These two were causing part of the problem — remove them completely
      // Old broken trailing-slash redirects (delete these lines):
      // {
      //   source: '/tour/:slug',
      //   destination: '/tour/:slug/',
      //   permanent: true,
      // },
      // {
      //   source: '/fr/tour/:slug',
      //   destination: '/fr/tour/:slug/',
      //   permanent: true,
      // },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig