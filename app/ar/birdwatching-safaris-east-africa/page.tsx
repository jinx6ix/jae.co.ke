// app/ar/birdwatching-safaris-east-africa/page.tsx
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
  Bird,
  Feather,
  Cloud,
  Binoculars
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
  slug: "birdwatching-safaris-east-africa",
  title: "رحلات مراقبة الطيور في كينيا 2026 | أكثر من 1,400 نوع من الطيور",
  description:
    "رحلات مراقبة الطيور 2026 في كينيا وتنزانيا وأوغندا. شاهد طيور الفلامنجو وأبو مركوب والطيور المهاجرة. مرشدون خبراء. ابتداءً من 450 دولاراً.",
  h1: "رحلات مراقبة الطيور",
  h1Sub: "شرق أفريقيا 2026",
  subtitle: "أكثر من 1,400 نوع – عجائب مهاجرة، مشاهد الفلامنجو، وجواهر نادرة عبر كينيا وتنزانيا وأوغندا",
  featuredToursTitle: "باقات رحلات مراقبة الطيور",
  filterFn: (tour: any) => 
    tour.destinations?.includes("kenya") || 
    tour.destinations?.includes("tanzania") || 
    tour.destinations?.includes("uganda") ||
    tour.tags?.includes("birding") ||
    tour.tags?.includes("flamingo") ||
    tour.slug.includes("bird") || 
    tour.slug.includes("flamingo") || 
    tour.slug.includes("nakuru"),
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
    "رحلات مراقبة الطيور في شرق أفريقيا 2026",
    "مراقبة الطيور في كينيا تنزانيا أوغندا 2026",
    "جولة بحيرة ناكورو والفلامنجو 2026",
    "أبو مركوب أوغندا مراقبة الطيور",
    "الطيور المهاجرة شرق أفريقيا نوفمبر أبريل",
    "سفاري الخطاف أرجواني الصدر سيرينجيتي",
    "أفضل مراقبة طيور شرق أفريقيا 2026",
    "مراقبة الطيور في غابة كيبالي أوغندا",
    "رحلات مراقبة الطيور جايه ترافيل",
    "سفاري مراقبة الطيور في الوادي المتصدع",
  ],
  authors: [{ name: "Jae Travel Expeditions" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/birdwatching-safaris-east-africa",
    languages: {
      "ar": "/ar/birdwatching-safaris-east-africa",
      "en-US": "/en-us/birdwatching-safaris-east-africa",
      "en-GB": "/en-gb/birdwatching-safaris-east-africa",
    },
  },
  openGraph: {
    title: "رحلات مراقبة الطيور في شرق أفريقيا 2026 | أكثر من 1,400 نوع | جايه ترافيل إكسبديشنز",
    description: "أفضل رحلات مراقبة الطيور في كينيا وتنزانيا وأوغندا. طيور الفلامنجو، أبو مركوب، والخطافات، وأكثر من 1,400 نوع. مرشدون خبراء، تركيز على التصوير.",
    images: [{
      url: "/og/birdwatching-east-africa-2026.jpg",
      width: 1200,
      height: 630,
      alt: "رحلة مراقبة طيور في شرق أفريقيا - طيور الفلامنجو في بحيرة ناكورو",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "Jae Travel Expeditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "رحلات مراقبة الطيور في شرق أفريقيا 2026 | أكثر من 1,400 نوع",
    description: "أفضل مراقبة طيور في كينيا وتنزانيا وأوغندا. طيور الفلامنجو، أبو مركوب، الخطافات. احجز رحلة 2026.",
    images: ["/twitter/birdwatching-east-africa.jpg"],
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
      "@id": "https://www.jaetravel.co.ke/ar/birdwatching-safaris-east-africa#product",
      name: "باقات رحلات مراقبة الطيور 2026",
      description: "رحلات مراقبة طيور بصحبة مرشدين خبراء عبر كينيا وتنزانيا وأوغندا تستهدف أكثر من 1,400 نوع.",
      brand: {
        "@type": "Brand",
        name: "Jae Travel Expeditions",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "450",
        highPrice: "3500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "15",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "380",
      },
    },
    {
      "@type": "TouristTrip",
      name: "رحلة مراقبة طيور في شرق أفريقيا",
      description: "تتبع أكثر من 1,400 نوع من الطيور عبر بحيرات الوادي المتصدع في كينيا، وسهول تنزانيا، ومستنقعات أبو مركوب في أوغندا.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "منتزه بحيرة ناكورو الوطني",
          description: "طيور الفلامنجو، البجع، وأكثر من 450 نوعاً من الطيور",
        },
        {
          "@type": "TouristDestination",
          name: "مستنقع مبامبا، أوغندا",
          description: "أفضل موقع لمشاهدة طائر أبو مركوب",
        },
        {
          "@type": "TouristDestination",
          name: "منتزه سيرينجيتي الوطني",
          description: "طائر الخطاف أرجواني الصدر، الطيور الجارحة، وطيور السافانا",
        },
      ],
    },
  ],
}

export default function BirdwatchingSafarisPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="birdwatching-safaris-east-africa"
        categoryOpts={{
          title: "رحلات مراقبة الطيور في شرق أفريقيا — أكثر من 1,000 نوع",
          description: "رحلات مراقبة طيور بصحبة مرشدين خبراء في كينيا وتنزانيا ورواندا وأوغندا. أكثر من 1,000 نوع من الطيور.",
          image: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("bird") || (t.title && t.title.toLowerCase().includes("bird")) || (t.description && t.description.toLowerCase().includes("bird"))) : [],
        }}
      />
      {/* نص JSON-LD */}
      <JsonLd data={jsonLd} id={"birdwatching-safari-schema"} />
      
      <div className="min-h-screen bg-white" dir="rtl">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* ========== الشريط العلوي ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">متخصصون في السفاري حول العالم</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">نيروبي، كينيا • كارين راوند أباوت</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="flex text-emerald-400">
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
                <Phone className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium">+254 726 485 228</span>
              </div>
            </div>
          </div>
          
          {/* ========== مسار التصفح ========== */}
          <nav className="flex mb-16 text-sm text-gray-500" aria-label="مسار التصفح">
            <ol className="flex items-center flex-wrap gap-2">
              <li><Link href="/ar" className="hover:text-emerald-600 transition">الرئيسية</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/destinations" className="hover:text-emerald-600 transition">الوجهات</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li><Link href="/ar/east-africa" className="hover:text-emerald-600 transition">شرق أفريقيا</Link></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900 font-medium">رحلات مراقبة الطيور 2026</li>
            </ol>
          </nav>
          
          {/* ========== قسم البطل ========== */}
          <header className="max-w-5xl mx-auto text-center mb-32">
            {/* شارات الثقة */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm border border-emerald-100">
                <Bird className="h-3.5 w-3.5" />
                أكثر من 1,400 نوع
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm border border-blue-100">
                <Cloud className="h-3.5 w-3.5" />
                ذروة المهاجرين نوفمبر–أبريل
              </span>
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
                <Camera className="h-3.5 w-3.5" />
                تركيز على التصوير
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
              {CONFIG.h1}
              <span className="block text-emerald-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
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
                <div className="flex justify-center text-emerald-400 mb-2">
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
                <div className="text-2xl font-bold text-gray-900">أكثر من 1,400</div>
                <div className="text-sm text-gray-500">نوع من الطيور</div>
                <div className="text-xs text-gray-400 mt-1">في كينيا، تنزانيا، أوغندا</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">أكثر من 500</div>
                <div className="text-sm text-gray-500">طائر مهاجر في الذروة</div>
                <div className="text-xs text-gray-400 mt-1">نوفمبر - أبريل</div>
              </div>
            </div>

            {/* أزرار الحث على اتخاذ إجراء */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 w-3xs pl-100 pt-7">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-10 py-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
              >
                <Link href="/ar/tours/birdwatching-packages">
                  <Calendar className="ml-3 h-5 w-5" /> 
                  عرض باقات 2026
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base px-10 py-6 border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 rounded-full w-full sm:w-auto min-w-[240px]"
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
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">أروشا (تنزانيا)</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">عنتبي (أوغندا)</span>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm shadow-sm">خيارات متعددة البلدان</span>
              </div>
            </div>
          </header>
          
          {/* ========== لماذا شركة مشغلة في كينيا ========== */}
          <section className="mb-40 pb-8">
            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* العمود الأيمن (نظراً للـ RTL) */}
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-emerald-300 mb-6">
                    لماذا تختارنا
                  </span>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
                    خبراء مراقبة الطيور
                    <span className="block text-emerald-300 mt-2">في شرق أفريقيا</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-10 leading-relaxed">
                    نحن مقرنا في نيروبي، في موقع مثالي لإرشادك عبر كينيا وتنزانيا وأوغندا. مرشدونا المتخصصون في علم الطيور يعرفون أين تتواجد الطيور، موسمًا بعد موسم.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      "مرشدو طيور متخصصون بخبرة تزيد عن 15 سنة",
                      "مناظير رصد، مخابئ، ودعم للتصوير الفوتوغرافي",
                      "تتبع فوري لتحركات طيور الفلامنجو وأبو مركوب",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* العمود الأيسر - حقائق سريعة */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <Info className="h-5 w-5 text-emerald-300" />
                    بؤر مراقبة الطيور 2026
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">بحيرة ناكورو (كينيا)</span>
                      <span className="text-white font-medium">أكثر من 450 نوعاً</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">مستنقع مبامبا (أوغندا)</span>
                      <span className="text-white font-medium">أبو مركوب</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-300">سيرينجيتي (تنزانيا)</span>
                      <span className="text-white font-medium">أكثر من 500 نوع</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">غابة كيبالي (أوغندا)</span>
                      <span className="text-white font-medium">أكثر من 375 نوعاً</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-emerald-300">
                      ذروة الطيور المهاجرة: نوفمبر - أبريل
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
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                جرِّب التجربة
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                جنة مراقبي الطيور
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                من البحيرات الوردية بالفلامنجو إلى مستنقعات أبو مركوب وخطافات السافانا.
              </p>
            </div>
            
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/your-birding-video-id" 
                title="رحلة مراقبة الطيور - شرق أفريقيا"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
          
          {/* ========== أفضل وجهات مراقبة الطيور ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                أين تذهب
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                أفضل بؤر مراقبة الطيور
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                ثلاث دول، أنواع لا تُحصى. كل وجهة تقدم تجارب فريدة لمراقبة الطيور.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">كينيا</h3>
                <p className="text-sm text-gray-600 mb-3">بحيرات الوادي المتصدع</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">• بحيرة ناكورو – فلامنجو، بجع</li>
                  <li className="flex items-center gap-2">• بحيرة بارينجو – أكثر من 500 نوع</li>
                  <li className="flex items-center gap-2">• غابة كاكاميغا – طيور الغابات الاستوائية</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">تنزانيا</h3>
                <p className="text-sm text-gray-600 mb-3">السهول والمرتفعات</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">• سيرينجيتي – خطافات، طيور جارحة</li>
                  <li className="flex items-center gap-2">• نغورونغورو – فلامنجو، نعام</li>
                  <li className="flex items-center gap-2">• بحيرة مانيارا – بجع، لقالق</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">أوغندا</h3>
                <p className="text-sm text-gray-600 mb-3">الغابات والمستنقعات</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">• مستنقع مبامبا – أبو مركوب</li>
                  <li className="flex items-center gap-2">• غابة كيبالي – توراكو، أبو قرن</li>
                  <li className="flex items-center gap-2">• حديقة الملكة إليزابيث – أكثر من 600 نوع</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* ========== عرض الطيور الأيقونية ========== */}
          <section className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                الأنواع المستهدفة
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                طيور ستسعى لرؤيتها
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦩</div>
                <h3 className="font-medium">الفلامنجو الصغير</h3>
                <p className="text-xs text-gray-500 mt-1">بحيرة ناكورو، بوجوريا</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦜</div>
                <h3 className="font-medium">أبو مركوب</h3>
                <p className="text-xs text-gray-500 mt-1">مستنقع مبامبا، أوغندا</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦅</div>
                <h3 className="font-medium">الخطاف أرجواني الصدر</h3>
                <p className="text-xs text-gray-500 mt-1">سيرينجيتي، ماساي مارا</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">🦃</div>
                <h3 className="font-medium">طائر السكرتير</h3>
                <p className="text-xs text-gray-500 mt-1">الأراضي العشبية السافانية</p>
              </div>
            </div>
          </section>
          
          {/* ========== أفضل وقت ========== */}
          <section className="mb-40">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-16 md:p-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                  خطِّط لزيارتك
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  أفضل وقت لمراقبة الطيور
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Cloud className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium">ذروة المهاجرين</h3>
                  </div>
                  <p className="text-2xl font-light text-emerald-600 mb-3">نوفمبر – أبريل</p>
                  <p className="text-gray-600 mb-4">ملايين الطيور المهاجرة من المنطقة القطبية الشمالية تصل. أعلى تنوع للأنواع، ريش التزاوج، مناظر طبيعية خضراء.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium">الموسم الجاف</h3>
                  </div>
                  <p className="text-2xl font-light text-amber-600 mb-3">يونيو – أكتوبر</p>
                  <p className="text-gray-600 mb-4">تتجمع الطيور حول مصادر المياه. رصد أسهل، ممتاز لتصوير طيور السافانا والطيور الجارحة.</p>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                المراقبة ممكنة طوال العام، لكن نوفمبر-أبريل يقدم أكبر قوائم الطيور.
              </p>
            </div>
          </section>
          
          {/* ========== نصائح احترافية ========== */}
          <section className="mb-40">
            <div className="bg-gray-50 rounded-3xl p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  نصائح احترافية لعام 2026
                </h2>
                <p className="text-gray-600">معرفة من الداخل من مرشدينا المتخصصين في علم الطيور.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Binoculars className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-2">المعدات الأساسية</h3>
                  <p className="text-sm text-gray-600">منظار 8×42+، تلسكوب رصد، عدسة 300-600 مم، دفتر ملاحظات مقاوم للطقس، تطبيق eBird.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-2">التوقيت يربح</h3>
                  <p className="text-sm text-gray-600">الفجر/الغسق للنشاط. نوفمبر-أبريل للمهاجرين، الموسم الجاف لتجمعات مصادر المياه.</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium mb-2">متعدد البلدان</h3>
                  <p className="text-sm text-gray-600">اجمع بين بحيرات كينيا + أبو مركوب أوغندا + سافانا تنزانيا للحصول على قائمة نهائية.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* ========== جولات مميزة ========== */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-emerald-600 mb-4">
                اختر مغامرتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                مرشدون خبراء • تلسكوبات رصد • مجموعات صغيرة • تركيز على التصوير • جميع رسوم المنتزهات مشمولة
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "مراقبة طيور بصحبة مرشدين خبراء – فلامنجو، مهاجرون، أبو مركوب وتصوير في بؤر ممتازة."}
                  price={tour.price ?? 450}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 120 + index * 20}
                  location={tour.location || "شرق أفريقيا"}
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="جميع رسوم المنتزهات مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug || "birdwatching-2026"}`}
                  badge={index === 0 ? "الأكثر مبيعاً" : index === 1 ? "الأعلى تقييماً" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 rounded-full"
              >
                <Link href="/ar/tours?tag=birding">
                  عرض كل جولات مراقبة الطيور <span className="mr-2">→</span>
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
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-16 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                هل أنت مستعد لبناء قائمة الطيور النهائية الخاصة بك؟
              </h2>
              
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                أكثر من 1,400 نوع • ذروة المهاجرين • بؤر أبو مركوب والفلامنجو • مرشدون خبراء • أماكن محدودة لنوفمبر-أبريل.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px]"
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