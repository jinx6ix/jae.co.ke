import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('media')
  const sample = await coll.findOne({ filename: 'masai-mara-migration.jpg' })
  if (!sample) { console.log('not found'); return }
  console.log('keys:', Object.keys(sample))
  console.log('has buffer?', !!(sample as any).buffer)
  console.log('buffer len:', (sample as any).buffer ? ((sample as any).buffer as Buffer).length : 0)
  await mongoose.disconnect()
}
run().catch(console.error)
