// lib/reviews-live.ts
//
// The site's review data as actually published — SafariBookings plus
// Google — merged into ONE list that both the visible slider and the
// JSON-LD schema read.
//
// Why a separate module from lib/reviews.ts
// ──────────────────────────────────────────
// lib/reviews.ts is a pure, static module: it can be imported from a
// client component (components/footer.tsx is "use client" and reads
// SOURCE_RATINGS from it). It must stay importable from the browser,
// so it cannot contain a fetch.
//
// This module is the server-only half. It layers the live Google
// Business Profile on top of the static SafariBookings data and
// exposes the same shapes, so consumers do not care where a review
// came from.
//
// The rating figures also come from here. Google is no longer a
// hardcoded constant: the profile publishes 5.0 across 10 ratings,
// and that number is read live rather than asserted. When no API key
// is configured, the static fallback in lib/reviews.ts is used
// instead, so the site still builds and renders.
//
// Drift guard
// ───────────
// The overall figure is computed from the SAME per-source list that
// the badges render, so the "Overall" number in the slider and the
// AggregateRating in the schema cannot disagree.

import "server-only"
import { getGooglePlace } from "@/lib/google-reviews"
import {
  getAllReviews as getStaticReviews,
  getOverallRating as getStaticOverallRating,
  SAFARI_BOOKINGS_RATING,
  SAFARI_BOOKINGS_REVIEW_COUNT,
  SOURCE_RATINGS as STATIC_SOURCE_RATINGS,
  TRIP_ADVISOR_RATING,
  TRIP_ADVISOR_REVIEW_COUNT,
  type SiteReview,
  type SourceRating,
} from "@/lib/reviews"

export interface LiveReviews {
  /** Every review with published text, newest first. */
  reviews: SiteReview[]
  /** The per-platform badges, with live Google figures when available. */
  sourceRatings: SourceRating[]
  /** The site-wide aggregate, weighted by review count. */
  overall: { rating: number; reviewCount: number }
  /** True when Google review text was actually fetched. */
  hasGoogleReviewText: boolean
  /** True when the Google profile was read successfully at all. */
  hasGoogleProfile: boolean
}

/**
 * The published review data, including live Google reviews when
 * GOOGLE_PLACES_API_KEY is set and the API is reachable.
 */
export async function getLiveReviews(): Promise<LiveReviews> {
  const google = await getGooglePlace()

  if (!google) {
    // No key, no reachable API, or an unusable place id. Fall back to
    // the static figures entirely.
    return {
      reviews: getStaticReviews(),
      sourceRatings: STATIC_SOURCE_RATINGS,
      overall: getStaticOverallRating(),
      hasGoogleReviewText: false,
      hasGoogleProfile: false,
    }
  }

  const sourceRatings: SourceRating[] = STATIC_SOURCE_RATINGS.map((source) =>
    source.source === "google"
      ? {
          ...source,
          rating: google.rating,
          reviewCount: google.userRatingCount,
          // The live profile's own Maps page is a better link than a
          // text search.
          profileUrl: google.mapsUrl,
          hasReviewText: google.reviews.length > 0,
        }
      : source
  )

  const reviews = [...getStaticReviews(), ...google.reviews].sort((a, b) =>
    b.date.localeCompare(a.date)
  )

  let weighted = 0
  let count = 0
  for (const source of sourceRatings) {
    weighted += source.rating * source.reviewCount
    count += source.reviewCount
  }

  return {
    reviews,
    sourceRatings,
    overall: {
      rating: count > 0 ? Number((weighted / count).toFixed(1)) : 0,
      reviewCount: count,
    },
    hasGoogleReviewText: google.reviews.length > 0,
    hasGoogleProfile: true,
  }
}

/**
 * The platform figures, for the footer badges and the per-source
 * schema. Kept as a named export because the footer renders badges
 * from it on every page.
 */
export async function getLiveSourceRatings(): Promise<SourceRating[]> {
  const { sourceRatings } = await getLiveReviews()
  return sourceRatings
}

export {
  SAFARI_BOOKINGS_RATING,
  SAFARI_BOOKINGS_REVIEW_COUNT,
  TRIP_ADVISOR_RATING,
  TRIP_ADVISOR_REVIEW_COUNT,
}
