// app/api/social/instagram/disconnect/route.ts
//
// Delete the SocialAccount row for the current platform.
//
// We don't revoke the token on Meta's side here — the editor can do
// that from https://www.facebook.com/settings/apps and apps_using_business
// if they want a hard disconnect. The DB row is the only thing we
// own; deleting it makes the next /api/video-sync/instagram call
// return 412 "Instagram account not connected".

import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import config from "@payload-config";
import { deleteAccountTokens, listSocialAccounts } from "../../../../../lib/instagram/account-store";

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const accounts = await listSocialAccounts();
  const ig = accounts.find((a) => a.platform === "instagram");
  if (!ig) {
    // Idempotent — already disconnected.
    return NextResponse.json({ ok: true, alreadyDisconnected: true });
  }
  await deleteAccountTokens("instagram", ig.externalId);
  payload.logger.info(
    `[social/instagram] disconnected by ${user.email} (was ${ig.displayName ?? ig.externalId})`,
  );
  return NextResponse.json({ ok: true });
}
