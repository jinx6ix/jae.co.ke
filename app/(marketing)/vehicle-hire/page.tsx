// app/vehicle-hire/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// VEHICLE HIRE LISTING PAGE — MAXIMUM SEO
// Schema: WebPage, AutoRental, ItemList, FAQPage, BreadcrumbList
// Keywords: safari vehicle hire Kenya, 4x4 rental, land cruiser hire
// ─────────────────────────────────────────────────────────────────────────────

import { buildReviewsArraySchema, buildAggregateRatingSchema } from "@/lib/reviews-schema"
import { AnswerSummary } from "@/components/AnswerSummary"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { buildVehicleHireMetadata } from "./faq"
import { ReviewsSlider } from "@/components/ReviewsSlider"
import { buildPageMetadata } from "@/lib/page-seo"
import type { Metadata } from "next"
import Link from "next/link"
import { vehicles } from "@/lib/vehicles-data"
import VehicleCard from "./VehicleCard"
import { vehicleHireFAQs, buildFAQSchema } from "./faq"
import {
  MapPin, Shield, Clock, PhoneCall, Star, CheckCircle,
  ChevronRight, ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = buildVehicleHireMetadata()

// ── Structured Data ────────────────────────────────────────────────────────────
async function StructuredData() {
  // 1. AutoRental (LocalBusiness)
  const autoRentalSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${BASE_URL}#organization`,
    name: "Jae Travel Expeditions",
    description:
      "Kenya's premier safari vehicle hire company offering 4x4 Land Cruisers, safari vans, luxury vehicles and accessible safari vehicles for self-drive and guided safaris across Kenya, Tanzania, Uganda and Rwanda.",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 300,
      height: 100,
    },
    // The static /og-vehicle-hire.jpg does not exist in /public, so
    // this preview rendered broken. The dynamic OG route generates a
    // real 1200x630 card instead.
    image: `${BASE_URL}/api/og?title=Safari%20Vehicle%20Hire%20Kenya&subtitle=4x4%20Land%20Cruisers%20and%20tour%20vans%20with%20driver%20or%20self-drive`,
    telephone: "+254-XXX-XXX-XXX",
    email: "info@jaetravel.co.ke",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Westlands Business Park",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2921,
      longitude: 36.8219,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "14:00",
      },
    ],
    priceRange: "$80–$180/day",
    currenciesAccepted: "USD, KES",
    paymentAccepted: "Credit Card, Bank Transfer, M-Pesa",
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Rwanda" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Safari Vehicle Fleet",
      itemListElement: vehicles.map((v, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: v.name,
        description: v.description,
        priceCurrency: v.priceCurrency,
        price: v.pricePerDay,
        url: `${BASE_URL}/vehicle-hire/${v.slug}`,
        availability: v.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemOffered: {
          "@type": "Car",
          name: v.name,
          brand: { "@type": "Brand", name: v.brand },
          model: v.model,
          image: v.image.startsWith("http") ? v.image : `${BASE_URL}${v.image}`,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 21,
      bestRating: 5,
    },
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
      "https://twitter.com/jaetravel",
      "https://www.tripadvisor.com/jaetravel",
    ],
  }

  
  // 5. Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    url: BASE_URL,
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
      "https://twitter.com/jaetravel",
      "https://www.tripadvisor.com/jaetravel",
    ],
    jobTitle: "Safari Vehicle Hire Company",
    image: `${BASE_URL}/logo.png`,
  }// 2. ItemList of vehicles
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Safari Vehicles for Hire in Kenya",
    description:
      "Full fleet of 4x4 safari Land Cruisers and tour vans available for hire across Kenya, Tanzania, and Uganda.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.name,
      url: `${BASE_URL}/vehicle-hire/${v.slug}`,
      image: v.image.startsWith("http") ? v.image : `${BASE_URL}${v.image}`,
      description: v.description,
    })),
  }

  // 3. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Safari Vehicle Hire Kenya",
        item: `${BASE_URL}/vehicle-hire`,
      },
    ],
  }

  // 4. WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/vehicle-hire#webpage`,
    url: `${BASE_URL}/vehicle-hire`,
    name: "Safari Vehicle Hire Kenya | 4x4 Land Cruiser & Tour Van Rental",
    description:
      "Hire safari vehicles in Kenya. 4x4 Land Cruisers and tour vans for Masai Mara, Amboseli and Tsavo from $80/day.",
    inLanguage: "en",
    isPartOf: { "@id": `${BASE_URL}#website` },
    about: { "@id": `${BASE_URL}#organization` },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString(),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: "#vehicle-hire-answer-summary",
    },
  }

  // Real reviews, from the same builder the visible slider uses, so the
  // schema and the page cannot drift.
  const reviewSchema = await buildReviewsArraySchema(`${BASE_URL}/vehicle-hire`)
  const aggregateRatingSchema = await buildAggregateRatingSchema(`${BASE_URL}/vehicle-hire`)
  const faqSchema = buildFAQSchema()

  const schemas = [
    autoRentalSchema,
    itemListSchema,
    breadcrumbSchema,
    webPageSchema,
    faqSchema,
    ...(aggregateRatingSchema ? [aggregateRatingSchema] : []),
    ...reviewSchema,
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

// ── Trust signals ─────────────────────────────────────────────────────────────
const trustSignals = [
  { icon: Shield, label: "Fully Insured Fleet", sub: "Comprehensive coverage" },
  { icon: Clock, label: "24/7 Breakdown Support", sub: "Across East Africa" },
  { icon: MapPin, label: "4 Countries Covered", sub: "Kenya · Tanzania · Uganda · Rwanda" },
  { icon: Star, label: "4.9 / 5 Rating", sub: "750+ verified reviews" },
]

// ── Destinations ─────────────────────────────────────────────────────────────
const destinations = [
  { name: "Masai Mara National Reserve", href: "/destinations/masai-mara" },
  { name: "Amboseli National Park", href: "/destinations/amboseli" },
  { name: "Tsavo East & West", href: "/destinations/tsavo" },
  { name: "Samburu National Reserve", href: "/destinations/samburu" },
  { name: "Lake Nakuru National Park", href: "/destinations/lake-nakuru" },
  { name: "Serengeti — Tanzania", href: "/destinations/serengeti" },
]

// ── FAQ items — single source of truth from ./faq.ts ───────
const faqItems = vehicleHireFAQs

// ═════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function VehicleHirePage() {
  return (
    <>
      <StructuredData />

      {/* ── Breadcrumb nav ─────────────────────────────────────────────────── */}
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-br from-primary/10 via-background to-muted/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Kenya's #1 Safari Vehicle Hire
          </p>
          <h1 id="vehicle-hire-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      Hire Safari Vehicles in Kenya
                      <span className="block text-primary mt-2">Land Cruisers & Tour Vans</span>
                    </h1>
                    <AnswerSummary id="vehicle-hire-answer-summary">
                      Reliable 4x4 safari vehicles for tour companies, private guides, and independent travellers across Masai Mara, Amboseli, and Tsavo — with driver or self-drive. From $80/day, fully insured with 24/7 roadside assistance. Choose from Land Cruisers, tour vans, and rooftop tent vehicles for Kenya, Tanzania, and Uganda.
                    </AnswerSummary>

                    {/* Definition pattern for answer targeting */}

                    <p className="text-muted-foreground text-sm mb-8">
                      Safari vehicle hire is the practice of renting 4x4 vehicles specifically equipped for wildlife safaris in East Africa. Vehicles typically feature pop-up roofs for game viewing, comprehensive insurance coverage, and are available with professional driver/guides or for self-drive adventurers with proper permits.
                    </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="#fleet">
                Browse Our Fleet <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link href="https://wa.me/254XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <PhoneCall className="mr-2 h-5 w-5" /> WhatsApp Us
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Trust Bar ──────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-card py-8" aria-label="Why choose us">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        {/* Breadcrumb — <nav aria-label="Breadcrumb"> so crawlers and
            screen readers can identify the hierarchy. */}
        <div className="border-b border-border bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs schema={false} items={[{ name: "Vehicle Hire", url: "/vehicle-hire" }]} />
          </div>
        </div>


      {/* ── SEO INTRO TEXT ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-background" aria-labelledby="intro-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="intro-heading" className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Safari Vehicle Hire in Kenya — Our Fleet
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
            <p>
              Looking to hire a safari vehicle in Kenya? Jae Travel Expeditions provides a fully
              equipped fleet of <strong className="text-foreground">4x4 safari Land Cruisers</strong>{" "}
              and <strong className="text-foreground">pop-up roof tour vans</strong> purpose-built for
              East Africa's toughest terrains. Whether you need a vehicle for the{" "}
              <Link href="/destinations/masai-mara" className="text-primary underline-offset-4 hover:underline">
                Masai Mara National Reserve
              </Link>
              ,{" "}
              <Link href="/destinations/amboseli" className="text-primary underline-offset-4 hover:underline">
                Amboseli National Park
              </Link>
              , or a cross-border expedition to the{" "}
              <Link href="/destinations/serengeti" className="text-primary underline-offset-4 hover:underline">
                Serengeti in Tanzania
              </Link>
              , our fleet delivers comfort, reliability, and performance.
            </p>
            <p>
              Every vehicle in our fleet is meticulously maintained, fully insured, and equipped
              with GPS, first-aid kits, and 24/7 breakdown support. Choose from our{" "}
              <strong className="text-foreground">Toyota Land Cruiser Prado TX</strong> (from $95/day),
              the heavy-duty{" "}
              <strong className="text-foreground">Land Cruiser 78 Series</strong> for groups (from
              $120/day), or our budget-friendly{" "}
              <strong className="text-foreground">Toyota Hiace Safari Van</strong> (from $80/day). All
              vehicles are available{" "}
              <Link href="#with-driver" className="text-primary underline-offset-4 hover:underline">
                with a professional driver/guide
              </Link>{" "}
              or as a{" "}
              <Link href="#self-drive" className="text-primary underline-offset-4 hover:underline">
                self-drive safari vehicle
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── FLEET GRID ─────────────────────────────────────────────────────── */}
      <section id="fleet" className="py-16 bg-muted/20" aria-labelledby="fleet-heading">
        <div className="container mx-auto px-4">
          <h2 id="fleet-heading" className="text-3xl md:text-4xl font-bold text-center mb-3">
            Available Safari Vehicles
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            All vehicles include comprehensive insurance, GPS, and 24/7 roadside support.
            Prices are in USD per day excluding fuel.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={{ ...vehicle, pricePerDay: vehicle.pricePerDay.toString() }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-background border-t border-border" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-center mb-3">
            Safari Vehicle Hire Prices Kenya
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Transparent pricing — no hidden fees. All rates are USD per day.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold">Vehicle</th>
                  <th className="text-center px-4 py-4 font-semibold">Capacity</th>
                  <th className="text-center px-4 py-4 font-semibold">Drive</th>
                  <th className="text-right px-5 py-4 font-semibold">From (USD/day)</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr
                    key={v.id}
                    className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  >
                    <td className="px-5 py-4 font-medium">
                      <Link
                        href={`/vehicle-hire/${v.slug}`}
                        className="text-primary hover:underline underline-offset-4"
                      >
                        {v.name}
                      </Link>
                    </td>
                    <td className="text-center px-4 py-4 text-muted-foreground">
                      {v.capacity}
                    </td>
                    <td className="text-center px-4 py-4 text-muted-foreground">
                      {v.specifications.driveType?.includes("4WD") ||
                      v.specifications.driveType?.includes("AWD")
                        ? "4WD"
                        : "2WD"}
                    </td>
                    <td className="text-right px-5 py-4 font-bold text-primary">
                      ${v.pricePerDay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            * Driver guide: +$50–$80/day. Fuel excluded. Cross-border permits available on request.
          </p>
        </div>
      </section>

      {/* ── WITH DRIVER vs SELF-DRIVE ───────────────────────────────────────── */}
      <section
        id="with-driver"
        className="py-16 bg-muted/20 border-t border-border"
        aria-labelledby="options-heading"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 id="options-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
            With Driver or Self-Drive Safari?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* With Driver */}
            <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-sm">
              <h3 id="with-driver-heading" className="text-2xl font-bold mb-4">
                🧭 Hire with Professional Driver/Guide
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our KPSGA-certified driver/guides speak fluent English, know every animal track
                in the Masai Mara, handle all navigation and vehicle maintenance, and cover their
                own accommodation. Best for first-time safari visitors and tour operators.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Expert wildlife spotting knowledge",
                  "Driver covers fuel, navigation & breakdowns",
                  "No security deposit required",
                  "Ideal for tour companies & travel agents",
                  "Multilingual guides available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" asChild>
                <Link href="#fleet">View Vehicles with Driver</Link>
              </Button>
            </div>
            {/* Self Drive */}
            <div
              id="self-drive"
              className="rounded-2xl border-2 border-muted bg-card p-8 shadow-sm"
            >
              <h3 id="self-drive-heading" className="text-2xl font-bold mb-4">🚗 Self-Drive Safari Vehicle</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Maximum flexibility — drive at your own pace, stop wherever you like, and camp
                inside national parks. Requires a valid international driving permit and prior
                off-road experience. Ideal for experienced 4x4 drivers and overlanders.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Total freedom — no fixed itinerary",
                  "GPS with offline East Africa maps included",
                  "24/7 breakdown support across East Africa",
                  "Rooftop tent option for park camping",
                  "International driving permit required (23+)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/vehicle-hire/${vehicles.find((v) => v.useCases?.includes("self-drive"))?.slug ?? ""}`}>
                  View Self-Drive Vehicles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-background border-t border-border" aria-labelledby="destinations-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="destinations-heading" className="text-3xl font-bold text-center mb-3">
            Where Can You Take Our Safari Vehicles?
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Our fleet is cleared for national parks, cross-border travel, and remote tracks.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                {name}
              </Link>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Cross-border travel available to Tanzania, Uganda & Rwanda.{" "}
            <Link href="/contact" className="text-primary hover:underline underline-offset-4">
              Contact us
            </Link>{" "}
            for cross-border permit pricing.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-muted/20 border-t border-border" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 id="faq-heading" className="font-semibold text-lg mb-3">{q}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary text-primary-foreground text-center" aria-label="Book now">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Hire a Safari Vehicle in Kenya?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Get an instant quote — no deposit required until booking is confirmed.
            We reply within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link
                href="https://wa.me/254XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                WhatsApp Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Real reviews from SafariBookings, TripAdvisor and Google —
          rendered server-side with no third-party JavaScript. */}
      <ReviewsSlider title="Traveller reviews of our safari vehicles" />
    </>
  )
}