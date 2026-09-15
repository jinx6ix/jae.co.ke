import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { checkDiscovery } from '../../../../lib/social-indexing-discovery'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // 1. Find pending URLs or URLs due for recheck
  const assets = await payload.find({
    collection: 'social-indexing-assets',
    where: {
      or: [
        { discoveryStatus: { equals: 'pending' } },
        {
            and: [
                { discoveryStatus: { equals: 'not_discovered' } },
                { lastCheckedAt: { less_than: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() } }
            ]
        }
      ]
    },
    limit: 10,
  })

  // 2. Perform checks
  for (const asset of assets.docs) {
    try {
      await payload.update({
        collection: 'social-indexing-assets',
        id: asset.id,
        data: { discoveryStatus: 'checking', lastCheckedAt: new Date().toISOString() },
      })

      const result = await checkDiscovery(asset.socialUrl)

      await payload.update({
        collection: 'social-indexing-assets',
        id: asset.id,
        data: {
            discoveryStatus: result.discovered ? 'discovered' : 'not_discovered',
            firstDiscoveredAt: result.discovered && !asset.firstDiscoveredAt ? new Date().toISOString() : asset.firstDiscoveredAt
        },
      })

      // 3. Record history (create a new collection for history? Or just add a JSON field to Asset?)
      // The requirement was: Create a history mechanism if appropriate.

    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      await payload.update({
        collection: 'social-indexing-assets',
        id: asset.id,
        data: { discoveryStatus: 'error', lastError: message },
      })
    }
  }

  return NextResponse.json({ success: true, processed: assets.docs.length })
}
