// scripts/ingest-marketing-media.ts
//
// Run once after the CMS is connected to a real MongoDB:
//   pnpm cms:ingest-media
//
// What it does:
//   Walks the directory at MEDIA_SOURCE_DIR (defaults to the user's
//   image dump at
//   `C:\Users\Jinx\Documents\Jae.co.ke\jaetravel-complete-project\complete-project\public`),
//   uploads every image file to Payload's `media` collection, and skips
//   anything already present (by `filename`).
//
// Why a script and not a one-off admin upload:
//   There are 303 files in the source folder. Uploading by hand through
//   the admin UI works, but is tedious, doesn't generate stable alt
//   text, and isn't re-runnable. This script does the same job the
//   admin would, just batched — and since `getPayload({ config })` runs
//   as a Payload init user, the `authenticated` access control on
//   `Media.create` is satisfied without needing a login cookie.
//
// The destination is Payload's `media` collection (cms/public/media on
// disk, MongoDB row per file). The marketing pages' hardcoded
// `<Image src="/foo.jpg" />` references are resolved to Media doc URLs
// at render time by the <MarketingImage> wrapper
// (app/(marketing)/_components/MarketingImage.tsx) — see the plan in
// `.claude-omniroute/plans/eventual-strolling-fox.md` for why.

import 'dotenv/config'
import { readdir, readFile, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { getPayload } from 'payload'
import config from '@payload-config'

const DEFAULT_SOURCE_DIR =
  'C:/Users/Jinx/Documents/Jae.co.ke/jaetravel-complete-project/complete-project/public'

// Whitelist matches the formats the rest of the app actually serves
// (next.config.ts localPatterns) and what sharp can resize into
// Payload's 7 derived sizes. Excludes .ico, .svg (sharp handles svgs
// but they're rarely worth the bandwidth), .avif (sharp can decode but
// re-encoding is lossy — accept avif inputs as jpeg if needed), .pdf
// (separate collection), .lnk (Windows shortcut, not an image),
// and any non-image files in the source folder (llms.txt, etc.).
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// Source folder contains a `pdfs/` subfolder the user uses for itinerary
// downloads. Don't walk into it — that goes in a separate collection.
const SKIP_DIRS = new Set(['pdfs'])

// Derive a human-readable alt from the filename when the script is
// running blind (no sidecar `.alt.txt`). Strips extension, replaces
// [-_] with space, title-cases each word. Good enough as a starting
// point — user refines in admin.
function altFromFilename(name: string): string {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

async function main() {
  const sourceDir = process.env.MEDIA_SOURCE_DIR
    ? resolve(process.env.MEDIA_SOURCE_DIR)
    : DEFAULT_SOURCE_DIR

  console.log(`Source: ${sourceDir}`)

  let entries: string[]
  try {
    entries = await readdir(sourceDir)
  } catch (err) {
    console.error(`Cannot read source directory: ${(err as Error).message}`)
    console.error(
      `Set MEDIA_SOURCE_DIR to point at the image folder, or place files under the default path.`,
    )
    process.exit(1)
  }

  const imageFiles = entries
    .filter((name) => !SKIP_DIRS.has(name))
    .filter((name) => IMAGE_EXTENSIONS.has(extname(name).toLowerCase()))
    .sort()

  console.log(`Found ${imageFiles.length} image files.`)
  if (imageFiles.length === 0) {
    console.log('Nothing to do.')
    process.exit(0)
  }

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let failed = 0

  for (const name of imageFiles) {
    const fullPath = join(sourceDir, name)

    let fileStat
    try {
      fileStat = await stat(fullPath)
    } catch (err) {
      console.warn(`  [skip] cannot stat ${name}: ${(err as Error).message}`)
      skipped++
      continue
    }

    if (!fileStat.isFile()) {
      skipped++
      continue
    }

    try {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: name } },
        limit: 1,
        depth: 0,
      })
      if (existing.docs.length > 0) {
        skipped++
        continue
      }
    } catch (err) {
      console.error(`  [fail] lookup ${name}: ${(err as Error).message}`)
      failed++
      continue
    }

    let buffer: Buffer
    try {
      buffer = await readFile(fullPath)
    } catch (err) {
      console.error(`  [fail] read ${name}: ${(err as Error).message}`)
      failed++
      continue
    }

    const ext = extname(name).toLowerCase()
    const mimeType =
      ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.png'
          ? 'image/png'
          : 'image/webp'

    try {
      await payload.create({
        collection: 'media',
        data: {
          alt: altFromFilename(name),
        },
        file: {
          data: buffer,
          mimetype: mimeType,
          name,
          size: buffer.length,
        },
        // depth: 0 so the script doesn't re-fetch related docs it doesn't
        // need (the Media doc has no relations on this code path).
        depth: 0,
      })
      created++
      // Progress: 1 log per file would flood the terminal at 303. Log
      // every 25 + always at the end.
      if (created % 25 === 0) {
        console.log(`  ...${created} created so far`)
      }
    } catch (err) {
      console.error(`  [fail] upload ${name}: ${(err as Error).message}`)
      failed++
    }
  }

  console.log('')
  console.log(`Done. Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`)
  if (created > 0) {
    console.log(`Visit /admin/collections/media to refine alt text and add captions.`)
  }
  if (failed > 0) {
    console.log(`Some uploads failed — re-run after fixing; successful ones will be skipped.`)
    process.exit(1)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('Ingest failed:', err)
  process.exit(1)
})
