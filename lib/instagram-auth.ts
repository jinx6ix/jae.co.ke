// lib/instagram-auth.ts
//
// Meta Graph API auth helpers. Three functions:
//
//   1. exchangeForLongLivedToken() — takes the 1-2 hour short-lived
//      token an editor mints from Graph API Explorer and returns the
//      60-day long-lived user token used by the /api/video-sync/instagram
//      route (lib/instagram.ts).
//
//   2. lookupInstagramBusinessAccount() — given a valid user token,
//      walks /me/accounts and returns the linked Instagram Business
//      account id (the numeric value that goes in INSTAGRAM_USER_ID).
//
//   3. refreshToken() — extends a still-valid long-lived token for a
//      fresh 60-day window. Called by lib/instagram/account-store.ts
//      when the stored token is within 60s of expiry, so the editor
//      never sees a 60-day cliff.
//
// Why these live in a separate file from lib/instagram.ts:
//   - The /api/video-sync/instagram route only needs the long-lived
//     token (already exchanged). It doesn't need the exchange logic
//     or the page-walk logic; bundling them would mean every sync
//     import also pulls in the OAuth flow.
//   - The mint script + admin route both need both functions. They
//     share this module so the same code path runs whether the
//     editor triggers the mint from the CLI or from /admin.
//
// Setup: requires NEXT_PUBLIC_META_APP_ID (or META_APP_ID) and
// META_APP_SECRET in .env. The script + admin route read them from
// process.env at call time so a server restart picks up rotations.
//
// Bump META_GRAPH_VERSION here when Meta publishes a new version. The
// OAuth dialog endpoint (`www.facebook.com/v{N}/dialog/oauth`) is
// versioned separately — see META_OAUTH_VERSION in
// app/api/social/instagram/connect/route.ts. Both are currently v26.0
// (2026-09 release line) per the project convention.

export const META_GRAPH_VERSION = 'v26.0'

const GRAPH = `https://graph.facebook.com/${META_GRAPH_VERSION}`

export interface LongLivedTokenResult {
  accessToken: string
  /** Seconds until expiry. Long-lived user tokens are 60 days = 5,184,000s. */
  expiresIn: number
  /** Absolute ISO timestamp when this token expires. */
  expiresAt: string
}

export interface InstagramBusinessAccount {
  pageId: string
  pageName: string
  igUserId: string
  igUsername: string
}

/**
 * Exchange a short-lived (1-2h) user token for a long-lived (60d) one.
 *
 * The exchange is one round-trip:
 *   GET /oauth/access_token
 *     ?grant_type=fb_exchange_token
 *     &client_id={appId}
 *     &client_secret={appSecret}
 *     &fb_exchange_token={shortLivedToken}
 *
 * Returns the long-lived token + its expiry window. We compute the
 * absolute `expiresAt` once so callers can show "expires 2026-11-02"
 * in the UI without doing the math themselves.
 *
 * Note: long-lived tokens can themselves be exchanged for 60-day
 * renewals before they expire. We don't auto-renew here because the
 * 60-day cadence is fine for a one-click "Sync from Instagram"
 * workflow; the editor re-mints when sync starts returning 401.
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string,
  appId: string,
  appSecret: string,
): Promise<LongLivedTokenResult> {
  if (!shortLivedToken) {
    throw new Error('shortLivedToken is required')
  }
  if (!appId || !appSecret) {
    throw new Error('META app id and app secret are required')
  }
  const url = new URL(`${GRAPH}/oauth/access_token`)
  url.searchParams.set('grant_type', 'fb_exchange_token')
  url.searchParams.set('client_id', appId)
  url.searchParams.set('client_secret', appSecret)
  url.searchParams.set('fb_exchange_token', shortLivedToken)

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.text()
    throw new InstagramAuthError(
      `long-lived token exchange failed: ${res.status} ${body}`,
      res.status,
    )
  }
  const json = (await res.json()) as {
    access_token?: string
    token_type?: string
    expires_in?: number
    error?: { message?: string; code?: number }
  }
  if (!json.access_token) {
    throw new InstagramAuthError(
      `no access_token in exchange response: ${JSON.stringify(json)}`,
      500,
    )
  }
  const expiresIn = json.expires_in ?? 60 * 24 * 60 * 60 // default 60d
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()
  return {
    accessToken: json.access_token,
    expiresIn,
    expiresAt,
  }
}

/**
 * Walk the Pages the current user manages and return the ones that
 * have an Instagram Business account linked. The numeric `igUserId`
 * is what goes in `INSTAGRAM_USER_ID` — it's NOT the @handle.
 *
 * Why we walk /me/accounts instead of /me:
 *   - The IG Business account is a child of a Facebook Page, not of
 *     the user. There's no /me/instagram_business_account endpoint.
 *   - The page-walk also lets us surface which Page the IG account
 *     is attached to, which is useful debug info for the editor.
 */
export async function lookupInstagramBusinessAccount(
  accessToken: string,
): Promise<InstagramBusinessAccount[]> {
  if (!accessToken) {
    throw new Error('accessToken is required')
  }
  const url = new URL(`${GRAPH}/me/accounts`)
  url.searchParams.set(
    'fields',
    'id,name,instagram_business_account{id,username}',
  )
  url.searchParams.set('access_token', accessToken)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.text()
    throw new InstagramAuthError(
      `IG business account lookup failed: ${res.status} ${body}`,
      res.status,
    )
  }
  const json = (await res.json()) as {
    data?: Array<{
      id: string
      name: string
      instagram_business_account?: { id: string; username: string }
    }>
    error?: { message?: string; code?: number }
  }
  const out: InstagramBusinessAccount[] = []
  for (const page of json.data ?? []) {
    if (!page.instagram_business_account) continue
    out.push({
      pageId: page.id,
      pageName: page.name,
      igUserId: page.instagram_business_account.id,
      igUsername: page.instagram_business_account.username,
    })
  }
  return out
}

/**
 * Refresh an existing long-lived (60-day) user token.
 *
 * Meta's docs: a long-lived user token can itself be exchanged for a
 * fresh 60-day token at any point before it expires — same
 * `/oauth/access_token` endpoint, same `fb_exchange_token` grant type,
 * just pass the current long-lived token instead of a short-lived one.
 * The new token has a full 60-day window regardless of how much time
 * was left on the old one.
 *
 * We use this from lib/instagram/account-store.ts inside getAccountTokens
 * when the stored token is within 60s of expiry. The endpoint can be
 * called repeatedly, so we can silently roll the token forward forever
 * without the editor ever seeing a 60-day cliff.
 */
export async function refreshToken(
  currentToken: string,
  appId: string,
  appSecret: string,
): Promise<LongLivedTokenResult> {
  if (!currentToken) {
    throw new Error('currentToken is required')
  }
  if (!appId || !appSecret) {
    throw new Error('META app id and app secret are required')
  }
  const url = new URL(`${GRAPH}/oauth/access_token`)
  url.searchParams.set('grant_type', 'fb_exchange_token')
  url.searchParams.set('client_id', appId)
  url.searchParams.set('client_secret', appSecret)
  url.searchParams.set('fb_exchange_token', currentToken)

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.text()
    throw new InstagramAuthError(
      `token refresh failed: ${res.status} ${body}`,
      res.status,
    )
  }
  const json = (await res.json()) as {
    access_token?: string
    token_type?: string
    expires_in?: number
    error?: { message?: string; code?: number }
  }
  if (!json.access_token) {
    throw new InstagramAuthError(
      `no access_token in refresh response: ${JSON.stringify(json)}`,
      500,
    )
  }
  const expiresIn = json.expires_in ?? 60 * 24 * 60 * 60 // default 60d
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()
  return {
    accessToken: json.access_token,
    expiresIn,
    expiresAt,
  }
}

export class InstagramAuthError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'InstagramAuthError'
    this.status = status
  }
}
