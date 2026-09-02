// app/(marketing)/_components/CmsPage.tsx
//
// Shared server component used by every marketing page route after
// the CMS migration. Fetches the Page doc by slug, renders the
// hero, then the layout blocks. Page.tsx files just call:
//
//     <CmsPage slug="about" />
//
// (with an optional `fallback` JSX for backwards-compat while the
// Pages doc is being seeded in /admin).

import { Fragment } from 'react'

import { RenderBlocks } from '@cms/blocks/RenderBlocks'
import { RenderHero } from '@cms/blocks/RenderHero'
import type { Page } from '@cms/payload-types'

import { getPageBySlug } from '@/lib/payload-pages'

type Props = {
  slug: string
  /** Optional locale filter. Defaults to "en". */
  locale?: string
  /** Optional fallback rendered when no published Pages doc exists yet. */
  fallback?: React.ReactNode
}

export const CmsPage: React.FC<Props> = async ({ slug, locale, fallback }) => {
  let page: Page | null = null
  try {
    page = await getPageBySlug(slug, locale)
  } catch {
    // getPageBySlug calls notFound() on miss; the catch here is
    // defensive so the fallback can render.
    page = null
  }

  if (!page) {
    return fallback ? <Fragment>{fallback}</Fragment> : null
  }

  return (
    <Fragment>
      <RenderHero hero={page.hero} />
      {page.layout && page.layout.length > 0 && (
        <article className="pb-24">
          <RenderBlocks blocks={page.layout} />
        </article>
      )}
    </Fragment>
  )
}
