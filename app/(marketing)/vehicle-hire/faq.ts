// app/(marketing)/vehicle-hire/faq.ts
// Single source of truth for FAQ data: both the visible list and the
// JSON-LD schema read from this module. No drift possible.

import type { Metadata } from "next"

export interface FAQItem {
  q: string
  a: string
  /** Schema.org Question node fields */
  schema?: {
    /** The question text exactly as it appears on the page */
    name: string
    /** A concise 40-60 word answer for the Answer node */
    acceptedAnswer: {
      "@type": "Answer"
      text: string
      /** When this answer was published/updated */
      dateCreated?: string
      /** Upvote count if available */
      upvoteCount?: number
    }
  }
}

export const vehicleHireFAQs: FAQItem[] = [
  {
    q: "How much does it cost to hire a safari vehicle in Kenya?",
    a: "Safari vehicle hire in Kenya starts from $80/day for a Toyota Hiace Safari Van (7 passengers) up to $180/day for a Range Rover Sport luxury 4x4. Our 4x4 Land Cruisers range from $95–$120/day. All rates include comprehensive insurance and 24/7 roadside assistance. Fuel is not included. A professional driver/guide is available for an additional $50–$80/day.",
    schema: {
      name: "How much does it cost to hire a safari vehicle in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safari vehicle hire in Kenya starts from $80/day for a Toyota Hiace Safari Van (7 passengers) up to $180/day for a Range Rover Sport luxury 4x4. Our 4x4 Land Cruisers range from $95–$120/day. All rates include comprehensive insurance and 24/7 roadside assistance. Fuel is not included. A professional driver/guide is available for an additional $50–$80/day.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  {
    q: "Can I hire a safari vehicle with a driver in Kenya?",
    a: "Yes. All vehicles in our fleet are available with a professional, English-speaking safari driver/guide at an additional $50–$80/day depending on the vehicle. Our drivers are Kenya Professional Safari Guides Association (KPSGA) certified with 5–20 years' experience in wildlife guiding across Kenya, Tanzania, and Uganda.",
    schema: {
      name: "Can I hire a safari vehicle with a driver in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All vehicles in our fleet are available with a professional, English-speaking safari driver/guide at an additional $50–$80/day depending on the vehicle. Our drivers are Kenya Professional Safari Guides Association (KPSGA) certified with 5–20 years' experience in wildlife guiding across Kenya, Tanzania, and Uganda.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  {
    q: "What is the best safari vehicle for the Masai Mara?",
    a: "The Toyota Land Cruiser Prado TX or 78 Series are the top choices for Masai Mara. Both feature pop-up roofs for 360° wildlife viewing, heavy-duty 4x4 systems for black-cotton soil and river crossings, and high ground clearance. For self-drive camping, our 4x4 Rooftop Tent Land Cruiser is ideal.",
    schema: {
      name: "What is the best safari vehicle for the Masai Mara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Toyota Land Cruiser Prado TX or 78 Series are the top choices for Masai Mara. Both feature pop-up roofs for 360° wildlife viewing, heavy-duty 4x4 systems for black-cotton soil and river crossings, and high ground clearance. For self-drive camping, our 4x4 Rooftop Tent Land Cruiser is ideal.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  {
    q: "Is fuel included in the safari vehicle hire price?",
    a: "Fuel is not included in the daily rate — vehicles are supplied with a full tank and must be returned full. Diesel is widely available across Kenya; we provide a refuelling map for remote areas. Our self-drive rooftop tent package includes a 130L long-range tank and spare jerry cans.",
    schema: {
      name: "Is fuel included in the safari vehicle hire price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fuel is not included in the daily rate — vehicles are supplied with a full tank and must be returned full. Diesel is widely available across Kenya; we provide a refuelling map for remote areas. Our self-drive rooftop tent package includes a 130L long-range tank and spare jerry cans.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  {
    q: "Can I take the vehicle across the border to Tanzania or Uganda?",
    a: "Yes. All our vehicles are permitted for cross-border travel throughout East Africa. We handle COMESA insurance extensions, cross-border permits, and customs documentation. An additional cross-border fee applies; contact us for exact pricing for your itinerary.",
    schema: {
      name: "Can I take the vehicle across the border to Tanzania or Uganda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our vehicles are permitted for cross-border travel throughout East Africa. We handle COMESA insurance extensions, cross-border permits, and customs documentation. An additional cross-border fee applies; contact us for exact pricing for your itinerary.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  {
    q: "Do you offer wheelchair-accessible safari vehicles?",
    a: "Yes. Our Wheelchair Accessible Safari Van is certified with a hydraulic folding ramp (500 kg SWL), 4-point wheelchair tie-down system, pop-up roof, and an accessibility-trained driver — ensuring fully inclusive game drives in Masai Mara, Amboseli, and Nairobi National Park.",
    schema: {
      name: "Do you offer wheelchair-accessible safari vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our Wheelchair Accessible Safari Van is certified with a hydraulic folding ramp (500 kg SWL), 4-point wheelchair tie-down system, pop-up roof, and an accessibility-trained driver — ensuring fully inclusive game drives in Masai Mara, Amboseli, and Nairobi National Park.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  // Two extra questions that were ONLY in schema — now also visible
  {
    q: "What documents do I need to hire a safari vehicle in Kenya?",
    a: "For self-drive safari vehicle hire you need: a valid driver's licence (an international driving permit is strongly recommended), your passport, and a credit or debit card for the refundable security deposit. The minimum age for self-drive is 23 years. For cross-border travel we assist with all additional permits. Guided hire (with driver) requires no licence — just your passport and payment.",
    schema: {
      name: "What documents do I need to hire a safari vehicle in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For self-drive safari vehicle hire you need: a valid driver's licence (an international driving permit is strongly recommended), your passport, and a credit or debit card for the refundable security deposit. The minimum age for self-drive is 23 years. For cross-border travel we assist with all additional permits. Guided hire (with driver) requires no licence — just your passport and payment.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
  {
    q: "Are your safari vehicles equipped with pop-up roofs?",
    a: "Yes. All of our 4x4 safari Land Cruisers and safari vans are fitted with full-length pop-up roofs for standing game viewing and wildlife photography. The pop-up roofs provide 360° panoramic views of wildlife — essential for spotting predators in tall grass. Even our Wheelchair Accessible Safari Van has a pop-up roof so that all passengers, regardless of mobility, can enjoy the full game-drive experience.",
    schema: {
      name: "Are your safari vehicles equipped with pop-up roofs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All of our 4x4 safari Land Cruisers and safari vans are fitted with full-length pop-up roofs for standing game viewing and wildlife photography. The pop-up roofs provide 360° panoramic views of wildlife — essential for spotting predators in tall grass. Even our Wheelchair Accessible Safari Van has a pop-up roof so that all passengers, regardless of mobility, can enjoy the full game-drive experience.",
        dateCreated: "2026-01-01",
        upvoteCount: 0,
      },
    },
  },
]

/** Build the FAQPage JSON-LD from the single source. */
export function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    description: "Frequently asked questions about hiring safari vehicles in Kenya with Jae Travel Expeditions.",
    mainEntity: vehicleHireFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: faq.schema?.acceptedAnswer ?? {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }
}

/** Build metadata for the page (title, description, etc). */
export function buildVehicleHireMetadata(): Metadata {
  return {
    title: "Safari Vehicle Hire Kenya | 4x4 Safari Vehicle Rental",
    description:
      "Hire safari vehicles in Kenya from $80 per day. 4x4 Land Cruisers and tour vans for Masai Mara, Amboseli and Tsavo, with driver or self-drive.",
  }
}