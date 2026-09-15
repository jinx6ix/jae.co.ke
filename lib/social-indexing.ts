import { getPayload } from 'payload'
import config from '@payload-config'

export async function registerSocialAsset({
  platform,
  socialUrl,
  accountUrl,
  contentId,
  contentType,
  externalId,
  title,
  caption,
  description,
  targetKeyword,
  targetUrl,
  publishedAt,
}: {
  platform: 'instagram' | 'youtube'
  socialUrl: string
  accountUrl?: string
  contentId?: string
  contentType?: string
  externalId?: string
  title?: string
  caption?: string
  description?: string
  targetKeyword?: string
  targetUrl?: string
  publishedAt?: Date
}) {
  const payload = await getPayload({ config })

  // Use try-catch to ensure we don't block the publishing if registration fails
  try {
    const existing = await payload.find({
      collection: 'social-indexing-assets', // Fixed slug
      where: {
        socialUrl: { equals: socialUrl },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Prevent duplicates
      return
    }

    await payload.create({
      collection: 'social-indexing-assets', // Fixed slug
      data: {
        platform,
        socialUrl,
        accountUrl,
        contentId,
        contentType,
        externalId,
        title,
        caption,
        description,
        targetKeyword,
        targetUrl,
        publishedAt: publishedAt?.toISOString(),
        discoveryStatus: 'pending',
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    payload.logger.error(`[SocialIndexing] registration failed for ${socialUrl}: ${message}`)
  }
}
