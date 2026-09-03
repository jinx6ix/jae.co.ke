// app/api/video-sync/_jobs.ts
//
// In-process job store for the YouTube/Instagram bulk-import endpoints.
// See ./youtube/route.ts and ./instagram/route.ts for callers.
//
// In a Vercel deployment this state lives in a single serverless
// function's memory and is lost on cold start. Acceptable for short
// syncs (< 60s). For long-running jobs we'd want a persistent queue.

export interface VideoSyncJob {
  status: 'running' | 'done' | 'error'
  provider: 'youtube' | 'instagram'
  total: number
  processed: number
  created: number
  updated: number
  errors: Array<{ externalId: string; message: string }>
  startedAt: number
  finishedAt?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any
if (!g.__videoSyncJobs) {
  g.__videoSyncJobs = new Map<string, VideoSyncJob>()
}
export const jobs: Map<string, VideoSyncJob> = g.__videoSyncJobs
