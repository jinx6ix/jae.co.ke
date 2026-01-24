// app/budget-tours/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, DollarSign, Users, Shield, Phone, MapPin, Calendar, Camera } from "lucide-react";
import BudgetToursClient from "./BudgetToursClient";

// Import the budget tours data to include real tour cards in schema
import { budgetTours } from "@/lib/budget-tours-data";

export const metadata: Metadata = {
  title: "Budget Safaris Kenya 2026 | Cheap Masai Mara Safari from $450",
  description:
    "Discover the best budget safaris in Kenya 2026 — Masai Mara, Nakuru, Naivasha, Amboseli & Samburu. Affordable shared group & private safaris starting from $450. Book unforgettable experiences with expert tour operators.",
  keywords: [
    "budget safaris Kenya 2026",
    "private safaris Kenya",
    "tented camps Masai Mara",
    "wildebeest migration safari",
    "budget safaris Masai Mara",
    "Masai Mara National Reserve tours",
    "game viewing Kenya",
    "unforgettable safari experiences",
    "group safaris Kenya",
    "Mara safari packages",
    "Kenya tour operators",
    "safari in Kenya 2026",
    "lions leopards viewing",
    "affordable Kenya safari",
    "cheap Masai Mara tours",
  ].join(", "),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/budget-tours/",
    languages: {
      'en': 'https://www.jaetravel.co.ke/budget-tours/',           // Main English/global
      'en-US': 'https://www.jaetravel.co.ke/budget-tours/',       // US
      'en-GB': 'https://www.jaetravel.co.ke/budget-tours/',       // UK (optional)
      'en-AU': 'https://www.jaetravel.co.ke/budget-tours/',       // Australia (optional)
      'en-CA': 'https://www.jaetravel.co.ke/budget-tours/',       // Canada (optional)
      'x-default': 'https://www.jaetravel.co.ke/budget-tours/',   // Fallback
    },
  },
  openGraph: {
    title: "Budget Safaris Kenya 2026 | Masai Mara Wildebeest Migration from $450",
    description:
      "Experience the Great Wildebeest Migration in Masai Mara National Reserve on affordable budget safaris. Stay in comfortable tented camps with expert game viewing of lions, leopards & the Big Five.",
    url: "https://www.jaetravel.co.ke/budget-tours/",
    siteName: "JaeTravel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg",
        width: 1200,
        height: 630,
        alt: "Wildebeest migration game viewing in Masai Mara National Reserve - budget safaris Kenya",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Safaris Kenya 2026 | Masai Mara Migration Tours",
    description:
      "Join our group safaris or private safaris to witness the Great Migration in Masai Mara. Affordable tented camp stays with unforgettable experiences.",
    images: ["https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg"],
  },
  other: {
    "og:price:amount": "450",
    "og:price:currency": "USD",
  },
};

const absoluteUrl = "https://www.jaetravel.co.ke/budget-tours/";
const heroImage = "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg";

// Limit to first 6 tours for schema (to avoid too large JSON)
const featuredTours = budgetTours.slice(0, 6);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction for Masai Mara
    {
      "@type": "TouristAttraction",
      "@id": "https://www.jaetravel.co.ke/#attraction",
      "name": "Masai Mara National Reserve",
      "description": "World-famous wildlife reserve in Kenya known for the Great Wildebeest Migration",
      "containsPlace": {
        "@type": "LandmarksOrHistoricalBuildings",
        "name": "Masai Mara Game Reserve"
      }
    },

    // 2. Organization + LocalBusiness (with aggregateRating & individual reviews for rich stars)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JaeTravel Expeditions",
      "description": "Professional Kenya tour operator specializing in budget safaris and unforgettable safari experiences",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE",
        "country code": "KE",
        "addressLocality": "Nairobi"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": ["English", "Swahili"]
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
      // Individual reviews – Google can show these as rich snippets + stars
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "David Chen"
          },
          "datePublished": "2025-08-20",
          "reviewBody": "JaeTravel made our budget Masai Mara safari unforgettable! Excellent guides, comfortable camps, and incredible wildlife sightings — especially the wildebeest migration. Highly recommended for value and quality."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Sarah Johnson"
          },
          "datePublished": "2025-07-15",
          "reviewBody": "Perfect group safari with JaeTravel! Affordable price, great tented camp, and our guide spotted lions, leopards, and the Big Five. Everything was well-organized and stress-free."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Michael Thompson"
          },
          "datePublished": "2025-09-05",
          "reviewBody": "Best budget safari experience in Kenya! JaeTravel delivered amazing value — professional team, comfortable transport, and breathtaking views of the Great Migration. We'll definitely book again!"
        }
      ]
    },

    // 3. WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "JaeTravel Expeditions - Kenya Tour Operator",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" }
    },

    // 4. WebPage
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl}#webpage`,
      "url": absoluteUrl,
      "name": "Budget Safaris Kenya 2026 | Masai Mara Wildebeest Migration Tours",
      "description": "Book budget safaris to Masai Mara National Reserve for unforgettable experiences. Private safaris & group safaris with tented camp accommodation. Witness lions leopards & the Great Migration.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": heroImage,
        "width": 1200,
        "height": 630
      },
      "breadcrumb": { "@id": `${absoluteUrl}#breadcrumb` }
    },

    // 5. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaetravel.co.ke/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Budget Safaris Kenya - Masai Mara Tours",
          "item": absoluteUrl
        }
      ]
    },

    // 6. ItemList with TouristTrip items (no aggregateRating on TouristTrip)
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl}#budget-tours-list`,
      "name": "Budget Safari Packages Kenya 2026 - Masai Mara & Wildebeest Migration",
      "itemListElement": featuredTours.map((tour, index) => ({
        "@type": "TouristTrip",
        "@id": `https://www.jaetravel.co.ke${tour.url}#trip`,
        "name": tour.title,
        "image": `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`,
        "description": tour.shortDescription || tour.description,
        "includesAttraction": {
          "@type": "TouristAttraction",
          "name": "Masai Mara National Reserve"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://www.jaetravel.co.ke${tour.url}`,
          "priceCurrency": "USD",
          "price": tour.price.toString(),
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "@id": "https://www.jaetravel.co.ke/#organization"
          }
        }
      }))
    },

    // 7. FAQPage
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl}#faqpage`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is included in your budget safaris to Masai Mara National Reserve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our budget safaris include accommodation in comfortable tented camps, all game viewing drives in Masai Mara National Reserve, professional guides, meals, and transport. Witness lions, leopards, and the wildebeest migration on these unforgettable experiences."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer private safaris or group safaris?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer both private safaris for personalized itineraries and group safaris for budget-conscious travelers. All our Kenya tours feature expert guides and excellent game viewing opportunities."
          }
        },
        {
          "@type": "Question",
          "name": "When is the best time for wildebeest migration viewing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Great Wildebeest Migration in Masai Mara National Reserve peaks from July to October. Our budget safaris during this period offer incredible game viewing of millions of wildebeest crossing the Mara River."
          }
        },
        {
          "@type": "Question",
          "name": "What type of accommodation do you use for budget safaris?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use comfortable tented camps that provide an authentic safari experience while maintaining affordability. These camps are strategically located for optimal game viewing in Masai Mara."
          }
        },
        {
          "@type": "Question",
          "name": "What wildlife can we expect to see on a Mara safari?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Masai Mara National Reserve is famous for its Big Five sightings, including lions and leopards. During migration season, you'll witness millions of wildebeest, zebras, and predators in action."
          }
        },
        {
          "@type": "Question",
          "name": "Why choose JaeTravel as your Kenya tour operator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As an experienced Kenya tour operator, we specialize in creating unforgettable safari experiences at affordable prices. Our expertise in Masai Mara National Reserve ensures you get the best game viewing opportunities."
          }
        }
      ]
    }
  ]
};

export default function BudgetToursPage() {
  return (
    <div className="pb-16">
      {/* Structured Data - Now includes real tour cards */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fantasticafrica-20240806-0001.jpg"
            alt="Wildebeest migration game viewing in Masai Mara National Reserve - budget safaris Kenya"
            fill
            className="object-cover brightness-50"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            <strong>Budget Safaris Kenya 2026</strong> — <span className="text-primary">From $450</span>
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-white/90">
            Experience the spectacular <strong>wildebeest migration</strong> in <strong>Masai Mara National Reserve</strong> on our affordable <strong>budget safaris</strong>. 
            Choose between exciting <strong>group safaris</strong> or personalized <strong>private safaris</strong> with comfortable <strong>tented camps</strong> accommodation. 
            Enjoy incredible <strong>game viewing</strong> of <strong>lions, leopards</strong> and the Big Five on this <strong>unforgettable experience</strong>.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg">
              <Link href="#tours">View All <strong>Mara Safari</strong> Packages</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/contact">Contact Our <strong>Tour Operator</strong> Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New SEO Section: Introduction to Budget Safaris */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Discover the Best <strong>Budget Safaris in Kenya</strong> for 2026
          </h2>
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Planning your dream <strong>safari in Kenya</strong>? As a leading <strong>Kenya tour operator</strong>, JaeTravel Expeditions offers exceptional <strong>budget safaris</strong> to <strong>Masai Mara National Reserve</strong>. 
            Whether you prefer the camaraderie of <strong>group safaris</strong> or the exclusivity of <strong>private safaris</strong>, we create <strong>unforgettable experiences</strong> that won't break the bank.
          </p>
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Our <strong>Mara safari</strong> packages include comfortable <strong>tented camps</strong> accommodation and expert-led <strong>game viewing</strong> drives. 
            Witness the spectacular <strong>wildebeest migration</strong> and spot majestic <strong>lions, leopards</strong> and other wildlife on our carefully crafted <strong>Kenya tours</strong>.
          </p>
          <div className="text-center">
            <Button asChild size="lg" variant="default">
              <Link href="#tours">Explore Our <strong>Safari in Kenya</strong> Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Your Perfect <strong>Kenya Tour</strong> Experience
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MapPin className="h-7 w-7 text-primary" />,
                title: "Masai Mara National Reserve",
                desc: "Prime <strong>game viewing</strong> in Kenya's most famous wildlife sanctuary",
              },
              {
                icon: <Calendar className="h-7 w-7 text-primary" />,
                title: "Wildebeest Migration",
                desc: "Witness the Great Migration on our specially timed <strong>Mara safari</strong> packages",
              },
              {
                icon: <Users className="h-7 w-7 text-primary" />,
                title: "Flexible Safari Options",
                desc: "Choose between <strong>private safaris</strong> or affordable <strong>group safaris</strong>",
              },
              {
                icon: <Camera className="h-7 w-7 text-primary" />,
                title: "Lions & Leopards",
                desc: "Excellent chances to spot <strong>lions, leopards</strong> and the complete Big Five",
              },
            ].map((item, i) => (
              <Card key={i}>
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

      {/* Dynamic Tours Grid – Client Component */}
      <BudgetToursClient />

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Why Choose JaeTravel for Your <strong>Safari in Kenya</strong>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <DollarSign className="h-7 w-7 text-primary" />,
                title: "Best Value Budget Safaris",
                desc: "Starting from $450 — premium <strong>game viewing</strong> experiences at affordable prices. Perfect <strong>budget safaris</strong> for every traveler.",
              },
              {
                icon: <Users className="h-7 w-7 text-primary" />,
                title: "Expert Tour Operator",
                desc: "As a professional <strong>Kenya tour operator</strong>, we provide knowledgeable guides for <strong>unforgettable experiences</strong> in <strong>Masai Mara National Reserve</strong>.",
              },
              {
                icon: <Shield className="h-7 w-7 text-primary" />,
                title: "Authentic Tented Camps",
                desc: "Stay in comfortable <strong>tented camps</strong> that bring you closer to nature while maintaining safety and comfort on your <strong>Mara safari</strong>.",
              },
            ].map((item, i) => (
              <Card key={i}>
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

      {/* Accommodation Focus */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Authentic <strong>Tented Camps</strong> Experience
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold">Experience the Real Africa</h3>
              <p className="mb-4 text-lg">
                Our carefully selected <strong>tented camps</strong> offer the perfect blend of adventure and comfort. Wake up to the sounds of the African bush and enjoy:
              </p>
              <ul className="space-y-3">
                {[
                  "Comfortable beds with quality bedding",
                  "Private en-suite bathrooms",
                  "Solar-powered lighting",
                  "Secure accommodations in prime locations",
                  "Evening campfires under starry skies",
                  "Close proximity to <strong>game viewing</strong> areas"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-2xl font-bold">Perfect for All Safari Styles</h3>
              <p className="mb-4 text-lg">
                Whether you're on <strong>private safaris</strong> or joining our popular <strong>group safaris</strong>, our <strong>tented camps</strong> provide:
              </p>
              <ul className="space-y-3">
                {[
                  "Social areas for meeting fellow travelers",
                  "Private spaces for couples and families",
                  "Knowledgeable camp staff",
                  "Delicious meals prepared fresh daily",
                  "Strategic locations for <strong>wildebeest migration</strong> viewing",
                  "Easy access to <strong>Masai Mara National Reserve</strong>"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Included / Excluded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Your <strong>Unforgettable Experience</strong> Includes
              </h2>
              <ul className="space-y-3">
                {[
                  "All <strong>game viewing</strong> drives in 4x4 vehicles",
                  "Accommodation in authentic <strong>tented camps</strong>",
                  "Professional guides from our <strong>tour operator</strong> team",
                  "All park fees for <strong>Masai Mara National Reserve</strong>",
                  "Full-board meals during your <strong>safari in Kenya</strong>",
                  "Transportation for <strong>private safaris</strong> or <strong>group safaris</strong>",
                  "Opportunity to witness the <strong>wildebeest migration</strong>",
                  "Chances to spot <strong>lions, leopards</strong> and Big Five"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Plan Your Perfect <strong>Kenya Tour</strong>
              </h2>
              <ul className="space-y-3">
                {[
                  "International flights to Kenya",
                  "Travel insurance (highly recommended)",
                  "Optional activities like hot air balloon rides",
                  "Alcoholic beverages and personal expenses",
                  "Tips for guides and camp staff",
                  "Visa fees for entry to Kenya",
                  "Single supplements for solo travelers",
                  "Any additional nights beyond itinerary"
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

      {/* Migration Focus Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Witness the Spectacular <strong>Wildebeest Migration</strong>
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-lg">
              The Great <strong>wildebeest migration</strong> is one of nature's most incredible spectacles. Each year, over 1.5 million wildebeest, along with zebras and gazelles, journey through the <strong>Masai Mara National Reserve</strong>.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Best Viewing Times</h3>
                  <ul className="space-y-2">
                    <li><strong>July-October:</strong> River crossings in Masai Mara</li>
                    <li><strong>November-December:</strong> Southern migration begins</li>
                    <li><strong>January-March:</strong> Calving season in Serengeti</li>
                    <li><strong>April-June:</strong> Grumeti River crossings</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold">Predator Action</h3>
                  <p>During the migration, you'll witness incredible predator-prey interactions. Our <strong>game viewing</strong> drives focus on areas where <strong>lions, leopards</strong>, cheetahs, and hyenas are most active.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Ready for Your <strong>Unforgettable Safari Experience</strong>?
          </h2>
          <p className="mb-8 max-w-3xl mx-auto text-lg">
            From $450 per person — secure your spot on our <strong>budget safaris</strong> to <strong>Masai Mara National Reserve</strong>. 
            Choose <strong>private safaris</strong> for exclusivity or join our popular <strong>group safaris</strong> for maximum value.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Book Your <strong>Mara Safari</strong> Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="https://wa.me/+254726485228">
                <Phone className="mr-2 h-5 w-5" /> Chat with Our <strong>Tour Operator</strong>
              </a>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-90">
            As your trusted <strong>Kenya tour operator</strong>, we guarantee <strong>unforgettable experiences</strong> with exceptional <strong>game viewing</strong> of <strong>lions, leopards</strong> and the majestic <strong>wildebeest migration</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}