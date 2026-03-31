// app/safari/7-days-budget-kenya/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
import SafariContent from './SafariContent';
import BookingWidget from './BookingWidget';
import FAQs from './FAQs';

// ================= METADATA =================
export const metadata: Metadata = {
  title: "7 Days Kenya Budget Safari | Maasai Mara, Amboseli (2026)",
  description:
    "Affordable 7 days Kenya budget safari covering Maasai Mara, Lake Nakuru, Naivasha & Amboseli. Shared safari from $1,355. Book 2026 departures.",
  alternates: {
    canonical: "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
    languages: {
      "en": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
      "es": "https://www.jaetravel.co.ke/es/safari/7-days-budget-kenya",
      "fr": "https://www.jaetravel.co.ke/fr/safari/7-days-budget-kenya",
      "de": "https://www.jaetravel.co.ke/de/safari/7-days-budget-kenya",
       "en-GB": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya"
    }
  },
  openGraph: {
    title: "7 Days Kenya Budget Safari 2026",
    description:
      "Explore Maasai Mara, Amboseli, Nakuru & Naivasha on a 7-day budget safari in Kenya.",
    url: "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
    type: "website",
  },
};

// ================= JSON-LD =================
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [

    // ORGANIZATION
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "Jae Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    },

    // BREADCRUMBS
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaetravel.co.ke"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Kenya Safaris",
          "item": "https://www.jaetravel.co.ke/safari"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "7 Days Kenya Budget Safari",
          "item": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya"
        }
      ]
    },

    // PRODUCT (CRITICAL FOR RANKING + MERCHANT LISTINGS)
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya#product",
      "name": "7 Days Kenya Budget Shared Safari",
      "image": "https://jaetravel.co.ke/7-days-budget-kenya.jpg",
      "description":
        "7-day budget safari in Kenya covering Maasai Mara, Lake Nakuru, Naivasha and Amboseli with game drives, boat rides and guided walks.",
      "brand": {
        "@type": "Brand",
        "name": "Jae Travel Expeditions"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
        "priceCurrency": "USD",
        "price": "1355",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-08-12"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "120"
      }
    },

    // TOUR STRUCTURE (EXTRA RELEVANCE)
    {
      "@type": "TouristTrip",
      "name": "7 Days Kenya Budget Safari",
      "description":
        "Explore Maasai Mara, Lake Nakuru, Naivasha and Amboseli on a 7-day shared safari.",
      "itinerary": [
        { "@type": "TouristDestination", "name": "Maasai Mara National Reserve" },
        { "@type": "TouristDestination", "name": "Lake Nakuru National Park" },
        { "@type": "TouristDestination", "name": "Lake Naivasha" },
        { "@type": "TouristDestination", "name": "Amboseli National Park" }
      ]
    },

    // FAQ (FOR RICH RESULTS)
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a 7 day Kenya safari cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 7 day Kenya budget safari typically starts from $1,355 per person depending on group size and season."
          }
        },
        {
          "@type": "Question",
          "name": "What parks are included in this safari?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This safari includes Maasai Mara, Lake Nakuru, Lake Naivasha and Amboseli National Park."
          }
        },
        {
          "@type": "Question",
          "name": "Is this a private or shared safari?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This is a shared budget safari with other travelers to reduce costs."
          }
        }
      ]
    }

  ]
};

// ================= PAGE =================
export default function SevenDaysBudgetKenyaPage() {
  return (
    <main className="bg-gradient-to-br from-white via-green-50/30 to-orange-50/20">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 to-orange-600 text-white py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">

          <p className="text-green-100 mb-2 text-sm">
            Kenya Budget Safari 2026
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            7 Days Kenya Budget Safari
          </h1>

          <p className="text-green-100 mt-4 text-lg">
            Maasai Mara • Nakuru • Naivasha • Amboseli | From $1,355
          </p>
        </div>
      </div>

      {/* SEO INTRO (CRITICAL ADDITION) */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4">
          Affordable 7 Day Kenya Safari Package
        </h2>

        <p className="text-gray-700 leading-relaxed">
          This 7 days Kenya budget safari is perfect for travelers looking to
          explore Kenya’s top national parks at an affordable price. The tour
          includes Maasai Mara, Lake Nakuru, Lake Naivasha, and Amboseli
          National Park, offering diverse wildlife experiences from the Big
          Five to flamingos and Mount Kilimanjaro views.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <Suspense fallback={<div className="text-center py-20">Loading safari details...</div>}>
        <SafariContent />
      </Suspense>

      {/* FAQ */}
      <Suspense fallback={<div className="text-center py-20">Loading FAQs...</div>}>
        <FAQs />
      </Suspense>

      {/* BOOKING */}
      <Suspense fallback={<div className="text-center py-20">Loading booking widget...</div>}>
        <BookingWidget />
      </Suspense>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Jae Travel Expeditions</h2>

          <p className="text-green-200 max-w-2xl mx-auto">
            Trusted Kenya safari experts offering affordable and unforgettable
            wildlife experiences.
          </p>

          <div className="mt-8 pt-8 border-t border-green-700">
            <p>Email: jaetravelexpeditions@gmail.com</p>
            <p>Website: www.jaetravel.co.ke</p>
          </div>
        </div>
      </footer>

    </main>
  );
}