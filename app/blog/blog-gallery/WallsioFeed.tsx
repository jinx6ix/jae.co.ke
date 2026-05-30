'use client'

import { useEffect, useRef } from 'react'
import { Instagram, Youtube, Facebook, Music, ExternalLink, RefreshCw } from 'lucide-react'

interface WallsioFeedProps {
  title?: string
  showHeader?: boolean
  showPostInfo?: boolean
  height?: number
}

export default function WallsioFeed({ 
  title = "Social Media Feed",
  showHeader = false,
  showPostInfo = true,
  height = 800
}: WallsioFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="walls.io"]')
    
    if (!existingScript) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://cdn.walls.io/assets/js/wallsio-widget-1.2.js'
      script.setAttribute('data-wallurl', 'https://my.walls.io/knjj4?nobackground=1&show_header=0&show_post_info=1&accessibility=0')
      script.setAttribute('allow', 'camera')
      script.setAttribute('data-title', 'JaeTravel Social Media Feed')
      script.setAttribute('data-width', '100%')
      script.setAttribute('data-autoheight', '0')
      script.setAttribute('data-height', height.toString())
      script.setAttribute('data-lazyload', '1')
      document.body.appendChild(script)
    } else {
      // Reload widget if script exists but wall didn't render
      if (window.__WALLIO_WIDGET__) {
        window.__WALLIO_WIDGET__.reload?.()
      }
    }

    return () => {
      // Cleanup is optional - we want to keep the widget loaded
    }
  }, [height])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">
          Follow our adventures on social media
        </p>
      </div>

      {/* Social Platform Badges */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b">
        <span className="text-sm text-muted-foreground">Follow us:</span>
        <a
          href="https://www.instagram.com/jaetravelke"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
        <a
          href="https://www.youtube.com/@jaetravelke"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Youtube className="h-4 w-4" />
          YouTube
        </a>
        <a
          href="https://www.facebook.com/jaetravelke"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </a>
        <a
          href="https://www.tiktok.com/@jaetravelke"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Music className="h-4 w-4" />
          TikTok
        </a>
      </div>

      {/* Walls.io Widget Container */}
      <div 
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden border bg-white"
        style={{ minHeight: `${height}px` }}
      >
        {/* Walls.io embed - replace with your actual wall ID */}
        <div 
          className="walls-io-container"
          data-wallurl="https://my.walls.io/knjj4?nobackground=1&show_header=0&show_post_info=1&accessibility=0"
          data-width="100%"
          data-autoheight="0"
          data-height={height}
          data-lazyload="1"
        />
        
        {/* Fallback if widget doesn't load */}
        <noscript>
          <div className="p-8 text-center bg-muted/30">
            <p className="text-muted-foreground mb-4">
              To see our social media feed, please enable JavaScript or visit:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://www.instagram.com/jaetravelke" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Instagram
              </a>
              <a href="https://www.youtube.com/@jaetravelke" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                YouTube
              </a>
              <a href="https://www.facebook.com/jaetravelke" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Facebook
              </a>
              <a href="https://www.tiktok.com/@jaetravelke" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                TikTok
              </a>
            </div>
          </div>
        </noscript>
        
        {/* Loading placeholder */}
        <div className="flex items-center justify-center bg-muted/30" style={{ height: `${height}px` }}>
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20" />
                <div className="w-8 h-8 rounded-full bg-pink-500/20" />
                <div className="w-8 h-8 rounded-full bg-red-500/20" />
                <div className="w-8 h-8 rounded-full bg-blue-500/20" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Loading social feed...</p>
            <p className="text-muted-foreground text-xs mt-1">If feed doesn't load, <a href="https://walls.io/knjj4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">view on walls.io</a></p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Social media posts are fetched via Walls.io. Content is publicly available on respective platforms.
        <a href="https://walls.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
          <ExternalLink className="h-3 w-3 inline" />
        </a>
      </p>
    </div>
  )
}

// Add type for window object
declare global {
  interface Window {
    __WALLIO_WIDGET__?: {
      reload?: () => void
    }
  }
}