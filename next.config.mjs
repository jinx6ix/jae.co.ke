/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true,        // This kills all trailing-slash issues forever

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

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;