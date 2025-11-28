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
    description: "Home to the iconic Masai Mara, stunning coastlines, and diverse wildlife, Kenya offers the quintessential African safari experience.",
    longDescription: "Kenya is the birthplace of the safari and remains one of Africa's premier wildlife destinations. From the vast savannas of the Masai Mara where the Great Migration unfolds annually, to the snow-capped peaks of Mount Kenya, and the pristine beaches of the Indian Ocean coast, Kenya offers incredible diversity. The country is renowned for its conservation efforts, luxury lodges, and the warm hospitality of its people. Whether you're tracking the Big Five, witnessing millions of wildebeest crossing the Mara River, or relaxing on white-sand beaches in Diani, Kenya delivers unforgettable experiences for every type of traveler.",
    highlights: [
      "Witness the Great Migration in Masai Mara",
      "See elephants against Mount Kilimanjaro backdrop in Amboseli",
      "Explore the pink flamingos of Lake Nakuru",
      "Relax on pristine beaches in Mombasa and Diani",
      "Experience Maasai culture and traditions",
      "Climb Mount Kenya, Africa's second-highest peak",
    ],
    bestTimeToVisit: "July to October for the Great Migration, January to February for calving season",
    metaTitle: "Kenya Safari Tours & Travel Guide | JaeTravel Expeditions",
    metaDescription: "Discover Kenya safari tours including Masai Mara, Amboseli, and coastal adventures. Expert guides, luxury accommodations, and unforgettable wildlife experiences.",
    keywords: [
      "Kenya Safari",
      "Masai Mara Tours",
      "Kenya Wildlife",
      "Amboseli Safari",
      "Kenya Travel",
      "Great Migration",
      "Kenya Beach Holiday",
      "East Africa Destinations",
      "Kenya Tanzania Rwanda Uganda Tours",
      "African Safari Kenya",
      "Masai Mara Kenya",
      "Kenya National Parks",
      "Luxury Kenya Safari",
      "Family Safari Kenya",
      "Kenya Cultural Tours",
    ],
    heroImage: "/kenya-safari-landscape.jpg",
    bestFor: [
      "First-time safari travelers",
      "Wildlife photography enthusiasts",
      "Family safari adventures",
      "Luxury travel experiences",
      "Cultural immersion trips",
      "Beach and bush combinations"
    ],
    popularTours: 12
  },
  {
    name: "Tanzania",
    slug: "tanzania",
    country: "Tanzania",
    description: "Experience the Serengeti's endless plains, Ngorongoro Crater's wildlife paradise, and the exotic spice island of Zanzibar.",
    longDescription: "Tanzania is home to some of Africa's most spectacular natural wonders. The Serengeti National Park hosts the world's largest terrestrial mammal migration, while the Ngorongoro Crater offers one of the highest concentrations of wildlife on the continent. Mount Kilimanjaro, Africa's highest peak, attracts climbers from around the world. Beyond the mainland, the Zanzibar archipelago offers pristine beaches, historic Stone Town, and a unique blend of African, Arab, and Indian cultures. Tanzania's commitment to conservation has created vast protected areas where wildlife thrives, making it an essential destination for any serious safari enthusiast.",
    highlights: [
      "Experience the Serengeti's Great Migration",
      "Explore the Ngorongoro Crater wildlife haven",
      "Climb Mount Kilimanjaro, Africa's highest peak",
      "Discover Zanzibar's spice plantations and beaches",
      "Visit Tarangire's elephant herds",
      "Explore Stone Town's UNESCO World Heritage site",
    ],
    bestTimeToVisit: "June to October for wildlife viewing, December to March for calving season",
    metaTitle: "Tanzania Safari Tours & Travel Guide | JaeTravel Expeditions",
    metaDescription: "Explore Tanzania safari tours including Serengeti, Ngorongoro Crater, and Zanzibar. Witness the Great Migration and climb Kilimanjaro with expert guides.",
    keywords: [
      "Tanzania Safari",
      "Serengeti Tours",
      "Ngorongoro Crater",
      "Kilimanjaro Climbing",
      "Zanzibar Holiday",
      "Tanzania Wildlife",
      "East Africa Destinations",
      "Serengeti Tanzania",
      "Tanzania Northern Circuit",
      "Luxury Tanzania Safari",
      "Tanzania Beach Safari",
      "Great Migration Tanzania",
      "Tanzania Family Safari",
      "Kilimanjaro Trekking Packages",
    ],
    heroImage: "/tanzania-serengeti.jpg",
    bestFor: [
      "Adventure seekers and climbers",
      "Migration safari enthusiasts",
      "Beach and safari combinations",
      "Luxury wildlife experiences",
      "Cultural and historical tours",
      "Honeymoon and romantic getaways"
    ],
    popularTours: 15
  },
  {
    name: "Rwanda",
    slug: "rwanda",
    country: "Rwanda",
    description: "The land of a thousand hills offers intimate gorilla encounters, stunning landscapes, and a remarkable conservation success story.",
    longDescription: "Rwanda has emerged as one of Africa's most inspiring destinations, combining world-class gorilla trekking with remarkable conservation achievements and warm hospitality. Volcanoes National Park is home to endangered mountain gorillas, offering one of the world's most profound wildlife experiences. The country's commitment to sustainability and cleanliness has earned it recognition as one of Africa's cleanest nations. Beyond gorillas, Rwanda offers beautiful landscapes, from the misty mountains of the north to the serene waters of Lake Kivu. The capital, Kigali, is a modern, safe city that serves as a testament to the country's remarkable recovery and progress.",
    highlights: [
      "Trek mountain gorillas in Volcanoes National Park",
      "Track golden monkeys in bamboo forests",
      "Explore Nyungwe Forest's canopy walkway",
      "Relax by the shores of Lake Kivu",
      "Visit Kigali's genocide memorial and museums",
      "Experience Rwanda's conservation success story",
    ],
    bestTimeToVisit: "June to September and December to February for gorilla trekking",
    metaTitle: "Rwanda Gorilla Trekking & Safari Tours | JaeTravel Expeditions",
    metaDescription: "Book Rwanda gorilla trekking tours in Volcanoes National Park. Experience mountain gorillas, golden monkeys, and Rwanda's stunning landscapes.",
    keywords: [
      "Rwanda Gorilla Trekking",
      "Volcanoes National Park",
      "Rwanda Safari",
      "Mountain Gorillas",
      "Rwanda Travel",
      "Golden Monkey Tracking",
      "East Africa Destinations",
      "Rwanda Gorillas",
      "Primate Safaris Rwanda",
      "Luxury Rwanda Tours",
      "Rwanda Cultural Tours",
      "Gorilla Permits Rwanda",
      "Rwanda Adventure Travel",
      "Conservation Tourism Rwanda",
    ],
    heroImage: "/rwanda-mountain-gorillas.jpg",
    bestFor: [
      "Primate and wildlife enthusiasts",
      "Conservation-focused travelers",
      "Luxury eco-tourism",
      "Cultural and historical tours",
      "Adventure trekking",
      "Short break safari trips"
    ],
    popularTours: 8
  },
  {
    name: "Uganda",
    slug: "uganda",
    country: "Uganda",
    description: "The Pearl of Africa combines gorilla trekking, diverse wildlife, adventure activities, and the source of the Nile River.",
    longDescription: "Uganda truly lives up to Winston Churchill's description as the 'Pearl of Africa.' This compact country offers incredible biodiversity, from mountain gorillas in Bwindi Impenetrable Forest to tree-climbing lions in Queen Elizabeth National Park. The Rwenzori Mountains, known as the 'Mountains of the Moon,' offer challenging treks through otherworldly landscapes. Jinja, the adventure capital, sits at the source of the Nile River and offers world-class white-water rafting. Uganda's national parks are less crowded than those in neighboring countries, providing more intimate wildlife encounters. The country's friendly people, affordable prices, and diverse attractions make it an excellent safari destination.",
    highlights: [
      "Trek mountain gorillas in Bwindi Impenetrable Forest",
      "Track chimpanzees in Kibale National Park",
      "Experience white-water rafting at the source of the Nile",
      "See tree-climbing lions in Queen Elizabeth National Park",
      "Hike the Rwenzori Mountains",
      "Relax at Lake Bunyonyi, Africa's deepest lake",
    ],
    bestTimeToVisit: "June to September and December to February for gorilla trekking and wildlife viewing",
    metaTitle: "Uganda Safari Tours & Gorilla Trekking | JaeTravel Expeditions",
    metaDescription: "Discover Uganda safari tours including Bwindi gorilla trekking, chimpanzee tracking, and adventure activities. Experience the Pearl of Africa.",
    keywords: [
      "Uganda Safari",
      "Bwindi Gorilla Trekking",
      "Uganda Wildlife",
      "Chimpanzee Tracking",
      "Uganda Travel",
      "Queen Elizabeth National Park",
      "East Africa Destinations",
      "Uganda Gorilla Tours",
      "Adventure Travel Uganda",
      "Budget Uganda Safari",
      "Uganda National Parks",
      "Source of the Nile",
      "Uganda Primate Safaris",
      "Family Safari Uganda",
    ],
    heroImage: "/uganda-wildlife.jpg",
    bestFor: [
      "Adventure and activity travelers",
      "Budget-conscious safari goers",
      "Primate tracking enthusiasts",
      "Multi-activity vacations",
      "Off-the-beaten-path experiences",
      "Combination safari and adventure trips"
    ],
    popularTours: 10
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}