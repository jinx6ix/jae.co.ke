// components/tour-reviews.tsx
//
// Renders the traveller reviews on a tour page.
//
// This used to read a hardcoded array from lib/reviews-data.ts — six
// invented reviews ("Sarah Johnson", "Michael Chen", "Emma Williams",
// "David Martinez", "Lisa Anderson", "James Wilson") with fabricated
// testimonial bodies and dates. None of that came from any published
// profile, and it was rendered to visitors as if it were real.
//
// The component now renders ONLY reviews that the site actually
// publishes: SafariBookings (verbatim, via lib/reviews.ts) and the
// Google Business Profile (live, via lib/google-reviews.ts). Because
// those live in a server-only module, the server page fetches them
// and passes them down as props.
//
// It stays a client component because "Show all reviews" is an
// interaction, but the data is real and server-supplied.

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, CheckCircle } from "lucide-react"
import type { SiteReview } from "@/lib/reviews"

interface TourReviewsProps {
  /** The real published reviews. Supplied by the server page. */
  reviews: SiteReview[]
}

export function TourReviews({ reviews }: TourReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  if (reviews.length === 0) return null

  const displayReviews = reviews
  const visibleReviews = showAll ? displayReviews : displayReviews.slice(0, 3)

  const averageRating =
    displayReviews.reduce((acc, r) => acc + r.rating, 0) / displayReviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => displayReviews.filter((r) => r.rating === rating).length
  )

  return (
    <section className="mb-12">
      <h2 className="mb-6 font-serif text-3xl font-bold">Guest Reviews</h2>

      {/* Rating Summary */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center border-r border-border">
              <div className="mb-2 text-5xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {displayReviews.length} reviews
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <span>{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${(ratingCounts[index] / displayReviews.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="w-8 text-right text-sm text-muted-foreground">
                    {ratingCounts[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold">{review.author}</h3>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        Verified Traveler
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{review.country}</div>
                </div>
                <div className="text-right">
                  <div className="mb-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <h4 className="mb-2 font-semibold">{review.title}</h4>
              <p className="mb-4 text-muted-foreground leading-relaxed">{review.body}</p>

              {/* Source attribution — required when publishing a
                  platform's review content. */}
              <p className="text-xs text-muted-foreground">
                {review.source === "google"
                  ? "Posted on Google"
                  : "Posted on SafariBookings"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayReviews.length > 3 && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? "Show Less Reviews"
              : `Show All ${displayReviews.length} Reviews`}
          </Button>
        </div>
      )}

      {/* Write Review CTA */}
      <Card className="mt-6 bg-primary/5">
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 font-semibold">
            Have you experienced this tour?
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Share your experience to help other travelers make informed decisions.
          </p>
          <Button>Write a Review</Button>
        </CardContent>
      </Card>
    </section>
  )
}
