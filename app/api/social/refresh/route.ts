// app/api/social/refresh/route.ts
// This endpoint is designed to be called by a cron job to refresh social feeds
// Add to vercel.json:
// { "crons": [{ "path": "/api/social/refresh", "schedule": "0 */6 * * *" }] }

import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Fetch from all platforms to cache them
    const [instagramRes, youtubeRes, facebookRes, tiktokRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jaetravel.co.ke'}/api/social/instagram`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jaetravel.co.ke'}/api/social/youtube`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jaetravel.co.ke'}/api/social/facebook`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jaetravel.co.ke'}/api/social/tiktok`),
    ])

    const [instagram, youtube, facebook, tiktok] = await Promise.all([
      instagramRes.json(),
      youtubeRes.json(),
      facebookRes.json(),
      tiktokRes.json(),
    ])

    const results = {
      success: true,
      timestamp: new Date().toISOString(),
      sources: {
        instagram: { count: instagram.posts?.length || 0, source: instagram.source },
        youtube: { count: youtube.posts?.length || 0, source: youtube.source },
        facebook: { count: facebook.posts?.length || 0, source: facebook.source },
        tiktok: { count: tiktok.posts?.length || 0, source: tiktok.source }
      },
      totalPosts: (instagram.posts?.length || 0) + 
                  (youtube.posts?.length || 0) + 
                  (facebook.posts?.length || 0) + 
                  (tiktok.posts?.length || 0)
    }

    console.log('[Social Refresh] Successfully refreshed feeds:', results)

    return NextResponse.json(results)

  } catch (error) {
    console.error('[Social Refresh] Error:', error)
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Failed to refresh social feeds'
    }, { status: 500 })
  }
}

// Also allow GET for testing
export async function GET() {
  return POST()
}