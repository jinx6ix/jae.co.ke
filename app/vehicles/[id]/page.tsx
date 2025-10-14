import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Shield, Users, Car } from "lucide-react"

const vehicles = {
  "standard-van": {
    name: "Standard Accessible Van",
    type: "Travel & Tours",
    capacity: "1 wheelchair + 3 passengers",
    features: ["Side-entry ramp", "Manual wheelchair securement", "AC", "Comfortable seating", "Luggage space"],
    image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
    price: "$85/day",
    description: "Perfect for city tours and airport transfers with comfortable accessibility features."
  },
  "premium-accessible": {
    name: "Premium Accessible Vehicle",
    type: "Travel & Tours", 
    capacity: "2 wheelchairs + 4 passengers",
    features: ["Hydraulic lift", "Automatic securement", "Spacious interior", "Climate control", "Entertainment system"],
    image: "/vehicles/premium-accessible.jpg",
    price: "$120/day",
    description: "Luxury accessible vehicle for family tours and comfortable long-distance travel."
  },
  "safari-accessible": {
    name: "Safari Accessible Vehicle",
    type: "Travel & Tours",
    capacity: "1 wheelchair + 5 passengers",
    features: ["Pop-up roof", "All-terrain capability", "Camera hatches", "Cooler box", "Raised suspension"],
    image: "/vehicles/safari-accessible.jpg",
    price: "$150/day",
    description: "Specially designed for safari adventures with full accessibility features."
  },
  "work-van": {
    name: "Accessible Work Van",
    type: "Work & Transport",
    capacity: "1 wheelchair + 2 passengers + cargo",
    features: ["Large cargo space", "Side ramp access", "Tool storage", "Secure compartments", "Work lighting"],
    image: "/vehicles/work-van.jpg",
    price: "$75/day",
    description: "Versatile work van with ample storage and accessibility features."
  },
  "executive-van": {
    name: "Executive Accessible Van",
    type: "Work & Transport",
    capacity: "1 wheelchair + 3 passengers",
    features: ["Luxury interior", "WiFi connectivity", "Leather seats", "Conference setup", "Privacy partition"],
    image: "/vehicles/executive-van.jpg", 
    price: "$180/day",
    description: "Executive-class vehicle for business meetings and corporate transport."
  },
  "multi-purpose-van": {
    name: "Multi-Purpose Accessible Van",
    type: "Work & Transport",
    capacity: "1-2 wheelchairs + flexible seating",
    features: ["Convertible interior", "Removable seats", "Large storage", "Versatile configuration", "All-purpose use"],
    image: "/vehicles/multi-purpose.jpg",
    price: "$95/day",
    description: "Flexible vehicle adaptable to various transportation needs."
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = vehicles[params.id as keyof typeof vehicles]
  
  if (!vehicle) {
    return {
      title: "Vehicle Not Found"
    }
  }

  return {
    title: `${vehicle.name} | East Africa Accessible Travel`,
    description: vehicle.description,
  }
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = vehicles[params.id as keyof typeof vehicles]

  if (!vehicle) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/wheelchair-vehicles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </Link>
        </Button>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Image
              src={vehicle.image || "/placeholder.svg"}
              alt={vehicle.name}
              width={600}
              height={400}
              className="rounded-2xl w-full"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                {vehicle.type}
              </span>
              <h1 className="font-serif text-4xl font-bold">{vehicle.name}</h1>
              <p className="mt-2 text-2xl font-bold text-primary">{vehicle.price}</p>
              <p className="mt-4 text-muted-foreground">{vehicle.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <Users className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold">Capacity</h3>
                <p className="text-sm text-muted-foreground">{vehicle.capacity}</p>
              </div>
              <div className="rounded-lg border p-4">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold">Safety</h3>
                <p className="text-sm text-muted-foreground">Certified & Insured</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold">Features</h3>
              <ul className="space-y-2">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href={`/book-now?vehicle=${params.id}`}>Book This Vehicle</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact for Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}