// app/it/page.tsx — Italian Homepage
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "Safari Africa Orientale 2026 | Masai Mara, Gorilla & Safari Accessibili | JaeTravel Spedizioni",
  description: "Prenota safari indimenticabili in Kenya, Tanzania, Ruanda e Uganda. Specialisti trekking gorilla, Grande Migrazione Masai Mara 2026 e safari accessibili in sedia a rotelle. Preventivo gratuito.",
  keywords: ["safari africa orientale","safari kenya 2026","trekking gorilla ruanda","grande migrazione masai mara","safari accessibile sedia rotelle","circuito tanzania","safari uganda","safari lusso kenya","safari economico kenya"],
  alternates: { canonical: `${BASE_URL}/it`, languages: buildHreflangAlternates("/") },
  openGraph: { title: "Safari Africa Orientale 2026 | JaeTravel Spedizioni", description: "Safari indimenticabili in Kenya, Tanzania, Ruanda e Uganda.", url: `${BASE_URL}/it`, locale: "it_IT", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel Spedizioni - Safari Africa Orientale" }] },
}
const schema = { "@context":"https://schema.org","@type":"FAQPage",mainEntity:[
  { "@type":"Question",name:"Qual è il periodo migliore per visitare il Masai Mara?",acceptedAnswer:{ "@type":"Answer",text:"Il periodo migliore per la Grande Migrazione è luglio-ottobre. Gli attraversamenti del fiume Mara avvengono principalmente ad agosto e settembre con 1,5 milioni di gnu." } },
  { "@type":"Question",name:"Offrite safari accessibili in sedia a rotelle?",acceptedAnswer:{ "@type":"Answer",text:"Sì! Siamo gli unici operatori in Kenya con Land Cruiser 4x4 completamente adattati con montacarichi idraulici tedeschi (capacità 400 kg) per safari accessibili." } },
  { "@type":"Question",name:"Quanto costa un safari in Kenya?",acceptedAnswer:{ "@type":"Answer",text:"I safari budget iniziano da 450 USD per 3 giorni al Masai Mara. I safari di lusso partono da 3.500 USD per 5 giorni. Abbiamo opzioni per ogni budget." } },
]}

export default function ItalianHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0"><Image src="/masai-mara-migration.jpg" alt="Grande Migrazione Masai Mara Kenya" fill className="object-cover opacity-60" priority /></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"><span>⭐ 5.0 · 723+ recensioni verificate</span></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">Safari Indimenticabili<br className="hidden md:block" /> in Africa Orientale 2026</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">Scopri Kenya, Tanzania, Ruanda e Uganda con guide esperte. Specialisti safari accessibili in sedia a rotelle.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/it/tours" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">Esplora i tour →</Link>
            <a href="https://wa.me/254726485228?text=Ciao%2C%20vorrei%20un%20preventivo%20safari" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors backdrop-blur-sm">💬 Preventivo WhatsApp gratuito</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Tour Popolari</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{href:"/it/tour/masai-mara-luxury-safari",img:"/masai-mara-migration.jpg",title:"Safari Masai Mara di Lusso",desc:"Grande Migrazione, Big Five e lodge di lusso",price:"Da 3.500 USD"},{href:"/it/tour/gorilla-trekking-experience",img:"/mountain-gorilla-trekking.jpg",title:"Trekking Gorilla",desc:"Incontro indimenticabile con gorilla di montagna",price:"Su richiesta"},{href:"/it/budget-tours/masai-mara-3-days-budget-land-cruiser-safari",img:"/pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg",title:"Safari Budget 3 Giorni",desc:"Masai Mara economico in Land Cruiser condiviso",price:"Da 450 USD"}].map(({href,img,title,desc,price})=>(
            <Link key={href} href={href} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-52"><Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-5"><h3 className="font-serif font-bold text-xl mb-2">{title}</h3><p className="text-gray-600 text-sm mb-3">{desc}</p><p className="text-orange-500 font-bold">{price}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-orange-500 py-16 px-4 text-white text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Pronto per il tuo safari?</h2>
        <p className="text-xl mb-8 text-white/90">Contattaci ora per un preventivo personalizzato gratuito.</p>
        <a href="https://wa.me/254726485228?text=Ciao%2C%20voglio%20prenotare%20un%20safari" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 font-bold px-8 py-4 rounded-xl text-lg inline-block">💬 WhatsApp: +254 726 485 228</a>
      </section>
    </>
  )
}
