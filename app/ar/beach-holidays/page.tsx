// app/ar/beach-holidays/page.tsx
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
  Trees,
  Droplets,
  Bird,
  Footprints,
  Tent,
  Flame,
  BookOpen,
  Music,
  Utensils,
  Waves,
  Fish,
  Umbrella
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

// استيراد البيانات من النسخة العربية
import { tours } from "@/lib/i18n/data/ar/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "beach-holidays",
  title: "عطلات الشاطئ والجزر 2026 | زنجبار، دياني ومومباسا",
  description:
    "استرخِ على أفضل شواطئ شرق أفريقيا: زنجبار، دياني، بمبا ومومباسا. رمال بيضاء، غوص، منتجعات وهروب إلى الجزر ابتداءً من 350 دولاراً.",
  h1: "عطلة الشاطئ",
  h1Sub: "والجزر 2026",
  subtitle: "الجنة الموجودة – رمال بيضاء، مياه فيروزية، وهروب إلى الجزر على طول الساحل البكر لشرق أفريقيا",
  featuredToursTitle: "باقات عطلات الشاطئ",
  filterFn: (tour: any) => 
    tour.category?.includes("Beach") ||
    tour.category?.includes("Island") ||
    tour.category?.includes("Diving") ||
    tour.slug.includes("zanzibar") ||
    tour.slug.includes("diani") ||
    tour.slug.includes("mombasa") ||
    tour.slug.includes("pemba") ||
    tour.slug.includes("beach") ||
    tour.slug.includes("coastal") ||
    tour.slug.includes("ssese") ||
    tour.slug.includes("bunyonyi") ||
    tour.slug.includes("kivu") ||
    tour.slug.includes("relaxation"),
}

const beachTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "عطلات شاطئ زنجبار 2026",
    "شاطئ دياني كينيا",
    "سفاري ساحلي مومباسا",
    "غوص جزيرة بمبا",
    "جزر سيسي أوغندا",
    "استرخاء بحيرة بونيوني",
    "بحيرة كيفو رواندا",
    "منتجعات شاطئ شرق أفريقيا",
    "عطلات شاطئ المحيط الهندي",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/beach-holidays",
    languages: {
      "ar": "/ar/beach-holidays",
      "en-US": "/en-us/beach-holidays",
      "en-GB": "/en-gb/beach-holidays",
    },
  },
  openGraph: {
    title: "عطلات الشاطئ والجزر 2026 | زنجبار، دياني ومومباسا",
    description: "استرخِ على شواطئ شرق أفريقيا البكر. رمال بيضاء، مياه فيروزية ومنتجعات فاخرة.",
    images: [{
      url: "/og/beach-2026.jpg",
      width: 1200,
      height: 630,
      alt: "جنة شاطئ زنجبار",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "عطلات الشاطئ والجزر 2026 | ساحل شرق أفريقيا",
    description: "الجنة موجودة على شواطئ شرق أفريقيا البكر.",
    images: ["/twitter/beach-2026.jpg"],
    creator: "@jaetravel",
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
      "@id": "https://www.jaetravel.co.ke/ar/beach-holidays#product",
      name: "باقات عطلات الشاطئ 2026",
      description: "عطلات شاطئية فاخرة وهروب إلى الجزر على طول ساحل شرق أفريقيا وبحيراتها.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "350",
        highPrice: "2500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: beachTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "450",
      },
    },
  ],
}

export default function BeachHolidaysPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="beach-holidays"
        categoryOpts={{
          title: "عطلات شاطئ شرق أفريقيا — زنجبار ودياني",
          description: "اجمع بين السفاري والشاطئ على ساحل المحيط الهندي في كينيا وتنزانيا. باقات زنجبار وشاطئ دياني.",
          image: "/zanzibar-stone-town-view-min-800x600.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("beach") || (t.title && t.title.toLowerCase().includes("beach")) || (t.description && t.description.toLowerCase().includes("beach"))) : [],
        }}
      />
      {/* نص JSON-LD */}
      <JsonLd data={jsonLd} id="beach-schema" />
      
      <div className="min-h-screen bg-white" dir="rtl">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== الشريط العلوي ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm">متخصصون في السفاري حول العالم</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">نيروبي، كينيا • كارين راوند أباوت</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-blue-400">
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
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== مسار التصفح ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="مسار التصفح">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-blue-400 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/safari-types" className="hover:text-blue-400 transition">أنواع السفاري</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">عطلات الشاطئ والجزر 2026</li>
            </ol>
          </nav>
          
          {/* ========== قسم البطل ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* شارات الثقة */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Umbrella className="h-3.5 w-3.5" />
                زنجبار
              </span>
              <span className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-sm border border-cyan-100">
                <Waves className="h-3.5 w-3.5" />
                شاطئ دياني
              </span>
              <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm border border-teal-100">
                <Fish className="h-3.5 w-3.5" />
                غوص بمبا
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-blue-400 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-blue-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-500">من أكثر من 450 تقييم</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">أكثر من 12</div>
                <div className="text-sm text-gray-500">وجهة شاطئية</div>
                <div className="text-xs text-gray-400 mt-1">محيط وبحيرات</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">350$</div>
                <div className="text-sm text-gray-500">السعر الابتدائي</div>
                <div className="text-xs text-gray-400 mt-1">عطلات شاطئية</div>
              </div>
            </div>

            {/* أزرار الحث على اتخاذ إجراء */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-blue-400 hover:bg-blue-500 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="ml-3 h-5 w-5" /> 
                  عرض باقات الشاطئ
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-400 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/contact">
                  <MessageCircle className="ml-3 h-5 w-5" /> 
                  خطِّط هروبك
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== وجهات الشاطئ ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                الجنة الموجودة
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                أروع شواطئ شرق أفريقيا
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇹🇿</div>
                <h3 className="font-bold text-lg mb-2">زنجبار</h3>
                <p className="text-sm text-gray-600 mb-3">تنزانيا</p>
                <p className="text-xs">نونغوي، كيندوا، باجي. جولات التوابل، ستون تاون، الغوص.</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇰🇪</div>
                <h3 className="font-bold text-lg mb-2">شاطئ دياني</h3>
                <p className="text-sm text-gray-600 mb-3">كينيا</p>
                <p className="text-xs">رمال بيضاء، شعاب مرجانية، رياضات مائية، منتجعات شاطئية.</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇹🇿</div>
                <h3 className="font-bold text-lg mb-2">جزيرة بمبا</h3>
                <p className="text-sm text-gray-600 mb-3">تنزانيا</p>
                <p className="text-xs">غوص عالمي المستوى، شواطئ بكر، مزارع القرنفل.</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇰🇪</div>
                <h3 className="font-bold text-lg mb-2">مومباسا</h3>
                <p className="text-sm text-gray-600 mb-3">كينيا</p>
                <p className="text-xs">ثقافة ساحلية، حصن يسوع، شاطئ نيالي، المأكولات المحلية.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇺🇬</div>
                <h3 className="font-bold text-lg mb-2">جزر سيسي</h3>
                <p className="text-sm text-gray-600 mb-3">أوغندا</p>
                <p className="text-xs">شواطئ بحيرة فيكتوريا، التنقل بين الجزر، الاسترخاء.</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇺🇬</div>
                <h3 className="font-bold text-lg mb-2">بحيرة بونيوني</h3>
                <p className="text-sm text-gray-600 mb-3">أوغندا</p>
                <p className="text-xs">ثاني أعمق بحيرة في أفريقيا. التجديف، مراقبة الطيور، الاسترخاء.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🇷🇼</div>
                <h3 className="font-bold text-lg mb-2">بحيرة كيفو</h3>
                <p className="text-sm text-gray-600 mb-3">رواندا</p>
                <p className="text-xs">شواطئ بحيرة جميلة، جولات في الجزر، ثقافة القهوة.</p>
              </div>
            </div>
          </section>
          
          {/* ========== أنشطة الشاطئ ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                إلى ما وراء الشاطئ
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                الأنشطة والتجارب
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🤿</div>
                <h3 className="font-bold text-lg mb-2">الغوص</h3>
                <p className="text-sm text-gray-600">بمبا، زنجبار، دياني. شعاب مرجانية، حطام سفن، حياة بحرية.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🏄</div>
                <h3 className="font-bold text-lg mb-2">الرياضات المائية</h3>
                <p className="text-sm text-gray-600">ركوب الأمواج شراعيًا، الغطس، الكاياك، التجديف واقفاً.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🛶</div>
                <h3 className="font-bold text-lg mb-2">الرحلات بالقوارب</h3>
                <p className="text-sm text-gray-600">رحلات الغروب، التنقل بين الجزر، رحلات الصيد.</p>
              </div>
            </div>
          </section>
          
          {/* ========== مزيج السفاري والشاطئ المثالي ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  مزيج السفاري والشاطئ المثالي
                </h2>
                <p className="text-lg text-gray-600">
                  ادمج مغامرتك مع الحياة البرية مع الاسترخاء على الشاطئ. المسار النهائي لشرق أفريقيا.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">سفاري كينيا + شاطئ دياني</h3>
                  <p className="text-gray-600 mb-4">7-10 أيام: ماساي مارا/أمبوسيلي + استرخاء في شاطئ دياني</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">• سفاري الحيوانات الخمسة الكبار في ماساي مارا</li>
                    <li className="flex items-center gap-2">• الفيلة في أمبوسيلي مع كليمنجارو</li>
                    <li className="flex items-center gap-2">• 3-4 أيام في منتجعات شاطئ دياني</li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">سفاري تنزانيا + زنجبار</h3>
                  <p className="text-gray-600 mb-4">10-14 يومًا: المسار الشمالي + هروب إلى شاطئ زنجبار</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">• سفاري سيرينجيتي وفوهة نغورونغورو</li>
                    <li className="flex items-center gap-2">• مشاهدة الهجرة الكبرى (موسمية)</li>
                    <li className="flex items-center gap-2">• 4-5 أيام في زنجبار</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== جولات مميزة ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                اختر هروبك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                منتجعات على الشاطئ • خيارات شاملة • أنشطة مائية • انتقالات من المطار
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-8">
              {beachTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "استرخِ على شواطئ شرق أفريقيا البكر مع أماكن إقامة فاخرة."}
                  price={tour.price ?? 350}
                  rating={tour.rating ?? 4.8}
                  reviewCount={tour.reviewCount ?? 70 + index * 15}
                  location={tour.country || "شرق أفريقيا"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="منتجع على الشاطئ"
                  href={tour.url || `/ar/tours/${tour.slug}`}
                  badge={tour.slug.includes("zanzibar") ? "🏝️ زنجبار" : "🏖️ شاطئ"}
                  pickup="الانتقالات من وإلى المطار مشمولة"
                />
              ))}
            </div>
            
            <div className="text-center mt-16 pb-8">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-400 rounded-full"
              >
                <Link href="/ar/tours?category=beach">
                  عرض كل عطلات الشاطئ <span className="mr-2">←</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== أفضل وقت للزيارة ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-blue-400 mb-4">
                  خطِّط لزيارتك
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  أفضل وقت لعطلات الشاطئ
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium">الموسم الجاف</h3>
                  </div>
                  <p className="text-2xl font-light text-blue-400 mb-3">يونيو – أكتوبر</p>
                  <p className="text-gray-600 mb-4">طقس شاطئي مثالي. أيام مشمسة، بحار هادئة، ممتاز للرياضات المائية.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">الأمطار القصيرة</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">يناير – مارس</p>
                  <p className="text-gray-600 mb-4">طقس دافئ، حشود أقل، قيمة جيدة. زخات بعد الظهر قصيرة.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                من الأفضل تجنب الأمطار الطويلة (أبريل-مايو) لعطلات الشاطئ. نوفمبر-ديسمبر جيد أيضاً.
              </p>
            </div>
          </section>
          
          {/* ========== شهادة عميل ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-16 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <Umbrella className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <p className="text-2xl italic text-gray-700 mb-6">
                  "بعد رحلة السفاري، أمضينا 5 أيام في زنجبار. المزيج المثالي - حياة برية مذهلة متبوعة باسترخاء تام على تلك الشواطئ الرائعة. رحلة الغروب بالمركب التقليدي كانت ساحرة."
                </p>
                <div className="font-medium">— ديفيد وإيما، المملكة المتحدة</div>
                <div className="text-sm text-gray-500 mt-2">باقة السفاري وزنجبار المشتركة، 2025</div>
              </div>
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
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                هل أنت مستعد للهروب إلى الجنة؟
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                الرمال البيضاء في زنجبار، شواطئ دياني التي تظللها أشجار النخيل، غوص بمبا، أو هدوء بحيرة بونيوني.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-blue-400 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/ar/booking">
                    <Calendar className="ml-2 h-5 w-5" /> 
                    احجز هروبك الشاطئي
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