// app/ar/vehicle-hire/page.tsx
// صفحة تأجير مركبات السفاري بالكامل – النسخة العربية
// المخطط: AutoRental، ItemList، FAQPage، BreadcrumbList

import type { Metadata } from "next"
import Link from "next/link"
import { vehicles } from "@/lib/i18n/data/ar/vehicles-data"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"
import {
  MapPin, Shield, Clock, PhoneCall, Star, CheckCircle,
  ChevronLeft, ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"

// ── البيانات الوصفية (SEO) ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "تأجير مركبات سفاري في كينيا | استئجار لاند كروزر وفان سياحي في نيروبي",
  description:
    "استأجر مركبات سفاري في كينيا من 80 دولارًا في اليوم. لاند كروزر 4x4 وفانات لماساي مارا وأمبوسيلي وتسافو.",
  keywords: [
    "تأجير مركبات سفاري كينيا",
    "استئجار لاند كروزر 4x4 سفاري كينيا",
    "تأجير فان سياحي نيروبي",
    "استئجار جيب سفاري كينيا",
    "تأجير لاند كروزر مع سائق كينيا",
    "تأجير سيارة سفاري بالقيادة الذاتية كينيا",
    "تأجير مركبات سفاري ماساي مارا",
    "أسعار تأجير مركبات سفاري كينيا",
    "استئجار فان سفاري بسقف قابل للرفع نيروبي",
    "تأجير لاند كروزر 4x4 مع سائق كينيا",
  ],
  alternates: {
    canonical: `${BASE_URL}/ar/vehicle-hire`,
    languages: {
      ar: `${BASE_URL}/ar/vehicle-hire`,
      en: `${BASE_URL}/vehicle-hire`,
      "x-default": `${BASE_URL}/vehicle-hire`,
    },
  },
  openGraph: {
    title: "تأجير مركبات سفاري في كينيا | استئجار لاند كروزر 4x4 وفان سياحي",
    description:
      "استأجر مركبات سفاري في كينيا من 80 دولارًا في اليوم. أسطول من لاند كروزر 4x4 وفانات سفاري لماساي مارا وأمبوسيلي وتسافو — مع سائق أو بالقيادة الذاتية.",
    type: "website",
    url: `${BASE_URL}/ar/vehicle-hire`,
    images: [
      {
        url: `${BASE_URL}/og-vehicle-hire.jpg`,
        width: 1200,
        height: 630,
        alt: "تأجير مركبات سفاري في كينيا — أسطول لاند كروزر 4x4",
      },
    ],
    siteName: "رحلات جي تريل",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "تأجير مركبات سفاري في كينيا | استئجار لاند كروزر 4x4 من 80 دولارًا/اليوم",
    description:
      "أسطول من لاند كروزر 4x4 وفانات سفاري. ماساي مارا، أمبوسيلي، تسافو. مع سائق أو بالقيادة الذاتية. مؤمن بالكامل.",
    images: [`${BASE_URL}/og-vehicle-hire.jpg`],
    creator: "@jaetravel",
    site: "@jaetravel",
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

// ── البيانات المنظمة (Structured Data) ──────────────────────────────────────
function StructuredData() {
  // 1. AutoRental (منظمة الأعمال)
  const autoRentalSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${BASE_URL}/ar#organization`,
    name: "رحلات جي تريل",
    description:
      "شركة تأجير مركبات سفاري الرائدة في كينيا تقدم لاند كروزر 4x4، وفانات سفاري، ومركبات فاخرة، ومركبات سفاري متاحة لذوي الإعاقة للقيادة الذاتية والرحلات المصحوبة بمرشدين في كينيا وتنزانيا وأوغندا ورواندا.",
    url: `${BASE_URL}/ar`,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 300,
      height: 100,
    },
    image: `${BASE_URL}/og-vehicle-hire.jpg`,
    telephone: "+254726485228",
    email: "info@jaetravel.co.ke",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ويستلاندز بيزنس بارك",
      addressLocality: "نيروبي",
      addressRegion: "مقاطعة نيروبي",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2921,
      longitude: 36.8219,
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
        opens: "08:00",
        closes: "14:00",
      },
    ],
    priceRange: "80–180 دولارًا/اليوم",
    currenciesAccepted: "USD, KES",
    paymentAccepted: "بطاقة ائتمان، تحويل بنكي، إم-بيزا",
    areaServed: [
      { "@type": "Country", name: "كينيا" },
      { "@type": "Country", name: "تنزانيا" },
      { "@type": "Country", name: "أوغندا" },
      { "@type": "Country", name: "رواندا" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "أسطول مركبات السفاري",
      itemListElement: vehicles.map((v, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: v.name,
        description: v.description,
        priceCurrency: "USD",
        price: v.pricePerDay,
        url: `${BASE_URL}/ar/vehicle-hire/${v.slug}`,
        availability: v.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemOffered: {
          "@type": "Car",
          name: v.name,
          brand: { "@type": "Brand", name: v.brand || "Toyota" },
          model: v.model || "",
          image: v.image.startsWith("http") ? v.image : `${BASE_URL}${v.image}`,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 750,
      bestRating: 5,
    },
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
      "https://twitter.com/jaetravel",
      "https://www.tripadvisor.com/jaetravel",
    ],
    inLanguage: "ar",
  }

  // 2. ItemList للمركبات
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مركبات سفاري للإيجار في كينيا",
    description:
      "أسطول كامل من لاند كروزر 4x4 وفانات سفاري متاحة للإيجار في جميع أنحاء كينيا وتنزانيا وأوغندا.",
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.name,
      url: `${BASE_URL}/ar/vehicle-hire/${v.slug}`,
      image: v.image.startsWith("http") ? v.image : `${BASE_URL}${v.image}`,
      description: v.description,
    })),
  }

  // 3. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE_URL}/ar` },
      {
        "@type": "ListItem",
        position: 2,
        name: "تأجير مركبات سفاري في كينيا",
        item: `${BASE_URL}/ar/vehicle-hire`,
      },
    ],
  }

  // 4. WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/ar/vehicle-hire#webpage`,
    url: `${BASE_URL}/ar/vehicle-hire`,
    name: "تأجير مركبات سفاري في كينيا | لاند كروزر 4x4 وفان سياحي",
    description:
      "استأجر مركبات سفاري في كينيا. لاند كروزر 4x4 وفانات سفاري لماساي مارا وأمبوسيلي وتسافو من 80 دولارًا/اليوم.",
    inLanguage: "ar",
    isPartOf: { "@id": `${BASE_URL}/ar#website` },
    about: { "@id": `${BASE_URL}/ar#organization` },
    dateModified: new Date().toISOString(),
  }

  const schemas = [autoRentalSchema, itemListSchema, breadcrumbSchema, webPageSchema, faqSchema]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

// ── إشارات الثقة ─────────────────────────────────────────────────────────────
const trustSignals = [
  { icon: Shield, label: "أسطول مؤمن بالكامل", sub: "تغطية شاملة" },
  { icon: Clock, label: "دعم على الطريق 24/7", sub: "في جميع أنحاء شرق أفريقيا" },
  { icon: MapPin, label: "تغطية 4 دول", sub: "كينيا · تنزانيا · أوغندا · رواندا" },
  { icon: Star, label: "تقييم 4.9 / 5", sub: "750+ تقييم موثوق" },
]

// ── الوجهات ──────────────────────────────────────────────────────────────────
const destinations = [
  { name: "محمية ماساي مارا الوطنية", href: "/ar/destinations/masai-mara" },
  { name: "منتزه أمبوسيلي الوطني", href: "/ar/destinations/amboseli" },
  { name: "تسافو إيست وويست", href: "/ar/destinations/tsavo" },
  { name: "محمية سامبورو الوطنية", href: "/ar/destinations/samburu" },
  { name: "منتزه بحيرة ناكورو الوطني", href: "/ar/destinations/lake-nakuru" },
  { name: "سيرينجيتي — تنزانيا", href: "/ar/destinations/serengeti" },
]

// ── الأسئلة الشائعة (مرئية على الصفحة) ───────────────────────────────────────
const faqItems = [
  {
    q: "كم تكلفة استئجار مركبة سفاري في كينيا؟",
    a: "يبدأ استئجار مركبة سفاري في كينيا من 80 دولارًا في اليوم لفان تويوتا هايس سفاري (7 ركاب) وحتى 180 دولارًا في اليوم لرينج روفر سبورت 4x4 الفاخرة. تتراوح أسعار لاند كروزر 4x4 لدينا بين 95-120 دولارًا في اليوم. تشمل جميع الأسعار تأمينًا شاملاً ومساعدة على الطريق 24/7.",
  },
  {
    q: "هل يمكنني استئجار مركبة سفاري مع سائق في كينيا؟",
    a: "نعم. جميع المركبات في أسطولنا متاحة مع سائق/مرشد سفاري محترف يتحدث الإنجليزية مقابل 50-80 دولارًا إضافيًا في اليوم حسب المركبة. سائقونا معتمدون من KPSGA ولديهم خبرة 5-20 سنة.",
  },
  {
    q: "ما هي أفضل مركبة سفاري لماساي مارا؟",
    a: "تويوتا لاند كروزر برادو TX أو لاند كروزر 78 سيريز هما أفضل الخيارات. كلتاهما تتميز بسقف قابل للرفع ونظام دفع رباعي عالي التحمل وخلوص أرضي عالٍ.",
  },
  {
    q: "هل الوقود مشمول في سعر تأجير مركبة السفاري؟",
    a: "الوقود غير مشمول. يتم تسليم المركبات بخزان ممتلئ ويجب إعادتها ممتلئة. الديزل متوفر على نطاق واسع في كينيا.",
  },
  {
    q: "هل يمكنني أخذ المركبة عبر الحدود إلى تنزانيا أو أوغندا؟",
    a: "نعم. جميع مركباتنا مسموحة للسفر عبر الحدود. نقوم بمعالجة جميع التصاريح وتأمين COMESA والوثائق الجمركية. رسوم إضافية للتصريح عبر الحدود.",
  },
  {
    q: "هل تقدمون مركبات سفاري مناسبة للكراسي المتحركة؟",
    a: "نعم. فان السفاري المتاح لدينا مزود بمنحدر هيدروليكي ونظام تثبيت للكرسي المتحرك وسقف قابل للرفع. متاح من 130 دولارًا في اليوم.",
  },
]

// ═════════════════════════════════════════════════════════════════════════════
// مكون الصفحة الرئيسية
// ═════════════════════════════════════════════════════════════════════════════
export default function VehicleHirePage() {
  return (
    <>
      <StructuredData />

      <div dir="rtl">
        {/* ── مسار التنقل (Breadcrumb) ────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border bg-muted/40 py-3 text-sm"
        >
          <div className="container mx-auto px-4">
            <ol className="flex items-center gap-1 text-muted-foreground">
              <li>
                <Link href="/ar" className="hover:text-foreground transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li><ChevronLeft className="h-3 w-3" /></li>
              <li className="font-medium text-foreground">تأجير مركبات سفاري في كينيا</li>
            </ol>
          </div>
        </nav>

        {/* ── قسم البطل (Hero) ────────────────────────────────────────────── */}
        <header className="bg-gradient-to-br from-primary/10 via-background to-muted/30 py-20 md:py-28 text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              رقم 1 في تأجير مركبات السفاري في كينيا
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              استأجر مركبات سفاري في كينيا
              <span className="block text-primary mt-2">لاند كروزر وفانات سياحية</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              مركبات سفاري 4x4 موثوقة لشركات الجولات والمرشدين الخاصين والمسافرين المستقلين.
              ماساي مارا، أمبوسيلي، تسافو — مع سائق أو بالقيادة الذاتية. من{" "}
              <strong className="text-foreground">80 دولارًا/اليوم</strong>، مؤمنة بالكامل.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="#fleet">
                  استعرض أسطولنا <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  <PhoneCall className="ml-2 h-5 w-5" /> راسلنا على واتساب
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* ── شريط الثقة ────────────────────────────────────────────────────── */}
        <section className="border-y border-border bg-card py-8" aria-label="لماذا تختارنا">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustSignals.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── نص SEO تمهيدي ────────────────────────────────────────────────── */}
        <section className="py-14 bg-background" aria-labelledby="intro-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="intro-heading" className="text-3xl md:text-4xl font-bold mb-6 text-center">
              تأجير مركبات سفاري في كينيا — أسطولنا
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4 text-right">
              <p>
                هل تبحث عن استئجار مركبة سفاري في كينيا؟ تقدم رحلات جي تريل أسطولاً مجهزاً بالكامل من{" "}
                <strong className="text-foreground">لاند كروزر 4x4 للسفاري</strong> و{" "}
                <strong className="text-foreground">فانات سياحية بسقف قابل للرفع</strong> مصممة خصيصاً لأصعب تضاريس شرق أفريقيا.
                سواء كنت بحاجة إلى مركبة لـ{" "}
                <Link href="/ar/destinations/masai-mara" className="text-primary underline-offset-4 hover:underline">
                  محمية ماساي مارا الوطنية
                </Link>
                ،{" "}
                <Link href="/ar/destinations/amboseli" className="text-primary underline-offset-4 hover:underline">
                  منتزه أمبوسيلي الوطني
                </Link>
                ، أو رحلة عبر الحدود إلى{" "}
                <Link href="/ar/destinations/serengeti" className="text-primary underline-offset-4 hover:underline">
                  سيرينجيتي في تنزانيا
                </Link>
                ، فإن أسطولنا يوفر الراحة والموثوقية والأداء.
              </p>
              <p>
                كل مركبة في أسطولنا يتم صيانتها بدقة، ومؤمنة بالكامل، ومجهزة بنظام تحديد المواقع GPS،
                وحقيبة إسعافات أولية، ودعم على الطريق 24/7. اختر من بين{" "}
                <strong className="text-foreground">تويوتا لاند كروزر برادو TX</strong> (من 95 دولارًا/اليوم)،
                <strong className="text-foreground">لاند كروزر 78 سيريز</strong> الثقيلة للمجموعات (من 120 دولارًا/اليوم)،
                أو <strong className="text-foreground">فان تويوتا هايس سفاري</strong> الاقتصادي (من 80 دولارًا/اليوم).
                جميع المركبات متاحة{" "}
                <Link href="#with-driver" className="text-primary underline-offset-4 hover:underline">
                  مع سائق/مرشد محترف
                </Link>{" "}
                أو كـ{" "}
                <Link href="#self-drive" className="text-primary underline-offset-4 hover:underline">
                  مركبة سفاري بالقيادة الذاتية
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── شبكة المركبات ────────────────────────────────────────────────── */}
        <section id="fleet" className="py-16 bg-muted/20" aria-labelledby="fleet-heading">
          <div className="container mx-auto px-4">
            <h2 id="fleet-heading" className="text-3xl md:text-4xl font-bold text-center mb-3">
              مركبات سفاري متاحة للإيجار
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              جميع المركبات تشمل تأمينًا شاملاً ونظام GPS ودعمًا على الطريق 24/7.
              الأسعار بالدولار الأمريكي في اليوم باستثناء الوقود.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={{ ...vehicle, pricePerDay: vehicle.pricePerDay.toString() }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── جدول الأسعار ──────────────────────────────────────────────────── */}
        <section className="py-16 bg-background border-t border-border" aria-labelledby="pricing-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-center mb-3">
              أسعار تأجير مركبات السفاري في كينيا
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              أسعار شفافة — لا رسوم خفية. جميع الأسعار بالدولار الأمريكي في اليوم.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-right px-5 py-4 font-semibold">المركبة</th>
                    <th className="text-center px-4 py-4 font-semibold">السعة</th>
                    <th className="text-center px-4 py-4 font-semibold">القيادة</th>
                    <th className="text-left px-5 py-4 font-semibold">السعر (دولار/اليوم)</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <tr
                      key={v.id}
                      className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
                    >
                      <td className="px-5 py-4 font-medium text-right">
                        <Link
                          href={`/ar/vehicle-hire/${v.slug}`}
                          className="text-primary hover:underline underline-offset-4"
                        >
                          {v.name}
                        </Link>
                      </td>
                      <td className="text-center px-4 py-4 text-muted-foreground">
                        {v.capacity}
                      </td>
                      <td className="text-center px-4 py-4 text-muted-foreground">
                        {v.useCases?.includes("self-drive") ? "4x4" : "2WD"}
                      </td>
                      <td className="text-left px-5 py-4 font-bold text-primary">
                        ${v.pricePerDay}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              * السائق/المرشد: +50–80 دولارًا في اليوم. الوقود غير مشمول. تصاريح عبور الحدود متاحة عند الطلب.
            </p>
          </div>
        </section>

        {/* ── مع سائق أو قيادة ذاتية ────────────────────────────────────────── */}
        <section
          id="with-driver"
          className="py-16 bg-muted/20 border-t border-border"
          aria-labelledby="options-heading"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="options-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
              مع سائق أم قيادة ذاتية للسفاري؟
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* مع سائق */}
              <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-right">🧭 استئجار مع سائق/مرشد محترف</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-right">
                  سائقو/مرشدونا المعتمدون من KPSGA يتحدثون الإنجليزية بطلاقة، ويعرفون كل أثر حيوان في ماساي مارا،
                  ويتولون جميع الملاحة وصيانة المركبات، ويغطون إقامتهم الخاصة. الأفضل للمبتدئين ومنظمي الرحلات.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "معرفة خبراء بتتبع الحياة البرية",
                    "السائق يتحمل الوقود والملاحة والأعطال",
                    "لا يلزم وديعة تأمين",
                    "مثالي لشركات الجولات ووكلاء السفر",
                    "مرشدون متعددو اللغات متاحون",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link href="#fleet">عرض المركبات مع سائق</Link>
                </Button>
              </div>
              {/* قيادة ذاتية */}
              <div
                id="self-drive"
                className="rounded-2xl border-2 border-muted bg-card p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold mb-4 text-right">🚗 مركبة سفاري بالقيادة الذاتية</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-right">
                  أقصى مرونة — قد بسرعتك الخاصة، توقف أينما تشاء، وتخيم داخل المتنزهات الوطنية.
                  يتطلب تصريح قيادة دوليًا صالحًا وخبرة سابقة على الطرق الوعرة. مثالي لقائدي 4x4 ذوي الخبرة والمسافرين البريين.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "حرية كاملة — بدون برنامج ثابت",
                    "نظام GPS مع خرائط شرق أفريقيا غير المتصلة مشمول",
                    "دعم على الطريق 24/7 في جميع أنحاء شرق أفريقيا",
                    "خيار خيمة سقف للتخييم في المتنزهات",
                    "تصريح قيادة دولي مطلوب (23+)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/ar/vehicle-hire/${vehicles.find((v) => v.useCases?.includes("self-drive"))?.slug ?? ""}`}>
                    عرض مركبات القيادة الذاتية
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── الوجهات ──────────────────────────────────────────────────────── */}
        <section className="py-16 bg-background border-t border-border" aria-labelledby="destinations-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="destinations-heading" className="text-3xl font-bold text-center mb-3">
              أين يمكنك أخذ مركبات السفاري الخاصة بنا؟
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              أسطولنا مصرح به للمتنزهات الوطنية والسفر عبر الحدود والمسارات النائية.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destinations.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">
              السفر عبر الحدود متاح إلى تنزانيا وأوغندا ورواندا.{" "}
              <Link href="/ar/contact" className="text-primary hover:underline underline-offset-4">
                اتصل بنا
              </Link>{" "}
              لمعرفة أسعار تصاريح عبور الحدود.
            </p>
          </div>
        </section>

        {/* ── الأسئلة الشائعة (FAQ) ──────────────────────────────────────────── */}
        <section className="py-16 bg-muted/20 border-t border-border" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-6">
              {faqItems.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-right">{q}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm text-right">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── شريحة الحث على اتخاذ إجراء (CTA) ────────────────────────────────── */}
        <section className="py-20 bg-primary text-primary-foreground text-center" aria-label="احجز الآن">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل أنت مستعد لاستئجار مركبة سفاري في كينيا؟
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              احصل على عرض سعر فوري — لا حاجة لدفع وديعة حتى تأكيد الحجز.
              نرد خلال ساعتين.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8" asChild>
                <Link href="/ar/contact">احصل على عرض سعر مجاني</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  <PhoneCall className="ml-2 h-5 w-5" />
                  راسلنا على واتساب الآن
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}