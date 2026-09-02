// scripts/backfill-meta-images.ts
//
// Sets `meta.image` to `heroImage` on every Tour and Vehicle
// where `meta.image` is currently null/unset.

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const DRY_RUN = process.env.DRY_RUN === '1'

async function backfillMetaImages(collectionSlug: 'tours' | 'vehicles') {
  const payload = await getPayload({ config })

  // Find docs where meta.image is null but heroImage is NOT null
  const docs = await payload.find({
    collection: collectionSlug,
    depth: 0,
    limit: 500,
  })

  let updated = 0
  for (const doc of docs.docs) {
    const heroImage = (doc.heroImage as string | null | undefined)
    const metaImage = (doc.meta as { image?: string | null } | undefined)?.image

    if (heroImage && !metaImage) {
      if (DRY_RUN) {
        console.log(`  [dry-run] would set ${collectionSlug} "${doc.title}" meta.image → heroImage (media:${heroImage})`)
        continue
      }
      try {
        await payload.update({
          collection: collectionSlug,
          id: doc.id,
          data: { meta: { ...doc.meta, image: heroImage } },
          depth: 0,
        })
        updated++
      } catch (err) {
        console.error(`  [fail] update ${doc.title}: ${(err as Error).message}`)
      }
    }
  }
  return updated
}

async function main() {
  console.log(`Backfilling meta.image from heroImage ${DRY_RUN ? '(DRY RUN)' : ''}`)
  const tUpdated = await backfillMetaImages('tours')
  const vUpdated = await backfillMetaImages('vehicles')
  console.log(`\nUpdated Tours: ${tUpdated}, Vehicles: ${vUpdated}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
