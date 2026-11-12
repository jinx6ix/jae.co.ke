// lib/reviews-schema.ts
//
// JSON-LD for the site's real reviews.
//
// The Organization node previously carried an `aggregateRating` of 5.0 from
// 723 reviews and three invented review bodies ("David Chen", "Sarah
// Johnson", "Michael Thompson"). Those numbers and quotes did not match any
// published profile — the real figures are 4.9/5 from 7 reviews on
// SafariBookings, 5.0/5 from 4 reviews on TripAdvisor, and 5.0 on Google
// Reviews.
//
// Schema.org requires that a Review's `reviewBody` actually be a review on
// the page, so only reviews with published text (the SafariBookings ones)
// are emitted as `Review` nodes. The other two platforms contribute to the
// site-wide aggregate through their own profile links.
//
// One builder, so the schema and the visible slider cannot drift.

import {
  getAllReviews,
  getOverallRating,
  SOURCE_RATINGS,
} from "@/lib/reviews"

const BASE = "https://www.jaetravel.co.ke"

/**
 * A Review node for the site's own reviews. Emitted on every page that
 * shows the review slider.
 */
export function buildReviewSchema(url: string) {
  const reviews = getAllReviews()
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
export function buildAggregateRatingSchema(url: string) {
  const overall = getOverallRating()
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
export function buildReviewsArraySchema(url: string) {
  return getAllReviews().map((review, index) => ({
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
  }))
}

/** The platform badges, for a `ItemList` of review sources. */
export function buildReviewSourcesSchema(url: string) {
  return {
    "@type": "ItemList",
    "@id": `${url}#review-sources`,
    name: "Where our traveller reviews come from",
    itemListElement: SOURCE_RATINGS.map((source, index) => ({
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
