// app/fr/vehicle-hire/[slug]/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { vehicles } from "@/lib/vehicles-data"

interface Props { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return vehicles.map(v => ({ slug: v.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vehicle = vehicles.find(v => v.slug === slug)
  if (!vehicle) return { title: "Vehicle Not Found", robots: { index: false, follow: false } }
  const imageUrl = vehicle.image?.startsWith("http") ? vehicle.image : `${BASE_URL}${vehicle.image}`
  return {
    title: `${vehicle.metaTitle} | JaeTravel Expéditions`,
    description: vehicle.metaDescription,
    keywords: vehicle.keywords,
    alternates: { canonical: `${BASE_URL}/fr/vehicle-hire/${slug}`, languages: buildHreflangAlternates(`/vehicle-hire/${slug}`) },
    openGraph: { title: vehicle.metaTitle, description: vehicle.metaDescription, url: `${BASE_URL}/fr/vehicle-hire/${slug}`, locale: "fr_FR", type: "website", images: [{ url: imageUrl, width: 1200, height: 630, alt: vehicle.name }] },
  }
}

export default async function VehicleHirePage({ params }: Props) {
  const { slug } = await params
  const vehicle = vehicles.find(v => v.slug === slug)
  if (!vehicle) notFound()

  const schema = {
    "@context":"https://schema.org","@type":"Product",
    name:vehicle.name, description:vehicle.description,
    url:`${BASE_URL}/fr/vehicle-hire/${slug}`,
    image:vehicle.image?.startsWith("http")?vehicle.image:`${BASE_URL}${vehicle.image}`,
    brand:{"@type":"Brand",name:"Toyota"},
    offers:{"@type":"Offer",price:vehicle.pricePerDay,priceCurrency:"USD",priceSpecification:{"@type":"UnitPriceSpecification",price:vehicle.pricePerDay,priceCurrency:"USD",unitText:"DAY"},availability:"https://schema.org/InStock"},
    provider:{"@type":"TravelAgency","@id":`${BASE_URL}/#organization`,name:"JaeTravel Expéditions"},
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="bg-gray-50 py-3 px-4 text-sm" dir="ltr">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500">
          <Link href="/fr" className="hover:text-orange-500">Accueil</Link><span>/</span>
          <Link href="/fr/vehicle-hire" className="hover:text-orange-500">Location de Véhicules</Link><span>/</span>
          <span className="text-gray-900 font-medium">{vehicle.name}</span>
        </div>
      </nav>
      <div className="relative h-[45vh] min-h-[350px]">
        <Image src={vehicle.image||"/placeholder.jpg"} alt={vehicle.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white max-w-7xl mx-auto" dir="ltr">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{vehicle.name}</h1>
          <p className="text-lg text-white/90">{vehicle.ideal}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12" dir="ltr">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div><h2 className="text-2xl font-serif font-bold mb-4">Overview</h2><p className="text-gray-700 leading-relaxed">{vehicle.description}</p></div>
            {vehicle.features?.length>0&&(
              <div><h2 className="text-2xl font-serif font-bold mb-4">Caractéristiques</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">{vehicle.features.map((f: string)=><li key={f} className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3"><span className="text-orange-500">✓</span>{f}</li>)}</ul>
              </div>
            )}
            <div><h2 className="text-2xl font-serif font-bold mb-4">Spécifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(vehicle.specifications||{}).map(([k,v])=>(
                  <div key={k} className="bg-gray-50 rounded-xl p-4"><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{k}</p><p className="font-semibold text-gray-800">{v as string}</p></div>
                ))}
              </div>
            </div>
            {vehicle.gallery?.length>0&&(
              <div><h2 className="text-2xl font-serif font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.gallery.slice(0,6).map((img: string,i: number)=>(
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden"><Image src={img} alt={`${vehicle.name} - ${i+1}`} fill className="object-cover hover:scale-105 transition-transform" /></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border p-6">
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-orange-500">${vehicle.pricePerDay}</p>
                <p className="text-gray-500 text-sm">par jour</p>
              </div>
              <div className="space-y-3 mb-6 text-sm border-t border-b py-4">
                <div className="flex justify-between"><span className="text-gray-500">Type</span><span>{vehicle.type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Capacity</span><span>{vehicle.capacity}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Currency</span><span>{vehicle.priceCurrency}</span></div>
              </div>
              <a href={`https://wa.me/254726485228?text=Bonjour%2C%20je%20veux%20louer%20le%20véhicule%3A%20${encodeURIComponent(vehicle.name)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl mb-3">💬 Réserver via WhatsApp</a>
              <a href="mailto:info@jaetravel.co.ke" className="block w-full border border-orange-500 text-orange-500 text-center font-semibold py-3 rounded-xl text-sm">✉️ Email</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
