// app/ar/contact/page.tsx
import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "اتصل بنا | خبراء السفاري الميسر في شرق أفريقيا",
  description:
    "اتصل بمشغل السفاري الرائد في شرق أفريقيا والمتخصص في الجولات المناسبة لذوي الإعاقة. احجز سفاري في كينيا وتنزانيا ورواندا وأوغندا عبر واتساب أو البريد الإلكتروني أو الهاتف.",
  keywords: [
    "اتصل بنا جي تريل",
    "سفاري ميسر كينيا",
    "حجز سفاري كرسي متحرك",
    "منظم رحلات سفاري نيروبي",
    "الاتصال لتتبع الغوريلا رواندا",
    "استفسار سفاري تنزانيا",
  ],
  openGraph: {
    title: "اتصل برحلات جي تريل - سفاري ميسر شرق أفريقيا",
    description:
      "هل أنت مستعد لرحلتك الأحلام؟ يرد فريقنا خلال 24 ساعة. متخصصون في الجولات المناسبة لذوي الإعاقة في كينيا وتنزانيا ورواندا وأوغندا.",
    images: [
      {
        url: "https://www.jaetravel.co.ke/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "رحلات جي تريل - اتصل بنا للسفاري الميسر",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/contact",
    languages: {
      'ar': 'https://www.jaetravel.co.ke/ar/contact',
      'en': 'https://www.jaetravel.co.ke/contact',
      'x-default': 'https://www.jaetravel.co.ke/contact',
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

// مخطط JSON-LD للعربية (محسّن لنتائج البحث)
const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/ar/#organization",
      name: "رحلات جي تريل",
      url: "https://www.jaetravel.co.ke/ar",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description:
        "مشغل السفاري الرائد في شرق أفريقيا والمتخصص في الجولات المناسبة لذوي الإعاقة. كينيا، تنزانيا، رواندا، وأوغندا.",
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressLocality: "نيروبي",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "14:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        reviewCount: "723",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "ديفيد تشين" },
          datePublished: "2025-08-20",
          reviewBody:
            "وقت استجابة مذهل من جي تريل! استفسرت عبر واتساب عن رحلة سفاري ميسرة وحصلت على عرض سعر مفصل في غضون ساعة.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "سارة جونسون" },
          datePublished: "2025-07-15",
          reviewBody:
            "دعم ممتاز وإجابات صبورة. ساعدونا في التخطيط لرحلة السفاري الميسرة المثالية.",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/contact/#webpage",
      url: "https://www.jaetravel.co.ke/ar/contact",
      name: "اتصل بنا | رحلات جي تريل",
      description:
        "تواصل معنا لحجز السفاري، أو تأجير المركبات، أو الجولات المخصصة الميسرة. دعم 24/7.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.jaetravel.co.ke/contact-hero.jpg",
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        "@id": "https://www.jaetravel.co.ke/ar/contact/#breadcrumb",
      },
      inLanguage: "ar",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/contact/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://www.jaetravel.co.ke/ar",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "اتصل بنا",
          item: "https://www.jaetravel.co.ke/ar/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": "https://www.jaetravel.co.ke/ar/contact/#contactpage",
      url: "https://www.jaetravel.co.ke/ar/contact",
      name: "اتصل برحلات جي تريل",
      inLanguage: "ar",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "كم سرعة ردكم على الاستفسارات؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نرد على جميع الرسائل خلال 24 ساعة — وغالبًا في غضون دقائق عبر واتساب.",
          },
        },
        {
          "@type": "Question",
          name: "هل تقدمون جولات مناسبة للكراسي المتحركة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم — نحن متخصصون في رحلات السفاري المتكاملة بالكامل مع مركبات مزودة برافعات هيدروليكية ونزل خالية من العوائق.",
          },
        },
        {
          "@type": "Question",
          name: "ما هي ساعات عملكم؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "الاثنين–الجمعة: 8 صباحًا – 6 مساءً (توقيت شرق أفريقيا)، السبت: 9 صباحًا – 2 مساءً (توقيت شرق أفريقيا). دعم طارئ متاح 24/7 عبر واتساب.",
          },
        },
      ],
      inLanguage: "ar",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* البيانات المنظمة - قدِّم من الخادم */}
      <JsonLd data={contactPageSchema} id={"ar-contact-schema"} />

      <ContactPageClient />
    </>
  );
}