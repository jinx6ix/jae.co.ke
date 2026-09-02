// scripts/ingest-budget-tours.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs/promises'
import path from 'path'

async function run() {
  // Re-parse the budget-tours-data.ts file by importing it (typed)
  const mod = await import('../lib/budget-tours-data')
  const tours = (mod as any).budgetTours || (mod as any).default?.budgetTours || []
  if (!Array.isArray(tours) || tours.length === 0) {
    console.error('No tours exported from lib/budget-tours-data.ts — expecting a `tours` array')
    process.exit(1)
  }
  const payload = await getPayload({ config })
  let created = 0, updated = 0
  for (const t of tours) {
    const existing = await payload.find({ collection: 'budget-tours', where: { slug: { equals: t.slug } }, limit: 1, overrideAccess: true })
    const data: any = {
      title: t.title,
      slug: t.slug,
      description: t.description,
      shortDescription: t.shortDescription,
      price: t.price,
      originalPrice: t.originalPrice,
      duration: t.duration,
      groupSize: t.groupSize,
      country: t.country,
      rating: t.rating,
      reviewCount: t.reviewCount,
      highlights: (t.highlights || []).map((h: string) => ({ text: h })),
      included: (t.included || []).map((h: string) => ({ text: h })),
      excluded: (t.excluded || []).map((h: string) => ({ text: h })),
      itinerary: (t.itinerary || []).map((it: any) => ({ day: it.day, title: it.title, content: it.content })),
      faqs: (t.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer })),
      meta: { title: t.title, description: t.metaDescription },
      _status: 'published' as const,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'budget-tours', id: existing.docs[0].id, data, overrideAccess: true })
      console.log(`  [update] ${t.slug}`)
      updated++
    } else {
      await payload.create({ collection: 'budget-tours', data, overrideAccess: true })
      console.log(`  [create] ${t.slug}`)
      created++
    }
  }
  console.log(`\nCreated: ${created}, Updated: ${updated}`)
  process.exit(0)
}
run().catch((e) => { console.error(e); process.exit(1) })
