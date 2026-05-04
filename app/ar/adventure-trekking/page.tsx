// app/ar/adventure-trekking/page.tsx
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
  Flame
} from "lucide-react"
import TourCard from "@/components/TourCard"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/i18n/data/ar/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "adventure-trekking",
  title: "المغامرة والتسلق 2026 | كليمنجارو، جبل كينيا، وجبال الروينزوري",
  description:
    "تسلق جبل كليمنجارو، جبل كينيا وجبال الروينزوري مع مرشدين خبراء. رحلات تسلق آمنة ومصحوبة في شرق أفريقيا ابتداءً من 1,100 دولار.",
  h1: "المغامرة والتسلق",
  h1Sub: "2026",
  subtitle: "تحدَّ أعلى قمم أفريقيا – كليمنجارو، جبل كينيا وجبال القمر",
  featuredToursTitle: "باقات المغامرة والتسلق",
  filterFn: (tour: any) => 
    tour.category?.includes("Mountain Climbing") ||
    tour.category?.includes("Mountain Trekking") ||
    tour.category?.includes("Adventure") ||
    tour.slug.includes("kilimanjaro") ||
    tour.slug.includes("mount-kenya") ||
    tour.slug.includes("rwenzori") ||
    tour.slug.includes("climbing") ||
    tour.slug.includes("hiking") ||
    tour.slug.includes("trekking") ||
    tour.slug.includes("hells-gate") ||
    tour.slug.includes("jinja"),
}

const adventureTours = tours.filter(CONFIG.filterFn).slice(0, 12)

const fallbackImages = [
  "https://images.unsplash.com/photo-1547483238-f400e65ccd4f?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "تسلق كليمنجارو 2026",
    "تسلق جبل كينيا",
    "مشي جبال الروينزوري",
    "تسلق جبال أفريقيا",
    "طريق ماشامي كليمنجارو",
    "قمة لينانا جبل كينيا",
    "التجديف في جينجا",
    "ركوب الدراجات في هيلز جيت",
    "جولات المغامرة في شرق أفريقيا",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/adventure-trekking",
    languages: {
      "ar": "/ar/adventure-trekking",
      "en-US": "/en-us/adventure-trekking",
      "en-GB": "/en-gb/adventure-trekking",
    },
  },
  openGraph: {
    title: "المغامرة والتسلق 2026 | كليمنجارو، جبل كينيا والروينزوري",
    description: "تحدَّ نفسك بأعظم مسارات المشي في شرق أفريقيا. مرشدون خبراء، بروتوكولات أمان، وقمم لا تُنسى.",
    images: [{
      url: "/og/adventure-2026.jpg",
      width: 1200,
      height: 630,
      alt: "مغامرة تسلق جبل كليمنجارو",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "المغامرة والتسلق 2026 | كليمنجارو وجبل كينيا",
    description: "تسلَّق أعلى قمم أفريقيا مع مرشدين خبراء.",
    images: ["/twitter/adventure-2026.jpg"],
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
      name: "JAÉ Travel Expeditions | جايه ترافيل إكسبديشنز",
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
      "@id": "https://www.jaetravel.co.ke/ar/adventure-trekking#product",
      name: "باقات المغامرة والتسلق 2026",
      description: "رحلات مصحوبة إلى أعلى قمم شرق أفريقيا تشمل كليمنجارو، جبل كينيا، وروينزوري.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "350",
        highPrice: "3800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: adventureTours.length.toString(),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "380",
      },
    },
  ],
}

export default function AdventureTrekkingPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="adventure-trekking"
        categoryOpts={{
          title: "جولات المغامرة والتسلق في شرق أفريقيا",
          description: "تسلق الجبال، المشي لمسافات طويلة، وجولات المغامرة في شرق أفريقيا. كليمنجارو، جبل كينيا والمزيد.",
          image: "/kilimanjaro-moutain-climbing.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("trek") || t.title?.toLowerCase().includes("trek") || t.description?.toLowerCase().includes("trek")) : [],
        }}
      />
      {/* نص JSON-LD */}
      <JsonLd data={jsonLd} id="adventure-schema" />
      
      <div className="min-h-screen bg-white" dir="rtl">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== الشريط العلوي ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-orange-600" />
                <span className="text-sm">متخصصون في السفاري حول العالم</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span className="text-sm">نيروبي، كينيا • كارين راوند أباوت</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-orange-400">
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
                <Phone className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== مسار التصفح ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="مسار التصفح">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-orange-600 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/safari-types" className="hover:text-orange-600 transition">أنواع السفاري</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">المغامرة والتسلق 2026</li>
            </ol>
          </nav>
          
          {/* ========== قسم البطل ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* شارات الثقة */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm border border-orange-100">
                <Mountain className="h-3.5 w-3.5" />
                كليمنجارو (5,895م)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Tent className="h-3.5 w-3.5" />
                جبل كينيا (4,985م)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Flame className="h-3.5 w-3.5" />
                الروينزوري (5,109م)
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-orange-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-orange-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-500">من أكثر من 380 تقييم</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">5,895م</div>
                <div className="text-sm text-gray-500">كليمنجارو</div>
                <div className="text-xs text-gray-400 mt-1">أعلى قمة في أفريقيا</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1,100$</div>
                <div className="text-sm text-gray-500">السعر الابتدائي</div>
                <div className="text-xs text-gray-400 mt-1">رحلات شاملة</div>
              </div>
            </div>

            {/* أزرار الحث على اتخاذ إجراء */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-orange-600 hover:bg-orange-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="#tours">
                  <Calendar className="ml-3 h-5 w-5" /> 
                  عرض باقات التسلق
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-orange-600 hover:text-orange-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/contact">
                  <MessageCircle className="ml-3 h-5 w-5" /> 
                  خطِّط لصعودك
                </Link>
              </Button>
            </div>
          </header>
          
          {/* ========== عرض الجبال ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                الثلاثة الكبار
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                أعلى قمم شرق أفريقيا
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">جبل كليمنجارو</h3>
                <p className="text-3xl font-light text-orange-600 mb-4">5,895م</p>
                <p className="text-gray-700 mb-4">أعلى قمة في أفريقيا. مسارات متعددة: ماشامي، مارانجو، ليموشو، رونجاي.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• مسارات من 5 إلى 9 أيام</li>
                  <li className="flex items-center gap-2">• لا يحتاج إلى تسلق فني</li>
                  <li className="flex items-center gap-2">• تصل لقمة أوهورو</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">جبل كينيا</h3>
                <p className="text-3xl font-light text-green-600 mb-4">4,985م</p>
                <p className="text-gray-700 mb-4">ثاني أعلى قمة في أفريقيا. طرق ذات مناظر خلابة عبر مناطق جبال الألب.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• قمة لينانا للمشي</li>
                  <li className="flex items-center gap-2">• مسار سيريمون / تشوجوريا</li>
                  <li className="flex items-center gap-2">• رحلات من 4 إلى 6 أيام</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">جبال الروينزوري</h3>
                <p className="text-3xl font-light text-blue-600 mb-4">5,109م</p>
                <p className="text-gray-700 mb-4">جبال القمر. نباتات جبلية فريدة وأنهار جليدية.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• قمة مارغريتا</li>
                  <li className="flex items-center gap-2">• مسيرات من 7 إلى 10 أيام</li>
                  <li className="flex items-center gap-2">• تضاريس صعبة</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== أنشطة المغامرة الإضافية ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                مغامرات أكثر
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                إلى ما وراء الجبال
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🚴</div>
                <h3 className="font-bold text-lg mb-2">ركوب الدراجات في هيلز جيت</h3>
                <p className="text-sm text-gray-600">تجول بالدراجة عبر الوديان الدرامية مع الحمير الوحشية والزرافات.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-bold text-lg mb-2">التجديف في المياه البيضاء</h3>
                <p className="text-sm text-gray-600">منحدرات من الدرجة الخامسة على نهر النيل في جينجا، أوغندا.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="text-4xl mb-3">🥾</div>
                <h3 className="font-bold text-lg mb-2">جولات السفاري سيرًا على الأقدام</h3>
                <p className="text-sm text-gray-600">جولات طبيعة بصحبة مرشدين في لايكيبيا، سامبورو، والمزيد.</p>
              </div>
            </div>
          </section>
          
          {/* ========== جولات مميزة ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                اختر مغامرتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                مرشدون جبليون معتمدون • بروتوكولات أمان • جميع رسوم المنتزهات • معدات عالية الجودة • إقامة
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {adventureTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "مغامرة تسلق بصحبة مرشدين في جبال شرق أفريقيا."}
                  price={tour.price ?? 1100}
                  rating={tour.rating ?? 4.8}
                  reviewCount={tour.reviewCount ?? 80 + index * 15}
                  location={tour.country || "شرق أفريقيا"}
                  imageUrl={tour.image || fallbackImages[index % fallbackImages.length]}
                  checkInText="جميع رسوم المنتزهات مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug}`}
                  badge={tour.title.includes("Kilimanjaro") ? "🏔️ قمة" : index === 0 ? "الأكثر مبيعًا" : undefined}
                  pickup="نيروبي • أروشا • عنتيبي"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-orange-600 hover:text-orange-600 rounded-full"
              >
                <Link href="/ar/tours?category=adventure">
                  عرض كل المغامرات <span className="mr-2">←</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== أفضل وقت ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-orange-600 mb-4">
                  خطِّط لصعودك
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  أفضل وقت للتسلق
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-medium">الموسم الجاف</h3>
                  </div>
                  <p className="text-2xl font-light text-orange-600 mb-3">يونيو – أكتوبر</p>
                  <p className="text-gray-600 mb-4">أفضل الظروف لجميع الجبال. سماء صافية وطقس مستقر.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">الجفاف القصير</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">يناير – مارس</p>
                  <p className="text-gray-600 mb-4">ظروف جيدة، عدد أقل من المتسلقين، رؤية ممتازة.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                تجنب الأمطار الطويلة (أبريل-مايو، نوفمبر) للحصول على أفضل ظروف التسلق.
              </p>
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
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                هل أنت مستعد للوصول إلى آفاق جديدة؟
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                تسلق كليمنجارو، اجتز جبل كينيا، أو اكتشف الروينزوري. مرشدون خبراء وصعود آمن.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-orange-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
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