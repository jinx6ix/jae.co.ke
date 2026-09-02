import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const DestinationGridBlock: React.FC<
  // destinations isn't a collection yet — we read from tours grouped by
  // meta.country instead, since that's the closest thing the CMS has to
  // a "destination" concept today.
  { heading?: string | null; intro?: string | null; limit?: number | null; disableInnerContainer?: boolean }
> = async ({ heading, intro, limit, disableInnerContainer }) => {
  const payload = await getPayload({ config: configPromise })
  const safeLimit = typeof limit === 'number' && limit > 0 ? limit : 6

  const result = await payload.find({
    collection: 'tours',
    limit: 500,
    depth: 0,
    overrideAccess: false,
    where: { _status: { equals: 'published' } },
  })

  // Group tours by the slug of their first word, falling back to title.
  // We don't have a real `destinations` collection; this gives editors
  // a destination index from the tours they already maintain.
  const grouped = new Map<string, { name: string; cover?: string; count: number }>()
  for (const t of result.docs as Array<{
    id: string
    title: string
    slug?: string | null
    meta?: { image?: { url?: string | null; alt?: string | null } | null }
  }>) {
    const slug = t.slug || t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const existing = grouped.get(slug)
    const cover = t.meta?.image?.url ?? undefined
    if (existing) {
      existing.count += 1
    } else {
      grouped.set(slug, { name: t.title.split(' ').slice(0, 3).join(' '), cover, count: 1 })
    }
  }

  const destinations = Array.from(grouped.entries())
    .slice(0, safeLimit)
    .map(([slug, info]) => ({ slug, ...info }))

  if (destinations.length === 0) return null

  return (
    <section className={disableInnerContainer ? 'my-16' : 'container my-16'}>
      {heading && (
        <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      )}
      {intro && <p className="mb-10 max-w-3xl text-muted-foreground">{intro}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="group block overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-lg"
          >
            {d.cover && (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={d.cover}
                  alt={d.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="mb-1 text-lg font-semibold">{d.name}</h3>
              <p className="text-sm text-muted-foreground">
                {d.count} {d.count === 1 ? 'tour' : 'tours'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
