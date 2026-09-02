import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../cms/payload.config.ts'

const payload = await getPayload({ config })
const r = await payload.find({ collection: 'pages', limit: 50, depth: 0 })
for (const d of r.docs) {
  console.log(d.slug, '|', d.title, '| status:', d._status)
}
process.exit(0)
