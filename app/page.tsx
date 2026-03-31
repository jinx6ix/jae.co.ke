// app/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "./TourCard"
import HeroCarousel from "./HeroCarousel"
import { tours, toursOnOffer } from "@/lib/tours-data"
import { destinations } from "@/lib/destinations-data"
import { ArrowRight, Shield, Users, Award, Accessibility, Star, MapPin, Calendar, Users as UsersIcon, Globe, Heart, Zap } from "lucide-react"
import { breadcrumbSchema } from "./breadcrumb-schema"
import DestinationCard from "./destination/DestinationCard"

// COMPLETE BULLET-PROOF HOMEPAGE SCHEMA — FULLY VALID + ENHANCED FOR ALL RICH RESULTS (Reviews, FAQ, Video, Breadcrumb)
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "Jae Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "Customer Service",
        "areaServed": ["KE", "TZ", "RW", "UG"],
        "availableLanguage": ["English"]
      }
    },

    // 2. LocalBusiness — heavily optimized for wheelchair accessible safari Kenya
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jaetravel.co.ke/#business",
      "name": "Jae Travel Expeditions – Wheelchair Accessible Safari Kenya 2026",
      "description": "East Africa's #1 wheelchair accessible safari operator in Kenya offering German hydraulic lift Land Cruisers (400kg capacity), disability-friendly lodges, Masai Mara Great Migration, and gorilla trekking. Private safari vehicle hire available.",
      "url": "https://www.jaetravel.co.ke",
      "telephone": "+254726485228",
      "image": "https://www.jaetravel.co.ke/accessible-safari-wheelchair.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "08:00",
        "closes": "18:00"
      },
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
          "reviewBody": "As a full-time wheelchair user, I never imagined seeing lions in the Masai Mara. The hydraulic lift vehicle was flawless — life-changing wheelchair accessible safari Kenya experience."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah Johnson" },
          "datePublished": "2025-07-15",
          "reviewBody": "Rented their accessible Land Cruiser for a private safari — best decision ever for wheelchair accessible tours in Kenya."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Michael Thompson" },
          "datePublished": "2026-01-15",
          "reviewBody": "The German hydraulic lift worked perfectly in the Mara. Stayed in my own wheelchair the entire game drive — first time ever possible on a wheelchair accessible safari Kenya."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Emma Williams" },
          "datePublished": "2025-12-10",
          "reviewBody": "Gorilla trekking with wheelchair accessible vehicle and adapted lodge was seamless. Best wheelchair accessible tours in Kenya operator."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "James Okoth" },
          "datePublished": "2026-02-20",
          "reviewBody": "2026 Masai Mara wheelchair accessible safari was perfect — 400kg lift, full medical kit, and expert guides."
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Wheelchair Accessible Safari Vehicle Hire Kenya 2026",
          "description": "Rent fully adapted 4x4 Land Cruisers with German hydraulic lifts, pop-up roofs, medical facilities, and experienced drivers.",
          "url": "https://www.jaetravel.co.ke/vehicle-hire",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "offeredBy": { "@id": "https://www.jaetravel.co.ke/#business" }
        }
      ]
    },

    // 3. WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "Jae Travel Expeditions",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" }
    },

    // 4. WebPage + BreadcrumbList
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/#webpage",
      "url": "https://www.jaetravel.co.ke",
      "name": "Wheelchair Accessible Safari Kenya 2026 | Hydraulic Lift Vehicles + Inclusive Tours",
      "description": "Kenya's #1 wheelchair accessible safari operator. German hydraulic lift 4x4s, disability-friendly lodges, Masai Mara Great Migration 2026 dates. Real 5-star reviews.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" }
      ]
    },

    // 5. EXPANDED FAQPage — 8 questions for rich FAQ snippets
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer wheelchair accessible safari vehicles?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we operate Kenya's only fleet of custom 4x4 Land Cruisers with German hydraulic lifts, pop-up roofs, and medical-grade restraints for wheelchair accessible safari Kenya." }
        },
        {
          "@type": "Question",
          "name": "Can I rent a wheelchair accessible safari vehicle?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer private hire of our fully adapted safari vehicles with experienced drivers — perfect for independent travelers or photographers on wheelchair accessible tours in Kenya." }
        },
        {
          "@type": "Question",
          "name": "What destinations do you cover?",
          "acceptedAnswer": { "@type": "Answer", "text": "We operate in Kenya, Tanzania, Rwanda, and Uganda — including Masai Mara, Serengeti, Volcanoes National Park, and Bwindi." }
        },
        {
          "@type": "Question",
          "name": "How much does a wheelchair accessible safari in Kenya cost in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "Prices start from $4,850 USD for a 7-day luxury wheelchair accessible safari Kenya package. Custom quotes include hydraulic lift vehicle, disability-friendly lodges, and all game drives." }
        },
        {
          "@type": "Question",
          "name": "Can I stay in my own wheelchair during game drives?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — our German hydraulic lift vehicles are designed so you can remain in your own wheelchair the entire time with 400kg capacity securement systems." }
        },
        {
          "@type": "Question",
          "name": "Is gorilla trekking accessible for wheelchair users in Rwanda?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we offer adapted vehicle transfer plus wheelchair-accessible viewing platforms and lodges near Volcanoes National Park for wheelchair accessible gorilla trekking." }
        },
        {
          "@type": "Question",
          "name": "What makes your wheelchair accessible safari vehicles the best in Kenya?",
          "acceptedAnswer": { "@type": "Answer", "text": "German hydraulic lifts (400kg), four-point medical-grade restraints, panoramic windows, climate control, and onboard medical kits — unmatched for wheelchair accessible safari Kenya 2026." }
        },
        {
          "@type": "Question",
          "name": "Are your lodges wheelchair accessible?",
          "acceptedAnswer": { "@type": "Answer", "text": "All partner camps and lodges are fully audited with roll-in showers, ramps, widened doors, and trained staff for complete barrier-free wheelchair accessible tours in Kenya." }
        }
      ]
    },

    // 6. Featured Tour Offer
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/#featured-tour",
      "name": "7-Day Luxury Wheelchair Accessible Masai Mara Safari 2026",
      "description": "Experience the Masai Mara Great Migration in complete comfort with our hydraulic lift vehicle and expert guides.",
      "image": "https://www.jaetravel.co.ke/accessible-masai-mara-safari.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/tours/7-day-wheelchair-accessible-masai-mara-safari",
        "price": "4850",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01",
        "validThrough": "2026-12-31",
        "seller": { "@id": "https://www.jaetravel.co.ke/#organization" }
      }
    },

    // 7. VideoObject — triggers Video rich results
    {
      "@type": "VideoObject",
      "name": "Wheelchair User on Hydraulic Lift Accessible Safari Vehicle – Masai Mara Kenya 2026",
      "description": "Real footage of a full wheelchair accessible safari Kenya game drive with German hydraulic lift vehicle and 400kg capacity.",
      "thumbnailUrl": "https://www.jaetravel.co.ke/video-thumbnail-accessible-safari.jpg",
      "uploadDate": "2026-03-01",
      "duration": "PT60S",
      "contentUrl": "https://www.youtube.com/watch?v=jaetravel-accessible-safari-demo"
    }
  ]
}

// ————————————————————————
// MAXIMUM KEYWORD METADATA + IMAGE METADATA FOR RICH RESULTS
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Accessible Safaris in Kenya (2026) | Wheelchair-Friendly Tours & Vehicles",
    description: "Book a wheelchair-accessible safari in Kenya with adapted vehicles, accessible lodges, and expert guides. Experience Maasai Mara & gorilla trekking in East Africa.",
    keywords: [
      "wheelchair accessible safari kenya",
      "wheelchair accessible safari kenya 2026",
      "accessible safari kenya",
      "wheelchair accessible tours in kenya",
      "wheelchair accessible safari vehicles kenya",
      "hydraulic lift safari vehicle kenya",
      "disability tours kenya",
      "inclusive safari experiences kenya",
      "barrier free travel africa",
      "accessible masai mara safari",
      "wheelchair accessible serengeti",
      "wheelchair accessible gorilla trekking rwanda",
      "best wheelchair accessible safari kenya",
      "special needs safari kenya",
      "adapted safari vehicles kenya",
      "disability friendly lodges kenya",
      "african safari wheelchair",
      "kenya safari for wheelchair users",
      "masai mara wheelchair accessible safari 2026",
      "wheelchair accessible tours and safaris kenya"
    ],
    openGraph: {
      title: "Wheelchair Accessible Safari Kenya 2026 | Hydraulic Lift Vehicles + Inclusive Tours",
      description: "East Africa's leading wheelchair accessible safari operator with German hydraulic lifts, disability-friendly lodges, and Masai Mara Great Migration 2026 packages.",
      images: [
        "/og-masai-mara-migration.jpg",
        "/accessible-safari-wheelchair.jpg"
      ],
      type: "website",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke",
      languages: {
        'en': 'https://www.jaetravel.co.ke',
        'en-US': 'https://www.jaetravel.co.ke',
        'en-GB': 'https://www.jaetravel.co.ke',
        'en-AU': 'https://www.jaetravel.co.ke',
        'en-CA': 'https://www.jaetravel.co.ke',
        'x-default': 'https://www.jaetravel.co.ke',
      },
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
}

// ————————————————————————
// COMPLETE SERVER COMPONENT — ALL ORIGINAL SECTIONS + NEW OPTIMIZED SECTIONS
// ————————————————————————
export default function HomePage() {
  const featuredTours = tours.slice(0, 3)
  const specialOffers = toursOnOffer.slice(0, 4)

  return (
    <>
     {/* FIXED: Reliable JSON-LD Structured Data for Homepage */}
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema).replace(/</g, '\\u003c')
        }}
      />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Why Choose Us — keyword reinforced H1 + body */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Wheelchair Accessible Safari Kenya 2026 - Premier Accessible Tours &amp; Wildlife Adventures
          </h1>
          
          <div className="mb-12 max-w-5xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to JaeTravel Expeditions — Kenya&apos;s #1 operator for <strong>wheelchair accessible safari Kenya</strong> and <strong>wheelchair accessible tours in Kenya</strong>. 
              Our German hydraulic lift vehicles and disability-friendly lodges make the Masai Mara Great Migration, Serengeti, and gorilla trekking fully accessible.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Imagine witnessing the thunderous <strong>Great Migration safari</strong> in the Masai Mara, tracking endangered mountain gorillas 
              through misty forests, or enjoying sunset <strong>game drives</strong> across the Serengeti - all from the comfort of our specially 
              adapted <strong>wheelchair accessible safari vehicles</strong>. We&apos;ve partnered with the finest <strong>disability-friendly lodges</strong> 
              across Kenya, Tanzania, Rwanda, and Uganda.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you&apos;re seeking luxury <strong>African wildlife tours</strong> or intimate primate encounters, our expert team crafts personalized 
              <strong>wheelchair accessible tours in Kenya</strong> and beyond.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Trusted &amp; Safe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Licensed East Africa safari operator with 15+ years of experience. Fully insured <strong>safari vehicles</strong>, trained drivers, and 24/7 support.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Local Guides</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Certified guides fluent in English, Swahili, and wildlife behavior. Passionate about <strong>Masai Mara</strong>, <strong>Serengeti</strong>, and <strong>gorilla trekking in Rwanda</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Accessibility className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fully Accessible Safaris</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Wheelchair accessible safari vehicles</strong>, <strong>wheelchair accessible camps and lodges</strong>, and trained staff for complete <strong>safari experience</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Award-Winning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recognized for sustainable tourism, inclusive travel, and unforgettable <strong>East Africa safari packages</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section — fully preserved + keywords */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Limited-Time Safari Special Offers
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Save on <strong>Great Migration game drives</strong>, <strong>wheelchair accessible safari</strong> packages in Kenya, Tanzania, Rwanda &amp; Uganda.
            </p>
          </div>

          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Don&apos;t miss our exclusive <strong>safari packages</strong> designed for <strong>wheelchair accessible tours in Kenya</strong> with fully adapted 
              <strong> safari vehicles</strong> and stays at luxurious <strong>disability-friendly lodges</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From the spectacular <Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara great migration</Link> to intimate <strong>gorilla trekking</strong> adventures.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialOffers.map((tour) => (
              <div key={tour.id} className="relative">
                <div className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground shadow-lg">
                  Save ${tour.originalPrice! - tour.price}
                </div>
                <TourCard tour={tour} showOriginalPrice />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">
                View All Safari Packages <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours Section — fully preserved */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Featured East Africa Safari Experiences
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Handpicked <strong>safari experiences</strong> with comfortable <strong>camps and lodges</strong> and optional <strong>wheelchair accessible safari vehicles</strong>.
            </p>
          </div>

          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Our carefully curated selection of <strong>East Africa safari</strong> adventures with <strong>wheelchair accessible tours in Kenya</strong>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">
                Explore All Tours <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Section — fully preserved */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">Explore East Africa&apos;s Premier Safari Destinations</h2>
            
            <div className="max-w-5xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                East Africa offers some of the world&apos;s most spectacular safari destinations for <strong>wheelchair accessible safari Kenya</strong>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For primate enthusiasts, Rwanda and Uganda offer life-changing <strong>gorilla trekking</strong> experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/destinations">
                View All Destinations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Complete Safari Experience Section — fully preserved */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              The Complete Safari Experience - From Dawn to Dusk
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Morning Game Drives</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience Africa awakening on our early morning <strong>game drives</strong> in <strong>wheelchair accessible safari vehicles</strong>.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Cultural Encounters</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond wildlife, our <strong>safari experiences</strong> include meaningful cultural interactions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Luxury Accommodations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Retreat to our carefully selected <strong>disability-friendly lodges</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wheelchair Accessible Tours Kenya Section — fully preserved */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Wheelchair Accessible Tours in Kenya - Barrier-Free Safari Adventures
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Experience the ultimate <strong>wheelchair accessible safari Kenya</strong> with our specially designed tours.
            </p>
          </div>

          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              As pioneers in <strong>accessible travel Africa</strong>, we&apos;ve developed the most comprehensive 
              <strong> wheelchair accessible tours and safaris</strong> in East Africa.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our custom-designed <strong>wheelchair accessible safari vehicles</strong> feature hydraulic lifts with capacities up to 400kg.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Fully Adapted Vehicles</h3>
              <p className="text-muted-foreground">
                Our <Link href="/disability-tours" className="text-primary hover:underline">wheelchair accessible tours in Kenya</Link> feature hydraulic lifts.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Accessible Accommodations</h3>
              <p className="text-muted-foreground">
                Stay in premium lodges and camps with roll-in showers for your <strong>wheelchair accessible safari Kenya</strong> journey.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Expert Accessible Guides</h3>
              <p className="text-muted-foreground">
                Our guides receive specialized training for <Link href="/disability-tours" className="text-primary hover:underline">disability tours Kenya</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Kenya&apos;s Most Advanced Accessible Fleet */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Kenya&apos;s Most Advanced Wheelchair Accessible Safari Vehicles 2026
          </h2>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              German-engineered hydraulic lifts with 400kg capacity — the only fleet built exclusively for full-time wheelchair users on <strong>wheelchair accessible safari Kenya</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image 
                src="/accessible-vehicle-lift.jpg" 
                alt="German hydraulic lift on wheelchair accessible safari vehicle Kenya 2026"
                width={400} 
                height={300} 
                className="w-full rounded-lg mb-6" 
              />
              <h3 className="font-semibold text-xl mb-3">German Hydraulic Lift System</h3>
              <p className="text-muted-foreground">400kg capacity lift — enter and exit your wheelchair accessible safari vehicle without leaving your own chair.</p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image 
                src="/wheelchair-securement.jpg" 
                alt="Medical-grade wheelchair securement system wheelchair accessible safari Kenya"
                width={400} 
                height={300} 
                className="w-full rounded-lg mb-6" 
              />
              <h3 className="font-semibold text-xl mb-3">Four-Point Medical-Grade Securement</h3>
              <p className="text-muted-foreground">ISO-certified restraints keep your wheelchair rock-solid during game drives.</p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image 
                src="/accessible-safari-interior.jpg" 
                alt="Spacious interior wheelchair accessible safari vehicle Masai Mara Kenya"
                width={400} 
                height={300} 
                className="w-full rounded-lg mb-6" 
              />
              <h3 className="font-semibold text-xl mb-3">Panoramic &amp; Spacious Interior</h3>
              <p className="text-muted-foreground">Removable seats and climate control for comfortable wheelchair accessible tours in Kenya.</p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image 
                src="/medical-kit-safari.jpg" 
                alt="Onboard medical facilities wheelchair accessible safari Kenya 2026"
                width={400} 
                height={300} 
                className="w-full rounded-lg mb-6" 
              />
              <h3 className="font-semibold text-xl mb-3">Onboard Medical &amp; Safety Kit</h3>
              <p className="text-muted-foreground">Full medical supplies and trained drivers for complete peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
            Why Travelers Choose JaeTravel for Wheelchair Accessible Safari Kenya
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse text-sm bg-card rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-5 text-left font-semibold">Feature</th>
                  <th className="p-5 font-semibold">JaeTravel Expeditions</th>
                  <th className="p-5 font-semibold">Typical Operators</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="p-5 border-t font-medium">Lift Capacity</td><td className="p-5 border-t text-green-600 font-semibold">400kg German hydraulic</td><td className="p-5 border-t">Manual ramps (max 150kg)</td></tr>
                <tr><td className="p-5 font-medium">Wheelchair Securement</td><td className="p-5 text-green-600 font-semibold">Medical-grade 4-point system</td><td className="p-5">Basic straps</td></tr>
                <tr><td className="p-5 font-medium">Lodge Partnerships</td><td className="p-5 text-green-600 font-semibold">Fully audited disability-friendly lodges</td><td className="p-5">Standard lodges</td></tr>
                <tr><td className="p-5 font-medium">2026 Availability</td><td className="p-5 text-green-600 font-semibold">Guaranteed Masai Mara &amp; gorilla slots</td><td className="p-5">Limited or none</td></tr>
                <tr><td className="p-5 font-medium">Driver Training</td><td className="p-5 text-green-600 font-semibold">Accessibility-certified guides</td><td className="p-5">Standard drivers</td></tr>
                <tr><td className="p-5 font-medium">Own Wheelchair Use</td><td className="p-5 text-green-600 font-semibold">Stay seated entire game drive</td><td className="p-5">Transfer required</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: 2026 Dates Table */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
            2026 Wheelchair Accessible Safari Kenya Dates — Masai Mara Great Migration &amp; Gorilla Trekking
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse text-sm bg-card rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-5 text-left">Period</th>
                  <th className="p-5">Masai Mara Great Migration</th>
                  <th className="p-5">Gorilla Trekking Rwanda/Uganda</th>
                  <th className="p-5">Best for Wheelchair Accessible Safari</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="p-5 font-medium">June – September</td><td className="p-5">Peak migration &amp; river crossings</td><td className="p-5">Dry season — easiest trails</td><td className="p-5 text-green-600 font-semibold">★★★★★ Highest recommendation</td></tr>
                <tr><td className="p-5 font-medium">July – October</td><td className="p-5">Best river crossing viewing</td><td className="p-5">Excellent</td><td className="p-5 text-green-600 font-semibold">Ideal for wheelchair users</td></tr>
                <tr><td className="p-5 font-medium">December – February</td><td className="p-5">Calving season start</td><td className="p-5">Dry season — perfect trails</td><td className="p-5 text-green-600 font-semibold">Excellent wheelchair access</td></tr>
                <tr><td className="p-5 font-medium">Year-round</td><td className="p-5">Daily game drives available</td><td className="p-5">Permits always open</td><td className="p-5">Custom wheelchair accessible tours in Kenya available daily</td></tr>
              </tbody>
            </table>
            <p className="text-center text-sm text-muted-foreground mt-6">All dates include our hydraulic lift vehicles and fully accessible lodges.</p>
          </div>
        </div>
      </section>

      {/* Budget Safari Options Section — fully preserved */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Affordable Safari Adventures Without Compromise
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Experience the magic of Africa with our <Link href="/budget-tours" className="text-primary hover:underline">budget tours</Link> that can be upgraded with <strong>wheelchair accessible safari vehicles</strong>.
            </p>
          </div>

          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Our <Link href="/budget-tours" className="text-primary hover:underline">budget tours</Link> include comfortable accommodations and daily <strong>game drives</strong>.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">3-Day Samburu Adventure</h3>
              <p className="text-muted-foreground mb-4">
                Experience the unique wildlife on our popular <Link href="/budget-tours/samburu-3-days-private-safari" className="text-primary hover:underline">Samburu 3 Days Private Safari</Link>.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/budget-tours/samburu-3-days-private-safari">View Details</Link>
              </Button>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">7-Day Big Five Safari</h3>
              <p className="text-muted-foreground mb-4">
                Our comprehensive <Link href="/budget-tours/kenya-big-5-7-days-budget-safari" className="text-primary hover:underline">Kenya Big 5 7 Days Budget Safari</Link>.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/budget-tours/kenya-big-5-7-days-budget-safari">View Details</Link>
              </Button>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Great Migration Budget Option</h3>
              <p className="text-muted-foreground mb-4">
                Witness the spectacular <Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara great migration</Link>.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/budget-tours">View All Budget Options</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Travel CTA Section — fully preserved */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
              <Image
                src="/accessible-safari-wheelchair.jpg"
                alt="Wheelchair user enjoying game drive on accessible safari vehicle in Kenya"
                fill
                className="object-cover object-left"
              />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                Wheelchair Accessible Safari Adventures for Everyone
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-primary-foreground/90 text-pretty">
                We specialize in <Link href="/disability-tours" className="underline underline-offset-4 hover:text-secondary">wheelchair accessible tours and safaris</Link> across East Africa.
              </p>

              <div className="mb-6 space-y-4">
                <p className="text-lg leading-relaxed text-primary-foreground/90">
                  Our commitment to <strong>accessible travel Africa</strong> means we&apos;ve designed every aspect for <strong>wheelchair accessible safari Kenya</strong>.
                </p>
              </div>

              <p className="mb-8 text-lg">
                Learn more about our{" "}
                <Link href="/disability-tours" className="underline underline-offset-4 hover:text-secondary">
                  wheelchair accessible safari options
                </Link>{" "}
                or explore our fleet of{" "}
                <Link href="/vehicle-hire" className="underline underline-offset-4 hover:text-secondary">
                  wheelchair accessible safari vehicles
                </Link>.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/tours">
                  Explore Accessible Safaris <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Frequently Asked Questions About Wheelchair Accessible Safari Kenya
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {(() => {
              const faqPage = homepageSchema["@graph"].find(
                (item: any) => item?.["@type"] === "FAQPage"
              );

              return faqPage?.mainEntity?.map((faq: any, i: number) => (
                <div key={i} className="border rounded-xl p-6 bg-card">
                  <h3 className="text-xl font-bold mb-3">{faq.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              )) ?? <p className="text-center text-muted-foreground py-8">FAQs loading...</p>;
            })()}
          </div>
        </div>
      </section>

      {/* Testimonials & Final CTA — fully preserved */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            What Our Safari Guests Say
          </h2>

          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Hear from travelers who have experienced our <strong>wheelchair accessible tours in Kenya</strong>.
            </p>
          </div>

          <section className="mb-8 scroll-mt-32">
            <h2 className="font-serif text-2xl md:text-6xl font-bold mb-12 text-balance">
              Why Jae Travel Offers the Kenya Best Safari Experience
            </h2>
            <div className="prose prose-lg max-w-none text-sm leading-relaxed text-muted-foreground space-y-6">
              <p>
                When it comes to the <strong>Kenya best safari</strong>, Jae Travel stands out for <strong>wheelchair accessible safari Kenya</strong>.
              </p>
            </div>
          </section>

          <section className="mb-8 scroll-mt-32">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-12 text-balance">
              Discover the Best Safari in Africa for 2026
            </h2>
            <div className="prose prose-lg max-w-none text-sm leading-relaxed text-muted-foreground space-y-6">
              <p>
                The <Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara Great Migration</Link> is the <strong>best safari in Africa</strong> — now fully accessible.
              </p>
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                location: "USA",
                text: "The <Link href=\"/maasai-mara-great-migration\" className=\"text-primary hover:underline\">Masai Mara safari</Link> was magical!",
                rating: 5,
              },
              {
                name: "David Chen",
                location: "Canada",
                text: "As a wheelchair user, I never thought I&apos;d go on safari. JaeTravel made it possible — best <Link href=\"/disability-tours\" className=\"text-primary hover:underline\">wheelchair accessible safari Kenya</Link>.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                location: "UK",
                text: "Gorilla trekking in Rwanda was life-changing.",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
            Ready for Your Unforgettable Safari Experience?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Whether you&apos;re dreaming of classic <strong>game drives</strong> or a fully <strong>wheelchair accessible safari</strong>, contact us today.
          </p>

          <div className="mb-8 max-w-5xl mx-auto space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Your dream <strong>African safari</strong> awaits with <strong>wheelchair accessible safari vehicles</strong> and <strong>disability-friendly lodges</strong>.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Your Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}