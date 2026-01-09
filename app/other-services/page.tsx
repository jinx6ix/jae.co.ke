import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Car, Map, Plane, Building, Mountain, Palmtree } from "lucide-react"

// ENHANCED SEO-OPTIMIZED TRANSPORTATION SCHEMA — FULL RICH RESULTS + IMAGEOBJECT + UPDATED URLS
const transportSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions – Transportation Services Kenya & East Africa",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "image": "https://www.jaetravel.co.ke/14.jpeg",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressRegion": "Nairobi"
      },
      "description": "Professional vehicle hire, airport transfers, safari transport, and group transportation services in Kenya, Tanzania, Rwanda & Uganda.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 2. WebPage + Breadcrumb (corrected URL)
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/other-services/#webpage",
      "url": "https://www.jaetravel.co.ke/other-services",
      "name": "Transportation Services Kenya & East Africa | Vehicle Hire, Airport Transfers & Safari Transport",
      "description": "Reliable car hire, airport transfers, safari vehicles and group transport across Kenya, Tanzania, Rwanda and Uganda. Book 4x4 safari Land Cruisers and chauffeur services.",
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/other-services/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/other-services/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Transportation Services", "item": "https://www.jaetravel.co.ke/other-services" }
      ]
    },

    // 3. Service Catalog with Offers + Enhanced ImageObject
    {
      "@type": "Service",
      "serviceType": "Transportation & Vehicle Hire Services",
      "provider": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "areaServed": ["Kenya", "Tanzania", "Rwanda", "Uganda"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "East Africa Transportation & Vehicle Rental Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Airport Transfers Kenya, Tanzania, Rwanda & Uganda",
              "description": "24/7 airport pickup and drop-off with flight monitoring and meet & greet service",
              "image": {
                "@type": "ImageObject",
                "url": "https://www.jaetravel.co.ke/waaa.jpg",
                "width": "1200",
                "height": "800",
                "name": "Nairobi Airport Transfer Service JKIA",
                "description": "Professional driver waiting at Jomo Kenyatta International Airport with name sign"
              }
            },
            "priceCurrency": "USD",
            "price": "35"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Safari Tour Transport Kenya & Tanzania",
              "description": "4x4 Land Cruisers with pop-up roof ideal for game drives in Maasai Mara and Serengeti",
              "image": {
                "@type": "ImageObject",
                "url": "https://www.jaetravel.co.ke/14.jpeg",
                "width": "1200",
                "height": "800",
                "name": "Safari Vehicle Maasai Mara Kenya",
                "description": "Custom 4x4 safari Land Cruiser with pop-up roof for optimal wildlife viewing"
              }
            },
            "priceCurrency": "USD",
            "price": "120",
            "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "per day" }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Group & Corporate Transport East Africa",
              "description": "Minibuses and coaches for large groups, conferences and tour packages",
              "image": {
                "@type": "ImageObject",
                "url": "https://www.jaetravel.co.ke/waaa.jpg",
                "width": "1200",
                "height": "800",
                "name": "Group Transport Minibus Kenya"
              }
            },
            "priceCurrency": "USD",
            "price": "150",
            "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "per day" }
          }
        ]
      }
    },

    // 4. FAQPage (optimized questions for search intent)
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer airport transfers in Nairobi?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — 24/7 service from JKIA and Wilson Airport with flight monitoring and meet & greet." }
        },
        {
          "@type": "Question",
          "name": "Are safari vehicles included with drivers?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — all safari vehicles come with experienced English-speaking driver-guides." }
        },
        {
          "@type": "Question",
          "name": "Can I book transport for Rwanda gorilla trekking?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we provide reliable 4x4 transfers from Kigali to Volcanoes National Park." }
        },
        {
          "@type": "Question",
          "name": "Do you have wheelchair-accessible vehicles?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we have adapted vehicles with ramps and space for wheelchairs." }
        }
      ]
    }
  ]
}

export const metadata: Metadata = {
  title: "Transportation Services Kenya & East Africa | Car Hire, Airport Transfers & Safari Vehicles",
  description:
    "Professional vehicle hire and transportation services in Kenya, Tanzania, Rwanda & Uganda. Airport transfers Nairobi, 4x4 safari Land Cruiser rental, self-drive cars, chauffeur services and group transport across East Africa.",
  keywords: [
    "car hire Kenya",
    "airport transfers Nairobi",
    "safari vehicle rental Kenya",
    "4x4 rental Tanzania",
    "self drive car hire Nairobi",
    "chauffeur services Kenya",
    "airport transfer JKIA",
    "airport transfer Mombasa",
    "safari land cruiser hire",
    "Maasai Mara safari transport",
    "Serengeti tour transport",
    "Kigali airport transfers",
    "gorilla trekking transport Rwanda",
    "Uganda gorilla trekking transport",
    "group transport Kenya",
    "luxury car hire East Africa",
    "vehicle rental East Africa",
    "tour transport Tanzania",
    "Bwindi transport services",
    "East Africa transportation services",
  ],
  alternates: {
    canonical: "https://www.jaetravel.co.ke/other-services",
  },
  openGraph: {
    title: "Transportation Services Kenya & East Africa | JAE Travel Expeditions",
    description: "Reliable car hire, airport transfers and safari transport across Kenya, Tanzania, Rwanda & Uganda.",
    url: "https://www.jaetravel.co.ke/other-services",
    type: "website",
    images: [
      {
        url: "https://www.jaetravel.co.ke/14.jpeg",
        width: 1200,
        height: 800,
        alt: "Safari Land Cruiser in Maasai Mara Kenya",
      },
    ],
  },
}

const services = [
  {
    id: "airport-transfers",
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable pickup and dropoff services from all major airports in Kenya, Tanzania, Rwanda and Uganda",
    features: ["Flight monitoring", "Meet & greet", "Luggage assistance", "24/7 service"],
    image: "/1WhatsApp Image 2025-11-18 at 4.42.53 PM.jpeg",
    price: "From $35/trip",
    vehicles: ["Sedans", "Vans", "Minibuses", "Luxury Cars"]
  },
  {
    id: "safari-transport",
    icon: Mountain,
    title: "Safari Tour Transport",
    description: "Specialized vehicles for national parks and game reserves across East Africa",
    features: ["Pop-up roof vehicles", "Experienced guides", "Cooler boxes", "All-terrain capability"],
    image: "/14.jpeg",
    price: "From $120/day",
    vehicles: ["4x4 Land Cruisers", "Safari Vans", "Custom Safari Vehicles"]
  },
  {
    id: "group-transport",
    icon: Palmtree,
    title: "Group Transportation",
    description: "Comfortable transport for large groups and tour packages throughout East Africa",
    features: ["Spacious seating", "Luggage capacity", "AC throughout", "Entertainment systems"],
    image: "/waaa.jpg",
    price: "From $150/day",
    vehicles: ["Minibuses", "Coaches", "Custom Buses"]
  },
  {
    id: "city-tours",
    icon: Map,
    title: "City Tour Transport",
    description: "Explore urban attractions with knowledgeable local drivers across East African cities",
    features: ["Local guides", "Flexible itineraries", "Multiple stops", "Cultural insights"],
    image: "/WhatsApp Image 2025-11-18 at 4.42.53 PM (2).jpeg",
    price: "From $50/half-day",
    vehicles: ["Comfortable Sedans", "Spacious SUVs", "Luxury Vans"]
  }
]

const destinations = [
  {
    name: "Kenya",
    trips: "Safari Tours",
    image: "/kenya-safari-landscape.jpg"
  },
  {
    name: "Tanzania", 
    trips: "Wildlife Safaris",
    image: "/tanzania-serengeti.jpg"
  },
  {
    name: "Rwanda",
    trips: "City & Cultural Tours",
    image: "/rwanda-mountain-gorillas.jpg"
  },
  {
    name: "Uganda",
    trips: "Gorilla Trekking",
    image: "/uganda-wildlife.jpg"
  },
]

export default function OtherServicesPage() {
  return (
    <>
      {/* ENHANCED RICH RESULTS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transportSchema) }}
      />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Transportation Services Across East Africa</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Your reliable transportation partner across East Africa. From self-drive car rentals to comprehensive tour 
            transport solutions, we ensure safe and comfortable journeys to all major destinations in Kenya, Tanzania, Rwanda, and Uganda.
          </p>
        </div>

        {/* Introduction Paragraphs - Keyword-optimized content */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              <strong>Car hire Kenya</strong> services form the backbone of East African travel, providing the freedom 
              to explore at your own pace while ensuring reliability and safety. Our comprehensive 
              <strong>vehicle rental Africa</strong> solutions cater to every type of traveler, from budget-conscious 
              backpackers to luxury safari enthusiasts seeking premium <strong>4x4 rental Tanzania</strong> options 
              for navigating the rugged terrain of the Serengeti and Ngorongoro Crater.
            </p>
            
            <p>
              For business travelers and tourists alike, our <strong>airport transfers Nairobi</strong> and 
              <strong>chauffeur services Kenya</strong> offer seamless connectivity between major hubs and city centers. 
              Whether you're arriving at Jomo Kenyatta International Airport or Kilimanjaro International Airport, 
              our professional drivers ensure timely and comfortable transfers to your destination. Our 
              <strong>airport transfer Mombasa</strong> services also provide convenient access to Kenya's stunning 
              coastal resorts and historical sites.
            </p>

            <p>
              The heart of our operation lies in <strong>safari transportation Kenya</strong> and 
              <strong>Tanzania tour transport</strong> services. We specialize in providing rugged 
              <strong>safari vehicle rental</strong> options equipped for East Africa's challenging terrain. 
              Our fleet includes custom-built <strong>safari land cruiser hire</strong> vehicles with pop-up roofs 
              for optimal game viewing in the <strong>Maasai Mara safari vehicles</strong> and 
              <strong>Serengeti tour transport</strong> circuits.
            </p>

            <p>
              Beyond the classic safari destinations, we provide essential <strong>tour transport Rwanda</strong> 
              services for exploring Kigali and accessing Volcanoes National Park for gorilla trekking. Similarly, 
              our <strong>Uganda gorilla trekking transport</strong> solutions ensure comfortable journeys to 
              Bwindi Impenetrable Forest. These <strong>Bwindi transport services</strong> are specially designed 
              to handle the mountainous terrain while providing maximum comfort for this once-in-a-lifetime adventure.
            </p>

            <p>
              Our commitment to <strong>East Africa vehicle rental</strong> excellence extends to 
              <strong>luxury car hire East Africa</strong> options for discerning travelers and 
              <strong>group transportation Tanzania</strong> solutions for larger parties. Whether you're planning 
              a corporate retreat, family reunion, or educational tour, our diverse fleet and experienced team 
              can accommodate groups of any size while maintaining the highest standards of safety and comfort.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">Our Transportation Services</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Regional Coverage Section */}
        <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">
              Comprehensive East Africa Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Kenya & Tanzania Transport</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From <strong>self drive car hire Nairobi</strong> to <strong>Kigali airport transfers</strong>, 
                  we cover all major East African destinations. Our <strong>safari transportation Kenya</strong> 
                  services include specialized vehicles for the Masai Mara, Amboseli, Tsavo, and Samburu ecosystems, 
                  while our <strong>Tanzania tour transport</strong> solutions serve the Serengeti, Ngorongoro, 
                  Tarangire, and Lake Manyara circuits with equal expertise.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Rwanda & Uganda Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our <strong>tour transport Rwanda</strong> network connects Kigali with Volcanoes National Park 
                  and Nyungwe Forest, while <strong>Uganda gorilla trekking transport</strong> services provide 
                  reliable access to Bwindi and Mgahinga gorilla parks. We understand the unique requirements of 
                  primate tracking adventures and provide vehicles suited to the challenging terrain of these 
                  precious conservation areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-4xl font-bold">Popular Destinations</h2>
            <p className="mt-2 text-muted-foreground">We provide transportation to all major tourist destinations across East Africa</p>
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
                  alt={`${destination.name} ${destination.trips} - Transportation Services`}
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
            We offer competitive rates and reliable service for all your travel needs, from <strong>car hire Kenya</strong> 
            to comprehensive <strong>safari transportation Kenya</strong> packages and efficient 
            <strong>airport transfers Nairobi</strong> services.
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
   </> 
  )
}

function ServiceCard({ service }: { service: any }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10]">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={`${service.title} in East Africa - ${service.description}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={service.id === "airport-transfers"}
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