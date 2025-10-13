import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, Users, Luggage, Fuel, Shield } from "lucide-react"
import { vehicles } from "@/lib/vehicles-data"

export const metadata: Metadata = {
  title: "Vehicle Hire & Car Rental in East Africa | JaeTravel Expeditions",
  description:
    "Rent 4x4 safari vehicles, land cruisers, and accessible vehicles in Kenya, Tanzania, Rwanda, and Uganda. Self-drive or with driver options available. Book your safari vehicle today.",
  keywords: [
    "Vehicle Hire East Africa",
    "Car Rental Kenya",
    "4x4 Safari Vehicle",
    "Land Cruiser Rental",
    "Self Drive Safari",
    "Vehicle Hire Tanzania",
    "Car Rental Uganda",
    "Safari Vehicle Rental",
    "Accessible Vehicle Hire",
  ],
}

export default function VehicleHirePage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/safari-vehicle-on-african-savanna.jpg"
            alt="Safari Vehicle"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl">
            Vehicle Hire & Car Rental
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/90 text-pretty">
            Explore East Africa at your own pace with our fleet of well-maintained safari vehicles. Self-drive or with
            professional driver options available.
          </p>
          <Button asChild size="lg">
            <Link href="#vehicles">View Our Fleet</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Why Rent With Us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fully Insured</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comprehensive insurance coverage for peace of mind on your journey.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Well Maintained</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Regular servicing and safety checks on all vehicles.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Round-the-clock roadside assistance and customer support.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Fuel className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Flexible Options</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Self-drive or with driver, daily or weekly rates available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="vehicles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Our Vehicle Fleet</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Choose from our range of safari-ready vehicles, all equipped for comfort and adventure across East
              Africa's diverse terrain.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <h3 className="mb-4 text-xl font-bold">{vehicle.name}</h3>
                  <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Luggage className="h-4 w-4" />
                      <span>{vehicle.specifications.luggage}</span>
                    </div>
                  </div>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{vehicle.description}</p>
                  <div className="border-t border-border pt-4">
                    <div className="text-3xl font-bold">${vehicle.pricePerDay}</div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/vehicle-hire/${vehicle.slug}`}>View Details & Book</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready to Hit the Road?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
            Contact us for availability, custom quotes, and to discuss your vehicle rental needs. We're here to help you
            plan the perfect self-drive safari.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
