// lib/cms-destinations.ts
//
// Read-side helper for the public `destinations/[country]` page. Lets
// the marketing copy (description, longDescription, highlights, best
// time, best for, wildlife, gallery) come from the Payload
// `destinations` collection while the rest still hydrates from
// `lib/destinations-data.ts`.
//
// Caching: `unstable_cache` with a 1h revalidate, tagged
// `destination:<slug>`. The Destinations collection doesn't yet have
// a custom revalidate hook — when it does, add
// `revalidateTag('destination:<slug>')` to bust the cache on publish.

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Destination as CmsDestination } from '@cms/payload-types'

export async function getCmsDestinationBySlug(
  slug: string,
): Promise<CmsDestination | null> {
  const safeSlug = slug?.trim()
  if (!safeSlug) return null

  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'destinations',
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
        return (result.docs[0] as CmsDestination | undefined) ?? null
      } catch (err) {
        console.warn(`[cms-destinations] lookup failed for ${safeSlug}:`, err)
        return null
      }
    },
    ['cms-destination-by-slug', safeSlug],
    {
      revalidate: 3600,
      tags: ['cms-destinations', `destination:${safeSlug}`],
    },
  )

  return getCached()
}

export async function listCmsDestinationSlugs(): Promise<string[]> {
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'destinations',
          where: { _status: { equals: 'published' } },
          limit: 200,
          depth: 0,
          overrideAccess: false,
        })
        return result.docs
          .map((d) => (d as CmsDestination).slug)
          .filter((s): s is string => typeof s === 'string' && s.length > 0)
      } catch (err) {
        console.warn('[cms-destinations] listCmsDestinationSlugs failed:', err)
        return []
      }
    },
    ['cms-destination-slugs'],
    {
      revalidate: 3600,
      tags: ['cms-destinations'],
    },
  )
  return getCached()
}
