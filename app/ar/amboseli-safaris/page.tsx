// app/ar/amboseli-safaris/page.tsx
import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Star, 
  Shield, 
  Award, 
  Zap, 
  Mountain, 
  Camera, 
  Info, 
  Lightbulb, 
  CheckCircle, 
  TrendingUp, 
  Video, 
  MapPin, 
  HelpCircle, 
  Globe, 
  Users, 
  Clock, 
  Phone,
  Mail,
  MessageCircle,
  CreditCard,
  Heart,
  Compass,
  Sunrise,
  Sunset,
  Eye,
  ThumbsUp,
  Droplets,
  Trees,
  Baby,
  Footprints,
  Cloud
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

// استيراد البيانات من النسخة العربية
import { tours } from "@/lib/i18n/data/ar/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "amboseli-safaris",
  title: "سفاري أمبوسيلي 2026 | الفيلة ومناظر جبل كليمنجارو",
  description:
    "سفاري أمبوسيلي 2026: الفيلة، صغارها حديثي الولادة ومناظر جبل كليمنجارو. رحلات سفاري خاصة بمركبات 4x4 من نيروبي. ابتداءً من 1,150 دولاراً شاملاً كل شيء.",
  h1: "سفاري أمبوسيلي",
  h1Sub: "2026",
  subtitle: "حيث تلتقي عائلات الفيلة الضخمة بأعلى جبل في أفريقيا – استمرار طفرة المواليد مع أكثر من 220 مولوداً جديداً",
  featuredToursTitle: "باقات سفاري أمبوسيلي",
  filterFn: (tour: any) => 
    tour.destinations?.includes("amboseli") || 
    tour.slug.includes("amboseli") ||
    (tour.title && tour.title.toLowerCase().includes("amboseli")),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

const fallbackImages = [
  "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "سفاري أمبوسيلي 2026",
    "طفرة مواليد الفيلة في أمبوسيلي 2026",
    "أفضل سفاري أمبوسيلي من نيروبي 2026",
    "باقة سفاري أمبوسيلي وكليمنجارو",
    "سفاري أمبوسيلي خاصة 2026",
    "أسعار سفاري منتزه أمبوسيلي الوطني 2026",
    "سفاري الفيلة في كينيا",
    "سفاري مع إطلالة جبل كليمنجارو",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/amboseli-safaris",
    languages: {
      "ar": "/ar/amboseli-safaris",
      "en-US": "/en-us/amboseli-safaris",
      "en-GB": "/en-gb/amboseli-safaris",
    },
  },
  openGraph: {
    title: "سفاري أمبوسيلي 2026 | طفرة مواليد الفيلة وكليمنجارو | جايه ترافيل إكسبديشنز",
    description: "شاهد أكثر من 220 مولوداً جديداً من الفيلة على خلفية جبل كليمنجارو. رحلات سفاري خاصة من نيروبي. شركة مشغلة في كينيا منذ 2015.",
    images: [{
      url: "/og/amboseli-2026.jpg",
      width: 1200,
      height: 630,
      alt: "فيلة مع جبل كليمنجارو في أمبوسيلي، كينيا",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "سفاري أمبوسيلي 2026 | طفرة مواليد الفيلة وكليمنجارو",
    description: "شاهد أكثر من 220 مولوداً جديداً من الفيلة على خلفية جبل كليمنجارو. احجز سفاري 2026.",
    images: ["/twitter/amboseli-2026.jpg"],
    creator: "@jaetravel",
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

// JSON-LD Schema بالعربية
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "جايه ترافيل إكسبديشنز",
      address: {
        "@type": "PostalAddress",
        streetAddress: "كارين راوند أباوت",
        addressLocality: "نيروبي",
        addressRegion: "مقاطعة نيروبي",
        addressCountry: "KE",
      },
      telephone: "+254726485228",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1200",
      },
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/ar/amboseli-safaris#product",
      name: "باقات سفاري أمبوسيلي 2026",
      description: "رحلات سفاري خاصة بصحبة مرشدين إلى منتزه أمبوسيلي الوطني، تشمل عائلات الفيلة ومناظر كليمنجارو.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "1150",
        highPrice: "2800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "10",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "420",
      },
    },
    {
      "@type": "TouristTrip",
      name: "سفاري فيلة أمبوسيلي",
      description: "تعقب عائلات الفيلة الضخمة على خلفية جبل كليمنجارو.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "منتزه أمبوسيلي الوطني",
          description: "موطن لأكثر من 2000 فيل مع أكثر من 220 مولوداً جديداً في 2025-2026",
        },
        {
          "@type": "TouristDestination",
          name: "تل المراقبة",
          description: "إطلالات بانورامية على المنتزه وجبل كليمنجارو",
        },
      ],
    },
  ],
}

export default function AmboseliSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="amboseli-safaris"
        categoryOpts={{
          title: "رحلات سفاري منتزه أمبوسيلي الوطني في كينيا",
          description: "سفاري أمبوسيلي مع إطلالات على كليمنجارو. قطعان الفيلة، الحيوانات الخمسة الكبار، ونزل فاخرة.",
          image: "/Amboseli-National-Park-Elephantsssss.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("amboseli") || (t.title && t.title.toLowerCase().includes("amboseli")) || (t.description && t.description.toLowerCase().includes("amboseli"))) : [],
        }}
      />
      {/* نص JSON-LD */}
      <JsonLd data={jsonLd} />
      
      <div className="min-h-screen bg-white" dir="rtl">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== الشريط العلوي ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm">متخصصون في السفاري حول العالم</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">نيروبي، كينيا • كارين راوند أباوت</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-green-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="mr-1 text-sm font-medium text-gray-700">أكثر من 1,200 تقييم</span>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== مسار التصفح ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="مسار التصفح">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-green-600 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/destinations" className="hover:text-green-600 transition">الوجهات</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/kenya" className="hover:text-green-600 transition">كينيا</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">سفاري أمبوسيلي 2026</li>
            </ol>
          </nav>
          
          {/* ========== قسم البطل ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* شارات الثقة */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
                <Baby className="h-3.5 w-3.5" />
                أكثر من 220 مولوداً جديداً
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Mountain className="h-3.5 w-3.5" />
                إطلالات على كليمنجارو
              </span>
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Footprints className="h-3.5 w-3.5" />
                رحلات سفاري خاصة بمركبات 4x4
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-green-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            {/* العنوان الفرعي */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* إحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="flex justify-center text-green-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">من أكثر من 1,200 تقييم</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">2,000+</div>
                <div className="text-sm text-gray-500">فيل</div>
                <div className="text-xs text-gray-400 mt-1">أكثر من 220 مولوداً جديداً 2025-26</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">90$</div>
                <div className="text-sm text-gray-500">رسوم المنتزه</div>
                <div className="text-xs text-gray-400 mt-1">مشمولة في الباقات</div>
              </div>
            </div>

            {/* أزرار الحث على اتخاذ إجراء */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-green-600 hover:bg-green-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/tours/amboseli-elephant-safari">
                  <Calendar className="ml-3 h-5 w-5" /> 
                  عرض باقات 2026
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/contact">
                  <MessageCircle className="ml-3 h-5 w-5" /> 
                  خطِّط رحلتك حسب رغبتك
                </Link>
              </Button>
            </div>

            {/* مواقع الاستلام */}
            <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                <Compass className="h-4 w-4" />
                يمكن الاستلام من:
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">نيروبي (كينيا)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">مطار جومو كينياتا</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">مطار ويلسون</span>
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm shadow-sm">قيادة 3-4 ساعات</span>
              </div>
            </div>
          </header>
          
          {/* ========== لماذا شركة مشغلة في كينيا ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* العمود الأيمن (نظراً للـ RTL) */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-green-300 mb-6">
                    لماذا تختارنا
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    خبراء أمبوسيلي
                    <span className="block text-green-300 mt-2">على بعد 3 ساعات فقط من نيروبي</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    نحن مقرنا في نيروبي، في موقع مثالي لنقدم لك رحلات سفاري سلسة إلى أمبوسيلي. مرشدونا لديهم عقود من الخبرة مع عائلات الفيلة الشهيرة في المنتزه.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "مرشدون خبراء يعرفون عائلات الفيلة بأسمائها",
                      "تتبع طفرة المواليد 2025-2026 - أكثر من 220 مولوداً جديداً",
                      "التوقيت المثالي لتصوير شروق الشمس مع كليمنجارو",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* العمود الأيسر - حقائق سريعة */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-green-300" />
                    حقائق أمبوسيلي 2026
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">المسافة من نيروبي</span>
                      <span className="text-white font-medium">3-4 ساعات</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">عدد أعداد الفيلة</span>
                      <span className="text-white font-medium">أكثر من 2,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">المواليد الجدد (2025-26)</span>
                      <span className="text-white font-medium">أكثر من 220</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">أفضل شهور الزيارة</span>
                      <span className="text-white font-medium">يونيو-أكتوبر، يناير-فبراير</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-green-300">
                      رسوم المنتزه: 90 دولاراً للفرد البالغ - مشمولة في جميع الباقات
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== تقرير الحياة البرية المباشر ========== */}
          <section className="mb-40">
            <LiveWildlifeReport />
          </section>
          
          {/* ========== فيديو أبرز اللقطات ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                جرِّب التجربة
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                عمالقة أمبوسيلي
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                شاهد عائلات الفيلة الضخمة مع صغارها المرحة على خلفية أعلى جبل في أفريقيا.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-amboseli-video-id" 
                title="سفاري فيلة أمبوسيلي - كينيا"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== طفرة المواليد ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                تحديث خاص
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                طفرة المواليد 2025-2026
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                بفضل الأمطار الغزيرة وجهود الحفاظ على البيئة، يشهد أمبوسيلي واحدة من أكبر طفرات مواليد الفيلة منذ عقود.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                    <Baby className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">أكثر من 220</div>
                    <p className="text-gray-600">مولوداً جديداً في 2025-26</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  تستمر الطفرة حتى عام 2026 مع تسجيل مواليد جديدة. توقع رؤية صغار مرحة تتلاسن في المستنقعات، ترضع، وتتعلم من الأمهات القائدات ذوات الخبرة.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                    <Mountain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">5,895م</div>
                    <p className="text-gray-600">جبل كليمنجارو</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  الخلفية المثالية لتصوير الفيلة. توفر الصباحات الجافة والواضحة مناظر مذهلة لأعلى قمة في أفريقيا مع الفيلة في المقدمة.
                </p>
              </div>
            </div>
          </section>
          
          {/* ========== أفضل وقت للزيارة ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                  خطِّط لزيارتك
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  أفضل وقت لزيارة أمبوسيلي
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium">موسم الجفاف الرئيسي</h3>
                  </div>
                  <p className="text-2xl font-light text-green-600 mb-3">يونيو – أكتوبر</p>
                  <p className="text-gray-600 mb-4">أفضل وضوح لكليمنجارو، تتجمع الحياة البرية حول المستنقعات، سماء صافية للتصوير.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">موسم القيمة المنخفضة</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">يناير – مارس</p>
                  <p className="text-gray-600 mb-4">رؤية جيدة، حشود أقل، مناظر طبيعية خضراء، ممتاز للحيوانات الصغيرة.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                تجنب أبريل ومايو (الأمطار الطويلة) للحصول على أجواء قيادة أكثر سلاسة.
              </p>
            </div>
          </section>
          
          {/* ========== ماذا سترى ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                أبرز معالم الحياة البرية
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                لحظات ساحرة في انتظارك
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🐘</div>
                <h3 className="font-medium mb-2">عائلات الفيلة</h3>
                <p className="text-sm text-gray-600">قطعان ضخمة مع صغار مرحة</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🏔️</div>
                <h3 className="font-medium mb-2">كليمنجارو</h3>
                <p className="text-sm text-gray-600">قمة مغطاة بالثلوج عند شروق الشمس</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦁</div>
                <h3 className="font-medium mb-2">القطط الكبيرة</h3>
                <p className="text-sm text-gray-600">أُسود وفهود على السهول</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦒</div>
                <h3 className="font-medium mb-2">طرائد السهول</h3>
                <p className="text-sm text-gray-600">زرافات، حمر وحشية، جاموس</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦅</div>
                <h3 className="font-medium mb-2">الطيور</h3>
                <p className="text-sm text-gray-600">أكثر من 400 نوع، فلامنجو</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">👥</div>
                <h3 className="font-medium mb-2">ثقافة الماساي</h3>
                <p className="text-sm text-gray-600">زيارات قروية اختيارية</p>
              </div>
            </div>
          </section>
          
          {/* ========== نصائح احترافية ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  نصائح احترافية لعام 2026
                </h2>
                <p className="text-gray-600">معرفة من الداخل لرحلة سفاري مثالية في أمبوسيلي.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">الأساسيات المطلوبة</h3>
                  <p className="text-sm text-gray-600">عدسة 200-600 مم، مناظير، وشاح للغبار، طبقات خفيفة للصباح الباكر.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">أفضل إضاءة</h3>
                  <p className="text-sm text-gray-600">رحلات السفاري عند الفجر لشروق الشمس مع الفيلة في المقدمة.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">دمج المناطق</h3>
                  <p className="text-sm text-gray-600">أضف تسافو أو ماساي مارا لمسارات مخصصة من 7 إلى 10 أيام.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== جولات مميزة ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-green-600 mb-4">
                اختر مغامرتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                مركبة 4x4 خاصة • مرشد خبراء • رسوم المنتزهات • جميع الوجبات • استلام من نيروبي
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "سفاري خاصة من نيروبي – صغار الفيلة، إطلالات كليمنجارو، إرشاد خبير."}
                  price={tour.price ?? 1150}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 150 + index * 25}
                  location="أمبوسيلي، كينيا"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="جميع رسوم المنتزهات مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug || "amboseli-2026"}`}
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
                <Link href="/ar/tours?destination=amboseli">
                  عرض كل جولات أمبوسيلي <span className="mr-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== قسم الأسئلة الشائعة ========== */}
          <section className="mb-40">
            <FaqSection />
          </section>
          
          {/* ========== شارات الثقة ========== */}
          <section className="mb-40">
            <TrustBadges />
          </section>
          
          {/* ========== دعوة أخيرة للعمل ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                هل أنت مستعد لمغامرتك في أمبوسيلي؟
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                أكثر من 220 مولوداً جديداً من الفيلة • إطلالات على كليمنجارو • رحلات سفاري خاصة • تواريخ الذروة تمتلئ بسرعة.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-green-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/ar/booking">
                    <Calendar className="ml-2 h-5 w-5" /> 
                    تحقق من التوفر
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/ar/contact">
                    <MessageCircle className="ml-2 h-5 w-5" /> 
                    راسلنا عبر واتساب
                  </Link>
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/20 text-sm text-white/60">
                <p>جايه ترافيل إكسبديشنز • كارين راوند أباوت، نيروبي، كينيا</p>
                <p className="mt-2">+254 726 485 228 • info@jaetravel.co.ke</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}