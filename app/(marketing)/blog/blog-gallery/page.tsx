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

export const metadata: Metadata = {
  title: "Safari Photo & Video Gallery | JaeTravel Expeditions",
  description: "Immerse yourself in the beauty of East Africa through our curated collection of safari photos and videos.",
  alternates: {
    canonical: "https://www.jaetravel.co.ke/blog/blog-gallery",
  },
}

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
  }))

  return (
    <>
      {/* FULL RICH RESULTS SCHEMA */}
      <JsonLd data={gallerySchema} id={"gallery-schema"} />
      <GalleryP extraItems={extraItems} />
    </>
  )
}
