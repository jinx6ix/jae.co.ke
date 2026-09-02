import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Brand assets the marketing site reads via `getBrandUrl()` in
// `lib/brand-media.ts`. When one of these filenames is uploaded
// or replaced in /admin, the revalidate hook below posts a
// brand-specific tag in addition to the generic `media` tag so
// the right `unstable_cache` entry is busted.
const BRAND_ASSETS: Record<string, string> = {
  'logo.png': 'brand:logo',
  'og-image.jpg': 'brand:ogImage',
  'favicon-32x32.png': 'brand:favicon',
}

// Fire-and-forget POST to the Next.js revalidate endpoint.
// Runs from the Payload admin, so REVALIDATE_SECRET is set as
// an env var on the same server. The function never throws —
// if the cache invalidation fails the worst case is the editor
// sees the previous asset for up to the cache TTL.
async function pingRevalidate(tags: string[]): Promise<void> {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    // No secret configured — quietly skip. The TTL on
    // `lib/brand-media.ts` (1h) still bounds staleness, so this
    // is a degradation, not a correctness problem.
    return
  }
  // Compute base URL from env, falling back to a localhost
  // guess. In production this is the canonical site origin
  // (e.g. https://www.jaetravel.co.ke). The admin lives on
  // the same domain, so the relative /api/revalidate path
  // works either way.
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    'http://localhost:3000'
  const qs = tags.map((t) => `tag=${encodeURIComponent(t)}`).join('&')
  try {
    await fetch(`${baseUrl}/api/revalidate?${qs}`, {
      method: 'POST',
      headers: { 'x-revalidate-secret': secret },
      // Don't let a slow revalidate block the editor's save.
      // 5s is plenty for a tag bust on a single-region deploy.
      signal: AbortSignal.timeout(5000),
    })
  } catch (err) {
    // Log but don't throw — the next TTL tick will catch up.
    console.error('[media revalidate] failed:', err)
  }
}

// Map a Media doc to the set of tags that should be invalidated.
// Always includes `media` (the general cache), and adds a
// brand-specific tag if the filename matches a known brand asset
// so the `getBrandUrl()` cache for that exact asset is busted.
function tagsForMediaDoc(doc: { filename?: string | null }): string[] {
  const tags = ['media']
  if (doc.filename && BRAND_ASSETS[doc.filename]) {
    tags.push(BRAND_ASSETS[doc.filename])
  }
  return tags
}

const afterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await pingRevalidate(tagsForMediaDoc(doc as { filename?: string | null }))
  return doc
}

const afterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await pingRevalidate(tagsForMediaDoc(doc as { filename?: string | null }))
  return doc
}

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
