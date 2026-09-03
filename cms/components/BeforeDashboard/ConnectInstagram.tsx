// cms/components/BeforeDashboard/ConnectInstagram.tsx
//
// "Connect Instagram" button + live status panel for the admin dashboard.
//
// Three visual states:
//   1. Not connected — "Connect Instagram" button →
//      /api/social/instagram/connect (which 302s to Meta's OAuth dialog).
//   2. Connected — shows @handle, days-until-expiry, and a Disconnect
//      button (POSTs to /api/social/instagram/disconnect).
//   3. Refreshing — transient; visible only on the click that triggers
//      a fresh OAuth round-trip.
//
// On mount:
//   - Reads the ?ig=connected|error&message=… query param (set by the
//     OAuth callback) and shows a one-time banner. Clears the param
//     from the URL after 6 seconds so a refresh doesn't re-show it.
//   - Polls /api/social/instagram/status every 60s to keep the days-
//     until-expiry counter fresh.

import React, { useEffect, useRef, useState } from 'react'

interface StatusResponse {
  connected: boolean | 'broken'
  platform?: string
  externalId?: string
  handle?: string | null
  pageName?: string | null
  expiresAt?: string | null
  daysUntilExpiry?: number | null
  lastRefreshedAt?: string | null
  refreshCount?: number
  connectedByEmail?: string | null
  error?: string
}

const baseClass = 'connect-instagram'

function formatDaysRemaining(days: number | null | undefined): string {
  if (days === null || days === undefined) return 'no expiry'
  if (days <= 0) return 'expires today'
  if (days === 1) return 'expires tomorrow'
  if (days < 30) return `expires in ${days} days`
  if (days < 365) return `expires in ${Math.round(days / 30)} months`
  return `expires in ${Math.round(days / 365)} years`
}

export const ConnectInstagram: React.FC = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [busy, setBusy] = useState<'connect' | 'disconnect' | null>(null)
  const [banner, setBanner] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const bannerTimer = useRef<number | null>(null)

  async function refresh() {
    try {
      const res = await fetch('/api/social/instagram/status', { cache: 'no-store' })
      const json = (await res.json()) as StatusResponse
      setStatus(json)
    } catch (err) {
      // A network blip on the status poll is non-fatal. The next
      // poll will retry. Don't surface it as an error banner.
      // eslint-disable-next-line no-console
      console.warn('[connect-instagram] status poll failed', err)
    }
  }

  useEffect(() => {
    void refresh()
    const id = window.setInterval(refresh, 60_000)
    return () => window.clearInterval(id)
  }, [])

  // Read the one-time callback query param on mount and show a banner.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const ig = params.get('ig')
    const message = params.get('message') || params.get('handle')
    if (!ig) return
    if (ig === 'connected') {
      setBanner({ kind: 'success', text: `Connected to Instagram${message ? ` as ${message}` : ''}.` })
    } else if (ig === 'error') {
      setBanner({ kind: 'error', text: `Instagram connection failed: ${message || 'unknown error'}` })
    } else {
      return
    }
    // Clear the param so a refresh doesn't re-show the banner.
    params.delete('ig')
    params.delete('message')
    params.delete('handle')
    const newSearch = params.toString()
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash
    window.history.replaceState({}, '', newUrl)
    // Auto-dismiss after 6s.
    if (bannerTimer.current) window.clearTimeout(bannerTimer.current)
    bannerTimer.current = window.setTimeout(() => setBanner(null), 6000)
    return () => {
      if (bannerTimer.current) window.clearTimeout(bannerTimer.current)
    }
  }, [])

  async function disconnect() {
    if (!window.confirm('Disconnect Instagram? The Sync button will stop working until you reconnect.')) return
    setBusy('disconnect')
    try {
      const res = await fetch('/api/social/instagram/disconnect', { method: 'POST' })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setBanner({ kind: 'error', text: `Disconnect failed: ${j.error || res.statusText}` })
        return
      }
      setBanner({ kind: 'success', text: 'Instagram disconnected.' })
      await refresh()
    } finally {
      setBusy(null)
    }
  }

  function connect() {
    setBusy('connect')
    // The /connect route 302s to Meta's OAuth dialog. Set location to
    // let the browser follow the redirect naturally.
    window.location.href = '/api/social/instagram/connect'
  }

  return (
    <div className={baseClass} style={{ marginTop: 16 }}>
      {banner && (
        <div
          style={{
            marginBottom: 12,
            padding: 8,
            background: banner.kind === 'success' ? 'var(--theme-success-50, #efe)' : 'var(--theme-error-50, #fee)',
            border: `1px solid ${banner.kind === 'success' ? 'var(--theme-success-200, #cfc)' : 'var(--theme-error-200, #fcc)'}`,
            borderRadius: 4,
            color: banner.kind === 'success' ? 'var(--theme-success-700, #060)' : 'var(--theme-error-700, #900)',
          }}
        >
          {banner.text}
        </div>
      )}

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 8,
          background: 'var(--theme-elevation-50)',
        }}
      >
        <h3 style={{ margin: '0 0 8px' }}>Instagram connection</h3>

        {status === null ? (
          <p style={{ margin: 0, color: 'var(--theme-elevation-600)' }}>Checking connection…</p>
        ) : status.connected === 'broken' ? (
          <div>
            <p style={{ margin: '0 0 8px', color: 'var(--theme-error-700, #900)' }}>
              {status.error || 'Token is unreadable.'}
            </p>
            <button
              type="button"
              className="btn btn--style-primary btn--size-medium"
              onClick={connect}
              disabled={busy === 'connect'}
            >
              Reconnect
            </button>
          </div>
        ) : status.connected ? (
          <div>
            <p style={{ margin: '0 0 4px' }}>
              <strong>Connected as {status.handle || status.externalId}</strong>
              {status.pageName ? (
                <span style={{ color: 'var(--theme-elevation-600)' }}>
                  {' '}
                  (via Page <em>{status.pageName}</em>)
                </span>
              ) : null}
            </p>
            <p style={{ margin: '0 0 4px', color: 'var(--theme-elevation-600)', fontSize: 13 }}>
              {formatDaysRemaining(status.daysUntilExpiry)}
              {typeof status.refreshCount === 'number' && status.refreshCount > 0
                ? ` · auto-refreshed ${status.refreshCount}×`
                : ''}
              {status.connectedByEmail ? ` · by ${status.connectedByEmail}` : ''}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn--style-secondary btn--size-medium"
                onClick={disconnect}
                disabled={busy !== null}
              >
                {busy === 'disconnect' ? 'Disconnecting…' : 'Disconnect'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ margin: '0 0 8px', color: 'var(--theme-elevation-600)' }}>
              Not connected. The Sync from Instagram button will fail until you connect an account.
            </p>
            <button
              type="button"
              className="btn btn--style-primary btn--size-medium"
              onClick={connect}
              disabled={busy === 'connect'}
            >
              {busy === 'connect' ? 'Redirecting…' : 'Connect Instagram'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
