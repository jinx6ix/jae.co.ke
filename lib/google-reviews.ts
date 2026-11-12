// lib/google-reviews.ts
//
// Server-only fetcher for the JaeTravel Expeditions Google Business
// Profile, via the Places API (New).
//
// Why this exists
// ───────────────
// The site publishes reviews from three platforms. SafariBookings
// publishes its review text on a public page we can read; TripAdvisor
// blocks all automated access. Google was the third: its aggregate
// rating was hardcoded to "5.0 from 4 reviews" — a number we could
// not verify, because reading it required an API key.
//
// With GOOGLE_PLACES_API_KEY set, we can read the profile for real.
// The live profile says:
//
//   displayName:      Jae Travel Expeditions
//   rating:           5
//   userRatingCount:  10
//   websiteUri:       https://www.jaetravel.co.ke/
//   primaryType:      tour_agency
//
// Note the count is 10, not the 4 that was hardcoded. Two listings
// exist for this business; the one bound to jaetravel.co.ke (the
// listing this module reads) is the correct one — the other is a
// jaetravel.com-only duplicate with a single rating.
//
// Google Places API (New)
// ───────────────────────
//   GET https://places.googleapis.com/v1/places/{PLACE_ID}
//
//   * A field mask is REQUIRED — omitting it is an error.
//   * `rating` and `userRatingCount` need the Place Details
//     Enterprise SKU.
//   * `reviews` (the review TEXT) additionally needs the Place Details
//     Enterprise + Atmosphere SKU. Without it the field is simply
//     absent from the response — no error, no warning. That is why
//     this module treats "no reviews field" as a normal, expected
//     state rather than a failure.
//
// The legacy endpoint (`maps.googleapis.com/maps/api/place/details`)
// is NOT used: it cannot be enabled for new Cloud projects, and the
// CID form (`0x0:0x...`) that the legacy endpoint accepted is
// rejected outright by Places API (New).
//
// Caching
// ───────
// `unstable_cache` with a 1h revalidate, tagged `google-reviews`, so
// a build that renders 1,100+ pages makes ONE upstream call per
// hour rather than one per page. Same pattern as lib/brand-media.ts.
//
// Failure policy
// ──────────────
// Every failure mode degrades to "no Google reviews" instead of
// throwing:
//   * no API key          → skip (local dev, preview builds)
//   * invalid place id    → skip
//   * Atmosphere not on   → aggregate only, no review text
//   * HTTP error / quota  → skip
// A review widget must never take a page down.

import "server-only"
import { unstable_cache } from "next/cache"
import type { SiteReview } from "@/lib/reviews"

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places"

/** Google's documented timeout for Places API calls. */
const REQUEST_TIMEOUT_MS = 10_000

/** The JaTravel Expeditions listing bound to jaetravel.co.ke. */
const DEFAULT_PLACE_ID = "ChIJAfGb6b8_1CIRON3uo0CeGuA"

export interface GooglePlaceData {
  /** Google's place id for this listing. */
  placeId: string
  /** "Jae Travel Expeditions" */
  name: string
  /** Aggregate rating, 1–5. */
  rating: number
  /** Total number of ratings, including ratings with no text. */
  userRatingCount: number
  /** Review text, when the Atmosphere SKU is enabled. Empty otherwise. */
  reviews: SiteReview[]
  /** The listing's own Google Maps page. */
  mapsUrl: string
  /** The business website Google itself lists. */
  websiteUri?: string
}

/** The shape Places API (New) returns for a review. */
interface PlacesReview {
  name?: string
  rating?: number
  relativePublishTimeDescription?: string
  publishTime?: string
  text?: { text?: string; languageCode?: string }
  authorAttribution?: { displayName?: string }
}

interface PlacesPlace {
  id?: string
  displayName?: { text?: string }
  rating?: number
  userRatingCount?: number
  reviews?: PlacesReview[]
  googleMapsUri?: string
  websiteUri?: string
}

/**
 * Google's reviews carry no country and no absolute date on every
 * record, so the display fields are derived conservatively:
 *   * `country`  — not published by Google; left as the source label.
 *   * `date`     — `publishTime` when present, else the current date
 *                  with the relative phrasing kept in the title.
 *   * `verified` — Google does not expose a booking-verification
 *                  flag, so this is never claimed as true.
 *
 * The review body is reproduced VERBATIM, exactly as Google publishes
 * it, for the same reason lib/reviews.ts reproduces SafariBookings
 * text verbatim: editing a reviewer's words would misrepresent them.
 */
function toSiteReview(review: PlacesReview, index: number, placeId: string): SiteReview | null {
  const body = review.text?.text?.trim()
  if (!body) return null

  const rating = typeof review.rating === "number" ? review.rating : 5
  const published = review.publishTime ? new Date(review.publishTime) : null
  const date =
    published && !Number.isNaN(published.getTime())
      ? published.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)

  const author = review.authorAttribution?.displayName?.trim() || "A Google reviewer"

  return {
    id: review.name?.split("/").pop() || `google-${placeId}-${index}`,
    source: "google",
    author,
    country: "Google",
    rating: Math.min(5, Math.max(1, Math.round(rating))),
    date,
    // Google reviews have no headline of their own. Using the
    // relative timestamp Google supplies keeps the card informative
    // without inventing a title the reviewer never wrote.
    title: review.relativePublishTimeDescription?.trim() || "Google review",
    body,
    verified: false,
  }
}

async function fetchGooglePlace(
  placeId: string,
  apiKey: string
): Promise<GooglePlaceData | null> {
  const fields = [
    "id",
    "displayName",
    "rating",
    "userRatingCount",
    "reviews",
    "googleMapsUri",
    "websiteUri",
  ].join(",")

  const url = `${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?fields=${encodeURIComponent(fields)}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fields,
      },
      signal: controller.signal,
      cache: "no-store",
    })

    if (!response.ok) {
      // 400 = bad place id / field mask. 403 = SKU or restriction
      // problem. 429 = quota. None of them should break a page.
      console.warn(
        `[google-reviews] Places API returned ${response.status} for place ${placeId}; skipping Google reviews.`
      )
      return null
    }

    const place = (await response.json()) as PlacesPlace
    const reviews = Array.isArray(place.reviews) ? place.reviews : []

    return {
      placeId: place.id || placeId,
      name: place.displayName?.text?.trim() || "Google",
      rating: typeof place.rating === "number" ? place.rating : 0,
      userRatingCount:
        typeof place.userRatingCount === "number" ? place.userRatingCount : 0,
      reviews: reviews
        .map((review, index) => toSiteReview(review, index, place.id || placeId))
        .filter((review): review is SiteReview => review !== null),
      mapsUrl:
        place.googleMapsUri ||
        `https://www.google.com/maps/search/?api=1&query=place_id:${encodeURIComponent(placeId)}`,
      websiteUri: place.websiteUri,
    }
  } catch (error) {
    // Abort (timeout), DNS, offline — all non-fatal.
    console.warn(
      `[google-reviews] Could not reach the Places API for place ${placeId}:`,
      error instanceof Error ? error.message : error
    )
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Live Google Business Profile data, cached for an hour.
 *
 * Returns `null` when there is no API key, when the place id is
 * missing, or when the API cannot be reached. Callers must treat
 * `null` as "no Google reviews" and carry on with the static data.
 */
export async function getGooglePlace(): Promise<GooglePlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  if (!apiKey) return null

  const placeId = process.env.GOOGLE_PLACE_ID?.trim() || DEFAULT_PLACE_ID
  if (!placeId) return null

  const getCached = unstable_cache(
    () => fetchGooglePlace(placeId, apiKey),
    // Cache key — the place id distinguishes listings; the key itself
    // is deliberately NOT part of the key material, since the cache
    // key is written to disk.
    ["google-place", placeId],
    {
      revalidate: 3600, // 1 hour
      tags: ["google-reviews"],
    }
  )

  return getCached()
}
