'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SocialMediaPost } from '@/lib/social-feeds'
import { Instagram, Youtube, Facebook, Music, Play, Heart, MessageCircle, Eye, ExternalLink, RefreshCw } from 'lucide-react'

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Music
}

const platformColors = {
  instagram: 'from-purple-500 to-pink-500',
  youtube: 'from-red-500 to-red-700',
  facebook: 'from-blue-500 to-blue-700',
  tiktok: 'from-black to-gray-800'
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
    <div className="space-y-6">
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

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>{filteredPosts.length} posts</span>
        <span>•</span>
        <span className="capitalize">{selectedPlatform === 'all' ? 'All platforms' : selectedPlatform}</span>
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No posts found. Add your social media API credentials to display real posts.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
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
                        {post.views !== undefined && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(post.views)}
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
      )}

      {/* Post Modal */}
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
                  {selectedPost.type === 'video' && (
                    <a
                      href={selectedPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-gray-900 ml-1" />
                      </div>
                    </a>
                  )}
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
                    {selectedPost.views !== undefined && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatNumber(selectedPost.views)} views
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

      {/* API Setup Notice */}
      {posts.length > 0 && posts[0]?.id?.startsWith('ig-') && (
        <div className="text-center text-xs text-muted-foreground mt-8 p-4 bg-muted/50 rounded-lg">
          <p>Currently showing demo content. Add social media API credentials to display your real posts.</p>
          <p className="mt-1">
            See setup guide: <code className="bg-muted px-1 py-0.5 rounded">docs/SOCIAL_API_SETUP.md</code>
          </p>
        </div>
      )}
    </div>
  )
}

// Need to import React for React.createElement
import React from 'react'