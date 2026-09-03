// scripts/mint-instagram-token.ts
//
// One-shot CLI tool to mint/renew the 60-day long-lived Instagram
// user token. Reads the META_APP_ID + META_APP_SECRET from .env,
// takes a short-lived token on the command line, exchanges it, looks
// up the linked Instagram Business Account, and (optionally) writes
// the result to either the encrypted SocialAccount store or to .env.
//
//   npm run ig:mint -- <SHORT_LIVED_TOKEN> [--target=store|env|both] [--dry-run]
//
// --target=store (default): upsert the SocialAccount Prisma row.
//   No server restart required — the next /api/video-sync/instagram
//   call reads from the store.
// --target=env: update the .env file in-place (idempotent — overwrites
//   existing INSTAGRAM_* values if present, appends if not). Legacy
//   fallback for when the OAuth flow is unavailable.
// --target=both: write to both.
//
// --dry-run (or omitting --target entirely): print the values to
// stdout for the editor to copy by hand.
//
// The script uses `dotenv` to read existing .env values and `tsx` to
// run TypeScript directly. It does NOT depend on Next.js being
// buildable, so it can run from a clean checkout.
//
// When target includes 'store', the script imports
// lib/instagram/account-store.ts, which in turn imports Prisma. If
// `npx prisma generate` hasn't been run, the import will fail — run
// `npm install` (which triggers `prisma generate` via the postinstall
// hook) first.

import { config as loadDotenv } from 'dotenv'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import {
  exchangeForLongLivedToken,
  lookupInstagramBusinessAccount,
  InstagramAuthError,
} from '../lib/instagram-auth'

// Load .env from cwd. Does not override already-set process.env.
loadDotenv()

/**
 * Replace or append KEY=VALUE in an env file body. Preserves
 * comments and ordering of unrelated lines; only touches lines that
 * exactly match the key.
 */
function upsertEnvLine(content: string, key: string, value: string): string {
  const line = `${key}=${value}`
  const re = new RegExp(`^${key}=.*$`, 'm')
  if (re.test(content)) {
    return content.replace(re, line)
  }
  // Append — with a blank-line separator if the file already ends in one.
  const sep = content.endsWith('\n') ? '' : '\n'
  return `${content}${sep}${line}\n`
}

function parseTarget(): { dryRun: boolean; target: 'store' | 'env' | 'both' | null } {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const targetArg = args.find((a) => a.startsWith('--target='))
  if (!targetArg) return { dryRun, target: null }
  const value = targetArg.split('=')[1]
  if (value !== 'store' && value !== 'env' && value !== 'both') {
    throw new Error(
      `invalid --target value: ${value}. Use one of: store, env, both.`,
    )
  }
  return { dryRun, target: value }
}

async function main() {
  const args = process.argv.slice(2)
  const shortLivedToken = args[0]
  const { target, dryRun } = parseTarget()

  if (!shortLivedToken || shortLivedToken.startsWith('--')) {
    console.error(
      'usage: npm run ig:mint -- <SHORT_LIVED_TOKEN> [--target=store|env|both] [--dry-run]',
    )
    console.error('  <SHORT_LIVED_TOKEN>  the 1-2 hour token from Graph API Explorer')
    console.error('  --target=store       (default) write to the encrypted SocialAccount store')
    console.error('  --target=env         write to .env in-place (legacy fallback)')
    console.error('  --target=both        write to both')
    console.error('  --dry-run            print values to stdout instead of persisting')
    process.exit(1)
  }

  const appId = process.env.NEXT_PUBLIC_META_APP_ID
  const appSecret = process.env.META_APP_SECRET
  if (!appId || !appSecret) {
    console.error('error: NEXT_PUBLIC_META_APP_ID and META_APP_SECRET must be set in .env')
    process.exit(1)
  }

  try {
    console.log('… exchanging short-lived token for long-lived (60-day)')
    const { accessToken, expiresAt, expiresIn } = await exchangeForLongLivedToken(
      shortLivedToken,
      appId,
      appSecret,
    )
    console.log(`✓ long-lived token obtained (expires ${expiresAt})`)

    console.log('… looking up linked Instagram Business Account')
    const accounts = await lookupInstagramBusinessAccount(accessToken)
    if (accounts.length === 0) {
      console.error(
        'error: no IG Business account found for the current user token.\n' +
          '  Ensure your FB user has admin access to a Page that is linked to an\n' +
          '  Instagram Business account, and that the app token was minted with\n' +
          '  the permissions: instagram_basic, pages_show_list, pages_read_engagement.',
      )
      process.exit(1)
    }
    for (const a of accounts) {
      console.log(`  • page "${a.pageName}" (id: ${a.pageId}) → @${a.igUsername} (id: ${a.igUserId})`)
    }
    const primary = accounts[0]

    if (dryRun || target === null) {
      console.log('\n--- paste these into .env (or run with --target=store) ---\n')
      console.log(`INSTAGRAM_ACCESS_TOKEN=${accessToken}`)
      console.log(`INSTAGRAM_USER_ID=${primary.igUserId}`)
      console.log('\n------------------------------------------------------------\n')
      return
    }

    if (target === 'store' || target === 'both') {
      // Dynamic import keeps this module's top-level side effects
      // (the Prisma client init, which needs DATABASE_URL) out of
      // the dry-run path. The user can `--dry-run` without a working
      // DATABASE_URL.
      const { saveAccountTokens } = await import('../lib/instagram/account-store')
      const { id } = await saveAccountTokens({
        platform: 'instagram',
        externalId: primary.igUserId,
        displayName: `@${primary.igUsername}`,
        pageId: primary.pageId,
        pageName: primary.pageName,
        accessToken,
        expiresIn,
        scopes: [
          'instagram_basic',
          'pages_show_list',
          'pages_read_engagement',
          'instagram_manage_insights',
        ],
      })
      console.log(`✓ saved to SocialAccount store (row id: ${id})`)
    }

    if (target === 'env' || target === 'both') {
      const envPath = join(process.cwd(), '.env')
      const original = readFileSync(envPath, 'utf8')
      const updated = upsertEnvLine(
        upsertEnvLine(original, 'INSTAGRAM_ACCESS_TOKEN', accessToken),
        'INSTAGRAM_USER_ID',
        primary.igUserId,
      )
      writeFileSync(envPath, updated, 'utf8')
      console.log(`✓ wrote INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID to ${envPath}`)
      console.log('  restart `next start` (or redeploy) to pick it up via env-var fallback.')
    }
  } catch (err: unknown) {
    if (err instanceof InstagramAuthError) {
      console.error(`✗ ${err.message}`)
    } else if (err instanceof Error) {
      console.error(`✗ ${err.message}`)
    } else {
      console.error('✗', err)
    }
    process.exit(1)
  }
}

main()
