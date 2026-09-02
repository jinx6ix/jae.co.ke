import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Tour, TourGridBlock as TourGridBlockProps } from '@cms/payload-types'

export const TourGridBlock: React.FC<TourGridBlockProps & { disableInnerContainer?: boolean }> = async (
  props,
) => {
  const { heading, intro, limit, category, ctaLabel, disableInnerContainer } = props

  const payload = await getPayload({ config: configPromise })
  const safeLimit = typeof limit === 'number' && limit > 0 ? limit : 12

  // Pull a wider net than the limit so we can filter by keyword client-side
  // and still return up to `limit` matches. The tours collection is small
  // (~70 docs) so the extra rows don't matter; if it grows, swap to a
  // proper search index.
  const result = await payload.find({
    collection: 'tours',
    limit: 200,
    depth: 1,
    overrideAccess: false,
    where: { _status: { equals: 'published' } },
  })

  let tours: Tour[] = result.docs as Tour[]

  if (category) {
    const needle = category.toLowerCase()
    tours = tours.filter((t) => {
      const title = (t.title || '').toLowerCase()
      const short = (t.shortDescription || '').toLowerCase()
      return title.includes(needle) || short.includes(needle)
    })
  }

  tours = tours.slice(0, safeLimit)

  if (tours.length === 0) return null

  return (
    <section className={disableInnerContainer ? 'my-16' : 'container my-16'}>
      {heading && (
        <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      )}
      {intro && <p className="mb-10 max-w-3xl text-muted-foreground">{intro}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => {
          const slug = typeof tour.slug === 'string' ? tour.slug : ''
          const imageUrl = (tour.meta?.image as { url?: string } | undefined)?.url
          const alt = (tour.meta?.image as { alt?: string } | undefined)?.alt || tour.title

          return (
            <Link
              key={tour.id}
              href={slug ? `/tours/${slug}` : '/tours'}
              className="group block overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-lg"
            >
              {imageUrl && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={alt || tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold line-clamp-2">{tour.title}</h3>
                {tour.shortDescription && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {tour.shortDescription}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {ctaLabel && tours.length === safeLimit && (
        <div className="mt-8 text-center">
          <Link
            href="/tours"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {ctaLabel} →
          </Link>
        </div>
      )}
    </section>
  )
}
