// app/zh/page.tsx — Chinese Simplified Homepage
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "东非野生动物园2026 | 马赛马拉、大猩猩徒步 | 捷旅探险",
  description: "预订肯尼亚、坦桑尼亚、卢旺达和乌干达令人难忘的野生动物园。大猩猩徒步、大迁徙2026和无障碍轮椅野生动物园专家。免费报价。",
  keywords: ["东非野生动物园","肯尼亚safari2026","大猩猩徒步卢旺达","马赛马拉大迁徙","轮椅safari肯尼亚","坦桑尼亚旅游","乌干达safari","豪华safari肯尼亚","经济safari肯尼亚"],
  alternates: { canonical: `${BASE_URL}/zh`, languages: buildHreflangAlternates("/") },
  openGraph: { title: "东非野生动物园2026 | 捷旅探险", description: "肯尼亚、坦桑尼亚、卢旺达和乌干达令人难忘的野生动物园。", url: `${BASE_URL}/zh`, locale: "zh_CN", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "捷旅探险 - 东非野生动物园" }] },
}
const schema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:[
  {"@type":"Question","name":"参观马赛马拉的最佳时间是什么时候？","acceptedAnswer":{"@type":"Answer","text":"大迁徙的最佳时间是7月至10月。8月和9月，马拉河穿越发生时有150万头角马。"}},
  {"@type":"Question","name":"您提供无障碍轮椅野生动物园吗？","acceptedAnswer":{"@type":"Answer","text":"是的！我们是肯尼亚唯一配备德国液压升降机（400公斤容量）的改装4x4越野车车队运营商。"}},
  {"@type":"Question","name":"肯尼亚野生动物园费用是多少？","acceptedAnswer":{"@type":"Answer","text":"马赛马拉3天经济型野生动物园起价450美元。豪华野生动物园5天起价3500美元。"}},
]}

export default function ChineseHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0"><Image src="/masai-mara-migration.jpg" alt="马赛马拉大迁徙肯尼亚野生动物园" fill className="object-cover opacity-60" priority /></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"><span>⭐ 5.0 · 723+条已验证评价</span></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">东非难忘的<br className="hidden md:block" />野生动物园之旅2026</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">在经验丰富的导游陪伴下，探索肯尼亚、坦桑尼亚、卢旺达和乌干达。无障碍轮椅野生动物园专家。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/zh/tours" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">探索旅游 →</Link>
            <a href="https://wa.me/254726485228?text=您好%2C%20我想要野生动物园报价" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors backdrop-blur-sm">💬 免费WhatsApp报价</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">热门旅游</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{href:"/zh/tour/masai-mara-luxury-safari",img:"/masai-mara-migration.jpg",title:"马赛马拉豪华野生动物园",desc:"大迁徙、五大兽和豪华营地",price:"起价3,500美元"},{href:"/zh/tour/gorilla-trekking-experience",img:"/mountain-gorilla-trekking.jpg",title:"大猩猩徒步探险",desc:"在卢旺达与山地大猩猩的难忘相遇",price:"按需报价"},{href:"/zh/budget-tours/masai-mara-3-days-budget-land-cruiser-safari",img:"/pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg",title:"3天经济野生动物园",desc:"共享Land Cruiser马赛马拉实惠之旅",price:"起价450美元"}].map(({href,img,title,desc,price})=>(
            <Link key={href} href={href} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-52"><Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-5"><h3 className="font-serif font-bold text-xl mb-2">{title}</h3><p className="text-gray-600 text-sm mb-3">{desc}</p><p className="text-orange-500 font-bold">{price}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-orange-500 py-16 px-4 text-white text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">准备好您的野生动物园了吗？</h2>
        <p className="text-xl mb-8 text-white/90">立即联系我们获取免费个性化报价。</p>
        <a href="https://wa.me/254726485228?text=您好%2C%20我想预订野生动物园" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 font-bold px-8 py-4 rounded-xl text-lg inline-block">💬 WhatsApp: +254 726 485 228</a>
      </section>
    </>
  )
}
