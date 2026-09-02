// app/(marketing)/[...path]/page.tsx
//
// Catch-all route for the marketing segment. Tries, in order:
//
//   1. Pages collection (slug = path joined with "/")
//      If a published page exists, render it via <CmsPage>.
//   2. Legacy ?p=<postId>&post_type=ht_tour redirect
//      Preserved from the previous version of this file. Old
//      marketing URLs from the WP/Elementor era still hit this
//      route and need to forward to the matching tour.
//   3. 404
//
// Note: real static routes (e.g. /about, /tours) win over the
// catch-all during Next.js routing. New CMS-driven pages are
// reachable simply by creating a Pages doc with the desired slug —
// no new page.tsx needed.

import { notFound, redirect } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { Tour } from "@/types/tour"
import { CmsPage } from "@/app/(marketing)/_components/CmsPage"
import { getPayload } from "payload"
import config from "@payload-config"

// Helper: legacy post-by-id lookup. Kept for back-compat with old
// ?p=<postId> URLs from the prior site.
async function getTourByPostId(postId: string): Promise<Tour | undefined> {
  try {
    const filePath = path.join(process.cwd(), "data", "query_based_posts.json")
    const jsonData = await fs.readFile(filePath, "utf8")
    const tours: Tour[] = JSON.parse(jsonData)
    return tours.find((tour) => tour.postId === postId)
  } catch (error) {
    console.error("Error reading tour data:", error)
    return undefined
  }
}

// Find a published Pages doc by slug without throwing. Returns null
// when no doc matches — caller decides what to do next.
async function findPageBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "pages",
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: "published" } },
        ],
      },
      limit: 1,
      depth: 2,
      overrideAccess: false,
    })
    return result.docs[0] ?? null
  } catch (err) {
    console.warn(`[catch-all] pages lookup failed for ${slug}:`, err)
    return null
  }
}

type Props = {
  params: Promise<{ path: string[] }>
  searchParams: Promise<{ p?: string; post_type?: string }>
}

export default async function CatchAllPage({ params, searchParams }: Props) {
  const { path: segments } = await params
  const { p: postId, post_type: postType } = await searchParams

  // 1. CMS Pages — most new traffic lands here.
  const slug = segments.join("/")
  if (slug) {
    const doc = await findPageBySlug(slug)
    if (doc) {
      return <CmsPage slug={slug} fallback={null} />
    }
  }

  // 2. Legacy post-id redirect (?p=…&post_type=ht_tour)
  if (postId && (!postType || postType === "ht_tour")) {
    const tour = await getTourByPostId(postId)
    if (tour) {
      redirect(tour.url)
    }
  }

  // 3. No match anywhere.
  notFound()
}
