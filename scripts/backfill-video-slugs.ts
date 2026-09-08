import 'dotenv/config'

import { getPayload } from 'payload'
import config from '@payload-config'

type VideoDoc = {
  id: string
  provider: 'youtube' | 'instagram'
  externalId: string
  title?: string | null
  slug?: string | null
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
    .replace(/-+$/, '')
}

function makeBaseSlug(video: VideoDoc): string {
  const title = video.title?.trim()

  if (title) {
    const slug = slugify(title)
    if (slug) return slug
  }

  const provider = video.provider || 'video'
  const id = video.externalId?.trim()

  return slugify(`${provider}-${id}`) || `video-${video.id}`
}

async function main() {
  const payload = await getPayload({ config })

  console.log('Starting video slug backfill...')

  const result = await payload.find({
    collection: 'videos',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  console.log(`Found ${result.docs.length} videos.`)

  const usedSlugs = new Set<string>()

  // First reserve any existing slugs.
  for (const raw of result.docs) {
    const video = raw as VideoDoc

    const existing = video.slug?.trim()

    if (existing) {
      usedSlugs.add(existing)
    }
  }

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const raw of result.docs) {
    const video = raw as VideoDoc

    if (video.slug?.trim()) {
      skipped++
      continue
    }

    const base = makeBaseSlug(video)

    let slug = base
    let counter = 2

    while (usedSlugs.has(slug)) {
      const suffix = `-${counter}`
      const maxBaseLength = 80 - suffix.length

      slug = `${base.slice(0, maxBaseLength).replace(/-+$/, '')}${suffix}`

      counter++
    }

    try {
        await payload.update({
            collection: 'videos',
            id: video.id,
            data: {
              slug,
              skipSync: true,
            } as any,
            overrideAccess: true,
            context: {
              disableRevalidate: true,
            },
          })

      usedSlugs.add(slug)
      updated++

      console.log(`✓ ${video.id} → ${slug}`)
    } catch (error) {
      failed++

      console.error(
        `✗ Failed ${video.id}:`,
        error instanceof Error ? error.message : String(error),
      )
    }
  }

  console.log('')
  console.log('────────────────────────────────')
  console.log('Video slug backfill complete')
  console.log('────────────────────────────────')
  console.log(`Total:   ${result.docs.length}`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Failed:  ${failed}`)
  console.log('────────────────────────────────')

  process.exit(failed > 0 ? 1 : 0)
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})