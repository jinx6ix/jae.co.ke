import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/ngorongoro-safaris/page.tsx
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
  Eye,
  ThumbsUp,
  Droplets,
  Trees,
  Sunrise
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "ngorongoro-safaris",
  title: "Ngorongoro Crater Safari 2026 | Tanzania Big Five Tour",
  description:
    "Explore Ngorongoro Crater in 2026. See the Big Five, black rhinos, lions & elephants. Luxury rim lodges & private 4x4 safaris from Arusha.",
  h1: "Ngorongoro Crater",
  h1Sub: "Safaris 2026",
  subtitle: "UNESCO Caldera – Africa's Garden of Eden with Unmatched Wildlife Density & Black Rhino Sightings",
  featuredToursTitle: "Ngorongoro Crater Safari Packages",
  filterFn: (tour: any) => 
    tour.destinations?.includes("ngorongoro") || 
    tour.slug.includes("ngorongoro") ||
    tour.title.toLowerCase().includes("ngorongoro") ||
    tour.title.toLowerCase().includes("crater"),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

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
    "ngorongoro crater safaris 2026",
    "ngorongoro crater black rhino sightings",
    "ngorongoro big five safari tanzania",
    "best time ngorongoro crater june october",
    "ngorongoro crater rim lodges 2026",
    "ngorongoro crater descent fee",
    "ngorongoro unesco world heritage safari",
    "arusha ngorongoro private safari",
    "Jae Travel ngorongoro tours",
    "tanzania safari packages",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ngorongoro-safaris",
    languages: {
      "en-US": "/en-us/ngorongoro-safaris",
      "en-GB": "/en-gb/ngorongoro-safaris",
      "en-AU": "/en-au/ngorongoro-safaris",
    },
  },
  openGraph: {
    title: "Ngorongoro Crater Safaris 2026 | Big Five & Black Rhinos | Jae Travel Expeditions",
    description: "Descend into Ngorongoro Crater – highest Big Five density, reliable black rhinos. Tanzania's UNESCO World Heritage site. Kenya-based operator since 2015.",
    images: [{
      url: "/og/ngorongoro-safaris-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Ngorongoro Crater Safari Tanzania",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngorongoro Crater Safaris 2026 | Big Five & Black Rhinos",
    description: "Descend into Ngorongoro Crater – highest Big Five density in Africa. Book your 2026 safari.",
    images: ["/twitter/ngorongoro-safaris.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/ngorongoro-safaris#product",
      name: "Ngorongoro Crater Safari Packages 2026",
      description: "Private guided safaris in Ngorongoro Crater, tracking black rhinos and the Big Five.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "950",
        highPrice: "4500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "12",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "650",
      },
    },
    {
      "@type": "TouristTrip",
      name: "Ngorongoro Crater Safari",
      description: "Descend into the world's largest intact volcanic caldera for unmatched wildlife viewing.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Ngorongoro Crater",
          description: "UNESCO World Heritage site with highest Big Five density",
        },
        {
          "@type": "TouristDestination",
          name: "Ngorongoro Conservation Area",
          description: "Home to black rhinos, lions, elephants and Maasai communities",
        },
      ],
    },
  ],
}

export default function NgorongoroSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="ngorongoro-safaris"
        categoryOpts={{
          title: "Ngorongoro Crater Safari Tours Tanzania",
          description: "Ngorongoro Crater safaris. World's largest intact volcanic caldera with highest wildlife density.",
          image: "/ngorongoro-header-3.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("ngorongoro") || t.title?.toLowerCase().includes("ngorongoro") || t.description?.toLowerCase().includes("ngorongoro")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd id="NgorongoroSafarisJsonLd" data={jsonLd} />
      
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
              <li><Link href="/tanzania" className="hover:text-emerald-600 transition">Tanzania</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Ngorongoro Crater Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-emerald-100">
                <Shield className="h-3.5 w-3.5" />
                UNESCO World Heritage
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Eye className="h-3.5 w-3.5" />
                Black Rhino Haven
              </span>
              <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-teal-100">
                <Zap className="h-3.5 w-3.5" />
                Highest Big Five Density
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
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
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
                <div className="text-2xl font-bold text-gray-900">25,000+</div>
                <div className="text-sm text-gray-500">Large mammals</div>
                <div className="text-xs text-gray-400 mt-1">in 100 km² caldera</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">30-50</div>
                <div className="text-sm text-gray-500">Black rhinos</div>
                <div className="text-xs text-gray-400 mt-1">Africa's best sightings</div>
              </div>
            </div>

            {/* CTA Buttons - generous spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/tours/ngorongoro-crater-safari">
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
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Arusha (Tanzania)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Kilimanjaro Airport</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Nairobi (Kenya)</span>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm shadow-sm">Direct flights from USA/UK</span>
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
                    Your Gateway to
                    <span className="block text-emerald-300 mt-2">Ngorongoro Crater</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    Based in Nairobi, we offer seamless access to Tanzania's most spectacular crater with local expertise and international standards.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "Expert guides with 15+ years experience in Ngorongoro",
                      "Direct booking savings — no middlemen",
                      "Flexible itineraries combining Kenya & Tanzania",
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
                    Crater Facts 2026
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Descent fee</span>
                      <span className="text-white font-medium">$295/vehicle</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Conservation fee</span>
                      <span className="text-white font-medium">$70.80/adult</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">Best months</span>
                      <span className="text-white font-medium">June-October</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Vehicle limit</span>
                      <span className="text-white font-medium">5 per sighting</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-emerald-300">
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
          
          {/* ========== VIDEO HIGHLIGHTS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Experience It
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                The Crater Floor Awaits
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Descend 600 meters into the world's largest intact volcanic caldera.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-ngorongoro-video-id" 
                title="Ngorongoro Crater Safari Experience"
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
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Professional guide • Park fees • Rim lodges • Arusha/Nairobi pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Private descent into Ngorongoro Crater – black rhinos, Big Five, rim lodge luxury."}
                  price={tour.price ?? 950}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 140 + index * 25}
                  location="Ngorongoro Crater, Tanzania"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug || "ngorongoro-2026"}`}
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
                <Link href="/tours?destination=ngorongoro">
                  View All Ngorongoro Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== WHY VISIT SECTION ========== */}
          <section className="mb-40">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                  The Experience
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Africa's Garden of Eden
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nowhere else on earth offers such reliable wildlife viewing in such a dramatic setting. The crater floor is a natural amphitheater where lions hunt on open plains, elephants wallow in swamps, and black rhinos graze peacefully.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Black Rhino Guarantee</h3>
                      <p className="text-sm text-gray-500">Best odds in Africa for endangered black rhino sightings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Big Five in One Day</h3>
                      <p className="text-sm text-gray-500">All five in a single descent – lion, leopard, elephant, buffalo, rhino</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">UNESCO World Heritage</h3>
                      <p className="text-sm text-gray-500">One of Africa's most protected and pristine ecosystems</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">🦏</div>
                  <div className="font-bold text-xl text-gray-900">30-50</div>
                  <div className="text-xs text-gray-500">Black Rhinos</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">🦁</div>
                  <div className="font-bold text-xl text-gray-900">100+</div>
                  <div className="text-xs text-gray-500">Lions</div>
                </div>
                <div className="bg-teal-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">🐘</div>
                  <div className="font-bold text-xl text-gray-900">400+</div>
                  <div className="text-xs text-gray-500">Elephants</div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">🦓</div>
                  <div className="font-bold text-xl text-gray-900">7,000+</div>
                  <div className="text-xs text-gray-500">Zebra</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== BEST TIME TO VISIT ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time to Visit
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-emerald-600 mb-3">June – October</p>
                  <p className="text-gray-600 mb-4">Peak wildlife viewing. Short grass, animals concentrate around water sources.</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                    Best for black rhinos & Big Five
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Droplets className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">Green Season</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">November – May</p>
                  <p className="text-gray-600 mb-4">Lush scenery, fewer crowds, newborn animals, migratory birds.</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    Best for photography & birding
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Year-round access • Crater cooler than savanna – pack layers
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
          
          {/* ========== FINAL CTA - Minimal ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready to Descend into Eden?
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Black rhinos, Big Five density, and crater rim luxury. Dry season dates filling fast.
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