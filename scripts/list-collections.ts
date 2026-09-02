import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const db = mongoose.connection.db!
  const colls = await db.listCollections().toArray()
  console.log('All collections:')
  colls.forEach(c => console.log(' ', c.name))
  // Check media collection sizes
  const mediaCol = db.collection('media')
  const total = await mediaCol.countDocuments()
  console.log(`\nmedia collection: ${total} docs`)
  // Check for buffer / data fields
  const sample = await mediaCol.findOne()
  console.log('Sample doc keys:', sample ? Object.keys(sample) : 'empty')
  if (sample) {
    console.log('Has buffer?', !!(sample as any).buffer, 'data?', !!(sample as any).data)
  }
  // Check GridFS collections
  const fsFiles = await db.collection('media.files').countDocuments().catch(() => 0)
  const fsChunks = await db.collection('media.chunks').countDocuments().catch(() => 0)
  console.log(`\nGridFS media.files: ${fsFiles}, media.chunks: ${fsChunks}`)
  if (fsFiles > 0) {
    const f = await db.collection('media.files').findOne()
    console.log('Sample file doc:', f)
  }
  // Also check payload-specific
  const uploadCol = await db.collection('uploads').countDocuments().catch(() => 0)
  console.log(`uploads collection: ${uploadCol}`)
  await mongoose.disconnect()
}
run().catch(console.error)
