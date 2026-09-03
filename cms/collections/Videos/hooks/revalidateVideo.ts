import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateVideo: CollectionAfterChangeHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('videos-sitemap')
  }
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('videos-sitemap')
  }
}
