// app/(marketing)/sitemap-videos.xml/route.ts
//
// Video sitemap per Google's video extension spec:
//   https://developers.google.com/search/docs/specialty/video/video-sitemaps
//
// Google's video search specifically indexes this file (or its RSS
// equivalent). The single-page-sitemap approach used previously
// doesn't qualify — that's why Search Console was reporting "1
// discovered video".
//
// What we emit:
//   - For each (page, video) pair where a Page has a VideoBlock
//     referencing the Videos collection, one <url> with:
//       <loc> = the page URL (the canonical "where the embed lives")
//       <video:video> = the video metadata
//   - For each Instagram video NOT yet attached to any page, one <url>
//     with <loc> = the IG permalink (so the post is still indexed
//     on its own canonical URL — YouTube videos are already on the
//     YouTube sitemap so we skip unattached YT entries to avoid
//     noise).
//
// Required fields we emit:
//   <video:thumbnail_loc>, <video:title>, <video:description>,
//   <video:content_loc>  (only when we have a raw video file URL —
//                        currently only for self-hosted mp4s; we omit
//                        it for YouTube/Instagram because neither
//                        platform exposes the raw bytes without auth,
//                        and Google rejects content_loc when it points
//                        at the same permalink as <loc>)
//   <video:player_loc>   (always — YT nocookie embed, or IG embed)
//   <video:duration>     (for YouTube only)
//   <video:family_friendly>, <video:restriction relationship="allow">,
//   <video:publication_date>
//
// We restrict the video to KE TZ UG RW — the markets JaeTravel serves
// most directly. This is conservative (we miss IN/UAE/EU/USA traffic
// in Google Video search) but matches the original plan. Easy to
// broaden if it suppresses results we want later.

import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getAllVideos, type PublicVideo } from '@/lib/videos'

// 1h fallback revalidation. The real-time invalidation is driven by
// revalidateTag('videos-sitemap') from cms/collections/Videos/hooks/revalidateVideo.ts
// and cms/collections/Pages/hooks/revalidatePage.ts.
export const revalidate = 3600

const BASE = 'https://www.jaetravel.co.ke'
const ALLOWED_COUNTRIES = 'KE TZ UG RW'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function ytEmbedUrl(externalId: string): string {
  return `https://www.youtube-nocookie.com/embed/${externalId}`
}

function igEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    const m = u.pathname.match(/^\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)\/?$/)
    if (m) return `https://www.instagram.com/p/${m[1]}/embed/`
  } catch {
    // fall through
  }
  return url
}

function durationToIso(seconds: number | null | undefined): string | null {
  if (!seconds || seconds <= 0) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || 'PT0S'
}

function buildVideoEntry(video: PublicVideo): string {
  const title = (video.title || '').trim() || 'Untitled video'
  const description = (video.description || '').trim() || `Watch on ${video.provider === 'instagram' ? 'Instagram' : 'YouTube'}.`
  // Fail-safe: ensure we always have a thumbnail. If blank, skip to avoid
  // invalid XML generation that triggers "Missing XML tag" errors in GSC.
  const thumb = (video.thumbnailUrl || '').trim()
  if (!thumb) {
    console.warn(`[sitemap-videos] Skipping video ${video.slug} due to missing thumbnail`)
    return ''
  }
  const pageUrl = `${BASE}/watch/${video.slug}`

  let playerLoc = ''
  if (video.provider === 'youtube' && video.externalId) {
    playerLoc = ytEmbedUrl(video.externalId)
  } else if (video.provider === 'instagram' && video.url) {
    playerLoc = igEmbedUrl(video.url)
  }

  const duration = video.provider === 'youtube' ? durationToIso(video.durationSeconds) : null
  const pubDate = video.publishedAt ? new Date(video.publishedAt).toISOString() : ''

  if (!playerLoc) {
    console.warn(`[sitemap-videos] Skipping video ${video.slug} due to missing player_loc`)
    return ''
  }

  const lines: string[] = []
  lines.push(`    <video:thumbnail_loc>${escapeXml(thumb)}</video:thumbnail_loc>`)
  lines.push(`    <video:title>${escapeXml(title)}</video:title>`)
  lines.push(`    <video:description>${escapeXml(description.slice(0, 2048))}</video:description>`)
  if (playerLoc) {
    lines.push(`    <video:player_loc allow_embed="yes">${escapeXml(playerLoc)}</video:player_loc>`)
  }
  if (duration) lines.push(`    <video:duration>${duration}</video:duration>`)
  lines.push(`    <video:family_friendly>yes</video:family_friendly>`)
  lines.push(`    <video:restriction relationship="allow">${ALLOWED_COUNTRIES}</video:restriction>`)
  if (pubDate) lines.push(`    <video:publication_date>${pubDate}</video:publication_date>`)

  return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <video:video>
${lines.join('\n')}
    </video:video>
  </url>`
}

export async function GET() {
  const blocks: string[] = []
  let allVideos: PublicVideo[] = []
  try {
    allVideos = await getAllVideos()
  } catch (err) {
    console.warn('[sitemap-videos] CMS fetch failed, emitting empty sitemap:', err)
  }

  for (const v of allVideos) {
    const entry = buildVideoEntry(v)
    if (entry) blocks.push(entry)
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${blocks.join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
