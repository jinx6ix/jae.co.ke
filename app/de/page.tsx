// app/de/page.tsx — German Homepage
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "Ostafrika Safari 2026 | Masai Mara, Gorilla Trekking & Barrierefreie Safaris | JaeTravel",
  description: "Buchen Sie unvergessliche Safaris in Kenia, Tansania, Ruanda und Uganda. Spezialisten für Gorilla-Trekking, Große Migration Masai Mara 2026 und Rollstuhl-Safari. Kostenloses Angebot.",
  keywords: ["ostafrika safari","safari kenia 2026","gorilla trekking ruanda","große migration masai mara","rollstuhl safari kenia","tansania circuit","uganda safari","luxus safari kenia","budget safari kenia","masai mara 2026"],
  alternates: { canonical: `${BASE_URL}/de`, languages: buildHreflangAlternates("/") },
  openGraph: { title: "Ostafrika Safari 2026 | JaeTravel Expeditionen", description: "Unvergessliche Safaris in Kenia, Tansania, Ruanda und Uganda. Gorilla-Trekking, Große Migration und barrierefreie Safaris.", url: `${BASE_URL}/de`, locale: "de_DE", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel Expeditionen - Ostafrika Safari" }] },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Was ist die beste Reisezeit für den Masai Mara?", acceptedAnswer: { "@type": "Answer", text: "Die beste Zeit für die Große Migration ist Juli bis Oktober. Die Mara-Flussüberquerungen finden hauptsächlich im August und September statt, wenn 1,5 Millionen Gnus überqueren." } },
    { "@type": "Question", name: "Bieten Sie rollstuhlgerechte Safaris an?", acceptedAnswer: { "@type": "Answer", text: "Ja! Wir betreiben Kenias einzige Flotte angepasster 4x4-Land-Cruiser mit deutschen Hydraulikliften (400 kg Kapazität) für barrierefreie Safaris." } },
    { "@type": "Question", name: "Was kostet eine Kenya Safari?", acceptedAnswer: { "@type": "Answer", text: "Budget-Safaris beginnen ab 450 USD für 3 Tage in der Masai Mara. Luxus-Safaris starten ab 3.500 USD für 5 Tage. Wir haben Optionen für jedes Budget." } },
  ],
}

export default function GermanHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0"><Image src="/masai-mara-migration.jpg" alt="Große Migration Masai Mara Kenia" fill className="object-cover opacity-60" priority /></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"><span>⭐ 5.0 · 723+ verifizierte Bewertungen</span></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">Unvergessliche Ostafrika<br className="hidden md:block" /> Safari 2026</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">Erleben Sie Kenia, Tansania, Ruanda und Uganda mit Expertenführern. Spezialisten für barrierefreie Safaris mit Rollstuhl.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/de/tours" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">Touren entdecken →</Link>
            <a href="https://wa.me/254726485228?text=Hallo%2C%20ich%20möchte%20ein%20Safari-Angebot" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors backdrop-blur-sm">💬 Kostenloses WhatsApp-Angebot</a>
          </div>
        </div>
      </section>

      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{num:"723+",label:"5-Sterne-Bewertungen"},{num:"15+",label:"Jahre Erfahrung"},{num:"4 Länder",label:"Ostafrika"},{num:"24/7",label:"Kundensupport"}].map(({num,label})=>(
              <div key={label} className="flex flex-col items-center"><span className="text-3xl font-bold text-orange-500">{num}</span><span className="text-gray-600 text-sm mt-1">{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Beliebte Touren</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Sorgfältig ausgewählte Erlebnisse für jeden Reisenden</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {href:"/de/tour/masai-mara-luxury-safari",img:"/masai-mara-migration.jpg",title:"Masai Mara Luxus-Safari",desc:"Große Migration, Big Five und Luxuslodges",price:"Ab 3.500 USD",badge:"Beliebt"},
            {href:"/de/tour/gorilla-trekking-experience",img:"/mountain-gorilla-trekking.jpg",title:"Gorilla-Trekking",desc:"Unvergessliche Begegnung mit Berggorillas in Ruanda",price:"Auf Anfrage",badge:"Einzigartiges Erlebnis"},
            {href:"/de/budget-tours/masai-mara-3-days-budget-land-cruiser-safari",img:"/pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg",title:"3-Tage Budget-Safari",desc:"Erschwingliche Masai Mara im geteilten Land Cruiser",price:"Ab 450 USD",badge:"Bestes Preis-Leistungs-Verhältnis"},
          ].map(({href,img,title,desc,price,badge})=>(
            <Link key={href} href={href} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="relative h-52 overflow-hidden"><Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{badge}</span></div>
              <div className="p-5"><h3 className="font-serif font-bold text-xl mb-2">{title}</h3><p className="text-gray-600 text-sm mb-3">{desc}</p><p className="text-orange-500 font-bold">{price}</p></div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/de/tours" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">Alle Touren ansehen →</Link></div>
      </section>

      <section className="bg-orange-50 py-16 px-4">
        <div className="max-w-7xl mx-auto"><div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">Unser einzigartiges Angebot</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">Rollstuhlgerechte Safaris in Kenia</h2>
            <p className="text-gray-700 mb-6">Wir sind die einzigen Betreiber in Kenia mit vollständig angepassten 4x4-Land-Cruisern mit deutschen Hydraulikliften (400 kg Kapazität), die es Rollstuhlfahrern ermöglichen, während der gesamten Safari in ihrem Rollstuhl zu bleiben.</p>
            <ul className="space-y-3 mb-8">{["Zertifizierter deutscher Hydrauliklift (400 kg)","Pop-up-Dach für optimale Tierbeobachtung","Medizinische Ausrüstung an Bord","Spezialisierte und erfahrene Reiseführer","Ausgewählte barrierefreie Lodges"].map(f=>(
              <li key={f} className="flex items-start gap-3 text-gray-700"><span className="text-orange-500 mt-0.5">✓</span>{f}</li>
            ))}</ul>
            <Link href="/de/tour/wheelchair-accessible-safari" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">Mehr erfahren →</Link>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl"><Image src="/wheelchair-accessible-tanzania-safari.webp" alt="Rollstuhlgerechte Safari Kenia Land Cruiser Hydrauliklift" fill className="object-cover" /></div>
        </div></div>
      </section>

      <section className="bg-orange-500 py-16 px-4 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Bereit für Ihre Safari?</h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">Kontaktieren Sie uns jetzt für ein kostenloses, maßgeschneidertes Angebot für jedes Budget.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/254726485228?text=Hallo%2C%20ich%20möchte%20eine%20Safari%20buchen" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-4 rounded-xl text-lg transition-colors">💬 WhatsApp: +254 726 485 228</a>
          <a href="mailto:info@jaetravel.co.ke" className="bg-orange-600 hover:bg-orange-700 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors">✉️ info@jaetravel.co.ke</a>
        </div>
      </section>
    </>
  )
}
