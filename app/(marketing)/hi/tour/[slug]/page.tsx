// app/hi/tour/[slug]/page.tsx — Hindi individual tour page
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { tours } from "@/lib/tours-data"
import { getHiTourBySlug } from "@/lib/i18n/data/hi/tours-data"

interface Props { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return tours.map(t => ({ slug: t.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = tours.find(t => t.slug === slug)
  const hiData = getHiTourBySlug(slug)
  if (!tour) return { title: "टूर नहीं मिला", robots: { index: false, follow: false } }
  const title = hiData?.metaTitle ?? `${hiData?.title ?? tour.title} | जेट्रेवल एक्सपीडिशन`
  const description = hiData?.metaDescription ?? tour.metaDescription ?? tour.description
  const imageUrl = tour.image?.startsWith("http") ? tour.image : `${BASE_URL}${tour.image}`
  return { title, description, keywords: hiData?.keywords ?? [], alternates: { canonical: `${BASE_URL}/hi/tour/${slug}`, languages: buildHreflangAlternates(`/tour/${slug}`) }, openGraph: { title, description, url: `${BASE_URL}/hi/tour/${slug}`, locale: "hi_IN", type: "website", images: [{ url: imageUrl, width: 1200, height: 630, alt: hiData?.title ?? tour.title }] } }
}

export default async function HindiTourPage({ params }: Props) {
  const { slug } = await params
  const tour = tours.find(t => t.slug === slug)
  if (!tour) notFound()
  const hiData = getHiTourBySlug(slug)
  const displayTitle = hiData?.title ?? tour.title
  const displayDesc = hiData?.shortDescription ?? tour.shortDescription ?? tour.description
  const highlights = hiData?.highlights ?? tour.highlights ?? []
  const included = hiData?.included ?? tour.included ?? []
  const excluded = hiData?.excluded ?? tour.excluded ?? []
  const diffMap: Record<string,string> = { Easy:"आसान", Moderate:"मध्यम", Challenging:"चुनौतीपूर्ण", Difficult:"कठिन" }
  const schema = { "@context":"https://schema.org","@type":"TouristTrip", name:displayTitle, description:displayDesc, url:`${BASE_URL}/hi/tour/${slug}`, image:tour.image?.startsWith("http")?tour.image:`${BASE_URL}${tour.image}`, offers:{"@type":"Offer",price:tour.price,priceCurrency:"USD",availability:"https://schema.org/InStock"}, aggregateRating:{"@type":"AggregateRating",ratingValue:tour.rating,bestRating:"5",reviewCount:tour.reviewCount}, provider:{"@type":"TravelAgency","@id":`${BASE_URL}/#organization`,name:"जेट्रेवल एक्सपीडिशन"} }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="bg-gray-50 py-3 px-4 text-sm"><div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500"><Link href="/hi" className="hover:text-orange-500">होम</Link><span>/</span><Link href="/hi/tours" className="hover:text-orange-500">टूर</Link><span>/</span><span className="text-gray-900 font-medium">{displayTitle}</span></div></nav>
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={tour.image||"/placeholder.jpg"} alt={displayTitle} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white max-w-7xl mx-auto">
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">{tour.country}</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{displayTitle}</h1>
          <div className="flex flex-wrap gap-4 text-sm"><span>⭐ {tour.rating} ({tour.reviewCount} समीक्षाएं)</span><span>🕐 {tour.duration}</span><span>👥 {tour.groupSize}</span><span>🏔️ {diffMap[tour.difficulty]??tour.difficulty}</span></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div><h2 className="text-2xl font-serif font-bold mb-4">टूर अवलोकन</h2><p className="text-gray-700 leading-relaxed">{displayDesc}</p></div>
            {highlights.length>0&&<div><h2 className="text-2xl font-serif font-bold mb-4">मुख्य आकर्षण</h2><ul className="space-y-3">{highlights.map((h:string)=><li key={h} className="flex items-start gap-3 text-gray-700"><span className="text-orange-500">✓</span>{h}</li>)}</ul></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {included.length>0&&<div className="bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">✅ शामिल</h3><ul>{included.map((i:string)=><li key={i} className="text-green-700 text-sm">• {i}</li>)}</ul></div>}
              {excluded.length>0&&<div className="bg-red-50 rounded-2xl p-6"><h3 className="font-bold text-red-800 mb-3">❌ शामिल नहीं</h3><ul>{excluded.map((e:string)=><li key={e} className="text-red-700 text-sm">• {e}</li>)}</ul></div>}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border p-6">
              <div className="text-center mb-6">{tour.isOnOffer&&tour.originalPrice&&<p className="text-gray-400 line-through">${tour.originalPrice.toLocaleString()}</p>}<p className="text-4xl font-bold text-orange-500">${tour.price.toLocaleString()}</p><p className="text-gray-500 text-sm">प्रति व्यक्ति</p></div>
              <div className="space-y-3 mb-6 text-sm border-t border-b py-4">
                <div className="flex justify-between"><span className="text-gray-500">अवधि</span><span>{tour.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">समूह</span><span>{tour.groupSize}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">कठिनाई</span><span>{diffMap[tour.difficulty]??tour.difficulty}</span></div>
              </div>
              <a href={`https://wa.me/254726485228?text=नमस्ते%2C%20मैं%20यह%20टूर%20बुक%20करना%20चाहता%20हूं:%20${encodeURIComponent(displayTitle)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl mb-3">💬 WhatsApp पर बुक करें</a>
              <a href="mailto:info@jaetravel.co.ke" className="block w-full border border-orange-500 text-orange-500 text-center font-semibold py-3 rounded-xl text-sm">✉️ ईमेल भेजें</a>
            </div>
          </div>
        </div>
        <div className="mt-12 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">📖 यह पृष्ठ उपलब्ध है: <Link href={`/tour/${slug}`} className="underline">English</Link> · <Link href={`/fr/tour/${slug}`} className="underline">Français</Link> · <Link href={`/de/tour/${slug}`} className="underline">Deutsch</Link> · <Link href={`/it/tour/${slug}`} className="underline">Italiano</Link> · <Link href={`/ar/tour/${slug}`} className="underline">العربية</Link> · <Link href={`/zh/tour/${slug}`} className="underline">中文</Link></div>
      </div>
    </>
  )
}
