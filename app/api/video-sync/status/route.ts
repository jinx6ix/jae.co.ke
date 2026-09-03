// app/api/video-sync/status/route.ts
//
// Polling endpoint for the admin "Sync from YouTube/Instagram" buttons.
// Returns the current state of a job by id. Designed for short-lived
// in-process jobs (see /youtube/route.ts comments).
//
// Note: this route is intentionally under /api/video-sync/* (not
// /cms-api/*), to avoid the Payload-generated catch-all.

import { NextRequest, NextResponse } from 'next/server'

// The job map lives in a module-level scope. In Next.js dev/prod this
// re-imports once per server process, which is the right granularity for
// Vercel-style ephemeral workers.
import { jobs } from '../_jobs'

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get('jobId')
  if (!jobId) return NextResponse.json({ error: 'jobId required' }, { status: 400 })
  const job = jobs.get(jobId)
  if (!job) return NextResponse.json({ error: 'job not found' }, { status: 404 })
  return NextResponse.json(job)
}
