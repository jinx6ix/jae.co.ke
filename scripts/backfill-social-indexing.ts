import { getPayload } from 'payload'
import config from '@payload-config'
import { registerSocialAsset } from '../lib/social-indexing'

async function backfill() {
  const payload = await getPayload({ config })

  const videos = await payload.find({
    collection: 'videos',
    limit: 1000,
  })

  let created = 0
  let skipped = 0
  let failures = 0

  for (const video of videos.docs) {
    try {
      if (!video.url || !video.externalId) {
        skipped++
        continue
      }

      await registerSocialAsset({
        platform: video.provider as 'instagram' | 'youtube',
        socialUrl: video.url,
        externalId: video.externalId,
        title: video.title || '',
        caption: video.description || '',
        publishedAt: video.publishedAt ? new Date(video.publishedAt) : undefined,
      })
      created++
    } catch (err) {
      failures++
    }
  }

  console.log(`Backfill complete. Created: ${created}, Skipped: ${skipped}, Failures: ${failures}`)
}

backfill()
