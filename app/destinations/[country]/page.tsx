import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { destinations, getDestinationBySlug } from "@/lib/destinations-data"
import { toursByCountry } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Check, ArrowRight } from "lucide-react"

interface DestinationPageProps {
  params: {
    country: string
  }
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    country: destination.slug,
  }))
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const destination = getDestinationBySlug(params.country)

  if (!destination) {
    return {
      title: "Destination Not Found",
    }
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    keywords: destination.keywords,
    openGraph: {
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [destination.heroImage],
    },
  }
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.country)

  if (!destination) {
    notFound()
  }

  const countryTours = toursByCountry[destination.name as keyof typeof toursByCountry] || []

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <Image
          src={destination.heroImage || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-16">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/90">
            <Link href="/destinations" className="hover:underline">
              Destinations
            </Link>
            <span>/</span>
            <span>{destination.name}</span>
          </div>
          <h1 className="mb-4 font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl text-balance">
            Discover {destination.name}
          </h1>
          <p className="max-w-3xl text-xl text-white/90 leading-relaxed text-pretty">{destination.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Overview Section */}
        <div className="mb-16 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-serif text-4xl font-bold">About {destination.name}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">{destination.longDescription}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <Calendar className="h-5 w-5" />
                    <h3 className="font-semibold">Best Time to Visit</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{destination.bestTimeToVisit}</p>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <h3 className="font-semibold">Quick Facts</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Region: East Africa</li>
                    <li>• Currency: Local currency</li>
                    <li>• Language: English widely spoken</li>
                    <li>• Visa: Available on arrival for most nationalities</li>
                  </ul>
                </div>

                <Button asChild className="mt-6 w-full">
                  <Link href="/contact">Plan Your Trip</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Highlights Section */}
        <section className="mb-16">
          <h2 className="mb-8 font-serif text-4xl font-bold text-center">Why Visit {destination.name}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.highlights.map((highlight, index) => (
              <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium leading-relaxed">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tours Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-4xl font-bold">Tours in {destination.name}</h2>
            <Button asChild variant="ghost">
              <Link href="/tours">
                View All Tours <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {countryTours.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {countryTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No tours available for this destination yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/contact">Request Custom Tour</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
            Ready to Explore {destination.name}?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
            Let our expert team help you plan the perfect {destination.name} adventure. From luxury safaris to cultural
            experiences, we'll create an itinerary tailored to your dreams.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
