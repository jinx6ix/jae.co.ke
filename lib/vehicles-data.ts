export interface Vehicle {
  id: number
  slug: string
  name: string
  image: string
  description: string
  capacity: string
  features: string[]
  pricePerDay: number
  ideal: string
  specifications: {
    engine: string
    transmission: string
    fuelType: string
    luggage: string
    fuelEfficiency?: string
  }
  gallery: string[]
  extras?: {
    [key: string]: string
  }
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    slug: "toyota-landcruiser",
    name: "Toyota Landcruiser",
    image: "https://ik.imagekit.io/jinx/travel/6-1536x776%20(2).png?updatedAt=1750087071508",
    description:
      "The ultimate safari vehicle with exceptional off-road capabilities and reliability. Perfect for navigating the rugged terrain of East Africa's national parks and reserves.",
    capacity: "7 passengers",
    features: ["4WD", "Pop-up roof", "Charging ports", "Cooler box", "First aid kit", "Spare tire"],
    pricePerDay: 200,
    ideal: "Perfect for game drives and rough terrain",
    specifications: {
      engine: "4.5L 1HZ",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Large capacity",
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/6-1536x776%20(2).png?updatedAt=1750087071508",
      "https://ik.imagekit.io/jinx/travel/safari-vehicle-on-african-savanna.jpg",
      "/landcruiser-interior-dashboard.jpg",
      "/landcruiser-pop-up-roof-open.jpg",
      "/landcruiser-luggage-space.jpg",
    ],
    metaTitle: "Toyota Landcruiser Hire | 4x4 Safari Vehicle Rental East Africa",
    metaDescription:
      "Rent a Toyota Landcruiser for your East African safari. Reliable 4x4 with pop-up roof, perfect for game drives in Kenya, Tanzania, Rwanda, and Uganda.",
    keywords: [
      "Toyota Landcruiser rental",
      "4x4 safari vehicle",
      "Kenya car hire",
      "safari vehicle rental",
      "landcruiser hire East Africa",
    ],
  },
  {
    id: 2,
    slug: "toyota-prado",
    name: "Toyota Prado",
    image: "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
    description:
      "Comfortable and reliable SUV perfect for family safaris and city tours. Combines luxury with capability for an enjoyable travel experience.",
    capacity: "5 passengers",
    features: ["4WD", "Air conditioning", "GPS navigation", "Bluetooth", "Safety features", "USB charging"],
    pricePerDay: 200,
    ideal: "Great for families and comfortable touring",
    specifications: {
      engine: "3.0L Turbo",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Medium capacity",
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
      "/toyota-prado-interior.jpg",
      "/toyota-prado-dashboard-gps.jpg",
      "/toyota-prado-seats-comfort.jpg",
    ],
    metaTitle: "Toyota Prado Hire | Comfortable SUV Rental East Africa",
    metaDescription:
      "Rent a Toyota Prado for family safaris and tours. Comfortable 4WD SUV with GPS and air conditioning for Kenya, Tanzania, Rwanda, and Uganda travel.",
    keywords: ["Toyota Prado rental", "family safari vehicle", "SUV hire East Africa", "comfortable safari car"],
  },
  {
    id: 3,
    slug: "luxury-roof-top-camping",
    name: "Luxury Roof Top Camping",
    image: "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024",
    description:
      "Experience the wild with luxury camping setup on your vehicle roof. Sleep under the stars while staying safe and comfortable with premium camping equipment.",
    capacity: "4 passengers",
    features: ["Roof tent", "Camping gear", "Solar power", "Kitchenette", "Bedding included", "Cooking equipment"],
    pricePerDay: 200,
    ideal: "Perfect for adventurous camping safaris",
    specifications: {
      engine: "4.0L V6",
      transmission: "Manual/Auto",
      fuelType: "Diesel",
      luggage: "Camping equipment included",
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024",
      "/roof-top-tent-open-at-sunset.jpg",
      "/camping-vehicle-interior-kitchenette.jpg",
      "/roof-tent-interior-bedding.jpg",
    ],
    metaTitle: "Luxury Roof Top Camping Vehicle | Safari Camping Car Rental",
    metaDescription:
      "Rent a luxury roof top camping vehicle for your East African adventure. Includes tent, camping gear, and solar power for an unforgettable safari experience.",
    keywords: [
      "roof top camping vehicle",
      "safari camping car",
      "overland vehicle rental",
      "camping safari East Africa",
    ],
  },
  {
    id: 4,
    slug: "photography-converted-vehicle",
    name: "Photography Converted Vehicle",
    image:
      "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309",
    description:
      "Specially modified vehicle with photography equipment and optimal viewing angles. Designed for professional photographers and serious wildlife enthusiasts.",
    capacity: "6 passengers",
    features: [
      "Camera mounts",
      "Bean bags",
      "Extended roof",
      "Charging stations",
      "Storage compartments",
      "Stabilization equipment",
    ],
    pricePerDay: 250,
    ideal: "Designed for professional photography",
    specifications: {
      engine: "4.2L Diesel",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Photography gear storage",
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309",
      "/photography-safari-vehicle-camera-mounts.jpg",
      "/safari-vehicle-extended-roof-for-photography.jpg",
      "/vehicle-interior-camera-equipment-storage.jpg",
    ],
    metaTitle: "Photography Safari Vehicle | Specialized Camera Car Rental",
    metaDescription:
      "Rent a photography-converted safari vehicle with camera mounts, bean bags, and extended roof. Perfect for wildlife photography in East Africa.",
    keywords: [
      "photography safari vehicle",
      "camera car rental",
      "wildlife photography vehicle",
      "safari photography equipment",
    ],
  },
  {
    id: 5,
    slug: "wheelchair-accessible-vehicle",
    name: "Wheelchair Accessible Vehicle",
    image:
      "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
    description:
      "Fully accessible vehicle ensuring everyone can enjoy safari adventures. Features hydraulic lift, secure wheelchair restraints, and trained drivers for safe and comfortable travel.",
    capacity: "4 passengers + wheelchair",
    features: [
      "Wheelchair ramp",
      "Secure wheelchair area",
      "Easy access",
      "Safety harnesses",
      "Accessible controls",
      "Trained driver included",
    ],
    pricePerDay: 300,
    ideal: "Inclusive safari experiences for all",
    specifications: {
      engine: "3.5L V6",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Accessible storage",
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
      "/accessible-safari-wheelchair.jpg",
      "/wheelchair-accessible-vehicle-ramp.jpg",
      "/accessible-safari-vehicle-interior-wheelchair-spac.jpg",
    ],
    metaTitle: "Wheelchair Accessible Safari Vehicle | Disability-Friendly Car Rental",
    metaDescription:
      "Rent a wheelchair accessible safari vehicle with hydraulic lift and trained driver. Inclusive safari experiences in Kenya, Tanzania, Rwanda, and Uganda.",
    keywords: [
      "wheelchair accessible vehicle",
      "disability safari car",
      "accessible vehicle rental",
      "inclusive safari transport",
    ],
  },
  {
    id: 6,
    slug: "family-safari-minivan",
    name: "Family Safari Minivan",
    image: "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275",
    description:
      "Spacious and comfortable minivan perfect for family safaris and group travel. Features pop-up roof for game viewing and ample space for everyone.",
    capacity: "7 passengers + driver",
    features: [
      "Pop-up roof for game viewing",
      "AC throughout",
      "Charging ports",
      "Comfortable seating",
      "Large windows",
      "Entertainment system",
    ],
    pricePerDay: 200,
    ideal: "Family safaris and small group tours",
    specifications: {
      engine: "2.4L 4-cylinder",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Rear storage compartment",
      fuelEfficiency: "12L/100km",
    },
    extras: {
      childSeats: "Available upon request (+$10/day)",
      coolerBox: "Included free of charge",
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275",
      "/safari-minivan-interior-spacious.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    metaTitle: "Family Safari Minivan | Group Vehicle Rental East Africa",
    metaDescription:
      "Rent a spacious family safari minivan with pop-up roof and AC. Perfect for group tours in Kenya, Tanzania, Rwanda, and Uganda.",
    keywords: ["family safari van", "group vehicle rental", "minivan hire East Africa", "safari minibus"],
  },
]
