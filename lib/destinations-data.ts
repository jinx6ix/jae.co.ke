export interface Destination {
  name: string
  slug: string
  country: string
  description: string
  longDescription: string
  highlights: string[]
  bestTimeToVisit: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroImage: string
  bestFor: string[]
  popularTours: number
}

export const destinations: Destination[] = [
  {
    name: "Kenya",
    slug: "kenya",
    country: "Kenya",
    description:
      "Home to the iconic Masai Mara, stunning coastlines, and diverse wildlife, Kenya offers the quintessential African safari experience.",
    longDescription:
      "Kenya is the birthplace of the safari and remains one of Africa's premier wildlife destinations. From the Masai Mara Great Migration to Mount Kenya and the coastal beaches, Kenya offers unmatched diversity.",
    highlights: [
      "Witness the Great Migration in Masai Mara",
      "See elephants in Amboseli with Kilimanjaro backdrop",
      "Explore Lake Nakuru flamingos",
      "Relax on Diani Beach",
      "Experience Maasai culture",
      "Climb Mount Kenya",
    ],
    bestTimeToVisit:
      "July to October for the Great Migration, January to February for calving season",
    metaTitle: "Kenya Safari Tours & Travel Guide",
    metaDescription:
      "Discover Kenya safari tours including Masai Mara, Amboseli, and coastal adventures with expert guides and wildlife experiences.",
    keywords: [
      "Kenya Safari",
      "Masai Mara Tours",
      "Amboseli Safari",
      "Great Migration",
      "Kenya Travel",
      "African Safari Kenya",
      "Kenya National Parks",
      "Luxury Kenya Safari",
      "Family Safari Kenya",
      "Kenya Beach Holiday",
    ],
    heroImage: "/kenya-safari-landscape.jpg",
    bestFor: [
      "First-time safari travelers",
      "Wildlife photography enthusiasts",
      "Family safari adventures",
      "Luxury travel experiences",
      "Cultural immersion trips",
      "Beach and bush combinations",
    ],
    popularTours: 12,
  },

  {
    name: "Tanzania",
    slug: "tanzania",
    country: "Tanzania",
    description:
      "Experience the Serengeti plains, Ngorongoro Crater wildlife, and Zanzibar's tropical paradise.",
    longDescription:
      "Tanzania is home to the Serengeti migration, Ngorongoro Crater, Mount Kilimanjaro, and Zanzibar’s beaches, making it one of Africa’s top safari destinations.",
    highlights: [
      "Serengeti Great Migration",
      "Ngorongoro Crater wildlife",
      "Climb Mount Kilimanjaro",
      "Zanzibar beaches & Stone Town",
      "Tarangire elephant herds",
      "UNESCO heritage sites",
    ],
    bestTimeToVisit:
      "June to October for wildlife viewing, December to March for calving season",
    metaTitle: "Tanzania Safari Tours & Travel Guide",
    metaDescription:
      "Explore Tanzania safari tours including Serengeti, Ngorongoro Crater, Zanzibar beaches, and Kilimanjaro adventures.",
    keywords: [
      "Tanzania Safari",
      "Serengeti Tours",
      "Ngorongoro Crater",
      "Kilimanjaro Trekking",
      "Zanzibar Holiday",
      "Great Migration Tanzania",
      "Luxury Tanzania Safari",
      "Tanzania National Parks",
      "East Africa Safari",
      "Tanzania Beach Safari",
    ],
    heroImage: "/tanzania-serengeti.jpg",
    bestFor: [
      "Adventure seekers",
      "Migration safari enthusiasts",
      "Beach and safari travelers",
      "Luxury wildlife experiences",
      "Honeymoon trips",
      "Cultural explorers",
    ],
    popularTours: 15,
  },

  {
    name: "Rwanda",
    slug: "rwanda",
    country: "Rwanda",
    description:
      "The land of a thousand hills offers intimate gorilla trekking and stunning landscapes.",
    longDescription:
      "Rwanda is known for mountain gorilla trekking in Volcanoes National Park, clean cities, and strong conservation efforts.",
    highlights: [
      "Gorilla trekking in Volcanoes National Park",
      "Golden monkey tracking",
      "Nyungwe Forest canopy walk",
      "Lake Kivu relaxation",
      "Kigali cultural tours",
      "Conservation success story",
    ],
    bestTimeToVisit:
      "June to September and December to February for gorilla trekking",
    metaTitle: "Rwanda Gorilla Trekking & Safari Tours",
    metaDescription:
      "Book Rwanda gorilla trekking tours in Volcanoes National Park and explore mountain gorillas and scenic landscapes.",
    keywords: [
      "Rwanda Gorilla Trekking",
      "Volcanoes National Park",
      "Mountain Gorillas",
      "Rwanda Safari",
      "Gorilla Permits Rwanda",
      "Primate Safaris",
      "Rwanda Travel",
      "Luxury Rwanda Tours",
      "Conservation Tourism",
      "East Africa Destinations",
    ],
    heroImage: "/rwanda-mountain-gorillas.jpg",
    bestFor: [
      "Primate lovers",
      "Eco-tourism travelers",
      "Luxury adventure seekers",
      "Short safari trips",
      "Cultural tourists",
      "Conservation-focused travelers",
    ],
    popularTours: 8,
  },

  {
    name: "Uganda",
    slug: "uganda",
    country: "Uganda",
    description:
      "The Pearl of Africa offers gorilla trekking, wildlife, and adventure activities.",
    longDescription:
      "Uganda is rich in biodiversity, from Bwindi gorillas to Queen Elizabeth lions and Nile River adventures in Jinja.",
    highlights: [
      "Bwindi gorilla trekking",
      "Chimpanzee tracking in Kibale",
      "White-water rafting on Nile",
      "Tree-climbing lions",
      "Rwenzori mountain hikes",
      "Lake Bunyonyi relaxation",
    ],
    bestTimeToVisit:
      "June to September and December to February for wildlife viewing",
    metaTitle: "Uganda Safari Tours & Gorilla Trekking",
    metaDescription:
      "Explore Uganda safari tours including Bwindi gorillas, chimpanzees, and adventure activities across the Pearl of Africa.",
    keywords: [
      "Uganda Safari",
      "Bwindi Gorilla Trekking",
      "Chimpanzee Tracking",
      "Uganda Wildlife",
      "Queen Elizabeth National Park",
      "Source of the Nile",
      "Uganda National Parks",
      "Adventure Uganda",
      "Budget Safari Uganda",
      "Primate Safaris Uganda",
    ],
    heroImage: "/uganda-wildlife.jpg",
    bestFor: [
      "Adventure travelers",
      "Budget safari tourists",
      "Primate tracking lovers",
      "Off-the-beaten-path explorers",
      "Multi-activity travelers",
      "Nature enthusiasts",
    ],
    popularTours: 10,
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}