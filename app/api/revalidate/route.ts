// app/api/revalidate/route.ts
//
// Tag-based revalidation endpoint. Backs the full-stack caching
// strategy described in `fullstack-cache-rollout.md`:
//   * `unstable_cache` wrappers around MongoDB reads (in
//     `lib/payload-tours.ts`, `lib/payload-vehicles.ts`,
//     `lib/payload-reviews.ts`, and `lib/brand-media.ts`) register
//     tags. The page-level `export const revalidate = N` controls
//     the upper bound, but the *real* freshness lever is this
//     endpoint — when an editor hits Publish in /admin, the
//     Payload `afterChange` hook POSTs here and the next visitor
//     sees fresh data instead of waiting for the TTL to expire.
//
// Auth: `x-revalidate-secret` header MUST match
// `process.env.REVALIDATE_SECRET`. The route refuses to run if
// the env var is missing (fail-closed — leaving it open would
// let any visitor flush every cache on the site).
//
// Input:
//   * `?tag=tours`         — invalidate a single tag (repeatable)
//   * `?path=/tours/foo`   — invalidate a specific path via
//                            `revalidatePath` (repeatable)
//
// HTTP:
//   POST → 200 on success
//   GET  → 405 (so casual scanners don't accidentally invalidate
//                caches; method is intentionally not GET)
//   401  → bad / missing secret
//   400  → neither `tag` nor `path` supplied, or tag not in
//          VALID_TAGS
//   500  → REVALIDATE_SECRET not set in env

import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

// Allow-list of tags any caller can ask us to bust. Adding a new
// `unstable_cache` site? Add its tag here too, otherwise the
// endpoint will reject requests for it and the cache will only
// ever expire on its TTL.
//
//   `media` and `brand:*` back `lib/brand-media.ts` (the live
//   logo / og-image / favicon URLs).
//   `tours` / `vehicles` / `reviews` / `pages` back the
//   respective lib/payload-*.ts helpers.
//   `public:hotels` / `public:tours` back the public builder's
//   read endpoints under `app/api/public/*`.
const VALID_TAGS = new Set<string>([
  "tours",
  "vehicles",
  "reviews",
  "pages",
  "media",
  "brand:logo",
  "brand:ogImage",
  "brand:favicon",
  "public:hotels",
  "public:tours",
])

export async function POST(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected) {
    // Fail-closed: a deployment where this env var is missing
    // is a misconfiguration, not an open door.
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not configured on the server" },
      { status: 500 },
    )
  }

  const provided = req.headers.get("x-revalidate-secret")
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const tagParams = url.searchParams.getAll("tag")
  const pathParams = url.searchParams.getAll("path")

  if (tagParams.length === 0 && pathParams.length === 0) {
    return NextResponse.json(
      { error: "Provide at least one ?tag= or ?path= parameter" },
      { status: 400 },
    )
  }

  // Validate every tag up front — if the caller asked for a tag
  // we don't manage, reject the whole request rather than
  // silently busting the ones we recognise and ignoring the
  // typo'd one. The editor who hit Publish would think the
  // cache is fresh when in fact the unknown tag wasn't busted.
  const invalidTags = tagParams.filter((t) => !VALID_TAGS.has(t))
  if (invalidTags.length > 0) {
    return NextResponse.json(
      {
        error: `Unknown tag(s): ${invalidTags.join(", ")}`,
        validTags: Array.from(VALID_TAGS),
      },
      { status: 400 },
    )
  }

  for (const tag of tagParams) {
    revalidateTag(tag)
  }
  for (const path of pathParams) {
    revalidatePath(path)
  }

  return NextResponse.json(
    {
      revalidated: { tags: tagParams, paths: pathParams },
      at: new Date().toISOString(),
    },
    { status: 200 },
  )
}

// Intentionally not implemented — a GET would let any visitor
// (or a misbehaving prefetcher) flush the cache just by hitting
// the URL. Real callers go through the Payload `afterChange`
// hook or a cron job, both of which can POST.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed — use POST" }, { status: 405 })
}
