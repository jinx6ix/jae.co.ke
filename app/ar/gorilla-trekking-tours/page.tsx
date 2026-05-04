import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/ar/gorilla-trekking-tours/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Star, Shield, Award, Zap, Mountain, Camera, Info, 
  CheckCircle, Heart, Compass, Sunrise, Sunset, Leaf, Footprints, 
  Globe, MapPin, Phone, MessageCircle 
} from "lucide-react";

import TourCard from "@/components/TourCard";
import LiveWildlifeReport from "@/components/LiveWildlifeReport";
import FaqSection from "@/components/FaqSection";
import TrustBadges from "@/components/TrustBadges";

import { tours } from "@/lib/i18n/data/ar/tours-data";
import JsonLd from "@/components/JsonLd";

const CONFIG = {
  slug: "gorilla-trekking-tours",
  title: "جولات تتبع الغوريلا 2026 | رواندا وأوغندا",
  description:
    "تتبع الغوريلا في رواندا وأوغندا 2026. شاهد الغوريلا الجبلية في منتزه البراكين الوطني وبويندي. تصاريح من 800 دولار، مرشدون خبراء ونزل فاخرة.",
  h1: "تتبع الغوريلا",
  h1Sub: "جولات 2026",
  subtitle: "قف على بعد أمتار من الغوريلا الجبلية المهددة بالانقراض في غابة بويندي (أوغندا) ومنتزه البراكين الوطني (رواندا)",
  featuredToursTitle: "باقات تتبع الغوريلا المميزة",
};

const pageTours = tours
  .filter((tour: any) => 
    tour.destinations?.includes("uganda") || 
    tour.destinations?.includes("rwanda") ||
    tour.tags?.includes("gorilla") ||
    tour.slug.includes("gorilla") ||
    tour.slug.includes("bwindi") ||
    tour.slug.includes("volcanoes")
  )
  .slice(0, 6);

const fallbackImages = [
  "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
];

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "جولات تتبع الغوريلا 2026", "سفاري الغوريلا الجبلية أوغندا رواندا", 
    "تصريح تتبع غوريلا بويندي 2026", "غوريلا منتزه البراكين الوطني رواندا 2026",
    "أسعار تتبع الغوريلا 2026", "أفضل وقت لتتبع الغوريلا موسم الجفاف",
    "تجربة التعود على الغوريلا أوغندا", "حجز تصريح الغوريلا 2026",
    "سفاري الغوريلا مع جيه ترافيل", "تتبع الغوريلا شرق أفريقيا"
  ],
  authors: [{ name: "جيه ترافيل إكسبديشنز" }],
  creator: "جيه ترافيل إكسبديشنز",
  publisher: "جيه ترافيل إكسبديشنز",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/gorilla-trekking-tours",
    languages: {
      "ar": "/ar/gorilla-trekking-tours",
      "en-US": "/en-us/gorilla-trekking-tours",
      "en-GB": "/en-gb/gorilla-trekking-tours",
      "en-AU": "/en-au/gorilla-trekking-tours",
    },
  },
  openGraph: {
    title: "جولات تتبع الغوريلا 2026 | رواندا وأوغندا | جيه ترافيل إكسبديشنز",
    description: "تتبع الغوريلا الجبلية المهددة بالانقراض في منتزه البراكين برواندا وغابة بويندي في أوغندا. تصاريح مضمونة، متتبعون خبراء. مشغل كيني منذ 2015.",
    images: [{ url: "https://www.jaetravel.co.ke/gorilla-trekking-2026.jpg", width: 1200, height: 630, alt: "تتبع الغوريلا الجبلية في أوغندا" }],
    locale: "ar_AR",
    type: "website",
    siteName: "جيه ترافيل إكسبديشنز",
  },
  twitter: {
    card: "summary_large_image",
    title: "جولات تتبع الغوريلا 2026 | رواندا وأوغندا",
    description: "تتبع الغوريلا الجبلية المهددة بالانقراض. تصاريح مضمونة. احجز مغامرتك لعام 2026.",
    images: ["/twitter/gorilla-trekking.jpg"],
    creator: "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ==================== OPTIMIZED SCHEMA (arabic context) ====================
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "جيه ترافيل إكسبديشنز",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description: "رحلات سفاري في شرق أفريقيا متخصصة في تتبع الغوريلا، سفاري الحياة البرية والسفر المتاح عبر كينيا وأوغندا ورواندا وتنزانيا.",
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: {
        "@type": "PostalAddress",
        streetAddress: "دوار كارين",
        addressLocality: "نيروبي",
        addressRegion: "مقاطعة نيروبي",
        addressCountry: "KE"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1200"
      }
    },

    // 2. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.jaetravel.co.ke/ar" },
        { "@type": "ListItem", position: 2, name: "الوجهات", item: "https://www.jaetravel.co.ke/ar/destinations" },
        { "@type": "ListItem", position: 3, name: "أوغندا ورواندا", item: "https://www.jaetravel.co.ke/ar/destinations/uganda-rwanda" },
        { "@type": "ListItem", position: 4, name: "جولات تتبع الغوريلا 2026", item: "https://www.jaetravel.co.ke/ar/gorilla-trekking-tours" }
      ]
    },

    // 3. Main Product / Offer
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/ar/gorilla-trekking-tours#product",
      name: "جولات تتبع الغوريلا 2026 – أوغندا ورواندا",
      description: "تصاريح تتبع غوريلا جبلية مضمونة في بويندي (أوغندا) ومنتزه البراكين الوطني (رواندا). متتبعون محليون خبراء ونزل فاخرة.",
      brand: { "@type": "Brand", name: "جيه ترافيل إكسبديشنز" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "2200",
        highPrice: "6500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "12"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "450"
      }
    },

    // 4. TouristTrip (Main Experience)
    {
      "@type": "TouristTrip",
      name: "رحلة سفاري تتبع الغوريلا الجبلية – أوغندا ورواندا",
      description: "تجربة فريدة في العمر لتتبع الغوريلا الجبلية المهددة بالانقراض في بيئتها الطبيعية مع مرشدين خبراء.",
      touristType: "سفر المغامرات",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "منتزه بويندي الوطني",
          description: "موطن لنحو نصف غوريلا الجبل المتبقية في العالم"
        },
        {
          "@type": "TouristDestination",
          name: "منتزه البراكين الوطني",
          description: "الوجهة الأولى لتتبع الغوريلا في رواندا"
        }
      ]
    },

    // 5. FAQPage
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "كم تبلغ تكلفة تصريح تتبع الغوريلا في 2026؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تصاريح أوغندا (بويندي) 800 دولار بينما تصاريح رواندا (منتزه البراكين الوطني) 1500 دولار للشخص لكل تتبع."
          }
        },
        {
          "@type": "Question",
          name: "ما هو أفضل وقت لتتبع الغوريلا؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "أفضل وقت خلال مواسم الجفاف: من يونيو إلى سبتمبر ومن ديسمبر إلى فبراير. تنفد التصاريح بشكل أسرع خلال أشهر الجفاف المرتفعة."
          }
        },
        {
          "@type": "Question",
          name: "كم مسبقاً يجب أن أحجز تتبع الغوريلا لعام 2026؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نوصي بالحجز قبل 12-18 شهراً، خاصة لموسم الجفاف المرتفع (يونيو-سبتمبر)."
          }
        }
      ]
    }
  ]
};

export default function GorillaTrekkingToursPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="gorilla-trekking-tours"
        categoryOpts={{
          title: "جولات تتبع الغوريلا في رواندا وأوغندا 2026",
          description: "تتبع الغوريلا الجبلية في منتزه البراكين برواندا وغابة بويندي في أوغندا. مرشدون خبراء، تصاريح مشمولة.",
          image: "/mountain-gorilla-trekking.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("gorilla") || t.title?.toLowerCase().includes("غوريلا") || t.description?.toLowerCase().includes("غوريلا")) : [],
        }}
      />
      {/* Optimized JSON-LD */}
      <JsonLd id="gorilla-trekking-schema" data={jsonLd} />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">

          {/* Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm">متخصصون عالميون في السفاري</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">نيروبي، كينيا • دوار كارين</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-green-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="ml-1 text-sm font-medium text-gray-700">أكثر من 1200 تقييم</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-green-600 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/destinations" className="hover:text-green-600 transition">الوجهات</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/uganda-rwanda" className="hover:text-green-600 transition">أوغندا ورواندا</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">جولات تتبع الغوريلا 2026</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Leaf className="h-3.5 w-3.5" /> ~1,063 غوريلا متبقية
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-emerald-100">
                <Footprints className="h-3.5 w-3.5" /> تصاريح مضمونة
              </span>
              <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-teal-100">
                <Heart className="h-3.5 w-3.5" /> تأثير على الحفاظ
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-green-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="flex justify-center text-green-400 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">من أكثر من 1200 تقييم</div>
              </div>
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">1,063</div>
                <div className="text-sm text-gray-500">غوريلا جبلية</div>
                <div className="text-xs text-gray-400 mt-1">أنواع مهددة بالانقراض</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$800 / $1,500</div>
                <div className="text-sm text-gray-500">تصاريح أوغندا / رواندا</div>
                <div className="text-xs text-gray-400 mt-1">مشمولة في الباقات</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button asChild size="lg" className="text-base px-10 py-6 bg-green-600 hover:bg-green-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]">
                <Link href="/ar/tours/bwindi-gorilla-trek">
                  <Calendar className="mr-3 h-5 w-5" /> رحلات الغوريلا في أوغندا
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full w-full sm:w-auto min-w-[240px]">
                <Link href="/ar/tours/volcanoes-national-park-safari">
                  <MapPin className="mr-3 h-5 w-5" /> رحلات الغوريلا في رواندا
                </Link>
              </Button>
            </div>
          </header>

          {/* Why Choose Us + Permit Info Section */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-green-300 mb-6">
                    لماذا تختارنا
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    خبراء تتبع الغوريلا
                    <span className="block text-green-300 mt-2">في شرق أفريقيا</span>
                  </h2>
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    نحن في نيروبي، ننظم رحلات تتبع الغوريلا في أوغندا ورواندا منذ 2015. شركاؤنا المحليون هم متتبعون معتمدون ومعرفة عميقة بالغابات.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-100">تصاريح غوريلا مضمونة – نحن نحجزها لك</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-100">مرشدون ومتتبعون خبراء معتمدون</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-100">نزل فاخرة صديقة للبيئة بالقرب من مواقع التتبع</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-100">دعم نقل سلس من عنتيبي أو كيغالي</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-green-300" />
                    معلومات التصاريح 2026
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">تصريح أوغندا</span>
                      <span className="text-white font-medium">$800</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">تصريح رواندا</span>
                      <span className="text-white font-medium">$1,500</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">الحد الأدنى للعمر</span>
                      <span className="text-white font-medium">15 سنة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">الوقت مع الغوريلا</span>
                      <span className="text-white font-medium">ساعة واحدة</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-green-300">يُنصح بالحجز قبل 12-18 شهراً لموسم الجفاف 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-40">
            <LiveWildlifeReport />
          </section>
          
          {/* ========== VIDEO HIGHLIGHTS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                جربها بنفسك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                وجهاً لوجه مع العمالقة
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                قف على بعد أمتار من الغوريلا الجبلية المهددة بالانقراض في غابات أوغندا ورواندا الضبابية.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-gorilla-video-id" 
                title="تجربة تتبع الغوريلا - أوغندا ورواندا"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== UGANDA VS RWANDA ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                اختر وجهتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                أوغندا أم رواندا؟
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                بلدان رائعان، تجربتان فريدتان. اختر بناءً على تفضيلاتك.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">أوغندا</h3>
                <p className="text-green-600 font-light text-xl mb-4">غابة بويندي</p>
                <p className="text-gray-700 mb-6">
                  موطن لنحو نصف غوريلا الجبل في العالم. تصاريح أرخص، عائلات متعودة متعددة، وإمكانية الدمج مع سفاري الحياة البرية الأخرى.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• التصريح: 800 دولار</li>
                  <li className="flex items-center gap-2">• أكثر من 20 عائلة متعودة</li>
                  <li className="flex items-center gap-2">• الدمج مع السفاري</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">رواندا</h3>
                <p className="text-blue-600 font-light text-xl mb-4">منتزه البراكين الوطني</p>
                <p className="text-gray-700 mb-6">
                  وصول أسهل من كيغالي، تنظيم ممتاز للتتبع، وإرث ديان فوسي. تكلفة أعلى لكن تجربة استثنائية وإقامات فاخرة.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• التصريح: 1,500 دولار</li>
                  <li className="flex items-center gap-2">• 10+ عائلات متعودة</li>
                  <li className="flex items-center gap-2">• وصول سهل من كيغالي</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== BEST TIME TO VISIT ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                  خطط زيارتك
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  أفضل وقت لتتبع الغوريلا
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">موسم الجفاف</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">يونيو – سبتمبر</p>
                  <p className="text-gray-600 mb-4">مسارات ثابتة، أمطار قليلة، رؤية أوضح للغابة. الموسم المرتفع - احجز قبل 12-18 شهراً.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">موسم الانتقال</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">ديسمبر – فبراير</p>
                  <p className="text-gray-600 mb-4">طقس جيد، حشود أقل، تصوير ممتاز. لا يزال شائعاً - احجز مبكراً.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                المواسم الرطبة (مارس-مايو، أكتوبر-نوفمبر) ممكنة لكن مسارات أكثر طيناً. تنفد التصاريح بسرعة في أشهر الجفاف.
              </p>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                اختر مغامرتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                تصاريح مضمونة • متتبعون خبراء • نزل فاخرة • استلام من عنتيبي/كيغالي
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "تصريح مضمون، متتبعون خبراء، ساعة مع الغوريلا – نزل فاخرة وانتقالات."}
                  price={tour.price ?? 2200}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 150 + index * 25}
                  location={tour.location || "أوغندا / رواندا"}
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="التصاريح مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug || "gorilla-trek-2026"}`}
                  badge={index === 0 ? "الأكثر مبيعاً" : index === 1 ? "الأعلى تقييماً" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full"
              >
                <Link href="/ar/tours?tag=gorilla">
                  عرض جميع رحلات الغوريلا <span className="mr-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== FAQ SECTION ========== */}
          <section className="mb-40">
            <FaqSection />
          </section>
          
          {/* ========== TRUST BADGES ========== */}
          <section className="mb-40">
            <TrustBadges />
          </section>
          
          {/* ========== FINAL CTA ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                تأمين لقاء الغوريلا الخاص بك
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                تصاريح محدودة • 1,063 غوريلا متبقية • موسم الجفاف المرتفع (يونيو-سبتمبر) يمتلئ بسرعة. احجز الآن لعام 2026.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-green-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/ar/booking">
                    <Calendar className="mr-2 h-5 w-5" /> 
                    تحقق من التوفر
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/ar/contact">
                    <MessageCircle className="mr-2 h-5 w-5" /> 
                    راسلنا على واتساب
                  </Link>
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/20 text-sm text-white/60">
                <p>جيه ترافيل إكسبديشنز • دوار كارين، نيروبي، كينيا</p>
                <p className="mt-2">+254 726 485 228 • info@jaetravel.co.ke</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}