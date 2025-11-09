import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, Users, Clock, Car, Wifi, Accessibility, Globe, Star, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Wheelchair Accessible Vehicles | East Africa Accessible Travel",
  description:
    "Discover our specialized wheelchair accessible vehicles for safe, comfortable travel across East Africa, including Kenya and Tanzania. Rent wheelchair friendly vans, accessible safari vehicles, and mobility transport solutions for disabled travelers. Fully equipped with ramps, lifts, and trained drivers for accessible tours and transportation services.",
  keywords: [
    "wheelchair vehicles Africa",
    "accessible travel Kenya",
    "disabled transport Tanzania",
    "accessible safari vehicles",
    "wheelchair friendly vans",
    "wheelchair accessible landcruiser in kenya",
    "accessible vehicle rental East Africa",
    "mobility transport Africa",
    "disability travel services",
    "accessible tours vehicles East Africa",
    "wheelchair accessible vehicles Kenya",
    "accessible vans for rent Tanzania",
    "disabled friendly transport East Africa",
    "safari vehicles for wheelchair users",
    "mobility scooters and vehicle rentals Africa",
    "adaptive vehicles East Africa",
    "handicap accessible cars Kenya",
    "inclusive travel vehicles Tanzania",
    "wheelchair lift vans Africa",
    "accessible transportation services East Africa",
  ],
}

const vehicleFeatures = [
  {
    icon: Shield,
    title: "Safety Certified Vehicles",
    description: "All our wheelchair accessible vehicles meet international safety standards, featuring secure wheelchair restraint systems, emergency exits, and regular maintenance checks to ensure reliable disabled transport in Tanzania and Kenya."
  },
  {
    icon: Users,
    title: "Expert Trained Drivers",
    description: "Our professional drivers are specially trained in accessibility needs, wheelchair securement, and assisting passengers with disabilities for a seamless accessible travel experience in Kenya and beyond."
  },
  {
    icon: Clock,
    title: "24/7 Vehicle Availability",
    description: "Our wheelchair friendly vans and accessible safari vehicles are available round-the-clock for airport transfers, custom tours, and emergency mobility transport across East Africa."
  },
  {
    icon: Car,
    title: "Modern Accessible Fleet",
    description: "A well-maintained fleet of wheelchair accessible landcruisers in Kenya and other vehicles, with regular safety inspections, updates, and features like air conditioning and spacious interiors for comfortable disability travel services."
  },
  {
    icon: Wifi,
    title: "Connected Travel",
    description: "Stay connected during your journey with built-in WiFi in select vehicles, perfect for business or leisure in accessible tours vehicles across East Africa."
  },
  {
    icon: Accessibility,
    title: "Full Accessibility Features",
    description: "Equipped with ramps, hydraulic lifts, and adaptive controls to support various mobility needs in wheelchair vehicles throughout Africa."
  }
]

const vehicles = [
  {
    id: "standard-van",
    name: "Standard Wheelchair Accessible Van",
    type: "Travel & Tours",
    capacity: "1 wheelchair + 3 passengers",
    features: ["Side-entry ramp for easy access", "Manual wheelchair securement system", "Air conditioning throughout", "Comfortable ergonomic seating", "Ample luggage space for tours"],
    description: "Our standard wheelchair accessible van is ideal for urban exploration and short trips in Kenya and Tanzania. This wheelchair friendly van provides reliable accessible vehicle rental in East Africa, ensuring smooth mobility transport for Africa travelers with disabilities.",
    image: "/images.jpg",
    alt: "Standard wheelchair accessible van for rent in East Africa",
    price: "$85/day",
    bestFor: ["City tours in Nairobi", "Airport transfers in Kenya", "Short sightseeing trips in Tanzania"]
  },
  {
    id: "premium-accessible",
    name: "Premium Wheelchair Accessible Vehicle",
    type: "Travel & Tours", 
    capacity: "2 wheelchairs + 4 passengers",
    features: ["Hydraulic lift for effortless boarding", "Automatic wheelchair securement", "Spacious interior design", "Advanced climate control system", "Built-in entertainment system with screens"],
    description: "Experience luxury in accessible travel with our premium vehicle, perfect for family groups exploring East Africa. This disabled transport option in Tanzania features top-tier amenities for comfortable wheelchair accessible tours and multi-day adventures.",
    image: "/car-van-1536x776 (1).webp",
    alt: "Premium wheelchair accessible vehicle for tours in Kenya and Tanzania",
    price: "$120/day",
    bestFor: ["Family vacation tours", "Comfort-focused long-distance travel", "Multi-day accessible safaris"]
  },
  {
    id: "safari-accessible",
    name: "Safari Wheelchair Accessible Vehicle",
    type: "Travel & Tours",
    capacity: "1 wheelchair + 5 passengers",
    features: ["Pop-up roof for wildlife viewing", "All-terrain 4x4 capability", "Special camera hatches", "Built-in cooler box for refreshments", "Raised suspension for rough terrains"],
    description: "Conquer the savannas with our specialized accessible safari vehicles, designed for wheelchair users on game drives in Kenya's national parks. This wheelchair accessible landcruiser in Kenya offers unmatched disability travel services for authentic African wildlife experiences.",
    image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
    alt: "Safari wheelchair accessible vehicle for game drives in East Africa",
    price: "$150/day",
    bestFor: ["Game drives in Maasai Mara", "National park explorations in Tanzania", "Adventure wildlife tours"]
  },
  {
    id: "work-van",
    name: "Accessible Work Van",
    type: "Work & Transport",
    capacity: "1 wheelchair + 2 passengers + cargo",
    features: ["Large cargo space for equipment", "Side ramp access for wheelchairs", "Secure tool storage compartments", "Reinforced secure compartments", "Interior work lighting system"],
    description: "For professional needs, our accessible work van provides reliable mobility transport in Africa, combining wheelchair accessibility with practical cargo space for business transport in Kenya and Tanzania.",
    image: "/IMG-20240807-WA0023.jpeg.340x255_q85_crop.jpg",
    alt: "Accessible work van for business transport in East Africa",
    price: "$75/day",
    bestFor: ["Business equipment hauling", "Daily work commutes in cities", "Professional transport needs"]
  },
  {
    id: "executive-van",
    name: "Executive Wheelchair Accessible Van",
    type: "Work & Transport",
    capacity: "1 wheelchair + 3 passengers",
    features: ["Luxury leather interior", "High-speed WiFi connectivity", "Premium leather seats", "Conference table setup", "Privacy partition for meetings"],
    description: "Elevate your corporate travel with our executive van, offering wheelchair accessible features alongside business amenities for disability travel services in East Africa's bustling cities.",
    image: "/car-van-1536x776 (1).webp", 
    alt: "Executive wheelchair accessible van for corporate use in Kenya",
    price: "$180/day",
    bestFor: ["Business meetings on the go", "Corporate events transport", "Executive-level mobility"]
  },
  {
    id: "multi-purpose-van",
    name: "Multi-Purpose Wheelchair Accessible Van",
    type: "Work & Transport",
    capacity: "1-2 wheelchairs + flexible seating",
    features: ["Convertible interior layout", "Removable seats for customization", "Large storage capacity", "Versatile configuration options", "All-purpose accessibility features"],
    description: "Adaptable for various needs, this multi-purpose van serves as an excellent accessible vehicle rental in East Africa, supporting both work and transport requirements for wheelchair users.",
    image: "/cd.jpg",
    alt: "Multi-purpose wheelchair accessible van for flexible use in Tanzania",
    price: "$95/day",
    bestFor: ["Mixed group transport", "Flexible work requirements", "Versatile daily needs"]
  }
]

const faqs = [
  {
    question: "What are wheelchair accessible vehicles and how do they work in East Africa?",
    answer: "Wheelchair accessible vehicles are specially modified vans and cars equipped with ramps, lifts, and securement systems to accommodate wheelchair users. In East Africa, including Kenya and Tanzania, these vehicles enable safe disabled transport for tours, safaris, and daily travel, ensuring inclusive mobility transport across diverse terrains."
  },
  {
    question: "How can I rent wheelchair accessible vehicles in Kenya?",
    answer: "Renting wheelchair accessible vehicles in Kenya is simple through East Africa Accessible Travel. Choose from our fleet including wheelchair accessible landcruisers, provide your requirements, and book online or via contact. We offer flexible rental periods for accessible travel in Kenya with trained drivers."
  },
  {
    question: "Are there accessible safari vehicles available for disabled travelers in Tanzania?",
    answer: "Yes, we provide accessible safari vehicles in Tanzania designed for wheelchair users, featuring pop-up roofs and all-terrain capabilities. These vehicles ensure comfortable game drives and national park visits as part of our disability travel services."
  },
  {
    question: "What features make your wheelchair friendly vans suitable for East Africa travel?",
    answer: "Our wheelchair friendly vans include side-entry ramps, hydraulic lifts, climate control, and secure restraint systems. They're built for East Africa's roads, supporting accessible tours vehicles in East Africa for both urban and rural adventures."
  },
  {
    question: "How much does accessible vehicle rental cost in East Africa?",
    answer: "Prices for accessible vehicle rental in East Africa start from $75/day for work vans up to $180/day for executive options. Rates include insurance and driver services, making them affordable for mobility transport in Africa."
  },
  {
    question: "Do you offer customized disability travel services with wheelchair vehicles?",
    answer: "Absolutely. We provide tailored disability travel services, including custom itineraries with wheelchair vehicles in Africa. Contact us for modifications or special requirements in accessible travel Kenya and Tanzania."
  }
]

export default function WheelchairVehiclePage() {
  const travelVehicles = vehicles.filter(vehicle => vehicle.type === "Travel & Tours")
  const workVehicles = vehicles.filter(vehicle => vehicle.type === "Work & Transport")

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Wheelchair Accessible Vehicles in East Africa</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          At East Africa Accessible Travel, we specialize in providing top-quality wheelchair accessible vehicles for seamless travel across Kenya, Tanzania, and beyond. Whether you're planning accessible safari vehicles for wildlife adventures or wheelchair friendly vans for city exploration, our fleet ensures safe, comfortable, and inclusive experiences. Discover wheelchair vehicles in Africa designed for all mobility needs, including disabled transport in Tanzania and accessible vehicle rental in East Africa. Our vehicles are equipped with modern features to support disability travel services, making every journey accessible and enjoyable.
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-center font-serif text-4xl font-bold">Why Choose Our Wheelchair Accessible Vehicles?</h2>
        <p className="mx-auto max-w-4xl text-muted-foreground leading-relaxed text-pretty">
          Traveling with mobility challenges shouldn't limit your East African adventures. Our wheelchair accessible vehicles, including specialized wheelchair accessible landcruisers in Kenya, provide reliable mobility transport in Africa. From accessible tours vehicles in East Africa to everyday transport solutions, we prioritize safety, comfort, and accessibility. Our services cater to tourists, business travelers, and locals seeking disabled friendly transport, ensuring you can explore national parks, cities, and rural areas without barriers.
        </p>
      </section>

      {/* Features Grid */}
      <div className="mb-16 grid gap-8 md:grid-cols-3 lg:grid-cols-3">
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
          <h2 className="font-serif text-4xl font-bold">Travel & Tour Wheelchair Accessible Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Explore East Africa's wonders with our accessible safari vehicles and tour vans, perfect for wheelchair users seeking adventure in Kenya and Tanzania. These vehicles support inclusive travel with features tailored for accessible tours vehicles in East Africa.</p>
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
          <h2 className="font-serif text-4xl font-bold">Work & Transport Wheelchair Accessible Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Reliable solutions for business and daily needs, our work vehicles provide disabled transport in Tanzania and Kenya with practical features for professional mobility transport in Africa.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Frequently Asked Questions About Wheelchair Accessible Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Find answers to common queries about our accessible vehicle rental in East Africa and disability travel services.</p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="mb-2 text-xl font-bold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="rounded-2xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready for Accessible Travel in East Africa?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          Whether you need wheelchair accessible vehicles for tours, work, or custom needs, we're here to help. Contact us for long-term rentals, modifications, or specialized mobility transport in Africa.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get Custom Quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/transportation-services">View All Services</Link>
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
          alt={vehicle.alt || vehicle.name}
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
        <p className="mb-4 text-muted-foreground">{vehicle.description}</p>
        
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