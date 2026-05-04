import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Star, Award, Users, Shield, Heart, Zap, Globe, CheckCircle, Phone, Camera, TreePine, Droplets, Sun, CloudRain, Binoculars, Mountain, Waves } from "lucide-react"
import { faqSchema } from "./faq-schema" // هذا الملف موجود بالفعل بالعربية
import GreatMigrationVehicleCard from "./GreatMigrationVehicleCard"
import JsonLd from "@/components/JsonLd"
import { tours } from "@/lib/i18n/data/ar/tours-data"

export const generateMetadata = (): Metadata => ({
  title: "رحلة الهجرة الكبرى في ماساي مارا 2026 | سفاري متاح للكراسي المتحركة",

  description:
    "عش تجربة الهجرة الكبرى في ماساي مارا 2026 عبر رحلة سفاري متاحة للكراسي المتحركة. شاهد معابر نهر مارا مع مرشدين خبراء ومركبات 4x4 مكيفة.",
  keywords: [
    "رحلة الهجرة الكبرى ماساي مارا 2026",
    "سفاري الهجرة الكبرى كينيا",
    "سفاري متاح للكراسي المتحركة كينيا",
    "سفاري أفريقي متاح",
    "سفاري معبر نهر مارا",
    "باقات سفاري ماساي مارا",
    "مركبات سفاري مكيفة",
    "سفر متاح كينيا"
  ].join(", "),

  openGraph: {
    title: "رحلة الهجرة الكبرى في ماساي مارا 2026",
    description:
      "شاهد معابر نهر مارا الدرامية في رحلة سفاري متاحة بالكامل في كينيا مع مركبات 4x4 مكيفة ومرشدين خبراء.",
    images: [
      {
        url: "https://www.jaetravel.co.ke/masai-mara-migration.jpg",
        width: 1200,
        height: 630,
        alt: "معبر نهر مارا للهجرة الكبرى مع قطعان الجاموس البري",
      },
    ],
    type: "website",
    siteName: "جيه ترافيل إكسبديشنز",
  },

  alternates: {
    canonical: "https://www.jaetravel.co.ke/ar/wheelchair-accessible-maasai-mara-migration",
    languages: {
      ar: "https://www.jaetravel.co.ke/ar/wheelchair-accessible-maasai-mara-migration",
      en: "https://www.jaetravel.co.ke/wheelchair-accessible-maasai-mara-migration",
      "x-default": "https://www.jaetravel.co.ke/wheelchair-accessible-maasai-mara-migration",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  authors: [{ name: "جيه ترافيل إكسبديشنز" }],
  publisher: "جيه ترافيل إكسبديشنز",
  category: "سفر",
})

const sections = [
  {
    h2: "الهجرة الكبرى في ماساي مارا 2026: لماذا سيكون هذا العام أسطوريًا مع جيه ترافيل إكسبديشنز",
    content: `اعتبارًا من 21 نوفمبر 2025، تؤكد بيانات التتبع عبر الأقمار الصناعية وتقارير الحراس أن موسم ولادة الجاموس البري 2025-2026 في جنوب سيرينجيتي كان واحدًا من أقوى المواسم في عقد، مع ولادة أكثر من 550,000 عجل. هذا يعني أن هجرة 2026 إلى ماساي مارا ستشهد قطعانًا أكبر من المتوسط ونشاطًا متزايدًا للحيوانات المفترسة، مما يجعلها واحدة من أكثر أحداث الحياة البرية إثارة في القرن التي يمكنك تجربتها مع جيه ترافيل إكسبديشنز.

تمثل الهجرة الكبرى في ماساي مارا أكبر هجرة للثدييات البرية على كوكب الأرض، وهي ظاهرة تخصصت جيه ترافيل إكسبديشنز في جعلها متاحة منذ 2018. سنويًا، ما يقرب من 1.7–2 مليون جاموس بري، و500,000 غزال طومسون، و200,000 حمار وحشي، وعشرات الآلاف من الإيلاند والتوبي يتبعون دائرة قديمة بطول 800-1000 كيلومتر في اتجاه عقارب الساعة بين نظام سيرينجيتي البيئي في تنزانيا ونظام ماساي مارا البيئي في كينيا. تم توثيق هذه الظاهرة الطبيعية المذهلة من قبل ناشيونال جيوغرافيك، بي بي سي إيرث، وديسكفري تشانل، لكن لا شيء يضاهي مشاهدتها بنفسك مع مركبات السفاري المتاحة من جيه ترافيل إكسبديشنز.

هذا ليس حدثًا فرديًا بل دورة مستمرة على مدار العام مدفوعة بأنماط هطول الأمطار والبحث عن مراعي جديدة. أكثر اللحظات تصويرًا وتصويرًا تحدث عادة بين يوليو وأكتوبر عندما تواجه القطعان الضخمة معابر نهر مارا ونهر تاليك الخطيرة. تمثل هذه المعابر دراما البقاء القصوى في الطبيعة: تماسيح النيل بطول 5 أمتار تشن هجمات منسقة، وتتمركز زمر الأسود والفهود استراتيجيًا على ضفاف الخروج، وتضطرب مياه النهر بذعر آلاف الحيوانات التي تكافح من أجل البقاء.

بالنسبة للمسافرين ذوي إعاقات الحركة، كانت مشاهدة هذا المشهد مستحيلة تاريخيًا بسبب عدم توفر مركبات وبنية تحتية مناسبة. أحدثت جيه ترافيل إكسبديشنز ثورة في السياحة الأفريقية المتاحة من خلال ريادة أول وأكبر أسطول في كينيا من مركبات السفاري المتاحة بالكامل للكراسي المتحركة للهجرة الكبرى. تتميز سياراتنا الـ 18 من تويوتا لاندكروزر المعدلة برافعات هيدروليكية ألمانية بسعة 400 كجم، وأسقف كاملة قابلة للرفع تسمح بمشاهدة الحياة البرية بزاوية 360 درجة أثناء الجلوس في كرسيك المتحرك، وأنظمة تثبيت طبية رباعية النقاط من Q'Straint مختبرة لصدمات 20 جي، ومحولات طاقة موجة جيبية نقية بقدرة 3 كيلوواط للمعدات الطبية، وثلاجات طبية سعة 45 لترًا، وإنترنت ستارلينك عبر الأقمار الصناعية، وسائقين أكملوا تدريبًا مكثفًا لمدة 100 ساعة في تخصص الإعاقة.

منذ تأسيسنا في 2018، نجحت جيه ترافيل إكسبديشنز في توجيه أكثر من 720 من مستخدمي الكراسي المتحركة والمسافرين ذوي الحركة المحدودة لمشاهدة معابر نهر مارا المتعددة يوميًا. يصف العديد من عملائنا تجربتهم بأنها تغير الحياة، بعد أن لم يتخيلوا أبدًا أنهم سيتمكنون من مشاهدة أعظم مشهد بري في أفريقيا بأم أعينهم. يمتد التزامنا بإمكانية الوصول إلى ما هو أبعد من المركبات ليشمل شراكات مع نزل متاحة، وطاقم مدرب، وبروتوكولات طوارئ شاملة تجعل جيه ترافيل إكسبديشنز الخيار الأول لتجارب السفاري المتاحة في كينيا.`
  },
  {
    h2: "الهجرة الكبرى في ماساي مارا 2026: جدول زمني كامل شهرًا بشهر وتوقعات الخبراء من جيه ترافيل إكسبديشنز",
    content: `توقعات جيه ترافيل إكسبديشنز لهجرة 2026 تدمج 15 عامًا من بيانات أطواق GPS اليومية، وأنماط هطول الأمطار التاريخية، واستخبارات فورية من شبكات الحراس الواسعة عبر نظام سيرينجيتي-مارا البيئي. قام مرشدونا الخبراء في جيه ترافيل إكسبديشنز بتنظيم هذا التفصيل الشهري لمساعدتك في التخطيط لمغامرة السفاري المتاحة المثالية:

<div class="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-900 block mb-2 text-lg">يناير – مارس 2026: ذروة موسم الولادات المذهل</strong>
تتحول سهول جنوب سيرينجيتي (نودوتو، كوسيني، منطقة الوادي المخفي) إلى أكبر حضانة في الطبيعة. تقدم جيه ترافيل إكسبديشنز تجارب مشاهدة متاحة متخصصة خلال هذه الفترة، حيث يولد أكثر من 8,000 عجل جاموس بري يوميًا مما يخلق فرصًا لا مثيل لها لمشاهدة الحيوانات المفترسة. تتركز زمر الأسود، وضباع مرقطة، وائتلافات الفهود في هذه المناطق للاستفادة من وفرة الصغار الضعفاء، مما يجعل هذه فرصة تصوير لا تُصدق مع جيه ترافيل إكسبديشنز.
</div>

<div class="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-amber-500 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-amber-900 block mb-2 text-lg">أبريل 2026: بداية الحركة نحو الشمال الغربي</strong>
تبدأ القطعان الضخمة حركتها نحو الشمال الغربي باتجاه الممر الغربي في أحد أروع مشاهد الحياة البرية في أفريقيا. تكشف المسوحات الجوية لجيه ترافيل إكسبديشنز أعمدة مذهلة من الحيوانات تمتد لأكثر من 40 كيلومترًا عبر السهول. يتم وضع مركباتنا المتاحة بشكل مثالي لمشاهدة حركة الهجرة التدريجية هذه مع ضمان الراحة وزوايا المشاهدة المثلى لمستخدمي الكراسي المتحركة.
</div>

<div class="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-800 block mb-2 text-lg">مايو 2026: أول تحدي مائي كبير عند نهر غروميتي</strong>
تصل القطعان إلى نهر غروميتي في الممر الغربي بتنزانيا – أول عقبة مائية كبيرة لهم. يشارك مرشدو جيه ترافيل إكسبديشنز رؤى رائعة حول تجمعات التماسيح الضخمة في النهر، حيث يتجاوز طول بعض العينات 5 أمتار. تختبر المعابر الأولية هنا القطعان قبل تحديات نهر مارا الرئيسية، وتتيح لك خيارات السفاري المتاحة في تنزانيا مشاهدة هذه الدراما التمهيدية.
</div>

<div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-amber-800 block mb-2 text-lg">يونيو 2026: توتر الحدود وترقب يتراكم</strong>
تصل جبهات الهجرة إلى شمال سيرينجيتي، وتصل الكشافة المتقدمة إلى نهر الرمال الذي يمثل حدود كينيا وتنزانيا. يلاحظ مرشدو جيه ترافيل إكسبديشنز ذوي الخبرة توترًا ملموسًا يتراكم بشكل كبير مع تقييم الحيوانات لنقاط العبور وجمع الشجاعة للانطلاق نحو أراضي ماساي مارا. توفر باقات السفاري المتاحة عبر الحدود لدينا هذه الفترة الانتقالية بشكل مثالي.
</div>

<div class="bg-gradient-to-r from-orange-100 to-red-50 border-l-4 border-orange-600 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-900 block mb-2 text-lg">يوليو 2026: الوصول إلى كينيا والمعابر الأولى</strong>
استنادًا إلى أنماط هطول الأمطار الحالية، تتوقع جيه ترافيل إكسبديشنز أن تعبر القطعان المهمة الأولى إلى ماساي مارا الكينية حوالي 5-10 يوليو – قبل قليل من المتوسطات التاريخية بسبب الأمطار الغزيرة لعام 2025. تبدأ معابر نهر مارا الأولى على نطاق صغير عادة في منتصف يوليو، وتزداد في التردد والشدة طوال الشهر. هذا هو الوقت الذي تبدأ فيه جولات السفاري المتاحة للكراسي المتحركة في ماساي مارا عملياتها في ذروتها.
</div>

<div class="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-600 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-amber-900 block mb-2 text-lg">أغسطس 2026: موسم الهجرة المرتفع المتميز</strong>
يبدأ موسم الهجرة المرتفع مع التزام القطعان الكامل بنظام ماساي مارا البيئي. تضمن جيه ترافيل إكسبديشنز معابر متعددة يوميًا في مواقع رئيسية بما في ذلك نقاط بارادايز ولوك أوت وماين. يقدم هذا الشهر عادة أعلى تركيز لأحداث المعابر النهرية الدرامية، وتتموضع مركبات السفاري الصديقة للإعاقة لدينا بشكل استراتيجي للحصول على أفضل المشاهدات.
</div>

<div class="bg-gradient-to-r from-orange-200 to-amber-200 border-l-4 border-orange-700 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-900 block mb-2 text-lg">سبتمبر 2026: الذروة المطلقة لدراما الهجرة</strong>
تتوج الذروة المطلقة لمشهد الهجرة. بسبب أنماط هطول الأمطار الممتازة 2025-2026، تتوقع جيه ترافيل إكسبديشنز تركزات قطعان قياسية. يمكن أن تحدث المعابر النهرية 3-5 مرات يوميًا في مواقع مختلفة، وغالبًا ما تشمل أكبر المعابر الفردية أكثر من 20,000 حيوان. هذا هو الوقت الأول لجولات تصوير الحياة البرية المتاحة في كينيا.
</div>

<div class="bg-gradient-to-r from-orange-50 to-gray-100 border-l-4 border-gray-400 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-gray-900 block mb-2 text-lg">أكتوبر 2026: العودة جنوبًا والدراما النهائية</strong>
تبدأ القطعان رحلة عودتها جنوبًا إلى سيرينجيتي. تلتقط جيه ترافيل إكسبديشنز المعابر النهائية الدرامية حيث تخلق مستويات المياه المتراجعة تحديات وفرصًا مختلفة للحيوانات المفترسة. غالبًا ما تتميز هذه الفترة بلقاءات برية أكثر حميمية وفرص تصوير ممتازة مع حشود سياحية أقل.

للحصول على تحديثات الهجرة في الوقت الفعلي وتحليل موسمي مفصل من فريق جيه ترافيل إكسبديشنز الخبير، اقرأ دليلنا الشامل: <Link href="/ar/blog/best-time-visit-masai-mara" className="font-bold text-orange-600 underline hover:no-underline transition-all duration-200 hover:text-orange-700">أفضل وقت لزيارة ماساي مارا للهجرة الكبرى – تحديث خبراء 2026 من جيه ترافيل إكسبديشنز</Link>.`
  },
  {
    h2: "معابر نهر مارا: دراما البقاء الأكثر كثافة في الطبيعة مع جيه ترافيل إكسبديشنز",
    content: `ببساطة لا يوجد مشهد بري مماثل على وجه الأرض لمعبر نهر مارا واسع النطاق خلال ذروة الهجرة الكبرى، وتوفر جيه ترافيل إكسبديشنز أكثر تجربة مشاهدة متاحة في كينيا اليوم. تجمع التجربة بين الطبيعة الخام والبقاء على المحك والحجم المذهل بطريقة تترك حتى مرشدي السفاري المتمرسين عاجزين عن الكلام.

<div class="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-200 my-8 shadow-sm hover:shadow-md transition-all duration-300">
<div class="flex items-start gap-4">
<div class="bg-orange-100 p-3 rounded-full flex-shrink-0">
<Clock className="h-6 w-6 text-orange-600" />
</div>
<div>
<h4 class="text-xl font-bold text-orange-900 mb-2">التراكم: ساعات من الترقب مع جيه ترافيل إكسبديشنز</h4>
<p class="text-orange-800">يمكن أن يستمر التراكم النفسي للمعبر لساعات – وأحيانًا أيام. تتراكم عشرات الآلاف من الجاموس البري على ضفاف النهر، وتخلق أصواتهم المميزة خلفية كورس ثابت من الطاقة العصبية. تختلط الحمير الوحشية، وتضيف نداءاتها النباحية المميزة إلى سيمفونية الترقب. يسود توتر ملموس كثيف في الهواء، مرئي في تجوال الحيوانات القلق على حافة الماء. يستخدم مرشدو جيه ترافيل إكسبديشنز هذا الوقت لوضع مركباتنا المتاحة بشكل مثالي ومشاركة رؤى سلوكية رائعة حول الدراما التي تتكشف.</p>
</div>
</div>
</div>

<div class="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl border border-amber-200 my-8 shadow-sm hover:shadow-md transition-all duration-300">
<div class="flex items-start gap-4">
<div class="bg-amber-100 p-3 rounded-full flex-shrink-0">
<Zap className="h-6 w-6 text-amber-600" />
</div>
<div>
<h4 class="text-xl font-bold text-amber-900 mb-2">لحظة الحقيقة: فوضى منطلقة في راحة متاحة</h4>
<p class="text-amber-800">ثم، في لحظة يصعب توقعها، يلتزم حيوان "شجاع" واحد. يقفز من جرف ارتفاعه 3-4 أمتار إلى المياه بلون الشوكولاتة المليئة بالتماسيح أدناه. يؤدي هذا الفعل الواحد من الشجاعة إلى سلسلة تفاعلات فورية. في غضون ثوانٍ، ينفجر الضفة بأكملها في فوضى بينما يتبع المئات – ثم الآلاف – من الحيوانات في اندفاع أعمى مدوٍ. يتحول النهر إلى دوامة هائجة من الأجسام السوداء والخطوط البيضاء، مما يخلق مشهدًا طبيعيًا لا بد من رؤيته ليُصدق. تضمن منصات المشاهدة المتاحة للكراسي المتحركة من جيه ترافيل إكسبديشنز عدم تفويت أي لحظة من هذه الدراما المذهلة.</p>
</div>
</div>
</div>

<div class="bg-gradient-to-br from-orange-100 to-amber-50 p-8 rounded-2xl border border-orange-300 my-8 shadow-sm hover:shadow-md transition-all duration-300">
<div class="flex items-start gap-4">
<div class="bg-orange-200 p-3 rounded-full flex-shrink-0">
<Camera className="h-6 w-6 text-orange-700" />
</div>
<div>
<h4 class="text-xl font-bold text-orange-900 mb-2">مشاهدة متاحة مثالية من جيه ترافيل إكسبديشنز</h4>
<p class="text-orange-800">يتم وضع مركباتنا المتاحة للكراسي المتحركة بشكل استراتيجي قبل ساعات في نقاط المراقبة الرئيسية التي يختارها مرشدونا الخبراء. يرتفع السقف القابل للرفع بالكامل إلى 3.2 متر، مما يوفر مناظر بانورامية مثالية على مستوى العين مباشرة من كرسيك المتحرك. يتم وضع فتحات الكاميرا المصممة خصيصًا على مستوى العين الدقيق أثناء الجلوس (95-110 سم) للحصول على تصوير مثالي. يحافظ مرشدو جيه ترافيل إكسبديشنز على اتصال لاسلكي مستمر مع شبكة واسعة من المراقبين ومشغلي السفاري الآخرين، مما يمكننا من التنبؤ بمواقع وتوقيت المعابر بدقة ملحوظة – مما يزيد من فرصك في مشاهدة أحداث دراماتيكية متعددة في يوم واحد مع تجارب السفاري المتاحة في كينيا.</p>
</div>
</div>
</div>`
  },
  {
    h2: "لماذا تختار جيه ترافيل إكسبديشنز لرحلة الهجرة الكبرى 2026",
    content: `تتميز جيه ترافيل إكسبديشنز كأفضل متخصص في السفاري المتاح في كينيا، بخبرة لا مثيل لها في خلق تجارب برية تغير الحياة للمسافرين ذوي تحديات الحركة. إليك لماذا نحن الخيار الموثوق للمغامرات الأفريقية المتاحة:

<div class="grid md:grid-cols-2 gap-8 my-8">
<div class="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200">
<div class="flex items-center gap-4 mb-4">
<div class="bg-orange-100 p-3 rounded-full">
<Award className="h-8 w-8 text-orange-600" />
</div>
<div>
<h3 class="text-xl font-bold text-orange-900">رواد في تكنولوجيا السفاري المتاحة</h3>
</div>
</div>
<p class="text-orange-800">قدمت جيه ترافيل إكسبديشنز أول مركبات سفاري متاحة بالكامل للكراسي المتحركة في شرق أفريقيا في 2018. يضمن ابتكارنا المستمر في تكنولوجيا المركبات التكيفية أن نحافظ على أعلى معايير إمكانية الوصول والسلامة والراحة لجميع عملائنا الذين يعيشون تجربة الهجرة الكبرى في ماساي مارا.</p>
</div>

<div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
<div class="flex items-center gap-4 mb-4">
<div class="bg-amber-100 p-3 rounded-full">
<Users className="h-8 w-8 text-amber-600" />
</div>
<div>
<h3 class="text-xl font-bold text-amber-900">720+ من مستخدمي الكراسي المتحركة تم خدمتهم</h3>
</div>
</div>
<p class="text-amber-800">منذ تأسيسنا، استضافت جيه ترافيل إكسبديشنز بنجاح أكثر من 720 من مستخدمي الكراسي المتحركة في تجارب سفاري غيرت حياتهم. سجلنا الحافل وخبرتنا الواسعة مع حالات الحركة المختلفة تجعلنا الاسم الأكثر ثقة في السفر المتاح في كينيا ورحلات السفاري الأفريقية الصديقة للإعاقة.</p>
</div>

<div class="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-2xl border border-orange-300">
<div class="flex items-center gap-4 mb-4">
<div class="bg-orange-200 p-3 rounded-full">
<Shield className="h-8 w-8 text-orange-700" />
</div>
<div>
<h3 class="text-xl font-bold text-orange-900">أنظمة سلامة طبية شاملة</h3>
</div>
</div>
<p class="text-orange-800">تتميز مركبات جيه ترافيل إكسبديشنز بأنظمة دعم طبي متقدمة تشمل محولات طاقة موجة جيبية نقية بقدرة 3 كيلوواط للمعدات الطبية، وثلاجات طبية سعة 45 لترًا، وترشيح HEPA من الدرجة المستشفوية. التزامنا بالصحة والسلامة لا مثيل له في صناعة السفر المتاح.</p>
</div>

<div class="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-2xl border border-amber-300">
<div class="flex items-center gap-4 mb-4">
<div class="bg-amber-200 p-3 rounded-full">
<Heart className="h-8 w-8 text-amber-700" />
</div>
<div>
<h3 class="text-xl font-bold text-amber-900">تدريب متخصص لمدة 100 ساعة</h3>
</div>
</div>
<p class="text-amber-800">يكمل كل مرشد في جيه ترافيل إكسبديشنز برنامجنا التدريبي المكثف لمدة 100 ساعة في تخصص الإعاقة. يغطي هذا التعليم الشامل تثبيت الكراسي المتحركة، وإجراءات الطوارئ، وتقنيات التوجيه الشامل، والاستجابة الطبية في البرية النائية.</p>
</div>
</div>

<div class="bg-gradient-to-br from-orange-100 to-amber-200 p-6 rounded-2xl border border-orange-400 my-8">
<h3 class="text-2xl font-bold text-orange-900 mb-4 text-center">جيه ترافيل إكسبديشنز: أكثر من مجرد سفاري - إنها حركة</h3>
<p class="text-orange-800 text-center">نحن لا نقدم فقط رحلات سفاري متاحة؛ بل نعمل على قيادة حركة نحو السفر الشامل في أفريقيا. تدافع جيه ترافيل إكسبديشنز بنشاط عن تحسين معايير إمكانية الوصول عبر صناعة السياحة، وتشارك ابتكاراتنا الهندسية مع مشغلين آخرين، وتعمل مع المجتمعات المحلية لخلق تغيير إيجابي دائم. عندما تختار جيه ترافيل إكسبديشنز، فأنت تدعم رؤية لأفريقيا حيث يمكن للجميع تجربة عجائبها، بغض النظر عن تحديات الحركة.</p>
</div>`
  },
  {
    h2: "شركاء الإقامة المتاحة لجيه ترافيل إكسبديشنز",
    content: `اختارت جيه ترافيل إكسبديشنز بعناية وتعاونت مع أفضل مقدمي الإقامة المتاحة في جميع أنحاء منطقة ماساي مارا. تضمن شبكتنا من النزل والمخيمات الصديقة للإعاقة سهولة الوصول من لحظة الوصول إلى المغادرة:

<div class="bg-white border border-orange-200 rounded-2xl p-6 my-6 shadow-sm">
<h3 class="text-2xl font-bold text-orange-800 mb-4">نزل مارا سيرينا للسفاري - أفضل إقامة متاحة</h3>
<p class="text-gray-700 mb-4">الشريك الرئيسي لجيه ترافيل إكسبديشنز يتميز بغرف متاحة بالكامل بدشات متدحرجة، ومداخل موسعة، ومناطق مشتركة متاحة. يقع بشكل استراتيجي بالقرب من نقاط المعابر الرئيسية للنهر، يقدم مارا سيرينا:</p>
<ul class="grid md:grid-cols-2 gap-3 text-gray-700">
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> دشات متدحرجة مع قضبان إمساك</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> أسرع وأثاث منخفضة</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> مناطق طعام متاحة</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> مسارات منحدرة في جميع الأنحاء</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> دعم طبي على مدار الساعة</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> مسبح متاح</li>
</ul>
</div>

<div class="bg-white border border-amber-200 rounded-2xl p-6 my-6 shadow-sm">
<h3 class="text-2xl font-bold text-amber-800 mb-4">مخيم شجرة التين - تجربة أصيلة متاحة</h3>
<p class="text-gray-700 mb-4">للمسافرين الباحثين عن تجربة سفاري أكثر حميمية، تتعاون جيه ترافيل إكسبديشنز مع مخيم شجرة التين الذي يقدم أماكن إقامة خيام معدلة خصيصًا تحافظ على سحر السفاري الأصيل مع توفير إمكانية وصول كاملة:</p>
<ul class="grid md:grid-cols-2 gap-3 text-gray-700">
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> وحدات خيام معدلة بأرضيات خشبية</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> حمامات خاصة متاحة</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> منصات مشاهدة مرتفعة</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> خيمة طعام متاحة</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> مسارات متاحة في جميع أنحاء المخيم</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> طاقة طوارئ للأجهزة الطبية</li>
</ul>
</div>

<div class="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-300 my-6">
<h3 class="text-xl font-bold text-orange-900 mb-3">ضمان إمكانية الوصول من جيه ترافيل إكسبديشنز</h3>
<p class="text-orange-800">يخضع كل شريك إقامة في شبكتنا لتدقيق صارم لإمكانية الوصول من قبل فريق إمكانية الوصول في جيه ترافيل إكسبديشنز. نتحقق شخصيًا من كل عقار للتأكد من أنه يلبي معاييرنا الصارمة لإمكانية الوصول للكراسي المتحركة والسلامة والراحة. يمتد التزامنا إلى ما هو أبعد من الامتثال الأساسي لخلق بيئات ترحيبية حقًا وخالية من العوائق لجميع ضيوفنا الذين يعيشون تجربة الهجرة الكبرى مع جيه ترافيل إكسبديشنز.</p>
</div>`
  }
]

export default function MaasaiMaraGreatMigrationPage() {
  return (
    <>
      <AllPageSEOSchema
        type="category"
        slug="wheelchair-accessible-maasai-mara-migration"
        categoryOpts={{
          title: "سفاري ماساي مارا للهجرة الكبرى متاح للكراسي المتحركة",
          description: "عش الهجرة الكبرى في سيارة 4x4 متاحة برافعة هيدروليكية. رحلة سفاري برية شاملة متكاملة.",
          image: "/masai-mara-wheelchair-height.jpg",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("wheelchair") || t.title?.toLowerCase().includes("كرسي متحرك") || t.description?.toLowerCase().includes("كرسي متحرك")) : [],
        }}
      />
      <JsonLd id="maasai-mara-schema" data={faqSchema} />

      <div className="container mx-auto px-4 py-16 max-w-7xl" dir="rtl">
        <header className="text-center mb-24">
          <div className="mb-8 flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Star className="h-5 w-5" /> جيه ترافيل إكسبديشنز: #1 سفاري متاح
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-3 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Award className="h-5 w-5" /> خدمة 720+ من مستخدمي الكراسي المتحركة
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Shield className="h-5 w-5" /> متخصص كينيا في السفاري المتاح
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-10 bg-gradient-to-br from-orange-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            الهجرة الكبرى في ماساي مارا<br />
            <span className="bg-gradient-to-br from-amber-600 to-orange-700 bg-clip-text text-transparent">2026 مع جيه ترافيل إكسبديشنز</span>
          </h1>

          <p className="mx-auto max-w-6xl text-xl md:text-3xl text-gray-600 mb-12 leading-relaxed font-light">
            عِد تجربة الهجرة الكبرى المذهلة لعام 2026 مع جيه ترافيل إكسبديشنز - أفضل منظم لرحلات السفاري المتاحة للكراسي المتحركة في كينيا. شاهد أحجام قطعان قياسية من مركباتنا التكيفية المصممة هندسيًا برافعات هيدروليكية ومرشدين متخصصين في الإعاقة.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button asChild size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <Link href="/ar/tours/masai-mara-luxury-safari" className="flex items-center">
                <Calendar className="ml-3 h-7 w-7" /> احجز سفاري جيه ترافيل الفاخر
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-xl px-12 py-8 border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 text-orange-700 hover:text-orange-800 transition-all duration-300 transform hover:scale-105">
              <Link href="/ar/booking/masai-mara-safari-adventure" className="flex items-center">
                <Zap className="ml-3 h-7 w-7" /> عرض جولات جيه ترافيل الاقتصادية
              </Link>
            </Button>
          </div>
        </header>

        {sections.map((section, index) => (
          <section key={index} className="mb-32 scroll-mt-32">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-12 text-balance bg-gradient-to-br from-orange-800 to-amber-700 bg-clip-text text-transparent">
              {section.h2}
            </h2>
            <div className="prose prose-lg max-w-none text-lg leading-relaxed text-gray-700 space-y-6">
              {section.content.split("\n").map((paragraph, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </section>
        ))}

        <GreatMigrationVehicleCard />

        <section className="my-40">
          <h2 className="text-center font-serif text-5xl md:text-7xl font-bold mb-20 bg-gradient-to-br from-orange-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            اختر تجربة السفاري لعام 2026 مع جيه ترافيل إكسبديشنز
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div className="border-2 border-orange-200 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transform hover:-translate-y-2">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-br from-orange-800 to-amber-700 bg-clip-text text-transparent">سفاري الهجرة الفاخر المتاح من جيه ترافيل</h3>
              <ul className="space-y-6 text-lg mb-10">
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">سفاري خاص لمدة 7–12 يومًا مع مسار شخصي من جيه ترافيل</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">معابر نهر متعددة يوميًا مع ضمان تحديد المواقع الأمثل من جيه ترافيل</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">نزل ومخيمات فاخرة متاحة مع دشات متدحرجة تم فحصها بواسطة جيه ترافيل</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">سيارة لاندكروزر متاحة خاصة من جيه ترافيل مع رافعة هيدروليكية ومرافق طبية</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">فريق مرشد وسائق متخصص في الإعاقة من جيه ترافيل</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full text-xl py-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/ar/tours/masai-mara-luxury-safari">عرض مسار جيه ترافيل الكامل واحجز 2026</Link>
              </Button>
            </div>

            <div className="border-2 border-amber-200 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transform hover:-translate-y-2">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-br from-amber-800 to-orange-700 bg-clip-text text-transparent">مغامرة جيه ترافيل للسفاري (جولة جماعية متاحة)</h3>
              <ul className="space-y-6 text-lg mb-10">
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">جولة جماعية لمدة 5–9 أيام مع مواعيد مغادرة ثابتة من جيه ترافيل</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">نفس مركبات جيه ترافيل المتاحة والمرشدين المدربين على الإعاقة</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">مخيمات متاحة مريحة تم فحصها بواسطة جيه ترافيل بمرافق مكيفة</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">6 ضيوف كحد أقصى لكل مركبة من جيه ترافيل لضمان الاهتمام الشخصي</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">خيار جيه ترافيل اقتصادي مع ميزات إمكانية وصول كاملة</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full text-xl py-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/ar/booking/masai-mara-safari-adventure">تحقق من تواريخ وتوفر جيه ترافيل 2026</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-16 text-center text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">
            تتوفر فقط 18 مركبة من جيه ترافيل إكسبديشنز<br />
            <span className="text-amber-200">لموسم الهجرة المرتفع 2026</span>
          </h2>
          <p className="text-2xl mb-12 max-w-5xl mx-auto opacity-95 leading-relaxed font-light">
            مركبات لاندكروزر المصممة هندسيًا والمتاحة للكراسي المتحركة من جيه ترافيل إكسبديشنز مطلوبة بشدة لموسم الهجرة 2026 المتوقع أن يكون قياسيًا. الحجز المبكر ضروري لضمان مكانك في أعظم مشهد بري على وجه الأرض مع أفضل منظم للسفاري المتاح في كينيا.
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-amber-50 text-2xl px-16 py-10 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 font-bold">
            <Link href="/ar/tours/masai-mara-luxury-safari">آمن رحلة جيه ترافيل 2026 الآن</Link>
          </Button>
        </section>
      </div>
    </>
  )
}