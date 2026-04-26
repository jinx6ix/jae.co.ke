// app/hi/page.tsx — Hindi Homepage
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "पूर्वी अफ्रीका सफारी 2026 | मसाई मारा, गोरिल्ला ट्रेकिंग | जेट्रेवल एक्सपीडिशन",
  description: "केन्या, तंजानिया, रवांडा और युगांडा में अविस्मरणीय सफारी बुक करें। गोरिल्ला ट्रेकिंग, महान प्रवास 2026 और व्हीलचेयर सुलभ सफारी के विशेषज्ञ। मुफ्त कोटेशन।",
  keywords: ["पूर्वी अफ्रीका सफारी","केन्या सफारी 2026","गोरिल्ला ट्रेकिंग रवांडा","महान प्रवास मसाई मारा","व्हीलचेयर सफारी केन्या","तंजानिया सफारी","युगांडा सफारी","लक्जरी सफारी केन्या"],
  alternates: { canonical: `${BASE_URL}/hi`, languages: buildHreflangAlternates("/") },
  openGraph: { title: "पूर्वी अफ्रीका सफारी 2026 | जेट्रेवल एक्सपीडिशन", description: "केन्या, तंजानिया, रवांडा और युगांडा में अविस्मरणीय सफारी।", url: `${BASE_URL}/hi`, locale: "hi_IN", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "जेट्रेवल एक्सपीडिशन - पूर्वी अफ्रीका सफारी" }] },
}
const schema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:[
  {"@type":"Question","name":"मसाई मारा जाने का सबसे अच्छा समय क्या है?","acceptedAnswer":{"@type":"Answer","text":"महान प्रवास के लिए जुलाई से अक्टूबर सबसे अच्छा समय है। अगस्त-सितंबर में 15 लाख जीनू मारा नदी पार करते हैं।"}},
  {"@type":"Question","name":"क्या आप व्हीलचेयर सुलभ सफारी प्रदान करते हैं?","acceptedAnswer":{"@type":"Answer","text":"हां! हम केन्या में एकमात्र ऑपरेटर हैं जो जर्मन हाइड्रोलिक लिफ्ट (400 किग्रा क्षमता) के साथ पूरी तरह से अनुकूलित 4x4 Land Cruisers संचालित करते हैं।"}},
  {"@type":"Question","name":"केन्या सफारी की लागत कितनी है?","acceptedAnswer":{"@type":"Answer","text":"बजट सफारी मसाई मारा में 3 दिनों के लिए $450 से शुरू होती है। लक्जरी सफारी 5 दिनों के लिए $3,500 से शुरू होती है।"}},
]}

export default function HindiHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0"><Image src="/masai-mara-migration.jpg" alt="मसाई मारा महान प्रवास केन्या सफारी" fill className="object-cover opacity-60" priority /></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"><span>⭐ 5.0 · 723+ सत्यापित समीक्षाएं</span></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">पूर्वी अफ्रीका में<br className="hidden md:block" /> अविस्मरणीय सफारी 2026</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">विशेषज्ञ गाइड के साथ केन्या, तंजानिया, रवांडा और युगांडा की खोज करें। व्हीलचेयर सुलभ सफारी के विशेषज्ञ।</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hi/tours" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">टूर एक्सप्लोर करें →</Link>
            <a href="https://wa.me/254726485228?text=नमस्ते%2C%20मैं%20सफारी%20कोटेशन%20चाहता%20हूं" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors backdrop-blur-sm">💬 मुफ्त WhatsApp कोटेशन</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">लोकप्रिय टूर</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{href:"/hi/tour/masai-mara-luxury-safari",img:"/masai-mara-migration.jpg",title:"मसाई मारा लक्जरी सफारी",desc:"महान प्रवास, बिग फाइव और लक्जरी लॉज",price:"$3,500 से"},{href:"/hi/tour/gorilla-trekking-experience",img:"/mountain-gorilla-trekking.jpg",title:"गोरिल्ला ट्रेकिंग",desc:"रवांडा में पर्वतीय गोरिल्लाओं से अविस्मरणीय मुलाकात",price:"अनुरोध पर"},{href:"/hi/budget-tours/masai-mara-3-days-budget-land-cruiser-safari",img:"/pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg",title:"3 दिन बजट सफारी",desc:"साझा Land Cruiser में किफायती मसाई मारा",price:"$450 से"}].map(({href,img,title,desc,price})=>(
            <Link key={href} href={href} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-52"><Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-5"><h3 className="font-serif font-bold text-xl mb-2">{title}</h3><p className="text-gray-600 text-sm mb-3">{desc}</p><p className="text-orange-500 font-bold">{price}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-orange-500 py-16 px-4 text-white text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">अपनी सफारी के लिए तैयार हैं?</h2>
        <p className="text-xl mb-8 text-white/90">मुफ्त व्यक्तिगत कोटेशन के लिए अभी संपर्क करें।</p>
        <a href="https://wa.me/254726485228?text=नमस्ते%2C%20मैं%20सफारी%20बुक%20करना%20चाहता%20हूं" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 font-bold px-8 py-4 rounded-xl text-lg inline-block">💬 WhatsApp: +254 726 485 228</a>
      </section>
    </>
  )
}
