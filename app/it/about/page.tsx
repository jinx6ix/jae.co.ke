// app/it/about/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "Chi siamo — JaeTravel Spedizioni | JaeTravel",
  description: "Fondata a Nairobi, JaeTravel Spedizioni è specializzata in safari nell'Africa Orientale. Siamo pionieri nei safari accessibili per persone con mobilità ridotta.",
  alternates: { canonical: `${BASE_URL}/it/about`, languages: buildHreflangAlternates("/about") },
  openGraph: { title: "Chi siamo — JaeTravel Spedizioni", url: `${BASE_URL}/it/about`, locale: "it_IT", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel" }] },
}

export default function AboutPage() {
  const values = ['Eccellenza nel servizio', 'Turismo responsabile', 'Accessibilità inclusiva', 'Competenza locale', 'Soddisfazione cliente 100%']
  return (
    <div className="max-w-7xl mx-auto px-4 py-16" dir="ltr">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Chi siamo — JaeTravel Spedizioni</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Fondata a Nairobi, JaeTravel Spedizioni è specializzata in safari nell'Africa Orientale. Siamo pionieri nei safari accessibili per persone con mobilità ridotta.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
          <Image src="/safari-guides-with-tourists-in-africa.jpg" alt="JaeTravel team" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-serif font-bold mb-4">La nostra Missione</h2>
          <p className="text-gray-700 leading-relaxed mb-6">Rendere le esperienze safari africane accessibili a tutti, indipendentemente dalla mobilità.</p>
          <div className="grid grid-cols-2 gap-4">
            {[{num:"15+",label:"Years"},{num:"723+",label:"Reviews"},{num:"4",label:"Countries"},{num:"100%",label:"Satisfaction"}].map((s)=>(
              <div key={s.label} className="bg-orange-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-orange-500">{s.num}</p>
                <p className="text-gray-600 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-serif font-bold text-center mb-8">I nostri Valori</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {values.map((v: string)=>(
            <div key={v} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-orange-500 text-2xl mb-3 block">✦</span>
              <p className="font-semibold text-gray-800 text-sm">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center bg-orange-50 rounded-2xl p-10">
        <h3 className="text-2xl font-serif font-bold mb-4">Ready to explore?</h3>
        <a href="https://wa.me/254726485228" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors">💬 WhatsApp: +254 726 485 228</a>
      </div>
    </div>
  )
}
