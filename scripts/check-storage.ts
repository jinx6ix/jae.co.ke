import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const db = mongoose.connection.db!
  const colls = await db.listCollections().toArray()
  console.log('ALL collections:')
  for (const c of colls) {
    const count = await db.collection(c.name).countDocuments()
    console.log(`  ${c.name}: ${count}`)
  }
  // Check Vercel Blob or any other place
  const samples = await db.collection('media').find({}).limit(2).toArray()
  for (const s of samples) {
    console.log('---')
    console.log(JSON.stringify(s, null, 2).substring(0, 500))
  }
  await mongoose.disconnect()
}
run().catch(console.error)
