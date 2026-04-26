// app/de/tours/page.tsx — German Tours Listing
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { tours } from "@/lib/tours-data"

export const metadata: Metadata = {
  title: "Alle Ostafrika Safari Touren | JaeTravel Expeditionen",
  description: "Entdecken Sie alle unsere Safaritouren in Kenia, Tansania, Ruanda und Uganda. Budget-, Luxus- und barrierefreie Safaris. Online oder per WhatsApp buchen.",
  keywords: ["safari touren ostafrika","safari kenia alle touren","gorilla trekking touren","große migration safari","barrierefreie safaris","tansania safari touren","uganda safari"],
  alternates: { canonical: `${BASE_URL}/de/tours`, languages: buildHreflangAlternates("/tours") },
  openGraph: { title: "Alle Safari Touren | JaeTravel Expeditionen", url: `${BASE_URL}/de/tours`, locale: "de_DE", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Safari Touren Ostafrika" }] },
}

const schema = { "@context":"https://schema.org","@type":"ItemList", name:"Ostafrika Safari Touren — JaeTravel Expeditionen", url:`${BASE_URL}/de/tours`, numberOfItems:tours.length, itemListElement:tours.slice(0,20).map((t,i)=>({ "@type":"ListItem", position:i+1, url:`${BASE_URL}/de/tour/${t.slug}`, name:t.title })) }

export default function GermanToursPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-gradient-to-b from-orange-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Alle Safari Touren</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Entdecken Sie {tours.length}+ sorgfältig geplante Touren in Kenia, Tansania, Ruanda und Uganda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => (
              <Link key={tour.slug} href={`/de/tour/${tour.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1">
                <div className="relative h-52"><Image src={tour.image||"/placeholder.jpg"} alt={tour.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />{tour.isOnOffer&&<span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Sonderangebot</span>}<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3"><span className="text-white text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{tour.country}</span></div></div>
                <div className="p-5"><h2 className="font-serif font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-600">{tour.title}</h2><p className="text-gray-500 text-sm mb-4 line-clamp-2">{tour.shortDescription||tour.description}</p>
                  <div className="flex items-center justify-between"><div>{tour.isOnOffer&&tour.originalPrice&&<span className="text-gray-400 text-sm line-through mr-2">${tour.originalPrice.toLocaleString()}</span>}<span className="text-orange-500 font-bold text-lg">${tour.price.toLocaleString()}</span><span className="text-gray-400 text-xs ml-1">/Pers.</span></div><span className="text-sm text-gray-600">⭐ {tour.rating}</span></div>
                  <div className="mt-3 flex gap-4 text-xs text-gray-500"><span>🕐 {tour.duration}</span><span>👥 {tour.groupSize}</span></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12 bg-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-serif font-bold mb-3">Nicht gefunden, was Sie suchen?</h3>
            <p className="text-gray-600 mb-6">Wir erstellen maßgeschneiderte Safaris. Kontaktieren Sie uns für eine individuelle Tour.</p>
            <a href="https://wa.me/254726485228?text=Hallo%2C%20ich%20suche%20eine%20individuelle%20Tour" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl">💬 Individuelle Tour anfragen</a>
          </div>
        </div>
      </div>
    </>
  )
}
