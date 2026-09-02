// lib/cms-budget-tours.ts
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BudgetTour as CmsBudgetTour } from '@cms/payload-types'

export async function getCmsBudgetTourBySlug(slug: string): Promise<CmsBudgetTour | null> {
  const safeSlug = slug?.trim()
  if (!safeSlug) return null
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'budget-tours',
          where: { and: [{ slug: { equals: safeSlug } }, { _status: { equals: 'published' } }] },
          limit: 1, depth: 2, overrideAccess: false,
        })
        return (result.docs[0] as CmsBudgetTour | undefined) ?? null
      } catch (err) {
        console.warn(`[cms-budget-tours] lookup failed for ${safeSlug}:`, err)
        return null
      }
    },
    ['cms-budget-tour-by-slug', safeSlug],
    { revalidate: 3600, tags: ['cms-budget-tours', `budget-tour:${safeSlug}`] },
  )
  return getCached()
}

export async function listCmsBudgetTourSlugs(): Promise<string[]> {
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'budget-tours',
          where: { _status: { equals: 'published' } },
          limit: 200, depth: 0, overrideAccess: false,
        })
        return result.docs.map((d) => (d as CmsBudgetTour).slug).filter((s): s is string => typeof s === 'string' && s.length > 0)
      } catch (err) { return [] }
    },
    ['cms-budget-tour-slugs'],
    { revalidate: 3600, tags: ['cms-budget-tours'] },
  )
  return getCached()
}
