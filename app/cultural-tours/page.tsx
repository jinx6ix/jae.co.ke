// app/cultural-tours/page.tsx
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
  Utensils
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "cultural-tours",
  title: "Cultural & City Tours 2026 | Maasai Villages, Stone Town & Kigali | Jae Travel Expeditions",
  description: "Immerse yourself in East Africa's rich cultures. Visit Maasai villages, explore Stone Town's ancient streets, discover Kigali's history, and experience local traditions. Guided cultural experiences from $80 USD.",
  h1: "Cultural & City",
  h1Sub: "Experiences 2026",
  subtitle: "Immerse Yourself in East Africa's Rich Heritage – Maasai Traditions, Stone Town's History & Rwandan Culture",
  featuredToursTitle: "Cultural Experience Packages",
  filterFn: (tour: any) => 
    tour.category?.includes("Cultural") ||
    tour.category?.includes("Heritage") ||
    tour.category?.includes("City Tour") ||
    tour.category?.includes("Food & Drink") ||
    tour.slug.includes("cultural") ||
    tour.slug.includes("maasai") ||
    tour.slug.includes("stone-town") ||
    tour.slug.includes("kigali") ||
    tour.slug.includes("carnivore") ||
    tour.slug.includes("distillery") ||
    tour.slug.includes("nyamirambo"),
}

const culturalTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "cultural tours east africa",
    "maasai village visit",
    "stone town zanzibar tour",
    "kigali city tour rwanda",
    "carnivore restaurant nairobi",
    "nyamirambo women's center",
    "thousand hills distillery",
    "arusha cultural tour",
    "east african culture experiences",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/cultural-tours",
    languages: {
      "en-US": "/en-us/cultural-tours",
      "en-GB": "/en-gb/cultural-tours",
      "en-AU": "/en-au/cultural-tours",
    },
  },
  openGraph: {
    title: "Cultural & City Tours 2026 | Maasai, Stone Town & Kigali",
    description: "Immerse yourself in East Africa's rich cultures. Village visits, historic sites, and local traditions.",
    images: [{
      url: "/og/cultural-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Maasai Cultural Experience",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cultural & City Tours 2026 | East Africa Experiences",
    description: "Immerse yourself in East Africa's rich cultural heritage.",
    images: ["/twitter/cultural-2026.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/cultural-tours#product",
      name: "Cultural Experience Packages 2026",
      description: "Guided cultural tours and city experiences across East Africa.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "80",
        highPrice: "650",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: culturalTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "320",
      },
    },
  ],
}

export default function CulturalToursPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <JsonLd data={jsonLd} id={"cultural-tours-schema"} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-purple-400">
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
                <Phone className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-purple-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/safari-types" className="hover:text-purple-600 transition">Safari Types</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Cultural & City Experiences 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Users className="h-3.5 w-3.5" />
                Maasai Villages
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <BookOpen className="h-3.5 w-3.5" />
                Stone Town Heritage
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Utensils className="h-3.5 w-3.5" />
                Culinary Experiences
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-purple-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-purple-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.7/5</div>
                <div className="text-sm text-gray-500">from 320+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-500">Cultural experiences</div>
                <div className="text-xs text-gray-400 mt-1">across 4 countries</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$80</div>
                <div className="text-sm text-gray-500">Starting price</div>
                <div className="text-xs text-gray-400 mt-1">half-day tours</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-purple-600 hover:bg-purple-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View Cultural Tours
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  Customize Your Experience
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== CULTURAL SHOWCASE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-purple-600 mb-4">
                Authentic Encounters
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Cultural Experiences by Country
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇰🇪 Kenya</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Maasai village visits</li>
                  <li>• Carnivore Restaurant</li>
                  <li>• Nairobi National Park</li>
                  <li>• Karen Blixen Museum</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇹🇿 Tanzania</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Stone Town UNESCO</li>
                  <li>• Spice tours Zanzibar</li>
                  <li>• Arusha cultural tour</li>
                  <li>• Hadzabe bushmen</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇷🇼 Rwanda</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Kigali city tour</li>
                  <li>• Genocide Memorial</li>
                  <li>• Nyamirambo Women's Center</li>
                  <li>• Thousand Hills Distillery</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇺🇬 Uganda</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Kampala city tour</li>
                  <li>• Buganda heritage</li>
                  <li>• Ndere Cultural Centre</li>
                  <li>• Source of the Nile</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-purple-600 mb-4">
                Choose Your Experience
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Local guides • Authentic experiences • All entrance fees • Transportation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {culturalTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Authentic cultural experience with local guides."}
                  price={tour.price ?? 80}
                  rating={tour.rating ?? 4.7}
                  reviewCount={tour.reviewCount ?? 60 + index * 10}
                  location={tour.country || "East Africa"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="All fees included"
                  href={tour.url || `/tours/${tour.slug}`}
                  badge={tour.category?.includes("City Tour") ? "🏙️ City Tour" : "🎭 Cultural"}
                  pickup="Hotel/Airport pickup available"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 rounded-full"
              >
                <Link href="/tours?category=cultural">
                  View All Cultural Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== TESTIMONIAL ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-16 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <Music className="h-12 w-12 text-purple-600 mx-auto mb-6" />
                <p className="text-2xl italic text-gray-700 mb-6">
                  "The Maasai village visit was the highlight of our trip. Dancing with the warriors, learning about their traditions, and sharing a meal with a local family gave us memories we'll treasure forever."
                </p>
                <div className="font-medium">— Sarah & Michael, Australia</div>
                <div className="text-sm text-gray-500 mt-2">Maasai Cultural Experience, 2025</div>
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
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Connect with East Africa's Cultures?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Meet the Maasai, explore Stone Town, discover Kigali, and taste local flavors.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-purple-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/booking">
                    <Calendar className="mr-2 h-5 w-5" /> 
                    Book Your Experience
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