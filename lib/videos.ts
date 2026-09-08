// lib/videos.ts
//
// Public video helpers for JaeTravel.
// Videos are hosted externally on YouTube or Instagram.
// Payload stores the metadata and the public JaeTravel page is:
//
//   /watch/[slug]
//
// IMPORTANT:
// - Only published Payload videos are exposed.
// - Draft videos are never returned to public pages or sitemaps.
// - Payload access control is intentionally bypassed here because we
//   explicitly enforce `_status: published` in every public query.
// - The helpers are cached and invalidated through the videos-sitemap tag.

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export type VideoProvider = 'youtube' | 'instagram' | (string & {})

export interface PublicVideo {
  id: number | string
  provider: VideoProvider
  externalId: string
  url: string
  slug: string
  title: string | null
  description: string | null
  thumbnailUrl: string | null
  publishedAt: string | null
  durationSeconds: number | null
  syncedAt: string | null
}

const COLLECTION = 'videos' as const

const PAGE_SIZE = 100

/**
 * Normalize a Payload video document into the small public shape used
 * by pages, metadata and sitemaps.
 */
function normalizeVideo(raw: unknown): PublicVideo | null {
  if (!raw || typeof raw !== 'object') return null

  const r = raw as Record<string, unknown>

  const id = (r.id as number | string | undefined) ?? ''

  const slug =
    typeof r.slug === 'string'
      ? r.slug.trim()
      : ''

  if (!slug) return null

  return {
    id,

    provider:
      typeof r.provider === 'string'
        ? (r.provider as VideoProvider)
        : 'youtube',

    externalId:
      typeof r.externalId === 'string'
        ? r.externalId.trim()
        : '',

    url:
      typeof r.url === 'string'
        ? r.url.trim()
        : '',

    slug,

    title:
      typeof r.title === 'string'
        ? r.title.trim()
        : null,

    description:
      typeof r.description === 'string'
        ? r.description.trim()
        : null,

    thumbnailUrl:
      typeof r.thumbnailUrl === 'string'
        ? r.thumbnailUrl.trim()
        : null,

    publishedAt:
      typeof r.publishedAt === 'string'
        ? r.publishedAt
        : null,

    durationSeconds:
      typeof r.durationSeconds === 'number'
        ? r.durationSeconds
        : null,

    syncedAt:
      typeof r.syncedAt === 'string'
        ? r.syncedAt
        : null,
  }
}

/**
 * Fetch all published video slugs.
 *
 * Pagination prevents the old hard 1000-record ceiling.
 */
async function fetchAllVideoSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const slugs: string[] = []

  let page = 1

  while (true) {
    const result = await payload.find({
      collection: COLLECTION,

      where: {
        _status: {
          equals: 'published',
        },
      },

      page,
      limit: PAGE_SIZE,

      depth: 0,

      overrideAccess: true,
    })

    for (const doc of result.docs) {
      const raw = doc as unknown as Record<string, unknown>

      if (typeof raw.slug === 'string') {
        const slug = raw.slug.trim()

        if (slug) {
          slugs.push(slug)
        }
      }
    }

    if (
      result.hasNextPage !== true ||
      result.nextPage == null
    ) {
      break
    }

    page = result.nextPage
  }

  return [...new Set(slugs)]
}

/**
 * Fetch one published video by public slug.
 */
async function fetchVideoBySlug(
  slug: string,
): Promise<PublicVideo | null> {
  const payload = await getPayload({ config })

  const cleanSlug = slug.trim()

  if (!cleanSlug) {
    return null
  }

  const result = await payload.find({
    collection: COLLECTION,

    where: {
      and: [
        {
          slug: {
            equals: cleanSlug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },

    limit: 1,

    depth: 0,

    overrideAccess: true,
  })

  const doc = result.docs[0]

  if (!doc) {
    return null
  }

  return normalizeVideo(doc)
}

/**
 * Fetch all published videos.
 *
 * This is used by:
 * - sitemap-videos.xml
 * - video indexes
 * - other public discovery surfaces
 *
 * Only published records are returned.
 */
async function fetchAllVideos(): Promise<PublicVideo[]> {
  const payload = await getPayload({ config })

  const videos: PublicVideo[] = []

  let page = 1

  while (true) {
    const result = await payload.find({
      collection: COLLECTION,

      where: {
        _status: {
          equals: 'published',
        },
      },

      page,
      limit: PAGE_SIZE,

      depth: 0,

      overrideAccess: true,
    })

    for (const doc of result.docs) {
      const video = normalizeVideo(doc)

      if (video) {
        videos.push(video)
      }
    }

    if (
      result.hasNextPage !== true ||
      result.nextPage == null
    ) {
      break
    }

    page = result.nextPage
  }

  return videos
}

/**
 * Cached public slug list.
 */
const getCachedAllSlugs = unstable_cache(
  async () => fetchAllVideoSlugs(),
  ['videos:all-slugs'],
  {
    tags: ['videos-sitemap'],
    revalidate: 3600,
  },
)

/**
 * Cached single-video lookup.
 */
const getCachedBySlug = unstable_cache(
  async (slug: string) => fetchVideoBySlug(slug),
  ['videos:by-slug'],
  {
    tags: ['videos-sitemap'],
    revalidate: 3600,
  },
)

/**
 * Cached complete published-video list.
 */
const getCachedAll = unstable_cache(
  async () => fetchAllVideos(),
  ['videos:all'],
  {
    tags: ['videos-sitemap'],
    revalidate: 3600,
  },
)

/**
 * Public list of video slugs.
 */
export async function getAllVideoSlugs(): Promise<string[]> {
  try {
    return await getCachedAllSlugs()
  } catch (err) {
    console.error(
      '[lib/videos] getAllVideoSlugs failed:',
      err,
    )

    // Returning [] here is safe for page generation.
    // The sitemap itself does NOT use this helper, so a database
    // failure cannot silently become a fake empty sitemap.
    return []
  }
}

/**
 * Public lookup by slug.
 */
export async function getVideoBySlug(
  slug: string,
): Promise<PublicVideo | null> {
  try {
    return await getCachedBySlug(slug)
  } catch (err) {
    console.error(
      '[lib/videos] getVideoBySlug failed:',
      err,
    )

    return null
  }
}

/**
 * Public list of all published videos.
 *
 * NOTE:
 * The sitemap route can choose to query directly if it needs
 * to distinguish between "no videos" and "database failure".
 */
export async function getAllVideos(): Promise<PublicVideo[]> {
  try {
    return await getCachedAll()
  } catch (err) {
    console.error(
      '[lib/videos] getAllVideos failed:',
      err,
    )

    return []
  }
}