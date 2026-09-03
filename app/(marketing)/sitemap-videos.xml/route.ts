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
//   <video:content_loc>, <video:player_loc>, <video:duration>
//   (for YouTube only), <video:view_count>, <video:publication_date>,
//   <video:family_friendly>, <video:restriction relationship="allow">
//
// We restrict the video to KE TZ UG RW — the markets JaeTravel serves
// most directly. This is conservative (we miss IN/UAE/EU/USA traffic
// in Google Video search) but matches the original plan. Easy to
// broaden if it suppresses results we want later.

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Video } from '@cms/payload-types'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

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

interface VideoLike {
  id: number | string
  provider?: 'youtube' | 'instagram' | string
  externalId?: string
  url?: string
  title?: string | null
  description?: string | null
  thumbnailUrl?: string | null
  publishedAt?: string | null
  durationSeconds?: number | null
  syncedAt?: string | null
}

function ytEmbedUrl(externalId: string): string {
  return `https://www.youtube-nocookie.com/embed/${externalId}`
}

function durationToIso(seconds: number | null | undefined): string | null {
  if (!seconds || seconds <= 0) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || 'PT0S'
}

function buildVideoEntry(video: VideoLike, pageUrl: string): string {
  const title = (video.title || '').trim() || 'Untitled video'
  const description = (video.description || '').trim() || `Watch on ${video.provider === 'instagram' ? 'Instagram' : 'YouTube'}.`
  const thumb = video.thumbnailUrl || ''
  const contentLoc = video.url || ''
  const playerLoc = video.provider === 'youtube' && video.externalId ? ytEmbedUrl(video.externalId) : contentLoc
  const duration = video.provider === 'youtube' ? durationToIso(video.durationSeconds) : null
  const pubDate = video.publishedAt ? new Date(video.publishedAt).toISOString() : ''

  const lines: string[] = []
  lines.push(`    <video:thumbnail_loc>${escapeXml(thumb)}</video:thumbnail_loc>`)
  lines.push(`    <video:title>${escapeXml(title)}</video:title>`)
  lines.push(`    <video:description>${escapeXml(description.slice(0, 2048))}</video:description>`)
  lines.push(`    <video:content_loc>${escapeXml(contentLoc)}</video:content_loc>`)
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

async function fetchAllVideos(): Promise<VideoLike[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'videos',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })
  return result.docs as unknown as VideoLike[]
}

interface PageVideoHit {
  pageUrl: string
  videoId: number | string
}

async function fetchPagesWithVideoBlocks(): Promise<PageVideoHit[]> {
  const payload = await getPayload({ config })
  // Pull all published pages with a layout that includes at least one
  // VideoBlock. We can't `where: { 'layout.blockType': equals: 'videoBlock' }`
  // in MongoDB easily, so fetch the lightweight page set and filter in JS.
  const result = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    depth: 3,
    overrideAccess: true,
  })

  const out: PageVideoHit[] = []
  for (const doc of result.docs) {
    const page = doc as { slug?: string; layout?: unknown }
    if (!page.slug) continue
    const layout = Array.isArray(page.layout) ? (page.layout as Array<{ blockType?: string; videos?: unknown }>) : []
    for (const block of layout) {
      if (block?.blockType !== 'videoBlock') continue
      const videos = Array.isArray(block.videos) ? block.videos : []
      for (const v of videos) {
        if (v == null) continue
        const id = typeof v === 'object' ? (v as { id?: number | string }).id : v
        if (id != null) out.push({ pageUrl: `${BASE}/${page.slug}`, videoId: id })
      }
    }
  }
  return out
}

export async function GET() {
  const blocks: string[] = []

  let allVideos: VideoLike[] = []
  let pageHits: PageVideoHit[] = []
  try {
    [allVideos, pageHits] = await Promise.all([fetchAllVideos(), fetchPagesWithVideoBlocks()])
  } catch (err) {
    console.warn('[sitemap-videos] CMS fetch failed, emitting empty sitemap:', err)
  }

  const videoById = new Map<string | number, VideoLike>()
  for (const v of allVideos) videoById.set(v.id, v)

  // (page, video) pairs
  for (const hit of pageHits) {
    const video = videoById.get(hit.videoId)
    if (!video) continue
    blocks.push(buildVideoEntry(video, hit.pageUrl))
  }

  // Standalone Instagram posts — every IG video in the library is
  // emitted on its own permalink so the post is indexed even if no
  // Page has embedded it yet. YouTube videos are skipped here
  // because Google already indexes them on YouTube's own sitemap.
  for (const v of allVideos) {
    if (v.provider !== 'instagram') continue
    if (!v.url) continue
    // Skip if already attached to a page (avoid duplicate entries).
    const alreadyEmitted = pageHits.some((h) => h.videoId === v.id)
    if (alreadyEmitted) continue
    blocks.push(buildVideoEntry(v, v.url))
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
