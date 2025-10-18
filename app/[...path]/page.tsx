import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { Tour } from '@/types/tour';
import { redirect } from 'next/navigation';

// Read the JSON file
async function getTourByPostId(postId: string): Promise<Tour | undefined> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'query_based_posts.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const tours: Tour[] = JSON.parse(jsonData);
    return tours.find((tour) => tour.postId === postId);
  } catch (error) {
    console.error('Error reading tour data:', error);
    return undefined;
  }
}

// Dynamic page component
export default async function QueryPage({
  searchParams,
}: {
  searchParams: { p?: string; post_type?: string };
}) {
  const postId = searchParams.p;
  const postType = searchParams.post_type;

  // Redirect if post_type=ht_tour or handle post IDs
  if (postId && (!postType || postType === 'ht_tour')) {
    const tour = await getTourByPostId(postId);
    if (tour) {
      redirect(tour.url);
    }
  }

  // If no valid post ID or post_type, return 404
  notFound();
}