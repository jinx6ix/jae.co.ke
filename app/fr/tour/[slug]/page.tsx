// app/fr/tour/[slug]/page.tsx — French individual tour page
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { tours, type Tour } from "@/lib/tours-data"
import { getFrTourBySlug } from "@/lib/i18n/data/fr/tours-data"

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return tours.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = tours.find(t => t.slug === slug)
  const frData = getFrTourBySlug(slug)
  if (!tour) return { title: "Circuit non trouvé", robots: { index: false, follow: false } }

  const title = frData?.metaTitle ?? `${frData?.title ?? tour.title} | JaeTravel Expéditions`
  const description = frData?.metaDescription ?? tour.metaDescription ?? tour.description
  const imageUrl = tour.image?.startsWith("http") ? tour.image : `${BASE_URL}${tour.image}`

  return {
    title,
    description,
    keywords: frData?.keywords ?? (Array.isArray(tour.keywords) ? tour.keywords : [tour.keywords ?? ""]),
    alternates: {
      canonical: `${BASE_URL}/fr/tour/${slug}`,
      languages: buildHreflangAlternates(`/tour/${slug}`),
    },
    openGraph: {
      title, description,
      url: `${BASE_URL}/fr/tour/${slug}`,
      locale: "fr_FR",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: frData?.title ?? tour.title }],
    },
  }
}

export default async function FrenchTourPage({ params }: Props) {
  const { slug } = await params
  const tour = tours.find(t => t.slug === slug)
  if (!tour) notFound()
  const frData = getFrTourBySlug(slug)

  const displayTitle = frData?.title ?? tour.title
  const displayDesc = frData?.shortDescription ?? tour.shortDescription ?? tour.description
  const highlights = frData?.highlights ?? tour.highlights ?? []
  const included = frData?.included ?? tour.included ?? []
  const excluded = frData?.excluded ?? tour.excluded ?? []

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: displayTitle,
    description: displayDesc,
    url: `${BASE_URL}/fr/tour/${slug}`,
    image: tour.image?.startsWith("http") ? tour.image : `${BASE_URL}${tour.image}`,
    touristType: ["Adventure", "Wildlife", "Safari"],
    availableLanguage: ["Français","English"],
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/fr/tour/${slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      bestRating: "5",
      reviewCount: tour.reviewCount,
    },
    provider: { "@type": "TravelAgency", "@id": `${BASE_URL}/#organization`, name: "JaeTravel Expéditions" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500">
          <Link href="/fr" className="hover:text-orange-500">Accueil</Link>
          <span>/</span>
          <Link href="/fr/tours" className="hover:text-orange-500">Circuits</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{displayTitle}</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={tour.image || "/placeholder.jpg"} alt={displayTitle} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{tour.country}</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">{tour.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{displayTitle}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">⭐ {tour.rating} ({tour.reviewCount} avis)</span>
            <span>🕐 {tour.duration}</span>
            <span>👥 {tour.groupSize}</span>
            <span>🏔️ {tour.difficulty === "Easy" ? "Facile" : tour.difficulty === "Moderate" ? "Modéré" : tour.difficulty === "Challenging" ? "Difficile" : "Très difficile"}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4">Aperçu du Circuit</h2>
              <p className="text-gray-700 leading-relaxed">{displayDesc}</p>
            </div>

            {highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Points Forts</h2>
                <ul className="space-y-3">
                  {highlights.map((h: string) => (
                    <li key={h} className="flex items-start gap-3 text-gray-700">
                      <span className="text-orange-500 mt-0.5 flex-shrink-0">✓</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {included.length > 0 && (
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="font-bold text-green-800 mb-3">✅ Inclus</h3>
                  <ul className="space-y-2">{included.map((item: string) => <li key={item} className="text-green-700 text-sm flex items-start gap-2"><span>•</span>{item}</li>)}</ul>
                </div>
              )}
              {excluded.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-6">
                  <h3 className="font-bold text-red-800 mb-3">❌ Non inclus</h3>
                  <ul className="space-y-2">{excluded.map((item: string) => <li key={item} className="text-red-700 text-sm flex items-start gap-2"><span>•</span>{item}</li>)}</ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="text-center mb-6">
                {tour.isOnOffer && tour.originalPrice && (
                  <p className="text-gray-400 line-through text-lg">${tour.originalPrice.toLocaleString()}</p>
                )}
                <p className="text-4xl font-bold text-orange-500">${tour.price.toLocaleString()}</p>
                <p className="text-gray-500 text-sm">par personne</p>
              </div>
              <div className="space-y-3 mb-6 text-sm border-t border-b border-gray-100 py-4">
                <div className="flex justify-between"><span className="text-gray-500">Durée</span><span className="font-medium">{tour.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Groupe</span><span className="font-medium">{tour.groupSize}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Difficulté</span><span className="font-medium">{tour.difficulty}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Pays</span><span className="font-medium">{tour.country}</span></div>
              </div>
              <a href={`https://wa.me/254726485228?text=Bonjour%2C%20je%20souhaite%20réserver%20le%20circuit%20${encodeURIComponent(displayTitle)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl transition-colors mb-3">
                💬 Réserver via WhatsApp
              </a>
              <a href="mailto:info@jaetravel.co.ke" className="block w-full border border-orange-500 text-orange-500 hover:bg-orange-50 text-center font-semibold py-3 rounded-xl transition-colors text-sm">
                ✉️ Envoyer un email
              </a>
              <p className="text-center text-xs text-gray-400 mt-4">Réservation flexible · Sans frais d'annulation · Devis gratuit</p>
            </div>
          </div>
        </div>

        {/* Language alternates notice */}
        <div className="mt-12 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
          📖 Cette page est disponible en: <Link href={`/tour/${slug}`} className="underline">English</Link> · <Link href={`/de/tour/${slug}`} className="underline">Deutsch</Link> · <Link href={`/it/tour/${slug}`} className="underline">Italiano</Link> · <Link href={`/hi/tour/${slug}`} className="underline">हिंदी</Link> · <Link href={`/ar/tour/${slug}`} className="underline">العربية</Link> · <Link href={`/zh/tour/${slug}`} className="underline">中文</Link>
        </div>
      </div>
    </>
  )
}
