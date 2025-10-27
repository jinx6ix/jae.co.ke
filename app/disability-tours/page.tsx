// File: app/disability-tours/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { disabilityTours } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accessibility, Check, Heart, Shield, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Accessible Safari Tours for People with Disabilities | Wheelchair-Friendly Kenya, Tanzania, Rwanda, Uganda",
  description:
    "Explore East Africa with Jae Travel's accessible safari tours. Wheelchair-friendly vehicles, adapted lodges, trained guides, and fully customised itineraries for travellers with disabilities.",
  keywords: [
    "accessible kenya safari",
    "disability tours kenya",
    "wheelchair friendly safari",
    "accessible travel africa",
    "special needs safari",
    "mobility impaired kenya tours",
    "adapted safari vehicles",
    "barrier-free kenya travel",
    "inclusive safari experiences",
    "disabled travel kenya",
    "wheelchair accessible tours and safaris",
  ],
  openGraph: {
    title: "Accessible Safari Tours for People with Disabilities | JaeTravel Expeditions",
    description:
      "Experience East Africa with our fully accessible safari tours — wheelchair-adapted vehicles, barrier-free lodges, and trained guides.",
    images: ["/accessible-safari-wheelchair.jpg"],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Jae Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions"
      ],
      "areaServed": ["China", "Japan", "United States", "Germany"]
    },
    
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://www.jaetravel.co.ke/tours" },
        { "@type": "ListItem", "position": 3, "name": "Accessible Safari Tours", "item": "https://www.jaetravel.co.ke/disability-tours" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of disabilities can you accommodate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accommodate a wide range of disabilities including wheelchair users, limited mobility, visual impairments, and hearing impairments. Each trip is tailored to your needs after a pre-trip accessibility consultation."
          }
        },
        {
          "@type": "Question",
          "name": "Are the safari vehicles truly wheelchair accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — our vehicles feature hydraulic lifts, secure restraints, wide doors and stable seating arrangements allowing exceptional wildlife viewing from your seat. Portable chairs and backup equipment are available."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer accessible gorilla trekking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We work with parks and local authorities to provide accessible gorilla viewing routes, sedan-chair options, and special permits where available."
          }
        }
      ]
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "David Chen" },
      "datePublished": "2025-08-01",
      "reviewBody": "As a wheelchair user, I never thought I'd experience an African safari. JaeTravel made it not only possible but absolutely incredible.",
      "reviewRating": { "@type": "Rating", "ratingValue": 5 }
    },
    // --- Kenya Disability Safari ---
{
  "@type": "TouristTrip",
  "name": "Accessible Masai Mara Safari",
  "description": "4-day accessible Masai Mara safari featuring adapted vehicles, inclusive accommodations, and guided game drives for travelers with disabilities.",
  "image": "https://www.jaetravel.co.ke/images/tours/accessible-masai-mara-safari.jpg",
  "touristType": ["Wheelchair users", "Mobility impaired travelers"],
  "offers": {
    "@type": "Offer",
    "price": "2500-5000",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.jaetravel.co.ke/tours/accessible-masai-mara-safari"
  },
  "provider": {
    "@type": "Organization",
    "name": "JaeTravel Expeditions",
    "url": "https://www.jaetravel.co.ke"
  },
  "areaServed": ["US", "DE", "JP", "CN"],
  "startLocation": {
    "@type": "Place",
    "name": "Nairobi, Kenya"
  },
  "hasPart": [
    { "@type": "TouristAttraction", "name": "Masai Mara National Reserve" }
  ]
},


// --- Tanzania Accessible Safari ---
{
"@type": "TouristTrip",
"name": "Tanzania Accessible Safari",
"description": "8-day accessible Tanzania safari exploring Serengeti and Ngorongoro Crater with wheelchair-adapted vehicles and inclusive lodges.",
"image": "https://www.jaetravel.co.ke/images/tours/tanzania-accessible-safari.jpg",
"touristType": ["Wheelchair users", "Travelers with disabilities"],
"offers": {
"@type": "Offer",
"price": "2500-5000",
"priceCurrency": "USD",
"availability": "https://schema.org/InStock",
"url": "https://www.jaetravel.co.ke/tours/tanzania-accessible-safari"
},
"provider": {
"@type": "Organization",
"name": "JaeTravel Expeditions",
"url": "https://www.jaetravel.co.ke"
},
"areaServed": ["US", "DE", "JP", "CN"],
"startLocation": {
"@type": "Place",
"name": "Arusha, Tanzania"
},
"hasPart": [
{"@type": "TouristAttraction", "name": "Serengeti National Park"},
{"@type": "TouristAttraction", "name": "Ngorongoro Crater"}
]
},
  ]
}

export default function DisabilityToursPage() {
  return (
    <div className="pb-16">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/accessible-safari-wheelchair.jpg"
            alt="Accessible Safari"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Accessibility className="h-10 w-10" />
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
            Safari Adventures for Everyone — Fully Accessible
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white/90 text-pretty">
            Explore Kenya, Tanzania, Rwanda, and Uganda with Jae Travel’s tailor‑made accessible safaris. Our wheelchair‑adapted
            vehicles, barrier‑free lodges, and specialist guides make real safari experiences possible for travellers with
            disabilities — without compromise.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="#tours">View Accessible Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] border-white bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Why Choose Our Accessible Safari Tours</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              We combine safety, dignity and adventure — every detail is considered so you can focus on wildlife,
              landscapes and unforgettable moments.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Accessibility className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Wheelchair‑Adapted Vehicles (Hydraulic Lifts)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Custom‑modified 4x4 vehicles with secure wheelchair restraints, wide entry doors and pop‑up roofs so you
                  never miss a moment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Barrier‑Free Accommodations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We partner with lodges and camps offering roll‑in showers, grab bars, ramps and accessible communal areas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Trained Support Staff</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Guides and support staff trained in assisting travellers with mobility, sensory or cognitive needs —
                  always respectful and professional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Personalised Itineraries</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We plan around your pace, medical needs and interests — from game drives to cultural visits and accessible
                  gorilla viewing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Trusted, Award‑Level Service</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Recognised for excellence in accessible tourism — we value dignity, privacy and memorable experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Full Inclusion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Participate in all activities alongside other travellers — no separate or reduced experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">What's Included</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Every accessible tour includes the core services below; optional extras are available on request.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Wheelchair‑adapted safari vehicles with hydraulic lifts",
              "Accessible rooms with roll‑in showers and grab bars",
              "Trained guides and support staff",
              "All park entrance fees and permits",
              "Airport transfers in accessible vehicles",
              "Portable tracked wheelchair for rough terrain (on request)",
              "Medical support protocols and emergency planning",
              "Custom pacing and rest schedules",
              "Accessible dining arrangements",
              "Pre‑trip accessibility consultation",
              "24/7 on‑trip support",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section id="tours" className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Our Accessible Safari Tours</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Choose from single‑park experiences to multi‑country adventures. Click any tour for full details and booking.
            </p>
          </div>

          {disabilityTours.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {disabilityTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="mb-4 text-muted-foreground">We're currently updating our accessible tour offerings.</p>
                <Button asChild>
                  <Link href="/contact">Contact Us for Custom Accessible Tours</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Don't see what you're looking for? We design custom accessible safaris.</p>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Request Custom Accessible Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Stories from Our Travellers</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "David Chen",
                location: "Canada",
                disability: "Wheelchair user",
                text: "As a wheelchair user, I never thought I'd experience an African safari. JaeTravel made it not only possible but absolutely incredible.",
                rating: 5,
              },
              {
                name: "Maria Rodriguez",
                location: "Spain",
                disability: "Limited mobility",
                text: "The accessible Masai Mara tour was a dream come true. Every detail was considered — from the accessible lodge to the patient guides.",
                rating: 5,
              },
              {
                name: "James Wilson",
                location: "United Kingdom",
                disability: "Wheelchair user",
                text: "Gorilla trekking seemed impossible for me, but JaeTravel found a way. It was the most emotional and beautiful experience of my life.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Check key={i} className="h-5 w-5 text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 leading-relaxed text-muted-foreground">"{testimonial.text}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-sm text-muted-foreground italic">{testimonial.disability}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                question: "What types of disabilities can you accommodate?",
                answer:
                  "We accommodate wheelchair users, limited mobility, visual and hearing impairments. Your trip begins with a pre‑trip accessibility consultation to tailor arrangements.",
              },
              {
                question: "Are the safari vehicles truly wheelchair accessible?",
                answer:
                  "Yes. Our fleet includes hydraulic lifts, secure restraints, and wide access doors. For rugged areas we provide tracked wheelchairs and extra support staff on request.",
              },
              {
                question: "What about bathroom facilities on safari?",
                answer:
                  "Partner lodges provide accessible bathrooms with roll‑in showers and grab bars. During remote game drives we plan accessible rest stops and can provide portable facilities.",
              },
              {
                question: "Can I bring my own wheelchair or mobility equipment?",
                answer:
                  "Yes — bring what you trust. We adapt our vehicles and accommodations to your equipment and provide backups where necessary.",
              },
              {
                question: "Do you offer accessible gorilla trekking?",
                answer:
                  "Yes. We co‑ordinate with national parks for accessible viewing, shorter routes, or sedan chair options when available.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Ready to Start Your Accessible Safari Adventure?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
              Our accessibility specialists are ready to design a safe, comfortable and unforgettable safari — tailored to your needs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Our Accessibility Team</Link>
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
          </div>
        </div>
      </section>
    </div>
  )
}
