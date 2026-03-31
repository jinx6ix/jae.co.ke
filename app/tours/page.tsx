// app/tours/page.tsx
import { Metadata } from "next";
import ToursPageClient from "./ToursPageClient";
import { tours } from "@/lib/tours-data";

export const metadata: Metadata = {
  title: "Safari Tours & Packages in East Africa",
  description:
    "Explore wheelchair-accessible and classic safari tours in Kenya, Tanzania, Rwanda & Uganda. From Masai Mara to gorilla trekking adventures.",
  keywords: [
    "safari tours Kenya",
    "Tanzania safari packages",
    "Rwanda gorilla trekking",
    "Uganda safari",
    "accessible safari tours",
    "East Africa tours",
    "Masai Mara safari",
  ],
  openGraph: {
    title: "Safari Tours & Packages | Jae Travel Expeditions",
    description:
      "Curated safari experiences across East Africa. Wheelchair accessible options available.",
    images: [
      {
        url: "https://www.jaetravel.co.ke/images/tours-hero.jpg", // Replace with your actual hero image
        width: 1200,
        height: 630,
        alt: "Jae Travel Expeditions Safari Tours in East Africa",
      },
    ],
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/tours",
  },
};

// Comprehensive Schema for Tours Page (triggers Product snippets, Reviews, Breadcrumbs, FAQ)
const toursPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization (consistent with contact page)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "Jae Travel Expeditions",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description: "East Africa’s leading wheelchair-accessible safari operator.",
    },

    // WebPage
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/tours/#webpage",
      url: "https://www.jaetravel.co.ke/tours",
      name: "Safari Tours & Packages | Jae Travel Expeditions",
      description:
        "Discover our range of safari tours across Kenya, Tanzania, Rwanda and Uganda.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.jaetravel.co.ke/images/tours-hero.jpg",
        width: 1200,
        height: 630,
      },
      breadcrumb: { "@id": "https://www.jaetravel.co.ke/tours/#breadcrumb" },
    },

    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/tours/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", position: 2, name: "Tours", item: "https://www.jaetravel.co.ke/tours" },
      ],
    },

    // FAQPage
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you offer wheelchair-accessible safari tours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we specialize in fully accessible safaris with modified vehicles and accessible accommodations.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in your safari packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most packages include accommodation, meals, game drives, park fees, and professional guides. International flights are not included.",
          },
        },
        {
          "@type": "Question",
          name: "How far in advance should I book a safari?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We recommend booking 6–12 months in advance for peak seasons (July–October and December–March).",
          },
        },
        {
          "@type": "Question",
          name: "Are your tours suitable for families or solo travelers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we offer family-friendly and solo traveler options with flexible private or small-group departures.",
          },
        },
      ],
    },

    // Product / Offer items for each tour (helps trigger Product snippets)
    ...tours.map((tour) => ({
      "@type": "Product",
      "@id": `https://www.jaetravel.co.ke/tours/${tour.id}`,
      name: tour.title,
      description: tour.description || `Experience the best of ${tour.country} on this incredible safari tour.`,
      image: tour.image || "https://www.jaetravel.co.ke/images/default-tour.jpg",
      brand: { "@type": "Brand", name: "Jae Travel Expeditions" },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: tour.price,
        priceValidUntil: "2027-12-31", // Update as needed
        availability: "https://schema.org/InStock",
        url: `https://www.jaetravel.co.ke/tours/${tour.id}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "45", // Adjust per tour or global
      },
    })),
  ],
};

export default function ToursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toursPageSchema) }}
      />
      <ToursPageClient />
    </>
  );
}