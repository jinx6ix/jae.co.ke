// lib/cms-tours.ts
//
// Read-side helper for the public `tour/[slug]` and `tours/[slug]`
// pages. Lets the marketing copy (title, shortDescription, description,
// highlights, gallery, meta) come from the Payload `tours` collection
// while the rest of the page (itinerary, included/excluded, duration,
// difficulty, groupSize, country, category, rating, reviewCount, image)
// still hydrates from `lib/tours-data.ts`.
//
// Caching: `unstable_cache` with a 1h revalidate, tagged
// `tour:<slug>`. The Tours collection doesn't yet have a custom
// revalidate hook — when it does, add `revalidateTag('tour:<slug>')`
// to bust the cache on publish.

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Tour as CmsTour } from '@cms/payload-types'

type RichTour = {
  // From CMS (may be null if not present in Payload yet)
  cms: CmsTour | null
  // Slug this was looked up by
  slug: string
}

/**
 * Look up a published tour in the Payload `tours` collection by slug.
 * Returns the doc (with depth 2 for hero media) or null if the tour
 * hasn't been migrated to CMS yet — callers should then fall back to
 * the static `lib/tours-data.ts` for the full tour record.
 */
export async function getCmsTourBySlug(slug: string): Promise<CmsTour | null> {
  const safeSlug = slug?.trim()
  if (!safeSlug) return null

  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'tours',
          where: {
            and: [
              { slug: { equals: safeSlug } },
              { _status: { equals: 'published' } },
            ],
          },
          limit: 1,
          depth: 2,
          overrideAccess: false,
        })
        return (result.docs[0] as CmsTour | undefined) ?? null
      } catch (err) {
        // Mongo/Payload not reachable in this env — fall through to static
        console.warn(`[cms-tours] lookup failed for ${safeSlug}:`, err)
        return null
      }
    },
    ['cms-tour-by-slug', safeSlug],
    {
      revalidate: 3600,
      tags: ['cms-tours', `tour:${safeSlug}`],
    },
  )

  return getCached()
}

/**
 * Look up a published tour by its jaedb `TourPackage.id` — the value
 * stored in the `jaedbTourPackageId` field of a CMS Tour doc. Used
 * to join a marketing doc with its structured tour data (itinerary
 * days, durations, countries) in a follow-up.
 *
 * For now this returns the CMS doc only; the join logic is the
 * next chunk of work.
 */
export async function getCmsTourByJaedbId(
  jaedbTourPackageId: string,
): Promise<CmsTour | null> {
  const safeId = jaedbTourPackageId?.trim()
  if (!safeId) return null

  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'tours',
          where: {
            and: [
              { jaedbTourPackageId: { equals: safeId } },
              { _status: { equals: 'published' } },
            ],
          },
          limit: 1,
          depth: 2,
          overrideAccess: false,
        })
        return (result.docs[0] as CmsTour | undefined) ?? null
      } catch (err) {
        console.warn(`[cms-tours] lookup failed for jaedbId ${safeId}:`, err)
        return null
      }
    },
    ['cms-tour-by-jaedb', safeId],
    {
      revalidate: 3600,
      tags: ['cms-tours', `tour:jaedb:${safeId}`],
    },
  )

  return getCached()
}

/**
 * Convenience: which slugs exist in the CMS tours collection, for
 * `generateStaticParams` on the public [slug] pages. Pairs with
 * `tours.map(t => t.slug)` from the static data so the build can
 * emit pages for all of them.
 */
export async function listCmsTourSlugs(): Promise<string[]> {
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'tours',
          where: { _status: { equals: 'published' } },
          limit: 5000,
          depth: 0,
          overrideAccess: false,
        })
        return result.docs
          .map((d) => (d as CmsTour).slug)
          .filter((s): s is string => typeof s === 'string' && s.length > 0)
      } catch (err) {
        console.warn('[cms-tours] listCmsTourSlugs failed:', err)
        return []
      }
    },
    ['cms-tour-slugs'],
    {
      revalidate: 3600,
      tags: ['cms-tours'],
    },
  )

  return getCached()
}

// Internal helper used by the page wrappers below to merge CMS overrides
// onto a static-data record.
export type { CmsTour, RichTour }
