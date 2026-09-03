// app/api/admin/mint-instagram-token/route.ts
//
// Admin-only POST endpoint that exchanges a short-lived Instagram
// user token for a 60-day long-lived one, looks up the linked
// Instagram Business account id, and writes the result to either:
//   - the encrypted SocialAccount Prisma table (default, target='store')
//   - .env in-place (target='env', legacy fallback)
//   - both (target='both')
//
// The editor triggers this from the BeforeDashboard modal
// (cms/components/BeforeDashboard/InstagramTokenMint.tsx). The
// short-lived token comes from Graph API Explorer.
//
// Path: /api/admin/mint-instagram-token
//
// Payload-session auth only — no Bearer token. This is interactive
// (the editor is at a keyboard pasting a token), not a cron.
//
// Why `target` is a parameter:
//   - The primary path (target='store') is the new OAuth-equivalent
//     that persists encrypted tokens. The next /api/video-sync/instagram
//     call reads from there, so no server restart is needed.
//   - target='env' is a documented escape hatch for when the Meta app
//     is in dev mode and the editor wants the old "edit .env" flow.
//   - target='both' writes both, so a legacy code path reading env
//     vars continues to work alongside the new store-based path.

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import config from '@payload-config'
import {
  exchangeForLongLivedToken,
  lookupInstagramBusinessAccount,
  InstagramAuthError,
} from '../../../../lib/instagram-auth'
import { saveAccountTokens } from '../../../../lib/instagram/account-store'

interface MintBody {
  shortLivedToken: string
  /**
   * Where to persist the new token. Defaults to 'store'.
   * - 'store' (default): write to the SocialAccount Prisma table.
   * - 'env': write to .env in-place (legacy fallback).
   * - 'both': write to both.
   *
   * The modal's "Mint (preview only)" button omits a write target
   * entirely, so the response is just the values for the editor to
   * copy by hand.
   */
  target?: 'store' | 'env' | 'both'
  /** Deprecated alias for target='env'. */
  writeToEnv?: boolean
}

function upsertEnvLine(content: string, key: string, value: string): string {
  const line = `${key}=${value}`
  const re = new RegExp(`^${key}=.*$`, 'm')
  if (re.test(content)) return content.replace(re, line)
  const sep = content.endsWith('\n') ? '' : '\n'
  return `${content}${sep}${line}\n`
}

export async function POST(req: NextRequest) {
  // Auth: Payload session only.
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: MintBody
  try {
    body = (await req.json()) as MintBody
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }
  if (!body.shortLivedToken) {
    return NextResponse.json({ error: 'shortLivedToken is required' }, { status: 400 })
  }

  const appId = process.env.NEXT_PUBLIC_META_APP_ID
  const appSecret = process.env.META_APP_SECRET
  if (!appId || !appSecret) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_META_APP_ID and META_APP_SECRET must be set in .env' },
      { status: 500 },
    )
  }

  try {
    const { accessToken, expiresAt } = await exchangeForLongLivedToken(
      body.shortLivedToken,
      appId,
      appSecret,
    )

    const accounts = await lookupInstagramBusinessAccount(accessToken)
    if (accounts.length === 0) {
      return NextResponse.json(
        {
          error:
            'no IG Business account found. Ensure your FB user has admin access to a Page linked to an Instagram Business account, and that the app token was minted with the required permissions (instagram_basic, pages_show_list, pages_read_engagement).',
        },
        { status: 404 },
      )
    }

    // Resolve the effective target. The legacy `writeToEnv` boolean
    // is treated as target='env' for back-compat with the old UI.
    const target: 'store' | 'env' | 'both' = body.target
      ? body.target
      : body.writeToEnv
        ? 'env'
        : 'store'

    // Persist to the encrypted store. We do this BEFORE the .env write
    // so a failure in the new path doesn't get masked by the legacy
    // path reporting "wrote: true".
    let storeRowId: string | null = null
    let storeError: string | null = null
    if (target === 'store' || target === 'both') {
      try {
        const { id } = await saveAccountTokens({
          platform: 'instagram',
          externalId: accounts[0].igUserId,
          displayName: accounts[0].igUsername
            ? `@${accounts[0].igUsername}`
            : undefined,
          pageId: accounts[0].pageId,
          pageName: accounts[0].pageName,
          accessToken,
          expiresIn: Math.max(
            60,
            Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
          ),
          scopes: [
            'instagram_basic',
            'pages_show_list',
            'pages_read_engagement',
            'instagram_manage_insights',
          ],
          connectedById: String(user.id),
          connectedByEmail: user.email,
        })
        storeRowId = id
      } catch (err) {
        storeError = err instanceof Error ? err.message : String(err)
      }
    }

    let envWrote = false
    let envWriteError: string | null = null
    if (target === 'env' || target === 'both') {
      try {
        const envPath = join(process.cwd(), '.env')
        const original = readFileSync(envPath, 'utf8')
        const updated = upsertEnvLine(
          upsertEnvLine(original, 'INSTAGRAM_ACCESS_TOKEN', accessToken),
          'INSTAGRAM_USER_ID',
          accounts[0].igUserId,
        )
        writeFileSync(envPath, updated, 'utf8')
        envWrote = true
      } catch (err) {
        envWriteError = err instanceof Error ? err.message : String(err)
      }
    }

    return NextResponse.json({
      accessToken,
      expiresAt,
      accounts,
      target,
      storeRowId,
      storeError,
      envWrote,
      envWriteError,
    })
  } catch (err: unknown) {
    if (err instanceof InstagramAuthError) {
      return NextResponse.json(
        { error: err.message, status: err.status },
        { status: err.status >= 400 && err.status < 600 ? err.status : 500 },
      )
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
