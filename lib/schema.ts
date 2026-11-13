// lib/schema.ts
//
// CANONICAL structured-data graph for every public page.
//
// Why this exists
// ---------------
// The four audited page types each shipped their own partial JSON-LD:
//   - the layout emitted a TravelAgency + WebSite graph (BrandShell)
//   - every page emitted a second graph from AllPageSEOSchema
//   - the tour page emitted a THIRD graph from tour-structured-data
//
// That produced the SAGE findings "Organization: missing url" and
// "WebSite: missing name, url": the inline stubs such as
//   { "@type": "WebSite", "@id": ".../#website" }
// declare a WebSite node that has no `name` and no `url`, so the
// validator treats it as an incomplete node even though the real
// WebSite lives in the other graph.
//
// The fix is to build ONE graph per page:
//   * a single Organization node (@id .../#organization) carrying every
//     recommended property (name, url, logo, description, sameAs,
//     contactPoint, address, geo, openingHours, areaServed, ...)
//   * a single WebSite node (@id .../#website) with name, url,
//     description, inLanguage, publisher and potentialAction
//   * the page-specific nodes, all referencing those two by @id
//
// Every other schema block on the site must REFERENCE these by @id
// rather than re-declaring the type inline.

export const BASE = "https://www.jaetravel.co.ke"

export const ORGANIZATION_ID = `${BASE}/#organization`

/** A reference to the canonical Organization node, for use as a property. */
export const ORGANIZATION_REF = { "@id": ORGANIZATION_ID }
export const WEBSITE_ID = `${BASE}/#website`

/** Canonical Organization / TravelAgency node. */
export function buildOrganizationNode(
  logoUrl: string,
  ogImageUrl: string,
  /**
   * The published review data. Passed in from the server component
   * that fetched it, because this module is imported by client
   * components and must not fetch anything itself.
   */
  reviews?: {
    rating: number
    reviewCount: number
    samples: { author: string; date: string; body: string; rating: number }[]
  },
) {
  return {
    "@type": ["TravelAgency", "LocalBusiness", "Organization"],
    "@id": ORGANIZATION_ID,
    name: "JaeTravel Expeditions",
    alternateName: [
      "Jae Travel Kenya",
      "JaeTravel Safaris",
      "JaeTravel Accessible Safari",
    ],
    description:
      "East Africa safari tours specializing in accessible travel, gorilla trekking, and wildlife adventures across Kenya, Tanzania, Rwanda, and Uganda.",
    url: BASE,
    logo: { "@type": "ImageObject", url: logoUrl, width: 512, height: 512 },
    image: ogImageUrl,
    telephone: "+254726485228",
    email: "info@jaetravel.co.ke",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karen Roundabout",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: { "@type": "GeoCoordinates", latitude: -1.286389, longitude: 36.817223 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    openingHours: "Mo-Fr 08:00-18:00, Sa 09:00-14:00",
    sameAs: [
      "https://www.facebook.com/JaeTravelExpeditions",
      "https://www.instagram.com/jaetravelexpeditions/",
      "https://www.tiktok.com/@jaetravelexpeditions",
      "https://wa.me/254726485228",
      "https://www.safaribookings.com/p6888",
      "https://www.tripadvisor.com/JaeTravelExpeditions",
      process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL,
    ].filter(Boolean),
    // The real, published ratings across all three platforms, passed
    // in by the caller from lib/reviews-live.ts so this node cannot
    // drift from the visible slider. The previous value was 5.0 from
    // "723" reviews, which matched no profile at all: SafariBookings
    // publishes 4.9/5 from 7 reviews, TripAdvisor 5.0/5 from 4, and
    // the Google Business Profile publishes 5.0 across 10 ratings.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviews?.rating ?? 4.9,
      // 21 = 7 SafariBookings + 4 TripAdvisor + 10 Google ratings.
      reviewCount: reviews?.reviewCount ?? 21,
      bestRating: 5,
      worstRating: 1,
    },
    review: (reviews?.samples ?? []).map((review) => ({
      "@type": "Review",
      "@id": `${ORGANIZATION_ID}#review-${review.author}-${review.date}`,
      author: {
        "@type": "Person",
        name: review.author,
        url: `${BASE}/#reviews`,
        sameAs: ["https://www.safaribookings.com/reviews/p6888"],
        worksFor: ORGANIZATION_REF,
      },
      publisher: {
        "@type": "Organization",
        name: "SafariBookings",
        url: "https://www.safaribookings.com/reviews/p6888",
      },
      datePublished: review.date,
      reviewBody: review.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    priceRange: "$$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, PayPal",
    areaServed: ["Kenya", "Tanzania", "Rwanda", "Uganda"],
    knowsLanguage: [
      "English",
      "French",
      "German",
      "Italian",
      "Hindi",
      "Arabic",
      "Chinese",
      "Swahili",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254726485228",
      contactType: "Customer Service",
      availableLanguage: [
        "English",
        "French",
        "German",
        "Italian",
        "Hindi",
        "Arabic",
        "Chinese",
      ],
      areaServed: ["Kenya", "Tanzania", "Rwanda", "Uganda"],
    },
    knowsAbout: [
      "Wheelchair-accessible safaris",
      "Masai Mara Great Migration",
      "Gorilla trekking",
      "Safari vehicle hire",
      "Kenya Wildlife Service permits",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "East Africa Safari Tours",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Wildlife Safari Tours",
            description: "Big Five and Great Migration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Gorilla Trekking",
            description: "Mountain gorilla encounters in Rwanda and Uganda",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Accessible Safari Tours",
            description: "Wheelchair-adapted vehicles and inclusive travel",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Budget Safari Tours",
            description: "Affordable Kenya safaris",
          },
        },
      ],
    },
  }
}

/** Canonical WebSite node. */
export function buildWebsiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE,
    name: "JaeTravel Expeditions",
    description:
      "Wheelchair accessible safari tours and vehicle hire in Kenya, Tanzania, Rwanda, and Uganda.",
    inLanguage: ["en", "fr", "de", "it", "hi", "ar", "zh"],
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/tours?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/** Reference the canonical Organization (never re-declare the type). */
/** Reference the canonical WebSite (never re-declare the type). */
export const WEBSITE_REF = { "@id": WEBSITE_ID }
