// scripts/fix-pages-index.ts
// Drop the unique `slug_1` index on the `pages` collection and replace
// it with a compound (slug, locale) index. The Pages collection was
// created with `slugField()` which generates a unique slug index; but
// we now have multiple locales that share the same slug (e.g. /about
// exists in en, fr, de, etc.), so the unique constraint must be on
// the (slug, locale) pair, not on slug alone.
import 'dotenv/config'
import mongoose from 'mongoose'

async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('pages')

  const existing = await coll.indexes()
  const slugIdx = existing.find((i) => i.name === 'slug_1')

  if (slugIdx) {
    console.log('Dropping existing unique slug_1 index...')
    await coll.dropIndex('slug_1')
  }

  console.log('Creating compound (slug, locale) index...')
  await coll.createIndex(
    { slug: 1, locale: 1 },
    { unique: true, sparse: true, name: 'slug_locale_1', background: true },
  )

  console.log('Creating secondary (locale, slug) index for lookups...')
  await coll.createIndex(
    { locale: 1, slug: 1 },
    { name: 'locale_slug_1', background: true },
  )

  const after = await coll.indexes()
  console.log('Updated indexes:')
  console.log(JSON.stringify(after, null, 2))

  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
