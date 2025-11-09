// app/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "./TourCard"
import HeroCarousel from "./HeroCarousel"
import { tours, toursOnOffer } from "@/lib/tours-data"
import { ArrowRight, Shield, Users, Award, Accessibility, Star } from "lucide-react"
import { faqSchema } from "./faq-schema"
import { breadcrumbSchema } from "./breadcrumb-schema"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title:
      "JaeTravel Expeditions | East Africa Safari Tours, Accessible Travel, Kenya Tanzania Rwanda Uganda Wildlife Adventures",
    description:
      "Discover unforgettable African safari experiences in Kenya, Tanzania, Rwanda, and Uganda. Specializing in accessible tours for travelers with disabilities, gorilla trekking, Masai Mara, Serengeti Great Migration, and luxury wildlife safaris. Book your dream safari with wheelchair-friendly vehicles and expert guides.",
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
      "masai mara great migration",
      "serengeti national park safari",
      "volcanoes national park gorilla permit",
      "bwindi impenetrable forest",
      "accessible masai mara safari",
      "wheelchair accessible serengeti",
    ],
    openGraph: {
      title: "JaeTravel Expeditions | East Africa Safari Tours & Accessible Travel",
      description:
        "Unforgettable African safaris in Kenya, Tanzania, Rwanda & Uganda. Accessible tours, gorilla trekking, Masai Mara, Serengeti, and luxury wildlife adventures.",
      images: ["/og-masai-mara-migration.jpg"],
      type: "website",
      locale: "en_KE",
    },
    alternates: {
      canonical: "https://jaetravel.co.ke",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "script:ld+json": JSON.stringify([breadcrumbSchema, faqSchema]),
    },
  }
}

// ————————————————————————
// Server Component: Home Page
// ————————————————————————
export default function HomePage() {
  const featuredTours = tours.slice(0, 6)
  const specialOffers = toursOnOffer.slice(0, 4)

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Why Choose Us */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Why Choose JaeTravel Expeditions for Your African Safari
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Trusted & Safe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Licensed East Africa safari operator with 15+ years of experience. Fully insured vehicles, trained drivers, and 24/7 support for your <strong>Kenya wildlife safari</strong> and beyond.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Local Guides</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Certified guides fluent in English, Swahili, and wildlife behavior. Passionate about <strong>Masai Mara</strong>, <strong>Serengeti</strong>, and <strong>gorilla trekking in Rwanda</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Accessibility className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fully Accessible Safaris</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Wheelchair-friendly safari vehicles</strong>, accessible lodges, and trained staff. Inclusive travel for all — from <strong>accessible Masai Mara safari</strong> to <strong>Serengeti wheelchair tours</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Award-Winning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recognized for sustainable tourism, inclusive travel, and unforgettable <strong>East Africa safari packages</strong>. Trusted by travelers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Limited-Time Safari Special Offers
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Save on <strong>Great Migration safari packages</strong>, <strong>accessible Kenya tours</strong>, and <strong>gorilla trekking in Rwanda</strong>. Book now before prices go up!
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
                View All Safari Packages <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Featured East Africa Safari Experiences
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Handpicked <strong>wildlife tours in Africa</strong> — from <strong>Masai Mara Great Migration</strong> to <strong>Bwindi gorilla trekking</strong>. All with expert guides and accessible options.
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
                Explore All Tours <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Explore East Africa’s Top Safari Destinations
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              From the endless plains of <strong>Serengeti National Park</strong> to the misty mountains of <strong>Volcanoes National Park</strong> — discover the best of <strong>Kenya, Tanzania, Rwanda, and Uganda</strong>.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Kenya",
                slug: "kenya",
                image: "/shopping.webp",
                alt: "Masai Mara National Reserve during Great Migration",
              },
              {
                name: "Tanzania",
                slug: "tanzania",
                image: "/shopping (1).webp",
                alt: "Serengeti wildebeest migration in Tanzania",
              },
              {
                name: "Rwanda",
                slug: "rwanda",
                image: "/download (3).png",
                alt: "Mountain gorilla family in Volcanoes National Park, Rwanda",
              },
              {
                name: "Uganda",
                slug: "uganda",
                image: "/download (4).png",
                alt: "Gorilla trekking in Bwindi Impenetrable Forest, Uganda",
              },
            ].map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl"
              >
                <Image
                  src={dest.image}
                  alt={dest.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl font-bold text-white">{dest.name}</h3>
                  <p className="mt-1 text-sm text-white/90">
                    View Tours <ArrowRight className="ml-1 inline h-4 w-4" />
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
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
              <Image
                src="/accessible-safari-wheelchair.jpg"
                alt="Wheelchair user on accessible safari in Kenya"
                fill
                className="object-cover object-left"
              />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                African Safari Adventures for Everyone
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-primary-foreground/90 text-pretty">
                We specialize in <strong>wheelchair accessible tours and safaris</strong> across East Africa. 
                From <strong>accessible Masai Mara game drives</strong> to <strong>wheelchair-friendly Serengeti lodges</strong>, 
                we ensure every traveler experiences the magic of Africa — no barriers.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/accessible-tours">
                  Explore Accessible Safaris <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Frequently Asked Questions About African Safaris
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Answers to your top questions about <strong>East Africa safari tours</strong>, <strong>accessible travel</strong>, and <strong>gorilla trekking</strong>.
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

      {/* Testimonials */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            What Our Safari Guests Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                location: "USA",
                text: "The Masai Mara safari was magical! We saw the Great Migration up close. Our guide was phenomenal.",
                rating: 5,
              },
              {
                name: "David Chen",
                location: "Canada",
                text: "As a wheelchair user, I never thought I'd go on safari. JaeTravel made it possible and unforgettable.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                location: "UK",
                text: "Gorilla trekking in Rwanda was life-changing. Flawless organization and caring guides.",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
            Ready for Your African Safari Adventure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Let us plan your perfect <strong>Kenya wildlife safari</strong>, <strong>accessible Tanzania tour</strong>, or <strong>Rwanda gorilla trek</strong>. 
            Contact us today — your adventure awaits.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Your Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}