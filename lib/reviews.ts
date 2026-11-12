// lib/reviews.ts
//
// ─────────────────────────────────────────────────────────────────────────────
// Sitewide review data, from three real platforms, in one shape.
//
// Why this module exists
// ──────────────────────
// The site used to embed two third-party rating widgets (SafariBookings and
// a Google customer-review badge). Both injected a Google star image as 16
// alt-less `ssl.gstatic.com` <img> elements into every page, plus conflicting
// RDFa rating markup, and both were removed.
//
// What replaces them is this module: the site's own reviews, rendered as a
// server-side slider with accessible markup, no third-party JavaScript, and
// no injected images.
//
// Where the data comes from
// ─────────────────────────
//   * SafariBookings — the public profile page
//     https://www.safaribookings.com/reviews/p6888 lists 7 real reviews with
//     the reviewer's name, country, star rating, visit date and full text.
//     These are reproduced here verbatim with attribution. The profile page
//     shows an aggregate of 4.9/5 across those 7 reviews.
//   * TripAdvisor — the TripAdvisor listing for JaeTravel Expeditions shows
//     5.0/5 across 4 reviews. TripAdvisor blocks automated access to the
//     review bodies (HTTP 403 with a bot wall on every host), so the
//     individual review text is NOT reproduced here — only the verified
//     aggregate rating and a link to the profile. Inventing review text
//     would be worse than omitting it.
//   * Google Reviews — the Google Business Profile for JaeTravel Expeditions
//     publishes 5.0 across 10 ratings. Both the aggregate AND the review
//     text are read live from the Places API (New) via
//     lib/google-reviews.ts, which requires GOOGLE_PLACES_API_KEY.
//     Google review text additionally requires the Place Details
//     Enterprise + Atmosphere SKU; without it the aggregate still loads
//     but no review bodies are published.
//
// The constants below are the FALLBACK, used only when no API key is
// configured. When a key IS configured, lib/reviews-live.ts replaces
// them with the live figures.
//
// The aggregate ratings below are the numbers published by each platform.
// The review bodies come only from SafariBookings, whose review page is
// public and machine-readable. They are reproduced VERBATIM, including
// the original spelling and grammar — editing a reviewer's words would
// misrepresent them.
//
// If a platform's profile changes, update its constants here.
// ─────────────────────────────────────────────────────────────────────────────

export type ReviewSource = "safaribookings" | "tripadvisor" | "google"

export interface SiteReview {
  id: string
  source: ReviewSource
  author: string
  country: string
  /** 1-5 */
  rating: number
  /** ISO date the review was posted. */
  date: string
  /** The reviewer's own headline. */
  title: string
  /** The review body, verbatim. */
  body: string
  /** True when the reviewer confirmed a real booking. */
  verified: boolean
}

export interface SourceRating {
  source: ReviewSource
  /** Display name. */
  label: string
  rating: number
  reviewCount: number
  /** Profile URL, linked from the badge. */
  profileUrl: string
  /** Whether individual review text is published on this platform. */
  hasReviewText: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Aggregate ratings, as published by each platform
// ─────────────────────────────────────────────────────────────────────────────

export const SAFARI_BOOKINGS_RATING = 4.9
export const SAFARI_BOOKINGS_REVIEW_COUNT = 7
export const TRIP_ADVISOR_RATING = 5.0
export const TRIP_ADVISOR_REVIEW_COUNT = 4
// Google Business Profile, read live via the Places API (New) — see
// lib/google-reviews.ts. The profile publishes 5.0 across 10
// ratings. The previous value (4) was an unverified placeholder.
// These constants are the FALLBACK, used only when no API key is
// configured; lib/reviews-live.ts overrides them with live figures.
export const GOOGLE_RATING = 5.0
export const GOOGLE_REVIEW_COUNT = 10

export const SOURCE_RATINGS: SourceRating[] = [
  {
    source: "safaribookings",
    label: "SafariBookings",
    rating: SAFARI_BOOKINGS_RATING,
    reviewCount: SAFARI_BOOKINGS_REVIEW_COUNT,
    profileUrl: "https://www.safaribookings.com/p6888",
    hasReviewText: true,
  },
  {
    source: "tripadvisor",
    label: "TripAdvisor",
    rating: TRIP_ADVISOR_RATING,
    reviewCount: TRIP_ADVISOR_REVIEW_COUNT,
    profileUrl: "https://www.tripadvisor.com/JaeTravelExpeditions",
    hasReviewText: false,
  },
  {
    source: "google",
    label: "Google Reviews",
    rating: GOOGLE_RATING,
    reviewCount: GOOGLE_REVIEW_COUNT,
    profileUrl:
      "https://www.google.com/maps/search/?api=1&query=JaeTravel+Expeditions+Nairobi+Kenya",
    hasReviewText: false,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Review bodies — SafariBookings only
//
// Reproduced from https://www.safaribookings.com/reviews/p6888, which lists
// these 7 reviews with a 4.9/5 aggregate. The text is the reviewer's own.
// ─────────────────────────────────────────────────────────────────────────────

export const SAFARI_BOOKINGS_REVIEWS: SiteReview[] = [
  {
    id: "sb-173236",
    source: "safaribookings",
    author: "Arturs",
    country: "Latvia",
    rating: 5,
    date: "2026-02-23",
    title: "Professional Safari Tours",
    body: "We had 1 day safari. Even tho, that it seems to be quite expensive excursion, this company offered one of the cheapest solution for budget tourists like we were. We did not felt the difference with other groups (from other companies) as all the stops and program is the same - everyone is looking for the same animals, doing stop at the same spots.",
    verified: true,
  },
  {
    id: "sb-173235",
    source: "safaribookings",
    author: "Indeep",
    country: "United Kingdom",
    rating: 5,
    date: "2025-12-16",
    title: "Grateful what a lovely experience with Anthony",
    body: "Grateful what a lovely experience with Anthony nothing was too much trouble.. Very happy. Very friendly service. Anthony was an absolute legend and the accessible safari van was a game changer. Looking forward to next time.",
    verified: true,
  },
  {
    id: "sb-173234",
    source: "safaribookings",
    author: "liu",
    country: "China",
    rating: 5,
    date: "2025-12-09",
    title: "Good 3-Day Safari Experience in Masai Mara",
    body: "We had a very pleasant 3-day safari. Our driver was professional and had \"eagle eyes,\" spotting massive herds of buffalo that looked like a forest from a distance. We managed to see 4 of the \"Big 5,\" and the leopard was the second \"Big 5\" animal we encountered. The driver positioned the car well, so we could get quite close to the wildlife.",
    verified: true,
  },
  {
    id: "sb-173233",
    source: "safaribookings",
    author: "Bacon Family",
    country: "United States",
    rating: 4,
    date: "2025-12-06",
    title: "Accommodating",
    body: "During our stay in Kenya we had a great visit to Crescent Island and Hell’s Gate, booked with Jae Travels. Tour guide Antony was punctual, very knowledgable and accommodating. The boat ride to the Island was a surprising highlight because of the operator who guided us to the island. He really made the 25 min trek enjoyable, relaxing.",
    verified: true,
  },
  {
    id: "sb-173232",
    source: "safaribookings",
    author: "Diogo",
    country: "Portugal",
    rating: 5,
    date: "2025-11-28",
    title: "Totally worth it",
    body: "The tour was great. The day before, we were told everything, including pick up times, and the punctuality was sharp. We embarked on a 4h journey and our guide explained everything and made sure we’d get to see all of the animals. The service was excellent, highly recommend.",
    verified: true,
  },
  {
    id: "sb-173231",
    source: "safaribookings",
    author: "Melanie",
    country: "Guatemala",
    rating: 5,
    date: "2025-11-13",
    title: "Amazing expedition -you won’t miss a thing!",
    body: "Anthony Waititu was the driver who tipo me into an amazing journey. He knows all the good spots to see every single animal. With an adventurous spirit and a natural instinct, he will guide you to be sure you don’t miss a thing. The car was really comfortable and suitable to see from anywhere. Really good experience, recommended.",
    verified: true,
  },
  {
    id: "sb-173230",
    source: "safaribookings",
    author: "Jos",
    country: "United Kingdom",
    rating: 5,
    date: "2025-11-07",
    title: "Great accessible safari experience",
    body: "No problem dealing with wheelchair, accommodation and travel all organised. Knowledgeable guide who clearly cared about the animals and knew them well! Also no problem dealing with vegetarian and vegan diets.",
    verified: true,
  },
]

/** Every review with published text, newest first. */
export function getAllReviews(): SiteReview[] {
  return [...SAFARI_BOOKINGS_REVIEWS].sort((a, b) =>
    b.date.localeCompare(a.date)
  )
}

/** Aggregate across every platform, weighted by review count. */
export function getOverallRating(): { rating: number; reviewCount: number } {
  let weighted = 0
  let count = 0
  for (const source of SOURCE_RATINGS) {
    weighted += source.rating * source.reviewCount
    count += source.reviewCount
  }
  return {
    rating: count > 0 ? Number((weighted / count).toFixed(1)) : 0,
    reviewCount: count,
  }
}
