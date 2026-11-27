import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import JsonLd from "@/components/JsonLd"
import {
  Shield,
  Check,
  MapPin,
  Users,
  Award,
  Calendar,
  Phone,
  Globe,
  HandHelping,
  Star,
  Compass,
  Car,
} from "lucide-react"

const BASE_URL = "https://www.jaetravel.co.ke"
const PATH = "/tour-operators-in-kenya"
const URL = BASE_URL + PATH
const NOW = "2026-11-27"

export const metadata: Metadata = {
  title: "Tour Operators in Kenya | Licensed Safari Experts",
  description:
    "Looking for the best licensed tour operators in Kenya? JaeTravel Expeditions is a KATO-certified local operator offering accessible safaris, 4x4 vehicle hire, and expert-guided tours across East Africa.",
  keywords: [
    "tour operators in Kenya",
    "best tour operators in Kenya",
    "licensed tour operators Kenya",
    "KATO certified tour operators",
    "safari tour operators Kenya",
    "accessible safari Kenya",
    "wheelchair accessible safari Kenya",
    "disability vehicles Kenya",
    "JaeTravel Expeditions",
    "Kenya safari company",
  ],
  alternates: {
    canonical: URL,
    languages: {
      en: URL,
      fr: "https://www.jaetravel.co.ke/fr/tour-operators-in-kenya",
      de: "https://www.jaetravel.co.ke/de/tour-operators-in-kenya",
      it: "https://www.jaetravel.co.ke/it/tour-operators-in-kenya",
      hi: "https://www.jaetravel.co.ke/hi/tour-operators-in-kenya",
      ar: "https://www.jaetravel.co.ke/ar/tour-operators-in-kenya",
      zh: "https://www.jaetravel.co.ke/zh/tour-operators-in-kenya",
      "x-default": URL,
    },
  },
  openGraph: {
    title: "Tour Operators in Kenya | Licensed Safari Experts",
    description:
      "KATO-certified local operator offering accessible safaris, 4x4 vehicle hire, and expert-guided tours across East Africa.",
    url: URL,
    siteName: "Jae Travel Expeditions",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: BASE_URL + "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tour Operators in Kenya - JaeTravel Expeditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Operators in Kenya | Licensed Safari Experts",
    description:
      "KATO-certified local operator offering accessible safaris, 4x4 vehicle hire, and expert-guided tours across East Africa.",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": BASE_URL + "#organization",
  name: "Jae Travel Expeditions",
  url: BASE_URL,
  logo: BASE_URL + "/logo.png",
  image: BASE_URL + "/og-image.jpg",
  telephone: "+254726485228",
  email: "info@jaetravel.co.ke",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Westlands Business Park",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  foundingDate: "2008",
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Country", name: "Uganda" },
  ],
  sameAs: [
    "https://www.facebook.com/jaetravel",
    "https://www.instagram.com/jaetravel",
    "https://www.tripadvisor.com/jaetravel",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "21",
    bestRating: "5",
    worstRating: "1",
  },
}

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": BASE_URL + "#website",
  name: "Jae Travel Expeditions",
  url: BASE_URL,
  description:
    "KATO-certified local tour operator offering accessible safaris, 4x4 vehicle hire, and expert-guided tours across Kenya, Tanzania, Rwanda, and Uganda.",
  inLanguage: "en",
  publisher: { "@id": BASE_URL + "#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: BASE_URL + "/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": URL + "#webpage",
  name: "Tour Operators in Kenya | Licensed Safari Experts",
  description:
    "Looking for the best licensed tour operators in Kenya? JaeTravel Expeditions is a KATO-certified local operator.",
  url: URL,
  inLanguage: "en",
  isPartOf: { "@id": BASE_URL + "#website" },
  about: { "@id": BASE_URL + "#organization" },
  datePublished: NOW,
  dateModified: NOW,
  primaryImageOfPage: BASE_URL + "/og-image.jpg",
  breadcrumb: { "@id": URL + "#breadcrumb" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#answer-summary"],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": URL + "#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tour Operators in Kenya", item: URL },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": URL + "#faqpage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I choose the best tour operator in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for KATO and KWS certification, direct local operation (not a broker), an accessible fleet, verified reviews, and transparent pricing. JaeTravel Expeditions meets all of these criteria.",
      },
    },
    {
      "@type": "Question",
      name: "Is JaeTravel Expeditions a licensed tour operator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We are KATO-certified and KWS-registered, operating directly in Kenya since 2008 with a 4.9/5 rating from 21 reviews.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer wheelchair-accessible safaris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We specialize in accessible safari travel with hydraulic lift vehicles, medical-grade restraints, and disability-trained guides.",
      },
    },
    {
      "@type": "Question",
      name: "What parks do you cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Masai Mara, Amboseli, Tsavo, Samburu, Lake Nakuru, Serengeti, Ngorongoro, and gorilla trekking in Rwanda and Uganda.",
      },
    },
  ],
}

export default async function TourOperatorsPage() {
  return (
    <>
      <JsonLd id="org-schema" data={organizationSchema} />
      <JsonLd id="website-schema" data={webSiteSchema} />
      <JsonLd id="webpage-schema" data={webPageSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="faq-schema" data={faqSchema} />

      {/* Skip-to-content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark/90 to-black/80 py-20 md:py-32 overflow-hidden" aria-labelledby="hero-heading">
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6">
            <Check className="h-3 w-3" /> KATO & KWS Certified
          </div>
          <h1 id="hero-heading" className="mb-6 font-serif text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Tour Operators in Kenya
            <br />
            <span className="text-brand-orange">Licensed Safari Experts</span>
          </h1>

          {/* AnswerSummary - SAGE Answer Targeting & Citability */}
          <div id="answer-summary" className="mx-auto max-w-2xl mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-brand-muted/90 leading-relaxed">
            <p className="text-lg font-medium mb-2 text-white">Tour operators in Kenya are licensed local companies. They plan and run guided safari holidays.</p>
            <p className="text-lg">JaeTravel Expeditions is a KATO-certified tour operator in Kenya. We run accessible safaris with hydraulic lift vehicles. We offer 4x4 vehicle hire. Our guides lead tours across Masai Mara, Amboseli, and Serengeti. We also offer gorilla trekking in Rwanda and Uganda. No brokers. No markups.</p>
          </div>

          <p className="mx-auto max-w-2xl mt-6 text-lg text-brand-muted/90 leading-relaxed">
            Your trusted local partner for East Africa safaris. From the Great Migration to accessible wildlife adventures, we operate directly — no brokers, no markups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 py-3 shadow-lg shadow-orange-500/25 transition-all">
              Contact Our Team
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 font-semibold transition-all">
              View Safari Packages
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-brand-muted/80 font-medium">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-brand-orange" />
              <span>4.9 / 5 — 21 verified reviews</span>
            </div>
            <div className="h-6 w-px bg-brand-muted/30"></div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-orange" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="h-6 w-px bg-brand-muted/30"></div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-orange" />
              <span>Operating since 2008</span>
            </div>
          </div>
        </div>
      </section>

      {/* In-page Table of Contents */}
      <nav aria-label="On this page" className="bg-background border-y border-border py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 mx-auto max-w-xs">On this page</p>
          <ol className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-brand-dark">
            <li><a href="#how-to-choose" className="hover:text-brand-orange transition-colors">How to choose</a></li>
            <li><a href="#why-choose-us" className="hover:text-brand-orange transition-colors">Why choose us</a></li>
            <li><a href="#jaetravel-vs-brokers" className="hover:text-brand-orange transition-colors">Us vs. brokers</a></li>
            <li><a href="#our-services" className="hover:text-brand-orange transition-colors">Our services</a></li>
            <li><a href="#how-to-book" className="hover:text-brand-orange transition-colors">How to book</a></li>
            <li><a href="#faqs" className="hover:text-brand-orange transition-colors">FAQs</a></li>
          </ol>
        </div>
      </nav>

      {/* Trust Bar */}
      <section className="border-b border-border bg-background py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "KATO Certified", sub: "Kenya Association of Tour Operators" },
              { icon: Car, label: "Accessible Fleet", sub: "Hydraulic lift vehicles" },
              { icon: HandHelping, label: "Disability Trained", sub: "72-hour guide training" },
              { icon: Globe, label: "East Africa", sub: "KE · TZ · RW · UG" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 px-4 py-6 rounded-xl bg-card border border-border hover:border-brand-orange/50 transition-colors"
              >
                <Icon className="h-6 w-6 text-brand-orange" />
                <div className="font-semibold text-brand-dark">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main id="main-content">

        {/* What Makes a Top-Tier Operator */}
        <section id="how-to-choose" className="py-20 bg-brand-muted/5" aria-labelledby="how-to-choose-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="how-to-choose-heading" className="mb-4 font-serif text-4xl font-bold text-balance text-brand-dark">
                How do I choose a tour operator in Kenya?
              </h2>
              <p className="text-lg text-muted-foreground">
                Tour operators in Kenya are licensed local companies. They plan and run guided safari holidays. Choosing the right operator is the most important decision you will make.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "Authentic Licensing",
                  body: "A licensed tour operator in Kenya holds KATO and KWS registration. We are a direct local operator, not a broker — you deal with us, not a middleman.",
                },
                {
                  icon: Check,
                  title: "Safety Infrastructure",
                  body: "Robust safety protocols, well-maintained 4x4 vehicles, GPS tracking, first-aid kits, and 24/7 roadside support across all parks.",
                },
                {
                  icon: HandHelping,
                  title: "Accessibility First",
                  body: "Modern fleet with hydraulic lift conversions for wheelchair travelers, medical-grade restraints, and disability-trained guides.",
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <Card key={i} className="border-border hover:border-brand-orange/50 transition-all h-full">
                  <CardHeader className="bg-background/50 pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-orange/10 text-brand-orange mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-brand-dark">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground leading-relaxed">{body}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose JaeTravel */}
        <section id="why-choose-us" className="py-20 bg-white" aria-labelledby="why-choose-us-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="why-choose-us-heading" className="mb-4 font-serif text-4xl font-bold text-balance text-brand-dark">
                Why choose JaeTravel Expeditions?
              </h2>
              <p className="text-lg text-muted-foreground">
                JaeTravel Expeditions stands out among tour operators in Kenya. We focus on inclusivity, sustainability, and authentic wildlife encounters.
              </p>
            </div>
            <dl className="max-w-3xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <dt className="md:w-1/3 font-semibold text-brand-dark">Direct local operation</dt>
                <dd className="text-muted-foreground">We own our vehicles and employ our guides. No subcontractors, no hidden markups.</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <dt className="md:w-1/3 font-semibold text-brand-dark">KATO & KWS certified</dt>
                <dd className="text-muted-foreground">Full accreditation with the Kenya Association of Tour Operators and Kenya Wildlife Service.</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <dt className="md:w-1/3 font-semibold text-brand-dark">Accessible fleet</dt>
                <dd className="text-muted-foreground">Hydraulic lift vehicles for wheelchair users, with medical-grade restraints and trained guides.</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <dt className="md:w-1/3 font-semibold text-brand-dark">East Africa coverage</dt>
                <dd className="text-muted-foreground">Kenya, Tanzania, Rwanda, and Uganda — Masai Mara, Amboseli, Serengeti, Ngorongoro, and gorilla trekking.</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="jaetravel-vs-brokers" className="py-20 bg-brand-muted/5" aria-labelledby="comparison-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="comparison-heading" className="mb-4 font-serif text-4xl font-bold text-balance text-brand-dark">
                How does JaeTravel compare to typical brokers?
              </h2>
              <p className="text-lg text-muted-foreground">
                Direct operation means better prices. It means better vetting. You can reach us in Nairobi.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left border-collapse text-sm">
                <caption className="sr-only">JaeTravel Expeditions vs typical brokers: service features compared</caption>
                <thead className="bg-brand-dark/50">
                  <tr>
                    <th scope="col" className="border border-border px-6 py-4 font-semibold text-brand-dark">Service Feature</th>
                    <th scope="col" className="border border-border px-6 py-4 font-semibold text-brand-dark">JaeTravel Expeditions</th>
                    <th scope="col" className="border border-border px-6 py-4 font-semibold text-brand-dark">Typical Broker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-brand-orange/5 transition-colors">
                    <td className="border border-border px-6 py-4 font-medium text-brand-dark">KATO / KWS Certified</td>
                    <td className="border border-border px-6 py-4"><Check className="h-4 w-4 text-brand-orange mr-2" /> Yes</td>
                    <td className="border border-border px-6 py-4 text-muted-foreground">Varies</td>
                  </tr>
                  <tr className="hover:bg-brand-orange/5 transition-colors">
                    <td className="border border-border px-6 py-4 font-medium text-brand-dark">Accessible Fleet (Hydraulic Lift)</td>
                    <td className="border border-border px-6 py-4"><Check className="h-4 w-4 text-brand-orange mr-2" /> Yes</td>
                    <td className="border border-border px-6 py-4 text-muted-foreground">Rarely</td>
                  </tr>
                  <tr className="hover:bg-brand-orange/5 transition-colors">
                    <td className="border border-border px-6 py-4 font-medium text-brand-dark">Direct Local Operation</td>
                    <td className="border border-border px-6 py-4"><Check className="h-4 w-4 text-brand-orange mr-2" /> Yes</td>
                    <td className="border border-border px-6 py-4 text-muted-foreground">No</td>
                  </tr>
                  <tr className="hover:bg-brand-orange/5 transition-colors">
                    <td className="border border-border px-6 py-4 font-medium text-brand-dark">Driver-Guide Training</td>
                    <td className="border border-border px-6 py-4"><Check className="h-4 w-4 text-brand-orange mr-2" /> 72+ hours</td>
                    <td className="border border-border px-6 py-4 text-muted-foreground">Basic</td>
                  </tr>
                  <tr className="hover:bg-brand-orange/5 transition-colors">
                    <td className="border border-border px-6 py-4 font-medium text-brand-dark">Vehicle Fleet</td>
                    <td className="border border-border px-6 py-4"><Check className="h-4 w-4 text-brand-orange mr-2" /> Owned & maintained</td>
                    <td className="border border-border px-6 py-4 text-muted-foreground">Subcontracted</td>
                  </tr>
                  <tr className="hover:bg-brand-orange/5 transition-colors">
                    <td className="border border-border px-6 py-4 font-medium text-brand-dark">Reviews & Ratings</td>
                    <td className="border border-border px-6 py-4"><Check className="h-4 w-4 text-brand-orange mr-2" /> 4.9 / 5 (21 reviews)</td>
                    <td className="border border-border px-6 py-4 text-muted-foreground">Often unverified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section id="our-services" className="py-20 bg-white" aria-labelledby="services-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="services-heading" className="mb-4 font-serif text-4xl font-bold text-balance text-brand-dark">
                What services do tour operators in Kenya offer?
              </h2>
              <p className="text-lg text-muted-foreground">Explore what we offer and find the perfect match for your adventure.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Comprehensive Safari Tours",
                  href: "/tours",
                  description: "Masai Mara, Amboseli, Serengeti, and more. Expertly guided wildlife safaris across East Africa.",
                  icon: Compass,
                },
                {
                  title: "Reliable Vehicle Hire",
                  href: "/vehicle-hire",
                  description: "4x4 Land Cruisers. Safari vans. Accessible vehicles. With driver or self-drive options.",
                  icon: Car,
                },
                {
                  title: "Accessible Safari Travel",
                  href: "/disability-tours",
                  description: "Wheelchair-accessible vehicles. Hydraulic lifts. Disability-specialist guides.",
                  icon: HandHelping,
                },
              ].map(({ title, href, description, icon: Icon }, i) => (
                <Card key={i} className="border-border hover:border-brand-orange/50 transition-all group">
                  <CardHeader className="pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-brand-dark">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground leading-relaxed">{description}</CardContent>
                  <CardFooter className="pt-4">
                    <Link
                      href={href}
                      className="text-brand-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-colors"
                    >
                      Learn more <span className="text-xs">→</span>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Book */}
        <section id="how-to-book" className="py-20 bg-brand-muted/5" aria-labelledby="how-to-book-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="how-to-book-heading" className="mb-4 font-serif text-4xl font-bold text-balance text-brand-dark">
                How do I book a safari with a Kenyan tour operator?
              </h2>
              <p className="text-lg text-muted-foreground">
                Booking with JaeTravel Expeditions takes five simple steps. We handle everything from inquiry to departure.
              </p>
            </div>
            <ol className="max-w-2xl mx-auto list-decimal pl-8 space-y-4 text-muted-foreground leading-relaxed">
              <li className="text-brand-dark font-semibold">Contact us.</li>
              <li>Tell us your dates, group size, and any accessibility needs.</li>
              <li>Receive a custom itinerary and transparent quote.</li>
              <li>Confirm your booking with a deposit.</li>
              <li>Travel with our KATO-certified team across East Africa.</li>
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faqs" className="py-20 bg-white" aria-labelledby="faqs-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="faqs-heading" className="mb-4 font-serif text-4xl font-bold text-balance text-brand-dark">
                Frequently Asked Questions About Tour Operators in Kenya
              </h2>
              <p className="text-lg text-muted-foreground">Everything you need to know before choosing your Kenyan tour operator.</p>
            </div>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="q1" className="border border-border rounded-xl bg-background">
                <AccordionTrigger className="flex items-center justify-between p-6 text-brand-dark font-semibold">
                  How do I choose the best tour operator in Kenya?
                </AccordionTrigger>
                <AccordionContent className="p-6 text-muted-foreground leading-relaxed">
                  Look for KATO and KWS certification, direct local operation (not a broker), an accessible fleet, verified reviews, and transparent pricing. JaeTravel Expeditions meets all of these criteria.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="border border-border rounded-xl bg-background mt-2">
                <AccordionTrigger className="flex items-center justify-between p-6 text-brand-dark font-semibold">
                  Is JaeTravel Expeditions a licensed tour operator?
                </AccordionTrigger>
                <AccordionContent className="p-6 text-muted-foreground leading-relaxed">
                  Yes. We are KATO-certified and KWS-registered, operating directly in Kenya since 2008 with a 4.9/5 rating from verified reviews.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="border border-border rounded-xl bg-background mt-2">
                <AccordionTrigger className="flex items-center justify-between p-6 text-brand-dark font-semibold">
                  Do you offer wheelchair-accessible safaris?
                </AccordionTrigger>
                <AccordionContent className="p-6 text-muted-foreground leading-relaxed">
                  Yes. We specialize in accessible safari travel with hydraulic lift vehicles, medical-grade restraints, and disability-trained guides throughout Kenya.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4" className="border border-border rounded-xl bg-background mt-2">
                <AccordionTrigger className="flex items-center justify-between p-6 text-brand-dark font-semibold">
                  What parks and destinations do you cover?
                </AccordionTrigger>
                <AccordionContent className="p-6 text-muted-foreground leading-relaxed">
                  Masai Mara, Amboseli, Tsavo, Samburu, Lake Nakuru, Serengeti, Ngorongoro, plus gorilla trekking in Rwanda and Uganda.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Freshness stamp */}
        <div className="container mx-auto px-4 py-8 text-center">
          <time dateTime={NOW} className="text-xs text-muted-foreground">
            Last updated: {NOW}
          </time>
        </div>

      </main>

      {/* CTA Strip */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-white">Ready to Plan Your Kenya Safari?</h2>
            <p className="mb-8 text-brand-muted/80 leading-relaxed">
              Speak with our Nairobi-based team about accessible safaris, 4x4 hire, and custom itineraries across East Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-10 py-4 shadow-lg shadow-orange-500/30 transition-all">
                Contact JaeTravel Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white px-10 py-4 font-semibold transition-all">
                View All Safari Packages
              </Button>
            </div>
            <p className="mt-8 text-xs text-brand-muted/60 uppercase tracking-widest font-semibold">
              KATO Certified • KWS Registered • Nairobi, Kenya • Operating Since 2008
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
