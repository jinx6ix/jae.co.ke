// app/amboseli-safaris/page.tsx
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
  Baby,
  Footprints,
  Cloud
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "amboseli-safaris",
  title: "Amboseli Safari 2026 | Elephants & Kilimanjaro Views",
  description:
    "Amboseli 2026 safari: elephants, newborn calves & Mount Kilimanjaro views. Private 4x4 game drives from Nairobi. From $1,150 all-inclusive.",
  h1: "Amboseli Safaris",
  h1Sub: "2026",
  subtitle: "Where Massive Elephant Families Meet Africa's Tallest Mountain – Baby Boom Continues with 220+ New Calves",
  featuredToursTitle: "Amboseli Safari Packages",
  filterFn: (tour: any) => 
    tour.destinations?.includes("amboseli") || 
    tour.slug.includes("amboseli") ||
    tour.title.toLowerCase().includes("amboseli"),
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
    "amboseli safaris 2026",
    "amboseli elephant baby boom 2026",
    "best amboseli safari from nairobi 2026",
    "amboseli kilimanjaro safari package",
    "private amboseli safari 2026",
    "amboseli national park safari prices 2026",
    "kenya elephant safari",
    "mount kilimanjaro view safari",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/amboseli-safaris",
    languages: {
      "en-US": "/en-us/amboseli-safaris",
      "en-GB": "/en-gb/amboseli-safaris",
      "en-AU": "/en-au/amboseli-safaris",
    },
  },
  openGraph: {
    title: "Amboseli Safaris 2026 | Elephant Baby Boom & Kilimanjaro | Jae Travel Expeditions",
    description: "Witness 220+ new elephant calves against Mount Kilimanjaro. Private safaris from Nairobi. Kenya-based operator since 2015.",
    images: [{
      url: "/og/amboseli-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Elephants with Mount Kilimanjaro Amboseli Kenya",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amboseli Safaris 2026 | Elephant Baby Boom & Kilimanjaro",
    description: "Witness 220+ new elephant calves against Mount Kilimanjaro. Book your 2026 safari.",
    images: ["/twitter/amboseli-2026.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/amboseli-safaris#product",
      name: "Amboseli Safari Packages 2026",
      description: "Private guided safaris to Amboseli National Park featuring elephant families and Kilimanjaro views.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "1150",
        highPrice: "2800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "10",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "420",
      },
    },
    {
      "@type": "TouristTrip",
      name: "Amboseli Elephant Safari",
      description: "Track massive elephant families against the backdrop of Mount Kilimanjaro.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Amboseli National Park",
          description: "Home to over 2,000 elephants with 220+ new calves in 2025-2026",
        },
        {
          "@type": "TouristDestination",
          name: "Observation Hill",
          description: "Panoramic views of the park and Kilimanjaro",
        },
      ],
    },
  ],
}

export default function AmboseliSafarisPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <JsonLd data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR - Minimal ========== */}
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
          
          {/* ========== BREADCRUMBS - Clean ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-green-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-green-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/kenya" className="hover:text-green-600 transition">Kenya</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Amboseli Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Baby className="h-3.5 w-3.5" />
                220+ New Calves
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Mountain className="h-3.5 w-3.5" />
                Kilimanjaro Views
              </span>
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Footprints className="h-3.5 w-3.5" />
                Private 4x4 Safaris
              </span>
            </div>

            {/* Main heading - elegant split */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-green-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-green-400 mb-2">
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
                <div className="text-2xl font-bold text-gray-900">2,000+</div>
                <div className="text-sm text-gray-500">Elephants</div>
                <div className="text-xs text-gray-400 mt-1">220+ new calves 2025-26</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$90</div>
                <div className="text-sm text-gray-500">Park fee</div>
                <div className="text-xs text-gray-400 mt-1">included in packages</div>
              </div>
            </div>

            {/* CTA Buttons - generous spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-green-600 hover:bg-green-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/tours/amboseli-elephant-safari">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  View 2026 Packages
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
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Jomo Kenyatta Airport</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Wilson Airport</span>
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm shadow-sm">3-4 hour drive</span>
              </div>
            </div>
          </header>
          
          {/* ========== WHY KENYA-BASED OPERATOR ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left column */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-green-300 mb-6">
                    Why Choose Us
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    Your Amboseli Experts
                    <span className="block text-green-300 mt-2">Just 3 Hours from Nairobi</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    Based in Nairobi, we're perfectly positioned to offer seamless Amboseli safaris. Our guides have decades of experience with the park's famous elephant families.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "Expert guides who know individual elephant families by name",
                      "Track the 2025-2026 baby boom - 220+ new calves",
                      "Perfect timing for Kilimanjaro sunrise photography",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right column - Quick facts */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-green-300" />
                    2026 Amboseli Facts
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Distance from Nairobi</span>
                      <span className="text-white font-medium">3-4 hours</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Elephant population</span>
                      <span className="text-white font-medium">2,000+</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">New calves (2025-26)</span>
                      <span className="text-white font-medium">220+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Best months</span>
                      <span className="text-white font-medium">Jun-Oct, Jan-Feb</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-green-300">
                      Park fees: $90/adult - included in all packages
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
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Experience It
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Giants of Amboseli
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Watch massive elephant families with playful calves against the backdrop of Africa's tallest mountain.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-amboseli-video-id" 
                title="Amboseli Elephant Safari - Kenya"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== THE BABY BOOM ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Special Update
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                The 2025-2026 Baby Boom
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Thanks to excellent rains and conservation efforts, Amboseli is experiencing one of its biggest elephant baby booms in decades.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                    <Baby className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">220+</div>
                    <p className="text-gray-600">New calves in 2025-26</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  The boom continues into 2026 with fresh arrivals already recorded. Expect to see playful youngsters splashing in swamps, nursing, and learning from experienced matriarchs.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                    <Mountain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">5,895m</div>
                    <p className="text-gray-600">Mount Kilimanjaro</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  The perfect backdrop for elephant photography. Clear dry-season mornings offer stunning views of Africa's highest peak with elephants in the foreground.
                </p>
              </div>
            </div>
          </section>
          
          {/* ========== BEST TIME ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Amboseli
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">Peak Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Best Kilimanjaro visibility, wildlife gathers at swamps, clear skies for photography.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Value Season</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">January – March</p>
                  <p className="text-gray-600 mb-4">Good visibility, fewer crowds, lush landscapes, excellent for young animals.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Skip April-May (long rains) for smoothest drives.
              </p>
            </div>
          </section>
          
          {/* ========== WHAT YOU'LL SEE ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Wildlife Highlights
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Magical Moments Await
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🐘</div>
                <h3 className="font-medium mb-2">Elephant Families</h3>
                <p className="text-sm text-gray-600">Huge herds with playful calves</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🏔️</div>
                <h3 className="font-medium mb-2">Kilimanjaro</h3>
                <p className="text-sm text-gray-600">Snow-capped peak at sunrise</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦁</div>
                <h3 className="font-medium mb-2">Big Cats</h3>
                <p className="text-sm text-gray-600">Lions, cheetahs on the plains</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦒</div>
                <h3 className="font-medium mb-2">Plains Game</h3>
                <p className="text-sm text-gray-600">Giraffe, zebra, buffalo</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦅</div>
                <h3 className="font-medium mb-2">Birdlife</h3>
                <p className="text-sm text-gray-600">400+ species, flamingos</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">👥</div>
                <h3 className="font-medium mb-2">Maasai Culture</h3>
                <p className="text-sm text-gray-600">Optional village visits</p>
              </div>
            </div>
          </section>
          
          {/* ========== PRO TIPS ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Pro Tips for 2026
                </h2>
                <p className="text-gray-600">Insider knowledge for the perfect Amboseli safari.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Gear Essentials</h3>
                  <p className="text-sm text-gray-600">200-600mm lens, binoculars, dust scarf, light layers for early mornings.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Best Light</h3>
                  <p className="text-sm text-gray-600">Dawn game drives for Kilimanjaro sunrise with elephants in foreground.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Combine Parks</h3>
                  <p className="text-sm text-gray-600">Add Tsavo or Masai Mara for 7-10 day custom itineraries.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Expert guide • Park fees • All meals • Nairobi pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Private safari from Nairobi – baby elephants, Kilimanjaro views, expert guiding."}
                  price={tour.price ?? 1150}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 150 + index * 25}
                  location="Amboseli, Kenya"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug || "amboseli-2026"}`}
                  badge={index === 0 ? "Best Seller" : index === 1 ? "Top Rated" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full"
              >
                <Link href="/tours?destination=amboseli">
                  View All Amboseli Tours <span className="ml-2">→</span>
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
            <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready for Your Amboseli Adventure?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                220+ new elephant calves • Kilimanjaro views • Private safaris • Peak dates filling fast.
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