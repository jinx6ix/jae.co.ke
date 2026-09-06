// app/(marketing)/watch/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getVideoBySlug, getAllVideoSlugs } from '@/lib/videos'
import { AllPageSEOSchema } from '@/components/AllPageSEOSchema'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllVideoSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  if (!video) return { title: 'Video Not Found' }

  return {
    title: video.title || 'Watch Video',
    description: video.description || 'Watch on JaeTravel.',
    openGraph: {
      title: video.title || 'Watch Video',
      description: video.description || 'Watch on JaeTravel.',
      images: video.thumbnailUrl ? [{ url: video.thumbnailUrl }] : [],
    },
  }
}

export default async function WatchPage({ params }: PageProps) {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  if (!video) notFound()

  // Re-use the existing sitemap-videos embed logic
  let embedUrl = ''
  if (video.provider === 'youtube' && video.externalId) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${video.externalId}`
  } else if (video.provider === 'instagram' && video.url) {
    try {
      const u = new URL(video.url)
      const m = u.pathname.match(/^\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)\/?$/)
      if (m) embedUrl = `https://www.instagram.com/p/${m[1]}/embed/`
      else embedUrl = video.url
    } catch {
      embedUrl = video.url
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Link href="/" passHref>
        <Button variant="ghost" className="mb-6 pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
      {video.description && <p className="text-muted-foreground mb-8">{video.description}</p>}

      {embedUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title={video.title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Structured data — VideoObject */}
      <AllPageSEOSchema
        type="video"
        data={{
          provider: video.provider as 'youtube' | 'instagram',
          externalId: video.externalId,
          url: embedUrl, // The player URL works for VideoObject.contentUrl/playerUrl
          title: video.title,
          description: video.description,
          thumbnailUrl: video.thumbnailUrl,
          publishedAt: video.publishedAt,
          durationSeconds: video.durationSeconds,
        }}
        slug={`watch/${video.slug}`}
      />
    </div>
  )
}
