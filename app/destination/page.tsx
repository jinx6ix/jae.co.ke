import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { destinations } from "@/lib/destinations-data"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "East Africa Destinations | Kenya, Tanzania, Rwanda, Uganda",
  description:
    "Explore our East African destinations including Kenya, Tanzania, Rwanda, and Uganda. Discover safari tours, gorilla trekking, and adventure travel across the region.",
  keywords: [
    "East Africa Destinations",
    "Kenya Travel",
    "Tanzania Tours",
    "Rwanda Gorillas",
    "Uganda Safari",
    "African Destinations",
  ],
}

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Explore East Africa</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          From the savannas of Kenya to the mountains of Rwanda, discover the diverse beauty and incredible wildlife of
          East Africa. Each destination offers unique experiences, stunning landscapes, and unforgettable adventures.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {destinations.map((destination) => (
          <Link
            key={destination.slug}
            href={`/destinations/${destination.slug}`}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl"
          >
            <Image
              src={destination.heroImage || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="mb-3 font-serif text-4xl font-bold text-white">{destination.name}</h2>
              <p className="mb-4 text-white/90 leading-relaxed">{destination.description}</p>
              <div className="flex items-center gap-2 text-white font-medium">
                <span>Explore {destination.name}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-2xl bg-muted/50 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Can't Decide Where to Go?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          Our travel experts can help you choose the perfect destination based on your interests, budget, and travel
          style. We also offer multi-country itineraries to experience the best of East Africa.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get Expert Advice</Link>
        </Button>
      </div>
    </div>
  )
}
