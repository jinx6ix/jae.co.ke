// app/ar/cultural-tours/page.tsx
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
  Utensils
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

// استيراد البيانات من النسخة العربية
import { tours } from "@/lib/i18n/data/ar/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "cultural-tours",
  title: "الجولات الثقافية وجولات المدن 2026 | قرى الماساي، ستون تاون وكيغالي | جايه ترافيل إكسبديشنز",
  description: "انغمس في ثقافات شرق أفريقيا الغنية. قم بزيارة قرى الماساي، واستكشف شوارع ستون تاون القديمة، واكتشف تاريخ كيغالي، وجرِّب التقاليد المحلية. تجارب ثقافية بصحبة مرشدين ابتداءً من 80 دولاراً أمريكياً.",
  h1: "الجولات الثقافية",
  h1Sub: "وجولات المدن 2026",
  subtitle: "انغمس في التراث الغني لشرق أفريقيا – تقاليد الماساي، تاريخ ستون تاون، وثقافة رواندا",
  featuredToursTitle: "باقات التجارب الثقافية",
  filterFn: (tour: any) => 
    tour.category?.includes("Cultural") ||
    tour.category?.includes("Heritage") ||
    tour.category?.includes("City Tour") ||
    tour.category?.includes("Food & Drink") ||
    tour.slug.includes("cultural") ||
    tour.slug.includes("maasai") ||
    tour.slug.includes("stone-town") ||
    tour.slug.includes("kigali") ||
    tour.slug.includes("carnivore") ||
    tour.slug.includes("distillery") ||
    tour.slug.includes("nyamirambo"),
}

const culturalTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "جولات ثقافية شرق أفريقيا",
    "زيارة قرية الماساي",
    "جولة ستون تاون زنجبار",
    "جولة مدينة كيغالي رواندا",
    "مطعم كارنيفور نيروبي",
    "مركز نياميرامبو النسائي",
    "مصنع ثاوزند هيلز للمشروبات الروحية",
    "جولة ثقافية أروشا",
    "تجارب ثقافة شرق أفريقيا",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/cultural-tours",
    languages: {
      "ar": "/ar/cultural-tours",
      "en-US": "/en-us/cultural-tours",
      "en-GB": "/en-gb/cultural-tours",
    },
  },
  openGraph: {
    title: "الجولات الثقافية وجولات المدن 2026 | الماساي، ستون تاون وكيغالي",
    description: "انغمس في ثقافات شرق أفريقيا الغنية. زيارات القرى، المواقع التاريخية، والتقاليد المحلية.",
    images: [{
      url: "/og/cultural-2026.jpg",
      width: 1200,
      height: 630,
      alt: "تجربة ثقافية مع قبيلة الماساي",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "الجولات الثقافية وجولات المدن 2026 | تجارب شرق أفريقيا",
    description: "انغمس في التراث الثقافي الغني لشرق أفريقيا.",
    images: ["/twitter/cultural-2026.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/ar/cultural-tours#product",
      name: "باقات التجارب الثقافية 2026",
      description: "جولات ثقافية وجولات مدن بصحبة مرشدين في جميع أنحاء شرق أفريقيا.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "80",
        highPrice: "650",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: culturalTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "320",
      },
    },
  ],
}

export default function CulturalToursPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="cultural-tours"
        categoryOpts={{
          title: "جولات ثقافية في شرق أفريقيا — الماساي، السواحيلية والمزيد",
          description: "تجارب ثقافية أصيلة في شرق أفريقيا. زيارات قرى الماساي، تراث سواحيلية، وانغماس محلي.",
          image: "/safari-guides-with-tourists-in-africa.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("cultural") || (t.title && t.title.toLowerCase().includes("cultural")) || (t.description && t.description.toLowerCase().includes("cultural"))) : [],
        }}
      />
      {/* نص JSON-LD */}
      <JsonLd data={jsonLd} id={"cultural-tours-schema"} />
      
      <div className="min-h-screen bg-white" dir="rtl">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== الشريط العلوي ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="text-sm">متخصصون في السفاري حول العالم</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="text-sm">نيروبي، كينيا • كارين راوند أباوت</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-purple-400">
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
                <Phone className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== مسار التصفح ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="مسار التصفح">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-purple-600 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/safari-types" className="hover:text-purple-600 transition">أنواع السفاري</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">الجولات الثقافية وجولات المدن 2026</li>
            </ol>
          </nav>
          
          {/* ========== قسم البطل ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* شارات الثقة */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Users className="h-3.5 w-3.5" />
                قرى الماساي
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <BookOpen className="h-3.5 w-3.5" />
                تراث ستون تاون
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Utensils className="h-3.5 w-3.5" />
                تجارب الطهي
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-purple-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-purple-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.7/5</div>
                <div className="text-sm text-gray-500">من أكثر من 320 تقييم</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">أكثر من 15</div>
                <div className="text-sm text-gray-500">تجربة ثقافية</div>
                <div className="text-xs text-gray-400 mt-1">في 4 دول</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">80$</div>
                <div className="text-sm text-gray-500">السعر الابتدائي</div>
                <div className="text-xs text-gray-400 mt-1">جولات نصف يوم</div>
              </div>
            </div>

            {/* أزرار الحث على اتخاذ إجراء */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-purple-600 hover:bg-purple-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="ml-3 h-5 w-5" /> 
                  عرض الجولات الثقافية
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/contact">
                  <MessageCircle className="ml-3 h-5 w-5" /> 
                  خطِّط تجربتك حسب رغبتك
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== عرض الثقافات حسب البلد ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-purple-600 mb-4">
                لقاءات أصيلة
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                تجارب ثقافية حسب البلد
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇰🇪 كينيا</h3>
                <ul className="space-y-2 text-sm">
                  <li>• زيارات قرى الماساي</li>
                  <li>• مطعم كارنيفور</li>
                  <li>• حديقة نيروبي الوطنية</li>
                  <li>• متحف كارين بليكسن</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇹🇿 تنزانيا</h3>
                <ul className="space-y-2 text-sm">
                  <li>• ستون تاون اليونسكو</li>
                  <li>• جولات التوابل في زنجبار</li>
                  <li>• جولة أروشا الثقافية</li>
                  <li>• شعب هادزابي</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇷🇼 رواندا</h3>
                <ul className="space-y-2 text-sm">
                  <li>• جولة مدينة كيغالي</li>
                  <li>• نصب الإبادة الجماعية</li>
                  <li>• مركز نياميرامبو النسائي</li>
                  <li>• مصنع ثاوزند هيلز</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">🇺🇬 أوغندا</h3>
                <ul className="space-y-2 text-sm">
                  <li>• جولة مدينة كمبالا</li>
                  <li>• تراث بوغاندا</li>
                  <li>• مركز نديري الثقافي</li>
                  <li>• منبع النيل</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== جولات مميزة ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-purple-600 mb-4">
                اختر تجربتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                مرشدون محليون • تجارب أصيلة • جميع رسوم الدخول • انتقالات
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {culturalTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "تجربة ثقافية أصيلة مع مرشدين محليين."}
                  price={tour.price ?? 80}
                  rating={tour.rating ?? 4.7}
                  reviewCount={tour.reviewCount ?? 60 + index * 10}
                  location={tour.country || "شرق أفريقيا"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="جميع الرسوم مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug}`}
                  badge={tour.category?.includes("City Tour") ? "🏙️ جولة مدينة" : "🎭 ثقافي"}
                  pickup="استلام من الفندق/المطار متاح"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 rounded-full"
              >
                <Link href="/ar/tours?category=cultural">
                  عرض كل الجولات الثقافية <span className="mr-2">←</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== شهادة عميل ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-16 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <Music className="h-12 w-12 text-purple-600 mx-auto mb-6" />
                <p className="text-2xl italic text-gray-700 mb-6">
                  "كانت زيارة قرية الماساي أبرز ما في رحلتنا. الرقص مع المحاربين، والتعرف على تقاليدهم، وتناول وجبة مع عائلة محلية أعطانا ذكريات سنعتز بها إلى الأبد."
                </p>
                <div className="font-medium">— سارة ومايكل، أستراليا</div>
                <div className="text-sm text-gray-500 mt-2">تجربة ثقافة الماساي، 2025</div>
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
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                هل أنت مستعد للتواصل مع ثقافات شرق أفريقيا؟
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                تعرَّف على قبيلة الماساي، استكشف ستون تاون، اكتشف كيغالي، وتذوق النكهات المحلية.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-purple-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
                >
                  <Link href="/ar/booking">
                    <Calendar className="ml-2 h-5 w-5" /> 
                    احجز تجربتك
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