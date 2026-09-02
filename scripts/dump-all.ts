import 'dotenv/config'
import mongoose from 'mongoose'
import * as fs from 'fs'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const db = mongoose.connection.db!
  const colls = await db.listCollections().toArray()
  for (const c of colls) {
    const count = await db.collection(c.name).countDocuments()
    if (count === 0) continue
    // Dump first doc of each
    const sample = await db.collection(c.name).findOne()
    const keys = sample ? Object.keys(sample) : []
    console.log(`${c.name} (${count} docs) keys: ${keys.join(', ')}`)
  }
  // Check for GridFS in any collection starting with "fs" or "media"
  const gridCandidates = ['fs.files', 'fs.chunks', 'media.files', 'media.chunks', 'uploads.files', 'uploads.chunks', 'payload-uploads', 'payload-media']
  for (const name of gridCandidates) {
    const exists = await db.listCollections({ name }).hasNext()
    if (exists) {
      const count = await db.collection(name).countDocuments()
      console.log(`\nGRIDFS: ${name} (${count} docs)`)
    }
  }
  // Also look at full set of distinct field names across media docs
  const fieldSet = new Set<string>()
  const mediaCursor = db.collection('media').find({})
  let i = 0
  while (await mediaCursor.hasNext() && i < 50) {
    const d = await mediaCursor.next()
    if (d) {
      for (const k of Object.keys(d)) fieldSet.add(k)
      // Also peek at sizes values
      if (d.sizes && typeof d.sizes === 'object') {
        for (const sizeName of Object.keys(d.sizes)) {
          const sv = d.sizes[sizeName]
          if (sv && typeof sv === 'object') {
            for (const sk of Object.keys(sv)) fieldSet.add(`sizes.${sizeName}.${sk}`)
          }
        }
      }
    }
    i++
  }
  console.log('\nAll field names found in media docs:', Array.from(fieldSet).sort())
  await mongoose.disconnect()
}
run().catch(console.error)
