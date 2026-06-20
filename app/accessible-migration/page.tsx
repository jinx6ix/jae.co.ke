import { accessibleTours } from "@/lib/accessiblemara"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, CheckCircle, Accessibility, Users, Calendar, Phone, Globe, ChevronRight, Utensils, Mountain, Play, Bird, DollarSign } from "lucide-react"

const VIDEO_ID = "YOUR_VIDEO_ID" // Replace with your YouTube video ID (e.g., "dQw4w9WgXcQ")

const heroImages = {
  desktop: "/accessible-migration-hero-desktop.webp",
  mobile: "/accessible-migration-hero-mobile.webp",
  alt: "Wheelchair accessible safari vehicle with teal branding at Masai Mara, Kenya - Jae Travel Expeditions accessible migration safari"
}

export const metadata: Metadata = {
  title: "Accessible Maasai Mara Migration Safaris 2026 | Wheelchair Friendly Safari Kenya",
  description: "Book wheelchair-accessible Masai Mara migration safaris 2026. Adapted vehicles with lifts/ramps, accessible camps with roll-in showers. Expert guides. From $850.",
  keywords: [
    "accessible Masai Mara safari",
    "wheelchair accessible safari Kenya",
    "accessible migration safari",
    "disabled friendly safari Kenya",
    "accessible wildebeest migration",
    "wheelchair friendly Mara river crossing",
    "accessible safari for disabled",
    "Maasai Mara accessible tours 2026",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/accessible-migration",
    languages: {
      "en-US": "/en-us/accessible-migration",
      "en-GB": "/en-gb/accessible-migration",
    },
  },
  openGraph: {
    title: "Accessible Maasai Mara Migration Safaris 2026 | Jae Travel",
    description: "Wheelchair-accessible Masai Mara migration safaris. Adapted vehicles, accessible camps, expert guides. From $850. Kenya-based since 2015.",
    images: [{
      url: "/og/accessible-migration-2026.jpg",
      width: 1200,
      height: 630,
      alt: "Wheelchair accessible safari vehicle at Masai Mara",
    }],
    locale: "en_US",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessible Maasai Mara Migration Safaris 2026 | Jae Travel",
    description: "Wheelchair-accessible Masai Mara migration safaris. Adapted vehicles, accessible camps, expert guides. From $850.",
    images: ["/og/accessible-migration-2026.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/accessible-migration#product",
      name: "Accessible Migration Safari Packages 2026",
      description: "Wheelchair-accessible safaris to witness the Great Wildebeest Migration in Masai Mara. Adapted vehicles, accessible camps, expert guides.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "850",
        highPrice: "3500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "13",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/accessible-migration#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are the safari vehicles truly wheelchair accessible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All our accessible vehicles feature hydraulic lifts or ramps with 300-400kg capacity, wheelchair tie-down points, pop-up roofs for wildlife viewing, and spacious interiors. Vehicles are Toyota Land Cruisers or custom-built Safari Cruisers adapted for mobility needs.",
          },
        },
        {
          "@type": "Question",
          name: "What accessibility features do the camps have?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our accessible camps feature roll-in showers with shower chairs, grab rails throughout bathrooms, wide doorways (80-100cm), firm compacted pathways, low-profile beds with transfer space, and level or ramped access to all areas. Staff are trained in disability assistance.",
          },
        },
        {
          "@type": "Question",
          name: "Can I travel if I use a powered wheelchair?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Our vehicles accommodate most standard wheelchairs including larger powered chairs. Please provide your wheelchair dimensions when booking so we can ensure the best fit. Vehicle lifts have 300-400kg capacity.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best time for an accessible migration safari?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "July to October is peak migration season when wildebeest herds cross the Mara River. However, we operate accessible safaris year-round, and the Mara has excellent wildlife viewing throughout the year with resident lion, leopard, elephant, and buffalo populations.",
          },
        },
      ],
    },
  ],
}

const accessibilityFeatures = [
  {
    icon: Accessibility,
    title: "Adapted Vehicles",
    description: "Hydraulic lifts/ramps, wheelchair tie-downs, pop-up roofs for seated wildlife viewing from 4x4 Land Cruisers.",
  },
  {
    icon: Utensils,
    title: "Accessible Accommodation",
    description: "Roll-in showers, grab rails, wide doorways, paved pathways, and staff trained in disability assistance.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description: "Maximum 2-6 guests per safari for personalized attention. Private vehicles available at extra cost.",
  },
  {
    icon: Mountain,
    title: "Terrain Assessment",
    description: "We evaluate all routes and select the smoothest game drive tracks for your comfort and safety.",
  },
]

const fallbackImages = [
  "/accessible-mara-safari-2day.jpg",
  "/accessible-mara-safari-3day.jpg",
  "/accessible-mara-safari-4day.jpg",
  "/accessible-mara-safari-5day.jpg",
]

export default function AccessibleMigrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">

          {/* Top Bar */}
          <TopBar />

          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Hero Section */}
          <HeroSection />

          {/* Tour Type Navigation */}
          <TourTypeNav />

          {/* Accessibility Commitment */}
          <AccessibilityCommitment />

          {/* Accessibility Features Grid */}
          <AccessibilityFeatures features={accessibilityFeatures} />

          {/* Video Section */}
          <VideoHighlights />

          {/* Tour Listing */}
          <TourListing tours={accessibleTours} />

          {/* Final CTA */}
          <FinalCTA />
        </div>
      </div>
    </>
  )
}

function TopBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 pb-6 border-b border-gray-100">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Globe className="h-4 w-4 text-teal-600" />
          <span className="text-sm">Accessible Safari Specialists</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-gray-200" />
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4 text-teal-600" />
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

        <div className="hidden md:block w-px h-4 bg-gray-200" />

        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-medium">+254 726 485 228</span>
        </div>
      </div>
    </div>
  )
}

function Breadcrumbs() {
  return (
    <nav className="flex mb-12 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-2">
        <li><Link href="/" className="hover:text-teal-600 transition">Home</Link></li>
        <li><span className="text-gray-300">/</span></li>
        <li><Link href="/safaris" className="hover:text-teal-600 transition">Safaris</Link></li>
        <li><span className="text-gray-300">/</span></li>
        <li className="text-gray-900 font-medium">Accessible Migration Safaris</li>
      </ol>
    </nav>
  )
}

function HeroSection() {
  return (
    <header className="max-w-5xl mx-auto text-center mb-16">
      {/* Hero Image */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/90 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-white/50 backdrop-blur">
              <Accessibility className="h-3.5 w-3.5" />
              Wheelchair Accessible
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/90 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-white/50 backdrop-blur">
              <CheckCircle className="h-3.5 w-3.5" />
              Adapted Vehicles & Camps
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-teal-100">
          <Accessibility className="h-3.5 w-3.5" />
          Expert Guides Trained in Disability Assistance
        </span>
      </div>

      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-6 text-gray-900 tracking-tight">
        Accessible
        <span className="block text-teal-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
          Migration Safaris
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-8 leading-relaxed">
        Witness the Great Wildebeest Migration from the comfort of an accessible safari. Adapted vehicles, accessible camps, and trained guides — because everyone deserves to experience the world&apos;s greatest wildlife spectacle.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <Button
          asChild
          size="lg"
          className="text-base px-10 py-6 bg-teal-600 hover:bg-teal-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
        >
          <Link href="#tours">
            <Accessibility className="mr-3 h-5 w-5" />
            View Accessible Tours
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="text-base px-10 py-6 border-2 border-gray-200 hover:border-teal-600 hover:text-teal-600 rounded-full w-full sm:w-auto min-w-[240px]"
        >
          <Link href="/contact">
            <Phone className="mr-3 h-5 w-5" />
            Discuss Your Needs
          </Link>
        </Button>
      </div>

      <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
        <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          Pickup available from:
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Nairobi Hotels</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Jomo Kenyatta Airport</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">Wilson Airport</span>
          <span className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm shadow-sm">2-7 day options</span>
        </div>
      </div>
    </header>
  )
}

function TourTypeNav() {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-1 py-3 overflow-x-auto">
          <Link
            href="/accessible-migration"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-teal-600 text-white whitespace-nowrap"
          >
            <Accessibility className="h-4 w-4" />
            Accessible Tours
          </Link>
          <Link
            href="/wildebeest-migration-safari-packages"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 whitespace-nowrap transition"
          >
            <Bird className="h-4 w-4" />
            Standard Tours
          </Link>
          <Link
            href="/budget-tours"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 whitespace-nowrap transition"
          >
            <DollarSign className="h-4 w-4" />
            Budget Tours
          </Link>
          <Link
            href="/tour"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 whitespace-nowrap transition"
          >
            <Star className="h-4 w-4" />
            All Tours
          </Link>
        </div>
      </div>
    </div>
  )
}

function AccessibilityCommitment() {
  return (
    <section className="mb-20">
      <div className="bg-gradient-to-br from-teal-900 to-emerald-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-wider text-teal-300 mb-6">
              Our Accessibility Commitment
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
              Safari for Everyone,
              <span className="block text-teal-300 mt-2">No Exceptions</span>
            </h2>

            <p className="text-lg text-gray-200 mb-10 leading-relaxed">
              We believe the Great Wildebeest Migration is for everyone. Our accessible safaris are designed from the ground up — from vehicle adaptations to camp accessibility — ensuring you can focus on the wildlife, not the barriers.
            </p>

            <div className="space-y-6">
              {[
                "Every vehicle has a hydraulic lift or ramp with 300-400kg capacity",
                "All camps have roll-in showers, grab rails, and paved pathways",
                "Guides trained in disability assistance and transfer techniques",
                "Small groups (2-6 people) for personalized attention",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <Accessibility className="h-5 w-5 text-teal-300" />
              What Sets Us Apart
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Vehicle lift capacity</span>
                <span className="text-white font-medium">300-400 kg</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Doorway width (min)</span>
                <span className="text-white font-medium">80-100 cm</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Max group size</span>
                <span className="text-white font-medium">2-6 people</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Guide training</span>
                <span className="text-white font-medium">Disability specialist</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-teal-300">
                All details confirmed before travel — no surprises on arrival
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AccessibilityFeatures({ features }: { features: typeof accessibilityFeatures }) {
  return (
    <section className="mb-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Built for Accessibility
        </h2>
        <p className="text-lg text-gray-600">
          Every element of our accessible safaris is designed with your mobility needs in mind.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function VideoHighlights() {
  return (
    <section className="mb-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs uppercase tracking-wider text-teal-600 mb-4">
          Experience It
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Accessible Safari in Action
        </h2>
        <p className="text-lg text-gray-600">
          See how our adapted vehicles and accessible camps make the Great Migration available to everyone.
        </p>
      </div>

      <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=0&rel=0`}
          title="Accessible Safari at Masai Mara - Wheelchair Friendly Wildlife Experience | Jae Travel Expeditions"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
            <Accessibility className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Adapted Vehicles</h3>
          <p className="text-sm text-gray-600">Hydraulic lifts, ramps, and pop-up roofs for seated wildlife viewing</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Accessible Camps</h3>
          <p className="text-sm text-gray-600">Roll-in showers, grab rails, and paved pathways throughout</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Trained Guides</h3>
          <p className="text-sm text-gray-600">Expert guides specialized in disability assistance and accessibility</p>
        </div>
      </div>
    </section>
  )
}

function TourListing({ tours }: { tours: typeof accessibleTours }) {
  return (
    <section id="tours" className="mb-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs uppercase tracking-wider text-teal-600 mb-4">
          Choose Your Safari
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Accessible Migration Safari Packages
        </h2>
        <p className="text-lg text-gray-600">
          From 2-day introductory tours to 7-day luxury experiences — all with full accessibility features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour, index) => (
          <AccessibleTourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>
    </section>
  )
}

function AccessibleTourCard({ tour, index }: { tour: typeof accessibleTours[number]; index: number }) {
  const imageUrl = tour.image.startsWith('/')
    ? `https://www.jaetravel.co.ke${tour.image}`
    : tour.image

  const hasDiscount = tour.originalPrice && tour.originalPrice > tour.price
  const discountPct = hasDiscount
    ? Math.round((1 - tour.price / tour.originalPrice!) * 100)
    : 0

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <Link href={tour.url} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discountPct}% OFF
            </span>
          )}
          <span className="bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Accessible
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
          ${tour.price}/person
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="text-sm font-medium text-gray-700">{tour.rating}</span>
          <span className="text-sm text-gray-500">({tour.reviewCount} reviews)</span>
        </div>

        <Link href={tour.url} className="block mb-3">
          <h3 className="font-medium text-gray-900 leading-snug hover:text-teal-600 transition-colors line-clamp-2">
            {tour.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
          {tour.shortDescription}
        </p>

        {/* Quick info */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {tour.groupSize}
          </span>
        </div>

        {/* Accessibility badges */}
        {tour.accessibility && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tour.accessibility.vehicle && (
              <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full border border-teal-100">
                Vehicle adapted
              </span>
            )}
            {tour.accessibility.accommodation && (
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-100">
                Accessible camp
              </span>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through mr-1">
                ${tour.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">${tour.price}</span>
            <span className="text-xs text-gray-500">/person</span>
          </div>
          <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700 rounded-full">
            <Link href={tour.url}>
              View Details <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FinalCTA() {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 rounded-3xl p-16 md:p-20 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
          Ready to Experience the Migration?
        </h2>

        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
          Tell us your accessibility needs and we&apos;ll build the perfect safari for you. Every detail confirmed before departure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-white text-teal-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px] shadow-lg"
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
              <Phone className="mr-2 h-5 w-5" />
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