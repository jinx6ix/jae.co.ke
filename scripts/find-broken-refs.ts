import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const coll = mongoose.connection.db!.collection('media')
  const targets = [
    'accessible-vehicle-lift.jpg',
    'wheelchair-securement.jpg',
    'accessible-safari-interior.jpg',
    'medical-kit-safari.jpg',
    'accessible-safari-wheelchair.jpg',
    'masai-mara-migration.jpg',
    'mountain-gorilla-trekking.jpg',
    'pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg',
    'kenya-safari-landscape.jpg',
    'tanzania-serengeti.jpg',
    'rwanda-mountain-gorillas.jpg',
    'uganda-wildlife.jpg',
    'safari-guides-with-tourists-in-africa.jpg',
    'wheelchair-accessible-tanzania-safari.webp',
    'wheelchair-accessible-vehicle-ramp.jpg',
    'accessible-safari-vehicle-interior-wheelchair-spac.jpg',
    'african-safari-team-with-tourists.jpg',
  ]
  for (const t of targets) {
    const doc = await coll.findOne({ filename: t }, { projection: { filename: 1, url: 1 } })
    if (doc) {
      console.log(`FOUND    ${t} -> ${doc.url}`)
    } else {
      // try fuzzy match
      const base = t.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').toLowerCase()
      const parts = base.split(' ').filter(p => p.length > 3)
      const fuzzy = await coll.findOne({
        $or: [
          { filename: { $regex: parts[0], $options: 'i' } },
        ],
      }, { projection: { filename: 1, url: 1 } })
      console.log(`MISSING  ${t} ${fuzzy ? '(similar: ' + fuzzy.filename + ')' : ''}`)
    }
  }
  await mongoose.disconnect()
}
run().catch(console.error)
