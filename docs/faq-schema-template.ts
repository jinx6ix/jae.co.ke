// app/tours/page.tsx - FAQ Schema Template
// Use this as a template for adding FAQ schema to other pages

const faqSchemaTemplate = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a safari in Kenya cost in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safari costs in Kenya range from $150-250/day for budget camping to $500-1000+/day for luxury lodges. A 7-day standard safari typically costs $1,500-3,000 per person, while luxury options start from $4,000+. Wheelchair accessible safaris start from $200/day for vehicle hire with driver."
      }
    },
    {
      "@type": "Question",
      name: "What is the best time to go on safari in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best time for wildlife viewing in Kenya is during the dry seasons: January-March for calving and predator action, and July-October for the Great Migration in Masai Mara. However, Kenya offers excellent year-round safari experiences with fewer crowds during green seasons (April-June, November)."
      }
    },
    {
      "@type": "Question",
      name: "Do you offer wheelchair accessible safari vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we operate Kenya's only fleet of custom wheelchair accessible safari vehicles with German hydraulic lifts (400kg capacity), allowing you to stay in your own wheelchair throughout the game drive. All vehicles include medical-grade securement systems and onboard first aid."
      }
    },
    {
      "@type": "Question",
      name: "What destinations can I visit on a Kenya safari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Popular destinations include Masai Mara (Great Migration), Amboseli (Elephants with Kilimanjaro views), Tsavo, Lake Nakuru, Samburu, and the Maasai Mara. Extended tours can include Tanzania's Serengeti, Rwanda for gorilla trekking, and Uganda for chimpanzee encounters."
      }
    },
    {
      "@type": "Question",
      name: "Are your safari packages all-inclusive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most packages include accommodation, meals, park fees, game drives with certified guides, and transportation between destinations. International flights, travel insurance, visa fees, tips, and personal expenses are not included unless specified."
      }
    },
    {
      "@type": "Question",
      name: "How far in advance should I book my safari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For peak season (July-October for Great Migration, December-February), book 6-12 months in advance. Gorilla trekking permits in Rwanda/Uganda require booking 3-6 months ahead. For other destinations, 2-3 months advance booking is recommended."
      }
    },
    {
      "@type": "Question",
      name: "Is Kenya safe for tourists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kenya is generally safe for tourists, especially in established safari areas. Reputable tour operators like JaeTravel provide experienced guides, secure accommodations, and well-maintained vehicles. We recommend following standard travel precautions and travel insurance."
      }
    },
    {
      "@type": "Question",
      name: "What should I pack for a Kenya safari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essential items include neutral-colored clothing (khaki, brown, green), layers for morning game drives, sturdy walking shoes, sun protection (hat, sunscreen, sunglasses), binoculars, camera with extra batteries, and any personal medications. We provide a detailed packing list upon booking."
      }
    },
    {
      "@type": "Question",
      name: "Can I combine a safari with a beach holiday?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Many travelers combine their safari with a beach extension. Popular options include Zanzibar (Tanzania), Diani Beach (Kenya), or Mombasa. We offer safari and beach combination packages with seamless transfers."
      }
    },
    {
      "@type": "Question",
      name: "Do you offer family-friendly safaris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer family safaris designed for children of all ages. We provide child-friendly accommodations, shorter game drives, educational activities, and special pricing for families. Minimum age for game drives is typically 6 years at most lodges."
      }
    }
  ]
}

// ——————————————————————————————————————————————————
// TEMPLATE: Copy this function and modify for each page
// ——————————————————————————————————————————————————

/*
// Example for vehicle-hire/page.tsx

const vehicleHireFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to hire a safari vehicle in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vehicle hire in Kenya ranges from $150-400/day depending on vehicle type. Our Toyota Landcruiser starts from $200/day with driver and fuel. Wheelchair accessible vehicles with hydraulic lift start from $350/day."
      }
    },
    {
      "@type": "Question",
      name: "What is included in the vehicle hire price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All prices include unlimited mileage, comprehensive insurance, driver/guide, all fuel costs, and 24/7 roadside assistance. Airport transfers and accommodation for driver can be arranged separately."
      }
    },
    // Add more questions specific to vehicle hire...
  ]
}
*/

export { faqSchemaTemplate };