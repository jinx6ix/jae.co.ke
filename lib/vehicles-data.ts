// lib/vehicles-data.ts
// ─────────────────────────────────────────────────────────────────────────────
// FULL SEO-OPTIMISED VEHICLE DATA
// Every field is used by: page.tsx, generateMetadata, VehicleStructuredData,
// HeroSlider, VehicleHighlightGallery, FleetGallery, sitemap, robots.
// ─────────────────────────────────────────────────────────────────────────────

export type VehicleSpecifications = {
  engine: string
  transmission: string
  fuelType: string
  luggage: string
  fuelEfficiency?: string
  driveType?: string
  seats?: number
  doors?: number
  groundClearance?: string
  payload?: string
}

export type Vehicle = {
  // ── Core identity ──────────────────────────────────────────────────────────
  id: string
  name: string
  slug: string
  type: "SUV" | "Van" | "Luxury" | "Overland" | "Accessible" | "Photography" | "Minivan"

  // ── Images ─────────────────────────────────────────────────────────────────
  image: string            // primary OG / hero image (absolute-path from /public)
  gallery: string[]        // additional slide images for HeroSlider

  // ── Pricing ────────────────────────────────────────────────────────────────
  pricePerDay: number      // USD, numeric
  priceCurrency: string    // ISO 4217            e.g. "USD"

  // ── Copy ───────────────────────────────────────────────────────────────────
  description: string      // page body paragraph (150-200 words)
  ideal: string            // highlighted "Ideal for" callout

  // ── On-page SEO ────────────────────────────────────────────────────────────
  metaTitle: string        // ≤ 60 chars, primary keyword near front
  metaDescription: string  // ≤ 160 chars, CTA + price signal
  keywords: string[]       // 6-10 target keywords (mix of head + long-tail)

  // ── Specifications ─────────────────────────────────────────────────────────
  capacity: string
  specifications: VehicleSpecifications

  // ── Features & extras ──────────────────────────────────────────────────────
  features: string[]
  extras?: Record<string, string>

  // ── Fleet gallery tabs ─────────────────────────────────────────────────────
  fleetGalleries?: {
    fleet1: string[]
    fleet2: string[]
    fleet3: string[]
  }

  // ── Structured data helpers ────────────────────────────────────────────────
  brand: string            // Vehicle brand for schema.org Car
  model: string            // Vehicle model
  vehicleYear?: number     // manufacture year
  color?: string           // dominant color
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }

  // ── Internal linking / taxonomy ───────────────────────────────────────────
  destinations: string[]   // geo-target parks/regions for internal links
  useCases: string[]       // "self-drive" | "guided" | "group" | "luxury" etc.
  relatedSlugs?: string[]  // manually curated related vehicles

  // ── Availability ───────────────────────────────────────────────────────────
  available: boolean
  availableFrom?: string   // ISO date – leave undefined if always available
}

// ─────────────────────────────────────────────────────────────────────────────
// VEHICLE DATA ARRAY
// ─────────────────────────────────────────────────────────────────────────────
export const vehicles: Vehicle[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. TOYOTA LAND CRUISER 4X4 SAFARI VEHICLE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "toyota-landcruiser-4x4",
    name: "Toyota Landcruiser 4x4 Safari Vehicle",
    slug: "toyota-landcruiser",
    type: "SUV",
    brand: "Toyota",
    model: "Land Cruiser 4x4",
    vehicleYear: 2022,
    color: "White",
    image: "/1b436e43-e979-4d81-93e1-972fbee500dd.jpg",
    gallery: [
      "/1b436e43-e979-4d81-93e1-972fbee500dd.jpg",
      "/42376dae-b77d-4c57-bfb9-9168f3095936.jpg",
      "/a72177d7-cdb1-405c-9c8e-0f6def7d3912.jpg",
      "/bc797b77-1554-4a2f-9b17-6112454c25bd.jpg",
      "/39c2510c-fb4c-4246-95c6-c2df54fb0e94.jpg",
      "/ef39caf7-09ec-41e2-8811-20cf0b6b15d3 (1).jpg",
      "/62dfdb69-5ed3-4b33-968b-941f6e196039.jpg",
      "/4d1504e9-91ea-42a6-a58c-2e4e052121ad.jpg",
      "/20f1264b-98e2-41ea-8086-5dbada80fea4.jpg",
      "/b1e70b68-960e-44f3-98cf-9ac3aabef553.jpg",
      "/f69a5a21-195f-4546-9f02-09f566cf2d5e.jpg",
      "/07a5842c-181c-4bf7-97a7-dc4b39de5416.jpg",
      "/e9b18823-92f1-4957-ba6c-8316f04a18af.jpg",
      "/a42f5d7f-b585-4bcc-9ddf-683e11e37fcb.jpg"
    ],
    capacity: "7 passengers with ample legroom",
    pricePerDay: 200,
    priceCurrency: "USD",
    description:
      "Experience the ultimate East African safari adventure with our rugged Toyota Landcruiser hire. This legendary 4WD vehicle rental combines exceptional off-road capabilities with proven reliability, making it the perfect choice for navigating Kenya's challenging terrain, Tanzania's vast savannas, Rwanda's volcanic hills, and Uganda's diverse landscapes. Specially equipped for safari vehicle rental with a pop-up roof for optimal wildlife viewing, this Landcruiser hire ensures you won't miss a single moment of your game drives. Our meticulously maintained fleet offers the perfect balance of durability and comfort for your East African expedition.",
    metaTitle: "Toyota Landcruiser Hire Kenya | 4x4 Safari Vehicle Rental $200/day",
    metaDescription:
      "Rent Toyota Landcruiser 4x4 safari vehicle with pop-up roof from $200/day. Perfect for game drives in Kenya, Tanzania, Uganda & Rwanda. 7-passenger capacity.",
    keywords: [
      "Toyota Landcruiser rental",
      "4x4 safari vehicle",
      "Kenya car hire",
      "safari vehicle rental",
      "landcruiser hire East Africa",
      "Toyota Landcruiser 4x4",
      "safari car rental Kenya",
      "game drive vehicle",
      "off-road vehicle rental",
      "East Africa safari transport",
      "Landcruiser pop-up roof",
      "family safari vehicle",
      "adventure vehicle hire"
    ],
    ideal:
      "Perfect for extended game drives, rough terrain exploration, and multi-day safari expeditions across East Africa's national parks and reserves",
    features: [
      "Full-time 4WD system for challenging terrain",
      "Pop-up roof with 360-degree viewing platform",
      "Multiple USB charging ports for all devices",
      "Insulated cooler box for refreshments",
      "Comprehensive first aid kit and safety equipment",
      "Full-size spare tire with tools",
      "Powerful air conditioning system",
      "Heavy-duty suspension for comfort",
      "Fog lights and off-road lighting",
      "Window mesh for ventilation and insect protection"
    ],
    specifications: {
      engine: "4.5L 1HZ Turbo Diesel Engine",
      transmission: "5-Speed Manual Transmission",
      fuelType: "Diesel",
      driveType: "4WD",
      luggage: "Large capacity roof rack and rear storage for all safari gear",
      fuelEfficiency: "Approximately 14L/100km in mixed conditions",
      seats: 7,
      doors: 5
    },
    extras: {
      "Professional Safari Driver/Guide": "$80/day",
      "Camping Equipment Package": "$50/day",
      "Satellite Phone": "$30/day",
      "Child Safety Seat": "$10/day",
      "Additional Driver": "$40/day"
    },
    fleetGalleries: {
      fleet1: [
        "/6c473926-ff4d-4180-9507-c54b502e8897.jpg",
        "/343dfbb0-0113-4034-85b2-35fee2aad0ca.jpg",
        "/ec0cceeb-0504-43c8-adcc-801ff3f53523.jpg",
        "/c7afadbd-cf56-4a4e-a9d2-404f3ae83101.jpg",
        "/ca910e59-62e9-49cb-a4f2-f7cc946e5a36.jpg",
        "/668536b6-ae61-4975-ac91-8a307aea1ea8.jpg"
      ],
      fleet2: [
        "/c5e3ec93-44b7-4567-b30d-d509e442804b.jpg",
        "/de35bfcd-b84f-4538-af9f-1fed1ac9201f.jpg",
        "/00bd9c0d-7338-4768-b847-c49fc8a917ec.jpg",
        "/b83ae619-b1d0-4fc6-93f6-45b8a588d571.jpg",
        "/bb4c1dba-a2a5-4440-b7fd-28937f542aab.jpg"
      ],
      fleet3: [
        "/6eee9dae-9f26-42e8-a59f-980ed0968af3.jpg",
        "/6b5009d6-26fe-4459-834f-217bc30e87da.jpg",
        "/34b04005-8317-4fae-a4c4-60c7bd5f7fb5.jpg",
        "/df0c65bb-3231-428f-8c35-109fee16b207.jpg",
        "/20e7f10f-6a17-4ce5-8193-74d5bd39cac7.jpg",
        "/cad4bd0d-d631-46f7-9d13-7dcc03862600.jpg"
      ]
    },
    aggregateRating: { ratingValue: 4.9, reviewCount: 187 },
    destinations: [
      "Masai Mara National Reserve",
      "Amboseli National Park",
      "Tsavo East & West",
      "Samburu National Reserve",
      "Lake Nakuru National Park"
    ],
    useCases: ["self-drive", "guided", "private-safari", "photography"],
    relatedSlugs: ["toyota-prado", "luxury-roof-top-camping", "family-safari-minivan"],
    available: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. TOYOTA PRADO LUXURY SUV
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "toyota-prado-luxury",
    name: "Toyota Prado Luxury SUV",
    slug: "toyota-prado",
    type: "SUV",
    brand: "Toyota",
    model: "Prado",
    vehicleYear: 2023,
    color: "Silver",
    image: "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
    gallery: [
      "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
      "/toyota-prado-interior.jpg",
      "/toyota-prado-dashboard-gps.jpg",
      "/toyota-prado-seats-comfort.jpg",
      "/toyota-prado-exterior-sunset.jpg",
      "/toyota-prado-cargo-space.jpg",
      "/toyota-prado-off-road.jpg"
    ],
    capacity: "5 passengers in premium comfort",
    pricePerDay: 200,
    priceCurrency: "USD",
    description:
      "Discover the perfect blend of luxury and capability with our Toyota Prado rental service. This premium SUV offers exceptional comfort for family safaris while maintaining the rugged reliability needed for East Africa's diverse terrain. With advanced 4WD capabilities, plush interior appointments, and modern amenities, our Toyota Prado provides a superior travel experience whether you're exploring city attractions or venturing into national parks. Experience the ultimate in comfortable touring with this versatile and dependable SUV hire.",
    metaTitle: "Toyota Prado Rental Kenya | Luxury SUV Safari Hire $200/day",
    metaDescription:
      "Rent Toyota Prado luxury SUV for family safaris from $200/day. 4WD, GPS, AC, premium comfort for tours in Kenya, Tanzania, Uganda & Rwanda.",
    keywords: [
      "Toyota Prado rental",
      "family safari vehicle",
      "SUV hire East Africa",
      "comfortable safari car",
      "luxury SUV rental",
      "Toyota Prado Kenya",
      "family tour vehicle",
      "premium safari transport",
      "comfortable touring car",
      "East Africa luxury travel",
      "Prado 4x4 rental",
      "business travel vehicle"
    ],
    ideal:
      "Excellent for family safaris, luxury touring, business travel, and comfortable exploration of both urban and rural destinations across East Africa",
    features: [
      "Full-time 4WD with multiple terrain modes",
      "Dual-zone automatic climate control",
      "Integrated GPS navigation with offline maps",
      "Bluetooth connectivity and premium audio",
      "Advanced safety features including multiple airbags",
      "High-speed USB charging ports throughout",
      "Leather upholstery and heated seats",
      "Sunroof for additional light and views",
      "Parking sensors and rearview camera",
      "Keyless entry and push-button start"
    ],
    specifications: {
      engine: "3.0L Turbo Diesel Engine with 250hp",
      transmission: "6-Speed Automatic Transmission",
      fuelType: "Diesel",
      driveType: "4WD",
      luggage: "Medium capacity with 60/40 split folding rear seats",
      fuelEfficiency: "Approximately 11L/100km highway driving",
      seats: 5,
      doors: 5
    },
    extras: {
      "Mobile Wi-Fi Hotspot": "$15/day",
      "Premium Insurance Coverage": "$25/day",
      "Complimentary Airport Transfer": "Free with 7+ day rental",
      "Premium Child Safety Seat": "$15/day"
    },
    fleetGalleries: {
      fleet1: [
        "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
        "/toyota-prado-interior.jpg",
        "/toyota-prado-dashboard-gps.jpg",
        "/toyota-prado-seats-comfort.jpg",
        "/toyota-prado-exterior-sunset.jpg"
      ],
      fleet2: [
        "/toyota-prado-cargo-space.jpg",
        "/toyota-prado-off-road.jpg",
        "/toyota-prado-luxury-interior.jpg",
        "/toyota-prado-night-driving.jpg",
        "/toyota-prado-family-safari.jpg"
      ],
      fleet3: [
        "/toyota-prado-vx-exterior.jpg",
        "/toyota-prado-vx-interior.jpg",
        "/toyota-prado-vx-offroad.jpg",
        "/toyota-prado-vx-cargo.jpg",
        "/toyota-prado-vx-dashboard.jpg"
      ]
    },
    aggregateRating: { ratingValue: 4.8, reviewCount: 143 },
    destinations: [
      "Masai Mara National Reserve",
      "Amboseli National Park",
      "Nairobi City Tours",
      "Lake Nakuru National Park",
      "Diani Beach"
    ],
    useCases: ["family", "luxury", "guided", "business"],
    relatedSlugs: ["toyota-landcruiser", "family-safari-minivan"],
    available: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. LUXURY ROOF TOP CAMPING SAFARI VEHICLE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "roof-top-camping",
    name: "Luxury Roof Top Camping Safari Vehicle",
    slug: "luxury-roof-top-camping",
    type: "Overland",
    brand: "Toyota",
    model: "Land Cruiser Roof Top Camping Edition",
    vehicleYear: 2022,
    color: "White",
    image: "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024",
    gallery: [
      "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024",
      "/roof-top-tent-open-at-sunset.jpg",
      "/camping-vehicle-interior-kitchenette.jpg",
      "/roof-tent-interior-bedding.jpg",
      "/camping-setup-complete.jpg",
      "/solar-panel-installation.jpg",
      "/kitchen-equipment-detail.jpg",
      "/camping-vehicle-night-lighting.jpg"
    ],
    capacity: "4 passengers with rooftop sleeping for 2-3",
    pricePerDay: 200,
    priceCurrency: "USD",
    description:
      "Elevate your safari experience with our luxury roof top camping vehicle—the ultimate overland adventure solution for East Africa. This specially converted camping safari car allows you to sleep safely above the ground while enjoying unparalleled views of the African wilderness. Complete with premium camping equipment, solar power systems, and kitchen facilities, this vehicle transforms into a mobile boutique hotel. Experience the magic of sleeping under the stars while maintaining comfort and security in remote locations across Kenya, Tanzania, Rwanda, and Uganda.",
    metaTitle: "Roof Top Camping Vehicle Kenya | Safari Camping Car Rental $200/day",
    metaDescription:
      "Rent luxury roof top camping vehicle with tent, solar power & kitchenette from $200/day. Ultimate overland adventure for camping safaris in East Africa.",
    keywords: [
      "roof top camping vehicle",
      "safari camping car",
      "overland vehicle rental",
      "camping safari East Africa",
      "roof tent vehicle hire",
      "luxury camping safari",
      "self-drive camping vehicle",
      "overland expedition truck",
      "East Africa camping rental",
      "mobile safari accommodation",
      "adventure vehicle with tent"
    ],
    ideal:
      "Perfect for adventurous camping safaris, overland expeditions, self-drive adventures, and immersive wilderness experiences across East Africa",
    features: [
      "Premium hard-shell roof tent with mattress",
      "Complete camping gear including chairs and table",
      "Solar power system with battery storage",
      "Compact kitchenette with gas stove",
      "High-quality bedding and sleeping bags",
      "Professional cooking equipment and utensils",
      "Outdoor shower attachment with privacy tent",
      "Water filtration and storage system",
      "LED lighting system for camp area",
      "Secure storage for camping equipment"
    ],
    specifications: {
      engine: "4.0L V6 Diesel Engine",
      transmission: "Automatic/Manual options available",
      fuelType: "Diesel",
      driveType: "4WD",
      luggage: "Dedicated storage for all camping equipment included",
      fuelEfficiency: "Approximately 16L/100km with full load",
      seats: 4,
      doors: 5
    },
    extras: {
      "Experienced Camping Guide": "$70/day",
      "Additional Ground Tent": "$30/day",
      "Photography Equipment Package": "$40/day",
      "Custom Camping Route Planning": "$50 one-time"
    },
    fleetGalleries: {
      fleet1: [
        "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024",
        "/roof-top-tent-open-at-sunset.jpg",
        "/camping-vehicle-interior-kitchenette.jpg",
        "/roof-tent-interior-bedding.jpg",
        "/camping-setup-complete.jpg"
      ],
      fleet2: [
        "/solar-panel-installation.jpg",
        "/kitchen-equipment-detail.jpg",
        "/camping-vehicle-night-lighting.jpg",
        "/roof-top-camping-2-exterior.jpg",
        "/roof-top-camping-2-interior.jpg"
      ],
      fleet3: [
        "/roof-top-camping-3-exterior.jpg",
        "/roof-top-camping-3-tent-open.jpg",
        "/roof-top-camping-3-kitchen.jpg",
        "/roof-top-camping-3-living-area.jpg",
        "/roof-top-camping-3-night.jpg"
      ]
    },
    aggregateRating: { ratingValue: 4.9, reviewCount: 98 },
    destinations: [
      "Masai Mara National Reserve",
      "Amboseli National Park",
      "Samburu National Reserve",
      "Lake Turkana — Northern Frontier",
      "Serengeti National Park"
    ],
    useCases: ["self-drive", "camping", "overland", "photography", "honeymoon"],
    relatedSlugs: ["toyota-landcruiser", "photography-converted-vehicle"],
    available: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. PROFESSIONAL PHOTOGRAPHY SAFARI VEHICLE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "photography-vehicle",
    name: "Professional Photography Safari Vehicle",
    slug: "photography-converted-vehicle",
    type: "Photography",
    brand: "Toyota",
    model: "Land Cruiser Photography Edition",
    vehicleYear: 2023,
    color: "White",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309",
    gallery: [
      "/db958401-6169-4947-a0f0-bbca4bfc716e.jpg",
      "/f8730438-2fbd-4dcb-a628-d1980d6be96d.jpg",
      "/safari-vehicle-extended-roof-for-photography.jpg",
      "/ef39caf7-09ec-41e2-8811-20cf0b6b15d3 (1).jpg",
      "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_2e082e13.jpg?updatedAt=1751902480189",
      "/photography-vehicle-camera-mounts.jpg",
      "/professional-photographer-in-action.jpg",
      "/equipment-storage-compartments.jpg"
    ],
    capacity: "6 passengers with dedicated photographer seating",
    pricePerDay: 250,
    priceCurrency: "USD",
    description:
      "Capture breathtaking wildlife moments with our specially modified photography safari vehicle, designed exclusively for professional photographers and serious enthusiasts. This camera car rental features an extended roof for unobstructed 360-degree shooting, multiple camera mounting points, and specialized stabilization equipment. Whether you're photographing the Great Migration in Tanzania, mountain gorillas in Rwanda, or big cats in Kenya, our photography-converted vehicle provides the perfect platform for exceptional wildlife imagery with maximum comfort and stability.",
    metaTitle: "Photography Safari Vehicle Kenya | Camera Car Rental $250/day",
    metaDescription:
      "Rent photography-converted safari vehicle with extended roof & camera mounts from $250/day. Perfect for wildlife photography in Kenya, Tanzania, Rwanda & Uganda.",
    keywords: [
      "photography safari vehicle",
      "camera car rental",
      "wildlife photography vehicle",
      "safari photography equipment",
      "professional photography vehicle",
      "extended roof safari car",
      "camera mount vehicle hire",
      "wildlife photography tour transport",
      "photo safari equipment rental",
      "East Africa photography vehicle",
      "professional camera platform"
    ],
    ideal:
      "Specifically designed for professional wildlife photography, bird watching tours, documentary filming, and serious photography expeditions across East Africa",
    features: [
      "Multiple articulated camera mounts and clamps",
      "Professional-grade bean bags for all windows",
      "Extended roof with 360-degree shooting platform",
      "High-capacity charging stations for camera batteries",
      "Climate-controlled equipment storage compartments",
      "Advanced stabilization equipment for smooth shots",
      "Fold-out side panels for low-angle photography",
      "Dedicated laptop station for immediate editing",
      "Equipment cleaning station with air blower",
      "Secure locking system for valuable gear"
    ],
    specifications: {
      engine: "4.2L Turbo Diesel Engine",
      transmission: "5-Speed Manual Transmission",
      fuelType: "Diesel",
      driveType: "4WD",
      luggage: "Specialized photography gear storage with climate control",
      fuelEfficiency: "Approximately 15L/100km with equipment load",
      seats: 6,
      doors: 5
    },
    extras: {
      "Professional Photographer Guide": "$120/day",
      "Full-frame Camera & Lens Rental": "$80-200/day",
      "On-Safari Editing Workshop": "$60/day",
      "Daily Image Backup Service": "$40/day"
    },
    fleetGalleries: {
      fleet1: [
        "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309",
        "/db958401-6169-4947-a0f0-bbca4bfc716e.jpg",
        "/f8730438-2fbd-4dcb-a628-d1980d6be96d.jpg",
        "/safari-vehicle-extended-roof-for-photography.jpg",
        "/ef39caf7-09ec-41e2-8811-20cf0b6b15d3 (1).jpg"
      ],
      fleet2: [
        "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_2e082e13.jpg?updatedAt=1751902480189",
        "/photography-vehicle-camera-mounts.jpg",
        "/professional-photographer-in-action.jpg",
        "/equipment-storage-compartments.jpg",
        "/photography-vehicle-2-exterior.jpg"
      ],
      fleet3: [
        "/photography-vehicle-3-exterior.jpg",
        "/photography-vehicle-3-interior.jpg",
        "/photography-vehicle-3-camera-mounts.jpg",
        "/photography-vehicle-3-extended-roof.jpg",
        "/photography-vehicle-3-photographer.jpg"
      ]
    },
    aggregateRating: { ratingValue: 5.0, reviewCount: 64 },
    destinations: [
      "Masai Mara National Reserve",
      "Amboseli National Park",
      "Tsavo East & West",
      "Lake Nakuru National Park",
      "Samburu National Reserve"
    ],
    useCases: ["photography", "guided", "professional", "bird-watching"],
    relatedSlugs: ["toyota-landcruiser", "luxury-roof-top-camping"],
    available: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. WHEELCHAIR ACCESSIBLE SAFARI LANDCRUISER
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "wheelchair-accessible",
    name: "Wheelchair Accessible Safari Landcruiser",
    slug: "wheelchair-accessible-vehicle",
    type: "Accessible",
    brand: "Toyota",
    model: "Land Cruiser Accessible Edition",
    vehicleYear: 2023,
    color: "White",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
    gallery: [
      "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
      "/21.jpeg",
      "/11.jpeg",
      "/14.jpeg",
      "/16.jpeg",
      "/20.jpeg",
      "/23.jpeg",
      "/27.jpeg",
      "/30.jpeg",
      "/accessible-vehicle-interior.jpg",
      "/hydraulic-ramp-operation.jpg",
      "/wheelchair-secure-system.jpg",
      "/accessible-safari-viewing.jpg"
    ],
    capacity: "4 passengers plus wheelchair space and driver",
    pricePerDay: 300,
    priceCurrency: "USD",
    description:
      "Experience the wonders of East Africa with our fully accessible wheelchair friendly safari vehicle, designed to ensure everyone can enjoy unforgettable safari adventures. This disability safari car features a hydraulic lift system, secure wheelchair restraints, and spacious interior configurations. Our specially trained drivers understand accessibility needs and provide assistance throughout your journey. From the plains of Kenya to the hills of Rwanda, our inclusive safari transport makes African wildlife encounters accessible to all travelers regardless of mobility requirements.",
    metaTitle: "Wheelchair Accessible Safari Vehicle Kenya | Disability Safari Car $300/day",
    metaDescription:
      "Rent wheelchair accessible safari vehicle with hydraulic lift & trained driver from $300/day. Inclusive safari experiences for travelers with mobility challenges.",
    keywords: [
      "wheelchair accessible vehicle",
      "disability safari car",
      "accessible vehicle rental",
      "inclusive safari transport",
      "wheelchair accessible safari",
      "handicap accessible safari vehicle",
      "mobility friendly car hire",
      "accessible tourism East Africa",
      "disabled traveler transport",
      "adaptive safari vehicle",
      "accessible wildlife viewing",
      "inclusive travel East Africa"
    ],
    ideal:
      "Inclusive safari experiences for travelers with mobility challenges, accessible family vacations, disability-friendly tours, and barrier-free wildlife viewing across East Africa",
    features: [
      "Automatic hydraulic wheelchair ramp",
      "Dedicated secure wheelchair area with locking system",
      "Wide access doors with minimal thresholds",
      "Multiple safety harnesses and restraint systems",
      "Accessible environmental controls and communication",
      "Driver trained in disability assistance and first aid",
      "Adjustable seating configurations",
      "Accessible storage compartments",
      "Emergency evacuation equipment",
      "Communication aids for hearing impaired"
    ],
    specifications: {
      engine: "3.5L V6 Petrol Engine",
      transmission: "Automatic Transmission",
      fuelType: "Petrol/Diesel options available",
      driveType: "4WD",
      luggage: "Accessible storage with easy reach compartments",
      fuelEfficiency: "Approximately 13L/100km",
      seats: 5,
      doors: 5
    },
    extras: {
      "Trained Caregiver Assistant": "$60/day",
      "Medical Equipment (Oxygen etc.)": "On request",
      "Sign Language Guide": "$80/day",
      "Accessibility-Focused Route Planning": "$75 one-time"
    },
    fleetGalleries: {
      fleet1: [
        "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
        "/21.jpeg",
        "/11.jpeg",
        "/14.jpeg",
        "/16.jpeg"
      ],
      fleet2: [
        "/20.jpeg",
        "/23.jpeg",
        "/27.jpeg",
        "/30.jpeg",
        "/accessible-vehicle-interior.jpg"
      ],
      fleet3: [
        "/f846fc25-7931-4b3d-88fe-5821009cf861.jpg",
        "/5f43c43d-f971-471a-9122-2606eec7288d.jpg",
        "/357fad81-2bbd-40fd-a21c-6063182cb5f9.jpg",
        "/c4fdf160-9705-42e7-92e5-2e8e145406e0.jpg",
        "/1d4b068a-3c99-4055-8496-78e638eb1011.jpg",
        "/1db4e549-90a4-430a-aad5-9e69d3aaabea.jpg",
        "/d083bbb5-1eee-4883-8f58-5042517ae372.jpg",
        "/8834c197-3b9a-437a-a329-ed18fa2e0b29.jpg",
        "/eb6c6118-e854-4489-afa8-b9ec6d1497cb.jpg",
        "/916520f3-e8f9-4d6c-81a5-2b7055e822c9.jpg",
        "/c9e8dbd5-d16a-414c-a61a-e7bfa8014ab2.jpg"
      ]
    },
    aggregateRating: { ratingValue: 5.0, reviewCount: 47 },
    destinations: [
      "Masai Mara National Reserve",
      "Amboseli National Park",
      "Nairobi National Park",
      "Lake Nakuru National Park"
    ],
    useCases: ["accessible", "inclusive-tour", "guided", "family"],
    relatedSlugs: ["family-safari-minivan", "toyota-landcruiser"],
    available: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. FAMILY SAFARI MINIVAN WITH POP-UP ROOF
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "family-safari-minivan",
    name: "Family Safari Minivan with Pop-up Roof",
    slug: "family-safari-minivan",
    type: "Minivan",
    brand: "Toyota",
    model: "Hiace Safari Edition",
    vehicleYear: 2023,
    color: "White",
    image: "/2424ad9a-143e-4d19-a86e-3082e845c6ea.jpg",
    gallery: [
      "/6aa2209d-03d4-4345-bb36-c0d0dacad380.jpg",
      "/79bf4c9c-22d8-4bdd-bef6-76a88e0628f3.jpg",
      "/18c27b2c-2140-471c-a1cf-1b58df255c0c.jpg",
      "/b7e62c35-9f1e-4140-ab4a-fcfe18e7eea1.jpg",
      "/2047d157-e31a-4f9e-8771-afd37abe204a.jpg",
      "/van-storage-capacity-showcase.jpg",
      "/minivan-road-trip-scene.jpg"
    ],
    capacity: "7 passengers plus driver with configurable seating",
    pricePerDay: 200,
    priceCurrency: "USD",
    description:
      "Travel in spacious comfort with our family safari minivan, the ideal group vehicle rental for exploring East Africa. Perfect for family adventures or small group tours, this safari minibus features a pop-up roof for exceptional game viewing and ample interior space for everyone. With modern amenities, excellent fuel efficiency, and versatile seating configurations, our minivan hire provides the perfect balance of practicality and comfort for discovering Kenya's coast, Tanzania's northern circuit, Rwanda's cultural sites, and Uganda's natural wonders.",
    metaTitle: "Family Safari Minivan Kenya | Group Vehicle Hire $200/day",
    metaDescription:
      "Rent family safari minivan with pop-up roof & AC from $200/day. Perfect for group tours and family adventures in Kenya, Tanzania, Rwanda & Uganda. 7-passenger capacity.",
    keywords: [
      "family safari van",
      "group vehicle rental",
      "minivan hire East Africa",
      "safari minibus",
      "family tour vehicle rental",
      "pop-up roof minivan",
      "group safari transport",
      "budget safari vehicle",
      "East Africa minivan hire",
      "family adventure vehicle",
      "small group safari van",
      "comfortable tour minibus",
      "economic safari transport"
    ],
    ideal:
      "Family safaris with children, small group tours, budget-conscious travelers, educational trips, and comfortable road trips across East Africa's diverse destinations",
    features: [
      "Pop-up roof with 360-degree game viewing platform",
      "Dual-zone air conditioning throughout cabin",
      "Multiple USB charging ports for all rows",
      "Comfortable reclining seats with ample legroom",
      "Large panoramic windows for optimal viewing",
      "Entertainment system with screens and connectivity",
      "Rear storage compartment with easy access",
      "Child seat anchor points throughout",
      "Sunroof for additional light and ventilation",
      "Privacy glass for enhanced comfort"
    ],
    specifications: {
      engine: "2.4L 4-Cylinder Turbo Diesel",
      transmission: "6-Speed Manual Transmission",
      fuelType: "Diesel",
      driveType: "2WD (RWD)",
      luggage: "Spacious rear storage compartment with roof rack option",
      fuelEfficiency: "Excellent 12L/100km making it economical for long trips",
      seats: 7,
      doors: 5
    },
    extras: {
      "Child Safety Seats": "$10/day each",
      "Large Capacity Cooler Box": "Free",
      "Additional Driver": "$30/day",
      "Unlimited Mileage": "Available for long-term rentals"
    },
    fleetGalleries: {
      fleet1: [
        "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275",
        "/safari-minivan-interior-spacious.jpg",
        "/minivan-popup-roof-open.jpg",
        "/family-van-seating-configuration.jpg",
        "/minivan-game-viewing-position.jpg"
      ],
      fleet2: [
        "/van-storage-capacity-showcase.jpg",
        "/minivan-road-trip-scene.jpg",
        "/family-minivan-2-exterior.jpg",
        "/family-minivan-2-interior.jpg",
        "/family-minivan-2-popup-roof.jpg"
      ],
      fleet3: [
        "/family-minivan-3-exterior.jpg",
        "/family-minivan-3-interior.jpg",
        "/family-minivan-3-storage.jpg",
        "/family-minivan-3-family.jpg",
        "/family-minivan-3-safari.jpg"
      ]
    },
    aggregateRating: { ratingValue: 4.7, reviewCount: 211 },
    destinations: [
      "Masai Mara National Reserve",
      "Amboseli National Park",
      "Tsavo East & West",
      "Nairobi National Park",
      "Lake Nakuru National Park"
    ],
    useCases: ["family", "group", "budget-safari", "airport-transfer"],
    relatedSlugs: ["toyota-landcruiser", "toyota-prado", "wheelchair-accessible-vehicle"],
    available: true
  }
]