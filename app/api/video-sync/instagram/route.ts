// app/api/video-sync/instagram/route.ts
//
// Admin-only POST endpoint that bulk-imports every media item on the
// connected Instagram Business account into the Videos collection.
// Mirrors ./youtube/route.ts — returns a jobId immediately; the client
// polls /api/video-sync/status?jobId=... for progress.

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@payload-config'
import { listAccountMedia } from '../../../../lib/instagram'
import { getAccountTokens } from '../../../../lib/instagram/account-store'
import { jobs } from '../_jobs'

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  const authHeader = req.headers.get('authorization') || ''
  const isAuthorized =
    Boolean(user) ||
    (process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)
  if (!isAuthorized) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // Read the long-lived user token from the encrypted store.
  // Falls back to the deprecated env-var pair only if the store has
  // no row at all — a documented escape hatch for when the OAuth app
  // is in dev mode and the editor doesn't want to click through the
  // dialog.
  let account: Awaited<ReturnType<typeof getAccountTokens>>
  try {
    account = await getAccountTokens('instagram')
  } catch (err) {
    // Refresh-on-read failed (e.g. Meta revoked the token). Surface a
    // 401 so the admin UI knows to prompt the editor to reconnect.
    const message = err instanceof Error ? err.message : String(err)
    payload.logger.error(`[video-sync/instagram] token read failed: ${message}`)
    return NextResponse.json(
      { error: 'Instagram token is invalid. Please reconnect from the admin dashboard.', detail: message },
      { status: 401 },
    )
  }

  let accessToken: string
  let igUserId: string
  if (account) {
    accessToken = account.accessToken
    igUserId = account.externalId
  } else {
    // No row in the store. Fall back to env vars for the legacy
    // bootstrap path (admin modal + CLI script writing to .env).
    const envToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const envId = process.env.INSTAGRAM_USER_ID
    if (!envToken || !envId) {
      return NextResponse.json(
        {
          error:
            'Instagram account not connected. Open the admin dashboard and click "Connect Instagram", or paste a short-lived token via the "Mint" modal.',
        },
        { status: 412 },
      )
    }
    accessToken = envToken
    igUserId = envId
  }

  const jobId = genId()
  jobs.set(jobId, {
    status: 'running',
    provider: 'instagram',
    total: 0,
    processed: 0,
    created: 0,
    updated: 0,
    errors: [],
    startedAt: Date.now(),
  })

  void runInstagramSync(payload, jobId, igUserId, accessToken)

  return NextResponse.json({ jobId })
}

async function runInstagramSync(
  payload: Awaited<ReturnType<typeof getPayload>>,
  jobId: string,
  igUserId: string,
  accessToken: string,
) {
  const job = jobs.get(jobId)
  if (!job) return
  try {
    const pages: string[][] = []
    for await (const ids of listAccountMedia(igUserId, accessToken)) {
      pages.push(ids)
    }
    const allIds = pages.flat()
    job.total = allIds.length

    for (const id of allIds) {
      try {
        const existing = await payload.find({
          collection: 'videos',
          where: {
            and: [
              { provider: { equals: 'instagram' } },
              { externalId: { equals: id } },
            ],
          },
          limit: 1,
          depth: 0,
        })
        const data = {
          provider: 'instagram' as const,
          externalId: id,
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
        payload.logger.error(`[video-sync/instagram] ${id}: ${message}`)
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
    payload.logger.error(`[video-sync/instagram] fatal: ${message}`)
  }
}

export async function GET() {
  return NextResponse.json({ error: 'use POST to start a sync' }, { status: 405 })
}
