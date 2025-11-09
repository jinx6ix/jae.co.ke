// app/vehicle-hire/toyota-landcruiser/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ArrowRight } from "lucide-react"
import CruiserHero from "./CruiserHero"
import CruiserFeatures from "./CruiserFeatures"
import CruiserSpecs from "./CruiserSpecs"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Toyota Land Cruiser Hire Kenya & Tanzania | Safari 4x4 | JAE Travel",
    description:
      "Hire a Toyota Land Cruiser for safari in Kenya, Tanzania, Uganda & Rwanda. Pop-up roof, 7 seats, 4x4, driver optional. From $120/day. Book now!",
    keywords: [
      "Toyota Land Cruiser hire Kenya",
      "safari vehicle rental",
      "4x4 car hire Tanzania",
      "Land Cruiser safari Maasai Mara",
      "off-road vehicle hire Uganda",
      "pop up roof Land Cruiser",
      "7 seater safari car rental",
      "Nairobi Land Cruiser hire",
      "Arusha 4x4 rental",
      "cross border safari vehicle",
      "Land Cruiser with driver",
      "East Africa overland vehicle",
    ],
    openGraph: {
      title: "Toyota Land Cruiser Safari Hire | Kenya & Tanzania",
      description: "Rent a rugged 7-seater Toyota Land Cruiser with pop-up roof for your East Africa safari. Self-drive or with driver.",
      images: ["/vehicles/landcruiser-hero.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser",
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Server Component: Main Page
// ————————————————————————
export default function ToyotaLandCruiserPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero – Client */}
      <CruiserHero />

      {/* Features – Client */}
      <CruiserFeatures />

      {/* Specs – Client */}
      <CruiserSpecs />

      {/* Rental Options */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Rental Plans & Pricing
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Self-Drive</h3>
            <p className="mb-4 text-3xl font-bold">$120 <span className="text-lg text-muted-foreground">/ day</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">Check Unlimited mileage</li>
              <li className="flex items-center gap-2">Check Full insurance</li>
              <li className="flex items-center gap-2">Check GPS & cooler box</li>
              <li className="flex items-center gap-2">Check Free pickup (Nairobi/Arusha)</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=landcruiser-self">Book Self-Drive</Link>
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">With Driver-Guide</h3>
            <p className="mb-4 text-3xl font-bold">$180 <span className="text-lg text-muted-foreground">/ day</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">Check Expert local guide</li>
              <li className="flex items-center gap-2">Check All fuel included</li>
              <li className="flex items-center gap-2">Check Park entry assistance</li>
              <li className="flex items-center gap-2">Check Custom safari route</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=landcruiser-driver">Book With Driver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          What Travelers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Michael T.", location: "Nairobi → Tsavo", text: "The Land Cruiser never missed a beat. Perfect for long safaris." },
            { name: "Emma & Family", location: "Arusha → Ngorongoro", text: "7 seats + pop-up roof = best family safari ever!" },
            { name: "Alex P.", location: "Entebbe → Queen Elizabeth", text: "Driver knew every animal track. Worth every penny." }
          ].map((t, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-6">
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
                {faq.acceptedAnswer && (
                  <p itemProp="text" className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
          Ready for the Ultimate Safari?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-pretty text-primary-foreground/90">
          Hire the <strong>Toyota Land Cruiser</strong> — the gold standard for <strong>East Africa safaris</strong>. 
          From <strong>Maasai Mara</strong> to <strong>Serengeti</strong>, this 4x4 conquers all.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/contact">
              Get Quote Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground">
            <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm">
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