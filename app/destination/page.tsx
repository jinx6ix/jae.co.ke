// app/destinations/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import DestinationCard from "./DestinationCard"
import { destinations } from "@/lib/destinations-data"
import { Button } from "@/components/ui/button"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Top East Africa Destinations | Kenya, Tanzania, Rwanda, Uganda Safari Tours",
    description:
      "Explore East Africa’s best destinations: Kenya (Masai Mara, Amboseli), Tanzania (Serengeti, Zanzibar), Rwanda (gorilla trekking), Uganda (Bwindi, Queen Elizabeth). Book wildlife safaris, cultural tours, and accessible adventures.",
    keywords: [
      "East Africa Destinations",
      "Kenya Travel",
      "Tanzania Tours",
      "Rwanda Gorillas",
      "Uganda Safari",
      "African Destinations",
      "Masai Mara Kenya",
      "Serengeti Tanzania",
      "Volcanoes National Park",
      "Bwindi Gorilla Trekking",
      "Zanzibar Beach",
      "Amboseli National Park",
      "Lake Nakuru",
      "Ngorongoro Crater",
      "Queen Elizabeth National Park",
      "East Africa Safari Destinations",
      "Best Places to Visit in East Africa",
      "Kenya Tanzania Rwanda Uganda Tours",
    ],
    openGraph: {
      title: "East Africa Destinations | Kenya, Tanzania, Rwanda, Uganda",
      description: "Discover the best safari destinations in East Africa. From Masai Mara to Serengeti, gorilla trekking to Zanzibar beaches.",
      images: ["/og-east-africa-destinations.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/destination",
      languages: {
        'en': 'https://www.jaetravel.co.ke/destination',           // Main English/global
        'en-US': 'https://www.jaetravel.co.ke/destination',       // US
        'en-GB': 'https://www.jaetravel.co.ke/destination',       // UK (optional)
        'en-AU': 'https://www.jaetravel.co.ke/destination',       // Australia (optional)
        'en-CA': 'https://www.jaetravel.co.ke/destination',       // Canada (optional)
        'x-default': 'https://www.jaetravel.co.ke/destination',   // Fallback
      },
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Server Component: Page
// ————————————————————————
export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">

      {/* Hero Header */}
      <header className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance md:text-6xl">
          Explore East Africa’s Top Destinations
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          From the endless plains of <strong>Masai Mara</strong> and <strong>Serengeti</strong> to the misty mountains of <strong>Volcanoes National Park</strong> and <strong>Bwindi</strong>, 
          discover the best of <strong>Kenya, Tanzania, Rwanda, and Uganda</strong> with expert-guided safari tours, cultural experiences, and accessible travel options.
        </p>
      </header>

      {/* Destinations Grid */}
      <section className="grid gap-8 md:grid-cols-2 mb-16">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Frequently Asked Questions About East Africa Destinations
          </h2>
          <div className="space-y-8">
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
      <section className="rounded-2xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
          Can’t Decide Where to Go?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          Our East Africa travel experts can design a custom multi-country itinerary combining <strong>Kenya wildlife safaris</strong>, 
          <strong>Tanzania beach extensions</strong>, <strong>Rwanda gorilla trekking</strong>, and <strong>Uganda adventure tours</strong>.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get Personalized Advice</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tours">View All Safari Packages</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}