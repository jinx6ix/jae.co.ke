// app/api/video-sync/youtube/route.ts
//
// Admin-only POST endpoint that bulk-imports every upload on a YouTube
// channel into the Videos collection. Returns a jobId immediately; the
// client polls /api/video-sync/status?jobId=... for progress.
//
// Lives under /api/video-sync/* (not /cms-api/*) because Payload's
// auto-generated /cms-api/[...slug]/route.ts catch-all would otherwise
// claim this path. This is the standard Payload pattern for adding
// custom endpoints that don't go through the REST/GraphQL surface.

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@payload-config'
import { listChannelUploads } from '../../../../lib/youtube'
import { jobs } from '../_jobs'

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

export async function POST(req: NextRequest) {
  // Auth: must be an authenticated Payload user. The header-based check
  // here is for non-browser callers (cron, scripts). Browser callers
  // authenticate via the Payload admin session cookie, which we check
  // by calling getPayload({ req }) below.
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: 'YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID is not set' },
      { status: 500 },
    )
  }

  const payload = await getPayload({ config })
  // Authenticate: either a logged-in admin (Payload session cookie) or a
  // trusted caller passing `Authorization: Bearer ${CRON_SECRET}`. The
  // Payload cookie auth comes through `payload.auth(req)` which honours
  // the standard Payload session token.
  const { user } = await payload.auth({ headers: req.headers })
  const authHeader = req.headers.get('authorization') || ''
  const isAuthorized =
    Boolean(user) ||
    (process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)
  if (!isAuthorized) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const jobId = genId()
  jobs.set(jobId, {
    status: 'running',
    provider: 'youtube',
    total: 0,
    processed: 0,
    created: 0,
    updated: 0,
    errors: [],
    startedAt: Date.now(),
  })

  // Fire-and-forget. Vercel will keep the function alive for the duration
  // of the sync (typically <60s for a small channel). For very large
  // channels we'd want to switch to background tasks.
  void runYouTubeSync(payload, jobId, channelId, apiKey)

  return NextResponse.json({ jobId })
}

async function runYouTubeSync(
  payload: Awaited<ReturnType<typeof getPayload>>,
  jobId: string,
  channelId: string,
  apiKey: string,
) {
  const job = jobs.get(jobId)
  if (!job) return
  try {
    // First pass: collect every video id and total count.
    const pages: string[][] = []
    for await (const ids of listChannelUploads(channelId, apiKey)) {
      pages.push(ids)
    }
    const allIds = pages.flat()
    job.total = allIds.length

    for (const id of allIds) {
      try {
        // Look for an existing record (idempotent re-runs).
        const existing = await payload.find({
          collection: 'videos',
          where: {
            and: [
              { provider: { equals: 'youtube' } },
              { externalId: { equals: id } },
            ],
          },
          limit: 1,
          depth: 0,
        })
        const data = {
          provider: 'youtube' as const,
          externalId: id,
          // The beforeChange hook fetches the rest from the Data API.
          // We pass skipSync:false to let it run.
        }
        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'videos',
            id: existing.docs[0].id,
            data: { ...data, skipSync: false },
          })
          job.updated++
        } else {
          await payload.create({
            collection: 'videos',
            data: { ...data, skipSync: false },
          })
          job.created++
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        job.errors.push({ externalId: id, message })
        payload.logger.error(`[video-sync/youtube] ${id}: ${message}`)
      } finally {
        job.processed++
      }
    }
    job.status = 'done'
    job.finishedAt = Date.now()
  } catch (err) {
    job.status = 'error'
    job.finishedAt = Date.now()
    const message = err instanceof Error ? err.message : String(err)
    job.errors.push({ externalId: '*', message })
    payload.logger.error(`[video-sync/youtube] fatal: ${message}`)
  }
}

export async function GET() {
  return NextResponse.json({ error: 'use POST to start a sync' }, { status: 405 })
}
