"use client"

import { useState } from "react"
import { Accessibility, Calendar, Camera, CheckCircle, FileText, Star, X, Menu } from "lucide-react"

interface Tab {
  id: string
  label: string
  icon: React.ElementType
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "itinerary", label: "Itinerary", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: Camera },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
  { id: "faqs", label: "FAQs", icon: FileText },
  { id: "booking", label: "Book Now", icon: Calendar },
]

interface TabNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabCounts?: Record<string, number>
}

export function TabNav({ activeTab, onTabChange, tabCounts }: TabNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeIndex = tabs.findIndex(t => t.id === activeTab)

  return (
    <div className="mb-6 md:mb-8">
      {/* Mobile Tab Selector */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
        >
          <span className="flex items-center gap-2">
            {tabs.find(t => t.id === activeTab)?.icon && (
              <span className="w-5 h-5">{activeTab === 'overview' ? <FileText className="w-5 h-5" /> : activeTab === 'itinerary' ? <Calendar className="w-5 h-5" /> : activeTab === 'gallery' ? <Camera className="w-5 h-5" /> : activeTab === 'accessibility' ? <Accessibility className="w-5 h-5" /> : activeTab === 'faqs' ? <FileText className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}</span>
            )}
            {tabs.find(t => t.id === activeTab)?.label}
          </span>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id)
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                  {tab.label}
                  {tabCounts && tabCounts[tab.id] !== undefined && (
                    <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {tabCounts[tab.id]}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Desktop Tab Bar */}
      <div className="hidden lg:flex bg-white rounded-2xl border border-gray-200 p-1.5 shadow-sm overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 xl:px-6 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tabCounts && tabCounts[tab.id] !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts[tab.id]}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Mobile Progress Indicator */}
      <div className="lg:hidden mt-3 flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? 'bg-teal-600 w-6' : i < activeIndex ? 'bg-teal-300' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface TourContentProps {
  activeTab: string
  tour: any
  absoluteImageUrl: string
}

export function TabOverview({ tour }: { tour: any }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* About Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">About This Safari</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm md:text-base">{tour.longDescription}</p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Safari Highlights</h2>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {tour.highlights.map((highlight: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm md:text-base">{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
          {tour.included.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>

        {tour.excluded.length > 0 && (
          <>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Not Included</h3>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {tour.excluded.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="h-4 w-4 md:h-5 md:w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export function TabItinerary({ tour }: { tour: any }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Detailed Itinerary</h2>
        <span className="text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full w-fit">
          {tour.duration}
        </span>
      </div>

      <div className="space-y-6 md:space-y-8">
        {tour.itinerary.map((day: any, idx: number) => (
          <div key={day.day} className="relative flex gap-4 md:gap-6">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0 z-10">
                {day.day}
              </div>
              {idx < tour.itinerary.length - 1 && (
                <div className="w-0.5 flex-1 bg-gray-200 mt-2 min-h-[40px]" />
              )}
            </div>
            <div className="pb-6 md:pb-8 flex-1">
              <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">{day.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">{day.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TabGallery({ tour }: { tour: any }) {
  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image]

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 md:mb-3">
          Safari Photo Gallery
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          See what awaits you on this accessible adventure — wildlife, landscapes, and accessible facilities.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.slice(0, 6).map((img: string, i: number) => {
          const imgUrl = img.startsWith('/') ? `https://www.jaetravel.co.ke${img}` : img
          const isLarge = i === 0
          const aspectClass = isLarge ? "aspect-[4/3] md:aspect-[2/1]" : "aspect-square md:aspect-[4/3]"

          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-100 group cursor-pointer ${aspectClass} ${isLarge ? 'col-span-2' : ''}`}
            >
              <img
                src={imgUrl}
                alt={`${tour.title} - Safari image ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          )
        })}
      </div>

      {images.length > 6 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          +{images.length - 6} more photos available
        </p>
      )}
    </section>
  )
}

export function TabAccessibility({ tour }: { tour: any }) {
  if (!tour.accessibility) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
        <p className="text-gray-600">Accessibility details coming soon. Contact us for specific questions.</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
        <Accessibility className="h-5 w-5 md:h-6 md:w-6 text-teal-600" />
        Accessibility Details
      </h2>

      <div className="space-y-4 md:space-y-6">
        <div className="bg-teal-50 rounded-xl p-4 md:p-6 border border-teal-100">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
            <CheckCircle className="h-4 w-4 text-teal-600" />
            Vehicle Accessibility
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{tour.accessibility.vehicle}</p>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 md:p-6 border border-emerald-100">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            Accommodation Accessibility
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{tour.accessibility.accommodation}</p>
        </div>

        {tour.accessibility.terrain && (
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
              <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Terrain & Environment
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{tour.accessibility.terrain}</p>
          </div>
        )}

        {tour.accessibility.other && (
          <div className="bg-amber-50 rounded-xl p-4 md:p-6 border border-amber-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
              <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Additional Information
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{tour.accessibility.other}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export function TabFAQs({ tour }: { tour: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 md:space-y-4">
        {tour.faqs.map((faq: any, i: number) => (
          <details
            key={i}
            open={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="group rounded-xl border border-gray-200 p-4 md:p-5 cursor-pointer"
          >
            <summary className="flex items-center justify-between gap-4 list-none font-medium text-gray-900">
              <span className="text-sm md:text-base">{faq.question}</span>
              <svg
                className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function getTabCounts(tour: any) {
  return {
    overview: tour.highlights.length,
    itinerary: tour.itinerary.length,
    gallery: tour.gallery?.length || 1,
    accessibility: tour.accessibility ? 3 : 0,
    faqs: tour.faqs.length,
    booking: 1,
  }
}