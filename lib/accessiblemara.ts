// lib/accessiblemara.ts

export interface Tour {
    id: string;
    slug: string;                 // For URL: /accessible-migration/[slug]
    title: string;
    description: string;
    shortDescription: string;     // Max 60 words
    longDescription: string;      // Max 3000 words
    metaDescription: string;      // For SEO metadata
    keywords: string[];           // For SEO
    price: number;
    originalPrice?: number;
    image: string;
    imageAlt?: string;
    videoId?: string;
    url: string;                  // /accessible-migration/[slug]
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
    accessibility?: {
      vehicle: string;
      accommodation: string;
      terrain?: string;
      other?: string;
    };
    gallery?: string[];
  }
  
  export const accessibleTours: Tour[] = [
    {
      id: "a1",
      slug: "2-day-accessible-masai-mara-migration-safari",
      title: "2 Day Accessible Maasai Mara Migration Safari Kenya 2026 – Wheelchair Friendly Short Safari from $850",
      description: "A compact yet thrilling 2-day accessible safari to witness the Great Migration in Maasai Mara. Wheelchair-friendly vehicles, accessible camps, and expert guides ensure a comfortable wildlife experience for travelers with mobility challenges. Starting from $850.",
      shortDescription: "Short 2-day accessible migration safari with wheelchair-friendly vehicles and camps. See the Big Five and river crossings. Ideal for travelers with limited time and mobility needs. From $850.",
      longDescription: `Experience the magic of the Great Wildebeest Migration on our specially designed 2-Day Accessible Maasai Mara Migration Safari. This compact tour is perfect for travelers with mobility challenges who want to witness one of nature's greatest spectacles without compromising on comfort or accessibility. From the moment you are picked up in Nairobi, our wheelchair-accessible vehicles and trained staff ensure a seamless and enjoyable safari experience.
  
  Your adventure begins with a scenic drive through the Great Rift Valley, with a stop at the viewpoint for breathtaking photos. Our accessible 4x4 vehicles are equipped with ramps or lifts, spacious interiors, and pop-up roofs for optimal game viewing from a seated position. Upon arrival at our specially selected accessible camp, you'll be welcomed by staff trained in disability awareness. The camp features wheelchair-friendly tents with roll-in showers, grab rails, and wide doorways.
  
  In the afternoon, embark on your first game drive in search of the Big Five and the migrating herds. Your guide is experienced in assisting guests with mobility needs and will position the vehicle for the best possible views. The following morning, enjoy an early game drive to catch predators at their most active before returning to Nairobi. Despite its short duration, this safari packs in unforgettable wildlife encounters, including potential river crossings (seasonal) and close-up sightings of elephants, lions, and more.
  
  This 2-day accessible migration safari is ideal for those with limited time, mobility concerns, or as an add-on to other Kenya travel. All logistics are handled with your comfort and safety in mind.`,
      metaDescription: "Book a 2-day accessible Masai Mara migration safari from $850. Wheelchair-friendly vehicles and camps. Witness the Great Wildebeest Migration with expert assistance.",
      keywords: ["2 day accessible safari Masai Mara", "wheelchair friendly migration safari", "short accessible safari Kenya", "disabled travel Maasai Mara", "accessible migration tour 2 days", "Great Migration wheelchair safari"],
      price: 850,
      originalPrice: 1000,
      image: "/accessible-mara-safari-2day.jpg",
      imageAlt: "Wheelchair accessible safari vehicle at Masai Mara National Park, Kenya",
      videoId: "YOUR_VIDEO_ID_1",
      url: "/accessible-migration/2-day-accessible-masai-mara-migration-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/2-day-accessible-masai-mara-migration-safari#booking-form",
      country: "Kenya",
      rating: 4.7,
      reviewCount: 38,
      duration: "2 Days / 1 Night",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup from your Nairobi hotel or airport in our accessible 4x4 vehicle. Enjoy a scenic drive through the Great Rift Valley with a photo stop. Arrive at our accessible camp for lunch and check-in. After a brief rest, depart for an afternoon game drive in Masai Mara, focusing on migration hotspots and predator areas. Return to camp at dusk for dinner and overnight stay.",
          meals: undefined
        },
        {
          day: 2,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Early morning game drive (6:30 AM – 10:00 AM) to witness predators and early morning wildlife activity. Return to camp for breakfast and check-out. Drive back to Nairobi with a lunch stop en route, arriving in the late afternoon. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Wheelchair-accessible 4x4 vehicle with ramp/lift",
        "Accessible camp with roll-in showers and grab rails",
        "Two game drives totaling 6-8 hours of wildlife viewing",
        "Expert guide trained in disability assistance",
        "Great Migration viewing opportunities (seasonal)",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport with ramp/lift",
        "Professional English-speaking guide",
        "Game drives as per itinerary",
        "1 night accessible camp accommodation (full board)",
        "All meals (1 breakfast, 2 lunches, 1 dinner)",
        "Bottled water throughout",
        "Nairobi hotel/airport transfers",
        "Park fees for Masai Mara"
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
        { question: "Is the vehicle truly wheelchair accessible?", answer: "Yes, our vehicles have either a ramp or a hydraulic lift, and can accommodate a standard wheelchair. The interior is spacious, and the pop-up roof allows for easy viewing from a seated position." },
        { question: "What is the maximum group size?", answer: "We keep groups small (2-6 people) to ensure personalized attention and comfort. If you need a private vehicle, we can arrange that at an additional cost." },
        { question: "Can I see the river crossing in 2 days?", answer: "River crossings are seasonal (usually July-October). While we can't guarantee crossings, we'll take you to the best spots and increase your chances with timing and guide knowledge." }
      ],
      accessibility: {
        vehicle: "Custom-built 4x4 Land Cruiser with hydraulic lift (capacity 300kg) and manual ramp backup; pop-up roof; swivel front seat for easy transfer; wheelchair tie-down points (4-point system); spacious interior allowing a wheelchair user to sit comfortably beside the driver or in the rear.",
        accommodation: "Tented camp with hard-packed gravel pathways (firm and level); roll-in shower with shower chair and handheld showerhead; grab rails around toilet and shower; wide doorways (80cm); low-threshold access to tents; raised beds (45cm) with transfer space on both sides.",
        terrain: "Camp terrain is mostly flat with compacted earth and gravel; pathways are well-maintained and free of obstacles; the dining and common areas are under cover with level access. Game drives operate on established tracks that are passable in dry conditions."
      }
    },
    {
      id: "a2",
      slug: "3-day-accessible-masai-mara-migration-safari",
      title: "3 Day Accessible Maasai Mara Migration Safari Kenya 2026 – Wheelchair Friendly Migration Experience from $1050",
      description: "An immersive 3-day accessible safari to witness the Great Migration in Maasai Mara. Wheelchair-friendly vehicles, accessible camps, and expert guides ensure a comfortable and memorable experience for travelers with mobility challenges. Starting from $1050.",
      shortDescription: "3-day accessible migration safari with wheelchair-friendly vehicles and camps. More game drives for deeper wildlife encounters. Great for those wanting a balanced safari experience. From $1050.",
      longDescription: `Our 3-Day Accessible Maasai Mara Migration Safari offers an in-depth experience of the Great Wildebeest Migration while ensuring all aspects are wheelchair and mobility friendly. With two full days in the reserve, you'll have ample opportunity to explore different sectors of the Mara, increasing your chances of witnessing dramatic river crossings, predator hunts, and the vast herds that make this event world-famous.
  
  This safari is designed with your comfort and accessibility in mind. Our fleet of accessible 4x4 vehicles features ramps or lifts, wide doors, and ample space for wheelchairs. The pop-up roofs allow for unobstructed viewing from a seated position. Our guides are specially trained to assist guests with varying needs, providing both expert wildlife knowledge and practical support.
  
  Accommodation is in an accessible tented camp with wheelchair-friendly facilities: roll-in showers, shower chairs, grab rails, and wide doorways. The camp's pathways are smooth and firm, and staff are on hand to assist with any additional requirements.
  
  The itinerary includes an afternoon game drive on day one, a full day of exploration on day two (with picnic lunch in the reserve), and a final morning drive on day three. This extended time allows for a more relaxed pace, with breaks as needed, and maximizes your chances of witnessing the migration's highlights. Whether you're a first-time visitor or a seasoned traveler, this accessible safari delivers unforgettable African wildlife experiences.`,
      metaDescription: "Book a 3-day accessible Masai Mara migration safari from $1050. Wheelchair-friendly vehicles and camps. Witness the Great Migration with expert assistance and more game drives.",
      keywords: ["3 day accessible safari Masai Mara", "wheelchair friendly migration safari 3 days", "accessible Great Migration tour", "disabled travel Kenya safari", "Mara river crossing accessible"],
      price: 1050,
      originalPrice: 1250,
      image: "/accessible-mara-safari-3day.jpg",
      imageAlt: "Wheelchair accessible Masai Mara safari with guide, Kenya",
      videoId: "YOUR_VIDEO_ID_2",
      url: "/accessible-migration/3-day-accessible-masai-mara-migration-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/3-day-accessible-masai-mara-migration-safari#booking-form",
      country: "Kenya",
      rating: 4.8,
      reviewCount: 52,
      duration: "3 Days / 2 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup from your Nairobi hotel or airport in an accessible 4x4. Drive through the Great Rift Valley with a photo stop. Arrive at the accessible camp for lunch and check-in. Afternoon game drive (4:00 PM – 6:30 PM) to start your wildlife adventure. Dinner and overnight at the camp.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives in Masai Mara",
          content: "Early morning game drive (6:30 AM – 9:00 AM), return for breakfast. After breakfast, depart with packed lunch for a full day of exploration. Visit the Mara River area (seasonal) for potential crossings. Picnic lunch in the reserve. Continue game viewing in the afternoon, returning to camp around 5:30 PM. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning game drive (6:30 AM – 10:00 AM) to catch any missed highlights. Return to camp for breakfast and check-out. Drive back to Nairobi with lunch en route, arriving in the late afternoon. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Wheelchair-accessible 4x4 with ramp/lift",
        "Accessible camp with roll-in showers and grab rails",
        "Three game drives totaling 10-12 hours",
        "Full day in the reserve for maximum wildlife viewing",
        "Expert guide trained in disability assistance",
        "Great Migration and river crossing opportunities",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport with ramp/lift",
        "Professional English-speaking guide",
        "Game drives as per itinerary",
        "2 nights accessible camp accommodation (full board)",
        "All meals (2 breakfasts, 3 lunches, 2 dinners)",
        "Bottled water throughout",
        "Nairobi hotel/airport transfers",
        "Park fees for Masai Mara"
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
        { question: "Is the camp completely wheelchair accessible?", answer: "Yes, our selected camp has level pathways, roll-in showers with shower chairs, grab rails, and wide doorways. The dining and common areas are also accessible." },
        { question: "What if I need extra assistance during game drives?", answer: "Your guide is trained to assist with transfers and positioning. We can also provide an extra staff member if needed – please request in advance." },
        { question: "What is the best time for this safari?", answer: "The Great Migration is typically in the Mara from July to October. However, wildlife viewing is excellent year-round, and we operate daily." }
      ],
      accessibility: {
        vehicle: "Toyota Land Cruiser 4x4 with a powered hydraulic lift (capacity 350kg) and a manual ramp for backup; pop-up roof with extra headroom; removable center console for wheelchair parking; 4-point tie-down straps; air-conditioned cabin; step-less entry.",
        accommodation: "Semi-permanent tented camp on a raised wooden deck with ramp access; roll-in shower with fold-down seat; grab rails in bathroom; wide doorways (85cm); low-profile bed (45cm) with space underneath for hoist; firm, non-slip flooring.",
        terrain: "Camp is situated on flat, grassy terrain with compacted pathways connecting all facilities; main areas are under canvas with level thresholds; game drive tracks are well-graded and accessible in a 4x4."
      }
    },
    {
      id: "a3",
      slug: "4-day-accessible-masai-mara-migration-safari",
      title: "4 Day Accessible Maasai Mara Migration Safari Kenya 2026 – Extended Migration Experience from $1250",
      description: "An extended 4-day accessible safari to witness the Great Migration in Maasai Mara. Wheelchair-friendly vehicles, accessible camps, and expert guides ensure a comfortable and immersive experience. Starting from $1250.",
      shortDescription: "4-day accessible migration safari with wheelchair-friendly vehicles and camps. More time for game drives, deeper exploration, and increased chances of witnessing river crossings. From $1250.",
      longDescription: `Our 4-Day Accessible Maasai Mara Migration Safari offers the perfect balance between duration and depth, providing ample time to witness the Great Wildebeest Migration while ensuring all facilities are fully accessible. With three full days in the reserve, you'll have the opportunity to explore different areas of the Mara, follow the migrating herds, and increase your chances of witnessing dramatic river crossings and predator-prey interactions.
  
  This safari is meticulously designed for travelers with mobility challenges. Our accessible 4x4 vehicles are equipped with ramps or hydraulic lifts, providing easy entry and exit. The vehicles have spacious interiors that can accommodate wheelchairs, and the pop-up roofs ensure excellent viewing from a seated position. Our guides are experienced in assisting guests with various disabilities, ensuring a safe and enjoyable experience.
  
  Accommodation is at an accessible tented camp with roll-in showers, shower chairs, grab rails, and wide doorways. The camp's pathways are level and firm, and staff are trained to provide any additional assistance you may need. The extended duration allows for a more relaxed pace, with the option to return to camp for rests if needed.
  
  The itinerary includes an afternoon game drive on day one, two full days of exploration (with picnic lunches in the reserve), and a final morning drive. This extended time maximizes your wildlife viewing and provides a deeper understanding of the Mara's ecosystem. Whether you're a wildlife enthusiast or a first-time visitor, this accessible safari delivers an unforgettable experience.`,
      metaDescription: "Book a 4-day accessible Masai Mara migration safari from $1250. Wheelchair-friendly vehicles and camps. Extended game drives for the ultimate migration experience.",
      keywords: ["4 day accessible safari Masai Mara", "wheelchair friendly migration safari 4 days", "extended accessible Great Migration tour", "disabled travel Kenya safari", "Mara river crossing accessible"],
      price: 1250,
      originalPrice: 1500,
      image: "/accessible-mara-safari-4day.jpg",
      imageAlt: "Wheelchair accessible Masai Mara safari 4 day tour, Kenya",
      videoId: "YOUR_VIDEO_ID_3",
      url: "/accessible-migration/4-day-accessible-masai-mara-migration-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/4-day-accessible-masai-mara-migration-safari#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 44,
      duration: "4 Days / 3 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup from Nairobi in an accessible 4x4. Drive through the Great Rift Valley with photo stop. Arrive at accessible camp for lunch and check-in. Afternoon game drive (4:00 PM – 6:30 PM). Dinner and overnight at the camp.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives in Masai Mara",
          content: "Early morning game drive (6:30 AM – 9:00 AM), return for breakfast. Depart with packed lunch for a full day of game viewing. Visit key migration areas and the Mara River. Picnic lunch in the reserve. Continue afternoon exploration, returning to camp around 5:30 PM. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 3,
          title: "Another Full Day of Game Drives",
          content: "Repeat the full-day experience, exploring different sectors of the Mara. Your guide will adapt based on wildlife movements and your interests. Picnic lunch in the reserve. Return to camp for dinner and overnight.",
          meals: undefined
        },
        {
          day: 4,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning game drive (6:30 AM – 10:00 AM). Return to camp for breakfast and check-out. Drive back to Nairobi with lunch en route, arriving in the late afternoon. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Wheelchair-accessible 4x4 with ramp/lift",
        "Accessible camp with roll-in showers and grab rails",
        "Four game drives totaling 14-16 hours",
        "Two full days in the reserve for extensive wildlife viewing",
        "Expert guide trained in disability assistance",
        "Great Migration and river crossing opportunities",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport with ramp/lift",
        "Professional English-speaking guide",
        "Game drives as per itinerary",
        "3 nights accessible camp accommodation (full board)",
        "All meals (3 breakfasts, 4 lunches, 3 dinners)",
        "Bottled water throughout",
        "Nairobi hotel/airport transfers",
        "Park fees for Masai Mara"
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
        { question: "Is this safari suitable for someone with limited mobility?", answer: "Absolutely. We cater to various mobility levels, including wheelchair users, those with walkers, and seniors. Please inform us of your specific needs during booking so we can tailor the experience." },
        { question: "What is the group size?", answer: "We limit groups to 6 people to ensure comfort and personalized service. If you need a private vehicle, we can arrange that at an additional cost." },
        { question: "Can we see the migration in April?", answer: "The Great Migration is typically in the Mara from July to October. However, the Mara has resident wildlife year-round, so you'll still have excellent game viewing." }
      ],
      accessibility: {
        vehicle: "Custom-built 4x4 Safari Cruiser with a rear hydraulic lift (capacity 320kg) and a fold-out ramp; interior configured with a removable seat to accommodate a wheelchair; pop-up roof with side rails for support; climate control; 12V charging ports.",
        accommodation: "Luxury tented camp on a concrete foundation with ramped access; accessible bathroom with roll-in shower, shower chair, and adjustable-height handrail; toilet with raised seat and support arms; bed height 50cm with transfer space on both sides; all pathways paved.",
        terrain: "Camp on flat ground with paved walkways between tents and common areas; main lounge and dining area have level access; game drive routes include gentle slopes and river crossings are viewed from elevated, accessible vantage points."
      }
    },
    {
      id: "a4",
      slug: "5-day-accessible-masai-mara-migration-safari",
      title: "5 Day Accessible Maasai Mara Migration Safari Kenya 2026 – Comprehensive Migration Experience from $1450",
      description: "A comprehensive 5-day accessible safari to witness the Great Migration in Maasai Mara. Wheelchair-friendly vehicles, accessible camps, and expert guides ensure a comfortable and immersive experience. Starting from $1450.",
      shortDescription: "5-day accessible migration safari with wheelchair-friendly vehicles and camps. Extensive game drives, deeper exploration, and maximum chances of witnessing river crossings. Ideal for serious wildlife enthusiasts. From $1450.",
      longDescription: `Our 5-Day Accessible Maasai Mara Migration Safari is designed for those who want to fully immerse themselves in the Great Wildebeest Migration while enjoying top-notch accessibility. With four full days in the reserve, you'll have the best possible chance to witness river crossings, predator hunts, and the vast herds that make this event one of the world's greatest wildlife spectacles.
  
  This safari is crafted for travelers with mobility challenges, offering accessible vehicles, camps, and expert assistance throughout. Our 4x4 vehicles are equipped with ramps or lifts, wide doors, and spacious interiors to accommodate wheelchairs. The pop-up roofs provide excellent viewing from a seated position. Our guides are specially trained to assist with transfers, positioning, and any additional needs.
  
  Accommodation is at an accessible tented camp with roll-in showers, shower chairs, grab rails, and wide doorways. The camp's level pathways and attentive staff ensure you can move around with ease. The extended duration allows for a relaxed pace, with the option to rest between game drives if needed.
  
  The itinerary includes an afternoon game drive on day one, three full days of exploration (with picnic lunches), and a final morning drive. This extended time allows you to explore different areas of the Mara, follow the migration, and enjoy the reserve's diverse wildlife. Whether you're a photographer, a wildlife lover, or simply seeking an unforgettable adventure, this accessible safari delivers an exceptional experience.`,
      metaDescription: "Book a 5-day accessible Masai Mara migration safari from $1450. Wheelchair-friendly vehicles and camps. Comprehensive game drives for the ultimate migration experience.",
      keywords: ["5 day accessible safari Masai Mara", "wheelchair friendly migration safari 5 days", "comprehensive accessible Great Migration tour", "disabled travel Kenya safari", "Mara river crossing accessible"],
      price: 1450,
      originalPrice: 1750,
      image: "/accessible-mara-safari-5day.jpg",
      imageAlt: "Wheelchair accessible Masai Mara safari 5 day tour, Kenya",
      videoId: "YOUR_VIDEO_ID_4",
      url: "/accessible-migration/5-day-accessible-masai-mara-migration-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/5-day-accessible-masai-mara-migration-safari#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 56,
      duration: "5 Days / 4 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup from Nairobi in an accessible 4x4. Drive through the Great Rift Valley with photo stop. Arrive at accessible camp for lunch and check-in. Afternoon game drive (4:00 PM – 6:30 PM). Dinner and overnight at the camp.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives in Masai Mara",
          content: "Early morning game drive (6:30 AM – 9:00 AM), return for breakfast. Depart with packed lunch for a full day of game viewing. Visit key migration areas and the Mara River. Picnic lunch in the reserve. Continue afternoon exploration, returning to camp around 5:30 PM. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 3,
          title: "Another Full Day of Game Drives",
          content: "Repeat the full-day experience, exploring different sectors of the Mara. Your guide will adapt based on wildlife movements and your interests. Picnic lunch in the reserve. Return to camp for dinner and overnight.",
          meals: undefined
        },
        {
          day: 4,
          title: "Third Full Day of Game Drives",
          content: "Another full day of exploration, focusing on areas you haven't visited yet or revisiting hotspots for better sightings. Picnic lunch in the reserve. Return to camp for dinner and overnight.",
          meals: undefined
        },
        {
          day: 5,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning game drive (6:30 AM – 10:00 AM). Return to camp for breakfast and check-out. Drive back to Nairobi with lunch en route, arriving in the late afternoon. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Wheelchair-accessible 4x4 with ramp/lift",
        "Accessible camp with roll-in showers and grab rails",
        "Five game drives totaling 18-20 hours",
        "Three full days in the reserve for extensive wildlife viewing",
        "Expert guide trained in disability assistance",
        "Great Migration and river crossing opportunities",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport with ramp/lift",
        "Professional English-speaking guide",
        "Game drives as per itinerary",
        "4 nights accessible camp accommodation (full board)",
        "All meals (4 breakfasts, 5 lunches, 4 dinners)",
        "Bottled water throughout",
        "Nairobi hotel/airport transfers",
        "Park fees for Masai Mara"
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
        { question: "How does this safari differ from the 4-day version?", answer: "The 5-day safari offers an additional full day of game drives, allowing for even more thorough exploration and higher chances of witnessing specific events like river crossings. It also provides a more relaxed pace." },
        { question: "Is there a lot of driving each day?", answer: "Game drives are spread throughout the day with breaks. You can also return to camp for rest if needed. The pace is flexible." },
        { question: "Can I combine this safari with a beach holiday?", answer: "Yes, we can arrange extensions to the Kenyan coast. Please inquire for a customized itinerary." }
      ],
      accessibility: {
        vehicle: "Land Cruiser 4x4 with a hydraulic tailgate lift (capacity 350kg) and a fold-out ramp; fully removable rear seats to secure a wheelchair in the center; pop-up roof with grab handles; 360-degree swivel seat for the guide to assist with transfers; USB charging ports.",
        accommodation: "Safari lodge with dedicated accessible rooms; roll-in shower with a built-in bench; grab rails in shower and toilet; wide doorways (90cm); bed with adjustable height (electric) upon request; smooth, non-slip floors; all common areas are step-free.",
        terrain: "Lodge situated on a gentle slope with paved pathways connecting rooms, restaurant, and pool area (pool has a hoist); game drive tracks are mostly hard-packed and well-maintained, with some sandy sections."
      }
    },
    {
      id: "a5",
      slug: "7-day-luxury-accessible-migration-safari",
      title: "7 Day Luxury Accessible Migration Safari Kenya 2026 – Premium Accessible Safari Experience from $3500",
      description: "An exclusive 7-day luxury accessible safari to witness the Great Migration in Masai Mara. Wheelchair-friendly luxury vehicles, accessible high-end camps, and personalized service. Starting from $3500.",
      shortDescription: "Luxury 7-day accessible migration safari with premium vehicles and camps. Extensive game drives, gourmet meals, and exceptional service. Ideal for discerning travelers with mobility needs. From $3500.",
      longDescription: `Indulge in the ultimate accessible safari with our 7-Day Luxury Accessible Migration Safari. This premium experience combines the thrill of the Great Wildebeest Migration with the highest standards of comfort, service, and accessibility. From the moment you arrive, you'll be treated to world-class amenities and personalized assistance, ensuring a stress-free and unforgettable adventure.
  
  Our luxury accessible vehicles are custom-built with spacious interiors, hydraulic lifts, and comfortable seating. They are equipped with high-end camera mounts and charging ports. The pop-up roofs provide panoramic views, and our guides are among the best in the industry, with extensive knowledge of the Mara and a commitment to guest satisfaction.
  
  Accommodation is in exclusive accessible tented camps or lodges that offer roll-in showers, adjustable beds, and 24/7 assistance. The camps are nestled in prime wildlife areas, often with private decks overlooking the savannah. Gourmet meals, fine wines, and attentive service are part of the package.
  
  The itinerary includes six full days in the reserve, with flexible game drives, night drives (optional), and bush dinners. You'll have ample time to witness river crossings, predator action, and the vast herds of the migration. This safari is perfect for those who want a luxury experience without compromising on accessibility.`,
      metaDescription: "Book a 7-day luxury accessible migration safari from $3500. Premium wheelchair-friendly vehicles and camps. Exceptional service and extensive game drives in Masai Mara.",
      keywords: ["luxury accessible safari Masai Mara", "7 day accessible migration safari", "wheelchair friendly luxury safari", "premium accessible Great Migration tour", "disabled travel luxury Kenya"],
      price: 3500,
      originalPrice: 4200,
      image: "/luxury-accessible-mara-safari.jpg",
      imageAlt: "Luxury wheelchair accessible Masai Mara safari 7 day tour, Kenya",
      videoId: "YOUR_VIDEO_ID_5",
      url: "/accessible-migration/7-day-luxury-accessible-migration-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/7-day-luxury-accessible-migration-safari#booking-form",
      country: "Kenya",
      rating: 5.0,
      reviewCount: 28,
      duration: "7 Days / 6 Nights",
      groupSize: "2-4 people (private vehicle)",
      departure: "Flexible from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Arrival Nairobi – Transfer to Masai Mara",
          content: "Private pickup from Nairobi airport. Transfer to Masai Mara via light aircraft (included) or luxury road transfer. Arrive at your accessible luxury camp, settle in, and enjoy a sunset game drive. Welcome dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives – Migration Focus",
          content: "Morning and afternoon game drives, focusing on migration hotspots. Your guide will track the herds and position you for the best views. Return to camp for lunch and rest, then evening drive. Gourmet dinner and overnight.",
          meals: undefined
        },
        {
          day: 3,
          title: "Full Day Game Drives – River Crossing",
          content: "Devote the day to the Mara River area, where crossings occur. With packed gourmet lunch, spend the day observing the dramatic river crossings. Return to camp for sundowners and dinner.",
          meals: undefined
        },
        {
          day: 4,
          title: "Full Day Game Drives – Predator Action",
          content: "Focus on predator areas, including lion prides, cheetahs, and leopards. Your guide will use expert knowledge to find active hunting or feeding. Enjoy bush breakfast or picnic lunch. Evening drive and dinner.",
          meals: undefined
        },
        {
          day: 5,
          title: "Full Day Game Drives – Exploration",
          content: "Explore different sectors of the Mara, perhaps visiting the Mara Triangle or the escarpment. Your guide will tailor the day based on recent wildlife sightings. Overnight at the camp.",
          meals: undefined
        },
        {
          day: 6,
          title: "Full Day Game Drives – Last Chances",
          content: "Final full day to catch any missed highlights. Optional activities: hot air balloon safari (extra cost) or visit to a Maasai village. Farewell dinner with traditional entertainment.",
          meals: undefined
        },
        {
          day: 7,
          title: "Morning Game Drive and Departure",
          content: "Last morning game drive followed by breakfast. Transfer to the airstrip for your flight back to Nairobi. Drop-off at your hotel or airport for onward travel.",
          meals: undefined
        }
      ],
      highlights: [
        "Luxury accessible 4x4 with hydraulic lift and premium amenities",
        "Exclusive accessible luxury camp with roll-in showers and 24/7 assistance",
        "Private vehicle and guide for personalized experience",
        "Six full days of game drives (approx. 25-30 hours)",
        "Focus on migration, river crossings, and predator action",
        "Gourmet meals and fine wines",
        "Optional hot air balloon safari and cultural visits"
      ],
      included: [
        "Private luxury accessible 4x4 with lift",
        "Professional expert guide",
        "All game drives as per itinerary",
        "6 nights luxury accessible camp accommodation (full board)",
        "All meals (6 breakfasts, 7 lunches, 6 dinners) with drinks included",
        "Internal flights Nairobi – Mara – Nairobi (if applicable)",
        "Park fees and conservation levies",
        "Bottled water, snacks, and refreshments",
        "Nairobi airport/hotel transfers"
      ],
      excluded: [
        "International flights and visas",
        "Travel insurance",
        "Tips and gratuities",
        "Optional activities (balloon safari, village visit)",
        "Personal expenses"
      ],
      faqs: [
        { question: "What makes this safari 'luxury'?", answer: "We use premium vehicles and camps, offer private guiding, include gourmet meals and drinks, and provide exceptional personalized service. The camps have high-end amenities and are located in prime wildlife areas." },
        { question: "Is the luxury camp fully accessible for wheelchair users?", answer: "Yes, our selected luxury camps have been specially designed for accessibility, with roll-in showers, grab rails, adjustable beds, and level pathways throughout." },
        { question: "Can we customize the itinerary?", answer: "Absolutely. We can adjust the focus, add activities, or change the pace to suit your preferences. Please contact us to discuss your needs." }
      ],
      accessibility: {
        vehicle: "Custom-built luxury 4x4 with a fully automated hydraulic lift (capacity 400kg) and a wide ramp; leather swivel seats that can be moved aside; built-in wheelchair docking station; climate control; Wi-Fi; refrigerator; professional camera mounts; pop-up roof with panoramic glass.",
        accommodation: "Exclusive accessible safari lodge with fully accessible suites; roll-in shower with multiple shower heads and a teak bench; grab rails throughout; electric adjustable bed (height and tilt); wide doorways (100cm); smooth tiled floors; 24-hour caregiver call button; all areas are step-free.",
        terrain: "Lodge on elevated ground with paved pathways and gentle ramps connecting all facilities; private viewing decks with wheelchair space; the surrounding terrain is flat and manicured; game drives traverse well-graded tracks with minimal steep sections."
      }
    },
    {
      id: "a6",
      slug: "wheelchair-accessible-masai-mara-safari",
      title: "Wheelchair Accessible Maasai Mara Safari Kenya 2026 – Tailored Safari for Wheelchair Users from $990",
      description: "A specialized safari designed exclusively for wheelchair users, featuring fully accessible vehicles, camps, and activities. Experience the Maasai Mara's wildlife in comfort and safety. Starting from $990.",
      shortDescription: "Dedicated wheelchair accessible safari with adapted vehicles and camps. Expert guides trained in disability assistance. Ideal for wheelchair users seeking a hassle-free safari. From $990.",
      longDescription: `Our Wheelchair Accessible Maasai Mara Safari is specifically tailored for travelers who use wheelchairs. We understand the unique challenges and have designed every aspect of this safari to ensure a seamless, comfortable, and unforgettable experience. From the accessible vehicles with ramps or lifts to the specially designed camps, we have left no detail overlooked.
  
  The safari begins with a pickup from your Nairobi hotel in our accessible 4x4 vehicle, which features a hydraulic lift or ramp, spacious interior, and secure tie-downs for wheelchairs. The vehicle also has a pop-up roof for excellent game viewing from a seated position. Our guide is experienced in assisting wheelchair users and will ensure your comfort throughout the game drives.
  
  Accommodation is in an accessible camp with roll-in showers, shower chairs, grab rails, and wide doorways. The camp's pathways are paved or hard-packed, allowing easy movement. Staff are trained to assist with any needs, and there is always someone available to help.
  
  The itinerary includes game drives at optimal times to see the Big Five and the Great Migration (seasonal). With small group sizes, you'll receive personalized attention and the flexibility to adjust the pace as needed. This safari is perfect for wheelchair users who want to experience the magic of the Maasai Mara without barriers.`,
      metaDescription: "Book a wheelchair accessible Masai Mara safari from $990. Fully adapted vehicles and camps. Expert guides trained in disability assistance. Hassle-free safari experience.",
      keywords: ["wheelchair accessible safari Masai Mara", "wheelchair user safari Kenya", "accessible safari for disabled", "Mara safari wheelchair friendly", "wheelchair safari Kenya"],
      price: 990,
      originalPrice: 1200,
      image: "/wheelchair-accessible-mara-safari.jpg",
      imageAlt: "Wheelchair accessible Masai Mara safari for wheelchair users, Kenya",
      videoId: "YOUR_VIDEO_ID_6",
      url: "/accessible-migration/wheelchair-accessible-masai-mara-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/wheelchair-accessible-masai-mara-safari#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 41,
      duration: "3 Days / 2 Nights",
      groupSize: "2-4 people (wheelchair accessible vehicle)",
      departure: "Daily from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup in accessible 4x4. Drive to Mara with stops as needed. Arrive at accessible camp for lunch and check-in. Afternoon game drive specifically tailored for wheelchair viewing. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives",
          content: "Morning and afternoon game drives. Your guide will position the vehicle for optimal viewing from a seated position. Picnic lunch in the reserve. Return to camp for dinner and overnight.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning game drive. Return for breakfast and check-out. Drive back to Nairobi with lunch en route. Drop-off at your hotel or airport.",
          meals: undefined
        }
      ],
      highlights: [
        "Fully accessible 4x4 with lift/ramp and wheelchair tie-downs",
        "Accessible camp with roll-in showers and grab rails",
        "Guides trained in assisting wheelchair users",
        "Three game drives totaling 10-12 hours",
        "Small group for personalized attention",
        "Great Migration viewing (seasonal)"
      ],
      included: [
        "Accessible 4x4 transport with lift/ramp",
        "Professional guide trained in disability assistance",
        "Game drives as per itinerary",
        "2 nights accessible camp accommodation (full board)",
        "All meals (2 breakfasts, 3 lunches, 2 dinners)",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Travel insurance",
        "Tips",
        "Optional activities",
        "Alcoholic beverages",
        "Personal expenses"
      ],
      faqs: [
        { question: "Can I bring my own wheelchair?", answer: "Yes, you can bring your own wheelchair. Our vehicles have tie-down systems to secure it during travel. We also have manual wheelchairs available if needed." },
        { question: "Are the vehicles equipped with a hoist?", answer: "Yes, our vehicles have hydraulic lifts or ramps, and we can assist with transfer if needed." },
        { question: "What is the maximum wheelchair size that can be accommodated?", answer: "Our vehicles can accommodate most standard wheelchairs. Please provide dimensions during booking so we can ensure a perfect fit." }
      ],
      accessibility: {
        vehicle: "Toyota Land Cruiser 4x4 with a dedicated wheelchair lift (hydraulic, 350kg capacity) and a manual ramp; 4-point tie-down system; swivel driver seat for easy guide assistance; pop-up roof with wide opening for clear viewing; step-free entry.",
        accommodation: "Fully accessible tented camp with paved pathways; roll-in shower with shower chair; grab rails around toilet and shower; wide doorways (90cm); low-slung bed (40cm) with transfer space; firm, slip-resistant flooring throughout.",
        terrain: "Camp on flat, compacted ground with no slopes; pathways between tents and main areas are at least 1m wide and obstacle-free; game drive routes are selected to avoid deep ruts and steep slopes."
      }
    },
    {
      id: "a7",
      slug: "best-time-accessible-wildebeest-migration-safari",
      title: "Best Time For Accessible Wildebeest Migration Safari Kenya 2026 – Optimal Viewing Schedule from $1050",
      description: "Plan your accessible safari around the best times to witness the Great Migration. This 3-day tour focuses on peak migration months with accessible vehicles and camps. Starting from $1050.",
      shortDescription: "3-day accessible safari timed for the peak migration months. Expert guides position you for the best wildlife viewing. Wheelchair-friendly vehicles and camps. From $1050.",
      longDescription: `To witness the Great Wildebeest Migration at its most spectacular, timing is everything. Our Best Time For Accessible Wildebeest Migration Safari is scheduled during the peak months (July to October) when the herds are in the Masai Mara and river crossings are frequent. This 3-day safari is designed for travelers with mobility challenges, offering accessible vehicles, camps, and expert guidance to ensure you experience the migration's highlights.
  
  Our accessible 4x4 vehicles are equipped with ramps or lifts, and our guides are skilled in tracking the herds and positioning for the best views. Accommodation is at an accessible camp with roll-in showers and other facilities. The itinerary includes game drives timed for optimal wildlife activity, with a focus on the Mara River where crossings occur.
  
  This safari is perfect for those who want to see the migration but may have limited time or mobility. We take care of all logistics so you can focus on the incredible wildlife experience.`,
      metaDescription: "Book a 3-day accessible safari timed for the best migration viewing. Wheelchair-friendly vehicles and camps. Witness the Great Wildebeest Migration at its peak.",
      keywords: ["best time accessible migration safari", "peak migration wheelchair safari", "Great Migration accessible tour", "when to see migration accessible", "Mara river crossing accessible"],
      price: 1050,
      originalPrice: 1250,
      image: "/best-time-accessible-migration.jpg",
      imageAlt: "Best time to view wildebeest migration on wheelchair accessible safari, Kenya",
      videoId: "YOUR_VIDEO_ID_7",
      url: "/accessible-migration/best-time-accessible-wildebeest-migration-safari",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/best-time-accessible-wildebeest-migration-safari#booking-form",
      country: "Kenya",
      rating: 4.8,
      reviewCount: 33,
      duration: "3 Days / 2 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Daily during July-October",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup in accessible 4x4. Drive to Mara. Arrive at accessible camp for lunch. Afternoon game drive focusing on migration areas. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives – River Crossing Focus",
          content: "Full day dedicated to the Mara River area. Picnic lunch. Your guide will position you for the best chance to see crossings. Return to camp for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning drive. Return for breakfast and check-out. Drive back to Nairobi with lunch en route. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Scheduled during peak migration months (July-October)",
        "Focus on river crossings and large herds",
        "Accessible vehicle with ramp/lift",
        "Accessible camp with roll-in showers",
        "Expert guide specialized in migration tracking",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "2 nights accessible camp (full board)",
        "All meals",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "Why is July-October the best time?", answer: "During these months, the wildebeest herds are in the Masai Mara, and river crossings are frequent. The weather is also generally dry, making game viewing easier." },
        { question: "What if I can only travel outside these months?", answer: "We offer accessible safaris year-round, but the migration may be in the Serengeti during other months. Still, the Mara has resident wildlife, so you'll have excellent sightings." },
        { question: "Are there any special accessibility considerations during peak season?", answer: "We ensure our vehicles and camps are available and fully accessible regardless of season. Advance booking is recommended." }
      ],
      accessibility: {
        vehicle: "Land Cruiser with a rear-entry hydraulic lift (300kg capacity) and a foldable ramp; wheelchair tie-downs; pop-up roof with panoramic view; air-conditioning; guide-assisted transfer.",
        accommodation: "Tented camp with compacted gravel pathways; roll-in shower with shower stool; grab rails; wide doorways (80cm); bed height 45cm; non-slip flooring.",
        terrain: "Camp on level ground with short grass; pathways are marked and well-lit at night; game drive tracks are mostly flat and dry during peak season."
      }
    },
    {
      id: "a8",
      slug: "accessible-migration-safari-cost",
      title: "Accessible Migration Safari Cost Guide Kenya 2026 – Transparent Pricing for Disabled Travelers from $850",
      description: "Understand the cost breakdown of an accessible migration safari in Kenya. This 2-day informational tour provides a comprehensive look at pricing with a real safari experience. Starting from $850.",
      shortDescription: "Discover the costs of accessible migration safaris with a 2-day practical tour. Includes wheelchair-friendly vehicles and camps. From $850.",
      longDescription: `Planning an accessible safari involves understanding the costs involved. Our Accessible Migration Safari Cost Guide is a unique 2-day tour that not only provides a real safari experience but also offers a transparent breakdown of expenses, helping you plan your budget effectively. This tour is ideal for those who want to experience the Mara while learning about the cost components of accessible travel.
  
  You'll travel in our accessible 4x4 vehicle and stay at an accessible camp, just like our regular safaris. Alongside game drives, your guide will explain the various cost elements: vehicle adaptations, camp accessibility features, guide training, park fees, and more. This way, you can see exactly where your money goes and feel confident in the value provided.
  
  This safari is perfect for budget-conscious travelers or those new to accessible safari planning. It combines education with wildlife viewing, offering a unique and practical experience.`,
      metaDescription: "Book a 2-day accessible safari cost guide tour from $850. Learn about pricing while enjoying game drives. Wheelchair-friendly vehicles and camps.",
      keywords: ["accessible safari cost Kenya", "migration safari pricing", "disabled travel budget", "wheelchair safari cost", "affordable accessible safari"],
      price: 850,
      originalPrice: 1000,
      image: "/accessible-safari-cost-guide.jpg",
      imageAlt: "Wheelchair accessible safari cost guide for Kenya",
      videoId: "YOUR_VIDEO_ID_8",
      url: "/accessible-migration/accessible-migration-safari-cost",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/accessible-migration-safari-cost#booking-form",
      country: "Kenya",
      rating: 4.6,
      reviewCount: 21,
      duration: "2 Days / 1 Night",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive & Cost Discussion",
          content: "Pickup in accessible 4x4. Drive to Mara. En route, your guide will discuss the cost breakdown of accessible safaris. Arrive at camp for lunch. Afternoon game drive with further explanations. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Morning game drive. Return for breakfast and check-out. Drive back to Nairobi, continuing the cost discussion. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Practical safari experience combined with cost education",
        "Transparent breakdown of accessible safari expenses",
        "Accessible vehicle with ramp/lift",
        "Accessible camp with roll-in showers",
        "Expert guide providing cost insights",
        "Great Migration viewing (seasonal)"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "1 night accessible camp (full board)",
        "All meals (1 breakfast, 2 lunches, 1 dinner)",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "Why is accessible safari more expensive than regular?", answer: "Additional costs include vehicle adaptations (lifts/ramps), specialized guide training, camp accessibility modifications, and lower guest-to-staff ratios. These ensure a safe and comfortable experience." },
        { question: "Are there any hidden costs?", answer: "No, we provide a detailed cost breakdown before booking. The price includes all major expenses except flights, insurance, tips, and personal items." },
        { question: "Can I use this information to plan my own safari?", answer: "Yes, the insights gained can help you make informed decisions when comparing safari operators and budgeting." }
      ],
      accessibility: {
        vehicle: "Standard accessible 4x4 with a manual ramp and tie-downs; pop-up roof; comfortable seating; the vehicle is used as a teaching tool to demonstrate accessibility features.",
        accommodation: "Basic accessible camp with roll-in shower, grab rails, and wide doorways; firm pathways; the camp is used to explain cost-effective accessibility.",
        terrain: "Flat terrain with compacted earth pathways; the camp is simple but fully functional for guests with mobility needs."
      }
    },
    {
      id: "a9",
      slug: "wheelchair-friendly-mara-river-crossing-guide",
      title: "Wheelchair Friendly Mara River Crossing Guide – Ultimate Accessible Viewing Safari from $1100",
      description: "A specialized 3-day safari focused on witnessing the iconic Mara River crossings from accessible vantage points. Wheelchair-friendly vehicles and camps. Starting from $1100.",
      shortDescription: "3-day accessible safari dedicated to Mara River crossings. Expert positioning for the best views. Wheelchair-friendly vehicles and camps. From $1100.",
      longDescription: `The Mara River crossing is one of the most dramatic wildlife events on Earth. Our Wheelchair Friendly Mara River Crossing Guide safari is meticulously designed to give you the best possible chance to witness this spectacle, with all the accessibility features you need. Over 3 days, we focus on the river areas where crossings are most likely, using our accessible vehicles and expert guides to position you for optimal viewing.
  
  Our vehicles are equipped with lifts or ramps and have pop-up roofs, allowing you to view from a seated position. Our guides are seasoned migration experts who track the herds and predict crossing points. Accommodation is at an accessible camp near the river, with roll-in showers and other facilities.
  
  This safari is ideal for wildlife enthusiasts who dream of seeing the river crossings up close, without the barriers that often come with mobility challenges.`,
      metaDescription: "Book a wheelchair friendly Mara River crossing safari from $1100. Expertly positioned for the best views. Accessible vehicles and camps. Witness the iconic crossings.",
      keywords: ["wheelchair friendly Mara river crossing", "accessible river crossing safari", "Mara migration crossing wheelchair", "disabled travel river crossing", "Great Migration accessible viewing"],
      price: 1100,
      originalPrice: 1300,
      image: "/accessible-river-crossing.jpg",
      imageAlt: "Wheelchair accessible Mara River crossing safari, Kenya",
      videoId: "YOUR_VIDEO_ID_9",
      url: "/accessible-migration/wheelchair-friendly-mara-river-crossing-guide",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/wheelchair-friendly-mara-river-crossing-guide#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 29,
      duration: "3 Days / 2 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Daily during July-October",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – River Area Game Drive",
          content: "Pickup in accessible 4x4. Drive to Mara. Arrive at accessible camp near the river. Afternoon game drive focusing on the river crossing areas. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day River Crossing Focus",
          content: "Full day at the river. Packed lunch. Your guide will position you at strategic points based on herd movements. Return to camp for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Final morning river drive. Return for breakfast and check-out. Drive back to Nairobi with lunch en route. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Dedicated focus on Mara River crossings",
        "Accessible vehicle with lift/ramp",
        "Accessible camp near the river",
        "Expert guides specialized in migration tracking",
        "Three game drives optimized for river crossings",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "2 nights accessible camp (full board)",
        "All meals",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What are the chances of seeing a crossing?", answer: "During peak season (July-October), crossings occur frequently, sometimes multiple times a day. Our guides track the herds to increase your chances." },
        { question: "Can I get close to the river?", answer: "We position the vehicle at safe and accessible viewpoints. The pop-up roof provides excellent views even from a distance." },
        { question: "Is the terrain near the river accessible?", answer: "We use accessible vehicles that can handle the terrain. Our camps are also positioned for easy access." }
      ],
      accessibility: {
        vehicle: "Land Cruiser with a hydraulic lift (330kg capacity) and a ramp; vehicle has a raised roof and large windows for riverside viewing; wheelchair can be positioned at the side door for unobstructed views.",
        accommodation: "Tented camp with gravel pathways; roll-in shower with shower chair; grab rails; wide doorways; beds with transfer space; located on flat ground near the river.",
        terrain: "Camp on level ground with compacted pathways; river viewing points are accessed via accessible tracks; the vehicle can approach the riverbank to within safe distance for viewing."
      }
    },
    {
      id: "a10",
      slug: "accessible-migration-safari-camps",
      title: "Accessible Migration Safari Camps – Stay in Wheelchair-Friendly Camps Kenya 2026 from $950",
      description: "Experience the best accessible camps in the Masai Mara during the migration. This 3-day safari showcases top accessible accommodations and wildlife viewing. Starting from $950.",
      shortDescription: "3-day safari featuring the best accessible camps in Masai Mara. Wheelchair-friendly facilities and game drives. Ideal for those seeking comfortable accessible accommodation. From $950.",
      longDescription: `Choosing the right camp is crucial for an accessible safari. Our Accessible Migration Safari Camps tour is designed to showcase some of the best wheelchair-friendly camps in the Masai Mara, while also providing excellent wildlife viewing during the migration. Over 3 days, you'll stay at a premier accessible camp and enjoy game drives that highlight the migration and resident wildlife.
  
  The camp features roll-in showers, grab rails, wide doorways, and level pathways. The staff are trained to assist guests with disabilities. Our accessible vehicles provide easy transfers and comfortable game viewing. This safari is perfect for travelers who want to experience the migration while staying in a camp that prioritizes accessibility.
  
  You'll also have the opportunity to compare the camp's features and discuss what makes a camp accessible, giving you valuable knowledge for future travels.`,
      metaDescription: "Book a 3-day safari featuring accessible camps in Masai Mara from $950. Wheelchair-friendly facilities and game drives. Comfortable stay during the migration.",
      keywords: ["accessible safari camps Kenya", "wheelchair friendly camps Mara", "accessible migration accommodation", "disabled friendly safari camps", "Mara accessible lodges"],
      price: 950,
      originalPrice: 1150,
      image: "/accessible-camp-mara.jpg",
      imageAlt: "Wheelchair accessible safari camps at Masai Mara, Kenya",
      videoId: "YOUR_VIDEO_ID_10",
      url: "/accessible-migration/accessible-migration-safari-camps",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/accessible-migration-safari-camps#booking-form",
      country: "Kenya",
      rating: 4.7,
      reviewCount: 26,
      duration: "3 Days / 2 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Accessible Camp Check-in and Game Drive",
          content: "Pickup in accessible 4x4. Drive to Mara. Arrive at the featured accessible camp, tour the facilities. Afternoon game drive. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives – Migration Focus",
          content: "Full day of game viewing with picnic lunch. Explore the migration areas. Return to camp for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Morning drive. Return for breakfast and check-out. Drive back to Nairobi with lunch en route. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Stay at a premier accessible camp",
        "Explore the camp's accessibility features",
        "Accessible vehicle with lift/ramp",
        "Game drives to see the migration",
        "Expert guide and staff assistance",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "2 nights accessible camp (full board)",
        "All meals",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What accessibility features should I look for in a camp?", answer: "Key features include roll-in showers, grab rails, wide doorways, level pathways, and staff trained in disability assistance. Our selected camps meet these criteria." },
        { question: "Can I visit other accessible camps?", answer: "This tour focuses on one camp, but we can arrange visits to others upon request." },
        { question: "Are there any additional costs for the camp's accessibility?", answer: "No, the price includes full access to all camp facilities and assistance." }
      ],
      accessibility: {
        vehicle: "Standard accessible 4x4 with ramp and tie-downs; pop-up roof; comfortable seating; used to transfer guests to and from the camp.",
        accommodation: "Featured camp: roll-in shower with shower chair, grab rails, wide doorways (85cm), low beds, paved pathways, and a level dining area. Staff are trained in disability awareness.",
        terrain: "Camp on flat ground with paved walkways; all common areas are step-free; game drives depart from a level boarding area."
      }
    },
    {
      id: "a11",
      slug: "disabled-friendly-safari-vehicles-kenya",
      title: "Disabled Friendly Safari Vehicles Kenya – Accessible Mobility Safari from $900",
      description: "A 2-day safari showcasing the best disabled-friendly safari vehicles in Kenya. Experience the Mara with purpose-built accessible vehicles and expert guides. Starting from $900.",
      shortDescription: "2-day safari focused on disabled-friendly vehicles. Experience the Mara in accessible 4x4s with lifts/ramps. Great for those interested in vehicle adaptations. From $900.",
      longDescription: `Our Disabled Friendly Safari Vehicles Kenya tour is a unique opportunity to experience the Masai Mara in purpose-built accessible vehicles while learning about the adaptations that make safari accessible. Over 2 days, you'll travel in our state-of-the-art 4x4 vehicles equipped with lifts or ramps, spacious interiors, and secure tie-downs. You'll also enjoy game drives to see the migration and resident wildlife.
  
  This safari is ideal for travelers who want to understand the vehicle adaptations, those who are considering purchasing or renting accessible vehicles, or anyone who simply wants a comfortable safari experience. Our expert guides will explain the features and benefits of the vehicles, and you'll have the chance to ask questions and see them in action.
  
  Accommodation is at an accessible camp, and all logistics are handled to ensure a stress-free experience.`,
      metaDescription: "Book a 2-day safari showcasing disabled-friendly vehicles in Kenya from $900. Experience accessible 4x4s with lifts/ramps. Game drives in the Mara.",
      keywords: ["disabled friendly safari vehicles Kenya", "accessible safari vehicles", "wheelchair adapted 4x4", "Mara safari vehicle ramp", "disabled transport safari"],
      price: 900,
      originalPrice: 1100,
      image: "/accessible-vehicle-safari.jpg",
      imageAlt: "Disabled friendly safari vehicles in Kenya",
      videoId: "YOUR_VIDEO_ID_11",
      url: "/accessible-migration/disabled-friendly-safari-vehicles-kenya",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/disabled-friendly-safari-vehicles-kenya#booking-form",
      country: "Kenya",
      rating: 4.8,
      reviewCount: 19,
      duration: "2 Days / 1 Night",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Vehicle Demo and Game Drive",
          content: "Pickup in accessible 4x4. Drive to Mara. En route, guide explains vehicle features. Arrive at camp for lunch. Afternoon game drive, experiencing the vehicle's capabilities. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Morning game drive. Return for breakfast and check-out. Drive back to Nairobi. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Experience purpose-built accessible 4x4 vehicles",
        "Learn about vehicle adaptations (lifts, ramps, tie-downs)",
        "Game drives in the Masai Mara",
        "Stay at an accessible camp",
        "Expert guide providing vehicle insights",
        "Small group for personalized attention"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "1 night accessible camp (full board)",
        "All meals (1 breakfast, 2 lunches, 1 dinner)",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "What types of vehicle adaptations are available?", answer: "We have vehicles with hydraulic lifts, ramps, and manual tie-downs. Some also have swivel seats for easy transfers." },
        { question: "Can I try driving the vehicle?", answer: "This is not a driving course, but you can observe how the guide operates the adaptations." },
        { question: "Are these vehicles available for hire?", answer: "Yes, we offer rental of accessible vehicles for self-drive safaris. Please inquire for details." }
      ],
      accessibility: {
        vehicle: "Specialized 4x4 with a rear hydraulic lift (350kg capacity) and a fold-out ramp; wheelchair tie-down points; pop-up roof; sliding side door for easy access; the guide demonstrates all features.",
        accommodation: "Standard accessible camp with roll-in shower, grab rails, and wide doorways; used for overnight stay.",
        terrain: "Camp on flat ground; pathways are firm and wide; the vehicle can park close to the tent entrance."
      }
    },
    {
      id: "a12",
      slug: "senior-citizen-migration-safari-kenya",
      title: "Senior Citizen Migration Safari Kenya 2026 – Gentle Accessible Migration Experience from $1100",
      description: "A specially designed safari for senior citizens, with a slow pace, accessible vehicles, camps, and extra assistance. Witness the Great Migration comfortably. Starting from $1100.",
      shortDescription: "Senior-friendly 3-day migration safari with accessible vehicles, camps, and a relaxed pace. Extra assistance and care provided. Ideal for older travelers. From $1100.",
      longDescription: `Our Senior Citizen Migration Safari is tailored for older travelers who want to experience the Great Migration in comfort and safety. We understand the needs of seniors and have designed this safari with a gentle pace, accessible facilities, and extra assistance throughout. Over 3 days, you'll enjoy game drives at a relaxed tempo, with plenty of breaks and options to rest.
  
  The accessible vehicles have easy entry, comfortable seating, and pop-up roofs for viewing. Our guides are patient and attentive, ensuring you don't miss any wildlife action. Accommodation is at an accessible camp with roll-in showers, grab rails, and 24/7 staff support. Meals are served at convenient times, and special dietary needs can be accommodated.
  
  This safari is perfect for seniors who want to witness the migration without the rigors of a typical safari. We take care of all logistics, so you can focus on the incredible wildlife.`,
      metaDescription: "Book a senior citizen migration safari from $1100. Gentle pace, accessible vehicles and camps. Extra assistance for older travelers. Witness the Great Migration comfortably.",
      keywords: ["senior citizen safari Kenya", "elderly accessible migration safari", "slow pace safari for seniors", "accessible safari for older adults", "Mara safari for seniors"],
      price: 1100,
      originalPrice: 1300,
      image: "/senior-accessible-safari.jpg",
      imageAlt: "Senior citizen wheelchair accessible migration safari in Kenya",
      videoId: "YOUR_VIDEO_ID_12",
      url: "/accessible-migration/senior-citizen-migration-safari-kenya",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/senior-citizen-migration-safari-kenya#booking-form",
      country: "Kenya",
      rating: 4.9,
      reviewCount: 34,
      duration: "3 Days / 2 Nights",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Afternoon Game Drive",
          content: "Pickup in accessible 4x4. Drive to Mara with rest stops. Arrive at camp for lunch. Afternoon game drive at a relaxed pace. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Full Day Game Drives – Migration Focus with Breaks",
          content: "Morning game drive, return to camp for lunch and rest. Afternoon game drive. Picnic lunch optional. Return for dinner.",
          meals: undefined
        },
        {
          day: 3,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Morning game drive. Return for breakfast and check-out. Drive back to Nairobi with lunch en route. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Gentle pace with plenty of breaks",
        "Accessible vehicle with easy entry",
        "Accessible camp with roll-in showers and grab rails",
        "Extra staff assistance available",
        "Game drives tailored to seniors' comfort",
        "Great Migration viewing (seasonal)"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "2 nights accessible camp (full board)",
        "All meals",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "Is this safari suitable for those with limited mobility?", answer: "Yes, we cater to various mobility levels, including those who use walkers or wheelchairs. Please inform us of your needs." },
        { question: "Are there medical facilities nearby?", answer: "We have first aid kits and can arrange emergency evacuation if needed. We recommend travel insurance." },
        { question: "Can we have a private vehicle?", answer: "Yes, we offer private vehicles for an additional cost. This allows for even more personalized pacing." }
      ],
      accessibility: {
        vehicle: "Toyota Land Cruiser with a manual ramp (or lift upon request), comfortable elevated seats with armrests, pop-up roof, and step-less entry; the vehicle is designed for easy transfers.",
        accommodation: "Accessible tented camp with roll-in showers, grab rails, wide doorways, and firm pathways; staff are trained to assist seniors with mobility.",
        terrain: "Camp on level ground with compacted pathways; gentle slopes are avoided; game drive routes are chosen for smooth driving."
      }
    },
    {
      id: "a13",
      slug: "accessible-kenya-safari-travel-guide",
      title: "Accessible Kenya Safari Travel Guide – Comprehensive Accessible Safari Experience from $900",
      description: "A 2-day comprehensive tour that serves as a travel guide for accessible safaris in Kenya. Includes game drives, camp visits, and detailed accessibility information. Starting from $900.",
      shortDescription: "2-day accessible safari travel guide tour. Learn about accessibility in Kenya's parks while enjoying game drives. Ideal for planning future trips. From $900.",
      longDescription: `Our Accessible Kenya Safari Travel Guide is a unique 2-day tour that combines a real safari experience with comprehensive education on accessibility in Kenya's parks. This tour is designed for travelers who want to understand the accessibility landscape before committing to a longer safari, or for those who simply want to gather information while enjoying the wildlife.
  
  You'll travel in our accessible 4x4 vehicles, stay at an accessible camp, and go on game drives in the Masai Mara. Alongside the wildlife, your guide will provide detailed information on park accessibility, camp features, vehicle options, and tips for planning your own accessible safari. This is a hands-on learning experience that covers everything from booking to on-the-ground logistics.
  
  This safari is perfect for first-time visitors, travel planners, or anyone wanting to make informed decisions about accessible travel in Kenya.`,
      metaDescription: "Book a 2-day accessible Kenya safari travel guide from $900. Learn about accessibility while enjoying game drives. Ideal for planning your accessible safari.",
      keywords: ["accessible Kenya safari travel guide", "disability travel Kenya", "planning accessible safari", "Mara accessibility information", "wheelchair friendly travel guide"],
      price: 900,
      originalPrice: 1100,
      image: "/accessible-travel-guide.jpg",
      imageAlt: "Wheelchair accessible Kenya safari travel guide",
      videoId: "YOUR_VIDEO_ID_13",
      url: "/accessible-migration/accessible-kenya-safari-travel-guide",
      gallery: [
        "/accessible-mara-safari-2day.jpg",
        "/accessible-mara-safari-3day.jpg",
        "/accessible-mara-safari-4day.jpg",
        "/accessible-mara-safari-5day.jpg",
        "/accessible-vehicle-safari.jpg",
        "/accessible-camp-mara.jpg",
      ],
      bookingUrl: "/accessible-migration/accessible-kenya-safari-travel-guide#booking-form",
      country: "Kenya",
      rating: 4.7,
      reviewCount: 18,
      duration: "2 Days / 1 Night",
      groupSize: "2-6 people (accessible vehicle)",
      departure: "Weekly from Nairobi",
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Masai Mara – Game Drive and Accessibility Talk",
          content: "Pickup in accessible 4x4. Drive to Mara. En route, guide discusses accessible travel in Kenya. Arrive at camp for lunch. Afternoon game drive with commentary on park accessibility. Dinner and overnight.",
          meals: undefined
        },
        {
          day: 2,
          title: "Morning Game Drive and Return to Nairobi",
          content: "Morning game drive. Return for breakfast and check-out. Drive back to Nairobi, continuing the educational discussion. Drop-off.",
          meals: undefined
        }
      ],
      highlights: [
        "Comprehensive education on accessible safari planning",
        "Real safari experience in the Masai Mara",
        "Accessible vehicle with lift/ramp",
        "Accessible camp with roll-in showers",
        "Expert guide providing practical tips",
        "Game drives to see migration and resident wildlife"
      ],
      included: [
        "Accessible 4x4 transport",
        "Professional guide",
        "Game drives as per itinerary",
        "1 night accessible camp (full board)",
        "All meals (1 breakfast, 2 lunches, 1 dinner)",
        "Bottled water",
        "Nairobi transfers",
        "Park fees"
      ],
      excluded: [
        "International flights and visas",
        "Insurance",
        "Tips",
        "Optional activities",
        "Alcoholic drinks",
        "Personal expenses"
      ],
      faqs: [
        { question: "Is this tour suitable for someone who has never been on safari?", answer: "Yes, it's ideal for first-timers as it combines education with experience." },
        { question: "Can I ask specific questions about accessibility?", answer: "Absolutely. Your guide will be happy to answer any questions about camps, vehicles, parks, and more." },
        { question: "Will I receive written materials?", answer: "We provide a digital guidebook with accessibility information after the tour." }
      ],
      accessibility: {
        vehicle: "Standard accessible 4x4 with ramp and tie-downs; pop-up roof; used for both game drives and educational demonstrations.",
        accommodation: "Basic accessible camp with roll-in shower and grab rails; used to show typical accessible camp features.",
        terrain: "Flat terrain with compacted pathways; the camp is used as a teaching example for accessibility."
      }
    }
  ];
  
  export function getTourBySlug(slug: string): Tour | undefined {
    return accessibleTours.find(t => t.slug === slug);
  }