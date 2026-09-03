// cms/collections/Videos/hooks/syncFromSource.ts
//
// beforeChange hook: when an editor saves a Video doc, hit the appropriate
// external API (YouTube Data API for provider=youtube, Instagram Graph API
// for provider=instagram) and refresh the metadata fields. This keeps
// titles, descriptions, thumbnails, and dates current without requiring the
// editor to re-type anything.
//
// Behaviour
// ---------
// - If `provider` or `externalId` is missing, noop.
// - If the API is unreachable or the id doesn't exist, log a warning and
//   leave the existing fields alone — never block the save.
// - Skip the API call when this is a payload import or when `skipSync` is
//   set on the data (the bulk sync routes use this to avoid recursive calls
//   when they write back the freshly-fetched metadata).

import type { CollectionBeforeChangeHook } from 'payload'

import { fetchVideoMeta } from '../../../../lib/youtube'
import { fetchMediaMeta } from '../../../../lib/instagram'
import { getAccountTokens } from '../../../../lib/instagram/account-store'

export const syncFromSource: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' && operation !== 'update') return data
  if (data?.skipSync) {
    // Caller already populated the fields.
    const { skipSync: _skip, ...rest } = data
    return rest
  }
  if (!data?.provider || !data?.externalId) return data

  try {
    if (data.provider === 'youtube') {
      const apiKey = process.env.YOUTUBE_API_KEY
      if (!apiKey) {
        req.payload.logger.warn(
          '[Videos] YOUTUBE_API_KEY is not set — skipping YouTube metadata sync',
        )
        return data
      }
      const meta = await fetchVideoMeta(data.externalId, apiKey)
      return {
        ...data,
        title: data.title?.trim() ? data.title : meta.title,
        description: data.description?.trim() ? data.description : meta.description,
        thumbnailUrl: meta.thumbnailUrl,
        url: data.url?.trim() ? data.url : meta.url,
        publishedAt: meta.publishedAt,
        durationSeconds: meta.durationSeconds,
        syncedAt: new Date().toISOString(),
      }
    }
    if (data.provider === 'instagram') {
      // Read the long-lived token from the encrypted store. Falls back
      // to the env-var pair (legacy bootstrap path) only when no row
      // exists — same logic as /api/video-sync/instagram.
      let token: string | undefined
      try {
        const account = await getAccountTokens('instagram')
        if (account) {
          token = account.accessToken
        } else {
          token = process.env.INSTAGRAM_ACCESS_TOKEN
          if (!token) {
            req.payload.logger.warn(
              '[Videos] no Instagram account connected — skipping metadata sync',
            )
            return data
          }
        }
      } catch (err) {
        req.payload.logger.warn(
          `[Videos] Instagram token read failed (${err instanceof Error ? err.message : String(err)}) — skipping metadata sync`,
        )
        return data
      }
      const meta = await fetchMediaMeta(data.externalId, token)
      return {
        ...data,
        title: data.title?.trim() ? data.title : meta.title,
        description: data.description?.trim() ? data.description : meta.description,
        thumbnailUrl: meta.thumbnailUrl,
        url: data.url?.trim() ? data.url : meta.url,
        publishedAt: meta.publishedAt,
        syncedAt: new Date().toISOString(),
      }
    }
  } catch (err) {
    // Don't block the save on a transient API failure — log and continue.
    const message = err instanceof Error ? err.message : String(err)
    req.payload.logger.error(`[Videos] sync hook failed: ${message}`)
  }
  return data
}
