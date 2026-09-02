// app/ar/tour/[slug]/page.tsx — Arabic individual tour page (RTL)
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { tours } from "@/lib/tours-data"
import { getArTourBySlug } from "@/lib/i18n/data/ar/tours-data"

interface Props { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return tours.map(t => ({ slug: t.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = tours.find(t => t.slug === slug)
  const arData = getArTourBySlug(slug)
  if (!tour) return { title: "الجولة غير موجودة", robots: { index: false, follow: false } }
  const title = arData?.metaTitle ?? `${arData?.title ?? tour.title} | جيه تريفل للرحلات`
  const description = arData?.metaDescription ?? tour.metaDescription ?? tour.description
  const imageUrl = tour.image?.startsWith("http") ? tour.image : `${BASE_URL}${tour.image}`
  return { title, description, keywords: arData?.keywords ?? [], alternates: { canonical: `${BASE_URL}/ar/tour/${slug}`, languages: buildHreflangAlternates(`/tour/${slug}`) }, openGraph: { title, description, url: `${BASE_URL}/ar/tour/${slug}`, locale: "ar_AE", type: "website", images: [{ url: imageUrl, width: 1200, height: 630, alt: arData?.title ?? tour.title }] } }
}

export default async function ArabicTourPage({ params }: Props) {
  const { slug } = await params
  const tour = tours.find(t => t.slug === slug)
  if (!tour) notFound()
  const arData = getArTourBySlug(slug)
  const displayTitle = arData?.title ?? tour.title
  const displayDesc = arData?.shortDescription ?? tour.shortDescription ?? tour.description
  const highlights = arData?.highlights ?? tour.highlights ?? []
  const included = arData?.included ?? tour.included ?? []
  const excluded = arData?.excluded ?? tour.excluded ?? []
  const diffMap: Record<string,string> = { Easy:"سهل", Moderate:"متوسط", Challenging:"صعب", Difficult:"شديد الصعوبة" }
  const schema = { "@context":"https://schema.org","@type":"TouristTrip", name:displayTitle, description:displayDesc, url:`${BASE_URL}/ar/tour/${slug}`, image:tour.image?.startsWith("http")?tour.image:`${BASE_URL}${tour.image}`, offers:{"@type":"Offer",price:tour.price,priceCurrency:"USD",availability:"https://schema.org/InStock"}, aggregateRating:{"@type":"AggregateRating",ratingValue:tour.rating,bestRating:"5",reviewCount:tour.reviewCount}, provider:{"@type":"TravelAgency","@id":`${BASE_URL}/#organization`,name:"جيه تريفل للرحلات الاستكشافية"} }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="bg-gray-50 py-3 px-4 text-sm" dir="rtl"><div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500"><Link href="/ar" className="hover:text-orange-500">الرئيسية</Link><span>/</span><Link href="/ar/tours" className="hover:text-orange-500">الجولات</Link><span>/</span><span className="text-gray-900 font-medium">{displayTitle}</span></div></nav>
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={tour.image||"/placeholder.jpg"} alt={displayTitle} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white max-w-7xl mx-auto" dir="rtl">
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">{tour.country}</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{displayTitle}</h1>
          <div className="flex flex-wrap gap-4 text-sm"><span>⭐ {tour.rating} ({tour.reviewCount} تقييم)</span><span>🕐 {tour.duration}</span><span>👥 {tour.groupSize}</span><span>🏔️ {diffMap[tour.difficulty]??tour.difficulty}</span></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div><h2 className="text-2xl font-serif font-bold mb-4">نظرة عامة على الجولة</h2><p className="text-gray-700 leading-relaxed">{displayDesc}</p></div>
            {highlights.length>0&&<div><h2 className="text-2xl font-serif font-bold mb-4">أبرز المعالم</h2><ul className="space-y-3">{highlights.map((h:string)=><li key={h} className="flex items-start gap-3 text-gray-700"><span className="text-orange-500">✓</span>{h}</li>)}</ul></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {included.length>0&&<div className="bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">✅ مشمول</h3><ul>{included.map((i:string)=><li key={i} className="text-green-700 text-sm">• {i}</li>)}</ul></div>}
              {excluded.length>0&&<div className="bg-red-50 rounded-2xl p-6"><h3 className="font-bold text-red-800 mb-3">❌ غير مشمول</h3><ul>{excluded.map((e:string)=><li key={e} className="text-red-700 text-sm">• {e}</li>)}</ul></div>}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border p-6">
              <div className="text-center mb-6">{tour.isOnOffer&&tour.originalPrice&&<p className="text-gray-400 line-through">${tour.originalPrice.toLocaleString()}</p>}<p className="text-4xl font-bold text-orange-500">${tour.price.toLocaleString()}</p><p className="text-gray-500 text-sm">للشخص</p></div>
              <div className="space-y-3 mb-6 text-sm border-t border-b py-4">
                <div className="flex justify-between"><span className="text-gray-500">المدة</span><span>{tour.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">المجموعة</span><span>{tour.groupSize}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">الصعوبة</span><span>{diffMap[tour.difficulty]??tour.difficulty}</span></div>
              </div>
              <a href={`https://wa.me/254726485228?text=مرحباً%2C%20أريد%20حجز%20هذه%20الجولة:%20${encodeURIComponent(displayTitle)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl mb-3">💬 احجز عبر واتساب</a>
              <a href="mailto:info@jaetravel.co.ke" className="block w-full border border-orange-500 text-orange-500 text-center font-semibold py-3 rounded-xl text-sm">✉️ أرسل بريداً إلكترونياً</a>
              <p className="text-center text-xs text-gray-400 mt-4">حجز مرن · إلغاء مجاني · عرض سعر مجاني</p>
            </div>
          </div>
        </div>
        <div className="mt-12 p-4 bg-blue-50 rounded-xl text-sm text-blue-800" dir="ltr">📖 Available in: <Link href={`/tour/${slug}`} className="underline">English</Link> · <Link href={`/fr/tour/${slug}`} className="underline">Français</Link> · <Link href={`/de/tour/${slug}`} className="underline">Deutsch</Link> · <Link href={`/it/tour/${slug}`} className="underline">Italiano</Link> · <Link href={`/hi/tour/${slug}`} className="underline">हिंदी</Link> · <Link href={`/zh/tour/${slug}`} className="underline">中文</Link></div>
      </div>
    </>
  )
}
