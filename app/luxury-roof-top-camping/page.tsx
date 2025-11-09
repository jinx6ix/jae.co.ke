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
    ],
    openGraph: {
      title: "Luxury Roof-Top Camping Safari | Kenya Glamping",
      description: "Sleep under the stars in premium roof-top tents. Fully equipped 4x4, gourmet meals, and private campsites.",
      images: ["/camping/rooftop-tent-sunset.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravelexpeditions.com/vehicle-hire/luxury-roof-top-camping",
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
    <div className="container mx-auto px-4 py-16">
      {/* Hero – Client */}
      <CampingHero product={product} />

      {/* Highlights – Client */}
      <CampingHighlights product={product} />

      {/* Details */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Your Luxury Camping Adventure
        </h2>
        <div className="prose mx-auto max-w-3xl text-muted-foreground leading-relaxed space-y-4">
          <p>
            Immerse yourself in Kenya’s wilderness with <strong>luxury roof-top camping</strong>. 
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
          What’s Included in Your Camping Package
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
  )
}