import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })
  const slug = 'uganda-accessible-primate-safari'

  // Test 1: with status filter
  console.log('Test 1: with _status: published filter')
  let result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  console.log('  result.docs.length:', result.docs.length)

  // Test 2: with locale
  console.log('Test 2: with _status: published, locale: en')
  result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    locale: 'en' as any,
    limit: 1,
  })
  console.log('  result.docs.length:', result.docs.length)

  // Test 3: no filter
  console.log('Test 3: no filters')
  result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  console.log('  result.docs.length:', result.docs.length)
  if (result.docs.length > 0) {
    console.log('  _status:', (result.docs[0] as any)._status)
  }

  // Test 4: check what locale filter returns
  console.log('Test 4: only locale: en, no status filter')
  result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug } },
    locale: 'en' as any,
    limit: 1,
  })
  console.log('  result.docs.length:', result.docs.length)
  if (result.docs.length > 0) {
    console.log('  _status:', (result.docs[0] as any)._status)
  }

  process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })
