import type { Metadata } from "next"
import AboutClient from "./AboutClient"
import JsonLd from "@/components/JsonLd"

// Arabic About Page Schema — optimized for /ar/about
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/ar/#organization",
      "name": "رحلات جي تريل",
      "url": "https://www.jaetravel.co.ke/ar",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "description": "مشغل سفاري حائز على جوائز ومتخصص في السياحة المستدامة والتي تلائم الجميع في كينيا وتنزانيا ورواندا وأوغندا منذ 2008.",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      },
      "foundingDate": "2008",
      "founder": { "@type": "Person", "name": "جيمس كيماني" },
      "award": [
        "جائزة السياحة الكينية – السياحة للجميع 2023",
        "جوائز السفر العالمية – السياحة المسؤولة في أفريقيا 2024"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      "makesOffer": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "جولات سفاري ميسرة للكراسي المتحركة وتأجير مركبات",
          "description": "سفاري مخصصة ميسرة وتأجير مركبات دفع رباعي مكيفة في جميع أنحاء شرق أفريقيا."
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/ar/#website",
      "url": "https://www.jaetravel.co.ke/ar",
      "name": "رحلات جي تريل",
      "publisher": { "@id": "https://www.jaetravel.co.ke/ar/#organization" },
      "inLanguage": "ar"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/ar/about/#webpage",
      "url": "https://www.jaetravel.co.ke/ar/about",
      "name": "عن رحلات جي تريل | خبراء سفاري شرق أفريقيا منذ 2008",
      "description": "تعرف على الفريق وراء شركة السفاري الرائدة في كينيا والمتخصصة في السياحة الميسرة والمستدامة.",
      "inLanguage": "ar",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/ar/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/ar/about/#breadcrumb" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.jaetravel.co.ke/team/team-group-photo.jpg",
        "width": 1200,
        "height": 630
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/ar/about/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://www.jaetravel.co.ke/ar" },
        { "@type": "ListItem", "position": 2, "name": "عن الشركة", "item": "https://www.jaetravel.co.ke/ar/about" }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.jaetravel.co.ke/ar/team/james-kimani/#person",
      "name": "أنتوني وايتيتو",
      "jobTitle": "المؤسس وكبير مرشدي السفاري",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/ar/#organization" },
      "image": "https://www.jaetravel.co.ke/team/james-kimani.jpg",
      "description": "ولد في منطقة ماساي مارا مع خبرة تزيد عن 22 عامًا في التوجيه. أسس جي تريل في 2008 لجعل السفاري في متناول الجميع.",
      "sameAs": []
    },
    {
      "@type": "Person",
      "@id": "https://www.jaetravel.co.ke/ar/team/sarah-mwangi/#person",
      "name": "سارة موانجي",
      "jobTitle": "رئيسة قسم إمكانية الوصول وتجربة الضيوف",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/ar/#organization" },
      "image": "https://www.jaetravel.co.ke/team/sarah-mwangi.jpg",
      "description": "خبيرة في تصميم السياحة الشاملة، تضمن أن كل ضيف يتمتع بتجربة سفاري سلسة لا تُنسى."
    },
    {
      "@type": "Person",
      "@id": "https://www.jaetravel.co.ke/ar/team/david-ochieng/#person",
      "name": "ديفيد أوتشينج",
      "jobTitle": "مدير الحفاظ على البيئة والمجتمع",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/ar/#organization" },
      "image": "https://www.jaetravel.co.ke/team/david-ochieng.jpg",
      "description": "يقود مبادرات السياحة المسؤولة، بالشراكة مع المجتمعات المحلية ومشاريع الحفاظ على البيئة."
    },
    {
      "@type": "Person",
      "@id": "https://www.jaetravel.co.ke/ar/team/amina-hassan/#person",
      "name": "أمينة حسن",
      "jobTitle": "مديرة العمليات – تنزانيا ورواندا",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/ar/#organization" },
      "image": "https://www.jaetravel.co.ke/team/amina-hassan.jpg",
      "description": "تشرف على العمليات وتجارب الضيوف في تنزانيا ورواندا."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما الذي يميز رحلات جي تريل عن شركات السفاري الأخرى؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نحن متخصصون في السفاري الميسر والسياحة المستدامة. نمتلك أسطولنا من المركبات المكيفة للكراسي المتحركة، وندرب جميع المرشدين على دعم ذوي الإعاقة، ونشترك مباشرة مع المجتمعات المحلية ومشاريع الحفاظ على البيئة. كل رحلة مخصصة بنسبة 100%."
          }
        },
        {
          "@type": "Question",
          "name": "منذ متى تدير جي تريل رحلات السفاري في شرق أفريقيا؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نحن ندير عملياتنا بفخر منذ 2008 — أكثر من 17 عامًا من تقديم تجارب سفاري آمنة وشاملة لا تُنسى في كينيا وتنزانيا ورواندا وأوغندا."
          }
        },
        {
          "@type": "Question",
          "name": "هل رحلات السفاري الخاصة بكم مناسبة لمستخدمي الكراسي المتحركة وذوي الإعاقة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم. لقد ابتكرنا سفاري صديق للكراسي المتحركة في شرق أفريقيا. مركباتنا مزودة برافعات هيدروليكية، ونزلنا خالية من العوائق، وفريقنا مدرب على المساعدة الحركية. ساعدنا أكثر من 1,200 مسافر من ذوي الإعاقة على تجربة أفريقيا."
          }
        },
        {
          "@type": "Question",
          "name": "في أي الدول تعملون؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعمل في كينيا (ماساي مارا، أمبوسيلي، سامبورو)، تنزانيا (سيرينجيتي، نجورونجورو، زنجبار)، رواندا (تتبع الغوريلا)، وأوغندا (تأقلم الغوريلا، حديقة الملكة إليزابيث الوطنية)."
          }
        },
        {
          "@type": "Question",
          "name": "هل تدعمون الحفاظ على البيئة والمجتمعات المحلية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "بالتأكيد. نحن مشغل محايد للكربون، نزرع شجرة لكل ضيف، و 10% من الأرباح تذهب إلى مدارس المجتمع ووحدات مكافحة الصيد غير المشروع. نوظف فقط مرشدين محليين ونشتري من الموردين المحليين."
          }
        },
        {
          "@type": "Question",
          "name": "هل يمكنني تخصيص مسار رحلة السفاري الخاصة بي؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "كل رحلة سفاري مصممة خصيصًا بنسبة 100%. أخبرنا بتواريخك وميزانيتك واهتماماتك واحتياجات الوصول — سنصمم مسارًا مثاليًا، سواء كانت رحلة لمدة 3 أيام إلى ماساي مارا أو مغامرة لمدة 14 يومًا عبر عدة دول."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي الجوائز التي فازت بها جي تريل؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نحن فخورون بحصولنا على جائزة السياحة الكينية للسياحة الميسرة (2023)، جوائز السفر العالمية – الفائز بالسياحة المسؤولة في أفريقيا (2024)، واختيار المسافرين من تريب أدفايزر لمدة 5 سنوات متتالية."
          }
        }
      ]
    }
  ]
}

export const metadata: Metadata = {
  title: "عن رحلات جي تريل | خبراء سفاري شرق أفريقيا",
  description: "اكتشف رحلات جي تريل، مشغل سفاري موثوق في شرق أفريقيا يقدم جولات حياة برية ميسرة ومستدامة منذ 2008.",
  keywords: [
    "عن رحلات جي تريل",
    "شركة سفاري شرق أفريقيا",
    "خبراء سفاري ميسر",
    "أفضل مشغل سفاري كينيا",
    "منظم رحلات تنزانيا",
    "شركة تتبع غوريلا رواندا",
    "متخصص سفاري أوغندا",
    "شركة سفاري مستدامة",
    "سفر شامل شرق أفريقيا",
    "مشغل سفاري حائز جوائز",
    "شركة سفاري مملوكة لعائلة",
    "سفاري كينيا للكراسي المتحركة",
    "جولات سفاري للحفاظ على البيئة",
    "شركة سفاري أفريقية موثوقة",
    "خبراء سفر شرق أفريقيا",
    "تجارب سفاري أصيلة",
    "شركة سفاري مرشدين محليين",
    "سفاري محايد للكربون",
    "سياحة مدعومة من المجتمع"
  ],
  openGraph: {
    title: "عن رحلات جي تريل | خبراء سفاري شرق أفريقيا الموثوقون",
    description: "منذ 2008، نقدم سفاريًا ميسرًا ومستدامًا وأصيلاً في كينيا وتنزانيا ورواندا وأوغندا.",
    images: ["/african-safari-team-with-tourists.jpg"],
    url: "https://www.jaetravel.co.ke/ar/about",
    type: "website",
    locale: "ar_AR",
    siteName: "رحلات جي تريل",
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/about",
    languages: {
      'en': "https://www.jaetravel.co.ke/about",
      'ar': "https://www.jaetravel.co.ke/ar/about",
      'x-default': "https://www.jaetravel.co.ke/about",
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
  },
  verification: {
    google: "your-google-verification-code", // replace with actual
  },
}

// FAQ data – Arabic
const faqs = [
  {
    question: "ما الذي يميز رحلات جي تريل عن شركات السفاري الأخرى؟",
    answer: "نحن متخصصون في <strong>السفاري الميسر</strong> و<strong>السياحة المستدامة</strong>. نمتلك أسطولنا من المركبات المكيفة للكراسي المتحركة، وندرب جميع المرشدين على دعم ذوي الإعاقة، ونشترك مباشرة مع المجتمعات المحلية ومشاريع الحفاظ على البيئة. كل رحلة مخصصة بنسبة 100%.",
  },
  {
    question: "منذ متى تدير جي تريل رحلات السفاري في شرق أفريقيا؟",
    answer: "نحن ندير عملياتنا بفخر منذ 2008 — أكثر من 17 عامًا من تقديم تجارب سفاري آمنة وشاملة لا تُنسى في كينيا وتنزانيا ورواندا وأوغندا.",
  },
  {
    question: "هل رحلات السفاري الخاصة بكم مناسبة لمستخدمي الكراسي المتحركة وذوي الإعاقة؟",
    answer: "نعم. لقد ابتكرنا <strong>سفاري صديق للكراسي المتحركة</strong> في شرق أفريقيا. مركباتنا مزودة برافعات هيدروليكية، ونزلنا خالية من العوائق، وفريقنا مدرب على المساعدة الحركية. ساعدنا أكثر من 1,200 مسافر من ذوي الإعاقة على تجربة أفريقيا. اكتشف المزيد على <a href=\"/ar/disability-tours\" class=\"text-primary hover:underline\">صفحة جولات ذوي الإعاقة</a>.",
  },
  {
    question: "في أي الدول تعملون؟",
    answer: "نعمل في <strong>كينيا</strong> (ماساي مارا، أمبوسيلي، سامبورو)، <strong>تنزانيا</strong> (سيرينجيتي، نجورونجورو، زنجبار)، <strong>رواندا</strong> (تتبع الغوريلا)، و<strong>أوغندا</strong> (تأقلم الغوريلا، حديقة الملكة إليزابيث الوطنية). استكشف <a href=\"/ar/maasai-mara-great-migration\" class=\"text-primary hover:underline\">جولات هجرة ماساي مارا</a> و<a href=\"/ar/budget-tours\" class=\"text-primary hover:underline\">باقات السفاري الاقتصادية</a>.",
  },
  {
    question: "هل تدعمون الحفاظ على البيئة والمجتمعات المحلية؟",
    answer: "بالتأكيد. نحن <strong>مشغل محايد للكربون</strong>، نزرع شجرة لكل ضيف، و 10% من الأرباح تذهب إلى مدارس المجتمع ووحدات مكافحة الصيد غير المشروع. نوظف فقط مرشدين محليين ونشتري من الموردين المحليين.",
  },
  {
    question: "هل يمكنني تخصيص مسار رحلة السفاري الخاصة بي؟",
    answer: "كل رحلة سفاري مصممة خصيصًا بنسبة 100%. أخبرنا بتواريخك وميزانيتك واهتماماتك واحتياجات الوصول — سنصمم مسارًا مثاليًا، سواء كانت <a href=\"/ar/budget-tours/samburu-3-days-private-safari\" class=\"text-primary hover:underline\">رحلة لمدة 3 أيام إلى سامبورو</a> أو <a href=\"/ar/budget-tours/kenya-big-5-7-days-budget-safari\" class=\"text-primary hover:underline\">مغامرة لمدة 7 أيام للخمسة الكبار</a>.",
  },
  {
    question: "ما هي الجوائز التي فازت بها جي تريل؟",
    answer: "نحن فخورون بحصولنا على <strong>جائزة السياحة الكينية للسياحة الميسرة (2023)</strong>، <strong>جوائز السفر العالمية – الفائز بالسياحة المسؤولة في أفريقيا (2024)</strong>، و<strong>اختيار المسافرين من تريب أدفايزر لمدة 5 سنوات متتالية</strong>.",
  },
]

// Team Members – Arabic
const teamMembers = [
  {
    name: "أنتوني وايتيتو",
    role: "المؤسس وكبير مرشدي السفاري",
    bio: "ولد في منطقة ماساي مارا، يتمتع بخبرة تزيد عن 22 عامًا في التوجيه. أسس جي تريل في 2008 لجعل السفاري في متناول الجميع. يتقن الإنجليزية والسواحلية ولغة الماساي.",
    image: "/team/james-kimani.jpg",
  },
  {
    name: "سارة موانجي",
    role: "رئيسة قسم إمكانية الوصول وتجربة الضيوف",
    bio: "ابتكرت برنامج السفاري للكراسي المتحركة في 2015. مستشارة معتمدة في إمكانية الوصول، تضمن أن كل ضيف — بغض النظر عن القدرة — يتمتع برحلة سلسة وكريمة.",
    image: "/team/sarah-mwangi.jpg",
  },
  {
    name: "ديفيد أوتشينج",
    role: "مدير الحفاظ على البيئة والمجتمع",
    bio: "يقود الشراكات مع وحدات مكافحة الصيد غير المشروع والمدارس المجتمعية. يضمن أن كل سفاري مع جي تريل يترك أثرًا إيجابيًا على الحياة البرية والناس.",
    image: "/team/david-ochieng.jpg",
  },
  {
    name: "أمينة حسن",
    role: "مديرة العمليات – تنزانيا ورواندا",
    bio: "مقرها أروشا، تنسق جميع رحلات تنزانيا ورواندا. هي خبيرة في تصاريح الغوريلا ولوجستيات سيرينجيتي الميسرة.",
    image: "/team/amina-hassan.jpg",
  },
]

// Core Values – Arabic
const values = [
  {
    icon: "Heart",
    title: "إمكانية الوصول للجميع",
    text: "نؤمن بأن المغامرة حق للجميع. مركباتنا المكيفة للكراسي المتحركة، وموظفونا المدربون، ونزلنا الخالية من العوائق تجعل السفاري ممكنًا للمسافرين من ذوي الإعاقة. تعرف على المزيد عن <a href=\"/ar/disability-tours\" class=\"text-primary hover:underline\">جولات السفاري الميسرة</a>.",
  },
  {
    icon: "Leaf",
    title: "الحفاظ أولاً",
    text: "محايدون للكربون منذ 2020. نزرع شجرة لكل ضيف، ونمول دوريات مكافحة الصيد غير المشروع، وندعم ممرات الحياة البرية. رحلة السفاري الخاصة بك تساعد في حماية مستقبل أفريقيا.",
  },
  {
    icon: "Users",
    title: "مدعوم بالمجتمع",
    text: "مرشدون محليون 100%. 10% من الأرباح تمول المدارس والعيادات والتعاونيات النسائية. لا نزور أفريقيا فقط — بل نستثمر فيها.",
  },
  {
    icon: "Shield",
    title: "السلامة والتميز",
    text: "دعم 24/7، تغطية طبيب طائر، هواتف تعمل بالأقمار الصناعية، وصيانة صارمة للمركبات. سلامتك غير قابلة للتفاوض.",
  },
  {
    icon: "Award",
    title: "خدمة حائزة على جوائز",
    text: "جائزة السياحة الكينية 2023، جوائز السفر العالمية 2024، اختيار المسافرين من تريب أدفايزر لخمس سنوات متتالية.",
  },
  {
    icon: "Globe",
    title: "تواصل ثقافي أصيل",
    text: "قابل محاربي الماساي، وزر قرى السامبورو، وتعلم عبارات السواحلية. نخلق تبادلات ثقافية حقيقية محترمة.",
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <AboutClient faqs={faqs} teamMembers={teamMembers} values={values} />
    </>
  )
}