import type { Metadata } from "next"
import GalleryP from "./gallery"
import JsonLd from "@/components/JsonLd";
import { getAllVideos } from "@/lib/videos"
import { GalleryItem } from "@/lib/gallery-data"

// ... (gallerySchema remains the same)

export const metadata: Metadata = {
  // ... (metadata remains the same)
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
