// app/(marketing)/watch/[slug]/page.tsx
//
// Public video landing page.
//
// This page is intentionally outside Payload's protected admin area.
//
// Public URL:
//   https://www.jaetravel.co.ke/watch/[slug]
//
// Videos themselves remain hosted by:
//   - YouTube
//   - Instagram
//
// Google can crawl this page, see the embedded video, thumbnail,
// title, description and VideoObject structured data.

import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  AllPageSEOSchema,
} from '@/components/AllPageSEOSchema'

import {
  getVideoBySlug,
  getAllVideoSlugs,
} from '@/lib/videos'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 3600

/**
 * Generate static public video pages for published videos only.
 */
export async function generateStaticParams() {
  const slugs =
    await getAllVideoSlugs()

  return slugs.map(
    (slug) => ({
      slug,
    }),
  )
}

/**
 * Generate SEO metadata for the public video page.
 */
export async function generateMetadata(
  {
    params,
  }: PageProps,
): Promise<Metadata> {
  const {
    slug,
  } = await params

  const video =
    await getVideoBySlug(slug)

  if (!video) {
    return {
      title: 'Video Not Found',
      robots: {
        index: false,
        follow: true,
      },
    }
  }

  const title =
    video.title?.trim() ||
    'JaeTravel Expeditions Video'

  const description =
    video.description?.trim() ||
    `Watch ${title} on JaeTravel Expeditions.`

  const canonical =
    `https://www.jaetravel.co.ke/watch/${encodeURIComponent(
      video.slug,
    )}`

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },

    openGraph: {
      type: 'video.other',

      url: canonical,

      title,

      description,

      siteName:
        'JaeTravel Expeditions',

      images:
        video.thumbnailUrl
          ? [
              {
                url: video.thumbnailUrl,
                width: 1280,
                height: 720,
                alt: title,
              },
            ]
          : [],
    },

    twitter: {
      card: 'summary_large_image',

      title,

      description,

      images:
        video.thumbnailUrl
          ? [video.thumbnailUrl]
          : [],
    },
  }
}

/**
 * Build the actual external player URL.
 */
function getEmbedUrl(
  provider: string,
  externalId: string,
  sourceUrl: string,
): string {
  if (
    provider === 'youtube' &&
    externalId
  ) {
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
      externalId,
    )}`
  }

  if (
    provider === 'instagram' &&
    sourceUrl
  ) {
    try {
      const parsed =
        new URL(sourceUrl)

      const match =
        parsed.pathname.match(
          /^\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)\/?$/,
        )

      if (match) {
        return `https://www.instagram.com/p/${match[1]}/embed/`
      }
    } catch {
      // Fall through.
    }
  }

  return sourceUrl
}

export default async function WatchPage(
  {
    params,
  }: PageProps,
) {
  const {
    slug,
  } = await params

  const video =
    await getVideoBySlug(slug)

  /**
   * getVideoBySlug() only returns published videos,
   * so drafts cannot be rendered here.
   */
  if (!video) {
    notFound()
  }

  const pageUrl =
    `https://www.jaetravel.co.ke/watch/${encodeURIComponent(
      video.slug,
    )}`

  const embedUrl =
    getEmbedUrl(
      video.provider,
      video.externalId,
      video.url,
    )

  const title =
    video.title?.trim() ||
    'JaeTravel Expeditions Video'

  const description =
    video.description?.trim() ||
    `Watch ${title} on JaeTravel Expeditions.`

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/"
        className="inline-block"
      >
        <Button
          variant="ghost"
          className="mb-6 pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />

          Back to Home
        </Button>
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="max-w-3xl text-muted-foreground">
              {description}
            </p>
          )}
        </header>

        {embedUrl && (
          <div
            className="
              relative
              aspect-video
              w-full
              overflow-hidden
              rounded-lg
              shadow-lg
              bg-black
            "
          >
            <iframe
              src={embedUrl}
              className="absolute inset-0 h-full w-full"
              title={title}
              loading="lazy"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share
              "
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}

        {video.publishedAt && (
          <p className="mt-4 text-sm text-muted-foreground">
            Published{' '}
            {new Date(
              video.publishedAt,
            ).toLocaleDateString(
              'en-KE',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              },
            )}
          </p>
        )}
      </article>

      {/*
       * IMPORTANT:
       *
       * The canonical URL is the JaeTravel /watch URL.
       *
       * The external YouTube/Instagram URL is used as contentUrl
       * only because the existing AllPageSEOSchema component expects
       * that field. We do NOT claim that it is a local MP4.
       *
       * The actual player URL is supplied separately through the
       * component's embedUrl logic.
       */}
      <AllPageSEOSchema
        type="video"
        data={{
          id: video.id,

          provider:
            video.provider === 'instagram'
              ? 'instagram'
              : 'youtube',

          externalId:
            video.externalId,

          url:
            video.url,

          title,

          description,

          thumbnailUrl:
            video.thumbnailUrl,

          publishedAt:
            video.publishedAt,

          durationSeconds:
            video.durationSeconds,
        }}
        slug={video.slug}
      />

      {/*
       * Extra WebPage/Video metadata is already generated by
       * AllPageSEOSchema.
       *
       * The visible page itself remains the important crawl target:
       *
       * https://www.jaetravel.co.ke/watch/[slug]
       */}
    </main>
  )
}