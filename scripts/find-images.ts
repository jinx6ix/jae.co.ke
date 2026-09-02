// scripts/find-images.ts
// Run with `npx tsx scripts/find-images.ts`
import 'dotenv/config'
import { getPayload } from "payload"
import config from "@payload-config"

async function run() {
  const payload = await getPayload({ config })
  const keywords = ['disability', 'team', 'award']

  const results = await payload.find({
    collection: 'media',
    where: {
      or: keywords.map(kw => ({
        filename: { contains: kw }
      }))
    },
    depth: 0,
    limit: 100
  })

  console.log(`Found ${results.docs.length} media docs:`)
  results.docs.forEach((doc: any) => {
    console.log(`- ID: ${doc.id}, Filename: ${doc.filename}`)
  })
}

run().catch(console.error)
