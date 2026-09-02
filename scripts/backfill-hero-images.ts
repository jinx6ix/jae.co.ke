// scripts/backfill-hero-images.ts
//
// Sets `heroImage` on every Tour and Vehicle whose `legacyImagePath`
// points to a file already uploaded to the `media` collection.
//
// Run with: npx tsx scripts/backfill-hero-images.ts
//
// Use DRY_RUN=1 to preview without writing:
//   DRY_RUN=1 npx tsx scripts/backfill-hero-images.ts
//
// What it does:
//   For every doc in `tours` and `vehicles` where `heroImage` is null:
//     1. Take its `legacyImagePath`, basename it (so `/foo/bar/baz.jpg`
//        becomes `baz.jpg` — that matches Payload's stored `filename`).
//     2. Look up a Media doc with that exact `filename`.
//     3. If found, write `{ heroImage: <mediaId> }` to the doc.
//     4. If not found, log it and move on.
//
// Why a script and not a Payload hook:
//   Hero images need to be re-runnable (the legacy data may be fixed
//   later), explicit (we never want a save hook to silently overwrite
//   a human-set heroImage), and we already had to do the media-ingest
//   once in a one-off — same shape.
//
// Why basename() (not exact-path match):
//   `legacyImagePath` was captured when the static site was in
//   `/public/foo/bar/baz.jpg`. After the move to Payload, the same
//   file is in `public/media/baz.jpg` and stored in MongoDB with
//   `filename: "baz.jpg"`. The Media doc has no record of the legacy
//   subdirectory, so a basename lookup is the only reliable key.
//
// Coverage (from the diagnostic run on 2026-08-31):
//   Tours:    70 missing → 69 matched, 1 unmapped (.avif)
//   Vehicles: 10 missing → 6 matched, 4 unmapped (imagekit URLs that
//             were never in the local /public folder — the user has
//             to upload those manually via admin or download them)

import 'dotenv/config'
import { basename } from 'node:path'
import { getPayload } from 'payload'
import config from '@payload-config'

const DRY_RUN = process.env.DRY_RUN === '1'

async function backfillCollection(
  collectionSlug: 'tours' | 'vehicles',
): Promise<{ matched: number; updated: number; unmatched: string[] }> {
  const payload = await getPayload({ config })

  const docs = await payload.find({
    collection: collectionSlug,
    depth: 0,
    limit: 500,
    where: { heroImage: { equals: null } },
  })

  let matched = 0
  let updated = 0
  const unmatched: string[] = []

  for (const doc of docs.docs) {
    const legacy = doc.legacyImagePath as string | null | undefined
    if (!legacy) {
      unmatched.push(`${doc.title} (no legacyImagePath)`)
      continue
    }

    const filename = basename(legacy)
    const found = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    })

    if (found.docs.length === 0) {
      unmatched.push(`${doc.title} → ${legacy}`)
      continue
    }

    matched++
    const mediaId = found.docs[0].id

    if (DRY_RUN) {
      console.log(`  [dry-run] would set ${collectionSlug} "${doc.title}" heroImage → media:${mediaId} (${filename})`)
      continue
    }

    try {
      await payload.update({
        collection: collectionSlug,
        id: doc.id,
        data: { heroImage: mediaId },
        depth: 0,
      })
      updated++
    } catch (err) {
      unmatched.push(`${doc.title} → UPDATE FAILED: ${(err as Error).message}`)
    }
  }

  return { matched, updated, unmatched }
}

async function main() {
  console.log(`Backfill heroImage ${DRY_RUN ? '(DRY RUN)' : ''}`)
  console.log('--- Tours ---')
  const tourResults = await backfillCollection('tours')
  console.log(`Matched: ${tourResults.matched}, Updated: ${tourResults.updated}, Unmatched: ${tourResults.unmatched.length}`)
  if (tourResults.unmatched.length > 0) {
    console.log('Unmatched tours:')
    tourResults.unmatched.forEach((u) => console.log(`  ${u}`))
  }

  console.log('\n--- Vehicles ---')
  const vehicleResults = await backfillCollection('vehicles')
  console.log(`Matched: ${vehicleResults.matched}, Updated: ${vehicleResults.updated}, Unmatched: ${vehicleResults.unmatched.length}`)
  if (vehicleResults.unmatched.length > 0) {
    console.log('Unmatched vehicles:')
    vehicleResults.unmatched.forEach((u) => console.log(`  ${u}`))
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
