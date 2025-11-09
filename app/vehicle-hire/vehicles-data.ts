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
      name: "Toyota Land Cruiser Prado",
      slug: "toyota-landcruiser-prado",
      image: "/vehicles/landcruiser-prado.jpg",
      capacity: "5 passengers",
      specifications: { luggage: "4 large bags" },
      description: "The ultimate 4x4 for East African safaris. Pop-up roof, AC, and rugged reliability for Maasai Mara and Serengeti.",
      pricePerDay: "95"
    },
    {
      id: "landcruiser-78",
      name: "Land Cruiser 78 Series",
      slug: "landcruiser-78-series",
      image: "/vehicles/landcruiser-78.jpg",
      capacity: "6 passengers",
      specifications: { luggage: "6 medium bags" },
      description: "Extended version with extra seating and storage. Ideal for group safaris and long-distance travel.",
      pricePerDay: "120"
    },
    {
      id: "safari-van",
      name: "Safari Minivan",
      slug: "safari-minivan",
      image: "/vehicles/safari-van.jpg",
      capacity: "7 passengers",
      specifications: { luggage: "7 small bags" },
      description: "Comfortable and affordable for airport transfers, city tours, and short safaris in Kenya and Tanzania.",
      pricePerDay: "80"
    },
    {
      id: "rooftop-tent-4x4",
      name: "4x4 with Rooftop Tent",
      slug: "4x4-rooftop-tent",
      image: "/vehicles/rooftop-tent.jpg",
      capacity: "4 passengers",
      specifications: { luggage: "Camping gear included" },
      description: "Fully equipped for overland camping. Includes tent, fridge, and cooking gear for self-drive adventures.",
      pricePerDay: "110"
    },
    {
      id: "accessible-van",
      name: "Wheelchair Accessible Van",
      slug: "accessible-van",
      image: "/vehicles/accessible-van.jpg",
      capacity: "1 wheelchair + 4 passengers",
      specifications: { luggage: "3 medium bags" },
      description: "Ramp access, securement system, and trained driver. Perfect for inclusive travel in East Africa.",
      pricePerDay: "130"
    },
    {
      id: "luxury-range-rover",
      name: "Range Rover Sport",
      slug: "range-rover-sport",
      image: "/vehicles/range-rover.jpg",
      capacity: "4 passengers",
      specifications: { luggage: "3 large bags" },
      description: "Premium comfort with leather seats, WiFi, and climate control. For executive transfers and luxury safaris.",
      pricePerDay: "180"
    }
  ]