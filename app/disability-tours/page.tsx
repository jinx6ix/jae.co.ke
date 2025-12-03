// File: app/disability-tours/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { disabilityTours } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accessibility, Check, Heart, Shield, Users, Award, MapPin, Calendar, Globe, Phone, Star, Clock, Map } from "lucide-react"

export const metadata: Metadata = {
  title: "Wheelchair Accessible Safari Tours for People with Disabilities | Wheelchair-Friendly Kenya, Tanzania, Rwanda & Uganda",
  description:
    "Jae Travel offers fully wheelchair accessible safaris in East Africa — wheelchair-adapted vehicles, barrier-free lodges, trained guides, and personalized itineraries for travelers with mobility, visual, or hearing impairments. Book your inclusive Kenya, Tanzania, Rwanda, or Uganda wheelchair accessible safari today.",
  keywords: [
    "wheelchair accessible safari",
    "wheelchair accessible tours and safaris",
    "accessible kenya safari",
    "disability tours kenya",
    "wheelchair friendly safari",
    "accessible travel africa",
    "special needs safari",
    "mobility impaired kenya tours",
    "adapted safari vehicles",
    "barrier-free kenya travel",
    "inclusive safari experiences",
    "disabled travel kenya",
    "accessible masai mara safari",
    "wheelchair safari tanzania",
    "accessible gorilla trekking rwanda",
    "disability-friendly uganda safari",
    "accessible serengeti safari",
    "inclusive east africa tours",
    "kenya wheelchair safari",
    "tanzania accessible safari",
    "rwanda accessible gorilla tours",
    "uganda mobility impaired safari"
  ],
  openGraph: {
    title: "Wheelchair Accessible Safari Tours for People with Disabilities | JaeTravel Expeditions",
    description:
      "Experience East Africa's wildlife with dignity and comfort. Wheelchair accessible safari vehicles, inclusive lodges, and expert support for travelers with disabilities.",
    images: ["/accessible-safari-wheelchair.jpg"],
    url: "https://www.jaetravel.co.ke/disability-tours",
    type: "website",
  },
  alternates: {
    canonical: "https://jaetravel.co.ke/disability-tours",
  },
  robots: "index, follow",
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Jae Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "Customer Service",
        "areaServed": ["KE", "TZ", "RW", "UG", "US", "GB", "DE", "JP", "CN"],
        "availableLanguage": ["English", "Swahili", "German", "Japanese"]
      },
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://www.jaetravel.co.ke/tours" },
        { "@type": "ListItem", "position": 3, "name": "Wheelchair Accessible Safari Tours", "item": "https://www.jaetravel.co.ke/disability-tours" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/disability-tours",
      "url": "https://www.jaetravel.co.ke/disability-tours",
      "name": "Wheelchair Accessible Safari Tours for People with Disabilities",
      "description": "Wheelchair accessible safari experiences in Kenya, Tanzania, Rwanda, and Uganda with adapted vehicles, inclusive lodges, and trained guides.",
      "inLanguage": "en-KE"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of disabilities can you accommodate on safari?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accommodate wheelchair users, travelers with limited mobility, visual impairments, hearing impairments, and cognitive disabilities. Every wheelchair accessible safari begins with a detailed pre-trip consultation to assess equipment, medical needs, and activity preferences."
          }
        },
        {
          "@type": "Question",
          "name": "Are your safari vehicles truly wheelchair accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our custom 4x4 vehicles feature hydraulic lifts, wide side-entry doors, secure wheelchair tie-downs, and pop-up roofs for unobstructed wildlife viewing. We also provide portable all-terrain tracked wheelchairs for rugged areas. Our wheelchair accessible safari vehicles meet international accessibility standards."
          }
        },
        {
          "@type": "Question",
          "name": "Can wheelchair users participate in gorilla trekking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. In Rwanda and Uganda, we coordinate with national parks to secure special permits, shorter accessible routes, and sedan chair carriers. Guests remain in control and can view gorillas at close range safely. Our wheelchair accessible safari packages include all necessary adaptive equipment."
          }
        },
        {
          "@type": "Question",
          "name": "Are bathrooms and lodges fully accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All partner lodges feature roll-in showers, grab bars, lowered sinks, and wide doorways. During game drives, we schedule stops at accessible restrooms or provide portable privacy screens and facilities. Every wheelchair accessible safari includes accommodation that meets ADA standards."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer accessible Serengeti migration safaris?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our Tanzania wheelchair accessible safari experiences follow the Great Migration with wheelchair-adapted vehicles and stays at barrier-free camps. Witness river crossings and vast herds without leaving your secure seat in our specially designed wheelchair accessible safari vehicles."
          }
        }
      ]
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "author": { "@type": "Person", "name": "David Chen" },
      "datePublished": "2025-08-01",
      "reviewBody": "As a full-time wheelchair user, I never imagined seeing lions in the Masai Mara. JaeTravel made it seamless — from the hydraulic lift vehicle to the accessible tented camp. Their wheelchair accessible safari exceeded all expectations. A life-changing experience.",
      "publisher": { "@type": "Organization", "name": "JaeTravel Expeditions" },
      "itemReviewed": 
      {
        "@type": "TouristTrip",
        "name": "Wheelchair Accessible Safari Experience",
        "url": "https://jaetravel.co.ke/disability-tours"
      }
    },
    {
      "@type": "TouristTrip",
      "name": "Wheelchair Accessible Masai Mara Safari for Wheelchair Users",
      "description": "4-day wheelchair accessible safari in Kenya's Masai Mara with adapted vehicles, inclusive lodges, and expert guides for travelers with disabilities. Experience the ultimate wheelchair accessible safari adventure.",
      "image": "https://www.jaetravel.co.ke/images/tours/accessible-masai-mara-safari.jpg",
      "url": "https://www.jaetravel.co.ke/tours/accessible-masai-mara-safari",
      "touristType": ["Wheelchair users", "Mobility impaired", "Seniors", "Families with special needs"],
      "offers": {
        "@type": "Offer",
        "price": "2500",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      },
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Arrival in Nairobi & Accessibility Briefing" },
          { "@type": "ListItem", "position": 2, "name": "Transfer to Masai Mara via Wheelchair Accessible Vehicle" },
          { "@type": "ListItem", "position": 3, "name": "Morning & Afternoon Game Drives in Wheelchair Accessible Safari Vehicle" },
          { "@type": "ListItem", "position": 4, "name": "Departure" }
        ]
      },
      "provider": { "@type": "Organization", "name": "JaeTravel Expeditions" }
    },
    {
      "@type": "TouristTrip",
      "name": "Wheelchair Accessible Tanzania Safari – Serengeti & Ngorongoro",
      "description": "8-day wheelchair accessible safari in Tanzania featuring the Great Migration, Ngorongoro Crater, and fully accessible lodges. The perfect wheelchair accessible safari for wildlife enthusiasts.",
      "image": "https://www.jaetravel.co.ke/images/tours/tanzania-accessible-safari.jpg",
      "url": "https://www.jaetravel.co.ke/tours/tanzania-accessible-safari",
      "touristType": ["Wheelchair users", "Travelers with disabilities"],
      "offers": {
        "@type": "Offer",
        "price": "4500",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "provider": { "@type": "Organization", "name": "JaeTravel Expeditions" }
    }
  ]
}

// Itinerary data structure
const accessibleItineraries = [
  {
    id: 1,
    name: "Masai Mara Express",
    duration: "4 Days / 3 Nights",
    route: "Nairobi → Masai Mara → Nairobi",
    description: "Perfect for wheelchair users seeking a quick but comprehensive wildlife experience in Kenya's most famous reserve",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and accessibility briefing at wheelchair-accessible hotel" },
      { day: 2, location: "Masai Mara", description: "Full day game drives in wheelchair-adapted vehicle with hydraulic lift" },
      { day: 3, location: "Masai Mara", description: "Morning and afternoon game drives, accessible cultural visit" },
      { day: 4, location: "Nairobi", description: "Return transfer and departure" }
    ],
    highlights: ["Wheelchair-accessible game drives", "Barrier-free tented camp", "Great Migration viewing (seasonal)", "Accessible cultural experience"],
    accessibility: ["Hydraulic lift vehicles", "Roll-in shower tents", "Wide pathways", "Adapted viewing areas"]
  },
  {
    id: 2,
    name: "Lakes & Mara Adventure",
    duration: "5 Days / 4 Nights",
    route: "Nairobi → Lake Nakuru → Masai Mara → Nairobi",
    description: "Combining flamingo-filled lakes with the iconic Masai Mara for a diverse wheelchair-accessible safari",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and overnight at accessible accommodation" },
      { day: 2, location: "Lake Nakuru", description: "Transfer to Nakuru, afternoon wheelchair-accessible game drive" },
      { day: 3, location: "Masai Mara", description: "Travel to Mara, evening game drive in adapted vehicle" },
      { day: 4, location: "Masai Mara", description: "Full day of accessible wildlife viewing and photography" },
      { day: 5, location: "Nairobi", description: "Return journey with lunch stop at accessible facility" }
    ],
    highlights: ["Flamingo watching at Lake Nakuru", "Rhino sanctuary visit", "Big Five safari experience", "Accessible photography opportunities"],
    accessibility: ["Ramp access viewpoints", "Adapted vehicles throughout", "Accessible lodges", "Trained support staff"]
  },
  {
    id: 3,
    name: "Classic Kenya Circuit",
    duration: "6 Days / 5 Nights",
    route: "Nairobi → Lake Nakuru → Masai Mara → Lake Naivasha → Nairobi",
    description: "The ultimate wheelchair-accessible Kenya safari covering top destinations with full accessibility",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and accessibility orientation" },
      { day: 2, location: "Lake Nakuru", description: "Pink flamingo spectacle and rhino tracking" },
      { day: 3, location: "Masai Mara", description: "Transfer to Mara, extensive game viewing" },
      { day: 4, location: "Masai Mara", description: "Full day exploring the reserve in wheelchair-adapted vehicle" },
      { day: 5, location: "Lake Naivasha", description: "Boat safari with wheelchair ramp access" },
      { day: 6, location: "Nairobi", description: "Return to Nairobi for departure" }
    ],
    highlights: ["Lake Nakuru flamingos", "Masai Mara wildlife", "Lake Naivasha boat safari", "Multiple accessible accommodations"],
    accessibility: ["Boat with wheelchair ramp", "Multiple adapted vehicles", "Variety of barrier-free lodges", "Comprehensive support"]
  },
  {
    id: 4,
    name: "Amboseli Kilimanjaro Views",
    duration: "4 Days / 3 Nights",
    route: "Nairobi → Amboseli → Nairobi",
    description: "Elephant encounters with breathtaking views of Mount Kilimanjaro in fully accessible settings",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and overnight at accessible hotel" },
      { day: 2, location: "Amboseli", description: "Transfer to Amboseli, afternoon game drive with Kilimanjaro views" },
      { day: 3, location: "Amboseli", description: "Full day elephant watching and photography from adapted vehicle" },
      { day: 4, location: "Nairobi", description: "Morning game drive, return to Nairobi" }
    ],
    highlights: ["Mount Kilimanjaro views", "Large elephant herds", "Swamp observation points", "Big Five sightings"],
    accessibility: ["Elevated viewing platforms", "Wheelchair-adapted swamp access", "Accessible lodge with ramps", "Specialized photography support"]
  },
  {
    id: 5,
    name: "Rift Valley Explorer",
    duration: "5 Days / 4 Nights",
    route: "Nairobi → Lake Naivasha → Amboseli → Nairobi",
    description: "Combining Rift Valley lakes with Amboseli's elephants for a diverse accessible experience",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and accessibility briefing" },
      { day: 2, location: "Lake Naivasha", description: "Wheelchair-accessible boat safari and crescent island visit" },
      { day: 3, location: "Amboseli", description: "Transfer to Amboseli, sunset game drive" },
      { day: 4, location: "Amboseli", description: "Full day elephant conservation experience" },
      { day: 5, location: "Nairobi", description: "Return journey with accessible lunch stop" }
    ],
    highlights: ["Lake Naivasha boat safari", "Amboseli elephants", "Kilimanjaro photography", "Rift Valley scenery"],
    accessibility: ["Adapted boat with ramp", "Multiple wheelchair vehicles", "Barrier-free lodges", "Trained guides"]
  }
]

export default function DisabilityToursPage() {
  return (
    <div className="pb-16">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* Hero Section with Itineraries */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/accessible-safari-wheelchair.jpg"
            alt="Wheelchair user on wheelchair accessible safari in Masai Mara, Kenya with JaeTravel - fully accessible safari vehicle and barrier-free experience"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Accessibility className="h-10 w-10" />
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
            Wheelchair Accessible Safari Adventures for <span className="text-primary">Everyone</span>
          </h1>

          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-white/90 text-pretty">
            Discover the wild heart of East Africa with our comprehensive <strong>wheelchair accessible safari</strong> experiences in Kenya, Tanzania, Rwanda, and Uganda. 
            From the endless plains of the <strong>Masai Mara</strong> to the mist-shrouded volcanoes of <strong>Rwanda's gorilla forests</strong>, 
            Jae Travel ensures travelers with disabilities experience Africa's greatest wonders — safely, comfortably, and with dignity through our specially designed <strong>wheelchair accessible tours and safaris</strong>.
          </p>

          <p className="mx-auto mb-8 max-w-3xl text-lg italic text-white/80">
            "I saw a lion pride at sunrise from my wheelchair in a fully wheelchair accessible safari vehicle. That moment will stay with me forever." – David Chen, Canada
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg">
              <Link href="#itineraries">View Accessible Itineraries</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/contact">Get Free Wheelchair Accessibility Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="min-w-[220px]">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" /> WhatsApp Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Accessible Itineraries Section */}
      <section id="itineraries" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Wheelchair Accessible Safari Itineraries</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Choose from our most popular wheelchair accessible safari routes, each carefully designed with accessibility at the forefront. 
              All itineraries feature wheelchair-adapted vehicles, barrier-free accommodations, and trained support staff.
            </p>
          </div>

          <div className="space-y-8">
            {accessibleItineraries.map((itinerary) => (
              <Card key={itinerary.id} className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">{itinerary.name}</h3>
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {itinerary.duration}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Map className="h-4 w-4" />
                              {itinerary.route}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">{itinerary.description}</p>
                      
                      <div className="grid gap-4 sm:grid-cols-2 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Tour Highlights</h4>
                          <ul className="space-y-1 text-sm">
                            {itinerary.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Accessibility Features</h4>
                          <ul className="space-y-1 text-sm">
                            {itinerary.accessibility.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Accessibility className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-center">Sketched Itinerary</h4>
                      <div className="space-y-3">
                        {itinerary.details.map((detail) => (
                          <div key={detail.day} className="flex gap-3 p-2 rounded bg-background">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                              {detail.day}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{detail.location}</p>
                              <p className="text-xs text-muted-foreground">{detail.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link href={`/contact?itinerary=${itinerary.id}`}>
                          Customize This Itinerary
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">
              Don't see your perfect wheelchair accessible safari itinerary? We specialize in custom routes designed specifically for your accessibility needs.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Design Your Custom Accessible Safari</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections remain exactly the same */}
      {/* Introduction to Wheelchair Accessible Safaris */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
                Inclusive Wheelchair Accessible Safaris: Redefining Adventure in East Africa with Accessible Kenya Safari
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                At Jae Travel, we believe <strong>disability should never limit discovery</strong>. Our <strong>wheelchair accessible safari</strong> programs are specifically designed 
                for travelers using wheelchairs, those with limited mobility, visual or hearing impairments, and families traveling with special needs. Every aspect of our <strong>wheelchair accessible tours and safaris</strong> is meticulously planned to ensure comfort, safety, and unforgettable experiences.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                We've spent over a decade perfecting <strong>wheelchair-friendly safari vehicles</strong> with hydraulic lifts and secure restraint systems, partnering with <strong>barrier-free lodges</strong> that meet international accessibility standards, 
                and training guides in comprehensive disability awareness. The result? A seamless, dignified, and thrilling African <strong>wheelchair accessible safari</strong> experience that exceeds expectations.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Whether you're dreaming of watching the <strong>Great Migration from a wheelchair-accessible vehicle</strong> or meeting mountain gorillas 
                via adapted trails in Rwanda, we make it possible — and unforgettable. Our <strong>wheelchair accessible safari</strong> packages include everything from specialized vehicles to accessible accommodations and trained support staff.
              </p>
              <p className="leading-relaxed text-muted-foreground">When you choose us for your <strong>accessible Kenya safari</strong>, 
                you are selecting the only operator in Kenya that guarantees a seamless, 
                vehicle-based game viewing experience without the need for a transfer. 
                Our vehicles feature patented, integrated wheelchair lift systems that provide safe and dignified access directly into the heart of the action, 
                eliminating the unreliable and often undignified use of portable ramps. 
                This core innovation, combined with our unwavering commitment to safety and expertise, 
                ensures your focus remains entirely on the breathtaking wildlife and creating unforgettable memories, making us the definitive choice for a truly premier <strong>accessible Kenya safari</strong>.
              </p>
            </div>
            <div className="relative h-96 overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/accessible-safari-wheelchair.jpg"
                alt="Group of travelers with disabilities enjoying a wheelchair accessible safari game drive in Kenya with adapted vehicle and professional guide"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us – Expanded */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Why Choose Jae Travel for Your Wheelchair Accessible Safari</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              We don't just accommodate disabilities — we <strong>specialize</strong> in creating exceptional <strong>wheelchair accessible safari</strong> experiences. Every detail is planned with accessibility, safety, and joy in mind.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Accessibility className="h-7 w-7 text-primary" />,
                title: "Custom Wheelchair Accessible Safari Vehicles",
                desc: "Hydraulic lifts, wide doors, secure restraints, pop-up roofs, and all-terrain tracked wheelchairs available. Our wheelchair accessible safari vehicles are specifically designed for African terrain."
              },
              {
                icon: <Shield className="h-7 w-7 text-primary" />,
                title: "100% Barrier-Free Lodges & Camps",
                desc: "Roll-in showers, grab bars, ramps, lowered beds, and accessible dining areas. Every wheelchair accessible safari includes accommodation that meets the highest accessibility standards."
              },
              {
                icon: <Users className="h-7 w-7 text-primary" />,
                title: "Disability-Trained Guides & Support Teams",
                desc: "Certified in mobility assistance, sign language basics, and emergency protocols for visual, hearing, and cognitive needs on every wheelchair accessible safari."
              },
              {
                icon: <Heart className="h-7 w-7 text-primary" />,
                title: "Fully Personalized Wheelchair Accessible Itineraries",
                desc: "Paced to your energy levels, medical requirements, and interests — from gentle game drives to cultural village visits. Every wheelchair accessible safari is tailored to individual needs."
              },
              {
                icon: <Award className="h-7 w-7 text-primary" />,
                title: "Award-Winning Accessible Tourism",
                desc: "Recognized by Kenya Tourism Board for excellence in inclusive travel and universal design in wheelchair accessible safari experiences."
              },
              {
                icon: <Globe className="h-7 w-7 text-primary" />,
                title: "Multi-Country Wheelchair Accessible Adventures",
                desc: "Combine Kenya, Tanzania, Rwanda, and Uganda in one seamless, wheelchair-friendly journey with our comprehensive wheelchair accessible safari packages."
              }
            ].map((item, i) => (
              <Card key={i} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included – Expanded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">What's Included in Every Wheelchair Accessible Safari</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              From the moment you land to your final farewell, every detail is covered — with wheelchair accessibility at the core of your safari experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Wheelchair-adapted 4x4 safari vehicles with hydraulic lifts and secure restraints designed specifically for wheelchair accessible safari experiences",
              "Accessible airport transfers in Nairobi, Arusha, Kigali, or Entebbe with wheelchair-friendly vehicles",
              "Barrier-free lodge accommodations with roll-in showers, grab bars, and accessible pathways meeting international standards for wheelchair accessible tours and safaris",
              "All national park fees, conservation fees, and special accessibility permits for wheelchair users",
              "English-speaking guide trained in disability support and wheelchair assistance (multilingual on request)",
              "Pre-trip wheelchair accessibility consultation via phone, email, or video call to customize your wheelchair accessible safari",
              "24/7 on-trip support hotline and emergency medical evacuation plan specifically designed for wheelchair users",
              "Portable all-terrain tracked wheelchair for rugged areas (available on request with every wheelchair accessible safari package)",
              "Accessible dining arrangements and dietary accommodations with wheelchair-friendly seating",
              "Custom pacing with flexible start times and rest stops tailored to wheelchair users' needs",
              "Cultural experiences adapted for mobility and sensory needs ensuring full participation in wheelchair accessible tours and safaris",
              "Specialized equipment transfers and handling throughout your wheelchair accessible safari journey",
              "Accessible photography opportunities and viewing platforms designed for wheelchair users"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Wheelchair Accessible Safari Destinations in East Africa
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Masai Mara, Kenya",
                icon: <MapPin className="h-6 w-6" />,
                desc: "World-famous for the Great Migration. Wheelchair accessible game drives with hydraulic lift vehicles and barrier-free camps.",
                link: "/tours/accessible-masai-mara-safari"
              },
              {
                name: "Serengeti & Ngorongoro, Tanzania",
                icon: <MapPin className="h-6 w-6" />,
                desc: "Follow the migration in wheelchair-adapted vehicles. Stay in accessible tented camps with roll-in showers and ramps.",
                link: "/tours/tanzania-accessible-safari"
              },
              {
                name: "Volcanoes National Park, Rwanda",
                icon: <MapPin className="h-6 w-6" />,
                desc: "Wheelchair accessible gorilla trekking with sedan chairs and shorter trails for mobility-impaired guests. Fully inclusive experience.",
                link: "/tours/accessible-gorilla-trekking-rwanda"
              },
              {
                name: "Bwindi & Queen Elizabeth, Uganda",
                icon: <MapPin className="h-6 w-6" />,
                desc: "Gorilla habituation and boat safaris with ramps and adapted viewing platforms. Comprehensive wheelchair accessible safari options.",
                link: "/tours/uganda-accessible-safari"
              }
            ].map((dest, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-3 text-primary">{dest.icon}</div>
                  <h3 className="mb-2 font-semibold">{dest.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{dest.desc}</p>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={dest.link}>Learn More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section id="tours" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Featured Wheelchair Accessible Safari Tours</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Choose from our most popular wheelchair accessible safari packages or let us design a custom accessible itinerary just for you. Each tour is specifically designed for wheelchair users and travelers with mobility challenges.
            </p>
          </div>

          {disabilityTours.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {disabilityTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="mb-4 text-muted-foreground">New wheelchair accessible tours launching soon!</p>
              <Button asChild>
                <Link href="/contact">Request Custom Wheelchair Accessible Safari</Link>
              </Button>
            </Card>
          )}

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Can't find your ideal wheelchair accessible safari? We specialize in custom itineraries designed specifically for wheelchair users.</p>
            <Button asChild size="lg">
              <Link href="/contact">Build Your Custom Wheelchair Accessible Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Real Stories from Real Wheelchair Accessible Safari Travelers
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "David Chen",
                location: "Canada",
                disability: "T6 Paraplegic – Full-time Wheelchair User",
                text: "The hydraulic lift vehicle was a game-changer for my wheelchair accessible safari. I saw cheetahs hunting at eye level from my wheelchair. JaeTravel thought of everything from accessible vehicles to barrier-free lodges.",
                rating: 5,
                image: "/testimonial-david.jpg"
              },
              {
                name: "Maria Rodriguez",
                location: "Spain",
                disability: "Limited Mobility – Uses Walker and Wheelchair",
                text: "The accessible lodge in the Serengeti had ramps to the veranda and roll-in showers. I watched elephants at sunset every night from my wheelchair. Perfect pacing and incredible wheelchair accessible safari experience.",
                rating: 5,
                image: "/testimonial-maria.jpg"
              },
              {
                name: "James Wilson",
                location: "UK",
                disability: "Wheelchair User – Gorilla Trekking Experience",
                text: "I cried when I saw the silverback gorilla from my adapted sedan chair. The team was respectful and professional. Best wheelchair accessible safari day of my life – truly accessible gorilla trekking.",
                rating: 5,
                image: "/testimonial-james.jpg"
              }
            ].map((t, i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-muted overflow-hidden">
                      <Image src={t.image} alt={t.name} width={64} height={64} className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground leading-relaxed">"{t.text}"</p>
                  <p className="mt-3 text-xs text-muted-foreground italic">{t.disability}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Frequently Asked Questions About Wheelchair Accessible Safaris
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {[
              {
                q: "What types of disabilities do you accommodate on your wheelchair accessible safaris?",
                a: "We welcome wheelchair users, travelers with limited mobility, visual or hearing impairments, seniors, and those with cognitive or neurological conditions. Every wheelchair accessible safari begins with a free accessibility consultation to ensure we meet your specific needs and provide the appropriate adaptive equipment."
              },
              {
                q: "Are the wheelchair accessible safari vehicles safe and comfortable for rough terrain?",
                a: "Yes. Our vehicles are custom-built with hydraulic lifts, shock-absorbing suspension, secure wheelchair locks, and climate control. Pop-up roofs ensure full wildlife viewing. All our wheelchair accessible safari vehicles are maintained to the highest safety standards and designed specifically for African safari conditions."
              },
              {
                q: "Can I bring my own wheelchair or power scooter on the wheelchair accessible safari?",
                a: "Absolutely. We recommend lightweight or foldable models for easier transfers. We provide backup manual wheelchairs and charging stations for power chairs. Our wheelchair accessible safari vehicles have ample space for personal mobility equipment and our staff are trained in proper handling and storage."
              },
              {
                q: "How do you handle medical emergencies during wheelchair accessible safaris?",
                a: "All guides carry satellite phones and comprehensive first-aid kits. We partner with flying doctor services and pre-arrange hospital access with wheelchair-accessible facilities. Medical forms are reviewed before travel and emergency protocols are specifically designed for wheelchair users on safari."
              },
              {
                q: "Is wheelchair accessible gorilla trekking really possible in Rwanda and Uganda?",
                a: "Yes. In Rwanda and Uganda, we secure special permits and use experienced sedan chair teams. Some guests walk short distances with support; others are carried the full way. Our wheelchair accessible safari packages include all necessary adaptive equipment and trained support staff for gorilla trekking experiences."
              },
              {
                q: "What makes your wheelchair accessible safari different from regular safaris?",
                a: "Our wheelchair accessible safari experiences are specifically designed from the ground up for accessibility. This includes custom-built vehicles with hydraulic lifts, barrier-free accommodations, trained disability support staff, adaptive equipment, and itineraries paced for wheelchair users. We don't just adapt existing tours – we create truly inclusive wheelchair accessible safari experiences."
              },
              {
                q: "Are there additional costs for wheelchair accessible safari equipment and services?",
                a: "No. All accessibility features – including adapted vehicles, barrier-free accommodations, and specialized equipment – are included in our wheelchair accessible safari pricing. We believe accessibility shouldn't come with extra costs, which is why our wheelchair accessible tours and safaris are priced inclusively."
              }
            ].map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold text-primary">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
              Your Wheelchair Accessible African Safari Awaits
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
              Let our wheelchair accessibility experts design a safe, comfortable, and thrilling safari tailored to your specific needs. 
              From your first inquiry to your final game drive in our specially adapted wheelchair accessible safari vehicles, we're with you every step of the way.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="min-w-[240px]">
                <Link href="/contact">Start Planning Your Wheelchair Accessible Safari</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[240px] border-white text-white hover:bg-white/20">
                <a href="tel:+254726485228">Call +254 726 485 228</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/80">
              Free wheelchair accessibility consultation • No obligation • Reply within 2 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}