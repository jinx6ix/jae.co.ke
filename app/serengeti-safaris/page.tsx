// app/serengeti-safaris/page.tsx
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
  ThumbsUp
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "serengeti-safaris",
  title: "Serengeti Safaris 2026 | Great Migration & Luxury Tours | Jae Travel Expeditions",
  description: "Expert-guided Serengeti safaris from Kenya & Tanzania. Track the Great Migration river crossings, witness the Big Five. Licensed East African operator based in Nairobi. Book direct for best rates.",
  h1: "Serengeti Safaris 2026",
  subtitle: "Witness the Great Migration from Kenya & Tanzania – River Crossings, Big Five & Luxury Camps",
  featuredToursTitle: "2026 Serengeti Safari Packages",
  filterFn: (tour: any) => 
    tour.destinations?.includes("serengeti") || 
    tour.tags?.includes("migration") && tour.destinations?.includes("tanzania"),
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
    "serengeti safaris 2026",
    "great migration river crossings",
    "serengeti luxury tours",
    "kenya to serengeti safari",
    "nairobi to serengeti tours",
    "serengeti national park safaris",
    "east africa safari tours",
    "serengeti migration packages",
    "serengeti big five safari",
    "african safari tours from nairobi",
    "serengeti wildebeest migration",
    "serengeti luxury camps",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/serengeti-safaris",
    languages: {
      "en-US": "/en-us/serengeti-safaris",
      "en-GB": "/en-gb/serengeti-safaris",
      "en-AU": "/en-au/serengeti-safaris",
    },
  },
  openGraph: {
    title: "Serengeti Safaris 2026 | Great Migration & Big Five | Jae Travel Expeditions",
    description: "Book your dream Serengeti safari. Witness the Great Migration river crossings, track the Big Five, and stay in luxury camps. Kenya-based expert operators since 2015.",
    images: [{
      url: "/og/serengeti-safaris-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Serengeti Great Migration Safari",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serengeti Safaris 2026 | Great Migration & Big Five",
    description: "Expert-guided Serengeti safaris from Kenya & Tanzania. Track the Great Migration river crossings.",
    images: ["/twitter/serengeti-safaris.jpg"],
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
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
}

// JSON-LD Schema for global audience
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
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-1.3198",
        longitude: "36.7073",
      },
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      sameAs: [
        "https://www.facebook.com/jaetravel",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravel",
      ],
      priceRange: "$$$",
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
      "@id": "https://www.jaetravel.co.ke/serengeti-safaris#product",
      name: "Serengeti Safari Packages 2026",
      description: "Private guided Serengeti safaris tracking the Great Migration, Big Five, and river crossings.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "1800",
        highPrice: "8500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "15",
        offers: pageTours.map(tour => ({
          "@type": "Offer",
          name: tour.title,
          price: tour.price || 1800,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://www.jaetravel.co.ke/tours/${tour.slug}`,
        })),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "850",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "TouristTrip",
      name: "Serengeti Great Migration Safari",
      description: "Witness the greatest wildlife spectacle on earth - the Great Migration in Serengeti National Park.",
      touristType: {
        "@type": "Audience",
        name: "Wildlife enthusiasts, photographers, luxury travelers",
      },
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Serengeti National Park",
          description: "Endless plains hosting the Great Migration",
        },
        {
          "@type": "TouristDestination",
          name: "Ngorongoro Crater",
          description: "UNESCO World Heritage site with high wildlife density",
        },
        {
          "@type": "TouristDestination",
          name: "Lake Manyara",
          description: "Famous for tree-climbing lions and flamingos",
        },
      ],
      offers: {
        "@type": "Offer",
        price: "1800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/serengeti-safaris#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best time to see the Great Migration in Serengeti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best time for river crossings is July to October (peak August-September). For calving season, visit January to March. Our guides track daily movements to maximize your experience.",
          },
        },
        {
          "@type": "Question",
          name: "Can I do a Serengeti safari from Nairobi, Kenya?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We offer fly-in safaris from Nairobi directly to Serengeti (1.5-hour flight) or road transfers via Namanga border. Pickup from your Nairobi hotel included.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a Serengeti safari cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Packages start from $1,800 USD for 4-day safaris to $8,500 for 10-day luxury experiences. All park fees, private 4x4, professional guide, and accommodations included.",
          },
        },
        {
          "@type": "Question",
          name: "Is Jae Travel a licensed operator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Jae Travel Expeditions is fully licensed by the Kenya Tourism Board (KTB) and Tanzania Association of Tour Operators (TATO). We've been operating since 2015 with 1,200+ 5-star reviews.",
          },
        },
      ],
    },
  ],
}

export default function SerengetiSafarisPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <JsonLd data={jsonLd} id={"serengeti-schema"} />
      
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
              <li><Link href="/tanzania" className="hover:text-amber-600 transition">Tanzania</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Serengeti Safaris 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Shield className="h-3.5 w-3.5" />
                KTB/TATO Licensed
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Globe className="h-3.5 w-3.5" />
                Kenya-Based
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Users className="h-3.5 w-3.5" />
                1,200+ Guests
              </span>
            </div>

            {/* Main heading - lots of space */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              Serengeti
              <span className="block text-amber-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                Safaris 2026
              </span>
            </h1>

            {/* Subtitle - elegant */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
              Witness the Great Migration from Kenya & Tanzania. River crossings, Big Five encounters, and luxury camps in the heart of the wilderness.
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
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-sm text-gray-500">Countries Served</div>
                <div className="text-xs text-gray-400 mt-1">USA • UK • Australia • Europe</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2015</div>
                <div className="text-sm text-gray-500">Established</div>
                <div className="text-xs text-gray-400 mt-1">10+ years experience</div>
              </div>
            </div>

            {/* CTA Buttons - generous spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-amber-600 hover:bg-amber-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/tours/serengeti-migration-safari">
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
                <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm shadow-sm">Direct flights from USA/UK</span>
              </div>
            </div>
          </header>
          
          {/* ========== WHY KENYA-BASED OPERATOR ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left column */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-amber-400 mb-6">
                    Why Choose Us
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    Kenya-Based,
                    <span className="block text-amber-400 mt-2">Global Standards</span>
                  </h2>
                  
                  <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                    Headquartered in Nairobi, we offer local expertise with international service standards.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "Direct booking savings (15-20% less than international agents)",
                      "24/7 in-country support from our Karen office",
                      "Deep knowledge of migration patterns across Kenya & Tanzania",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white">US</div>
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold border-2 border-white">UK</div>
                      <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-xs font-bold border-2 border-white">AU</div>
                      <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-xs font-bold border-2 border-white">CA</div>
                    </div>
                    <span className="text-sm text-gray-300">+ 20+ nationalities</span>
                  </div>
                </div>
                
                {/* Right column - Office card */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-amber-400" />
                    Karen Roundabout Office
                  </h3>
                  
                  <div className="aspect-video bg-gray-800 rounded-2xl mb-6 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <span className="text-sm">Nairobi, Kenya</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-300">
                    <p className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-amber-400" />
                      +254 726 485 228 (24/7 WhatsApp)
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-amber-400" />
                      info@jaetravel.co.ke
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-gray-400">
                      Virtual consultations available for global guests.
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
                Our Kenya-based guides track the herds daily across borders. Use this calendar to plan your safari.
              </p>
            </div>
            
            <MigrationCalendar />
          </section>
          
          {/* ========== VIDEO HIGHLIGHTS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-600 mb-4">
                Experience It
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                The Great Migration in Motion
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Watch millions of wildebeest thunder across the plains and brave crocodile-filled rivers.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-migration-video-id" 
                title="Serengeti Great Migration Safari Experience"
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
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Choose Your Adventure
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Private 4x4 • Professional guide • Park fees • Luxury accommodations • Nairobi/Arusha pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Private guided safari tracking the Great Migration."}
                  price={tour.price ?? 1800}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 160 + index * 30}
                  location="Serengeti National Park, Tanzania"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="All park fees included"
                  href={tour.url || `/tours/${tour.slug || "serengeti-2026"}`}
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
                <Link href="/tours?destination=serengeti">
                  View All 15+ Tours <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== INTERNATIONAL BOOKING ========== */}
          <section className="mb-40">
            <div className="bg-amber-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Book with Confidence
                </h2>
                <p className="text-lg text-gray-600">
                  We welcome travelers from all over the world.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Globe className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">Global Bookings</h3>
                  <p className="text-sm text-gray-500">USA, UK, Australia, Europe</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">24/7 Support</h3>
                  <p className="text-sm text-gray-500">WhatsApp available</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CreditCard className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">Secure Payment</h3>
                  <p className="text-sm text-gray-500">Credit card, bank transfer, crypto</p>
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
            <div className="bg-gray-900 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Ready for the Adventure?
              </h2>
              
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                Join travelers from 30+ countries who've experienced the Great Migration with us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 rounded-full min-w-[200px]"
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
              
              <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
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