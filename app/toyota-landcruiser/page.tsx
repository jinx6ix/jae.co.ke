// app/vehicle-hire/toyota-landcruiser/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ArrowRight } from "lucide-react"
import CruiserHero from "./CruiserHero"
import CruiserFeatures from "./CruiserFeatures"
import CruiserSpecs from "./CruiserSpecs"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// Metadata + JSON-LD
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Toyota Land Cruiser Hire Kenya & Tanzania | Safari 4x4 | JAE Travel",
    description:
      "Hire a Toyota Land Cruiser for safari in Kenya, Tanzania, Uganda & Rwanda. Pop-up roof, 7 seats, 4x4, driver optional. From $120/day. Book now!",
    keywords: [
      "Toyota Land Cruiser hire Kenya",
      "safari vehicle rental",
      "4x4 car hire Tanzania",
      "Land Cruiser safari Maasai Mara",
      "off-road vehicle hire Uganda",
      "pop up roof Land Cruiser",
      "7 seater safari car rental",
      "Nairobi Land Cruiser hire",
      "Arusha 4x4 rental",
      "cross border safari vehicle",
      "Land Cruiser with driver",
      "East Africa overland vehicle",
      "safari Land Cruiser rental Kenya",
      "4x4 hire Tanzania safari",
      "Uganda gorilla trekking vehicle",
      "Rwanda safari car hire",
      "luxury safari vehicle rental",
      "Land Cruiser Prado hire",
      "game drive vehicle rental",
      "off road safari transport",
      "East Africa expedition vehicle",
    ],
    openGraph: {
      title: "Toyota Land Cruiser Safari Hire | Kenya & Tanzania",
      description: "Rent a rugged 7-seater Toyota Land Cruiser with pop-up roof for your East Africa safari. Self-drive or with driver.",
      images: ["/WhatsApp Image 2025-10-14 at 21.13.25_75828e63.jpg"],
    },
    alternates: {
      canonical: "https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser",
      languages: {
        'en': 'https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser',           // Main English/global
        'en-US': 'https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser',       // US
        'en-GB': 'https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser',       // UK (optional)
        'en-AU': 'https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser',       // Australia (optional)
        'en-CA': 'https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser',       // Canada (optional)
        'x-default': 'https://www.jaetravelexpeditions.com/vehicle-hire/toyota-landcruiser',   // Fallback
      },
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  }
}

// ————————————————————————
// Server Component: Main Page
// ————————————————————————
export default function ToyotaLandCruiserPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero – Client */}
      <CruiserHero />

      {/* Features – Client */}
      <CruiserFeatures />

      {/* Introduction Paragraphs */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
          <p>
            The <strong>Toyota Land Cruiser hire Kenya</strong> experience represents the pinnacle of 
            <strong>safari vehicle rental</strong> in East Africa. Renowned for its rugged reliability and 
            exceptional off-road capabilities, the Land Cruiser is the preferred choice for serious safari 
            enthusiasts exploring the challenging terrain of the <strong>Maasai Mara</strong>, 
            <strong>Serengeti</strong>, and other iconic wildlife destinations. Our fleet of well-maintained 
            <strong>4x4 car hire Tanzania</strong> options ensures you can tackle any adventure with confidence.
          </p>
          
          <p>
            Whether you're planning a <strong>Land Cruiser safari Maasai Mara</strong> expedition or 
            navigating the volcanic landscapes of Rwanda, our <strong>pop up roof Land Cruiser</strong> 
            vehicles provide unparalleled game viewing opportunities. The <strong>7 seater safari car rental</strong> 
            configuration makes it ideal for families and small groups, while the spacious interior 
            accommodates all your gear for extended <strong>East Africa overland vehicle</strong> adventures 
            across multiple countries.
          </p>

          <p>
            Our <strong>Nairobi Land Cruiser hire</strong> service offers convenient pickup from Jomo Kenyatta 
            International Airport, while <strong>Arusha 4x4 rental</strong> options serve travelers starting 
            their Tanzanian safari adventures. For those exploring Uganda's primate parks, our 
            <strong>off-road vehicle hire Uganda</strong> solutions provide the perfect transportation for 
            gorilla trekking in Bwindi or chimpanzee tracking in Kibale Forest.
          </p>

          <p>
            The versatility of our <strong>cross border safari vehicle</strong> fleet allows seamless travel 
            between Kenya, Tanzania, Rwanda, and Uganda. Whether you choose <strong>Land Cruiser with driver</strong> 
            for a guided experience or prefer the freedom of self-drive, our vehicles come equipped with 
            all necessary documentation and permits for international travel. This makes your 
            <strong>Rwanda safari car hire</strong> experience completely hassle-free from start to finish.
          </p>

          <p>
            Each <strong>safari Land Cruiser rental Kenya</strong> vehicle in our fleet undergoes rigorous 
            maintenance checks and is equipped with essential safari accessories including pop-up roofs, 
            refrigerator boxes, power inverters, and comprehensive emergency kits. Our commitment to 
            vehicle quality and customer safety ensures that your <strong>4x4 hire Tanzania safari</strong> 
            adventure is not only memorable but also completely secure and reliable throughout your journey.
          </p>
        </div>
      </section>

      {/* Specs – Client */}
      <CruiserSpecs />

      {/* Regional Coverage */}
      <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            East Africa Land Cruiser Coverage
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kenya & Tanzania Safari Routes</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Perfect for <strong>Land Cruiser safari Maasai Mara</strong> adventures and 
                <strong>Serengeti tour transport</strong>. Our vehicles are specially equipped for 
                the Great Migration circuit, with experienced drivers who know the best game viewing 
                spots and crossing points for wildebeest and zebra herds.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From <strong>Nairobi Land Cruiser hire</strong> to <strong>Arusha 4x4 rental</strong>, 
                we provide seamless cross-border solutions for exploring both countries in one epic 
                safari journey, complete with all necessary documentation and border crossing assistance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Uganda & Rwanda Primate Adventures</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Essential for <strong>Uganda gorilla trekking vehicle</strong> requirements and 
                <strong>Rwanda safari car hire</strong> needs. The Land Cruiser's robust suspension 
                and four-wheel drive capability make it ideal for navigating the mountainous terrain 
                of Bwindi Impenetrable Forest and Volcanoes National Park.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our <strong>off-road vehicle hire Uganda</strong> services ensure comfortable access 
                to remote primate habitats, while our Rwanda operations provide reliable transportation 
                for cultural tours and wildlife viewing in Nyungwe Forest and Akagera National Park.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Options */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Rental Plans & Pricing
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">Self-Drive</h3>
            <p className="mb-4 text-3xl font-bold">$120 <span className="text-lg text-muted-foreground">/ day</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">Check Unlimited mileage</li>
              <li className="flex items-center gap-2">Check Full insurance</li>
              <li className="flex items-center gap-2">Check GPS & cooler box</li>
              <li className="flex items-center gap-2">Check Free pickup (Nairobi/Arusha)</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=landcruiser-self">Book Self-Drive</Link>
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 font-serif text-2xl font-bold text-primary">With Driver-Guide</h3>
            <p className="mb-4 text-3xl font-bold">$180 <span className="text-lg text-muted-foreground">/ day</span></p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">Check Expert local guide</li>
              <li className="flex items-center gap-2">Check All fuel included</li>
              <li className="flex items-center gap-2">Check Park entry assistance</li>
              <li className="flex items-center gap-2">Check Custom safari route</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/book-now?vehicle=landcruiser-driver">Book With Driver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          What Travelers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Michael T.", location: "Nairobi → Tsavo", text: "The Land Cruiser never missed a beat. Perfect for long safaris." },
            { name: "Emma & Family", location: "Arusha → Ngorongoro", text: "7 seats + pop-up roof = best family safari ever!" },
            { name: "Alex P.", location: "Entebbe → Queen Elizabeth", text: "Driver knew every animal track. Worth every penny." }
          ].map((t, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-6">
              <p className="mb-3 italic text-muted-foreground">"{t.text}"</p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="mb-2 text-xl font-bold">{faq.name}</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                {faq.acceptedAnswer && (
                  <p itemProp="text" className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
          Ready for the Ultimate Safari?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-pretty text-primary-foreground/90">
          Hire the <strong>Toyota Land Cruiser</strong> — the gold standard for <strong>East Africa safaris</strong>. 
          From <strong>Maasai Mara</strong> to <strong>Serengeti</strong>, this 4x4 conquers all. Experience the best in 
          <strong>safari vehicle rental</strong> with our premium <strong>Land Cruiser hire Kenya</strong> and 
          <strong>Tanzania 4x4 rental</strong> services, available with or without professional driver-guides.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/contact">
              Get Quote Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground">
            <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm">
          <Mail className="inline h-4 w-4 mr-1" />
          <a href="mailto:info@jaetravelexpeditions.co.ke" className="underline">info@jaetravelexpeditions.co.ke</a>
          {' '}|{' '}
          <Phone className="inline h-4 w-4 mr-1" />
          <a href="tel:+254726485228" className="underline">+254 726 485 228</a>
        </p>
      </section>
    </div>
  )
}