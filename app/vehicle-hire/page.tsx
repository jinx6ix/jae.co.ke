// app/vehicle-hire/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Check, Users, Fuel, MapPin, Wrench, Phone, Star } from "lucide-react"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"
import { vehicles } from "@/lib/vehicles-data"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Safari Vehicle Hire & 4x4 Car Rental in East Africa | JaeTravel Expeditions",
    description:
      "Rent premium 4x4 safari vehicles, Land Cruisers, and specialized safari cars in Kenya, Tanzania, Rwanda, and Uganda. Self-drive or with professional driver. Book your safari vehicle rental today for the ultimate African adventure.",
    keywords: [
      "safari vehicles",
      "safari vehicle hire",
      "4x4 safari vehicle rental",
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
      "Maasai Mara safari vehicles",
      "Serengeti 4x4 rental",
      "game drive vehicles"
    ],
    openGraph: {
      title: "Premium Safari Vehicle Hire & 4x4 Rental in East Africa",
      description: "Rent professionally maintained 4x4 Land Cruisers and safari vehicles for self-drive or with expert drivers across Kenya, Tanzania, Rwanda & Uganda.",
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
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/safari-vehicle-on-african-savanna.jpg"
            alt="4x4 safari vehicle on African savanna during golden hour - professional safari vehicles for hire in East Africa"
            fill
            className="object-cover brightness-50"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl">
            Premium Safari Vehicle Hire in East Africa
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white/90 text-pretty">
            Rent professionally maintained <strong>4x4 safari vehicles</strong> and <strong>Land Cruisers</strong> in Kenya, Tanzania, Rwanda, and Uganda. 
            Choose from our fleet of rugged <strong>safari vehicles</strong> for <strong>self-drive adventures</strong> or <strong>with experienced drivers</strong> — 
            perfectly equipped for wildlife safaris, cross-border expeditions, and exploring East Africa's most remote destinations.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="#vehicles">View Safari Vehicles</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/20">
              <a href="tel:+254726485228">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Safari Vehicles */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Why Choose JaeTravel Safari Vehicles</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-muted-foreground leading-relaxed">
            Our <strong>safari vehicles</strong> are specifically designed and maintained for East Africa's challenging conditions. 
            From the dusty tracks of Masai Mara to the volcanic slopes of Rwanda, our fleet delivers reliability, comfort, and unforgettable safari experiences.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fully Insured Safari Vehicles</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All our <strong>safari vehicles</strong> come with comprehensive insurance covering cross-border travel, wildlife parks, and remote areas for complete peace of mind.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expertly Maintained</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every <strong>4x4 safari vehicle</strong> undergoes rigorous maintenance checks before each rental. Our mechanics specialize in Land Cruisers and safari vehicles.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 Roadside Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Emergency assistance network across East Africa. Satellite phones in all <strong>safari vehicles</strong> ensure help is always available, even in remote locations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Cross-Border Ready</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our <strong>safari vehicles</strong> are fully documented for travel between Kenya, Tanzania, Uganda, and Rwanda. We handle all border paperwork and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safari Vehicle Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-balance">Professional Safari Vehicles Built for Adventure</h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Our <strong>safari vehicles</strong> are not just rental cars – they're specially modified 4x4 machines designed specifically for African safari conditions. 
                Each vehicle in our fleet features essential safari modifications that make the difference between a good trip and an exceptional one.
              </p>
              <div className="space-y-4">
                {[
                  "Pop-up roofs for 360-degree wildlife viewing and photography",
                  "Reinforced suspension systems for rough terrain comfort",
                  "Long-range fuel tanks for remote park exploration",
                  "All-terrain tires with puncture repair kits",
                  "Refrigerators for keeping drinks and food fresh",
                  "Charging ports and power inverters for electronics",
                  "Custom storage for photography equipment and luggage",
                  "High-ground clearance for river crossings and muddy tracks"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/7dd878ab-e7e6-4aa4-bcef-54a611fbdf01.jpg"
                alt="Interiors of professional safari vehicle showing pop-up roof and comfortable seating for game viewing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section id="vehicles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Our Premium Safari Vehicle Fleet</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              From rugged <strong>4x4 Land Cruiser safari vehicles</strong> to specialized accessible vans, our fleet is engineered for East Africa's diverse conditions. 
              Each <strong>safari vehicle</strong> is meticulously maintained and equipped for optimal game viewing, photography, and comfort.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">What Our Clients Say About Our Safari Vehicles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                location: "Australia",
                text: "The Land Cruiser safari vehicle was absolutely perfect for our Masai Mara trip. The pop-up roof gave us incredible game viewing, and the vehicle handled everything from muddy tracks to river crossings without any issues.",
                rating: 5
              },
              {
                name: "Michael Chen",
                location: "Canada",
                text: "We did a self-drive through Tanzania and Kenya with one of their 4x4 safari vehicles. The GPS and satellite phone gave us peace of mind, and the vehicle was incredibly reliable. Best safari vehicle rental experience!",
                rating: 5
              },
              {
                name: "Emma Rodriguez",
                location: "Spain",
                text: "The wheelchair accessible safari vehicle was a game-changer for our family. My father could enjoy every game drive comfortably. The ramp system worked perfectly and the driver was incredibly helpful.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Frequently Asked Questions About Safari Vehicles</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to know about renting <strong>safari vehicles</strong> in East Africa
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-3 text-primary">{faq.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready for Your East Africa Safari Adventure?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Get a custom quote for our premium <strong>4x4 safari vehicles</strong>, check availability for your travel dates, 
            or book your <strong>self-drive Land Cruiser</strong> today. Our safari vehicle experts are ready to help you plan the perfect African adventure.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Safari Vehicle Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Our Vehicle Team
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="tel:+254726485228">
                <Phone className="mr-2 h-5 w-5" /> Call +254 726 485 228
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            All safari vehicles include comprehensive insurance • 24/7 roadside support • Cross-border documentation assistance
          </p>
        </div>
      </section>
    </div>
  )
}