import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/tours/page.tsx
import { Metadata } from "next";
import ToursPageClient from "./ToursPageClient";
import { tours } from "@/lib/tours-data";
import JsonLd from "@/components/JsonLd";
import { CmsPage } from "@/app/(marketing)/_components/CmsPage";

export const metadata: Metadata = {
  title: "Safari Tours Kenya & East Africa | JaeTravel Packages",
  description:
    "Book guided safari tours across Kenya, Tanzania, Rwanda and Uganda. Wheelchair-accessible 4x4 vehicles, Masai Mara Great Migration, and gorilla trekking adventures.",
  keywords: [
    "safari tours Kenya",
    "Tanzania safari packages",
    "Rwanda gorilla trekking",
    "Uganda safari",
    "accessible safari tours Kenya",
    "East Africa safari holidays",
    "Masai Mara safari packages",
  ],
  openGraph: {
    title: "Safari Tours Kenya & East Africa | JaeTravel Packages",
    description:
      "Curated safari experiences across Kenya, Tanzania, Rwanda and Uganda. Accessible 4x4 safari vehicles and experienced local guides.",
    url: "https://www.jaetravel.co.ke/tours",
    siteName: "JaeTravel Expeditions",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "https://www.jaetravel.co.ke/images/tours-hero.jpg",
        width: 1200,
        height: 630,
        alt: "JaeTravel Expeditions Safari Tours in East Africa",
      },
    ],
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/tours",
  },
};

// Clean Schema for Tours Page (CollectionPage, ItemList, Breadcrumbs, FAQPage)
const toursPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // WebPage / CollectionPage
    {
      "@type": ["WebPage", "CollectionPage"],
      "@id": "https://www.jaetravel.co.ke/tours/#webpage",
      url: "https://www.jaetravel.co.ke/tours",
      name: "Safari Tours Kenya & East Africa | JaeTravel Packages",
      description:
        "Discover our range of safari tours across Kenya, Tanzania, Rwanda and Uganda.",
      isPartOf: { "@id": "https://www.jaetravel.co.ke/#website" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.jaetravel.co.ke/images/tours-hero.jpg",
        width: 1200,
        height: 630,
      },
      breadcrumb: { "@id": "https://www.jaetravel.co.ke/tours/#breadcrumb" },
      dateModified: "2026-11-10",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "#tours-answer-summary"],
      },
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

    // ItemList for tours collection
    {
      "@type": "ItemList",
      "@id": "https://www.jaetravel.co.ke/tours/#list",
      name: "East Africa Safari Tours",
      description: "Complete list of safari tours and packages by JaeTravel Expeditions",
      numberOfItems: tours.length,
      itemListElement: tours.slice(0, 15).map((tour, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.jaetravel.co.ke/tours/${tour.slug || tour.id}`,
        name: tour.title,
      })),
    },

    // FAQPage
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/tours/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What safari tours does JaeTravel offer in East Africa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JaeTravel Expeditions offers classic wildlife safaris in the Masai Mara and Serengeti, gorilla trekking in Rwanda and Uganda, and specialized wheelchair-accessible safari tours with hydraulic lift vehicles.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in JaeTravel safari packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Packages include 4x4 safari transport with professional driver-guide, full-board accommodation, national park entry fees, bottled water on game drives, and airport transfers. International flights are excluded.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer wheelchair-accessible safari tours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we operate custom-adapted 4x4 Land Cruisers with German hydraulic wheelchair lifts (400kg capacity) and partner with audited accessible lodges across Kenya and Tanzania.",
          },
        },
        {
          "@type": "Question",
          name: "How far in advance should I book a safari?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We recommend booking 3 to 6 months in advance for standard dates, and 6 to 12 months ahead for Great Migration peak season (July to October) and gorilla trekking permits.",
          },
        },
      ],
    },
  ],
};

export default function ToursPage() {
  return (
    <>
      <JsonLd id="tours-schema" data={toursPageSchema} />
      <CmsPage slug="tours" fallback={<ToursPageClient />} />
    </>
  );
}