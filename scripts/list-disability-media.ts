import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('media')
  const all = await coll.find({}, { projection: { filename: 1 } }).toArray()
  const interesting = all
    .map(d => d.filename as string)
    .filter(f => /access|wheelchair|disable|special|handicap|mobility|medical|ramp|lift|secure/i.test(f))
  console.log('Disability/special-needs media (' + interesting.length + '):')
  interesting.forEach(f => console.log('  ' + f))
  await mongoose.disconnect()
}
run().catch(console.error)
