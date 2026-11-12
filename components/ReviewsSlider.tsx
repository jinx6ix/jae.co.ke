// components/ReviewsSlider.tsx
//
// ─────────────────────────────────────────────────────────────────────────────
// A review slider that replaces the two third-party rating widgets.
//
// Why not the third-party widgets
// ───────────────────────────────
// The SafariBookings widget and the Google customer-review badge both
// injected a Google star image as 16 alt-less `ssl.gstatic.com` <img>
// elements on every page, plus RDFa rating markup that conflicted with
// the site's own JSON-LD. SAGE flagged both ("16 images without
// alt", "conflicting rating data"). This component renders the same
// information server-side with accessible markup and no third-party
// JavaScript.
//
// How it behaves
// ──────────────
// The first slide is visible without JavaScript; the slider controls are
// progressively enhanced by a small inline script that scrolls a
// horizontally scrollable track. The track is a real scroll container
// with `scroll-snap`, so on touch devices it swipes natively and the
// buttons are simply an extra affordance.
//
// No `useSearchParams`, no `useState` in a server component, and no
// `use client` wrapper around the content — so the whole thing is
// server-rendered HTML and does not opt the page into client rendering.
// ─────────────────────────────────────────────────────────────────────────────

import { StarRating } from "@/components/StarRating"
import {
  getAllReviews,
  getOverallRating,
  SOURCE_RATINGS,
  type SiteReview,
} from "@/lib/reviews"

interface ReviewsSliderProps {
  /** Optional heading override. */
  title?: string
  /** Limit how many reviews are shown. */
  limit?: number
  /** Render only these sources' badges. */
  className?: string
}

function ReviewCard({ review }: { review: SiteReview }) {
  const source = SOURCE_RATINGS.find((s) => s.source === review.source)
  return (
    <li className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[calc(33.333%-1rem)]">
      <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <StarRating
            rating={review.rating}
            reviewCount={1}
            source={review.source}
            showCount={false}
            size="sm"
          />
          {source && (
            <a
              href={source.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              {source.label}
            </a>
          )}
        </div>

        <h3 className="mb-2 text-lg font-bold leading-snug">{review.title}</h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {review.body}
        </p>

        <footer className="mt-auto border-t border-border pt-3">
          <p className="text-sm font-semibold">{review.author}</p>
          <p className="text-xs text-muted-foreground">
            {review.country} ·{" "}
            <time dateTime={review.date}>
              {new Date(review.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </footer>
      </article>
    </li>
  )
}

export function ReviewsSlider({
  title = "What our travellers say",
  limit = 9,
  className = "",
}: ReviewsSliderProps) {
  const reviews = getAllReviews().slice(0, limit)
  const overall = getOverallRating()

  if (reviews.length === 0) return null

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className={`border-t border-border bg-muted/20 py-16 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2
              id="reviews-heading"
              className="mb-3 font-serif text-3xl font-bold md:text-4xl"
            >
              {title}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Overall:</span>
                <StarRating
                  rating={overall.rating}
                  reviewCount={overall.reviewCount}
                  source="safaribookings"
                  size="sm"
                />
              </div>
              {SOURCE_RATINGS.map((source) => (
                <div key={source.source} className="flex items-center gap-2">
                  <a
                    href={source.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold underline-offset-2 hover:underline"
                  >
                    {source.label}:
                  </a>
                  <StarRating
                    rating={source.rating}
                    reviewCount={source.reviewCount}
                    source={source.source}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slider track — a native scroll container with scroll-snap, so
              it swipes on touch without any JavaScript. */}
          <ul
            id="reviews-track"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              data-reviews-prev
              aria-label="Show previous reviews"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <p className="text-sm text-muted-foreground">
              Swipe or use the arrows to see all {reviews.length} reviews
            </p>
            <button
              type="button"
              data-reviews-next
              aria-label="Show more reviews"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progressive enhancement: the track already scrolls without JS;
          this only wires the arrow buttons. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  var track = document.getElementById('reviews-track');
  if (!track) return;
  var step = function () {
    var card = track.querySelector('li');
    return card ? card.getBoundingClientRect().width + 16 : 320;
  };
  var prev = document.querySelector('[data-reviews-prev]');
  var next = document.querySelector('[data-reviews-next]');
  if (prev) prev.addEventListener('click', function () {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  if (next) next.addEventListener('click', function () {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });
})();
`.trim(),
        }}
      />
    </section>
  )
}

export default ReviewsSlider
