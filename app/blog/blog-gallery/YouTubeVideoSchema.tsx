'use client'

import { useState, useEffect } from 'react'

interface VideoSchema {
  '@context': 'https://schema.org'
  '@type': 'VideoObject'
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
  embedUrl: string
  publisher: {
    '@type': 'Organization'
    name: 'JaeTravel Expeditions'
    logo: string
  }
}

export default function YouTubeVideoSchema() {
  const [videos, setVideos] = useState<VideoSchema[]>([])

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/social/youtube')
      const data = await res.json()
      
      if (data.posts && data.posts.length > 0) {
        const videoSchemas = data.posts.map((video: any) => {
          const videoId = extractYouTubeId(video.url)
          return {
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: video.caption || 'Safari Video',
            description: `Safari video from JaeTravel Expeditions - ${video.caption || 'East Africa wildlife'}`,
            thumbnailUrl: video.thumbnailUrl,
            uploadDate: video.publishedAt,
            duration: video.duration ? `PT${video.duration.replace(/(\d+):(\d+)/, (_, m, s) => `${parseInt(m)}M${parseInt(s)}S`)}` : 'PT0M30S',
            contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            publisher: {
              '@type': 'Organization',
              name: 'JaeTravel Expeditions',
              logo: 'https://www.jaetravel.co.ke/logo.png'
            }
          }
        })
        setVideos(videoSchemas)
      }
    } catch (error) {
      console.error('Failed to fetch videos for schema:', error)
    }
  }

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : ''
  }

  if (videos.length === 0) return null

  return (
    <>
      {videos.slice(0, 10).map((video, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }}
        />
      ))}
    </>
  )
}