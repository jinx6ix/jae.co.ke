// app/it/contact/page.tsx
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "Contattaci | JaeTravel",
  description: "Contatta il team JaeTravel per pianificare il tuo safari da sogno. Rispondiamo entro 24 ore.",
  alternates: { canonical: `${BASE_URL}/it/contact`, languages: buildHreflangAlternates("/contact") },
  openGraph: { title: "Contattaci | JaeTravel", url: `${BASE_URL}/it/contact`, locale: "it_IT", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Contattaci" }] },
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16" dir="ltr">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contattaci</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Contatta il team JaeTravel per pianificare il tuo safari da sogno. Rispondiamo entro 24 ore.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Il tuo nome</label><input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Indirizzo email</label><input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Telefono (opzionale)</label><input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Messaggio</label><textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 resize-none" /></div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors">Invia messaggio</button>
        </div>
        <div className="space-y-8">
          <p className="text-lg font-semibold text-gray-700">O contattaci direttamente</p>
          <div className="space-y-4">
            <a href="https://wa.me/254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
              <span className="text-2xl">💬</span>
              <div><p className="font-bold text-green-800">💬 WhatsApp</p><p className="text-green-600">+254 726 485 228</p></div>
            </a>
            <a href="mailto:info@jaetravel.co.ke" className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors">
              <span className="text-2xl">✉️</span>
              <div><p className="font-bold text-orange-800">Email</p><p className="text-orange-600">info@jaetravel.co.ke</p></div>
            </a>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold mb-4">JaeTravel Expeditions</h3>
            <p className="text-gray-600 text-sm">Nairobi, Kenya</p>
            <p className="text-gray-600 text-sm mt-1">Mon-Sun: 07:00 - 20:00 EAT</p>
          </div>
        </div>
      </div>
    </div>
  )
}
