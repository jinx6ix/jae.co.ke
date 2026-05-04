import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { tours } from "@/lib/i18n/data/ar/tours-data"
import JsonLd from "@/components/JsonLd"

// Import icons directly (they're tree-shaken by Next.js)
import { 
  Calendar,
  Star,
  Shield,
  CheckCircle,
  Info,
  MapPin,
  Globe,
  Phone,
  Bird,
  Feather,
  Compass,
  MessageCircle,
  Sunrise,
  Sunset,
} from "lucide-react"

// Import dynamic components from client component
import { 
  MigrationCalendar, 
  LiveWildlifeReport, 
  FaqSection, 
  TrustBadges,
  TourCard 
} from "@/components/dynamic/DynamicComponents"

const CONFIG = {
  slug: "flamingo-safari-tours",
  title: "جولات سفاري الفلامنغو 2026 | بحيرة ناكورو ووحيد القرن في كينيا",
  description:
    "شاهد طيور الفلامنغو في بحيرة ناكورو ووحيد القرن وأكثر من 450 نوعاً من الطيور. رحلات سفاري قصيرة من نيروبي تبدأ من 450 دولاراً. جولات خاصة بسيارات 4x4.",
  h1: "سفاري الفلامنغو",
  h1Sub: "جولات 2026",
  subtitle: "منتزه بحيرة ناكورو الوطني – آفاق وردية، محمية وحيد القرن، وحياة طيور لا تُنسى",
  featuredToursTitle: "باقات سفاري الفلامنغو",
  filterFn: (tour: any) => 
    tour.destinations?.includes("nakuru") || 
    tour.destinations?.includes("kenya") ||
    tour.tags?.includes("flamingo") ||
    tour.slug.includes("flamingo") ||
    tour.slug.includes("nakuru"),
}

const pageTours = tours.filter(CONFIG.filterFn).slice(0, 8)

const fallbackImages = [
  "/images/flamingos-nakuru-1.webp",
  "/images/flamingos-nakuru-2.webp",
  "/images/flamingos-nakuru-3.webp",
  "/images/flamingos-nakuru-4.webp",
]

// Optimized hero images
const heroImages = {
  desktop: "/images/flamingo-hero-desktop.webp",
  mobile: "/images/flamingo-hero-mobile.webp",
  alt: "آلاف طيور الفلامنغو الوردية تخوض في بحيرة ناكورو، كينيا - جولة سفاري الفلامنغو مع جيه ترافيل إكسبديشنز"
}

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
  keywords: [
    "جولات سفاري الفلامنغو 2026",
    "بحيرة ناكورو طيور الفلامنغو 2026",
    "سفاري منتزه بحيرة ناكورو الوطني 2026",
    "أفضل وقت لرؤية الفلامنغو في بحيرة ناكورو",
    "جولة محمية وحيد القرن ناكورو",
    "سفاري الفلامنغو من نيروبي",
    "بحيرة بوجوريا بديل الفلامنغو",
    "البحيرة الوردية ناكورو كينيا 2026",
    "جولات الفلامنغو مع جيه ترافيل",
    "سفاري مراقبة الطيور في كينيا",
    "جولة تصوير الفلامنغو في كينيا",
    "سفاري الفلامنغو الاقتصادي كينيا",
    "بحيرة ناكورو مقابل بحيرة بوجوريا للفلامنغو",
  ],
  authors: [{ name: "جيه ترافيل إكسبديشنز" }],
  creator: "جيه ترافيل إكسبديشنز",
  publisher: "جيه ترافيل إكسبديشنز",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "/ar/flamingo-safari-tours",
    languages: {
      "ar": "/ar/flamingo-safari-tours",
      "en-US": "/en-us/flamingo-safari-tours",
      "en-GB": "/en-gb/flamingo-safari-tours",
      "en-AU": "/en-au/flamingo-safari-tours",
    },
  },
  openGraph: {
    title: "جولات سفاري الفلامنغو 2026 | بحيرة ناكورو كينيا | جيه ترافيل إكسبديشنز",
    description: "شاهد آلاف طيور الفلامنغو في بحيرة ناكورو. آفاق وردية، محمية وحيد القرن، وأكثر من 450 نوعاً من الطيور. رحلات سفاري قصيرة من نيروبي. مشغل كيني منذ 2015.",
    images: [{
      url: "/og/flamingo-safari-2026.jpg",
      width: 1200,
      height: 630,
      alt: "طيور الفلامنغو في بحيرة ناكورو كينيا",
    }],
    locale: "ar_AR",
    type: "website",
    siteName: "جيه ترافيل إكسبديشنز",
  },
  twitter: {
    card: "summary_large_image",
    title: "جولات سفاري الفلامنغو 2026 | بحيرة ناكورو كينيا",
    description: "شاهد آلاف طيور الفلامنغو في بحيرة ناكورو. احجز رحلة السفاري 2026 من نيروبي.",
    images: ["/twitter/flamingo-safari.jpg"],
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

// Enhanced JSON-LD Schema (Arabic context)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "جيه ترافيل إكسبديشنز",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      sameAs: [
        "https://www.facebook.com/jaetravel",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravel",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "دوار كارين",
        addressLocality: "نيروبي",
        addressRegion: "مقاطعة نيروبي",
        addressCountry: "KE",
      },
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1200",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/ar/flamingo-safari-tours#product",
      name: "باقات سفاري الفلامنغو 2026",
      description: "رحلات سفاري خاصة بصحبة مرشد إلى بحيرة ناكورو لمشاهدة الفلامنغو ومحمية وحيد القرن ومراقبة الطيور. تشمل رسوم المنتزه، ووسيلة نقل 4x4، ومرشد خبير.",
      brand: {
        "@type": "Brand",
        name: "جيه ترافيل إكسبديشنز",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "450",
        highPrice: "1200",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: "2026-12-31",
        offerCount: "8",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "350",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "TouristTrip",
      name: "سفاري الفلامنغو - بحيرة ناكورو",
      description: "شاهد آلاف طيور الفلامنغو ووحيد القرن في أشهر بحيرة صودا في كينيا. رحلة سفاري خاصة بسيارة 4x4 من نيروبي.",
      itinerary: [
        {
          "@type": "TouristDestination",
          name: "منتزه بحيرة ناكورو الوطني",
          description: "موطن آلاف طيور الفلامنغو ووحيد القرن وأكثر من 450 نوعاً من الطيور",
          geo: {
            "@type": "GeoCoordinates",
            latitude: "-0.3667",
            longitude: "36.0833",
          },
        },
        {
          "@type": "TouristDestination",
          name: "منحدر البابون",
          description: "إطلالات بانورامية على البحيرة وطيور الفلامنغو",
        },
        {
          "@type": "TouristDestination",
          name: "محمية وحيد القرن",
          description: "منطقة محمية لوحيد القرن الأسود والأبيض",
        },
      ],
    },
    {
      "@type": "VideoObject",
      "@id": "https://www.jaetravel.co.ke/ar/flamingo-safari-tours#video",
      name: "سفاري الفلامنغو في بحيرة ناكورو - آلاف الطيور الوردية",
      description: "شاهد الأفق الوردي المذهل في منتزه بحيرة ناكورو الوطني، كينيا. آلاف طيور الفلامنغو تخلق مشهداً طبيعياً خلاباً.",
      thumbnailUrl: "https://www.jaetravel.co.ke/videos/flamingo-thumbnail.jpg",
      uploadDate: "2025-01-01T00:00:00Z",
      contentUrl: "https://www.youtube.com/watch?v=YOUR_ACTUAL_VIDEO_ID",
      embedUrl: "https://www.youtube.com/embed/YOUR_ACTUAL_VIDEO_ID",
      duration: "PT2M30S",
      publisher: {
        "@type": "Organization",
        name: "جيه ترافيل إكسبديشنز",
        logo: "https://www.jaetravel.co.ke/logo.png",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/ar/flamingo-safari-tours#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما هو أفضل وقت لرؤية طيور الفلامنغو في بحيرة ناكورو؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "أفضل وقت لرؤية طيور الفلامنغو في بحيرة ناكورو هو خلال مواسم الجفاف من يونيو إلى أكتوبر ومن يناير إلى مارس. خلال هذه الفترات، تركز مستويات المياه الطحالب، مما يجذب أسراباً أكبر من الفلامنغو.",
          },
        },
        {
          "@type": "Question",
          name: "كم تبعد بحيرة ناكورو عن نيروبي؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "يقع منتزه بحيرة ناكورو الوطني على بعد حوالي 160 كم (100 ميل) من نيروبي، أي حوالي ساعتين بالسيارة. نقدم خدمات الاستلام اليومية من فنادق نيروبي ومطار جومو كينياتا الدولي.",
          },
        },
        {
          "@type": "Question",
          name: "هل يمكنني الجمع بين بحيرة ناكورو ومتنزهات أخرى؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم! مزيجنا الأكثر شعبية هو بحيرة ناكورو مع ماساي مارا لرحلة سفاري لمدة 4-5 أيام. نقدم أيضاً جولات تجمع بين ناكورو وبحيرة نيفاشا وباب الجحيم ومنتزه أمبوسيلي الوطني.",
          },
        },
        {
          "@type": "Question",
          name: "ما هي الحياة البرية التي يمكنني رؤيتها إلى جانب الفلامنغو؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تشتهر بحيرة ناكورو بوحيد القرن الأسود والأبيض، والزرافات روثتشيلد، والأسود، والفهود، والجاموس، والحمر الوحشية، وأكثر من 450 نوعاً من الطيور بما في ذلك البجع، الغاق، وعقاب السمك.",
          },
        },
      ],
    },
  ],
}

export default function FlamingoSafariToursPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="flamingo-safari-tours"
        categoryOpts={{
          title: "جولات سفاري الفلامنغو في كينيا — بحيرة ناكورو وبوجوريا",
          description: "شاهد ملايين طيور الفلامنغو على بحيرات الوادي المتصدع في كينيا. جولات سفاري إلى بحيرة ناكورو وبحيرة بوجوريا.",
          image: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("flamingo") || t.title?.toLowerCase().includes("فلامنغو") || t.description?.toLowerCase().includes("فلامنغو")) : [],
        }}
      />
      {/* JSON-LD Script */}
      <JsonLd id="structured-data" data={jsonLd} />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 max-w-7xl">
          
          {/* Top Bar - Server Component */}
          <TopBar />
          
          {/* Breadcrumbs - Server Component */}
          <Breadcrumbs />
          
          {/* Hero Section - Server Component with Optimized Image */}
          <HeroSection />
          
          {/* Why Kenya-Based Operator - Server Component */}
          <WhyKenyaOperator />
          
          {/* Live Wildlife Report - Client Component with Suspense */}
          <Suspense fallback={<div className="h-64 bg-gray-100 rounded-xl animate-pulse mb-40" />}>
            <LiveWildlifeReport />
          </Suspense>
          
          {/* Video Highlights - Server Component */}
          <VideoHighlights />
          
          {/* Lakes Comparison - Server Component */}
          <LakesComparison />
          
          {/* Best Time to Visit - Server Component */}
          <BestTimeToVisit />
          
          {/* Featured Tours - Client Component */}
          <section id="tours" className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
                اختر مغامرتك
              </span>
              
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {CONFIG.featuredToursTitle}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                سيارة 4x4 خاصة • مرشد محترف • رسوم المنتزه • استلام من نيروبي • خيارات 1-3 أيام
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pageTours.map((tour, index) => (
                <TourCard
                  key={tour.id || index}
                  title={tour.title}
                  description={tour.shortDescription || "رحلة سفاري خاصة من نيروبي – أسراب الفلامنغو، وحيد القرن، وأكثر من 450 نوعاً من الطيور في بحيرة ناكورو."}
                  price={tour.price ?? 450}
                  rating={tour.rating ?? 4.9}
                  reviewCount={tour.reviewCount ?? 150 + index * 25}
                  location="بحيرة ناكورو، كينيا"
                  imageUrl={tour.image ? `https://www.jaetravel.co.ke${tour.image}` : fallbackImages[index % fallbackImages.length]}
                  checkInText="جميع رسوم المنتزه مشمولة"
                  href={tour.url || `/ar/tours/${tour.slug || "nakuru-flamingo-2026"}`}
                  badge={index === 0 ? "الأكثر مبيعاً" : index === 1 ? "الأعلى تقييماً" : undefined}
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                className="px-10 py-6 border-2 border-gray-200 hover:border-pink-600 hover:text-pink-600 rounded-full"
              >
                <Link href="/ar/tours?tag=flamingo">
                  عرض جميع جولات الفلامنغو <span className="mr-2">←</span>
                </Link>
              </Button>
            </div>
          </section>
          
          {/* FAQ Section - Client Component with Suspense */}
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-xl animate-pulse mb-40" />}>
            <FaqSection />
          </Suspense>
          
          {/* Trust Badges - Client Component with Suspense */}
          <Suspense fallback={<div className="h-32 bg-gray-100 rounded-xl animate-pulse mb-40" />}>
            <TrustBadges />
          </Suspense>
          
          {/* Final CTA - Server Component */}
          <FinalCTA />
        </div>
      </div>
    </>
  )
}

// ========== SERVER COMPONENTS (Arabic) ==========

function TopBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 pb-6 border-b border-gray-100">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Globe className="h-4 w-4 text-pink-600" />
          <span className="text-sm">متخصصون عالميون في السفاري</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-gray-200"></div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4 text-pink-600" />
          <span className="text-sm">نيروبي، كينيا • دوار كارين</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <div className="flex text-pink-400">
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
          <Phone className="h-4 w-4 text-pink-600" />
          <span className="text-sm font-medium">+254 726 485 228</span>
        </div>
      </div>
    </div>
  )
}

function Breadcrumbs() {
  return (
    <nav className="flex mb-16 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-2">
        <li><Link href="/ar" className="hover:text-pink-600 transition">الرئيسية</Link></li>
        <li><span className="text-gray-300">/</span></li>
        <li><Link href="/ar/destinations" className="hover:text-pink-600 transition">الوجهات</Link></li>
        <li><span className="text-gray-300">/</span></li>
        <li><Link href="/ar/kenya" className="hover:text-pink-600 transition">كينيا</Link></li>
        <li><span className="text-gray-300">/</span></li>
        <li className="text-gray-900 font-medium">جولات سفاري الفلامنغو 2026</li>
      </ol>
    </nav>
  )
}

function HeroSection() {
  return (
    <header className="max-w-5xl mx-auto text-center mb-32">
      {/* Trust badges - minimal */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 px-4 py-1.5 rounded-full text-sm border border-pink-100">
          <Bird className="h-3.5 w-3.5" />
          آلاف الفلامنغو
        </span>
        <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-100">
          <Feather className="h-3.5 w-3.5" />
          سحر البحيرة الوردية
        </span>
        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-100">
          <Shield className="h-3.5 w-3.5" />
          محمية وحيد القرن
        </span>
      </div>

      {/* Main heading - elegant split */}
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-gray-900 tracking-tight">
        {CONFIG.h1}
        <span className="block text-pink-600 text-4xl sm:text-5xl md:text-6xl mt-4 font-medium">
          {CONFIG.h1Sub}
        </span>
      </h1>

      {/* Subtitle - elegant */}
      <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto mb-16 leading-relaxed">
        {CONFIG.subtitle}
      </p>

      {/* Optimized Hero Image */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroImages.mobile} />
          <source media="(min-width: 769px)" srcSet={heroImages.desktop} />
          <Image
            src={heroImages.desktop}
            alt={heroImages.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8">
          <p className="text-white text-sm md:text-base font-medium bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
            🦩 منتزه بحيرة ناكورو الوطني، كينيا - موسم الفلامنغو 2026
          </p>
        </div>
      </div>

      {/* Stats - clean horizontal line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 py-8 border-y border-gray-100">
        <div className="text-center">
          <div className="flex justify-center text-pink-400 mb-2">
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
          <div className="text-2xl font-bold text-gray-900">450+</div>
          <div className="text-sm text-gray-500">نوعاً من الطيور</div>
          <div className="text-xs text-gray-400 mt-1">بما في ذلك الفلامنغو</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">$90</div>
          <div className="text-sm text-gray-500">رسوم المنتزه</div>
          <div className="text-xs text-gray-400 mt-1">مشمولة في الباقات</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
        <Button 
          asChild 
          size="lg" 
          className="text-base px-10 py-6 bg-pink-600 hover:bg-pink-700 shadow-lg rounded-full w-full sm:w-auto min-w-[240px]"
        >
          <Link href="/ar/tours/lake-nakuru-flamingo-safari">
            <Calendar className="mr-3 h-5 w-5" /> 
            عرض باقات 2026
          </Link>
        </Button>
        
        <Button 
          asChild 
          size="lg" 
          variant="outline" 
          className="text-base px-10 py-6 border-2 border-gray-200 hover:border-pink-600 hover:text-pink-600 rounded-full w-full sm:w-auto min-w-[240px]"
        >
          <Link href="/ar/contact">
            <MessageCircle className="mr-3 h-5 w-5" /> 
            تخصيص رحلة السفاري
          </Link>
        </Button>
      </div>

      {/* Pickup locations */}
      <div className="inline-block bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
        <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
          <Compass className="h-4 w-4" />
          يتوفر الاستلام من:
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">نيروبي (كينيا)</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">مطار جومو كينياتا</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm shadow-sm">مطار ويلسون</span>
          <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm shadow-sm">خيارات 1-3 أيام</span>
        </div>
      </div>
    </header>
  )
}

function WhyKenyaOperator() {
  return (
    <section className="mb-40 pb-8">
      <div className="bg-gradient-to-br from-pink-900 to-purple-900 rounded-3xl p-12 md:p-16 lg:p-20 text-white">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column */}
          <div>
            <span className="inline-block text-xs uppercase tracking-wider text-pink-300 mb-6">
              لماذا تختارنا
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
              رحلة سفاري الفلامنغو الخاصة بك
              <span className="block text-pink-300 mt-2">تبدأ في نيروبي</span>
            </h2>
            
            <p className="text-lg text-gray-200 mb-10 leading-relaxed">
              مقرنا في نيروبي، نحن على بعد ساعتين فقط بالسيارة من بحيرة ناكورو. يراقب مرشدونا تحركات الفلامنغو يومياً للحصول على أفضل المشاهدات.
            </p>
            
            <div className="space-y-6">
              {[
                "تتبع فوري للفلامنغو – نعرف أين توجد الأسراب",
                "رحلات سفاري قصيرة 1-3 أيام مثالية للتوقف أو الإمتداد",
                "اجمعها مع محمية وحيد القرن وأكثر من 450 نوعاً من الطيور",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-pink-300 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Quick facts */}
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <Info className="h-5 w-5 text-pink-300" />
              حقائق بحيرة ناكورو 2026
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">المسافة من نيروبي</span>
                <span className="text-white font-medium">ساعتان</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">رسوم المنتزه</span>
                <span className="text-white font-medium">90 دولاراً/للبالغ</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">عدد وحيد القرن</span>
                <span className="text-white font-medium">~50 وحيد قرن أسود</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">أفضل الأشهر</span>
                <span className="text-white font-medium">يونيو-أكتوبر، يناير-مارس</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-pink-300">
                تختلف أعداد الفلامنغو مع مستويات المياه – نتابع يومياً
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoHighlights() {
  const videoId = "YOUR_ACTUAL_VIDEO_ID" // Replace with actual YouTube ID
  
  return (
    <section className="mb-40">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
          جربها بنفسك
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
          الأفق الوردي
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          شاهد آلاف طيور الفلامنغو تلوّن شواطئ بحيرة ناكورو بدرجات اللون الوردي.
        </p>
      </div>
      
      <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title="سفاري الفلامنغو - بحيرة ناكورو كينيا | آلاف الطيور الوردية"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  )
}

function LakesComparison() {
  return (
    <section className="mb-40">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
          اختر بحيرتك
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
          ناكورو، بوجوريا أم إلمنتايتا؟
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          تنتقل طيور الفلامنغو بين بحيرات الصودا في كينيا. سنأخذك إلى حيث توجد الأسراب.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">بحيرة ناكورو</h3>
          <p className="text-pink-600 font-light text-sm mb-3">الوجهة الرئيسية</p>
          <p className="text-sm text-gray-600">بحيرة الفلامنغو الشهيرة مع محمية وحيد القرن، أكثر من 450 نوعاً من الطيور، وصول سهل من نيروبي.</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">بحيرة بوجوريا</h3>
          <p className="text-blue-600 font-light text-sm mb-3">بقعة بديلة ساخنة</p>
          <p className="text-sm text-gray-600">غالباً ما تضم أسراباً ضخمة من الفلامنغو، بالإضافة إلى الينابيع الساخنة والسخانات. يمكن دمجها مع ناكورو.</p>
        </div>
        
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">بحيرة إلمنتايتا</h3>
          <p className="text-teal-600 font-light text-sm mb-3">أقل ازدحاماً</p>
          <p className="text-sm text-gray-600">أصغر حجماً لكن بأسراب مضمونة، غالباً ما يتم تجاهلها. رائعة للتصوير الفوتوغرافي.</p>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-6">
        يراقب مرشدونا البحيرات الثلاث يومياً ويعدلون المسارات للحصول على أفضل المشاهدات.
      </p>
    </section>
  )
}

function BestTimeToVisit() {
  return (
    <section className="mb-40">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-16 md:p-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-wider text-pink-600 mb-4">
            خطط زيارتك
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
            أفضل وقت لرؤية الفلامنغو
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <Sunrise className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-medium">موسم الجفاف المرتفع</h3>
            </div>
            <p className="text-2xl font-light text-pink-600 mb-3">يونيو – أكتوبر</p>
            <p className="text-gray-600 mb-4">تركيز الطحالب → أسراب فلامنغو مضمونة. أفضل مشاهدة لوحيد القرن، ضوء ذهبي للتصوير.</p>
            <Link href="/ar/blog/best-time-flamingo-safari" className="text-pink-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
              تعرف على هجرة الفلامنغو <span>←</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Sunset className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium">فترة الجفاف الانتقالية</h3>
            </div>
            <p className="text-2xl font-light text-amber-600 mb-3">يناير – مارس</p>
            <p className="text-gray-600 mb-4">أعداد جيدة من الفلامنغو، حشود أقل، تنوع ممتاز في الطيور.</p>
            <Link href="/ar/blog/flamingo-photography-tips" className="text-pink-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
              نصائح لتصوير الفلامنغو <span>←</span>
            </Link>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          المواسم الرطبة (أبريل-مايو، نوفمبر-ديسمبر): مناظر خضراء لكن الفلامنغو قد يتفرق.
        </p>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="mb-20">
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-16 md:p-20 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
          هل أنت مستعد للمشهد الوردي؟
        </h2>
        
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
          آفاق الفلامنغو، لقاءات وحيد القرن، وأكثر من 450 نوعاً من الطيور. على بعد ساعتين فقط من نيروبي.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="bg-white text-pink-700 hover:bg-gray-100 px-10 py-6 rounded-full min-w-[200px] shadow-lg"
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
  )
}