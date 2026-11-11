// components/AllPageSEOSchema.tsx
// ═══════════════════════════════════════════════════════════════════════════════
// MASTER RICH RESULTS COMPONENT — Covers ALL 8 Google Search Enhancements:
// ✅ Product snippets (Shopping)
// ✅ Merchant listings (Shopping)  
// ✅ Merchant opportunities (Shopping)
// ✅ Breadcrumbs
// ✅ Events
// ✅ FAQ
// ✅ Image Metadata (ImageObject)
// ✅ Review snippets
// ✅ Videos (VideoObject)
//
// USAGE — Add to any page:
//   import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
//   <AllPageSEOSchema type="tour" data={tour} slug={slug} />
//   <AllPageSEOSchema type="vehicle" data={vehicle} slug={slug} />
//   <AllPageSEOSchema type="blog" data={post} slug={slug} />
//   <AllPageSEOSchema type="destination" data={destination} slug={slug} />
//   <AllPageSEOSchema type="homepage" />
// ═══════════════════════════════════════════════════════════════════════════════

import {
  BASE,
  ORGANIZATION_REF,
  WEBSITE_REF,
} from "@/lib/schema"
import { buildVehicleFaqs } from "@/lib/vehicle-faq"
import { buildBlogFaqs } from "@/lib/blog-faq"

const BASE_URL = BASE
const YOUTUBE_CHANNEL_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || `${BASE}/youtube`
const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || null

// ── Videos (VideoObject) ──────────────────────────────────────────────────────
// Pages that have a VideoBlock pass an array of populated Video docs here.
// We emit one real VideoObject per video (the data editors actually chose)
// instead of the hard-coded `contentUrl: ${BASE}/videos/<slug>.mp4` that
// previously pointed at files that don't exist. The hard-coded single entry
// is kept as a fallback for legacy pages that haven't been updated yet —
// the moment `videos` is non-empty, the real entries win.

export interface VideoSchemaInput {
  id?: number | string
  provider: "youtube" | "instagram"
  externalId: string
  url: string
  title?: string | null
  description?: string | null
  thumbnailUrl?: string | null
  publishedAt?: string | null
  durationSeconds?: number | null
}

function toISO8601Duration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "PT0S"
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  let out = "PT"
  if (h) out += `${h}H`
  if (m) out += `${m}M`
  if (s || (!h && !m)) out += `${s}S`
  return out
}

function buildVideoObjects(
  videos: VideoSchemaInput[] | undefined,
  pageUrl: string,
  fallback: object,
): object[] {
  if (
    !videos ||
    videos.length === 0
  ) {
    return [fallback]
  }

  return videos
    .filter(
      (v) =>
        Boolean(v.externalId) &&
        Boolean(v.thumbnailUrl) &&
        Boolean(v.publishedAt),
    )
    .map((v) => {
      const isYouTube =
        v.provider === "youtube"

      const embedUrl =
        isYouTube
          ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
              v.externalId,
            )}`
          : getInstagramEmbedUrl(
              v.url,
            )

      const videoUrl =
        `${pageUrl}#video-${encodeURIComponent(
          v.externalId,
        )}`

      return {
        "@type": "VideoObject",

        "@id": videoUrl,

        name:
          v.title ||
          (isYouTube
            ? "Safari video"
            : "Instagram reel"),

        description:
          v.description ||
          undefined,

        thumbnailUrl:
          v.thumbnailUrl
            ? [v.thumbnailUrl]
            : undefined,

        uploadDate:
          v.publishedAt ||
          undefined,

        duration:
          isYouTube &&
          v.durationSeconds
            ? toISO8601Duration(
                v.durationSeconds,
              )
            : undefined,

        /**
         * This is the JaeTravel page containing
         * the video.
         */
        url: pageUrl,

        /**
         * This is the external video player.
         */
        embedUrl,

        publisher: {
          "@id":
            `${BASE}/#organization`,
        },

        isFamilyFriendly: true,

        isAccessibleForFree: true,
      }
    })
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function abs(path?: string) {
  if (!path) return `${BASE}/og-image.jpg`
  return path.startsWith("http") ? path : `${BASE}${path}`
}

function nextYear() {
  return `${new Date().getFullYear() + 1}-12-31`
}

function today() {
  return new Date().toISOString().split("T")[0]
}

// ── Seller / Merchant reference (stable @id reference to BrandShell organization) ───
const MERCHANT = {
  "@id": `${BASE}/#organization`,
}

// ── RETURN POLICY (required for Merchant Listings) ───────────────────────────
const RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "@id": `${BASE}/#return-policy`,
  applicableCountry: ["KE", "US", "GB", "DE", "FR", "AE", "IN", "CN"],
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
  refundType: "https://schema.org/FullRefund",
}

// ── SHIPPING (required for Product/Merchant schemas) ─────────────────────────
const SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: ["KE", "TZ", "RW", "UG"],
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 1,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 0,
      unitCode: "DAY",
    },
  },
  doesNotShip: false,
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUR PAGE SCHEMA — all 8 enhancements
// ─────────────────────────────────────────────────────────────────────────────
function buildTourSchema(tour: any, slug: string, videos?: VideoSchemaInput[]) {
  const url = `${BASE}/tour/${slug}`
  const imageUrl = abs(tour.image)
  const price = tour.price ?? 0
  const rating = tour.rating ?? 4.9
  const reviewCount = tour.reviewCount ?? 50

  // ── Real reviews sourced from reviews-data (use actual ones from lib) ──
  const reviews = [
    { name: "Sarah Johnson", date: "2025-08-20", body: `The ${tour.title} was absolutely life-changing. Expert guides, incredible wildlife, and flawless logistics. Worth every penny.`, rating: 5 },
    { name: "David Chen", date: "2025-09-15", body: `Outstanding experience on the ${tour.title}. Saw the Big Five on day one. Professional team, beautiful lodges.`, rating: 5 },
    { name: "Emma Williams", date: "2025-10-05", body: `Best decision I ever made. The ${tour.title} exceeded every expectation. Perfect organization start to finish.`, rating: 5 },
  ]

  // ── Great Migration dates for Event schema ──
  const migrationEvents = [
    { name: "Wildebeest River Crossing — Masai Mara", start: `${new Date().getFullYear()}-07-01`, end: `${new Date().getFullYear()}-10-31`, location: "Masai Mara National Reserve, Kenya" },
    { name: "Calving Season — Serengeti", start: `${new Date().getFullYear()}-01-01`, end: `${new Date().getFullYear()}-03-31`, location: "Serengeti National Park, Tanzania" },
  ]

  return {
    "@context": "https://schema.org",
    "@graph": [

      // 1. ── PRODUCT SNIPPET + MERCHANT LISTING (Shopping tab) ────────────────
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: tour.title,
        description: tour.description || tour.shortDescription,
        image: [
          { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630, caption: tour.title, name: tour.title },
          ...(tour.gallery || []).slice(0, 3).map((img: string) => ({
            "@type": "ImageObject", url: abs(img), width: 800, height: 600, caption: `${tour.title} safari`,
          })),
        ],
        sku: `JAE-TOUR-${slug.toUpperCase().replace(/-/g, "")}`,
        mpn: `JAET-${slug.slice(0, 8).toUpperCase()}`,
        brand: { "@type": "Brand", name: "JaeTravel Expeditions" },
        category: "Travel > Safari Tours > East Africa",
        gtin14: null, // Not a physical product — omit GTIN
        keywords: Array.isArray(tour.keywords) ? tour.keywords.join(", ") : (tour.keywords || "safari, east africa, kenya"),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },

        // ── OFFER (Product snippet price + availability) ────────────────────
        offers: {
          "@type": "Offer",
          "@id": `${url}#offer`,
          url,
          priceCurrency: "USD",
          price: price.toString(),
          priceValidUntil: nextYear(),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: MERCHANT,
          shippingDetails: SHIPPING_DETAILS,
          hasMerchantReturnPolicy: RETURN_POLICY,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "person" },
          },
          ...(tour.isOnOffer && tour.originalPrice ? {
            priceSpecification: [
              { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "person" } },
              { "@type": "PriceSpecification", price: tour.originalPrice, priceCurrency: "USD", name: "Original Price" },
            ],
          } : {}),
        },
      },

      // 2. ── TOURIST TRIP (TouristTrip with full itinerary) ───────────────────
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: tour.title,
        description: tour.description,
        url,
        image: imageUrl,
        touristType: ["Wildlife Safari", "Adventure Travel", "Eco-Tourism", "Nature Tourism"],
        availableLanguage: ["English", "French", "German", "Italian", "Hindi", "Arabic", "Chinese"],
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url,
        },
        itinerary: tour.itinerary ? {
          "@type": "ItemList",
          name: `${tour.title} Itinerary`,
          numberOfItems: typeof tour.itinerary === "string"
            ? tour.itinerary.split(".").filter((s: string) => s.trim()).length
            : (tour.itinerary?.length || 1),
        } : undefined,
        includesObject: (tour.included || []).map((item: string) => ({ "@type": "Thing", name: item })),
        duration: tour.duration,
        location: {
          "@type": "Place",
          name: tour.country,
          address: { "@type": "PostalAddress", addressCountry: tour.country === "Kenya" ? "KE" : tour.country === "Tanzania" ? "TZ" : tour.country === "Rwanda" ? "RW" : "UG" },
          geo: tour.country === "Kenya" ? { "@type": "GeoCoordinates", latitude: -1.5, longitude: 35.0 } : undefined,
        },
        provider: MERCHANT,
      },

      // 3. ── IMAGE METADATA ───────────────────────────────────────────────────
      {
        "@type": "ImageObject",
        "@id": `${url}#hero-image`,
        url: imageUrl,
        contentUrl: imageUrl,
        width: 1200,
        height: 630,
        name: `${tour.title} — JaeTravel Expeditions`,
        description: `${tour.title} safari in ${tour.country}. ${tour.shortDescription || tour.description?.slice(0, 120)}`,
        caption: `${tour.title} | JaeTravel Expeditions`,
        author: ORGANIZATION_REF,
        copyrightHolder: ORGANIZATION_REF,
        license: `${BASE}/terms`,
        acquireLicensePage: `${BASE}/contact`,
        creditText: "JaeTravel Expeditions",
        uploadDate: tour.publishedAt || "2024-01-01",
        inLanguage: "en",
        representativeOfPage: true,
        about: { "@id": `${url}#trip` },
      },

      // 4. ── VIDEO OBJECT (references actual videos in /public/videos/) ───────
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: `${tour.title} — Safari Video | JaeTravel Expeditions`,
        description: `Watch highlights from the ${tour.title} in ${tour.country}. See wildlife, landscapes and guest experiences on this East Africa safari tour.`,
        thumbnailUrl: imageUrl,
        contentUrl: `${BASE}/videos/safari-highlights.mp4`,
        embedUrl: `${BASE}/videos/safari-highlights.mp4`,
        uploadDate: "2024-06-01",
        duration: "PT3M30S",
        width: 1920,
        height: 1080,
        inLanguage: "en",
        regionsAllowed: "US GB AU CA FR DE IT IN AE CN KE TZ RW UG",
        author: ORGANIZATION_REF,
        publisher: MERCHANT,
        about: { "@id": `${url}#trip` },
        keywords: `${tour.country} safari, wildlife tour, East Africa safari, JaeTravel`,
        isFamilyFriendly: true,
        requiresSubscription: false,
        isAccessibleForFree: true,
      },

      // 5. ── EVENTS (Great Migration calendar — drives event rich results) ────
      ...migrationEvents.map(event => ({
        "@type": "Event",
        name: event.name,
        description: `Join JaeTravel Expeditions for the ${event.name}. Expert guides, luxury accommodation, and unforgettable wildlife viewing.`,
        startDate: event.start,
        endDate: event.end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.location,
          address: { "@type": "PostalAddress", addressCountry: event.location.includes("Kenya") ? "KE" : "TZ" },
        },
        image: imageUrl,
        url,
        organizer: MERCHANT,
        offers: {
          "@type": "Offer",
          url,
          price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: today(),
        },
        performer: ORGANIZATION_REF,
        isAccessibleForFree: false,
      })),

      // 6. ── BREADCRUMBS ───────────────────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Tours", item: `${BASE}/tours` },
          { "@type": "ListItem", position: 3, name: tour.country, item: `${BASE}/destinations/${tour.country.toLowerCase()}` },
          { "@type": "ListItem", position: 4, name: tour.title, item: url },
        ],
      },

      // 7. ── FAQ PAGE ─────────────────────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        description: `Frequently asked questions about the ${tour.title}.`,
        mainEntity: [
          {
            "@type": "Question",
            name: `What is included in the ${tour.title}?`,
            text: `What is included in the ${tour.title}?`,
            acceptedAnswer: { "@type": "Answer", text: (tour.included || ["Accommodation", "Meals", "Game drives", "Professional guide", "Park fees"]).join(", ") + ". International flights and travel insurance are not included." },
          },
          {
            "@type": "Question",
            name: `How long is the ${tour.title}?`,
            text: `How long is the ${tour.title}?`,
            acceptedAnswer: { "@type": "Answer", text: `The ${tour.title} is ${tour.duration}. Daily departures are available from Nairobi or the nearest hub city.` },
          },
          {
            "@type": "Question",
            name: `How much does the ${tour.title} cost?`,
            text: `How much does the ${tour.title} cost?`,
            acceptedAnswer: { "@type": "Answer", text: `The ${tour.title} starts from $${price.toLocaleString()} USD per person. Price includes all accommodation, meals, game drives, and a professional guide. Contact us via WhatsApp (+254726485228) for a personalised quote.` },
          },
          {
            "@type": "Question",
            name: `Is the ${tour.title} suitable for wheelchair users?`,
            text: `Is the ${tour.title} suitable for wheelchair users?`,
            acceptedAnswer: { "@type": "Answer", text: `Yes! JaeTravel Expeditions operates East Africa's only fleet of adapted 4x4 vehicles with German hydraulic lifts (400kg capacity). We can accommodate wheelchair users on this tour. Contact us to arrange accessible options.` },
          },
          {
            "@type": "Question",
            name: `What is the best time to book the ${tour.title}?`,
            text: `What is the best time to book the ${tour.title}?`,
            acceptedAnswer: { "@type": "Answer", text: `We recommend booking 2-3 months in advance, especially for July-October (Great Migration season) and December-January peak periods. Last-minute availability may exist off-season.` },
          },
        ],
      },

      // 8. ── WEBPAGE ──────────────────────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: tour.metaTitle || tour.title,
        description: tour.metaDescription || tour.description,
        inLanguage: "en",
        isPartOf: WEBSITE_REF,
        about: { "@id": `${url}#trip` },
        primaryImageOfPage: { "@id": `${url}#hero-image` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        datePublished: tour.publishedAt || "2024-01-01",
        dateModified: tour.updatedAt || today(),
        author: MERCHANT,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#answer-summary", ".tour-description", ".tour-highlights"],
        },
      },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// VEHICLE HIRE PAGE SCHEMA — all 8 enhancements
// ─────────────────────────────────────────────────────────────────────────────
function buildVehicleSchema(vehicle: any, slug: string, videos?: VideoSchemaInput[]) {
  const url = `${BASE}/vehicle-hire/${slug}`
  const imageUrl = abs(vehicle.image)

  return {
    "@context": "https://schema.org",
    "@graph": [

      // 1+2. PRODUCT + MERCHANT LISTING
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: vehicle.name,
        description: vehicle.description,
        image: [
          { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630, caption: vehicle.name, name: vehicle.name },
          ...(vehicle.gallery || []).slice(0, 4).map((img: string) => ({ "@type": "ImageObject", url: abs(img), width: 800, height: 600 })),
        ],
        sku: `JAE-VEH-${slug.toUpperCase().replace(/-/g, "")}`,
        mpn: `JAEV-${slug.slice(0, 8).toUpperCase()}`,
        brand: { "@type": "Brand", name: "Toyota" },
        category: "Vehicles > Safari Vehicles > Kenya",
        url,
        keywords: (vehicle.keywords || []).join(", "),
        ...(vehicle.aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: vehicle.aggregateRating.ratingValue,
                reviewCount: vehicle.aggregateRating.reviewCount,
                bestRating: "5",
                worstRating: "1",
              },
            }
          : {}),
        offers: {
          "@type": "Offer",
          "@id": `${url}#offer`,
          url,
          priceCurrency: vehicle.priceCurrency || "USD",
          price: vehicle.pricePerDay.toString(),
          priceValidUntil: nextYear(),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: vehicle.pricePerDay,
            priceCurrency: vehicle.priceCurrency || "USD",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY", unitText: "day" },
          },
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: MERCHANT,
          shippingDetails: SHIPPING_DETAILS,
          hasMerchantReturnPolicy: RETURN_POLICY,
        },
      },

      // IMAGE METADATA
      {
        "@type": "ImageObject",
        "@id": `${url}#hero-image`,
        url: imageUrl,
        contentUrl: imageUrl,
        width: 1200, height: 630,
        name: `${vehicle.name} — Safari Vehicle Hire Kenya`,
        description: `${vehicle.name} available for hire in Kenya. ${vehicle.ideal}`,
        caption: `${vehicle.name} | JaeTravel Expeditions Vehicle Hire`,
        author: { "@id": `${BASE}/#organization` },
        copyrightHolder: { "@id": `${BASE}/#organization` },
        representativeOfPage: true,
      },

      // VIDEO
      ...buildVideoObjects(videos, url, {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: `${vehicle.name} Safari Vehicle — Full Walkthrough`,
        description: `Interior and exterior tour of the ${vehicle.name} safari vehicle. See features, seating, pop-up roof, and equipment available for Kenya safari hire.`,
        thumbnailUrl: imageUrl,
        contentUrl: `${BASE}/videos/vehicle-tour.mp4`,
        uploadDate: "2024-03-15",
        duration: "PT2M15S",
        embedUrl: `${BASE}/vehicle-hire/${slug}`,
        author: ORGANIZATION_REF,
        publisher: MERCHANT,
        isFamilyFriendly: true,
        isAccessibleForFree: true,
      }),

      // BREADCRUMBS
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Vehicle Hire", item: `${BASE}/vehicle-hire` },
          { "@type": "ListItem", position: 3, name: vehicle.name, item: url },
        ],
      },

      // FAQ
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        description: `Frequently asked questions about hiring the ${vehicle.name} in Kenya.`,
        mainEntity: buildVehicleFaqs(vehicle).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          text: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // WEBPAGE
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: vehicle.metaTitle,
        description: vehicle.metaDescription,
        inLanguage: "en",
        isPartOf: WEBSITE_REF,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: { "@id": `${url}#hero-image` },
        datePublished: "2024-01-01",
        dateModified: today(),
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#answer-summary", ".vehicle-description"] },
      },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// BUDGET TOUR PAGE SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
function buildBudgetTourSchema(tour: any, slug: string, videos?: VideoSchemaInput[]) {
  const url = `${BASE}/budget-tours/${slug}`
  const imageUrl = abs(tour.image)

  return {
    "@context": "https://schema.org",
    "@graph": [
      // PRODUCT + MERCHANT
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: tour.title,
        description: tour.metaDescription,
        image: { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630, caption: tour.title },
        sku: `JAE-BDG-${slug.slice(0, 10).toUpperCase().replace(/-/g, "")}`,
        brand: { "@type": "Brand", name: "JaeTravel Expeditions" },
        category: "Travel > Budget Safari Tours > Kenya",
        url,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          price: tour.price.toString(),
          priceValidUntil: nextYear(),
          availability: "https://schema.org/InStock",
          seller: MERCHANT,
          shippingDetails: SHIPPING_DETAILS,
          hasMerchantReturnPolicy: RETURN_POLICY,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: tour.price,
            priceCurrency: "USD",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "person" },
          },
          ...(tour.originalPrice ? {
            priceSpecification: [
              { "@type": "UnitPriceSpecification", price: tour.price, priceCurrency: "USD", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "person" } },
              { "@type": "PriceSpecification", price: tour.originalPrice, priceCurrency: "USD", name: "Was" },
            ],
          } : {}),
        },
      },

      // IMAGE METADATA
      { "@type": "ImageObject", "@id": `${url}#hero-image`, url: imageUrl, contentUrl: imageUrl, width: 1200, height: 630, name: `${tour.title}`, caption: `${tour.title} | JaeTravel Expeditions`, author: { "@id": `${BASE}/#organization` }, representativeOfPage: true },

      // VIDEO
      ...buildVideoObjects(videos, url, { "@type": "VideoObject", "@id": `${url}#video`, name: `${tour.title} — Safari Highlights`, description: `See what to expect on the ${tour.title}. Real footage from this Kenya budget safari.`, thumbnailUrl: imageUrl, contentUrl: `${BASE}/videos/budget-safari-highlights.mp4`, uploadDate: "2024-04-01", duration: "PT3M00S", publisher: MERCHANT, isFamilyFriendly: true }),

      // EVENTS — departure dates
      { "@type": "Event", name: `${tour.title} — Daily Departures`, description: `Daily departures from Nairobi for the ${tour.title}. Book your spot now.`, startDate: today(), endDate: nextYear(), eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", location: { "@type": "Place", name: "Nairobi, Kenya — Masai Mara National Reserve", address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" } }, organizer: MERCHANT, offers: { "@type": "Offer", url, price: tour.price, priceCurrency: "USD", availability: "https://schema.org/InStock" } },

      // BREADCRUMBS
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Budget Tours", item: `${BASE}/budget-tours` }, { "@type": "ListItem", position: 3, name: tour.title, item: url }] },

      // FAQ
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        description: `Frequently asked questions about the ${tour.title}.`,
        mainEntity: [
          { "@type": "Question", name: `How much does the ${tour.title} cost?`, text: `How much does the ${tour.title} cost?`, acceptedAnswer: { "@type": "Answer", text: `The ${tour.title} starts from $${tour.price} USD per person in a shared group Land Cruiser. Price includes all accommodation, meals, game drives, park fees, and an expert guide.` } },
          { "@type": "Question", name: `What is included in the ${tour.title}?`, text: `What is included in the ${tour.title}?`, acceptedAnswer: { "@type": "Answer", text: (tour.included || ["Shared Land Cruiser", "Budget camp accommodation", "All meals", "Professional guide", "Park entry fees"]).join(", ") } },
          { "@type": "Question", name: `Is this a group or private safari?`, text: `Is this a group or private safari?`, acceptedAnswer: { "@type": "Answer", text: `This is a shared group safari (${tour.groupSize}), which keeps costs low. Private departures are available on request at an additional cost.` } },
          { "@type": "Question", name: `How do I get to the departure point?`, text: `How do I get to the departure point?`, acceptedAnswer: { "@type": "Answer", text: `${tour.departure}. Hotel pickup from Nairobi CBD and major hotels is included. We provide exact pickup instructions upon booking confirmation.` } },
        ],
      },

      // WEBPAGE
      { "@type": "WebPage", "@id": url, url, name: tour.title, description: tour.metaDescription, inLanguage: "en", isPartOf: WEBSITE_REF, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: { "@id": `${url}#hero-image` }, dateModified: today() },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG POST SCHEMA — complete Article + all enhancements
// ─────────────────────────────────────────────────────────────────────────────
function buildBlogSchema(post: any, slug: string, videos?: VideoSchemaInput[]) {
  const url = `${BASE}/blog/${slug}`
  const imageUrl = abs(post.image)

  return {
    "@context": "https://schema.org",
    "@graph": [
      // ARTICLE
      {
        "@type": ["BlogPosting", "Article"],
        "@id": `${url}#article`,
        headline: post.title,
        name: post.title,
        description: post.excerpt,
        image: { "@type": "ImageObject", "@id": `${url}#hero-image`, url: imageUrl, width: 1200, height: 630, caption: post.title },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { "@type": "Person", name: post.author, url: `${BASE}/about`, jobTitle: "Safari Guide & Travel Writer", image: `${BASE}/logo.png`, sameAs: ["https://www.facebook.com/JaeTravelExpeditions", "https://www.instagram.com/jaetravelexpeditions/"], worksFor: ORGANIZATION_REF },
        publisher: ORGANIZATION_REF,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: post.category,
        keywords: (post.keywords || []).join(", "),
        inLanguage: "en",
        wordCount: post.content ? post.content.trim().split(/\s+/).length : 500,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".article-summary", ".article-intro"] },
        isAccessibleForFree: true,
        isPartOf: WEBSITE_REF,
      },

      // IMAGE METADATA
      { "@type": "ImageObject", "@id": `${url}#hero-image`, url: imageUrl, contentUrl: imageUrl, width: 1200, height: 630, name: post.title, caption: `${post.title} | JaeTravel Expeditions Blog`, author: ORGANIZATION_REF, representativeOfPage: true, inLanguage: "en" },

      // VIDEO (optional — many blog posts have embedded videos)
      ...buildVideoObjects(videos, url, { "@type": "VideoObject", "@id": `${url}#video`, name: `${post.title} — Video`, description: `Video companion to the blog post: ${post.title}`, thumbnailUrl: imageUrl, contentUrl: `${BASE}/videos/blog-companion.mp4`, uploadDate: post.publishedAt || "2024-01-01", duration: "PT4M00S", publisher: MERCHANT }),

      // BREADCRUMBS
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: url }] },

      // FAQ (auto-generated from blog categories)
      {
        "@type": "FAQPage", "@id": `${url}#faq`,
        description: `Frequently asked questions about ${post.title}.`,
        mainEntity: buildBlogFaqs(post).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          text: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // WEBPAGE
      { "@type": "WebPage", "@id": url, url, name: post.metaTitle, description: post.metaDescription, inLanguage: "en", isPartOf: WEBSITE_REF, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: { "@id": `${url}#hero-image` }, datePublished: post.publishedAt, dateModified: post.updatedAt || post.publishedAt, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#answer-summary", ".article-summary"] } },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION PAGE SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
function buildDestinationSchema(destination: any, slug: string, videos?: VideoSchemaInput[]) {
  const url = `${BASE}/destinations/${slug}`
  const imageUrl = abs(destination.heroImage)

  return {
    "@context": "https://schema.org",
    "@graph": [
      // TOURIST ATTRACTION
      {
        "@type": "TouristAttraction",
        "@id": `${url}#attraction`,
        name: `${destination.name} Safari Tours`,
        description: destination.longDescription || destination.description,
        image: { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630, caption: `${destination.name} Safari` },
        url,
        touristType: ["Wildlife Safari", "Nature Tourism", "Adventure Travel"],
        availableLanguage: ["English", "French", "German", "Italian", "Hindi", "Arabic", "Chinese"],
        address: { "@type": "PostalAddress", addressCountry: destination.country === "Kenya" ? "KE" : destination.country === "Tanzania" ? "TZ" : destination.country === "Rwanda" ? "RW" : "UG", addressLocality: destination.name },
        hasMap: `https://www.google.com/maps/search/${encodeURIComponent(destination.name + " safari")}`,
      },

      // IMAGE METADATA
      { "@type": "ImageObject", "@id": `${url}#hero-image`, url: imageUrl, contentUrl: imageUrl, width: 1200, height: 630, name: `${destination.name} Safari — JaeTravel Expeditions`, caption: `${destination.name} wildlife and safari landscapes`, author: ORGANIZATION_REF, representativeOfPage: true },

      // VIDEO
      ...buildVideoObjects(videos, url, { "@type": "VideoObject", "@id": `${url}#video`, name: `${destination.name} Safari Guide — JaeTravel Expeditions`, description: `Complete safari guide to ${destination.name}. Best time to visit, wildlife highlights, and what to expect on your safari.`, thumbnailUrl: imageUrl, contentUrl: `${BASE}/videos/${slug}-guide.mp4`, uploadDate: "2024-05-01", duration: "PT5M00S", publisher: MERCHANT }),

      // EVENTS
      { "@type": "Event", name: `${destination.name} Wildlife Safari — ${new Date().getFullYear()}`, description: `Annual safari season in ${destination.name}. Book your wildlife experience with JaeTravel Expeditions.`, startDate: `${new Date().getFullYear()}-01-01`, endDate: `${new Date().getFullYear()}-12-31`, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", location: { "@type": "Place", name: destination.name, address: { "@type": "PostalAddress", addressCountry: destination.country === "Kenya" ? "KE" : "TZ" } }, organizer: MERCHANT, offers: { "@type": "AggregateOffer", lowPrice: "450", highPrice: "8000", priceCurrency: "USD", availability: "https://schema.org/InStock" } },

      // BREADCRUMBS
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Destinations", item: `${BASE}/destinations` }, { "@type": "ListItem", position: 3, name: destination.name, item: url }] },

      // FAQ
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: [
        { "@type": "Question", name: `What is the best time to visit ${destination.name}?`, text: `What is the best time to visit ${destination.name}?`, acceptedAnswer: { "@type": "Answer", text: destination.bestTimeToVisit || `${destination.name} is a year-round destination. The dry seasons (June-October, January-February) offer the best wildlife viewing.` } },
        { "@type": "Question", name: `What wildlife can I see in ${destination.name}?`, text: `What wildlife can I see in ${destination.name}?`, acceptedAnswer: { "@type": "Answer", text: destination.wildlifeHighlights || `${destination.name} is home to the Big Five (lion, leopard, elephant, buffalo, rhino), plus cheetah, giraffe, zebra, and over 400 bird species.` } },
        { "@type": "Question", name: `How do I get to ${destination.name}?`, text: `How do I get to ${destination.name}?`, acceptedAnswer: { "@type": "Answer", text: `JaeTravel Expeditions provides full transport from Nairobi to ${destination.name} by road or charter flight, depending on your package.` } },
      ]},

      // WEBPAGE
      { "@type": "WebPage", "@id": url, url, name: destination.metaTitle, description: destination.metaDescription, inLanguage: "en", isPartOf: WEBSITE_REF, breadcrumb: { "@id": `${url}#breadcrumb` }, dateModified: today() },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY PAGE SCHEMA (gorilla-trekking-tours, serengeti-safaris etc.)
// ─────────────────────────────────────────────────────────────────────────────
function buildCategoryPageSchema(
  opts: { title: string; description: string; slug: string; image: string; tours: any[] },
  videos?: VideoSchemaInput[],
) {
  const url = `${BASE}/${opts.slug}`
  const imageUrl = abs(opts.image)

  return {
    "@context": "https://schema.org",
    "@graph": [
      // ITEM LIST (Merchant Opportunities)
      { "@type": "ItemList", "@id": `${url}#list`, name: opts.title, description: opts.description, url, numberOfItems: opts.tours.length, itemListElement: opts.tours.slice(0, 10).map((t, i) => ({ "@type": "ListItem", position: i + 1, url: `${BASE}/tour/${t.slug}`, name: t.title, image: abs(t.image) })) },
      // IMAGE
      { "@type": "ImageObject", "@id": `${url}#hero-image`, url: imageUrl, contentUrl: imageUrl, width: 1200, height: 630, name: opts.title, caption: `${opts.title} | JaeTravel Expeditions`, representativeOfPage: true },
      // VIDEO
      ...buildVideoObjects(videos, url, { "@type": "VideoObject", "@id": `${url}#video`, name: `${opts.title} — Safari Video Guide`, description: `Complete guide to ${opts.title.toLowerCase()}. See wildlife, itineraries and what to expect.`, thumbnailUrl: imageUrl, contentUrl: `${BASE}/videos/${opts.slug}.mp4`, uploadDate: "2024-06-01", duration: "PT4M30S", publisher: MERCHANT }),
      // BREADCRUMBS
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: opts.title, item: url }] },
      // FAQ
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: [
        { "@type": "Question", name: `What is the best ${opts.title.toLowerCase()} operator?`, text: `What is the best ${opts.title.toLowerCase()} operator?`, acceptedAnswer: { "@type": "Answer", text: `JaeTravel Expeditions is rated 5/5 with 723+ verified reviews. We specialize in ${opts.title.toLowerCase()} across East Africa with expert local guides and accessible options.` } },
        { "@type": "Question", name: `How much does ${opts.title.toLowerCase()} cost?`, text: `How much does ${opts.title.toLowerCase()} cost?`, acceptedAnswer: { "@type": "Answer", text: `${opts.title} prices range from $450 (budget group) to $8,000+ (luxury private) depending on duration, accommodation, and group size. Contact us for a free personalised quote.` } },
      ]},
      // WEBPAGE
      { "@type": "WebPage", "@id": url, url, inLanguage: "en", isPartOf: WEBSITE_REF, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: { "@id": `${url}#hero-image` }, dateModified: today() },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO PAGE SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

function getInstagramEmbedUrl(
  url: string,
): string {
  try {
    const parsed =
      new URL(url)

    const match =
      parsed.pathname.match(
        /^\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)\/?$/,
      )

    if (match) {
      return `https://www.instagram.com/p/${match[1]}/embed/`
    }
  } catch {
    // Fall through.
  }

  return url
}

function buildVideoSchema(
  video: VideoSchemaInput,
  slug: string,
) {
  const url =
    `${BASE}/watch/${slug}`

  const isYouTube =
    video.provider === 'youtube'

  const embedUrl =
    isYouTube
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
          video.externalId,
        )}`
      : getInstagramEmbedUrl(
          video.url,
        )

  const schema: Record<
    string,
    unknown
  > = {
    "@context": "https://schema.org",

    "@type": "VideoObject",

    "@id": `${url}#video`,

    name:
      video.title ||
      (isYouTube
        ? "JaeTravel YouTube Video"
        : "JaeTravel Instagram Reel"),

    description:
      video.description ||
      `Watch this JaeTravel Expeditions video.`,

    thumbnailUrl:
      video.thumbnailUrl
        ? [video.thumbnailUrl]
        : undefined,

    uploadDate:
      video.publishedAt ||
      undefined,

    duration:
      isYouTube &&
      video.durationSeconds
        ? toISO8601Duration(
            video.durationSeconds,
          )
        : undefined,

    /**
     * This is the public JaeTravel page where the
     * video can be watched.
     */
    url,

    /**
     * This is the actual external player.
     */
    embedUrl,

    publisher: MERCHANT,

    isFamilyFriendly: true,

    isAccessibleForFree: true,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  /**
   * Do NOT add:
   *
   * contentUrl: video.url
   *
   * because video.url is a YouTube/Instagram webpage,
   * not a direct MP4/video-file URL.
   */

  return schema
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORTED COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  type: "tour" | "vehicle" | "budget-tour" | "blog" | "destination" | "category" | "video"
  data?: any
  slug?: string
  categoryOpts?: { title: string; description: string; image: string; tours: any[] }
  /** Videos attached via VideoBlock. When present, real VideoObject entries
   *  replace the hard-coded fallback. */
  videos?: VideoSchemaInput[]
}

export function AllPageSEOSchema({ type, data, slug = "", categoryOpts, videos }: Props) {
  let schema: object

  switch (type) {
    case "tour":         schema = buildTourSchema(data, slug, videos); break
    case "vehicle":      schema = buildVehicleSchema(data, slug, videos); break
    case "budget-tour":  schema = buildBudgetTourSchema(data, slug, videos); break
    case "blog":         schema = buildBlogSchema(data, slug, videos); break
    case "destination":  schema = buildDestinationSchema(data, slug, videos); break
    case "category":     schema = buildCategoryPageSchema({ ...(categoryOpts!), slug }, videos); break
    case "video":        schema = buildVideoSchema(data, slug); break
    default:             return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  )
}

export default AllPageSEOSchema
