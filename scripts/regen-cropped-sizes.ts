// scripts/regen-cropped-sizes.ts
//
// Re-generates only the `square` and `og` size variants with the
// correct crop fit. The first pass of restore-media-from-public.ts
// used `fit: inside` for everything, which left the cropping sizes
// (square, og) with the wrong dimensions.

import 'dotenv/config'
import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'

async function main() {
  const PUBLIC_MEDIA = path.join(process.cwd(), 'public', 'media')
  const manifest = JSON.parse(fs.readFileSync('media-export.json', 'utf-8'))

  let regen = 0
  let skipped = 0
  let failed = 0

  for (const doc of manifest) {
    const srcPath = path.join(PUBLIC_MEDIA, doc.filename)
    if (!fs.existsSync(srcPath)) continue

    for (const [name, sv] of Object.entries(doc.sizes) as [string, any][]) {
      if (!sv?.filename || !sv?.width || !sv?.height) continue
      // Only re-gen the cropping sizes: square, og, and any other
      // variant where the manifest's height doesn't match what a
      // width-only resize would produce.
      const srcMeta = await sharp(srcPath).metadata()
      const srcW = srcMeta.width ?? doc.width
      const srcH = srcMeta.height ?? doc.height
      const aspectSrc = srcW / srcH
      const aspectTarget = sv.width / sv.height
      const needsCrop = Math.abs(aspectSrc - aspectTarget) > 0.01
      if (!needsCrop) {
        skipped++
        continue
      }

      const sizePath = path.join(PUBLIC_MEDIA, sv.filename)
      try {
        await sharp(srcPath)
          .resize(sv.width, sv.height, { fit: 'cover', position: 'centre' })
          .toFile(sizePath)
        regen++
      } catch (err) {
        failed++
        console.error(`  ${sv.filename}: ${(err as Error).message}`)
      }
    }
  }

  console.log(`\n=== Re-generate cropping sizes ===`)
  console.log(`Cropped variants regenerated: ${regen}`)
  console.log(`Non-cropped variants skipped: ${skipped}`)
  console.log(`Failed: ${failed}`)
}

main().catch(err => { console.error(err); process.exit(1) })
