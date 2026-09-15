import type { CollectionAfterChangeHook } from 'payload'
import { registerSocialAsset } from '../../../../lib/social-indexing'

export const registerSocialIndexing: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation !== 'create' && operation !== 'update') return
  if (!doc.provider || !doc.externalId || !doc.url) return

  // Register social asset.
  // Note: we might need to fetch more data here if the Video doc doesn't have it all.
  await registerSocialAsset({
    platform: doc.provider,
    socialUrl: doc.url,
    externalId: doc.externalId,
    title: doc.title,
    caption: doc.description,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : undefined,
  })
}
