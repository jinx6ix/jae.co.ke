// app/vehicle-hire/luxury-roof-top-camping/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"
import CampingHero from "./CampingHero"
import CampingHighlights from "./CampingHighlights"
import CampingTestimonials from "./CampingTestimonials"
import { faqSchema } from "./faq-schema"

// BULLET-PROOF LUXURY CAMPING SCHEMA — FULL RICH RESULTS + IMAGEOBJECT
const campingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "telephone": "+254726485228",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 2. Product — THIS GETS FULL PRODUCT RICH RESULTS
    {
      "@type": "Product",
      "@id": "https://jaetravel.co.ke/luxury-roof-top-camping/#product",
      "name": "Luxury Roof-Top Camping Safari Kenya",
      "description": "Premium glamping experience with 4x4 vehicle, rooftop tents, gourmet meals, and private campsites in Maasai Mara, Amboseli, and conservancies.",
      "image": [
        {
          "@type": "ImageObject",
          "url": "https://jaetravel.co.ke/1WhatsApp Image 2025-11-18 at 4.42.53 PM.jpeg",
          "contentUrl": "https://jaetravel.co.ke/safari-vehicle-extended-roof-for-photography.jpg",
          "name": "Rooftop Tent Sunset - Maasai Mara Luxury Camping",
          "description": "Premium rooftop tent setup during golden hour in the Maasai Mara",
          "width": "1200",
          "height": "800"
        },
        {
          "@type": "ImageObject",
          "url": "https://jaetravel.co.ke/safari-vehicle-extended-roof-for-photography.jpg",
          "name": "Luxury Rooftop Tent Interior",
          "description": "Memory foam mattress, luxury bedding, and panoramic views"
        },
        {
          "@type": "ImageObject",
          "url": "https://jaetravel.co.ke/safari-vehicle-extended-roof-for-photography.jpg",
          "name": "Gourmet Bush Dinner Under African Stars",
          "description": "Private chef-prepared meals in the wilderness"
        }
      ],
      "brand": { "@type": "Organization", "name": "JAE Travel Expeditions" },
      "offers": [
        {
          "@type": "Offer",
          "name": "Self-Drive Luxury Roof-Top Camping",
          "price": "180",
          "priceCurrency": "USD",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": "https://jaetravel.co.ke/book-now?package=camping-self"
        },
        {
          "@type": "Offer",
          "name": "Guided Glamping Safari with Driver & Chef",
          "price": "320",
          "priceCurrency": "USD",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/LimitedAvailability",
          "url": "https://jaetravel.co.ke/book-now?package=camping-guided"
        }
      ],
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Alex Turner" },
          "reviewBody": "Best camping experience ever! The rooftop tent was incredibly comfortable, and waking up to lions roaring was magical."
        }
      ]
    },

    // 3. WebPage + Breadcrumb
    {
      "@type": "WebPage",
      "@id": "https://jaetravel.co.ke/luxury-roof-top-camping/#webpage",
      "url": "https://jaetravel.co.ke/luxury-roof-top-camping",
      "name": "Luxury Roof-Top Camping Kenya | Glamping Safari | JAE Travel",
      "description": "Premium rooftop tent camping in Maasai Mara, Amboseli & private conservancies. 4x4 vehicle, gourmet meals, starlit dinners."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Vehicle Hire", "item": "https://jaetravel.co.ke/vehicle-hire" },
        { "@type": "ListItem", "position": 3, "name": "Luxury Roof-Top Camping", "item": "https://jaetravel.co.ke/vehicle-hire/luxury-roof-top-camping" }
      ]
    },

    // 4. FAQ
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is included in luxury roof-top camping?",
          "acceptedAnswer": { "@type": "Answer", "text": "4x4 vehicle, premium rooftop tent, memory foam mattress, full camping gear, gourmet meals (guided package), private campsites, and emergency equipment." }
        },
        {
          "@type": "Question",
          "name": "Can I do self-drive roof-top camping?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer self-drive packages with full equipment. Guided options include a private driver and chef." }
        },
        {
          "@type": "Question",
          "name": "Where can I camp with rooftop tents?",
          "acceptedAnswer": { "@type": "Answer", "text": "Maasai Mara, Amboseli, Tsavo, Samburu, Laikipia, and exclusive private conservancies with no tourist crowds." }
        },
        {
          "@type": "Question",
          "name": "Is roof-top camping safe?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — elevated tents keep you safe from wildlife. All campsites are in secure locations with 24/7 radio contact." }
        }
      ]
    }
  ]
}

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Luxury Roof-Top Camping Kenya | Glamping Safari | JAE Travel",
    description:
      "Experience luxury roof-top camping in Kenya with 4x4 vehicles, premium tents, and starlit dinners. Perfect for Maasai Mara, Amboseli, and private conservancies.",
    keywords: [
      "luxury roof top camping Kenya",
      "glamping safari Kenya",
      "rooftop tent safari",
      "4x4 camping Kenya",
      "Maasai Mara glamping",
      "overland camping East Africa",
      "luxury camping with driver",
      "self drive camping Kenya",
      "roof top tent rental",
      "safari camping equipment",
      "Amboseli luxury camping",
      "private conservancy glamping",
      "Kenya adventure travel",
      "safari camping tours",
      "luxury tented safari",
      "roof top camping Maasai Mara",
      "glamping Amboseli National Park",
      "Kenya wildlife camping",
      "eco friendly safari camping",
      "premium camping equipment hire",
    ],
    openGraph: {
      title: "Luxury Roof-Top Camping Safari | Kenya Glamping",
      description: "Sleep under the stars in premium roof-top tents. Fully equipped 4x4, gourmet meals, and private campsites.",
      images: ["/camping/rooftop-tent-sunset.jpg"],
    },
    alternates: {
      canonical: "https://jaetravelexpeditions.com/vehicle-hire/luxury-roof-top-camping",
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Server Component: Main Page
// ————————————————————————
export default function LuxuryCampingPage() {
  const product = products.find((p) => p.slug === "luxury-roof-top-camping")
  if (!product) notFound()

  return (
    <>
      {/* FULL RICH RESULTS SCHEMA — PRODUCT + IMAGEOBJECT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campingSchema) }}
      />
      <div className="container mx-auto px-4 py-16">
        {/* Hero – Client */}
        <CampingHero product={product} />

        {/* Highlights – Client */}
        <CampingHighlights product={product} />

        {/* Introduction Paragraphs */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              <strong>Luxury roof-top camping Kenya</strong> represents the ultimate fusion of adventure and comfort, 
              allowing you to experience the wild heart of Africa while enjoying premium amenities. Our 
              <strong>glamping safari Kenya</strong> packages are designed for travelers who want to immerse themselves 
              in nature without sacrificing the comforts of modern living. Wake up to breathtaking sunrises over 
              the savannah and fall asleep under a canopy of stars, all from the safety and comfort of our 
              state-of-the-art <strong>rooftop tent safari</strong> setups.
            </p>
            
            <p>
              Our <strong>4x4 camping Kenya</strong> adventures take you to the most spectacular locations across 
              East Africa, from the world-famous <strong>Maasai Mara glamping</strong> sites where you can witness 
              the Great Migration, to the iconic plains of <strong>Amboseli luxury camping</strong> with Mount 
              Kilimanjaro as your backdrop. Each <strong>overland camping East Africa</strong> experience is 
              carefully curated to provide intimate wildlife encounters while maintaining the highest standards 
              of safety and comfort in our premium camping equipment.
            </p>

            <p>
              Whether you choose our <strong>self drive camping Kenya</strong> option for complete independence 
              or opt for our <strong>luxury camping with driver</strong> package for a fully-guided experience, 
              every detail is meticulously planned. Our <strong>roof top tent rental</strong> includes everything 
              from memory foam mattresses to professional kitchen setups, ensuring your <strong>safari camping equipment</strong> 
              meets the demands of the African wilderness while providing exceptional comfort throughout your journey.
            </p>

            <p>
              The magic of <strong>private conservancy glamping</strong> lies in the exclusive access to pristine 
              wilderness areas where wildlife roams freely and tourist numbers are strictly limited. These 
              conservancies offer night game drives, walking safaris, and intimate wildlife viewing opportunities 
              that aren't available in the main national parks. Our carefully selected <strong>private conservancy</strong> 
              locations provide the perfect setting for an authentic African adventure with unparalleled privacy 
              and luxury.
            </p>

            <p>
              Our commitment to sustainable tourism means that every <strong>luxury roof-top camping</strong> 
              experience is designed to minimize environmental impact while maximizing your connection with 
              nature. We partner with local communities, use eco-friendly products, and follow strict 
              leave-no-trace principles to ensure that the beautiful landscapes of Kenya remain pristine 
              for future generations of adventurers to enjoy.
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Your Luxury Camping Adventure
          </h2>
          <div className="prose mx-auto max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Immerse yourself in Kenya's wilderness with <strong>luxury roof-top camping</strong>. 
              Our 4x4 vehicles come equipped with premium rooftop tents, memory foam mattresses, 
              and panoramic views of the savanna.
            </p>
            <p>
              Wake up to lions roaring at dawn in <strong>Maasai Mara</strong>, watch elephants at 
              <strong>Amboseli</strong> with Kilimanjaro as your backdrop, or stargaze in private conservancies.
            </p>
            <p>
              We handle everything: vehicle, tent, camping gear, gourmet meals, and expert guides. 
              You just bring your sense of adventure.
            </p>
          </div>
        </section>

        {/* Included Gear */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            What's Included in Your Camping Package
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Premium 2-person roof-top tent with ladder",
              "Memory foam mattress & luxury bedding",
              "Portable gas stove, cookware & cooler box",
              "Foldable chairs, table & LED lighting",
              "4x4 vehicle with pop-up roof (optional)",
              "First aid kit, GPS & emergency beacon",
              "Gourmet meal plan (breakfast, lunch, dinner)",
              "Private campsite booking in conservancies",
              "English-speaking driver-guide (optional)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                <span className="text-green-500 mt-0.5">Check</span>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials – Client */}
        <CampingTestimonials />

        {/* Regional Destinations */}
        <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">
              Premier Roof-Top Camping Destinations
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Maasai Mara & Southern Kenya</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience the ultimate <strong>Maasai Mara glamping</strong> adventure during the Great Migration 
                  (July-October) or enjoy year-round wildlife viewing in private conservancies. Our 
                  <strong>luxury roof-top camping Kenya</strong> packages in this region offer front-row seats 
                  to some of Africa's most spectacular wildlife dramas, with comfortable accommodations 
                  just meters away from the action.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Amboseli & Northern Tanzania</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover the magic of <strong>Amboseli luxury camping</strong> with unparalleled views of 
                  Mount Kilimanjaro and massive elephant herds. This region is perfect for 
                  <strong>overland camping East Africa</strong> enthusiasts who want to combine multiple 
                  destinations in one epic journey, crossing borders while maintaining the highest 
                  standards of comfort and safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Camping Package Pricing
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Self-Drive Camping</h3>
              <p className="mb-4 text-3xl font-bold">$180 <span className="text-lg text-muted-foreground">/ day</span></p>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">Check 4x4 with roof-top tent</li>
                <li className="flex items-center gap-2">Check All camping gear</li>
                <li className="flex items-center gap-2">Check Meal ingredients</li>
                <li className="flex items-center gap-2">Check GPS & emergency kit</li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/book-now?package=camping-self">Book Self-Drive</Link>
              </Button>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Guided Glamping</h3>
              <p className="mb-4 text-3xl font-bold">$320 <span className="text-lg text-muted-foreground">/ day</span></p>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">Check Private driver-guide</li>
                <li className="flex items-center gap-2">Check Gourmet chef & meals</li>
                <li className="flex items-center gap-2">Check Private campsites</li>
                <li className="flex items-center gap-2">Check All park fees</li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/book-now?package=camping-guided">Book Guided</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">
            Frequently Asked Questions
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
            Ready to Camp Under the African Sky?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed">
            Book your <strong>luxury roof-top camping safari</strong> in <strong>Maasai Mara</strong>, 
            <strong>Amboseli</strong>, or a <strong>private conservancy</strong>. 
            All gear, meals, and adventure included.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get Custom Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> WhatsApp Now
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <Mail className="inline h-4 w-4 mr-1" />
            <a href="mailto:info@jaetravelexpeditions.com" className="underline">info@jaetravelexpeditions.com</a>
            {' '}|{' '}
            <Phone className="inline h-4 w-4 mr-1" />
            <a href="tel:+254726485228" className="underline">+254 726 485 228</a>
          </p>
        </section>
      </div>
    </>
  )
}