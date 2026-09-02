// scripts/ingest-destinations.ts
//
// One-off migration. Reads lib/destinations-data.ts (the static
// `destinations` array of 4 countries) and upserts each as a doc in
// the new `destinations` collection. Idempotent by slug.
//
// Run with `npx tsx scripts/ingest-destinations.ts` from the
// jaetravel-expeditions project root.

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

import { destinations } from '../lib/destinations-data'

async function run() {
  const payload = await getPayload({ config })

  let created = 0
  let updated = 0

  for (const d of destinations) {
    const existing = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: d.slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data = {
      title: d.name,
      slug: d.slug,
      country: d.country,
      description: d.description,
      longDescription: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              textFormat: 0,
              children: [
                {
                  type: 'text',
                  format: 0,
                  text: d.longDescription,
                  version: 1,
                  mode: 'normal',
                  detail: 0,
                  style: '',
                },
              ],
            },
          ],
        },
      },
      wildlifeHighlights: d.wildlifeHighlights,
      highlights: d.highlights.map((h) => ({ text: h })),
      bestFor: d.bestFor.map((b) => ({ text: b })),
      bestTimeToVisit: d.bestTimeToVisit,
      popularTours: d.popularTours,
      keywords: d.keywords.map((k) => ({ text: k })),
      meta: {
        title: d.metaTitle,
        description: d.metaDescription,
      },
      _status: 'published' as const,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'destinations',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      })
      console.log(`  [update] ${d.slug} — "${d.name}"`)
      updated++
    } else {
      await payload.create({
        collection: 'destinations',
        data,
        overrideAccess: true,
      })
      console.log(`  [create] ${d.slug} — "${d.name}"`)
      created++
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Created: ${created}`)
  console.log(`Updated: ${updated}`)

  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
