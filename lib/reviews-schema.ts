// lib/reviews-schema.ts
//
// JSON-LD for the site's real reviews.
//
// The Organization node previously carried an `aggregateRating` of 5.0 from
// 723 reviews and three invented review bodies ("David Chen", "Sarah
// Johnson", "Michael Thompson"). Those numbers and quotes did not match any
// published profile.
//
// The real, published figures are:
//   SafariBookings  4.9/5 from  7 reviews  (review text published)
//   TripAdvisor     5.0/5 from  4 reviews  (text blocked by a bot wall)
//   Google          5.0/5 from 10 ratings  (read live via Places API)
//                             ------------
//                             21 reviews, weighted 4.97
//
// Schema.org requires that a Review's `reviewBody` actually be a review on
// the page, so only reviews with published text (SafariBookings, plus
// Google once the Atmosphere SKU is enabled) are emitted as `Review` nodes.
// TripAdvisor contributes to the site-wide aggregate through its profile
// link.
//
// One builder — lib/reviews-live.ts — so the schema and the visible slider
// read the same live data and cannot drift.

import { getLiveReviews } from "@/lib/reviews-live"

const BASE = "https://www.jaetravel.co.ke"

/**
 * A Review node for the site's own reviews. Emitted on every page that
 * shows the review slider.
 */
export async function buildReviewSchema(url: string) {
  const { reviews } = await getLiveReviews()
  if (reviews.length === 0) return null

  return {
    "@type": "Review",
    "@id": `${url}#review-${reviews[0].id}`,
    itemReviewed: {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "JaeTravel Expeditions",
      url: BASE,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviews[0].rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: reviews[0].author,
    },
    datePublished: reviews[0].date,
    reviewBody: reviews[0].body,
    url: `${url}#reviews`,
  }
}

/**
 * The site-wide aggregate rating across all three platforms, as an
 * `AggregateRating` node referencing the canonical Organization.
 */
export async function buildAggregateRatingSchema(url: string) {
  const { overall } = await getLiveReviews()
  if (!overall.reviewCount) return null

  return {
    "@type": "AggregateRating",
    "@id": `${url}#aggregate-rating`,
    itemReviewed: {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "JaeTravel Expeditions",
      url: BASE,
    },
    ratingValue: overall.rating,
    reviewCount: overall.reviewCount,
    bestRating: 5,
    worstRating: 1,
  }
}

/**
 * Every review with published text, as `Review` nodes. Use this on pages
 * that show the full slider.
 */
export async function buildReviewsArraySchema(url: string) {
  const { reviews } = await getLiveReviews()
  return reviews.map((review, index) => ({
    "@type": "Review",
    "@id": `${url}#review-${review.id}`,
    itemReviewed: {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "JaeTravel Expeditions",
      url: BASE,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Person", name: review.author },
    datePublished: review.date,
    reviewBody: review.body,
    name: review.title,
    url: `${url}#reviews`,
    position: index + 1,
    // Attribution to the platform the review was published on.
    ...(review.source === "google"
      ? { publisher: { "@type": "Organization", name: "Google Reviews" } }
      : { publisher: { "@type": "Organization", name: "SafariBookings" } }),
  }))
}

/** The platform badges, for a `ItemList` of review sources. */
export async function buildReviewSourcesSchema(url: string) {
  const { sourceRatings } = await getLiveReviews()
  return {
    "@type": "ItemList",
    "@id": `${url}#review-sources`,
    name: "Where our traveller reviews come from",
    itemListElement: sourceRatings.map((source, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: source.label,
        url: source.profileUrl,
        ...(source.reviewCount
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: source.rating,
                reviewCount: source.reviewCount,
                bestRating: 5,
              },
            }
          : {}),
      },
    })),
  }
}
