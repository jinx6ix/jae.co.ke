// app/budget-tours/[slug]/components/BookingButtons.tsx
'use client'

import { Phone } from "lucide-react"
import BookingForm from "./BookingForm"

interface BookingButtonsProps {
  tour: {
    title: string
    price: number
    duration: string
    bookingUrl?: string
    slug?: string
  }
}

export default function BookingButtons({ tour }: BookingButtonsProps) {
  const handleWhatsApp = () => {
    const message = `Hello! I'm interested in booking *${tour.title}* for $${tour.price}.\nCan you provide availability and more details?`
    window.open(`https://wa.me/+254726485228?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href="#booking-form"
          className="inline-flex items-center justify-center gap-2 px-6 h-12 text-lg font-semibold rounded-md bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg"
        >
          📋 Book This Tour
        </a>
        <button
          onClick={handleWhatsApp}
          type="button"
          className="inline-flex items-center justify-center gap-2 px-6 h-12 text-lg font-semibold rounded-md border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
        >
          <Phone className="h-5 w-5" />
          WhatsApp Booking
        </button>
      </div>

      {/*
        Form is rendered on the page (not hidden behind a click) so the
        #booking-form anchor target always exists and the sticky / sidebar
        "Book Now" buttons can scroll the user straight to it.
      */}
      <BookingForm
        tourTitle={tour.title}
        tourPrice={tour.price}
        tourDuration={tour.duration}
        serviceType="tour"
        slug={tour.slug}
      />
    </div>
  )
}
