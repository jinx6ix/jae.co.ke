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
    title: "Toyota Prado Rental Kenya & Tanzania | Self-Drive Safari 4x4 | JAE Travel",
    description:
      "Rent a Toyota Prado for self-drive safari in Kenya, Tanzania, Uganda & Rwanda. Fully equipped 4x4 with pop-up roof, GPS, and insurance. From $95/day. Book now!",
    keywords: [
      "Toyota Prado rental Kenya",
      "self drive safari Kenya",
      "4x4 rental Tanzania",
      "Prado hire Maasai Mara",
      "safari vehicle rental",
      "Landcruiser Prado self drive",
      "car hire Nairobi with driver",
      "Toyota Prado Uganda rental",
      "pop up roof safari car",
      "4x4 hire Arusha",
      "cross border car rental East Africa",
      "Prado rental with GPS",
    ],
    openGraph: {
      title: "Toyota Prado Self-Drive Safari Rental | Kenya & Tanzania",
      description: "Rent a fully equipped Toyota Prado 4x4 for your East Africa safari adventure. Self-drive or with driver.",
      images: ["/vehicles/toyota-prado-hero.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravelexpeditions.com/vehicle-hire/toyota-prado",
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

      {/* Why Choose Prado */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Why Rent a Toyota Prado for Your Safari?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {product.highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-muted/50 p-5 transition-all hover:bg-muted hover:shadow-md"
            >
              <span className="mt-1 text-2xl">Check</span>
              <p className="text-muted-foreground leading-relaxed">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specs – Client Component */}
      <PradoSpecs />

      {/* Rental Options */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Rental Options & Pricing
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Self-Drive</h3>
            <p className="mb-4 text-3xl font-bold">$95 <span className="text-lg text-muted-foreground">/ day</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Unlimited mileage</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Full insurance</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> GPS & cooler box</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Free delivery</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=prado-self">Book Self-Drive</Link>
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">With Driver</h3>
            <p className="mb-4 text-3xl font-bold">$140 <span className="text-lg text-muted-foreground">/ day</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Professional guide</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> All fuel included</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Park fees help</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Custom itinerary</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=prado-driver">Book With Driver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Sarah M.", location: "Nairobi → Maasai Mara", rating: 5, text: "The Prado handled every muddy track with ease. Self-drive was a dream!" },
            { name: "John & Lisa", location: "Arusha → Serengeti", rating: 5, text: "Pop-up roof gave us the best wildlife views. Highly recommend!" },
            { name: "David K.", location: "Kampala → Bwindi", rating: 5, text: "Driver was knowledgeable and the car was spotless. Perfect for gorilla trekking." }
          ].map((t, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-6">
              <div className="mb-3 flex text-amber-500">
                {[...Array(t.rating)].map((_, j) => <span key={j} className="h-5 w-5 fill-current">Star</span>)}
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
          Ready to Explore East Africa in a Toyota Prado?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed">
          Whether you're planning a <strong>self-drive safari in Maasai Mara</strong>, a <strong>family trip to Serengeti</strong>, 
          or a <strong>cross-border adventure</strong>, the Toyota Prado is your perfect companion.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Get Instant Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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