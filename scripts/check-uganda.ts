import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })
  const tour = await payload.find({
    collection: 'tours',
    where: { slug: { equals: 'uganda-accessible-primate-safari' } },
    limit: 1,
  })
  console.log('tripDetails:', JSON.stringify(tour.docs[0].tripDetails, null, 2))
  console.log('slug:', tour.docs[0].slug)
  console.log('title:', tour.docs[0].title)
  console.log('_status:', (tour.docs[0] as any)._status)
  process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
