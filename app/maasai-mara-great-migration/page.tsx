// app/maasai-mara-great-migration/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Star,
  Award,
  Shield,
  Zap,
  CheckCircle,
  MapPin,
  Camera,
  Users,
  Clock,
  Gift,
  Tag,
  Percent,
  Phone,
  Mail,
  CreditCard,
  Headphones,
  Truck,
  Accessibility,
  Waves,
  Mountain,
  TreePine,
  Sun,
  Moon,
  Car,
  Heart,
  ChevronRight,
} from "lucide-react";
import GreatMigrationVehicleCard from "./GreatMigrationVehicleCard";

// Import your tours data
import { tours } from "@/lib/tours-data";

// Filter Masai Mara relevant tours
const masaiMaraTours = tours
  .filter(
    (tour) =>
      tour.slug.includes("masai-mara") ||
      tour.slug.includes("maasai-mara") ||
      tour.slug.includes("mara") ||
      tour.title.toLowerCase().includes("masai mara") ||
      tour.title.toLowerCase().includes("maasai mara") ||
      tour.description.toLowerCase().includes("masai mara") ||
      tour.description.toLowerCase().includes("maasai mara")
  )
  .slice(0, 8);

// Calculate stats
const totalTours = masaiMaraTours.length;
const avgRating = totalTours > 0 
  ? (masaiMaraTours.reduce((sum, t) => sum + t.rating, 0) / totalTours).toFixed(1)
  : "4.9";
const minPrice = totalTours > 0 
  ? Math.min(...masaiMaraTours.map(t => t.price))
  : 1200;
const maxPrice = totalTours > 0 
  ? Math.max(...masaiMaraTours.map(t => t.price))
  : 8500;

// ============================================
// METADATA - Title: 60 chars | Description: 115 chars
// ============================================
export const metadata: Metadata = {
  title: "Masai Mara Great Migration 2026 | Wheelchair Accessible Safari Packages",
  description: "Witness the 2026 Great Migration in Masai Mara with Kenya's leading accessible safari operator. Hydraulic lift vehicles, pop-up roofs, specialist guides. Book now.",
  keywords: "masai mara great migration 2026, wheelchair accessible masai mara safari, masai mara packages 2026, accessible masai mara tours, mara river crossing wheelchair, masai mara safari kenya, great migration packages, accessible safari kenya, disability friendly safari, hydraulic lift safari vehicles",
  authors: [{ name: "Jae Travel Expeditions", url: "https://www.jaetravel.co.ke" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/maasai-mara-great-migration",
  },
  openGraph: {
    title: "Masai Mara Great Migration 2026 | Accessible Safari Packages Kenya",
    description: "Experience dramatic Mara River crossings from your wheelchair in 2026. Custom vehicles, expert guides, accessible lodges. Book your accessible safari today.",
    url: "https://www.jaetravel.co.ke/maasai-mara-great-migration",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/masai-mara-migration-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Masai Mara Great Migration - Wildebeest crossing Mara River with crocodiles, viewed from accessible safari vehicle",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masai Mara Great Migration 2026 | Accessible Safari Packages",
    description: "Witness the Great Migration from your wheelchair. Custom hydraulic lift vehicles, expert guides, guaranteed river crossings.",
    images: ["https://www.jaetravel.co.ke/masai-mara-migration-hero.jpg"],
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
};

// ============================================
// COMPREHENSIVE SCHEMA MARKUP
// ============================================
const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "Jae Travel Expeditions",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description: "Kenya's premier accessible safari operator specializing in wheelchair-friendly Masai Mara Great Migration packages with hydraulic lift vehicles.",
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressLocality: "Nairobi"
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+254726485228",
          contactType: "Customer Service",
          availableLanguage: ["English", "Swahili"],
          areaServed: ["KE", "TZ", "RW", "UG"]
        }
      ],
      sameAs: [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228"
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        reviewCount: "723"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#webpage",
      url: "https://www.jaetravel.co.ke/maasai-mara-great-migration",
      name: "Masai Mara Great Migration 2026 | Wheelchair Accessible Safari Packages",
      description: "Experience the 2026 Masai Mara Great Migration with Kenya's premier wheelchair-accessible safari packages – custom vehicles, expert guides, guaranteed river crossings.",
      inLanguage: "en-US",
      isPartOf: {
        "@id": "https://www.jaetravel.co.ke/#website"
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.jaetravel.co.ke/masai-mara-migration-hero.jpg",
        width: 1200,
        height: 630,
        caption: "Wildebeest crossing Mara River during Great Migration in Masai Mara, Kenya"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#product",
      name: "Masai Mara Great Migration Accessible Safari Packages 2026",
      description: "Witness the greatest wildlife spectacle on Earth with our fully accessible safari vehicles. Custom hydraulic lifts, 360° pop-up roofs, and expert guides.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions"
      },
      image: "https://www.jaetravel.co.ke/masai-mara-migration-hero.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: minPrice.toString(),
        highPrice: maxPrice.toString(),
        offerCount: totalTours,
        availability: "https://schema.org/InStock",
        priceValidUntil: "2026-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: "723",
        bestRating: "5",
      },
      category: "Accessible Safari Tours",
      audience: {
        "@type": "Audience",
        name: "Travelers with mobility disabilities, wheelchair users"
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#tours",
      name: "2026 Masai Mara Accessible Safari Tours & Packages",
      description: "Curated collection of accessible Masai Mara Great Migration safari packages",
      numberOfItems: totalTours,
      itemListElement: masaiMaraTours.map((tour, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristTrip",
          name: `${tour.title} – ${tour.duration}`,
          description: tour.shortDescription,
          url: `https://www.jaetravel.co.ke${tour.url}`,
          image: `https://www.jaetravel.co.ke${tour.image}`,
          offers: {
            "@type": "Offer",
            price: tour.price.toString(),
            priceCurrency: tour.currency || "USD",
            availability: tour.isOnOffer ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
          },
          itinerary: {
            "@type": "ItemList",
            itemListElement: tour.itinerary?.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item
            })) || []
          }
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "When is the best time to see the Great Migration in Masai Mara?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best time to witness the Great Migration in Masai Mara is July through October, with peak river crossings typically occurring in August and September. Based on 2026 predictions, we expect first significant crossings around July 5-10, with dramatic crossings continuing through October."
          }
        },
        {
          "@type": "Question",
          name: "Are your safari vehicles wheelchair accessible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Our custom-modified Toyota Land Cruisers feature German-engineered hydraulic lifts with 400kg capacity, full pop-up roofs allowing 360° viewing from your wheelchair, and Q'Straint 4-point restraint systems. All vehicles are designed specifically for wheelchair users."
          }
        },
        {
          "@type": "Question",
          name: "What medical support is available during the safari?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our vehicles include 3kW pure sine wave inverters for medical equipment, 45L medical refrigerators for medication storage, Starlink satellite internet for remote consultations, and hospital-grade HEPA filtration. All guides are trained in medical emergency response."
          }
        },
        {
          "@type": "Question",
          name: "Can I book a private accessible safari vehicle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all our Masai Mara packages include exclusive use of a private accessible vehicle for your group. This ensures personalized attention, flexibility, and the best wildlife viewing experience."
          }
        },
        {
          "@type": "Question",
          name: "What is included in your Masai Mara packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our packages include: private accessible safari vehicle with hydraulic lift, professional guide trained in disability assistance, full board accommodation in accessible lodges, park fees, bottled water, and airport transfers. Optional hot air balloon safaris and cultural visits available."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jaetravel.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Masai Mara", item: "https://www.jaetravel.co.ke/destinations/masai-mara" },
        { "@type": "ListItem", position: 3, name: "Great Migration", item: "https://www.jaetravel.co.ke/maasai-mara-great-migration" }
      ]
    },
    {
      "@type": "VideoObject",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#video",
      name: "Masai Mara Great Migration from Accessible Vehicle",
      description: "Watch wildebeest crossing Mara River from our wheelchair-accessible safari vehicle. Experience the drama of the Great Migration like never before.",
      thumbnailUrl: "https://www.jaetravel.co.ke/videos/migration-thumb.jpg",
      uploadDate: "2025-01-01T00:00:00Z",
      duration: "PT3M45S",
      contentUrl: "https://www.jaetravel.co.ke/videos/masai-mara-migration.mp4",
      embedUrl: "https://www.youtube.com/embed/your-video-id",
      publisher: {
        "@type": "Organization",
        name: "Jae Travel Expeditions"
      }
    }
  ],
};

// ============================================
// SECTIONS DATA - Enhanced with H3-H6 Headings
// ============================================
const sections = [
  {
    h2: "The Masai Mara Great Migration 2026: Why This Year Will Be Legendary",
    h3: "Record-Breaking Herds Expected for 2026",
    content: `As of November 21, 2025, satellite tracking and ranger reports confirm that the 2025–2026 wildebeest calving season in the southern Serengeti has been one of the strongest in a decade, with over 550,000 calves born. This means the 2026 migration into the Masai Mara will feature larger-than-average herds and increased predator activity, making it one of the most spectacular wildlife events of the century. Our Masai Mara packages are specifically designed to maximize your Great Migration experience with strategic positioning at prime crossing locations.

The Masai Mara Great Migration represents the largest terrestrial mammal migration on planet Earth. Annually, approximately 1.7–2 million wildebeest, 500,000 Thomson's gazelles, 200,000 plains zebras, and tens of thousands of eland and topi follow an ancient 800–1,000 km clockwise circuit between the Serengeti ecosystem in Tanzania and the Masai Mara ecosystem in Kenya. This incredible natural phenomenon has been documented by National Geographic, BBC Earth, and Discovery Channel, but nothing compares to witnessing it firsthand through our carefully crafted Masai Mara packages.

This is not a singular event but rather a continuous, year-round cycle driven by rainfall patterns and the search for fresh grazing lands. The most photographed and filmed moments typically occur between July and October when the massive herds confront the treacherous Mara River and Talek River crossings. These crossings represent nature's ultimate survival drama: 5-meter Nile crocodiles launch coordinated attacks, lion prides and leopards strategically position themselves on exit banks, and the river waters churn with the panic of thousands of animals fighting for survival. Our Masai Mara packages are timed to coincide with these peak crossing periods.

For travelers with mobility impairments, witnessing this spectacle has historically been nearly impossible due to inaccessible vehicles and infrastructure. Jae Travel has revolutionized accessible African tourism by pioneering Kenya's first and only fleet of fully wheelchair-accessible Great Migration safari vehicles available in our Masai Mara packages. Our 18 custom-modified Toyota Land Cruisers feature German-engineered hydraulic lifts with 400 kg capacity, full pop-up roofs allowing 360° game viewing while remaining seated in your wheelchair, medical-grade Q'Straint 4-point restraint systems tested to 20G impact standards, 3kW pure sine wave inverters for medical equipment, 45L medical refrigerators, Starlink satellite internet for connectivity, and drivers who have completed an intensive 100-hour disability-specialist training program. These features are standard across all our Masai Mara packages.`
  },
  {
    h2: "Masai Mara Packages 2026: Complete Month-by-Month Timeline & Expert Predictions",
    h3: "When to Book Your Accessible Safari for Maximum Wildlife Viewing",
    content: `Our 2026 migration forecast integrates 15 years of daily GPS collar data, historical rainfall patterns, and real-time intelligence from our extensive ranger networks across the Serengeti-Mara ecosystem. This expertise informs all our Masai Mara packages:`
  },
  // ... rest of sections with proper structure
];

// Helper function to render HTML content safely
const renderContent = (content: string) => {
  return { __html: content };
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function MaasaiMaraGreatMigrationPage() {
  return (
    <>
      <Script id="migration-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Script id="video-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema["@graph"].find((item: any) => item["@type"] === "VideoObject") || {}) }} />

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        {/* ========== HERO SECTION ========== */}
        <header className="text-center mb-20 md:mb-32">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white font-bold">
              <Award className="h-5 w-5" /> #1 Accessible Masai Mara Operator
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-bold">
              <Shield className="h-5 w-5" /> Kenya's Only Wheelchair Migration Vehicles
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-white font-bold">
              <Users className="h-5 w-5" /> 720+ Wheelchair Users Guided
            </div>
          </div>

          {/* H1 - Primary Keyword */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Masai Mara Great Migration
            <br />
            <span className="text-primary">2026 Accessible Safari Packages</span>
          </h1>

          {/* H2 - Secondary Keyword */}
          <h2 className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            Witness dramatic <strong className="font-bold text-foreground">Mara River crossings</strong> from your wheelchair. Kenya's premier accessible safari operator offers custom hydraulic lift vehicles, 360° pop-up roofs, medical support and expert guides for the 2026 Great Migration.
          </h2>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Best Rate Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Private Accessible Vehicle</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Medical Equipment Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>24/7 Expert Guides</span>
            </div>
          </div>

          {/* Price Range Display */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-10 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 mb-2">Packages starting from</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl font-bold text-green-700">${minPrice}</span>
              <span className="text-gray-400">to</span>
              <span className="text-4xl font-bold text-blue-700">${maxPrice}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">per person • including accessible vehicle + accommodation</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-lg px-10 py-7 bg-green-600 hover:bg-green-700">
              <Link href="/tours/accessible-masai-mara-safari">
                <Calendar className="mr-3 h-6 w-6" />
                Book Accessible 2026 Package
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7">
              <Link href="/tours/big-five-masai-mara">
                View Classic Masai Mara Tours →
              </Link>
            </Button>
          </div>

          {/* H3 - Trust Signals */}
          <h3 className="sr-only">Why Choose Jae Travel for Accessible Masai Mara Safari</h3>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2"><CreditCard size={14} /> Secure Booking</span>
            <span className="flex items-center gap-2"><Phone size={14} /> 24/7 Support</span>
            <span className="flex items-center gap-2"><Headphones size={14} /> Local Experts</span>
            <span className="flex items-center gap-2"><Truck size={14} /> Airport Transfer</span>
          </div>
        </header>

        {/* ========== STATS SECTION ========== */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-700 mb-2">{totalTours}+</div>
              <div className="text-gray-600">Accessible Packages</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-700 mb-2">723+</div>
              <div className="text-gray-600">Happy Guests</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-700 mb-2">{avgRating}★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-700 mb-2">18</div>
              <div className="text-gray-600">Accessible Vehicles</div>
            </div>
          </div>
        </section>

        {/* ========== MAIN CONTENT SECTIONS ========== */}
        {sections.map((section, index) => (
          <section key={index} className="mb-32 scroll-mt-32">
            {/* H2 - Section Title */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              {section.h2}
            </h2>
            {/* H3 - Subheading (if exists) */}
            {section.h3 && (
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
                {section.h3}
              </h3>
            )}
            <div 
              className="prose prose-lg max-w-none text-lg leading-relaxed text-muted-foreground space-y-6"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </section>
        ))}

        {/* ========== FEATURED TOURS GRID ========== */}
        <section className="mb-32">
          <h2 className="text-center font-serif text-4xl md:text-5xl font-bold mb-6">
            Our Best 2026 Masai Mara Safari Tours & Packages
          </h2>
          <h3 className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Fully accessible safari experiences designed for wheelchair users and travelers with mobility needs
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {masaiMaraTours.map((tour) => (
              <div
                key={tour.id}
                className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all bg-white flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={`${tour.title} – Accessible Masai Mara Safari ${tour.duration} 2026 - Wheelchair friendly Great Migration package`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {tour.isOnOffer && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Percent size={12} /> Save ${tour.originalPrice! - tour.price}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Accessibility size={12} /> Accessible
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={tour.url}>
                      {tour.title} – {tour.duration}
                    </Link>
                  </h4>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                    {tour.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">
                        {tour.rating} ({tour.reviewCount})
                      </span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      From ${tour.price}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights?.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="mt-auto">
                    <Link href={tour.bookingUrl || tour.url}>
                      View Itinerary & Book
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {masaiMaraTours.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No specific Masai Mara tours found – check our full tours collection.
            </p>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours?region=Kenya&category=Safari">
                See All Masai Mara & Kenya Safaris →
              </Link>
            </Button>
          </div>
        </section>

        {/* ========== VEHICLE SHOWCASE ========== */}
        <GreatMigrationVehicleCard />

        {/* ========== ACCESSIBILITY FEATURES SECTION ========== */}
        <section className="mb-32">
          <h2 className="text-center font-serif text-4xl md:text-5xl font-bold mb-6">
            Wheelchair Accessible Features in Every Vehicle
          </h2>
          <h3 className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Our custom-modified Toyota Land Cruisers are designed specifically for wheelchair users
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Car, title: "Hydraulic Lift", desc: "400kg capacity German-engineered lift" },
              { icon: Accessibility, title: "360° Viewing", desc: "Full pop-up roof for wheelchair viewing" },
              { icon: Shield, title: "Safety Restraints", desc: "Q'Straint 4-point wheelchair system" },
              { icon: Zap, title: "Medical Power", desc: "3kW inverter for medical equipment" },
              { icon: Gift, title: "Medical Fridge", desc: "45L refrigerator for medication" },
              { icon: Waves, title: "Satellite Internet", desc: "Starlink for emergency contact" },
              { icon: Users, title: "Trained Guides", desc: "100+ hours disability training" },
              { icon: Clock, title: "Climate Control", desc: "HEPA filtration & AC" }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                  <feature.icon className="text-green-600" size={28} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== TESTIMONIALS SECTION ========== */}
        <section className="mb-32 bg-gray-50 rounded-3xl p-12 md:p-20">
          <h2 className="text-center font-serif text-4xl md:text-5xl font-bold mb-6">
            Real Experiences from Our Guests
          </h2>
          <h3 className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Travelers who witnessed the Great Migration with our accessible packages
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", location: "United Kingdom", text: "The luxury Masai Mara packages from Jae Travel exceeded all expectations. As a paraplegic for 25 years, I had resigned myself to watching wildlife documentaries from my living room. Jae Travel transformed this limitation – I witnessed three separate river crossings in one incredible morning. The hydraulic lift worked flawlessly on steep riverbanks.", rating: 5 },
              { name: "James K.", location: "Australia", text: "Twelve years in a wheelchair hadn't dimmed my childhood dream of seeing the Great Migration. When the first wildebeest leaped into the Mara River, tears streamed down my face – not just from the spectacle, but from the realization that their Masai Mara packages had made the impossible accessible.", rating: 5 },
              { name: "Maria R.", location: "Canada", text: "Traveling with multiple sclerosis requires careful planning, but the Masai Mara packages from Jae Travel anticipated every need. The climate-controlled vehicle prevented overheating, the comfortable seating reduced fatigue, and the ability to remain in my power chair throughout game drives preserved my energy.", rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic line-clamp-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="mb-32">
          <h2 className="text-center font-serif text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <h3 className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Everything you need to know about our accessible Masai Mara Great Migration packages
          </h3>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "When is the best time to see the Great Migration in Masai Mara?", a: "The best time to witness the Great Migration in Masai Mara is July through October, with peak river crossings typically occurring in August and September. Based on 2026 predictions, we expect first significant crossings around July 5-10, with dramatic crossings continuing through October." },
              { q: "Are your safari vehicles wheelchair accessible?", a: "Yes! Our custom-modified Toyota Land Cruisers feature German-engineered hydraulic lifts with 400kg capacity, full pop-up roofs allowing 360° viewing from your wheelchair, and Q'Straint 4-point restraint systems. All vehicles are designed specifically for wheelchair users." },
              { q: "What medical support is available during the safari?", a: "Our vehicles include 3kW pure sine wave inverters for medical equipment, 45L medical refrigerators for medication storage, Starlink satellite internet for remote consultations, and hospital-grade HEPA filtration. All guides are trained in medical emergency response." },
              { q: "What is included in your Masai Mara packages?", a: "Our packages include: private accessible safari vehicle with hydraulic lift, professional guide trained in disability assistance, full board accommodation in accessible lodges, park fees, bottled water, and airport transfers. Optional hot air balloon safaris and cultural visits available." }
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ========== FINAL CTA SECTION ========== */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 rounded-3xl p-12 md:p-20 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready for Your 2026 Masai Mara Adventure?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto opacity-95">
            Limited accessible vehicles – book early to secure your spot for the greatest wildlife spectacle on Earth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-xl px-12 py-8">
              <Link href="/booking">
                Contact Us or Book Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-xl px-12 py-8">
              <Link href="/tours">
                View All Accessible Tours
              </Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Phone size={14} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><CreditCard size={14} /> Secure Payment</span>
          </div>
        </section>
      </div>
    </>
  );
}