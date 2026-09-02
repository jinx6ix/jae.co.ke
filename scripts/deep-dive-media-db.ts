// scripts/deep-dive-media-db.ts
//
// Exhaustive dump to answer "where ARE the images in the DB?"
//
// Checks, in order:
//   1. List every database on the server
//   2. List every collection in the active DB
//   3. For each Media doc: dump EVERY field (not just metadata), look
//      for any binary/base64/blob field
//   4. For each doc: report its BSON size in bytes
//   5. List any GridFS collections (media.files / media.chunks /
//      uploads.files / uploads.chunks / *.files / *.chunks)
//   6. Search all collections for fields whose values are Buffers or
//      strings > 10KB (which would indicate a binary payload somewhere)
//   7. Sample 1 doc from every non-system collection and print its
//      top-level field names

import 'dotenv/config'
import mongoose from 'mongoose'

async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const adminDb = mongoose.connection.db!.admin()

  console.log('=== 1. All databases on the server ===')
  const { databases } = await adminDb.listDatabases()
  for (const d of databases) {
    console.log(`  ${d.name}  (sizeOnDisk: ${d.sizeOnDisk ?? '?'} bytes)`)
  }

  const db = mongoose.connection.db!
  const dbName = db.databaseName
  console.log(`\n=== Active DB: ${dbName} ===`)

  const collections = await db.listCollections().toArray()
  console.log(`\n=== 2. All ${collections.length} collections in ${dbName} ===`)
  for (const c of collections) {
    const count = await db.collection(c.name).countDocuments()
    console.log(`  ${c.name}  (${count} docs)`)
  }

  // GridFS check: any *.files / *.chunks collection?
  const gridfsCandidates = collections.filter(c =>
    c.name.endsWith('.files') || c.name.endsWith('.chunks')
  )
  console.log(`\n=== 3. GridFS-like collections: ${gridfsCandidates.length} ===`)
  if (gridfsCandidates.length === 0) {
    console.log('  NONE — no *.files or *.chunks collections found.')
  } else {
    for (const c of gridfsCandidates) {
      const count = await db.collection(c.name).countDocuments()
      console.log(`  ${c.name}  (${count} docs)`)
    }
  }

  console.log(`\n=== 4. Sample 1 full Media doc (all fields, no filter) ===`)
  const sample = await db.collection('media').findOne({})
  if (!sample) {
    console.log('  media collection is EMPTY')
  } else {
    const json = JSON.stringify(sample, (_k, v) => {
      // Truncate anything big so the output stays readable
      if (v && typeof v === 'object' && v.constructor?.name === 'Binary') {
        return `<Binary: ${v.length()} bytes>`
      }
      if (typeof v === 'string' && v.length > 200) {
        return `<String: ${v.length} chars, first 80: "${v.slice(0, 80)}...">`
      }
      return v
    }, 2)
    console.log(json)
  }

  console.log(`\n=== 5. Field-name inventory across 5 sample Media docs ===`)
  const cursor = db.collection('media').find({}).limit(5)
  const fieldSet = new Set<string>()
  while (await cursor.hasNext()) {
    const d = await cursor.next()
    if (!d) continue
    for (const k of Object.keys(d)) fieldSet.add(k)
  }
  console.log(`  Unique top-level field names: ${[...fieldSet].sort().join(', ')}`)

  console.log(`\n=== 6. Size of one Media doc in BSON ===`)
  const sizeProbe = await db.collection('media').findOne({})
  if (sizeProbe) {
    const buf = await db.collection('media').findOne({ _id: sizeProbe._id }) // raw
    const bson = await db.collection('media').find({ _id: sizeProbe._id }).toArray()
    const json = JSON.stringify(bson)
    console.log(`  Approx JSON size: ${json.length} bytes`)
    console.log(`  filesize field:   ${sizeProbe.filesize} bytes`)
    if (json.length < 100) console.log('  ⚠ Doc is suspiciously small — may be missing the file payload')
  }

  console.log(`\n=== 7. Search all collections for big string fields (possible base64 images) ===`)
  for (const c of collections) {
    if (c.name.startsWith('system.')) continue
    const sample2 = await db.collection(c.name).findOne({})
    if (!sample2) continue
    for (const [k, v] of Object.entries(sample2)) {
      if (v && typeof v === 'object' && (v as { constructor?: { name?: string } }).constructor?.name === 'Binary') {
        console.log(`  ${c.name}.${k}  → Binary ${(v as { length: () => number }).length()} bytes`)
      } else if (typeof v === 'string' && v.length > 10000) {
        console.log(`  ${c.name}.${k}  → String ${v.length} chars`)
      }
    }
  }

  console.log(`\n=== 8. List every collection's top-level fields ===`)
  for (const c of collections) {
    if (c.name.startsWith('system.')) continue
    const s = await db.collection(c.name).findOne({})
    if (!s) {
      console.log(`  ${c.name}: empty`)
      continue
    }
    console.log(`  ${c.name}: ${Object.keys(s).join(', ')}`)
  }

  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
