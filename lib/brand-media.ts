// lib/brand-media.ts
//
// Tiny helper that fetches a brand asset (logo, og-image, favicon) by
// filename from the Payload Media collection and returns the URL that
// Next.js / OG / Twitter can drop into metadata or `<Image>` tags.
//
// Why a separate helper:
//   * The same logo URL is referenced from generateMetadata, the
//     <BrandShell /> JSON-LD, the Header, and the footer. Reading
//     it from one place keeps them in lock-step with the actual
//     Media doc — if the editor swaps the file in /admin, every
//     surface picks it up after the next revalidation tick.
//   * The fetch is wrapped in `unstable_cache` with a 1h revalidate
//     and `media` + `brand:<asset>` tags. Vercel free-plan CPU
//     budget: this hits MongoDB at most once per brand asset per
//     hour across ALL page renders, not once per page.
//   * The 1h TTL is the upper bound on staleness; the *real*
//     freshness lever is `app/api/revalidate/route.ts`. The
//     Payload Media collection's afterChange hook POSTs to it
//     with tag `media` and (for a brand asset) the matching
//     `brand:<asset>` tag, so an editor's upload shows up on
//     the next request — not an hour later.
//
// The fallback URL is `/cms-api/media/file/<name>` so the path stays
// valid even before the editor has uploaded anything (the public
// media file route serves raw bytes by name).

import { unstable_cache } from "next/cache"
import { getPayload } from "payload"
import config from "@payload-config"

type BrandAsset = "logo" | "ogImage" | "favicon"

// Each asset's canonical filename in the Media collection. Keep these
// in sync with what the ingest script and the editor use.
const ASSET_FILENAMES: Record<BrandAsset, string> = {
  logo: "logo.png",
  ogImage: "og-image.jpg",
  favicon: "favicon-32x32.png",
}

/**
 * Look up a brand asset by name and return the absolute URL to use
 * in metadata, schema, or `<Image src>`.
 *
 * @param asset   Which brand asset to fetch
 * @param baseUrl The site's canonical origin (e.g. "https://www.jaetravel.co.ke")
 *                — used to build an absolute URL for the fallback.
 * @returns       Absolute URL string. Falls back to the public media
 *                file route if the Media doc isn't found yet.
 */
export async function getBrandUrl(
  asset: BrandAsset,
  baseUrl: string,
): Promise<string> {
  const filename = ASSET_FILENAMES[asset]

  // unstable_cache wraps the MongoDB lookup so Vercel only pays for
  // one query per hour per asset, regardless of how many pages
  // render. The `media` tag matches what the revalidate endpoint
  // (app/api/revalidate/route.ts) invalidates when an editor
  // uploads a new asset.
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: "media",
          where: { filename: { equals: filename } },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        })
        const doc = result.docs[0] as { url?: string } | undefined
        // Payload returns a relative path like "/media/file/logo.png".
        // Resolving against the brand base gives the absolute URL
        // the Open Graph / Twitter / Schema consumers need.
        if (doc?.url) {
          // url may be "/media/..." or "/api/media/file/..." — we
          // normalise either to the public media file route.
          const cleaned = doc.url.startsWith("/")
            ? doc.url
            : `/${doc.url}`
          // If the URL already includes the origin, return as-is.
          if (cleaned.startsWith("http")) return cleaned
          return `${baseUrl}${cleaned}`
        }
      } catch (err) {
        // Don't crash the page on a transient Mongo blip — fall
        // through to the fallback so the page still renders.
        console.error(`getBrandUrl(${asset}) failed:`, err)
      }
      return `${baseUrl}/cms-api/media/file/${filename}`
    },
    // Cache key — same input → same cached entry.
    ["brand-asset", asset, filename],
    {
      revalidate: 3600, // 1 hour
      tags: ["media", `brand:${asset}`],
    },
  )

  return getCached()
}
