import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnswerSummary } from "@/components/AnswerSummary"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import JsonLd from "@/components/JsonLd"
import {
  Shield, Users, Clock, Car, Wifi, Accessibility, Star, Award,
  MapPin, CheckCircle, Phone, Mail, Calendar, Heart, Zap, Globe,
  ArrowLeft,
} from "lucide-react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"

export const generateMetadata = (): Metadata => {
  const primaryKeywords = [
    "safari land cruiser hire kenya",
    "safari land cruiser rental kenya",
    "toyota land cruiser safari kenya",
    "land cruiser safari vehicle kenya",
    "4x4 safari land cruiser kenya",
    "safari land cruiser masai mara kenya",
  ]

  const secondaryKeywords = [
    "safari vehicle hire kenya",
    "safari car rental kenya",
    "land cruiser hire nairobi",
    "safari vehicle rental east africa",
    "toyota land cruiser rental africa",
    "safari 4x4 vehicle kenya",
  ]

  const longTailKeywords = [
    "rent safari land cruiser kenya",
    "safari land cruiser with driver kenya",
    "safari land cruiser price per day kenya",
    "safari land cruiser for masai mara",
    "safari land cruiser amboseli kenya",
    "safari land cruiser tsavo kenya",
  ]

  const allKeywords = [...primaryKeywords, ...secondaryKeywords, ...longTailKeywords]

  return {
    title: "Safari Land Cruiser Hire Kenya | 4x4 Safari Vehicle Rental",
    description:
      "Hire a Toyota Land Cruiser safari vehicle in Kenya for Masai Mara, Amboseli, Tsavo and beyond. Pop-up roof, 4x4 capability, fully insured, with driver or self-drive from $95/day.",
    keywords: allKeywords.join(", "),
    openGraph: {
      title: "Safari Land Cruiser Hire Kenya | Toyota 4x4 Safari Vehicle Rental",
      description:
        "Safari Land Cruiser for hire in Kenya. Pop-up roof game viewing, 4x4, fully insured. Masai Mara, Amboseli, Tsavo safaris from $95/day.",
      images: [
        {
          url: `${BASE_URL}/media/landcruiser-pop-up-roof-open-1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: "Toyota Land Cruiser safari vehicle with pop-up roof open in Kenya",
        },
      ],
      type: "website",
      siteName: "Jae Travel Expeditions",
      locale: "en_KE",
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
      languages: {
        en: "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
        "en-US": "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
        "en-GB": "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
        "en-AU": "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
        "en-CA": "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
        "x-default": "https://www.jaetravel.co.ke/vehicles/safari-land-cruiser",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg",
    },
  }
}

const speakableSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "h3", "#answer-summary", ".answer-text"],
    },
  ],
}

const vehicleFeatures = [
  {
    icon: Shield,
    title: "Certified Safari Land Cruiser",
    description:
      "Toyota Land Cruiser V8 4.5L with pop-up roof for 360° game viewing. Reinforced suspension, extended fuel tanks, and comprehensive safari insurance included with every hire.",
  },
  {
    icon: Users,
    title: "Safari Specialist Drivers",
    description:
      "KPSGA-certified driver/guides with 5–20 years' experience in Masai Mara, Amboseli, Tsavo, Samburu and Lake Nakuru. Expert wildlife spotting and park navigation.",
  },
  {
    icon: Car,
    title: "4x4 Safari Capability",
    description:
      "Heavy-duty 4x4 system with differential lock, high ground clearance for black-cotton soil and river crossings, and pop-up roof for standing wildlife photography.",
  },
  {
    icon: Accessibility,
    title: "Safari Ready Equipment",
    description:
      "GPS, first-aid kits, bottled water, and 24/7 breakdown support across East Africa. Every vehicle meticulously maintained and fully insured.",
  },
  {
    icon: Globe,
    title: "East Africa Coverage",
    description:
      "Certified for Kenya, Tanzania, Uganda and Rwanda. Cross-border permits and COMESA insurance extensions handled for seamless multi-country safaris.",
  },
  {
    icon: Zap,
    title: "Medical & Safety Systems",
    description:
      "3kW power inverter for medical equipment, satellite communication for remote areas, and emergency medical evacuation insurance on every safari.",
  },
]

const faqs = [
  {
    question: "How much does it cost to hire a safari Land Cruiser in Kenya?",
    answer:
      "Safari Land Cruiser hire starts at $95/day for the Toyota Land Cruiser Prado TX and $120/day for the heavy-duty Land Cruiser 78 Series. Rates include comprehensive insurance and 24/7 roadside assistance. Fuel and driver/guide (+$50–$80/day) are additional.",
  },
  {
    question: "Can I hire a safari Land Cruiser with a driver in Kenya?",
    answer:
      "Yes. All Land Cruisers are available with a professional KPSGA-certified safari driver/guide at $50–$80/day depending on the vehicle and duration. Guides speak fluent English and know every major park in East Africa.",
  },
  {
    question: "What is the best safari Land Cruiser for Masai Mara?",
    answer:
      "The Toyota Land Cruiser Prado TX or 78 Series are the top choices for Masai Mara. Both feature pop-up roofs for 360° wildlife viewing, heavy-duty 4x4 for black-cotton soil and river crossings, and high ground clearance for rough terrain.",
  },
  {
    question: "Is fuel included in the safari Land Cruiser hire price?",
    answer:
      "Fuel is not included. Vehicles are supplied with a full tank and must be returned full. Diesel is widely available across Kenya; we provide refuelling maps for remote areas and parks.",
  },
  {
    question: "Can I take the safari Land Cruiser across the border to Tanzania or Uganda?",
    answer:
      "Yes. All our Land Cruisers are permitted for cross-border travel throughout East Africa. We handle COMESA insurance extensions, cross-border permits, and customs documentation. Additional cross-border fees apply.",
  },
  {
    question: "Do safari Land Cruisers have pop-up roofs?",
    answer:
      "Yes. All our 4x4 safari Land Cruisers are fitted with full-length pop-up roofs for standing game viewing and wildlife photography. The pop-up roof provides 360° panoramic views essential for spotting predators in tall grass.",
  },
]

const companyStats = {
  safariVehicles: "18+",
  usersServed: "2,800+",
  satisfactionRate: "4.9/5",
  yearsExperience: "12",
  parksCovered: "12",
  responseTime: "<2 hrs",
}

const safariDestinations = [
  { name: "Masai Mara National Reserve", highlights: "Great Migration (Jul–Oct), Big Five, Hot Air Balloon Safari" },
  { name: "Amboseli National Park", highlights: "Kilimanjaro Views, Large Elephant Herds, Observation Hill" },
  { name: "Tsavo East & West", highlights: "Red Elephants, Mzima Springs, Vast Landscapes" },
  { name: "Samburu National Reserve", highlights: "Special Five, Cultural Visits, Scenic Trails" },
  { name: "Lake Nakuru National Park", highlights: "Flamingoes, Rhino Sanctuary, Paved Accessible Routes" },
  { name: "Serengeti — Tanzania", highlights: "Great Migration, Big Cats, Endless Plains" },
]

export default function SafariLandCruiserPage() {
  return (
    <>
      <JsonLd id="speakable-schema" data={speakableSchema} />

      <AllPageSEOSchema
        type="vehicle"
        data={{
          name: "Safari Land Cruiser Hire Kenya",
          image: "/media/landcruiser-pop-up-roof-open-1200x630.jpg",
          description:
            "Toyota Land Cruiser safari vehicle for hire in Kenya. Pop-up roof, 4x4 capability, fully insured from $95/day. Masai Mara, Amboseli, Tsavo.",
          pricePerDay: "95",
          priceCurrency: "USD",
          keywords: [
            "safari land cruiser hire kenya",
            "safari land cruiser rental kenya",
            "toyota land cruiser safari kenya",
          ],
          gallery: [
            "/media/landcruiser-pop-up-roof-open-1200x630.jpg",
            "/media/landcruiser-interior-dashboard-1200x630.jpg",
            "/media/landcruiser-luggage-space-1200x630.jpg",
          ],
          ideal: "ideal for Masai Mara, Amboseli, Tsavo and East Africa safaris",
        }}
        slug="safari-land-cruiser"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <header className="mb-20 text-center">
          <div className="mb-6 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white">
              <Star className="h-4 w-4" />
              Kenya's Premier Safari Land Cruiser
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              <Award className="h-4 w-4" />
              12+ Years Safari Experience
            </div>
            <div className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white">
              <Heart className="h-4 w-4" />
              2,800+ Safari Guests Served
            </div>
          </div>

          <h1 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            Safari Land Cruiser <span className="text-primary">Hire Kenya</span>
          </h1>

          <p className="mx-auto max-w-5xl text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            <strong>TOYOTA LAND CRUISER SAFARI VEHICLE FOR HIRE:</strong> 4x4 Toyota Land Cruisers featuring{" "}
            <strong>pop-up roofs for 360° game viewing, heavy-duty suspension, and extended fuel tanks</strong>. Experience the{" "}
            <strong>Masai Mara, Amboseli, and Tsavo</strong> in our certified safari Land Cruisers — the ultimate{" "}
            <Link href="/" className="text-primary underline font-semibold">
              safari vehicle hire
            </Link>{" "}
            in Kenya.
          </p>

          {/* Trust Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {Object.entries(companyStats).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-primary/5 rounded-2xl">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-xs md:text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
              <Link href="/book-now?vehicle=safari-land-cruiser">
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Safari Land Cruiser
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/contact?inquiry=safari-land-cruiser">
                <Phone className="mr-2 h-5 w-5" />
                Safari Specialist
              </Link>
            </Button>
          </div>
        </header>

        {/* Answer Summary for Snippet Targeting */}
        <section className="mb-16">
          <AnswerSummary id="answer-summary">
            Safari Land Cruiser hire in Kenya starts at $95/day for the Toyota Land Cruiser Prado TX. All vehicles feature pop-up roofs for game viewing, 4x4 capability, comprehensive insurance, and are available with driver or self-drive for Masai Mara, Amboseli, Tsavo and across East Africa.
          </AnswerSummary>
        </section>

        {/* Vehicle Categories */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" id="kenyas-largest-safari-land-cruiser-fleet">
              Kenya's Largest Safari Land Cruiser Fleet
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Comprehensive safari Land Cruiser solutions specifically designed for Kenyan safari conditions and East African wildlife viewing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Safari Land Cruiser Prado TX",
                description: "5-passenger 4x4 with pop-up roof, ideal for Masai Mara and Amboseli safaris",
                count: "$95/day",
                icon: Car,
              },
              {
                name: "Safari Land Cruiser 78 Series",
                description: "6-passenger heavy-duty 4x4 for group safaris and long-distance overland journeys",
                count: "$120/day",
                icon: Shield,
              },
              {
                name: "Safari Minivan",
                description: "7-passenger tour van ideal for airport transfers and shorter circuits",
                count: "$80/day",
                icon: Users,
              },
              {
                name: "Rooftop Tent Land Cruiser",
                description: "4-passenger overland vehicle with rooftop tent for self-drive camping safaris",
                count: "$110/day",
                icon: Globe,
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                <div className="text-lg font-bold text-primary">{category.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry-Leading Features */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" id="why-our-safari-land-cruiser-is-kenyas-1-choice">
              Why Our Safari Land Cruiser is Kenya's #1 Choice
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Unmatched safari Land Cruiser features, off-road capability, and safety standards that competitors cannot match in Kenya
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {vehicleFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safari Destinations */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Safari Destinations with Our Land Cruiser
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Where can you take our safari Land Cruiser? All major Kenyan and East African national parks
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
            {safariDestinations.map((destination, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  {destination.name}
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">{destination.highlights}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Safari Land Cruiser Kenya: Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Everything you need to know about hiring our safari Land Cruiser for your Kenya safari
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center md:p-12 text-white">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold">
            Ready to Experience Kenya in Our Safari Land Cruiser?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl opacity-90 leading-relaxed">
            Join 2,800+ safari guests who've trusted our Land Cruisers for unforgettable Kenyan safaris.{" "}
            Experience the Great Migration, Amboseli's elephants, and Tsavo's wilderness in complete comfort and safety.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/book-now?vehicle=safari-land-cruiser">
                <Calendar className="mr-2 h-5 w-5" />
                Book Safari Land Cruiser Online
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/contact?inquiry=safari-land-cruiser">
                <Mail className="mr-2 h-5 w-5" />
                Get Safari Vehicle Quote
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/tel:+254700000000">
                <Phone className="mr-2 h-5 w-5" />
                Call: +254 700 000000
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Certified Safari Vehicle</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>KPSGA Driver Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>100-Hour Safari Training</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Safari Support</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
