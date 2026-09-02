import React from 'react'
import Image from 'next/image'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@cms/payload-types'
import { Media } from '@cms/components/Media'

export const TestimonialsBlock: React.FC<
  TestimonialsBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, intro, items, disableInnerContainer }) => {
  if (!items || items.length === 0) return null

  return (
    <section className={disableInnerContainer ? 'my-16' : 'container my-16'}>
      {heading && (
        <h2 className="mb-3 text-center text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      )}
      {intro && <p className="mx-auto mb-10 max-w-3xl text-center text-muted-foreground">{intro}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const photo = typeof item.photo === 'object' ? item.photo : null
          return (
            <figure
              key={i}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
            >
              {item.rating ? (
                <div aria-label={`${item.rating} out of 5 stars`} className="text-amber-500">
                  {'★'.repeat(item.rating)}
                  {'☆'.repeat(Math.max(0, 5 - item.rating))}
                </div>
              ) : null}
              <blockquote className="text-muted-foreground">
                <p className="whitespace-pre-line">“{item.quote}”</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                {photo ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Media resource={photo} imgClassName="object-cover" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-muted" aria-hidden />
                )}
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  {item.role && <div className="text-xs text-muted-foreground">{item.role}</div>}
                </div>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
