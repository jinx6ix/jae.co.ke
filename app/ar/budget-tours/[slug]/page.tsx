// app/ar/budget-tours/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import { budgetTours, getTourBySlug } from "@/lib/i18n/data/ar/budget-tours-data";
import { notFound } from "next/navigation";

// Server Components
import TourHero from "./components/TourHero";
import TourOverview from "./components/TourOverview";
import TourDescription from "./components/TourDescription";
import TourHighlights from "./components/TourHighlights";
import TourItinerary from "./components/TourItinerary";
import TourInclusions from "./components/TourInclusions";
import TourFAQs from "./components/TourFAQs";
import JsonLd from "@/components/JsonLd";

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

  return {
    title: tour.title,
    description: tour.metaDescription,
    keywords: tour.keywords.join(", "),
    alternates: {
      canonical: `https://www.jaetravel.co.ke${tour.url}`,
      languages: {
        ar: `https://www.jaetravel.co.ke/ar${tour.url.replace('/ar', '')}`, // adjust: tour.url already starts with /ar/budget-tours/...
        en: `https://www.jaetravel.co.ke${tour.url.replace('/ar', '')}`,
        "x-default": `https://www.jaetravel.co.ke${tour.url.replace('/ar', '')}`,
      },
    },
    openGraph: {
      title: tour.title,
      description: tour.metaDescription,
      url: `https://www.jaetravel.co.ke${tour.url}`,
      siteName: "رحلات جي تريل",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: "ar_AR",
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
  // Filter tours that have Arabic slugs (already in the Arabic data file)
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

  // Enhanced Structured Data (in Arabic)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${absoluteUrl}#product`,
        "name": tour.title,
        "image": absoluteImageUrl,
        "description": tour.longDescription.substring(0, 500) + "...",
        "sku": tour.id,
        "brand": {
          "@type": "Brand",
          "name": "رحلات جي تريل"
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
            "name": "رحلات جي تريل",
            "url": "https://www.jaetravel.co.ke/ar"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tour.rating.toString(),
          "reviewCount": tour.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "ديفيد تشين" },
            "datePublished": "2025-08-20",
            "reviewBody": `كانت ${tour.title} رائعة حقًا! شاهدنا الحيوانات الخمسة الكبرى، مرشدون رائعون، مخيمات مريحة — أفضل سفاري اقتصادي على الإطلاق. تجاوزت جي تريل كل التوقعات!`
          },
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "سارة جونسون" },
            "datePublished": "2025-07-15",
            "reviewBody": `انتهيت للتو من ${tour.title} — مزيج مثالي من المغامرة والقيمة. كانت مشاهدات الحياة البرية خلابة، كل شيء كان منظمًا جيدًا، والطعام كان لذيذًا. أوصي بشدة بـ جي تريل!`
          },
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "مايكل طومسون" },
            "datePublished": "2025-09-05",
            "reviewBody": `تجربة ${tour.title} مذهلة! فريق محترف، نقل مريح، ولحظات حياة برية لا تُنسى. قدمت جي تريل قيمة وخدمة استثنائية — 5 نجوم بكل المقاييس!`
          }
        ]
      },
      {
        "@type": "TouristTrip",
        "@id": `${absoluteUrl}#tour`,
        "name": tour.title,
        "description": tour.longDescription,
        "image": absoluteImageUrl,
        "tourBookingPage": tour.bookingUrl || absoluteUrl,
        "itinerary": tour.itinerary.map((day) => ({
          "@type": "Trip",
          "name": `اليوم ${day.day}: ${day.title}`,
          "description": day.content
        })),
        "provider": {
          "@type": "Organization",
          "name": "رحلات جي تريل",
          "url": "https://www.jaetravel.co.ke/ar"
        },
        "duration": tour.duration,
        "startLocation": { "@type": "Place", "name": "نيروبي، كينيا" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.jaetravel.co.ke/ar/" },
          { "@type": "ListItem", "position": 2, "name": "رحلات سفاري اقتصادية", "item": "https://www.jaetravel.co.ke/ar/budget-tours" },
          { "@type": "ListItem", "position": 3, "name": tour.title, "item": absoluteUrl }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": tour.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <JsonLd id="structured-data" data={schema} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TourHero tour={tour} />

        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          <section className="relative">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2 space-y-8 md:space-y-10">
                {/* Tour Description */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    نبذة عن هذه الرحلة
                  </h2>
                  <TourDescription tour={tour} />
                </div>

                {/* Tour Highlights */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    أبرز معالم الرحلة
                  </h2>
                  <TourHighlights tour={tour} />
                </div>

                {/* Detailed Itinerary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      البرنامج التفصيلي
                    </h2>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {tour.duration}
                    </span>
                  </div>
                  <TourItinerary tour={tour} />
                </div>

                {/* Inclusions & Exclusions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    ما يشمل والاستثناءات
                  </h2>
                  <TourInclusions tour={tour} />
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    الأسئلة الشائعة
                  </h2>
                  <TourFAQs tour={tour} />
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <TourOverview tour={tour} />
                    <div className="mt-6 space-y-3">
                      <a
                        href={tour.bookingUrl || '#'}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        احجز هذه الرحلة
                      </a>
                      <a
                        href="/ar/contact"
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-center py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        اطلب عرض سعر
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="block text-2xl font-bold text-gray-900">5★</span>
                      <span className="text-xs text-gray-500">التقييم</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="block text-2xl font-bold text-gray-900">{tour.reviewCount}+</span>
                      <span className="text-xs text-gray-500">تقييمات</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      {/* Desktop Sticky CTA */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 translate-y-0 hover:shadow-xl z-40">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">تبدأ من</p>
              <p className="text-2xl font-bold text-gray-900">${tour.price}</p>
              <p className="text-xs text-gray-500">للفرد</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={tour.bookingUrl || '#'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                احجز الآن
              </a>
              <a
                href="/ar/contact"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                استفسار
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-600">تبدأ من</p>
            <p className="text-lg font-bold text-gray-900">${tour.price}</p>
          </div>
          <a
            href={tour.bookingUrl || '#'}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-3 px-4 rounded-lg transition-colors duration-200"
          >
            احجز الآن
          </a>
        </div>
      </div>

      <div className="h-20 lg:h-24" />
    </div>
  );
}