import {
  SAFARI_BOOKINGS_RATING,
  SAFARI_BOOKINGS_REVIEW_COUNT,
  TRIP_ADVISOR_RATING,
  TRIP_ADVISOR_REVIEW_COUNT,
} from "@/lib/reviews"

// ─────────────────────────────────────────────────────────────────────────────
// Sitewide verified review totals
//
// These are the live ratings published on the JaeTravel SafariBookings and
// TripAdvisor profiles (linked from the footer). They are kept in one place
// so the footer, the Organization schema and the review components all
// read the same numbers — previously the footer hard-coded "4.9/5 (7
// reviews)" inline while the schema used different values.
//
// The constants now live in lib/reviews.ts, which also carries the
// review bodies taken from SafariBookings. They are re-exported here so
// existing importers keep working, but there is only ONE source of truth.
//
// If a profile rating changes, update lib/reviews.ts only.
// ─────────────────────────────────────────────────────────────────────────────
export {
  SAFARI_BOOKINGS_RATING,
  SAFARI_BOOKINGS_REVIEW_COUNT,
  TRIP_ADVISOR_RATING,
  TRIP_ADVISOR_REVIEW_COUNT,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
} from "@/lib/reviews"

// The old per-tour review array that used to live here was entirely
// invented — six named reviewers ("Sarah Johnson", "Michael Chen",
// "Emma Williams", ...) with fabricated testimonial text and dates.
// None of it came from any published profile.
//
// The site's real reviews now live in lib/reviews.ts (SafariBookings,
// verbatim) and lib/google-reviews.ts (Google, live). They are
// published by components/ReviewsSlider.tsx and the JSON-LD schema,
// which is where a traveller can actually find them.
//
// This module is kept only so the old import path does not break.
export type { SiteReview as Review } from "@/lib/reviews"
