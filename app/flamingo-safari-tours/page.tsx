import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

// Import icons directly (they're tree-shaken by Next.js)
import { 
  Calendar,
  Star,
  Shield,
  CheckCircle,
  Info,
  MapPin,
  Globe,
  Phone,
  Bird,
  Feather,
  Compass,
  MessageCircle,
  Sunrise,
  Sunset,
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "flamingo-safari-tours",
  title: "Flamingo Safari Tours 2026 | Lake Nakuru & Rhinos Kenya",
  description:
    "See Lake Nakuru flamingos, rhinos & 450+ bird species. Short safaris from Nairobi from $450. Private 4x4 tours.",
  h1: "Flamingo Safari",
  h1Sub: "Tours 2026",
  subtitle: "Lake Nakuru National Park – Pink Horizons, Rhino Sanctuary & Unforgettable Birdlife",
  featuredToursTitle: "Flamingo Safari Packages",
  filterFn: (tour: any) => 
    tour.destinations?.includes("nakuru") || 
    tour.destinations?.includes("kenya") ||
    tour.tags?.includes("flamingo") ||
    tour.slug.includes("flamingo") ||
    tour.slug.includes("nakuru"),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

const fallbackImages = [
  "/images/flamingos-nakuru-1.webp",
  "/images/flamingos-nakuru-2.webp",
  "/images/flamingos-nakuru-3.webp",
  "/images/flamingos-nakuru-4.webp",
]

// Optimized hero images
const heroImages = {
  desktop: "/images/flamingo-hero-desktop.webp",
  mobile: "/images/flamingo-hero-mobile.webp",
  alt: "Thousands of pink flamingos wading in Lake Nakuru, Kenya - Jae Travel Expeditions flamingo safari tour"
}

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "flamingo safari tours 2026",
    "lake nakuru flamingos 2026",
    "lake nakuru national park safari 2026",
    "best time flamingos lake nakuru",
    "nakuru rhino sanctuary tour",
    "flamingo safari from nairobi",
    "lake bogoria flamingos alternative",
    "pink lake nakuru kenya 2026",
    "Jae Travel flamingo tours",
    "kenya birding safaris",
    "flamingo photography tour kenya",
    "budget flamingo safari kenya",
    "lake nakuru vs lake bogoria flamingos",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/flamingo-safari-tours",
    languages: {
      "en-US": "/en-us/flamingo-safari-tours",
      "en-GB": "/en-gb/flamingo-safari-tours",
      "en-AU": "/en-au/flamingo-safari-tours",
    },
  },
  openGraph: {
    title: "Flamingo Safari Tours 2026 | Lake Nakuru Kenya | Jae Travel Expeditions",
    description: "Witness thousands of flamingos at Lake Nakuru. Pink horizons, rhino sanctuary, 450+ bird species. Short safaris from Nairobi. Kenya-based operator since 2015.",
    images: [{
      url: "/og/flamingo-safari-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Flamingos at Lake Nakuru Kenya",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flamingo Safari Tours 2026 | Lake Nakuru Kenya",
    description: "Witness thousands of flamingos at Lake Nakuru. Book your 2026 safari from Nairobi.",
    images: ["/twitter/flamingo-safari.jpg"],
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

// Enhanced JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "Jae Travel Expeditions",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      sameAs: [
        "https://www.facebook.com/jaetravel",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravel",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karen Roundabout",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        addressCountry: "KE",
      },
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1200",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/flamingo-safari-tours#product",
      name: "Flamingo Safari Packages 2026",
      description: "Private guided safaris to Lake Nakuru for flamingo viewing, rhino sanctuary, and birdwatching. Includes park fees, 4x4 transport, and expert guide.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "450",
        highPrice: "1200",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "8",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "350",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "TouristTrip",
      name: "Flamingo Safari - Lake Nakuru",
      description: "Witness thousands of flamingos and rhinos at Kenya's most famous soda lake. Private 4x4 safari from Nairobi.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Lake Nakuru National Park",
          description: "Home to thousands of flamingos, rhinos, and 450+ bird species",
          geo: {
            "@type": "GeoCoordinates",
            latitude: "-0.3667",
            longitude: "36.0833",
          },
        },
        {
          "@type": "TouristDestination",
          name: "Baboon Cliff",
          description: "Panoramic views over the lake and flamingos",
        },
        {
          "@type": "TouristDestination",
          name: "Rhino Sanctuary",
          description: "Protected area for black and white rhinos",
        },
      ],
    },
    {
      "@type": "VideoObject",
      "@id": "https://www.jaetravel.co.ke/flamingo-safari-tours#video",
      name: "Flamingo Safari at Lake Nakuru - Thousands of Pink Flamingos",
      description: "Witness the spectacular pink horizon at Lake Nakuru National Park, Kenya. Thousands of flamingos create a breathtaking natural spectacle.",
      thumbnailUrl: "https://www.jaetravel.co.ke/videos/flamingo-thumbnail.jpg",
      uploadDate: "2025-01-01T00:00:00Z",
      contentUrl: "https://www.youtube.com/watch?v=YOUR_ACTUAL_VIDEO_ID",
      embedUrl: "https://www.youtube.com/embed/YOUR_ACTUAL_VIDEO_ID",
      duration: "PT2M30S",
      publisher: {
        "@type": "Organization",
        name: "Jae Travel Expeditions",
        logo: "https://www.jaetravel.co.ke/logo.png",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/flamingo-safari-tours#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best time to see flamingos at Lake Nakuru?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best time to see flamingos at Lake Nakuru is during the dry seasons from June to October and January to March. During these periods, water levels concentrate algae, attracting larger flamingo flocks.",
          },
        },
        {
          "@type": "Question",
          name: "How far is Lake Nakuru from Nairobi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lake Nakuru National Park is approximately 160 km (100 miles) from Nairobi, about a 2-hour drive. We offer daily pickups from Nairobi hotels and Jomo Kenyatta International Airport.",
          },
        },
        {
          "@type": "Question",
          name: "Can I combine Lake Nakuru with other parks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Our most popular combination is Lake Nakuru with Maasai Mara for a 4-5 day safari. We also offer tours combining Nakuru with Lake Naivasha, Hell's Gate, and Amboseli National Park.",
          },
        },
        {
          "@type": "Question",
          name: "What wildlife can I see besides flamingos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lake Nakuru is famous for its black and white rhinos, Rothschild's giraffes, lions, leopards, buffalos, zebras, and over 450 bird species including pelicans, cormorants, and fish eagles.",
          },
        },
      ],
    },
  ],
}

export default function FlamingoSafariToursPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <JsonLd id="structured-data" data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR - Minimal ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-pink-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-pink-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-pink-400">
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
                <Phone className="h-4 w-4 text-pink-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS - Clean ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-pink-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-pink-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/kenya" className="hover:text-pink-600 transition">Kenya</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Flamingo Safari Tours 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 px-4 py-1.5 rounded-full text-sm border border-pink-100">
                <Bird className="h-3.5 w-3.5" />
                Thousands of Flamingos
              </span>
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Feather className="h-3.5 w-3.5" />
                Pink Lake Magic
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Shield className="h-3.5 w-3.5" />
                Rhino Sanctuary
              </span>
            </div>

      {/* Main heading - elegant split */}
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
        {CONFIG.h1}
        <span className="block text-pink-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
          {CONFIG.h1Sub}
        </span>
      </h1>

      {/* Subtitle - elegant */}
      <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
        {CONFIG.subtitle}
      </p>

      {/* Optimized Hero Image */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroImages.mobile} />
          <source media="(min-width: 769px)" srcSet={heroImages.desktop} />
          <Image
            src={heroImages.desktop}
            alt={heroImages.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8">
          <p className="text-white text-sm md:text-base font-medium bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
            🦩 Lake Nakuru National Park, Kenya - Peak Flamingo Season 2026
          </p>
        </div>
      </div>

      {/* Stats - clean horizontal line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
        <div className="text-center">
          <div className="flex justify-center text-pink-400 mb-2">
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
          <div className="text-2xl font-bold text-gray-900">450+</div>
          <div className="text-sm text-gray-500">Bird species</div>
          <div className="text-xs text-gray-400 mt-1">including flamingos</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">$90</div>
          <div className="text-sm text-gray-500">Park fee</div>
          <div className="text-xs text-gray-400 mt-1">included in packages</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
        <Button 
          asChild 
          size="lg" 
          className="text-base px-10 py-6 bg-pink-600 hover:bg-pink-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
        >
          <Link href="/tours/lake-nakuru-flamingo-safari">
            <Calendar className="mr-3 h-5 w-5" /> 
            View 2026 Packages
          </Link>
        </Button>
        
        <Button 
          asChild 
          size="lg" 
          variant="outline" 
          className="text-base px-10 py-6 border-2 border-gray-200 hover:border-pink-600 hover:text-pink-600 rounded-full w-full sm:w-auto min-w-[240px]"
        >
          <Link href="/contact">
            <MessageCircle className="mr-3 h-5 w-5" /> 
            Customize Your Safari
          </Link>
        </Button>
      </div>

      {/* Pickup locations */}
      <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
        <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
          <Compass className="h-4 w-4" />
          Pickup available from:
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Nairobi (Kenya)</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Jomo Kenyatta Airport</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Wilson Airport</span>
          <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm shadow-sm">1-3 day options</span>
        </div>
      </div>
    </header>
  )
}

function WhyKenyaOperator() {
  return (
    <section className="mb-40 pb-8">
      <div className="bg-gradient-to-br from-pink-900 to-purple-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column */}
          <div>
            <span className="inline-block text-xs uppercase tracking-wider text-pink-300 mb-6">
              Why Choose Us
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
              Your Flamingo Safari
              <span className="block text-pink-300 mt-2">Starts in Nairobi</span>
            </h2>
            
            <p className="text-lg text-gray-200 mb-10 leading-relaxed">
              Based in Nairobi, we're just a 2-hour drive from Lake Nakuru. Our guides monitor flamingo movements daily for optimal viewing.
            </p>
            
            <div className="space-y-6">
              {[
                "Real-time flamingo tracking - we know where the flocks are",
                "Short 1-3 day safaris perfect for layovers or extensions",
                "Combine with rhino sanctuary & 450+ bird species",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-pink-300 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Quick facts */}
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <Info className="h-5 w-5 text-pink-300" />
              2026 Lake Nakuru Facts
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Distance from Nairobi</span>
                <span className="text-white font-medium">2 hours</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Park fee</span>
                <span className="text-white font-medium">$90/adult</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Rhino population</span>
                <span className="text-white font-medium">~50 black rhinos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Best months</span>
                <span className="text-white font-medium">Jun-Oct, Jan-Mar</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-pink-300">
                Flamingo numbers vary with water levels - we track daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoHighlights() {
  const videoId = "YOUR_ACTUAL_VIDEO_ID" // Replace with actual YouTube ID
  
  return (
    <section className="mb-40">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
          Experience It
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
          The Pink Horizon
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          Witness thousands of flamingos painting the shores of Lake Nakuru in shades of pink.
        </p>
      </div>
      
      <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title="Flamingo Safari - Lake Nakuru Kenya | Thousands of Pink Flamingos"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  )
}

function LakesComparison() {
  return (
    <section className="mb-40">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
          Choose Your Lake
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
          Nakuru, Bogoria or Elmenteita?
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          Flamingos move between Kenya's soda lakes. We'll take you where the flocks are.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">Lake Nakuru</h3>
          <p className="text-pink-600 font-light text-sm mb-3">Main Destination</p>
          <p className="text-sm text-gray-600">Famous flamingo lake with rhino sanctuary, 450+ bird species, easy access from Nairobi.</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">Lake Bogoria</h3>
          <p className="text-blue-600 font-light text-sm mb-3">Alternative Hotspot</p>
          <p className="text-sm text-gray-600">Often has massive flamingo flocks, plus hot springs and geysers. Combine with Nakuru.</p>
        </div>
        
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">Lake Elmenteita</h3>
          <p className="text-teal-600 font-light text-sm mb-3">Less Crowded</p>
          <p className="text-sm text-gray-600">Smaller but reliable flocks, often overlooked. Great for photography.</p>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-6">
        Our guides monitor all three lakes daily and adjust itineraries for best sightings.
      </p>
    </section>
  )
}

function BestTimeToVisit() {
  return (
    <section className="mb-40">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-16 md:p-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
            Plan Your Visit
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Best Time for Flamingos
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <Sunrise className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-medium">Peak Dry Season</h3>
            </div>
            <p className="text-2xl font-light text-pink-600 mb-3">June – October</p>
            <p className="text-gray-600 mb-4">Algae concentrates → reliable flamingo flocks. Best rhino sightings, golden light for photography.</p>
            <Link href="/blog/best-time-flamingo-safari" className="text-pink-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
              Learn more about flamingo migration <span>→</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Sunset className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium">Dry Shoulder</h3>
            </div>
            <p className="text-2xl font-light text-amber-600 mb-3">January – March</p>
            <p className="text-gray-600 mb-4">Good flamingo numbers, fewer crowds, excellent birding diversity.</p>
            <Link href="/blog/flamingo-photography-tips" className="text-pink-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
              Photography tips for flamingos <span>→</span>
            </Link>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          Wet seasons (Apr-May, Nov-Dec): Lush scenery but flamingos may disperse.
        </p>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="mb-20">
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-16 md:p-20 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
          Ready for the Pink Spectacle?
        </h2>
        
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
          Flamingo horizons, rhino encounters, and 450+ bird species. Just 2 hours from Nairobi.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="bg-white text-pink-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px] shadow-lg"
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
  )
}