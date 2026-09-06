// cms/collections/Videos/hooks/defaultSlug.ts
//
// beforeChange hook: if the editor left the `slug` field blank, generate
// a URL-safe slug from the (now-populated) `title` field. The syncFromSource
// hook runs first and fills in the title from the YouTube/IG API, so by
// the time this hook fires the title is usually non-empty.
//
// Slug rules (matched by the page route + sitemap):
//   - lowercase
//   - letters, digits, and dashes only
//   - collapse whitespace and non-allowed punctuation to a single dash
//   - trim leading/trailing dashes
//   - cap at 80 chars (URL sanity)
//
// We never overwrite an editor-typed slug — only fill when blank. The
// unique index on the field is the safety net for collisions: if two
// videos slugify to the same value, the second save will fail and the
// editor can disambiguate.

import type { CollectionBeforeChangeHook } from 'payload'

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '') // strip combining diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
    .replace(/-+$/, '')
}

export const defaultSlug: CollectionBeforeChangeHook = ({ data }) => {
  if (data?.skipSync) return data
  const existing = (data?.slug ?? '').toString().trim()
  if (existing) return data

  const title = (data?.title ?? '').toString().trim()
  // Fall back to the externalId if the title is still empty (e.g. the
  // API call failed and the editor hit save with just the id). Slugs
  // derived from an id are ugly but always unique.
  const seed = title || data?.externalId || `video-${Date.now()}`
  return { ...data, slug: slugify(seed) || `video-${Date.now()}` }
}
