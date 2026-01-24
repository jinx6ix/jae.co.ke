// app/budget-tours/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import { budgetTours, getTourBySlug } from "@/lib/budget-tours-data";
import { notFound } from "next/navigation";

// Server Components
import TourHero from "./components/TourHero";
import TourOverview from "./components/TourOverview";
import TourDescription from "./components/TourDescription";
import TourHighlights from "./components/TourHighlights";
import TourItinerary from "./components/TourItinerary";
import TourInclusions from "./components/TourInclusions";
import TourFAQs from "./components/TourFAQs";
import TourCTA from "./components/TourCTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params promise before accessing its properties
  const params = await props.params;
  const tour = getTourBySlug(params.slug);
  
  if (!tour) return {};

  const absoluteImageUrl = `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`;

  return {
    title: tour.title,
    description: tour.metaDescription,
    keywords: tour.keywords.join(", "),
    alternates: {
      canonical: `https://www.jaetravel.co.ke${tour.url}`,
      languages: {
        'en': `https://www.jaetravel.co.ke${tour.url}`,           // Main English/global
        'en-US': `https://www.jaetravel.co.ke${tour.url}`,       // US
        'en-GB': `https://www.jaetravel.co.ke${tour.url}`,       // UK (optional)
        'en-AU': `https://www.jaetravel.co.ke${tour.url}`,       // Australia (optional)
        'en-CA': `https://www.jaetravel.co.ke${tour.url}`,       // Canada (optional)
        'x-default': `https://www.jaetravel.co.ke${tour.url}`,   // Fallback
      },
    },
    openGraph: {
      title: tour.title,
      description: tour.metaDescription,
      url: `https://www.jaetravel.co.ke${tour.url}`,
      siteName: "JaeTravel Expeditions",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.metaDescription,
      images: [absoluteImageUrl],
      creator: "@jaetravelke",
    },
    other: {
      "og:price:amount": tour.price.toString(),
      "og:price:currency": "USD",
    },
  };
}

export async function generateStaticParams() {
  return budgetTours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourDetailPage(props: Props) {
  // Await the params promise before accessing its properties
  const params = await props.params;
  const tour = getTourBySlug(params.slug);
  
  if (!tour) notFound();

  const absoluteUrl = `https://www.jaetravel.co.ke${tour.url}`;
  const absoluteImageUrl = `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`;

  // Enhanced Structured Data optimized for:
  // - Product / Tour rich results (Shopping / Product carousel)
  // - FAQ rich snippet
  // - Breadcrumb rich snippet
  // - Review / Rating rich snippet
  // - Image SEO
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Main Tour / Product entity (helps with Shopping/Product rich results)
      {
        "@type": "Product",
        "@id": `${absoluteUrl}#product`,
        name: tour.title,
        image: absoluteImageUrl,
        description: tour.longDescription.substring(0, 500) + "...", // Google likes concise description here
        sku: tour.id,
        brand: {
          "@type": "Brand",
          name: "JaeTravel Expeditions"
        },
        offers: {
          "@type": "Offer",
          url: tour.bookingUrl || absoluteUrl,
          priceCurrency: "USD",
          price: tour.price.toString(),
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "JaeTravel Expeditions",
            url: "https://www.jaetravel.co.ke"
          }
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tour.rating.toString(),
          reviewCount: tour.reviewCount.toString(),
          bestRating: "5",
          worstRating: "1"
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Verified Traveler"
          },
          datePublished: "2025-01-01",
          reviewBody: "Amazing budget safari experience! Saw all the Big Five and more. Highly recommend!"
        }
      },

      // TouristTrip / Tour (additional context)
      {
        "@type": "TouristTrip",
        "@id": `${absoluteUrl}#tour`,
        name: tour.title,
        description: tour.longDescription,
        image: absoluteImageUrl,
        tourBookingPage: tour.bookingUrl || absoluteUrl,
        itinerary: tour.itinerary.map((day) => ({
          "@type": "Trip",
          name: `Day ${day.day}: ${day.title}`,
          description: day.content
        })),
        provider: {
          "@type": "Organization",
          name: "JaeTravel Expeditions",
          url: "https://www.jaetravel.co.ke"
        },
        duration: tour.duration,
        startLocation: {
          "@type": "Place",
          name: "Nairobi, Kenya"
        }
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.jaetravel.co.ke/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Budget Tours",
            item: "https://www.jaetravel.co.ke/budget-tours/"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tour.title,
            item: absoluteUrl
          }
        ]
      },

      // FAQPage
      {
        "@type": "FAQPage",
        mainEntity: tour.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Section with optimized image */}
      <TourHero tour={tour} />

      {/* Rest of the page content */}
      <TourOverview tour={tour} />
      <TourDescription tour={tour} />
      <TourHighlights tour={tour} />
      <TourItinerary tour={tour} />
      <TourInclusions tour={tour} />
      <TourFAQs tour={tour} />
      <TourCTA tour={tour} />
    </div>
  );
}