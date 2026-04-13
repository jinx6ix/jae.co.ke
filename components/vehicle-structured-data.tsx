// components/vehicle-structured-data.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ALL schema.org structured data for vehicle detail pages
// Implements: Car (with Offer + AggregateRating), BreadcrumbList,
//             AutoRental (LocalBusiness), WebPage, ImageObject
// ─────────────────────────────────────────────────────────────────────────────

import { Vehicle } from "@/lib/vehicles-data"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"

function abs(path: string) {
  return path.startsWith("http") ? path : `${BASE_URL}${path}`
}

interface Props {
  vehicle: Vehicle
}

export function VehicleStructuredData({ vehicle }: Props) {
  const pageUrl = `${BASE_URL}/vehicle-hire/${vehicle.slug}`
  const imageUrl = abs(vehicle.image)

  // ── 1. Car schema with Offer + AggregateRating ───────────────────────────
  const carSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${pageUrl}#vehicle`,
    name: vehicle.name,
    description: vehicle.description,
    image: [imageUrl, ...vehicle.gallery.map(abs)],
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.vehicleYear?.toString(),
    color: vehicle.color,
    numberOfDoors: vehicle.specifications.doors ?? 5,
    seatingCapacity: vehicle.specifications.seats ?? parseInt(vehicle.capacity),
    vehicleTransmission: vehicle.specifications.transmission,
    fuelType: vehicle.specifications.fuelType,
    driveWheelConfiguration:
      vehicle.specifications.driveType?.includes("4WD") ||
      vehicle.specifications.driveType?.includes("AWD")
        ? "https://schema.org/FourWheelDriveConfiguration"
        : "https://schema.org/RearWheelDriveConfiguration",
    vehicleEngine: {
      "@type": "EngineSpecification",
      name: vehicle.specifications.engine,
      fuelType: vehicle.specifications.fuelType,
    },
    vehicleSpecialUsage: "https://schema.org/RentalVehicleUsage",
    // cargo / luggage
    cargoVolume: {
      "@type": "QuantitativeValue",
      description: vehicle.specifications.luggage,
    },
    // Offer (rental pricing)
    offers: {
      "@type": "Offer",
      "@id": `${pageUrl}#offer`,
      priceCurrency: vehicle.priceCurrency,
      price: vehicle.pricePerDay,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: vehicle.pricePerDay,
        priceCurrency: vehicle.priceCurrency,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "DAY",
        },
      },
      availability: vehicle.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: pageUrl,
      seller: {
        "@type": "AutoRental",
        name: "Jae Travel Expeditions",
        url: BASE_URL,
      },
      areaServed: [
        { "@type": "Country", name: "Kenya" },
        { "@type": "Country", name: "Tanzania" },
        { "@type": "Country", name: "Uganda" },
      ],
      eligibleRegion: [
        { "@type": "Country", name: "Kenya" },
        { "@type": "Country", name: "Tanzania" },
        { "@type": "Country", name: "Uganda" },
      ],
    },
    // AggregateRating
    ...(vehicle.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: vehicle.aggregateRating.ratingValue,
        reviewCount: vehicle.aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    // service area
    areaServed: vehicle.destinations.map((d) => ({
      "@type": "Place",
      name: d,
    })),
  }

  // ── 2. BreadcrumbList ────────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Safari Vehicle Hire Kenya",
        item: `${BASE_URL}/vehicle-hire`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: pageUrl,
      },
    ],
  }

  // ── 3. AutoRental (LocalBusiness) ────────────────────────────────────────
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${BASE_URL}#organization`,
    name: "Jae Travel Expeditions",
    description:
      "Kenya's premier safari vehicle hire company. 4x4 Land Cruisers, safari vans and luxury vehicles for self-drive and guided safaris across East Africa.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
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
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        ],
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
    priceRange: "$80-$180/day",
    currenciesAccepted: "USD, KES",
    paymentAccepted: "Credit Card, Bank Transfer, M-Pesa",
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Rwanda" },
    ],
    hasMap: "https://maps.google.com/?q=Nairobi+Kenya",
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
      "https://twitter.com/jaetravel",
    ],
  }

  // ── 4. WebPage ───────────────────────────────────────────────────────────
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: vehicle.metaTitle,
    description: vehicle.metaDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${BASE_URL}#website` },
    about: { "@id": `${pageUrl}#vehicle` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 800,
    },
    dateModified: new Date().toISOString(),
  }

  // ── 5. ItemList of images (ImageObject) ──────────────────────────────────
  const imageListSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${vehicle.name} — Photo Gallery`,
    associatedMedia: [vehicle.image, ...vehicle.gallery].map((src, i) => ({
      "@type": "ImageObject",
      url: abs(src),
      name: `${vehicle.name} — Image ${i + 1}`,
      description: `${vehicle.name} safari vehicle hire Kenya — photo ${i + 1}`,
      contentUrl: abs(src),
      width: 1200,
      height: 800,
    })),
  }

  const schemas = [
    carSchema,
    breadcrumbSchema,
    localBusinessSchema,
    webPageSchema,
    imageListSchema,
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