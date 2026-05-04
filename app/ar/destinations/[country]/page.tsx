// app/ar/destinations/[country]/page.tsx
import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { destinations, getDestinationBySlug } from "@/lib/i18n/data/ar/destinations-data"
import { toursByCountry } from "@/lib/i18n/data/ar/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Check, ArrowRight } from "lucide-react"
import JsonLd from "@/components/JsonLd"

interface DestinationPageProps {
  params: {
    country: string
  }
}

// مخطط النتائج الغنية الديناميكي — صورة + غنى كامل
function generateDestinationSchema(destination: typeof destinations[0]) {
  const pageUrl = `https://www.jaetravel.co.ke/ar/destinations/${destination.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. المنظمة + النشاط التجاري المحلي (مع تقييم إجمالي ومراجعات فردية)
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://www.jaetravel.co.ke/ar/#organization",
        "name": "جايه ترافيل إكسبديشنز",
        "url": "https://www.jaetravel.co.ke/ar",
        "logo": "https://www.jaetravel.co.ke/logo.png",
        "telephone": "+254726485228",
        "description": "أكبر مشغل لرحلات السفاري المستدامة والميسرة للكراسي المتحركة في شرق أفريقيا في كينيا وتنزانيا ورواندا وأوغندا.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "reviewCount": "723"
        },
        // مراجعات فردية – يمكن لـ Google عرضها كنجوم غنية + مقتطفات مراجعة
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
            "reviewBody": `كانت رحلتنا في ${destination.name} مذهلة للغاية! عرف مرشدو جايه ترافيل كل ركن من أركان المنتزه، وكانت ميزات إمكانية الوصول لا تشوبها شائبة. أوصي بشدة!`
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
            "reviewBody": `تجربة مذهلة لاستكشاف ${destination.name} مع جايه ترافيل! فريق محترف، وسائل نقل مريحة، ومشاهدات لا تُصدق للحياة البرية. كل شيء كان منظمًا بشكل مثالي.`
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
            "reviewBody": `قدمت جايه ترافيل رحلة لا تُنسى إلى ${destination.name}! أفضل المرشدين، مناظر طبيعية خلابة، وتخطيط سلس. أفضل شركة سفاري في شرق أفريقيا!`
          }
        ]
      },

      // 2. كيان المكان الرئيسي (محسَّن لنتائج المكان الغنية)
      {
        "@type": "Place",
        "@id": `${pageUrl}#place`,
        "name": destination.name,
        "url": pageUrl,
        "description": destination.description,
        "image": {
          "@type": "ImageObject",
          "url": destination.heroImage,
          "contentUrl": destination.heroImage,
          "name": `${destination.name} وجهة سفاري`,
          "description": destination.longDescription?.slice(0, 200) || destination.description,
          "width": "1200",
          "height": "800",
          "creator": {
            "@type": "Organization",
            "@id": "https://www.jaetravel.co.ke/ar/#organization"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": destination.country || "KE"
        }
      },

      // 3. موقع الويب
      {
        "@type": "WebSite",
        "@id": "https://www.jaetravel.co.ke/ar/#website",
        "url": "https://www.jaetravel.co.ke/ar",
        "name": "جايه ترافيل إكسبديشنز",
        "publisher": { "@id": "https://www.jaetravel.co.ke/ar/#organization" }
      },

      // 4. صفحة الويب
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `${destination.name} سفاري | جايه ترافيل إكسبديشنز`,
        "description": destination.metaDescription,
        "isPartOf": { "@id": "https://www.jaetravel.co.ke/ar/#website" },
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": destination.heroImage,
          "width": 1200,
          "height": 630
        },
        "mainEntity": { "@id": `${pageUrl}#place` }
      },

      // 5. قائمة التنقل
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": destination.name,
            "item": pageUrl
          }
        ]
      },

      // 6. صفحة الأسئلة الشائعة (محسَّنة لعرض carousel الغني)
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faqpage`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `ما هو أفضل وقت لزيارة ${destination.name}؟`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": destination.bestTimeToVisit
            }
          },
          {
            "@type": "Question",
            "name": `هل يمكنني زيارة ${destination.name} في جولة ميسرة للكراسي المتحركة؟`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `نعم! نحن نقدم جولات ميسرة بالكامل بمركبات ذات رافعات هيدروليكية ومنحدرات ونزل خالية من العوائق في ${destination.name}.`
            }
          },
          {
            "@type": "Question",
            "name": `كيف يمكنني الوصول إلى ${destination.name}؟`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نقوم بترتيب جميع وسائل النقل — رحلات داخلية، أو انتقالات برية بمركبات 4x4، أو طيران خاص حسب مسار رحلتك. يمكننا استلامك من نيروبي أو أروشا أو كيغالي أو عنتيبي."
            }
          },
          {
            "@type": "Question",
            "name": `ما هي الحياة البرية التي يمكنني توقع رؤيتها في ${destination.name}؟`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": destination.wildlifeHighlights || "الحيوانات الخمسة الكبار (الأسد، النمر، الفيل، الجاموس، وحيد القرن)، هجرة الحيوانات البرية (إذا كانت قابلة للتطبيق)، الغوريلا، الشمبانزي، والمزيد من الأنواع الفريدة."
            }
          },
          {
            "@type": "Question",
            "name": `هل توجد جولات مناسبة للميزانية إلى ${destination.name}؟`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `نعم! نحن نقدم مجموعة من الخيارات الاقتصادية والمتوسطة والفاخرة إلى ${destination.name}، جميعها بمرشدين محترفين وقيمة ممتازة.`
            }
          }
        ]
      },

      // 7. عروض الجولات المميزة (عناصر TouristTrip – تساعد في قوائم الجولات الغنية)
      ...(toursByCountry[destination.name as keyof typeof toursByCountry] || [])
        .slice(0, 3)
        .map((tour) => ({
          "@type": "TouristTrip",
          "@id": `https://www.jaetravel.co.ke/ar${tour.url || `/tours/${tour.slug}`}#tour`,
          "name": tour.title,
          "description": tour.shortDescription || tour.description,
          "image": tour.image,
          "url": `https://www.jaetravel.co.ke/ar${tour.url || `/tours/${tour.slug}/book`}`,
          "offers": {
            "@type": "Offer",
            "url": `https://www.jaetravel.co.ke/ar${tour.url || `/tours/${tour.slug}/book`}`,
            "priceCurrency": tour.currency || "USD",
            "price": tour.price.toString(),
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://www.jaetravel.co.ke/ar/#organization"
            }
          }
        }))
    ]
  };
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    country: destination.slug,
  }))
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { country } = await params
  const destination = getDestinationBySlug(country)

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"

  if (!destination) {
    return {
      title: "الوجهة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    keywords: destination.keywords,

    alternates: {
      canonical: `${baseUrl}/ar/destinations/${country}`,
      languages: {
        'ar': `${baseUrl}/ar/destinations/${country}`,
        'en': `${baseUrl}/destinations/${country}`,
      },
    },

    openGraph: {
      title: destination.metaTitle,
      description: destination.metaDescription,
      type: "website",
      url: `${baseUrl}/ar/destinations/${country}`,
      images: [
        {
          url: destination.heroImage.startsWith("http")
            ? destination.heroImage
            : `${baseUrl}${destination.heroImage}`,
          width: 1200,
          height: 630,
          alt: destination.metaTitle,
        },
      ],
      siteName: "جايه ترافيل إكسبديشنز",
      locale: "ar_KE",
    },

    twitter: {
      card: "summary_large_image",
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [
        destination.heroImage.startsWith("http")
          ? destination.heroImage
          : `${baseUrl}${destination.heroImage}`,
      ],
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
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  // انتظار كائن المعاملات هنا أيضًا
  const { country } = await params
  const destination = getDestinationBySlug(country)

  if (!destination) {
    notFound()
  }

  const countryTours = toursByCountry[destination.name as keyof typeof toursByCountry] || []

  return (
    <>
      <AllPageSEOSchema type="destination" data={destination} slug={country} />
      {/* مخطط النتائج الغنية الديناميكي */}
      <JsonLd 
        id="destination-schema" 
        data={generateDestinationSchema(destination)} 
      />
      <div className="pb-16" dir="rtl">
        {/* قسم البطل */}
        <div className="relative h-[70vh] min-h-[500px]">
          <Image
            src={destination.heroImage || "/placeholder.svg"}
            alt={destination.name}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-16">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/90">
              <Link href="/ar/destinations" className="hover:underline">
                الوجهات
              </Link>
              <span>/</span>
              <span>{destination.name}</span>
            </div>
            <h1 className="mb-4 font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl text-balance">
              اكتشف {destination.name}
            </h1>
            <p className="max-w-3xl text-xl text-white/90 leading-relaxed text-pretty">{destination.description}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* قسم النظرة العامة */}
          <div className="mb-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-serif text-4xl font-bold">عن {destination.name}</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">{destination.longDescription}</p>
                
                {/* فقرات تحسين محركات البحث الإضافية */}
                <div className="mt-6 space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    كواحدة من أفضل <strong>وجهات شرق أفريقيا</strong>، تقدم {destination.name} فرصًا لا مثيل لها لعشاق الحياة البرية 
                    والباحثين عن المغامرة على حد سواء. سواء كنت تستكشف السافانا الشاسعة أو الغابات الكثيفة أو السواحل البكر، 
                    تعرض هذه المنطقة الرائعة أفضل ما في تجارب السفاري الأفريقية واللقاءات الثقافية التي ستخلق ذكريات تدوم مدى الحياة.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    يدعم تنوع النظم البيئية في {destination.name} مجموعة لا تصدق من الحياة البرية، من الحيوانات الخمسة الكبار 
                    إلى الأنواع المتوطنة النادرة. تضمن جولاتنا المصممة بعناية أن تجرب مشاهدة الطرائد الأكثر روعة 
                    مع دعم ممارسات السياحة المستدامة التي تحمي هذه البيئات الثمينة للأجيال القادمة من المسافرين للاستمتاع بها.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    إلى جانب الحياة البرية، تفتخر {destination.name} بتراث ثقافي غني مع فرص للتفاعل مع 
                    المجتمعات المحلية، وتذوق المأكولات التقليدية، والتعرف على التقاليد القديمة. يقدم مرشدونا الخبراء 
                    رؤى عميقة حول تاريخ المنطقة وبيئتها، محولين رحلتك إلى مغامرة تعليمية تتجاوز تجارب السائح النموذجية.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <Calendar className="h-5 w-5" />
                      <h3 className="font-semibold">أفضل وقت للزيارة</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{destination.bestTimeToVisit}</p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <MapPin className="h-5 w-5" />
                      <h3 className="font-semibold">حقائق سريعة</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• المنطقة: شرق أفريقيا</li>
                      <li>• العملة: العملة المحلية</li>
                      <li>• اللغة: اللغة الإنجليزية منتشرة على نطاق واسع</li>
                      <li>• التأشيرة: متاحة عند الوصول لمعظم الجنسيات</li>
                    </ul>
                  </div>

                  <Button asChild className="mt-6 w-full">
                    <Link href="/ar/contact">خطِّط رحلتك</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* قسم السياق الإقليمي */}
          <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-serif font-bold text-center mb-8">
                {destination.name} في منطقة شرق أفريقيا
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">الحياة البرية وتجارب السفاري</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    يشكل {destination.name} جزءًا لا يتجزأ من نظام شرق أفريقيا البيئي الأكبر، حيث يتشارك طرق الهجرة 
                    وتجمعات الحياة البرية مع البلدان المجاورة. يسمح هذا الترابط بتجارب سفاري رائعة عبر الحدود 
                    تعرض عجائب المنطقة الطبيعية على نطاق ملحمي، من الهجرة الكبرى إلى مغامرات تتبع الرئيسيات.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">فرص ثقافية ومغامرة</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    إلى ما وراء مشاهدات الحياة البرية الشهيرة، يقدم {destination.name} تفاعلات ثقافية أصيلة مع 
                    المجتمعات المحلية، ومناظر طبيعية خلابة لعشاق التصوير، وأنشطة متنوعة تتراوح من رحلات منطاد الهواء 
                    الساخن إلى جولات المشي في الطبيعة بصحبة مرشدين. كل تجربة مصممة بعناية لتوفير انغماس عميق 
                    مع الحفاظ على أعلى معايير السياحة المسؤولة.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* قسم أبرز المعالم */}
          <section className="mb-16">
            <h2 className="mb-8 font-serif text-4xl font-bold text-center">لماذا تزور {destination.name}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destination.highlights.map((highlight, index) => (
                <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium leading-relaxed">{highlight}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* قسم الجولات */}
          <section className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-4xl font-bold">جولات في {destination.name}</h2>
              <Button asChild variant="ghost">
                <Link href="/ar/tours">
                  عرض جميع الجولات <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {countryTours.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {countryTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">لا توجد جولات متاحة لهذه الوجهة بعد.</p>
                  <Button asChild className="mt-4">
                    <Link href="/ar/contact">اطلب جولة مخصصة</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* معلومات إضافية عن الوجهة */}
          <section className="mb-16">
            <div className="bg-muted/20 rounded-2xl p-8">
              <h2 className="font-serif text-3xl font-bold text-center mb-6">
                التخطيط لمغامرتك في {destination.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">نصائح السفر والتحضير</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    يشمل التحضير لرحلتك إلى {destination.name} مراعاة التغيرات الموسمية، وتجهيز الملابس المناسبة 
                    لكل من رحلات السفاري والزيارات الثقافية، وفهم العادات والتقاليد المحلية. تضمن أدلة ما قبل السفر الشاملة لدينا 
                    أن تكون مستعدًا بالكامل لمغامرة شرق أفريقيا التي لا تُنسى.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    نوصي بالحجز قبل عدة أشهر مقدمًا، خاصة للسفر في موسم الذروة أو للتجارب المتخصصة 
                    مثل تصاريح تتبع الغوريلا والإقامة الفاخرة في المناطق عالية الطلب. يمكن لفريقنا المساعدة في جميع 
                    الترتيبات اللوجستية لتجربة سفر سلسة.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">السياحة المستدامة</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    تم تصميم جولاتنا في {destination.name} مع وضع الاستدامة في صميمها، ودعم جهود الحفظ المحلية 
                    ومشاريع تنمية المجتمع. من خلال اختيار خيارات السفر المسؤولة لدينا، فإنك تساهم بشكل مباشر 
                    في الحفاظ على التنوع البيولوجي والتراث الثقافي المذهل الذي يجعل هذه المنطقة مميزة للغاية.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    نتعاون مع أماكن إقامة مملوكة محليًا، ونوظف مرشدين من المجتمع، ونتبع إرشادات بيئية صارمة 
                    لتقليل تأثيرنا مع تعظيم الفوائد الإيجابية للسياحة لكل من الزوار والمجتمعات المضيفة.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* قسم الحث على اتخاذ إجراء */}
          <section className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
              هل أنت مستعد لاستكشاف {destination.name}؟
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
              دع فريقنا الخبير يساعدك في التخطيط لمغامرة {destination.name} المثالية. من رحلات السفاري الفاخرة إلى التجارب
              الثقافية، سننشئ مسارًا مصممًا حسب أحلامك. اكتشف لماذا تظل {destination.name} واحدة من أكثر 
              <strong>وجهات شرق أفريقيا</strong> طلبًا للمسافرين المميزين الذين يبحثون عن لقاءات حقيقية مع الحياة البرية 
              وروابط ثقافية هادفة.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/ar/contact">اتصل بنا</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  راسلنا عبر واتساب
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}