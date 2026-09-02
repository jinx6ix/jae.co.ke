// scripts/verify-restore-render.ts
import * as fs from 'fs'
import * as path from 'path'
import { toLocalMediaUrl } from '../lib/marketing-media'

async function main() {
  const PUBLIC_MEDIA = path.join(process.cwd(), 'public', 'media')
  const sample = ['0.jpeg', '06-08-2013-PNVi-Gorilles-Brent-Striton-09275-1400x928.jpg', '1-Day-Map.jpg']
  for (const f of sample) {
    const p = path.join(PUBLIC_MEDIA, f)
    console.log(`${f}: onDisk=${fs.existsSync(p)} size=${fs.existsSync(p) ? fs.statSync(p).size : 0}`)
  }
  console.log('\ntoLocalMediaUrl:')
  for (const c of ['/cms-api/media/file/0.jpeg', 'https://www.jaetravel.co.ke/cms-api/media/file/0.jpeg', '/media/0.jpeg']) {
    console.log(`  ${c} -> ${toLocalMediaUrl(c)}`)
  }
}
main().catch(err => { console.error(err); process.exit(1) })
