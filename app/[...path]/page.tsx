import { notFound, redirect } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { Tour } from "@/types/tour"

// Helper function: reads JSON and finds the tour by postId
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

// ✅ Fix: `searchParams` is now asynchronous
type Props = {
  searchParams: Promise<{ p?: string; post_type?: string }>
}

// ✅ Make page async and await searchParams
export default async function QueryPage({ searchParams }: Props) {
  const { p: postId, post_type: postType } = await searchParams

  // Redirect if post_type=ht_tour or handle post IDs
  if (postId && (!postType || postType === "ht_tour")) {
    const tour = await getTourByPostId(postId)
    if (tour) {
      redirect(tour.url)
    }
  }

  // If no valid post ID or post_type, return 404
  notFound()
}
