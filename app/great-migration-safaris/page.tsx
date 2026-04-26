import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/great-migration-safaris/page.tsx
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
  Droplet,
  Trees,
  Waves
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "great-migration-safaris",
  title: "Great Migration Safaris 2026 | Masai Mara & Serengeti River Crossings | Jae Travel Expeditions",
  description: "Witness the 2026 Great Wildebeest Migration – Mara River crossings peak Aug–Sep, calving Jan–Mar. Masai Mara & Serengeti private safaris from $1,200 USD. Kenya-based operator with local expertise.",
  h1: "Great Migration",
  h1Sub: "Safaris 2026",
  subtitle: "1.5+ Million Wildebeest – Epic River Crossings, Calving Drama & Predator Action Across Kenya & Tanzania",
  featuredToursTitle: "Great Migration Safari Packages",
  filterFn: (tour: any) => 
    tour.destinations?.includes("serengeti") || 
    tour.destinations?.includes("masai-mara") ||
    tour.tags?.includes("migration") ||
    tour.slug.includes("migration") ||
    tour.slug.includes("mara"),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

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
    "great migration safaris 2026",
    "masai mara river crossings 2026",
    "serengeti wildebeest migration august september",
    "great migration calving season january march",
    "masai mara serengeti migration packages",
    "best time great migration 2026",
    "mara river crossings safari kenya",
    "wildebeest migration tanzania kenya",
    "Jae Travel migration safaris",
    "east africa safari tours",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/great-migration-safaris",
    languages: {
      "en-US": "/en-us/great-migration-safaris",
      "en-GB": "/en-gb/great-migration-safaris",
      "en-AU": "/en-au/great-migration-safaris",
    },
  },
  openGraph: {
    title: "Great Migration Safaris 2026 | Masai Mara & Serengeti | Jae Travel Expeditions",
    description: "Witness the greatest wildlife spectacle on earth. Mara River crossings, calving season, predator action. Kenya-based expert operators since 2015.",
    images: [{
      url: "/og/great-migration-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Great Migration Wildebeest Crossing Mara River",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Migration Safaris 2026 | Masai Mara & Serengeti",
    description: "Witness the greatest wildlife spectacle on earth. Book your 2026 migration safari.",
    images: ["/twitter/great-migration.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/great-migration-safaris#product",
      name: "Great Migration Safari Packages 2026",
      description: "Private guided safaris tracking the Great Migration across Masai Mara and Serengeti.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "1200",
        highPrice: "8500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "18",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "750",
      },
    },
    {
      "@type": "TouristTrip",
      name: "Great Migration Safari - Masai Mara & Serengeti",
      description: "Follow the greatest wildlife migration on earth across Kenya and Tanzania.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Masai Mara National Reserve",
          description: "Dramatic Mara River crossings, peak July-October",
        },
        {
          "@type": "TouristDestination",
          name: "Serengeti National Park",
          description: "Endless plains, calving season January-March",
        },
        {
          "@type": "TouristDestination",
          name: "Ndutu Area",
          description: "Calving grounds with intense predator action",
        },
      ],
    },
  ],
}

export default function GreatMigrationSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="great-migration-safaris"
        categoryOpts={{
          title: "Great Migration Safaris East Africa 2026",
          description: "Witness the greatest wildlife spectacle on Earth. Masai Mara and Serengeti packages.",
          image: "/masai-mara-migration.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("migration") || t.title?.toLowerCase().includes("migration") || t.description?.toLowerCase().includes("migration")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd id="great-migration-safaris-schema" data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR - Minimal ========== */}
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
          
          {/* ========== BREADCRUMBS - Clean ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-amber-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-amber-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/kenya-tanzania" className="hover:text-amber-600 transition">Kenya & Tanzania</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Great Migration Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Waves className="h-3.5 w-3.5" />
                Mara River Crossings
              </span>
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm border border-orange-100">
                <Eye className="h-3.5 w-3.5" />
                Calving Season
              </span>
              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm border border-red-100">
                <Zap className="h-3.5 w-3.5" />
                Predator Action
              </span>
            </div>

            {/* Main heading - elegant split */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-amber-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            {/* Subtitle - elegant */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* Stats - clean horizontal line */}
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
                <div className="text-sm text-gray-500">from 1,200+ reviews</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">1.5M+</div>
                <div className="text-sm text-gray-500">Wildebeest & Zebra</div>
                <div className="text-xs text-gray-400 mt-1">on the move</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">8,000+</div>
                <div className="text-sm text-gray-500">Daily newborns</div>
                <div className="text-xs text-gray-400 mt-1">calving season Jan-Mar</div>
              </div>
            </div>

            {/* CTA Buttons - generous spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-amber-600 hover:bg-amber-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/tours/masai-mara-migration">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View 2026 Packages
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
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Kilimanjaro Airport</span>
                <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm shadow-sm">Cross-border itineraries</span>
              </div>
            </div>
          </header>
          
          {/* ========== WHY KENYA-BASED OPERATOR ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left column */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-amber-300 mb-6">
                    Why Choose Us
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    Follow the Herds
                    <span className="block text-amber-300 mt-2">Across Two Countries</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    Based in Nairobi, we're uniquely positioned to track the migration across Kenya and Tanzania. Our guides follow the herds year-round.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "Expert guides with 20+ years tracking the migration",
                      "Seamless cross-border itineraries - Kenya & Tanzania",
                      "Real-time herd tracking for optimal river crossing timing",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-amber-300 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right column - Quick facts */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-amber-300" />
                    2026 Migration Facts
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Mara River crossings</span>
                      <span className="text-white font-medium">Aug-Sep peak</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Calving season</span>
                      <span className="text-white font-medium">Jan-Mar</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Masai Mara fees (peak)</span>
                      <span className="text-white font-medium">$200/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Recommended stay</span>
                      <span className="text-white font-medium">7+ days</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-amber-300">
                      All fees included in packages
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
          
          {/* ========== MIGRATION FORECAST 2026 ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                Plan Your Visit
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Migration Forecast 2026
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our guides track the herds daily. Use this calendar to plan your safari for river crossings or calving.
              </p>
            </div>
            
            <MigrationCalendar />
          </section>
          
          {/* ========== VIDEO HIGHLIGHTS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                Experience It
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                The Greatest Show on Earth
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Watch millions of wildebeest thunder across the savanna and brave crocodile-filled rivers.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-migration-video-id" 
                title="Great Migration Safari Experience - Masai Mara & Serengeti"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Professional guide • Park fees • Luxury camps • Nairobi/Arusha pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Private guided safari tracking the Great Migration – river crossings, calving, predators."}
                  price={tour.price ?? 1200}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 160 + index * 30}
                  location="Masai Mara / Serengeti"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug || "great-migration-2026"}`}
                  badge={index === 0 ? "Best Seller" : index === 1 ? "Top Rated" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600 rounded-full"
              >
                <Link href="/tours?tag=migration">
                  View All Migration Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== CROSSING VS CALVING ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                Which Experience?
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                River Crossings or Calving?
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Two dramatically different experiences. Choose based on what moves you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center mb-6">
                  <Waves className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Mara River Crossings</h3>
                <p className="text-amber-600 font-light text-xl mb-4">July – October</p>
                <p className="text-gray-700 mb-6">
                  The ultimate wildlife drama. Thousands plunge into crocodile-infested waters. Heart-stopping action.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Peak crossings: August-September</li>
                  <li className="flex items-center gap-2">• Northern Serengeti & Masai Mara</li>
                  <li className="flex items-center gap-2">• High predator activity</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                  <Sunrise className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Calving Season</h3>
                <p className="text-green-600 font-light text-xl mb-4">January – March</p>
                <p className="text-gray-700 mb-6">
                  8,000+ newborns daily. Lush green plains. Intense predator action as lions and cheetahs hunt the vulnerable.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Southern Serengeti / Ndutu</li>
                  <li className="flex items-center gap-2">• Fewer crowds, excellent photography</li>
                  <li className="flex items-center gap-2">• Best for cheetah sightings</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== PRO TIPS ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Pro Tips for 2026
                </h2>
                <p className="text-gray-600">Insider knowledge from guides who've spent decades following the herds.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">Gear Essentials</h3>
                  <p className="text-sm text-gray-600">300-600mm zoom, bean bag, dust cover, 50+ SPF. Dawn and dusk for best light.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">Timing Wins</h3>
                  <p className="text-sm text-gray-600">7+ days recommended. Crossings unpredictable - longer stays increase odds.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">Cross-Border</h3>
                  <p className="text-sm text-gray-600">Combine Masai Mara + Serengeti for the complete migration experience.</p>
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
          
          {/* ========== FINAL CTA - Minimal ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Witness the Migration?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Mara River chaos, calving newborns, predator hunts. Peak August-September dates filling fast.
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