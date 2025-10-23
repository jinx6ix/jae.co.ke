import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, Users, Clock, Car, Wifi } from "lucide-react"

export const metadata: Metadata = {
  title: "Wheelchair Accessible Vehicles | East Africa Accessible Travel",
  description:
    "Specialized wheelchair accessible vehicles for safe and comfortable travel across East Africa. Fully equipped vans with ramps, lifts, and trained drivers.",
  keywords: [
    "wheelchair vehicles Africa",
    "accessible travel Kenya",
    "disabled transport Tanzania",
    "accessible safari vehicles",
    "wheelchair friendly vans",
  ],
}

const vehicleFeatures = [
  {
    icon: Shield,
    title: "Safety Certified",
    description: "All vehicles meet international safety standards with secure wheelchair restraint systems"
  },
  {
    icon: Users,
    title: "Trained Drivers",
    description: "Professional drivers trained in accessibility needs and wheelchair securement"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Available for airport transfers, tours, and custom itineraries anytime"
  },
  {
    icon: Car,
    title: "Modern Fleet",
    description: "Well-maintained vehicles with regular safety inspections and updates"
  }
]

const vehicles = [
  {
    id: "standard-van",
    name: "Standard Accessible Van",
    type: "Travel & Tours",
    capacity: "1 wheelchair + 3 passengers",
    features: ["Side-entry ramp", "Manual wheelchair securement", "AC", "Comfortable seating", "Luggage space"],
    image: "/images.jpg",
    price: "$85/day",
    bestFor: ["City tours", "Airport transfers", "Short trips"]
  },
  {
    id: "premium-accessible",
    name: "Premium Accessible Vehicle",
    type: "Travel & Tours", 
    capacity: "2 wheelchairs + 4 passengers",
    features: ["Hydraulic lift", "Automatic securement", "Spacious interior", "Climate control", "Entertainment system"],
    image: "/car-van-1536x776 (1).webp",
    price: "$120/day",
    bestFor: ["Family tours", "Comfort travel", "Multi-day trips"]
  },
  {
    id: "safari-accessible",
    name: "Safari Accessible Vehicle",
    type: "Travel & Tours",
    capacity: "1 wheelchair + 5 passengers",
    features: ["Pop-up roof", "All-terrain capability", "Camera hatches", "Cooler box", "Raised suspension"],
    image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
    price: "$150/day",
    bestFor: ["Game drives", "National parks", "Adventure tours"]
  },
  {
    id: "work-van",
    name: "Accessible Work Van",
    type: "Work & Transport",
    capacity: "1 wheelchair + 2 passengers + cargo",
    features: ["Large cargo space", "Side ramp access", "Tool storage", "Secure compartments", "Work lighting"],
    image: "/IMG-20240807-WA0023.jpeg.340x255_q85_crop.jpg",
    price: "$75/day",
    bestFor: ["Business transport", "Equipment hauling", "Work commutes"]
  },
  {
    id: "executive-van",
    name: "Executive Accessible Van",
    type: "Work & Transport",
    capacity: "1 wheelchair + 3 passengers",
    features: ["Luxury interior", "WiFi connectivity", "Leather seats", "Conference setup", "Privacy partition"],
    image: "/car-van-1536x776 (1).webp", 
    price: "$180/day",
    bestFor: ["Business meetings", "Corporate events", "Executive transport"]
  },
  {
    id: "multi-purpose-van",
    name: "Multi-Purpose Accessible Van",
    type: "Work & Transport",
    capacity: "1-2 wheelchairs + flexible seating",
    features: ["Convertible interior", "Removable seats", "Large storage", "Versatile configuration", "All-purpose use"],
    image: "/cd.jpg",
    price: "$95/day",
    bestFor: ["Various needs", "Group transport", "Flexible requirements"]
  }
]

export default function WheelchairVehiclePage() {
  const travelVehicles = vehicles.filter(vehicle => vehicle.type === "Travel & Tours")
  const workVehicles = vehicles.filter(vehicle => vehicle.type === "Work & Transport")

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Wheelchair Accessible Vehicles</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          Experience East Africa without limitations. Our fleet of specially equipped wheelchair accessible vehicles 
          ensures safe, comfortable, and convenient travel for all mobility needs. Choose from our travel tour vehicles 
          or work transport solutions.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16 grid gap-8 md:grid-cols-4">
        {vehicleFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <feature.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Travel & Tour Vehicles */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Travel & Tour Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Perfect for safari adventures and tourist exploration</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {travelVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Work & Transport Vehicles */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Work & Transport Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Ideal for business, work, and daily transport needs</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="rounded-2xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Need a Custom Vehicle Solution?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          Contact us for specialized vehicle requirements, long-term rentals, or custom modifications to meet your specific needs.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get Custom Quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/transportation-services">View Transportation Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function VehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10]">
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
          {vehicle.type}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {vehicle.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{vehicle.name}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{vehicle.capacity}</p>
        
        <div className="mb-4">
          <h4 className="mb-2 font-semibold text-sm">Best For:</h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.bestFor.map((use: string, index: number) => (
              <span key={index} className="rounded-full bg-secondary px-2 py-1 text-xs">
                {use}
              </span>
            ))}
          </div>
        </div>

        <ul className="mb-6 space-y-2">
          {vehicle.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href={`/vehicles/${vehicle.id}`}>View Details</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/book-now?vehicle=${vehicle.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}