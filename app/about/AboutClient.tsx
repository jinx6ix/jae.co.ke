"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Shield, Users, Globe, Leaf, ChevronDown } from "lucide-react"
import Script from "next/script"

interface FAQ {
  question: string
  answer: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
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

// Icon mapping for dynamic icon rendering
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/african-safari-team-with-tourists.jpg"
            alt="JaeTravel Team"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl">
            About JaeTravel Expeditions
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90 text-pretty">
            Creating unforgettable safari experiences across East Africa since 2008. Your trusted partner for
            accessible, sustainable, and authentic African adventures.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  JaeTravel Expeditions was founded in 2008 with a simple mission: to share the magic of East Africa
                  with travelers from around the world while making safari adventures accessible to everyone.
                </p>
                <p>
                  What started as a small family-run operation has grown into one of East Africa's most trusted safari
                  companies, known for our commitment to accessibility, sustainability, and exceptional service. We've
                  helped thousands of travelers experience the wonder of African wildlife, from witnessing the Great
                  Migration to trekking with mountain gorillas.
                </p>
                <p>
                  Our pioneering work in accessible tourism has opened up safari experiences to travelers with
                  disabilities, proving that adventure knows no boundaries. We're proud to be leaders in inclusive
                  travel across Kenya, Tanzania, Rwanda, and Uganda.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/safari-guides-with-tourists-in-africa.jpg" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item, i) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
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
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Our experienced guides and support staff are passionate about East Africa and dedicated to creating
              exceptional safari experiences.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={`/ceholder-svg-key-team.jpg?key=team${index}&height=200&width=200&query=${member.name}`}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="mb-3 text-sm text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="mb-10 text-center font-serif text-4xl font-bold text-balance">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border bg-background p-5 shadow-sm transition-all hover:shadow-md"
              >
                <button
                  className="flex w-full items-center justify-between text-left text-lg font-medium"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openIndex === index ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Structured Data */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Join Us on an Adventure</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
            Experience the difference that passion, expertise, and commitment to accessibility make. Let us create your
            perfect East African safari.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/tours">Explore Our Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}