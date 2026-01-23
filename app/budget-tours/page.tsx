// app/budget-tours/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, DollarSign, Users, Shield, Phone } from "lucide-react";
import BudgetToursClient from "./BudgetToursClient";

// Import the budget tours data to include real tour cards in schema
import { budgetTours } from "@/lib/budget-tours-data";

export const metadata: Metadata = {
  title: "Budget Safaris Kenya 2026 | Cheap Masai Mara Safari from $450",
  description:
    "Discover the best budget safaris in Kenya 2026 — Masai Mara, Nakuru, Naivasha, Amboseli & Samburu. Affordable shared group & private options starting from $450 per person. Book cheap Kenya safari packages today!",
  keywords: [
    "budget safari Kenya 2026",
    "budget safaris in Kenya",
    "cheap Masai Mara safari",
    "affordable Kenya safari packages",
    "budget group safari Kenya",
    "cheap Kenya wildlife tours 2026",
    "Masai Mara budget safari from Nairobi",
    "best value Kenya safaris",
    "affordable Masai Mara tours",
    "cheap wildlife safaris Kenya",
    "budget Kenya safari deals",
    "low-cost Kenya safaris 2026",
    "economic Kenya safari packages",
    "Masai Mara group tours budget",
    "Nairobi to Masai Mara cheap safari",
    "best budget wildlife tours Kenya",
  ].join(", "),
  alternates: {
    canonical: "https://www.jaetravel.co.ke/budget-tours/",
  },
  openGraph: {
    title: "Budget Safaris Kenya 2026 | Cheap Masai Mara Safari from $450",
    description:
      "Experience the Big Five, flamingos, hippos & elephants on affordable budget safaris in Kenya 2026. Shared group tours starting at $450.",
    url: "https://www.jaetravel.co.ke/budget-tours/",
    siteName: "JaeTravel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg",
        width: 1200,
        height: 630,
        alt: "Budget safari Kenya 2026 - affordable Masai Mara game drive with Big Five",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Safaris Kenya 2026 | Cheap Masai Mara Safari from $450",
    description:
      "Experience the Big Five, flamingos, hippos & elephants on affordable budget safaris in Kenya 2026. Shared group tours starting at $450.",
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
    // Organization
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "JaeTravel Expeditions",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      telephone: "+254726485228",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254726485228",
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
      sameAs: [
        "https://www.facebook.com/jaetravelexpeditions",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravelke",
      ],
    },

    // Website
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      url: "https://www.jaetravel.co.ke",
      name: "JaeTravel Expeditions",
      publisher: { "@id": "https://www.jaetravel.co.ke/#organization" },
    },

    // WebPage
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl}#webpage`,
      url: absoluteUrl,
      name: "Budget Safaris Kenya 2026 | Cheap Masai Mara Safari from $450",
      description:
        "Discover the best budget safaris in Kenya 2026 — Masai Mara, Nakuru, Naivasha, Amboseli & Samburu. Affordable shared group & private options from $450.",
      isPartOf: { "@id": "https://www.jaetravel.co.ke/#website" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: heroImage,
        width: 1200,
        height: 630,
      },
      breadcrumb: { "@id": `${absoluteUrl}#breadcrumb` },
    },

    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.jaetravel.co.ke/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Budget Safaris Kenya 2026",
          item: absoluteUrl,
        },
      ],
    },

    // ItemList with real tour cards (Product schema) - helps with product carousel / shopping rich results
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl}#budget-tours-list`,
      name: "Budget Safari Packages Kenya 2026",
      itemListElement: featuredTours.map((tour, index) => ({
        "@type": "Product",
        "@id": `https://www.jaetravel.co.ke${tour.url}#product`,
        name: tour.title,
        image: `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`,
        description: tour.shortDescription || tour.description,
        sku: tour.id,
        brand: {
          "@type": "Brand",
          name: "JaeTravel Expeditions"
        },
        offers: {
          "@type": "Offer",
          url: `https://www.jaetravel.co.ke${tour.url}`,
          priceCurrency: "USD",
          price: tour.price.toString(),
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            "@id": "https://www.jaetravel.co.ke/#organization",
          }
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tour.rating.toString(),
          reviewCount: tour.reviewCount.toString(),
          bestRating: "5",
          worstRating: "1"
        }
      }))
    },

    // FAQPage with more FAQs for SEO
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the cheapest budget safari in Kenya 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our most affordable option starts at just $450 per person for shared group safaris, including Masai Mara National Reserve with Big Five game drives, full-board meals, park fees, and budget accommodation.",
          },
        },
        {
          "@type": "Question",
          name: "Are these budget safaris suitable for solo travelers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Our shared group safaris are perfect for solo travelers. You'll join like-minded adventurers in small groups (4-12 people), making it both affordable and social.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in the $450 budget safari price?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The price includes shared 4x4 transport, professional guide, all park fees, full-board meals, bottled water, budget tented camp accommodation, and Nairobi transfers. No hidden costs!",
          },
        },
        {
          "@type": "Question",
          name: "When is the best time for budget safaris in Kenya 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "July to October is peak season with the Great Migration in Masai Mara. January-February and June are also excellent with fewer crowds and lower rates. We operate year-round.",
          },
        },
        {
          "@type": "Question",
          name: "How can I book affordable Kenya safari packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Booking is easy! Contact us via WhatsApp or request a free quote for customized affordable Kenya safari packages starting from $450.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best value Kenya safaris for families?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our budget group safari Kenya options are ideal for families, offering private family tents and child discounts on best value Kenya safaris.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a Masai Mara budget safari from Nairobi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we offer daily departures for Masai Mara budget safari from Nairobi, including transport and all inclusions from $450.",
          },
        },
        {
          "@type": "Question",
          name: "What makes our cheap Kenya wildlife tours 2026 special?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our cheap Kenya wildlife tours 2026 feature expert guides, prime game viewing, and sustainable practices for an unforgettable experience.",
          },
        },
      ],
    },
  ],
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
            alt="Budget safari Kenya 2026 - affordable Masai Mara game drive with Big Five"
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
            Experience the best of Kenya on <strong>cheap budget safaris in Kenya</strong> — <strong>Masai Mara</strong> Big Five, Nakuru flamingos, Naivasha hippos & Amboseli elephants. 
            <strong>Affordable shared group & private options</strong> starting at just $450 per person in 2026. Book <strong>affordable Kenya safari packages</strong> now!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg">
              <Link href="#tours">View All <strong>Budget Tours</strong></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[220px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/contact">Get Free Personalized Quote – WhatsApp Now</Link>
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
            Planning a <strong>budget safari Kenya 2026</strong>? JaeTravel Expeditions offers the ultimate <strong>cheap Masai Mara safari</strong> experiences without compromising on quality. 
            Our <strong>affordable Kenya safari packages</strong> include everything you need for an unforgettable adventure, from spotting the Big Five in Masai Mara to exploring Lake Nakuru's flamingos.
          </p>
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Whether you're looking for <strong>budget group safari Kenya</strong> options or private tours, our <strong>cheap Kenya wildlife tours 2026</strong> start from just $450. 
            Depart from Nairobi with our <strong>Masai Mara budget safari from Nairobi</strong> and enjoy the <strong>best value Kenya safaris</strong> available.
          </p>
          <div className="text-center">
            <Button asChild size="lg" variant="default">
              <Link href="#tours">Explore <strong>Affordable Masai Mara Tours</strong></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dynamic Tours Grid – Client Component */}
      <BudgetToursClient />

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Why Book Your <strong>Budget Safari in Kenya 2026</strong> with JaeTravel Expeditions
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <DollarSign className="h-7 w-7 text-primary" />,
                title: "Lowest Prices 2026",
                desc: "Starting from just $450 — guaranteed best value for <strong>cheap Masai Mara safari</strong> and other <strong>budget Kenya tours</strong>.",
              },
              {
                icon: <Users className="h-7 w-7 text-primary" />,
                title: "Shared Group Savings",
                desc: "Join like-minded travelers in comfortable 4x4 Land Cruisers — perfect for <strong>budget-conscious adventurers</strong> seeking <strong>budget group safari Kenya</strong>.",
              },
              {
                icon: <Shield className="h-7 w-7 text-primary" />,
                title: "All-Inclusive Value",
                desc: "Park fees, meals, professional guides, bottled water & budget accommodation included — no hidden costs in our <strong>affordable Kenya safari packages</strong>.",
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New SEO Section: Benefits of Budget Safaris */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Benefits of Choosing <strong>Cheap Kenya Wildlife Tours 2026</strong>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Affordable Access to Wildlife",
                desc: "Our <strong>cheap Kenya wildlife tours 2026</strong> provide access to prime game reserves like Masai Mara at budget prices.",
              },
              {
                title: "Flexible Group Options",
                desc: "Join <strong>budget group safari Kenya</strong> for social experiences or opt for private <strong>affordable Kenya safari packages</strong>.",
              },
              {
                title: "Expert Guided Tours",
                desc: "Experience <strong>Masai Mara budget safari from Nairobi</strong> with knowledgeable guides for the <strong>best value Kenya safaris</strong>.",
              },
              {
                title: "Sustainable Travel",
                desc: "Our <strong>budget safaris in Kenya</strong> support local communities and conservation efforts.",
              },
              {
                title: "Customizable Itineraries",
                desc: "Tailor your <strong>cheap Masai Mara safari</strong> to include optional activities like balloon rides.",
              },
              {
                title: "Year-Round Availability",
                desc: "Book <strong>budget safari Kenya 2026</strong> any time, with peak seasons offering migration views.",
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Included / Excluded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                What's Included in Our <strong>Budget Safaris Kenya 2026</strong>
              </h2>
              <ul className="space-y-3">
                {[
                  "Shared or private 4x4 Land Cruiser with pop-up roof",
                  "Professional English-speaking driver/guide",
                  "All national park & conservation area entrance fees",
                  "Full-board meals (breakfast, lunch & dinner)",
                  "Unlimited bottled water during game drives",
                  "Comfortable budget tented camp or lodge accommodation",
                  "Airport/hotel transfers in Nairobi",
                  "24/7 support from JaeTravel team",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                What's Not Included
              </h2>
              <ul className="space-y-3">
                {[
                  "International flights & visas",
                  "Travel & medical insurance (highly recommended)",
                  "Tips & gratuities for guides/drivers",
                  "Alcoholic & soft drinks",
                  "Laundry, phone calls & personal expenses",
                  "Optional activities (hot air balloon, village visit, etc.)",
                  "Single room supplement (if applicable)",
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

      {/* New SEO Section: Tips for Budget Safaris */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Tips for Planning Your <strong>Affordable Kenya Safari Packages</strong>
          </h2>
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            To get the most out of your <strong>budget safaris in Kenya</strong>, book early for 2026 deals. Consider <strong>cheap Masai Mara safari</strong> during shoulder seasons for fewer crowds and better rates.
          </p>
          <ul className="mx-auto max-w-3xl space-y-4 text-lg">
            <li><strong>Choose Group Tours:</strong> Opt for <strong>budget group safari Kenya</strong> to save more while meeting fellow travelers.</li>
            <li><strong>Pack Essentials:</strong> Bring binoculars and sunscreen for your <strong>cheap Kenya wildlife tours 2026</strong>.</li>
            <li><strong>Customize Your Trip:</strong> Add extensions to your <strong>Masai Mara budget safari from Nairobi</strong> for comprehensive <strong>best value Kenya safaris</strong>.</li>
            <li><strong>Stay Informed:</strong> Follow weather patterns for the ideal time to book <strong>budget safari Kenya 2026</strong>.</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Ready for Your <strong>Affordable Budget Safari Kenya 2026</strong>?
          </h2>
          <p className="mb-8 max-w-3xl mx-auto text-lg">
            From $450 per person — secure your spot on the best <strong>cheap Kenya safari packages</strong> today. Limited availability!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Request Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="https://wa.me/+254726485228">
                <Phone className="mr-2 h-5 w-5" /> WhatsApp Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}