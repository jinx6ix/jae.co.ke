// app/ar/tours/page.tsx
import { Metadata } from "next";
import ToursPageClient from "./ToursPageClient";
import { tours } from "@/lib/i18n/data/ar/tours-data"; // استخدم بيانات الجولات العربية
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "جولات وباقات سفاري في شرق أفريقيا",
  description:
    "استكشف جولات السفاري الكلاسيكية والمجهزة لذوي الإعاقة في كينيا وتنزانيا ورواندا وأوغندا. من ماساي مارا إلى مغامرات تتبع الغوريلا.",
  keywords: [
    "جولات سفاري كينيا",
    "باقات سفاري تنزانيا",
    "تتبع الغوريلا رواندا",
    "سفاري أوغندا",
    "جولات سفاري ميسرة",
    "جولات شرق أفريقيا",
    "سفاري ماساي مارا",
  ],
  openGraph: {
    title: "جولات وباقات سفاري | رحلات جي تريل",
    description:
      "تجارب سفاري منسقة في جميع أنحاء شرق أفريقيا. خيارات ميسرة لذوي الإعاقة متاحة.",
    images: [
      {
        url: "https://www.jaetravel.co.ke/images/tours-hero.jpg",
        width: 1200,
        height: 630,
        alt: "رحلات جي تريل - جولات سفاري في شرق أفريقيا",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/tour",
    languages: {
      'ar': 'https://www.jaetravel.co.ke/ar/tour',
      'en': 'https://www.jaetravel.co.ke/tours',
      'x-default': 'https://www.jaetravel.co.ke/tour',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// مخطط شامل لصفحة الجولات بالعربية (يدعم نتائج غنية للمنتجات والمراجعات ومسار التنقل والأسئلة الشائعة)
const toursPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/ar/#organization",
      name: "رحلات جي تريل",
      url: "https://www.jaetravel.co.ke/ar",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description: "مشغل السفاري الرائد في شرق أفريقيا والمتخصص في الجولات المناسبة لذوي الإعاقة.",
      inLanguage: "ar",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/tour/#webpage",
      url: "https://www.jaetravel.co.ke/ar/tour",
      name: "جولات وباقات سفاري | رحلات جي تريل",
      description: "اكتشف مجموعتنا من جولات السفاري في كينيا وتنزانيا ورواندا وأوغندا.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.jaetravel.co.ke/images/tours-hero.jpg",
        width: 1200,
        height: 630,
      },
      breadcrumb: { "@id": "https://www.jaetravel.co.ke/ar/tour/#breadcrumb" },
      inLanguage: "ar",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/tour/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.jaetravel.co.ke/ar" },
        { "@type": "ListItem", position: 2, name: "الجولات", item: "https://www.jaetravel.co.ke/ar/tour" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "هل تقدمون جولات سفاري مناسبة للكراسي المتحركة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، نحن متخصصون في رحلات السفاري المتكاملة بالكامل مع مركبات معدلة وإقامة مناسبة لذوي الإعاقة.",
          },
        },
        {
          "@type": "Question",
          name: "ما الذي تشمله باقات السفاري الخاصة بكم؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تشمل معظم الباقات الإقامة والوجبات ورحلات مشاهدة الحيوانات ورسوم المتنزهات ومرشدين محترفين. لا تشمل الرحلات الجوية الدولية.",
          },
        },
        {
          "@type": "Question",
          name: "كم مقدمًا يجب أن أحجز رحلة السفاري؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نوصي بالحجز قبل 6–12 شهرًا للمواسم الذروة (يوليو–أكتوبر وديسمبر–مارس).",
          },
        },
        {
          "@type": "Question",
          name: "هل جولاتكم مناسبة للعائلات أو المسافرين المنفردين؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، نقدم خيارات مناسبة للعائلات والمسافرين المنفردين مع انطلاق مجموعات خاصة أو صغيرة مرنة.",
          },
        },
      ],
      inLanguage: "ar",
    },
    // إدراج كل جولة كمنتج (لتحفيز ظهور المقتطفات الغنية للمنتجات)
    ...tours.map((tour) => ({
      "@type": "Product",
      "@id": `https://www.jaetravel.co.ke/ar/tour/${tour.id}`,
      name: tour.title,
      description: tour.description || `استمتع بأفضل ما في ${tour.country} في هذه الجولة الرائعة.`,
      image: tour.image || "https://www.jaetravel.co.ke/images/default-tour.jpg",
      brand: { "@type": "Brand", name: "رحلات جي تريل" },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: tour.price,
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `https://www.jaetravel.co.ke/ar/tours/${tour.id}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "45",
      },
      inLanguage: "ar",
    })),
  ],
};

export default function ToursPage() {
  return (
    <>
      <JsonLd id="ar-tours-schema" data={toursPageSchema} />
      <ToursPageClient />
    </>
  );
}