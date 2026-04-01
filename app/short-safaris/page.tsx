// app/short-safaris/page.tsx
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
  Timer,
  Coffee
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "short-safaris",
  title: "Short Safaris Kenya 2026 | 1-3 Day Nairobi Tours",
  description:
    "1–3 day Kenya safaris from Nairobi to Maasai Mara, Amboseli & Lake Nakuru. Private 4x4 tours, expert guides & park fees included. From $150.",
  h1: "Short Safaris",
  h1Sub: "& Day Trips 2026",
  subtitle: "Perfect for Layovers & Short Breaks – 1-3 Day Adventures from Nairobi to Kenya's Finest Parks",
  featuredToursTitle: "Short Safari Packages",
  filterFn: (tour: any) => 
    tour.duration === "1 Day" || 
    tour.duration === "2 Days" || 
    tour.duration === "3 Days" ||
    tour.duration === "4 Hours" ||
    tour.duration === "5 Hours" ||
    tour.duration === "Half-day" ||
    tour.category?.includes("Day Trip") ||
    tour.category?.includes("Day Tour") ||
    tour.slug.includes("day") ||
    tour.slug.includes("short"),
}

const shortTours = tours.filter(CONFIG.filterFn).slice(0, 12)

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
    "short safaris kenya",
    "day trips from nairobi",
    "1 day safari masai mara",
    "2 day safari amboseli",
    "lake nakuru day tour",
    "nairobi national park tour",
    "hells gate day trip",
    "kenya short breaks",
    "layover safari nairobi",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/short-safaris",
    languages: {
      "en-US": "/en-us/short-safaris",
      "en-GB": "/en-gb/short-safaris",
      "en-AU": "/en-au/short-safaris",
    },
  },
  openGraph: {
    title: "Short Safaris & Day Trips 2026 | Kenya Tours from Nairobi",
    description: "Perfect for layovers. 1-3 day safaris to Lake Nakuru, Amboseli, Masai Mara. Private 4x4, expert guides.",
    images: [{
      url: "/og/short-safaris-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Short Safari Kenya - Day Trip",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Short Safaris & Day Trips 2026 | Kenya Tours",
    description: "1-3 day safaris from Nairobi. Perfect for layovers.",
    images: ["/twitter/short-safaris.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/short-safaris#product",
      name: "Short Safari Packages 2026",
      description: "1-3 day guided safaris from Nairobi to Kenya's top destinations.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "150",
        highPrice: "1200",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: shortTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "650",
      },
    },
  ],
}

export default function ShortSafarisPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <JsonLd id="jsonld" data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-blue-400">
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
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/safari-types" className="hover:text-blue-600 transition">Safari Types</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Short Safaris & Day Trips</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Timer className="h-3.5 w-3.5" />
                1-3 Day Tours
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <MapPin className="h-3.5 w-3.5" />
                From Nairobi
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Coffee className="h-3.5 w-3.5" />
                Perfect for Layovers
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-blue-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-blue-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-500">from 650+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">12+</div>
                <div className="text-sm text-gray-500">Short itineraries</div>
                <div className="text-xs text-gray-400 mt-1">1-3 days</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$150</div>
                <div className="text-sm text-gray-500">Starting price</div>
                <div className="text-xs text-gray-400 mt-1">all fees included</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View All Short Safaris
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Customize Your Trip
                </Link>
              </Button>
            </div>

            {/* Pickup locations */}
            <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                <Compass className="h-4 w-4" />
                Daily departures from:
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Nairobi (hotel/airport)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Wilson Airport</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm shadow-sm">Jomo Kenyatta International</span>
              </div>
            </div>
          </header>
          
          {/* ========== DESTINATION GRID ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-600 mb-4">
                Popular Day Trips
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Quick Getaways from Nairobi
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Lake Nakuru</h3>
                <p className="text-sm text-gray-600 mb-3">2-3 hours • 1-2 days</p>
                <p className="text-sm">Flamingos, rhinos, 450+ bird species</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Amboseli</h3>
                <p className="text-sm text-gray-600 mb-3">3-4 hours • 2-3 days</p>
                <p className="text-sm">Elephants, Kilimanjaro views</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Masai Mara</h3>
                <p className="text-sm text-gray-600 mb-3">5-6 hours • 1-3 days</p>
                <p className="text-sm">Big Five, Great Migration (seasonal)</p>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Expert guides • All park fees • Nairobi pickup • Daily departures
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {shortTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Private guided short safari from Nairobi."}
                  price={tour.price ?? 150}
                  rating={tour.rating ?? 4.8}
                  reviewCount={tour.reviewCount ?? 100 + index * 15}
                  location={tour.country || "Kenya"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText={`${tour.duration || "1-3 days"} • All fees included`}
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.duration === "1 Day" ? "⭐ Day Trip" : index === 0 ? "Best Seller" : undefined}
                  pickup="Nairobi pickup included"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 rounded-full"
              >
                <Link href="/tours?duration=short">
                  View All Short Safaris <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== WHY CHOOSE SHORT SAFARIS ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Why Choose a Short Safari?
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Perfect for Layovers</h3>
                  <p className="text-sm text-gray-600">24-48 hour stopover? Experience Kenya's wildlife without a long commitment.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Budget-Friendly</h3>
                  <p className="text-sm text-gray-600">Experience world-class safari at a fraction of the cost of longer trips.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-gray-600">Daily departures. Add to any itinerary or enjoy as a standalone experience.</p>
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
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Limited Time? No Problem.
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Experience Kenya's incredible wildlife even with just 24 hours. Daily departures from Nairobi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/booking">
                    <Calendar className="mr-2 h-5 w-5" /> 
                    Book Your Day Trip
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