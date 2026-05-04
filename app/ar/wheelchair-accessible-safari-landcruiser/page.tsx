import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users, Clock, Car, Wifi, Accessibility, Star, Award, MapPin, CheckCircle, Phone, Mail, Calendar, Heart, Zap, Globe } from "lucide-react"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"
import JsonLd from "@/components/JsonLd"
import { tours } from "@/lib/i18n/data/ar/tours-data"

// ————————————————————————
// ULTIMATE SEO METADATA - DOMINATING "مركبة لاندكروزر متاحة للكراسي المتحركة كينيا"
// ————————————————————————
export const generateMetadata = (): Metadata => {
  // Primary target بالعربية
  const primaryKeywords = [
    "مركبة لاندكروزر متاحة للكراسي المتحركة كينيا",
    "لاندكروزر متاحة للكراسي المتحركة كينيا",
    "سفاري لاندكروزر متاح كينيا",
    "مركبة كينيا متاحة للكراسي المتحركة",
    "لاندكروزر صديقة للكراسي المتحركة كينيا",
    "لاندكروزر متاحة لذوي الإعاقة كينيا"
  ]

  // Secondary: Related safari and vehicle terms
  const secondaryKeywords = [
    "مركبات سفاري متاحة كينيا",
    "سفاري كينيا متاح للكراسي المتحركة",
    "لاندكروزر معدلة كرسي متحرك كينيا",
    "لاندكروزر متاحة للمعاقين كينيا",
    "لاندكروزر متاحة للحركة",
    "مركبة سفاري تكيفية كينيا"
  ]

  // Long-tail: User intent keywords
  const longTailKeywords = [
    "استئجار لاندكروزر متاحة للكراسي المتحركة نيروبي",
    "تأجير لاندكروزر متاحة كينيا",
    "سعر لاندكروزر متاحة كينيا",
    "لاندكروزر سفاري لمستخدمي الكراسي المتحركة",
    "تويوتا لاندكروزر معدلة كينيا كرسي متحرك",
    "مركبة سفاري كينيا متاحة للكراسي المتحركة"
  ]

  const allKeywords = [...primaryKeywords, ...secondaryKeywords, ...longTailKeywords]

  return {
    title: "لاندكروزر متاحة للكراسي المتحركة | تأجير مركبات سفاري",
    description:
     "استأجر لاندكروزر متاحة للكراسي المتحركة في كينيا برافعة هيدروليكية وسقف قابل للرفع وأنظمة تثبيت آمنة. مثالية لرحلات سفاري ماساي مارا وأمبوسيلي.",
    keywords: allKeywords.join(", "),
    openGraph: {
      title: "لاندكروزر متاحة للكراسي المتحركة كينيا | مركبة سفاري برافعة هيدروليكية",
      description: "أفضل لاندكروزر متاحة للكراسي المتحركة في كينيا للسفاري. رافعة هيدروليكية، سقف قابل للرفع، أنظمة تثبيت طبية. احجز مركبتك المتاحة لماساي مارا وأمبوسيلي.",
      images: [
        {
          url: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
          width: 1200,
          height: 630,
          alt: "لاندكروزر كينيا متاحة للكراسي المتحركة برافعة هيدروليكية في ماساي مارا"
        }
      ],
      type: "website",
      siteName: "جيه ترافيل إكسبديشنز", 
      locale: "ar_AR"
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/ar/wheelchair-accessible-safari-landcruiser",
      languages: {
        'ar': 'https://www.jaetravel.co.ke/ar/wheelchair-accessible-safari-landcruiser',
        'en': 'https://www.jaetravel.co.ke/wheelchair-accessible-safari-landcruiser',
        'x-default': 'https://www.jaetravel.co.ke/wheelchair-accessible-safari-landcruiser',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  }
}

// ————————————————————————
// ميزات المركبة الرائدة - خاصة باللاندكروزر
// ————————————————————————
const vehicleFeatures = [
  {
    icon: Shield,
    title: "لاندكروزر معتمدة ومتاحة للكراسي المتحركة",
    description: "أسطول لاندكروزر الوحيد في كينيا الحاصل على شهادة ISO 9001 للمركبات المتاحة للكراسي المتحركة. كل مركبة مزودة برافعات هيدروليكية ألمانية (سعة 400 كجم) وأنظمة تثبيط طبية من Q'Straint وتخضع لفحوصات أسبوعية خاصة بظروف السفاري."
  },
  {
    icon: Users,
    title: "سائقو سفاري متخصصون في اللاندكروزر",
    description: "يكمل سائقونا تدريبًا لمدة 100 ساعة خاص باللاندكروزر: تثبيت الكراسي المتحركة على التضاريس الوعرة، الاستجابة الطبية الطارئة في المناطق النائية، والقيادة المتقدمة رباعية الدفع لمتنزهات كينيا الوطنية والمحميات الخاصة."
  },
  {
    icon: Car,
    title: "أسطول تويوتا لاندكروزر معدّل",
    description: "18 مركبة تويوتا لاندكروزر معدلة خصيصاً لتكون متاحة للكراسي المتحركة في ظروف السفاري الكينية. كل مركبة مزودة بتعليق معزز، خزانات وقود ممتدة، وأسقف قابلة للرفع لمشاهدة مثالية للحياة البرية من ارتفاع الكرسي المتحرك."
  },
  {
    icon: Accessibility,
    title: "إمكانية وصول خاصة باللاندكروزر",
    description: "تعديلات مخصصة لطرازات اللاندكروزر: روافع هيدروليكية جانبية (400 كجم)، فتحات أبواب موسعة، أرضيات معززة لوزن الكرسي المتحرك، وأسقف قابلة للرفع تحافظ على السلامة الهيكلية مع توفير رؤية 360 درجة على مستوى الكرسي المتحرك."
  },
  {
    icon: Globe,
    title: "تغطية اللاندكروزر للسفاري",
    description: "تخدم لاندكروزر المتاحة للكراسي المتحركة جميع متنزهات كينيا: ماساي مارا، أمبوسيلي، تسافو، سامبورو، بحيرة ناكورو. يتم صيانتها خصيصاً لتضاريس كينيا الوعرة مع اتصالات عبر الأقمار الصناعية ومدى ممتد للرحلات النائية."
  },
  {
    icon: Zap,
    title: "معدات طبية من الدرجة الطبية في اللاندكروزر",
    description: "تتميز كل لاندكروزر بمحولات طاقة موجة جيبية نقية بقدرة 3 كيلوواط للمعدات الطبية، وثلاجات طبية مدمجة، وأنظمة تثبيت لأسطوانات الأكسجين مصممة خصيصاً لمركبات تويوتا لاندكروزر للسفاري في كينيا."
  }
]

// ————————————————————————
// الأسئلة الشائعة - خاصة باللاندكروزر
// ————————————————————————
const faqs = [
  {
    question: "هل لديكم مركبات لاندكروزر متاحة للكراسي المتحركة في كينيا؟",
    answer: "نعم، ندير أكبر أسطول في كينيا مكون من 18 مركبة تويوتا لاندكروزر معدلة خصيصاً والمتاحة للكراسي المتحركة. كل مركبة مجهزة برافعات هيدروليكية ألمانية (سعة 400 كجم)، وأنظمة تثبيط طبية من Q'Straint، وأسقف قابلة للرفع تسمح لمستخدمي الكراسي المتحركة بالبقاء جالسين لمشاهدة الحياة البرية بزاوية 360 درجة. تم تصميم لاندكروزر خصيصاً لظروف السفاري الكينية مع تعليق معزز وخزانات وقود ممتدة وقدرة متقدمة على القيادة رباعية الدفع للمتنزهات الوطنية مثل ماساي مارا وأمبوسيلي."
  },
  {
    question: "ما الذي يجعل لاندكروزر الخاصة بكم أفضل من مركبات الكراسي المتحركة الأخرى في كينيا؟",
    answer: "تتميز لاندكروزر الخاصة بنا بتعديلات خاصة بكينيا: 1) روافع هيدروليكية شديدة التحمل مصنفة لـ 400 كجم (تناسب جميع الكراسي الكهربائية)، 2) هيكل وتعليق معززين للتضاريس الوعرة، 3) أسقف قابلة للرفع مع نوافذ مشاهدة على ارتفاع الكرسي المتحرك، 4) أنظمة طاقة طبية بقدرة 3 كيلوواط، 5) خزانات وقود ممتدة سعة 180 لترًا لرحلات سفاري طوال اليوم، 6) اتصالات عبر الأقمار الصناعية للمناطق النائية، و7) ترشيح HEPA للتحكم في الغبار. على عكس الشاحنات المحولة، تحافظ لاندكروزر على موثوقية تويوتا الأسطورية مع إضافة ميزات إمكانية وصول شاملة."
  },
  {
    question: "كم تكلفة استئجار لاندكروزر متاحة للكراسي المتحركة في كينيا؟",
    answer: "يبدأ استئجار لاندكروزر المتاحة للكراسي المتحركة من 195 دولارًا يوميًا للطرازات القياسية ويصل إلى 350 دولارًا يوميًا للإصدارات الفاخرة مع معدات طبية إضافية. يشمل السعر: سائق متخصص في اللاندكروزر ومعتمد، تأمين سفاري شامل، جميع معدات إمكانية الوصول، تنسيق رسوم المتنزهات الوطنية، مياه معبأة، ودعم على مدار الساعة. خصومات أسبوعية (10% خصم) وأسعار شهرية متاحة. التكاليف الإضافية: الإقامة، الوجبات، واستئجار المعدات الطبية المتخصصة إذا لزم الأمر."
  },
  {
    question: "ما هي متنزهات السفاري التي يمكنني زيارتها مع لاندكروزر المتاحة للكراسي المتحركة في كينيا؟",
    answer: "لاندكروزر معتمدة لجميع المتنزهات الوطنية الكينية الرئيسية: ماساي مارا (طرق الهجرة الكبرى)، أمبوسيلي (مشاهدة كليمنجارو)، تسافو الشرقية والغربية، سامبورو، بحيرة ناكورو، ومتنزه أبردير الوطني. كل لاندكروزر مجهزة بخزانات وقود ممتدة، وهواتف عبر الأقمار الصناعية، ومعدات طوارئ خاصة للوصول إلى المتنزهات النائية. نخدم أيضًا المحميات الخاصة مثل مارا نورث، أولاري موتوروجي، وسيلينكاي حيث توفر قدرة لاندكروزر رباعية الدفع وصولاً إلى مناطق الحياة البرية الحصرية."
  },
  {
    question: "كيف أحجز لاندكروزر متاحة للكراسي المتحركة لرحلتي في كينيا؟",
    answer: "عملية الحجز: 1) اتصل بنا مع تواريخ رحلتك ومتطلبات إمكانية الوصول، 2) سنقوم بمطابقتك مع اللاندكروزر المثالي من أسطولنا المكون من 18 مركبة، 3) أكمل نموذج تقييم إمكانية الوصول الخاص بنا، 4) قم بتأمين حجزك بدفعة مقدمة 30%، 5) استلم معلومات ما قبل الوصول بما في ذلك مواصفات اللاندكروزر وتفاصيل السائق. نوصي بالحجز قبل 3-6 أشهر للموسم المرتفع (يونيو-أكتوبر). الحجز في اللحظة الأخيرة (خلال أسبوعين) يخضع لتوفر اللاندكروزر."
  },
  {
    question: "ما أنواع الكراسي المتحركة التي تناسب لاندكروزر المتاحة الخاصة بكم في كينيا؟",
    answer: "لاندكروزر الخاصة بنا تستوعب جميع أنواع الكراسي المتحركة: الكراسي اليدوية (قياسية وشديدة التحمل)، الكراسي الكهربائية حتى 400 كجم، العربات الصغيرة، والكراسي الطبية المتخصصة. تتعامل الرافعة الهيدروليكية مع الكراسي حتى عرض 85 سم، ويوفر الداخل مسافة دوران 150 سم × 150 سم. للكراسي الخاصة بالسمنة أو المعدات الطبية المتخصصة، لدينا 3 لاندكروزر مع تعديلات موسعة - يرجى الاستفسار عن المتطلبات المحددة عند حجز رحلتك في كينيا."
  }
]

// ————————————————————————
// إحصائيات بناء الثقة - خاصة بأسطول اللاندكروزر
// ————————————————————————
const companyStats = {
  landCruisers: "18",
  usersServed: "2,800+",
  satisfactionRate: "99.2%",
  yearsExperience: "8",
  parksCovered: "12",
  certifications: "8",
  responseTime: "<45د",
  safariTrips: "1,500+"
}

// ترجمة التصنيفات المعروضة للإحصائيات
const statsLabels = {
  landCruisers: "لاندكروزر",
  usersServed: "مستخدم تم خدمتهم",
  satisfactionRate: "رضا",
  yearsExperience: "خبرة",
  parksCovered: "متنزه",
  certifications: "شهادات",
  responseTime: "زمن الاستجابة",
  safariTrips: "رحلات سفاري"
}

const vehicleCategories = [
  {
    name: "أسطول لاندكروزر للسفاري",
    description: "18 مركبة تويوتا لاندكروزر معدلة خصيصاً لتكون متاحة للكراسي المتحركة على رحلات السفاري الكينية مع أسقف قابلة للرفع ورافعات هيدروليكية",
    count: "18 لاندكروزر",
    icon: Car
  },
  {
    name: "مركبات حضرية متاحة", 
    description: "حلول نقل مدني في نيروبي والمناطق الحضرية الأخرى في كينيا مع منحدرات دخول وأنظمة تثبيت",
    count: "16 مركبة",
    icon: Users
  },
  {
    name: "نقل تنفيذي متاح",
    description: "مركبات فاخرة للسفر التجاري والشركات في جميع أنحاء كينيا مع ميزات إمكانية الوصول",
    count: "8 مركبات", 
    icon: Shield
  },
  {
    name: "حلول نقل طبي",
    description: "مركبات متخصصة مجهزة للاحتياجات الطبية المعقدة ونقل المعدات في جميع أنحاء كينيا",
    count: "10 مركبات",
    icon: Zap
  }
]

// ————————————————————————
// COMPONENT PRINCIPAL - محسن لـ "لاندكروزر متاحة للكراسي المتحركة كينيا"
// ————————————————————————
export default function WheelchairVehiclePage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="wheelchair-accessible-safari-landcruiser"
        categoryOpts={{
          title: "سفاري كينيا المتاح للكراسي المتحركة — لاندكروزر برافعة هيدروليكية",
          description: "أسطول كينيا الوحيد من سيارات 4x4 المكيفة للكراسي المتحركة برافعات هيدروليكية ألمانية (400 كجم). ماساي مارا، أمبوسيلي.",
          image: "/wheelchair-accessible-tanzania-safari.webp",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("wheelchair") || t.title?.toLowerCase().includes("كرسي متحرك") || t.description?.toLowerCase().includes("كرسي متحرك")) : [],
        }}
      />
      {/* مخطط الأسئلة الشائعة */}
      <JsonLd id="faq-schema" data={faqSchema} />

      <div className="container mx-auto px-4 py-16" dir="rtl">
        {/* قسم البطل - يستهدف "لاندكروزر متاحة للكراسي المتحركة كينيا" */}
        <header className="mb-20 text-center">
          <div className="mb-6 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white">
              <Star className="h-4 w-4" />
              أفضل أسطول لاندكروزر متاحة للكراسي المتحركة في كينيا
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              <Award className="h-4 w-4" />
              8 شهادات دولية
            </div>
            <div className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white">
              <Heart className="h-4 w-4" />
              خدمة 2,800+ من مستخدمي الكراسي المتحركة
            </div>
          </div>
          
          <h1 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            <span className="text-primary">لاندكروزر متاحة للكراسي المتحركة</span> في كينيا
          </h1>
          
          <p className="mx-auto max-w-5xl text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            <strong>أفضل أسطول لاندكروزر متاحة للكراسي المتحركة في كينيا:</strong> 18 مركبة تويوتا لاندكروزر معدلة خصيصاً تتميز بـ
            <strong> روافع هيدروليكية ألمانية، وأسقف قابلة للرفع لمشاهدة الحياة البرية على مستوى الكرسي المتحرك، وأنظمة تثبيط طبية</strong>. 
            جرب <strong>ماساي مارا، أمبوسيلي، وتسافو</strong> في لاندكروزر المتاحة المعتمدة لدينا -
            <strong> مركبة السفاري المتاحة للكراسي المتحركة المثالية في كينيا</strong>.
          </p>

          {/* مقاييس الثقة - خاصة باللاندكروزر */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
            {Object.entries(companyStats).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-primary/5 rounded-2xl">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {statsLabels[key as keyof typeof statsLabels]}
                </div>
              </div>
            ))}
          </div>

          {/* الأزرار الأساسية */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
              <Link href="/ar/book-now?vehicle=land-cruiser">
                <Calendar className="ml-2 h-5 w-5" />
                احجز لاندكروزر الآن
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/ar/contact?inquiry=land-cruiser">
                <Phone className="ml-2 h-5 w-5" />
                استشارة لاندكروزر
              </Link>
            </Button>
          </div>
        </header>

        {/* نظرة عامة على فئات المركبات - تركيز على اللاندكروزر */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">أكبر أسطول لاندكروزر متاح في كينيا</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              حلول لاندكروزر شاملة ومتاحة للكراسي المتحركة مصممة خصيصًا لظروف السفاري الكينية والنقل الحضري
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {vehicleCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl border p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                <div className="text-lg font-bold text-primary">{category.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* الميزات الرائدة - خاصة باللاندكروزر */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">لماذا لاندكروزر لدينا هي الخيار الأول في كينيا</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              ميزات إمكانية وصول لا تضاهى في اللاندكروزر، قدرات سفاري، ومعايير أمان لا يستطيع المنافسون مضاهاتها في كينيا
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {vehicleFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* عرض المركبة - تركيز على اللاندكروزر */}
        <VehicleCard />

        {/* الأسئلة الشائعة - خاصة باللاندكروزر */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              لاندكروزر كينيا: الأسئلة الشائعة
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              كل ما تحتاج معرفته عن استئجار لاندكروزر المتاحة للكراسي المتحركة لرحلتك في كينيا
            </p>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* قسم الحث على الإجراء النهائي - تركيز على اللاندكروزر */}
        <section className="rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center md:p-12 text-white">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold">
            هل أنت مستخدم لتجربة كينيا في لاندكروزر المتاحة للكراسي المتحركة لدينا؟
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl opacity-90 leading-relaxed">
            انضم إلى أكثر من 2,800 من مستخدمي الكراسي المتحركة الذين وثقوا بلاندكروزر لدينا في رحلات سفاري كينية لا تُنسى.
            جرب الهجرة الكبرى، وأفيال أمبوسيلي، وبرية تسافو في راحة وإمكانية وصول كاملة.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/ar/book-now?vehicle=land-cruiser">
                <Calendar className="ml-2 h-5 w-5" />
                احجز لاندكروزر عبر الإنترنت
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/ar/contact?inquiry=land-cruiser">
                <Mail className="ml-2 h-5 w-5" />
                احصل على عرض سعر للاندكروزر
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="tel:+254726485228">
                <Phone className="ml-2 h-5 w-5" />
                اتصل: +254 726 485 228
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>متخصص لاندكروزر معتمد</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>لاندكروزر معتمدة ISO 9001</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>تدريب 100 ساعة على اللاندكروزر</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>دعم لاندكروزر على مدار الساعة</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}