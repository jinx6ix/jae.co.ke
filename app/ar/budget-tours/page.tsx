// app/ar/budget-tours/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check, DollarSign, Users, Shield, Phone, MapPin, Calendar, Camera,
  Star, Award, Clock, CreditCard, Headphones, Gift, Tag, Percent,
  Truck, Waves, Mountain, TreePine, Sun, ChevronRight, Heart, Mail
} from "lucide-react";
import BudgetToursClient from "./BudgetToursClient";

// استيراد بيانات الجولات الاقتصادية بالعربية
import { budgetTours } from "@/lib/i18n/data/ar/budget-tours-data";

// حساب الإحصائيات
const totalTours = budgetTours.length;
const avgRating = totalTours > 0
  ? (budgetTours.reduce((sum, t) => sum + (t.rating || 4.5), 0) / totalTours).toFixed(1)
  : "4.8";
const minPrice = totalTours > 0
  ? Math.min(...budgetTours.map(t => t.price))
  : 450;
const maxPrice = totalTours > 0
  ? Math.max(...budgetTours.map(t => t.price))
  : 1200;

// ============================================
// البيانات الوصفية (SEO) – ترجمة كاملة للعربية
// ============================================
export const metadata: Metadata = {
  title: "رحلات سفاري اقتصادية في كينيا 2026 | جولات رخيصة تبدأ من 450 دولارًا",
  description: "اكتشف أفضل رحلات السفاري الاقتصادية في كينيا 2026. ماساي مارا وناقورو ونيفاشا وأمبوسيلي. جولات جماعية وخاصة بأسعار مخفضة تبدأ من 450 دولارًا. احجز الآن!",
  keywords: [
    "رحلات سفاري اقتصادية كينيا 2026", "جولات سفاري خاصة كينيا", "مخيمات خيام ماساي مارا",
    "سفاري هجرة الحمير الوحشية", "سفاري اقتصادي ماساي مارا", "جولات محمية ماساي مارا الوطنية",
    "مشاهدة الحيوانات في كينيا", "تجارب سفاري لا تُنسى", "جولات سفاري جماعية كينيا",
    "باقات سفاري مارا", "منظمي رحلات كينيا", "سفاري في كينيا 2026",
    "مشاهدة الأسود والفهد", "سفاري كينيا بأسعار مخفضة", "جولات ماساي مارا الرخيصة",
    "جولات اقتصادية في كينيا", "سفاري رخيص", "سفاري اقتصادي في كينيا",
    "جولات رخيصة في كينيا", "سفاري بأسعار مخفضة كينيا", "سفاري كينيا بأسعار معقولة",
    "جولات سفاري جماعية في كينيا", "سفاري تخييم كينيا", "جولات كينيا منخفضة التكلفة",
    "سفاري اقتصادي شرق أفريقيا", "باقات ماساي مارا الاقتصادية", "جولات أمبوسيلي الرخيصة",
    "سفاري بحيرة ناكورو بأسعار معقولة", "جولات تسافو الاقتصادية", "مشاهدة الحيوانات الخمسة الكبرى بأسعار مخفضة",
    "سفاري بري كينيا", "جولات سفاري مشتركة"
  ].join(", "),
  authors: [{ name: "رحلات جي تريل", url: "https://www.jaetravel.co.ke/ar" }],
  creator: "رحلات جي تريل",
  publisher: "رحلات جي تريل",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/budget-tours",
    languages: {
      'ar': 'https://www.jaetravel.co.ke/ar/budget-tours',
      'en': 'https://www.jaetravel.co.ke/budget-tours',
      'x-default': 'https://www.jaetravel.co.ke/budget-tours',
    },
  },
  openGraph: {
    title: "رحلات سفاري اقتصادية في كينيا 2026 | جولات ماساي مارا الرخيصة من 450 دولارًا",
    description: "شاهد هجرة الحمير الوحشية الكبرى في رحلات سفاري اقتصادية. جولات جماعية وخاصة في ماساي مارا وناقورو ونيفاشا وأمبوسيلي. احجز الآن!",
    url: "https://www.jaetravel.co.ke/ar/budget-tours",
    siteName: "رحلات جي تريل",
    images: [
      {
        url: "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg",
        width: 1200,
        height: 630,
        alt: "هجرة الحمير الوحشية في محمية ماساي مارا الوطنية - رحلات سفاري اقتصادية كينيا، جولات رخيصة في كينيا",
        type: "image/jpeg",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "رحلات سفاري اقتصادية كينيا 2026 | جولات ماساي مارا الرخيصة من 450 دولارًا",
    description: "انضم إلى جولاتنا الجماعية أو الخاصة لمشاهدة الهجرة الكبرى. إقامة مريحة في مخيمات خيام مع تجارب لا تُنسى.",
    images: ["https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg"],
    site: "@jaetravel",
    creator: "@jaetravel",
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
  other: {
    "og:price:amount": "450",
    "og:price:currency": "USD",
  },
};

const absoluteUrl = "https://www.jaetravel.co.ke/ar/budget-tours";
const heroImage = "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg";

// أول 6 جولات للـ schema (لتجنب JSON كبير جدًا)
const featuredTours = budgetTours.slice(0, 6);

// ============================================
// مخطط البيانات المنظمة (Schema.org) – بالعربية
// ============================================
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. منطقة جذب سياحي (ماساي مارا)
    {
      "@type": "TouristAttraction",
      "@id": "https://www.jaetravel.co.ke/ar/#attraction",
      "name": "محمية ماساي مارا الوطنية",
      "description": "محمية حياة برية مشهورة عالميًا في كينيا، تشتهر بهجرة الحمير الوحشية الكبرى ورحلات السفاري الاقتصادية والجولات الرخيصة في كينيا",
      "image": heroImage,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -1.4933,
        "longitude": 35.1431
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "ماساي مارا"
      }
    },

    // 2. المنظمة + النشاط التجاري (مع التقييمات)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/ar/#organization",
      "name": "رحلات جي تريل",
      "description": "منظم رحلات كيني محترف متخصص في رحلات السفاري الاقتصادية والجولات الرخيصة في كينيا والتجارب التي لا تُنسى",
      "url": "https://www.jaetravel.co.ke/ar",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "email": "info@jaetravel.co.ke",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "نيروبي",
        "postalCode": "00100",
        "addressCountry": "KE",
        "addressLocality": "نيروبي"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "خدمة العملاء",
        "areaServed": "KE",
        "availableLanguage": ["العربية", "الإنجليزية", "السواحلية"]
      },
      "sameAs": [
        "https://www.facebook.com/jaetravelexpeditions",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravelke"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "ديفيد تشين" },
          "datePublished": "2025-08-20",
          "reviewBody": "جعلت جي تريل رحلة سفاري ماساي مارا الاقتصادية لا تُنسى! مرشدون ممتازون، مخيمات مريحة، ومشاهدات حيوانات لا تصدق – خاصة هجرة الحمير الوحشية."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "سارة جونسون" },
          "datePublished": "2025-07-15",
          "reviewBody": "رحلة جماعية مثالية مع جي تريل! سعر معقول، مخيم خيام رائع، ورصد مرشدنا الأسود والفهد والحيوانات الخمسة الكبرى."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "مايكل طومسون" },
          "datePublished": "2025-09-05",
          "reviewBody": "أفضل تجربة سفاري اقتصادي في كينيا! قدمت جي تريل قيمة مذهلة – فريق محترف، نقل مريح، ومناظر خلابة."
        }
      ]
    },

    // 3. الموقع الإلكتروني
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/ar/#website",
      "url": "https://www.jaetravel.co.ke/ar",
      "name": "رحلات جي تريل - منظم رحلات كينيا",
      "publisher": { "@id": "https://www.jaetravel.co.ke/ar/#organization" },
      "inLanguage": "ar"
    },

    // 4. صفحة الويب
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl}#webpage`,
      "url": absoluteUrl,
      "name": "رحلات سفاري اقتصادية في كينيا 2026 | جولات ماساي مارا الرخيصة من 450 دولارًا",
      "description": "احجز رحلات سفاري اقتصادية إلى محمية ماساي مارا الوطنية لتجارب لا تُنسى. رحلات خاصة وجماعية مع إقامة في مخيمات خيام. شاهد الأسود والفهد والهجرة الكبرى.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/ar/#website" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": heroImage,
        "width": 1200,
        "height": 630,
        "caption": "هجرة الحمير الوحشية في ماساي مارا - رحلات سفاري اقتصادية كينيا"
      },
      "breadcrumb": { "@id": `${absoluteUrl}#breadcrumb` },
      "inLanguage": "ar"
    },

    // 5. مسار التنقل (BreadcrumbList)
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.jaetravel.co.ke/ar/" },
        { "@type": "ListItem", "position": 2, "name": "رحلات سفاري اقتصادية", "item": absoluteUrl }
      ]
    },

    // 6. منتج (الجولات الاقتصادية)
    {
      "@type": "Product",
      "@id": `${absoluteUrl}#product`,
      "name": "باقات رحلات السفاري الاقتصادية في كينيا 2026",
      "description": "باقات سفاري اقتصادية إلى ماساي مارا وبحيرة ناكورو وأمبوسيلي وتسافو. تشمل رحلات مشاهدة الحيوانات، إقامة في مخيمات خيام، ومرشدين خبراء.",
      "image": heroImage,
      "brand": {
        "@type": "Brand",
        "name": "رحلات جي تريل"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "offerCount": totalTours,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating,
        "reviewCount": "723",
        "bestRating": "5",
      },
      "category": "جولات سفاري اقتصادية"
    },

    // 7. قائمة العناصر مع TouristTrip
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl}#budget-tours-list`,
      "name": "باقات رحلات السفاري الاقتصادية في كينيا 2026 - جولات ماساي مارا الرخيصة",
      "description": "باقات سفاري اقتصادية تبدأ من 450 دولارًا",
      "numberOfItems": totalTours,
      "itemListElement": featuredTours.map((tour, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristTrip",
          "@id": `https://www.jaetravel.co.ke${tour.url}#trip`,
          "name": tour.title,
          "description": tour.shortDescription || tour.description,
          "image": `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`,
          "duration": tour.duration,
          "touristType": ["المسافرون بميزانية محدودة", "باحثو المغامرة", "عشاق الحياة البرية"],
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": tour.itinerary?.map((item, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": item.title
            })) || []
          },
          "offers": {
            "@type": "Offer",
            "url": `https://www.jaetravel.co.ke${tour.url}`,
            "priceCurrency": "USD",
            "price": tour.price.toString(),
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "@id": "https://www.jaetravel.co.ke/ar/#organization"
            }
          }
        }
      }))
    },

    // 8. صفحة الأسئلة الشائعة
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl}#faqpage`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما الذي تتضمنه رحلات السفاري الاقتصادية إلى محمية ماساي مارا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل رحلات السفاري الاقتصادية لدينا الإقامة في مخيمات خيام مريحة، وجميع رحلات مشاهدة الحيوانات في محمية ماساي مارا الوطنية، ومرشدين محترفين، ووجبات، ومواصلات. شاهد الأسود والفهد وهجرة الحمير الوحشية في هذه التجارب التي لا تُنسى."
          }
        },
        {
          "@type": "Question",
          "name": "هل تقدمون رحلات سفاري خاصة أم جماعية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم! نقدم كلاً من رحلات السفاري الخاصة لبرامج مخصصة ورحلات السفاري الجماعية للمسافرين المهتمين بالميزانية. تتميز جميع جولاتنا في كينيا بمرشدين خبراء وفرص ممتازة لمشاهدة الحيوانات."
          }
        },
        {
          "@type": "Question",
          "name": "ما هو أفضل وقت لمشاهدة هجرة الحمير الوحشية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تبلغ هجرة الحمير الوحشية الكبرى في ماساي مارا ذروتها من يوليو إلى أكتوبر. تقدم رحلات السفاري الاقتصادية خلال هذه الفترة مشاهدة لا تصدق لملايين الحمير الوحشية وهي تعبر نهر مارا."
          }
        },
        {
          "@type": "Question",
          "name": "ما نوع الإقامة المستخدمة في رحلات السفاري الاقتصادية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نستخدم مخيمات خيام مريحة توفر تجربة سفاري أصيلة مع الحفاظ على القدرة المالية. تقع هذه المخيمات في مواقع استراتيجية لمشاهدة مثالية للحيوانات في ماساي مارا."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي الحياة البرية التي يمكننا توقع رؤيتها في سفاري مارا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشتهر محمية ماساي مارا الوطنية بمشاهداتها للحيوانات الخمسة الكبرى بما في ذلك الأسود والفهد. خلال موسم الهجرة، ستشاهد ملايين الحمير الوحشية والحمر الوحشية والحيوانات المفترسة وهي تتصرف بفطرتها."
          }
        },
        {
          "@type": "Question",
          "name": "لماذا تختار رحلات جي تريل كمنظم رحلاتك في كينيا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "باعتبارنا منظم رحلات كيني متمرس، نتخصص في خلق تجارب سفاري لا تُنسى بأسعار معقولة. تضمن خبراتك الحصول على أفضل فرص مشاهدة الحيوانات مع جولات اقتصادية في كينيا."
          }
        }
      ]
    },

    // 9. فيديو
    {
      "@type": "VideoObject",
      "@id": `${absoluteUrl}#video`,
      "name": "سفاري اقتصادي في ماساي مارا - أبرز أحداث هجرة الحمير الوحشية",
      "description": "استمتع بإثارة مشاهدة هجرة الحمير الوحشية الكبرى في رحلة سفاري اقتصادية في كينيا. شاهد الأسود والفهد وعبور الأنهار.",
      "thumbnailUrl": "https://www.jaetravel.co.ke/migration-thumb.jpg",
      "uploadDate": "2025-01-01T00:00:00Z",
      "duration": "PT2M30S",
      "contentUrl": "https://www.jaetravel.co.ke/videos/budget-safari-masai-mara.mp4",
      "embedUrl": "https://www.youtube.com/embed/budget-safari-id",
      "publisher": {
        "@type": "Organization",
        "name": "رحلات جي تريل"
      }
    }
  ]
};

// ============================================
// مكون الصفحة الرئيسية
// ============================================
export default function BudgetToursPage() {
  return (
    <div className="pb-16" dir="rtl">
      {/* البيانات المنظمة */}
      <Script
        id="budget-tours-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ========== قسم البطل ========== */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fantasticafrica-20240806-0001.jpg"
            alt="مشاهدة هجرة الحمير الوحشية في محمية ماساي مارا الوطنية - رحلات سفاري اقتصادية كينيا، جولات رخيصة في كينيا"
            fill
            className="object-cover brightness-50"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            quality={90}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            <strong>رحلات سفاري اقتصادية في كينيا 2026</strong> — <span className="text-primary">من 450 دولارًا</span>
          </h1>
          <h2 className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            شاهد <strong>هجرة الحمير الوحشية</strong> المذهلة في <strong>محمية ماساي مارا الوطنية</strong> من خلال <strong>رحلات السفاري الاقتصادية</strong>.
            اختر بين <strong>الجولات الجماعية المثيرة</strong> أو <strong>رحلات السفاري الخاصة المخصصة</strong> مع إقامة مريحة في <strong>مخيمات الخيام</strong>.
            استمتع <strong>بمشاهدة الحيوانات</strong> الرائعة للأسود والفهد والحيوانات الخمسة الكبرى في هذه <strong>التجربة التي لا تُنسى</strong>.
          </h2>

          {/* عرض السعر */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8 inline-flex items-center gap-4 mx-auto">
            <div className="text-center">
              <p className="text-sm opacity-80">تبدأ من</p>
              <p className="text-3xl font-bold">${minPrice}</p>
            </div>
            <div className="w-px h-10 bg-white/30"></div>
            <div className="text-center">
              <p className="text-sm opacity-80">المتوسط</p>
              <p className="text-3xl font-bold">${Math.round((minPrice + maxPrice) / 2)}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg bg-green-600 hover:bg-green-700">
              <Link href="#tours">عرض جميع باقات <strong>سفاري مارا</strong></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/ar/contact">اتصل بـ <strong>منظم رحلاتنا</strong> اليوم</Link>
            </Button>
          </div>

          {/* شارات الثقة */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> ضمان أفضل سعر</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> جولات جماعية وخاصة</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> دعم 24/7</span>
          </div>
        </div>
      </section>

      {/* ========== قسم الإحصائيات ========== */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">{totalTours}+</div>
              <div className="text-gray-600">باقات سفاري اقتصادية</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">723+</div>
              <div className="text-gray-600">مسافر سعيد</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">{avgRating}★</div>
              <div className="text-gray-600">متوسط التقييم</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">${minPrice}</div>
              <div className="text-gray-600">سعر البداية</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== قسم المقدمة ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-5xl md:text-6xl font-bold tracking-tight">
            اكتشف أفضل <strong className="text-green-600">رحلات السفاري الاقتصادية في كينيا</strong> لعام 2026
          </h2>
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl text-gray-600 font-light">
              مغامرات حياة برية بأسعار معقولة مع مخيمات خيام مريحة ومرشدين خبراء
            </h3>
          </div>
          <div className="max-w-5xl mx-auto space-y-6 text-right">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                تخطط لرحلتك الأحلام <strong>للسفاري في كينيا</strong>؟ بصفتنا <strong>منظم رحلات كيني</strong> رائد،
                تقدم رحلات جي تريل <strong>رحلات سفاري اقتصادية</strong> استثنائية، <strong>جولات رخيصة في كينيا</strong>،
                و<strong>جولات اقتصادية في كينيا</strong> إلى <strong>محمية ماساي مارا الوطنية</strong>.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                سواء كنت تفضل أجواء الرفقة في <strong>الجولات الجماعية</strong> أو خصوصية
                <strong>رحلات السفاري الخاصة</strong>، فإننا نخلق <strong>تجارب لا تُنسى</strong> لن تكسر الميزانية.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                تشمل باقات <strong>سفاري مارا</strong> إقامة مريحة في <strong>مخيمات خيام</strong>
                ورحلات <strong>مشاهدة الحيوانات</strong> بقيادة خبراء. شاهد <strong>هجرة الحمير الوحشية</strong> الرائعة
                وتعرف على <strong>الأسود والفهد</strong> والحياة البرية الأخرى في <strong>جولات كينيا</strong> المصممة بعناية.
              </p>
            </div>
          </div>
          <div className="pt-8">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-10 py-7 text-lg rounded-full"
            >
              <Link href="#tours">
                استكشف باقات <strong>جولاتنا الرخيصة في كينيا</strong>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== قسم الميزات الرئيسية ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            تجربة <strong>جولاتك الاقتصادية في كينيا</strong> المثالية
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MapPin className="h-7 w-7 text-green-600" />,
                title: "محمية ماساي مارا الوطنية",
                desc: "أفضل مكان لـ <strong>مشاهدة الحيوانات</strong> في كينيا",
              },
              {
                icon: <Calendar className="h-7 w-7 text-green-600" />,
                title: "هجرة الحمير الوحشية",
                desc: "شاهد الهجرة الكبرى على باقات <strong>سفاري مارا</strong> المحددة بتوقيت خاص",
              },
              {
                icon: <Users className="h-7 w-7 text-green-600" />,
                title: "خيارات سفاري مرنة",
                desc: "اختر بين <strong>جولات السفاري الخاصة</strong> أو <strong>الجولات الجماعية</strong> الاقتصادية",
              },
              {
                icon: <Camera className="h-7 w-7 text-green-600" />,
                title: "أسود وفهود",
                desc: "فرص ممتازة لرؤية <strong>الأسود والفهد</strong> والحيوانات الخمسة الكبرى كاملة",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== شبكة الجولات الديناميكية ========== */}
      <div id="tours">
        <BudgetToursClient />
      </div>

      {/* ========== لماذا تختارنا ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            لماذا تختار جي تريل لـ <strong>جولاتك الرخيصة في كينيا</strong>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <DollarSign className="h-7 w-7 text-green-600" />,
                title: "أفضل قيمة لرحلات السفاري الاقتصادية",
                desc: "تبدأ من 450 دولارًا — تجارب <strong>مشاهدة حيوانات</strong> فاخرة بأسعار معقولة.",
              },
              {
                icon: <Users className="h-7 w-7 text-green-600" />,
                title: "منظم رحلات خبير",
                desc: "بصفتنا <strong>منظم رحلات كيني</strong> محترف، نقدم مرشدين ذوي معرفة لـ <strong>تجارب لا تُنسى</strong>.",
              },
              {
                icon: <Shield className="h-7 w-7 text-green-600" />,
                title: "مخيمات خيام أصيلة",
                desc: "أقم في <strong>مخيمات خيام</strong> مريحة تقربك من الطبيعة.",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== قسم الإقامة ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            <strong>مخيمات خيام</strong> أصيلة لـ <strong>رحلات السفاري الاقتصادية في كينيا</strong>
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold">عش أفريقيا الحقيقية على الجولات الرخيصة</h3>
              <div className="mb-6">
                <p className="text-lg leading-relaxed">
                  تقدم مخيمات الخيام التي اخترناها بعناية مزيجًا مثاليًا من المغامرة والراحة. استيقظ على أصوات الأدغال الأفريقية واستمتع بما يلي:
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "أسرّة مريحة بفراش جيد",
                  "حمامات خاصة داخلية",
                  "إضاءة بالطاقة الشمسية",
                  "إقامة آمنة في مواقع رئيسية",
                  "نيران مسائية تحت سماء مليئة بالنجوم",
                  "قرب ممتاز من مناطق <strong>مشاهدة الحيوانات</strong>"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-2xl font-bold">مثالية لجميع أنماط السفاري</h3>
              <div className="mb-6">
                <p className="text-lg leading-relaxed">
                  سواء كنت في <strong>جولات سفاري خاصة</strong> أو تنضم إلى <strong>جولاتنا الجماعية</strong> الشهيرة، فإن <strong>مخيمات الخيام</strong> لدينا توفر:
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "مناطق اجتماعية للقاء زملائك المسافرين",
                  "مساحات خاصة للأزواج والعائلات",
                  "طاقم مخيم واسع المعرفة",
                  "وجبات لذيذة محضرة طازجة يوميًا",
                  "مواقع استراتيجية لمشاهدة <strong>هجرة الحمير الوحشية</strong>",
                  "سهولة الوصول إلى <strong>محمية ماساي مارا الوطنية</strong>"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== قسم ما يشمل / لا يشمل ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                <strong>تجربتك التي لا تُنسى</strong> تشمل
              </h2>
              <ul className="space-y-3">
                {[
                  "جميع رحلات <strong>مشاهدة الحيوانات</strong> بمركبات الدفع الرباعي",
                  "إقامة في <strong>مخيمات خيام</strong> أصيلة",
                  "مرشدين محترفين من فريق <strong>منظم الرحلات</strong> لدينا",
                  "جميع رسوم <strong>محمية ماساي مارا الوطنية</strong>",
                  "وجبات كاملة خلال <strong>سفاري كينيا</strong>",
                  "وسائل النقل لـ <strong>رحلات السفاري الخاصة</strong> أو <strong>الجولات الجماعية</strong>",
                  "فرصة لمشاهدة <strong>هجرة الحمير الوحشية</strong>",
                  "فرص لرؤية <strong>الأسود والفهد</strong> والحيوانات الخمسة الكبرى"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                خطط لـ <strong>جولاتك الرخيصة في كينيا</strong> المثالية
              </h2>
              <ul className="space-y-3">
                {[
                  "الرحلات الجوية الدولية إلى كينيا",
                  "تأمين السفر (موصى به بشدة)",
                  "الأنشطة الاختيارية مثل رحلات المنطاد",
                  "المشروبات الكحولية والنفقات الشخصية",
                  "الإكراميات للمرشدين وطاقم المخيم",
                  "رسوم التأشيرة لدخول كينيا",
                  "تكاليف الغرفة الفردية للمسافرين المنفردين",
                  "أي ليالٍ إضافية خارج البرنامج"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== قسم التركيز على الهجرة ========== */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            شاهد <strong>هجرة الحمير الوحشية</strong> الرائعة في جولات اقتصادية
          </h2>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-lg leading-relaxed">
                تعد <strong>هجرة الحمير الوحشية الكبرى</strong> واحدة من أكثر مشاهد الطبيعة روعة. كل عام، يرتحل أكثر من 1.5 مليون حمار وحشي، بالإضافة إلى الحمر الوحشية والغزلان، عبر <strong>محمية ماساي مارا الوطنية</strong>.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">أفضل أوقات المشاهدة</h3>
                  <ul className="space-y-2">
                    <li><strong>يوليو-أكتوبر:</strong> عبور النهر في ماساي مارا</li>
                    <li><strong>نوفمبر-ديسمبر:</strong> بدء الهجرة جنوبًا</li>
                    <li><strong>يناير-مارس:</strong> موسم الولادة في سيرينجيتي</li>
                    <li><strong>أبريل-يونيو:</strong> عبور نهر غروميتي</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">حركة الحيوانات المفترسة</h3>
                  <p>خلال الهجرة، ستشهد تفاعلات لا تصدق بين المفترس والفريسة. تركز رحلات <strong>مشاهدة الحيوانات</strong> لدينا على المناطق التي تنشط فيها <strong>الأسود والفهد</strong> والفهود والضباع.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========== قسم الشهادات ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            ماذا يقول ضيوفنا عن <strong>رحلات السفاري الاقتصادية في كينيا</strong>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "ديفيد تشين", location: "سنغافورة", text: "جعلت جي تريل رحلة سفاري ماساي مارا الاقتصادية لا تُنسى! مرشدون ممتازون، مخيمات مريحة، ومشاهدات حيوانات لا تصدق – خاصة هجرة الحمير الوحشية.", rating: 5 },
              { name: "سارة جونسون", location: "المملكة المتحدة", text: "رحلة جماعية مثالية مع جي تريل! سعر معقول، مخيم خيام رائع، ورصد مرشدنا الأسود والفهد والحيوانات الخمسة الكبرى.", rating: 5 },
              { name: "مايكل طومسون", location: "أستراليا", text: "أفضل تجربة سفاري اقتصادي في كينيا! قدمت جي تريل قيمة مذهلة – فريق محترف، نقل مريح، ومناظر خلابة.", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-md">
                <div className="flex mb-4">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== الأسئلة الشائعة ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            الأسئلة الشائعة عن <strong>رحلات السفاري الاقتصادية في كينيا</strong>
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "ما الذي تتضمنه رحلات السفاري الاقتصادية إلى ماساي مارا؟", a: "تشمل رحلات السفاري الاقتصادية لدينا الإقامة في مخيمات خيام مريحة، وجميع رحلات مشاهدة الحيوانات في محمية ماساي مارا الوطنية، ومرشدين محترفين، ووجبات، ومواصلات. شاهد الأسود والفهد وهجرة الحمير الوحشية في هذه التجارب التي لا تُنسى." },
              { q: "هل تقدمون رحلات سفاري خاصة أم جماعية؟", a: "نعم! نقدم كلاً من رحلات السفاري الخاصة لبرامج مخصصة ورحلات السفاري الجماعية للمسافرين المهتمين بالميزانية. تتميز جميع جولاتنا في كينيا بمرشدين خبراء وفرص ممتازة لمشاهدة الحيوانات." },
              { q: "ما هو أفضل وقت لمشاهدة هجرة الحمير الوحشية؟", a: "تبلغ هجرة الحمير الوحشية الكبرى في ماساي مارا ذروتها من يوليو إلى أكتوبر. تقدم رحلات السفاري الاقتصادية خلال هذه الفترة مشاهدة لا تصدق لملايين الحمير الوحشية وهي تعبر نهر مارا." },
              { q: "ما نوع الإقامة المستخدمة في رحلات السفاري الاقتصادية؟", a: "نستخدم مخيمات خيام مريحة توفر تجربة سفاري أصيلة مع الحفاظ على القدرة المالية. تقع هذه المخيمات في مواقع استراتيجية لمشاهدة مثالية للحيوانات في ماساي مارا." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== القسم الختامي ========== */}
      <section className="py-16 bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            هل أنت مستعد لـ <strong>تجربة سفاري لا تُنسى</strong>؟
          </h2>
          <div className="max-w-5xl mx-auto mb-8">
            <p className="text-lg leading-relaxed">
              من ${minPrice} للشخص — احجز مكانك في <strong>رحلات السفاري الاقتصادية</strong> إلى <strong>محمية ماساي مارا الوطنية</strong>.
              اختر <strong>رحلات السفاري الخاصة</strong> للتميز أو انضم إلى <strong>جولاتنا الجماعية</strong> الشهيرة لتحقيق أقصى قيمة.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="bg-white text-green-700 hover:bg-gray-100">
              <Link href="/ar/contact">احجز <strong>سفاري مارا</strong> اليوم</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="https://wa.me/+254726485228">
                <Phone className="ml-2 h-5 w-5" /> تحدث مع <strong>منظم رحلاتنا</strong>
              </a>
            </Button>
          </div>
          <div className="mt-8 text-sm opacity-90 flex justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2"><Phone size={14} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><CreditCard size={14} /> دفع آمن</span>
          </div>
        </div>
      </section>
    </div>
  );
}