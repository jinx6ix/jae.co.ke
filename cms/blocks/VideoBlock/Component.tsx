// cms/blocks/VideoBlock/Component.tsx
//
// Renders the VideoBlock on the public site. Two embed strategies:
//   - YouTube: iframe to youtube-nocookie.com (no third-party cookies set on
//     first paint; better Core Web Vitals + GDPR posture than youtube.com).
//   - Instagram: official blockquote embed + one-time load of embed.js via
//     next/script strategy=lazyOnload.
//
// Each video also emits a VideoObject JSON-LD blob so search engines can
// surface it in the Videos tab / video carousel. Multiple videos on a page
// produce an array of VideoObject — the AllPageSEOSchema concatenates them.

import Script from 'next/script'
import React from 'react'

import { toISO8601Duration } from '../../../lib/youtube'

import type { VideoBlock as VideoBlockProps } from '@cms/payload-types'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jaetravel.co.ke'
const ORG_ID = `${SITE}/#organization`

type PopulatedVideo = {
  id: number | string
  provider: 'youtube' | 'instagram'
  externalId: string
  url: string
  title?: string | null
  description?: string | null
  thumbnailUrl?: string | null
  publishedAt?: string | null
  durationSeconds?: number | null
}

type Props = VideoBlockProps & {
  disableInnerContainer?: boolean
  className?: string
}

function normaliseVideo(v: unknown): PopulatedVideo | null {
  if (!v) return null
  // When depth≥1 the relationship is an object, not just an id. We accept both
  // because payload's depth handling on blocks is occasionally lossy on
  // older documents.
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>
    return {
      id: (o.id as number | string) ?? '',
      provider: o.provider as PopulatedVideo['provider'],
      externalId: o.externalId as string,
      url: o.url as string,
      title: (o.title as string) ?? '',
      description: (o.description as string) ?? '',
      thumbnailUrl: (o.thumbnailUrl as string) ?? '',
      publishedAt: (o.publishedAt as string) ?? '',
      durationSeconds: (o.durationSeconds as number) ?? 0,
    }
  }
  return null
}

function YouTubeEmbed({ video, title }: { video: PopulatedVideo; title?: string }) {
  return (
    <iframe
      className="absolute inset-0 h-full w-full rounded-xl"
      src={`https://www.youtube-nocookie.com/embed/${video.externalId}?rel=0&modestbranding=1`}
      title={title || video.title || 'YouTube video'}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

function InstagramEmbed({ video }: { video: PopulatedVideo }) {
  // The IG embed widget only renders client-side after embed.js runs. The
  // blockquote carries the permalink in a data attribute that the script
  // replaces with the iframe. We render the blockquote SSR; the upgrade to
  // the iframe happens after hydration.
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={video.url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 12,
          margin: 0,
          maxWidth: 540,
          minWidth: 280,
          padding: 0,
          width: '100%',
        }}
      >
        <a href={video.url} target="_blank" rel="noreferrer">
          {video.title || video.description?.slice(0, 80) || 'View on Instagram'}
        </a>
      </blockquote>
    </div>
  )
}

function videoSchema(video: PopulatedVideo, pageUrl: string) {
  const isYouTube = video.provider === 'youtube'
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video-${video.externalId}`,
    name: video.title || (isYouTube ? 'Safari video' : 'Instagram reel'),
    description: video.description || undefined,
    thumbnailUrl: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
    uploadDate: video.publishedAt || undefined,
    duration:
      isYouTube && video.durationSeconds
        ? toISO8601Duration(video.durationSeconds)
        : undefined,
    contentUrl: video.url,
    embedUrl: isYouTube
      ? `https://www.youtube-nocookie.com/embed/${video.externalId}`
      : `${video.url}embed/`,
    publisher: { '@id': ORG_ID },
  }
}

export const VideoBlockComponent: React.FC<Props> = (props) => {
  const { heading, videos, layout = 'grid', showCaptions = true, className } = props
  const list: PopulatedVideo[] = (Array.isArray(videos) ? videos : [])
    .map(normaliseVideo)
    .filter((v): v is PopulatedVideo => v !== null)

  if (list.length === 0) return null

  // We approximate the page URL from the referrer for the JSON-LD @id.
  // The AllPageSEOSchema also emits its own VideoObject on the same page;
  // the @id disambiguates them so Google doesn't see them as duplicates.
  const pageUrl = SITE

  const gridClass =
    layout === 'grid'
      ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
      : layout === 'stack'
        ? 'flex flex-col gap-8'
        : 'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4'

  const needsInstagramScript = list.some((v) => v.provider === 'instagram')

  return (
    <section className={className}>
      {heading && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">{heading}</h2>
      )}

      <div className={gridClass}>
        {list.map((video) => {
          const aspect = 'aspect-video'
          return (
            <div key={String(video.id)} className="flex flex-col gap-3">
              <div className={`relative w-full overflow-hidden ${aspect} rounded-xl bg-muted`}>
                {video.provider === 'youtube' ? (
                  <YouTubeEmbed video={video} />
                ) : (
                  <InstagramEmbed video={video} />
                )}
              </div>
              {showCaptions && (video.title || video.description) && (
                <div className="text-sm">
                  {video.title && (
                    <p className="font-semibold text-foreground">{video.title}</p>
                  )}
                  {video.description && (
                    <p className="mt-1 line-clamp-3 text-muted-foreground">
                      {video.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* One VideoObject per video for Google Video search. */}
      {list.map((video) => (
        <script
          key={`ld-${video.externalId}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema(video, pageUrl)) }}
        />
      ))}

      {/* Instagram's embed.js only needs to load if at least one reel is on
          the page, and only once per page (the script is idempotent). */}
      {needsInstagramScript && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
        />
      )}
    </section>
  )
}
