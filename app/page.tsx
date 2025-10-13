import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TourCard } from "@/components/tour-card"
import { HeroCarousel } from "@/components/hero-carousel"
import { tours, toursOnOffer } from "@/lib/tours-data"
import { ArrowRight, Shield, Users, Award, Accessibility, Star } from "lucide-react"

export const metadata: Metadata = {
  title:
    "JaeTravel Expeditions | East Africa Safari Tours, Accessible Travel, Kenya Tanzania Rwanda Uganda Wildlife Adventures",
  description:
    "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda. Specializing in accessible tours for travelers with disabilities, gorilla trekking, wildlife safaris, Masai Mara, Serengeti migration, and luxury adventures. Book your dream African safari today with expert guides and wheelchair-friendly vehicles.",
  keywords: [
    "african safari",
    "kenya tours",
    "tanzania wildlife",
    "gorilla trekking",
    "luxury safari",
    "masai mara",
    "serengeti",
    "travel africa",
    "accessible kenya safari",
    "disability tours kenya",
    "wheelchair friendly safari",
    "accessible travel africa",
    "special needs safari",
    "east africa safari",
    "rwanda gorilla tours",
    "uganda safari",
    "wildlife tours africa",
    "safari packages",
    "great migration safari",
    "big five safari",
    "mountain gorilla trekking",
    "accessible wildlife tours",
    "inclusive safari experiences",
    "barrier-free travel africa",
    "adapted safari vehicles",
    "disability-friendly lodges",
    "wheelchair accessible tours and safaris",
    "kenya wildlife safari",
    "tanzania safari tours",
    "rwanda tours",
    "uganda wildlife",
    "safari adventure",
    "african wildlife tours",
  ],
  openGraph: {
    title: "JaeTravel Expeditions | East Africa Safari Tours & Accessible Travel",
    description:
      "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda. Specializing in accessible tours and wildlife adventures.",
    images: ["/masai-mara-migration.jpg"],
  },
  alternates: {
    canonical: "https://jaetravel.com",
  },
}

export default function HomePage() {
  const featuredTours = tours.slice(0, 6)
  const specialOffers = toursOnOffer.slice(0, 4)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://jaetravel.com",
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <HeroCarousel />

      {/* Why Choose Us Section */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Why Choose JaeTravel Expeditions
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Trusted & Safe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Licensed tour operator with 15+ years of experience ensuring your safety and comfort throughout your
                journey.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Guides</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional, knowledgeable guides who bring East Africa's wildlife and culture to life with passion and
                expertise.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Accessibility className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Accessible Travel</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Specialized accessible safaris with wheelchair-adapted vehicles and accommodations for travelers with
                disabilities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Award Winning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recognized for excellence in sustainable tourism and creating unforgettable experiences for all
                travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Special Offers</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Take advantage of our limited-time offers on selected safari experiences. Book now and save on your dream
              African adventure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialOffers.map((tour) => (
              <div key={tour.id} className="relative">
                <div className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground shadow-lg">
                  Save ${tour.originalPrice! - tour.price}
                </div>
                <TourCard tour={tour} showOriginalPrice />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">
                View All Tours <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Featured Safari Experiences</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Handpicked adventures showcasing the best of East Africa's wildlife, landscapes, and cultural heritage.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">
                View All Tours <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Explore Our Destinations</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              From the savannas of Kenya to the mountains of Rwanda, discover the diverse beauty of East Africa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Kenya", slug: "kenya", image: "/kenya-safari-landscape.jpg" },
              { name: "Tanzania", slug: "tanzania", image: "/tanzania-serengeti.jpg" },
              { name: "Rwanda", slug: "rwanda", image: "/rwanda-mountain-gorillas.jpg" },
              { name: "Uganda", slug: "uganda", image: "/uganda-wildlife.jpg" },
            ].map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg"
              >
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl font-bold text-white">{destination.name}</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Discover tours <ArrowRight className="ml-1 inline h-4 w-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Travel CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <Image src="/accessible-safari-wheelchair.jpg" alt="Accessible Safari" fill className="object-cover" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                Safari Adventures for Everyone
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-primary-foreground/90 text-pretty">
                We believe everyone deserves to experience the wonder of an African safari. Our accessible tours feature
                wheelchair-adapted vehicles, accessible accommodations, and specially trained guides to ensure an
                unforgettable experience for travelers with disabilities.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/disability-tours">
                  Explore Accessible Tours <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">What Our Travelers Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                location: "United States",
                text: "The Masai Mara safari exceeded all expectations. Our guide was incredibly knowledgeable, and we witnessed the Great Migration up close. Truly a once-in-a-lifetime experience!",
                rating: 5,
              },
              {
                name: "David Chen",
                location: "Canada",
                text: "As a wheelchair user, I was hesitant about safari travel. JaeTravel made it seamless with their accessible vehicles and accommodations. I felt included every step of the way.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                location: "United Kingdom",
                text: "Gorilla trekking in Rwanda was magical. The organization was flawless, and our guide ensured we had the best possible experience. Highly recommend JaeTravel!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Ready to Start Your Adventure?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Contact us today to plan your perfect East African safari. Our team is ready to help you create memories
            that will last a lifetime.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
