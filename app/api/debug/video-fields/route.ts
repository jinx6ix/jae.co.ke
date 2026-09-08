import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'videos',
      limit: 3,
      depth: 0,
      overrideAccess: true,
    })

    return Response.json({
      totalDocs: result.totalDocs,

      videos: result.docs.map((doc) => ({
        keys: Object.keys(doc),
        id: (doc as any).id,
        slug: (doc as any).slug,
        title: (doc as any).title,
        provider: (doc as any).provider,
        externalId: (doc as any).externalId,
        url: (doc as any).url,
        thumbnailUrl: (doc as any).thumbnailUrl,
        publishedAt: (doc as any).publishedAt,
      })),
    })
  } catch (error) {
    console.error('[video-fields] FAILED:', error)

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 },
    )
  }
}