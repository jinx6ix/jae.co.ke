
// lib/videos.ts
//
// Public video data access.
//
// The Videos collection does NOT use Payload drafts/versions, so there is
// no `_status` field to filter on. A video is considered published/public
// when it has a publishedAt value.
//
// This module is used by:
//   - /watch/[slug]
//   - video metadata / SEO
//   - sitemap generation
//   - video sitemap generation
//
// The collection itself is:
//   cms/collections/Videos/index.ts
//
// Important:
// - Do not query `_status` here.
// - Existing videos have now been backfilled with slugs.
// - Instagram videos may have an empty title, so normalization provides
//   a safe fallback title.
// - Cache invalidation uses the `videos-sitemap` tag.

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'

export interface PublicVideo {
  id: string
  provider: 'youtube' | 'instagram'
  externalId: string
  url: string
  slug: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  durationSeconds?: number | null
}

type PayloadVideo = {
  id?: string
  provider?: 'youtube' | 'instagram' | string | null
  externalId?: string | null
  url?: string | null
  slug?: string | null
  title?: string | null
  description?: string | null
  thumbnailUrl?: string | null
  publishedAt?: string | null
  durationSeconds?: number | null
}

/**
 * Convert a Payload video document into the safe public shape.
 *
 * Returns null when the document doesn't contain enough information
 * to create a valid public video page/sitemap entry.
 */
function normalizeVideo(raw: PayloadVideo): PublicVideo | null {
  const id = raw.id?.toString().trim()
  const provider = raw.provider
  const externalId = raw.externalId?.toString().trim()
  const url = raw.url?.toString().trim()
  const slug = raw.slug?.toString().trim()
  const thumbnailUrl = raw.thumbnailUrl?.toString().trim()
  const publishedAt = raw.publishedAt?.toString().trim()

  if (!id) return null

  if (provider !== 'youtube' && provider !== 'instagram') {
    return null
  }

  if (!externalId) return null
  if (!url) return null
  if (!slug) return null
  if (!thumbnailUrl) return null
  if (!publishedAt) return null

  const title = raw.title?.toString().trim() || ''

  const description = raw.description?.toString().trim() || ''

  // Instagram records in the current database can have an empty title.
  // Use the first useful description line as a better fallback.
  const fallbackTitle =
    title ||
    description
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean) ||
    `${provider === 'youtube' ? 'YouTube' : 'Instagram'} video`

  return {
    id,
    provider,
    externalId,
    url,
    slug,
    title: fallbackTitle,
    description,
    thumbnailUrl,
    publishedAt,
    durationSeconds:
      typeof raw.durationSeconds === 'number' &&
      Number.isFinite(raw.durationSeconds) &&
      raw.durationSeconds >= 0
        ? raw.durationSeconds
        : null,
  }
}

/**
 * Create the Payload client.
 */
async function getPayloadClient() {
  return getPayload({
    config,
  })
}

/**
 * Fetch every public video slug.
 *
 * The Videos collection doesn't have Payload drafts enabled, therefore
 * `_status` must NOT be used here.
 */
async function fetchAllVideoSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'videos',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
    where: {
      publishedAt: {
        exists: true,
      },
    },
  })

  return result.docs
    .map((doc) => normalizeVideo(doc as PayloadVideo))
    .filter((video): video is PublicVideo => video !== null)
    .map((video) => video.slug)
}

/**
 * Cached list of public video slugs.
 *
 * Used by generateStaticParams() for /watch/[slug].
 */
export const getAllVideoSlugs = unstable_cache(
  async () => fetchAllVideoSlugs(),
  ['videos-all-slugs'],
  {
    tags: ['videos-sitemap'],
    revalidate: 300,
  },
)

/**
 * Fetch a single public video by slug.
 *
 * A video must:
 * - have the requested slug
 * - have publishedAt set
 */
async function fetchVideoBySlug(slug: string): Promise<PublicVideo | null> {
  const cleanSlug = slug.trim()

  if (!cleanSlug) {
    return null
  }

  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'videos',
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: {
      and: [
        {
          slug: {
            equals: cleanSlug,
          },
        },
        {
          publishedAt: {
            exists: true,
          },
        },
      ],
    },
  })

  const doc = result.docs[0]

  if (!doc) {
    return null
  }

  return normalizeVideo(doc as PayloadVideo)
}

/**
 * Cached public video lookup.
 *
 * Used by:
 * - /watch/[slug]
 * - generateMetadata()
 * - video SEO schema
 */
export const getVideoBySlug = unstable_cache(
  async (slug: string) => fetchVideoBySlug(slug),
  ['video-by-slug'],
  {
    tags: ['videos-sitemap'],
    revalidate: 300,
  },
)

/**
 * Fetch all public videos.
 *
 * Used by sitemap/SEO code and other public-facing video listings.
 */
async function fetchAllVideos(): Promise<PublicVideo[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'videos',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
    where: {
      publishedAt: {
        exists: true,
      },
    },
    sort: '-publishedAt',
  })

  return result.docs
    .map((doc) => normalizeVideo(doc as PayloadVideo))
    .filter((video): video is PublicVideo => video !== null)
}

/**
 * Cached list of all public videos.
 */
export const getAllVideos = unstable_cache(
  async () => fetchAllVideos(),
  ['videos-all'],
  {
    tags: ['videos-sitemap'],
    revalidate: 300,
  },
)
