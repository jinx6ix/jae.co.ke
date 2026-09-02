'use client'

import React from 'react'
import Image from 'next/image'

import type { Page } from '@cms/payload-types'

import { CMSLink } from '@cms/components/Link'
import { Media } from '@cms/components/Media'
import RichText from '@cms/components/RichText'

type HeroType = NonNullable<Page['hero']>['type']

// RenderHero handles the four hero variants configured in
// cms/heros/config.ts (none | lowImpact | mediumImpact | highImpact).
// It's a client component because the medium/high variants need a
// full-bleed image and Tailwind classes that depend on the variant.
export const RenderHero: React.FC<{ hero: Page['hero'] | null | undefined }> = ({ hero }) => {
  if (!hero) return null

  const variant: HeroType = (hero.type as HeroType) || 'lowImpact'

  if (variant === 'none') return null

  const media = typeof hero.media === 'object' ? hero.media : null

  if (variant === 'highImpact') {
    return (
      <section className="relative -mt-[10rem] flex min-h-[80vh] items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0 select-none">
          {media ? (
            <Media resource={media} imgClassName="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-emerald-900 to-emerald-700" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 py-32 text-center">
          {hero.richText && (
            <RichText
              className="mx-auto max-w-3xl text-white prose-invert"
              data={hero.richText}
              enableGutter={false}
            />
          )}
          {hero.links && hero.links.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {hero.links.map((linkItem, i) => (
                <CMSLink key={i} {...linkItem.link} appearance="default" size="lg" />
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'mediumImpact') {
    return (
      <section className="relative">
        <div className="container relative z-10 -mt-[6rem] pb-12">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              {media ? (
                <Media resource={media} imgClassName="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-emerald-50" />
              )}
            </div>
            <div className="p-8 md:p-12">
              {hero.richText && <RichText data={hero.richText} enableGutter={false} />}
              {hero.links && hero.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {hero.links.map((linkItem, i) => (
                    <CMSLink key={i} {...linkItem.link} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // lowImpact
  return (
    <section className="container pb-12 pt-6">
      <div className="max-w-3xl">
        {hero.richText && <RichText data={hero.richText} enableGutter={false} />}
        {hero.links && hero.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {hero.links.map((linkItem, i) => (
              <CMSLink key={i} {...linkItem.link} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
