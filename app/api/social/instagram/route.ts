// app/api/social/instagram/route.ts
import { NextResponse } from 'next/server'
import type { SocialMediaPost } from '@/lib/social-feeds'
import { mockSocialFeeds } from '@/lib/social-feeds'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const accountId = process.env.INSTAGRAM_ACCOUNT_ID

    // If no credentials, return mock data
    if (!accessToken || !accountId) {
      return NextResponse.json({
        posts: mockSocialFeeds.instagram,
        source: 'mock',
        message: 'Using demo data - add Instagram API credentials for live posts'
      })
    }

    // Fetch from Instagram Graph API
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count'
    const url = `https://graph.facebook.com/v18.0/${accountId}/media?fields=${fields}&access_token=${accessToken}`

    const response = await fetch(url, { next: { revalidate: 3600 } })
    
    if (!response.ok) {
      const error = await response.json()
      console.error('Instagram API error:', error)
      return NextResponse.json({
        posts: mockSocialFeeds.instagram,
        source: 'mock',
        error: error.message
      }, { status: 200 })
    }

    const data = await response.json()

    const posts: SocialMediaPost[] = data.data?.map((item: any) => ({
      id: `ig-${item.id}`,
      platform: 'instagram' as const,
      type: item.media_type === 'VIDEO' ? 'video' as const : item.media_type === 'CAROUSEL_ALBUM' ? 'carousel' as const : 'image' as const,
      url: item.media_url || item.thumbnail_url || '',
      thumbnailUrl: item.thumbnail_url || item.media_url || '',
      caption: item.caption || '',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: item.timestamp,
      likes: item.like_count || 0,
      comments: item.comments_count || 0,
      permalink: item.permalink || ''
    })) || []

    return NextResponse.json({
      posts,
      source: 'instagram',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Instagram route error:', error)
    return NextResponse.json({
      posts: mockSocialFeeds.instagram,
      source: 'mock',
      error: 'Failed to fetch Instagram posts'
    }, { status: 200 })
  }
}