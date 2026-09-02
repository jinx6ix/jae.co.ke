import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('pages')
  const idx = await coll.indexes()
  console.log(JSON.stringify(idx, null, 2))
  await mongoose.disconnect()
}
run().catch(console.error)
