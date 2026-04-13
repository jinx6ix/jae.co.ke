// app/vehicle-hire/faq-schema.ts
// ─────────────────────────────────────────────────────────────────────────────
// FAQPage structured data — must mirror the visible FAQ section exactly.
// These questions are chosen for high-volume "People Also Ask" SERP placement.
// ─────────────────────────────────────────────────────────────────────────────

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to hire a safari vehicle in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safari vehicle hire in Kenya starts from $80/day for a Toyota Hiace Safari Van (7 passengers) up to $180/day for a Range Rover Sport luxury 4x4. Our 4x4 Land Cruisers range from $95–$120/day. All rates include comprehensive insurance and 24/7 roadside assistance. Fuel is not included. A professional driver/guide is available for an additional $50–$80/day.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire a safari vehicle with a driver in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All vehicles in our fleet are available with a professional, English-speaking safari driver/guide at an additional $50–$80/day depending on the vehicle. Our drivers are Kenya Professional Safari Guides Association (KPSGA) certified with 5–20 years of experience in wildlife guiding across Kenya, Tanzania, and Uganda.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best safari vehicle for the Masai Mara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Toyota Land Cruiser Prado TX or Land Cruiser 78 Series are the best safari vehicles for the Masai Mara. Both feature pop-up roofs for 360° wildlife viewing, heavy-duty 4x4 systems capable of handling black-cotton soil and river crossings, and high ground clearance. For self-drive camping inside the Mara, our 4x4 Rooftop Tent Land Cruiser with a 130L long-range tank is the ideal choice.",
      },
    },
    {
      "@type": "Question",
      name: "Is fuel included in safari vehicle hire prices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fuel is not included in the daily rental rate. Vehicles are supplied with a full tank and must be returned full. Diesel is widely available at petrol stations across Kenya. We provide a detailed refuelling map for remote safari circuits. Our self-drive Rooftop Tent package includes a 130L long-range fuel tank and spare 40L jerry cans for areas beyond station coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I take your safari vehicles across the border to Tanzania or Uganda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All Jae Travel safari vehicles are fully permitted for cross-border travel throughout East Africa including Kenya, Tanzania, Uganda, and Rwanda. We handle all documentation including COMESA insurance extensions, cross-border vehicle permits, and customs paperwork. An additional cross-border permit fee applies; contact us for exact pricing based on your specific itinerary.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer wheelchair-accessible safari vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our Wheelchair Accessible Safari Van is purpose-modified with a certified hydraulic folding ramp (500 kg safe working load), four-point wheelchair tie-down system, a pop-up roof for game viewing from a wheelchair, and an accessibility-trained Level 2 certified driver. It is available for fully inclusive game drives in Masai Mara, Amboseli, and Nairobi National Park from $130/day.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need to hire a safari vehicle in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For self-drive safari vehicle hire you need: a valid driver's licence (an international driving permit is strongly recommended), your passport, and a credit or debit card for the refundable security deposit. The minimum age for self-drive is 23 years. For cross-border travel we assist with all additional permits. Guided hire (with driver) requires no licence — just your passport and payment.",
      },
    },
    {
      "@type": "Question",
      name: "Are your safari vehicles equipped with pop-up roofs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All of our 4x4 safari Land Cruisers and safari vans are fitted with full-length pop-up roofs for standing game viewing and wildlife photography. The pop-up roofs provide 360° panoramic views of wildlife — essential for spotting predators in tall grass. Even our Wheelchair Accessible Safari Van has a pop-up roof so that all passengers, regardless of mobility, can enjoy the full game-drive experience.",
      },
    },
  ],
}