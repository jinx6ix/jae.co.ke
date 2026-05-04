// app/ar/big-five/page.tsx
import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "../../../components/TourCard" // مسار مناسب للمكون
import { tours } from "@/lib/i18n/data/ar/tours-data" // استيراد البيانات العربية
import { ArrowRight, Shield, Users, Award, Accessibility, Star, MapPin, Calendar, Users as UsersIcon, Globe, Heart, Zap, Search, Camera, Binoculars, Leaf, Clock } from "lucide-react"
import JsonLd from "@/components/JsonLd"

// مخطط Rich Schema محسّن (بترجمة المحتوى)
const bigFiveSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // المؤسسة
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "جايه ترافيل إكسبديشنز",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "sameAs": ["https://www.facebook.com/JaeTravelExpeditions", "https://www.instagram.com/JaeTravelExpeditions"],
    },
    // موقع الويب
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" },
    },
    // صفحة الويب
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/big-five/#webpage",
      "url": "https://www.jaetravel.co.ke/ar/big-five",
      "name": "سفاري الحيوانات الخمسة الكبار في كينيا | الأسد، النمر، الفيل، وحيد القرن، الجاموس",
      "description": "شاهد الحيوانات الخمسة الكبار الشهيرة في أفريقيا في رحلات سفاري ميسرة للكراسي المتحركة في كينيا. الأسد، النمر، الفيل، وحيد القرن والجاموس في ماساي مارا وأمبوسيلي وتسافو مع مرشدين خبراء ومركبات مكيفة.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/ar/big-five/#breadcrumb" },
    },
    // قائمة المسار
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/big-five/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.jaetravel.co.ke/ar" },
        { "@type": "ListItem", "position": 2, "name": "سفاري الحيوانات الخمسة الكبار في كينيا" },
      ],
    },
    // صفحة الأسئلة الشائعة الموسعة
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما هي الحيوانات التي تشكل الحيوانات الخمسة الكبار في أفريقيا؟",
          "acceptedAnswer": { "@type": "Answer", "text": "الحيوانات الخمسة الكبار هي الأسد، النمر، الفيل الأفريقي، وحيد القرن (الأسود والأبيض)، والجاموس الأفريقي. المصطلح نشأ من الصيد الكبير لكنه الآن يمثل أكثر الحيوانات المرغوبة في رحلات السفاري التصويرية." },
        },
        {
          "@type": "Question",
          "name": "أين أفضل مكان لمشاهدة الحيوانات الخمسة الكبار في كينيا؟",
          "acceptedAnswer": { "@type": "Answer", "text": "توفر محمية ماساي مارا الوطنية أعلى فرصة لرؤية الأسد والنمر والفيل والجاموس – مع رؤية عرضية لوحيد القرن. تشمل المواقع الممتازة الأخرى أمبوسيلي (الفيلة)، تسافو (كل الخمسة ممكنة)، وبحيرة ناكورو / لايكيبيا (معاقل وحيد القرن)." },
        },
        {
          "@type": "Question",
          "name": "هل يمكن لمستخدمي الكراسي المتحركة رؤية الحيوانات الخمسة الكبار في رحلة سفاري في كينيا؟",
          "acceptedAnswer": { "@type": "Answer", "text": "نعم – مركبات السفاري الميسرة للكراسي المتحركة والمزودة برافعات هيدروليكية تجعل من الممكن الاستمتاع برحلات السفاري ورصد الحيوانات الخمسة الكبار بشكل مريح وآمن في أفضل متنزهات كينيا." },
        },
        {
          "@type": "Question",
          "name": "ما هو أفضل وقت لرحلات السفاري للحيوانات الخمسة في كينيا؟",
          "acceptedAnswer": { "@type": "Answer", "text": "تقدم مواسم الجفاف (يونيو-أكتوبر، يناير-فبراير) أفضل مشاهدة للحياة البرية حيث تتجمع الحيوانات حول مصادر المياه. فترة الهجرة الكبرى (يوليو-أكتوبر) في ماساي مارا تعزز رؤية الخمسة بتفاعلات المفترس والفريسة الدراماتيكية." },
        },
        {
          "@type": "Question",
          "name": "كم تكلفة رحلة سفاري للحيوانات الخمسة الكبار في كينيا؟",
          "acceptedAnswer": { "@type": "Answer", "text": "تبدأ الأسعار من 2,850 دولار أمريكي للشخص الواحد لرحلة سفاري ميسرة لمدة 7 أيام تشمل مركبات مكيفة ومرشدين خبراء وإقامة في نزل صديقة لذوي الإعاقة وجميع رحلات السفاري." },
        },
      ],
    },
    // عروض رحلات متعددة
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/ar/big-five/#masai-mara-trip",
      "name": "سفاري لمدة 7 أيام للحيوانات الخمسة في ماساي مارا – ميسر للكراسي المتحركة",
      "description": "تجربة الحيوانات الخمسة الكبار النهائية في ماساي مارا مع رحلات سفاري يومية ومركبات سفاري مكيفة ونزل فاخرة ميسرة.",
      "image": "https://www.jaetravel.co.ke/Big-5.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/ar/tours/big-five-masai-mara",
        "price": "2850",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01",
      },
    },
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/ar/big-five/#amboseli-trip",
      "name": "مغامرة لمدة 5 أيام للحيوانات الخمسة في أمبوسيلي",
      "description": "التركيز على قطعان الفيلة والحيوانات الخمسة الأخرى في أمبوسيلي مع إطلالات على كليمنجارو ومرافق ميسرة.",
      "offers": {
        "@type": "Offer",
        "price": "1950",
        "priceCurrency": "USD",
      },
    },
  ],
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "سفاري الحيوانات الخمسة الكبار في كينيا | ماساي مارا، أمبوسيلي وتسافو",
    description:
      "شاهد الأسد والنمر والفيل ووحيد القرن والجاموس في أفضل متنزهات كينيا. رحلات سفاري ميسرة للكراسي المتحركة مع مرشدين خبراء. ابتداءً من 450 دولاراً.",
    keywords: [
      "سفاري الحيوانات الخمسة الكبار",
      "الحيوانات الخمسة الكبار في كينيا",
      "حيوانات الخمسة الكبار",
      "سفاري الأسود في كينيا",
      "رصد النمر في ماساي مارا",
      "فيل أمبوسيلي",
      "سفاري وحيد القرن في كينيا",
      "جاموس تسافو",
      "الخمسة الكبار ميسرة للكراسي المتحركة",
      "سفاري ميسر للحيوانات الخمسة في كينيا",
      "الخمسة الكبار في ماساي مارا",
      "سفاري الحياة البرية في كينيا",
      "أفضل سفاري للحيوانات الخمسة في أفريقيا",
      "رحلات سفاري للحيوانات الخمسة",
      "سفاري الحيوانات الخمسة في كينيا",
      "حيوانات أفريقيا الخمسة الكبار",
      "باقات سفاري الحيوانات الخمسة",
      "جولات الخمسة الكبار في كينيا",
      "سفاري شامل للحيوانات الخمسة",
      "جولات الخمسة الكبار صديقة لذوي الإعاقة",
      "الحفاظ على الخمسة الكبار في كينيا",
      "أفضل وقت للخمسة الكبار في كينيا",
      "سفاري اقتصادي للخمسة الكبار",
      "سفاري فاخر للخمسة الكبار في كينيا",
    ],
    openGraph: {
      title: "سفاري الحيوانات الخمسة الكبار في كينيا | شاهد الأسد، النمر، الفيل، وحيد القرن والجاموس",
      description: "عِش إثارة رصد الخمسة الكبار في أفريقيا في رحلات سفاري ميسرة بالكامل في كينيا. مرشدون خبراء، مركبات مكيفة، لقاءات لا تُنسى مع الحياة البرية في ماساي مارا وما بعدها.",
      images: ["/big-five-hero.jpg"],
      type: "website",
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/ar/big-five",
      languages: {
        'ar': 'https://www.jaetravel.co.ke/ar/big-five',
        'en': 'https://www.jaetravel.co.ke/big-five',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// بطاقة الحيوانات الخمسة (مترجمة)
function BigFiveCard({
  name,
  description,
  icon: Icon,
  image,
  bestParks,
}: {
  name: string
  description: string
  icon: any
  image: string
  bestParks: string[]
}) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-xl">
      <div className="relative h-56">
        <Image
          src={image}
          alt={`${name} - حيوان من الخمسة الكبار في رحلة سفاري في كينيا`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 text-muted-foreground leading-relaxed">{description}</p>
        <div>
          <h4 className="mb-2 text-sm font-semibold">أفضل المتنزهات للمشاهدة:</h4>
          <ul className="list-disc pl-4 text-sm text-muted-foreground">
            {bestParks.map((park, i) => (
              <li key={i}><Link href={`/ar/destinations/${park.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">{park}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function BigFivePage() {
  // جولات مميزة للخمسة الكبار - تصفية من بيانات الجولات العربية
  const featuredBigFiveTours = tours.filter(t => t.tags?.includes('big-five')).slice(0, 3) || [
    { id: 'big-five-mara', title: 'سفاري لمدة 7 أيام للخمسة الكبار في ماساي مارا', price: 2850, duration: '7 أيام', image: '/Big-5.jpg' },
    { id: 'big-five-amboseli', title: 'رحلة لمدة 5 أيام في أمبوسيلي – تركيز على الفيلة', price: 1950, duration: '5 أيام', image: '/african-lions-uganda-1024x683.webp' },
    { id: 'big-five-tsavo', title: 'مغامرة لمدة 6 أيام للخمسة الكبار في تسافو', price: 2450, duration: '6 أيام', image: '/Inverdoorn-54.jpg' },
  ];

  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="big-five"
        categoryOpts={{
          title: "جولات سفاري الحيوانات الخمسة الكبار في كينيا وتنزانيا",
          description: "شاهد جميع الحيوانات الخمسة الكبار (الأسد، النمر، الفيل، الجاموس، وحيد القرن) في جولات سفاري في كينيا وتنزانيا.",
          image: "/masai-mara-safari.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("five") || (t.title && t.title.toLowerCase().includes("five")) || (t.description && t.description.toLowerCase().includes("five"))) : [],
        }}
      />
      <JsonLd data={bigFiveSchema} id="big-five-schema" />

      {/* قسم البطل */}
      <section className="relative min-h-[80vh] flex items-center bg-muted/10">
        <div className="absolute inset-0">
          <Image
            src="/Big-5.jpg"
            alt="حيوانات الخمسة الكبار في كينيا - أسد، نمر، فيل، وحيد قرن، جاموس في ماساي مارا"
            fill
            className="object-cover brightness-[0.75]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white" dir="rtl">
          <h1 className="mb-6 font-serif text-4xl md:text-6xl font-bold text-balance">
            سفاري الحيوانات الخمسة الكبار في كينيا
            <br />
            <span className="text-primary">أسد · نمر · فيل · وحيد قرن · جاموس</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl md:text-2xl text-white/90 leading-relaxed">
            عِش أثمن تجربة للحياة البرية في أفريقيا في <strong>رحلات سفاري مثيرة</strong> في أفضل محميات كينيا.
            رحلاتنا <Link href="/ar/disability-tours" className="underline">الميسرة للكراسي المتحركة</Link> تضمن للجميع مشاهدة هذه الحيوانات الرائعة عن قرب.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/ar/tours/big-five-masai-mara">احجز سفاري الخمسة الكبار</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20" asChild>
              <Link href="/ar/disability-tours">استكشف الخيارات الميسرة</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* مقدمة موسعة */}
      <section className="py-20 bg-muted/30 border-b">
        <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
          <h2 className="mb-10 text-center font-serif text-4xl md:text-5xl font-bold">
            تعرَّف على الحيوانات الخمسة الكبار الأسطورية في كينيا
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              <strong>الحيوانات الخمسة الكبار</strong> — الأسد، النمر، الفيل الأفريقي، وحيد القرن والجاموس — تمثل قمة أي <strong>سفاري أفريقي</strong>.
              صيغ المصطلح في الأصل من قبل الصيادين لأكثر الطرائد تحديًا، لكن اليوم تجذب هذه الرموز عشاق الحياة البرية من جميع أنحاء العالم لـ <strong>رحلات سفاري الخمسة الكبار في كينيا</strong>.
            </p>
            <p>
              في جايه ترافيل إكسبديشنز، نتخصص في <strong>جولات الخمسة الكبار الشاملة</strong> التي تجعل هذه اللقاءات في متناول الجميع.
              أسطولنا من <Link href="/ar/vehicle-hire" className="text-primary hover:underline">مركبات السفاري الميسرة للكراسي المتحركة</Link> المزودة برافعات هيدروليكية وأسطح قابلة للفتح يتيح رؤية مريحة خلال <strong>رحلات السفاري الطويلة</strong>،
              بينما تضمن شراكاتنا مع <strong>النزل الصديقة لذوي الإعاقة</strong> تجربة سلسة.
            </p>
            <p>
              من سهول <Link href="/ar/maasai-mara-great-migration" className="text-primary hover:underline">ماساي مارا</Link> الغنية بالحيوانات المفترسة إلى جنة الفيلة في <Link href="/ar/tours/amboseli-safari" className="text-primary hover:underline">أمبوسيلي</Link>،
              يزيد مرشدونا الخبراء من فرصك في رؤية جميع الحيوانات الخمسة في رحلة واحدة. سواء كنت تبحث عن <strong>سفاري اقتصادي للخمسة الكبار</strong> أو تجارب فاخرة،
              نصمم مسارات تمزج بين المغامرة والحفاظ على البيئة وإمكانية الوصول.
            </p>
            <p>
              تقدم كينيا بعضًا من <strong>أفضل رحلات سفاري الخمسة الكبار في أفريقيا</strong>، بموائل متنوعة تدعم تجمعات صحية.
              انضم إلينا لمشاهدة الأسود وهي تصطاد، والنمور المراوغة على الأشجار، وقطعان الفيلة الضخمة، ووحيد القرن النادر في محميات آمنة، ومجموعات الجاموس الهائلة — كل ذلك مع دعم جهود الحفاظ المحلية.
            </p>
          </div>
        </div>
      </section>

      {/* لماذا تختارنا */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            لماذا تختار جايه ترافيل لسفاري الخمسة الكبار في كينيا
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">تتبع خبير</h3>
              <p className="text-sm text-muted-foreground">مرشدون معتمدون بخبرة تزيد عن 15 سنة في رصد حيوانات الخمسة الكبار في محميات كينيا.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Accessibility className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">إمكانية وصول كاملة</h3>
              <p className="text-sm text-muted-foreground">مركبات ونزل مكيفة لـ <strong>سفاري الخمسة الكبار الميسر للكراسي المتحركة</strong>.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">التركيز على الحفاظ</h3>
              <p className="text-sm text-muted-foreground">ادعم حماية وحيد القرن ومكافحة الصيد غير المشروع من خلال جولاتنا المستدامة.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">مشاهدات مضمونة</h3>
              <p className="text-sm text-muted-foreground">معدلات نجاح عالية لجميع الخمسة الكبار في مسارات متعددة المتنزهات.</p>
            </div>
          </div>
        </div>
      </section>

      {/* أعضاء الخمسة الكبار */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4" dir="rtl">
          <h2 className="mb-16 text-center font-serif text-4xl md:text-5xl font-bold">
            تعرف على حيوانات أفريقيا الخمسة الكبار
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <BigFiveCard
              name="الأسد"
              description="الحيوان المفترس الأعلى ورمز القوة. تسود الزمر السافانا، وتقدم مطاردات دراماتيكية وتفاعلات عائلية أثناء رحلات السفاري."
              icon={Binoculars}
              image="/Inverdoorn-54.jpg"
              bestParks={["كينيا", "تنزانيا", "أوغندا"]}
            />
            <BigFiveCard
              name="النمر"
              description="سيد التخفي بعلاماته الجذابة. غالبًا ما يُرصد على الأشجار أو النتوءات الصخرية — أبرز ما في رحلات السفاري الليلية."
              icon={Search}
              image="/African_leopard_male_(cropped).jpg"
              bestParks={["كينيا", "تنزانيا", "رواندا"]}
            />
            <BigFiveCard
              name="الفيل"
              description="عمالقة أذكياء بهياكل اجتماعية معقدة. شاهد القطعان التي تقودها الأمهات وصغارها المرحة — مجزٍ بشكل خاص في المجموعات الكبيرة."
              icon={Globe}
              image="/African_Bush_Elephant.jpg"
              bestParks={["كينيا", "تنزانيا", "رواندا"]}
            />
            <BigFiveCard
              name="وحيد القرن"
              description="نجوم عريقة تواجه تحديات الحفاظ. شاهد وحيد القرن الأسود والأبيض المحمي في محميات آمنة مع حراس خبراء."
              icon={Shield}
              image="/images (1).jpg"
              bestParks={["كينيا", "رواندا", "تنزانيا"]}
            />
            <BigFiveCard
              name="الجاموس الأفريقي"
              description="معروف بقوته وعقلية القطيع. غالبًا ما يُواجه في مجموعات ضخمة، مما يوفر تجارب سفاري مكثفة عن قرب."
              icon={UsersIcon}
              image="/images (2).jpg"
              bestParks={["كينيا", "أوغندا", "تنزانيا"]}
            />
          </div>
        </div>
      </section>

      {/* أفضل الأماكن - مع جدول */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            أفضل الأماكن لرؤية الحيوانات الخمسة الكبار في كينيا
          </h2>
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full border-collapse border border-border bg-card">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-4 text-right">الوجهة</th>
                  <th className="border border-border p-4 text-right">أبرز الحيوانات الخمسة</th>
                  <th className="border border-border p-4 text-right">أفضل وقت</th>
                  <th className="border border-border p-4 text-right">إمكانية الوصول</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-4"><Link href="/ar/maasai-mara-great-migration" className="text-primary hover:underline">ماساي مارا</Link></td>
                  <td className="border border-border p-4">أسد، نمر، فيل، جاموس؛ وحيد القرن أحياناً</td>
                  <td className="border border-border p-4">يوليو-أكتوبر (الهجرة)</td>
                  <td className="border border-border p-4">وصول كامل للكراسي المتحركة بمركبات مكيفة</td>
                </tr>
                <tr>
                  <td className="border border-border p-4"><Link href="/ar/tours/amboseli-safari" className="text-primary hover:underline">أمبوسيلي</Link></td>
                  <td className="border border-border p-4">قطعان هائلة من الفيلة، أسد، جاموس</td>
                  <td className="border border-border p-4">يونيو-أكتوبر</td>
                  <td className="border border-border p-4">نزل ورحلات سفاري ميسرة</td>
                </tr>
                <tr>
                  <td className="border border-border p-4"><Link href="/ar/tours/tsavo-east-west-adventure" className="text-primary hover:underline">تسافو شرق/غرب</Link></td>
                  <td className="border border-border p-4">كل الخمسة الكبار ممكنة؛ الفيلة الحمراء</td>
                  <td className="border border-border p-4">يناير-فبراير، يونيو-أكتوبر</td>
                  <td className="border border-border p-4">وعرة لكن قابلة للتكيف مع مركباتنا</td>
                </tr>
                <tr>
                  <td className="border border-border p-4"><Link href="/ar/tours/lake-nakuru" className="text-primary hover:underline">بحيرة ناكورو/لايكيبيا</Link></td>
                  <td className="border border-border p-4">محامي وحيد القرن، أسد، نمر</td>
                  <td className="border border-border p-4">على مدار السنة؛ الأفضل يناير-مارس</td>
                  <td className="border border-border p-4">ممتاز لمستخدمي الكراسي المتحركة</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/ar/destinations">استكشف كل الوجهات <ArrowRight className="mr-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* أفضل وقت */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            أفضل وقت لرحلات سفاري الخمسة الكبار في كينيا
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              توقيت <strong>سفاري الخمسة الكبار في كينيا</strong> يعظم المشاهدات. مواسم الجفاف تركز الحيوانات حول المياه، مما يسهل الرصد خلال <strong>رحلات السفاري</strong>.
            </p>
            <ul className="list-disc pr-6 space-y-4">
              <li><strong>يونيو-أكتوبر (موسم الجفاف الرئيسي):</strong> الأفضل عموماً للخمسة الكبار؛ يتزامن مع <Link href="/ar/maasai-mara-great-migration" className="text-primary hover:underline">الهجرة الكبرى</Link> في ماساي مارا لحركة المفترسات.</li>
              <li><strong>يناير-فبراير (الجفاف القصير):</strong> رؤية ممتازة، حشود أقل؛ مثالي لوحيد القرن في المتنزهات الشمالية.</li>
              <li><strong>نوفمبر-ديسمبر (الأمطار القصيرة):</strong> مناظر خضراء، حيوانات صغيرة؛ جيد لعائلات الفيلة في أمبوسيلي.</li>
              <li><strong>مارس-مايو (الأمطار الطويلة):</strong> صعب لكن مجزٍ للمصورين المخلصين؛ أسعار أقل.</li>
            </ul>
            <p>
              تتكيف <strong>رحلات سفاري الخمسة الكبار الميسرة</strong> لدينا طوال العام مع المواسم عبر مسارات مرنة ومركبات مقاومة للطقس.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/ar/tours">عرض الباقات الموسمية</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* جولات مميزة */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            باقات سفاري الخمسة الكبار المميزة
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredBigFiveTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/ar/tours">عرض كل جولات الخمسة الكبار <ArrowRight className="mr-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* الحفاظ على البيئة */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            الحفاظ على الحيوانات الخمسة الكبار في كينيا
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              تقود كينيا جهود <strong>الحفاظ على الخمسة الكبار</strong>، بمبادرات تحمي هذه الأنواع من الصيد غير المشروع وفقدان الموائل.
              تساهم رحلاتنا في المحميات المجتمعية وصناديق مكافحة الصيد غير المشروع.
            </p>
            <ul className="list-disc pr-6 space-y-4">
              <li><strong>حماية وحيد القرن:</strong> دعم محميات مثل أول بيجيتا، موطن آخر وحيد القرن الأبيض الشمالي في العالم.</li>
              <li><strong>مراقبة الأسود:</strong> الشراكة مع مشاريع تتبع الزمر في ماساي مارا لتقليل الصراع بين الإنسان والحياة البرية.</li>
              <li><strong>ممرات الفيلة:</strong> المساعدة في الحفاظ على طرق الهجرة في نظام تسافو-أمبوسيلي.</li>
              <li><strong>منافع مجتمعية:</strong> السياحة البيئية تخلق وظائف وحوافز لحماية الحياة البرية محلياً.</li>
            </ul>
            <p>
              اختر <strong>جولات الخمسة الكبار المستدامة</strong> لتجربة الحياة البرية مع دعم مستقبلها.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/ar/contact">تعلم كيف يمكنك المساعدة</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* دعوة لإمكانية الوصول */}
      <section className="py-20">
        <div className="container mx-auto px-4" dir="rtl">
          <div className="rounded-3xl bg-primary p-10 md:p-16 text-primary-foreground overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-1/3 opacity-20 md:w-1/2">
              <Image
                src="/accessible-game-drive.jpg"
                alt="مستخدم كرسي متحرك يرصد الخمسة الكبار على مركبة سفاري ميسرة في كينيا"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="mb-6 font-serif text-4xl md:text-5xl font-bold">
                سفاري الخمسة الكبار الميسر للكراسي المتحركة في كينيا
              </h2>
              <p className="mb-6 text-lg leading-relaxed">
                لا تدع تحديات الحركة تمنعك من تجربة <strong>الحيوانات الخمسة الكبار</strong>. تتميز <Link href="/ar/vehicle-hire" className="underline hover:text-secondary">مركبات السفاري المكيفة لدينا</Link> برافعات هيدروليكية وأحزمة أمان ومناظر بانورامية لرصد الحياة البرية الأمثل.
              </p>
              <p className="mb-8 text-lg leading-relaxed">
                أقِم في <strong>نزل فاخرة صديقة لذوي الإعاقة</strong> مع دشات يمكن الدخول إليها ومنحدرات. موظفونا المدربون يضمنون مغامرة <strong>سفاري الخمسة الكبار في كينيا</strong> خالية من العوائق، من رحلات السفاري في ماساي مارا إلى تتبع وحيد القرن في لايكيبيا.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/ar/disability-tours">استكشف جولات الخمسة الكبار الميسرة</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <Link href="/ar/vehicle-hire">تعرف على مركبات السفاري المكيفة لدينا</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="py-20 bg-muted/20 border-b">
        <div className="container mx-auto px-4" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            أسئلة شائعة حول سفاري الحيوانات الخمسة الكبار
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {(bigFiveSchema["@graph"] as any[]).find((item: any) => item["@type"] === "FAQPage")?.mainEntity?.map((faq: any, i: number) => (
              <div key={i}>
                <h3 className="text-xl font-bold mb-2">{faq.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* شهادات العملاء */}
      <section className="py-20">
        <div className="container mx-auto px-4" dir="rtl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            ماذا يقول ضيوفنا عن سفاري الخمسة الكبار
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "مايكل تومسون", location: "الولايات المتحدة", text: "رأيت جميع الحيوانات الخمسة الكبار في رحلة واحدة! المركبة الميسرة جعلتها سهلة ومريحة.", rating: 5 },
              { name: "آنا رودريغيز", location: "إسبانيا", text: "مشاهدات لا تصدق للنمور في ماساي مارا. عرف المرشدون أين يذهبون بالضبط.", rating: 5 },
              { name: "جيمس كيم", location: "كندا", text: "لقاء وحيد القرن في أول بيجيتا كان يغير الحياة. مثالي لمستخدمي الكراسي المتحركة.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* دعوة أخيرة للعمل */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center max-w-4xl" dir="rtl">
          <h2 className="mb-8 font-serif text-4xl md:text-5xl font-bold text-balance">
            هل أنت مستعد لمغامرة سفاري الخمسة الكبار في كينيا؟
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            سواء كنت تطارد الأسود في <Link href="/ar/maasai-mara-great-migration" className="text-primary hover:underline">ماساي مارا</Link> أو الفيلة في <Link href="/ar/tours/amboseli-safari" className="text-primary hover:underline">أمبوسيلي</Link>،
            فإن <strong>باقات سفاري الخمسة الكبار</strong> لدينا تقدم لقاءات لا تُنسى مع الحياة البرية. احجز جولتك المخصصة والميسرة اليوم.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/ar/contact">احصل على عرض أسعار مخصص للخمسة الكبار</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                راسلنا عبر واتساب للتفاصيل
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}