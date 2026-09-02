// app/faq-schema.ts
export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can wheelchair users go on safari in Kenya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer fully accessible Kenya safaris with wheelchair-adapted 4x4 vehicles, ramps, and accessible lodges in Masai Mara, Amboseli, and beyond."
        }
      },
      {
        "@type": "Question",
        "name": "When is the best time to see the Great Migration in Masai Mara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Great Migration peaks from July to October when millions of wildebeest cross the Mara River. Book early for prime viewing."
        }
      },
      {
        "@type": "Question",
        "name": "How much does gorilla trekking in Rwanda cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gorilla permits cost $1,500 per person. Our packages include permits, transport, guides, and accessible options where possible."
        }
      },
      {
        "@type": "Question",
        "name": "Are your safari vehicles wheelchair accessible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We have modified Land Cruisers with hydraulic lifts, wide doors, and secure wheelchair tie-downs for safe game drives."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer private or group safaris?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both! Private safaris for families or accessible needs, and small-group joining tours for solo travelers."
        }
      }
    ]
  }