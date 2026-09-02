// lib/cms-products.ts
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Product as CmsProduct } from '@cms/payload-types'

export async function getCmsProductBySlug(slug: string): Promise<CmsProduct | null> {
  const safeSlug = slug?.trim()
  if (!safeSlug) return null
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'products',
          where: { and: [{ slug: { equals: safeSlug } }, { _status: { equals: 'published' } }] },
          limit: 1, depth: 2, overrideAccess: false,
        })
        return (result.docs[0] as CmsProduct | undefined) ?? null
      } catch (err) {
        console.warn(`[cms-products] lookup failed for ${safeSlug}:`, err)
        return null
      }
    },
    ['cms-product-by-slug', safeSlug],
    { revalidate: 3600, tags: ['cms-products', `product:${safeSlug}`] },
  )
  return getCached()
}

export async function listCmsProductSlugs(): Promise<string[]> {
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'products',
          where: { _status: { equals: 'published' } },
          limit: 200, depth: 0, overrideAccess: false,
        })
        return result.docs.map((d) => (d as CmsProduct).slug).filter((s): s is string => typeof s === 'string' && s.length > 0)
      } catch (err) { return [] }
    },
    ['cms-product-slugs'],
    { revalidate: 3600, tags: ['cms-products'] },
  )
  return getCached()
}
