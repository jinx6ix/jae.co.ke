'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SocialMediaPost } from '@/lib/social-feeds'
import { Instagram, Youtube, Facebook, Music, Play, Heart, MessageCircle, Eye, ExternalLink, RefreshCw, X } from 'lucide-react'

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Music
}

const platformBgColors = {
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  youtube: 'bg-gradient-to-br from-red-500 to-red-700',
  facebook: 'bg-gradient-to-br from-blue-500 to-blue-700',
  tiktok: 'bg-gradient-to-br from-black to-gray-800'
}

interface SocialFeedProps {
  initialPosts?: SocialMediaPost[]
  showFilters?: boolean
  title?: string
}

export default function SocialFeed({ 
  initialPosts, 
  showFilters = true,
  title = "Social Media Feed"
}: SocialFeedProps) {
  const [posts, setPosts] = useState<SocialMediaPost[]>(initialPosts || [])
  const [loading, setLoading] = useState(!initialPosts)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null)
  const [showVideo, setShowVideo] = useState<SocialMediaPost | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/social/feed')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (err) {
      console.error('Failed to fetch social posts:', err)
      setError('Failed to load social feed')
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === selectedPlatform)

  const youtubePosts = posts.filter(post => post.platform === 'youtube')

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={fetchPosts}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {title && (
          <h2 className="font-serif text-3xl font-bold">{title}</h2>
        )}
        
        <div className="flex items-center gap-3">
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPlatform === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {(['instagram', 'youtube', 'facebook', 'tiktok'] as const).map(platform => {
                const Icon = platformIcons[platform]
                return (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedPlatform === platform
                        ? platformBgColors[platform] + ' text-white'
                        : 'bg-muted hover:bg-muted/80 capitalize'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline capitalize">{platform}</span>
                  </button>
                )
              })}
            </div>
          )}
          
          <button
            onClick={fetchPosts}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            title="Refresh feed"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* YouTube Videos Section - Optimized for SEO */}
      {youtubePosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500 text-white">
              <Youtube className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Latest YouTube Videos</h3>
          </div>
          
          <p className="text-muted-foreground">
            Watch our latest safari videos from Kenya, Tanzania, Rwanda & Uganda
          </p>

          {/* Video Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubePosts.slice(0, 6).map((video) => {
              const videoId = getYouTubeVideoId(video.url)
              return (
                <motion.article
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Video Thumbnail with Play Button */}
                  <div 
                    className="relative aspect-video cursor-pointer"
                    onClick={() => setShowVideo(video)}
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.caption || 'YouTube video'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    {video.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    )}
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-4">
                    <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                      {video.caption}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatTimeAgo(video.publishedAt)}</span>
                      <a
                        href={video.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3 w-3" />
                        YouTube
                      </a>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>
      )}

      {/* Social Media Grid (excluding YouTube) */}
      {filteredPosts.filter(p => p.platform !== 'youtube').length > 0 && (
        <section className="space-y-6">
          <h3 className="font-serif text-2xl font-bold">Social Posts</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredPosts
                .filter(p => p.platform !== 'youtube')
                .map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={post.thumbnailUrl}
                      alt={post.caption || 'Social media post'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                    
                    {/* Platform Badge */}
                    <div className={`absolute top-2 left-2 ${platformBgColors[post.platform]} p-1.5 rounded-full`}>
                      {React.createElement(platformIcons[post.platform], { className: 'h-3 w-3 text-white' })}
                    </div>

                    {/* Video Indicator */}
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-900 ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <div className="flex items-center gap-3 text-xs">
                          {post.likes !== undefined && (
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3 fill-current" />
                              {formatNumber(post.likes)}
                            </span>
                          )}
                          {post.comments !== undefined && (
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {formatNumber(post.comments)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-1 line-clamp-2">{formatTimeAgo(post.publishedAt)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* YouTube Video Modal - Embedded Player for SEO */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                {/* YouTube Embed - This is what search engines index */}
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(showVideo.url)}?autoplay=1&rel=0`}
                  title={showVideo.caption || 'YouTube video'}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{showVideo.caption}</h3>
                <p className="text-muted-foreground">
                  Published {new Date(showVideo.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => setShowVideo(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Modal for other social platforms */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Image/Video */}
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={selectedPost.thumbnailUrl}
                    alt={selectedPost.caption || 'Post'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${platformBgColors[selectedPost.platform]}`}>
                      {React.createElement(platformIcons[selectedPost.platform], { className: 'h-4 w-4 text-white' })}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedPost.authorName}</p>
                      <p className="text-sm text-muted-foreground">{selectedPost.authorUsername}</p>
                    </div>
                  </div>

                  {selectedPost.caption && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                      {selectedPost.caption}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {selectedPost.likes !== undefined && (
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {formatNumber(selectedPost.likes)} likes
                      </span>
                    )}
                    {selectedPost.comments !== undefined && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {formatNumber(selectedPost.comments)} comments
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    {new Date(selectedPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>

                  <div className="mt-auto flex flex-col gap-2">
                    {selectedPost.permalink && selectedPost.permalink !== '#' && (
                      <a
                        href={selectedPost.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on {selectedPost.platform.charAt(0).toUpperCase() + selectedPost.platform.slice(1)}
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="w-full py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import React from 'react'