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
      "Explore East Africa's best destinations: Kenya (Masai Mara, Amboseli), Tanzania (Serengeti, Zanzibar), Rwanda (gorilla trekking), Uganda (Bwindi, Queen Elizabeth). Book wildlife safaris, cultural tours, and accessible adventures.",
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
      canonical: "https://jaetravel.co.ke/destinations",
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
          Explore East Africa's Top Destinations
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          From the endless plains of <strong>Masai Mara</strong> and <strong>Serengeti</strong> to the misty mountains of <strong>Volcanoes National Park</strong> and <strong>Bwindi</strong>, 
          discover the best of <strong>Kenya, Tanzania, Rwanda, and Uganda</strong> with expert-guided safari tours, cultural experiences, and accessible travel options.
        </p>
      </header>

      {/* Introduction Paragraphs */}
      <section className="mb-16 space-y-6 max-w-4xl mx-auto">
        <p className="text-lg leading-relaxed">
          <strong>East Africa Destinations</strong> offer some of the world's most spectacular wildlife viewing and cultural experiences. 
          Whether you're seeking the Great Migration in <strong>Masai Mara Kenya</strong> and <strong>Serengeti Tanzania</strong>, 
          or the unforgettable primate encounters in <strong>Rwanda Gorillas</strong> territory and <strong>Bwindi Gorilla Trekking</strong> in Uganda, 
          our carefully curated <strong>African Destinations</strong> portfolio ensures unforgettable adventures.
        </p>
        
        <p className="text-lg leading-relaxed">
          Our <strong>East Africa Safari Destinations</strong> include iconic parks like <strong>Amboseli National Park</strong> with its breathtaking views of Mount Kilimanjaro, 
          <strong>Lake Nakuru</strong> famous for flamingo populations, the wildlife-rich <strong>Ngorongoro Crater</strong>, and Uganda's diverse <strong>Queen Elizabeth National Park</strong>. 
          Each destination offers unique ecosystems and wildlife encounters that define the <strong>Best Places to Visit in East Africa</strong>.
        </p>
        
        <p className="text-lg leading-relaxed">
          For those seeking coastal relaxation, <strong>Zanzibar Beach</strong> extensions provide the perfect complement to safari adventures. 
          Our comprehensive <strong>Kenya Tanzania Rwanda Uganda Tours</strong> allow you to experience multiple countries in one seamless itinerary, 
          from <strong>Tanzania Tours</strong> focusing on northern circuit safaris to <strong>Uganda Safari</strong> adventures in the Pearl of Africa.
        </p>

        {/* Additional SEO Paragraphs */}
        <p className="text-lg leading-relaxed">
          When planning your <strong>East Africa Destinations</strong> itinerary, consider the seasonal highlights of each region. 
          The <strong>Masai Mara Kenya</strong> experience peaks during the Great Migration from July to October, while <strong>Serengeti Tanzania</strong> 
          offers exceptional predator action year-round. For <strong>Rwanda Gorillas</strong> encounters, <strong>Volcanoes National Park</strong> 
          provides accessible trekking experiences, whereas <strong>Bwindi Gorilla Trekking</strong> in Uganda offers a more rugged, immersive adventure 
          in ancient rainforest surroundings.
        </p>

        <p className="text-lg leading-relaxed">
          Beyond the famous <strong>African Destinations</strong>, East Africa boasts hidden gems that complete the safari experience. 
          <strong>Lake Nakuru</strong> transforms into a pink-hued spectacle with millions of flamingos, while <strong>Amboseli National Park</strong> 
          delivers postcard-perfect elephant herds against Mount Kilimanjaro backdrops. The <strong>Ngorongoro Crater</strong> serves as a natural amphitheater 
          teeming with wildlife, and <strong>Queen Elizabeth National Park</strong> offers unique boat safaris along the Kazinga Channel alongside classic game drives.
        </p>

        <p className="text-lg leading-relaxed">
          Combining these diverse <strong>East Africa Safari Destinations</strong> creates the ultimate African adventure. Our <strong>Kenya Tanzania Rwanda Uganda Tours</strong> 
          are carefully designed to showcase the unique strengths of each country - from the wildebeest crossings in <strong>Masai Mara Kenya</strong> to the spice tours 
          and crystal waters of <strong>Zanzibar Beach</strong>, and from the mountain gorilla encounters in <strong>Volcanoes National Park</strong> to the chimpanzee 
          tracking in Uganda's forests. These <strong>Best Places to Visit in East Africa</strong> represent the pinnacle of wildlife tourism and cultural immersion.
        </p>
      </section>

      {/* Destinations Grid */}
      <section className="grid gap-8 md:grid-cols-2 mb-16">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </section>

      {/* Regional Highlights */}
      <section className="mb-16 py-12 bg-muted/30 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">East Africa Regional Highlights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kenya & Tanzania Safari Circuits</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the classic <strong>East Africa Safari Destinations</strong> including the Masai Mara-Serengeti ecosystem, 
                Amboseli's elephant herds, and the Ngorongoro Conservation Area. These <strong>African Destinations</strong> offer 
                some of the world's most reliable big game viewing and photographic opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Rwanda & Uganda Primate Adventures</h3>
              <p className="text-muted-foreground leading-relaxed">
                Venture into the forests of <strong>Volcanoes National Park</strong> and <strong>Bwindi Impenetrable Forest</strong> 
                for intimate gorilla encounters. These <strong>Rwanda Gorillas</strong> and <strong>Uganda Safari</strong> experiences 
                represent some of the most profound wildlife interactions available anywhere in the world.
              </p>
            </div>
          </div>
        </div>
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
          Can't Decide Where to Go?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          Our East Africa travel experts can design a custom multi-country itinerary combining <strong>Kenya wildlife safaris</strong>, 
          <strong>Tanzania beach extensions</strong>, <strong>Rwanda gorilla trekking</strong>, and <strong>Uganda adventure tours</strong>. 
          Explore the best <strong>East Africa Destinations</strong> with tailored <strong>Kenya Tanzania Rwanda Uganda Tours</strong> 
          that match your interests and travel style.
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