"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Shield, Users, Globe, Leaf, ChevronDown, Star, MapPin, Calendar, Phone, Trees, Users as UsersIcon } from "lucide-react"
import Script from "next/script"

interface FAQ {
  question: string
  answer: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface Value {
  icon: string
  title: string
  text: string
}

interface AboutClientProps {
  faqs: FAQ[]
  teamMembers: TeamMember[]
  values: Value[]
}

const iconMap = {
  Heart,
  Leaf,
  Users,
  Shield,
  Award,
  Globe,
}

export default function AboutClient({ faqs, teamMembers, values }: AboutClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Enhanced FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<strong>|<\/strong>/g, ""),
      },
    })),
  }

  // Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JaeTravel Expeditions",
    "url": "https://www.jaetravel.co.ke",
    "logo": "https://www.jaetravel.co.ke/logo.png",
    "description": "Award-winning accessible and sustainable safari operator in East Africa since 2008.",
    "foundingDate": "2008",
    "founder": { "@type": "Person", "name": "James Kimani" },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254726485228",
      "contactType": "Customer Service",
      "areaServed": ["KE", "TZ", "RW", "UG"],
      "availableLanguage": ["English", "Swahili"]
    },
    "award": [
      "Kenya Tourism Award – Accessible Tourism 2023",
      "World Travel Awards – Africa's Responsible Tourism 2024"
    ],
    "sameAs": [
      "https://www.facebook.com/JaeTravelExpeditions",
      "https://www.instagram.com/JaeTravelExpeditions"
    ]
  }

  return (
    <div className="pb-16">
      {/* Structured Data */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="org-schema" type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </Script>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/african-safari-team-with-tourists.jpg"
            alt="JaeTravel team guiding accessible safari group in Masai Mara, Kenya"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
            About <span className="text-primary">JaeTravel</span> Expeditions
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-white/90 text-pretty">
            <strong>Since 2008</strong>, we've been East Africa's most trusted name in <strong>accessible</strong>, 
            <strong> sustainable</strong>, and <strong>authentic safaris</strong> — helping over <strong>15,000 travelers</strong> 
            experience Kenya, Tanzania, Rwanda, and Uganda with dignity, joy, and purpose.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/tours">Explore Our Safaris</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] border-white bg-white/10 backdrop-blur hover:bg-white/20">
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Calendar className="h-8 w-8 mx-auto mb-2" />, label: "Since", value: "2008" },
              { icon: <UsersIcon className="h-8 w-8 mx-auto mb-2" />, label: "Happy Guests", value: "15,000+" },
              { icon: <Trees className="h-8 w-8 mx-auto mb-2" />, label: "Trees Planted", value: "18,000+" },
              { icon: <Award className="h-8 w-8 mx-auto mb-2" />, label: "Awards Won", value: "12+" },
            ].map((stat, i) => (
              <div key={i}>
                {stat.icon}
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Paragraphs */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              <strong>JaeTravel Expeditions</strong> stands as East Africa's premier safari operator, 
              specializing in creating unforgettable wildlife experiences across <strong>Kenya, Tanzania, Rwanda, and Uganda</strong>. 
              Founded in 2008 by James Kimani, our company has grown from a small family operation into 
              a respected leader in <strong>accessible tourism</strong> and <strong>sustainable safari practices</strong>. 
              Our commitment to excellence has earned us recognition as one of the most trusted 
              <strong> safari tour operators in East Africa</strong>.
            </p>
            
            <p>
              What sets <strong>JaeTravel</strong> apart is our unwavering dedication to 
              <strong> accessible travel solutions</strong>. We pioneered wheelchair-friendly safaris in 
              East Africa, developing specialized vehicles and training our guides in inclusive tourism practices. 
              Our fleet of <strong>hydraulic-lift 4x4 vehicles</strong> and partnerships with 
              <strong> barrier-free lodges</strong> ensure that travelers of all abilities can experience 
              the magic of African wildlife in comfort and safety. Discover our <a href="/disability-tours" className="text-primary hover:underline">specialized disability tours</a>.
            </p>

            <p>
              Beyond accessibility, we are deeply committed to <strong>sustainable tourism</strong> and 
              <strong> conservation efforts</strong> throughout East Africa. Each safari with JaeTravel 
              contributes to local community development, wildlife protection programs, and environmental 
              conservation initiatives. We've planted over 18,000 trees, supported numerous community 
              projects, and maintained <strong>carbon-neutral operations</strong> since 2015.
            </p>

            <p>
              Our team of <strong>professional safari guides</strong> represents the heart of JaeTravel. 
              Each guide undergoes extensive training in wildlife behavior, photography techniques, 
              first aid, and cultural interpretation. Many of our guides come from local communities 
              and have generations of knowledge about East Africa's ecosystems, ensuring authentic 
              and insightful safari experiences for our guests. Check out our <a href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara migration tours</a>.
            </p>

            <p>
              As we continue to grow, our mission remains unchanged: to provide 
              <strong> exceptional safari experiences</strong> that are accessible to all, beneficial 
              to local communities, and protective of East Africa's precious wildlife and habitats. 
              Whether you're seeking a classic <strong>Masai Mara safari</strong>, a 
              <strong> gorilla trekking adventure</strong> in Uganda, or a customized multi-country 
              itinerary, JaeTravel delivers unforgettable journeys that respect both people and planet. 
              Browse our <a href="/budget-tours" className="text-primary hover:underline">affordable budget tours</a> or luxury options to find your perfect safari.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story – Expanded */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-balance">Our Journey: From Vision to Victory</h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong>JaeTravel Expeditions was born in 2008</strong> from a simple dream: to share the raw, breathtaking beauty of East Africa with the world — <em>without barriers</em>.
                </p>
                <p>
                  Founder <strong>James Kimani</strong>, a Maasai guide with 20+ years in the bush, saw travelers with disabilities turned away from safaris. He refused to accept that. So he built a company that says <strong>yes</strong> — to wheelchair users, seniors, families, and everyone in between.
                </p>
                <p>
                  Today, we're proud to be <strong>East Africa's leading accessible safari operator</strong>, with a fleet of <strong>hydraulic-lift 4x4s</strong>, partnerships with <strong>barrier-free lodges</strong>, and a team trained in <strong>inclusive guiding</strong>. Explore our <a href="/disability-tours" className="text-primary hover:underline">accessible tour options</a>.
                </p>
                <p>
                  But we're more than accessibility. We're <strong>carbon-neutral</strong>, <strong>community-powered</strong>, and <strong>conservation-driven</strong>. Every safari plants trees, funds schools, and protects wildlife.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge text="Kenya Tourism Award 2023" />
                <Badge text="World Travel Awards 2024" />
                <Badge text="TripAdvisor 5★" />
              </div>
            </div>
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/safari-guides-with-tourists-in-africa.jpg"
                alt="JaeTravel guide helping wheelchair guest during accessible safari in Kenya"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regional Expertise Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            East Africa Safari Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Kenya & Tanzania Safari Specialists</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As leading <strong>safari tour operators in East Africa</strong>, we have deep expertise 
                in Kenya's Masai Mara, Amboseli, and Tsavo ecosystems, as well as Tanzania's Serengeti, 
                Ngorongoro, and Tarangire circuits. Our knowledge of migration patterns, animal behavior, 
                and hidden viewing spots ensures exceptional wildlife experiences for our guests.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We maintain strong relationships with conservancy managers and park authorities, 
                giving our guests access to exclusive areas and special experiences beyond typical 
                tourist routes. Our cross-border operations between Kenya and Tanzania are seamless, 
                with all necessary documentation handled efficiently. Check out our <a href="/maasai-mara-great-migration" className="text-primary hover:underline">Great Migration tours</a>.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Rwanda & Uganda Primate Experts</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our specialized <strong>gorilla trekking safaris</strong> in Uganda and Rwanda are 
                led by guides with extensive experience in primate behavior and conservation. 
                We understand the permit systems, trekking requirements, and best practices for 
                responsible gorilla and chimpanzee viewing in Bwindi, Volcanoes, and Kibale national parks.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond primates, we offer comprehensive cultural and wildlife experiences in both 
                countries, including lake adventures, bird watching, and community visits that 
                provide authentic insights into East African life while supporting local economies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item, i) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <Card key={i} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Meet Your Safari Family</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Our team isn't just experienced — they're <strong>passionate locals</strong> who live and breathe East Africa. 
              From Maasai warriors to conservation PhDs, they're here to make your safari unforgettable.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role} at JaeTravel Expeditions`}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="mb-3 text-sm text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 font-serif text-4xl font-bold text-balance">Awards & Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <Image src="/awards/kenya-tourism-award.png" alt="Kenya Tourism Award 2023" width={120} height={120} />
            <Image src="/awards/world-travel-awards.png" alt="World Travel Awards 2024" width={120} height={120} />
            <Image src="/awards/tripadvisor-choice.png" alt="TripAdvisor Travelers Choice" width={120} height={120} />
            <Image src="/awards/carbon-neutral.png" alt="Carbon Neutral Operator" width={120} height={120} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium pr-8" dangerouslySetInnerHTML={{ __html: faq.question }} />
                  <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === i ? "rotate-180 text-primary" : ""}`} />
                </div>
                {openIndex === i && (
                  <p className="mt-4 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-balance">
            Ready for Your East African Adventure?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
            Join thousands of happy travelers who've discovered Africa with <strong>JaeTravel</strong> — where accessibility, sustainability, and magic meet. 
            Experience the best of <strong>Kenya wildlife safaris</strong>, <strong>Tanzania migration tours</strong>, 
            <strong>Rwanda gorilla trekking</strong>, and <strong>Uganda adventure travel</strong> with East Africa's most trusted safari operator. 
            Check out our <a href="/budget-tours" className="underline underline-offset-4 hover:text-secondary">budget tours</a> for affordable options or 
            our <a href="/disability-tours" className="underline underline-offset-4 hover:text-secondary">accessible safari packages</a> for barrier-free adventures.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" variant="secondary" className="min-w-[220px]">
              <Link href="/tours">View All Safari Tours</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[220px] border-white text-white hover:bg-white/20">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" /> WhatsApp Us
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">Free consultation • Instant response • 100% customized</p>
        </div>
      </section>
    </div>
  )
}

// Helper Badge Component
function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      <Award className="mr-1 h-3 w-3" /> {text}
    </span>
  )
}