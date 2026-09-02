// lib/posts.ts
//
// CMS-backed read helpers for the `posts` collection. Mirrors the
// `lib/payload-pages.ts` pattern: each query is wrapped in
// `unstable_cache` with 1h TTL plus tags the Posts collection's
// revalidation hook can bust, so public pages reflect CMS edits on the
// next request — not an hour later.

import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Post } from '@cms/payload-types'

export type CmsBlogPost = Post

// ---------- Lexical → plain-text helpers ----------

type LexicalNode = {
  type: string
  text?: string
  children?: LexicalNode[]
  [k: string]: unknown
}

type LexicalDoc = {
  root: { children: LexicalNode[]; [k: string]: unknown }
  [k: string]: unknown
}

/** Recursively collect `text` fields from a Lexical document. */
function extractText(doc: LexicalDoc | undefined | null): string {
  if (!doc?.root?.children) return ''
  const parts: string[] = []
  const walk = (node: LexicalNode) => {
    if (typeof node?.text === 'string') parts.push(node.text)
    if (Array.isArray(node?.children)) node.children.forEach(walk)
  }
  doc.root.children.forEach(walk)
  return parts.join(' ')
}

/** Collect paragraphs (one per block, text joined by spaces) for
 *  rendering to a flat HTML-ish string the slug page can split on
 *  `\n\n`. */
function extractParagraphs(doc: LexicalDoc | undefined | null): string[] {
  if (!doc?.root?.children) return []
  const paragraphs: string[] = []
  for (const block of doc.root.children) {
    const parts: string[] = []
    const walk = (node: LexicalNode) => {
      if (typeof node?.text === 'string') parts.push(node.text)
      if (Array.isArray(node?.children)) node.children.forEach(walk)
    }
    walk(block)
    const joined = parts.join('').trim()
    if (joined) paragraphs.push(joined)
  }
  return paragraphs
}

/** Build a short excerpt from the first paragraph. ~ 220 chars. */
function buildExcerpt(doc: LexicalDoc | undefined | null, fallback = ''): string {
  const paragraphs = extractParagraphs(doc)
  const first = paragraphs[0] ?? fallback
  if (!first) return ''
  if (first.length <= 220) return first
  return first.slice(0, 217).replace(/\s+\S*$/, '') + '...'
}

// ---------- Image / author / category helpers ----------

function getHeroImageUrl(post: CmsBlogPost): string {
  if (!post.heroImage) return ''
  if (typeof post.heroImage === 'string') return ''
  return post.heroImage.url ?? ''
}

function getAuthorName(post: CmsBlogPost): string {
  const first = post.populatedAuthors?.[0]
  if (first?.name) return first.name
  if (Array.isArray(post.authors) && post.authors.length > 0 && typeof post.authors[0] !== 'string') {
    return (post.authors[0] as { name?: string | null }).name ?? 'JaeTravel Expeditions'
  }
  return 'JaeTravel Expeditions'
}

function getCategoryTitle(post: CmsBlogPost): string {
  const first = Array.isArray(post.categories) ? post.categories[0] : null
  if (!first) return 'Travel'
  if (typeof first === 'string') return 'Travel'
  return first.title ?? 'Travel'
}

// ---------- Adapters to the frontend `BlogPost` shape ----------

export type RelatedTour = {
  id: string
  slug: string
  title: string
  source: 'tours' | 'budget-tours'
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  image: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  relatedTours: RelatedTour[]
}

/**
 * Pull the populated `relatedTours` polymorphic field off a CMS Post
 * and flatten it into the shape the RelatedTours component expects.
 * Defensive: handles both id-only and populated-object value shapes.
 */
function extractRelatedTours(post: CmsBlogPost): RelatedTour[] {
  const raw = (post as { relatedTours?: unknown }).relatedTours
  if (!Array.isArray(raw)) return []
  const out: RelatedTour[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const obj = item as { relationTo?: string; value?: unknown }
    if (obj.relationTo !== 'tours' && obj.relationTo !== 'budget-tours') continue
    const v = obj.value
    if (typeof v === 'string') {
      out.push({ id: v, slug: '', title: '', source: obj.relationTo })
      continue
    }
    if (v && typeof v === 'object') {
      const tour = v as { id?: number | string; slug?: string; title?: string }
      out.push({
        id: String(tour.id ?? ''),
        slug: tour.slug ?? '',
        title: tour.title ?? '',
        source: obj.relationTo,
      })
    }
  }
  return out
}

/** Flatten a CMS Post into the shape the static frontend expects. */
export function toBlogPost(post: CmsBlogPost): BlogPost {
  const content = extractParagraphs(post.content as LexicalDoc).join('\n\n')
  const excerpt = buildExcerpt(post.content as LexicalDoc, content.slice(0, 220))
  const publishedAt = post.publishedAt ?? post.createdAt ?? new Date().toISOString()
  return {
    id: String(post.id),
    slug: (post as { slug?: string }).slug ?? '',
    title: post.title,
    excerpt,
    content,
    author: getAuthorName(post),
    publishedAt,
    category: getCategoryTitle(post),
    image: getHeroImageUrl(post),
    metaTitle: post.meta?.title ?? post.title,
    metaDescription: post.meta?.description ?? excerpt,
    keywords: [],
    relatedTours: extractRelatedTours(post),
  }
}

// ---------- Cached fetchers ----------

export async function getAllPosts(): Promise<CmsBlogPost[]> {
  const getCached = unstable_cache(
    async () => {
      // Defensive: the build runs `next build` in a Vercel region that
      // may not be whitelisted in MongoDB Atlas, which would otherwise
      // fail `generateStaticParams` for `/blog/[slug]`. Treat an
      // unreachable CMS as "no CMS posts" so the static `blog-data.ts`
      // array is the source of truth for that build. CMS-only slugs are
      // still resolved at request time via ISR (revalidate: 3600).
      try {
        const payload = await getPayload({ config })
        // We use `overrideAccess: true` and filter `_status: published`
        // explicitly to work around a MongoDB query-builder bug: the
        // `authenticatedOrPublished` access layer AND-merges its own
        // `_status` filter with the user's `where`, and the resulting
        // compound query trips a `Cannot read 'type' of undefined` in
        // the polymorphic `relatedTours` field's nested-path resolver.
        // All ingest paths set `_status: 'published'`, so this is safe.
        const result = await payload.find({
          collection: 'posts',
          where: { _status: { equals: 'published' } },
          sort: '-publishedAt',
          depth: 2,
          limit: 100,
          overrideAccess: true,
        })
        return result.docs as CmsBlogPost[]
      } catch (err) {
        console.warn('[posts] getAllPosts: CMS unreachable, using static fallback only', err)
        return [] as CmsBlogPost[]
      }
    },
    ['all-posts'],
    {
      revalidate: 3600,
      tags: ['posts-sitemap', 'posts'],
    },
  )
  return await getCached()
}

export async function getPostBySlug(slug: string): Promise<CmsBlogPost> {
  const getCached = unstable_cache(
    async () => {
      // See `getAllPosts` for the unreachable-CMS rationale. Returning
      // `undefined` here lets the caller fall back to the static data
      // instead of crashing the build.
      try {
        const payload = await getPayload({ config })
        // See `getAllPosts` for the `overrideAccess: true` rationale.
        // We do NOT wrap in `and` — a top-level `_status` filter avoids
        // the same MongoDB query-builder bug for this collection.
        const result = await payload.find({
          collection: 'posts',
          where: {
            and: [
              { _status: { equals: 'published' } },
              { slug: { equals: slug } },
            ],
          },
          limit: 1,
          depth: 2,
          overrideAccess: true,
        })
        return result.docs[0] as CmsBlogPost | undefined
      } catch (err) {
        console.warn(`[posts] getPostBySlug(${slug}): CMS unreachable`, err)
        return undefined
      }
    },
    ['post-by-slug', slug],
    {
      revalidate: 3600,
      tags: [`post:${slug}`, 'posts-sitemap'],
    },
  )
  const post = await getCached()
  if (!post) notFound()
  return post
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await getAllPosts()
    return posts.map((p) => (p as { slug?: string }).slug).filter((s): s is string => !!s)
  } catch (err) {
    console.warn('[posts] getAllPostSlugs: CMS unreachable, using static slugs only', err)
    return []
  }
}

// ---------- Combined listing (CMS ∪ static fallback) ----------

import { blogPosts as staticBlogPosts, type BlogPost as StaticBlogPost } from './blog-data'

/**
 * Combined listing of blog posts. CMS is the source of truth — any
 * static post whose slug is also in the CMS is dropped (CMS wins) so
 * we never double-publish a post that's been enhanced in the CMS.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const cms = await getAllPosts()
  const cmsSlugs = new Set(cms.map((p) => (p as { slug?: string }).slug).filter(Boolean))

  const fromCms = cms.map(toBlogPost)
  const fromStatic = (staticBlogPosts as StaticBlogPost[])
    .filter((p) => !cmsSlugs.has(p.slug))
    .map((p) => ({ ...p }))

  return [...fromCms, ...fromStatic]
}

/**
 * Single-post fetch with static fallback. CMS first, then the legacy
 * `lib/blog-data.ts` array. Returns `null` only if neither has it.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const cms = await getPostBySlug(slug)
    return toBlogPost(cms)
  } catch {
    const fallback = (staticBlogPosts as StaticBlogPost[]).find((p) => p.slug === slug)
    return fallback ? { ...fallback } : null
  }
}

/** Combined slugs for `generateStaticParams` — covers both sources. */
export async function getAllBlogSlugs(): Promise<string[]> {
  const cms = await getAllPostSlugs()
  const staticSlugs = (staticBlogPosts as StaticBlogPost[]).map((p) => p.slug)
  return Array.from(new Set([...cms, ...staticSlugs]))
}

