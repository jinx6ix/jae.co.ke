import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const SOURCE = 'C:/Users/Jinx/Documents/Jae.co.ke/jaetravel-complete-project/complete-project/public'

async function main() {
  const payload = await getPayload({ config })

  const sourceFiles = await readdir(SOURCE)
  const sourceSet = new Set(sourceFiles)
  console.log(`Source folder: ${sourceSet.size} files`)

  // Walk the Media collection in one go
  const dbFilenames = new Set<string>()
  let page = 1
  while (true) {
    const r = await payload.find({
      collection: 'media',
      limit: 200,
      page,
      depth: 0,
      overrideAccess: true,
    })
    for (const d of r.docs as any[]) {
      if (d.filename) dbFilenames.add(d.filename)
    }
    if (!r.hasNextPage) break
    page++
  }
  console.log(`Distinct filenames in DB: ${dbFilenames.size}`)

  const brand = ['logo.png', 'og-image.jpg', 'favicon-32x32.png', 'apple-touch-icon.png']
  console.log('\nBrand assets:')
  for (const b of brand) {
    console.log(`  ${b}: ${dbFilenames.has(b) ? 'IN DB' : 'MISSING'}`)
  }

  const missing: string[] = []
  for (const f of sourceFiles) {
    if (!dbFilenames.has(f)) missing.push(f)
  }
  console.log(`\nIn source, missing from DB: ${missing.length}`)
  for (const m of missing.slice(0, 30)) console.log(`  - ${m}`)
  if (missing.length > 30) console.log(`  ... and ${missing.length - 30} more`)

  const orphans: string[] = []
  for (const f of dbFilenames) {
    if (!sourceSet.has(f)) orphans.push(f)
  }
  console.log(`\nIn DB, missing from source: ${orphans.length}`)
  for (const o of orphans.slice(0, 20)) console.log(`  - ${o}`)
  if (orphans.length > 20) console.log(`  ... and ${orphans.length - 20} more`)

  process.exit(0)
}
main().catch((err) => {
  console.error(err)
  process.exit(1)
})
