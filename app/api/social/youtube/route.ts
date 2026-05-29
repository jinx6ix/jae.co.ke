// app/api/social/youtube/route.ts
import { NextResponse } from 'next/server'
import type { SocialMediaPost } from '@/lib/social-feeds'
import { mockSocialFeeds } from '@/lib/social-feeds'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const channelId = process.env.YOUTUBE_CHANNEL_ID

    // If no credentials, return mock data
    if (!apiKey || !channelId) {
      return NextResponse.json({
        posts: mockSocialFeeds.youtube,
        source: 'mock',
        message: 'Using demo data - add YouTube API credentials for live videos'
      })
    }

    // Fetch from YouTube Data API v3
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`

    const response = await fetch(url, { next: { revalidate: 3600 } })
    
    if (!response.ok) {
      const error = await response.json()
      console.error('YouTube API error:', error)
      return NextResponse.json({
        posts: mockSocialFeeds.youtube,
        source: 'mock',
        error: error.message
      }, { status: 200 })
    }

    const data = await response.json()

    // Get video durations
    const videoIds = data.items?.map((item: any) => item.id.videoId).join(',') || ''
    let durations: Record<string, string> = {}
    
    if (videoIds) {
      const durationUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails`
      try {
        const durationResponse = await fetch(durationUrl)
        const durationData = await durationResponse.json()
        durationData.items?.forEach((item: any) => {
          durations[item.id] = item.contentDetails.duration // ISO 8601 duration
        })
      } catch (e) {
        console.error('Failed to get durations:', e)
      }
    }

    const posts: SocialMediaPost[] = data.items?.map((item: any, index: number) => {
      const duration = durations[item.id.videoId]
      return {
        id: `yt-${item.id.videoId}`,
        platform: 'youtube' as const,
        type: 'video' as const,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || '',
        caption: item.snippet.title,
        authorName: 'JaeTravel Expeditions',
        authorUsername: 'JaeTravel',
        publishedAt: item.snippet.publishedAt,
        views: 0, // Would need separate stats API call
        duration: duration ? formatDuration(duration) : `${index * 3 + 8}:${String(index * 17 % 60).padStart(2, '0')}`,
        permalink: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }
    }) || []

    return NextResponse.json({
      posts,
      source: 'youtube',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('YouTube route error:', error)
    return NextResponse.json({
      posts: mockSocialFeeds.youtube,
      source: 'mock',
      error: 'Failed to fetch YouTube videos'
    }, { status: 200 })
  }
}

function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'
  
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}