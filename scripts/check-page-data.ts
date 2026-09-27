import { getPayload } from 'payload'
import config from '@payload-config'
import 'dotenv/config'

async function checkPageData() {
  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tour-operators-in-kenya' } },
    limit: 1,
  })

  if (page.docs.length > 0) {
    console.log(JSON.stringify(page.docs[0].layout, null, 2))
  } else {
    console.log('Page not found')
  }
}

checkPageData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
