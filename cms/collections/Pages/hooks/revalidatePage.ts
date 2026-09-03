import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

/**
 * Walk the page's layout array and return true if it contains at least
 * one VideoBlock. Used to decide whether a page change should also bust
 * the videos sitemap — the sitemap emits one <url> per (page, video)
 * pair where the page has a videoBlock, so the cache for the videos
 * sitemap must invalidate on any page change that touches videoBlocks.
 */
function hasVideoBlock(doc: { layout?: unknown } | null | undefined): boolean {
  const layout = Array.isArray(doc?.layout) ? (doc!.layout as Array<{ blockType?: string }>) : []
  return layout.some((b) => b?.blockType === 'videoBlock')
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      // Bust the per-slug tag the `getPageBySlug` cache uses, plus the
      // generic `pages` tag for any cached page listing/sitemap.
      revalidateTag(`page:${doc.slug}`)
      revalidateTag('pages')
      revalidateTag('pages-sitemap', 'max')

      // If the page references any videos via a videoBlock, the videos
      // sitemap embeds (page, video) pairs that point at this URL.
      // Bust it so a new video added to the block is emitted immediately.
      if (hasVideoBlock(doc)) {
        revalidateTag('videos-sitemap', 'max')
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(`page:${previousDoc.slug}`)
      revalidateTag('pages')
      revalidateTag('pages-sitemap', 'max')
      if (hasVideoBlock(previousDoc as { layout?: unknown })) {
        revalidateTag('videos-sitemap', 'max')
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    if (doc?.slug) revalidateTag(`page:${doc.slug}`)
    revalidateTag('pages')
    revalidateTag('pages-sitemap', 'max')
    if (hasVideoBlock(doc as { layout?: unknown } | null)) {
      revalidateTag('videos-sitemap', 'max')
    }
  }

  return doc
}
