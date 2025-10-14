import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Car, Map, Plane, Building, Mountain, Palmtree } from "lucide-react"

const services = {
  "self-drive": {
    icon: Car,
    title: "Self-Drive Car Hire",
    description: "Rent well-maintained vehicles for your independent travel adventures",
    features: ["Comprehensive insurance", "24/7 road assistance", "Unlimited mileage", "Easy pickup/dropoff"],
    image: "/services/self-drive.jpg",
    price: "From $45/day",
    vehicles: ["Economy Cars", "SUVs", "4x4 Vehicles", "Luxury Cars"],
    details: "Enjoy the freedom of exploring East Africa at your own pace with our reliable self-drive vehicles."
  },
  "chauffeur-services": {
    icon: Building,
    title: "Chauffeur Services",
    description: "Professional drivers for business meetings, events, and city tours",
    features: ["Professional drivers", "Time punctuality", "Multi-language support", "Luxury vehicles"],
    image: "/services/chauffeur.jpg",
    price: "From $60/day",
    vehicles: ["Sedans", "Luxury Cars", "Executive Vans", "SUVs"],
    details: "Sit back and relax while our professional chauffeurs handle your transportation needs."
  },
  "airport-transfers": {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable pickup and dropoff services from all major airports",
    features: ["Flight monitoring", "Meet & greet", "Luggage assistance", "24/7 service"],
    image: "/services/airport-transfer.jpg",
    price: "From $35/trip",
    vehicles: ["Sedans", "Vans", "Minibuses", "Luxury Cars"],
    details: "Stress-free airport transfers with professional drivers and comfortable vehicles."
  },
  "safari-transport": {
    icon: Mountain,
    title: "Safari Tour Transport",
    description: "Specialized vehicles for national parks and game reserves",
    features: ["Pop-up roof vehicles", "Experienced guides", "Cooler boxes", "All-terrain capability"],
    image: "/services/safari-transport.jpg",
    price: "From $120/day",
    vehicles: ["4x4 Land Cruisers", "Safari Vans", "Custom Safari Vehicles"],
    details: "Experience wildlife safaris in specially equipped vehicles with expert guides."
  },
  "group-transport": {
    icon: Palmtree,
    title: "Group Transportation",
    description: "Comfortable transport for large groups and tour packages",
    features: ["Spacious seating", "Luggage capacity", "AC throughout", "Entertainment systems"],
    image: "/services/group-transport.jpg",
    price: "From $150/day",
    vehicles: ["Minibuses", "Coaches", "Custom Buses"],
    details: "Perfect for group tours, family vacations, and corporate events."
  },
  "city-tours": {
    icon: Map,
    title: "City Tour Transport",
    description: "Explore urban attractions with knowledgeable local drivers",
    features: ["Local guides", "Flexible itineraries", "Multiple stops", "Cultural insights"],
    image: "/services/city-tours.jpg",
    price: "From $50/half-day",
    vehicles: ["Comfortable Sedans", "Spacious SUVs", "Luxury Vans"],
    details: "Discover city attractions with our guided tour transportation services."
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = services[params.id as keyof typeof services]
  
  if (!service) {
    return {
      title: "Service Not Found"
    }
  }

  return {
    title: `${service.title} | East Africa Transportation`,
    description: service.description,
  }
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = services[params.id as keyof typeof services]
  const IconComponent = service?.icon || Car

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/other-services" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </Button>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              width={600}
              height={400}
              className="rounded-2xl w-full"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <IconComponent className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold">{service.title}</h1>
                <p className="mt-2 text-2xl font-bold text-primary">{service.price}</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{service.details}</p>

            <div>
              <h3 className="mb-3 text-lg font-bold">Available Vehicles</h3>
              <div className="flex flex-wrap gap-2">
                {service.vehicles.map((vehicle, index) => (
                  <span key={index} className="rounded-full bg-secondary px-3 py-1 text-sm">
                    {vehicle}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold">Service Features</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href={`/book-now?service=${params.id}`}>Book This Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact for Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}