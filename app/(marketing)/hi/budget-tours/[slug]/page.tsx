// app/hi/budget-tours/[slug]/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { budgetTours, getTourBySlug } from "@/lib/budget-tours-data"

interface Props { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return budgetTours.map(t => ({ slug: t.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) return { title: "Tour Not Found", robots: { index: false, follow: false } }
  const imageUrl = tour.image?.startsWith("http") ? tour.image : `${BASE_URL}${tour.image}`
  return {
    title: tour.title,
    description: tour.metaDescription,
    keywords: tour.keywords,
    alternates: { canonical: `${BASE_URL}/hi/budget-tours/${slug}`, languages: buildHreflangAlternates(`/budget-tours/${slug}`) },
    openGraph: { title: tour.title, description: tour.metaDescription, url: `${BASE_URL}/hi/budget-tours/${slug}`, locale: "hi_IN", type: "website", images: [{ url: imageUrl, width: 1200, height: 630, alt: tour.title }] },
  }
}

export default async function BudgetTourPage({ params }: Props) {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) notFound()

  const schema = {
    "@context":"https://schema.org","@type":"TouristTrip",
    name:tour.title, description:tour.metaDescription,
    url:`${BASE_URL}/hi/budget-tours/${slug}`,
    image:tour.image?.startsWith("http")?tour.image:`${BASE_URL}${tour.image}`,
    offers:{"@type":"Offer",price:tour.price,priceCurrency:"USD",availability:"https://schema.org/InStock"},
    aggregateRating:{"@type":"AggregateRating",ratingValue:tour.rating,bestRating:"5",reviewCount:tour.reviewCount},
    provider:{"@type":"TravelAgency","@id":`${BASE_URL}/#organization`,name:"जेट्रेवल एक्सपीडिशन"},
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="bg-gray-50 py-3 px-4 text-sm" dir="ltr">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500">
          <Link href="/hi" className="hover:text-orange-500">होम</Link><span>/</span>
          <Link href="/hi/tours" className="hover:text-orange-500">बजट टूर</Link><span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{tour.title}</span>
        </div>
      </nav>
      <div className="relative h-[45vh] min-h-[350px]">
        <Image src={tour.image||"/placeholder.jpg"} alt={tour.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white max-w-7xl mx-auto" dir="ltr">
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Budget Safari</span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold mb-3">{tour.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm"><span>⭐ {tour.rating} ({tour.reviewCount})</span><span>🕐 {tour.duration}</span><span>👥 {tour.groupSize}</span><span>📍 {tour.departure}</span></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12" dir="ltr">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div><h2 className="text-2xl font-serif font-bold mb-4">अवलोकन</h2><p className="text-gray-700 leading-relaxed">{tour.shortDescription}</p></div>
            {tour.highlights?.length>0&&(
              <div><h2 className="text-2xl font-serif font-bold mb-4">मुख्य आकर्षण</h2><ul className="space-y-3">{tour.highlights.map((h: string)=><li key={h} className="flex items-start gap-3 text-gray-700"><span className="text-orange-500">✓</span>{h}</li>)}</ul></div>
            )}
            {tour.itinerary?.length>0&&(
              <div><h2 className="text-2xl font-serif font-bold mb-6">Itinerary</h2><div className="space-y-4">{tour.itinerary.map((day: any)=>(
                <div key={day.day} className="border border-gray-100 rounded-xl p-5 hover:border-orange-200 transition-colors">
                  <h3 className="font-bold text-orange-600 mb-2">Day {day.day}: {day.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{day.content}</p>
                </div>
              ))}</div></div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.included?.length>0&&<div className="bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">✅ शामिल</h3><ul>{tour.included.map((i: string)=><li key={i} className="text-green-700 text-sm">• {i}</li>)}</ul></div>}
              {tour.excluded?.length>0&&<div className="bg-red-50 rounded-2xl p-6"><h3 className="font-bold text-red-800 mb-3">❌ शामिल नहीं</h3><ul>{tour.excluded.map((e: string)=><li key={e} className="text-red-700 text-sm">• {e}</li>)}</ul></div>}
            </div>
            {tour.faqs?.length>0&&(
              <div><h2 className="text-2xl font-serif font-bold mb-6">FAQ</h2><div className="space-y-4">{tour.faqs.map((faq: any)=>(
                <details key={faq.question} className="border border-gray-100 rounded-xl">
                  <summary className="p-4 font-semibold cursor-pointer hover:text-orange-600">{faq.question}</summary>
                  <div className="p-4 pt-0 text-gray-700 text-sm">{faq.answer}</div>
                </details>
              ))}</div></div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border p-6">
              <div className="text-center mb-6">
                {tour.originalPrice&&<p className="text-gray-400 line-through text-lg">${tour.originalPrice?.toLocaleString()}</p>}
                <p className="text-4xl font-bold text-orange-500">${tour.price.toLocaleString()}</p>
                <p className="text-gray-500 text-sm">प्रति व्यक्ति</p>
              </div>
              <div className="space-y-3 mb-6 text-sm border-t border-b py-4">
                <div className="flex justify-between"><span className="text-gray-500">अवधि</span><span>{tour.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">समूह</span><span>{tour.groupSize}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Depart</span><span>{tour.departure}</span></div>
              </div>
              <a href={`https://wa.me/254726485228?text=नमस्ते%2C%20बुक%20करना%20चाहता%20हूं%3A%20${encodeURIComponent(tour.title)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl mb-3">💬 WhatsApp पर बुक करें</a>
              <a href="mailto:info@jaetravel.co.ke" className="block w-full border border-orange-500 text-orange-500 text-center font-semibold py-3 rounded-xl text-sm">✉️ ईमेल</a>
              <p className="text-center text-xs text-gray-400 mt-4">लचीली बुकिंग · मुफ्त कोटेशन</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
