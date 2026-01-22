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
    "cheap Masai Mara safari",
    "affordable Kenya safari packages",
    "budget group safari Kenya",
    "cheap Kenya wildlife tours 2026",
    "Masai Mara budget safari from Nairobi",
    "best value Kenya safaris",
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
        url: "https://www.jaetravel.co.ke/budget-safari-kenya-masai-mara.jpg",
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
    images: ["https://www.jaetravel.co.ke/budget-safari-kenya-masai-mara.jpg"],
  },
  other: {
    "og:price:amount": "450",
    "og:price:currency": "USD",
  },
};

const absoluteUrl = "https://www.jaetravel.co.ke/budget-tours/";
const heroImage = "https://www.jaetravel.co.ke/budget-safari-kenya-masai-mara.jpg";

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

    // FAQPage
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
            src="/budget-safari-kenya-masai-mara.jpg"
            alt="Budget safari Kenya 2026 - affordable Masai Mara game drive with Big Five"
            fill
            className="object-cover brightness-50"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            Budget Safaris Kenya 2026 — <span className="text-primary">From $450</span>
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-white/90">
            Experience the best of Kenya on cheap budget safaris — Masai Mara Big Five, Nakuru flamingos, Naivasha hippos & Amboseli elephants. 
            Affordable shared group & private options starting at just $450 per person in 2026.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[220px] text-lg">
              <Link href="#tours">View All Budget Tours</Link>
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

      {/* Dynamic Tours Grid – Client Component */}
      <BudgetToursClient />

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Why Book Your Budget Safari Kenya 2026 with JaeTravel Expeditions
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <DollarSign className="h-7 w-7 text-primary" />,
                title: "Lowest Prices 2026",
                desc: "Starting from just $450 — guaranteed best value for cheap Masai Mara safaris and other budget Kenya tours.",
              },
              {
                icon: <Users className="h-7 w-7 text-primary" />,
                title: "Shared Group Savings",
                desc: "Join like-minded travelers in comfortable 4x4 Land Cruisers — perfect for budget-conscious adventurers.",
              },
              {
                icon: <Shield className="h-7 w-7 text-primary" />,
                title: "All-Inclusive Value",
                desc: "Park fees, meals, professional guides, bottled water & budget accommodation included — no hidden costs.",
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

      {/* Included / Excluded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">
                What's Included in Our Budget Safaris Kenya 2026
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

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Ready for Your Affordable Budget Safari Kenya 2026?
          </h2>
          <p className="mb-8 max-w-3xl mx-auto text-lg">
            From $450 per person — secure your spot on the best cheap Kenya safari packages today. Limited availability!
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