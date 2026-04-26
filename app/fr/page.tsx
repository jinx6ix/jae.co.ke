// app/fr/page.tsx — French Homepage
// Full SEO-optimized French landing page for JaeTravel
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
import { frTours } from "@/lib/i18n/data/fr/tours-data"

export const metadata: Metadata = {
  title: "Safaris Afrique de l'Est 2026 | Masai Mara, Gorilles & Safari Accessible | JaeTravel Expéditions",
  description: "Réservez votre safari inoubliable au Kenya, Tanzanie, Rwanda et Ouganda. Spécialistes trekking gorilles, Grande Migration Masai Mara 2026 et safaris accessibles fauteuil roulant. Devis gratuit.",
  keywords: ["safari afrique est","safari kenya 2026","trekking gorilles rwanda","grande migration masai mara","safari accessible fauteuil roulant","circuit tanzanie","safari ouganda","safari luxe kenya","safari pas cher kenya","masai mara 2026"],
  alternates: {
    canonical: `${BASE_URL}/fr`,
    languages: buildHreflangAlternates("/"),
  },
  openGraph: {
    title: "Safaris Afrique de l'Est 2026 | JaeTravel Expéditions",
    description: "Réservez votre safari inoubliable au Kenya, Tanzanie, Rwanda et Ouganda avec JaeTravel. Trekking gorilles, Grande Migration et safaris accessibles.",
    url: `${BASE_URL}/fr`,
    locale: "fr_FR",
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Safaris Afrique de l'Est - JaeTravel Expéditions" }],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${BASE_URL}/#organization`,
      name: "JaeTravel Expéditions",
      description: "Agence de safaris en Afrique de l'Est spécialisée dans les voyages accessibles, le trekking des gorilles et les aventures animalières au Kenya, Tanzanie, Rwanda et Ouganda.",
      url: `${BASE_URL}/fr`,
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: { "@type": "PostalAddress", addressCountry: "KE", addressLocality: "Nairobi" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", reviewCount: "723" },
      knowsLanguage: ["Français","English","Deutsch","Italiano","हिंदी","العربية","中文"],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quelle est la meilleure période pour visiter le Masai Mara ?", acceptedAnswer: { "@type": "Answer", text: "La meilleure période pour la Grande Migration est juillet-octobre. Les rivières Mara sont traversées par 1,5 million de gnous en août-septembre. Pour les prédateurs toute l'année, janvier-mars est idéal pour le vêlage." } },
        { "@type": "Question", name: "Proposez-vous des safaris accessibles en fauteuil roulant ?", acceptedAnswer: { "@type": "Answer", text: "Oui ! Nous exploitons la seule flotte de Land Cruisers 4x4 au Kenya avec élévateurs hydrauliques allemands (capacité 400kg), toits escamotables et équipements médicaux pour les safaris accessibles." } },
        { "@type": "Question", name: "Quel est le prix d'un safari au Kenya ?", acceptedAnswer: { "@type": "Answer", text: "Les safaris budget commencent à partir de 450 USD pour 3 jours à Masai Mara. Les safaris de luxe commencent à 3500 USD pour 5 jours. Nous proposons des options pour tous les budgets." } },
        { "@type": "Question", name: "Comment réserver un trekking gorilles au Rwanda ?", acceptedAnswer: { "@type": "Answer", text: "Contactez-nous par WhatsApp (+254726485228) ou email pour réserver votre permis de trekking gorilles. Les permis sont limités à 8 personnes par groupe par jour et doivent être réservés plusieurs mois à l'avance." } },
      ],
    },
  ],
}

export default function FrenchHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image src="/masai-mara-migration.jpg" alt="Grande Migration Masai Mara Kenya" fill className="object-cover opacity-60" priority />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>⭐ 5.0 · 723+ avis vérifiés</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Safaris Inoubliables<br className="hidden md:block" /> en Afrique de l'Est
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Découvrez le Kenya, la Tanzanie, le Rwanda et l'Ouganda avec des guides experts. Spécialistes safaris accessibles fauteuil roulant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fr/tours" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Explorer les circuits →
            </Link>
            <a href="https://wa.me/254726485228?text=Bonjour%2C%20je%20souhaite%20un%20devis%20safari" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors backdrop-blur-sm">
              💬 Devis WhatsApp gratuit
            </a>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "723+", label: "Avis 5 étoiles" },
              { num: "15+", label: "Ans d'expérience" },
              { num: "4 pays", label: "Afrique de l'Est" },
              { num: "24/7", label: "Support client" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-orange-500">{num}</span>
                <span className="text-gray-600 text-sm mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Nos Circuits Populaires</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Des expériences soigneusement sélectionnées pour chaque type de voyageur</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { href:"/fr/tour/masai-mara-luxury-safari", img:"/masai-mara-migration.jpg", title:"Safari Masai Mara", desc:"Grande Migration, Big Five et lodges de luxe", price:"À partir de 3 500 USD", badge:"Populaire" },
            { href:"/fr/tour/gorilla-trekking-experience", img:"/mountain-gorilla-trekking.jpg", title:"Trekking Gorilles", desc:"Rencontre inoubliable avec les gorilles de montagne au Rwanda", price:"Sur demande", badge:"Expérience unique" },
            { href:"/fr/budget-tours/masai-mara-3-days-budget-land-cruiser-safari", img:"/pexels-bharath-kumar-venkatesh-1417371218-30125343-scaled.jpg", title:"Safari Budget 3 Jours", desc:"Masai Mara abordable en Land Cruiser partagé", price:"À partir de 450 USD", badge:"Meilleur rapport qualité-prix" },
          ].map(({ href, img, title, desc, price, badge }) => (
            <Link key={href} href={href} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="relative h-52 overflow-hidden">
                <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{badge}</span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-xl mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-3">{desc}</p>
                <p className="text-orange-500 font-bold">{price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/fr/tours" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Voir tous les circuits →
          </Link>
        </div>
      </section>

      {/* Accessible Safari USP */}
      <section className="bg-orange-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">Notre spécialité unique</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">Safaris Accessibles en Fauteuil Roulant</h2>
              <p className="text-gray-700 mb-6">Nous sommes les seuls opérateurs au Kenya à proposer des Land Cruisers 4x4 entièrement adaptés avec élévateurs hydrauliques allemands (capacité 400 kg), permettant aux voyageurs en fauteuil roulant de rester dans leur fauteuil pendant toute la durée du safari.</p>
              <ul className="space-y-3 mb-8">
                {["Élévateur hydraulique allemand certifié (400 kg)","Toit escamotable pour une observation optimale","Équipement médical à bord","Guides spécialisés et expérimentés","Lodges accessibles sélectionnés"].map(feat => (
                  <li key={feat} className="flex items-start gap-3 text-gray-700"><span className="text-orange-500 mt-0.5">✓</span>{feat}</li>
                ))}
              </ul>
              <Link href="/fr/tour/wheelchair-accessible-safari" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                En savoir plus →
              </Link>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image src="/wheelchair-accessible-tanzania-safari.webp" alt="Safari accessible fauteuil roulant Kenya Land Cruiser élévateur hydraulique" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Nos Destinations</h2>
        <p className="text-center text-gray-600 mb-12">Quatre pays extraordinaires, une expérience inoubliable</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { country:"Kenya", img:"/kenya-safari-landscape.jpg", desc:"Masai Mara, Amboseli, Tsavo", href:"/fr/destinations/kenya" },
            { country:"Tanzanie", img:"/tanzania-serengeti.jpg", desc:"Serengeti, Ngorongoro, Kilimandjaro", href:"/fr/destinations/tanzania" },
            { country:"Rwanda", img:"/rwanda-mountain-gorillas.jpg", desc:"Gorilles de montagne, volcans", href:"/fr/destinations/rwanda" },
            { country:"Ouganda", img:"/uganda-wildlife.jpg", desc:"Chimpanzés, gorilles, Nil", href:"/fr/destinations/uganda" },
          ].map(({ country, img, desc, href }) => (
            <Link key={country} href={href} className="group relative rounded-2xl overflow-hidden h-48 shadow-md hover:shadow-lg transition-shadow">
              <Image src={img} alt={`Safari ${country}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="font-serif font-bold text-lg">{country}</p>
                <p className="text-xs text-white/80">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name:"Marie Dupont", country:"France", review:"Safari au Masai Mara absolument incroyable ! L'équipe de JaeTravel était professionnelle et attentionnée. Nous avons vu les Big Five dès le premier jour. Je recommande vivement.", rating:5 },
              { name:"Jean-Pierre Martin", country:"Belgique", review:"En tant qu'utilisateur de fauteuil roulant, je n'aurais jamais imaginé pouvoir faire un safari. Grâce à JaeTravel et leur véhicule avec élévateur, c'était une expérience de vie inoubliable.", rating:5 },
              { name:"Sophie Lambert", country:"Suisse", review:"Le trekking des gorilles au Rwanda était magique. Guides excellents, logistique parfaite. Un voyage qui change une vie. Merci JaeTravel !", rating:5 },
            ].map(({ name, country, review, rating }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">{Array(rating).fill(0).map((_, i) => <span key={i} className="text-orange-400">★</span>)}</div>
                <p className="text-gray-700 text-sm mb-4 italic">"{review}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 px-4 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Prêt pour votre safari ?</h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">Contactez-nous dès maintenant pour un devis personnalisé gratuit. Nous créons des safaris sur mesure pour chaque budget.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/254726485228?text=Bonjour%2C%20je%20souhaite%20réserver%20un%20safari" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-4 rounded-xl text-lg transition-colors">
            💬 WhatsApp : +254 726 485 228
          </a>
          <a href="mailto:info@jaetravel.co.ke" className="bg-orange-600 hover:bg-orange-700 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            ✉️ info@jaetravel.co.ke
          </a>
        </div>
      </section>
    </>
  )
}
