import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { destinations, getDestinationBySlug } from "@/lib/destinations-data"
import { toursByCountry } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Check, ArrowRight, Accessibility, Leaf, Users } from "lucide-react"

interface DestinationPageProps {
  params: {
    country: string
  }
}

// SCHEMA.ORG ULTRA-COMPLET – OPTIMISÉ POUR GOOGLE RICHI RESULTS + ACCESSIBILITY + SUSTAINABILITY
function generateDestinationSchema(destination: typeof destinations[0]) {
  const pageUrl = `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`
  const currentYear = new Date().getFullYear()

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization + LocalBusiness (repeated for strong entity reinforcement)
      {
        "@type": ["Organization", "LocalBusiness", "TravelAgency"],
        "@id": "https://www.jaetravel.co.ke/#organization",
        "name": "JAE Travel Expeditions – Accessible Luxury Safaris",
        "url": "https://www.jaetravel.co.ke",
        "telephone": "+254726485228",
        "email": "info@jaetravel.co.ke",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "logo": "https://www.jaetravel.co.ke/logo.png",
        "sameAs": [
          "https://www.instagram.com/jaetravel.expeditions",
          "https://www.facebook.com/jaetravelexpeditions",
          "https://wa.me/+254726485228"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "reviewCount": "723"
        }
      },

      // 2. Main Place – très détaillé
      {
        "@type": "Place",
        "@id": `${pageUrl}#place`,
        "name": `${destination.name} – Premier Safari Destination en Afrique de l'Est`,
        "url": pageUrl,
        "description": destination.metaDescription,
        "image": {
          "@type": "ImageObject",
          "url": destination.heroImage,
          "contentUrl": destination.heroImage,
          "name": `Paysage iconique de ${destination.name} – Safari de luxe accessible`,
          "description": `Meilleure vue safari ${destination.name} 2025-2026 – expérience inclusive JAE Travel`,
          "width": "1200",
          "height": "800",
          "inLanguage": "en",
          "creator": { "@type": "Organization", "@id": "https://www.jaetravel.co.ke/#organization" }
        }
      },

      // 3. WebPage + BreadcrumbList renforcé
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `${destination.metaTitle}`,
        "description": destination.metaDescription,
        "inLanguage": "en",
        "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
            { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://www.jaetravel.co.ke/fr/destination" },
            { "@type": "ListItem", "position": 3, "name": destination.name, "item": pageUrl }
          ]
        }
      },

      // 4. FAQPage – mots-clés longue traîne + accessibilité
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Quand est la meilleure période pour visiter ${destination.name} en ${currentYear}–${currentYear + 1} ?`,
            "acceptedAnswer": { "@type": "Answer", "text": destination.bestTimeToVisit }
          },
          {
            "@type": "Question",
            "name": `Est-ce que ${destination.name} propose des safaris accessibles en fauteuil roulant ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui ! JAE Travel est spécialisé dans les safaris 100% accessibles avec véhicules adaptés à élévateur hydraulique, lodges sans barrières et itinéraires pensés pour les personnes à mobilité réduite."
            }
          },
          {
            "@type": "Question",
            "name": `Comment se rendre à ${destination.name} depuis Nairobi ou l'aéroport international ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nous organisons tous les transferts : vols domestiques, transferts 4x4 privés, charters ou véhicules accessibles selon votre itinéraire et vos besoins."
            }
          },
          {
            "@type": "Question",
            "name": `Puis-je combiner ${destination.name} avec d'autres pays pour un safari multi-pays ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolument ! Nous proposons de nombreux circuits combinés (ex: Kenya + Tanzanie, Kenya + Rwanda, Tanzanie + Zanzibar) avec transferts fluides et logistique optimisée."
            }
          }
        ]
      },

      // 5. Offres de tours (TouristTrip) – 3 premiers pour rich cards
      ...(toursByCountry[destination.name as keyof typeof toursByCountry] || []).slice(0, 3).map((tour) => ({
        "@type": "TouristTrip",
        "name": tour.title,
        "description": tour.description?.substring(0, 160) || "",
        "url": `https://www.jaetravel.co.ke${tour.url || `/tours/${tour.slug}`}`,
        "tourBookingPage": `https://www.jaetravel.co.ke/book-now?tour=${tour.slug}`,
        "offers": {
          "@type": "Offer",
          "price": tour.price,
          "priceCurrency": tour.currency || "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2025-01-01",
          "url": `https://www.jaetravel.co.ke${tour.url || `/tours/${tour.slug}/book`}`
        }
      }))
    ]
  }
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    country: destination.slug,
  }))
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { country } = await params
  const destination = getDestinationBySlug(country)

  if (!destination) {
    return { title: "Destination Introuvable | JAE Travel Expeditions" }
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    keywords: destination.keywords,
    alternates: {
      canonical: `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,
      languages: {
        'en': `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,           // Main English/global
        'en-US': `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,       // US
        'en-GB': `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,       // UK (optional)
        'en-AU': `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,       // Australia (optional)
        'en-CA': `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,      // Canada (optional)
        'x-default': `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,   // Fallback
      },
    },
    openGraph: {
      title: destination.metaTitle,
      description: destination.metaDescription,
      url: `https://www.jaetravel.co.ke/fr/destination/${destination.slug}`,
      siteName: "JAE Travel Expeditions",
      images: [
        {
          url: destination.heroImage,
          width: 1200,
          height: 800,
          alt: `${destination.name} – Meilleur Safari Accessible Afrique de l'Est`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [destination.heroImage],
    },
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { country } = await params
  const destination = getDestinationBySlug(country)

  if (!destination) {
    notFound()
  }

  const countryTours = toursByCountry[destination.name as keyof typeof toursByCountry] || []

  return (
    <>
      {/* SCHEMA JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateDestinationSchema(destination)) }}
      />

      <div className="pb-16">
        {/* Hero – très fort visuellement + SEO */}
        <div className="relative h-[70vh] min-h-[520px] md:h-[80vh]">
          <Image
            src={destination.heroImage || "/placeholder.svg"}
            alt={`${destination.name} – Paysage safari iconique – JAE Travel Expeditions`}
            fill
            className="object-cover brightness-[0.82]"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-16 md:pb-20">
            <div className="mb-4 flex items-center gap-3 text-base font-medium text-white/90">
              <Link href="/destinations" className="hover:underline">
                Destinations
              </Link>
              <span className="opacity-70">/</span>
              <span className="font-semibold">{destination.name}</span>
            </div>
            <h1 className="mb-5 font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl text-balance">
              Découvrez {destination.name}
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl opacity-90">Safari de Luxe Accessible</span>
            </h1>
            <p className="max-w-3xl text-xl md:text-2xl text-white/90 leading-relaxed font-light">
              {destination.description}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-20">
          {/* Overview + SEO content boost */}
          <div className="mb-20 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-7 font-serif text-4xl md:text-5xl font-bold">
                À propos de {destination.name}
              </h2>
              <div className="prose prose-lg prose-headings:font-serif max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {destination.longDescription}
                </p>

                {/* Contenu SEO longue traîne */}
                <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    {destination.name} est l’une des destinations safari les plus emblématiques d’<strong>Afrique de l’Est</strong>.
                    Que vous rêviez de la Grande Migration, du trekking des gorilles de montagne, des plages de Zanzibar ou d’un safari
                    accessible en fauteuil roulant, cette région offre des expériences uniques au monde.
                  </p>

                  <p>
                    Chez <strong>JAE Travel Expeditions</strong>, nous avons conçu des itinéraires qui combinent luxe, accessibilité et
                    respect de l’environnement. Nos véhicules 4×4 équipés d’élévateurs hydrauliques, nos lodges sans barrières et
                    nos guides experts font de chaque voyage une expérience inclusive et mémorable.
                  </p>

                  <p>
                    Réservez dès maintenant votre safari {destination.name} {new Date().getFullYear()}–{new Date().getFullYear() + 1} et vivez
                    l’Afrique authentique, durable et accessible.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar rapide */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardContent className="p-7">
                  <div className="mb-7">
                    <div className="mb-4 flex items-center gap-3 text-primary">
                      <Calendar className="h-6 w-6" />
                      <h3 className="text-xl font-bold">Meilleure période</h3>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {destination.bestTimeToVisit}
                    </p>
                  </div>

                  <div className="border-t border-border pt-7">
                    <div className="mb-4 flex items-center gap-3 text-primary">
                      <MapPin className="h-6 w-6" />
                      <h3 className="text-xl font-bold">Faits rapides</h3>
                    </div>
                    <ul className="space-y-3 text-base text-muted-foreground">
                      <li>• Région : Afrique de l’Est</li>
                      <li>• Monnaie : Monnaie locale + USD</li>
                      <li>• Langue : Anglais largement parlé</li>
                      <li>• Visa : Souvent à l’arrivée</li>
                    </ul>
                  </div>

                  <Button asChild className="mt-8 w-full text-lg py-6" size="lg">
                    <Link href="/contact">Planifiez votre voyage</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pourquoi choisir JAE Travel pour {destination.name} */}
          <section className="mb-20 py-14 bg-gradient-to-br from-muted/40 to-muted/10 rounded-3xl">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
                Pourquoi visiter {destination.name} avec JAE Travel ?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Accessibility,
                    title: "100% Accessible",
                    desc: "Véhicules avec élévateur, lodges sans marches, itinéraires adaptés aux fauteuils roulants et PMR."
                  },
                  {
                    icon: Leaf,
                    title: "Tourisme Durable",
                    desc: "Partenariats avec communautés locales, conservation active et empreinte carbone minimisée."
                  },
                  {
                    icon: Users,
                    title: "Expérience Personnalisée",
                    desc: "Itinéraires sur mesure, guides experts francophones/anglophones, luxe discret."
                  }
                ].map((item, i) => (
                  <Card key={i} className="bg-background/60 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-8 text-center">
                      <item.icon className="h-12 w-12 mx-auto mb-6 text-primary" />
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Tours disponibles */}
          <section className="mb-20">
            <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Nos Meilleurs Safaris à {destination.name}
              </h2>
              <Button asChild variant="outline" size="lg">
                <Link href="/tours">
                  Voir tous les circuits <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {countryTours.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {countryTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="p-16 text-center">
                  <p className="text-xl text-muted-foreground mb-6">
                    Aucun circuit disponible pour le moment dans cette destination.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/contact">Demander un circuit sur mesure</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Planning & Durabilité */}
          <section className="mb-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-10 md:p-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
              Préparez Votre Aventure à {destination.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6">Conseils Pratiques</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Prévoyez votre valise en fonction des saisons, emportez des vêtements neutres pour les safaris, des chaussures confortables et un adaptateur universel.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nous vous recommandons de réserver 6 à 12 mois à l’avance pour les permis de trekking gorilles, les lodges de luxe et les saisons hautes.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Tourisme Responsable</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Chaque voyage soutient directement la préservation de la faune et le développement communautaire.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nous travaillons uniquement avec des partenaires locaux, employons des guides issus des communautés et appliquons des règles strictes de protection de l’environnement.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="rounded-3xl bg-primary p-10 md:p-16 text-center text-primary-foreground">
            <h2 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-balance">
              Prêt à Vivre {destination.name} ?
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-primary-foreground/90">
              Laissez-nous créer pour vous le safari de rêve à {destination.name} : luxe, accessibilité, authenticité et respect de la nature.
              Contactez-nous dès aujourd’hui pour votre aventure personnalisée en Afrique de l’Est {new Date().getFullYear()}–{new Date().getFullYear() + 1}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-7">
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-lg px-10 py-7 hover:bg-primary-foreground/10"
              >
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  WhatsApp +254 726 485 228
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}