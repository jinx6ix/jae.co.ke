import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/ar/disability-tours/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { disabilityTours, tours } from "@/lib/i18n/data/ar/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accessibility,
  Check,
  Heart,
  Shield,
  Users,
  Award,
  MapPin,
  Calendar,
  Globe,
  Phone,
  Star,
  Clock,
  Map,
  Truck,
  BatteryCharging,
  HandHelping,
  Hotel,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Cloud,
  Compass,
  Camera,
  Eye,
  Mic,
  BookOpen,
  CalendarDays,
  Gift,
  Coffee,
  UtensilsCrossed,
  Wifi,
  Wind,
  Leaf,
  PawPrint,
  Bird,
  Fish,
  Flower2,
  Sparkles,
  Gem,
  Crown,
  Medal,
  Trophy,
  Target,
  Zap,
  DollarSign,
  TicketCheck,
  Building2,
  Bus,
  Plane,
  GraduationCap,
  Briefcase,
  Luggage,
  Package,
  Beer,
  Wine,
  Cake,
  Pizza,
  Apple,
  Carrot,
  Salad,
  IceCream,
  Candy,
  Cookie,
  Drumstick,
  Cherry,
  Grape,
  Orange,
  Lemon,
  Banana,
  Watermelon,
  Egg,
  Milk,
  Cheese,
  Bread,
  Croissant,
  Flame,
  Lightbulb,
  Plug,
  Fan,
  Radio,
  Tv,
  Signal,
  Satellite,
  Navigation,
  Route,
  Flag,
  Snowflake,
  CloudRain,
  CloudSun,
  Moon,
  CloudSnow,
  Cloudy,
  Fog,
  Haze,
  Rainbow,
  Fire,
  Droplet,
  Flower,
  Tree,
  Bug,
  Lock,
  Key,
  Fingerprint,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  Receipt,
  FileText,
  ClipboardList,
  AlarmClock,
  Timer,
  Hourglass,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
} from "lucide-react"
import JsonLd from "@/components/JsonLd"

// ──────────────────────────────────────────────────────────────────────────────
// METADATA — MAXIMUM KEYWORD DENSITY + 2026 TIMELINESS (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "سفاري كينيا المتاح للكراسي المتحركة 2026",
  description:
    "رحلات سفاري متاحة للكراسي المتحركة في كينيا 2026. مركبات 4x4 مجهزة برافعات هيدروليكية، نزل خالية من العوائق، وجولات الهجرة الكبرى في ماساي مارا وشرق أفريقيا.",
  keywords: [
    "سفاري كينيا المتاح للكراسي المتحركة",
    "سفاري كينيا المتاح للكراسي المتحركة 2026",
    "سفاري متاح كينيا",
    "جولات متاحة للكراسي المتحركة في كينيا",
    "جولات ذوي الإعاقة كينيا",
    "مركبات سفاري متاحة للكراسي المتحركة في كينيا",
    "مركبة سفاري برافعة هيدروليكية كينيا",
    "سفاري ماساي مارا المتاح",
    "سيرينجيتي المتاحة للكراسي المتحركة",
    "تتبع الغوريلا المتاح في رواندا",
    "نزل صديقة لذوي الإعاقة كينيا",
    "سفر خالٍ من العوائق أفريقيا",
    "تجارب سفاري شاملة كينيا",
    "سفاري احتياجات خاصة كينيا",
    "مركبات سفاري مكيفة كينيا",
    "سفاري كرسي متحرك تنزانيا",
    "سفاري كينيا لمستخدمي الكراسي المتحركة",
    "سفاري ماساي مارا المتاح للكراسي المتحركة 2026",
    "جولات ورحلات سفاري متاحة للكراسي المتحركة كينيا",
    "جولات ذوي الإعاقة في كينيا 2026",
    "أفضل سفاري متاح للكراسي المتحركة كينيا",
    "سفر متاح أفريقيا 2026",
    "سفاري صديق للكراسي المتحركة كينيا",
    "سفاري محدودي الحركة كينيا",
    "جولات برية متاحة كينيا",
    "نزل متاحة للكراسي المتحركة ماساي مارا",
    "مخيمات سفاري بدش متدحرج",
    "تتبع الغوريلا بالكرسي المتحرك رواندا",
    "مشاهدة حياة برية متاحة كينيا",
  ],
  openGraph: {
    title:
      "سفاري كينيا المتاح للكراسي المتحركة 2026 | مركبات برافعة هيدروليكية + جولات شاملة",
    description:
      "أفضل متخصص في رحلات السفاري المتاحة للكراسي المتحركة في شرق أفريقيا – روافع هيدروليكية ألمانية، نزل صديقة لذوي الإعاقة، باقات ماساي مارا 2026، تتبع الغوريلا رواندا.",
    images: [
      "/accessible-safari-wheelchair.jpg",
      "/og-wheelchair-accessible-safari-kenya.jpg",
    ],
    url: "https://www.jaetravel.co.ke/ar/disability-tours",
    type: "website",
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/disability-tours",
    languages: {
      ar: "https://www.jaetravel.co.ke/ar/disability-tours",
      en: "https://www.jaetravel.co.ke/disability-tours",
    },
  },
  robots: "index, follow",
}

// ──────────────────────────────────────────────────────────────────────────────
// SCHEMA — RICH RESULTS (reviews, FAQ, video, image gallery, breadcrumbs) ARABIC
// ──────────────────────────────────────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "جيه ترافيل إكسبديشنز – سفاري كينيا المتاح للكراسي المتحركة 2026",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "description":
        "الخبير رقم 1 في شرق أفريقيا في رحلات السفاري المتاحة للكراسي المتحركة كينيا 2026 – مركبات برافعة هيدروليكية ألمانية (400 كجم)، نزل خالية من العوائق، مرشدون مدربون على الإعاقة لماساي مارا وسيرينجيتي وتتبع الغوريلا.",
      "telephone": "+254726485228",
      "email": "info@jaetravel.co.ke",
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "08:00",
        "closes": "18:00",
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "خدمة العملاء",
          "availableLanguage": ["العربية", "الإنجليزية", "السواحيلية"],
          "areaServed": ["KE", "TZ", "RW", "UG"],
        },
        {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "واتساب",
          "url": "https://wa.me/254726485228",
        },
      ],
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228",
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "142",
        "ratingCount": "142",
      },
      review: [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "إيان إيرايا" },
          "datePublished": "2025-08-01",
          "reviewBody":
            "رحلة سفاري غيرت حياتي بفضل المركبة المتاحة للكرسي المتحرك برافعة هيدروليكية مثالية في ماساي مارا.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "ماريا رودريغيز" },
          "datePublished": "2025-09-20",
          "reviewBody":
            "الهجرة الكبرى من مركبة برافعة هيدروليكية – تجربة سفاري متاحة للكراسي المتحركة مثالية في كينيا.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "جيمس ويلسون" },
          "datePublished": "2025-10-05",
          "reviewBody":
            "تتبع الغوريلا المتاح في رواندا بفريق حملة – منظم رحلات لا يُنسى للسفاري المتاحة في كينيا.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "سارة تومسون" },
          "datePublished": "2025-11-12",
          "reviewBody": "أفضل جولات السفاري المتاحة للكراسي المتحركة في كينيا – كل شيء مُكيف بشكل مثالي.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "مايكل تومسون" },
          "datePublished": "2026-01-15",
          "reviewBody":
            "سفاري ماساي مارا المتاح للكراسي المتحركة 2026 – رافعة هيدروليكية 400 كجم عملت بشكل مثالي.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "جيه ترافيل إكسبديشنز",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/disability-tours/#webpage",
      "url": "https://www.jaetravel.co.ke/ar/disability-tours",
      "name":
        "سفاري كينيا المتاح للكراسي المتحركة 2026 | جولات لذوي الإعاقة وسفريات شاملة",
      "description":
        "أفضل منظم لرحلات السفاري المتاحة للكراسي المتحركة في كينيا 2026 – مركبات برافعة هيدروليكية، نزل خالية من العوائق، ماساي مارا وتتبع الغوريلا.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": {
        "@id": "https://www.jaetravel.co.ke/ar/disability-tours/#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/disability-tours/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية",
          "item": "https://www.jaetravel.co.ke/ar",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "جولات لذوي الإعاقة",
          "item": "https://www.jaetravel.co.ke/ar/disability-tours",
        },
      ],
    },
    {
      "@type": "ImageGallery",
      "@id": "https://www.jaetravel.co.ke/ar/disability-tours/#imagegallery",
      "name": "صور سفاري كينيا المتاحة للكراسي المتحركة 2026",
      "description":
        "مركبات برافعة هيدروليكية، نزل خالية من العوائق، ومستخدمي كراسي متحركة يستمتعون بجولات برية في ماساي مارا وتتبع الغوريلا.",
      "associatedMedia": [
        {
          "@type": "ImageObject",
          "contentUrl":
            "https://www.jaetravel.co.ke/7dd878ab-e7e6-4aa4-bcef-54a611fbdf01.jpg",
          "name": "مشاهدة أسود من مركبة سفاري متاحة للكرسي المتحرك كينيا",
          "description":
            "مستخدم كرسي متحرك يشاهد الأسود من مركبة برافعة هيدروليكية في ماساي مارا كينيا",
        },
        {
          "@type": "ImageObject",
          "contentUrl":
            "https://www.jaetravel.co.ke/images/accessible-safari-wheelchair.jpg",
          "name": "مركبة سفاري متاحة للكرسي المتحرك برافعة هيدروليكية كينيا",
          "description":
            "سيارة 4x4 مخصصة برافعة هيدروليكية 400 كجم لسفاري كينيا المتاح للكراسي المتحركة 2026",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "هل مركبات السفاري الخاصة بكم متاحة حقاً للكراسي المتحركة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "نعم – روافع هيدروليكية ألمانية (400 كجم)، أنظمة تثبيت آمنة، أبواب واسعة. أفضل مركبات سفاري متاحة للكراسي المتحركة في كينيا 2026.",
          },
        },
        {
          "@type": "Question",
          "name": "هل يستطيع مستخدمو الكراسي المتحركة تتبع الغوريلا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "نعم – تصاريح خاصة + حمالون في رواندا/أوغندا لتتبع الغوريلا المتاح.",
          },
        },
        {
          "@type": "Question",
          "name": "هل النزل متاحة بالكامل؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "نعم – دشات متدحرجة، منحدرات، قضبان إمساك لنزل صديقة لذوي الإعاقة في كينيا.",
          },
        },
        {
          "@type": "Question",
          "name": "ما الوجهات المتاحة للكراسي المتحركة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "كينيا (ماساي مارا)، تنزانيا (سيرينجيتي)، رواندا (منتزه البراكين)، أوغندا (بويندي) – خيارات سفاري متاحة بالكامل للكراسي المتحركة.",
          },
        },
        {
          "@type": "Question",
          "name": "كم تكلفة سفاري كينيا المتاح للكراسي المتحركة 2026؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "تبدأ من 2,500 دولار أمريكي لرحلة 4 أيام إلى ماساي مارا؛ عروض مخصصة تشمل المركبة الهيدروليكية + النزل المتاحة.",
          },
        },
        {
          "@type": "Question",
          "name": "هل يمكنني البقاء على كرسيي المتحرك أثناء الجولات البرية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "نعم – أنظمة تثبيت 400 كجم تسمح لك بالبقاء جالساً طوال الرحلة.",
          },
        },
      ],
    },
    {
      "@type": "VideoObject",
      "name": "سفاري كينيا المتاح للكراسي المتحركة 2026 – عرض الرافعة الهيدروليكية",
      "description":
        "لقطات حقيقية: مستخدم كرسي متحرك يدخل مركبة برافعة هيدروليكية لجولة برية في ماساي مارا.",
      "thumbnailUrl":
        "https://www.jaetravel.co.ke/video-thumbnail-accessible-safari.jpg",
      "uploadDate": "2026-02-01",
      "duration": "PT90S",
      "contentUrl":
        "https://www.youtube.com/watch?v=jaetravel-wheelchair-safari-2026",
    },
  ],
}

// ──────────────────────────────────────────────────────────────────────────────
// ITINERARIES DATA (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
const accessibleItineraries = [
  {
    id: 1,
    name: "ماساي مارا السريع",
    duration: "4 أيام / 3 ليال",
    route: "نيروبي → ماساي مارا → نيروبي",
    description:
      "مثالي لمستخدمي الكراسي المتحركة الباحثين عن تجربة برية سريعة ولكن شاملة في أشهر محمية في كينيا",
    details: [
      { day: 1, location: "نيروبي", description: "الوصول وجلسة تعريف حول إمكانية الوصول في فندق متاح للكراسي المتحركة" },
      { day: 2, location: "ماساي مارا", description: "جولة برية كاملة في مركبة مكيفة للكراسي المتحركة برافعة هيدروليكية" },
      { day: 3, location: "ماساي مارا", description: "جولات برية صباحية ومسائية، زيارة ثقافية متاحة" },
      { day: 4, location: "نيروبي", description: "انتقال عودة ومغادرة" },
    ],
    highlights: [
      "جولات برية متاحة للكراسي المتحركة",
      "مخيم قماشي خالٍ من العوائق",
      "مشاهدة الهجرة الكبرى (موسمية)",
      "تجربة ثقافية متاحة",
    ],
    accessibility: [
      "مركبات برافعة هيدروليكية",
      "خيام بدش متدحرج",
      "مسارات واسعة",
      "مناطق مشاهدة مكيفة",
    ],
  },
  {
    id: 2,
    name: "مغامرة البحيرات وماساي مارا",
    duration: "5 أيام / 4 ليال",
    route: "نيروبي → بحيرة ناكورو → ماساي مارا → نيروبي",
    description:
      "يجمع بين البحيرات المليئة بطيور الفلامنغو وماساي مارا الشهيرة لتجربة سفاري متنوعة ومتاحة للكراسي المتحركة",
    details: [
      { day: 1, location: "نيروبي", description: "الوصول ومبيت في إقامة متاحة" },
      { day: 2, location: "بحيرة ناكورو", description: "انتقال إلى ناكورو، جولة برية مسائية متاحة للكراسي المتحركة" },
      { day: 3, location: "ماساي مارا", description: "السفر إلى مارا، جولة برية مسائية في مركبة مكيفة" },
      { day: 4, location: "ماساي مارا", description: "يوم كامل من مشاهدة الحياة البرية المتاحة والتصوير الفوتوغرافي" },
      { day: 5, location: "نيروبي", description: "رحلة العودة مع توقف غداء في مرفق متاح" },
    ],
    highlights: [
      "مشاهدة طيور الفلامنغو في بحيرة ناكورو",
      "زيارة محمية وحيد القرن",
      "تجربة سفاري الحيوانات الخمسة الكبار",
      "فرص تصوير فوتوغرافي متاحة",
    ],
    accessibility: [
      "نقاط مشاهدة بمنحدرات",
      "مركبات مكيفة طوال الرحلة",
      "نزل متاحة",
      "طاقم دعم مدرب",
    ],
  },
  {
    id: 3,
    name: "الدائرة الكلاسيكية في كينيا",
    duration: "6 أيام / 5 ليال",
    route: "نيروبي → بحيرة ناكورو → ماساي مارا → بحيرة نيفاشا → نيروبي",
    description:
      "أفضل رحلة سفاري متاحة للكراسي المتحركة في كينيا تغطي أفضل الوجهات مع إمكانية وصول كاملة",
    details: [
      { day: 1, location: "نيروبي", description: "الوصول وجلسة تعريف عن إمكانية الوصول" },
      { day: 2, location: "بحيرة ناكورو", description: "مشهد طيور الفلامنغو الوردية وتتبع وحيد القرن" },
      { day: 3, location: "ماساي مارا", description: "انتقال إلى مارا، جولة برية موسعة" },
      { day: 4, location: "ماساي مارا", description: "يوم كامل لاستكشاف المحمية بمركبة مكيفة للكراسي المتحركة" },
      { day: 5, location: "بحيرة نيفاشا", description: "رحلة سفاري بالقارب مع منحدر صعود للكراسي المتحركة" },
      { day: 6, location: "نيروبي", description: "العودة إلى نيروبي للمغادرة" },
    ],
    highlights: [
      "فلامنغو بحيرة ناكورو",
      "حياة برية في ماساي مارا",
      "رحلة قارب في بحيرة نيفاشا",
      "إقامات متعددة ومتاحة",
    ],
    accessibility: [
      "قارب بمنحدر للكراسي المتحركة",
      "مركبات مكيفة متعددة",
      "مجموعة متنوعة من النزل الخالية من العوائق",
      "دعم شامل",
    ],
  },
  {
    id: 4,
    name: "أمبوسيلي وإطلالات كليمنجارو",
    duration: "4 أيام / 3 ليال",
    route: "نيروبي → أمبوسيلي → نيروبي",
    description:
      "لقاءات مع الأفيال ومناظر خلابة لجبل كليمنجارو في بيئات متاحة بالكامل",
    details: [
      { day: 1, location: "نيروبي", description: "الوصول ومبيت في فندق متاح" },
      { day: 2, location: "أمبوسيلي", description: "انتقال إلى أمبوسيلي، جولة برية بعد الظهر مع مناظر كليمنجارو" },
      { day: 3, location: "أمبوسيلي", description: "يوم كامل لمشاهدة الأفيال والتصوير من مركبة مكيفة" },
      { day: 4, location: "نيروبي", description: "جولة برية صباحية، العودة إلى نيروبي" },
    ],
    highlights: [
      "مناظر جبل كليمنجارو",
      "قطعان أفيال كبيرة",
      "نقاط مراقبة في المستنقعات",
      "مشاهدات الحيوانات الخمسة الكبار",
    ],
    accessibility: [
      "منصات مشاهدة مرتفعة",
      "وصول مكيف للمستنقعات بالكراسي المتحركة",
      "نزل متاح بمنحدرات",
      "دعم تصوير فوتوغرافي متخصص",
    ],
  },
  {
    id: 5,
    name: "مستكشف الوادي المتصدع",
    duration: "5 أيام / 4 ليال",
    route: "نيروبي → بحيرة نيفاشا → أمبوسيلي → نيروبي",
    description:
      "يجمع بين بحيرات الوادي المتصدع وأفيال أمبوسيلي لتجربة متاحة متنوعة",
    details: [
      { day: 1, location: "نيروبي", description: "الوصول وجلسة تعريف عن إمكانية الوصول" },
      { day: 2, location: "بحيرة نيفاشا", description: "رحلة قارب متاحة للكراسي المتحركة وزيارة جزيرة هلال" },
      { day: 3, location: "أمبوسيلي", description: "انتقال إلى أمبوسيلي، جولة برية عند غروب الشمس" },
      { day: 4, location: "أمبوسيلي", description: "يوم كامل لتجربة الحفاظ على الأفيال" },
      { day: 5, location: "نيروبي", description: "رحلة العودة مع توقف غداء متاح" },
    ],
    highlights: [
      "رحلة قارب في بحيرة نيفاشا",
      "أفيال أمبوسيلي",
      "تصوير كليمنجارو",
      "مناظر الوادي المتصدع",
    ],
    accessibility: [
      "قارب مكيف بمنحدر",
      "مركبات كراسي متحركة متعددة",
      "نزل خالية من العوائق",
      "مرشدون مدربون",
    ],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY FEATURES DATA (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
const accessibilityFeatures = [
  {
    icon: <Truck className="h-8 w-8 text-green-600" />,
    title: "مركبات برافعة هيدروليكية ألمانية",
    description:
      "رافعات بسعة 400 كجم تسمح لك بالبقاء في كرسيك المتحرك طوال الجولة البرية.",
    longDescription:
      "تم تجهيز سيارات لاندكروزر 4x4 المخصصة لدينا برافعات هيدروليكية ألمانية حديثة بسعة 400 كجم. تقود كرسيك المتحرك مباشرة على المنصة ويتم تثبيته بأنظمة تثبيت طبية.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: "أنظمة تثبيت طبية المستوى",
    description:
      "تثبيت رباعي النقاط معتمد من ISO يثبت كرسيك المتحرك بشكل صارم أثناء الجولات البرية على التضاريس الوعرة.",
    longDescription:
      "على عكس الأحزمة البسيطة التي يقدمها مشغلون آخرون، تم تجهيز سياراتنا بأنظمة تثبيت مهنية طبية تم اختبارها وفقاً لمعايير ISO.",
  },
  {
    icon: <Hotel className="h-8 w-8 text-green-600" />,
    title: "نزل خالية من العوائق تم تدقيقها بالكامل",
    description:
      "كل نزل شريك لديه دشات متدحرجة، قضبان إمساك، منحدرات، أبواب موسعة، وطاقم مدرب.",
    longDescription:
      "نقوم بمراجعة كل نزل ومخيم نتعامل معه شخصياً. تتضمن قائمة التحقق لدينا دشات متدحرجة مع مقاعد، قضبان إمساك، مداخل موسعة، منحدرات، أسرة منخفضة، وطاقم مدرب على الوعي بالإعاقة.",
  },
  {
    icon: <HandHelping className="h-8 w-8 text-green-600" />,
    title: "مرشدو سفاري مدربون على الإعاقة",
    description:
      "مرشدونا معتمدون في المساعدة على الحركة، بروتوكولات الطوارئ، والوعي بالإعاقة.",
    longDescription:
      "يكمل جميع مرشدي جيه ترافيل تدريباً متخصصاً على التعامل اليدوي مع الكرسي المتحرك، تقنيات النقل، إجراءات الإخلاء الطارئ لمستخدمي الكراسي المتحركة، والتدريب على الحساسية.",
  },
  {
    icon: <BatteryCharging className="h-8 w-8 text-green-600" />,
    title: "شحن الكراسي المتحركة الكهربائية",
    description:
      "جميع مركباتنا ونزلنا بها محطات شحن للكراسي المتحركة الكهربائية والعربات الصغيرة.",
    longDescription:
      "كل مركبة سفاري من جيه ترافيل مجهزة بمقابس كهربائية قياسية، وجميع النزل الشريكة لديها مناطق شحن مخصصة في الغرف المتاحة.",
  },
  {
    icon: <TicketCheck className="h-8 w-8 text-green-600" />,
    title: "تصاريح وصول خاصة",
    description:
      "نحن نرتب جميع التصاريح الخاصة لتتبع الغوريلا المتاح، الجولات البرية لمحدودي الحركة، ودخول المتنزهات بأولوية.",
    longDescription:
      "لتتبع الغوريلا، نرتب تصاريح خاصة تشمل حمالين ومسارات أقصر. للمتنزهات الوطنية، نضمن دخولاً بأولوية ونقاط مشاهدة متاحة.",
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// DESTINATION DEEP DIVE DATA (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
const destinationDeepDive = [
  {
    icon: <TreePine className="h-8 w-8 text-amber-700" />,
    name: "محمية ماساي مارا الوطنية",
    region: "جنوب غرب كينيا",
    accessibility: "★★★★★",
    description:
      "موطن الهجرة الكبرى ومشاهدة الحيوانات الخمسة الكبار على مدار السنة. تتنقل مركباتنا ذات الرافعة الهيدروليكية في جميع أنواع التضاريس.",
    accessibleFeatures: [
      "مركبات برافعة هيدروليكية لجميع الجولات البرية",
      "منصات مشاهدة متاحة لعبور النهر",
      "مخيمات قماشية خالية من العوائق داخل المحمية",
      "مرشدون مدربون للمساعدة على الحركة",
    ],
    bestTime: "يونيو–أكتوبر (الهجرة) | ديسمبر–فبراير (الولادات)",
    wildlife: "أسود، نمور، أفيال، جاموس، وحيد قرن، فهود، ضباع، جاموس بري، حمر وحشية، زرافات",
  },
  {
    icon: <Mountain className="h-8 w-8 text-amber-700" />,
    name: "منتزه أمبوسيلي الوطني",
    region: "جنوب شرق كينيا",
    accessibility: "★★★★☆",
    description:
      "يشتهر بقطعان الأفيال الكبيرة مع خلفية جبل كليمنجارو. منصات مشاهدة متاحة في المستنقعات.",
    accessibleFeatures: [
      "منصات مشاهدة مرتفعة متاحة في المستنقعات",
      "نزل صديق للكراسي المتحركة بمداخل منحدرة",
      "مركبات مكيفة لجولات المنتزه",
      "تضاريس سهلة للكراسي اليدوية",
    ],
    bestTime: "يونيو–أكتوبر | يناير–فبراير",
    wildlife: "أفيال (أكبر قطعان في كينيا)، أسود، فهود، ضباع مرقطة، زرافات، حمر وحشية، جاموس بري",
  },
  {
    icon: <Waves className="h-8 w-8 text-amber-700" />,
    name: "منتزه بحيرة ناكورو الوطني",
    region: "وسط كينيا",
    accessibility: "★★★★☆",
    description:
      "معروف بملايين طيور الفلامنغو ومحمية وحيد القرن. نقاط مشاهدة متاحة على طول شاطئ البحيرة.",
    accessibleFeatures: [
      "نقاط مشاهدة فلامنغو متاحة",
      "محمية وحيد القرن بمسارات متاحة للكراسي المتحركة",
      "مركبات مكيفة للجولات البرية",
      "مواقع غداء متاحة مع إطلالات على البحيرة",
    ],
    bestTime: "على مدار السنة",
    wildlife: "فلامنغو، بجع، وحيد قرن (أسود وأبيض)، أسود، نمور، زرافات، جاموس",
  },
  {
    icon: <Sun className="h-8 w-8 text-amber-700" />,
    name: "تسافو الشرقية والغربية",
    region: "جنوب شرق كينيا",
    accessibility: "★★★★☆",
    description:
      "برية شاسعة تشتهر بالأفيال الحمراء والحمم البركانية. شبكة طرق جيدة لرحلات السفاري المتاحة.",
    accessibleFeatures: [
      "طرق جيدة الصيانة مناسبة لمركبات الكراسي المتحركة",
      "نزل متاحة بدشات متدحرجة",
      "مشاهدة الأفيال الحمراء من مركبات مكيفة",
      "مشاهدة أفراس النهر تحت الماء في ينابيع مزيما (وصول بمنحدرات)",
    ],
    bestTime: "يونيو–أكتوبر | يناير–فبراير",
    wildlife: "أفيال حمراء، أسود، نمور، زرافات، حمر وحشية، أفراس نهر، تماسيح، أكثر من 500 نوع طيور",
  },
  {
    icon: <Compass className="h-8 w-8 text-amber-700" />,
    name: "سامبورو وشابا",
    region: "شمال كينيا",
    accessibility: "★★★☆☆",
    description:
      "أنواع فريدة شمالية تشمل الزرافات شبكية وحمر غريفزي الوحشية. حشود أقل لرحلات السفاري المتاحة.",
    accessibleFeatures: [
      "مشاهدة أنواع شمالية متخصصة",
      "نزل متاحة بمداخل منحدرة",
      "مركبات مكيفة لمشاهدة عبور النهر",
      "محميات هادئة لوتيرة مريحة",
    ],
    bestTime: "يونيو–أكتوبر | ديسمبر–مارس",
    wildlife: "زرافات شبكية، حمر غريفزي الوحشية، نعام صومالي، غرنوق، مها، أفيال، أسود",
  },
  {
    icon: <Map className="h-8 w-8 text-amber-700" />,
    name: "بحيرة نيفاشا وباب الجحيم",
    region: "وسط كينيا",
    accessibility: "★★★★☆",
    description:
      "رحلات قارب بمنحدرات للكراسي المتحركة ومسارات مشي متاحة. رحلة سهلة من نيروبي.",
    accessibleFeatures: [
      "رحلة قارب متاحة للكراسي المتحركة بمنحدر",
      "مسارات مشي مسطحة في باب الجحيم (صديقة للكراسي اليدوية)",
      "نزل ومخيمات متاحة",
      "مناسبة لرحلات اليوم من نيروبي",
    ],
    bestTime: "على مدار السنة",
    wildlife: "أفراس نهر، زرافات، حمر وحشية، ظباء، أكثر من 400 نوع طيور بما في ذلك عقاب السمك",
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// SEASONAL GUIDE DATA (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
const seasonalGuide = [
  {
    icon: <Sun className="h-8 w-8 text-yellow-600" />,
    season: "موسم الجفاف",
    months: "يونيو – أكتوبر",
    accessibility: "★★★★★ الأفضل لمستخدمي الكراسي المتحركة",
    description:
      "الطرق الترابية صلبة وسهلة الملاحة. تتركز الحياة البرية حول مصادر المياه، مما يجعل المشاهدة أسهل.",
    pros: [
      "طرق صلبة ثابتة – أسهل للملاحة المركبة",
      "الحياة البرية تتركز في الثقوب المائية – مسافات أقصر",
      "عبور النهر للهجرة الكبرى (يوليو-أكتوبر)",
      "مثالي للتصوير الفوتوغرافي",
    ],
    cons: [
      "طلب مرتفع – احجز قبل 6+ أشهر",
      "أسعار أعلى للإقامة",
      "الغبار قد يمثل مشكلة لحالات الجهاز التنفسي",
    ],
    packingTips: "واقي شمس، قبعة، ملابس خفيفة، كمامة غبار، مناظير، كاميرا بعدسة تقريب",
  },
  {
    icon: <CloudRain className="h-8 w-8 text-blue-600" />,
    season: "الموسم الأخضر",
    months: "نوفمبر – ديسمبر ومارس – مايو",
    accessibility: "★★★★☆ جيد",
    description:
      "مناظر طبيعية خضراء، صغار حيوانات، وحشود أقل. تظل الطرق متاحة بمركباتنا 4x4.",
    pros: [
      "أسعار أقل وسياح أقل",
      "مناظر خضراء خصبة للتصوير",
      "صغار الحيوانات وموسم الولادات (يناير-فبراير)",
      "سهولة الحجز في اللحظة الأخيرة",
    ],
    cons: [
      "بقع طينية عرضية على الطرق",
      "بعض الحياة البرية تنتشر بسبب كثرة المياه",
      "رطوبة أعلى في المناطق الساحلية",
    ],
    packingTips: "سترة مطر خفيفة، حقيبة مقاومة للماء للإلكترونيات، طارد حشرات، طبقات خفيفة",
  },
  {
    icon: <Flower2 className="h-8 w-8 text-purple-600" />,
    season: "أشهر المواسم الانتقالية",
    months: "يناير – فبراير ويونيو",
    accessibility: "★★★★☆ جيد جداً",
    description:
      "منطقة وسطى بين الفصول: طقس جيد، حشود أقل، ومشاهدة حياة برية ممتازة.",
    pros: [
      "موسم الولادات في يناير-فبراير",
      "الاستعداد للهجرة في يونيو",
      "أسعار وتوافر معتدلان",
      "ظروف جوية ممتازة",
    ],
    cons: [
      "قد يكون عاصفاً في فبراير",
      "بعض المخيمات تغلق للصيانة في نوفمبر",
    ],
    packingTips: "طبقات للبرد صباحاً/مساءً، حماية من الشمس، ملابس سفاري مريحة",
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// DISABILITY ACCOMMODATIONS DATA (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
const disabilityAccommodations = [
  {
    icon: <Accessibility className="h-8 w-8 text-blue-600" />,
    title: "مستخدمو الكراسي المتحركة",
    description:
      "مستخدمو الكراسي المتحركة بدوام كامل وجزئي هم تخصصنا. روافع هيدروليكية، أنظمة تثبيت، ونزل خالية من العوائق.",
    features: [
      "مركبات برافعة هيدروليكية 400 كجم",
      "أنظمة تثبيت طبية المستوى",
      "دشات متدحرجة بمقاعد",
      "مداخل موسعة (32+ بوصة)",
      "منحدرات عند جميع مداخل النزل",
      "منصات مشاهدة برية متاحة",
    ],
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "محدودو الحركة",
    description:
      "لمن يستطيعون المشي لمسافات قصيرة لكنهم يحتاجون مساعدة في المسافات الأطول أو السلالم.",
    features: [
      "دخول المركبة بدون عتبات برافعة",
      "مقاعد قريبة من باب المركبة",
      "استيعاب المشايات والعكازات",
      "مسارات تقلل المشي",
      "حمامات متاحة في فترات التوقف",
      "فترات راحة حسب الحاجة",
    ],
  },
  {
    icon: <Eye className="h-8 w-8 text-blue-600" />,
    title: "ضعف البصر",
    description:
      "السفاري تجربة حسية لا تصدق للمسافرين المكفوفين وضعاف البصر.",
    features: [
      "وصف صوتي للحياة البرية",
      "فرص لمس (مع بروتوكولات الأمان)",
      "إرشادات الوعي بالروائح والأصوات",
      "كلاب إرشاد مرحب بها",
      "مواد برايل متاحة",
      "مساعدة في التوجيه اللفظي",
    ],
  },
  {
    icon: <Mic className="h-8 w-8 text-blue-600" />,
    title: "ضعف السمع",
    description:
      "نضمن التواصل الكامل للمسافرين الصم وضعاف السمع.",
    features: [
      "مترجمو لغة إشارة متاحون",
      "مواد مكتوبة لكل المعلومات",
      "تنبيهات بصرية للإعلانات الهامة",
      "ترجمة لأي محتوى فيديو",
      "أجهزة استماع مساعدة",
      "خيارات تواصل قائمة على النص",
    ],
  },
  {
    icon: <Heart className="h-8 w-8 text-blue-600" />,
    title: "الحالات الإدراكية والعصبية",
    description:
      "يمكن تكييف السفاري للمسافرين المصابين بالتوحد أو الخرف أو حالات إدراكية أخرى.",
    features: [
      "وتيرة مرنة صديقة للحواس",
      "خيارات مركبة هادئة",
      "مسارات قائمة على الروتين",
      "جداول مرئية متاحة",
      "جولات برية قليلة التحفيز",
      "مرشدون داعمون صبورون",
    ],
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "الحالات الطبية",
    description:
      "المسافرون المصابون بالسكري أو أمراض الجهاز التنفسي أو احتياجات طبية أخرى مدعومون بالكامل.",
    features: [
      "حقيبة أدوية على متن المركبة",
      "تبريد للأدوية",
      "هواتف أقمار صناعية للحالات الطارئة",
      "تغطية الإخلاء بالطبيب الطائر",
      "ترتيبات غذائية",
      "أكسجين متاح عند الطلب",
    ],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT (ARABIC)
// ──────────────────────────────────────────────────────────────────────────────
export default function DisabilityToursPage() {
  return (
    <div className="pb-16">
      <AllPageSEOSchema
        type="category"
        slug="disability-tours"
        categoryOpts={{
          title: "رحلات سفاري صديقة لذوي الإعاقة في شرق أفريقيا",
          description: "تجارب سفاري شاملة للمسافرين ذوي الإعاقات. مركبات مكيفة ونزل متاحة.",
          image: "/wheelchair-accessible-tanzania-safari.webp",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("accessible") || t.title?.toLowerCase().includes("accessible") || t.description?.toLowerCase().includes("accessible")) : [],
        }} />
      <JsonLd id="page-structured-data" data={schema} />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/accessible-safari-wheelchair.jpg"
            alt="مستخدم كرسي متحرك على مركبة سفاري متاحة برافعة هيدروليكية في كينيا 2026 – جولة برية في ماساي مارا مع جيه ترافيل"
            fill
            className="object-cover brightness-50"
            priority
            quality={90} />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Accessibility className="h-10 w-10" />
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
            سفاري كينيا المتاح للكراسي المتحركة 2026 – مغامرات شاملة للجميع
          </h1>

          <div className="mx-auto max-w-5xl">
            <p className="mb-8 text-xl leading-relaxed text-white/90 text-pretty">
              أرقى منظم لرحلات <strong>سفاري كينيا المتاح للكراسي المتحركة</strong> و{" "}
              <strong>الجولات المتاحة للكراسي المتحركة في كينيا</strong>. مركبات 4x4 برافعة هيدروليكية ألمانية،
              نزل خالية من العوائق، تواريخ الهجرة الكبرى في ماساي مارا 2026، وتتبع الغوريلا في رواندا.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg">
              <Link href="#itineraries">خطوط الرحلة لعام 2026</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[220px]">
              <Link href="/ar/contact">استشارة مجانية حول إمكانية الوصول</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="min-w-[220px]">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" /> واتساب الآن
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== INTRODUCTION SECTION ========== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
                رحلات سفاري شاملة للكراسي المتحركة – إعادة تعريف المغامرة في كينيا 2026
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    في جيه ترافيل، نؤمن بأن <strong>الإعاقة لا يجب أن تحد من الاكتشاف</strong>.
                    برامج <strong>سفاري كينيا المتاح للكراسي المتحركة</strong> مصممة للمسافرين
                    الذين يستخدمون الكراسي المتحركة، محدودي الحركة، والعائلات ذات الاحتياجات الخاصة.
                  </p>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    مركبات مخصصة برافعات هيدروليكية، <strong>نزل خالية من العوائق</strong>، ومرشدون مدربون
                    على الإعاقة يجعلون كل <strong>جولة متاحة للكراسي المتحركة في كينيا</strong> سلسة لا تُنسى.
                  </p>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    من الهجرة الكبرى التي تشاهدها من كرسيك المتحرك إلى لقاءات الغوريلا في رواندا – نجعلها ممكنة.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/1d4b068a-3c99-4055-8496-78e638eb1011.jpg"
                alt="مجموعة تستمتع بجولة سفاري برية متاحة للكراسي المتحركة في كينيا بمركبة مكيفة"
                fill
                className="object-cover"
                quality={90} />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ADVANCED FLEET SECTION ========== */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
            أحدث مركبات سفاري متاحة للكراسي المتحركة في كينيا 2026
          </h2>
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <p className="text-lg text-muted-foreground">
              روافع هيدروليكية ألمانية بسعة 400 كجم – الأسطول الوحيد المبني حصرياً لمستخدمي الكراسي المتحركة
              طوال الوقت في <strong>سفاري كينيا المتاح للكراسي المتحركة</strong>.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image
                src="/accessible-vehicle-lift.jpg"
                alt="الرافعة الهيدروليكية الألمانية على مركبة سفاري متاحة للكراسي المتحركة في كينيا 2026"
                width={400}
                height={300}
                className="mb-6 w-full rounded-lg"
                quality={90} />
              <h3 className="mb-3 text-xl font-semibold">نظام رافعة هيدروليكية ألماني</h3>
              <p className="text-muted-foreground">
                سعة 400 كجم – ادخل واخرج دون مغادرة كرسيك المتحرك.
              </p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image
                src="/wheelchair-securement.jpg"
                alt="تثبيت طبي للكرسي المتحرك في سفاري كينيا المتاح للكراسي المتحركة"
                width={400}
                height={300}
                className="mb-6 w-full rounded-lg"
                quality={90} />
              <h3 className="mb-3 text-xl font-semibold">تثبيت رباعي النقاط طبي المستوى</h3>
              <p className="text-muted-foreground">
                أنظمة تثبيت معتمدة من ISO للتضاريس الوعرة الأفريقية.
              </p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image
                src="/accessible-safari-interior.jpg"
                alt="داخلية واسعة لمركبة سفاري متاحة للكراسي المتحركة في ماساي مارا كينيا"
                width={400}
                height={300}
                className="mb-6 w-full rounded-lg"
                quality={90} />
              <h3 className="mb-3 text-xl font-semibold">داخلية بانورامية وواسعة</h3>
              <p className="text-muted-foreground">
                تحكم في المناخ وأبواب واسعة لراحة <strong>الجولات المتاحة للكراسي المتحركة في كينيا</strong>.
              </p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm border">
              <Image
                src="/medical-kit-safari.jpg"
                alt="حقيبة طبية على متن مركبة سفاري متاحة للكراسي المتحركة كينيا 2026"
                width={400}
                height={300}
                className="mb-6 w-full rounded-lg"
                quality={90} />
              <h3 className="mb-3 text-xl font-semibold">حقيبة طبية وأمان على متن المركبة</h3>
              <p className="text-muted-foreground">
                لوازم طبية كاملة لراحة بال تامة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMPARISON TABLE ========== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
            لماذا يختار المسافرون جيه ترافيل لسفاري كينيا المتاح للكراسي المتحركة
          </h2>
          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl bg-card text-sm shadow-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-5 text-left font-semibold">الميزة</th>
                  <th className="p-5 font-semibold">جيه ترافيل</th>
                  <th className="p-5 font-semibold">المشغلون التقليديون</th>
                 </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-5 border-t font-medium">سعة الرافعة</td>
                  <td className="p-5 border-t text-green-600 font-semibold">400 كجم هيدروليكية ألمانية</td>
                  <td className="p-5 border-t">منحدرات يدوية (150 كجم كحد أقصى)</td>
                 </tr>
                <tr>
                  <td className="p-5 font-medium">نظام التثبيت</td>
                  <td className="p-5 text-green-600 font-semibold">طبي رباعي النقاط</td>
                  <td className="p-5">أحزمة بسيطة</td>
                 </tr>
                <tr>
                  <td className="p-5 font-medium">إمكانية الوصول في النزل</td>
                  <td className="p-5 text-green-600 font-semibold">تم تدقيقها بالكامل – خالية من العوائق</td>
                  <td className="p-5">نزل قياسية</td>
                 </tr>
                <tr>
                  <td className="p-5 font-medium">تواريخ 2026</td>
                  <td className="p-5 text-green-600 font-semibold">مواعيد مضمونة في ماساي مارا</td>
                  <td className="p-5">توفر محدود</td>
                 </tr>
                <tr>
                  <td className="p-5 font-medium">البقاء على كرسيك المتحرك</td>
                  <td className="p-5 text-green-600 font-semibold">نعم – طوال الجولة البرية</td>
                  <td className="p-5">نقل مطلوب</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== 2026 DATES TABLE ========== */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
            تواريخ 2026 لسفاري كينيا المتاح للكراسي المتحركة – ماساي مارا وتتبع الغوريلا
          </h2>
          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl bg-card text-sm shadow-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-5 text-left">الفترة</th>
                  <th className="p-5">ماساي مارا</th>
                  <th className="p-5">تتبع الغوريلا</th>
                  <th className="p-5">توصية للكراسي المتحركة</th>
                 </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-5 font-medium">يونيو–سبتمبر</td>
                  <td className="p-5">ذروة الهجرة الكبرى</td>
                  <td className="p-5">موسم الجفاف – مسارات سهلة</td>
                  <td className="p-5 text-green-600 font-semibold">★★★★★ الأفضل</td>
                 </tr>
                <tr>
                  <td className="p-5 font-medium">يوليو–أكتوبر</td>
                  <td className="p-5">ذروة عبور النهر</td>
                  <td className="p-5">ممتاز</td>
                  <td className="p-5 text-green-600 font-semibold">مثالي لمستخدمي الكراسي المتحركة</td>
                 </tr>
                <tr>
                  <td className="p-5 font-medium">ديسمبر–فبراير</td>
                  <td className="p-5">موسم الولادات</td>
                  <td className="p-5">مسارات مثالية</td>
                  <td className="p-5 text-green-600 font-semibold">وصول ممتاز</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== ACCESSIBILITY FEATURES (groups of 3) ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              ميزات إمكانية الوصول الشاملة لرحلتك
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                كل جانب من جوانب <strong>سفاري كينيا المتاح للكراسي المتحركة</strong> مصمم مع احتياجاتك في الاعتبار – من المركبات إلى النزل إلى المرشدين.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {accessibilityFeatures.map((feature, index) => (
              <Card key={index} className="border-2 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{feature.description}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-primary hover:underline">
                      اعرف المزيد
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.longDescription}
                    </p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ITINERARIES SECTION ========== */}
      <section id="itineraries" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              خطوط رحلات سفاري متاحة للكراسي المتحركة في كينيا 2026
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                كل خط رحلة يشمل <strong>مركبات سفاري متاحة للكراسي المتحركة</strong>،
                مخيمات خالية من العوائق، وطاقم دعم مدرب لـ <strong>جولات ذوي الإعاقة في كينيا</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {accessibleItineraries.map((itinerary) => (
              <Card
                key={itinerary.id}
                className="overflow-hidden border-2 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="grid gap-6 p-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <h3 className="mb-2 text-2xl font-bold">{itinerary.name}</h3>
                      <div className="mb-3 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {itinerary.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Map className="h-4 w-4" />
                          {itinerary.route}
                        </div>
                      </div>
                      <p className="mb-4 leading-relaxed text-muted-foreground">{itinerary.description}</p>

                      <div className="mb-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-semibold text-primary">أبرز الجولة</h4>
                          <ul className="space-y-1 text-sm">
                            {itinerary.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold text-primary">ميزات إمكانية الوصول</h4>
                          <ul className="space-y-1 text-sm">
                            {itinerary.accessibility.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Accessibility className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/30 p-4">
                      <h4 className="mb-3 text-center font-semibold">خط الرحلة الموجز</h4>
                      <div className="space-y-3">
                        {itinerary.details.map((detail) => (
                          <div
                            key={detail.day}
                            className="flex gap-3 rounded bg-background p-2"
                          >
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                              {detail.day}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{detail.location}</p>
                              <p className="text-xs text-muted-foreground">
                                {detail.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="mt-4 w-full">
                        <Link href={`/ar/contact?itinerary=${itinerary.id}`}>
                          تخصيص رحلة السفاري المتاحة هذه
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="mx-auto mb-6 max-w-3xl">
              <p className="leading-relaxed text-muted-foreground">
                ألا ترى خط رحلة <strong>سفاري متاح للكراسي المتحركة</strong> مناسباً؟ نحن متخصصون
                في تصميم مسارات مخصصة وفقاً لاحتياجات إمكانية الوصول الخاصة بك.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/ar/contact">صمم رحلة السفاري المتاحة الخاصة بك</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US (groups of 3) ========== */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              لماذا تختار جيه ترافيل لسفاري المتاح للكراسي المتحركة
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                نحن لا نستوعب الإعاقات فقط – بل نتخصص في خلق تجارب <strong>سفاري متاح للكراسي المتحركة</strong> استثنائية.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Accessibility className="h-7 w-7 text-primary" />,
                title: "مركبات سفاري مخصصة للكراسي المتحركة",
                desc: "روافع هيدروليكية، أبواب واسعة، تثبيت آمن، أسقف قابلة للرفع، وكراسي متحركة متعقبة لجميع التضاريس متاحة.",
              },
              {
                icon: <Shield className="h-7 w-7 text-primary" />,
                title: "نزل ومخيمات خالية من العوائق 100%",
                desc: "دشات متدحرجة، قضبان إمساك، منحدرات، أسرة منخفضة، ومناطق طعام متاحة.",
              },
              {
                icon: <Users className="h-7 w-7 text-primary" />,
                title: "مرشدون وفرق دعم مدربون على الإعاقة",
                desc: "معتمدون في المساعدة على الحركة، أساسيات لغة الإشارة، وبروتوكولات الطوارئ.",
              },
              {
                icon: <Heart className="h-7 w-7 text-primary" />,
                title: "مسارات سفاري للكراسي المتحركة مخصصة بالكامل",
                desc: "تتناسب مع مستوى طاقتك واحتياجاتك الطبية واهتماماتك.",
              },
              {
                icon: <Award className="h-7 w-7 text-primary" />,
                title: "سياحة متاحة حائزة على جوائز",
                desc: "معترف بها من قبل مجلس السياحة الكيني للتميز في السفر الشامل.",
              },
              {
                icon: <Globe className="h-7 w-7 text-primary" />,
                title: "مغامرات متاحة للكراسي المتحركة متعددة البلدان",
                desc: "اجمع بين كينيا وتنزانيا ورواندا وأوغندا في رحلة واحدة سلسة.",
              },
            ].map((item, i) => (
              <Card key={i} className="border-2 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DESTINATION DEEP DIVE (groups of 3) ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              وجهات سفاري متاحة للكراسي المتحركة في شرق أفريقيا
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                استكشف أفضل وجهاتنا لـ <strong>جولات السفاري المتاحة للكراسي المتحركة في كينيا</strong> وما بعدها – كل منها تم تدقيقها لميزات إمكانية الوصول وتجارب الحياة البرية.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinationDeepDive.map((dest, index) => (
              <Card key={index} className="border-2 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-3 text-primary">{dest.icon}</div>
                  <h3 className="mb-1 text-xl font-semibold">{dest.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{dest.region}</p>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm font-medium">إمكانية الوصول:</span>
                    <span className="text-sm text-yellow-500">{dest.accessibility}</span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{dest.description}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-primary hover:underline">
                      ميزات الوصول والحياة البرية
                    </summary>
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-semibold">ميزات متاحة:</p>
                      <ul className="mb-3 space-y-1">
                        {dest.accessibleFeatures.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs">
                            <Check className="h-3 w-3 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-semibold">أفضل وقت:</p>
                      <p className="mb-2 text-xs text-muted-foreground">{dest.bestTime}</p>
                      <p className="text-sm font-semibold">الحياة البرية:</p>
                      <p className="text-xs text-muted-foreground">{dest.wildlife}</p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SEASONAL ACCESSIBILITY GUIDE (groups of 3) ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              متى تذهب: دليل موسمي للسفاري المتاح للكراسي المتحركة
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                يساعدك فهم فصول كينيا في التخطيط لتجربة <strong>سفاري كينيا المتاح للكراسي المتحركة 2026</strong> المثالية.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {seasonalGuide.map((season, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    {season.icon}
                    <h3 className="text-xl font-bold">{season.season}</h3>
                  </div>
                  <p className="mb-1 text-sm text-muted-foreground">{season.months}</p>
                  <p className="mb-3 text-sm font-semibold text-green-600">{season.accessibility}</p>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{season.description}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-primary hover:underline">
                      الإيجابيات والسلبيات ونصائح التعبئة
                    </summary>
                    <div className="mt-3">
                      <p className="text-sm font-semibold">الإيجابيات:</p>
                      <ul className="mb-3 space-y-1">
                        {season.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs">
                            <Check className="h-3 w-3 text-green-600" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-semibold">السلبيات:</p>
                      <ul className="mb-3 space-y-1">
                        {season.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs">
                            <span className="text-red-500">—</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-semibold">نصائح التعبئة:</p>
                      <p className="text-xs text-muted-foreground">{season.packingTips}</p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ACCESSIBILITY BY DISABILITY TYPE (groups of 3) ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              ميزات إمكانية الوصول حسب نوع الإعاقة
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                كل مسافر فريد. نحن نخصص <strong>سفاري كينيا المتاح للكراسي المتحركة</strong> وفقاً لاحتياجاتك وتفضيلاتك الخاصة.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {disabilityAccommodations.map((item, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{item.description}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-primary hover:underline">
                      عرض التجهيزات
                    </summary>
                    <ul className="mt-3 space-y-1">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <Check className="h-3 w-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT'S INCLUDED ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              المضمن في كل رحلة سفاري متاحة للكراسي المتحركة
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                من الوصول إلى المغادرة – كل شيء مغطى مع إمكانية الوصول للكراسي المتحركة في صميم الخدمة.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "مركبات سفاري 4x4 مكيفة للكراسي المتحركة برافعات هيدروليكية وأنظمة تثبيت",
              "انتقالات متاحة من وإلى المطار في نيروبي وأروشا وكيغالي أو عنتيبي",
              "إقامة في نزل خالية من العوائق بدشات متدحرجة وقضبان إمساك ومنحدرات",
              "جميع رسوم المتنزهات الوطنية ورسوم الحفظ وتصاريح الوصول الخاصة",
              "مرشد ناطق بالإنجليزية مدرب على دعم الإعاقة (لغات متعددة عند الطلب)",
              "استشارة ما قبل الرحلة حول إمكانية الوصول بالكراسي المتحركة",
              "خط مساعدة دعم أثناء الرحلة على مدار الساعة وخطة إخلاء طبي طارئ",
              "كرسي متحرك متعقب محمول لجميع التضاريس (عند الطلب)",
              "ترتيبات طعام متاحة وتلبية الاحتياجات الغذائية",
              "وتيرة مخصصة بأوقات بدء مرنة وتوقف للراحة",
              "تجارب ثقافية مكيفة للاحتياجات الحركية والحسية",
              "نقل وتجهيز معدات متخصصة",
              "فرص تصوير فوتوغرافي متاحة ومنصات مشاهدة",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED TOURS ========== */}
      <section id="tours" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              باقات سفاري متاحة للكراسي المتحركة مميزة
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                اختر من بين باقات السفاري المتاحة للكراسي المتحركة الأكثر شهرة أو دعنا نصمم خط رحلة مخصصاً.
              </p>
            </div>
          </div>

          {disabilityTours.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {disabilityTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="mb-4 text-muted-foreground">
                جولات سفاري متاحة للكراسي المتحركة جديدة قريباً!
              </p>
              <Button asChild>
                <Link href="/ar/contact">طلب سفاري متاح للكراسي المتحركة مخصص</Link>
              </Button>
            </Card>
          )}

          <div className="mt-12 text-center">
            <div className="mx-auto mb-6 max-w-3xl">
              <p className="leading-relaxed text-muted-foreground">
                ألا تجد خط الرحلة المثالي؟ نحن متخصصون في السفاري المتاحة للكراسي المتحركة المصممة حسب الطلب.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/ar/contact">بناء جولتك المخصصة</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS (groups of 3) ========== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            قصص حقيقية من مسافري السفاري المتاحة للكراسي المتحركة
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "ديفيد تشين",
                location: "كندا",
                disability: "شلل سفلي T6 – مستخدم كرسي متحرك بدوام كامل",
                text: "المركبة ذات الرافعة الهيدروليكية غيرت قواعد اللعبة. رأيت فهوداً تصطاد على مستوى العين من كرسيي المتحرك.",
                rating: 5,
                image: "/testimonial-david.jpg",
              },
              {
                name: "ماريا رودريغيز",
                location: "إسبانيا",
                disability: "حركة محدودة – تستخدم مشاية وكرسي متحرك",
                text: "النزل المتاح في سيرينجيتي كان به منحدرات إلى الشرفة ودشات متدحرجة. شاهدت الفيلة عند الغروب كل ليلة.",
                rating: 5,
                image: "/testimonial-maria.jpg",
              },
              {
                name: "جيمس ويلسون",
                location: "المملكة المتحدة",
                disability: "مستخدم كرسي متحرك – تجربة تتبع الغوريلا",
                text: "بكيت عندما رأيت الغوريلا الفضية من كرسيي المعدل. تجربة غيرت حياتي حقاً.",
                rating: 5,
                image: "/testimonial-james.jpg",
              },
            ].map((t, i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                      <Image src={t.image} alt={t.name} width={64} height={64} className="object-cover" quality={90} />
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <p className="mt-3 text-xs italic text-muted-foreground">{t.disability}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            أسئلة متكررة حول السفاري المتاحة للكراسي المتحركة
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {[
              {
                q: "ما أنواع الإعاقات التي تستوعبونها؟",
                a: "نرحب بمستخدمي الكراسي المتحركة، محدودي الحركة، ضعاف البصر/السمع، كبار السن، والحالات الإدراكية. كل رحلة تبدأ باستشارة مجانية حول إمكانية الوصول.",
              },
              {
                q: "هل المركبات آمنة على التضاريس الوعرة؟",
                a: "نعم. مصممة خصيصاً برافعات هيدروليكية، نظام تعليق ممتص للصدمات، أقفال آمنة، وتحكم في المناخ – تخضع لأعلى معايير السلامة.",
              },
              {
                q: "هل يمكنني إحضار كرسيي المتحرك أو عربتي الكهربائية؟",
                a: "بالتأكيد. نوصي بالموديلات خفيفة الوزن/القابلة للطي. نوفر كراسي متحركة يدوية احتياطية ومحطات شحن.",
              },
              {
                q: "كيف تتعاملون مع حالات الطوارئ الطبية؟",
                a: "المرشدون يحملون هواتف أقمار صناعية وحقائب إسعافات أولية. نتعاون مع خدمات الأطباء الطائرين ونرتب مسبقاً الوصول إلى مستشفيات متاحة للكراسي المتحركة.",
              },
              {
                q: "هل تتبع الغوريلا المتاح للكراسي المتحركة ممكن؟",
                a: "نعم. تصاريح خاصة وفرق حملة متمرسة في رواندا/أوغندا. تشمل جميع المعدات التكيفية والموظفين المدربين.",
              },
              {
                q: "ما الذي يجعل رحلاتكم مختلفة؟",
                a: "مبنية من الأساس لإمكانية الوصول – مركبات مخصصة، إقامات خالية من العوائق، موظفين مدربين، معدات تكيفية، ومسارات مريحة.",
              },
              {
                q: "هل هناك تكاليف إضافية لميزات إمكانية الوصول؟",
                a: "لا. جميع ميزات إمكانية الوصول مضمنة في الأسعار – لا رسوم خفية.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold text-primary">{faq.q}</h3>
                  <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
              رحلة سفاري كينيا المتاحة للكراسي المتحركة 2026 في انتظارك
            </h2>
            <div className="mx-auto mb-8 max-w-3xl">
              <p className="text-lg leading-relaxed text-pretty text-primary-foreground/90">
                دع خبراءنا يصممون رحلة آمنة ومريحة ومثيرة مصممة خصيصاً لاحتياجاتك – من أول استفسار إلى آخر جولة برية.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/ar/contact">ابدأ التخطيط لرحلتك 2026</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                <a href="tel:+254726485228">اتصل +254 726 485 228</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/80">
              استشارة مجانية • بدون التزام • رد خلال ساعتين
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}