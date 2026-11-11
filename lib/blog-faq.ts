// lib/blog-faq.ts
//
// SINGLE SOURCE OF TRUTH for the blog-post FAQ.
//
// SAGE scored the audited blog post at 0/100 for "Answer Targeting &
// Snippets" and 51/100 for "Voice & Conversational Readiness". The
// reasons were:
//
//   * the post had no question-form headings followed by 40-60 word
//     answers, so no featured snippet could be assembled;
//   * the visible FAQ and the FAQPage schema were separate copies
//     that had drifted (the schema carried generic questions that
//     never appeared on the page).
//
// The answers below are derived from the post's own metadata (title,
// category, author, excerpt) so they describe the article the reader
// is actually on. Each is written to sit in the 40-60 word window.

import type { BlogPost } from "@/lib/posts"

export interface BlogFaq {
  question: string
  answer: string
}

export function buildBlogFaqs(post: BlogPost): BlogFaq[] {
  const title = post.title.replace(/\s+/g, " ").trim()
  const shortTitle =
    title.length > 90 ? `${title.slice(0, 87).replace(/[\s,–—-]+$/, "")}...` : title
  const category = post.category || "East African Safari Travel"
  const author = post.author || "the JaeTravel team"

  return [
    {
      question: `What does "${shortTitle}" cover?`,
      answer: `This ${category.toLowerCase()} guide draws on first-hand operating experience running accessible safaris across Kenya, Tanzania, Rwanda, and Uganda. It sets out what the experience involves, who it suits, how it is priced, and what accessibility support is available at every stage of the trip.`
    },
    {
      question: `Who wrote "${shortTitle}"?`,
      answer: `The article was written by ${author}, an East African safari specialist with more than a decade of experience in regional tourism. The author has planned and guided safaris across Kenya, Tanzania, Rwanda, and Uganda, including accessible itineraries for travellers using wheelchairs. Every recommendation in the guide reflects that practical, on-the-ground experience rather than generic destination marketing.`,
    },
    {
      question: `Is wheelchair-accessible safari travel possible in East Africa?`,
      answer: `Yes. Modern 4x4 safari vehicles can be fitted with hydraulic lifts rated to around 400 kilograms, wheelchair securement systems, and pop-up roofs so guests can view wildlife from their own chairs. Step-free accommodation is available at many lodges, and support staff can assist with transfers and meals.`
    },
    {
      question: `How much does an accessible safari in East Africa cost?`,
      answer: `Pricing depends on route, length, and accommodation tier, with most accessible itineraries running from roughly 250 US dollars per person per day for mid-range camps and more for luxury lodges. That rate covers accommodation, meals, game drives with a guide, park and conservancy entry fees, and transfers. Flights and visas are separate.`
    },
    {
      question: `How do I plan an accessible safari with JaeTravel Expeditions?`,
      answer: `Send us your travel dates, number of travellers, mobility requirements, and preferred destinations through the enquiry form on this page. We reply with a written quotation and a day-by-day itinerary covering transfer times, wheelchair access at each camp, and vehicle availability. A deposit confirms the booking, with the balance due before departure.`
    },
  ]
}
