// scripts/verify-restore.ts
import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'

async function main() {
  const PUBLIC_MEDIA = path.join(process.cwd(), 'public', 'media')
  const manifest = JSON.parse(fs.readFileSync('media-export.json', 'utf-8'))
  const sample = manifest.slice(0, 5)

  for (const doc of sample) {
    const original = path.join(PUBLIC_MEDIA, doc.filename)
    if (!fs.existsSync(original)) {
      console.log(`SKIP ${doc.filename} (no original)`)
      continue
    }
    const meta = await sharp(original).metadata()
    console.log(`${doc.filename}: ${meta.width}x${meta.height} (expected ${doc.width}x${doc.height})`)
    for (const [name, sv] of Object.entries(doc.sizes) as [string, any][]) {
      if (!sv?.filename) continue
      const p = path.join(PUBLIC_MEDIA, sv.filename)
      if (!fs.existsSync(p)) {
        console.log(`  ${name}: MISSING`)
        continue
      }
      const m = await sharp(p).metadata()
      const ok = m.width === sv.width && m.height === sv.height ? 'OK' : `MISMATCH (got ${m.width}x${m.height})`
      console.log(`  ${name} -> ${sv.filename}: ${m.width}x${m.height} (expected ${sv.width}x${sv.height}) ${ok}`)
    }
  }
}

main().catch(err => { console.error(err); process.exit(1) })
