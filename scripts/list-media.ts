import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('media')
  const total = await coll.countDocuments()
  console.log('Total media docs:', total)
  const sample = await coll.find({}, { projection: { filename: 1, url: 1, mimeType: 1 } }).limit(20).toArray()
  console.log('Sample:')
  console.log(JSON.stringify(sample, null, 2))
  await mongoose.disconnect()
}
run().catch(console.error)
