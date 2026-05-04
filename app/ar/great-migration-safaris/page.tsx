import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/ar/great-migration-safaris/page.tsx
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
  Droplet,
  Trees,
  Waves
} from "lucide-react"
import TourCard from "@/components/TourCard"
import MigrationCalendar from "@/components/MigrationCalendar"
import LiveWildlifeReport from "@/components/LiveWildlifeReport"
import FaqSection from "@/components/FaqSection"
import TrustBadges from "@/components/TrustBadges"

import { tours } from "@/lib/i18n/data/ar/tours-data"
import JsonLd from "@/components/JsonLd"

const CONFIG = {
  slug: "great-migration-safaris",
  title: "رحلات الهجرة الكبرى 2026 | معابر نهر مارا وسيرينجيتي | جيه ترافيل إكسبديشنز",
  description: "شاهد الهجرة الكبرى للجاموس البري 2026 – معابر نهر مارا في ذروتها أغسطس-سبتمبر، موسم الولادات يناير-مارس. رحلات سفاري خاصة في ماساي مارا وسيرينجيتي تبدأ من 1,200 دولار أمريكي. مشغل كيني بخبرة محلية.",
  h1: "الهجرة الكبرى",
  h1Sub: "رحلات 2026",
  subtitle: "أكثر من 1.5 مليون جاموس بري – معابر نهرية ملحمية، دراما الولادات، وافتراسات مذهلة في كينيا وتنزانيا",
  featuredToursTitle: "باقات رحلات الهجرة الكبرى",
  filterFn: (tour: any) => 
    tour.destinations?.includes("serengeti") || 
    tour.destinations?.includes("masai-mara") ||
    tour.tags?.includes("migration") ||
    tour.slug.includes("migration") ||
    tour.slug.includes("mara"),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

const fallbackImages = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2000",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000",
]

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "رحلات الهجرة الكبرى 2026",
    "معابر نهر مارا ماساي مارا 2026",
    "هجرة الجاموس البري سيرينجيتي أغسطس سبتمبر",
    "موسم الولادات الهجرة الكبرى يناير مارس",
    "باقات هجرة ماساي مارا وسيرينجيتي",
    "أفضل وقت للهجرة الكبرى 2026",
    "سفاري معابر نهر مارا كينيا",
    "هجرة الجاموس البري تنزانيا كينيا",
    "رحلات الهجرة مع جيه ترافيل",
    "جولات سفاري شرق أفريقيا",
  ],
  authors: [{ name: "جيه ترافيل إكسبديشنز" }],
  creator: "جيه ترافيل إكسبديشنز",
  publisher: "جيه ترافيل إكسبديشنز",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/great-migration-safaris",
    languages: {
      "ar": "/ar/great-migration-safaris",
      "en-US": "/en-us/great-migration-safaris",
      "en-GB": "/en-gb/great-migration-safaris",
      "en-AU": "/en-au/great-migration-safaris",
    },
  },
  openGraph: {
    title: "رحلات الهجرة الكبرى 2026 | ماساي مارا وسيرينجيتي | جيه ترافيل إكسبديشنز",
    description: "شاهد أعظم مشهد بري على وجه الأرض. معابر نهر مارا، موسم الولادات، حركة الافتراسات. مشغلون خبراء كينيون منذ 2015.",
    images: [{
      url: "/og/great-migration-2026.jpg",
      width: 1200,
      height: 630,
      alt: "الهجرة الكبرى - الجاموس البري يعبر نهر مارا",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "جيه ترافيل إكسبديشنز",
  },
  twitter: {
    card: "summary_large_image",
    title: "رحلات الهجرة الكبرى 2026 | ماساي مارا وسيرينجيتي",
    description: "شاهد أعظم مشهد بري على وجه الأرض. احجز رحلة الهجرة 2026.",
    images: ["/twitter/great-migration.jpg"],
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

// JSON-LD Schema (Arabic context)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "جيه ترافيل إكسبديشنز",
      address: {
        "@type": "PostalAddress",
        streetAddress: "دوار كارين",
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
      "@id": "https://www.jaetravel.co.ke/ar/great-migration-safaris#product",
      name: "باقات رحلات الهجرة الكبرى 2026",
      description: "رحلات سفاري خاصة بصحبة مرشد لتتبع الهجرة الكبرى عبر ماساي مارا وسيرينجيتي.",
      brand: {
        "@type": "Brand",
        name: "جيه ترافيل إكسبديشنز",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "1200",
        highPrice: "8500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "18",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "750",
      },
    },
    {
      "@type": "TouristTrip",
      name: "رحلة سفاري الهجرة الكبرى - ماساي مارا وسيرينجيتي",
      description: "تتبع أعظم هجرة برية على وجه الأرض عبر كينيا وتنزانيا.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "محمية ماساي مارا الوطنية",
          description: "معابر نهر مارا الدرامية، ذروتها يوليو-أكتوبر",
        },
        {
          "@type": "TouristDestination",
          name: "منتزه سيرينجيتي الوطني",
          description: "سهول لا نهاية لها، موسم الولادات يناير-مارس",
        },
        {
          "@type": "TouristDestination",
          name: "منطقة نودوتو",
          description: "مناطق الولادة مع حركة افتراس مكثفة",
        },
      ],
    },
  ],
}

export default function GreatMigrationSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="great-migration-safaris"
        categoryOpts={{
          title: "رحلات الهجرة الكبرى في شرق أفريقيا 2026",
          description: "شاهد أعظم مشهد بري على وجه الأرض. باقات ماساي مارا وسيرينجيتي.",
          image: "/masai-mara-migration.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("migration") || t.title?.toLowerCase().includes("هجرة") || t.description?.toLowerCase().includes("هجرة")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd id="great-migration-safaris-schema" data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== TOP BAR - Minimal ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-amber-600" />
                <span className="text-sm">متخصصون عالميون في السفاري</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span className="text-sm">نيروبي، كينيا • دوار كارين</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="ml-1 text-sm font-medium text-gray-700">أكثر من 1200 تقييم</span>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== BREADCRUMBS - Clean ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-amber-600 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/destinations" className="hover:text-amber-600 transition">الوجهات</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/kenya-tanzania" className="hover:text-amber-600 transition">كينيا وتنزانيا</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">رحلات الهجرة الكبرى 2026</li>
            </ol>
          </nav>
          
          {/* ========== HERO - Spacious & Elegant ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* Trust badges - minimal */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm border border-amber-100">
                <Waves className="h-3.5 w-3.5" />
                معابر نهر مارا
              </span>
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm border border-orange-100">
                <Eye className="h-3.5 w-3.5" />
                موسم الولادات
              </span>
              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm border border-red-100">
                <Zap className="h-3.5 w-3.5" />
                حركة الافتراس
              </span>
            </div>

            {/* Main heading - elegant split */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-amber-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
                {CONFIG.h1Sub}
              </span>
            </h1>

            {/* Subtitle - elegant */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
              {CONFIG.subtitle}
            </p>

            {/* Stats - clean horizontal line */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="flex justify-center text-amber-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">من أكثر من 1200 تقييم</div>
              </div>
              
              <div className="text-center md:border-l md:border-r border-gray-100">
                <div className="text-2xl font-bold text-gray-900">1.5 مليون+</div>
                <div className="text-sm text-gray-500">جاموس بري وحمار وحشي</div>
                <div className="text-xs text-gray-400 mt-1">في حركة دائمة</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">8,000+</div>
                <div className="text-sm text-gray-500">ولادة يومياً</div>
                <div className="text-xs text-gray-400 mt-1">موسم الولادات يناير-مارس</div>
              </div>
            </div>

            {/* CTA Buttons - generous spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-amber-600 hover:bg-amber-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/tours/masai-mara-migration">
                  <Calendar className="mr-3 h-5 w-5" /> 
                  عرض باقات 2026
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600 rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/contact">
                  <MessageCircle className="mr-3 h-5 w-5" /> 
                  تخصيص رحلتك
                </Link>
              </Button>
            </div>

            {/* Pickup locations - minimal card */}
            <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                <Compass className="h-4 w-4" />
                يتوفر الاستلام من:
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">نيروبي (كينيا)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">أروشا (تنزانيا)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">مطار كليمنجارو</span>
                <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm shadow-sm">مسارات عبر الحدود</span>
              </div>
            </div>
          </header>
          
          {/* ========== WHY KENYA-BASED OPERATOR ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left column */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-amber-300 mb-6">
                    لماذا تختارنا
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    تتبع القطعان
                    <span className="block text-amber-300 mt-2">عبر بلدين</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    مقرنا في نيروبي، نحن في موقع فريد لتتبع الهجرة عبر كينيا وتنزانيا. يتابع مرشدونا القطعان على مدار السنة.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "مرشدون خبراء مع أكثر من 20 عاماً في تتبع الهجرة",
                      "مسارات سلسة عبر الحدود - كينيا وتنزانيا",
                      "تتبع فوري للقطيع لتوقيت مثالي لعبور النهر",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-amber-300 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right column - Quick facts */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-amber-300" />
                    حقائق الهجرة 2026
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">معابر نهر مارا</span>
                      <span className="text-white font-medium">ذروتها أغسطس-سبتمبر</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">موسم الولادات</span>
                      <span className="text-white font-medium">يناير-مارس</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">رسوم ماساي مارا (الذروة)</span>
                      <span className="text-white font-medium">200 دولار/اليوم</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">المدة الموصى بها</span>
                      <span className="text-white font-medium">7+ أيام</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-amber-300">
                      جميع الرسوم مشمولة في الباقات
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== LIVE WILDLIFE REPORT ========== */}
          <section className="mb-40">
            <LiveWildlifeReport />
          </section>
          
          {/* ========== MIGRATION FORECAST 2026 ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                خطط زيارتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                توقعات الهجرة 2026
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                يتابع مرشدونا القطعان يومياً. استخدم هذا التقويم لتخطيط رحلتك لمعابر النهر أو الولادات.
              </p>
            </div>
            
            <MigrationCalendar />
          </section>
          
          {/* ========== VIDEO HIGHLIGHTS ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                جربها بنفسك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                أعظم عرض على وجه الأرض
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                شاهد الملايين من الجاموس البري تندفع عبر السافانا وتجتاز الأنهار المليئة بالتماسيح.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-migration-video-id" 
                title="تجربة سفاري الهجرة الكبرى - ماساي مارا وسيرينجيتي"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== FEATURED TOURS ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                اختر مغامرتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                سيارة 4x4 خاصة • مرشد محترف • رسوم المنتزه • مخيمات فاخرة • استلام من نيروبي/أروشا
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "رحلة سفاري خاصة بصحبة مرشد لتتبع الهجرة الكبرى – معابر نهر، ولادات، وافتراسات."}
                  price={tour.price ?? 1200}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 160 + index * 30}
                  location="ماساي مارا / سيرينجيتي"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="جميع رسوم المنتزه مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug || "great-migration-2026"}`}
                  badge={index === 0 ? "الأكثر مبيعاً" : index === 1 ? "الأعلى تقييماً" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600 rounded-full"
              >
                <Link href="/ar/tours?tag=migration">
                  عرض جميع رحلات الهجرة <span className="mr-2">→</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* ========== CROSSING VS CALVING ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-amber-600 mb-4">
                أي تجربة تختار؟
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                معابر النهر أم الولادات؟
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                تجربتان مختلفتان تماماً. اختر بناءً على ما يحرك مشاعرك.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center mb-6">
                  <Waves className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">معابر نهر مارا</h3>
                <p className="text-amber-600 font-light text-xl mb-4">يوليو – أكتوبر</p>
                <p className="text-gray-700 mb-6">
                  الدراما البرية القصوى. آلاف الجاموس تقتحم مياهاً مليئة بالتماسيح. إثارة تخطف الأنفاس.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• ذروة المعابر: أغسطس-سبتمبر</li>
                  <li className="flex items-center gap-2">• شمال سيرينجيتي وماساي مارا</li>
                  <li className="flex items-center gap-2">• نشاط عالٍ للحيوانات المفترسة</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                  <Sunrise className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium mb-2">موسم الولادات</h3>
                <p className="text-green-600 font-light text-xl mb-4">يناير – مارس</p>
                <p className="text-gray-700 mb-6">
                  أكثر من 8,000 مولود جديد يومياً. سهول خضراء خصبة. حركة افتراس مكثفة حيث تصطاد الأسود والفهود الضعيف.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• جنوب سيرينجيتي / نودوتو</li>
                  <li className="flex items-center gap-2">• حشود أقل، تصوير ممتاز</li>
                  <li className="flex items-center gap-2">• الأفضل لمشاهدة الفهود</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== PRO TIPS ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  نصائح احترافية لعام 2026
                </h2>
                <p className="text-gray-600">معرفة داخلية من مرشدين أمضوا عقوداً في تتبع القطعان.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">المعدات الأساسية</h3>
                  <p className="text-sm text-gray-600">عدسة 300-600 ملم، وسادة فاصوليا، غطاء مضاد للغبار، واقي شمس 50+. الفجر والغسق لأفضل إضاءة.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">التوقيت يربح</h3>
                  <p className="text-sm text-gray-600">7+ أيام موصى بها. المعابر غير متوقعة - الإقامات الأطول تزيد الفرص.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">عبر الحدود</h3>
                  <p className="text-sm text-gray-600">اجمع ماساي مارا وسيرينجيتي لتجربة هجرة كاملة.</p>
                </div>
              </div>
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
          
          {/* ========== FINAL CTA - Minimal ========== */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                هل أنت مستعد لمشاهدة الهجرة؟
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                فوضى نهر مارا، حديثو الولادة، مطاردات المفترسات. تواريخ ذروة أغسطس-سبتمبر تمتلئ بسرعة.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-amber-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
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