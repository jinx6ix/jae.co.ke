// app/ar/page.tsx — Arabic Homepage (RTL)
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { CmsPage } from "../_components/CmsPage"

export const metadata: Metadata = {
  title: "سفاري شرق أفريقيا 2026 | ماساي مارا، الغوريلا والسفاري الميسر | جيه تريفل للرحلات",
  description: "احجز سفاري لا تُنسى في كينيا وتنزانيا ورواندا وأوغندا. متخصصون في تتبع الغوريلا والهجرة الكبرى 2026 والسفاري المتاح لكراسي المتحركين. احصل على عرض سعر مجاني.",
  keywords: ["سفاري شرق أفريقيا","سفاري كينيا 2026","تتبع غوريلا رواندا","هجرة ماساي مارا الكبرى","سفاري كرسي متحرك كينيا","رحلة تنزانيا","سفاري أوغندا","سفاري فاخر كينيا"],
  alternates: { canonical: `${BASE_URL}/ar`, languages: buildHreflangAlternates("/") },
  openGraph: { title: "سفاري شرق أفريقيا 2026 | جيه تريفل للرحلات الاستكشافية", description: "سفاري لا تُنسى في كينيا وتنزانيا ورواندا وأوغندا.", url: `${BASE_URL}/ar`, locale: "ar_AE", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "جيه تريفل - سفاري شرق أفريقيا" }] },
}
const schema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:[
  {"@type":"Question","name":"ما هو أفضل وقت لزيارة ماساي مارا؟","acceptedAnswer":{"@type":"Answer","text":"أفضل وقت للهجرة الكبرى هو يوليو-أكتوبر. تحدث عبورات نهر مارا الدرامية في أغسطس وسبتمبر مع 1.5 مليون حمار وحش."}},
  {"@type":"Question","name":"هل تقدمون سفاري متاحاً لكراسي المتحركين؟","acceptedAnswer":{"@type":"Answer","text":"نعم! نحن المشغلون الوحيدون في كينيا الذين يمتلكون أسطولاً من سيارات Land Cruiser 4×4 المجهزة بمصاعد هيدروليكية ألمانية (سعة 400 كغ)."}},
  {"@type":"Question","name":"كم تكلف سفاري كينيا؟","acceptedAnswer":{"@type":"Answer","text":"تبدأ السفاري الاقتصادية من 450 دولار لمدة 3 أيام في ماساي مارا. وتبدأ السفاري الفاخرة من 3,500 دولار لمدة 5 أيام."}},
]}

export default function ArabicHomePage() {
  return (
    <CmsPage slug="home" locale="ar" fallback={
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900" dir="rtl">
        <div className="absolute inset-0"><Image src="/masai-mara-migration.jpg" alt="الهجرة الكبرى ماساي مارا كينيا سفاري" fill className="object-cover opacity-60" priority /></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"><span>⭐ 5.0 · أكثر من 723 تقييم موثق</span></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">سفاري لا تُنسى<br className="hidden md:block" /> في شرق أفريقيا 2026</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">اكتشف كينيا وتنزانيا ورواندا وأوغندا مع مرشدين خبراء. متخصصون في سفاري مستخدمي كراسي المتحركين.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ar/tours" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">استكشف الجولات ←</Link>
            <a href="https://wa.me/254726485228?text=مرحباً%2C%20أريد%20عرض%20سعر%20للسفاري" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors backdrop-blur-sm">💬 عرض سعر مجاني عبر واتساب</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 max-w-7xl mx-auto" dir="rtl">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">الجولات الأكثر شعبية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{href:"/ar/tour/masai-mara-luxury-safari",img:"/masai-mara-migration.jpg",title:"سفاري ماساي مارا الفاخرة",desc:"الهجرة الكبرى والخمسة الكبار ومنتجعات فاخرة",price:"يبدأ من 3,500 دولار"},{href:"/ar/tour/gorilla-trekking-experience",img:"/mountain-gorilla-trekking.jpg",title:"رحلة تتبع الغوريلا",desc:"لقاء لا يُنسى مع الغوريلا الجبلية في رواندا",price:"عند الطلب"},{href:"/ar/budget-tours/masai-mara-3-days-budget-land-cruiser-safari",img:"/pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg",title:"سفاري اقتصادي 3 أيام",desc:"ماساي مارا بأسعار معقولة في Land Cruiser مشترك",price:"يبدأ من 450 دولار"}].map(({href,img,title,desc,price})=>(
            <Link key={href} href={href} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-52"><Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-5"><h3 className="font-serif font-bold text-xl mb-2">{title}</h3><p className="text-gray-600 text-sm mb-3">{desc}</p><p className="text-orange-500 font-bold">{price}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-orange-500 py-16 px-4 text-white text-center" dir="rtl">
        <h2 className="text-3xl font-serif font-bold mb-4">هل أنت مستعد لسفاريك؟</h2>
        <p className="text-xl mb-8 text-white/90">تواصل معنا الآن للحصول على عرض سعر مخصص ومجاني.</p>
        <a href="https://wa.me/254726485228?text=مرحباً%2C%20أريد%20حجز%20سفاري" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 font-bold px-8 py-4 rounded-xl text-lg inline-block">💬 واتساب: 254726485228+</a>
      </section>
    </>
    } />
  )
}
