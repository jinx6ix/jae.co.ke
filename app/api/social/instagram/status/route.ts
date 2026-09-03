// app/api/social/instagram/status/route.ts
//
// Read-only view of the current IG connection. Used by the
// ConnectInstagram admin component for its live status panel.
//
// Returns the row metadata — NEVER the decrypted token. The admin
// UI shows handle + expiresAt + days-remaining; if it needs the raw
// token, it can ask the editor to mint a fresh one (the existing
// "Mint Instagram token" modal covers that flow).

import { NextResponse } from "next/server";

import { listSocialAccounts } from "../../../../../lib/instagram/account-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const accounts = await listSocialAccounts();
    const ig = accounts.find((a) => a.platform === "instagram");
    if (!ig) {
      return NextResponse.json({ connected: false });
    }
    const expiresAt = ig.expiresAt;
    const now = Date.now();
    const msUntilExpiry = expiresAt ? expiresAt.getTime() - now : null;
    return NextResponse.json({
      connected: true,
      platform: ig.platform,
      externalId: ig.externalId,
      handle: ig.displayName,
      pageId: ig.pageId,
      pageName: ig.pageName,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
      // Days until expiry (rounded down). null = no expiry.
      daysUntilExpiry:
        msUntilExpiry === null
          ? null
          : Math.max(0, Math.floor(msUntilExpiry / (24 * 60 * 60 * 1000))),
      lastRefreshedAt: ig.lastRefreshedAt ? ig.lastRefreshedAt.toISOString() : null,
      refreshCount: ig.refreshCount,
      connectedByEmail: ig.connectedByEmail,
      createdAt: ig.createdAt.toISOString(),
    });
  } catch (err) {
    // A decryption failure (rotated key, corrupted blob) should
    // surface as "connected but unreadable" rather than 500. The admin
    // UI can then prompt the editor to reconnect.
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("Unsupported state") || message.includes("auth tag")) {
      return NextResponse.json({
        connected: "broken",
        error: "Token encrypted with an old key. Please reconnect.",
      });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
