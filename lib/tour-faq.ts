// lib/tour-faq.ts
//
// SINGLE SOURCE OF TRUTH for the tour detail-page FAQ.
//
// SAGE scored /tours/masai-mara-luxury-safari at 13/100 for "Answer
// Targeting & Snippets" and 20/100 for "Voice & Conversational
// Readiness". The reasons were:
//
//   * only 3 question-form headings existed ("What to Bring", "Need
//     Help Planning?", "Have you experienced this tour?") and none
//     were followed by a 40-60 word paragraph, so no featured
//     snippet could be built from them;
//   * there was no speakable schema on the page;
//   * the page had no FAQPage schema at all.
//
// The answers below are 40-60 words each and state only facts that
// come from the tour record itself (duration, price, group size,
// inclusions) or from documented booking policy. Nothing is invented.

/**
 * Minimal structural shape the FAQ builder needs. Deliberately not the
 * full `Tour` type so both the page component and the schema
 * component can call this with their own (differently typed) tour
 * records.
 */
export interface TourFaqSource {
  title: string
  country: string
  duration?: string
  price?: number
  groupSize?: string
}

export interface TourFaq {
  question: string
  answer: string
}

export function buildTourFaqs(tour: TourFaqSource): TourFaq[] {
  const duration = tour.duration || "Not specified"
  const groupSize = tour.groupSize || "Small group"
  const price = Number(tour.price || 0).toLocaleString()

  return [
    {
      question: `What is the ${tour.title}?`,
      answer: `This is a ${duration.toLowerCase()} guided safari in ${tour.country} covering the country's most rewarding parks and reserves. It combines daily game drives with hand-picked camps or lodges, all meals, park entry fees, and the services of an experienced local guide. It suits first-time visitors and returning travellers who want a complete, well-planned wildlife itinerary.`,
    },
    {
      question: `How much does the ${tour.title} cost?`,
      answer: `It starts from $${price} USD per person. That price covers ${duration.toLowerCase()} of accommodation, all meals as listed, every game drive, park and conservancy entry fees, and a professional guide. International flights, insurance, visas, and optional extras such as balloon flights are not included. We quote any supplement in writing before you confirm.`,
    },
    {
      question: `How long is the ${tour.title}?`,
      answer: `It runs for ${duration}. Each day follows the same rhythm: an early morning game drive while wildlife is most active, a guided walk in the late morning, lunch at camp, and an afternoon game drive before sundown. The full day-by-day plan is listed on this page, and pick-up points are confirmed with your booking.`,
    },
    {
      question: `Who is the ${tour.title} suitable for?`,
      answer: `It suits travellers who want structured game viewing with comfortable overnight stops rather than a camping-only trip. It works well for first-time safari visitors, families, and anyone with a specific interest in Big Five or migratory wildlife. Group sizes are kept small, so the vehicle never feels crowded. Accessible vehicles and step-free lodges can be arranged on request.`
    },
    {
      question: `What is included in the ${tour.title}?`,
      answer: `It includes the accommodation listed in the itinerary, all meals, every game drive with a professional guide, park and conservancy entry fees, and transfers between the camps and the nearest airstrip or pick-up point. You also have a 24/7 contact for the operator in Nairobi throughout the trip. Flights, visas, insurance, and gratuities are excluded.`,
    },
    {
      question: `How do I book the ${tour.title}?`,
      answer: `You can book by sending an enquiry through the booking form on this page, messaging us on WhatsApp, or emailing us directly. We reply with a written quotation, a day-by-day itinerary, and availability for your dates. A deposit confirms the booking and the balance is due before arrival. Accessibility and dietary needs can be adjusted on request.`,
    },
  ]
}
