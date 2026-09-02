import 'dotenv/config'
import { getPayload } from 'payload'
import config from './cms/payload.config.ts'

const p = await getPayload({ config })
const tours = await p.find({ collection: 'tours', limit: 200, overrideAccess: true })
const bt = await p.find({ collection: 'budget-tours', limit: 200, overrideAccess: true })
console.log('=== TOURS (' + tours.docs.length + ') ===')
tours.docs.forEach(t => console.log(t.slug, '|', t.title))
console.log('=== BUDGET TOURS (' + bt.docs.length + ') ===')
bt.docs.forEach(t => console.log(t.slug, '|', t.title))
process.exit(0)
