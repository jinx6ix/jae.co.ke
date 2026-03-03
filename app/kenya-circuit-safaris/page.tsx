// app/kenya-circuit-safaris/page.tsx
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
  Bird,
  Footprints,
  PawPrint
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"

const CONFIG = {
  slug: "kenya-circuit-safaris",
  title: "Kenya Circuit Safaris 2026 | Masai Mara, Amboseli, Tsavo & More | JAE Travel Expeditions",
  description: "Explore Kenya's legendary safari circuit. Witness the Great Migration in Masai Mara, elephants against Kilimanjaro in Amboseli, and red elephants in Tsavo. Multi-park itineraries from 5-14 days. Expert guides, luxury lodges.",
  h1: "Kenya Circuit",
  h1Sub: "Safaris 2026",
  subtitle: "The Original Safari Destination – Masai Mara, Amboseli, Tsavo, Lake Nakuru & Beyond",
  featuredToursTitle: "Kenya Circuit Packages",
  filterFn: (tour: any) => 
    tour.country === "Kenya" || 
    tour.destinations?.includes("kenya") ||
    tour.slug.includes("kenya") ||
    tour.slug.includes("masai-mara") ||
    tour.slug.includes("amboseli") ||
    tour.slug.includes("tsavo") ||
    tour.slug.includes("nakuru") ||
    tour.slug.includes("samburu") ||
    tour.slug.includes("laikipia") ||
    tour.slug.includes("aberdare") ||
    tour.slug.includes("naivasha"),
}

const kenyaTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "kenya safari circuit",
    "masai mara migration safari",
    "amboseli elephant safari",
    "tsavo red elephants",
    "lake nakuru flamingos",
    "samburu special five",
    "laikipia conservancy",
    "great migration kenya",
    "multi-park kenya safari",
  ],
  authors: [{ name: "JAE Travel Expeditions" }],
  creator: "JAE Travel Expeditions",
  publisher: "JAE Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/kenya-circuit-safaris",
    languages: {
      "en-US": "/en-us/kenya-circuit-safaris",
      "en-GB": "/en-gb/kenya-circuit-safaris",
      "en-AU": "/en-au/kenya-circuit-safaris",
    },
  },
  openGraph: {
    title: "Kenya Circuit Safaris 2026 | Masai Mara, Amboseli & Tsavo",
    description: "Explore Kenya's legendary safari circuit. Great Migration, Kilimanjaro views, and red elephants. Multi-park safaris.",
    images: [{
      url: "/og/kenya-circuit-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Kenya Safari - Masai Mara",
    }],
    locale: "en_US",
    type: "website",
    siteName: "JAE Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya Circuit Safaris 2026 | Masai Mara & Amboseli",
    description: "Experience Kenya's legendary safari circuit. Multi-park adventures.",
    images: ["/twitter/kenya-circuit.jpg"],
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
      name: "JAE Travel Expeditions",
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
      "@id": "https://www.jaetravel.co.ke/kenya-circuit-safaris#product",
      name: "Kenya Circuit Safari Packages 2026",
      description: "Multi-park guided safaris across Kenya's premier national parks and reserves.",
      brand: {
        "@type": "Brand",
        name: "JAE Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "750",
        highPrice: "8500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: kenyaTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "920",
      },
    },
  ],
}

export default function KenyaCircuitSafarisPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-green-400">
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
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-green-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-green-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/kenya" className="hover:text-green-600 transition">Kenya</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Kenya Circuit Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <PawPrint className="h-3.5 w-3.5" />
                Masai Mara Lions
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Mountain className="h-3.5 w-3.5" />
                Kilimanjaro Views
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Footprints className="h-3.5 w-3.5" />
                Great Migration
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-green-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-green-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">from 920+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-500">National Parks</div>
                <div className="text-xs text-gray-400 mt-1">across Kenya</div>
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
                className="text-base px-10 py-6 bg-green-600 hover:bg-green-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View Kenya Packages
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Plan Your Circuit
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== KENYA PARKS SHOWCASE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                The Original Safari Circuit
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Kenya's Iconic Parks
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Masai Mara</h3>
                <p className="text-xs text-green-600 mb-2">Great Migration</p>
                <p className="text-sm text-gray-600">Kenya's lion capital. River crossings July-October. Big Five guaranteed.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Amboseli</h3>
                <p className="text-xs text-green-600 mb-2">Elephant Paradise</p>
                <p className="text-sm text-gray-600">Iconic Kilimanjaro views. Large elephant herds. 2025-26 baby boom.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Tsavo East & West</h3>
                <p className="text-xs text-green-600 mb-2">Red Elephants</p>
                <p className="text-sm text-gray-600">Kenya's largest park. Mzima Springs, red elephants, maneless lions.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Lake Nakuru</h3>
                <p className="text-xs text-green-600 mb-2">Rhino Sanctuary</p>
                <p className="text-sm text-gray-600">Flamingos, black/white rhinos, 450+ bird species.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Samburu</h3>
                <p className="text-xs text-green-600 mb-2">Special Five</p>
                <p className="text-sm text-gray-600">Grevy's zebra, reticulated giraffe, Somali ostrich. Northern Kenya.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Laikipia</h3>
                <p className="text-xs text-green-600 mb-2">Conservancies</p>
                <p className="text-sm text-gray-600">Private wildlife conservancies. Wild dog, rhino, community tourism.</p>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Choose Your Circuit
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Expert guides • All park fees • Luxury lodges • Nairobi pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {kenyaTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Multi-park Kenya safari including Masai Mara, Amboseli, and more."}
                  price={tour.price ?? 750}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 130 + index * 20}
                  location="Kenya"
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.title.includes("Mara") ? "🦁 Masai Mara" : index === 0 ? "Best Seller" : undefined}
                  pickup="Nairobi • Wilson Airport"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full"
              >
                <Link href="/tours?country=kenya">
                  View All Kenya Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Kenya Safari
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Peak migration in Masai Mara. Best wildlife viewing, clear skies.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Calving Season</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">January – March</p>
                  <p className="text-gray-600 mb-4">Excellent for Amboseli. Lush landscapes, fewer crowds.</p>
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
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Explore Kenya?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Witness the Great Migration, elephants against Kilimanjaro, and the Big Five. Peak dates filling fast.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-green-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
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
                <p>JAE Travel Expeditions • Karen Roundabout, Nairobi, Kenya</p>
                <p className="mt-2">+254 726 485 228 • info@jaetravel.co.ke</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}