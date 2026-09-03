// app/api/social/instagram/connect/route.ts
//
// Start of the Instagram OAuth flow.
//
// GET /api/social/instagram/connect
//   - Requires an authenticated Payload session.
//   - Generates a state token, remembers which user initiated the flow.
//   - 302 redirects to Meta's OAuth dialog with the IG-specific scopes.
//
// The state is process-local (in-memory map, 10-minute TTL). This is
// fine for the editor's "click button, sign in Facebook, come back"
// flow because the editor's browser stays on the Meta dialog for at
// most a couple of minutes. If we ever go multi-region, swap this for
// a Postgres `oauth_states` table (the marketing project has one).

import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import { randomBytes } from "node:crypto";

import config from "@payload-config";
import { rememberOAuthState } from "../_state";
import { META_GRAPH_VERSION } from "../../../../../lib/instagram-auth";

const SCOPES = [
  "instagram_basic",
  "pages_show_list",
  "pages_read_engagement",
  "instagram_manage_insights",
] as const;

const META_OAUTH_BASE = `https://www.facebook.com/${META_GRAPH_VERSION}/dialog/oauth`;

function getBaseUrl(req: NextRequest): string {
  // Trust NEXT_PUBLIC_BASE_URL first (matches the rest of the app's
  // canonical URL handling — lib/brand-media.ts, sitemap routes, etc).
  // Fall back to the incoming request's origin so dev works without it.
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return new URL(req.url).origin;
}

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  if (!appId) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_META_APP_ID is not set in .env" },
      { status: 500 },
    );
  }

  const state = randomBytes(24).toString("base64url");
  rememberOAuthState(state, {
    userId: String(user.id),
    userEmail: user.email,
    createdAt: Date.now(),
  });

  const base = getBaseUrl(req);
  const callbackUrl = `${base}/api/social/instagram/callback`;

  const url = new URL(META_OAUTH_BASE);
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", callbackUrl);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", SCOPES.join(","));
  // response_type=code is the default for /dialog/oauth; explicit for clarity.
  url.searchParams.set("response_type", "code");

  return NextResponse.redirect(url.toString(), { status: 302 });
}
