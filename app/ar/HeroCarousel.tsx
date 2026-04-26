// app/ar/HeroCarousel.tsx - نسخة عربية (RTL)
'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import JsonLd from "@/components/JsonLd"

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
    alt: "غروب الشمس الذهبي فوق ماساي مارا مع هجرة الحيوانات البرية في كينيا",
    title: "شاهد الهجرة الكبرى",
    subtitle: "7 ملايين حافر تدوي عبر ماساي مارا — أعظم مشهد للحياة البرية في العالم",
    destination: "ماساي مارا، كينيا",
    ctaText: "احجز رحلة الهجرة",
    ctaLink: "/ar/tours/maasai-cultural-experience",
  },
  {
    id: "gorilla-trekking",
    image: "/golden-monkey-trekking.jpg",
    alt: "عائلة غوريلا جبلية في منتزه البراكين الوطني، رواندا",
    title: "رحلات تتبع الغوريلا في رواندا",
    subtitle: "وجهاً لوجه مع الغوريلا الجبلية المهددة بالانقراض في منتزه البراكين الوطني الضبابي",
    destination: "منتزه البراكين الوطني، رواندا",
    ctaText: "احجز رحلة الغوريلا",
    ctaLink: "/ar/tours/bwindi-gorilla-trek",
  },
  {
    id: "accessible-safari",
    image: "/accessible-safari-wheelchair.jpg",
    alt: "مستخدم كرسي متحرك يستمتع بجولة سفاري في سيارة 4x4 متاحة للكراسي المتحركة في كينيا",
    title: "رحلات سفاري متاحة للجميع",
    subtitle: "سيارات ونزل صديقة للكراسي المتحركة ومرشدون خبراء — مغامرة بلا عوائق",
    destination: "كينيا وتنزانيا",
    ctaText: "استكشف الجولات المتاحة",
    ctaLink: "/ar/disability-tours",
  },
  {
    id: "serengeti",
    image: "/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg",
    alt: "سهول سيرينجيتي اللامتناهية مع هجرة الحيوانات البرية في تنزانيا",
    title: "منتزه سيرينجيتي الوطني",
    subtitle: "موطن الخمسة الكبار ومعابر الأنهار الدراماتيكية للهجرة الكبرى",
    destination: "سيرينجيتي، تنزانيا",
    ctaText: "احجز رحلة سيرينجيتي",
    ctaLink: "/ar/tours/serengeti-migration-tour",
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

  // التشغيل التلقائي
  useEffect(() => {
    if (!isAutoPlaying) return

    resetTimeout()
    timeoutRef.current = setTimeout(goToNext, 6000)

    return () => resetTimeout()
  }, [currentIndex, isAutoPlaying])

  // التنقل عبر لوحة المفاتيح
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
      aria-label="أبرز معالم السفاري في شرق أفريقيا"
      dir="rtl"
    >
      {/* صورة الخلفية (الشريحة الحالية فقط) */}
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

      {/* المحتوى (الشريحة الحالية فقط) */}
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
                <ChevronLeft className="mr-2 h-5 w-5" /> {/* أيقونة السهم لليسار في RTL */}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* أزرار التنقل */}
      <button
        onClick={goToPrev}
        className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40 md:right-8"
        aria-label="الشريحة السابقة"
        aria-controls="carousel-slide"
      >
        <ChevronRight className="h-6 w-6 text-white" /> {/* سهم لليمين يعني السابق في RTL */}
      </button>
      <button
        onClick={goToNext}
        className="group absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40 md:left-8"
        aria-label="الشريحة التالية"
        aria-controls="carousel-slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" /> {/* سهم لليسار يعني التالي في RTL */}
      </button>

      {/* مؤشر النقاط */}
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
            aria-label={`انتقل إلى الشريحة ${index + 1}`}
            aria-current={index === currentIndex}
            aria-controls="carousel-slide"
          />
        ))}
      </div>

      {/* معرف الشريحة المخفي لـ ARIA */}
      <div id="carousel-slide" className="sr-only">
        الشريحة {currentIndex + 1} من {slides.length}: {slides[currentIndex].title}
      </div>

      {/* بيانات منظمة Schema.org (تبقى بالإنجليزية لتحسين محركات البحث) */}
      <JsonLd 
        id="structured-data" 
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: slides.map((slide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "TouristAttraction",
              name: slide.title,
              description: slide.subtitle,
              image: `https://www.jaetravel.co.ke${slide.image}`,
              url: `https://www.jaetravel.co.ke${slide.ctaLink}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: slide.destination.split("،")[0].trim(),
                addressCountry:
                  slide.destination.split("،")[1]?.trim() || "KE",
              },
            },
          })),
        }} 
      />
    </section>
  )
}