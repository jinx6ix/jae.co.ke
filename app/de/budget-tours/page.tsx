import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/budget-tours/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, DollarSign, Users, Shield, Phone, MapPin, Calendar, Camera,
  Star, Award, Clock, CreditCard, Headphones, Gift, Tag, Percent,
  Truck, Waves, Mountain, TreePine, Sun, ChevronRight, Heart,
  Mail
} from "lucide-react";
import BudgetToursClient from "./BudgetToursClient";

// Importiere die Budget-Tour-Daten, um echte Tour-Karten ins Schema aufzunehmen
import { budgetTours } from "@/lib/i18n/data/de/budget-tours-data";

// Statistiken berechnen
const totalTours = budgetTours.length;
const avgRating = totalTours > 0 
  ? (budgetTours.reduce((sum, t) => sum + (t.rating || 4.5), 0) / totalTours).toFixed(1)
  : "4.8";
const minPrice = totalTours > 0 
  ? Math.min(...budgetTours.map(t => t.price))
  : 450;
const maxPrice = totalTours > 0 
  ? Math.max(...budgetTours.map(t => t.price))
  : 1200;

// ============================================
// METADATEN - Titel: 60 Zeichen | Beschreibung: 115 Zeichen
// ============================================
export const metadata: Metadata = {
  title: "Budget Safaris Kenia 2026 | Günstige Touren ab 950$",
  description: "Entdecken Sie die besten Budget-Safaris in Kenia 2026. Masai Mara, Nakuru, Naivasha & Amboseli. Erschwingliche Gruppen- und Privatsafaris ab 950$. Jetzt buchen!",
  keywords: [
    "Budget Safaris Kenia 2026", "Privatsafaris Kenia", "Zeltlager Masai Mara",
    "Wildbeestwanderung Safari", "Budget Safaris Masai Mara", "Masai Mara National Reserve Touren",
    "Tierbeobachtung Kenia", "unvergessliche Safari-Erlebnisse", "Gruppensafaris Kenia",
    "Mara Safari Pakete", "Kenia Reiseveranstalter", "Safari in Kenia 2026",
    "Löwen Leoparden beobachten", "erschwingliche Kenia Safari", "günstige Masai Mara Touren",
    "Budget Touren in Kenia", "günstige Safaris", "Budget Safaris in Kenia",
    "günstige Safaris in Kenia", "günstige Touren in Kenia", "erschwingliche Safaris Kenia",
    "Gruppenanschluss Safaris Kenia", "Camping Safaris Kenia", "Low-Cost Kenia Touren",
    "Ostafrika Budget Safaris", "Masai Mara Budget Pakete", "Amboseli günstige Touren",
    "Lake Nakuru erschwingliche Safaris", "Tsavo Budget Tierbeobachtung", "Big Five Budget Beobachtung",
    "Overland Safaris Kenia", "geteilte Safari Touren"
  ].join(", "),
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/budget-tours",
    languages: {
      'de': 'https://www.jaetravel.co.ke/de/budget-tours',
      'en': 'https://www.jaetravel.co.ke/budget-tours',
      'x-default': 'https://www.jaetravel.co.ke/budget-tours',
    },
  },
  openGraph: {
    title: "Budget Safaris Kenia 2026 | Günstige Masai Mara Touren ab 950$",
    description: "Erleben Sie die große Wildbeestwanderung auf erschwinglichen Budget-Safaris. Gruppen- und Privatsafaris in Masai Mara, Nakuru, Naivasha & Amboseli. Jetzt buchen!",
    url: "https://www.jaetravel.co.ke/de/budget-tours",
    siteName: "JaeTravel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg",
        width: 1200,
        height: 630,
        alt: "Wildbeestwanderung im Masai Mara National Reserve - Budget Safaris Kenia, günstige Safaris in Kenia",
        type: "image/jpeg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Safaris Kenia 2026 | Günstige Masai Mara Touren ab 950$",
    description: "Nehmen Sie an unseren Gruppen- oder Privatsafaris teil, um die große Wanderung zu erleben. Erschwingliche Zeltlager mit unvergesslichen Erlebnissen.",
    images: ["https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg"],
    site: "@jaetravel",
    creator: "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "og:price:amount": "450",
    "og:price:currency": "USD",
  },
};

const absoluteUrl = "https://www.jaetravel.co.ke/de/budget-tours";
const heroImage = "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg";

// Begrenzung auf die ersten 6 Touren für das Schema (um zu große JSON zu vermeiden)
const featuredTours = budgetTours.slice(0, 6);

// ============================================
// UMFASSENDES SCHEMA MARKUP
// ============================================
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction für Masai Mara
    {
      "@type": "TouristAttraction",
      "@id": "https://www.jaetravel.co.ke/#attraction",
      "name": "Masai Mara National Reserve",
      "description": "Weltberühmtes Wildreservat in Kenia, bekannt für die große Wildbeestwanderung, Budget-Safaris in Kenia und günstige Touren in Kenia",
      "image": heroImage,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -1.4933,
        "longitude": 35.1431
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "Masai Mara"
      }
    },

    // 2. Organization + LocalBusiness (mit aggregateRating & einzelnen Bewertungen für Sterne)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JaeTravel Expeditions",
      "description": "Professioneller Kenia-Reiseveranstalter mit Spezialisierung auf Budget-Safaris, günstige Safaris in Kenia, Budget-Touren in Kenia und unvergessliche Safari-Erlebnisse",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "email": "info@jaetravel.co.ke",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE",
        "addressLocality": "Nairobi"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": ["Deutsch", "Englisch", "Swahili"]
      },
      "sameAs": [
        "https://www.facebook.com/jaetravelexpeditions",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravelke"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "David Chen" },
          "datePublished": "2025-08-20",
          "reviewBody": "JaeTravel hat unsere Budget-Masai-Mara-Safari unvergesslich gemacht! Ausgezeichnete Guides, komfortable Camps und unglaubliche Tierbeobachtungen – besonders die Wildbeestwanderung."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah Johnson" },
          "datePublished": "2025-07-15",
          "reviewBody": "Perfekte Gruppensafari mit JaeTravel! Günstiger Preis, tolles Zeltlager, und unser Guide hat Löwen, Leoparden und die Big Five gesichtet."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Michael Thompson" },
          "datePublished": "2025-09-05",
          "reviewBody": "Beste Budget-Safari-Erfahrung in Kenia! JaeTravel bot ein hervorragendes Preis-Leistungs-Verhältnis – professionelles Team, bequemer Transport und atemberaubende Ausblicke."
        }
      ]
    },

    // 3. WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "JaeTravel Expeditions - Kenia Reiseveranstalter",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" }
    },

    // 4. WebPage
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl}#webpage`,
      "url": absoluteUrl,
      "name": "Budget Safaris Kenia 2026 | Günstige Masai Mara Touren ab 950$",
      "description": "Buchen Sie Budget-Safaris zum Masai Mara National Reserve für unvergessliche Erlebnisse. Privatsafaris & Gruppensafaris mit Zeltlager-Unterkünften. Erleben Sie Löwen, Leoparden und die große Wanderung.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": heroImage,
        "width": 1200,
        "height": 630,
        "caption": "Wildbeestwanderung im Masai Mara - Budget Safaris Kenia"
      },
      "breadcrumb": { "@id": `${absoluteUrl}#breadcrumb` }
    },

    // 5. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.jaetravel.co.ke/" },
        { "@type": "ListItem", "position": 2, "name": "Budget Safaris Kenia", "item": absoluteUrl }
      ]
    },

    // 6. Product Schema für Budget Touren
    {
      "@type": "Product",
      "@id": `${absoluteUrl}#product`,
      "name": "Budget Safari Pakete Kenia 2026",
      "description": "Erschwingliche Safari-Pakete nach Masai Mara, Lake Nakuru, Amboseli und Tsavo. Inklusive Pirschfahrten, Zeltlager-Unterkunft und fachkundigen Guides.",
      "image": heroImage,
      "brand": {
        "@type": "Brand",
        "name": "JaeTravel Expeditions"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "offerCount": totalTours,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating,
        "reviewCount": "723",
        "bestRating": "5",
      },
      "category": "Budget Safari Touren"
    },

    // 7. ItemList mit TouristTrip-Elementen
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl}#budget-tours-list`,
      "name": "Budget Safari Pakete Kenia 2026 - Günstige Masai Mara Touren",
      "description": "Erschwingliche Safari-Pakete ab 950$",
      "numberOfItems": totalTours,
      "itemListElement": featuredTours.map((tour, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristTrip",
          "@id": `https://www.jaetravel.co.ke${tour.url}#trip`,
          "name": tour.title,
          "description": tour.shortDescription || tour.description,
          "image": `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`,
          "duration": tour.duration,
          "touristType": ["Budgetreisende", "Abenteuersuchende", "Wildlife-Enthusiasten"],
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": tour.itinerary?.map((item, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": item
            })) || []
          },
          "offers": {
            "@type": "Offer",
            "url": `https://www.jaetravel.co.ke${tour.url}`,
            "priceCurrency": "USD",
            "price": tour.price.toString(),
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "@id": "https://www.jaetravel.co.ke/#organization"
            }
          }
        }
      }))
    },

    // 8. FAQPage
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl}#faqpage`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was ist in Ihren Budget-Safaris zum Masai Mara National Reserve enthalten?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unsere Budget-Safaris beinhalten Unterkunft in komfortablen Zeltlagern, alle Pirschfahrten im Masai Mara National Reserve, professionelle Guides, Mahlzeiten und Transport. Erleben Sie Löwen, Leoparden und die Wildbeestwanderung bei diesen unvergesslichen Erlebnissen mit günstigen Safaris in Kenia."
          }
        },
        {
          "@type": "Question",
          "name": "Bieten Sie Privatsafaris oder Gruppensafaris an?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja! Wir bieten sowohl Privatsafaris für personalisierte Reiserouten als auch Gruppensafaris für preisbewusste Reisende. Alle unsere Kenia-Touren bieten fachkundige Guides und ausgezeichnete Möglichkeiten zur Tierbeobachtung."
          }
        },
        {
          "@type": "Question",
          "name": "Wann ist die beste Zeit für die Beobachtung der Wildbeestwanderung?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Die große Wildbeestwanderung im Masai Mara National Reserve erreicht ihren Höhepunkt von Juli bis Oktober. Unsere Budget-Safaris in dieser Zeit bieten unglaubliche Tierbeobachtungen von Millionen von Wildbeesten, die den Mara-Fluss überqueren."
          }
        },
        {
          "@type": "Question",
          "name": "Welche Art von Unterkunft nutzen Sie für Budget-Safaris?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wir nutzen komfortable Zeltlager, die ein authentisches Safari-Erlebnis bieten und gleichzeitig erschwinglich bleiben. Diese Camps sind strategisch günstig für optimale Tierbeobachtung im Masai Mara gelegen."
          }
        },
        {
          "@type": "Question",
          "name": "Welche Tierwelt können wir auf einer Mara-Safari erwarten?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Das Masai Mara National Reserve ist berühmt für seine Big Five-Sichtungen, einschließlich Löwen und Leoparden. Während der Migrationssaison erleben Sie Millionen von Wildbeesten, Zebras und die Jagd der Raubtiere."
          }
        },
        {
          "@type": "Question",
          "name": "Warum sollte ich JaeTravel als meinen Kenia-Reiseveranstalter wählen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Als erfahrener Kenia-Reiseveranstalter sind wir auf die Schaffung unvergesslicher Safari-Erlebnisse zu erschwinglichen Preisen spezialisiert. Unsere Expertise stellt sicher, dass Sie die besten Möglichkeiten zur Tierbeobachtung mit Budget-Touren in Kenia erhalten."
          }
        }
      ]
    },

    // 9. VideoObject Schema
    {
      "@type": "VideoObject",
      "@id": `${absoluteUrl}#video`,
      "name": "Budget Safari im Masai Mara - Höhepunkte der Wildbeestwanderung",
      "description": "Erleben Sie den Nervenkitzel der großen Wildbeestwanderung auf einer Budget-Safari in Kenia. Sehen Sie Löwen, Leoparden und Flussüberquerungen.",
      "thumbnailUrl": "https://www.jaetravel.co.ke/migration-thumb.jpg",
      "uploadDate": "2025-01-01T00:00:00Z",
      "duration": "PT2M30S",
      "contentUrl": "https://www.jaetravel.co.ke/videos/budget-safari-masai-mara.mp4",
      "embedUrl": "https://www.youtube.com/embed/budget-safari-id",
      "publisher": {
        "@type": "Organization",
        "name": "JaeTravel Expeditions"
      }
    }
  ]
};

// ============================================
// HAUPTKOMPONENTE DER SEITE
// ============================================
export default function BudgetToursPage() {
  return (
    <div className="pb-16">
      {/* Strukturierte Daten - jetzt mit echten Tourkarten */}
      <Script
        id="budget-tours-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fantasticafrica-20240806-0001.jpg"
            alt="Wildbeestwanderung zur Tierbeobachtung im Masai Mara National Reserve - Budget Safaris Kenia, günstige Safaris in Kenia"
            fill
            className="object-cover brightness-50"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            quality={90}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          {/* H1 - Primäres Keyword */}
          <h1 className="mb-6 font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            <strong>Budget Safaris Kenia 2026</strong> — <span className="text-primary">ab 950$</span>
          </h1>
          {/* H2 - Sekundäres Keyword */}
          <h2 className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Erleben Sie die spektakuläre <strong>Wildbeestwanderung</strong> im <strong>Masai Mara National Reserve</strong> auf unseren erschwinglichen <strong>Budget-Safaris</strong>. 
            Wählen Sie zwischen spannenden <strong>Gruppensafaris</strong> oder persönlichen <strong>Privatsafaris</strong> mit komfortablen <strong>Zeltlagern</strong>. 
            Genießen Sie unglaubliche <strong>Tierbeobachtungen</strong> von <strong>Löwen, Leoparden</strong> und den Big Five für ein <strong>unvergessliches Erlebnis</strong>.
          </h2>
          
          {/* Preisangabe */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8 inline-flex items-center gap-4 mx-auto">
            <div className="text-center">
              <p className="text-sm opacity-80">Start ab</p>
              <p className="text-3xl font-bold">${minPrice}</p>
            </div>
            <div className="w-px h-10 bg-white/30"></div>
            <div className="text-center">
              <p className="text-sm opacity-80">Durchschnitt</p>
              <p className="text-3xl font-bold">${Math.round((minPrice + maxPrice) / 2)}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg bg-green-600 hover:bg-green-700">
              <Link href="#tours">Alle <strong>Mara Safari</strong> Pakete anzeigen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/contact">Unseren <strong>Reiseveranstalter</strong> heute kontaktieren</Link>
            </Button>
          </div>

          {/* Vertrauenssiegel */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Bestpreisgarantie</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Gruppen- & Privatsafaris</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Support</span>
          </div>
        </div>
      </section>

      {/* ========== STATISTIK SECTION ========== */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">{totalTours}+</div>
              <div className="text-gray-600">Budget Safari Pakete</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">723+</div>
              <div className="text-gray-600">Zufriedene Reisende</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">{avgRating}★</div>
              <div className="text-gray-600">Durchschnittliche Bewertung</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">${minPrice}</div>
              <div className="text-gray-600">Startpreis</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EINFÜHRUNGS SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          {/* Haupttitel */}
          <h2 className="mb-6 font-serif text-5xl md:text-6xl font-bold tracking-tight">
            Entdecken Sie die besten <strong className="text-green-600">Budget Safaris in Kenia</strong> für 2026
          </h2>

          {/* Untertitel */}
          <div className="max-w-5xl mx-auto pl-70 mb-12">
            <h3 className="text-2xl text-gray-600 font-light">
              Erschwingliche Wildtierabenteuer mit komfortablen Zeltlagern und erfahrenen Guides
            </h3>
          </div>

          {/* Absätze in eigenen Divs mit pl-60 und breiterem max-w-5xl für längere Zeilen */}
          <div className="max-w-5xl mx-auto pl-60 space-y-6">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Planen Sie Ihre Traum-<strong>Safari in Kenia</strong>? Als führender <strong>Kenia-Reiseveranstalter</strong> 
                bietet JaeTravel Expeditions außergewöhnliche <strong>Budget-Safaris</strong>, <strong>günstige Safaris in Kenia</strong> 
                und <strong>Budget-Touren in Kenia</strong> zum <strong>Masai Mara National Reserve</strong> an.
              </p>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Ob Sie die Kameradschaft von <strong>Gruppensafaris</strong> oder die Exklusivität von 
                <strong>Privatsafaris</strong> bevorzugen, wir schaffen <strong>unvergessliche Erlebnisse</strong>, die Ihr Budget nicht sprengen.
              </p>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Unsere <strong>Mara-Safari</strong>-Pakete beinhalten komfortable <strong>Zeltlager</strong>-Unterkünfte 
                und fachkundig geführte <strong>Tierbeobachtungs</strong>-Fahrten. Erleben Sie die spektakuläre 
                <strong>Wildbeestwanderung</strong> und entdecken Sie majestätische <strong>Löwen, Leoparden</strong> und andere Wildtiere 
                auf unseren sorgfältig zusammengestellten <strong>Kenia-Touren</strong>.
              </p>
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="pt-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-10 py-7 text-lg rounded-full"
            >
              <Link href="#tours">
                Entdecken Sie unsere <strong>günstigen Safaris in Kenia</strong> Pakete
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== SCHLÜSSELFUNKTIONEN SECTION ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Ihr perfektes <strong>Budget-Touren in Kenia</strong> Erlebnis
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MapPin className="h-7 w-7 text-green-600" />,
                title: "Masai Mara National Reserve",
                desc: "Beste <strong>Tierbeobachtung</strong> in Kenias berühmtester Wildtier-Oase",
              },
              {
                icon: <Calendar className="h-7 w-7 text-green-600" />,
                title: "Wildbeestwanderung",
                desc: "Erleben Sie die große Wanderung auf unseren speziell terminierten <strong>Mara-Safari</strong>-Paketen",
              },
              {
                icon: <Users className="h-7 w-7 text-green-600" />,
                title: "Flexible Safari-Optionen",
                desc: "Wählen Sie zwischen <strong>Privatsafaris</strong> oder erschwinglichen <strong>Gruppensafaris</strong>",
              },
              {
                icon: <Camera className="h-7 w-7 text-green-600" />,
                title: "Löwen & Leoparden",
                desc: "Hervorragende Chancen, <strong>Löwen, Leoparden</strong> und die gesamten Big Five zu sehen",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DYNAMISCHE TOURS GRID ========== */}
      <div id="tours">
        <BudgetToursClient />
      </div>

      {/* ========== WARUM UNS SECTION ========== */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Warum JaeTravel für Ihre <strong>günstigen Safaris in Kenia</strong> wählen
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <DollarSign className="h-7 w-7 text-green-600" />,
                title: "Bester Wert für Budget-Safaris",
                desc: "Start ab 950$ — erstklassige <strong>Tierbeobachtungs</strong>-Erlebnisse zu erschwinglichen Preisen.",
              },
              {
                icon: <Users className="h-7 w-7 text-green-600" />,
                title: "Erfahrener Reiseveranstalter",
                desc: "Als professioneller <strong>Kenia-Reiseveranstalter</strong> bieten wir sachkundige Guides für <strong>unvergessliche Erlebnisse</strong>.",
              },
              {
                icon: <Shield className="h-7 w-7 text-green-600" />,
                title: "Authentische Zeltlager",
                desc: "Übernachten Sie in komfortablen <strong>Zeltlagern</strong>, die Sie näher an die Natur bringen.",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== UNTERKUNFTS SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Authentische <strong>Zeltlager</strong> für <strong>Budget Safaris in Kenia</strong>
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold">Erleben Sie das echte Afrika auf günstigen Touren</h3>
              <div className="pl-60 mb-6">
                <p className="text-lg leading-relaxed">
                  Unsere sorgfältig ausgewählten <strong>Zeltlager</strong> bieten die perfekte Mischung aus Abenteuer und Komfort. Wachen Sie mit den Klängen des afrikanischen Busches auf und genießen Sie:
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Bequeme Betten mit hochwertiger Bettwäsche",
                  "Private Badezimmer",
                  "Solarbetriebene Beleuchtung",
                  "Sichere Unterkünfte an erstklassigen Standorten",
                  "Abendliche Lagerfeuer unter dem Sternenhimmel",
                  "Nähe zu <strong>Tierbeobachtungs</strong>-Gebieten"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-2xl font-bold">Perfekt für alle Safari-Stile</h3>
              <div className="pl-60 mb-6">
                <p className="text-lg leading-relaxed">
                  Ob Sie auf <strong>Privatsafaris</strong> oder unseren beliebten <strong>Gruppensafaris</strong> unterwegs sind, unsere <strong>Zeltlager</strong> bieten:
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Gemeinschaftsbereiche zum Kennenlernen anderer Reisender",
                  "Private Rückzugsorte für Paare und Familien",
                  "Sachkundiges Camp-Personal",
                  "Täglich frisch zubereitete, köstliche Mahlzeiten",
                  "Strategische Lage zur Beobachtung der <strong>Wildbeestwanderung</strong>",
                  "Einfacher Zugang zum <strong>Masai Mara National Reserve</strong>"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INKLUSIVE / EXKLUSIVE SECTION ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Ihr <strong>unvergessliches Erlebnis</strong> beinhaltet
              </h2>
              <ul className="space-y-3">
                {[
                  "Alle <strong>Tierbeobachtungs</strong>-Fahrten mit 4x4-Fahrzeugen",
                  "Unterkunft in authentischen <strong>Zeltlagern</strong>",
                  "Professionelle Guides unseres <strong>Reiseveranstalter</strong>-Teams",
                  "Alle Parkgebühren für das <strong>Masai Mara National Reserve</strong>",
                  "Vollpension während Ihrer <strong>Safari in Kenia</strong>",
                  "Transport für <strong>Privatsafaris</strong> oder <strong>Gruppensafaris</strong>",
                  "Möglichkeit, die <strong>Wildbeestwanderung</strong> zu erleben",
                  "Chancen, <strong>Löwen, Leoparden</strong> und die Big Five zu sehen"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Planen Sie Ihre perfekten <strong>günstigen Touren in Kenia</strong>
              </h2>
              <ul className="space-y-3">
                {[
                  "Internationale Flüge nach Kenia",
                  "Reiseversicherung (dringend empfohlen)",
                  "Optionale Aktivitäten wie Heißluftballonfahrten",
                  "Alkoholische Getränke und persönliche Ausgaben",
                  "Trinkgelder für Guides und Camp-Personal",
                  "Visagebühren für die Einreise nach Kenia",
                  "Einzelzuschläge für Alleinreisende",
                  "Zusätzliche Nächte außerhalb des Reiseplans"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MIGRATIONS-FOKUS SECTION ========== */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Erleben Sie die spektakuläre <strong>Wildbeestwanderung</strong> auf Budget-Touren
          </h2>
          <div className="mx-auto max-w-5xl">
            <div className="pl-70 mb-8">
              <p className="text-lg leading-relaxed">
                Die große <strong>Wildbeestwanderung</strong> ist eines der beeindruckendsten Naturschauspiele. Jedes Jahr durchqueren über 1,5 Millionen Wildbeest zusammen mit Zebras und Gazellen das <strong>Masai Mara National Reserve</strong>.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Beste Beobachtungszeiten</h3>
                  <ul className="space-y-2">
                    <li><strong>Juli-Oktober:</strong> Flussüberquerungen im Masai Mara</li>
                    <li><strong>November-Dezember:</strong> Beginn der südlichen Migration</li>
                    <li><strong>Januar-März:</strong> Kalbezeit in der Serengeti</li>
                    <li><strong>April-Juni:</strong> Grumeti-Flussüberquerungen</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Raubtieraktivität</h3>
                  <p>Während der Migration erleben Sie unglaubliche Räuber-Beute-Interaktionen. Unsere <strong>Tierbeobachtungs</strong>-Fahrten konzentrieren sich auf Gebiete, in denen <strong>Löwen, Leoparden</strong>, Geparden und Hyänen am aktivsten sind.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Was unsere Gäste über <strong>Budget Safaris in Kenia</strong> sagen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "David Chen", location: "Singapur", text: "JaeTravel hat unsere Budget-Masai-Mara-Safari unvergesslich gemacht! Ausgezeichnete Guides, komfortable Camps und unglaubliche Tierbeobachtungen – besonders die Wildbeestwanderung.", rating: 5 },
              { name: "Sarah Johnson", location: "Vereinigtes Königreich", text: "Perfekte Gruppensafari mit JaeTravel! Günstiger Preis, tolles Zeltlager, und unser Guide hat Löwen, Leoparden und die Big Five gesichtet.", rating: 5 },
              { name: "Michael Thompson", location: "Australien", text: "Beste Budget-Safari-Erfahrung in Kenia! JaeTravel bot ein hervorragendes Preis-Leistungs-Verhältnis – professionelles Team, bequemer Transport und atemberaubende Ausblicke.", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-md">
                <div className="flex mb-4">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Häufig gestellte Fragen zu <strong>Budget Safaris Kenia</strong>
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "Was ist in Ihren Budget-Safaris zum Masai Mara enthalten?", a: "Unsere Budget-Safaris beinhalten Unterkunft in komfortablen Zeltlagern, alle Pirschfahrten im Masai Mara National Reserve, professionelle Guides, Mahlzeiten und Transport. Erleben Sie Löwen, Leoparden und die Wildbeestwanderung bei diesen unvergesslichen Erlebnissen." },
              { q: "Bieten Sie Privatsafaris oder Gruppensafaris an?", a: "Ja! Wir bieten sowohl Privatsafaris für personalisierte Reiserouten als auch Gruppensafaris für preisbewusste Reisende. Alle unsere Kenia-Touren bieten fachkundige Guides und ausgezeichnete Möglichkeiten zur Tierbeobachtung." },
              { q: "Wann ist die beste Zeit für die Beobachtung der Wildbeestwanderung?", a: "Die große Wildbeestwanderung im Masai Mara erreicht ihren Höhepunkt von Juli bis Oktober. Unsere Budget-Safaris in dieser Zeit bieten unglaubliche Tierbeobachtungen von Millionen von Wildbeesten, die den Mara-Fluss überqueren." },
              { q: "Welche Art von Unterkunft nutzen Sie für Budget-Safaris?", a: "Wir nutzen komfortable Zeltlager, die ein authentisches Safari-Erlebnis bieten und gleichzeitig erschwinglich bleiben. Diese Camps sind strategisch günstig für optimale Tierbeobachtung im Masai Mara gelegen." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINALE CTA SECTION ========== */}
      <section className="py-16 bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Bereit für Ihr <strong>unvergessliches Safari-Erlebnis</strong>?
          </h2>
          <div className="max-w-5xl mx-auto pl-70 mb-8">
            <p className="text-lg leading-relaxed">
              Ab ${minPrice} pro Person – sichern Sie sich Ihren Platz auf unseren <strong>Budget-Safaris</strong> zum <strong>Masai Mara National Reserve</strong>. 
              Wählen Sie <strong>Privatsafaris</strong> für Exklusivität oder schließen Sie sich unseren beliebten <strong>Gruppensafaris</strong> für maximalen Wert an.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="bg-white text-green-700 hover:bg-gray-100">
              <Link href="/contact">Buchen Sie Ihre <strong>Mara-Safari</strong> noch heute</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="https://wa.me/+254726485228">
                <Phone className="mr-2 h-5 w-5" /> Chatten Sie mit unserem <strong>Reiseveranstalter</strong>
              </a>
            </Button>
          </div>
          <h6 className="mt-8 text-sm opacity-90 flex justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2"><Phone size={14} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><CreditCard size={14} /> Sichere Zahlung</span>
          </h6>
        </div>
      </section>
    </div>
  );
}