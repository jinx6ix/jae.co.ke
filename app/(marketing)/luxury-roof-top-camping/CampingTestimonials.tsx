// app/(marketing)/luxury-roof-top-camping/CampingTestimonials.tsx
//
// This component previously rendered three invented testimonials —
// "Emma L.", "James & Sarah" and "The Thompson Family" — with warm
// invented sentences and a client-side auto-rotating carousel. None of
// it came from any published review profile.
//
// It is now the site's real, published traveller reviews, rendered
// server-side by the shared ReviewsSlider. The carousel is gone: it was
// a client component whose only content was fabricated, and removing it
// keeps this page fully server-rendered.
//
// A section id is kept so existing anchors to this block still resolve.

import { ReviewsSlider } from "@/components/ReviewsSlider"

export default function CampingTestimonials() {
  return (
    <div id="camping-testimonials">
      <ReviewsSlider
        title="What Travelers Say"
        subtitle="Verified reviews from travellers who booked with Jae Travel."
        limit={6}
      />
    </div>
  )
}
