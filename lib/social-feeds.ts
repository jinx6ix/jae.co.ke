// lib/social-feeds.ts
// Types and data store for social media feeds

export interface SocialMediaPost {
  id: string
  platform: 'instagram' | 'youtube' | 'facebook' | 'tiktok'
  type: 'image' | 'video' | 'carousel'
  url: string
  thumbnailUrl: string
  caption?: string
  authorName: string
  authorUsername: string
  authorAvatar?: string
  publishedAt: string
  likes?: number
  comments?: number
  views?: number
  duration?: string // for videos
  permalink?: string // link back to original post
}

export interface SocialFeedsCache {
  instagram: SocialMediaPost[]
  youtube: SocialMediaPost[]
  facebook: SocialMediaPost[]
  tiktok: SocialMediaPost[]
  lastUpdated: string
}

// Fallback mock data for when APIs aren't configured
export const mockSocialFeeds: SocialFeedsCache = {
  instagram: [
    {
      id: 'ig-1',
      platform: 'instagram',
      type: 'image',
      url: 'https://www.instagram.com/p/example1/media',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      caption: 'Incredible lion sighting in the Masai Mara! 🦁 #KenyaSafari #WildlifePhotography',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 1247,
      comments: 89,
      permalink: '#'
    },
    {
      id: 'ig-2',
      platform: 'instagram',
      type: 'video',
      url: 'https://www.instagram.com/p/example2/media',
      thumbnailUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
      caption: 'Witnessed the Great Migration crossing! Wildebeest as far as the eye can see. 🌊 #GreatMigration #MasaiMara',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 2341,
      comments: 156,
      permalink: '#'
    },
    {
      id: 'ig-3',
      platform: 'instagram',
      type: 'image',
      url: 'https://www.instagram.com/p/example3/media',
      thumbnailUrl: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600',
      caption: 'Mountain gorilla encounter in Rwanda 💚 #GorillaTrekking #Rwanda',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      likes: 1876,
      comments: 203,
      permalink: '#'
    }
  ],
  youtube: [
    {
      id: 'yt-1',
      platform: 'youtube',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example1',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      caption: 'Epic Safari in Kenya 2026 | 4K Wildlife Documentary',
      authorName: 'JaeTravel Expeditions',
      authorUsername: 'JaeTravel',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      views: 15420,
      duration: '12:34',
      permalink: '#'
    },
    {
      id: 'yt-2',
      platform: 'youtube',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example2',
      thumbnailUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
      caption: 'Wheelchair Accessible Safari Kenya | Inclusive Travel',
      authorName: 'JaeTravel Expeditions',
      authorUsername: 'JaeTravel',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      views: 8921,
      duration: '8:45',
      permalink: '#'
    },
    {
      id: 'yt-3',
      platform: 'youtube',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example3',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600',
      caption: 'Great Migration River Crossing 2026 | Masai Mara Safari',
      authorName: 'JaeTravel Expeditions',
      authorUsername: 'JaeTravel',
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      views: 22150,
      duration: '15:22',
      permalink: '#'
    }
  ],
  facebook: [
    {
      id: 'fb-1',
      platform: 'facebook',
      type: 'image',
      url: 'https://www.facebook.com/photo.php',
      thumbnailUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600',
      caption: 'Elephant family crossing at sunset in Amboseli 🐘 #Amboseli #KenyaSafari',
      authorName: 'JaeTravel Expeditions',
      authorUsername: 'JaeTravelke',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: 892,
      comments: 45,
      permalink: '#'
    },
    {
      id: 'fb-2',
      platform: 'facebook',
      type: 'video',
      url: 'https://www.facebook.com/video.php',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600',
      caption: 'Behind the scenes: Preparing for a gorilla trekking adventure in Uganda!',
      authorName: 'JaeTravel Expeditions',
      authorUsername: 'JaeTravelke',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      views: 3240,
      comments: 67,
      permalink: '#'
    }
  ],
  tiktok: [
    {
      id: 'tt-1',
      platform: 'tiktok',
      type: 'video',
      url: 'https://www.tiktok.com/@jaetravelke/video/example1',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600',
      caption: 'POV: First time seeing a lion on safari 🦁 #safari #kenya #wildlife',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      views: 45200,
      likes: 3200,
      comments: 189,
      permalink: '#'
    },
    {
      id: 'tt-2',
      platform: 'tiktok',
      type: 'video',
      url: 'https://www.tiktok.com/@jaetravelke/video/example2',
      thumbnailUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
      caption: 'Great Migration POV - the thunder of thousands of wildebeest 🦏🌊 #greatmigration #masaimara',
      authorName: 'JaeTravel Expeditions',
      authorUsername: '@jaetravelke',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      views: 89000,
      likes: 7800,
      comments: 423,
      permalink: '#'
    }
  ],
  lastUpdated: new Date().toISOString()
}

// Helper to get all posts sorted by date
export function getAllSocialPosts(cache: SocialFeedsCache): SocialMediaPost[] {
  const allPosts = [
    ...cache.instagram,
    ...cache.youtube,
    ...cache.facebook,
    ...cache.tiktok
  ]
  
  return allPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Helper to get posts by platform
export function getPostsByPlatform(cache: SocialFeedsCache, platform: SocialMediaPost['platform']): SocialMediaPost[] {
  return cache[platform].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}