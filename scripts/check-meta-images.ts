import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  // Check all tours for meta.image
  const tours = await payload.find({
    collection: 'tours',
    depth: 0,
    limit: 500,
  })
  let noMetaImage = 0
  let withMetaImage = 0
  for (const tour of tours.docs) {
    const metaImg = (tour.meta as { image?: unknown } | undefined)?.image
    if (metaImg) {
      withMetaImage++
    } else {
      noMetaImage++
    }
  }
  console.log(`Tours: ${withMetaImage} have meta.image, ${noMetaImage} missing`)

  const vehicles = await payload.find({
    collection: 'vehicles',
    depth: 0,
    limit: 500,
  })
  let vNoMeta = 0
  let vWithMeta = 0
  for (const v of vehicles.docs) {
    const metaImg = (v.meta as { image?: unknown } | undefined)?.image
    if (metaImg) {
      vWithMeta++
    } else {
      vNoMeta++
    }
  }
  console.log(`Vehicles: ${vWithMeta} have meta.image, ${vNoMeta} missing`)

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
