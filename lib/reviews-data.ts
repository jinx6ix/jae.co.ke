export interface Review {
  id: number
  tourId: number
  author: string
  country: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
}

export const reviews: Review[] = [
  {
    id: 1,
    tourId: 1,
    author: "Sarah Johnson",
    country: "United States",
    rating: 5,
    date: "2024-01-15",
    title: "Absolutely Incredible Experience!",
    content:
      "The Masai Mara safari exceeded all expectations. Our guide was knowledgeable and passionate, and we witnessed the Great Migration up close. The accommodations were luxurious and the entire experience was seamless. Highly recommend JaeTravel Expeditions!",
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    tourId: 1,
    author: "Michael Chen",
    country: "Singapore",
    rating: 5,
    date: "2024-02-03",
    title: "Best Safari Ever",
    content:
      "This was my third safari in Africa, and by far the best. The attention to detail, quality of guides, and wildlife sightings were outstanding. Saw all Big Five in just three days!",
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    tourId: 2,
    author: "Emma Williams",
    country: "United Kingdom",
    rating: 5,
    date: "2024-01-28",
    title: "Gorilla Trekking - Life Changing",
    content:
      "Meeting the mountain gorillas in their natural habitat was the most profound wildlife experience of my life. Our guide was exceptional, and the trek, while challenging, was absolutely worth it. JaeTravel made everything easy and comfortable.",
    verified: true,
    helpful: 31,
  },
  {
    id: 4,
    tourId: 3,
    author: "David Martinez",
    country: "Spain",
    rating: 5,
    date: "2024-02-10",
    title: "Serengeti Magic",
    content:
      "The Serengeti is everything you imagine and more. Endless plains filled with wildlife, stunning sunsets, and incredible game drives. Our guide's expertise made all the difference. Can't wait to return!",
    verified: true,
    helpful: 15,
  },
  {
    id: 5,
    tourId: 4,
    author: "Lisa Anderson",
    country: "Australia",
    rating: 5,
    date: "2024-01-20",
    title: "Perfect Combination Tour",
    content:
      "The Kenya and Tanzania combination tour was perfect for seeing the best of both countries. Well-organized, great accommodations, and our guide was fantastic. Saw lions, elephants, giraffes, and so much more!",
    verified: true,
    helpful: 22,
  },
  {
    id: 6,
    tourId: 5,
    author: "James Wilson",
    country: "Canada",
    rating: 5,
    date: "2024-02-05",
    title: "Amboseli Elephants - Unforgettable",
    content:
      "Amboseli is elephant paradise! We saw huge herds with Mt. Kilimanjaro as the backdrop. The photography opportunities were endless. JaeTravel's service was impeccable from start to finish.",
    verified: true,
    helpful: 19,
  },
]

// Generate more reviews for other tours
export function getReviewsForTour(tourId: number): Review[] {
  return reviews.filter((review) => review.tourId === tourId)
}

export function getAverageRating(tourId: number): number {
  const tourReviews = getReviewsForTour(tourId)
  if (tourReviews.length === 0) return 4.8
  const sum = tourReviews.reduce((acc, review) => acc + review.rating, 0)
  return Number((sum / tourReviews.length).toFixed(1))
}
