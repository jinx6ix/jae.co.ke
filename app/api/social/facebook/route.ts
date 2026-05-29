// app/api/social/facebook/route.ts
import { NextResponse } from 'next/server'
import type { SocialMediaPost } from '@/lib/social-feeds'
import { mockSocialFeeds } from '@/lib/social-feeds'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const pageId = process.env.FACEBOOK_PAGE_ID
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

    // If no credentials, return mock data
    if (!pageId || !accessToken) {
      return NextResponse.json({
        posts: mockSocialFeeds.facebook,
        source: 'mock',
        message: 'Using demo data - add Facebook API credentials for live posts'
      })
    }

    // Fetch from Facebook Graph API
    const fields = 'id,message,full_picture,link,created_time,type,likes.summary(true),comments.summary(true)'
    const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&access_token=${accessToken}&limit=20`

    const response = await fetch(url, { next: { revalidate: 3600 } })
    
    if (!response.ok) {
      const error = await response.json()
      console.error('Facebook API error:', error)
      return NextResponse.json({
        posts: mockSocialFeeds.facebook,
        source: 'mock',
        error: error.message
      }, { status: 200 })
    }

    const data = await response.json()

    const posts: SocialMediaPost[] = data.data
      ?.filter((item: any) => item.message || item.full_picture)
      ?.map((item: any) => ({
        id: `fb-${item.id}`,
        platform: 'facebook' as const,
        type: item.type === 'video' ? 'video' as const : 'image' as const,
        url: item.link || `https://www.facebook.com/${item.id}`,
        thumbnailUrl: item.full_picture || '',
        caption: item.message || '',
        authorName: 'JaeTravel Expeditions',
        authorUsername: 'JaeTravelke',
        publishedAt: item.created_time,
        likes: item.likes?.summary?.total_count || 0,
        comments: item.comments?.summary?.total_count || 0,
        permalink: item.link || `https://www.facebook.com/${item.id}`
      })) || []

    return NextResponse.json({
      posts,
      source: 'facebook',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Facebook route error:', error)
    return NextResponse.json({
      posts: mockSocialFeeds.facebook,
      source: 'mock',
      error: 'Failed to fetch Facebook posts'
    }, { status: 200 })
  }
}