import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const db = mongoose.connection.db!
  // Check for any field with 'data' or 'bin' or 'blob' in any media doc
  const cursor = db.collection('media').find({})
  let count = 0
  let binaryFieldFound = false
  while (await cursor.hasNext()) {
    const d = await cursor.next()
    if (!d) continue
    count++
    for (const k of Object.keys(d)) {
      if (/data|bin|blob|content|file|body/i.test(k)) {
        const v = d[k]
        const type = typeof v
        const isBuffer = Buffer.isBuffer(v)
        const len = isBuffer ? (v as Buffer).length : (typeof v === 'string' ? v.length : 0)
        if (!binaryFieldFound) {
          console.log(`FOUND BINARY-LIKE FIELD: ${k} (type=${type}, isBuffer=${isBuffer}, len=${len})`)
          binaryFieldFound = true
        }
      }
    }
    // Check sizes inner fields
    if (d.sizes) {
      for (const sn of Object.keys(d.sizes)) {
        const sv = d.sizes[sn]
        if (sv && typeof sv === 'object') {
          for (const sk of Object.keys(sv)) {
            if (/data|bin|blob|content|file/i.test(sk)) {
              const v = sv[sk]
              const isBuffer = Buffer.isBuffer(v)
              console.log(`sizes.${sn}.${sk}: type=${typeof v} isBuffer=${isBuffer} len=${isBuffer ? (v as Buffer).length : 0}`)
              binaryFieldFound = true
            }
          }
        }
      }
    }
  }
  console.log(`\nInspected ${count} media docs. Binary field found: ${binaryFieldFound}`)
  // Also look at all DBs on this server
  const adminDb = db.admin()
  const dbs = await adminDb.listDatabases()
  console.log('\nAll databases on this server:')
  for (const d of dbs.databases) console.log(`  ${d.name} (size: ${d.sizeOnDisk || 'unknown'})`)
  await mongoose.disconnect()
}
run().catch(console.error)
