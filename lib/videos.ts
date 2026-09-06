// lib/videos.ts
//
// Public read helpers for the `videos` collection. Mirrors the
// `lib/posts.ts` pattern: every query is wrapped in `unstable_cache` with
// a 1h TTL plus the `videos-sitemap` tag, so the same revalidation hook
// that busts the sitemap (cms/collections/Videos/hooks/revalidateVideo.ts)
// also busts the helpers. A new IG reel becomes indexable on /watch/[slug]
// within seconds of being saved in the CMS, not after the 1h window.

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export type VideoProvider = 'youtube' | 'instagram' | (string & {})

/** Shape of a single Video document as the public helpers need it. */
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

async function fetchAllVideoSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: COLLECTION,
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })
  return (result.docs as unknown as Array<{ slug?: string | null }>)
    .map((v) => (typeof v.slug === 'string' ? v.slug.trim() : ''))
    .filter((s): s is string => s.length > 0)
}

async function fetchVideoBySlug(slug: string): Promise<PublicVideo | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: COLLECTION,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const doc = result.docs[0]
  if (!doc) return null
  return normalizeVideo(doc)
}

async function fetchAllVideos(): Promise<PublicVideo[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: COLLECTION,
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })
  return (result.docs as unknown as Array<Record<string, unknown>>)
    .map(normalizeVideo)
    .filter((v): v is PublicVideo => Boolean(v.slug))
}

function normalizeVideo(raw: unknown): PublicVideo | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const id = (r.id as number | string | undefined) ?? ''
  const slug = typeof r.slug === 'string' ? r.slug.trim() : ''
  if (!slug) return null
  return {
    id,
    provider: (r.provider as VideoProvider) ?? 'youtube',
    externalId: (r.externalId as string) ?? '',
    url: (r.url as string) ?? '',
    slug,
    title: (r.title as string | null) ?? null,
    description: (r.description as string | null) ?? null,
    thumbnailUrl: (r.thumbnailUrl as string | null) ?? null,
    publishedAt: (r.publishedAt as string | null) ?? null,
    durationSeconds: (r.durationSeconds as number | null) ?? null,
    syncedAt: (r.syncedAt as string | null) ?? null,
  }
}

// Cache wrappers — same tag, same TTL as the sitemap route, so a single
// revalidateTag('videos-sitemap') call from the CMS hook invalidates
// everything video-related in lock-step.
const getCachedAllSlugs = unstable_cache(
  async () => fetchAllVideoSlugs(),
  ['videos:all-slugs'],
  { tags: ['videos-sitemap'], revalidate: 3600 },
)

const getCachedBySlug = unstable_cache(
  async (slug: string) => fetchVideoBySlug(slug),
  ['videos:by-slug'],
  { tags: ['videos-sitemap'], revalidate: 3600 },
)

const getCachedAll = unstable_cache(
  async () => fetchAllVideos(),
  ['videos:all'],
  { tags: ['videos-sitemap'], revalidate: 3600 },
)

/** Slugs for `generateStaticParams` — every video with a slug. */
export async function getAllVideoSlugs(): Promise<string[]> {
  try {
    return await getCachedAllSlugs()
  } catch (err) {
    console.warn('[lib/videos] getAllVideoSlugs failed:', err)
    return []
  }
}

/** One video by slug, or null if not found. */
export async function getVideoBySlug(slug: string): Promise<PublicVideo | null> {
  try {
    return await getCachedBySlug(slug)
  } catch (err) {
    console.warn('[lib/videos] getVideoBySlug failed:', err)
    return null
  }
}

/** Every video — used by the sitemap to compute <loc> for each one. */
export async function getAllVideos(): Promise<PublicVideo[]> {
  try {
    return await getCachedAll()
  } catch (err) {
    console.warn('[lib/videos] getAllVideos failed:', err)
    return []
  }
}
