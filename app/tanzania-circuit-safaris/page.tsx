import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/tanzania-circuit-safaris/page.tsx
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
  Footprints
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "tanzania-circuit-safaris",
  title: "Tanzania Circuit Safaris 2026 | Serengeti & Ngorongoro",
  description:
    "Explore Tanzania’s top parks: Serengeti migration & Ngorongoro Crater. 5–14 day guided safaris with expert guides & lodges.",
  h1: "Tanzania Circuit",
  h1Sub: "Safaris 2026",
  subtitle: "The Ultimate Safari Destination – Serengeti Migration, Ngorongoro Crater, Kilimanjaro & Beyond",
  featuredToursTitle: "Tanzania Circuit Packages",
  filterFn: (tour: any) => 
    tour.country === "Tanzania" || 
    tour.destinations?.includes("tanzania") ||
    tour.slug.includes("tanzania") ||
    tour.slug.includes("serengeti") ||
    tour.slug.includes("ngorongoro") ||
    tour.slug.includes("kilimanjaro") ||
    tour.slug.includes("tarangire") ||
    tour.slug.includes("manyara") ||
    tour.slug.includes("zanzibar"),
}

const tanzaniaTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "tanzania safari circuit",
    "serengeti migration safari",
    "ngorongoro crater tour",
    "kilimanjaro climbing",
    "tarangire elephant safari",
    "lake manyara tree lions",
    "zanzibar beach holiday",
    "northern circuit tanzania",
    "multi-park tanzania safari",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/tanzania-circuit-safaris",
    languages: {
      "en-US": "/en-us/tanzania-circuit-safaris",
      "en-GB": "/en-gb/tanzania-circuit-safaris",
      "en-AU": "/en-au/tanzania-circuit-safaris",
    },
  },
  openGraph: {
    title: "Tanzania Circuit Safaris 2026 | Serengeti, Ngorongoro & Kilimanjaro",
    description: "Witness the Great Migration, descend into Ngorongoro Crater, and climb Kilimanjaro. Multi-park Tanzania safaris.",
    images: [{
      url: "/og/tanzania-circuit-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Tanzania Safari - Serengeti Migration",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzania Circuit Safaris 2026 | Serengeti & Ngorongoro",
    description: "Experience Tanzania's legendary northern circuit. Multi-park safaris.",
    images: ["/twitter/tanzania-circuit.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/tanzania-circuit-safaris#product",
      name: "Tanzania Circuit Safari Packages 2026",
      description: "Multi-park guided safaris across Tanzania's northern circuit including Serengeti and Ngorongoro.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "950",
        highPrice: "6500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: tanzaniaTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "680",
      },
    },
  ],
}

export default function TanzaniaCircuitSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="tanzania-circuit-safaris"
        categoryOpts={{
          title: "Tanzania Circuit Safari Tours 2026",
          description: "Tanzania northern circuit safaris: Serengeti, Ngorongoro, Tarangire, and Kilimanjaro.",
          image: "/tanzania-serengeti.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("tanzania") || t.title?.toLowerCase().includes("tanzania") || t.description?.toLowerCase().includes("tanzania")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd id="jsonld" data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-amber-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
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
                <Phone className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-amber-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-amber-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/tanzania" className="hover:text-amber-600 transition">Tanzania</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Tanzania Circuit Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Footprints className="h-3.5 w-3.5" />
                Great Migration
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Mountain className="h-3.5 w-3.5" />
                Ngorongoro Crater
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Trees className="h-3.5 w-3.5" />
                Kilimanjaro
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-amber-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-amber-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">from 680+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">7+</div>
                <div className="text-sm text-gray-500">National Parks</div>
                <div className="text-xs text-gray-400 mt-1">northern circuit</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$950</div>
                <div className="text-sm text-gray-500">Starting price</div>
                <div className="text-xs text-gray-400 mt-1">multi-park itineraries</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-amber-600 hover:bg-amber-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View Tanzania Packages
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Plan Your Circuit
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== TANZANIA PARKS SHOWCASE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                The Northern Circuit
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Tanzania's Legendary Parks
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Serengeti</h3>
                <p className="text-xs text-amber-600 mb-2">Great Migration</p>
                <p className="text-sm text-gray-600">Endless plains, 1.5M wildebeest, river crossings, predator action.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Ngorongoro Crater</h3>
                <p className="text-xs text-amber-600 mb-2">UNESCO World Heritage</p>
                <p className="text-sm text-gray-600">Highest Big Five density. Black rhinos, lions, elephants in one caldera.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Kilimanjaro</h3>
                <p className="text-xs text-amber-600 mb-2">Africa's Highest Peak</p>
                <p className="text-sm text-gray-600">Climb to Uhuru Peak (5,895m). Multiple routes for all skill levels.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Tarangire</h3>
                <p className="text-xs text-amber-600 mb-2">Elephant Paradise</p>
                <p className="text-sm text-gray-600">Large elephant herds, ancient baobabs, birding paradise.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Lake Manyara</h3>
                <p className="text-xs text-amber-600 mb-2">Tree-Climbing Lions</p>
                <p className="text-sm text-gray-600">Flamingos, tree-climbing lions, groundwater forest.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-1">Zanzibar</h3>
                <p className="text-xs text-amber-600 mb-2">Spice Island</p>
                <p className="text-sm text-gray-600">Perfect beach extension. Stone Town, spice tours, coral reefs.</p>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                Choose Your Circuit
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Expert guides • All park fees • Luxury lodges • Arusha pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {tanzaniaTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Multi-park Tanzania safari including Serengeti and Ngorongoro."}
                  price={tour.price ?? 950}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 120 + index * 20}
                  location="Tanzania"
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.title.includes("Migration") ? "🦓 Migration" : index === 0 ? "Best Seller" : undefined}
                  pickup="Arusha • Kilimanjaro"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600 rounded-full"
              >
                <Link href="/tours?country=tanzania">
                  View All Tanzania Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Tanzania Safari
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Peak migration river crossings. Best wildlife viewing, clear skies.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">Calving Season</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">January – March</p>
                  <p className="text-gray-600 mb-4">Thousands of newborns. Predator action. Lush landscapes.</p>
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
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready for the Ultimate Safari?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Witness the Great Migration, descend into Ngorongoro, and stand atop Kilimanjaro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-amber-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
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