"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Clock, Users, Calendar, Phone, CheckCircle, Globe, Shield, Accessibility, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { TabNav, TabOverview, TabItinerary, TabGallery, TabAccessibility, TabFAQs, getTabCounts } from "./components/TabComponents"

const BookingForm = dynamic(() => import("./components/BookingForm"), { ssr: false })

interface AccessibleTourClientProps {
  tour: any
  absoluteUrl: string
  absoluteImageUrl: string
  hasDiscount: boolean
}

export default function AccessibleTourClient({ tour, absoluteUrl, absoluteImageUrl, hasDiscount }: AccessibleTourClientProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const tabCounts = getTabCounts(tour)

  // Image carousel state
  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image]
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImage(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextImage, 4000)
    return () => clearInterval(interval)
  }, [nextImage, isAutoPlaying])

  const getImageUrl = (img: string) => img.startsWith('/') ? `https://www.jaetravel.co.ke${img}` : img

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1.5 md:gap-2">
          <li><Link href="/" className="hover:text-teal-600 transition text-xs md:text-sm">Home</Link></li>
          <li><span className="text-gray-300">/</span></li>
          <li><Link href="/accessible-migration" className="hover:text-teal-600 transition text-xs md:text-sm">Accessible Safaris</Link></li>
          <li><span className="text-gray-300">/</span></li>
          <li className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-[200px] md:max-w-none text-xs md:text-sm">{tour.title}</li>
        </ol>
      </nav>

      {/* Hero Section with Sliding Images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-6">
        {/* Image Carousel */}
        <div
          className="relative w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[520px] rounded-2xl overflow-hidden group bg-gradient-to-br from-teal-600 to-emerald-700"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Images */}
          {images.map((img: string, i: number) => {
            const imgUrl = getImageUrl(img)
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={imgUrl}
                  alt={tour.imageAlt || `${tour.title} - Image ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )
          })}

          {/* Fallback if no images */}
          {images.length === 0 && (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center">
              <div className="text-center text-white">
                <Accessibility className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Accessible Safari</p>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all flex items-center justify-center text-white opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all flex items-center justify-center text-white opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_: string, i: number) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
            <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
              <span className="bg-teal-600 text-white text-xs md:text-sm font-medium px-2.5 md:px-3 py-1 rounded-full">
                Accessible Safari
              </span>
              {hasDiscount && (
                <span className="bg-red-500 text-white text-xs md:text-sm font-bold px-2.5 md:px-3 py-1 rounded-full">
                  Special Offer
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-medium px-2.5 md:px-3 py-1 rounded-full">
                {images.length} Photos
              </span>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight max-w-3xl">
              {tour.title}
            </h1>
          </div>
        </div>

        {/* Stats Bar - Single Row */}
        <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 md:gap-3 lg:gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-sm border border-gray-100 flex-shrink-0">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
            <div className="text-center">
              <span className="text-xs md:text-sm font-bold text-gray-900 block">{tour.duration.split(' ')[0]}</span>
              <span className="text-xs text-gray-500 hidden sm:inline">Days</span>
            </div>
          </div>

          <div className="w-px h-6 md:h-8 bg-gray-200 flex-shrink-0" />

          <div className="flex items-center gap-2 bg-white rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-sm border border-gray-100 flex-shrink-0">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
            <div className="text-center">
              <span className="text-xs md:text-sm font-bold text-gray-900 block">{tour.groupSize.split(' ')[0]}</span>
              <span className="text-xs text-gray-500 hidden sm:inline">People</span>
            </div>
          </div>

          <div className="w-px h-6 md:h-8 bg-gray-200 flex-shrink-0" />

          <div className="flex items-center gap-2 bg-white rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-sm border border-gray-100 flex-shrink-0">
            <div className="flex text-amber-400">
              <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />
            </div>
            <div className="text-center">
              <span className="text-xs md:text-sm font-bold text-gray-900 block">{tour.rating}/5</span>
              <span className="text-xs text-gray-500 hidden sm:inline">{tour.reviewCount} reviews</span>
            </div>
          </div>

          <div className="w-px h-6 md:h-8 bg-gray-200 flex-shrink-0" />

          <div className="flex items-center gap-2 bg-white rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-sm border border-gray-100 flex-shrink-0">
            <Accessibility className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
            <div className="text-center">
              <span className="text-xs md:text-sm font-bold text-gray-900 block">Full</span>
              <span className="text-xs text-gray-500 hidden sm:inline">Access</span>
            </div>
          </div>

          <div className="w-px h-6 md:h-8 bg-gray-200 flex-shrink-0" />

          <div className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-sm flex-shrink-0">
            <span className="text-base md:text-lg font-bold text-white">${tour.price}</span>
            <span className="text-xs text-white/80">/person</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} tabCounts={tabCounts} />

        <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {/* Main Column - Tab Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && <TabOverview tour={tour} />}
            {activeTab === "itinerary" && <TabItinerary tour={tour} />}
            {activeTab === "gallery" && <TabGallery tour={tour} />}
            {activeTab === "accessibility" && <TabAccessibility tour={tour} />}
            {activeTab === "faqs" && <TabFAQs tour={tour} />}
            {activeTab === "booking" && (
              <section id="booking-form" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                  Book This Accessible Safari
                </h2>
                <BookingForm
                  tourTitle={tour.title}
                  tourPrice={tour.price}
                  tourDuration={tour.duration}
                  serviceType="tour"
                  slug={tour.slug}
                />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-6 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6">
                <div className="mb-5">
                  {hasDiscount && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 line-through">${tour.originalPrice}</span>
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        Save ${tour.originalPrice! - tour.price}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">${tour.price}</span>
                    <span className="text-gray-500 text-sm">/ person</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Clock className="h-4 w-4 mx-auto text-teal-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900 block">{tour.duration}</span>
                    <span className="text-xs text-gray-500">Duration</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Users className="h-4 w-4 mx-auto text-teal-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900 block">{tour.groupSize.split(' ')[0]}</span>
                    <span className="text-xs text-gray-500">People</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <MapPin className="h-4 w-4 mx-auto text-teal-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900 block">{tour.departure.split(' ')[0]}</span>
                    <span className="text-xs text-gray-500">Departure</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="flex justify-center text-amber-400 mb-1">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <span className="text-xs font-medium text-gray-900 block">{tour.rating}/5</span>
                    <span className="text-xs text-gray-500">{tour.reviewCount} reviews</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab("booking")}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Calendar className="h-4 w-4" />
                    Book This Safari
                  </button>
                  <a
                    href={`https://wa.me/+254726485228?text=${encodeURIComponent(`Hello! I'm interested in booking: ${tour.title} for $${tour.price}. Can you confirm availability?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Inquiry
                  </a>
                  <a
                    href="tel:+254726485228"
                    className="w-full border-2 border-gray-200 hover:border-teal-600 text-gray-700 hover:text-teal-600 font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Phone className="h-4 w-4" />
                    Call +254 726 485 228
                  </a>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Free cancellation up to 14 days before departure
                </p>
              </div>

              {/* Why Book With Us */}
              <div className="bg-teal-50 rounded-2xl p-5 md:p-6 border border-teal-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm md:text-base">
                  <Shield className="h-5 w-5 text-teal-600" />
                  Why Book With JaeTravel
                </h3>
                <div className="space-y-2.5">
                  {[
                    "Wheelchair-accessible vehicles with lifts",
                    "Camps with roll-in showers & grab rails",
                    "Guides trained in disability assistance",
                    "All accessibility details confirmed pre-departure",
                    "Small groups (2-6 people)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 md:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Need Customization?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact us to tailor this safari to your specific accessibility needs.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-teal-600" />
                    <a href="tel:+254726485228" className="font-medium text-teal-600 hover:underline">
                      +254 726 485 228
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-teal-600" />
                    <a href="/contact" className="font-medium text-teal-600 hover:underline">
                      Send a message
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-600">From</p>
            <p className="text-lg font-bold text-gray-900">${tour.price}<span className="text-sm font-normal text-gray-500">/person</span></p>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/+254726485228?text=${encodeURIComponent(`Hello! I'm interested in: ${tour.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2.5 rounded-xl"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <button
              onClick={() => setActiveTab("booking")}
              className="bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="h-16 md:h-20 lg:hidden" />
    </div>
  )
}