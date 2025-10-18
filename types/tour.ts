// types/tour.ts
export interface Tour {
  id: string;
  slug: string;
  image?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  itinerary: string;
  bookingUrl: string;
  region: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  url: string;
  duration?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  difficulty?: string;
  groupSize?: number;
  category?: string;
  postId?: string;
}