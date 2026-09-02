import 'dotenv/config'
import mongoose from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('media')
  // Check a known file
  const sample = await coll.findOne({ filename: 'masai-mara-migration.jpg' })
  console.log('Sample doc keys:', sample ? Object.keys(sample) : 'MISSING')
  if (sample) {
    console.log('URL:', (sample as any).url)
    console.log('Filesize:', (sample as any).filesize)
    console.log('MIME type:', (sample as any).mimeType)
  }
  // Try common locations
  const candidates = [
    'public/media/masai-mara-migration.jpg',
    'media/masai-mara-migration.jpg',
    'uploads/masai-mara-migration.jpg',
  ]
  for (const c of candidates) {
    console.log(c, fs.existsSync(path.resolve(c)) ? 'EXISTS' : 'missing')
  }
  await mongoose.disconnect()
}
run().catch(console.error)
