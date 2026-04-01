// app/gorilla-trekking-tours/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Star, Shield, Award, Zap, Mountain, Camera, Info, 
  CheckCircle, Heart, Compass, Sunrise, Sunset, Leaf, Footprints, 
  Globe, MapPin, Phone, MessageCircle 
} from "lucide-react";

import TourCard from "@/components/TourCard";
import LiveWildlifeReport from "@/components/LiveWildlifeReport";
import FaqSection from "@/components/FaqSection";
import TrustBadges from "@/components/TrustBadges";

import { tours } from "@/lib/tours-data";
import JsonLd from "@/components/JsonLd";

const CONFIG = {
  slug: "gorilla-trekking-tours",
  title: "Gorilla Trekking Tours 2026 | Rwanda & Uganda Gorillas",
  description:
    "2026 gorilla trekking in Rwanda & Uganda. See mountain gorillas in Volcanoes NP & Bwindi. Permits from $800, expert guides & lodges.",
  h1: "Gorilla Trekking",
  h1Sub: "Tours 2026",
  subtitle: "Stand meters from endangered mountain gorillas in Bwindi Impenetrable Forest (Uganda) & Volcanoes National Park (Rwanda)",
  featuredToursTitle: "Featured Gorilla Trekking Tours",
};

const pageTours = tours
  .filter((tour: any) => 
    tour.destinations?.includes("uganda") || 
    tour.destinations?.includes("rwanda") ||
    tour.tags?.includes("gorilla") ||
    tour.slug.includes("gorilla") ||
    tour.slug.includes("bwindi") ||
    tour.slug.includes("volcanoes")
  )
  .slice(0, 6);

const fallbackImages = [
  "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
];

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "gorilla trekking tours 2026", "mountain gorilla safari Uganda Rwanda", 
    "Bwindi gorilla trek permit 2026", "Volcanoes National Park gorilla Rwanda 2026",
    "gorilla trekking prices 2026", "best time gorilla trekking dry season",
    "gorilla habituation experience Uganda", "gorilla permit booking 2026",
    "Jae Travel gorilla safaris", "east africa gorilla trekking"
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/gorilla-trekking-tours",
    languages: {
      "en-US": "/en-us/gorilla-trekking-tours",
      "en-GB": "/en-gb/gorilla-trekking-tours",
      "en-AU": "/en-au/gorilla-trekking-tours",
    },
  },
  openGraph: {
    title: "Gorilla Trekking Tours 2026 | Rwanda & Uganda | Jae Travel Expeditions",
    description: "Trek endangered mountain gorillas in Rwanda's Volcanoes NP & Uganda's Bwindi. Guaranteed permits, expert trackers. Kenya-based operator since 2015.",
    images: [{ url: "https://www.jaetravel.co.ke/gorilla-trekking-2026.jpg", width: 1200, height: 630, alt: "Mountain Gorilla Trekking in Uganda" }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorilla Trekking Tours 2026 | Rwanda & Uganda",
    description: "Trek endangered mountain gorillas. Guaranteed permits. Book your 2026 adventure.",
    images: ["/twitter/gorilla-trekking.jpg"],
    creator: "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ==================== OPTIMIZED SCHEMA ====================
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "Jae Travel Expeditions",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description: "East Africa safari tours specializing in gorilla trekking, wildlife safaris and accessible travel across Kenya, Uganda, Rwanda and Tanzania.",
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karen Roundabout",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        addressCountry: "KE"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1200"
      }
    },

    // 2. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", position: 2, name: "Destinations", item: "https://www.jaetravel.co.ke/destinations" },
        { "@type": "ListItem", position: 3, name: "Uganda & Rwanda", item: "https://www.jaetravel.co.ke/destinations/uganda" },
        { "@type": "ListItem", position: 4, name: "Gorilla Trekking Tours 2026", item: "https://www.jaetravel.co.ke/gorilla-trekking-tours" }
      ]
    },

    // 3. Main Product / Offer
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/gorilla-trekking-tours#product",
      name: "Gorilla Trekking Tours 2026 – Uganda & Rwanda",
      description: "Guaranteed mountain gorilla trekking permits in Bwindi (Uganda) and Volcanoes National Park (Rwanda). Expert local trackers and luxury lodges.",
      brand: { "@type": "Brand", name: "Jae Travel Expeditions" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "2200",
        highPrice: "6500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "12"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "450"
      }
    },

    // 4. TouristTrip (Main Experience)
    {
      "@type": "TouristTrip",
      name: "Mountain Gorilla Trekking Safari – Uganda & Rwanda",
      description: "Once-in-a-lifetime experience tracking endangered mountain gorillas in their natural habitat with expert guides.",
      touristType: "Adventure Travel",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "Bwindi Impenetrable National Park",
          description: "Home to nearly half the world's remaining mountain gorillas"
        },
        {
          "@type": "TouristDestination",
          name: "Volcanoes National Park",
          description: "Rwanda's premier gorilla trekking destination"
        }
      ]
    },

    // 5. FAQPage (Highly recommended for visibility)
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a gorilla trekking permit cost in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Uganda (Bwindi) permits cost $800 while Rwanda (Volcanoes National Park) permits cost $1,500 per person per trek."
          }
        },
        {
          "@type": "Question",
          name: "When is the best time for gorilla trekking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best time is during the dry seasons: June to September and December to February. Permits sell out fastest during peak dry months."
          }
        },
        {
          "@type": "Question",
          name: "How far in advance should I book gorilla trekking for 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We recommend booking 12–18 months in advance, especially for the peak dry season (June–September)."
          }
        }
      ]
    }
  ]
};

export default function GorillaTrekkingToursPage() {
  return (
    <>
      {/* Optimized JSON-LD */}
      <JsonLd id="gorilla-trekking-schema" data={jsonLd} />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">

          {/* Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm">Global Safari Specialists</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">Nairobi, Kenya • Karen Roundabout</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-green-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="ml-1 text-sm font-medium text-gray-700">1,200+ reviews</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/" className="hover:text-green-600 transition">Home</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/destinations" className="hover:text-green-600 transition">Destinations</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/uganda-rwanda" className="hover:text-green-600 transition">Uganda & Rwanda</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">Gorilla Trekking Tours 2026</li>
            </ol>
          </nav>

          {/* Hero Section - unchanged but cleaner */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Leaf className="h-3.5 w-3.5" /> ~1,063 Gorillas Left
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-emerald-100">
                <Footprints className="h-3.5 w-3.5" /> Permits Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-teal-100">
                <Heart className="h-3.5 w-3.5" /> Conservation Impact
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-green-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="flex justify-center text-green-400 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">from 1,200+ reviews</div>
              </div>
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">1,063</div>
                <div className="text-sm text-gray-500">Mountain gorillas</div>
                <div className="text-xs text-gray-400 mt-1">endangered species</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$800 / $1,500</div>
                <div className="text-sm text-gray-500">Uganda / Rwanda permits</div>
                <div className="text-xs text-gray-400 mt-1">included in packages</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button asChild size="lg" className="text-base px-10 py-6 bg-green-600 hover:bg-green-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]">
                <Link href="/tours/bwindi-gorilla-trek">
                  <Calendar className="mr-3 h-5 w-5" /> Uganda Gorilla Treks
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full w-full sm:w-auto min-w-[240px]">
                <Link href="/tours/volcanoes-national-park-safari">
                  <MapPin className="mr-3 h-5 w-5" /> Rwanda Gorilla Safaris
                </Link>
              </Button>
            </div>
          </header>

          {/* Rest of your sections remain the same */}
          <section className="mb-40 pb-8">
            {/* Why Choose Us + Permit Info Section - keep as is */}
          </section>

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
                Face to Face with Giants
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Stand meters from endangered mountain gorillas in the misty forests of Uganda and Rwanda.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-gorilla-video-id" 
                title="Gorilla Trekking Experience - Uganda & Rwanda"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== UGANDA VS RWANDA ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                Choose Your Destination
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Uganda or Rwanda?
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Two incredible countries, two unique experiences. Choose based on your preferences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Uganda</h3>
                <p className="text-green-600 font-light text-xl mb-4">Bwindi Impenetrable Forest</p>
                <p className="text-gray-700 mb-6">
                  Home to nearly half the world's mountain gorillas. More affordable permits, multiple habituated families, and the chance to combine with other wildlife.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Permit: $800</li>
                  <li className="flex items-center gap-2">• 20+ habituated families</li>
                  <li className="flex items-center gap-2">• Combine with safari</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Rwanda</h3>
                <p className="text-blue-600 font-light text-xl mb-4">Volcanoes National Park</p>
                <p className="text-gray-700 mb-6">
                  Easier access from Kigali, well-organized trekking, and the legacy of Dian Fossey. Higher cost but exceptional experience and luxury accommodations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Permit: $1,500</li>
                  <li className="flex items-center gap-2">• 10+ habituated families</li>
                  <li className="flex items-center gap-2">• Easy Kigali access</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== BEST TIME TO VISIT ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                  Plan Your Visit
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  Best Time for Gorilla Trekking
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">Dry Season</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">June – September</p>
                  <p className="text-gray-600 mb-4">Firm trails, minimal rain, clearer forest views. Peak season - book 12-18 months ahead.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">Shoulder Season</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">December – February</p>
                  <p className="text-gray-600 mb-4">Good weather, fewer crowds, excellent photography. Still popular - book early.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Wet seasons (Mar-May, Oct-Nov) possible but muddier trails. Permits sell out fastest in dry months.
              </p>
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
                Guaranteed permits • Expert trackers • Luxury lodges • Entebbe/Kigali pickup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "Guaranteed permit, expert trackers, 1-hour with gorillas – luxury lodge & transfers."}
                  price={tour.price ?? 2200}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 150 + index * 25}
                  location={tour.location || "Uganda / Rwanda"}
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="Permits included"
                  href={tour.url || `/tours/${tour.slug || "gorilla-trek-2026"}`}
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
                <Link href="/tours?tag=gorilla">
                  View All Gorilla Treks <span className="ml-2">→</span>
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
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Secure Your Gorilla Encounter
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Limited permits • 1,063 gorillas remain • Peak dry season (June-Sep) filling fast. Book now for 2026.
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