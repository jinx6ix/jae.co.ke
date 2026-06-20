// lib/special-offers.ts

export interface SpecialOffer {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  originalPrice: number;
  offerPrice: number;
  duration: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals?: string;
  }[];
  bookingUrl: string;
  badge: string;
  active: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export const specialOffers: SpecialOffer[] = [
  {
    id: "offer-1",
    slug: "masai-mara-nakuru-4-days-budget-shared-safari-special",
    title: "Masai Mara & Nakuru 4-Day Budget Shared Safari",
    shortDescription: "Big Five in Masai Mara + Flamingos & Rhinos at Lake Nakuru. All-inclusive budget adventure.",
    longDescription: `Experience the best of Kenya's wildlife diversity on this incredible 4-day budget safari combining two iconic destinations.

**Masai Mara National Reserve** offers world-renowned Big Five wildlife viewing with opportunities to see lions, elephants, buffalo, leopards, and rhinos. The open savannahs provide excellent game drives with predator sightings being common.

**Lake Nakuru National Park** dazzles with thousands of flamingos creating pink shorelines on the alkaline lake. The park is also a successful rhino sanctuary protecting both black and white rhinos.

This shared group safari keeps costs low while delivering premium wildlife experiences. Join fellow travelers in a comfortable 4x4 Land Cruiser with pop-up roof for optimal game viewing.`,
    image: "/offers.jpeg",
    imageAlt: "Masai Mara and Lake Nakuru 4-Day Budget Safari - Wildebeest migration and pink flamingos",
    originalPrice: 930,
    offerPrice: 750,
    duration: "4 Days / 3 Nights",
    highlights: ["2 National Parks", "Big Five Game Drives", "Flamingo Viewing", "Shared Group Safari", "All Meals Included", "4x4 Land Cruiser"],
    inclusions: [
      "Transport in 4x4 Land Cruiser with pop-up roof",
      "Professional English-speaking guide",
      "Accommodation in budget tented camps",
      "All meals (Breakfast, Lunch, Dinner)",
      "Park entry fees for both parks",
      "Bottled water during game drives",
      "Maasai Village visit",
    ],
    exclusions: [
      "Personal travel insurance",
      "Tips and gratuities",
      "Soft drinks and alcoholic beverages",
      "Visa fees",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Lake Nakuru – Afternoon Game Drive",
        description: "Depart Nairobi early morning, drive through the Great Rift Valley with a stop at the viewpoint. Arrive at Lake Nakuru for lunch, then afternoon game drive seeing flamingos, rhinos, and diverse wildlife. Dinner and overnight at Lake Nakuru camp.",
        meals: "Lunch, Dinner",
      },
      {
        day: 2,
        title: "Lake Nakuru to Masai Mara – Maasai Village Visit",
        description: "Early morning game drive at Lake Nakuru, then depart for Masai Mara. Arrive at camp for hot lunch. In the afternoon, visit a traditional Maasai village to experience local culture. Evening game drive if time permits. Dinner and overnight at Masai Mara camp.",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Full Day Game Drive in Masai Mara",
        description: "Full day exploring Masai Mara with morning and afternoon game drives. Search for Big Five, predators, and massive wildlife herds. Breakfast and lunch at camp. Optional hot air balloon safari (additional cost). Evening around campfire. Dinner and overnight.",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 4,
        title: "Morning Game Drive – Return to Nairobi",
        description: "Early morning game drive for predator activity when animals are most active. Return to camp for breakfast, then check out and drive back to Nairobi. Stop for lunch en route (own cost). Arrive Nairobi late afternoon.",
        meals: "Breakfast",
      },
    ],
    bookingUrl: "/budget-tours/offers/masai-mara-nakuru-4-days-budget-shared-safari-special",
    badge: "BEST VALUE",
    active: true,
    metaTitle: "Masai Mara & Nakuru 4-Day Safari Special Offer | $750 | JaeTravel",
    metaDescription: "Book the Masai Mara & Nakuru 4-day budget safari special at $750. Big Five, flamingos, rhinos. Save $180. All-inclusive shared group tour.",
  },
  // Add more offers here in the future
];

export function getOfferBySlug(slug: string): SpecialOffer | undefined {
  return specialOffers.find(offer => offer.slug === slug && offer.active);
}

export function getAllActiveOffers(): SpecialOffer[] {
  return specialOffers.filter(offer => offer.active);
}