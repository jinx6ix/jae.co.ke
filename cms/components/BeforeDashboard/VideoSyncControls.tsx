// cms/components/BeforeDashboard/VideoSyncControls.tsx
//
// Two buttons the admin clicks from the dashboard to bulk-import videos
// from YouTube and Instagram. Hits /api/video-sync/youtube and
// /api/video-sync/instagram, then polls /api/video-sync/status for
// progress. Designed to be embedded on the admin dashboard so editors
// don't have to remember an admin route.
//
// Lives in the BeforeDashboard folder (already a custom component on the
// admin dashboard) — the parent component imports this and renders it.

import React, { useState } from 'react'

type JobState = {
  jobId: string
  status: 'running' | 'done' | 'error'
  total: number
  processed: number
  created: number
  updated: number
  errors: Array<{ externalId: string; message: string }>
}

const baseClass = 'video-sync-controls'

export const VideoSyncControls: React.FC = () => {
  const [ytJob, setYtJob] = useState<JobState | null>(null)
  const [igJob, setIgJob] = useState<JobState | null>(null)
  const [busy, setBusy] = useState<{ youtube?: boolean; instagram?: boolean }>({})

  async function startSync(provider: 'youtube' | 'instagram') {
    setBusy((b) => ({ ...b, [provider]: true }))
    try {
      const res = await fetch(`/api/video-sync/${provider}`, { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        alert(`Failed to start ${provider} sync: ${json.error || res.statusText}`)
        return
      }
      const setter = provider === 'youtube' ? setYtJob : setIgJob
      setter({
        jobId: json.jobId,
        status: 'running',
        total: 0,
        processed: 0,
        created: 0,
        updated: 0,
        errors: [],
      })
      poll(provider, json.jobId, setter)
    } catch (err) {
      alert(`Failed to start ${provider} sync: ${(err as Error).message}`)
    } finally {
      setBusy((b) => ({ ...b, [provider]: false }))
    }
  }

  function poll(
    provider: 'youtube' | 'instagram',
    jobId: string,
    setter: (j: JobState | null) => void,
  ) {
    const tick = async () => {
      const res = await fetch(`/api/video-sync/status?jobId=${jobId}`)
      if (!res.ok) return
      const json = (await res.json()) as JobState
      setter(json)
      if (json.status === 'running') {
        setTimeout(tick, 2000)
      }
    }
    void tick()
  }

  return (
    <div className={baseClass} style={{ marginTop: 24, padding: 16, border: '1px solid var(--theme-elevation-150)', borderRadius: 8 }}>
      <h3 style={{ margin: '0 0 8px' }}>Video library</h3>
      <p style={{ margin: '0 0 12px', color: 'var(--theme-elevation-600)' }}>
        Pull every upload from your YouTube channel and every post/reel from your connected
        Instagram Business account into the Videos collection. New items appear as
        relationships in the VideoBlock picker.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn--style-primary btn--size-medium"
          disabled={busy.youtube || ytJob?.status === 'running'}
          onClick={() => startSync('youtube')}
        >
          {busy.youtube || ytJob?.status === 'running' ? 'Syncing YouTube…' : 'Sync from YouTube'}
        </button>
        <button
          type="button"
          className="btn btn--style-secondary btn--size-medium"
          disabled={busy.instagram || igJob?.status === 'running'}
          onClick={() => startSync('instagram')}
        >
          {busy.instagram || igJob?.status === 'running'
            ? 'Syncing Instagram…'
            : 'Sync from Instagram'}
        </button>
      </div>
      <JobProgress label="YouTube" job={ytJob} />
      <JobProgress label="Instagram" job={igJob} />
    </div>
  )
}

const JobProgress: React.FC<{ label: string; job: JobState | null }> = ({ label, job }) => {
  if (!job) return null
  const pct = job.total ? Math.round((job.processed / job.total) * 100) : 0
  return (
    <div style={{ marginTop: 12 }}>
      <strong>{label}:</strong>{' '}
      {job.status === 'running'
        ? `${job.processed}/${job.total} (${pct}%) — created ${job.created}, updated ${job.updated}`
        : job.status === 'done'
          ? `Done — ${job.created} created, ${job.updated} updated, ${job.errors.length} errors`
          : `Error — ${job.errors[0]?.message || 'see logs'}`}
      {job.errors.length > 0 && (
        <details style={{ marginTop: 4 }}>
          <summary>Errors ({job.errors.length})</summary>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {job.errors.slice(0, 20).map((e, i) => (
              <li key={i}>
                <code>{e.externalId}</code>: {e.message}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
