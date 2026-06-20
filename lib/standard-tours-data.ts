// lib/standard-tours-data.ts

export interface Tour {
    id: string;
    slug: string;                 // For URL: /standard-tours/[slug]
    title: string;
    description: string;
    shortDescription: string;     // Max 60 words
    longDescription: string;      // Max 3000 words
    metaDescription: string;      // For SEO metadata
    keywords: string[];           // For SEO
    price: number;
    originalPrice?: number;
    image: string;
    url: string;                  // /standard-tours/[slug]
    bookingUrl: string;
    country: string;
    rating: number;
    reviewCount: number;
    duration: string;
    groupSize: string;
    departure: string;
    itinerary: {
      meals?: any;
      day: number;
      title: string;
      content: string;
    }[];
    highlights: string[];
    included: string[];
    excluded: string[];
    faqs: { question: string; answer: string }[];
  }
  
  export const standardTours: Tour[] = [
    {
      id: "s1",
      slug: "3-day-masai-mara-mid-range-safari",
      title: "3 Day Masai Mara Mid-Range Safari Kenya 2026 – Comfortable Lodge Safari from $1100",
      description: "A 3-day mid-range safari to the Masai Mara featuring comfortable lodge accommodation, private 4x4 transport, and expert guiding. See the Big Five and the Great Migration in comfort. Starting from $1100.",
      shortDescription: "3-day comfortable lodge safari in Masai Mara. Private 4x4 vehicle, mid-range accommodation, excellent game drives. Ideal for those seeking a step up from budget. From $1100.",
      longDescription: `Experience the wonders of the Masai Mara in comfort with our 3-Day Mid-Range Safari. This carefully crafted itinerary offers the perfect balance of wildlife adventure and relaxation, staying in a quality lodge or tented camp with ensuite facilities, good meals, and excellent service. Travel in a private 4x4 vehicle with a professional guide, ensuring personalized attention and flexibility to chase the best wildlife sightings.
  
  Your safari begins with a pickup from your Nairobi hotel, followed by a scenic drive through the Great Rift Valley. Arrive at your lodge in time for lunch, then head out for an afternoon game drive. The next day, enjoy a full day of game viewing with a picnic lunch, exploring the reserve's diverse habitats. On the final day, take a morning game drive before returning to Nairobi.
  
  This safari is perfect for travelers who want a comfortable yet affordable safari experience, with better accommodation than budget camping but without the luxury price tag.`,
      metaDescription: "Book a 3-day Masai Mara mid-range safari from $1100. Comfortable lodge accommodation, private 4x4, and expert guide. Great Migration and Big Five viewing.",
      keywords: ["3 day Masai Mara mid-range safari", "comfortable Masai Mara safari", "mid-range Kenya safari", "Masai Mara lodge safari", "affordable comfort safari"],
      price: 1100,
      originalPrice: 1350,
      image: "/mid-range-mara-safari.jpg",
      url: "/standard-tours/3-day-masai-mara-mid-range-safari",
      bookingUrl: "/standard-tours/3-day-masai-mara-mid-range-safari#booking-form",
      country: "Kenya",
      rating: 4.8,
      reviewCount: 62,
      duration: "3 Days / 2 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup from your Nairobi hotel at 7:00 AM. Drive through the Great Rift Valley with a stop at the viewpoint. Arrive at your lodge in time for lunch. After settling in, depart for an afternoon game drive (4:00 PM – 6:30 PM) to start your wildlife adventure. Return to the lodge for dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives in Masai Mara",
          content: "Early morning game drive (6:30 AM – 9:00 AM) to witness predators at their most active. Return to the lodge for breakfast. After breakfast, depart with packed lunch for a full day of exploration, visiting the Mara River area (seasonal) and the reserve's best game-viewing spots. Enjoy a picnic lunch in the bush. Continue game viewing in the afternoon, returning to the lodge around 5:30 PM. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning game drive (6:30 AM – 10:00 AM). Return to the lodge for breakfast and check-out. Drive back to Nairobi with lunch en route, arriving in the late afternoon. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Private 4x4 safari vehicle with pop-up roof",
        "Comfortable mid-range lodge/tented camp with ensuite facilities",
        "Three game drives totaling 10-12 hours",
        "Great Migration viewing (seasonal) and Big Five",
        "Professional English-speaking guide",
        "Picnic lunch in the reserve"
      ],
      included: [
        "Private 4x4 transport with pop-up roof",
        "Professional English-speaking guide",
        "Game drives as per itinerary",
        "2 nights mid-range lodge accommodation (full board)",
        "All meals (2 breakfasts, 3 lunches, 2 dinners)",
        "Bottled water throughout",
        "Nairobi hotel/airport transfers",
        "All park fees and government taxes"
      ],
      excluded: [
        "International flights and visas",
        "Travel insurance",
        "Tips and gratuities",
        "Optional activities (balloon safari, village visit)",
        "Alcoholic beverages",
        "Personal expenses"
      ],
      faqs: [
        { question: "What is the difference between this and a budget safari?", answer: "This safari offers a private vehicle (vs shared), better accommodation with en-suite facilities, and more flexibility. It's a step up in comfort while remaining affordable." },
        { question: "Can we see the Great Migration in 3 days?", answer: "Yes, during the migration months (July-October), you have a good chance of seeing herds and river crossings. Our guide will focus on the best areas." },
        { question: "Is the lodge wheelchair accessible?", answer: "This safari is for standard travelers. If you need accessibility, please see our accessible tours." }
      ]
    },
    {
      id: "s2",
      slug: "4-day-masai-mara-nakuru-mid-range-safari",
      title: "4 Day Masai Mara & Lake Nakuru Mid-Range Safari Kenya 2026 – Two-Park Comfort Safari from $1450",
      description: "A 4-day mid-range safari combining the Masai Mara's Big Five with Lake Nakuru's flamingos and rhinos. Private vehicle, comfortable lodges, and expert guiding. Starting from $1450.",
      shortDescription: "4-day mid-range safari covering Masai Mara and Lake Nakuru. Private 4x4, comfortable lodges, excellent game drives. Two popular parks in one trip. From $1450.",
      longDescription: `This 4-day mid-range safari offers a perfect introduction to Kenya's wildlife, visiting two of the country's most iconic parks: Masai Mara National Reserve and Lake Nakuru National Park. Travel in a private 4x4 vehicle with a dedicated guide, and stay in comfortable lodges that provide a relaxing haven after exciting game drives.
  
  Your adventure begins in Nairobi, driving to the Masai Mara with a scenic stop at the Great Rift Valley. Enjoy afternoon and full-day game drives in the Mara, searching for the Big Five and the Great Migration (seasonal). Then, travel to Lake Nakuru, famous for its flamingo-fringed shores and rhino sanctuary. Enjoy a game drive in Nakuru before returning to Nairobi.
  
  This safari is ideal for travelers who want to experience two distinct ecosystems in comfort and style, with more time for wildlife viewing than a standard 3-day safari.`,
      metaDescription: "Book a 4-day Masai Mara & Lake Nakuru mid-range safari from $1450. Private vehicle, comfortable lodges, Big Five and flamingos. Two parks, one great adventure.",
      keywords: ["4 day Masai Mara Nakuru safari", "mid-range Kenya safari", "Masai Mara and Lake Nakuru tour", "comfortable safari Kenya", "two-park safari"],
      price: 1450,
      originalPrice: 1750,
      image: "/mara-nakuru-safari.jpg",
      url: "/standard-tours/4-day-masai-mara-nakuru-mid-range-safari",
      bookingUrl: "/standard-tours/4-day-masai-mara-nakuru-mid-range-safari#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 48,
      duration: "4 Days / 3 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup at 7:00 AM. Drive via the Rift Valley to Masai Mara. Arrive at your lodge for lunch. Afternoon game drive (4:00 PM – 6:30 PM). Dinner and overnight at your lodge.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Masai Mara Game Drives",
          content: "Morning game drive, return for breakfast. Depart with packed lunch for full day of game viewing, focusing on migration and predator areas. Picnic lunch. Return to lodge for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Masai Mara to Lake Nakuru – Afternoon Game Drive",
          content: "Morning game drive, then breakfast. Drive to Lake Nakuru with lunch en route. Arrive in the afternoon for a game drive in Lake Nakuru National Park, seeing flamingos and rhinos. Dinner and overnight at your lodge.",
          meals: undefined
        },
        {
          day: 4,
          title: "Lake Nakuru Morning Game Drive and Return to Nairobi",
          content: "Morning game drive in Lake Nakuru. Return to lodge for breakfast and check-out. Drive back to Nairobi, arriving in the afternoon. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Private 4x4 vehicle with pop-up roof",
        "Comfortable mid-range lodges",
        "Game drives in Masai Mara and Lake Nakuru",
        "Big Five, flamingos, rhinos, and migration (seasonal)",
        "Professional guide",
        "Scenic Rift Valley views"
      ],
      included: [
        "Private 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "3 nights mid-range lodge accommodation (full board)",
        "All meals (3 breakfasts, 4 lunches, 3 dinners)",
        "Bottled water",
        "Park fees",
        "Nairobi transfers"
      ],
      excluded: [
        "International flights",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What wildlife can I expect at Lake Nakuru?", answer: "Lake Nakuru is famous for its flamingos (seasonal), both black and white rhinos, Rothschild's giraffes, and a variety of birdlife. It's a compact park with excellent viewing." },
        { question: "Is the accommodation en-suite?", answer: "Yes, all lodges have en-suite bathrooms with hot water, and comfortable beds." },
        { question: "Can we do a night game drive?", answer: "Night game drives are not permitted in the national parks, but you can enjoy evening activities at the lodge." }
      ]
    },
    {
      id: "s3",
      slug: "5-day-masai-mara-nakuru-amboseli-standard-safari",
      title: "5 Day Masai Mara, Nakuru & Amboseli Standard Safari Kenya 2026 – Classic Three-Park Circuit from $1850",
      description: "A 5-day standard safari covering Kenya's top three parks: Masai Mara, Lake Nakuru, and Amboseli. Private vehicle, comfortable lodges, and expert guides. Starting from $1850.",
      shortDescription: "5-day classic safari visiting Masai Mara, Lake Nakuru, and Amboseli. Private 4x4, comfortable lodges, extensive game viewing. Elephants with Kilimanjaro, flamingos, and Big Five. From $1850.",
      longDescription: `Embark on a classic Kenyan safari adventure with our 5-day standard itinerary, covering three of the country's most spectacular wildlife destinations: Masai Mara National Reserve, Lake Nakuru National Park, and Amboseli National Park. This tour is designed for travelers who want a comprehensive safari experience with the comfort of private transport and quality lodges.
  
  Your journey begins in the Masai Mara, where you'll spend two days exploring the savannah in search of the Big Five and the Great Migration (seasonal). Then, travel to Lake Nakuru for a taste of the Rift Valley's flamingos and rhinos. Finally, head to Amboseli, where you'll witness huge elephant herds against the backdrop of Mount Kilimanjaro. This itinerary offers a perfect mix of wildlife, landscapes, and photographic opportunities.
  
  With a private vehicle and guide, you'll have the flexibility to tailor your game drives to your interests, ensuring an unforgettable safari experience.`,
      metaDescription: "Book a 5-day Masai Mara, Nakuru & Amboseli standard safari from $1850. Private vehicle, comfortable lodges, three parks. See the Big Five, flamingos, and elephants with Kilimanjaro.",
      keywords: ["5 day safari Masai Mara Nakuru Amboseli", "standard Kenya safari", "three-park safari Kenya", "comfortable safari circuit", "Kilimanjaro safari"],
      price: 1850,
      originalPrice: 2200,
      image: "/three-park-safari.jpg",
      url: "/standard-tours/5-day-masai-mara-nakuru-amboseli-standard-safari",
      bookingUrl: "/standard-tours/5-day-masai-mara-nakuru-amboseli-standard-safari#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 72,
      duration: "5 Days / 4 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup at 7:00 AM. Drive via Rift Valley to Masai Mara. Arrive at lodge for lunch. Afternoon game drive. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Masai Mara Game Drives",
          content: "Morning and full day game drives with picnic lunch. Explore the Mara's best wildlife areas. Return to lodge for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Masai Mara to Lake Nakuru – Afternoon Game Drive",
          content: "Morning game drive, then drive to Lake Nakuru with lunch en route. Afternoon game drive in Nakuru, seeing flamingos and rhinos. Overnight.",
          meals: undefined
        },
        {
          day: 4,
          title: "Lake Nakuru to Amboseli – Afternoon Game Drive",
          content: "Morning game drive in Nakuru, then drive to Amboseli with lunch en route. Arrive in the afternoon for a game drive, viewing elephants with Kilimanjaro in the background. Overnight.",
          meals: undefined
        },
        {
          day: 5,
          title: "Amboseli Morning Game Drive and Return to Nairobi",
          content: "Morning game drive in Amboseli. Return to lodge for breakfast and check-out. Drive back to Nairobi, arriving in the afternoon. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Private 4x4 vehicle",
        "Comfortable lodges with en-suite facilities",
        "Game drives in three iconic parks",
        "Big Five, flamingos, rhinos, elephants, and Kilimanjaro views",
        "Professional guide",
        "Picnic lunches in the wild"
      ],
      included: [
        "Private 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "4 nights mid-range lodge accommodation (full board)",
        "All meals (4 breakfasts, 5 lunches, 4 dinners)",
        "Bottled water",
        "Park fees",
        "Nairobi transfers"
      ],
      excluded: [
        "International flights",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What is the best time for this safari?", answer: "The best time is during the dry season (June-October) for wildlife viewing, but it's excellent year-round." },
        { question: "Can we see Mount Kilimanjaro clearly?", answer: "Early mornings often offer clear views, especially from June to September." },
        { question: "How is the road between parks?", answer: "The roads are mostly tarmac with some rough sections, but our 4x4 vehicles are well-suited for the terrain." }
      ]
    },
    {
      id: "s4",
      slug: "6-day-kenya-classic-standard-safari",
      title: "6 Day Kenya Classic Standard Safari 2026 – Extended Three-Park Circuit with Lake Naivasha from $2150",
      description: "An extended 6-day standard safari covering Masai Mara, Lake Nakuru, Lake Naivasha, and Amboseli. Private vehicle, comfortable lodges, and a boat safari on Lake Naivasha. Starting from $2150.",
      shortDescription: "6-day classic safari with four destinations: Masai Mara, Lake Nakuru, Lake Naivasha (boat safari), and Amboseli. Private 4x4, comfortable lodges. From $2150.",
      longDescription: `This 6-day standard safari offers the ultimate Kenyan wildlife experience, visiting four premier destinations: Masai Mara, Lake Nakuru, Lake Naivasha, and Amboseli. With a private vehicle and guide, you'll explore diverse ecosystems, from the savannahs of the Mara to the freshwater lakes of the Rift Valley and the elephant plains of Amboseli.
  
  The itinerary includes a boat safari on Lake Naivasha, offering close encounters with hippos and birdlife, and a walking safari at Crescent Island (optional). You'll have ample time for game drives in each park, ensuring a comprehensive wildlife experience.
  
  This safari is perfect for travelers who want to see the best of Kenya in a comfortable and relaxed manner, with more time to enjoy the scenery and wildlife.`,
      metaDescription: "Book a 6-day Kenya classic standard safari from $2150. Four destinations including Lake Naivasha boat safari. Private vehicle, comfortable lodges. Ultimate wildlife experience.",
      keywords: ["6 day Kenya safari", "classic Kenya safari", "Masai Mara Nakuru Naivasha Amboseli", "standard safari Kenya", "extended safari circuit"],
      price: 2150,
      originalPrice: 2600,
      image: "/kenya-classic-safari.jpg",
      url: "/standard-tours/6-day-kenya-classic-standard-safari",
      bookingUrl: "/standard-tours/6-day-kenya-classic-standard-safari#booking-form",
      country: "Kenya",
      rating: 5.0,
      reviewCount: 84,
      duration: "6 Days / 5 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup at 7:00 AM. Drive to Masai Mara via Rift Valley. Arrive for lunch. Afternoon game drive. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Masai Mara Game Drives",
          content: "Full day of game viewing with picnic lunch. Explore the Mara River and plains. Return to lodge for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Masai Mara to Lake Nakuru – Afternoon Game Drive",
          content: "Morning game drive, then drive to Lake Nakuru with lunch. Afternoon game drive in Nakuru, seeing flamingos and rhinos. Overnight.",
          meals: undefined
        },
        {
          day: 4,
          title: "Lake Nakuru to Lake Naivasha – Boat Safari and Crescent Island",
          content: "Morning game drive in Nakuru, then drive to Naivasha. Afternoon boat safari on Lake Naivasha (included) and optional walking safari on Crescent Island. Overnight at Naivasha.",
          meals: undefined
        },
        {
          day: 5,
          title: "Lake Naivasha to Amboseli – Afternoon Game Drive",
          content: "Drive to Amboseli with lunch en route. Afternoon game drive in Amboseli, seeing elephants with Kilimanjaro backdrop. Overnight.",
          meals: undefined
        },
        {
          day: 6,
          title: "Amboseli Morning Game Drive and Return to Nairobi",
          content: "Morning game drive, breakfast, check-out, and drive back to Nairobi. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Private 4x4 vehicle",
        "Comfortable lodges",
        "Game drives in Mara, Nakuru, and Amboseli",
        "Boat safari on Lake Naivasha",
        "Optional walking safari at Crescent Island",
        "Great Migration, flamingos, rhinos, elephants, and Kilimanjaro"
      ],
      included: [
        "Private 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "Boat safari on Lake Naivasha",
        "5 nights lodge accommodation (full board)",
        "All meals",
        "Bottled water",
        "Park fees",
        "Nairobi transfers"
      ],
      excluded: [
        "International flights",
        "Insurance",
        "Tips",
        "Optional walking safari (approx. $25)",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What is Crescent Island?", answer: "Crescent Island is a private wildlife sanctuary on Lake Naivasha where you can walk among giraffes, zebras, and antelopes without predators." },
        { question: "Can we see hippos on the boat safari?", answer: "Yes, hippos are abundant in Lake Naivasha, and the boat safari offers excellent close-up views." },
        { question: "Is this safari suitable for families?", answer: "Absolutely. Children are welcome, and the lodges have family rooms and child-friendly menus." }
      ]
    },
    {
      id: "s5",
      slug: "7-day-kenya-grand-standard-safari",
      title: "7 Day Kenya Grand Standard Safari 2026 – Ultimate Kenya Wildlife Circuit from $2650",
      description: "An extensive 7-day standard safari covering Masai Mara, Lake Nakuru, Lake Naivasha, Amboseli, and Tsavo West. Private vehicle, comfortable lodges, and a boat safari. Starting from $2650.",
      shortDescription: "7-day grand safari covering five parks: Masai Mara, Lake Nakuru, Lake Naivasha, Amboseli, and Tsavo West. Private 4x4, comfortable lodges. Ultimate Kenya experience. From $2650.",
      longDescription: `Our 7-Day Kenya Grand Safari is the ultimate exploration of Kenya's diverse wildlife and landscapes. Covering five of the country's most iconic parks, this itinerary offers an unparalleled safari experience for those with a week to spare. Travel in a private 4x4 with a professional guide, and stay in comfortable lodges that provide a restful retreat after each day's adventures.
  
  The journey takes you from the rolling savannahs of the Masai Mara, through the flamingo-fringed Lake Nakuru, to the freshwater Lake Naivasha with its boat safari, then to the elephant-rich Amboseli with views of Kilimanjaro, and finally to the rugged landscapes of Tsavo West, famous for its rhinos and Mzima Springs.
  
  This tour is designed for wildlife enthusiasts who want to see the best of Kenya in a relaxed and comfortable manner, with plenty of time for game viewing and photography.`,
      metaDescription: "Book a 7-day Kenya grand standard safari from $2650. Five parks including Tsavo West. Private vehicle, comfortable lodges, ultimate wildlife circuit.",
      keywords: ["7 day Kenya grand safari", "five park safari Kenya", "Masai Mara Nakuru Naivasha Amboseli Tsavo", "standard safari Kenya", "ultimate Kenya safari"],
      price: 2650,
      originalPrice: 3200,
      image: "/grand-kenya-safari.jpg",
      url: "/standard-tours/7-day-kenya-grand-standard-safari",
      bookingUrl: "/standard-tours/7-day-kenya-grand-standard-safari#booking-form",
      country: "Kenya",
      rating: 5.0,
      reviewCount: 91,
      duration: "7 Days / 6 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup and drive to Masai Mara. Afternoon game drive. Overnight at lodge.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Masai Mara Game Drives",
          content: "Full day game viewing with picnic lunch.",
          meals: undefined
        },
        {
          day: 3,
          title: "Masai Mara to Lake Nakuru – Afternoon Game Drive",
          content: "Morning game drive, then drive to Nakuru. Afternoon game drive in Lake Nakuru.",
          meals: undefined
        },
        {
          day: 4,
          title: "Lake Nakuru to Lake Naivasha – Boat Safari",
          content: "Morning game drive in Nakuru, then drive to Naivasha. Afternoon boat safari on Lake Naivasha. Overnight.",
          meals: undefined
        },
        {
          day: 5,
          title: "Lake Naivasha to Amboseli – Afternoon Game Drive",
          content: "Drive to Amboseli with lunch en route. Afternoon game drive in Amboseli.",
          meals: undefined
        },
        {
          day: 6,
          title: "Amboseli to Tsavo West – Afternoon Game Drive",
          content: "Morning game drive in Amboseli, then drive to Tsavo West. Afternoon game drive in Tsavo West, visiting Mzima Springs.",
          meals: undefined
        },
        {
          day: 7,
          title: "Tsavo West Morning Game Drive and Return to Nairobi",
          content: "Morning game drive in Tsavo West, then drive back to Nairobi. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Private 4x4 vehicle",
        "Comfortable lodges",
        "Game drives in five parks",
        "Boat safari on Lake Naivasha",
        "Mzima Springs in Tsavo West",
        "Great Migration, flamingos, rhinos, elephants, and more"
      ],
      included: [
        "Private 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "Boat safari on Lake Naivasha",
        "6 nights lodge accommodation (full board)",
        "All meals",
        "Bottled water",
        "Park fees",
        "Nairobi transfers"
      ],
      excluded: [
        "International flights",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What is special about Tsavo West?", answer: "Tsavo West is known for its rhino sanctuary, Mzima Springs (with underwater hippo viewing), and dramatic landscapes." },
        { question: "Is this safari too rushed with five parks?", answer: "We have optimized the itinerary to balance driving and game viewing. You'll have sufficient time in each park." },
        { question: "Can we add a hot air balloon ride?", answer: "Yes, we can arrange a balloon safari in the Masai Mara at an additional cost." }
      ]
    },
    {
      id: "s6",
      slug: "8-day-kenya-and-tanzania-standard-safari",
      title: "8 Day Kenya & Tanzania Standard Safari 2026 – Cross-Border Adventure from $3350",
      description: "An 8-day cross-border safari exploring Kenya's Masai Mara and Tanzania's Serengeti and Ngorongoro Crater. Private vehicle, comfortable lodges, and a chance to see the Great Migration on both sides. Starting from $3350.",
      shortDescription: "8-day cross-border safari covering Masai Mara, Serengeti, and Ngorongoro Crater. Private 4x4, comfortable lodges. Ultimate East African safari. From $3350.",
      longDescription: `Experience the best of East Africa with our 8-day cross-border safari, visiting the world-renowned Masai Mara in Kenya, and the Serengeti and Ngorongoro Crater in Tanzania. This tour is designed for travelers who want to witness the Great Migration across two countries, see the Big Five in their natural habitats, and explore diverse landscapes ranging from savannahs to volcanic craters.
  
  Travel in a private 4x4 vehicle with a knowledgeable guide, and stay in comfortable lodges and tented camps that offer great views and warm hospitality. The itinerary includes game drives in the Masai Mara, Serengeti, and Ngorongoro Crater, with a picnic lunch in the crater.
  
  This is the ultimate East African safari for those with a sense of adventure and a desire to see the best wildlife on the continent.`,
      metaDescription: "Book an 8-day Kenya & Tanzania standard safari from $3350. Masai Mara, Serengeti, Ngorongoro Crater. Private vehicle, comfortable lodges. Cross-border wildlife adventure.",
      keywords: ["8 day Kenya Tanzania safari", "Masai Mara Serengeti safari", "Ngorongoro Crater tour", "cross-border safari East Africa", "standard safari Tanzania"],
      price: 3350,
      originalPrice: 4000,
      image: "/kenya-tanzania-safari.jpg",
      url: "/standard-tours/8-day-kenya-and-tanzania-standard-safari",
      bookingUrl: "/standard-tours/8-day-kenya-and-tanzania-standard-safari#booking-form",
      country: "Kenya/Tanzania",
      rating: 5.0,
      reviewCount: 67,
      duration: "8 Days / 7 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup and drive to Masai Mara. Afternoon game drive. Overnight at lodge.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Masai Mara Game Drives",
          content: "Full day game viewing with picnic lunch.",
          meals: undefined
        },
        {
          day: 3,
          title: "Masai Mara to Serengeti (via Isebania Border)",
          content: "Drive to the border, cross into Tanzania, and continue to Serengeti. Afternoon game drive in Serengeti. Overnight.",
          meals: undefined
        },
        {
          day: 4,
          title: "Full Day Serengeti Game Drives",
          content: "Full day exploring the Serengeti plains, searching for the Great Migration and predators.",
          meals: undefined
        },
        {
          day: 5,
          title: "Serengeti to Ngorongoro Conservation Area",
          content: "Morning game drive, then drive to Ngorongoro. Overnight at the crater rim.",
          meals: undefined
        },
        {
          day: 6,
          title: "Ngorongoro Crater Game Drive",
          content: "Descend into the crater for a full day of game viewing, including the Big Five. Picnic lunch in the crater.",
          meals: undefined
        },
        {
          day: 7,
          title: "Ngorongoro to Lake Manyara (Optional)",
          content: "Optional visit to Lake Manyara for game drive, or transfer to Arusha. Overnight.",
          meals: undefined
        },
        {
          day: 8,
          title: "Transfer to Arusha/Kilimanjaro Airport",
          content: "Breakfast, then transfer to Arusha or Kilimanjaro Airport for departure.",
          meals: undefined
        }
      ],
      highlights: [
        "Private 4x4 vehicle",
        "Comfortable lodges and tented camps",
        "Game drives in Masai Mara, Serengeti, and Ngorongoro Crater",
        "Great Migration viewing in two countries",
        "Ngorongoro Crater – the 'Eighth Wonder'",
        "Professional guides",
        "Cross-border adventure"
      ],
      included: [
        "Private 4x4 transport in Kenya and Tanzania",
        "Professional guide/driver",
        "Game drives as per itinerary",
        "7 nights accommodation (full board)",
        "All meals",
        "Bottled water",
        "Park fees and crater service fees",
        "Border transfers",
        "Nairobi pickup, Arusha/Kilimanjaro drop-off"
      ],
      excluded: [
        "International flights",
        "Insurance",
        "Tips",
        "Optional activities (balloon safari, village visits)",
        "Alcoholic drinks",
        "Personal expenses",
        "Visa fees for Kenya and Tanzania"
      ],
      faqs: [
        { question: "Do I need a visa for Tanzania?", answer: "Yes, most nationalities need a visa for Tanzania. We recommend checking with the Tanzanian embassy." },
        { question: "What is the best time for this safari?", answer: "June to October is peak for migration and dry weather. December to March is also good in the Serengeti." },
        { question: "Can I extend the safari?", answer: "Yes, we can add extra days or visits to Zanzibar or other destinations." }
      ]
    },
    {
      id: "s7",
      slug: "5-day-luxury-masai-mara-safari",
      title: "5 Day Luxury Masai Mara Safari Kenya 2026 – Premium Safari Experience from $3200",
      description: "A 5-day luxury safari to the Masai Mara with top-tier lodges, private flights, and exclusive game drives. Experience the best of the Mara in ultimate comfort. Starting from $3200.",
      shortDescription: "5-day luxury Masai Mara safari with private flights, premium lodges, and exclusive game drives. Ultimate comfort and wildlife experience. From $3200.",
      longDescription: `Indulge in the ultimate luxury safari experience with our 5-day Masai Mara luxury safari. Fly from Nairobi to the Mara in a light aircraft, saving time and enjoying aerial views. Stay in a top-tier luxury lodge or tented camp with all the amenities, including fine dining, spa treatments, and private decks overlooking the savannah.
  
  Your private guide will take you on exclusive game drives in a custom-built 4x4 vehicle, ensuring personalized attention and the flexibility to chase the best wildlife sightings. Enjoy bush dinners, sundowners, and the services of a dedicated staff.
  
  This safari is for discerning travelers who want the best of everything – wildlife, service, and accommodation – in one of Africa's most iconic destinations.`,
      metaDescription: "Book a 5-day luxury Masai Mara safari from $3200. Private flights, premium lodges, exclusive game drives. Ultimate safari experience in Kenya.",
      keywords: ["5 day luxury Masai Mara safari", "luxury Kenya safari", "fly-in safari Masai Mara", "premium safari Kenya", "exclusive Masai Mara tour"],
      price: 3200,
      originalPrice: 4000,
      image: "/luxury-mara-safari.jpg",
      url: "/standard-tours/5-day-luxury-masai-mara-safari",
      bookingUrl: "/standard-tours/5-day-luxury-masai-mara-safari#booking-form",
      country: "Kenya",
      rating: 5.0,
      reviewCount: 34,
      duration: "5 Days / 4 Nights",
      groupSize: "2-6 people (private vehicle)",
      departure: "Flexible from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Fly Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Transfer to Wilson Airport for a scheduled flight to the Mara. Arrive and transfer to your luxury lodge. Lunch, then afternoon game drive. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives – Migration Focus",
          content: "Full day of game viewing with picnic breakfast and lunch. Explore the best wildlife areas. Return to lodge for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Full Day Game Drives – Predator Action",
          content: "Another full day of game drives focusing on predators. Optional hot air balloon safari (extra cost). Bush dinner possible.",
          meals: undefined
        },
        {
          day: 4,
          title: "Full Day Game Drives – Exploration",
          content: "Explore different sectors of the Mara, perhaps visiting the Mara Triangle. Full day with picnic lunch.",
          meals: undefined
        },
        {
          day: 5,
          title: "Morning Game Drive and Fly to Nairobi",
          content: "Morning game drive, then breakfast and transfer to the airstrip for your flight back to Nairobi. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Private light aircraft flights to/from the Mara",
        "Exclusive luxury lodge with all amenities",
        "Private 4x4 vehicle with expert guide",
        "Flexible game drives, night drives (where permitted), and bush dining",
        "Hot air balloon safari option",
        "Personalized service and fine dining"
      ],
      included: [
        "Return flights Nairobi – Masai Mara (scheduled or private)",
        "Private 4x4 vehicle and guide",
        "Game drives as per itinerary",
        "4 nights luxury lodge accommodation (full board)",
        "All meals, snacks, and most drinks",
        "Park fees and conservation levies",
        "Nairobi transfers"
      ],
      excluded: [
        "International flights",
        "Insurance",
        "Tips",
        "Optional hot air balloon safari (approx. $950)",
        "Premium drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What is included in the luxury lodge?", answer: "Luxury lodges include spacious suites with ensuite bathrooms, private verandas, swimming pools, spa services, and gourmet dining." },
        { question: "Can I request a private vehicle?", answer: "Yes, the vehicle is exclusively for your group." },
        { question: "What is the best time for this luxury safari?", answer: "Year-round, but July-October offers the best migration viewing." }
      ]
    }
  ];
  
  export function getTourBySlug(slug: string): Tour | undefined {
    return standardTours.find(t => t.slug === slug);
  }