// scripts/ingest-locale-pages.ts
//
// One-off migration script. For each locale's homepage, about,
// contact, and tours page.tsx, parse out the SEO metadata and a
// few key h1/h2 strings, then upsert a Pages doc with the
// matching slug + locale. Editors can then go to /admin/collections/pages
// and fill in the rest of the content (hero image, body blocks,
// FAQs, testimonials) without ever touching the static page.tsx.
//
// Run with `npx tsx scripts/ingest-locale-pages.ts` from the
// jaetravel-expeditions project root.
//
// Idempotent: re-running upserts by (slug, locale) instead of
// appending duplicates.

import 'dotenv/config'
import mongoose from 'mongoose'
import fs from 'fs/promises'
import path from 'path'

type ExtractedMeta = {
  title?: string
  description?: string
  h1?: string
  h2?: string
  imageUrl?: string
}

async function readFile(p: string): Promise<string> {
  try {
    return await fs.readFile(p, 'utf8')
  } catch {
    return ''
  }
}

function extractMeta(content: string): ExtractedMeta {
  const out: ExtractedMeta = {}

  const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/)
  if (titleMatch) out.title = titleMatch[1]

  const descMatch = content.match(/description:\s*["'`]([^"'`]+)["'`]/)
  if (descMatch) out.description = descMatch[1]

  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  if (h1Match) {
    out.h1 = h1Match[1]
      .replace(/<br\s*\/?>/g, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const h2Match = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)
  if (h2Match) {
    out.h2 = h2Match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  return out
}

type LocaleEntry = {
  locale: 'fr' | 'de' | 'it' | 'hi' | 'ar' | 'zh'
  home: { file: string; slug: string }
  pages: { file: string; slug: string }[]
}

const LOCALES: LocaleEntry[] = [
  {
    locale: 'fr',
    home: { file: 'app/(marketing)/fr/page.tsx', slug: 'home' },
    pages: [
      { file: 'app/(marketing)/fr/about/page.tsx', slug: 'about' },
      { file: 'app/(marketing)/fr/contact/page.tsx', slug: 'contact' },
      { file: 'app/(marketing)/fr/tours/page.tsx', slug: 'tours' },
    ],
  },
  {
    locale: 'de',
    home: { file: 'app/(marketing)/de/page.tsx', slug: 'home' },
    pages: [
      { file: 'app/(marketing)/de/about/page.tsx', slug: 'about' },
      { file: 'app/(marketing)/de/contact/page.tsx', slug: 'contact' },
      { file: 'app/(marketing)/de/tours/page.tsx', slug: 'tours' },
    ],
  },
  {
    locale: 'it',
    home: { file: 'app/(marketing)/it/page.tsx', slug: 'home' },
    pages: [
      { file: 'app/(marketing)/it/about/page.tsx', slug: 'about' },
      { file: 'app/(marketing)/it/contact/page.tsx', slug: 'contact' },
      { file: 'app/(marketing)/it/tours/page.tsx', slug: 'tours' },
    ],
  },
  {
    locale: 'hi',
    home: { file: 'app/(marketing)/hi/page.tsx', slug: 'home' },
    pages: [
      { file: 'app/(marketing)/hi/about/page.tsx', slug: 'about' },
      { file: 'app/(marketing)/hi/contact/page.tsx', slug: 'contact' },
      { file: 'app/(marketing)/hi/tours/page.tsx', slug: 'tours' },
    ],
  },
  {
    locale: 'ar',
    home: { file: 'app/(marketing)/ar/page.tsx', slug: 'home' },
    pages: [
      { file: 'app/(marketing)/ar/about/page.tsx', slug: 'about' },
      { file: 'app/(marketing)/ar/contact/page.tsx', slug: 'contact' },
      { file: 'app/(marketing)/ar/tours/page.tsx', slug: 'tours' },
    ],
  },
  {
    locale: 'zh',
    home: { file: 'app/(marketing)/zh/page.tsx', slug: 'home' },
    pages: [
      { file: 'app/(marketing)/zh/about/page.tsx', slug: 'about' },
      { file: 'app/(marketing)/zh/contact/page.tsx', slug: 'contact' },
      { file: 'app/(marketing)/zh/tours/page.tsx', slug: 'tours' },
    ],
  },
]

async function run() {
  const uri = process.env.PAYLOAD_DATABASE_URL
  if (!uri) {
    console.error('PAYLOAD_DATABASE_URL not set in env')
    process.exit(1)
  }

  await mongoose.connect(uri)
  const db = mongoose.connection.db!
  const pages = db.collection('pages')
  const projectRoot = process.cwd()

  let created = 0
  let updated = 0
  let skipped = 0

  for (const entry of LOCALES) {
    console.log(`\n=== ${entry.locale.toUpperCase()} ===`)
    const allPages = [entry.home, ...entry.pages]

    for (const { file, slug } of allPages) {
      const filePath = path.join(projectRoot, file)
      const content = await readFile(filePath)
      if (!content) {
        console.log(`  [skip] ${slug} — file not found: ${file}`)
        skipped++
        continue
      }

      const meta = extractMeta(content)
      const docTitle = meta.title || meta.h1 || `${entry.locale} ${slug}`
      const existing = await pages.findOne({ slug, locale: entry.locale })

      const payload = {
        title: docTitle,
        slug,
        locale: entry.locale,
        _status: 'published' as const,
        meta: {
          title: meta.title,
          description: meta.description,
        },
        publishedAt: new Date(),
        updatedAt: new Date(),
      }

      if (existing) {
        await pages.updateOne({ _id: existing._id }, { $set: payload })
        console.log(`  [update] ${slug} — "${docTitle}"`)
        updated++
      } else {
        await pages.insertOne({
          ...payload,
          createdAt: new Date(),
        })
        console.log(`  [create] ${slug} — "${docTitle}"`)
        created++
      }
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Created: ${created}`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)

  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
