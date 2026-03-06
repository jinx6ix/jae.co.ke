// app/adventure-trekking/page.tsx
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
  Flame
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"

const CONFIG = {
  slug: "adventure-trekking",
  title: "Adventure & Trekking 2026 | Kilimanjaro, Mount Kenya & Rwenzori | Jae Travel Expeditions",
  description: "Challenge yourself with East Africa's greatest treks. Climb Kilimanjaro (5,895m), Mount Kenya, or the Rwenzori Mountains. Expert guides, safety protocols, and unforgettable summit experiences. Packages from $1,100 USD.",
  h1: "Adventure & Trekking",
  h1Sub: "2026",
  subtitle: "Conquer Africa's Highest Peaks – Kilimanjaro, Mount Kenya & the Mountains of the Moon",
  featuredToursTitle: "Adventure & Trekking Packages",
  filterFn: (tour: any) => 
    tour.category?.includes("Mountain Climbing") ||
    tour.category?.includes("Mountain Trekking") ||
    tour.category?.includes("Adventure") ||
    tour.slug.includes("kilimanjaro") ||
    tour.slug.includes("mount-kenya") ||
    tour.slug.includes("rwenzori") ||
    tour.slug.includes("climbing") ||
    tour.slug.includes("hiking") ||
    tour.slug.includes("trekking") ||
    tour.slug.includes("hells-gate") ||
    tour.slug.includes("jinja"),
}

const adventureTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1547483238-f400e65ccd4f?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "kilimanjaro climbing 2026",
    "mount kenya trekking",
    "rwenzori mountains hiking",
    "africa mountain trekking",
    "kilimanjaro machame route",
    "mount kenya point lenana",
    "jinja white water rafting",
    "hells gate biking",
    "east africa adventure tours",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/adventure-trekking",
    languages: {
      "en-US": "/en-us/adventure-trekking",
      "en-GB": "/en-gb/adventure-trekking",
      "en-AU": "/en-au/adventure-trekking",
    },
  },
  openGraph: {
    title: "Adventure & Trekking 2026 | Kilimanjaro, Mount Kenya & Rwenzori",
    description: "Challenge yourself with East Africa's greatest treks. Expert guides, safety protocols, unforgettable summits.",
    images: [{
      url: "/og/adventure-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Kilimanjaro Climbing Adventure",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventure & Trekking 2026 | Kilimanjaro & Mount Kenya",
    description: "Conquer Africa's highest peaks with expert guides.",
    images: ["/twitter/adventure-2026.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/adventure-trekking#product",
      name: "Adventure & Trekking Packages 2026",
      description: "Guided treks to East Africa's highest peaks including Kilimanjaro, Mount Kenya, and Rwenzori.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "350",
        highPrice: "3800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: adventureTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "380",
      },
    },
  ],
}

export default function AdventureTrekkingPage() {
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
                <Globe className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-orange-400">
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
                <Phone className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-orange-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/safari-types" className="hover:text-orange-600 transition">Safari Types</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Adventure & Trekking 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm border border-orange-100">
                <Mountain className="h-3.5 w-3.5" />
                Kilimanjaro (5,895m)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Tent className="h-3.5 w-3.5" />
                Mount Kenya (4,985m)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Flame className="h-3.5 w-3.5" />
                Rwenzori (5,109m)
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-orange-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-orange-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-500">from 380+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">5,895m</div>
                <div className="text-sm text-gray-500">Kilimanjaro</div>
                <div className="text-xs text-gray-400 mt-1">Africa's highest</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$1,100</div>
                <div className="text-sm text-gray-500">Starting price</div>
                <div className="text-xs text-gray-400 mt-1">all-inclusive treks</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-orange-600 hover:bg-orange-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View Trekking Packages
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-orange-600 hover:text-orange-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Plan Your Ascent
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== MOUNTAIN SHOWCASE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                The Big Three
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                East Africa's Highest Peaks
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Mount Kilimanjaro</h3>
                <p className="text-3xl font-light text-orange-600 mb-4">5,895m</p>
                <p className="text-gray-700 mb-4">Africa's highest peak. Multiple routes: Machame, Marangu, Lemosho, Rongai.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• 5-9 day routes</li>
                  <li className="flex items-center gap-2">• No technical climbing required</li>
                  <li className="flex items-center gap-2">• Summit Uhuru Peak</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Mount Kenya</h3>
                <p className="text-3xl font-light text-green-600 mb-4">4,985m</p>
                <p className="text-gray-700 mb-4">Africa's second highest. Scenic routes through alpine zones.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Point Lenana trekking peak</li>
                  <li className="flex items-center gap-2">• Sirimon/Chogoria routes</li>
                  <li className="flex items-center gap-2">• 4-6 day expeditions</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Rwenzori Mountains</h3>
                <p className="text-3xl font-light text-blue-600 mb-4">5,109m</p>
                <p className="text-gray-700 mb-4">Mountains of the Moon. Unique alpine vegetation, glaciers.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Margherita Peak</li>
                  <li className="flex items-center gap-2">• 7-10 day treks</li>
                  <li className="flex items-center gap-2">• Challenging terrain</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== ADVENTURE ACTIVITIES ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                More Adventures
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Beyond the Mountains
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🚴</div>
                <h3 className="font-bold text-lg mb-2">Hell's Gate Cycling</h3>
                <p className="text-sm text-gray-600">Bike through dramatic gorges with zebras and giraffes.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-bold text-lg mb-2">White Water Rafting</h3>
                <p className="text-sm text-gray-600">Grade 5 rapids on the Nile River in Jinja, Uganda.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🥾</div>
                <h3 className="font-bold text-lg mb-2">Walking Safaris</h3>
                <p className="text-sm text-gray-600">Guided nature walks in Laikipia, Samburu, and more.</p>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Certified mountain guides • Safety protocols • All park fees • Quality equipment • Accommodation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {adventureTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Guided trekking adventure in East Africa's mountains."}
                  price={tour.price ?? 1100}
                  rating={tour.rating ?? 4.8}
                  reviewCount={tour.reviewCount ?? 80 + index * 15}
                  location={tour.country || "East Africa"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.title.includes("Kilimanjaro") ? "🏔️ Summit" : index === 0 ? "Best Seller" : undefined}
                  pickup="Nairobi • Arusha • Entebbe"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-orange-600 hover:text-orange-600 rounded-full"
              >
                <Link href="/tours?category=adventure">
                  View All Adventures <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                  Plan Your Climb
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Trekking
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-orange-600 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Best conditions for all mountains. Clear skies, stable weather.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Short Dry</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">January – March</p>
                  <p className="text-gray-600 mb-4">Good conditions, fewer climbers, excellent visibility.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Avoid long rains (April-May, November) for best trekking conditions.
              </p>
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
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Reach New Heights?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Summit Kilimanjaro, conquer Mount Kenya, or explore the Rwenzori. Expert guides, safe ascents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-orange-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
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