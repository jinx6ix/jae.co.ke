// app/vehicles/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users, Clock, Car, Wifi, Accessibility } from "lucide-react"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// Structured FAQ JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Wheelchair Accessible Vehicles | East Africa Accessible Travel",
    description:
      "Discover wheelchair accessible vehicles for rent in Kenya & Tanzania. Accessible safari vehicles, wheelchair vans, and mobility transport for disabled travelers. Safe, comfortable, and fully equipped.",
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
      "safari vehicles for wheelchair users",
      "adaptive vehicles East Africa",
      "handicap accessible cars Kenya",
      "inclusive travel vehicles Tanzania",
    ],
    openGraph: {
      title: "Wheelchair Accessible Vehicles in Kenya & Tanzania",
      description: "Rent accessible vans, safari vehicles & transport for disabled travelers in East Africa.",
      images: ["/og-wheelchair-vehicles.jpg"],
    },
    alternates: {
      canonical: "https://www.eastafricaaccessibletravel.com/vehicles",
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Static Data (Server-side only)
// ————————————————————————
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
    image: "/images/standard-van.jpg",
    alt: "Standard wheelchair accessible van for rent in Kenya and Tanzania",
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
    image: "/images/premium-van.webp",
    alt: "Premium wheelchair accessible vehicle for family tours in East Africa",
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
    image: "/images/safari-vehicle.jpeg",
    alt: "Safari wheelchair accessible vehicle for game drives in Maasai Mara and Serengeti",
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
    image: "/images/work-van.jpg",
    alt: "Accessible work van with cargo space for business use in East Africa",
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
    image: "/images/executive-van.webp",
    alt: "Executive wheelchair accessible van with WiFi and conference setup",
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
    image: "/images/multi-purpose-van.jpg",
    alt: "Multi-purpose wheelchair accessible van with flexible seating in Kenya",
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

// ————————————————————————
// Server Component: Page
// ————————————————————————
export default function WheelchairVehiclePage() {
  const travelVehicles = vehicles.filter(v => v.type === "Travel & Tours")
  const workVehicles = vehicles.filter(v => v.type === "Work & Transport")

  return (
    <div className="container mx-auto px-4 py-16">

      {/* Hero */}
      <header className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">
          Wheelchair Accessible Vehicles in East Africa
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-muted-foreground leading-relaxed">
          Explore Kenya and Tanzania with confidence using our fully equipped <strong>wheelchair accessible vehicles</strong>. 
          From <strong>accessible safari vehicles</strong> to <strong>wheelchair friendly vans</strong>, we provide safe, 
          comfortable <strong>mobility transport in Africa</strong> for disabled travelers. Rent a 
          <strong>wheelchair accessible landcruiser in Kenya</strong> or book <strong>disabled transport in Tanzania</strong> 
          — all with trained drivers and 24/7 support.
        </p>
      </header>

      {/* Features */}
      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-3">
          {vehicleFeatures.map((f, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Vehicles */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Travel & Tour Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Perfect for safaris, tours, and family adventures</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {travelVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Work Vehicles */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Work & Transport Vehicles</h2>
          <p className="mt-2 text-muted-foreground">Business, cargo, and daily mobility solutions</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to know about wheelchair accessible vehicles in East Africa</p>
        </div>
        <div className="space-y-8 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-2">{faq.question}</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold">Need a Custom Accessible Vehicle?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Long-term rental? Special modifications? Corporate fleet? Contact us for tailored <strong>accessible vehicle rental in East Africa</strong>.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get Custom Quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/transportation-services">View All Services</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}