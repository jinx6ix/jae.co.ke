// app/ar/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "./TourCard"
import HeroCarousel from "./HeroCarousel"
import { tours, toursOnOffer } from "@/lib/i18n/data/ar/tours-data"
import { destinations } from "@/lib/destinations-data"
import DestinationCard from "./DestinationCard"
import { ArrowRight, Shield, Users, Award, Accessibility, Star, Globe, Heart, Zap } from "lucide-react"

// ==================================================
// COMPLETE ARABIC HOMEPAGE SCHEMA (فهرس البيانات المهيكلة)
// ==================================================
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/ar/#organization",
      "name": "رحلات جي تريل",
      "url": "https://www.jaetravel.co.ke/ar",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "خدمة العملاء",
        "areaServed": ["KE", "TZ", "RW", "UG"],
        "availableLanguage": ["العربية", "English"]
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jaetravel.co.ke/ar/#business",
      "name": "رحلات جي تريل – جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026",
      "description": "أكبر مشغل سفاري متكيف في شرق أفريقيا يقدم سيارات لاند كروزر برافعات هيدروليكية ألمانية (سعة 400 كجم)، ونزل صديقة لذوي الإعاقة، وهجرة الحيتان في ماساي مارا، وتتبع الغوريلا.",
      "url": "https://www.jaetravel.co.ke/ar",
      "telephone": "+254726485228",
      "image": "https://www.jaetravel.co.ke/accessible-safari-wheelchair.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "08:00",
        "closes": "18:00"
      },
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
          "author": { "@type": "Person", "name": "ديفيد تشن" },
          "datePublished": "2025-08-20",
          "reviewBody": "كمستخدم كرسي متحرك كامل الوقت، لم أتخيل أبداً أن أرى الأسود في ماساي مارا. السيارة المزودة برافعة هيدروليكية كانت مثالية – تجربة سفاري متكيفة غيرت حياتي."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "سارة جونسون" },
          "datePublished": "2025-07-15",
          "reviewBody": "استأجرت سيارة لاند كروزر متكيفة لسفاري خاص – أفضل قرار لجولات سفاري متكيفة في كينيا."
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "تأجير مركبة سفاري متكيفة مع الكراسي المتحركة كينيا 2026",
          "description": "استأجر سيارات لاند كروزر 4×4 مجهزة بالكامل برافعات هيدروليكية ألمانية وأسقف قابلة للرفع.",
          "url": "https://www.jaetravel.co.ke/ar/vehicle-hire",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/ar/#website",
      "url": "https://www.jaetravel.co.ke/ar",
      "name": "رحلات جي تريل",
      "publisher": { "@id": "https://www.jaetravel.co.ke/ar/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/#webpage",
      "url": "https://www.jaetravel.co.ke/ar",
      "name": "جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026 | مركبات برافعة هيدروليكية",
      "description": "أفضل مشغل سفاري متكيف في كينيا. سيارات برافعات هيدروليكية ألمانية، نزل صديقة لذوي الإعاقة، مواعيد هجرة ماساي مارا 2026.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/ar/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/ar/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.jaetravel.co.ke/ar" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "هل تقدمون مركبات سفاري متكيفة مع الكراسي المتحركة؟",
          "acceptedAnswer": { "@type": "Answer", "text": "نعم – نحن نشغل الأسطول الوحيد في كينيا من سيارات لاند كروزر 4×4 المخصصة برافعات هيدروليكية ألمانية وأسقف قابلة للرفع." }
        },
        {
          "@type": "Question",
          "name": "هل يمكنني البقاء في كرسيي المتحرك أثناء جولات مشاهدة الحيوانات؟",
          "acceptedAnswer": { "@type": "Answer", "text": "نعم – تم تصميم مركباتنا لتبقى في كرسيك المتحرك طوال الرحلة مع أنظمة تثبيت بسعة 400 كجم." }
        }
      ]
    }
  ]
}

// ==================================================
// DYNAMIC OG IMAGE FOR ARABIC HOMEPAGE
// ==================================================
export const generateMetadata = async (): Promise<Metadata> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"

  const ogImageUrl = new URL("/api/og", baseUrl)
  ogImageUrl.searchParams.set("title", "جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026")
  ogImageUrl.searchParams.set("image", `${baseUrl}/accessible-safari-wheelchair.jpg`)
  ogImageUrl.searchParams.set("locale", "ar") // enables RTL in your API

  return {
    title: "جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026 | جولات ميسرة لذوي الاحتياجات الخاصة",
    description: "احجز رحلة سفاري متكيفة مع الكراسي المتحركة في كينيا مع مركبات معدلة ونزل ملائمة لذوي الإعاقة ومرشدين خبراء. جرب ماساي مارا وتتبع الغوريلا في شرق أفريقيا.",
    keywords: [
      "جولات سفاري متكيفة مع الكراسي المتحركة في كينيا",
      "جولات سفاري متكيفة 2026",
      "سفاري متكيف كينيا",
      "جولات متكيفة مع الكراسي المتحركة في كينيا",
      "مركبات سفاري متكيفة كينيا",
      "رافعة هيدروليكية سفاري كينيا",
      "جولات الإعاقة كينيا",
      "سفاري شامل كينيا",
      "سفاري ماساي مارا متكيف",
      "تتبع الغوريلا متكيف رواندا"
    ],
    openGraph: {
      title: "جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026 | مركبات رفع هيدروليكية + جولات ميسرة",
      description: "مشغل السفاري المتكيف الرائد في شرق أفريقيا مع مركبات هيدروليكية ألمانية ونزل ملائمة لذوي الإعاقة وباقات هجرة الحيتان الكبرى في ماساي مارا 2026.",
      images: [{ url: ogImageUrl.toString() }],
      type: "website",
      locale: "ar_AR",
    },
    twitter: {
      card: "summary_large_image",
      title: "جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026 | مركبات رفع هيدروليكية + جولات ميسرة",
      description: "مشغل السفاري المتكيف الرائد في شرق أفريقيا مع مركبات هيدروليكية ألمانية ونزل ملائمة لذوي الإعاقة.",
      images: [ogImageUrl.toString()],
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/ar",
      languages: {
        ar: "https://www.jaetravel.co.ke/ar",
        en: "https://www.jaetravel.co.ke",
        "x-default": "https://www.jaetravel.co.ke",
      },
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
}

// ==================================================
// MAIN PAGE COMPONENT (نفس الأقسام مع دعم RTL)
// ==================================================
export default function HomePage() {
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

      <div dir="rtl">
        <HeroCarousel />

        {/* القسم التعريفي */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h1 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
              جولات سفاري متكيفة مع الكراسي المتحركة في كينيا 2026 – أفضل جولات ميسرة ومغامرات الحياة البرية
            </h1>
            <div className="mb-12 max-w-5xl mx-auto text-center space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                مرحباً بكم في رحلات جي تريل – المشغل رقم 1 في كينيا لـ <strong>جولات السفاري المتكيفة مع الكراسي المتحركة</strong> و <strong>الجولات الميسرة في كينيا</strong>. 
                مركباتنا المزودة برافعات هيدروليكية ألمانية والنزل الصديقة لذوي الإعاقة تجعل هجرة ماساي مارا وسيرينجيتي وتتبع الغوريلا متاحة بالكامل.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                سواء كنت تبحث عن جولات سفاري فاخرة أو لقاءات حميمية مع الرئيسيات، فإن فريقنا الخبير يصمم جولات شخصية تناسب احتياجاتك.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">موثوق وآمن</h3>
                <p className="text-sm text-muted-foreground">مرخص بأكثر من 15 عاماً من الخبرة. مركبات سفاري مؤمنة بالكامل وسائقون مدربون.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">مرشدون محليون خبراء</h3>
                <p className="text-sm text-muted-foreground">مرشدون معتمدون يتحدثون الإنجليزية والسواحيلية ويفهمون سلوك الحياة البرية.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Accessibility className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">سفاري متكيف بالكامل</h3>
                <p className="text-sm text-muted-foreground">مركبات سفاري مجهزة، مخيمات ونزل صديقة لذوي الإعاقة، وموظفون مدربون.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">حائز على جوائز</h3>
                <p className="text-sm text-muted-foreground">معترف به للسياحة المستدامة والسفر الشامل وباقات سفاري شرق أفريقيا.</p>
              </div>
            </div>
          </div>
        </section>

        {/* العروض الخاصة */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">عروض سفاري خاصة لفترة محدودة</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">وفر على باقات هجرة الحيتان وجولات السفاري المتكيفة في كينيا وتنزانيا ورواندا وأوغندا.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {specialOffers.map((tour) => (
                <div key={tour.id} className="relative">
                  <div className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground shadow-lg">
                    وفر ${tour.originalPrice! - tour.price}
                  </div>
                  <TourCard tour={tour} showOriginalPrice />
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/ar/tours">
                  عرض كل الباقات <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* الجولات المميزة */}
        <section className="py-16 bg-muted/10">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">تجارب سفاري مميزة في شرق أفريقيا</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/ar/tours">
                  استكشف كل الجولات <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* الوجهات */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold">استكشف أفضل وجهات السفاري في شرق أفريقيا</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {destinations.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/ar/destinations">
                  عرض كل الوجهات <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* قسم المركبات المتطورة */}
        <section className="py-16 bg-muted/10">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">أكثر مركبات السفاري تطوراً في كينيا 2026</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <h3 className="font-semibold text-xl mb-3">نظام رفع هيدروليكي ألماني</h3>
                <p className="text-muted-foreground">سعة 400 كجم – ادخل واخرج من مركبة السفاري دون مغادرة كرسيك المتحرك.</p>
              </div>
              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <h3 className="font-semibold text-xl mb-3">تثبيت طبي بأربع نقاط</h3>
                <p className="text-muted-foreground">أحزمة معتمدة من ISO تبقي كرسيك ثابتاً أثناء جولات المشاهدة.</p>
              </div>
              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <h3 className="font-semibold text-xl mb-3">مقصورة بانورامية واسعة</h3>
                <p className="text-muted-foreground">مقاعد قابلة للإزالة وتكييف هواء لجولات مريحة.</p>
              </div>
              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <h3 className="font-semibold text-xl mb-3">حقيبة طبية وأمان على متنها</h3>
                <p className="text-muted-foreground">مستلزمات طبية كاملة وسائقون مدربون لراحة البال.</p>
              </div>
            </div>
          </div>
        </section>

        {/* قسم الأسئلة الشائعة */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">الأسئلة الشائعة حول جولات السفاري المتكيفة في كينيا</h2>
            <div className="space-y-8 max-w-4xl mx-auto">
              {(
                homepageSchema["@graph"] as any[]
              ).find((item: any) => item["@type"] === "FAQPage")?.mainEntity?.map((faq: any, i: number) => (
                <div key={i} className="border rounded-xl p-6 bg-card">
                  <h3 className="text-xl font-bold mb-3">{faq.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الآراء والدعوة للتواصل */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">ماذا يقول ضيوف سفاري لدينا</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { name: "سارة جونسون", location: "الولايات المتحدة", text: "كانت رحلة ماساي مارا ساحرة!", rating: 5 },
                { name: "ديفيد تشن", location: "كندا", text: "كمستخدم كرسي متحرك، لم أعتقد أبداً أنني سأذهب في سفاري. جي تريل جعلتها ممكنة – أفضل جولة سفاري متكيفة في كينيا.", rating: 5 },
                { name: "إيما ويليامز", location: "بريطانيا", text: "تتبع الغوريلا في رواندا غيّر حياتي.", rating: 5 },
              ].map((t, i) => (
                <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">هل أنت مستعد لتجربة سفاري لا تُنسى؟</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              سواء كنت تحلم بجولات رصد الحيوانات الكلاسيكية أو بسفاري متكيف بالكامل، اتصل بنا اليوم.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/ar/contact">احصل على عرض سعر مخصص</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  واتساب
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}