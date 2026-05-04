// app/ar/destinations/page.tsx
import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import Link from "next/link"
import DestinationCard from "./DestinationCard"
import { destinations } from "@/lib/i18n/data/ar/destinations-data"
import { Button } from "@/components/ui/button"
import { faqSchema } from "./faq-schema"
import JsonLd from "@/components/JsonLd"

// مخطط الوجهات المحسَّن – بما في ذلك الصور والنتائج الغنية (2025–2026)
const destinationsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. المنظمة + النشاط التجاري المحلي (مع تقييم إجمالي ومراجعات فردية للنجوم الغنية)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/ar/#organization",
      "name": "جايه ترافيل إكسبديشنز",
      "url": "https://www.jaetravel.co.ke/ar",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "نيروبي",
        "postalCode": "00100",
        "streetAddress": "123 طريق السفاري",
        "email": "info@jaetravel.co.ke",
        "telephone": "+254726485228"
      },
      "description": "أكبر مشغل لرحلات السفاري المستدامة والميسرة للكراسي المتحركة في شرق أفريقيا في كينيا وتنزانيا ورواندا وأوغندا.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      // مراجعات فردية – يمكن لـ Google عرضها كـ rich snippets مع تقييمات النجوم
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "ديفيد تشين"
          },
          "datePublished": "2025-08-20",
          "reviewBody": "أخذتنا جايه ترافيل إلى أفضل وجهات شرق أفريقيا — ماساي مارا، سيرينجيتي، وحديقة البراكين الوطنية. كان كل شيء مخططًا بشكل مثالي وميسر ولا يُنسى!"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "سارة جونسون"
          },
          "datePublished": "2025-07-15",
          "reviewBody": "رحلة سفاري رائعة متعددة البلدان مع جايه ترافيل! من تتبع الغوريلا في رواندا إلى الهجرة الكبرى في تنزانيا — كان المرشدون والخدمات اللوجستية ممتازين. أوصي بشدة!"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "مايكل طومسون"
          },
          "datePublished": "2025-09-05",
          "reviewBody": "أظهرت لنا جايه ترافيل الجمال الحقيقي لشرق أفريقيا — سيرينجيتي، بوندي، زنجبار والمزيد. محترفون وآمنون وميسرون حقًا. أفضل شركة سفاري استخدمناها على الإطلاق!"
        }
      ]
    },

    // 2. موقع الويب
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/ar/#website",
      "url": "https://www.jaetravel.co.ke/ar",
      "name": "جايه ترافيل إكسبديشنز",
      "publisher": { "@id": "https://www.jaetravel.co.ke/ar/#organization" }
    },

    // 3. صفحة الويب
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/destinations/#webpage",
      "url": "https://www.jaetravel.co.ke/ar/destinations",
      "name": "أفضل وجهات السفاري في شرق أفريقيا | كينيا، تنزانيا، رواندا، أوغندا",
      "description": "استكشف أفضل وجهات السفاري: ماساي مارا، سيرينجيتي، تتبع الغوريلا في رواندا وأوغندا، شواطئ زنجبار والمزيد.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/ar/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/ar/destinations/#breadcrumb" },
      "inLanguage": "ar",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.jaetravel.co.ke/destinations/east-africa-safari-destinations-hero.jpg",
        "width": 1200,
        "height": 630
      },
      "mainEntity": { "@id": "https://www.jaetravel.co.ke/ar/destinations/#collection" }
    },

    // 4. قائمة التنقل
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/destinations/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية",
          "item": "https://www.jaetravel.co.ke/ar"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "الوجهات",
          "item": "https://www.jaetravel.co.ke/ar/destinations"
        }
      ]
    },

    // 5. صفحة المجموعة مع مكان غني وصورة لكل وجهة
    {
      "@type": "CollectionPage",
      "@id": "https://www.jaetravel.co.ke/ar/destinations/#collection",
      "name": "وجهات السفاري في شرق أفريقيا",
      "description": "اكتشف أفضل الأماكن التي يمكن زيارتها في شرق أفريقيا: كينيا، تنزانيا، رواندا، أوغندا.",
      "hasPart": destinations.map((dest) => ({
        "@type": "Place",
        "@id": `https://www.jaetravel.co.ke/ar/destinations/${dest.slug}#place`,
        "name": dest.name,
        "url": `https://www.jaetravel.co.ke/ar/destinations/${dest.slug}`,
        "image": {
          "@type": "ImageObject",
          "url": dest.heroImage,
          "contentUrl": dest.heroImage,
          "name": `${dest.name} وجهة سفاري - ${dest.country}`,
          "description": dest.description,
          "width": "1200",
          "height": "800",
          "creator": {
            "@type": "Organization",
            "@id": "https://www.jaetravel.co.ke/ar/#organization"
          }
        },
        "description": dest.description,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": dest.country
        }
      }))
    },

    // 6. صفحة الأسئلة الشائعة (محسَّنة لعرض carousel الغني)
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/ar/destinations/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما هي أفضل وجهات السفاري في شرق أفريقيا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل أفضل الوجهات: ماساي مارا (كينيا)، سيرينجيتي وفوهة نغورونغورو (تنزانيا)، حديقة البراكين الوطنية (رواندا)، غابة بوندي التي لا يمكن اختراقها (أوغندا)، وشواطئ زنجبار."
          }
        },
        {
          "@type": "Question",
          "name": "ما هو أفضل وقت للهجرة الكبرى؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يوليو–أكتوبر لعبور الأنهار الدراماتيكي في ماساي مارا وشمال سيرينجيتي. يمكن مشاهدة الهجرة على مدار العام في نظام سيرينجيتي البيئي."
          }
        },
        {
          "@type": "Question",
          "name": "هل يمكنني القيام بتتبع الغوريلا في كل من رواندا وأوغندا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم! يجمع العديد من الضيوف بين حديقة البراكين الوطنية (رواندا) وغابة بوندي التي لا يمكن اختراقها (أوغندا) لتجربتي غوريلا مختلفتين في رحلة واحدة."
          }
        },
        {
          "@type": "Question",
          "name": "هل هذه الوجهات ميسرة للكراسي المتحركة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم — نحن متخصصون في رحلات السفاري الميسرة بالكامل بمركبات مكيفة ومنحدرات ونزل خالية من العوائق في جميع الوجهات الرئيسية."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي أفضل طريقة للجمع بين وجهات متعددة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نحن نصمم خطط سير مخصصة متعددة البلدان — على سبيل المثال، ماساي مارا + سيرينجيتي + زنجبار أو تتبع الغوريلا في رواندا + تتبع الشمبانزي في أوغندا. اتصل بنا للحصول على خطة شخصية."
          }
        }
      ]
    }
  ]
};

// ————————————————————————
// البيانات الوصفية + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "أفضل وجهات السفاري في شرق أفريقيا 2026",
    description:
      "استكشف أفضل وجهات السفاري في شرق أفريقيا بما في ذلك كينيا وتنزانيا ورواندا وأوغندا. اكتشف الحياة البرية والثقافة والمغامرات الميسرة.",
    keywords: [
      "وجهات شرق أفريقيا",
      "السفر إلى كينيا",
      "جولات تنزانيا",
      "غوريلا رواندا",
      "سفاري أوغندا",
      "وجهات أفريقية",
      "ماساي مارا كينيا",
      "سيرينجيتي تنزانيا",
      "حديقة البراكين الوطنية",
      "تتبع غوريلا بوندي",
      "شاطئ زنجبار",
      "منتزه أمبوسيلي الوطني",
      "بحيرة ناكورو",
      "فوهة نغورونغورو",
      "حديقة الملكة إليزابيث الوطنية",
      "وجهات سفاري شرق أفريقيا",
      "أفضل أماكن الزيارة في شرق أفريقيا",
      "جولات كينيا تنزانيا رواندا أوغندا",
    ],
    openGraph: {
      title: "وجهات شرق أفريقيا | كينيا، تنزانيا، رواندا، أوغندا",
      description: "اكتشف أفضل وجهات السفاري في شرق أفريقيا. من ماساي مارا إلى سيرينجيتي، تتبع الغوريلا إلى شواطئ زنجبار.",
      images: ["/og-east-africa-destinations.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/ar/destinations",
      languages: {
        'ar': "https://www.jaetravel.co.ke/ar/destinations",
        'en': "https://www.jaetravel.co.ke/destinations",
        'x-default': "https://www.jaetravel.co.ke/destinations",
      },
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// مكون الخادم: الصفحة
// ————————————————————————
export default function DestinationsPage() {
  return (
    <>
      {/* مخطط النتائج الغنية الكامل — مع كائن الصورة! */}
      <JsonLd id="destinations-schema" data={destinationsSchema} />
      <AllPageSEOSchema
        type="category"
        slug="destinations"
        categoryOpts={{
          title: "وجهات السفاري في شرق أفريقيا",
          description: "دليل شامل لأفضل وجهات السفاري في كينيا وتنزانيا ورواندا وأوغندا.",
          image: "/east-africa-map.jpg",
          tours: [], // لا توجد جولات مباشرة في هذه الصفحة
        }}
      />
      <div className="container mx-auto px-4 py-16" dir="rtl">

        {/* رأس الصفحة */}
        <header className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance md:text-6xl">
            استكشف أفضل وجهات شرق أفريقيا
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
            من السهول التي لا نهاية لها في <strong>ماساي مارا</strong> و<strong>سيرينجيتي</strong> إلى الجبال الضبابية في <strong>حديقة البراكين الوطنية</strong> و<strong>بوندي</strong>،
            اكتشف أفضل ما في <strong>كينيا وتنزانيا ورواندا وأوغندا</strong> مع جولات سفاري بصحبة مرشدين خبراء، وتجارب ثقافية، وخيارات سفر ميسرة.
          </p>
        </header>

        {/* فقرات تعريفية محسَّنة */}
        <section className="mb-16 space-y-6 max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed">
            <strong>وجهات شرق أفريقيا</strong> تقدم بعضًا من أروع مشاهدة الحياة البرية والتجارب الثقافية في العالم.
            سواء كنت تبحث عن الهجرة الكبرى في <strong>ماساي مارا كينيا</strong> و<strong>سيرينجيتي تنزانيا</strong>،
            أو لقاءات الرئيسيات التي لا تُنسى في أراضي <strong>غوريلا رواندا</strong> و<strong>تتبع غوريلا بوندي</strong> في أوغندا،
            فإن محفظة <strong>الوجهات الأفريقية</strong> التي نظمناها بعناية تضمن مغامرات لا تُنسى.
          </p>

          <p className="text-lg leading-relaxed">
            تشمل <strong>وجهات سفاري شرق أفريقيا</strong> لدينا متنزهات أيقونية مثل <strong>منتزه أمبوسيلي الوطني</strong> بإطلالاته الخلابة على جبل كليمنجارو،
            <strong>بحيرة ناكورو</strong> المشهورة بتجمعات طيور الفلامنجو، <strong>فوهة نغورونغورو</strong> الغنية بالحياة البرية، و<strong>حديقة الملكة إليزابيث الوطنية</strong> المتنوعة في أوغندا.
            تقدم كل وجهة أنظمة بيئية فريدة ولقاءات مع الحياة البرية تحدد <strong>أفضل أماكن الزيارة في شرق أفريقيا</strong>.
          </p>

          <p className="text-lg leading-relaxed">
            بالنسبة لأولئك الذين يبحثون عن استرخاء على الساحل، توفر إضافات <strong>شاطئ زنجبار</strong> المكمل المثالي لمغامرات السفاري.
            تسمح لك <strong>جولات كينيا تنزانيا رواندا أوغندا</strong> الشاملة لدينا بتجربة عدة بلدان في مسار واحد سلس،
            من <strong>جولات تنزانيا</strong> التي تركز على رحلات السفاري في الدائرة الشمالية إلى مغامرات <strong>سفاري أوغندا</strong> في لؤلؤة أفريقيا.
          </p>

          <p className="text-lg leading-relaxed">
            عند التخطيط لمسار <strong>وجهات شرق أفريقيا</strong> الخاص بك، ضع في اعتبارك النقاط الموسمية المميزة لكل منطقة.
            تبلغ ذروة تجربة <strong>ماساي مارا كينيا</strong> خلال الهجرة الكبرى من يوليو إلى أكتوبر، بينما يقدم <strong>سيرينجيتي تنزانيا</strong>
            حركة مفترسات استثنائية على مدار العام. بالنسبة لقاءات <strong>غوريلا رواندا</strong>، توفر <strong>حديقة البراكين الوطنية</strong>
            تجارب تتبع ميسرة، بينما يقدم <strong>تتبع غوريلا بوندي</strong> في أوغندا مغامرة أكثر وعورة وغامرة
            في محيط غابات استوائية قديمة.
          </p>

          <p className="text-lg leading-relaxed">
            إلى جانب <strong>الوجهات الأفريقية</strong> الشهيرة، تحتوي شرق أفريقيا على جواهر خفية تُكمل تجربة السفاري.
            تتحول <strong>بحيرة ناكورو</strong> إلى مشهد وردي مع ملايين طيور الفلامنجو، بينما يقدم <strong>منتزه أمبوسيلي الوطني</strong>
            صورًا مثالية لقطعان الفيلة على خلفية جبل كليمنجارو. تعمل <strong>فوهة نغورونغورو</strong> كمدرج طبيعي
            مزدحم بالحياة البرية، ويقدم <strong>منتزه الملكة إليزابيث الوطني</strong> جولات سفاري فريدة بالقارب على طول قناة كازينجا إلى جانب رحلات السفاري الكلاسيكية.
          </p>

          <p className="text-lg leading-relaxed">
            يشكل الجمع بين <strong>وجهات سفاري شرق أفريقيا</strong> هذه المغامرة الأفريقية النهائية. تم تصميم <strong>جولات كينيا تنزانيا رواندا أوغندا</strong> لدينا
            بعناية لعرض نقاط القوة الفريدة لكل بلد - من عبور حيوانات البرية في <strong>ماساي مارا كينيا</strong> إلى جولات التوابل والمياه البلورية في <strong>شاطئ زنجبار</strong>،
            ومن لقاءات غوريلا الجبل في <strong>حديقة البراكين الوطنية</strong> إلى تتبع الشمبانزي في غابات أوغندا. تمثل <strong>أفضل أماكن الزيارة في شرق أفريقيا</strong>
            قمة السياحة البرية والانغماس الثقافي.
          </p>
        </section>

        {/* شبكة الوجهات */}
        <section className="grid gap-8 md:grid-cols-2 mb-16">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </section>

        {/* أبرز النقاط الإقليمية */}
        <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">أبرز النقاط الإقليمية في شرق أفريقيا</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">مسارات السفاري في كينيا وتنزانيا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  عِش <strong>وجهات سفاري شرق أفريقيا</strong> الكلاسيكية بما في ذلك نظام ماساي مارا - سيرينجيتي البيئي،
                  قطعان الفيلة في أمبوسيلي، ومنطقة محمية فوهة نغورونغورو. تقدم <strong>الوجهات الأفريقية</strong> هذه
                  بعضًا من أكثر مشاهدة الطرائد الكبيرة موثوقية وفرص التصوير الفوتوغرافي في العالم.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">مغامرات الرئيسيات في رواندا وأوغندا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  انطلق في غابات <strong>حديقة البراكين الوطنية</strong> و<strong>غابة بوندي التي لا يمكن اختراقها</strong>
                  للقاءات حميمة مع الغوريلا. تمثل تجارب <strong>غوريلا رواندا</strong> و<strong>سفاري أوغندا</strong> هذه
                  بعضًا من أعمق تفاعلات الحياة البرية المتاحة في أي مكان في العالم.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* قسم الأسئلة الشائعة */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
              أسئلة شائعة حول وجهات شرق أفريقيا
            </h2>
            <div className="space-y-8">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 itemProp="name" className="text-xl font-bold mb-2">{faq.name}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* دعوة للعمل */}
        <section className="rounded-2xl bg-primary/10 p-8 text-center md:p-12">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
            لا تستطيع أن تقرر أين تذهب؟
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
            يمكن لخبراء السفر لدينا في شرق أفريقيا تصميم مسار مخصص متعدد البلدان يجمع بين <strong>رحلات سفاري الحياة البرية في كينيا</strong>،
            <strong>إضافات شاطئية في تنزانيا</strong>، <strong>تتبع الغوريلا في رواندا</strong>، و<strong>جولات المغامرة في أوغندا</strong>.
            استكشف أفضل <strong>وجهات شرق أفريقيا</strong> مع <strong>جولات كينيا تنزانيا رواندا أوغندا</strong> المصممة خصيصًا لتناسب اهتماماتك وأسلوب سفرك.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/ar/contact">احصل على استشارة شخصية</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ar/tours">عرض جميع باقات السفاري</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}