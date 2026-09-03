// cms/components/BeforeDashboard/InstagramTokenMint.tsx
//
// One-click Instagram token mint UI for the admin dashboard.
//
// The Instagram Graph API requires a 60-day long-lived user token for
// the /api/video-sync/instagram route. Long-lived tokens are minted
// by exchanging a short-lived (1-2h) user token at Graph API Explorer.
//
// This component:
//   1. Lets the editor paste the short-lived token into a textarea.
//   2. POSTs to /api/admin/mint-instagram-token (Payload-session auth).
//   3. Shows the resulting long-lived token, expiry, and IG Business
//      account(s). Offers a one-click "Save to .env" button.
//
// Why a separate admin route (and not the same /api/video-sync/instagram
// path): the sync route is gated by session OR cron secret and assumes
// the long-lived token is already set. The mint route is interactive
// and runs at first-time setup, before any sync has happened.

import React, { useState } from 'react'

interface MintAccount {
  pageId: string
  pageName: string
  igUserId: string
  igUsername: string
}

interface MintResult {
  accessToken: string
  expiresAt: string
  accounts: MintAccount[]
  target: 'store' | 'env' | 'both'
  storeRowId: string | null
  storeError: string | null
  envWrote: boolean
  envWriteError: string | null
}

const baseClass = 'ig-token-mint'

export const InstagramTokenMint: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<MintResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function mint(target: 'store' | 'env' | 'both') {
    if (!token.trim()) {
      setError('Paste a short-lived token first.')
      return
    }
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/admin/mint-instagram-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shortLivedToken: token.trim(), target }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || `Request failed: ${res.status}`)
        return
      }
      setResult(json as MintResult)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={baseClass} style={{ marginTop: 16 }}>
      {!open ? (
        <button
          type="button"
          className="btn btn--style-secondary btn--size-medium"
          onClick={() => setOpen(true)}
        >
          Mint Instagram token
        </button>
      ) : (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 8,
            background: 'var(--theme-elevation-50)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>Mint long-lived Instagram token</h3>
            <button
              type="button"
              className="btn btn--style-secondary btn--size-small"
              onClick={() => {
                setOpen(false)
                setResult(null)
                setError(null)
                setToken('')
              }}
            >
              Close
            </button>
          </div>
          <p style={{ margin: '0 0 12px', color: 'var(--theme-elevation-600)' }}>
            Paste the short-lived user token from{' '}
            <a
              href="https://developers.facebook.com/tools/explorer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Graph API Explorer
            </a>{' '}
            (minted with permissions: <code>instagram_basic</code>,{' '}
            <code>pages_show_list</code>, <code>pages_read_engagement</code>). The token is
            exchanged for a 60-day long-lived one and the linked IG Business account id is
            looked up automatically.
          </p>
          <p style={{ margin: '0 0 12px', color: 'var(--theme-elevation-600)', fontSize: 12 }}>
            <strong>Dev-mode fallback.</strong> Prefer the &quot;Connect Instagram&quot;
            button above for the normal OAuth flow. Use this modal when the Meta app is in
            development mode and the OAuth dialog refuses to load for non-admins.
          </p>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="EAABwzLixnjY..."
            rows={4}
            spellCheck={false}
            style={{
              width: '100%',
              padding: 8,
              fontFamily: 'monospace',
              fontSize: 12,
              border: '1px solid var(--theme-elevation-200)',
              borderRadius: 4,
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--style-primary btn--size-medium"
              disabled={busy}
              onClick={() => mint('store')}
            >
              {busy ? 'Minting…' : 'Mint + save to store'}
            </button>
            <button
              type="button"
              className="btn btn--style-secondary btn--size-medium"
              disabled={busy}
              onClick={() => mint('env')}
            >
              {busy ? 'Minting…' : 'Mint + write to .env'}
            </button>
            <button
              type="button"
              className="btn btn--style-secondary btn--size-medium"
              disabled={busy}
              onClick={() => mint('both')}
            >
              {busy ? 'Minting…' : 'Mint + both'}
            </button>
          </div>
          {error && (
            <div
              style={{
                marginTop: 12,
                padding: 8,
                background: 'var(--theme-error-50, #fee)',
                border: '1px solid var(--theme-error-200, #fcc)',
                borderRadius: 4,
                color: 'var(--theme-error-700, #900)',
              }}
            >
              <strong>Error:</strong> {error}
            </div>
          )}
          {result && (
            <div
              style={{
                marginTop: 12,
                padding: 8,
                background: 'var(--theme-success-50, #efe)',
                border: '1px solid var(--theme-success-200, #cfc)',
                borderRadius: 4,
              }}
            >
              <p style={{ margin: '0 0 6px' }}>
                <strong>Long-lived token (expires {result.expiresAt})</strong>
              </p>
              {result.storeRowId && (
                <p style={{ margin: '0 0 6px' }}>
                  ✓ Saved to the SocialAccount store (row <code>{result.storeRowId}</code>).
                  The next sync uses it automatically.
                </p>
              )}
              {result.storeError && (
                <p style={{ margin: '0 0 6px', color: 'var(--theme-error-700, #900)' }}>
                  ✗ Store write failed: {result.storeError}
                </p>
              )}
              {result.envWrote && (
                <p style={{ margin: '0 0 6px' }}>
                  ✓ Written to <code>.env</code>. Restart <code>next start</code> (or redeploy)
                  to pick it up via the env-var fallback.
                </p>
              )}
              {result.envWriteError && (
                <p style={{ margin: '0 0 6px', color: 'var(--theme-error-700, #900)' }}>
                  ✗ .env write failed: {result.envWriteError}
                </p>
              )}
              <details>
                <summary>Token (click to show)</summary>
                <code
                  style={{
                    display: 'block',
                    wordBreak: 'break-all',
                    marginTop: 4,
                    fontSize: 11,
                  }}
                >
                  {result.accessToken}
                </code>
              </details>
              <p style={{ margin: '8px 0 4px' }}>
                <strong>Linked Instagram Business account(s):</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {result.accounts.map((a) => (
                  <li key={a.pageId}>
                    Page <code>"{a.pageName}"</code> → @{a.igUsername} (id:{' '}
                    <code>{a.igUserId}</code>)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
