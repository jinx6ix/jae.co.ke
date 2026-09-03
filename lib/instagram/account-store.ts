// lib/instagram/account-store.ts
//
// Prisma-backed token store for connected social accounts.
//
// One SocialAccount row per (platform, externalId). The access token is
// encrypted at rest with AES-256-GCM (see ./crypto.ts). Refresh is
// transparent: getAccountTokens() returns the freshest usable token,
// refreshing the stored row if it's within 60s of expiry.
//
// This is the only place outside of /api/admin/mint-instagram-token and
// /api/social/instagram/* that touches the encrypted-token column.
// Routes that need a token call getAccountTokens(); they never see the
// cipher, the key, or the env var.

import "server-only";

import { prisma } from "../prisma";
import { decryptToken, encryptToken } from "./crypto";
import { InstagramAuthError, refreshToken } from "../instagram-auth";

/** The set of platforms we know how to refresh. Extend when adding a new provider. */
export type SupportedPlatform = "instagram";

/** Decrypted view of a SocialAccount row, returned by getAccountTokens / readAccountTokens. */
export interface StoredTokens {
  /** Decrypted long-lived user token. */
  accessToken: string;
  /** Absolute expiry timestamp. `null` means "no expiry" (page-level token). */
  expiresAt: Date | null;
  /** FB page id the IG business account is attached to. */
  pageId?: string;
  /** FB page display name. */
  pageName?: string;
  /** IG business account numeric id (= what used to be INSTAGRAM_USER_ID). */
  externalId: string;
  /** @handle or display name for the UI. */
  displayName?: string;
  platform: SupportedPlatform;
}

/** Public projection for the admin UI — no decrypted token. */
export interface SocialAccountSummary {
  id: string;
  platform: string;
  externalId: string;
  displayName: string | null;
  pageId: string | null;
  pageName: string | null;
  expiresAt: Date | null;
  scopes: string | null;
  connectedByEmail: string | null;
  lastRefreshedAt: Date | null;
  refreshCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SaveInput {
  platform: SupportedPlatform;
  externalId: string;
  displayName?: string;
  pageId?: string;
  pageName?: string;
  accessToken: string;
  /** Seconds until the token expires. Omit for "no expiry". */
  expiresIn?: number;
  /** OAuth scopes granted at mint time. Stored as CSV. */
  scopes?: string[];
  connectedById?: string;
  connectedByEmail?: string;
}

/**
 * Upsert a SocialAccount row. Encrypts the token before write.
 *
 * If a row already exists for (platform, externalId), the audit fields
 * (createdAt, refreshCount, lastRefreshedAt) are preserved — only the
 * token + display fields + expiresAt are overwritten. This is what
 * makes "reconnect" idempotent from the editor's perspective.
 */
export async function saveAccountTokens(input: SaveInput): Promise<{ id: string }> {
  const enc = encryptToken(input.accessToken);
  const expiresAt =
    typeof input.expiresIn === "number"
      ? new Date(Date.now() + input.expiresIn * 1000)
      : null;
  const scopes = input.scopes?.length ? input.scopes.join(",") : null;

  // Detect "this is a refresh" so we bump lastRefreshedAt / refreshCount
  // for the audit trail. The first time a row is created, we leave
  // lastRefreshedAt null and refreshCount at 0.
  const existing = await prisma.socialAccount.findUnique({
    where: { platform_externalId: { platform: input.platform, externalId: input.externalId } },
    select: { id: true, accessTokenEnc: true },
  });
  const isRefresh = existing !== null;

  const row = await prisma.socialAccount.upsert({
    where: { platform_externalId: { platform: input.platform, externalId: input.externalId } },
    create: {
      platform: input.platform,
      externalId: input.externalId,
      displayName: input.displayName,
      pageId: input.pageId,
      pageName: input.pageName,
      accessTokenEnc: enc,
      expiresAt,
      scopes,
      connectedById: input.connectedById,
      connectedByEmail: input.connectedByEmail,
      // refreshCount + lastRefreshedAt default on insert.
    },
    update: {
      displayName: input.displayName,
      pageId: input.pageId,
      pageName: input.pageName,
      accessTokenEnc: enc,
      expiresAt,
      scopes,
      lastRefreshedAt: isRefresh ? new Date() : undefined,
      refreshCount: isRefresh ? { increment: 1 } : undefined,
    },
  });
  return { id: row.id };
}

/**
 * Read a single row by (platform, externalId) and decrypt the token.
 * Does NOT refresh. Use this when you need the raw stored value (e.g.
 * the admin "show token once" panel) without side effects.
 */
export async function readAccountTokens(
  platform: SupportedPlatform,
  externalId: string,
): Promise<StoredTokens | null> {
  const row = await prisma.socialAccount.findUnique({
    where: { platform_externalId: { platform, externalId } },
  });
  if (!row) return null;
  return {
    accessToken: decryptToken(row.accessTokenEnc),
    expiresAt: row.expiresAt,
    pageId: row.pageId ?? undefined,
    pageName: row.pageName ?? undefined,
    externalId: row.externalId,
    displayName: row.displayName ?? undefined,
    platform: platform as SupportedPlatform,
  };
}

/**
 * Read + decrypt + refresh-if-expiring + persist + return.
 *
 * This is the call that /api/video-sync/instagram and the Videos
 * beforeChange hook use. The caller never has to think about expiry:
 *   - Returns `null` if no row exists (caller surfaces "not connected"
 *     to the editor).
 *   - Returns the decrypted token as-is if `expiresAt` is null or more
 *     than 60s in the future.
 *   - Calls /oauth/access_token to extend, persists the new token, and
 *     returns it. A single sync can therefore push a soon-to-expire
 *     token forward without the editor ever noticing.
 *
 * The optional `externalId` defaults to the most recently refreshed row
 * for the platform — we have one IG account today, so this avoids
 * threading the id through every call site. Pass an explicit id to
 * disambiguate when we eventually support multi-account.
 */
export async function getAccountTokens(
  platform: SupportedPlatform,
  externalId?: string,
): Promise<StoredTokens | null> {
  const where = externalId
    ? { platform_externalId: { platform, externalId } }
    : platform === "instagram"
      ? await mostRecentAccountWhere(platform)
      : null;
  if (!where) return null;

  const row = await prisma.socialAccount.findUnique({ where });
  if (!row) return null;

  const accessToken = decryptToken(row.accessTokenEnc);
  const expiresAt = row.expiresAt;
  const isExpiringSoon =
    expiresAt !== null && expiresAt.getTime() - Date.now() < 60 * 1000;

  if (!isExpiringSoon) {
    return {
      accessToken,
      expiresAt,
      pageId: row.pageId ?? undefined,
      pageName: row.pageName ?? undefined,
      externalId: row.externalId,
      displayName: row.displayName ?? undefined,
      platform: platform as SupportedPlatform,
    };
  }

  // Refresh path. We swallow the error here (returning null with a
  // logger.warn would be wrong — the caller might be the cron which
  // expects a definitive answer). Instead we surface the error to the
  // caller as a thrown InstagramAuthError; getAccountTokens callers
  // handle it the same way they handle any Graph API error.
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error(
      "Cannot refresh Instagram token: NEXT_PUBLIC_META_APP_ID and META_APP_SECRET must be set in .env.",
    );
  }
  const refreshed = await refreshToken(accessToken, appId, appSecret);
  await saveAccountTokens({
    platform,
    externalId: row.externalId,
    displayName: row.displayName ?? undefined,
    pageId: row.pageId ?? undefined,
    pageName: row.pageName ?? undefined,
    accessToken: refreshed.accessToken,
    expiresIn: refreshed.expiresIn,
    scopes: row.scopes ? row.scopes.split(",") : undefined,
    connectedById: row.connectedById ?? undefined,
    connectedByEmail: row.connectedByEmail ?? undefined,
  });
  return {
    accessToken: refreshed.accessToken,
    expiresAt: new Date(refreshed.expiresAt),
    pageId: row.pageId ?? undefined,
    pageName: row.pageName ?? undefined,
    externalId: row.externalId,
    displayName: row.displayName ?? undefined,
    platform: platform as SupportedPlatform,
  };
}

/** List all accounts for the admin UI. Decrypted tokens are NOT returned. */
export async function listSocialAccounts(): Promise<SocialAccountSummary[]> {
  const rows = await prisma.socialAccount.findMany({
    orderBy: [{ platform: "asc" }, { lastRefreshedAt: "desc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    platform: r.platform,
    externalId: r.externalId,
    displayName: r.displayName,
    pageId: r.pageId,
    pageName: r.pageName,
    expiresAt: r.expiresAt,
    scopes: r.scopes,
    connectedByEmail: r.connectedByEmail,
    lastRefreshedAt: r.lastRefreshedAt,
    refreshCount: r.refreshCount,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  }));
}

/** Delete the row for (platform, externalId). Idempotent. */
export async function deleteAccountTokens(
  platform: SupportedPlatform,
  externalId: string,
): Promise<void> {
  await prisma.socialAccount
    .delete({
      where: { platform_externalId: { platform, externalId } },
    })
    .catch((err: unknown) => {
      // P2025 = record not found. Anything else surfaces.
      const code = (err as { code?: string }).code;
      if (code !== "P2025") throw err;
    });
}

/**
 * Build a Prisma `where` filter for "the most recently refreshed
 * row on this platform". Used by the single-account shortcut in
 * getAccountTokens when the caller didn't pass an explicit externalId.
 */
async function mostRecentAccountWhere(
  platform: SupportedPlatform,
): Promise<{ platform_externalId: { platform: SupportedPlatform; externalId: string } } | null> {
  const row = await prisma.socialAccount.findFirst({
    where: { platform },
    orderBy: [{ lastRefreshedAt: "desc" }, { updatedAt: "desc" }],
    select: { platform: true, externalId: true },
  });
  if (!row) return null;
  return {
    platform_externalId: {
      platform: row.platform as SupportedPlatform,
      externalId: row.externalId,
    },
  };
}
