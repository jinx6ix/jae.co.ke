
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function checkImages() {
  const payload = await getPayload({ config })

  const tours = await payload.find({
    collection: 'tours',
    depth: 0,
    limit: 500,
  })

  console.log('--- Tours missing heroImage ---')
  for (const tour of tours.docs) {
    if (!tour.heroImage) {
      console.log(`Tour: ${tour.title} (slug: ${tour.slug})`)
    }
  }

  const vehicles = await payload.find({
    collection: 'vehicles',
    depth: 0,
    limit: 500,
  })

  console.log('\n--- Vehicles missing heroImage ---')
  for (const vehicle of vehicles.docs) {
    if (!vehicle.heroImage) {
      console.log(`Vehicle: ${vehicle.title} (slug: ${vehicle.slug})`)
    }
  }
}

checkImages().catch(console.error)
