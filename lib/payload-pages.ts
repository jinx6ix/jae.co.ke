// lib/payload-pages.ts
//
// Thin helper that fetches a single Page doc by slug from the Payload
// `pages` collection. Used by the public Next.js marketing routes
// (`app/(marketing)/<slug>/page.tsx` and the catch-all
// `app/(marketing)/[...path]/page.tsx`) so every page renders from
// the CMS instead of the static `lib/*-data.ts` files.
//
// Caching strategy mirrors `lib/brand-media.ts`:
//   * `unstable_cache` with a 1h revalidate wraps the Mongo query so
//     Vercel only pays for one query per hour per page.
//   * The cache is tagged `page:<slug>`. The Pages collection's
//     `revalidatePage` hook busts that tag the moment an editor
//     publishes a change, so the public page reflects the edit on
//     the very next request — not an hour later.

import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Page } from '@cms/payload-types'

/**
 * Fetch a published Page by slug. Returns the doc, or calls `notFound()`
 * (which throws — this function never returns null/undefined to the caller).
 *
 * @param slug    The page's URL slug, e.g. "about" or "tours". The home
 *                page is slug "home" — pass that for `/`.
 * @param locale  Optional locale filter. When provided, narrows the lookup
 *                to a Pages doc whose `locale` field matches. Omit (or pass
 *                "en") to fetch the English/canonical page.
 * @param depth   Population depth. Default 2 so hero media + nested
 *                upload references resolve to objects, not just ids.
 */
export async function getPageBySlug(
  slug: string,
  locale: string = 'en',
  depth = 2,
): Promise<Page> {
  const safeSlug = slug?.trim()
  if (!safeSlug) notFound()
  const safeLocale = locale?.trim() || 'en'

  const getCached = unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'pages',
        where: {
          and: [
            { slug: { equals: safeSlug } },
            { _status: { equals: 'published' } },
            { locale: { equals: safeLocale } },
          ],
        },
        limit: 1,
        depth,
        overrideAccess: false,
      })
      return result.docs[0] as Page | undefined
    },
    ['page-by-slug', safeSlug, safeLocale, String(depth)],
    {
      revalidate: 3600,
      tags: ['pages', `page:${safeSlug}`, `page:${safeLocale}:${safeSlug}`],
    },
  )

  const page = await getCached()
  if (!page) notFound()
  return page
}
