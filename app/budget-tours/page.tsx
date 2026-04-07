// app/budget-tours/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, DollarSign, Users, Shield, Phone, MapPin, Calendar, Camera,
  Star, Award, Clock, CreditCard, Headphones, Gift, Tag, Percent,
  Truck, Waves, Mountain, TreePine, Sun, ChevronRight, Heart,
  Mail
} from "lucide-react";
import BudgetToursClient from "./BudgetToursClient";

// Import the budget tours data to include real tour cards in schema
import { budgetTours } from "@/lib/budget-tours-data";

// Calculate stats
const totalTours = budgetTours.length;
const avgRating = totalTours > 0 
  ? (budgetTours.reduce((sum, t) => sum + (t.rating || 4.5), 0) / totalTours).toFixed(1)
  : "4.8";
const minPrice = totalTours > 0 
  ? Math.min(...budgetTours.map(t => t.price))
  : 450;
const maxPrice = totalTours > 0 
  ? Math.max(...budgetTours.map(t => t.price))
  : 1200;

// ============================================
// METADATA - Title: 60 chars | Description: 115 chars
// ============================================
export const metadata: Metadata = {
  title: "Budget Safaris Kenya 2026 | Cheap Tours from $450",
  description: "Discover the best budget safaris in Kenya 2026. Masai Mara, Nakuru, Naivasha & Amboseli. Affordable group & private safaris starting from $450. Book now!",
  keywords: [
    "budget safaris Kenya 2026", "private safaris Kenya", "tented camps Masai Mara",
    "wildebeest migration safari", "budget safaris Masai Mara", "Masai Mara National Reserve tours",
    "game viewing Kenya", "unforgettable safari experiences", "group safaris Kenya",
    "Mara safari packages", "Kenya tour operators", "safari in Kenya 2026",
    "lions leopards viewing", "affordable Kenya safari", "cheap Masai Mara tours",
    "budget tours in Kenya", "cheap safaris", "budget safaris in Kenya",
    "cheap safaris in Kenya", "cheap tours in Kenya", "affordable safaris Kenya",
    "group joining safaris Kenya", "camping safaris Kenya", "low-cost Kenya tours",
    "East Africa budget safaris", "Masai Mara budget packages", "Amboseli cheap tours",
    "Lake Nakuru affordable safaris", "Tsavo budget wildlife tours", "Big Five budget viewing",
    "overland safaris Kenya", "shared safari tours"
  ].join(", "),
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/budget-tours",
    languages: {
      'en': 'https://www.jaetravel.co.ke/budget-tours',
      'en-US': 'https://www.jaetravel.co.ke/budget-tours',
      'en-GB': 'https://www.jaetravel.co.ke/budget-tours',
      'x-default': 'https://www.jaetravel.co.ke/budget-tours',
    },
  },
  openGraph: {
    title: "Budget Safaris Kenya 2026 | Cheap Masai Mara Tours from $450",
    description: "Experience the Great Wildebeest Migration on affordable budget safaris. Group & private safaris in Masai Mara, Nakuru, Naivasha & Amboseli. Book now!",
    url: "https://www.jaetravel.co.ke/budget-tours",
    siteName: "JaeTravel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg",
        width: 1200,
        height: 630,
        alt: "Wildebeest migration in Masai Mara National Reserve - budget safaris Kenya, cheap safaris in Kenya",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Safaris Kenya 2026 | Cheap Masai Mara Tours from $450",
    description: "Join our group safaris or private safaris to witness the Great Migration. Affordable tented camp stays with unforgettable experiences.",
    images: ["https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg"],
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
  other: {
    "og:price:amount": "450",
    "og:price:currency": "USD",
  },
};

const absoluteUrl = "https://www.jaetravel.co.ke/budget-tours";
const heroImage = "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg";

// Limit to first 6 tours for schema (to avoid too large JSON)
const featuredTours = budgetTours.slice(0, 6);

// ============================================
// COMPREHENSIVE SCHEMA MARKUP
// ============================================
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction for Masai Mara
    {
      "@type": "TouristAttraction",
      "@id": "https://www.jaetravel.co.ke/#attraction",
      "name": "Masai Mara National Reserve",
      "description": "World-famous wildlife reserve in Kenya known for the Great Wildebeest Migration, budget safaris in Kenya, and cheap tours in Kenya",
      "image": heroImage,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -1.4933,
        "longitude": 35.1431
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "Masai Mara"
      }
    },

    // 2. Organization + LocalBusiness (with aggregateRating & individual reviews for rich stars)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JaeTravel Expeditions",
      "description": "Professional Kenya tour operator specializing in budget safaris, cheap safaris in Kenya, budget tours in Kenya, and unforgettable safari experiences",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "email": "info@jaetravel.co.ke",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE",
        "addressLocality": "Nairobi"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": ["English", "Swahili"]
      },
      "sameAs": [
        "https://www.facebook.com/jaetravelexpeditions",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravelke"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "David Chen" },
          "datePublished": "2025-08-20",
          "reviewBody": "JaeTravel made our budget Masai Mara safari unforgettable! Excellent guides, comfortable camps, and incredible wildlife sightings — especially the wildebeest migration."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah Johnson" },
          "datePublished": "2025-07-15",
          "reviewBody": "Perfect group safari with JaeTravel! Affordable price, great tented camp, and our guide spotted lions, leopards, and the Big Five."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Michael Thompson" },
          "datePublished": "2025-09-05",
          "reviewBody": "Best budget safari experience in Kenya! JaeTravel delivered amazing value — professional team, comfortable transport, and breathtaking views."
        }
      ]
    },

    // 3. WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "JaeTravel Expeditions - Kenya Tour Operator",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" }
    },

    // 4. WebPage
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl}#webpage`,
      "url": absoluteUrl,
      "name": "Budget Safaris Kenya 2026 | Cheap Masai Mara Tours from $450",
      "description": "Book budget safaris to Masai Mara National Reserve for unforgettable experiences. Private safaris & group safaris with tented camp accommodation. Witness lions leopards & the Great Migration.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": heroImage,
        "width": 1200,
        "height": 630,
        "caption": "Wildebeest migration in Masai Mara - budget safaris Kenya"
      },
      "breadcrumb": { "@id": `${absoluteUrl}#breadcrumb` }
    },

    // 5. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke/" },
        { "@type": "ListItem", "position": 2, "name": "Budget Safaris Kenya", "item": absoluteUrl }
      ]
    },

    // 6. Product Schema for Budget Tours
    {
      "@type": "Product",
      "@id": `${absoluteUrl}#product`,
      "name": "Budget Safari Packages Kenya 2026",
      "description": "Affordable safari packages to Masai Mara, Lake Nakuru, Amboseli, and Tsavo. Includes game drives, tented camp accommodation, and expert guides.",
      "image": heroImage,
      "brand": {
        "@type": "Brand",
        "name": "JaeTravel Expeditions"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "offerCount": totalTours,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating,
        "reviewCount": "723",
        "bestRating": "5",
      },
      "category": "Budget Safari Tours"
    },

    // 7. ItemList with TouristTrip items
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl}#budget-tours-list`,
      "name": "Budget Safari Packages Kenya 2026 - Cheap Masai Mara Tours",
      "description": "Affordable safari packages starting from $450",
      "numberOfItems": totalTours,
      "itemListElement": featuredTours.map((tour, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristTrip",
          "@id": `https://www.jaetravel.co.ke${tour.url}#trip`,
          "name": tour.title,
          "description": tour.shortDescription || tour.description,
          "image": `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`,
          "duration": tour.duration,
          "touristType": ["Budget Travelers", "Adventure Seekers", "Wildlife Enthusiasts"],
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": tour.itinerary?.map((item, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": item
            })) || []
          },
          "offers": {
            "@type": "Offer",
            "url": `https://www.jaetravel.co.ke${tour.url}`,
            "priceCurrency": "USD",
            "price": tour.price.toString(),
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "@id": "https://www.jaetravel.co.ke/#organization"
            }
          }
        }
      }))
    },

    // 8. FAQPage
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl}#faqpage`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is included in your budget safaris to Masai Mara National Reserve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our budget safaris include accommodation in comfortable tented camps, all game viewing drives in Masai Mara National Reserve, professional guides, meals, and transport. Witness lions, leopards, and the wildebeest migration on these unforgettable experiences with cheap safaris in Kenya."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer private safaris or group safaris?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer both private safaris for personalized itineraries and group safaris for budget-conscious travelers. All our Kenya tours feature expert guides and excellent game viewing opportunities."
          }
        },
        {
          "@type": "Question",
          "name": "When is the best time for wildebeest migration viewing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Great Wildebeest Migration in Masai Mara National Reserve peaks from July to October. Our budget safaris during this period offer incredible game viewing of millions of wildebeest crossing the Mara River."
          }
        },
        {
          "@type": "Question",
          "name": "What type of accommodation do you use for budget safaris?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use comfortable tented camps that provide an authentic safari experience while maintaining affordability. These camps are strategically located for optimal game viewing in Masai Mara."
          }
        },
        {
          "@type": "Question",
          "name": "What wildlife can we expect to see on a Mara safari?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Masai Mara National Reserve is famous for its Big Five sightings, including lions and leopards. During migration season, you'll witness millions of wildebeest, zebras, and predators in action."
          }
        },
        {
          "@type": "Question",
          "name": "Why choose JaeTravel as your Kenya tour operator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As an experienced Kenya tour operator, we specialize in creating unforgettable safari experiences at affordable prices. Our expertise ensures you get the best game viewing opportunities with budget tours in Kenya."
          }
        }
      ]
    },

    // 9. VideoObject Schema
    {
      "@type": "VideoObject",
      "@id": `${absoluteUrl}#video`,
      "name": "Budget Safari in Masai Mara - Wildebeest Migration Highlights",
      "description": "Experience the thrill of witnessing the Great Wildebeest Migration on a budget safari in Kenya. See lions, leopards, and river crossings.",
      "thumbnailUrl": "https://www.jaetravel.co.ke/migration-thumb.jpg",
      "uploadDate": "2025-01-01T00:00:00Z",
      "duration": "PT2M30S",
      "contentUrl": "https://www.jaetravel.co.ke/videos/budget-safari-masai-mara.mp4",
      "embedUrl": "https://www.youtube.com/embed/budget-safari-id",
      "publisher": {
        "@type": "Organization",
        "name": "JaeTravel Expeditions"
      }
    }
  ]
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function BudgetToursPage() {
  return (
    <div className="pb-16">
      {/* Structured Data - Now includes real tour cards */}
      <Script
        id="budget-tours-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fantasticafrica-20240806-0001.jpg"
            alt="Wildebeest migration game viewing in Masai Mara National Reserve - budget safaris Kenya, cheap safaris in Kenya"
            fill
            className="object-cover brightness-50"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            quality={90}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          {/* H1 - Primary Keyword */}
          <h1 className="mb-6 font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            <strong>Budget Safaris Kenya 2026</strong> — <span className="text-primary">From $450</span>
          </h1>
          {/* H2 - Secondary Keyword */}
          <h2 className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Experience the spectacular <strong>wildebeest migration</strong> in <strong>Masai Mara National Reserve</strong> on our affordable <strong>budget safaris</strong>. 
            Choose between exciting <strong>group safaris</strong> or personalized <strong>private safaris</strong> with comfortable <strong>tented camps</strong> accommodation. 
            Enjoy incredible <strong>game viewing</strong> of <strong>lions, leopards</strong> and the Big Five on this <strong>unforgettable experience</strong>.
          </h2>
          
          {/* Price Display */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8 inline-flex items-center gap-4 mx-auto">
            <div className="text-center">
              <p className="text-sm opacity-80">Starting from</p>
              <p className="text-3xl font-bold">${minPrice}</p>
            </div>
            <div className="w-px h-10 bg-white/30"></div>
            <div className="text-center">
              <p className="text-sm opacity-80">Average</p>
              <p className="text-3xl font-bold">${Math.round((minPrice + maxPrice) / 2)}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg bg-green-600 hover:bg-green-700">
              <Link href="#tours">View All <strong>Mara Safari</strong> Packages</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/contact">Contact Our <strong>Tour Operator</strong> Today</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Best Price Guarantee</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Group & Private Safaris</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Support</span>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">{totalTours}+</div>
              <div className="text-gray-600">Budget Safari Packages</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">723+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">{avgRating}★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">${minPrice}</div>
              <div className="text-gray-600">Starting Price</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTRODUCTION SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          {/* Main Title */}
          <h2 className="mb-6 font-serif text-5xl md:text-6xl font-bold tracking-tight">
            Discover the Best <strong className="text-green-600">Budget Safaris in Kenya</strong> for 2026
          </h2>

          {/* Subheading */}
          <div className="max-w-5xl mx-auto pl-70 mb-12">
            <h3 className="text-2xl text-gray-600 font-light">
              Affordable wildlife adventures with comfortable tented camps and expert guides
            </h3>
          </div>

          {/* Paragraphs in their own divs with pl-60 and wider max-w-5xl for longer lines */}
          <div className="max-w-5xl mx-auto pl-60 space-y-6">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Planning your dream <strong>safari in Kenya</strong>? As a leading <strong>Kenya tour operator</strong>, 
                JaeTravel Expeditions offers exceptional <strong>budget safaris</strong>, <strong>cheap safaris in Kenya</strong>, 
                and <strong>budget tours in Kenya</strong> to <strong>Masai Mara National Reserve</strong>.
              </p>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Whether you prefer the camaraderie of <strong>group safaris</strong> or the exclusivity of 
                <strong>private safaris</strong>, we create <strong>unforgettable experiences</strong> that won&apos;t break the bank.
              </p>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our <strong>Mara safari</strong> packages include comfortable <strong>tented camps</strong> accommodation 
                and expert-led <strong>game viewing</strong> drives. Witness the spectacular 
                <strong>wildebeest migration</strong> and spot majestic <strong>lions, leopards</strong> and other wildlife 
                on our carefully crafted <strong>Kenya tours</strong>.
              </p>
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="pt-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-10 py-7 text-lg rounded-full"
            >
              <Link href="#tours">
                Explore Our <strong>Cheap Safaris in Kenya</strong> Packages
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== KEY FEATURES SECTION ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Your Perfect <strong>Budget Tours in Kenya</strong> Experience
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MapPin className="h-7 w-7 text-green-600" />,
                title: "Masai Mara National Reserve",
                desc: "Prime <strong>game viewing</strong> in Kenya's most famous wildlife sanctuary",
              },
              {
                icon: <Calendar className="h-7 w-7 text-green-600" />,
                title: "Wildebeest Migration",
                desc: "Witness the Great Migration on our specially timed <strong>Mara safari</strong> packages",
              },
              {
                icon: <Users className="h-7 w-7 text-green-600" />,
                title: "Flexible Safari Options",
                desc: "Choose between <strong>private safaris</strong> or affordable <strong>group safaris</strong>",
              },
              {
                icon: <Camera className="h-7 w-7 text-green-600" />,
                title: "Lions & Leopards",
                desc: "Excellent chances to spot <strong>lions, leopards</strong> and the complete Big Five",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DYNAMIC TOURS GRID ========== */}
      <div id="tours">
        <BudgetToursClient />
      </div>

      {/* ========== WHY CHOOSE US SECTION ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Why Choose JaeTravel for Your <strong>Cheap Safaris in Kenya</strong>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <DollarSign className="h-7 w-7 text-green-600" />,
                title: "Best Value Budget Safaris",
                desc: "Starting from $450 — premium <strong>game viewing</strong> experiences at affordable prices.",
              },
              {
                icon: <Users className="h-7 w-7 text-green-600" />,
                title: "Expert Tour Operator",
                desc: "As a professional <strong>Kenya tour operator</strong>, we provide knowledgeable guides for <strong>unforgettable experiences</strong>.",
              },
              {
                icon: <Shield className="h-7 w-7 text-green-600" />,
                title: "Authentic Tented Camps",
                desc: "Stay in comfortable <strong>tented camps</strong> that bring you closer to nature.",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ACCOMMODATION SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Authentic <strong>Tented Camps</strong> for <strong>Budget Safaris in Kenya</strong>
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold">Experience the Real Africa on Cheap Tours</h3>
              <div className="pl-60 mb-6">
                <p className="text-lg leading-relaxed">
                  Our carefully selected <strong>tented camps</strong> offer the perfect blend of adventure and comfort. Wake up to the sounds of the African bush and enjoy:
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Comfortable beds with quality bedding",
                  "Private en-suite bathrooms",
                  "Solar-powered lighting",
                  "Secure accommodations in prime locations",
                  "Evening campfires under starry skies",
                  "Close proximity to <strong>game viewing</strong> areas"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-2xl font-bold">Perfect for All Safari Styles</h3>
              <div className="pl-60 mb-6">
                <p className="text-lg leading-relaxed">
                  Whether you&apos;re on <strong>private safaris</strong> or joining our popular <strong>group safaris</strong>, our <strong>tented camps</strong> provide:
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Social areas for meeting fellow travelers",
                  "Private spaces for couples and families",
                  "Knowledgeable camp staff",
                  "Delicious meals prepared fresh daily",
                  "Strategic locations for <strong>wildebeest migration</strong> viewing",
                  "Easy access to <strong>Masai Mara National Reserve</strong>"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INCLUDED / EXCLUDED SECTION ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Your <strong>Unforgettable Experience</strong> Includes
              </h2>
              <ul className="space-y-3">
                {[
                  "All <strong>game viewing</strong> drives in 4x4 vehicles",
                  "Accommodation in authentic <strong>tented camps</strong>",
                  "Professional guides from our <strong>tour operator</strong> team",
                  "All park fees for <strong>Masai Mara National Reserve</strong>",
                  "Full-board meals during your <strong>safari in Kenya</strong>",
                  "Transportation for <strong>private safaris</strong> or <strong>group safaris</strong>",
                  "Opportunity to witness the <strong>wildebeest migration</strong>",
                  "Chances to spot <strong>lions, leopards</strong> and Big Five"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Plan Your Perfect <strong>Cheap Tours in Kenya</strong>
              </h2>
              <ul className="space-y-3">
                {[
                  "International flights to Kenya",
                  "Travel insurance (highly recommended)",
                  "Optional activities like hot air balloon rides",
                  "Alcoholic beverages and personal expenses",
                  "Tips for guides and camp staff",
                  "Visa fees for entry to Kenya",
                  "Single supplements for solo travelers",
                  "Any additional nights beyond itinerary"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MIGRATION FOCUS SECTION ========== */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Witness the Spectacular <strong>Wildebeest Migration</strong> on Budget Tours
          </h2>
          <div className="mx-auto max-w-5xl">
            <div className="pl-70 mb-8">
              <p className="text-lg leading-relaxed">
                The Great <strong>wildebeest migration</strong> is one of nature&apos;s most incredible spectacles. Each year, over 1.5 million wildebeest, along with zebras and gazelles, journey through the <strong>Masai Mara National Reserve</strong>.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Best Viewing Times</h3>
                  <ul className="space-y-2">
                    <li><strong>July-October:</strong> River crossings in Masai Mara</li>
                    <li><strong>November-December:</strong> Southern migration begins</li>
                    <li><strong>January-March:</strong> Calving season in Serengeti</li>
                    <li><strong>April-June:</strong> Grumeti River crossings</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Predator Action</h3>
                  <p>During the migration, you&apos;ll witness incredible predator-prey interactions. Our <strong>game viewing</strong> drives focus on areas where <strong>lions, leopards</strong>, cheetahs, and hyenas are most active.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            What Our Guests Say About <strong>Budget Safaris in Kenya</strong>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "David Chen", location: "Singapore", text: "JaeTravel made our budget Masai Mara safari unforgettable! Excellent guides, comfortable camps, and incredible wildlife sightings — especially the wildebeest migration.", rating: 5 },
              { name: "Sarah Johnson", location: "United Kingdom", text: "Perfect group safari with JaeTravel! Affordable price, great tented camp, and our guide spotted lions, leopards, and the Big Five.", rating: 5 },
              { name: "Michael Thompson", location: "Australia", text: "Best budget safari experience in Kenya! JaeTravel delivered amazing value — professional team, comfortable transport, and breathtaking views.", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-md">
                <div className="flex mb-4">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Frequently Asked Questions About <strong>Budget Safaris Kenya</strong>
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "What is included in your budget safaris to Masai Mara?", a: "Our budget safaris include accommodation in comfortable tented camps, all game viewing drives in Masai Mara National Reserve, professional guides, meals, and transport. Witness lions, leopards, and the wildebeest migration on these unforgettable experiences." },
              { q: "Do you offer private safaris or group safaris?", a: "Yes! We offer both private safaris for personalized itineraries and group safaris for budget-conscious travelers. All our Kenya tours feature expert guides and excellent game viewing opportunities." },
              { q: "When is the best time for wildebeest migration viewing?", a: "The Great Wildebeest Migration in Masai Mara peaks from July to October. Our budget safaris during this period offer incredible game viewing of millions of wildebeest crossing the Mara River." },
              { q: "What type of accommodation do you use for budget safaris?", a: "We use comfortable tented camps that provide an authentic safari experience while maintaining affordability. These camps are strategically located for optimal game viewing in Masai Mara." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="py-16 bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Ready for Your <strong>Unforgettable Safari Experience</strong>?
          </h2>
          <div className="max-w-5xl mx-auto pl-70 mb-8">
            <p className="text-lg leading-relaxed">
              From ${minPrice} per person — secure your spot on our <strong>budget safaris</strong> to <strong>Masai Mara National Reserve</strong>. 
              Choose <strong>private safaris</strong> for exclusivity or join our popular <strong>group safaris</strong> for maximum value.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="bg-white text-green-700 hover:bg-gray-100">
              <Link href="/contact">Book Your <strong>Mara Safari</strong> Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="https://wa.me/+254726485228">
                <Phone className="mr-2 h-5 w-5" /> Chat with Our <strong>Tour Operator</strong>
              </a>
            </Button>
          </div>
          <h6 className="mt-8 text-sm opacity-90 flex justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2"><Phone size={14} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><CreditCard size={14} /> Secure Payment</span>
          </h6>
        </div>
      </section>
    </div>
  );
}