// app/kenya-safari-packages/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { 
  Star, 
  Shield, 
  Phone, 
  Mail, 
  CreditCard,
  CheckCircle2
} from "lucide-react";
import KenyaSafariPackagesClient from "./kenyaSafariPackagesClient";
import JsonLd from "@/components/JsonLd";

// ============================================
// SAFARI PACKAGES DATA
// ============================================
export const safariPackages = [
  {
    id: 1,
    title: "1 Day Maasai Mara Safari",
    slug: "1-day-maasai-mara",
    duration: "1 Day",
    price: 180,
    oldPrice: 220,
    image: "/images/1-day-mara.jpg",
    rating: 4.8,
    reviews: 124,
    highlights: ["Big Five Game Drive", "Nairobi Pickup", "Picnic Lunch"],
    badge: "Most Popular",
    badgeColor: "bg-orange-500",
    destinations: ["Maasai Mara"],
    description: "Perfect for travelers with limited time. Experience the magic of Maasai Mara in a single day with expert guides."
  },
  {
    id: 2,
    title: "3 Days Maasai Mara Safari",
    slug: "3-days-maasai-mara",
    duration: "3 Days",
    price: 650,
    oldPrice: 750,
    image: "/images/3-days-mara.jpg",
    rating: 4.9,
    reviews: 256,
    highlights: ["Full Day Game Drives", "Great Migration", "Cultural Visit"],
    badge: "Best Value",
    badgeColor: "bg-green-500",
    destinations: ["Maasai Mara"],
    description: "Immerse yourself in the wonders of Maasai Mara with game drives, cultural experiences, and incredible wildlife sightings."
  },
  {
    id: 3,
    title: "4 Days Amboseli & Tsavo Safari",
    slug: "4-days-amboseli-tsavo",
    duration: "4 Days",
    price: 850,
    image: "/images/4-days-amboseli.jpg",
    rating: 4.7,
    reviews: 98,
    highlights: ["Kilimanjaro Views", "Elephant Herds", "Shetani Lava Flow"],
    badge: "Scenic",
    badgeColor: "bg-blue-500",
    destinations: ["Amboseli", "Tsavo"],
    description: "Witness elephants against Mount Kilimanjaro and explore the red elephants of Tsavo on this scenic adventure."
  },
  {
    id: 4,
    title: "5 Days Kenya Safari (Mara + Amboseli)",
    slug: "5-days-mara-amboseli",
    duration: "5 Days",
    price: 1250,
    oldPrice: 1400,
    image: "/images/5-days-combo.jpg",
    rating: 5.0,
    reviews: 187,
    highlights: ["Two Parks", "Lake Naivasha", "Boat Ride"],
    badge: "Top Rated",
    badgeColor: "bg-purple-500",
    destinations: ["Maasai Mara", "Amboseli", "Naivasha"],
    description: "Combine the best of Kenya's wildlife with this comprehensive safari covering Mara, Amboseli, and scenic Lake Naivasha."
  },
  {
    id: 5,
    title: "6 Days Amboseli, Nakuru & Mara",
    slug: "6-days-amboseli-nakuru-mara",
    duration: "6 Days",
    price: 1550,
    image: "/images/6-days-safari.jpg",
    rating: 4.9,
    reviews: 145,
    highlights: ["Lake Nakuru Flamingos", "Rhino Sanctuary", "Mara River"],
    badge: "Comprehensive",
    badgeColor: "bg-indigo-500",
    destinations: ["Amboseli", "Nakuru", "Maasai Mara"],
    description: "Explore Kenya's diverse landscapes from Amboseli's elephants to Nakuru's flamingos and Mara's predators."
  },
  {
    id: 6,
    title: "7 Days Kenya Luxury Safari",
    slug: "7-days-luxury-kenya",
    duration: "7 Days",
    price: 2800,
    oldPrice: 3200,
    image: "/images/7-days-luxury.jpg",
    rating: 5.0,
    reviews: 92,
    highlights: ["Luxury Lodges", "Private Guide", "Hot Air Balloon"],
    badge: "Luxury",
    badgeColor: "bg-amber-500",
    destinations: ["Maasai Mara", "Amboseli", "Nakuru"],
    description: "Experience the ultimate in comfort with luxury lodges, private game drives, and exclusive safari experiences."
  },
  {
    id: 7,
    title: "8 Days Kenya Safari & Beach Holiday",
    slug: "8-days-safari-beach",
    duration: "8 Days",
    price: 2100,
    image: "/images/8-days-beach.jpg",
    rating: 4.8,
    reviews: 76,
    highlights: ["Safari + Beach", "Diani Beach", "Indian Ocean"],
    badge: "Combo",
    badgeColor: "bg-teal-500",
    destinations: ["Tsavo", "Diani Beach"],
    description: "Combine wildlife adventure with beach relaxation. Perfect for those seeking both safari thrills and coastal serenity."
  },
  {
    id: 8,
    title: "10 Days Kenya Safari & Masai Mara",
    slug: "10-days-kenya-safari",
    duration: "10 Days",
    price: 2950,
    image: "/images/10-days-safari.jpg",
    rating: 4.9,
    reviews: 112,
    highlights: ["All Major Parks", "Great Migration", "Cultural Tours"],
    badge: "Ultimate",
    badgeColor: "bg-red-500",
    destinations: ["Nairobi", "Amboseli", "Nakuru", "Maasai Mara"],
    description: "The ultimate Kenya safari covering all major parks with expert guides and comprehensive game viewing."
  }
];

// Calculate stats
const totalPackages = safariPackages.length;
const avgRating = (safariPackages.reduce((sum, p) => sum + p.rating, 0) / totalPackages).toFixed(1);
const totalReviews = safariPackages.reduce((sum, p) => sum + p.reviews, 0);
const minPrice = Math.min(...safariPackages.map(p => p.price));
const maxPrice = Math.max(...safariPackages.map(p => p.price));

// Get unique destinations for filter
export const allDestinations = ["All", ...new Set(safariPackages.flatMap(p => p.destinations))];
export const allDurations = ["All", "1 Day", "2-3 Days", "4-5 Days", "6-7 Days", "8+ Days"];
export const allBudgets = ["All Budgets", "Budget ($100-300/day)", "Mid-Range ($300-600/day)", "Luxury ($600+/day)"];

// ============================================
// METADATA - Title: 60 chars | Description: 115 chars
// ============================================
export const metadata: Metadata = {
  title: "Kenya Safari Packages 2026 | Best Safari Tours & Wildlife Adventures",
  description: "Book authentic Kenya safari packages 2026. Maasai Mara, Amboseli & Tsavo tours. Best prices, expert guides, and 5-star reviews. Custom itineraries available.",
  keywords: "Kenya safari packages, Maasai Mara safari, Amboseli safari, Tsavo safari, Kenya tours, African safari deals, luxury safari Kenya, budget safari Kenya, wildlife safaris, Kenya travel packages, Great Migration safari, Kenya safari deals 2026",
  authors: [{ name: "Jae Travel Expeditions", url: "https://jaetravel.co.ke" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://jaetravel.co.ke"),
  alternates: {
    canonical: "https://jaetravel.co.ke/kenya-safari-packages",
  },
  openGraph: {
    title: "Kenya Safari Packages 2026 | Best Safari Tours & Wildlife Adventures",
    description: "Experience the best Kenya safari packages. Maasai Mara, Amboseli, Tsavo. Book your African adventure today with expert guides and best price guarantee.",
    url: "https://jaetravel.co.ke/kenya-safari-packages",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://jaetravel.co.ke/images/kenya-safari-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya Safari Packages - Wildebeest migration in Maasai Mara with lions and elephants",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya Safari Packages 2026 | Jae Travel",
    description: "Book your dream Kenya safari. Best prices, expert guides, amazing wildlife! Maasai Mara, Amboseli, Tsavo tours available.",
    images: ["https://jaetravel.co.ke/images/kenya-safari-twitter.jpg"],
    site: "@jaetravel",
    creator: "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// ============================================
// SCHEMA MARKUP
// ============================================
const generateSchemaMarkup = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://jaetravel.co.ke/#organization",
        "name": "Jae Travel Expeditions",
        "url": "https://jaetravel.co.ke",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jaetravel.co.ke/images/logo.png",
          "width": 600,
          "height": 60
        },
        "description": "Premier Kenya safari tour operator offering authentic wildlife experiences, expert guides, and customized safari packages.",
        "sameAs": [
          "https://www.facebook.com/jaetravel",
          "https://www.instagram.com/jaetravel",
          "https://twitter.com/jaetravel"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "customer service",
          "availableLanguage": ["English", "Swahili"],
          "areaServed": "KE"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": avgRating,
          "reviewCount": totalReviews,
          "bestRating": "5"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://jaetravel.co.ke/kenya-safari-packages/#webpage",
        "url": "https://jaetravel.co.ke/kenya-safari-packages",
        "name": "Kenya Safari Packages 2026 | Best Safari Tours & Wildlife Adventures",
        "description": "Book authentic Kenya safari packages 2026. Maasai Mara, Amboseli & Tsavo tours. Best prices, expert guides.",
        "isPartOf": { "@id": "https://jaetravel.co.ke/#website" },
        "breadcrumb": { "@id": "https://jaetravel.co.ke/kenya-safari-packages/#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://jaetravel.co.ke/kenya-safari-packages/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaetravel.co.ke" },
          { "@type": "ListItem", "position": 2, "name": "Safari Packages", "item": "https://jaetravel.co.ke/kenya-safari-packages" }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://jaetravel.co.ke/kenya-safari-packages/#product",
        "name": "Kenya Safari Packages 2026",
        "description": "Premium Kenya safari experiences with expert guides, game drives, and comfortable accommodations.",
        "brand": { "@type": "Brand", "name": "Jae Travel Expeditions" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": avgRating,
          "reviewCount": totalReviews,
          "bestRating": "5"
        },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": minPrice,
          "highPrice": maxPrice,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "offerCount": totalPackages
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://jaetravel.co.ke/kenya-safari-packages/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is included in your Kenya safari packages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our Kenya safari packages include: transportation in safari vehicles, professional English-speaking guide, game drives as per itinerary, park entry fees, accommodation (for multi-day safaris), meals as specified, and bottled water."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best time for a Kenya safari?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best time for Kenya safari is during the dry seasons: June to October and January to February. For the Great Migration in Maasai Mara, July to October is ideal."
            }
          }
        ]
      }
    ]
  };
};

// ============================================
// MAIN SERVER COMPONENT
// ============================================
export default function KenyaSafariPackagesPage() {
  return (
    <>
      <JsonLd id="schema-markup" data={generateSchemaMarkup()} />

      <main className="bg-white">
        {/* ========== HERO SECTION ========== */}
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/images/safari-hero-poster.jpg"
            >
              <source src="/videos/kenya-safari-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Kenya Safari Packages 2026
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-gray-200">
                Experience the magic of African wildlife with expertly crafted safari tours
              </h2>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="font-semibold">{avgRating}/5 ({totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦁</span>
                  <span className="font-semibold">12+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span className="font-semibold">Best Price Guarantee</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8 inline-flex items-center gap-4">
                <div className="text-center">
                  <p className="text-sm opacity-80">Starting from</p>
                  <p className="text-3xl font-bold">${minPrice}</p>
                </div>
                <div className="w-px h-10 bg-white/30"></div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Average</p>
                  <p className="text-3xl font-bold">${Math.round((minPrice + maxPrice) / 2)}</p>
                </div>
                <div className="w-px h-10 bg-white/30"></div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Luxury from</p>
                  <p className="text-3xl font-bold">${maxPrice}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#packages"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                  View Packages
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  Customize Your Safari
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* ========== BREADCRUMBS ========== */}
        <nav className="bg-gray-50 py-3" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-orange-600">Home</Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="text-gray-900 font-semibold">Safari Packages</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* ========== STATS SECTION ========== */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-orange-600 mb-2">{totalPackages}+</div>
                <div className="text-gray-600">Safari Packages</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-orange-600 mb-2">{totalReviews}+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-orange-600 mb-2">{avgRating}★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-orange-600 mb-2">12+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== INTRO TEXT ========== */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Discover the Best Kenya Safari Packages
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <strong>Jae Travel Expeditions</strong>, your gateway to unforgettable 
              <strong> Kenya safari experiences</strong>. Whether you're looking for a 
              <strong> 1-day Maasai Mara safari</strong> or a <strong>luxury 10-day Kenya tour</strong>, 
              we offer expertly crafted <strong>safari packages</strong> that showcase the best of 
              Kenyan wildlife. From the <strong>Great Migration in Maasai Mara</strong> to 
              <strong> elephant herds in Amboseli</strong> with <strong>Mount Kilimanjaro</strong> as 
              backdrop, our <strong>Kenya tours</strong> deliver authentic adventures at the best prices.
            </p>
          </div>
        </section>

        {/* ========== CLIENT COMPONENT WITH WORKING FILTERS ========== */}
        <Suspense fallback={
          <div className="py-20 text-center">
            <div className="animate-pulse">Loading safari packages...</div>
          </div>
        }>
          <KenyaSafariPackagesClient 
            packages={safariPackages}
            destinations={allDestinations}
            durations={allDurations}
            budgets={allBudgets}
          />
        </Suspense>

        {/* ========== VIDEO SHOWCASE SECTION ========== */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Experience Kenya Safari in 3 Minutes
                </h2>
                <p className="text-gray-300 mb-6">
                  Watch our video to see what awaits you on a Kenya safari. From 
                  lions on the hunt to elephants at sunset, experience the magic 
                  of African wildlife.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-900" />
                    ))}
                  </div>
                  <span className="text-gray-300">{totalReviews}+ happy travelers</span>
                </div>
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold"
                >
                  Watch More Videos →
                </Link>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="Kenya Safari Experience - Wildlife Adventure"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== REVIEWS SECTION ========== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              What Our Safari Travelers Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  location: "United States",
                  rating: 5,
                  text: "Absolutely incredible! Our 7-day Kenya safari exceeded all expectations. Saw the Big Five, stayed in amazing lodges, and our guide was knowledgeable and fun.",
                  date: "January 2026"
                },
                {
                  name: "Michael Chen",
                  location: "Singapore",
                  rating: 5,
                  text: "Booked the 5-day Maasai Mara and Amboseli combo. Perfectly organized from pickup to drop-off. The Great Migration was breathtaking!",
                  date: "December 2025"
                },
                {
                  name: "Emma Watson",
                  location: "United Kingdom",
                  rating: 5,
                  text: "As a solo female traveler, I felt completely safe. The team was professional, and the experience was life-changing. Highly recommend!",
                  date: "November 2025"
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/reviews"
                className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Read All {totalReviews} Reviews
              </Link>
            </div>
          </div>
        </section>

        {/* ========== DESTINATION HIGHLIGHTS ========== */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Popular Safari Destinations in Kenya
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: "Maasai Mara", image: "/images/dest-mara.jpg", tours: 24, description: "Great Migration, Big Five" },
                { name: "Amboseli", image: "/images/dest-amboseli.jpg", tours: 18, description: "Kilimanjaro views, elephants" },
                { name: "Tsavo", image: "/images/dest-tsavo.jpg", tours: 15, description: "Red elephants, wilderness" },
                { name: "Lake Nakuru", image: "/images/dest-nakuru.jpg", tours: 12, description: "Flamingos, rhinos" }
              ].map((dest) => (
                <Link
                  key={dest.name}
                  href={`/destinations/${dest.name.toLowerCase().replace(' ', '-')}`}
                  className="group relative h-48 rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                    <p className="text-sm">{dest.tours} packages</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE US ========== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Why Book Your Kenya Safari With Us?
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🦁</div>
                <h3 className="font-bold mb-2">Expert Local Guides</h3>
                <p className="text-gray-600">Knowledgeable guides with 10+ years experience</p>
              </div>
              <div>
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-bold mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">Direct operator rates with no middlemen</p>
              </div>
              <div>
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Assistance throughout your safari journey</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="font-bold mb-2">{avgRating}/5 Reviews</h3>
                <p className="text-gray-600">Trusted by {totalReviews}+ happy travelers</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Kenya Safari: Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  What is included in your Kenya safari packages?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  Our Kenya safari packages include: transportation in safari vehicles, professional English-speaking guide, game drives as per itinerary, park entry fees, accommodation (for multi-day safaris), meals as specified, and bottled water. International flights, visas, tips, and personal expenses are not included.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  How do I book a Kenya safari package?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  You can book directly through our website, contact us via WhatsApp at +254 726 485 228, or email us at info@jaetravel.co.ke. We require a 30% deposit to confirm your booking, with the balance due 30 days before departure.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  What is the best time for a Kenya safari?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  The best time for Kenya safari is during the dry seasons: June to October and January to February. For the Great Migration in Maasai Mara, July to October is ideal. However, Kenya offers excellent wildlife viewing year-round.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  Are your Kenya safari packages customizable?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  Yes! All our Kenya safari packages can be customized to match your preferences. You can adjust duration, destinations, accommodation level, and add activities like hot air balloon safaris, cultural visits, or beach extensions.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Your Kenya Safari Adventure?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book now and get 10% off on all 2026 packages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#packages"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                View Packages
              </Link>
              <Link
                href="https://wa.me/254726485228"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all"
              >
                <span>💬</span> Chat on WhatsApp
              </Link>
            </div>
            <div className="mt-8 text-sm opacity-80 flex justify-center gap-6 flex-wrap">
              <span className="flex items-center gap-2"><Phone size={14} /> +254 726 485 228</span>
              <span className="flex items-center gap-2"><Mail size={14} /> info@jaetravel.co.ke</span>
              <span className="flex items-center gap-2"><CreditCard size={14} /> Secure Payment</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}