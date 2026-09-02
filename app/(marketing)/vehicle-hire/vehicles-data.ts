// lib/vehicles-data.ts
export type Vehicle = {
  id: string
  name: string
  slug: string
  image: string
  capacity: string
  specifications: { luggage: string }
  description: string
  pricePerDay: string
}

export const vehicles: Vehicle[] = [
  {
    id: "landcruiser-prado",
    name: "Toyota Land Cruiser Prado TX",
    slug: "toyota-landcruiser-prado",
    image: "/vehicles/landcruiser-prado.jpg",
    capacity: "5 passengers",
    specifications: { luggage: "4 large bags" },
    description: "The ultimate 4x4 safari vehicle for East African adventures. Features pop-up roof for optimal game viewing, climate control AC, and legendary Toyota reliability. Perfect safari vehicle for Masai Mara, Serengeti, and remote park exploration with comfortable seating and excellent visibility.",
    pricePerDay: "95"
  },
  {
    id: "landcruiser-78",
    name: "Toyota Land Cruiser 78 Series",
    slug: "landcruiser-78-series",
    image: "/vehicles/landcruiser-78.jpg",
    capacity: "6 passengers",
    specifications: { luggage: "6 medium bags" },
    description: "Extended safari vehicle with extra seating and storage capacity. Heavy-duty 4x4 system with reinforced chassis, perfect for group safaris and long-distance overland journeys. This safari vehicle handles the toughest African terrain with ease while maintaining passenger comfort.",
    pricePerDay: "120"
  },
  {
    id: "safari-van",
    name: "Toyota Hiace Safari Van",
    slug: "safari-minivan",
    image: "/vehicles/safari-van.jpg",
    capacity: "7 passengers",
    specifications: { luggage: "7 small bags" },
    description: "Comfortable and cost-effective safari vehicle ideal for airport transfers, city tours, and shorter safari circuits in Kenya and Tanzania. Features raised roof for better visibility and comfortable seating. A reliable safari vehicle for family adventures and budget-conscious travelers.",
    pricePerDay: "80"
  },
  {
    id: "rooftop-tent-4x4",
    name: "4x4 Land Cruiser with Rooftop Tent",
    slug: "4x4-rooftop-tent",
    image: "/vehicles/rooftop-tent.jpg",
    capacity: "4 passengers",
    specifications: { luggage: "Camping gear included" },
    description: "Complete overland safari vehicle fully equipped for camping adventures. Includes rooftop tent, refrigerator, cooking gear, and recovery equipment. The ultimate self-drive safari vehicle for independent travelers wanting to explore East Africa's wildest places at their own pace.",
    pricePerDay: "110"
  },
  {
    id: "accessible-van",
    name: "Wheelchair Accessible Safari Van",
    slug: "accessible-van",
    image: "/vehicles/accessible-van.jpg",
    capacity: "1 wheelchair + 4 passengers",
    specifications: { luggage: "3 medium bags" },
    description: "Specially modified safari vehicle with hydraulic ramp access, wheelchair securement systems, and trained assistance drivers. Maintains all essential safari vehicle features while providing barrier-free access. Perfect for inclusive travel and ensuring everyone can experience East Africa's wildlife.",
    pricePerDay: "130"
  },
  {
    id: "luxury-range-rover",
    name: "Range Rover Sport Luxury",
    slug: "range-rover-sport",
    image: "/vehicles/range-rover.jpg",
    capacity: "4 passengers",
    specifications: { luggage: "3 large bags" },
    description: "Premium luxury safari vehicle with leather seats, onboard WiFi, advanced climate control, and superior comfort features. This high-end safari vehicle combines off-road capability with executive comfort, perfect for luxury safaris, special occasions, and discerning travelers seeking the ultimate safari vehicle experience.",
    pricePerDay: "180"
  }
]