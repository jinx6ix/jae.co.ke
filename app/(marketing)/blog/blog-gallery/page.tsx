import { buildReviewsArraySchema, buildAggregateRatingSchema } from "@/lib/reviews-schema"
import { buildPageMetadata } from "@/lib/page-seo"
import { ReviewsSlider } from "@/components/ReviewsSlider"
import type { Metadata } from "next"
import GalleryP from "./gallery"
import JsonLd from "@/components/JsonLd";
import { getAllVideos } from "@/lib/videos"
import { GalleryItem } from "@/lib/gallery-data"

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.jaetravel.co.ke/blog/blog-gallery",
  "name": "Safari Photo & Video Gallery",
  "description": "Immerse yourself in the beauty of East Africa through our curated collection of safari photos and videos.",
  "url": "https://www.jaetravel.co.ke/blog/blog-gallery"
}

export const metadata: Metadata = buildPageMetadata({
  title: "Safari Photo & Video Gallery | East Africa Wildlife Photos",
  description:
    "Immerse yourself in the beauty of East Africa through our curated collection of safari photos and videos from Kenya, Tanzania, Rwanda and Uganda.",
  path: "/blog/blog-gallery",
  image:
    "/serengeti-sunset-safari-witness-breathtaking-african-landscape-tanzanias-national-park-experience-awe-inspiring-beauty-382016699.webp",
  imageAlt:
    "Serengeti sunset safari - breathtaking African landscape in Tanzania's national park",
  availableLocales: [],
})

export default async function GalleryPage() {
  const cmsVideos = await getAllVideos()
  const extraItems: GalleryItem[] = cmsVideos.map(v => ({
    id: String(v.id),
    type: "video",
    title: v.title || "Untitled",
    description: v.description || "",
    url: v.url,
    thumbnailUrl: v.thumbnailUrl || undefined,
    category: "Video",
    country: "Unknown",
    tags: [],
    alt: v.title || "Video",
    date: v.publishedAt || v.syncedAt || new Date().toISOString(),
    provider: (v.provider as 'youtube' | 'instagram') || undefined,
    externalId: v.externalId || undefined,
  }))

  return (
    <>
      {/* FULL RICH RESULTS SCHEMA */}
      <JsonLd data={gallerySchema} id={"gallery-schema"} />
      <JsonLd
        id="gallery-reviews-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [
            ...buildReviewsArraySchema("https://www.jaetravel.co.ke/blog/blog-gallery"),
            ...(buildAggregateRatingSchema("https://www.jaetravel.co.ke/blog/blog-gallery")
              ? [buildAggregateRatingSchema("https://www.jaetravel.co.ke/blog/blog-gallery")!]
              : []),
          ],
        }}
      />
      <GalleryP extraItems={extraItems} />

      {/* Real reviews from SafariBookings, TripAdvisor and Google. */}
      <ReviewsSlider title="Traveller reviews of our safaris" />

    </>
  )
}
