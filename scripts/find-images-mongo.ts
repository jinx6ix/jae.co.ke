// scripts/find-images-mongo.ts
// Direct MongoDB connection via Mongoose (skips Payload init, which is slow).
// Run with `npx tsx scripts/find-images-mongo.ts`
import 'dotenv/config'
import mongoose from 'mongoose'

async function run() {
  const uri = process.env.PAYLOAD_DATABASE_URL
  if (!uri) {
    console.error('PAYLOAD_DATABASE_URL not set in env')
    process.exit(1)
  }

  await mongoose.connect(uri!)
  const collection = mongoose.connection.db!.collection('media')

  // Search broadly — many naming conventions for these categories
  const keywords = [
    'disability', 'disabled', 'accessib',
    'team', 'staff', 'guide', 'driver',
    'award', 'certif', 'trophy', 'partner',
  ]
  const query = {
    $or: keywords.map((kw) => ({ filename: { $regex: kw, $options: 'i' } })),
  }

  const docs = await collection.find(query).limit(200).toArray()
  console.log(`Found ${docs.length} media docs matching ${keywords.join(', ')}:`)
  for (const doc of docs) {
    console.log(`- ID: ${doc._id}, Filename: ${doc.filename}, Alt: ${(doc as any).alt ?? ''}`)
  }

  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
