import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/uganda-circuit-safaris/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Star, 
  Shield, 
  Award, 
  Zap, 
  Mountain, 
  Camera, 
  Info, 
  Lightbulb, 
  CheckCircle, 
  TrendingUp, 
  Video, 
  MapPin, 
  HelpCircle, 
  Globe, 
  Users, 
  Clock, 
  Phone,
  Mail,
  MessageCircle,
  CreditCard,
  Heart,
  Compass,
  Sunrise,
  Sunset,
  Eye,
  ThumbsUp,
  Trees,
  Droplets,
  Bird
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "uganda-circuit-safaris",
  title: "Uganda Circuit Safaris 2026 | Gorillas & Wildlife Tours",
  description:
    "Explore Uganda safaris: gorilla trekking in Bwindi, chimp tracking in Kibale & wildlife in Queen Elizabeth. 5–12 day guided tours.",
  h1: "Uganda Circuit",
  h1Sub: "Safaris 2026",
  subtitle: "The Pearl of Africa – Gorilla Trekking, Chimpanzee Tracking & Savanna Wildlife Across Uganda's Finest Parks",
  featuredToursTitle: "Uganda Circuit Packages",
  filterFn: (tour: any) => 
    tour.country === "Uganda" || 
    tour.destinations?.includes("uganda") ||
    tour.slug.includes("uganda") ||
    tour.slug.includes("bwindi") ||
    tour.slug.includes("kibale") ||
    tour.slug.includes("queen-elizabeth") ||
    tour.slug.includes("murchison") ||
    tour.slug.includes("rwenzori"),
}

const ugandaTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "uganda safari circuit",
    "gorilla trekking uganda",
    "bwindi gorilla safari",
    "kibale chimpanzee tracking",
    "queen elizabeth national park",
    "murchison falls safari",
    "uganda wildlife tours",
    "pearl of africa safari",
    "multi-park uganda itinerary",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/uganda-circuit-safaris",
    languages: {
      "en-US": "/en-us/uganda-circuit-safaris",
      "en-GB": "/en-gb/uganda-circuit-safaris",
      "en-AU": "/en-au/uganda-circuit-safaris",
    },
  },
  openGraph: {
    title: "Uganda Circuit Safaris 2026 | Gorillas, Chimps & Wildlife",
    description: "Track mountain gorillas in Bwindi, chimpanzees in Kibale, and wildlife in Queen Elizabeth. Multi-park Uganda safaris.",
    images: [{
      url: "/og/uganda-circuit-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Uganda Safari - Mountain Gorilla",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uganda Circuit Safaris 2026 | Gorillas & Wildlife",
    description: "Track gorillas, chimps, and wildlife across Uganda's finest parks.",
    images: ["/twitter/uganda-circuit.jpg"],
    creator: "@jaetravel",
  },
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "Jae Travel Expeditions",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karen Roundabout",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        addressCountry: "KE",
      },
      telephone: "+254726485228",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1200",
      },
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/uganda-circuit-safaris#product",
      name: "Uganda Circuit Safari Packages 2026",
      description: "Multi-park guided safaris across Uganda's premier national parks.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "750",
        highPrice: "5800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: ugandaTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "420",
      },
    },
  ],
}

export default function UgandaCircuitSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="uganda-circuit-safaris"
        categoryOpts={{
          title: "Uganda Safari Tours 2026 — Gorillas & Wildlife",
          description: "Uganda circuit safaris covering Bwindi gorillas, Kibale chimps, Queen Elizabeth, and Murchison Falls.",
          image: "/uganda-wildlife.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("uganda") || t.title?.toLowerCase().includes("uganda") || t.description?.toLowerCase().includes("uganda")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd id="uganda-circuit-schema" data={jsonLd} />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-emerald-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="ml-1 text-sm font-medium text-gray-700">1,200+ reviews</span>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-emerald-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-emerald-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/uganda" className="hover:text-emerald-600 transition">Uganda</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Uganda Circuit Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-emerald-100">
                <Trees className="h-3.5 w-3.5" />
                Gorilla Trekking
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Bird className="h-3.5 w-3.5" />
                Chimpanzee Tracking
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Droplets className="h-3.5 w-3.5" />
                Nile Source
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-emerald-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="flex justify-center text-emerald-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">from 420+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-500">National Parks</div>
                <div className="text-xs text-gray-400 mt-1">across Uganda</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$750</div>
                <div className="text-sm text-gray-500">Starting price</div>
                <div className="text-xs text-gray-400 mt-1">multi-park itineraries</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View Uganda Packages
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Plan Your Circuit
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== UGANDA PARKS SHOWCASE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                The Pearl of Africa
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Uganda's Premier Parks
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Bwindi Impenetrable</h3>
                <p className="text-xs text-emerald-600 mb-2">Gorilla Trekking</p>
                <p className="text-sm text-gray-600">Half the world's mountain gorillas. 20+ habituated families.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Kibale Forest</h3>
                <p className="text-xs text-emerald-600 mb-2">Chimpanzee Tracking</p>
                <p className="text-sm text-gray-600">13 primate species. Chimpanzee habituation experience.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Queen Elizabeth</h3>
                <p className="text-xs text-emerald-600 mb-2">Savanna Wildlife</p>
                <p className="text-sm text-gray-600">Tree-climbing lions, Kazinga Channel boat cruise.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Murchison Falls</h3>
                <p className="text-xs text-emerald-600 mb-2">Waterfall Safari</p>
                <p className="text-sm text-gray-600">Nile River, powerful falls, boat safaris, rhino tracking.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Lake Mburo</h3>
                <p className="text-xs text-emerald-600 mb-2">Compact Wildlife</p>
                <p className="text-sm text-gray-600">Zebras, impalas, boat safaris, walking safaris.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Rwenzori Mountains</h3>
                <p className="text-xs text-emerald-600 mb-2">Trekking</p>
                <p className="text-sm text-gray-600">Mountains of the Moon. Unique alpine vegetation.</p>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Choose Your Circuit
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Gorilla permits • Expert guides • All park fees • Luxury lodges • Entebbe pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {ugandaTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Multi-park Uganda safari including gorillas, chimps, and wildlife."}
                  price={tour.price ?? 750}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 100 + index * 15}
                  location="Uganda"
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.title.includes("Gorilla") ? "🦍 Gorilla Trek" : index === 0 ? "Best Seller" : undefined}
                  pickup="Entebbe • Kigali"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 rounded-full"
              >
                <Link href="/tours?country=uganda">
                  View All Uganda Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Uganda Safari
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-emerald-600 mb-3">June – September</p>
                  <p className="text-gray-600 mb-4">Best for gorilla trekking (easier trails), wildlife viewing, and clear skies.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Short Dry</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">December – February</p>
                  <p className="text-gray-600 mb-4">Good conditions, fewer crowds, excellent for primate tracking.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== FAQ SECTION ========== */}
          <section className="mb-40">
            <FaqSection />
          </section>
          
          {/* ========== TRUST BADGES ========== */}
          <section className="mb-40">
            <TrustBadges />
          </section>
          
          {/* ========== FINAL CTA ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Explore the Pearl of Africa?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Gorillas, chimps, and incredible wildlife await. Permits sell out 6-12 months in advance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/booking">
                    <Calendar className="mr-2 h-5 w-5" /> 
                    Check Availability
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/contact">
                    <MessageCircle className="mr-2 h-5 w-5" /> 
                    WhatsApp Us
                  </Link>
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/20 text-sm text-white/60">
                <p>Jae Travel Expeditions • Karen Roundabout, Nairobi, Kenya</p>
                <p className="mt-2">+254 726 485 228 • info@jaetravel.co.ke</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}