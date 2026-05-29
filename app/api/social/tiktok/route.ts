// app/api/social/tiktok/route.ts
import { NextResponse } from 'next/server'
import type { SocialMediaPost } from '@/lib/social-feeds'
import { mockSocialFeeds } from '@/lib/social-feeds'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const appId = process.env.TIKTOK_APP_ID
    const appSecret = process.env.TIKTOK_APP_SECRET
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN

    // If no credentials, return mock data
    // Note: TikTok's API is very restrictive and requires app approval for most endpoints
    // Consider using a third-party aggregator like Walls.io for TikTok
    if (!appId || !appSecret || !accessToken) {
      return NextResponse.json({
        posts: mockSocialFeeds.tiktok,
        source: 'mock',
        message: 'Using demo data - TikTok API requires approval. Consider using Walls.io as alternative.',
        suggestion: 'Visit https://developers.tiktok.com for API access, or use Walls.io embed for TikTok content.'
      })
    }

    // TikTok Content API
    const url = `https://open.tiktokapis.com/v2/content/post/list/?max_count=20&access_token=${accessToken}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('TikTok API error:', error)
      return NextResponse.json({
        posts: mockSocialFeeds.tiktok,
        source: 'mock',
        error: error.error_message || 'TikTok API request failed'
      }, { status: 200 })
    }

    const data = await response.json()

    const posts: SocialMediaPost[] = data.data?.posts?.map((item: any) => ({
      id: `tt-${item.post_id}`,
      platform: 'tiktok' as const,
      type: 'video' as const,
      url: item.share_url || `https://www.tiktok.com/@jaetravelke/video/${item.post_id}`,
      thumbnailUrl: item.cover_image_url || '',
      caption: item.title || '',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: item.create_time ? new Date(item.create_time * 1000).toISOString() : new Date().toISOString(),
      views: item.statistics?.play_count || 0,
      likes: item.statistics?.like_count || 0,
      comments: item.statistics?.comment_count || 0,
      permalink: item.share_url || `https://www.tiktok.com/@jaetravelke/video/${item.post_id}`
    })) || []

    return NextResponse.json({
      posts,
      source: 'tiktok',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('TikTok route error:', error)
    return NextResponse.json({
      posts: mockSocialFeeds.tiktok,
      source: 'mock',
      error: 'Failed to fetch TikTok posts'
    }, { status: 200 })
  }
}