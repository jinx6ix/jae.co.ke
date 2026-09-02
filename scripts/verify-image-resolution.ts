import 'dotenv/config'
import { resolveMarketingImage, getMediaUrlByFilename, toLocalMediaUrl } from '../lib/marketing-media'

async function run() {
  console.log('=== resolveMarketingImage tests ===')

  // 4 hardcoded paths from homepage
  const cases = [
    '/accessible-vehicle-lift.jpg',
    '/wheelchair-securement.jpg',
    '/accessible-safari-interior.jpg',
    '/medical-kit-safari.jpg',
    '/accessible-safari-wheelchair.jpg', // exists
  ]
  for (const c of cases) {
    const url = await resolveMarketingImage(c)
    console.log(`  ${c} -> ${url}`)
  }

  console.log('=== getMediaUrlByFilename tests ===')
  const filenames = [
    'wheelchair-accessible-vehicle-ramp.jpg',
    'wheelchair-restraints-header-mobile.jpg',
    'accessible-safari-vehicle-interior-wheelchair-spac.jpg',
    'masai-mara-wheelchair-height.jpg',
    'accessible-safari-wheelchair.jpg',
  ]
  for (const f of filenames) {
    const url = await getMediaUrlByFilename(f)
    console.log(`  ${f} -> ${url}`)
  }

  console.log('=== toLocalMediaUrl tests ===')
  console.log('  /cms-api/media/file/foo.jpg ->', toLocalMediaUrl('/cms-api/media/file/foo.jpg'))
  console.log('  https://x.com/cms-api/media/file/foo.jpg ->', toLocalMediaUrl('https://x.com/cms-api/media/file/foo.jpg'))
}
run().catch(err => { console.error(err); process.exit(1) })
