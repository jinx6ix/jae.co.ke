"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    image: "/masai-mara-migration.jpg",
    title: "Discover the Magic of East Africa",
    subtitle: "Embark on unforgettable safari adventures across Kenya, Tanzania, Rwanda, and Uganda",
    cta: "Explore Tours",
    ctaLink: "/tours",
  },
  {
    image: "/mountain-gorilla-trekking.jpg",
    title: "Gorilla Trekking Adventures",
    subtitle: "Experience intimate encounters with mountain gorillas in Rwanda and Uganda",
    cta: "View Gorilla Tours",
    ctaLink: "/tours?type=Primate+Trekking",
  },
  {
    image: "/accessible-safari-wheelchair.jpg",
    title: "Safari Adventures for Everyone",
    subtitle: "Accessible tours with wheelchair-adapted vehicles and trained guides",
    cta: "Accessible Tours",
    ctaLink: "/disability-tours",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover brightness-50"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">JaeTravel Expeditions</div>
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
          {heroSlides[currentSlide].title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl text-pretty">
          {heroSlides[currentSlide].subtitle}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-w-[200px] text-base">
            <Link href={heroSlides[currentSlide].ctaLink}>
              {heroSlides[currentSlide].cta} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] border-white bg-white/10 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur transition-all hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur transition-all hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
