// app/HeroCarousel.tsx
'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

type Slide = {
  id: string
  image: string
  alt: string
  title: string
  subtitle: string
  destination: string
  ctaText: string
  ctaLink: string
}

const slides: Slide[] = [
  {
    id: "masai-mara",
    image: "/masai-mara-migration.jpg",
    alt: "Golden sunset over Masai Mara with wildebeest migration in Kenya",
    title: "Witness the Great Migration",
    subtitle: "7 million hooves thunder across the Masai Mara — the world's greatest wildlife spectacle",
    destination: "Masai Mara, Kenya",
    ctaText: "Book Migration Safari",
    ctaLink: "/tours/maasai-cultural-experience",
  },
  {
    id: "gorilla-trekking",
    image: "/golden-monkey-trekking.jpg",
    alt: "Mountain gorilla family in Volcanoes National Park, Rwanda",
    title: "Gorilla Trekking in Rwanda",
    subtitle: "Face-to-face with endangered mountain gorillas in the misty Volcanoes National Park",
    destination: "Volcanoes National Park, Rwanda",
    ctaText: "Book Gorilla Trek",
    ctaLink: "/tours/bwindi-gorilla-trek",
  },
  {
    id: "accessible-safari",
    image: "/accessible-safari-wheelchair.jpg",
    alt: "Wheelchair user enjoying game drive in accessible 4x4 safari vehicle in Kenya",
    title: "Accessible Safaris for All",
    subtitle: "Wheelchair-friendly vehicles, lodges, and expert guides — adventure without barriers",
    destination: "Kenya & Tanzania",
    ctaText: "Explore Accessible Tours",
    ctaLink: "/disability-tours",
  },
  {
    id: "serengeti",
    image: "/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg",
    alt: "Endless plains of Serengeti with wildebeest migration in Tanzania",
    title: "Serengeti National Park",
    subtitle: "Home to the Big Five and the dramatic river crossings of the Great Migration",
    destination: "Serengeti, Tanzania",
    ctaText: "Book Serengeti Safari",
    ctaLink: "/tours/serengeti-migration-tour",
  },
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    resetTimeout()
  }

  const goToPrev = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return

    resetTimeout()
    timeoutRef.current = setTimeout(goToNext, 6000)

    return () => resetTimeout()
  }, [currentIndex, isAutoPlaying])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="East Africa Safari Highlights"
    >
      {/* Background Image (only current slide) */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentIndex].image}
          alt={slides[currentIndex].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      {/* Content (only current slide) */}
      <div className="relative flex h-full items-center justify-start px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl text-left text-white">
            <p className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-white/90">
              <MapPin className="h-4 w-4" />
              {slides[currentIndex].destination}
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {slides[currentIndex].title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              {slides[currentIndex].subtitle}
            </p>
            <Button asChild size="lg" className="shadow-lg">
              <Link href={slides[currentIndex].ctaLink}>
                {slides[currentIndex].ctaText}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="group absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40 md:left-8"
        aria-label="Previous slide"
        aria-controls="carousel-slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40 md:right-8"
        aria-label="Next slide"
        aria-controls="carousel-slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
            aria-controls="carousel-slide"
          />
        ))}
      </div>

      {/* Hidden Slide ID for ARIA */}
      <div id="carousel-slide" className="sr-only">
        Slide {currentIndex + 1} of {slides.length}: {slides[currentIndex].title}
      </div>

      {/* Schema.org Carousel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: slides.map((slide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristAttraction",
                name: slide.title,
                description: slide.subtitle,
                image: `https://jaetravel.co.ke${slide.image}`,
                url: `https://jaetravel.co.ke${slide.ctaLink}`,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: slide.destination.split(",")[0].trim(),
                  addressCountry:
                    slide.destination.split(",")[1]?.trim() || "KE",
                },
              },
            })),
          }),
        }}
      />
    </section>
  )
}