import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/birdwatching-safaris-east-africa/page.tsx
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
  Droplets,
  Trees,
  Bird,
  Feather,
  Cloud,
  Binoculars
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "birdwatching-safaris-east-africa",
  title: "Birdwatching Safaris Kenya 2026 | 1,400+ Bird Species",
  description:
    "2026 birdwatching safaris in Kenya, Tanzania & Uganda. See flamingos, shoebills & migratory birds. Expert guides. From $450.",
  h1: "Birdwatching Safaris",
  h1Sub: "East Africa 2026",
  subtitle: "Over 1,400 Species – Migratory Wonders, Flamingo Spectacles & Rare Gems Across Kenya, Tanzania & Uganda",
  featuredToursTitle: "Birdwatching Safari Packages",
  filterFn: (tour: any) => 
    tour.destinations?.includes("kenya") || 
    tour.destinations?.includes("tanzania") || 
    tour.destinations?.includes("uganda") ||
    tour.tags?.includes("birding") ||
    tour.tags?.includes("flamingo") ||
    tour.slug.includes("bird") || 
    tour.slug.includes("flamingo") || 
    tour.slug.includes("nakuru"),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

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
    "birdwatching safaris east africa 2026",
    "birding kenya tanzania uganda 2026",
    "lake nakuru flamingos tour 2026",
    "shoebill uganda birdwatching",
    "migratory birds east africa november april",
    "lilac breasted roller serengeti safari",
    "best birdwatching east africa 2026",
    "kibale forest birding uganda",
    "Jae Travel birdwatching safaris",
    "rift valley birding safari",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/birdwatching-safaris-east-africa",
    languages: {
      "en-US": "/en-us/birdwatching-safaris-east-africa",
      "en-GB": "/en-gb/birdwatching-safaris-east-africa",
      "en-AU": "/en-au/birdwatching-safaris-east-africa",
    },
  },
  openGraph: {
    title: "Birdwatching Safaris East Africa 2026 | 1,400+ Species | Jae Travel Expeditions",
    description: "Premier birdwatching safaris in Kenya, Tanzania & Uganda. Flamingos, shoebills, rollers, and 1,400+ species. Expert guides, photography focused.",
    images: [{
      url: "/og/birdwatching-east-africa-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Birdwatching Safari East Africa - Flamingos at Lake Nakuru",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birdwatching Safaris East Africa 2026 | 1,400+ Species",
    description: "Premier birding in Kenya, Tanzania & Uganda. Flamingos, shoebills, rollers. Book your 2026 safari.",
    images: ["/twitter/birdwatching-east-africa.jpg"],
    creator: "@jaetravel",
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
      "@id": "https://www.jaetravel.co.ke/birdwatching-safaris-east-africa#product",
      name: "Birdwatching Safari Packages 2026",
      description: "Expert-guided birding safaris across Kenya, Tanzania and Uganda targeting 1,400+ species.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "450",
        highPrice: "3500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "15",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "380",
      },
    },
    {
      "@type": "TouristTrip",
      name: "East Africa Birdwatching Safari",
      description: "Track 1,400+ bird species across Kenya's Rift Valley lakes, Tanzania's savannas, and Uganda's shoebill swamps.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Lake Nakuru National Park",
          description: "Flamingos, pelicans, and 450+ bird species",
        },
        {
          "@type": "TouristDestination",
          name: "Mabamba Swamp, Uganda",
          description: "Prime shoebill viewing location",
        },
        {
          "@type": "TouristDestination",
          name: "Serengeti National Park",
          description: "Lilac-breasted rollers, raptors, and savanna birds",
        },
      ],
    },
  ],
}

export default function BirdwatchingSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="birdwatching-safaris-east-africa"
        categoryOpts={{
          title: "Birdwatching Safaris East Africa — 1,000+ Species",
          description: "Expert-guided birdwatching safaris in Kenya, Tanzania, Rwanda, and Uganda. 1,000+ bird species.",
          image: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("bird") || t.title?.toLowerCase().includes("bird") || t.description?.toLowerCase().includes("bird")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd data={jsonLd} id={" birdwatching-safari-schema"} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR - Minimal ========== */}
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
          
          {/* ========== BREADCRUMBS - Clean ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-emerald-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-emerald-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/east-africa" className="hover:text-emerald-600 transition">East Africa</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Birdwatching Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-emerald-100">
                <Bird className="h-3.5 w-3.5" />
                1,400+ Species
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Cloud className="h-3.5 w-3.5" />
                Migratory Peak Nov–Apr
              </span>
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Camera className="h-3.5 w-3.5" />
                Photography Focused
              </span>
            </div>

            {/* Main heading - elegant split */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-emerald-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            {/* Subtitle - elegant */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* Stats - clean horizontal line */}
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
                <div className="text-sm text-gray-500">from 1,200+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">1,400+</div>
                <div className="text-sm text-gray-500">Bird species</div>
                <div className="text-xs text-gray-400 mt-1">across Kenya, Tanzania, Uganda</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-500">Migrants peak</div>
                <div className="text-xs text-gray-400 mt-1">November - April</div>
              </div>
            </div>

            {/* CTA Buttons - generous spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/tours/birdwatching-packages">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View 2026 Packages
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
                  Customize Your Safari
                </Link>
              </Button>
            </div>

            {/* Pickup locations - minimal card */}
            <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                <Compass className="h-4 w-4" />
                Pickup available from:
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Nairobi (Kenya)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Arusha (Tanzania)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Entebbe (Uganda)</span>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm shadow-sm">Multi-country options</span>
              </div>
            </div>
          </header>
          
          {/* ========== WHY KENYA-BASED OPERATOR ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left column */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-emerald-300 mb-6">
                    Why Choose Us
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    East Africa's
                    <span className="block text-emerald-300 mt-2">Birding Experts</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    Based in Nairobi, we're perfectly positioned to guide you across Kenya, Tanzania and Uganda. Our ornithologist guides know where the birds are, season by season.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "Specialist bird guides with 15+ years experience",
                      "Spotting scopes, hides, and photography support",
                      "Real-time tracking of flamingo movements & shoebill locations",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right column - Quick facts */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-emerald-300" />
                    2026 Birding Hotspots
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Lake Nakuru (Kenya)</span>
                      <span className="text-white font-medium">450+ species</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Mabamba Swamp (Uganda)</span>
                      <span className="text-white font-medium">Shoebill</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Serengeti (Tanzania)</span>
                      <span className="text-white font-medium">500+ species</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Kibale Forest (Uganda)</span>
                      <span className="text-white font-medium">375+ species</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-emerald-300">
                      Migratory peak: November - April
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== LIVE WILDLIFE REPORT ========== */}
          <section className="mb-40">
            <LiveWildlifeReport />
          </section>
          
          {/* ========== VIDEO HIGHLIGHTS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Experience It
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                A Birder's Paradise
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                From flamingo-pink lakes to shoebill swamps and savanna rollers.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-birding-video-id" 
                title="Birdwatching Safari - East Africa"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== TOP BIRDING DESTINATIONS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Where to Go
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Top Birding Hotspots
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Three countries, countless species. Each destination offers unique birding experiences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Kenya</h3>
                <p className="text-sm text-gray-600 mb-3">Rift Valley Lakes</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">• Lake Nakuru – flamingos, pelicans</li>
                  <li className="flex items-center gap-2">• Lake Baringo – 500+ species</li>
                  <li className="flex items-center gap-2">• Kakamega Forest – tropical forest birds</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Tanzania</h3>
                <p className="text-sm text-gray-600 mb-3">Savanna & Highlands</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">• Serengeti – rollers, raptors</li>
                  <li className="flex items-center gap-2">• Ngorongoro – flamingos, ostriches</li>
                  <li className="flex items-center gap-2">• Lake Manyara – pelicans, storks</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Uganda</h3>
                <p className="text-sm text-gray-600 mb-3">Forests & Swamps</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">• Mabamba Swamp – shoebill</li>
                  <li className="flex items-center gap-2">• Kibale Forest – turacos, hornbills</li>
                  <li className="flex items-center gap-2">• Queen Elizabeth – 600+ species</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== ICONIC BIRDS SHOWCASE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Target Species
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Birds You'll Hunt
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦩</div>
                <h3 className="font-medium">Lesser Flamingo</h3>
                <p className="text-xs text-gray-500 mt-1">Lake Nakuru, Bogoria</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦜</div>
                <h3 className="font-medium">Shoebill</h3>
                <p className="text-xs text-gray-500 mt-1">Mabamba Swamp, Uganda</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦅</div>
                <h3 className="font-medium">Lilac-breasted Roller</h3>
                <p className="text-xs text-gray-500 mt-1">Serengeti, Masai Mara</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦃</div>
                <h3 className="font-medium">Secretary Bird</h3>
                <p className="text-xs text-gray-500 mt-1">Savanna grasslands</p>
              </div>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Birding
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Cloud className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium">Peak Migratory</h3>
                  </div>
                  <p className="text-2xl font-light text-emerald-600 mb-3">November – April</p>
                  <p className="text-gray-600 mb-4">Millions of Palearctic migrants arrive. Highest species diversity, breeding plumage, lush landscapes.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Birds concentrate at waterholes. Easier spotting, excellent for savanna and raptor photography.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Year-round possible, but November-April delivers the biggest lists.
              </p>
            </div>
          </section>
          
          {/* ========== PRO TIPS ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Pro Tips for 2026
                </h2>
                <p className="text-gray-600">Insider knowledge from our ornithologist guides.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Binoculars className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-2">Gear Essentials</h3>
                  <p className="text-sm text-gray-600">Binoculars 8x42+, spotting scope, 300-600mm lens, weatherproof notebook, eBird app.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-2">Timing Wins</h3>
                  <p className="text-sm text-gray-600">Dawn/dusk for activity. Nov-Apr for migrants, dry season for waterhole concentrations.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-2">Multi-Country</h3>
                  <p className="text-sm text-gray-600">Combine Kenya lakes + Uganda shoebill + Tanzania savanna for ultimate list.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Expert guides • Spotting scopes • Small groups • Photography focused • All park fees included
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Expert-guided birding – flamingos, migrants, shoebills & photography in prime hotspots."}
                  price={tour.price ?? 450}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 120 + index * 20}
                  location={tour.location || "East Africa"}
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug || "birdwatching-2026"}`}
                  badge={index === 0 ? "Best Seller" : index === 1 ? "Top Rated" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 rounded-full"
              >
                <Link href="/tours?tag=birding">
                  View All Birding Tours <span className="ml-2">→</span>
                </Link>
              </Button>
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
          
          {/* ========== FINAL CTA - Minimal ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Build Your Ultimate Bird List?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                1,400+ species • Migratory peaks • Shoebill & flamingo hotspots • Expert guides • Limited spots for Nov-Apr.
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