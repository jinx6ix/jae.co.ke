// app/(marketing)/_components/BrandShell.tsx
//
// Server-rendered shell for the marketing layout. Wraps the page
// content with the brand JSON-LD (`TravelAgency` + `WebSite`
// graph) and the canonical /hreflang `<link>` tags.
//
// Why a server component:
//   * The JSON-LD references the live logo/og-image URLs, which
//     come from `getBrandUrl()` (a cached server helper). The
//     prior `JsonLd` component was a client component that took
//     the URLs as props; switching to a server component removes
//     a serialize-from-server / hydrate-on-client round-trip and
//     keeps the logo / OG URLs in lock-step with the actual
//     Media doc.
//   * Hreflang tags are static for the whole marketing tree
//     (en/fr/de/it/hi/ar/zh + x-default), so it makes sense to
//     emit them in one place rather than at the top of every
//     page's `generateMetadata`.

import { getBrandUrl } from "@/lib/brand-media"

const BASE = "https://www.jaetravel.co.ke"

const LANGUAGES: Array<{ code: string; href: string }> = [
  { code: "en", href: BASE },
  { code: "fr", href: `${BASE}/fr` },
  { code: "de", href: `${BASE}/de` },
  { code: "it", href: `${BASE}/it` },
  { code: "hi", href: `${BASE}/hi` },
  { code: "ar", href: `${BASE}/ar` },
  { code: "zh", href: `${BASE}/zh` },
]

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${BASE}/#organization`,
      name: "JaeTravel Expeditions",
      alternateName: [
        "Jae Travel Kenya",
        "JaeTravel Safaris",
        "JaeTravel Accessible Safari",
      ],
      description:
        "East Africa safari tours specializing in accessible travel, gorilla trekking, and wildlife adventures across Kenya, Tanzania, Rwanda, and Uganda.",
      url: BASE,
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
      sameAs: [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/jaetravelexpeditions/",
        "https://www.tiktok.com/@jaetravelexpeditions",
        "https://wa.me/254726485228",
        "https://www.safaribookings.com/p6888",
        process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL,
      ].filter(Boolean),
      priceRange: "$$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, PayPal",
      areaServed: [
        "Kenya",
        "Tanzania",
        "Rwanda",
        "Uganda",
        "South Africa",
        "UAE",
        "India",
        "UK",
        "USA",
        "France",
        "Germany",
        "Italy",
        "China",
      ],
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
              description: "Affordable Kenya safaris from $450",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "JaeTravel Expeditions",
      publisher: { "@id": `${BASE}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/tours?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["en", "fr", "de", "it", "hi", "ar", "zh"],
    },
  ],
}

export async function BrandShell() {
  // Resolve the live logo + OG URLs. Falls back to the public
  // media file route if a Media doc isn't found yet, so this
  // never throws and the page still renders.
  const [logoUrl, ogUrl] = await Promise.all([
    getBrandUrl("logo", BASE),
    getBrandUrl("ogImage", BASE),
  ])

  // Inject the resolved URLs into the org schema. The schema
  // is a plain object — Next.js will inline it as a JSON-LD
  // <script> via dangerouslySetInnerHTML.
  const schema = {
    ...organizationSchema,
    "@graph": organizationSchema["@graph"].map((node) => {
      if (node["@type"] === "TravelAgency") {
        return {
          ...node,
          logo: { "@type": "ImageObject", url: logoUrl, width: 512, height: 512 },
          image: ogUrl,
        }
      }
      return node
    }),
  }

  return (
    <>
      {/* Hreflang — every marketing page gets the full set
          automatically so we don't miss any on a per-page basis. */}
      {LANGUAGES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={l.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={BASE} />

      {/* Brand schema */}
      <script
        type="application/ld+json"
        id="org-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}

export default BrandShell
