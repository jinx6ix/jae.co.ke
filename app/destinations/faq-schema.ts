// app/destinations/faq-schema.ts
export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the best destinations in East Africa for safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top safari destinations are Kenya (Masai Mara, Amboseli), Tanzania (Serengeti, Ngorongoro), Rwanda (gorilla trekking), and Uganda (Bwindi, Queen Elizabeth NP)."
        }
      },
      {
        "@type": "Question",
        "name": "When is the best time to visit Masai Mara in Kenya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "July to October for the Great Migration. December to February for calving season and excellent wildlife viewing."
        }
      },
      {
        "@type": "Question",
        "name": "How much does gorilla trekking in Rwanda cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gorilla permits cost $1,500 per person. Full packages including transport and lodging start from $3,200."
        }
      },
      {
        "@type": "Question",
        "name": "Can I combine Kenya and Tanzania in one trip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Popular multi-country itineraries combine Masai Mara with Serengeti, or add Zanzibar for a beach extension."
        }
      },
      {
        "@type": "Question",
        "name": "Are there accessible safari options in East Africa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer wheelchair-accessible vehicles and lodges in Kenya and Tanzania, with trained guides for inclusive travel."
        }
      }
    ]
  }