import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const BlogArchiveBlock: React.FC<
  { heading?: string | null; intro?: string | null; limit?: number | null; category?: string | null; disableInnerContainer?: boolean }
> = async ({ heading, intro, limit, category, disableInnerContainer }) => {
  const payload = await getPayload({ config: configPromise })
  const safeLimit = typeof limit === 'number' && limit > 0 ? limit : 6

  const where: Record<string, unknown> = { _status: { equals: 'published' } }
  if (category) where['category.slug'] = { equals: category }

  const result = await payload.find({
    collection: 'posts',
    limit: safeLimit,
    depth: 1,
    overrideAccess: false,
    where,
  })

  if (result.docs.length === 0) return null

  return (
    <section className={disableInnerContainer ? 'my-16' : 'container my-16'}>
      {heading && (
        <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      )}
      {intro && <p className="mb-10 max-w-3xl text-muted-foreground">{intro}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.docs.map((post) => {
          const slug = typeof post.slug === 'string' ? post.slug : ''
          return (
            <Link
              key={post.id}
              href={slug ? `/blog/${slug}` : '/blog'}
              className="group block rounded-lg border border-border bg-card p-5 transition hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">{post.title}</h3>
              {typeof post.excerpt === 'string' && (
                <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
