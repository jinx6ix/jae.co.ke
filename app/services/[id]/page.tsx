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
    description: "Rent well-maintained vehicles for your independent travel adventures across East Africa",
    features: ["Comprehensive insurance", "24/7 road assistance", "Unlimited mileage", "Easy pickup/dropoff"],
    image: "/services/self-drive.jpg",
    price: "From $45/day",
    vehicles: ["Economy Cars", "SUVs", "4x4 Vehicles", "Luxury Cars"],
    details: "Enjoy the freedom of exploring East Africa at your own pace with our reliable self-drive vehicles.",
    keywords: [
      "self drive car hire Kenya",
      "car rental Nairobi",
      "4x4 rental Tanzania",
      "vehicle hire East Africa",
      "self drive safari Kenya",
      "car hire Mombasa",
      "rent a car Kenya",
      "self drive Uganda",
      "Tanzania car rental",
      "Rwanda vehicle hire"
    ]
  },
  "chauffeur-services": {
    icon: Building,
    title: "Chauffeur Services",
    description: "Professional drivers for business meetings, events, and city tours throughout East Africa",
    features: ["Professional drivers", "Time punctuality", "Multi-language support", "Luxury vehicles"],
    image: "/services/chauffeur.jpg",
    price: "From $60/day",
    vehicles: ["Sedans", "Luxury Cars", "Executive Vans", "SUVs"],
    details: "Sit back and relax while our professional chauffeurs handle your transportation needs.",
    keywords: [
      "chauffeur services Kenya",
      "executive car hire Nairobi",
      "luxury car hire Tanzania",
      "professional drivers East Africa",
      "corporate transport Kenya",
      "business car service",
      "luxury chauffeur Rwanda",
      "executive transport Uganda",
      "airport chauffeur service",
      "VIP transport East Africa"
    ]
  },
  "airport-transfers": {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable pickup and dropoff services from all major airports in Kenya, Tanzania, Rwanda and Uganda",
    features: ["Flight monitoring", "Meet & greet", "Luggage assistance", "24/7 service"],
    image: "/1WhatsApp Image 2025-11-18 at 4.42.53 PM.jpeg",
    price: "From $35/trip",
    vehicles: ["Sedans", "Vans", "Minibuses", "Luxury Cars"],
    details: "Stress-free airport transfers with professional drivers and comfortable vehicles.",
    keywords: [
      "airport transfers Nairobi",
      "airport transfer Mombasa",
      "Kigali airport transfers",
      "Kilimanjaro airport transport",
      "Entebbe airport transfers",
      "airport shuttle Kenya",
      "airport taxi Tanzania",
      "meet and greet service",
      "airport pickup Rwanda",
      "Uganda airport transfers"
    ]
  },
  "safari-transport": {
    icon: Mountain,
    title: "Safari Tour Transport",
    description: "Specialized vehicles for national parks and game reserves across East Africa",
    features: ["Pop-up roof vehicles", "Experienced guides", "Cooler boxes", "All-terrain capability"],
    image: "/14.jpeg",
    price: "From $120/day",
    vehicles: ["4x4 Land Cruisers", "Safari Vans", "Custom Safari Vehicles"],
    details: "Experience wildlife safaris in specially equipped vehicles with expert guides.",
    keywords: [
      "safari transportation Kenya",
      "Maasai Mara safari vehicles",
      "Serengeti tour transport",
      "safari land cruiser hire",
      "4x4 safari vehicle rental",
      "game drive vehicles Tanzania",
      "safari transport Rwanda",
      "Uganda gorilla trekking transport",
      "pop up roof vehicles",
      "safari van hire East Africa"
    ]
  },
  "group-transport": {
    icon: Palmtree,
    title: "Group Transportation",
    description: "Comfortable transport for large groups and tour packages throughout East Africa",
    features: ["Spacious seating", "Luggage capacity", "AC throughout", "Entertainment systems"],
    image: "/waaa.jpg",
    price: "From $150/day",
    vehicles: ["Minibuses", "Coaches", "Custom Buses"],
    details: "Perfect for group tours, family vacations, and corporate events.",
    keywords: [
      "group transportation Tanzania",
      "minibus hire Kenya",
      "tour bus rental East Africa",
      "group transport Rwanda",
      "Uganda group tours transport",
      "coach hire Kenya",
      "large group transportation",
      "school trip transport",
      "corporate group transport",
      "family safari transport"
    ]
  },
  "city-tours": {
    icon: Map,
    title: "City Tour Transport",
    description: "Explore urban attractions with knowledgeable local drivers across East African cities",
    features: ["Local guides", "Flexible itineraries", "Multiple stops", "Cultural insights"],
    image: "/WhatsApp Image 2025-11-18 at 4.42.53 PM (2).jpeg",
    price: "From $50/half-day",
    vehicles: ["Comfortable Sedans", "Spacious SUVs", "Luxury Vans"],
    details: "Discover city attractions with our guided tour transportation services.",
    keywords: [
      "city tour transport Nairobi",
      "Dar es Salaam city tours",
      "Kampala tour transport",
      "Kigali city tours",
      "urban transport Kenya",
      "city sightseeing vehicles",
      "cultural tour transport",
      "historical site transport",
      "city guide services",
      "urban adventure transport"
    ]
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
    title: `${service.title} Kenya Tanzania | East Africa Transportation Services`,
    description: `${service.description}. Professional ${service.title.toLowerCase()} services across Kenya, Tanzania, Rwanda and Uganda. Book online today.`,
    keywords: service.keywords,
    openGraph: {
      title: `${service.title} | East Africa Transportation`,
      description: service.description,
      images: [service.image],
    },
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

            {/* Additional SEO Paragraphs */}
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our <strong>{service.title.toLowerCase()}</strong> services are available across all major 
                <strong> East Africa destinations</strong> including Kenya, Tanzania, Rwanda, and Uganda. 
                Whether you need reliable transportation for business meetings in Nairobi, safari adventures 
                in the Masai Mara, or city exploration in Kigali, we provide professional service with 
                well-maintained vehicles and experienced drivers.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Each vehicle in our <strong>{service.title.toLowerCase()}</strong> fleet undergoes regular 
                maintenance and safety checks to ensure your journey is smooth and secure. Our commitment to 
                excellence means you can focus on your travel experience while we handle all your 
                <strong> transportation needs throughout East Africa</strong>. From airport pickups to 
                multi-day safari expeditions, we've got you covered.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Booking our <strong>{service.title.toLowerCase()}</strong> service is straightforward and 
                convenient. Simply provide your travel details, and we'll arrange the perfect vehicle with 
                all necessary amenities. Our flexible booking options and competitive pricing make us the 
                preferred choice for <strong>transportation services across East Africa</strong>.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Safety is our top priority in all our <strong>{service.title.toLowerCase()}</strong> 
                operations. All our drivers are thoroughly vetted, professionally trained, and have 
                extensive knowledge of local routes and conditions. We maintain comprehensive insurance 
                coverage and implement strict safety protocols to ensure your peace of mind throughout 
                your journey.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Whether you're a solo traveler, family, or large group, our <strong>
                {service.title.toLowerCase()}</strong> solutions can be customized to meet your specific 
                requirements. We understand that every journey is unique, and we're committed to providing 
                personalized service that exceeds your expectations for <strong>transportation in East Africa</strong>.
              </p>
            </div>

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

            {/* Regional Coverage Section */}
            <div className="bg-muted/30 p-6 rounded-2xl">
              <h3 className="mb-3 text-lg font-bold">East Africa Coverage</h3>
              <p className="text-muted-foreground mb-4">
                Our <strong>{service.title.toLowerCase()}</strong> services cover all major destinations across 
                <strong> Kenya, Tanzania, Rwanda, and Uganda</strong>. From urban centers to remote safari locations, 
                we provide reliable transportation solutions tailored to your specific needs and itinerary.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Kenya & Tanzania</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Nairobi, Mombasa, Kisumu</li>
                    <li>• Maasai Mara, Amboseli, Tsavo</li>
                    <li>• Dar es Salaam, Arusha</li>
                    <li>• Serengeti, Ngorongoro, Zanzibar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Rwanda & Uganda</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Kigali, Butare, Gisenyi</li>
                    <li>• Volcanoes National Park</li>
                    <li>• Kampala, Entebbe, Jinja</li>
                    <li>• Bwindi, Queen Elizabeth Park</li>
                  </ul>
                </div>
              </div>
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