import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const tours = await payload.find({
    collection: 'tours',
    depth: 0,
    limit: 500,
  })

  const byStatus: Record<string, number> = {}
  let uganda: { title: string; _status: string; slug: string } | null = null

  for (const tour of tours.docs) {
    const s = (tour as { _status?: string })._status ?? 'unknown'
    byStatus[s] = (byStatus[s] ?? 0) + 1
    if (tour.slug === 'uganda-accessible-primate-safari') {
      uganda = { title: tour.title, _status: s, slug: tour.slug ?? '' }
    }
  }

  console.log('Tour _status distribution:')
  for (const [s, n] of Object.entries(byStatus)) {
    console.log(`  ${s}: ${n}`)
  }

  if (uganda) {
    console.log('\nUganda tour:', uganda)
  } else {
    console.log('\nUganda tour not found!')
  }

  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
