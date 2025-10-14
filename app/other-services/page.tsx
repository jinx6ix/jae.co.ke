import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Car, Map, Plane, Building, Mountain, Palmtree } from "lucide-react"

export const metadata: Metadata = {
  title: "Transportation Services | Vehicle Hire & Tour Transport",
  description:
    "Reliable vehicle hiring and transportation services across East Africa. Self-drive cars, chauffeur services, and tour transport to all major destinations.",
  keywords: [
    "car hire Kenya",
    "Tanzania tour transport",
    "vehicle rental Africa",
    "airport transfers",
    "safari transportation",
  ],
}

const services = [
  {
    id: "self-drive",
    icon: Car,
    title: "Self-Drive Car Hire",
    description: "Rent well-maintained vehicles for your independent travel adventures",
    features: ["Comprehensive insurance", "24/7 road assistance", "Unlimited mileage", "Easy pickup/dropoff"],
    image: "/services/self-drive.jpg",
    price: "From $45/day",
    vehicles: ["Economy Cars", "SUVs", "4x4 Vehicles", "Luxury Cars"]
  },
  {
    id: "chauffeur-services",
    icon: Building,
    title: "Chauffeur Services",
    description: "Professional drivers for business meetings, events, and city tours",
    features: ["Professional drivers", "Time punctuality", "Multi-language support", "Luxury vehicles"],
    image: "/services/chauffeur.jpg",
    price: "From $60/day",
    vehicles: ["Sedans", "Luxury Cars", "Executive Vans", "SUVs"]
  },
  {
    id: "airport-transfers",
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable pickup and dropoff services from all major airports",
    features: ["Flight monitoring", "Meet & greet", "Luggage assistance", "24/7 service"],
    image: "/services/airport-transfer.jpg",
    price: "From $35/trip",
    vehicles: ["Sedans", "Vans", "Minibuses", "Luxury Cars"]
  },
  {
    id: "safari-transport",
    icon: Mountain,
    title: "Safari Tour Transport",
    description: "Specialized vehicles for national parks and game reserves",
    features: ["Pop-up roof vehicles", "Experienced guides", "Cooler boxes", "All-terrain capability"],
    image: "/services/safari-transport.jpg",
    price: "From $120/day",
    vehicles: ["4x4 Land Cruisers", "Safari Vans", "Custom Safari Vehicles"]
  },
  {
    id: "group-transport",
    icon: Palmtree,
    title: "Group Transportation",
    description: "Comfortable transport for large groups and tour packages",
    features: ["Spacious seating", "Luggage capacity", "AC throughout", "Entertainment systems"],
    image: "/services/group-transport.jpg",
    price: "From $150/day",
    vehicles: ["Minibuses", "Coaches", "Custom Buses"]
  },
  {
    id: "city-tours",
    icon: Map,
    title: "City Tour Transport",
    description: "Explore urban attractions with knowledgeable local drivers",
    features: ["Local guides", "Flexible itineraries", "Multiple stops", "Cultural insights"],
    image: "/services/city-tours.jpg",
    price: "From $50/half-day",
    vehicles: ["Comfortable Sedans", "Spacious SUVs", "Luxury Vans"]
  }
]

const destinations = [
  {
    name: "Kenya",
    trips: "Safari Tours",
    image: "/destinations/maasai-mara.jpg"
  },
  {
    name: "Tanzania", 
    trips: "Wildlife Safaris",
    image: "/destinations/serengeti.jpg"
  },
  {
    name: "Rwanda",
    trips: "City & Cultural Tours",
    image: "/destinations/kigali.jpg"
  },
  {
    name: "Uganda",
    trips: "Gorilla Trekking",
    image: "/destinations/bwindi.jpg"
  },

]

export default function OtherServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Transportation Services</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          Your reliable transportation partner across East Africa. From self-drive car rentals to comprehensive tour 
          transport solutions, we ensure safe and comfortable journeys to all major destinations.
        </p>
      </div>

      {/* Services Grid */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">Our Transportation Services</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Popular Destinations</h2>
          <p className="mt-2 text-muted-foreground">We provide transportation to all major tourist destinations</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              href={`/destinations/${destination.name.toLowerCase().replace(/[,\s]+/g, '-')}`}
              className="group relative aspect-[16/9] overflow-hidden rounded-2xl"
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="mb-2 text-xl font-bold text-white">{destination.name}</h3>
                <p className="text-white/80 text-sm">{destination.trips}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <div className="mb-16 rounded-2xl bg-muted/50 p-8 md:p-12">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold">How Our Service Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "Choose Service",
              description: "Select from self-drive, chauffeur, or tour transport options"
            },
            {
              step: "Book & Confirm",
              description: "Provide trip details and receive instant confirmation"
            },
            {
              step: "Enjoy Your Ride",
              description: "Relax while we handle all your transportation needs"
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-serif text-2xl font-bold text-primary-foreground">
                {index + 1}
              </div>
              <h3 className="mb-3 text-xl font-bold">{item.step}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready to Explore East Africa?</h2>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-pretty text-primary-foreground/90">
          Book your transportation today and experience seamless travel across Kenya, Tanzania, Rwanda, and Uganda. 
          We offer competitive rates and reliable service for all your travel needs.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Book Transportation</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground">
            <Link href="/wheelchair-vehicles">View Accessible Vehicles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: any }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10]">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {service.price}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <service.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 font-semibold text-sm">Available Vehicles:</h4>
          <div className="flex flex-wrap gap-2">
            {service.vehicles.map((vehicle: string, index: number) => (
              <span key={index} className="rounded-full bg-secondary px-2 py-1 text-xs">
                {vehicle}
              </span>
            ))}
          </div>
        </div>

        <ul className="mb-6 space-y-2">
          {service.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href={`/services/${service.id}`}>Service Details</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/book-now?service=${service.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}