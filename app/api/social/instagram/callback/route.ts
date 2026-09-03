// app/api/social/instagram/callback/route.ts
//
// End of the Instagram OAuth flow.
//
// GET /api/social/instagram/callback?code=…&state=…
//   - Validates state against the in-memory map (rejects on miss/expire).
//   - Exchanges `code` for a short-lived user token via Meta's
//     /oauth/access_token endpoint (Basic auth: app_id + app_secret).
//   - Immediately exchanges the short-lived token for a 60-day long-lived
//     one via grant_type=fb_exchange_token (same shape as
//     lib/instagram-auth.exchangeForLongLivedToken, kept inline to keep
//     the callback self-contained — one round-trip, no extra imports).
//   - Walks /me/accounts to find the linked Instagram Business account.
//   - Saves the encrypted token + IG business id to the SocialAccount
//     table via lib/instagram/account-store.saveAccountTokens.
//   - 302 redirects to /admin?ig=connected&handle=@… so the
//     ConnectInstagram admin component can show a success banner.
//
// Error path: the editor hits Meta's dialog, denies a permission, and
// Meta redirects with ?error=…&error_reason=…&error_description=…
// instead of ?code=…&state=…. We catch that and surface it on the
// admin dashboard as a banner.

import { NextRequest, NextResponse } from "next/server";

import { consumeOAuthState } from "../_state";
import {
  exchangeForLongLivedToken,
  lookupInstagramBusinessAccount,
  META_GRAPH_VERSION,
} from "../../../../../lib/instagram-auth";
import { saveAccountTokens } from "../../../../../lib/instagram/account-store";

const GRAPH = `https://graph.facebook.com/${META_GRAPH_VERSION}`;

interface TokenExchangeResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: { message?: string; code?: number; type?: string };
}

interface MeAccountsResponse {
  data?: Array<{
    id: string;
    name: string;
    access_token?: string;
    instagram_business_account?: {
      id: string;
      username?: string;
      name?: string;
    };
  }>;
  error?: { message?: string; code?: number };
}

function getBaseUrl(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return new URL(req.url).origin;
}

function adminUrl(req: NextRequest, params: Record<string, string>): string {
  const base = getBaseUrl(req);
  const url = new URL("/admin", base);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return url.toString();
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  // 1. Reject obvious error responses from Meta first.
  if (error) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: errorDescription || error,
      }),
      { status: 302 },
    );
  }

  // 2. Validate state. A missing/invalid state means either:
  //    (a) the editor sat on the Meta dialog for >10 minutes, or
  //    (b) someone is trying to inject a code into our flow.
  // Both cases: send them back to the admin with an error banner.
  if (!state) {
    return NextResponse.redirect(
      adminUrl(req, { ig: "error", message: "missing state parameter" }),
      { status: 302 },
    );
  }
  const stateRow = consumeOAuthState(state);
  if (!stateRow) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: "OAuth state expired or invalid. Click Connect Instagram to retry.",
      }),
      { status: 302 },
    );
  }
  if (!code) {
    return NextResponse.redirect(
      adminUrl(req, { ig: "error", message: "missing code parameter" }),
      { status: 302 },
    );
  }

  // 3. Need app credentials to exchange the code.
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (!appId || !appSecret) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: "META_APP_SECRET and NEXT_PUBLIC_META_APP_ID must be set in .env",
      }),
      { status: 302 },
    );
  }

  // 4. Exchange the code for a short-lived token.
  const tokenRes = await fetch(`${GRAPH}/oauth/access_token?` +
    new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: `${getBaseUrl(req)}/api/social/instagram/callback`,
      code,
    }).toString(),
  { cache: "no-store" });
  if (!tokenRes.ok) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: `code exchange failed: ${tokenRes.status} ${await tokenRes.text()}`,
      }),
      { status: 302 },
    );
  }
  const tokenJson = (await tokenRes.json()) as TokenExchangeResponse;
  if (!tokenJson.access_token) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: `no access_token in exchange response: ${JSON.stringify(tokenJson)}`,
      }),
      { status: 302 },
    );
  }
  const shortLivedToken = tokenJson.access_token;

  // 5. Promote to a 60-day long-lived token.
  let longLived: { accessToken: string; expiresIn: number; expiresAt: string };
  try {
    longLived = await exchangeForLongLivedToken(shortLivedToken, appId, appSecret);
  } catch (err) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: `long-lived exchange failed: ${err instanceof Error ? err.message : String(err)}`,
      }),
      { status: 302 },
    );
  }

  // 6. Walk /me/accounts to find the linked IG business account.
  //    The user's user-token can list the Pages they manage; the IG
  //    business account is a child of one of those Pages.
  const accountsRes = await fetch(
    `${GRAPH}/me/accounts?` +
      new URLSearchParams({
        fields: "id,name,access_token,instagram_business_account{id,username,name}",
        access_token: longLived.accessToken,
      }).toString(),
    { cache: "no-store" },
  );
  if (!accountsRes.ok) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: `/me/accounts failed: ${accountsRes.status} ${await accountsRes.text()}`,
      }),
      { status: 302 },
    );
  }
  const accountsJson = (await accountsRes.json()) as MeAccountsResponse;
  const igAccount = (accountsJson.data ?? []).find(
    (p) => p.instagram_business_account !== undefined,
  );
  if (!igAccount || !igAccount.instagram_business_account) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message:
          "No Instagram Business account linked to any of your Pages. Connect an IG Business account to a Page you admin and try again.",
      }),
      { status: 302 },
    );
  }

  // 7. Persist. We use the page-level access_token when present
  //    (it doesn't expire while the user token is valid), falling
  //    back to the user token. For jaetravel, the user token is
  //    what we need for /me/media, so use the long-lived user token.
  try {
    await saveAccountTokens({
      platform: "instagram",
      externalId: igAccount.instagram_business_account.id,
      displayName: igAccount.instagram_business_account.username
        ? `@${igAccount.instagram_business_account.username}`
        : igAccount.instagram_business_account.name,
      pageId: igAccount.id,
      pageName: igAccount.name,
      accessToken: longLived.accessToken,
      expiresIn: longLived.expiresIn,
      scopes: [
        "instagram_basic",
        "pages_show_list",
        "pages_read_engagement",
        "instagram_manage_insights",
      ],
      connectedById: stateRow.userId,
      connectedByEmail: stateRow.userEmail,
    });
  } catch (err) {
    return NextResponse.redirect(
      adminUrl(req, {
        ig: "error",
        message: `failed to save account: ${err instanceof Error ? err.message : String(err)}`,
      }),
      { status: 302 },
    );
  }

  // 8. Done — back to the admin dashboard.
  return NextResponse.redirect(
    adminUrl(req, {
      ig: "connected",
      handle: igAccount.instagram_business_account.username
        ? `@${igAccount.instagram_business_account.username}`
        : igAccount.instagram_business_account.id,
    }),
    { status: 302 },
  );
}
