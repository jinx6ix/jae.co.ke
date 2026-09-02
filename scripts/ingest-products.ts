// scripts/ingest-products.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { products } from '../lib/products-data'

async function run() {
  const payload = await getPayload({ config })
  let created = 0, updated = 0
  for (const p of products as any[]) {
    const existing = await payload.find({ collection: 'products', where: { slug: { equals: p.slug } }, limit: 1, overrideAccess: true })
    const data = {
      title: p.name,
      slug: p.slug,
      description: p.description,
      details: p.details ? { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, children: [{ type: 'text', format: 0, text: p.details, version: 1, mode: 'normal', detail: 0, style: '' }] }] } } : undefined,
      price: p.price,
      currency: p.currency,
      duration: p.duration,
      meta: { title: p.name, description: p.description },
      _status: 'published' as const,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'products', id: existing.docs[0].id, data, overrideAccess: true })
      console.log(`  [update] ${p.slug}`)
      updated++
    } else {
      await payload.create({ collection: 'products', data, overrideAccess: true })
      console.log(`  [create] ${p.slug}`)
      created++
    }
  }
  console.log(`\nCreated: ${created}, Updated: ${updated}`)
  process.exit(0)
}
run().catch((e) => { console.error(e); process.exit(1) })
