// scripts/ingest-query-driven-posts.ts
//
// Reads data/query_based_posts.json, data/query_based_posts_v2.json, and
// data/query_based_posts_patch.json, then upserts Posts collection docs
// in Payload CMS.
//
// - query_based_posts.json: 14 original SEO-targeted posts.
// - query_based_posts_v2.json: 57 additional posts covering remaining
//   GSC question queries (with inline tour links + relatedTours).
// - query_based_posts_patch.json: 2 existing posts that get an FAQ
//   block appended and SEO meta refreshed.
//
// Run with `npx tsx scripts/ingest-query-driven-posts.ts`.
//
// Idempotent: re-running updates by slug instead of duplicating.

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs/promises'
import path from 'path'
import { blogPosts as staticBlogPosts } from '../lib/blog-data'

// ---------- Types ----------

type NewPostEntry = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: string
  keywords: string[]
  heroImage?: string
  /** Plain text or simple markdown — split on blank lines into paragraphs. */
  content: string[]
  /**
   * Optional list of `tours/<slug>` or `budget-tours/<slug>` references.
   * The script resolves these to CMS document IDs at ingest time and
   * passes them as the polymorphic `relatedTours` relationship on Posts.
   */
  relatedTours?: string[]
}

type PatchEntry = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  category: string
  keywords: string[]
  heroImage?: string
  appendFaqs: { question: string; answer: string }[]
}

type LexicalTextNode = {
  type: 'text'
  text: string
  format: number
  style: string
  detail: number
  mode: 'normal'
  version: number
}

type LexicalParagraphNode = {
  type: 'paragraph'
  format: '' | 'left' | 'center' | 'right'
  indent: 0
  version: 1
  direction: 'ltr'
  textFormat: 0
  children: LexicalTextNode[]
}

type LexicalHeadingNode = LexicalParagraphNode & {
  type: 'heading'
  tag: 'h2' | 'h3'
}

type LexicalRoot = {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: 'ltr'
    children: Array<LexicalParagraphNode | LexicalHeadingNode>
  }
}

// ---------- Lexical builder ----------

function textNode(text: string): LexicalTextNode {
  return {
    type: 'text',
    text,
    format: 0,
    style: '',
    detail: 0,
    mode: 'normal',
    version: 1,
  }
}

function paragraphNode(text: string): LexicalParagraphNode {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    textFormat: 0,
    children: [textNode(text)],
  }
}

function headingNode(text: string, tag: 'h2' | 'h3' = 'h2'): LexicalHeadingNode {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    textFormat: 0,
    children: [textNode(text)],
  }
}

/**
 * Build a Lexical root document from a list of strings. Strings that
 * start with `## ` become h2 headings; everything else becomes a
 * paragraph. Keeps the post authoring JSON simple and reviewable.
 */
function buildLexical(blocks: string[]): LexicalRoot {
  const children: Array<LexicalParagraphNode | LexicalHeadingNode> = []
  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('## ')) {
      children.push(headingNode(trimmed.slice(3), 'h2'))
    } else if (trimmed.startsWith('### ')) {
      children.push(headingNode(trimmed.slice(4), 'h3'))
    } else {
      children.push(paragraphNode(trimmed))
    }
  }
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

/**
 * Append an FAQ section to an existing Lexical root. We re-build the
 * children array from the existing root plus new heading + Q/A pairs
 * rendered as paragraphs (Payload's Posts collection doesn't have a
 * dedicated FAQ block in the schema; the existing static blog uses
 * paragraphs, so we keep the same shape).
 */
function appendFaqSection(existing: LexicalRoot | undefined, faqs: { question: string; answer: string }[]): LexicalRoot {
  const children: Array<LexicalParagraphNode | LexicalHeadingNode> = existing?.root?.children ? [...existing.root.children] : []
  children.push(headingNode('Frequently Asked Questions', 'h2'))
  for (const faq of faqs) {
    children.push(headingNode(faq.question, 'h3'))
    children.push(paragraphNode(faq.answer))
  }
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

// ---------- Category resolution ----------

async function ensureCategory(payload: Awaited<ReturnType<typeof getPayload>>, title: string): Promise<number> {
  const slug = title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const existing = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id as number
  }

  const created = await payload.create({
    collection: 'categories',
    data: { title, slug },
    overrideAccess: true,
  })
  return created.id as number
}

// ---------- Hero image (best-effort) ----------

async function findHeroImageId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string | undefined,
): Promise<number | null> {
  if (!filename) return null
  const basename = path.basename(filename)
  const result = await payload.find({
    collection: 'media',
    where: {
      or: [
        { filename: { equals: basename } },
        { alt: { equals: basename } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })
  return (result.docs[0]?.id as number) ?? null
}

// ---------- relatedTours slug → CMS doc ID resolver ----------

/**
 * Resolve a list of `tours/<slug>` or `budget-tours/<slug>` references
 * into Payload polymorphic relationship values. Builds a single batched
 * query per collection to avoid N+1 lookups, then maps each reference
 * back to its resolved ID. Unresolved slugs are logged and skipped.
 *
 * Note: IDs come back from MongoDB as strings (ObjectId), so we keep
 * them as strings and only accept non-empty values — the polymorphic
 * `value` field accepts both strings and numbers in Payload.
 */
async function resolveRelatedTours(
  payload: Awaited<ReturnType<typeof getPayload>>,
  refs: string[] | undefined,
): Promise<Array<{ relationTo: 'tours' | 'budget-tours'; value: string | number }>> {
  if (!refs || refs.length === 0) return []

  const tourSlugs: string[] = []
  const budgetSlugs: string[] = []
  for (const ref of refs) {
    if (typeof ref !== 'string') continue
    const [collection, slug] = ref.split('/')
    if (!slug) continue
    if (collection === 'tours') tourSlugs.push(slug)
    else if (collection === 'budget-tours') budgetSlugs.push(slug)
  }

  const tourIdBySlug = new Map<string, string | number>()
  const budgetIdBySlug = new Map<string, string | number>()

  if (tourSlugs.length > 0) {
    const result = await payload.find({
      collection: 'tours',
      where: { slug: { in: tourSlugs } },
      limit: tourSlugs.length,
      overrideAccess: true,
    })
    for (const doc of result.docs) {
      if (doc && (doc as { slug?: string }).slug) {
        tourIdBySlug.set((doc as { slug: string }).slug, doc.id)
      }
    }
  }

  if (budgetSlugs.length > 0) {
    const result = await payload.find({
      collection: 'budget-tours',
      where: { slug: { in: budgetSlugs } },
      limit: budgetSlugs.length,
      overrideAccess: true,
    })
    for (const doc of result.docs) {
      if (doc && (doc as { slug?: string }).slug) {
        budgetIdBySlug.set((doc as { slug: string }).slug, doc.id)
      }
    }
  }

  const out: Array<{ relationTo: 'tours' | 'budget-tours'; value: string | number }> = []
  for (const ref of refs) {
    if (typeof ref !== 'string') continue
    const [collection, slug] = ref.split('/')
    if (!slug) continue
    if (collection === 'tours') {
      const id = tourIdBySlug.get(slug)
      if (id !== undefined) out.push({ relationTo: 'tours', value: id })
      else console.log(`  [warn] relatedTours slug not found: tours/${slug}`)
    } else if (collection === 'budget-tours') {
      const id = budgetIdBySlug.get(slug)
      if (id !== undefined) out.push({ relationTo: 'budget-tours', value: id })
      else console.log(`  [warn] relatedTours slug not found: budget-tours/${slug}`)
    }
  }
  return out
}

// ---------- Main ----------

async function readJson<T>(file: string): Promise<T> {
  const fullPath = path.join(process.cwd(), 'data', file)
  const raw = await fs.readFile(fullPath, 'utf8')
  return JSON.parse(raw) as T
}

async function run() {
  const payload = await getPayload({ config })

  const v1Posts = await readJson<NewPostEntry[]>('query_based_posts.json')
  let v2Posts: NewPostEntry[] = []
  try {
    v2Posts = await readJson<NewPostEntry[]>('query_based_posts_v2.json')
  } catch {
    console.log('  [note] data/query_based_posts_v2.json not found or unreadable; skipping v2')
  }
  const newPosts = [...v1Posts, ...v2Posts]
  const patches = await readJson<PatchEntry[]>('query_based_posts_patch.json')

  if (!Array.isArray(newPosts) || newPosts.length === 0) {
    console.error('No entries in data/query_based_posts.json or v2')
    process.exit(1)
  }

  console.log(`Ingesting ${newPosts.length} posts (v1: ${v1Posts.length}, v2: ${v2Posts.length}) + ${patches.length} patches`)

  let created = 0
  let updated = 0

  // ---- net-new + v2 posts ----
  for (const post of newPosts) {
    const categoryId = await ensureCategory(payload, post.category)
    const heroImageId = await findHeroImageId(payload, post.heroImage)
    const relatedTours = await resolveRelatedTours(payload, post.relatedTours)

    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data: any = {
      title: post.title,
      slug: post.slug,
      content: buildLexical(post.content),
      categories: [categoryId],
      meta: {
        title: post.metaTitle,
        description: post.metaDescription,
      },
      _status: 'published' as const,
    }

    if (heroImageId) {
      data.heroImage = heroImageId
    }
    if (relatedTours.length > 0) {
      data.relatedTours = relatedTours
    }

    if (existing.docs.length > 0) {
      // Update — preserve publishedAt from existing if present
      const doc = existing.docs[0]
      data.publishedAt = doc.publishedAt ?? new Date().toISOString()
      await payload.update({
        collection: 'posts',
        id: doc.id,
        data,
        req: { context: { disableRevalidate: true } } as any,
        overrideAccess: true,
      })
      console.log(`  [update] ${post.slug}`)
      updated++
    } else {
      data.publishedAt = new Date().toISOString()
      await payload.create({
        collection: 'posts',
        data,
        req: { context: { disableRevalidate: true } } as any,
        overrideAccess: true,
      })
      console.log(`  [create] ${post.slug}`)
      created++
    }
  }

  // ---- 2 existing-post patches ----
  // If the post exists in CMS, append the FAQ section to the existing content
  // and refresh the meta. If it doesn't exist yet, fall back to creating a
  // fresh post using the static `lib/blog-data.ts` body as the seed content
  // (so the static source stays in sync with the CMS).
  for (const patch of patches) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: patch.slug } },
      limit: 1,
      overrideAccess: true,
    })

    const categoryId = await ensureCategory(payload, patch.category)
    const heroImageId = await findHeroImageId(payload, patch.heroImage)
    // Patches re-use the original static blog-data relatedTours if present,
    // so we look it up by slug. Falls back to [] when the post isn't in
    // `staticBlogPosts` (e.g. CMS-only post).
    const staticRelatedTours = staticBlogPosts.find((p) => p.slug === patch.slug)?.relatedTours
    const relatedTours = await resolveRelatedTours(
      payload,
      staticRelatedTours?.map((r) => `${r.source}/${r.slug}`),
    )

    if (existing.docs.length === 0) {
      // Fall back to creating from the static blog-data entry. The content is
      // a `\n\n`-separated string we need to convert into Lexical blocks and
      // then append the FAQ section.
      const staticPost = staticBlogPosts.find((p) => p.slug === patch.slug)
      const seedBlocks: string[] = staticPost
        ? staticPost.content
            .split(/\n\n+/)
            .map((s) => s.trim())
            .filter(Boolean)
        : [staticPost?.excerpt ?? patch.title]

      const seedContent = buildLexical(seedBlocks)
      const content = appendFaqSection(seedContent, patch.appendFaqs)

      const data: any = {
        title: patch.title,
        slug: patch.slug,
        content,
        categories: [categoryId],
        meta: {
          title: patch.metaTitle,
          description: patch.metaDescription,
        },
        _status: 'published' as const,
        publishedAt: staticPost?.publishedAt ?? new Date().toISOString(),
      }

      if (heroImageId) {
        data.heroImage = heroImageId
      }
      if (relatedTours.length > 0) {
        data.relatedTours = relatedTours
      }

      await payload.create({
        collection: 'posts',
        data,
        req: { context: { disableRevalidate: true } } as any,
        overrideAccess: true,
      })
      console.log(`  [create-from-patch] ${patch.slug}`)
      created++
      continue
    }

    const doc = existing.docs[0]
    const existingContent = doc.content as LexicalRoot | undefined
    const newContent = appendFaqSection(existingContent, patch.appendFaqs)

    const data: any = {
      title: patch.title,
      content: newContent,
      categories: [categoryId],
      meta: {
        title: patch.metaTitle,
        description: patch.metaDescription,
      },
      _status: 'published' as const,
      publishedAt: doc.publishedAt ?? new Date().toISOString(),
    }

    if (heroImageId) {
      data.heroImage = heroImageId
    }
    if (relatedTours.length > 0) {
      data.relatedTours = relatedTours
    }

    await payload.update({
      collection: 'posts',
      id: doc.id,
      data,
      req: { context: { disableRevalidate: true } } as any,
      overrideAccess: true,
    })
    console.log(`  [patch] ${patch.slug}`)
    updated++
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
