import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { disabilityTours } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accessibility, Check, Heart, Shield, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Accessible Safari Tours for People with Disabilities | Wheelchair-Friendly Kenya, Tanzania, Rwanda, Uganda",
  description:
    "Experience East Africa with our fully accessible safari tours designed for travelers with disabilities. Wheelchair-accessible vehicles, adapted accommodations, barrier-free travel, and expert guides ensure an inclusive and unforgettable adventure in Kenya, Tanzania, Rwanda, and Uganda.",
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
    "accessible gorilla trekking",
    "disability-friendly lodges east africa",
    "Tanzania accessible tours",
    "Rwanda wheelchair safari",
    "Uganda accessible travel",
    "adaptive safari equipment",
    "accessible wildlife tours",
    "inclusive travel africa",
    "wheelchair safari vehicles",
    "accessible masai mara",
    "accessible serengeti",
    "disability travel specialists",
    "accessible african safari",
  ],
  openGraph: {
    title: "Accessible Safari Tours for People with Disabilities | JaeTravel Expeditions",
    description:
      "Experience East Africa with our fully accessible safari tours. Wheelchair-accessible vehicles and accommodations.",
    images: ["/accessible-safari-wheelchair.jpg"],
  },
}

export default function DisabilityToursPage() {
  return (
    <div className="pb-16">
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
            Safari Adventures for Everyone
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white/90 text-pretty">
            We believe that everyone deserves to experience the wonder of an African safari. Our accessible tours
            feature wheelchair-adapted vehicles, accessible accommodations, and specially trained guides to ensure an
            unforgettable experience for travelers with disabilities.
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

      {/* Why Choose Us Section */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Why Choose Our Accessible Safari Tours</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              We've spent years perfecting accessible travel in East Africa, ensuring every detail is considered for
              your comfort and safety.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Accessibility className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Wheelchair-Adapted Vehicles</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our specially modified 4x4 safari vehicles feature hydraulic lifts, secure wheelchair restraints, and
                  pop-up roofs for optimal wildlife viewing from your seat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Accessible Accommodations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We partner with lodges and camps that offer wheelchair-accessible rooms, roll-in showers, grab bars,
                  and ramps throughout the property.
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
                  Our guides and support staff receive specialized training in assisting travelers with disabilities,
                  ensuring respectful and professional care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Personalized Itineraries</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every tour is customized to your specific needs, mobility level, and interests. We work closely with
                  you to create the perfect safari experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Award-Winning Service</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Recognized for excellence in accessible tourism, we're committed to providing world-class experiences
                  for all travelers.
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
                  You'll participate in all activities alongside other travelers. No separate tours or limited
                  experiences - just full safari adventures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">What's Included in Our Accessible Tours</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              We've thought of everything to ensure your safari is comfortable, safe, and unforgettable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Wheelchair-adapted safari vehicles with hydraulic lifts",
              "Accessible accommodations with roll-in showers",
              "Trained guides and support staff",
              "All park entrance fees and permits",
              "Airport transfers with accessible vehicles",
              "Portable wheelchair for rough terrain",
              "Medical support and emergency protocols",
              "Customized pacing and rest periods",
              "Accessible dining arrangements",
              "Travel insurance assistance",
              "Pre-trip accessibility consultation",
              "24/7 support during your safari",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Our Accessible Safari Tours</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Explore our range of accessible safari experiences across East Africa. Each tour is designed with
              accessibility in mind while delivering the full safari adventure.
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
            <p className="mb-4 text-muted-foreground">
              Don't see what you're looking for? We create custom accessible safaris tailored to your needs.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Request Custom Accessible Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Stories from Our Travelers</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "David Chen",
                location: "Canada",
                disability: "Wheelchair user",
                text: "As a wheelchair user, I never thought I'd experience an African safari. JaeTravel made it not only possible but absolutely incredible. The adapted vehicle was perfect, and I saw lions, elephants, and giraffes up close. The team's professionalism and care exceeded all expectations.",
                rating: 5,
              },
              {
                name: "Maria Rodriguez",
                location: "Spain",
                disability: "Limited mobility",
                text: "The accessible Masai Mara tour was a dream come true. Every detail was considered - from the accessible lodge to the patient guides who ensured I could participate in everything. I felt included and valued throughout the entire journey.",
                rating: 5,
              },
              {
                name: "James Wilson",
                location: "United Kingdom",
                disability: "Wheelchair user",
                text: "Gorilla trekking seemed impossible for me, but JaeTravel found a way. With their adapted equipment and experienced porters, I was able to see mountain gorillas in Rwanda. It was the most emotional and beautiful experience of my life.",
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

      {/* FAQ Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                question: "What types of disabilities can you accommodate?",
                answer:
                  "We accommodate a wide range of disabilities including wheelchair users, limited mobility, visual impairments, and hearing impairments. Our team works with you to understand your specific needs and create a customized safari experience. We recommend contacting us to discuss your requirements in detail.",
              },
              {
                question: "Are the safari vehicles truly wheelchair accessible?",
                answer:
                  "Yes, our vehicles are specially modified with hydraulic lifts that can accommodate most standard wheelchairs. The vehicles have secure restraint systems, wide doors, and pop-up roofs for excellent wildlife viewing. We also provide portable wheelchairs for areas where your personal wheelchair may not be suitable.",
              },
              {
                question: "What about bathroom facilities on safari?",
                answer:
                  "All our partner lodges and camps have accessible bathroom facilities with roll-in showers, grab bars, and raised toilets. During game drives, we plan routes with accessible rest stops and can arrange portable facilities if needed.",
              },
              {
                question: "Can I bring my own wheelchair or mobility equipment?",
                answer:
                  "We encourage you to bring your own equipment if it's most comfortable for you. We'll ensure our vehicles and accommodations can accommodate your specific equipment. We also provide backup equipment and can arrange repairs if needed.",
              },
              {
                question: "Do you offer accessible gorilla trekking?",
                answer:
                  "Yes! While traditional gorilla trekking involves hiking, we work with parks that offer accessible gorilla viewing experiences. This may include shorter routes, sedan chair options, or special permits for closer access. The experience is just as magical and intimate.",
              },
              {
                question: "What is the cost difference for accessible tours?",
                answer:
                  "Accessible tours typically cost 15-25% more than standard tours due to specialized vehicles, equipment, and additional support staff. However, we work to keep costs reasonable while maintaining the highest standards of accessibility and safety. Contact us for a detailed quote.",
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
              Ready to Start Your Accessible Safari Adventure?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
              Our accessibility specialists are here to answer your questions and help plan your perfect safari. We'll
              discuss your specific needs, preferences, and create a customized itinerary that ensures you have the
              adventure of a lifetime.
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
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
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
