// lib/marketing-media.ts
//
// Look up marketing-site images by filename or id in the Payload Media
// collection, and rewrite stored URLs into a form next/image can render.
//
// Source of truth:
//   * The Payload Media collection (`media` collection in MongoDB) holds
//     metadata (filename, url, mimeType, sizes, etc.) and Payload's
//     `staticDir` config points at `public/media/` where the actual
//     binary files live on disk.
//   * This project is self-contained. Do NOT fetch images from
//     https://www.jaetravel.co.ke — that is the legacy site this
//     project is replacing. If a binary is missing locally, the right
//     answer is "the file needs to be re-uploaded via /admin", not
//     "silently hotlink the old site".
//
// URL forms produced:
//   * `/cms-api/media/file/<filename>` (what Payload stores in the DB)
//      -> rewritten to `/media/<filename>` for next/image. The
//         `staticDir` is served at `/media/<filename>` in Next.js.
//   * `/media/<filename>` (already local) -> returned as-is.
//   * Full https URL pointing at the Payload media endpoint on this
//     project -> same rewrite applied, hostname stripped.

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Rewrite a stored Media URL into a form `next/image` can fetch locally.
 *
 * Returns an empty string if the URL is unusable — callers should render
 * their own placeholder in that case rather than ship a broken image.
 */
export function toLocalMediaUrl(url: string | null | undefined): string {
  if (!url) return ''

  // Already on the local /media/ static dir.
  if (url.startsWith('/media/')) return url

  // Payload's API path: drop the `/cms-api/media/file/` prefix and keep
  // just the filename. The `staticDir` (public/media/) is served at
  // /media/<filename> in Next.js.
  const apiMatch = url.match(/^(?:https?:\/\/[^/]+)?\/(?:cms-)?api\/media\/file\/(.+)$/)
  if (apiMatch) {
    return `/media/${apiMatch[1]}`
  }

  // Full https URL — if it points at this project's media endpoint,
  // rewrite; otherwise leave it alone (could be a third-party CDN).
  try {
    const u = new URL(url)
    if (u.pathname.startsWith('/cms-api/media/file/') || u.pathname.startsWith('/api/media/file/')) {
      const filename = u.pathname.replace(/^\/(?:cms-)?api\/media\/file\//, '')
      return `/media/${filename}`
    }
    if (u.pathname.startsWith('/media/')) return u.pathname
  } catch {
    // Not a URL — fall through.
  }
  return url
}

/** Get the public URL of a Media doc by its `filename` field. */
export async function getMediaUrlByFilename(filename: string): Promise<string> {
  if (!filename) return ''
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'media',
          where: { filename: { equals: filename } },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        })
        const doc = result.docs[0] as { url?: string } | undefined
        return toLocalMediaUrl(doc?.url)
      } catch (err) {
        console.error('getMediaUrlByFilename failed:', err)
        return ''
      }
    },
    ['media-by-filename', filename],
    { revalidate: 3600, tags: ['media'] },
  )
  return getCached()
}

/** Get the public URL of a Media doc by its `id`. */
export async function getMediaUrlById(id: string | number): Promise<string> {
  if (id == null) return ''
  const getCached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const doc = (await payload.findByID({
          collection: 'media',
          id,
          depth: 0,
          overrideAccess: true,
        })) as { url?: string } | null
        return toLocalMediaUrl(doc?.url)
      } catch (err) {
        console.error('getMediaUrlById failed:', err)
        return ''
      }
    },
    ['media-by-id', String(id)],
    { revalidate: 3600, tags: ['media', `media:${id}`] },
  )
  return getCached()
}

/**
 * Resolve a hardcoded path or filename like `/foo.jpg` into a working URL.
 *
 *   1. If the value is already an absolute URL, run it through toLocalMediaUrl.
 *   2. If the value is a local path (e.g. `/accessible-vehicle-lift.jpg`),
 *      extract the basename and look it up in the Media collection.
 *   3. If no doc matches, fall back to the explicitly-provided
 *      `fallbackFilename` so callers can map known-broken refs to
 *      known-good Media docs.
 *   4. If that also fails, return '' — the caller renders a placeholder.
 */
export async function resolveMarketingImage(
  src: string | null | undefined,
  fallbackFilename?: string,
): Promise<string> {
  if (!src) return ''

  // Already an absolute URL.
  if (/^https?:\/\//i.test(src)) return toLocalMediaUrl(src)

  // Local path that isn't a Payload API path — look up by basename.
  if (src.startsWith('/') && !src.startsWith('/cms-api/') && !src.startsWith('/api/')) {
    const basename = src.split('/').pop() || src
    if (basename.includes('.')) {
      const url = await getMediaUrlByFilename(basename)
      if (url) return url
    }
  }

  // Try the caller-supplied fallback (e.g. map a broken ref to a
  // similar Media doc that does exist).
  if (fallbackFilename) {
    const url = await getMediaUrlByFilename(fallbackFilename)
    if (url) return url
  }

  // Last resort: try `src` itself as a bare filename.
  return getMediaUrlByFilename(src)
}
