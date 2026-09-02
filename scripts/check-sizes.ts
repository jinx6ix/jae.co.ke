import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('media')
  const sample = await coll.findOne({ filename: 'masai-mara-migration.jpg' })
  if (sample) {
    console.log('keys:', Object.keys(sample))
    console.log('sizes type:', typeof (sample as any).sizes)
    console.log('sizes keys:', (sample as any).sizes ? Object.keys((sample as any).sizes) : 'n/a')
    if ((sample as any).sizes) {
      for (const [k, v] of Object.entries((sample as any).sizes)) {
        const vobj = v as any
        console.log(`  ${k}:`, Object.keys(vobj || {}))
        if (vobj && vobj.url) console.log(`    url: ${vobj.url}`)
        if (vobj && vobj.data) console.log(`    data: <buffer of ${(vobj.data as Buffer).length} bytes>`)
        if (vobj && vobj.buffer) console.log(`    buffer: <${(vobj.buffer as Buffer).length} bytes>`)
      }
    }
  }
  await mongoose.disconnect()
}
run().catch(console.error)
