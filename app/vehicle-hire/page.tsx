// app/vehicle-hire/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Check, Users, Fuel } from "lucide-react"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"
import { vehicles } from "@/lib/vehicles-data"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Vehicle Hire & Car Rental in East Africa | JaeTravel Expeditions",
    description:
      "Rent 4x4 safari vehicles, Land Cruisers, and accessible cars in Kenya, Tanzania, Rwanda, and Uganda. Self-drive or with driver. Book your safari vehicle rental today.",
    keywords: [
      "Vehicle Hire East Africa",
      "Car Rental Kenya",
      "4x4 Safari Vehicle",
      "Landcruiser Rental",
      "Self Drive Safari",
      "Vehicle Hire Tanzania",
      "Car Rental Uganda",
      "Safari Vehicle Rental",
      "Accessible Vehicle Hire",
      "4x4 Rental Kenya",
      "Landcruiser Hire Tanzania",
      "Safari Car Rental Rwanda",
      "Self Drive Uganda",
      "East Africa Vehicle Rental",
      "Safari Jeep Hire",
      "Nairobi Car Hire",
      "Arusha Vehicle Rental",
    ],
    openGraph: {
      title: "Safari Vehicle Hire & Car Rental in East Africa",
      description: "Rent 4x4 Land Cruisers for self-drive or with driver across Kenya, Tanzania, Rwanda & Uganda.",
      images: ["/og-vehicle-hire.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravelexpeditions.com/vehicle-hire",
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Server Component: Page
// ————————————————————————
export default function VehicleHirePage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/safari-vehicle-on-african-savanna.jpg"
            alt="4x4 safari vehicle on African savanna during golden hour"
            fill
            className="object-cover brightness-50"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl">
            Vehicle Hire & Car Rental in East Africa
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/90 text-pretty">
            Rent reliable <strong>4x4 safari vehicles</strong> and <strong>Land Cruisers</strong> in Kenya, Tanzania, Rwanda, and Uganda. 
            Choose <strong>self-drive</strong> or <strong>with driver</strong> — perfect for wildlife safaris, city transfers, or cross-border adventures.
          </p>
          <Button asChild size="lg">
            <Link href="#vehicles">View Our Fleet</Link>
          </Button>
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Why Choose JaeTravel for Vehicle Hire</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fully Insured</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All vehicles come with comprehensive insurance for your safety and peace of mind during <strong>self-drive safaris</strong> in Kenya and beyond.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Regularly Serviced</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every <strong>4x4 Landcruiser</strong> and safari vehicle undergoes strict maintenance checks before rental.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 Roadside Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Emergency assistance available anytime across East Africa — from Nairobi to Arusha.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Fuel className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Flexible Rental Plans</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Daily, weekly, or long-term rates. <strong>Self-drive</strong> or <strong>with professional driver</strong> options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section id="vehicles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Our Safari Vehicle Fleet</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              From rugged <strong>4x4 Land Cruisers</strong> to spacious vans, our fleet is built for East Africa’s roads. 
              Ideal for <strong>safari game drives</strong>, <strong>city transfers</strong>, or <strong>cross-border trips</strong>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to know about <strong>vehicle hire in East Africa</strong>
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold mb-2">{faq.name}</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready for Your East Africa Adventure?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
            Get a custom quote for <strong>4x4 safari vehicle hire</strong>, check availability, or book your <strong>self-drive Landcruiser</strong> today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}