// app/gallery/page.tsx
import type { Metadata } from "next"
import GalleryP from "./gallery"

// BULLET-PROOF GALLERY SCHEMA — MAXIMUM VISUAL RICH RESULTS (2025–2026)
const gallerySchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization (trust + stars)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAETravel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 2. WebPage + BreadcrumbList
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/gallery/#webpage",
      "url": "https://www.jaetravel.co.ke/gallery",
      "name": "Safari Photo & Video Gallery | JaeTravel Expeditions",
      "description": "Stunning wildlife photography and videos from Kenya, Tanzania, Rwanda & Uganda safaris."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://www.jaetravel.co.ke/gallery" }
      ]
    },

    // 3. ImageGallery — THIS IS WHAT MAKES YOUR PHOTOS APPEAR IN GOOGLE IMAGE SEARCH!
    {
      "@type": "ImageGallery",
      "@id": "https://www.jaetravel.co.ke/gallery/#imagegallery",
      "name": "JAE Travel Safari Photo & Video Gallery",
      "description": "Professional wildlife photography and safari videos from Masai Mara, Serengeti, gorilla trekking, and accessible East Africa adventures.",
      "url": "https://www.jaetravel.co.ke/gallery",
      "associatedMedia": [
        {
          "@type": "ImageObject",
          "contentUrl": "https://www.jaetravel.co.ke/serengeti-sunset-safari-witness-breathtaking-african-landscape-tanzanias-national-park-experience-awe-inspiring-beauty-382016699.webp",
          "url": "https://www.jaetravel.co.ke/serengeti-sunset-safari-witness-breathtaking-african-landscape-tanzanias-national-park-experience-awe-inspiring-beauty-382016699.webp",
          "name": "Serengeti Sunset Safari Landscape",
          "description": "Golden hour over the endless plains of Serengeti National Park, Tanzania",
          "width": "1200",
          "height": "630",
          "creator": { "@type": "Organization", "name": "JAE Travel Expeditions" }
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://www.jaetravel.co.ke/4-Days-Masai-Mara-Wildebeest-safari.jpg",
          "name": "Great Migration River Crossing - Masai Mara",
          "description": "Thousands of wildebeest crossing the Mara River during the Great Migration"
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://www.jaetravel.co.ke/gorilla-trekking-experience-13.jpg",
          "name": "Mountain Gorilla Family - Volcanoes National Park Rwanda",
          "description": "Silverback with family in the Virunga mountains"
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://www.jaetravel.co.ke/7dd878ab-e7e6-4aa4-bcef-54a611fbdf01.jpg",
          "name": "Wheelchair Accessible Safari - Lion Sighting",
          "description": "Guest in wheelchair enjoying lion viewing from hydraulic-lift safari vehicle"
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://www.jaetravel.co.ke/gorilla-trekking-difficulty.jpg",
          "name": "Gorilla Trekking in Bwindi Impenetrable Forest Uganda",
          "description": "Close encounter with mountain gorillas in Uganda"
        }
        // Add as many as you want — Google loves rich galleries!
      ]
    },

    // 4. FAQPage — boosts engagement
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I use your safari photos for personal projects?",
          "acceptedAnswer": { "@type": "Answer", "text": "Personal non-commercial use is welcome with credit to JAE Travel Expeditions. For commercial use, please contact us." }
        },
        {
          "@type": "Question",
          "name": "Do you offer professional safari photography tours?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! We run dedicated photography safaris with pro guides and optimal vehicle positioning for wildlife photographers." }
        },
        {
          "@type": "Question",
          "name": "Are these photos from real JaeTravel safari guests?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — most images are captured by our guides and guests during actual safaris across Kenya, Tanzania, Rwanda, and Uganda." }
        },
        {
          "@type": "Question",
          "name": "Do you have videos of the Great Migration river crossings?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! Check our YouTube channel and individual tour pages for dramatic river crossing videos." }
        }
      ]
    }
  ]
}

export const metadata: Metadata = {
  title: "Safari Photo & Video Gallery | Wildlife Photography East Africa | JaeTravel",
  description: "Explore stunning safari photos and videos from Masai Mara, Serengeti, gorilla trekking in Rwanda & Uganda. Professional wildlife and accessible safari imagery.",
  keywords: [
    "safari photo gallery",
    "wildlife photography east africa",
    "great migration photos",
    "mountain gorilla images",
    "masai mara wildlife photos",
    "serengeti safari pictures",
    "accessible safari photography",
    "africa wildlife gallery"
  ],
  openGraph: {
    title: "Safari Photo & Video Gallery | JaeTravel Expeditions",
    description: "Stunning wildlife and landscape photography from East Africa safaris",
    images: [
      {
        url: "https://www.jaetravel.co.ke/serengeti-sunset-safari-witness-breathtaking-african-landscape-tanzanias-national-park-experience-awe-inspiring-beauty-382016699.webp",
        width: 1200,
        height: 630,
        alt: "Serengeti Sunset - East Africa Safari Photography"
      }
    ],
    type: "website"
  },
  alternates: { canonical: "https://www.jaetravel.co.ke/gallery" }
}

export default function GalleryPage() {
  return (
    <>
      {/* FULL RICH RESULTS SCHEMA — YOUR PHOTOS WILL RANK IN GOOGLE IMAGES! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />

      <GalleryP />
    </>
  )
}