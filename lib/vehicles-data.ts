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
    name: "Toyota Landcruiser 4x4 Safari Vehicle",
    image: "/1b436e43-e979-4d81-93e1-972fbee500dd.jpg",
    description:
      "Experience the ultimate East African safari adventure with our rugged Toyota Landcruiser hire. This legendary 4WD vehicle rental combines exceptional off-road capabilities with proven reliability, making it the perfect choice for navigating Kenya's challenging terrain, Tanzania's vast savannas, Rwanda's volcanic hills, and Uganda's diverse landscapes. Specially equipped for safari vehicle rental with a pop-up roof for optimal wildlife viewing, this Landcruiser hire ensures you won't miss a single moment of your game drives. Our meticulously maintained fleet offers the perfect balance of durability and comfort for your East African expedition.",
    capacity: "7 passengers with ample legroom",
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
    pricePerDay: 200,
    ideal: "Perfect for extended game drives, rough terrain exploration, and multi-day safari expeditions across East Africa's national parks and reserves",
    specifications: {
      engine: "4.5L 1HZ Turbo Diesel Engine",
      transmission: "5-Speed Manual Transmission",
      fuelType: "Diesel",
      luggage: "Large capacity roof rack and rear storage for all safari gear",
      fuelEfficiency: "Approximately 14L/100km in mixed conditions"
    },
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
    extras: {
      safariGuide: "Professional guide available (+$80/day)",
      campingEquipment: "Full camping gear package (+$50/day)",
      satellitePhone: "Emergency communication device (+$30/day)",
      childSeats: "Various sizes available (+$10/day)",
      additionalDriver: "Second driver included (+$40/day)"
    },
    metaTitle: "Toyota Landcruiser Hire & Rental | Premium 4x4 Safari Vehicle for East Africa Safaris",
    metaDescription:
      "Book our reliable Toyota Landcruiser 4x4 safari vehicle rental for unforgettable game drives in Kenya, Tanzania, Rwanda, and Uganda. Features pop-up roof, 7-passenger capacity, and off-road capability. Perfect Landcruiser hire for family safaris and adventure tours.",
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
      "adventure vehicle hire",
      "Tanzania safari car",
      "Uganda Rwanda vehicle rental"
    ]
  },
  {
    id: 2,
    slug: "toyota-prado",
    name: "Toyota Prado Luxury SUV",
    image: "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
    description:
      "Discover the perfect blend of luxury and capability with our Toyota Prado rental service. This premium SUV offers exceptional comfort for family safaris while maintaining the rugged reliability needed for East Africa's diverse terrain. With advanced 4WD capabilities, plush interior appointments, and modern amenities, our Toyota Prado provides a superior travel experience whether you're exploring city attractions or venturing into national parks. Experience the ultimate in comfortable touring with this versatile and dependable SUV hire.",
    capacity: "5 passengers in premium comfort",
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
    pricePerDay: 200,
    ideal: "Excellent for family safaris, luxury touring, business travel, and comfortable exploration of both urban and rural destinations across East Africa",
    specifications: {
      engine: "3.0L Turbo Diesel Engine with 250hp",
      transmission: "6-Speed Automatic Transmission",
      fuelType: "Diesel",
      luggage: "Medium capacity with 60/40 split folding rear seats",
      fuelEfficiency: "Approximately 11L/100km highway driving"
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905",
      "/toyota-prado-interior.jpg",
      "/toyota-prado-dashboard-gps.jpg",
      "/toyota-prado-seats-comfort.jpg",
      "/toyota-prado-exterior-sunset.jpg",
      "/toyota-prado-cargo-space.jpg",
      "/toyota-prado-off-road.jpg"
    ],
    extras: {
      wifiHotspot: "Mobile internet device (+$15/day)",
      premiumInsurance: "Full coverage protection (+$25/day)",
      airportTransfer: "Complimentary with 7+ day rental",
      childSeats: "Premium models available (+$15/day)"
    },
    metaTitle: "Toyota Prado Rental | Luxury SUV Hire for Family Safaris in East Africa",
    metaDescription:
      "Rent a Toyota Prado luxury SUV for comfortable family safaris and tours across Kenya, Tanzania, Rwanda, and Uganda. Features 4WD, GPS, air conditioning, and premium comfort for your East Africa adventure.",
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
      "business travel vehicle",
      "Tanzania Uganda car hire",
      "modern SUV safari"
    ]
  },
  {
    id: 3,
    slug: "luxury-roof-top-camping",
    name: "Luxury Roof Top Camping Safari Vehicle",
    image: "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024",
    description:
      "Elevate your safari experience with our luxury roof top camping vehicle—the ultimate overland adventure solution for East Africa. This specially converted camping safari car allows you to sleep safely above the ground while enjoying unparalleled views of the African wilderness. Complete with premium camping equipment, solar power systems, and kitchen facilities, this vehicle transforms into a mobile boutique hotel. Experience the magic of sleeping under the stars while maintaining comfort and security in remote locations across Kenya, Tanzania, Rwanda, and Uganda.",
    capacity: "4 passengers with rooftop sleeping for 2-3",
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
    pricePerDay: 200,
    ideal: "Perfect for adventurous camping safaris, overland expeditions, self-drive adventures, and immersive wilderness experiences across East Africa",
    specifications: {
      engine: "4.0L V6 Diesel Engine",
      transmission: "Automatic/Manual options available",
      fuelType: "Diesel",
      luggage: "Dedicated storage for all camping equipment included",
      fuelEfficiency: "Approximately 16L/100km with full load"
    },
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
    extras: {
      campingGuide: "Experienced camping assistant (+$70/day)",
      additionalTent: "Ground tent for extra guests (+$30/day)",
      photographyPackage: "Camera gear included (+$40/day)",
      guidedItinerary: "Custom camping route planning (+$50)"
    },
    metaTitle: "Luxury Roof Top Camping Vehicle Rental | Safari Camping Car for East Africa Adventures",
    metaDescription:
      "Rent a luxury roof top camping vehicle for unforgettable overland adventures in East Africa. Complete with tent, solar power, kitchenette, and premium camping gear for the ultimate safari camping experience in Kenya, Tanzania, Rwanda, and Uganda.",
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
      "adventure vehicle with tent",
      "wilderness camping transport",
      "solar powered safari vehicle",
      "off-grid camping rental"
    ]
  },
  {
    id: 4,
    slug: "photography-converted-vehicle",
    name: "Professional Photography Safari Vehicle",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309",
    description:
      "Capture breathtaking wildlife moments with our specially modified photography safari vehicle, designed exclusively for professional photographers and serious enthusiasts. This camera car rental features an extended roof for unobstructed 360-degree shooting, multiple camera mounting points, and specialized stabilization equipment. Whether you're photographing the Great Migration in Tanzania, mountain gorillas in Rwanda, or big cats in Kenya, our photography-converted vehicle provides the perfect platform for exceptional wildlife imagery with maximum comfort and stability.",
    capacity: "6 passengers with dedicated photographer seating",
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
    pricePerDay: 250,
    ideal: "Specifically designed for professional wildlife photography, bird watching tours, documentary filming, and serious photography expeditions across East Africa",
    specifications: {
      engine: "4.2L Turbo Diesel Engine",
      transmission: "5-Speed Manual Transmission",
      fuelType: "Diesel",
      luggage: "Specialized photography gear storage with climate control",
      fuelEfficiency: "Approximately 15L/100km with equipment load"
    },
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
    extras: {
      photographyGuide: "Professional photographer guide (+$120/day)",
      equipmentRental: "Full-frame cameras and lenses (+$80-200/day)",
      editingWorkshop: "On-safari editing sessions (+$60/day)",
      backupService: "Daily image backup and storage (+$40/day)"
    },
    metaTitle: "Photography Safari Vehicle Rental | Specialized Camera Car for Wildlife Photography in East Africa",
    metaDescription:
      "Rent a professional photography-converted safari vehicle with extended roof, camera mounts, and stabilization equipment. Perfect for wildlife photography in Kenya's Masai Mara, Tanzania's Serengeti, Rwanda's Volcanoes, and Uganda's national parks.",
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
      "professional camera platform",
      "bird photography vehicle",
      "documentary film vehicle",
      "photography expedition transport"
    ]
  },
  {
    id: 5,
    slug: "wheelchair-accessible-vehicle",
    name: "Wheelchair Accessible Safari Landcruiser",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
    description:
      "Experience the wonders of East Africa with our fully accessible wheelchair friendly safari vehicle, designed to ensure everyone can enjoy unforgettable safari adventures. This disability safari car features a hydraulic lift system, secure wheelchair restraints, and spacious interior configurations. Our specially trained drivers understand accessibility needs and provide assistance throughout your journey. From the plains of Kenya to the hills of Rwanda, our inclusive safari transport makes African wildlife encounters accessible to all travelers regardless of mobility requirements.",
    capacity: "4 passengers plus wheelchair space and driver",
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
    pricePerDay: 300,
    ideal: "Inclusive safari experiences for travelers with mobility challenges, accessible family vacations, disability-friendly tours, and barrier-free wildlife viewing across East Africa",
    specifications: {
      engine: "3.5L V6 Petrol Engine",
      transmission: "Automatic Transmission",
      fuelType: "Petrol/Diesel options available",
      luggage: "Accessible storage with easy reach compartments",
      fuelEfficiency: "Approximately 13L/100km"
    },
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
    extras: {
      careAssistant: "Trained caregiver available (+$60/day)",
      medicalEquipment: "Oxygen, etc. available on request",
      signLanguageGuide: "For hearing impaired guests (+$80/day)",
      customItinerary: "Accessibility-focused route planning (+$75)"
    },
    metaTitle: "Wheelchair Accessible Safari Vehicle Rental | Disability-Friendly Car Hire for East Africa Safaris",
    metaDescription:
      "Rent a wheelchair accessible safari vehicle with hydraulic lift, trained driver, and accessibility features. Inclusive safari experiences in Kenya, Tanzania, Rwanda, and Uganda for travelers with mobility challenges.",
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
      "special needs safari transport",
      "barrier-free vehicle rental",
      "inclusive travel East Africa"
    ]
  },
  {
    id: 6,
    slug: "family-safari-minivan",
    name: "Family Safari Minivan with Pop-up Roof",
    image: "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275",
    description:
      "Travel in spacious comfort with our family safari minivan, the ideal group vehicle rental for exploring East Africa. Perfect for family adventures or small group tours, this safari minibus features a pop-up roof for exceptional game viewing and ample interior space for everyone. With modern amenities, excellent fuel efficiency, and versatile seating configurations, our minivan hire provides the perfect balance of practicality and comfort for discovering Kenya's coast, Tanzania's northern circuit, Rwanda's cultural sites, and Uganda's natural wonders.",
    capacity: "7 passengers plus driver with configurable seating",
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
    pricePerDay: 200,
    ideal: "Family safaris with children, small group tours, budget-conscious travelers, educational trips, and comfortable road trips across East Africa's diverse destinations",
    specifications: {
      engine: "2.4L 4-Cylinder Turbo Diesel",
      transmission: "6-Speed Manual Transmission",
      fuelType: "Diesel",
      luggage: "Spacious rear storage compartment with roof rack option",
      fuelEfficiency: "Excellent 12L/100km making it economical for long trips"
    },
    extras: {
      childSeats: "Various sizes available (+$10/day each)",
      coolerBox: "Large capacity included free of charge",
      extraDriver: "Additional driver included (+$30/day)",
      unlimitedMileage: "Available for long-term rentals"
    },
    gallery: [
      "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275",
      "/safari-minivan-interior-spacious.jpg",
      "/minivan-popup-roof-open.jpg",
      "/family-van-seating-configuration.jpg",
      "/minivan-game-viewing-position.jpg",
      "/van-storage-capacity-showcase.jpg",
      "/minivan-road-trip-scene.jpg"
    ],
    metaTitle: "Family Safari Minivan Rental | Group Vehicle Hire for East Africa Tours and Safaris",
    metaDescription:
      "Rent a spacious family safari minivan with pop-up roof and AC for comfortable group tours in Kenya, Tanzania, Rwanda, and Uganda. Perfect for family adventures, small groups, and budget-friendly safari experiences across East Africa.",
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
      "economic safari transport",
      "spacious family vehicle"
    ]
  }
]