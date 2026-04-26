import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/beach-holidays/page.tsx
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
  Tent,
  Flame,
  BookOpen,
  Music,
  Utensils,
  Waves,
  Fish,
  Umbrella
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "beach-holidays",
  title: "Beach & Island Holidays 2026 | Zanzibar, Diani & Mombasa",
  description:
    "Relax on East Africa’s top beaches: Zanzibar, Diani, Pemba & Mombasa. White sands, diving, resorts & island escapes from $350.",
  h1: "Beach & Island",
  h1Sub: "Holidays 2026",
  subtitle: "Paradise Found – White Sands, Turquoise Waters & Island Escapes Along East Africa's Pristine Coastline",
  featuredToursTitle: "Beach Holiday Packages",
  filterFn: (tour: any) => 
    tour.category?.includes("Beach") ||
    tour.category?.includes("Island") ||
    tour.category?.includes("Diving") ||
    tour.slug.includes("zanzibar") ||
    tour.slug.includes("diani") ||
    tour.slug.includes("mombasa") ||
    tour.slug.includes("pemba") ||
    tour.slug.includes("beach") ||
    tour.slug.includes("coastal") ||
    tour.slug.includes("ssese") ||
    tour.slug.includes("bunyonyi") ||
    tour.slug.includes("kivu") ||
    tour.slug.includes("relaxation"),
}

const beachTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "zanzibar beach holidays 2026",
    "diani beach kenya",
    "mombasa coastal safari",
    "pemba island diving",
    "ssese islands uganda",
    "lake bunyonyi relaxation",
    "lake kivu rwanda",
    "east africa beach resorts",
    "indian ocean beach holidays",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/beach-holidays",
    languages: {
      "en-US": "/en-us/beach-holidays",
      "en-GB": "/en-gb/beach-holidays",
      "en-AU": "/en-au/beach-holidays",
    },
  },
  openGraph: {
    title: "Beach & Island Holidays 2026 | Zanzibar, Diani & Mombasa",
    description: "Relax on East Africa's pristine beaches. White sands, turquoise waters, and luxury resorts.",
    images: [{
      url: "/og/beach-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Zanzibar Beach Paradise",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beach & Island Holidays 2026 | East Africa Coast",
    description: "Paradise found on East Africa's pristine beaches.",
    images: ["/twitter/beach-2026.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/beach-holidays#product",
      name: "Beach Holiday Packages 2026",
      description: "Luxury beach holidays and island escapes across East Africa's coastline and lakes.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "350",
        highPrice: "2500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: beachTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "450",
      },
    },
  ],
}

export default function BeachHolidaysPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="beach-holidays"
        categoryOpts={{
          title: "East Africa Beach Holidays — Zanzibar & Diani",
          description: "Combine safari and beach on Kenya and Tanzania's Indian Ocean coast. Zanzibar, Diani Beach packages.",
          image: "/zanzibar-stone-town-view-min-800x600.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("beach") || t.title?.toLowerCase().includes("beach") || t.description?.toLowerCase().includes("beach")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd data={jsonLd} id="beach-schema" />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-blue-400" />
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
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/safari-types" className="hover:text-blue-400 transition">Safari Types</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Beach & Island Holidays 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Umbrella className="h-3.5 w-3.5" />
                Zanzibar
              </span>
              <span className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-sm border border-cyan-100">
                <Waves className="h-3.5 w-3.5" />
                Diani Beach
              </span>
              <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-teal-100">
                <Fish className="h-3.5 w-3.5" />
                Pemba Diving
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-blue-400 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="text-sm text-gray-500">from 450+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">12+</div>
                <div className="text-sm text-gray-500">Beach destinations</div>
                <div className="text-xs text-gray-400 mt-1">ocean & lakes</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$350</div>
                <div className="text-sm text-gray-500">Starting price</div>
                <div className="text-xs text-gray-400 mt-1">beach escapes</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-blue-400 hover:bg-blue-500 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View Beach Packages
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-400 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Plan Your Escape
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== BEACH DESTINATIONS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                Paradise Found
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                East Africa's Finest Beaches
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇹🇿</div>
                <h3 className="font-bold text-lg mb-2">Zanzibar</h3>
                <p className="text-sm text-gray-600 mb-3">Tanzania</p>
                <p className="text-xs">Nungwi, Kendwa, Paje. Spice tours, Stone Town, diving.</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇰🇪</div>
                <h3 className="font-bold text-lg mb-2">Diani Beach</h3>
                <p className="text-sm text-gray-600 mb-3">Kenya</p>
                <p className="text-xs">White sands, coral reefs, water sports, beach resorts.</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇹🇿</div>
                <h3 className="font-bold text-lg mb-2">Pemba Island</h3>
                <p className="text-sm text-gray-600 mb-3">Tanzania</p>
                <p className="text-xs">World-class diving, untouched beaches, clove plantations.</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇰🇪</div>
                <h3 className="font-bold text-lg mb-2">Mombasa</h3>
                <p className="text-sm text-gray-600 mb-3">Kenya</p>
                <p className="text-xs">Coastal culture, Fort Jesus, Nyali Beach, local cuisine.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇺🇬</div>
                <h3 className="font-bold text-lg mb-2">Ssese Islands</h3>
                <p className="text-sm text-gray-600 mb-3">Uganda</p>
                <p className="text-xs">Lake Victoria beaches, island hopping, relaxation.</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇺🇬</div>
                <h3 className="font-bold text-lg mb-2">Lake Bunyonyi</h3>
                <p className="text-sm text-gray-600 mb-3">Uganda</p>
                <p className="text-xs">Africa's second deepest lake. Canoeing, birding, relaxation.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇷🇼</div>
                <h3 className="font-bold text-lg mb-2">Lake Kivu</h3>
                <p className="text-sm text-gray-600 mb-3">Rwanda</p>
                <p className="text-xs">Beautiful lake beaches, island tours, coffee culture.</p>
              </div>
            </div>
          </section>
          
          {/* ========== BEACH ACTIVITIES ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                Beyond the Beach
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Activities & Experiences
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🤿</div>
                <h3 className="font-bold text-lg mb-2">Scuba Diving</h3>
                <p className="text-sm text-gray-600">Pemba, Zanzibar, Diani. Coral reefs, shipwrecks, marine life.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🏄</div>
                <h3 className="font-bold text-lg mb-2">Water Sports</h3>
                <p className="text-sm text-gray-600">Kitesurfing, snorkeling, kayaking, paddleboarding.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🛶</div>
                <h3 className="font-bold text-lg mb-2">Boat Excursions</h3>
                <p className="text-sm text-gray-600">Sunset cruises, island hopping, fishing trips.</p>
              </div>
            </div>
          </section>
          
          {/* ========== SAFARI & BEACH COMBOS ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  The Perfect Safari & Beach Combo
                </h2>
                <p className="text-lg text-gray-600">
                  Combine your wildlife adventure with beach relaxation. The ultimate East Africa itinerary.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Kenya Safari + Diani Beach</h3>
                  <p className="text-gray-600 mb-4">7-10 days: Masai Mara/Amboseli + Diani Beach relaxation</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">• Big Five safari in Masai Mara</li>
                    <li className="flex items-center gap-2">• Elephants at Amboseli with Kilimanjaro</li>
                    <li className="flex items-center gap-2">• 3-4 days at Diani Beach resorts</li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Tanzania Safari + Zanzibar</h3>
                  <p className="text-gray-600 mb-4">10-14 days: Northern Circuit + Zanzibar beach escape</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">• Serengeti & Ngorongoro safari</li>
                    <li className="flex items-center gap-2">• Great Migration viewing (seasonal)</li>
                    <li className="flex items-center gap-2">• 4-5 days in Zanzibar</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                Choose Your Escape
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Beachfront resorts • All-inclusive options • Water activities • Airport transfers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-8">
              {beachTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Relax on East Africa's pristine beaches with luxury accommodations."}
                  price={tour.price ?? 350}
                  rating={tour.rating ?? 4.8}
                  reviewCount={tour.reviewCount ?? 70 + index * 15}
                  location={tour.country || "East Africa"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="Beachfront resort"
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.slug.includes("zanzibar") ? "🏝️ Zanzibar" : "🏖️ Beach"}
                  pickup="Airport transfers included"
                />
              ))}
            </div>
            
            <div className="text-center mt-16 pb-8">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-400 rounded-full"
              >
                <Link href="/tours?category=beach">
                  View All Beach Holidays <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Beach Holidays
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-blue-400 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Perfect beach weather. Sunny days, calm seas, excellent for water sports.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Short Rains</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">January – March</p>
                  <p className="text-gray-600 mb-4">Warm weather, fewer crowds, good value. Brief afternoon showers.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Long rains (April-May) best avoided for beach holidays. November-December also good.
              </p>
            </div>
          </section>
          
          {/* ========== TESTIMONIAL ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-16 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <Umbrella className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <p className="text-2xl italic text-gray-700 mb-6">
                  "After our safari, we spent 5 days in Zanzibar. The perfect combination - thrilling wildlife followed by pure relaxation on those incredible beaches. Sunset dhow cruise was magical."
                </p>
                <div className="font-medium">— David & Emma, United Kingdom</div>
                <div className="text-sm text-gray-500 mt-2">Safari & Zanzibar Combo, 2025</div>
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
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Escape to Paradise?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Zanzibar's white sands, Diani's palm-fringed beaches, Pemba's diving, or Lake Bunyonyi's tranquility.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-blue-400 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/booking">
                    <Calendar className="mr-2 h-5 w-5" /> 
                    Book Your Beach Escape
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