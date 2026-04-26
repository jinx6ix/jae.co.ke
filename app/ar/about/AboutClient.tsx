"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Shield, Users, Globe, Leaf, ChevronDown, Calendar, Phone, Trees, Users as UsersIcon } from "lucide-react"
import Script from "next/script"

interface FAQ {
  question: string
  answer: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface Value {
  icon: string
  title: string
  text: string
}

interface AboutClientProps {
  faqs: FAQ[]
  teamMembers: TeamMember[]
  values: Value[]
}

const iconMap = {
  Heart,
  Leaf,
  Users,
  Shield,
  Award,
  Globe,
}

export default function AboutClient({ faqs, teamMembers, values }: AboutClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Arabic FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<strong>|<\/strong>/g, ""),
      },
    })),
  }

  // Arabic Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "رحلات جي تريل",
    "url": "https://www.jaetravel.co.ke/ar",
    "logo": "https://www.jaetravel.co.ke/logo.png",
    "description": "مشغل سفاري حائز على جوائز ومتخصص في السياحة المستدامة والتي تلائم الجميع في شرق أفريقيا منذ 2008.",
    "foundingDate": "2008",
    "founder": { "@type": "Person", "name": "جيمس كيماني" },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "نيروبي",
      "addressCountry": "KE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254726485228",
      "contactType": "خدمة العملاء",
      "areaServed": ["KE", "TZ", "RW", "UG"],
      "availableLanguage": ["العربية", "الإنجليزية", "السواحلية"]
    },
    "award": [
      "جائزة السياحة الكينية – السياحة للجميع 2023",
      "جوائز السفر العالمية – السياحة المسؤولة في أفريقيا 2024"
    ],
    "sameAs": [
      "https://www.facebook.com/JaeTravelExpeditions",
      "https://www.instagram.com/JaeTravelExpeditions"
    ]
  }

  return (
    <div className="pb-16" dir="rtl">
      {/* Structured Data */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="org-schema" type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </Script>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/african-safari-team-with-tourists.jpg"
            alt="فريق جي تريل يقود مجموعة سفاري ميسرة في ماساي مارا، كينيا"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
            عن <span className="text-primary">رحلات جي تريل</span>
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-white/90 text-pretty">
            <strong>منذ 2008</strong>، نحن الاسم الأكثر ثقة في شرق أفريقيا في <strong>السفاري الميسر</strong>، 
            <strong> المستدام</strong> و<strong> الأصيل</strong> — ساعدنا أكثر من <strong>15,000 مسافر</strong> 
            على اكتشاف كينيا وتنزانيا ورواندا وأوغندا بكرامة وفرح وهدف.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/ar/tours">استكشف رحلات السفاري</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] border-white bg-white/10 backdrop-blur hover:bg-white/20">
              <Link href="/ar/contact">خطط لرحلتك</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Calendar className="h-8 w-8 mx-auto mb-2" />, label: "منذ", value: "2008" },
              { icon: <UsersIcon className="h-8 w-8 mx-auto mb-2" />, label: "ضيف سعيد", value: "15,000+" },
              { icon: <Trees className="h-8 w-8 mx-auto mb-2" />, label: "شجرة مزروعة", value: "18,000+" },
              { icon: <Award className="h-8 w-8 mx-auto mb-2" />, label: "جائزة فازت بها", value: "12+" },
            ].map((stat, i) => (
              <div key={i}>
                {stat.icon}
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Paragraphs */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6 text-right">
            <p>
              <strong>رحلات جي تريل</strong> هي مشغل السفاري الرائد في شرق أفريقيا، متخصص في تقديم تجارب حياة برية لا تُنسى عبر 
              <strong> كينيا، تنزانيا، رواندا، وأوغندا</strong>. تأسست في 2008 على يد جيمس كيماني، ونمت شركتنا من عملية عائلية صغيرة 
              إلى قائد محترم في <strong>السياحة الميسرة</strong> و<strong>ممارسات السفاري المستدامة</strong>. 
              التزامنا بالتميز أكسبنا سمعة كأحد أكثر <strong>منظمي رحلات السفاري ثقة في شرق أفريقيا</strong>.
            </p>
            
            <p>
              ما يميز <strong>جي تريل</strong> هو تفانينا الثابت في <strong>حلول السفر الميسرة</strong>. لقد ابتكرنا سفاري صديق للكراسي المتحركة 
              في شرق أفريقيا، وطورنا مركبات متخصصة ودربنا مرشدينا على ممارسات السياحة الشاملة. 
              أسطولنا من <strong>مركبات الدفع الرباعي المزودة برافعة هيدروليكية</strong> وشراكاتنا مع 
              <strong>النزل الخالية من العوائق</strong> يضمنان للمسافرين من جميع القدرات تجربة سحر الحياة البرية الأفريقية براحة وأمان.
            </p>

            <p>
              ما وراء إمكانية الوصول، نحن ملتزمون بشدة <strong>بالسياحة المستدامة</strong> و<strong>جهود الحفاظ على البيئة</strong> 
              في جميع أنحاء شرق أفريقيا. كل رحلة سفاري مع جي تريل تساهم في تنمية المجتمع المحلي، وبرامج حماية الحياة البرية، 
              ومبادرات الحفاظ على البيئة. لقد زرعنا أكثر من 18,000 شجرة، ودعمنا العديد من المشاريع المجتمعية، 
              وحافظنا على <strong>عمليات محايدة للكربون</strong> منذ 2015.
            </p>

            <p>
              فريق <strong>مرشدي السفاري المحترفين</strong> لدينا يمثل قلب جي تريل. يخضع كل مرشد لتدريب مكثف في سلوك الحياة البرية، 
              وتقنيات التصوير الفوتوغرافي، والإسعافات الأولية، والتفسير الثقافي. العديد من مرشدينا يأتون من المجتمعات المحلية 
              ولديهم أجيال من المعرفة حول النظم البيئية في شرق أفريقيا، مما يضمن تجارب سفاري أصيلة وثاقبة لضيوفنا.
            </p>

            <p>
              مع استمرارنا في النمو، تظل مهمتنا دون تغيير: تقديم <strong>تجارب سفاري استثنائية</strong> ميسرة للجميع، 
              ومفيدة للمجتمعات المحلية، وحامية للحياة البرية والموائل الثمينة في شرق أفريقيا. 
              تصفح <a href="/ar/budget-tours" className="text-primary hover:underline">جولاتنا الاقتصادية</a> أو خيارات الفاخرة للعثور على رحلة السفاري المثالية لك.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-balance">رحلتنا: من الرؤية إلى النجاح</h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed text-right">
                <p>
                  <strong>ولدت رحلات جي تريل في عام 2008</strong> من حلم بسيط: مشاركة الجمال الخام والمذهل لشرق أفريقيا مع العالم — <em>بدون حواجز</em>.
                </p>
                <p>
                  رأى المؤسس <strong>جيمس كيماني</strong>، مرشد ماساي يتمتع بخبرة تزيد عن 20 عامًا في الأدغال، مسافرين من ذوي الإعاقة يُرفضون من رحلات السفاري. رفض قبول ذلك. لذا بنى شركة تقول <strong>نعم</strong> — لمستخدمي الكراسي المتحركة، وكبار السن، والعائلات، والجميع بينهم.
                </p>
                <p>
                  اليوم، نحن فخورون بكوننا <strong>مشغل السفاري الرائد في شرق أفريقيا للسياحة الميسرة</strong>، مع أسطول من <strong>مركبات الدفع الرباعي المزودة برافعة هيدروليكية</strong>، وشراكات مع <strong>نزل خالية من العوائق</strong>، وفريق مدرب على <strong>التوجيه الشامل</strong>.
                </p>
                <p>
                  لكننا أكثر من مجرد إمكانية وصول. نحن <strong>محايدون للكربون</strong>، و<strong>مدعومون بالمجتمع</strong>، و<strong>مدفوعون بالحفاظ على البيئة</strong>. كل رحلة سفاري تزرع الأشجار، وتمول المدارس، وتحمي الحياة البرية.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge text="جائزة السياحة الكينية 2023" />
                <Badge text="جوائز السفر العالمية 2024" />
                <Badge text="تريب أدفايزر 5★" />
              </div>
            </div>
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/safari-guides-with-tourists-in-africa.jpg"
                alt="مرشد جي تريل يساعد ضيفاً على كرسي متحرك خلال سفاري ميسر في كينيا"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regional Expertise */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">خبرة سفاري شرق أفريقيا</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-right">
              <h3 className="text-xl font-bold mb-4">متخصصو سفاري كينيا وتنزانيا</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                بصفتنا <strong>منظمي رحلات سفاري رائدين في شرق أفريقيا</strong>، لدينا خبرة عميقة 
                في أنظمة ماساي مارا وأمبوسيلي وتسافو في كينيا، وكذلك سيرينجيتي ونجورونجورو وتارانجيري في تنزانيا. 
                معرفتنا بأنماط الهجرة وسلوك الحيوانات وأماكن المشاهدة المخفية تضمن تجارب استثنائية للحياة البرية لضيوفنا.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                نحافظ على علاقات قوية مع مديري المحميات وسلطات المتنزهات، مما يمنح ضيوفنا إمكانية الوصول إلى مناطق حصرية 
                وتجارب خاصة تتجاوز الطرق السياحية النموذجية. عملياتنا عبر الحدود بين كينيا وتنزانيا سلسة، 
                مع توثيق كامل يتم التعامل معه بكفاءة.
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold mb-4">خبراء الرئيسيات في رواندا وأوغندا</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>رحلات سفاري تتبع الغوريلا</strong> المتخصصة لدينا في أوغندا ورواندا يقودها مرشدون 
                لديهم خبرة واسعة في سلوك الرئيسيات والحفاظ عليها. نحن نفهم أنظمة التصاريح، ومتطلبات التتبع، 
                وأفضل الممارسات لمشاهدة الغوريلا والشمبانزي المسؤولة في بويندي وفولكانوز وكيبالي.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ما وراء الرئيسيات، نقدم تجارب ثقافية وحياة برية شاملة في كلا البلدين، بما في ذلك مغامرات البحيرات، 
                مراقبة الطيور، وزيارات المجتمع التي تقدم رؤى أصيلة عن الحياة في شرق أفريقيا مع دعم الاقتصادات المحلية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">قيمنا الأساسية</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item, i) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <Card key={i} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-right">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">تعرف على عائلة السفاري الخاصة بك</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              فريقنا ليس فقط من ذوي الخبرة — بل هم <strong>سكان محليون شغوفون</strong> يعيشون ويتنفسون شرق أفريقيا. 
              من محاربي الماساي إلى حملة دكتوراه في الحفاظ على البيئة، هم هنا لجعل رحلة السفاري الخاصة بك لا تُنسى.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={member.image}
                      alt={`${member.name}، ${member.role} في رحلات جي تريل`}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="mb-3 text-sm text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 font-serif text-4xl font-bold text-balance">الجوائز والتكريمات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <Image src="/awards/kenya-tourism-award.png" alt="جائزة السياحة الكينية 2023" width={120} height={120} />
            <Image src="/awards/world-travel-awards.png" alt="جوائز السفر العالمية 2024" width={120} height={120} />
            <Image src="/awards/tripadvisor-choice.png" alt="اختيار المسافرين من تريب أدفايزر" width={120} height={120} />
            <Image src="/awards/carbon-neutral.png" alt="مشغل محايد للكربون" width={120} height={120} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium pr-8 text-right" dangerouslySetInnerHTML={{ __html: faq.question }} />
                  <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === i ? "rotate-180 text-primary" : ""}`} />
                </div>
                {openIndex === i && (
                  <p className="mt-4 text-muted-foreground leading-relaxed text-right" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-balance">
            هل أنت مستعد لمغامرتك في شرق أفريقيا؟
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
            انضم إلى الآلاف من المسافرين السعداء الذين اكتشفوا أفريقيا مع <strong>جي تريل</strong> — حيث تلتقي إمكانية الوصول والاستدامة والسحر. 
            جرب أفضل <strong>سفاري الحياة البرية في كينيا</strong>، <strong>جولات الهجرة في تنزانيا</strong>، 
            <strong>تتبع الغوريلا في رواندا</strong>، و<strong>سفر المغامرات في أوغندا</strong> مع مشغل السفاري الأكثر ثقة في شرق أفريقيا.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" variant="secondary" className="min-w-[220px]">
              <Link href="/ar/tours">عرض جميع جولات السفاري</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[220px] border-white text-white hover:bg-white/20">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                <Phone className="ml-2 h-5 w-5" /> راسلنا على واتساب
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">استشارة مجانية • رد فوري • تخصيص 100%</p>
        </div>
      </section>
    </div>
  )
}

// Helper Badge Component
function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      <Award className="ml-1 h-3 w-3" /> {text}
    </span>
  )
}