// app/ar/page.tsx — الصفحة الرئيسية بالعربية (RTL) - نسخة كاملة محدثة
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "./TourCard"
import HeroCarousel from "./HeroCarousel"
import { tours, toursOnOffer } from "@/lib/i18n/data/ar/tours-data"
import { destinations } from "@/lib/destinations-data"
import { ArrowRight, Shield, Users, Award, Accessibility, Star, MapPin, Calendar, Users as UsersIcon, Globe, Heart, Zap } from "lucide-react"
import DestinationCard from "./DestinationCard"

// --- إعدادات البيانات الوصفية (Meta Tags) المحسّنة لتحسين ظهور الموقع في نتائج البحث ---
export const metadata: Metadata = {
  title: "سفاري كينيا 2026 | جولات سياحية متاحة للكراسي المتحركة",
  description: "أفضل رحلات سفاري متاحة للكراسي المتحركة في كينيا. سيارات برافعة هيدروليكية ونزل صديقة لذوي الاحتياجات الخاصة. احجز الآن واستمتع بتجربة لا تُنسى.",
  keywords: ["سفاري كينيا متاح للكراسي المتحركة", "جولات سفاري كينيا 2026", "سيارة سفاري برافعة هيدروليكية", "نزل صديقة لذوي الاحتياجات الخاصة", "هجرة ماساي مارا الكبرى", "تتبع الغوريلا رواندا", "سفاري شرق أفريقيا"],
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar",
    languages: {
      'ar': 'https://www.jaetravel.co.ke/ar',
      'en': 'https://www.jaetravel.co.ke',
    },
  },
  openGraph: {
    title: "سفاري كينيا 2026 | جولات سياحية متاحة للكراسي المتحركة",
    description: "أفضل رحلات سفاري متاحة للكراسي المتحركة في كينيا. سيارات برافعة هيدروليكية ونزل صديقة لذوي الاحتياجات الخاصة.",
    url: "https://www.jaetravel.co.ke/ar",
    locale: "ar_AE",
    type: "website",
    images: [{ url: "https://www.jaetravel.co.ke/og-image.jpg", width: 1200, height: 630, alt: "جيه تريفل - سفاري شرق أفريقيا" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// --- مخطط البيانات المنظمة (Schema.org) للحصول على نتائج غنية في البحث ---
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "جا ترافل إكسبديشنز - رحلات سفاري في كينيا متاحة للكراسي المتحركة",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "sameAs": ["https://www.facebook.com/JaeTravelExpeditions", "https://www.instagram.com/JaeTravelExpeditions", "https://wa.me/254726485228"],
      "contactPoint": { "@type": "ContactPoint", "telephone": "+254726485228", "contactType": "خدمة العملاء", "areaServed": ["KE", "TZ", "RW", "UG"], "availableLanguage": ["العربية", "الإنجليزية"] }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jaetravel.co.ke/#business",
      "name": "جا ترافل إكسبديشنز – أفضل رحلات سفاري متاحة للكراسي المتحركة في كينيا 2026",
      "description": "أول مشغل سفاري في شرق إفريقيا مزود برافعات هيدروليكية ألمانية (400 كجم) ونزل صديقة لذوي الاحتياجات الخاصة ورحلات للهجرة الكبرى وتتبع الغوريلا.",
      "url": "https://www.jaetravel.co.ke",
      "telephone": "+254726485228",
      "image": "https://www.jaetravel.co.ke/accessible-safari-wheelchair.jpg",
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },
      "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "08:00", "closes": "18:00" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "bestRating": "5", "reviewCount": "723" },
      "review": [
        { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "ديفيد تشين" }, "datePublished": "2025-08-20", "reviewBody": "كمستخدم دائم للكرسي المتحرك، لم أتخيل رؤية الأسود في ماساي مارا. السيارة ذات الرافعة الهيدروليكية كانت مثالية." },
        { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "سارة جونسون" }, "datePublished": "2025-07-15", "reviewBody": "استأجرت لاند كروزر متاحة للكراسي المتحركة لسفاري خاص – أفضل قرار لجولات سفاري متاحة في كينيا." }
      ],
      "makesOffer": [{ "@type": "Offer", "name": "تأجير سيارات سفاري متاحة للكراسي المتحركة في كينيا 2026", "description": "سيارات لاند كروزر 4x4 برافعات هيدروليكية وأسقف قابلة للرفع ومرافق طبية وسائقين خبراء.", "url": "https://www.jaetravel.co.ke/vehicle-hire", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "offeredBy": { "@id": "https://www.jaetravel.co.ke/#business" } }]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "جا ترافل إكسبديشنز",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/#webpage",
      "url": "https://www.jaetravel.co.ke/ar",
      "name": "رحلات سفاري متاحة للكراسي المتحركة في كينيا 2026 | سيارات برافعة هيدروليكية وجولات شاملة",
      "description": "أفضل مشغل سفاري متاح للكراسي المتحركة في كينيا. سيارات 4x4 برافعات هيدروليكية ألمانية ونزل صديقة لذوي الاحتياجات الخاصة وتواريخ الهجرة الكبرى 2026.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/ar/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/#breadcrumb",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.jaetravel.co.ke/ar" }]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "هل تقدمون سيارات سفاري متاحة للكراسي المتحركة؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم – نملك الأسطول الوحيد في كينيا من سيارات لاند كروزر 4x4 برافعات هيدروليكية ألمانية وأحزمة تقييد طبية." } },
        { "@type": "Question", "name": "هل يمكنني استئجار سيارة سفاري متاحة للكراسي المتحركة؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم! نقدم تأجيرًا خاصًا لسيارات السفاري المجهزة بالكامل مع سائقين ذوي خبرة." } },
        { "@type": "Question", "name": "ما هي الوجهات التي تغطونها؟", "acceptedAnswer": { "@type": "Answer", "text": "نعمل في كينيا وتنزانيا ورواندا وأوغندا – بما في ذلك ماساي مارا وسيرينجيتي ومنتزه البراكين الوطني." } },
        { "@type": "Question", "name": "كم تكلفة رحلة سفاري متاحة للكراسي المتحركة في كينيا؟", "acceptedAnswer": { "@type": "Answer", "text": "تبدأ الأسعار من 4,850 دولارًا أمريكيًا لرحلة سفاري فاخرة لمدة 7 أيام." } }
      ]
    }
  ]
}

export default function ArabicHomePage() {
  const featuredTours = tours.slice(0, 3)
  const specialOffers = toursOnOffer.slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema).replace(/</g, '\\u003c')
        }}
      />

      {/* دائري الصور الرئيسي */}
      <HeroCarousel />

      {/* لماذا تختارنا - معزز بالكلمات المفتاحية */}
      <section className="border-b border-border bg-muted/30 py-16" dir="rtl">
        <div className="container mx-auto px-4">
          <h1 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            رحلات سفاري في كينيا متاحة للكراسي المتحركة 2026 – أفضل الجولات المتاحة ومغامرات الحياة البرية
          </h1>

          <div className="mb-12 max-w-5xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              مرحبًا بكم في جا ترافل إكسبديشنز – أفضل مشغل لـ <strong>رحلات السفاري المتاحة للكراسي المتحركة في كينيا</strong> و<strong>جولات السفاري المتاحة للكراسي المتحركة في كينيا</strong>.
              تجعل سياراتنا المزودة برافعات هيدروليكية ألمانية ونزلنا الصديقة لذوي الاحتياجات الخاصة الهجرة الكبرى في ماساي مارا وسيرينجيتي و trekking الغوريلا متاحة بالكامل.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              تخيل مشاهدة <strong>رحلة الهجرة الكبرى</strong> المدوية في ماساي مارا، أو تتبع الغوريلا الجبلية المهددة بالانقراض عبر الغابات الضبابية، أو الاستمتاع بـ <strong>جولات مشاهدة الحيوانات</strong> عند غروب الشمس في سيرينجيتي – كل ذلك من راحة <strong>سيارات السفاري المتاحة للكراسي المتحركة</strong> المجهزة خصيصًا.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">موثوق وآمن</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                مشغل سفاري مرخص في شرق إفريقيا بخبرة تزيد عن 15 عامًا. <strong>سيارات سفاري</strong> مؤمنة بالكامل، وسائقون مدربون، ودعم على مدار الساعة.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">مرشدون محليون خبراء</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                مرشدون معتمدون يتقنون الإنجليزية والسواحيلية وسلوك الحياة البرية. شغوفون بـ <strong>ماساي مارا</strong> و<strong>سيرينجيتي</strong> و<strong>trekking الغوريلا في رواندا</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Accessibility className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">رحلات سفاري متاحة بالكامل</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>سيارات سفاري متاحة للكراسي المتحركة</strong>، و<strong>مخيمات ونزل متاحة للكراسي المتحركة</strong>، وموظفون مدربون لتجربة <strong>سفاري كاملة</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">حائز على جوائز</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                معترف به في السياحة المستدامة، والسفر الشامل، و<strong>باقات سفاري شرق إفريقيا</strong> التي لا تُنسى.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* العروض الخاصة */}
      <section className="py-16" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              عروض سفاري خاصة لفترة محدودة
            </h2>
            <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
                وفر على <strong>جولات مشاهدة الهجرة الكبرى</strong>، <strong>باقات السفاري المتاحة للكراسي المتحركة</strong> في كينيا وتنزانيا ورواندا وأوغندا.
              </p>
            </div>
          </div>

          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              لا تفوت <strong>باقات السفاري</strong> الحصرية المصممة لـ <strong>جولات السفاري المتاحة للكراسي المتحركة في كينيا</strong> مع <strong>سيارات سفاري</strong> مجهزة بالكامل وإقامة في <strong>نزل صديقة لذوي الاحتياجات الخاصة</strong> فاخرة.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialOffers.map((tour) => (
              <div key={tour.id} className="relative">
                <div className="absolute -left-2 -top-2 z-10 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground shadow-lg">
                  وفر ${tour.originalPrice! - tour.price}
                </div>
                <TourCard tour={tour} showOriginalPrice />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/ar/tours">
                عرض جميع باقات السفاري <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* الجولات المميزة */}
      <section className="py-16 bg-muted/10" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              تجارب سفاري مميزة في شرق إفريقيا
            </h2>
            <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
                <strong>تجارب سفاري</strong> مختارة بعناية مع <strong>مخيمات ونزل</strong> مريحة و<strong>سيارات سفاري متاحة للكراسي المتحركة</strong> اختيارية.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/ar/tours">
                استكشف جميع الجولات <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* الوجهات */}
      <section className="border-t border-border bg-muted/30 py-16" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">استكشف أفضل وجهات السفاري في شرق إفريقيا</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                تقدم شرق إفريقيا بعضًا من أكثر وجهات السفاري روعة في العالم لـ <strong>رحلات السفاري المتاحة للكراسي المتحركة في كينيا</strong>.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/ar/destinations">
                عرض جميع الوجهات <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* قسم تجربة السفاري الكاملة */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              تجربة السفاري الكاملة – من الفجر حتى الغسق
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">جولات مشاهدة الحيوانات الصباحية</h3>
              <p className="text-muted-foreground leading-relaxed">
                اختبر صحو أفريقيا في <strong>جولات مشاهدة الحيوانات</strong> الصباحية باستخدام <strong>سيارات سفاري متاحة للكراسي المتحركة</strong>.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">لقاءات ثقافية</h3>
              <p className="text-muted-foreground leading-relaxed">
                إلى جانب الحياة البرية، تشمل <strong>تجارب السفاري</strong> لدينا تفاعلات ثقافية هادفة.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">أماكن إقامة فاخرة</h3>
              <p className="text-muted-foreground leading-relaxed">
                ارتح إلى <strong>النزل الصديقة لذوي الاحتياجات الخاصة</strong> التي اخترناها بعناية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم جولات السفاري المتاحة للكراسي المتحركة */}
      <section className="py-16 bg-primary/5" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              جولات سفاري متاحة للكراسي المتحركة في كينيا – مغامرات سفاري خالية من العوائق
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              اختبر أفضل <strong>رحلات السفاري المتاحة للكراسي المتحركة في كينيا</strong> من خلال جولاتنا المصممة خصيصًا.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">سيارات مجهزة بالكامل</h3>
              <p className="text-muted-foreground">
                تتميز <Link href="/ar/disability-tours" className="text-primary hover:underline">جولات السفاري المتاحة للكراسي المتحركة في كينيا</Link> لدينا برافعات هيدروليكية.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">أماكن إقامة متاحة</h3>
              <p className="text-muted-foreground">
                أقيم في نزل ومخيمات فاخرة مع حمامات دخول لرحلتك <strong>لسفاري متاحة للكراسي المتحركة في كينيا</strong>.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">مرشدون خبراء في accessibility</h3>
              <p className="text-muted-foreground">
                يتلقى مرشدونا تدريبًا متخصصًا لـ <Link href="/ar/disability-tours" className="text-primary hover:underline">جولات ذوي الاحتياجات الخاصة في كينيا</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="py-16 bg-muted/20" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              الأسئلة الشائعة حول رحلات السفاري المتاحة للكراسي المتحركة في كينيا
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {(() => {
              const faqPage = homepageSchema["@graph"].find(
                (item: any) => item?.["@type"] === "FAQPage"
              );
              return faqPage?.mainEntity?.map((faq: any, i: number) => (
                <div key={i} className="border rounded-xl p-6 bg-card">
                  <h3 className="text-xl font-bold mb-3">{faq.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              )) ?? <p className="text-center text-muted-foreground py-8">جاري تحميل الأسئلة...</p>;
            })()}
          </div>
        </div>
      </section>

      {/* الشهادات والدعوة النهائية */}
      <section className="border-t border-border bg-muted/30 py-16" dir="rtl">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            ماذا يقول ضيوف السفاري لدينا
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "سارة جونسون",
                location: "الولايات المتحدة",
                text: "كانت <Link href=\"/maasai-mara-great-migration\" className=\"text-primary hover:underline\">رحلة سفاري ماساي مارا</Link> ساحرة!",
                rating: 5,
              },
              {
                name: "ديفيد تشين",
                location: "كندا",
                text: "كمستخدم للكرسي المتحرك، لم أعتقد أبدًا أنني سأقوم برحلة سفاري. جعلتها جا ترافيل ممكنة – أفضل <Link href=\"/ar/disability-tours\" className=\"text-primary hover:underline\">رحلات سفاري متاحة للكراسي المتحركة في كينيا</Link>.",
                rating: 5,
              },
              {
                name: "إيما ويليامز",
                location: "المملكة المتحدة",
                text: "كان trekking الغوريلا في رواندا تجربة غيرت حياتي.",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الدعوة النهائية للحجز */}
      <section className="py-16" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
            هل أنت مستعد لتجربة سفاري لا تنسى؟
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            سواء كنت تحلم بـ <strong>جولات مشاهدة الحيوانات</strong> الكلاسيكية أو <strong>سفاري متاحة للكراسي المتحركة</strong> بالكامل، اتصل بنا اليوم.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/ar/contact">احصل على عرض سعر مخصص</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                راسلنا على واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}