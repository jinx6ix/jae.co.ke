// scripts/restore-media-from-public.ts
//
// Restores 301 media binaries from `public/<filename>` (which the user
// dropped the originals into) into `public/media/<filename>` where
// Payload's staticDir serves them, then regenerates the size variants
// defined in `media-export.json` using sharp.
//
// What it does, in order:
//   1. Loads `media-export.json` (the manifest from
//      scripts/export-media-from-db.ts).
//   2. For each Media doc:
//      a. If the source file is at `public/<filename>`, copy it to
//         `public/media/<filename>` (binary restored).
//      b. For each size variant that has a `filename` in the manifest
//         and is not null, generate the variant with sharp and write
//         it to `public/media/<filename>`. The size variant's
//         width/height comes from the manifest, so the file gets
//         exactly the same dimensions Payload originally produced.
//   3. Prints a summary: how many originals were restored, how many
//      size variants were regenerated, how many were missing.
//
// Usage:  npx tsx scripts/restore-media-from-public.ts

import 'dotenv/config'
import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const PROJECT_ROOT = path.resolve(path.dirname(__filename), '..')
const PUBLIC = path.join(PROJECT_ROOT, 'public')
const PUBLIC_MEDIA = path.join(PUBLIC, 'media')
const MANIFEST = path.join(PROJECT_ROOT, 'media-export.json')

type Size = {
  url: string | null
  filename: string | null
  filesize: number | null
  width: number | null
  height: number | null
  mimeType: string | null
}

type MediaDoc = {
  _id: string
  filename: string
  url: string
  mimeType: string
  filesize: number
  width: number
  height: number
  sizes: Record<string, Size>
}

async function run() {
  if (!fs.existsSync(PUBLIC_MEDIA)) fs.mkdirSync(PUBLIC_MEDIA, { recursive: true })

  const manifest: MediaDoc[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'))
  console.log(`Loaded ${manifest.length} docs from manifest`)

  // Stats
  let originalsRestored = 0
  let originalsMissing = 0
  const missingFiles: string[] = []
  let sizesGenerated = 0
  let sizesSkipped = 0
  let sizesFailed = 0

  // Cache source files to avoid repeated disk reads when generating
  // multiple size variants of the same source.
  for (let i = 0; i < manifest.length; i++) {
    const doc = manifest[i]
    const srcPath = path.join(PUBLIC, doc.filename)
    const dstPath = path.join(PUBLIC_MEDIA, doc.filename)

    // 1. Restore the original binary.
    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(dstPath)) {
        fs.copyFileSync(srcPath, dstPath)
        originalsRestored++
      }
    } else {
      originalsMissing++
      missingFiles.push(doc.filename)
      continue // can't generate sizes if we don't have the source
    }

    // 2. Generate each size variant. Match Payload's logic in
    //    cms/collections/Media.ts:
    //      - thumbnail/small/medium/large/xlarge: width-only, preserve
    //        aspect ratio (height in the manifest is just the
    //        proportional height of the source for that width).
    //      - square (500x500) and og (1200x630): both width AND height
    //        are set in the Media config, so they crop to exact dims.
    //    We detect the cropping case by checking whether the source
    //    aspect ratio matches the target — if not, the manifest's
    //    dimensions were produced by cropping.
    for (const [sizeName, sv] of Object.entries(doc.sizes)) {
      if (!sv || !sv.filename || !sv.width || !sv.height) {
        sizesSkipped++
        continue
      }
      const sizePath = path.join(PUBLIC_MEDIA, sv.filename)
      if (fs.existsSync(sizePath)) {
        sizesSkipped++
        continue
      }
      try {
        // `square` and `og` in the Media config specify BOTH width and
        // height, so Payload crops. All other sizes specify only width
        // and preserve aspect ratio. Detect cropping by checking if
        // the manifest's height matches what width-only resizing would
        // produce from the original.
        const srcMeta = await sharp(srcPath).metadata()
        const srcW = srcMeta.width ?? doc.width
        const srcH = srcMeta.height ?? doc.height
        const aspectSrc = srcW / srcH
        const aspectTarget = sv.width / sv.height
        const needsCrop = Math.abs(aspectSrc - aspectTarget) > 0.01

        if (needsCrop) {
          // Crop to exact width AND height (square, og)
          await sharp(srcPath)
            .resize(sv.width, sv.height, { fit: 'cover', position: 'centre' })
            .toFile(sizePath)
        } else {
          // Width-only, preserve aspect
          await sharp(srcPath)
            .resize(sv.width, null, { fit: 'inside', withoutEnlargement: true })
            .toFile(sizePath)
        }
        sizesGenerated++
      } catch (err) {
        sizesFailed++
        console.error(`  Failed to generate ${sv.filename}:`, (err as Error).message)
      }
    }

    // Progress
    if ((i + 1) % 25 === 0) {
      console.log(`  ...processed ${i + 1}/${manifest.length}`)
    }
  }

  console.log(`\n=== Restore summary ===`)
  console.log(`Originals restored:     ${originalsRestored}`)
  console.log(`Originals missing:      ${originalsMissing}`)
  console.log(`Size variants generated: ${sizesGenerated}`)
  console.log(`Size variants skipped:   ${sizesSkipped}  (already existed or no size in manifest)`)
  console.log(`Size variants failed:    ${sizesFailed}`)

  if (missingFiles.length > 0) {
    console.log(`\nFirst 20 missing originals (no file at public/<filename>):`)
    missingFiles.slice(0, 20).forEach(f => console.log(`  ${f}`))
  }

  // Sanity: count files now in public/media/
  const finalCount = fs.readdirSync(PUBLIC_MEDIA).length
  console.log(`\nFiles in public/media/ now: ${finalCount}`)
}

run().catch(err => { console.error(err); process.exit(1) })
