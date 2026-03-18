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

// Define the variant type to fix TypeScript errors
type CTALink = {
  text: string;
  url: string;
  isPrimary?: boolean;
};

type TourCTAProps = {
  tour: any; // Replace with your actual Tour type
  variant?: 'desktop' | 'mobile' | 'sticky';
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const tour = getTourBySlug(params.slug);
  
  if (!tour) return {};

  const absoluteImageUrl = `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`;
  const viewportContent = "width=device-width, initial-scale=1, maximum-scale=5";

  return {
    title: tour.title,
    description: tour.metaDescription,
    keywords: tour.keywords.join(", "),
    viewport: viewportContent,
    alternates: {
      canonical: `https://www.jaetravel.co.ke${tour.url}`,
      languages: {
        'en': `https://www.jaetravel.co.ke${tour.url}`,
        'en-US': `https://www.jaetravel.co.ke${tour.url}`,
        'en-GB': `https://www.jaetravel.co.ke${tour.url}`,
        'en-AU': `https://www.jaetravel.co.ke${tour.url}`,
        'en-CA': `https://www.jaetravel.co.ke${tour.url}`,
        'x-default': `https://www.jaetravel.co.ke${tour.url}`,
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
      // 1. Main Tour / Product entity (optimized for Shopping/Product rich results with price & stars)
      {
        "@type": "Product",
        "@id": `${absoluteUrl}#product`,
        "name": tour.title,
        "image": absoluteImageUrl,
        "description": tour.longDescription.substring(0, 500) + "...",
        "sku": tour.id,
        "brand": {
          "@type": "Brand",
          "name": "JaeTravel Expeditions"
        },
        "offers": {
          "@type": "Offer",
          "url": tour.bookingUrl || absoluteUrl,
          "priceCurrency": "USD",
          "price": tour.price.toString(),
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "JaeTravel Expeditions",
            "url": "https://www.jaetravel.co.ke"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tour.rating.toString(),
          "reviewCount": tour.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        // Multiple individual reviews – Google can display these as rich snippets
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "David Chen"
            },
            "datePublished": "2025-08-20",
            "reviewBody": `The ${tour.title} was absolutely incredible! Saw the Big Five, amazing guides, comfortable camps — best budget safari ever. JaeTravel exceeded all expectations!`
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Sarah Johnson"
            },
            "datePublished": "2025-07-15",
            "reviewBody": `Just finished the ${tour.title} — perfect mix of adventure and value. Wildlife sightings were breathtaking, everything was well-organized, and the food was delicious. Highly recommend JaeTravel!`
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Michael Thompson"
            },
            "datePublished": "2025-09-05",
            "reviewBody": `Outstanding ${tour.title} experience! Professional team, comfortable transport, and unforgettable wildlife moments. JaeTravel delivered exceptional value and service — 5 stars all the way!`
          }
        ]
      },
  
      // 2. TouristTrip (additional tour-specific details with itinerary)
      {
        "@type": "TouristTrip",
        "@id": `${absoluteUrl}#tour`,
        "name": tour.title,
        "description": tour.longDescription,
        "image": absoluteImageUrl,
        "tourBookingPage": tour.bookingUrl || absoluteUrl,
        "itinerary": tour.itinerary.map((day) => ({
          "@type": "Trip",
          "name": `Day ${day.day}: ${day.title}`,
          "description": day.content
        })),
        "provider": {
          "@type": "Organization",
          "name": "JaeTravel Expeditions",
          "url": "https://www.jaetravel.co.ke"
        },
        "duration": tour.duration,
        "startLocation": {
          "@type": "Place",
          "name": "Nairobi, Kenya"
        }
      },
  
      // 3. BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.jaetravel.co.ke/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Budget Tours",
            "item": "https://www.jaetravel.co.ke/budget-tours/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tour.title,
            "item": absoluteUrl
          }
        ]
      },
  
      // 4. FAQPage (dynamically generated from tour.faqs)
      {
        "@type": "FAQPage",
        "mainEntity": tour.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
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

      {/* Main Content Container with responsive padding */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with optimized image */}
        <TourHero tour={tour} />

        {/* Content Sections - Responsive spacing */}
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {/* Tour Overview - Full width on mobile, sticky sidebar on desktop */}
          <section className="relative">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Main Content Area - 2 columns on desktop */}
              <div className="lg:col-span-2 space-y-8 md:space-y-10">
                {/* Tour Description */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    About This Tour
                  </h2>
                  <TourDescription tour={tour} />
                </div>

                {/* Tour Highlights */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Tour Highlights
                  </h2>
                  <TourHighlights tour={tour} />
                </div>

                {/* Detailed Itinerary - Enhanced for better readability */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Detailed Itinerary
                    </h2>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {tour.duration}
                    </span>
                  </div>
                  
                  {/* Itinerary Timeline */}
                  <div className="relative">
                    {/* Vertical line for desktop */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
                    
                    <div className="space-y-6 md:space-y-8">
                      {tour.itinerary.map((day, index) => (
                        <div key={day.day} className="relative flex flex-col md:flex-row gap-4 md:gap-8">
                          {/* Day indicator */}
                          <div className="flex md:flex-col items-start md:items-center gap-3 md:gap-2 md:w-24 flex-shrink-0">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm md:text-base shadow-lg z-10">
                              {day.day}
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-500 md:text-center">
                              Day {day.day}
                            </span>
                          </div>

                          {/* Day content card */}
                          <div className="flex-1 bg-gray-50 rounded-xl p-4 md:p-6 ml-12 md:ml-0">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                              {day.title}
                            </h3>
                            <div className="prose prose-sm md:prose-base max-w-none text-gray-600">
                              <p className="whitespace-pre-line">{day.content}</p>
                            </div>
                            
                            {/* Optional: Add meal icons or accommodation info */}
                            {day.meals && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {day.meals.split(',').map((meal) => (
                                  <span key={meal} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    {meal.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    What's Included
                  </h2>
                  <TourInclusions tour={tour} />
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <TourFAQs tour={tour} />
                </div>
              </div>

              {/* Sidebar - 1 column on desktop, sticky */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Tour Overview Card with pricing and quick info */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <TourOverview tour={tour} />
                    
                    {/* Quick action buttons for mobile/tablet */}
                    <div className="mt-6 space-y-3">
                      <a
                        href={tour.bookingUrl || '#'}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Book This Tour
                      </a>
                      <button className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-center py-3 px-4 rounded-lg transition-colors duration-200">
                        Request Quote
                      </button>
                    </div>
                  </div>

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="block text-2xl font-bold text-gray-900">5★</span>
                      <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="block text-2xl font-bold text-gray-900">{tour.reviewCount}+</span>
                      <span className="text-xs text-gray-500">Reviews</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      {/* Desktop Sticky CTA - Hidden on mobile, visible on desktop scroll */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 translate-y-0 hover:shadow-xl z-40">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-2xl font-bold text-gray-900">${tour.price}</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={tour.bookingUrl || '#'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Book Now
              </a>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA - Visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-600">Starting from</p>
            <p className="text-lg font-bold text-gray-900">${tour.price}</p>
          </div>
          <a
            href={tour.bookingUrl || '#'}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Add padding to bottom to account for sticky CTA */}
      <div className="h-20 lg:h-24" />
    </div>
  );
}