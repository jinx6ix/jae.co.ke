// scripts/export-media-from-db.ts
//
// What this script does:
//   1. Connects to MongoDB using PAYLOAD_DATABASE_URL
//   2. Reads every doc in the `media` collection
//   3. For each doc, checks whether a binary file exists at the path
//      Payload would have written it to: `public/media/<filename>`
//      AND on disk at `<project>/public/media/<filename>`
//   4. Writes a JSON manifest to `media-export.json` listing:
//        - every media doc (filename, url, mimeType, filesize, width, height, all sizes)
//        - whether its binary file is present on disk
//        - whether a hardcoded homepage reference (the 4 broken ones) is recoverable
//   5. Also writes `media-missing.txt` with just the filenames of broken records
//      so the user can see what to re-upload via /admin
//
// IMPORTANT — what is and isn't in the DB:
//   The `media` collection stores ONLY metadata (filename, url, mimeType,
//   filesize, width, height, focalX/Y, sizes). It does NOT store the
//   actual image binary. Payload writes the binary to `staticDir` on
//   disk (here: `public/media/`) when an upload happens via /admin. On
//   this dev machine that directory is empty — every uploaded binary
//   was lost when Vercel's ephemeral disk was wiped.
//
//   To restore the images, you have two options:
//     A) Re-upload the originals through /admin (one by one or via the
//        Payload API). After re-uploading, this same script can verify
//        the files are back on disk.
//     B) Drop the binary files into `public/media/` directly (one per
//        filename in the manifest). The `staticDir` config will then
//        serve them via `/cms-api/media/file/<filename>` and
//        `toLocalMediaUrl()` will rewrite to `/media/<filename>` for
//        `next/image`.
//
// Usage: `npx tsx scripts/export-media-from-db.ts`

import 'dotenv/config'
import mongoose from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const PROJECT_ROOT = path.resolve(path.dirname(__filename), '..')
const PUBLIC_MEDIA = path.join(PROJECT_ROOT, 'public', 'media')
const OUT_JSON = path.join(PROJECT_ROOT, 'media-export.json')
const OUT_MISSING = path.join(PROJECT_ROOT, 'media-missing.txt')

type Size = {
  url: string | null
  filename: string | null
  filesize: number | null
  width: number | null
  height: number | null
  mimeType: string | null
}

type MediaDoc = {
  _id: unknown
  filename: string
  url: string
  alt?: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX?: number
  focalY?: number
  sizes: Record<string, Size>
  binaryOnDisk: boolean
  sizesOnDisk: Record<string, boolean>
}

async function run() {
  if (!fs.existsSync(PUBLIC_MEDIA)) {
    fs.mkdirSync(PUBLIC_MEDIA, { recursive: true })
    console.log(`Created ${PUBLIC_MEDIA}`)
  }

  await mongoose.connect(process.env.PAYLOAD_DATABASE_URL!)
  const db = mongoose.connection.db!
  const cursor = db.collection('media').find({})

  const manifest: MediaDoc[] = []
  const missing: string[] = []

  let total = 0
  let withBinary = 0
  while (await cursor.hasNext()) {
    const d = await cursor.next()
    if (!d) continue
    total++

    const filename = d.filename as string
    const binaryPath = path.join(PUBLIC_MEDIA, filename)
    const binaryOnDisk = fs.existsSync(binaryPath)
    if (binaryOnDisk) withBinary++

    const sizesOnDisk: Record<string, boolean> = {}
    if (d.sizes && typeof d.sizes === 'object') {
      for (const [name, sv] of Object.entries(d.sizes as Record<string, Size>)) {
        if (sv && sv.filename) {
          sizesOnDisk[name] = fs.existsSync(path.join(PUBLIC_MEDIA, sv.filename))
        } else {
          sizesOnDisk[name] = false
        }
      }
    }

    if (!binaryOnDisk) missing.push(filename)

    manifest.push({
      _id: d._id,
      filename,
      url: d.url,
      alt: d.alt,
      mimeType: d.mimeType,
      filesize: d.filesize,
      width: d.width,
      height: d.height,
      focalX: d.focalX,
      focalY: d.focalY,
      sizes: d.sizes as Record<string, Size>,
      binaryOnDisk,
      sizesOnDisk,
    })
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(manifest, null, 2))
  fs.writeFileSync(OUT_MISSING, missing.join('\n') + '\n')

  console.log(`\n=== Media export summary ===`)
  console.log(`Total docs in DB:    ${total}`)
  console.log(`Binaries on disk:    ${withBinary}`)
  console.log(`Missing binaries:    ${missing.length}`)
  console.log(`\nWrote: ${path.relative(PROJECT_ROOT, OUT_JSON)}`)
  console.log(`Wrote: ${path.relative(PROJECT_ROOT, OUT_MISSING)}`)

  if (missing.length > 0) {
    console.log(`\nFirst 10 missing filenames:`)
    missing.slice(0, 10).forEach(f => console.log(`  ${f}`))
  }

  // Highlight the 4 hardcoded homepage references
  const homepageBroken = [
    'accessible-vehicle-lift.jpg',
    'wheelchair-securement.jpg',
    'accessible-safari-interior.jpg',
    'medical-kit-safari.jpg',
  ]
  console.log(`\nHomepage hardcoded references (NOT in DB at all):`)
  for (const f of homepageBroken) {
    const inDb = manifest.find(m => m.filename === f)
    console.log(`  ${f}: ${inDb ? 'IN DB' : 'NOT IN DB'}${inDb ? (inDb.binaryOnDisk ? ' (binary on disk)' : ' (no binary)') : ''}`)
  }

  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
