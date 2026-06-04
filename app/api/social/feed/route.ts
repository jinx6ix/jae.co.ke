// app/api/social/feed/route.ts
import { NextResponse } from 'next/server'
import type { SocialMediaPost, SocialFeedsCache } from '@/lib/social-feeds'
import { mockSocialFeeds, getAllSocialPosts } from '@/lib/social-feeds'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check if we have real API credentials configured
    const hasInstagram = !!process.env.INSTAGRAM_ACCESS_TOKEN
    const hasYoutube = !!process.env.YOUTUBE_API_KEY
    const hasFacebook = !!process.env.FACEBOOK_ACCESS_TOKEN
    const hasTiktok = !!process.env.TIKTOK_ACCESS_TOKEN

    // If no API credentials, return mock data directly
    if (!hasInstagram && !hasYoutube && !hasFacebook && !hasTiktok) {
      const posts = getAllSocialPosts(mockSocialFeeds)
      return NextResponse.json({
        cache: mockSocialFeeds,
        posts,
        source: 'mock',
        stats: {
          instagram: mockSocialFeeds.instagram.length,
          youtube: mockSocialFeeds.youtube.length,
          facebook: mockSocialFeeds.facebook.length,
          tiktok: mockSocialFeeds.tiktok.length,
          total: posts.length
        },
        lastUpdated: mockSocialFeeds.lastUpdated,
        note: 'Using demo data. Add API credentials to display real social media posts.'
      })
    }

    // If we have some credentials, fetch from individual platforms
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jaetravel.co.ke'
    
    const fetchWithFallback = async (platform: string, endpoint: string) => {
      try {
        const res = await fetch(`${baseUrl}${endpoint}`, { 
          cache: 'no-store',
          headers: { 'Accept': 'application/json' }
        })
        if (!res.ok) throw new Error(`${platform} fetch failed`)
        const data = await res.json()
        return data.posts || []
      } catch (error) {
        console.error(`${platform} error:`, error)
        return []
      }
    }

    const [instagram, youtube, facebook, tiktok] = await Promise.all([
      hasInstagram ? fetchWithFallback('instagram', '/api/social/instagram') : Promise.resolve(mockSocialFeeds.instagram),
      hasYoutube ? fetchWithFallback('youtube', '/api/social/youtube') : Promise.resolve(mockSocialFeeds.youtube),
      hasFacebook ? fetchWithFallback('facebook', '/api/social/facebook') : Promise.resolve(mockSocialFeeds.facebook),
      hasTiktok ? fetchWithFallback('tiktok', '/api/social/tiktok') : Promise.resolve(mockSocialFeeds.tiktok),
    ])

    const cache: SocialFeedsCache = {
      instagram,
      youtube,
      facebook,
      tiktok,
      lastUpdated: new Date().toISOString()
    }

    const allPosts = getAllSocialPosts(cache)

    return NextResponse.json({
      cache,
      posts: allPosts,
      source: 'combined',
      stats: {
        instagram: instagram.length,
        youtube: youtube.length,
        facebook: facebook.length,
        tiktok: tiktok.length,
        total: allPosts.length
      },
      lastUpdated: cache.lastUpdated,
      note: allPosts.length > 0 ? 'Live social media feed' : 'No posts found'
    })

  } catch (error) {
    console.error('Combined feed error:', error)
    const posts = getAllSocialPosts(mockSocialFeeds)
    return NextResponse.json({
      cache: mockSocialFeeds,
      posts,
      source: 'mock-fallback',
      error: 'Failed to fetch feeds, using demo data'
    }, { status: 200 })
  }
}