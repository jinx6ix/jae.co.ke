// next.config.ts
//
// One config for the whole merged app. Order of what came from where:
//   - images / headers / redirects / compiler / typescript: website
//   - serverExternalPackages: jaedb (Prisma + bcrypt need this to run
//     as real Node modules rather than being bundled)
//   - sassOptions / webpack / turbopack / images.localPatterns: Payload
//     — REQUIRED for the admin UI at /admin to build and run at all
//   - the whole thing is wrapped in withPayload(), which is also
//     required — Payload hooks into the Next.js build step itself, not
//     just individual routes.
//
// Dropped: Payload's stock "IE incompatible" redirect. It pointed at
// /ie-incompatible.html, which doesn't exist anywhere in this project
// (the template ships the redirect rule but not the page) — including
// it as-is would have sent any legacy-Trident visitor to a 404. If you
// want it back, add public/ie-incompatible.html and the rule can be
// restored from the original payload-cms/redirects.ts you were given.

import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000';

const nextConfig: NextConfig = {
  trailingSlash: false,

  images: {
    // Was `unoptimized: true` — that skipped Next's image optimizer
    // entirely, which hurts Core Web Vitals (LCP) once real photos
    // flow through /admin. Now optimized; every external domain
    // actually used in the codebase (checked via grep, not assumed)
    // is listed below — add to this list if a new external image
    // source gets used somewhere.
    remotePatterns: [
      { protocol: 'https', hostname: 'www.jaetravel.co.ke', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }, // stock photos used in several specialty landing pages
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' }, // YouTube video thumbnails (components/YouTubeEmbed.tsx)
      { protocol: 'https', hostname: 'ik.imagekit.io', pathname: '/**' }, // ImageKit (Vehicle/Tour images)
      // Media collection uses local staticDir storage (see
      // cms/collections/Media.ts) — served at /media/*, not through
      // the /cms-api prefix. Covers whatever origin this deploys to.
      (() => {
        const url = new URL(NEXT_PUBLIC_SERVER_URL);
        return { hostname: url.hostname, protocol: url.protocol.replace(':', '') as 'http' | 'https', pathname: '/media/**' };
      })(),
    ],
    localPatterns: [
      { pathname: '/media/**' },
      // Image files can live anywhere in /public — root (logo, hero
      // images, hash-named avif/webp fallbacks) and any subdirectory
      // (/team/, /awards/, /destinations/, etc.). Both root-level and
      // recursive patterns are listed because some glob implementations
      // treat `**` as "one or more segments" and won't match a
      // single-segment path like /logo.png. .avif is included because
      // Next's image optimizer emits AVIF files in /public even when
      // the source was a .jpg or .png.
      { pathname: '/*.png' },
      { pathname: '/*.jpg' },
      { pathname: '/*.jpeg' },
      { pathname: '/*.webp' },
      { pathname: '/*.svg' },
      { pathname: '/*.gif' },
      { pathname: '/*.ico' },
      { pathname: '/*.avif' },
      { pathname: '/**/*.png' },
      { pathname: '/**/*.jpg' },
      { pathname: '/**/*.jpeg' },
      { pathname: '/**/*.webp' },
      { pathname: '/**/*.svg' },
      { pathname: '/**/*.gif' },
      { pathname: '/**/*.ico' },
      { pathname: '/**/*.avif' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [100],
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,

  serverExternalPackages: ['@prisma/client', 'bcryptjs'],

  // Payload's sass entry points — paths updated from the original
  // template's ./src to ./cms, matching where Payload's code actually
  // lives in this merged project.
  sassOptions: {
    includePaths: [
      './cms',
      './cms/scss',
      './cms/styles',
      path.join(process.cwd(), 'node_modules/@payloadcms/ui/dist/scss'),
    ],
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return webpackConfig;
  },

  turbopack: {
    root: path.resolve(dirname),
  },

  async headers() {
    return [
      // ── Language-specific cache headers (website) ──
      {
        source: '/(fr|de|it|hi|ar|zh)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' },
          { key: 'Vary', value: 'Accept-Language' },
        ],
      },
      // ── Font caching (website) ──
      {
        source: '/(.*).(woff2|woff|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // ── Block private paths from indexing (website + extended for ops/cms) ──
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/dashboard/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/cms-api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      // ── Security headers (website, global) ──
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ── www canonical (website) ──
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jaetravel.co.ke' }],
        destination: 'https://www.jaetravel.co.ke/:path*',
        permanent: true,
      },
      // ── Legacy query-param redirects (website) ──
      { source: '/:path*', has: [{ type: 'query', key: 'p', value: '2056' }], destination: 'https://www.jaetravel.co.ke/tour/kenya-cultural-tour', permanent: true },
      { source: '/:path*', has: [{ type: 'query', key: 'p', value: '2121' }], destination: 'https://www.jaetravel.co.ke/tour/tanzania-wildlife-adventure', permanent: true },
      { source: '/:path*', has: [{ type: 'query', key: 'p', value: '2092' }], destination: 'https://www.jaetravel.co.ke/tour/rwanda-gorilla-trekking', permanent: true },
      // ── Old French routes (website) ──
      { source: '/fr/author/:path*', destination: '/fr', permanent: true },
      { source: '/fr/produit/:path*', destination: '/fr/vehicle-hire', permanent: true },
    ];
  },

  typescript: { ignoreBuildErrors: true },
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
