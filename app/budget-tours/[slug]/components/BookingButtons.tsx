// app/budget-tours/[slug]/components/BookingButtons.tsx (enhanced version)
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Phone, Calendar, Users } from "lucide-react"
import BookingForm from "./BookingForm" // adjust path

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
  const [showForm, setShowForm] = useState(false)

  const handleWhatsApp = () => {
    const message = `Hello! I'm interested in booking *${tour.title}* for $${tour.price}.\nCan you provide availability and more details?`
    window.open(`https://wa.me/+254726485228?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (showForm) {
    return (
      <div className="bg-white rounded-2xl border border-orange-200 shadow-xl p-8">
        <BookingForm
          tourTitle={tour.title}
          tourPrice={tour.price}
          tourDuration={tour.duration}
          serviceType="tour"
          slug={tour.slug}
        />
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="text-orange-600 hover:text-orange-800"
          >
            ← Back to quick options
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-800 mb-2">Ready to Book?</h3>
        <p className="text-orange-700">Choose how you'd like to proceed</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => setShowForm(true)}
          size="lg"
          className="min-w-[240px] bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-lg font-semibold shadow-lg"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Book This Tour
        </Button>

        <Button
          onClick={handleWhatsApp}
          size="lg"
          variant="outline"
          className="min-w-[240px] border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-lg font-semibold"
        >
          <Phone className="mr-2 h-5 w-5" />
          WhatsApp Instant Booking
        </Button>
      </div>

      {tour.bookingUrl && (
        <p className="text-center text-sm text-orange-600 mt-4">
          Or book directly via our partner: <a href={tour.bookingUrl} className="underline hover:text-orange-800">external booking page</a>
        </p>
      )}
    </div>
  )
}