// app/vehicle-hire/toyota-prado/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"
import PradoHero from "./PradoHero"
import PradoSpecs from "./PradoSpecs"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Location Toyota Prado Kenya & Tanzanie | Safari Self-Drive 4x4 | JAE Travel",
    description:
      "Louez un Toyota Prado pour safari en self-drive au Kenya, en Tanzanie, Ouganda & Rwanda. 4x4 tout équipé avec toit pop-up, GPS et assurance. À partir de 95 $/jour. Réservez maintenant !",
    keywords: [
      "location Toyota Prado Kenya",
      "safari self-drive Kenya",
      "location 4x4 Tanzanie",
      "location Prado Maasai Mara",
      "location véhicule safari",
      "Prado self-drive Afrique Est",
      "location voiture Nairobi avec chauffeur",
      "location Toyota Prado Ouganda",
      "voiture safari toit ouvrant",
      "location 4x4 Arusha",
      "location voiture transfrontalière Afrique Est",
      "Prado location avec GPS",
      "véhicule safari Toyota Prado",
      "location 4x4 self-drive Nairobi",
      "location Prado safari Tanzanie",
      "location voiture safari luxe",
      "self-drive Ouganda Prado",
      "location 4x4 Rwanda",
      "véhicule observation animaux location",
      "circuits self-drive Afrique Est",
      "Prado VX location Kenya",
    ],
    openGraph: {
      title: "Location Toyota Prado Safari Self-Drive | Kenya & Tanzanie",
      description: "Louez un Toyota Prado 4x4 tout équipé pour votre aventure safari en Afrique de l’Est. Self-drive ou avec chauffeur.",
      images: ["/vehicles/toyota-prado-hero.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravelexpeditions.com/fr/toyota-prado",
      languages: {
        'en': 'https://www.jaetravel.co.ke/fr/toyota-prado',           // Main English/global
        'en-US': 'https://www.jaetravel.co.ke/fr/toyota-prado',       // US
        'en-GB': 'https://www.jaetravel.co.ke/fr/toyota-prado',       // UK (optional)
        'en-AU': 'https://www.jaetravel.co.ke/fr/toyota-prado',       // Australia (optional)
        'en-CA': 'https://www.jaetravel.co.ke/fr/toyota-prado',       // Canada (optional)
        'x-default': 'https://www.jaetravel.co.ke/fr/toyota-prado',   // Fallback
      },
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Server Component: Main Page
// ————————————————————————
export default function ToyotaPradoPage() {
  const product = products.find((p) => p.slug === "toyota-prado")
  if (!product) notFound()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero – Client Component */}
      <PradoHero product={product} />

      {/* Introduction Paragraphs */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
          <p>
            La <strong>location Toyota Prado au Kenya</strong> offre le parfait équilibre entre luxe, confort et capacité tout-terrain pour votre aventure en <strong>safari self-drive au Kenya</strong>. 
            Véhicule parmi les plus populaires pour la <strong>location de véhicule safari</strong> en Afrique de l’Est, le Prado allie fiabilité robuste et équipements premium, idéal pour explorer les savanes du <strong>Maasai Mara</strong> comme les terrains montagneux du Rwanda et de l’Ouganda.
          </p>
          
          <p>
            Notre flotte de <strong>location 4x4 en Tanzanie</strong> comprend les derniers modèles Toyota Prado équipés de systèmes 4 roues motrices avancés et de technologie de réponse au terrain. 
            Que vous parcouriez les pistes poussiéreuses du Serengeti ou les chemins boueux de la forêt de Bwindi, le contrôle de traction sophistiqué et l’assistance en descente du Prado garantissent un trajet fluide et sécurisé. 
            La configuration <strong>voiture safari toit ouvrant pop-up</strong> offre une observation optimale des animaux tout en préservant le confort des passagers.
          </p>

          <p>
            Pour les voyageurs recherchant indépendance et flexibilité, nos options <strong>Prado self-drive</strong> vous laissent libre d’explorer l’Afrique de l’Est à votre rythme. 
            Alternativement, notre service de <strong>location voiture Nairobi avec chauffeur</strong> vous fait bénéficier de l’expertise de guides locaux connaissant les meilleurs spots d’observation et les trésors cachés. 
            Les deux formules incluent assurance complète, navigation GPS et assistance routière 24/7 pour votre <strong>location transfrontalière en Afrique de l’Est</strong>.
          </p>

          <p>
            La polyvalence du Toyota Prado en fait le compagnon idéal pour diverses aventures est-africaines. 
            Nos véhicules de <strong>location Toyota Prado en Ouganda</strong> sont spécialement préparés pour les expéditions de trekking gorilles, avec sièges confortables et espace suffisant pour le matériel de camping. 
            De même, nos opérations de <strong>location 4x4 à Arusha</strong> fournissent un transport fiable pour l’ascension du Kilimandjaro ou l’exploration du cratère du Ngorongoro.
          </p>

          <p>
            Chaque <strong>Prado en location avec GPS</strong> est équipé de cartes préchargées de tous les grands parcs nationaux, conservatoires et postes-frontières. 
            Nos véhicules subissent des contrôles de maintenance rigoureux selon les normes Toyota, garantissant une expérience <strong>safari self-drive au Kenya</strong> à la fois sûre et mémorable. 
            Diesel V6 ou essence V8, vous profiterez d’une excellente efficacité carburant et de performances puissantes sur tous les terrains est-africains.
          </p>
        </div>
      </section>

      {/* Why Choose Prado */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Pourquoi louer un Toyota Prado pour votre safari ?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {product.highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-muted/50 p-5 transition-all hover:bg-muted hover:shadow-md"
            >
              <span className="mt-1 text-2xl">✓</span>
              <p className="text-muted-foreground leading-relaxed">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Coverage */}
      <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            Couverture Toyota Prado en Afrique de l’Est
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Circuits safari Kenya & Tanzanie</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Parfait pour les aventures <strong>location Prado Maasai Mara</strong> et les expéditions <strong>safari self-drive au Kenya</strong>. 
                Nos véhicules disposent de tous les permis nécessaires pour les parcs nationaux et conservatoires privés, idéaux autant pour les primo-visiteurs que pour les amateurs de safari expérimentés suivant les routes de la Grande Migration.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                De la <strong>location 4x4 à Arusha</strong> à la <strong>location voiture Nairobi avec chauffeur</strong>, 
                nous proposons des solutions transfrontalières fluides avec documentation complète et assistance aux frontières. 
                L’efficacité carburant du Prado le rend économique pour les longs trajets entre les meilleures destinations fauniques du Kenya et de la Tanzanie.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Aventures Ouganda & Rwanda</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Indispensable pour les besoins en <strong>location Toyota Prado Ouganda</strong> et <strong>location 4x4 Rwanda</strong>. 
                L’intérieur confortable et les suspensions avancées du Prado le rendent parfait pour les longs trajets vers les habitats reculés des primates, tandis que sa taille compacte offre une meilleure maniabilité sur les routes de montagne étroites.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nos services de <strong>location transfrontalière en Afrique de l’Est</strong> incluent toute la documentation nécessaire pour voyager entre l’Ouganda et le Rwanda, 
                avec un accompagnement dédié pour les permis de trekking gorilles et les procédures d’entrée dans les parcs. 
                La fiabilité du Prado vous assure de ne jamais manquer vos sessions programmées d’observation des primates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs – Client Component */}
      <PradoSpecs />

      {/* Rental Options */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Options et Tarifs de Location
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Self-Drive</h3>
            <p className="mb-4 text-3xl font-bold">95 $ <span className="text-lg text-muted-foreground">/ jour</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Kilométrage illimité</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Assurance complète</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> GPS & glacière</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Livraison gratuite</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=prado-self">Réserver Self-Drive</Link>
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Avec Chauffeur</h3>
            <p className="mb-4 text-3xl font-bold">140 $ <span className="text-lg text-muted-foreground">/ jour</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Guide professionnel</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Carburant inclus</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Aide frais de parcs</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Itinéraire personnalisé</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=prado-driver">Réserver avec Chauffeur</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Avis de Nos Clients
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Sarah M.", location: "Nairobi → Maasai Mara", rating: 5, text: "Le Prado a franchi toutes les pistes boueuses sans problème. Le self-drive était un rêve !" },
            { name: "John & Lisa", location: "Arusha → Serengeti", rating: 5, text: "Le toit pop-up nous a offert les meilleures vues sur la faune. Fortement recommandé !" },
            { name: "David K.", location: "Kampala → Bwindi", rating: 5, text: "Le chauffeur était très compétent et la voiture impeccable. Parfait pour le trekking gorilles." }
          ].map((t, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-6">
              <div className="mb-3 flex text-amber-500">
                {[...Array(t.rating)].map((_, j) => <span key={j} className="h-5 w-5 fill-current">★</span>)}
              </div>
              <p className="mb-3 italic text-muted-foreground">"{t.text}"</p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Questions Fréquemment Posées
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="mb-2 text-xl font-bold">{faq.name}</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-primary/10 p-8 text-center">
        <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
          Prêt à Explorer l’Afrique de l’Est en Toyota Prado ?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed">
          Que vous planifiez un <strong>safari self-drive dans le Maasai Mara</strong>, un <strong>voyage familial au Serengeti</strong> 
          ou une <strong>aventure transfrontalière</strong>, le Toyota Prado est le compagnon idéal. 
          Vivez l’excellence en <strong>location de véhicule safari</strong> avec nos services premium de <strong>location Toyota Prado au Kenya</strong> 
          et <strong>location 4x4 en Tanzanie</strong>. Choisissez l’indépendance du <strong>self-drive au Kenya</strong> 
          ou l’expertise de nos chauffeurs-guides professionnels pour un voyage inoubliable en Afrique de l’Est.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Obtenir un Devis Immédiat <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> WhatsApp Maintenant
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          <Mail className="inline h-4 w-4 mr-1" />
          <a href="mailto:info@jaetravelexpeditions.co.ke" className="underline">info@jaetravelexpeditions.co.ke</a>
          {' '}|{' '}
          <Phone className="inline h-4 w-4 mr-1" />
          <a href="tel:+254726485228" className="underline">+254 726 485 228</a>
        </p>
      </section>
    </div>
  )
}