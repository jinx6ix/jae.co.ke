"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User, MessageSquare, Download, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useOnlineBookingState } from "@/hooks/useOnlineBookingState"
import type { OnlineBookingWriteInput } from "@/lib/online-bookings"

interface BookingFormProps {
  tourTitle: string
  tourPrice: number
  tourDuration: string
  serviceType?: "tour" | "vehicle" | "package"
  slug?: string
}

interface BookingResponse {
  success: boolean
  bookingId: string
  message: string
  emailsSent?: boolean
  customerEmailSent?: boolean
  adminEmailSent?: boolean
  whatsappLink?: string
  pdfUrl?: string
  downloadUrl?: string
  tourUrl?: string
}

export default function BookingForm({
  tourTitle,
  tourPrice,
  tourDuration,
  serviceType = "tour",
  slug,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    date: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null)
  const { dbWriteStatus, write, reset: resetDbWrite } = useOnlineBookingState()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: tourTitle,
          serviceType,
          slug,
          tourSlug: slug,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: Number.parseInt(formData.travelers) || 1,
          startDate: formData.date,
          specialRequirements: formData.message,
          totalPrice: tourPrice * (Number.parseInt(formData.travelers) || 1),
          currency: "USD",
          country: "Kenya",
          duration: tourDuration,
        }),
      })

      const result: BookingResponse = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Booking failed")
      }

      const obInput: OnlineBookingWriteInput = {
        source_booking_id: result.bookingId,
        booking_kind: "tour",
        tour_slug: slug ?? null,
        vehicle_slug: null,
        service_name: tourTitle,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_country: "Kenya",
        departure_date: formData.date,
        return_date: null,
        adults: Number.parseInt(formData.travelers || "1") || 1,
        total_price: tourPrice * Number.parseInt(formData.travelers || "1"),
        currency: "USD",
        pickup_location: null,
        special_requests: formData.message || null,
        source_url: typeof window !== "undefined" ? window.location.href : null,
      }

      await write(obInput)

      setBookingResult(result)
      setSubmitted(true)
    } catch (error: any) {
      console.error("[Booking] Submission error:", error)
      alert(`Booking failed: ${error.message || "Please try again or contact us directly."}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const totalPrice = tourPrice * (Number.parseInt(formData.travelers) || 1)

  const handleDownload = () => {
    if (bookingResult?.pdfUrl) {
      window.open(`${window.location.origin}${bookingResult.pdfUrl}`, "_blank")
      return
    }
    if (bookingResult?.downloadUrl) {
      window.open(bookingResult.downloadUrl, "_blank")
      return
    }
    const fallbackUrl = `/api/bookings/${bookingResult?.bookingId}/download?` +
      `name=${encodeURIComponent(formData.name)}` +
      `&email=${encodeURIComponent(formData.email)}` +
      `&phone=${encodeURIComponent(formData.phone)}` +
      `&service=${encodeURIComponent(tourTitle)}` +
      `&startDate=${encodeURIComponent(formData.date)}` +
      `&travelers=${formData.travelers}` +
      `&total=${totalPrice}`

    window.open(fallbackUrl, "_blank")
  }

  const handleWhatsApp = () => {
    if (bookingResult?.whatsappLink) {
      window.open(bookingResult.whatsappLink, "_blank")
      return
    }

    const tourUrl = bookingResult?.tourUrl
      || (slug ? `${window.location.origin}/safari/${slug}` : "")

    const message = `🆕 *New Booking Request*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone}\n\n` +
      `🎫 *Booking ID:* ${bookingResult?.bookingId || "Pending"}\n` +
      `🏞️ *Tour:* ${tourTitle}\n` +
      (tourUrl ? `🔗 *Tour Page:* ${tourUrl}\n` : ``) +
      `👥 *Travelers:* ${formData.travelers}\n` +
      `💰 *Total:* $${totalPrice.toLocaleString()}\n` +
      `📅 *Start Date:* ${formData.date}\n\n` +
      `Please confirm availability & arrange payment.`

    const whatsappUrl = `https://wa.me/+254726485228?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (submitted && bookingResult && dbWriteStatus === 'failed') {
    return (
      <div className="rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-6 md:p-8 text-center shadow-sm animate-in fade-in duration-500">
        <div className="mx-auto mb-6 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-amber-100">
          <AlertCircle className="h-10 w-10 md:h-12 md:w-12 text-amber-600" />
        </div>

        <h3 className="mb-3 text-2xl font-bold text-amber-800">Booking Received</h3>

        <p className="mb-2 text-base md:text-lg font-semibold text-amber-700">
          Booking ID: <code className="rounded bg-amber-100 px-2 py-1 font-mono text-xs md:text-sm">{bookingResult.bookingId}</code>
        </p>

        <p className="mb-6 md:mb-8 text-sm md:text-base text-amber-700">
          ✅ Your confirmation email has been sent to <strong>{formData.email}</strong>.<br />
          ⚠️ We couldn&apos;t queue this in our system right now. Our team has been alerted and will follow up within 24 hours.
        </p>

        <div className="space-y-3 max-w-sm mx-auto">
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 text-sm md:text-base"
            size="lg"
          >
            <Send className="h-4 w-4" />
            Confirm via WhatsApp
          </Button>

          <Button
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 text-sm md:text-base"
            size="lg"
            onClick={() => {
              setSubmitted(false)
              setBookingResult(null)
              resetDbWrite()
              setFormData({ name: "", email: "", phone: "", travelers: "2", date: "", message: "" })
            }}
          >
            Book Another Tour
          </Button>
        </div>
      </div>
    )
  }

  if (submitted && bookingResult && dbWriteStatus === 'pending') {
    return (
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 md:p-8 text-center animate-in fade-in duration-500">
        <div className="mx-auto mb-6 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-orange-100">
          <Loader2 className="h-10 w-10 md:h-12 md:w-12 text-orange-600 animate-spin" />
        </div>
        <h3 className="mb-3 text-xl md:text-2xl font-bold text-orange-800">Recording your booking…</h3>
        <p className="text-sm md:text-base text-orange-700">
          Booking ID: <code className="bg-orange-100 px-2 py-1 rounded font-mono text-xs md:text-sm">{bookingResult.bookingId}</code>
        </p>
      </div>
    )
  }

  if (submitted && bookingResult && dbWriteStatus === 'recorded') {
    return (
      <div className="rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-6 md:p-8 text-center shadow-sm animate-in fade-in duration-500">
        <div className="mx-auto mb-6 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-orange-100">
          <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-orange-600" />
        </div>

        <h3 className="mb-3 md:mb-4 text-2xl font-bold text-orange-800">Booking Confirmed! 🎉</h3>

        <p className="mb-2 text-base md:text-lg font-semibold text-orange-700">
          Booking ID: <code className="rounded bg-orange-100 px-2 py-1 font-mono text-xs md:text-sm">{bookingResult.bookingId}</code>
        </p>

        <p className="mb-6 md:mb-8 text-sm md:text-base text-orange-700">
          Thank you for booking <strong>{tourTitle}</strong>!<br />
          ✅ Confirmation email sent to <strong>{formData.email}</strong><br />
          📱 Our team will contact you within 24 hours
        </p>

        <div className="mb-6 md:mb-8 grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto">
          <div className={`flex items-center justify-center gap-2 rounded-lg border p-2 md:p-3 text-xs md:text-sm font-medium ${
            bookingResult.customerEmailSent
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}>
            <Mail className="h-3 w-3 md:h-4 md:w-4" />
            {bookingResult.customerEmailSent ? "Email Sent" : "Email Sending..."}
          </div>
          <div className={`flex items-center justify-center gap-2 rounded-lg border p-2 md:p-3 text-xs md:text-sm font-medium ${
            bookingResult.adminEmailSent
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}>
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            {bookingResult.adminEmailSent ? "Admin Notified" : "Admin Notifying..."}
          </div>
        </div>

        <div className="space-y-3 max-w-sm mx-auto">
          <Button
            onClick={handleDownload}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 text-sm md:text-base"
            size="lg"
          >
            <Download className="h-4 w-4" />
            Download PDF Confirmation
          </Button>

          <Button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 text-sm md:text-base"
            size="lg"
          >
            <Send className="h-4 w-4" />
            Share on WhatsApp
          </Button>

          <Button
            variant="outline"
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 text-sm md:text-base"
            size="lg"
            onClick={() => {
              setSubmitted(false)
              setBookingResult(null)
              resetDbWrite()
              setFormData({ name: "", email: "", phone: "", travelers: "2", date: "", message: "" })
            }}
          >
            Book Another Tour
          </Button>
        </div>

        <div className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-orange-200 text-xs md:text-sm text-orange-600">
          <p className="mb-3">Need immediate help?</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center">
            <a href="tel:+254726485228" className="flex items-center justify-center gap-2 hover:text-orange-800 font-medium">
              📞 +254 726 485 228
            </a>
            <a href="mailto:info@jaetravel.co.ke" className="flex items-center justify-center gap-2 hover:text-orange-800 font-medium">
              ✉️ info@jaetravel.co.ke
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-orange-200 bg-white p-5 md:p-8 shadow-sm">
      <div className="text-center sm:text-left">
        <h3 className="text-xl md:text-2xl font-bold text-orange-800">
          Book <span className="text-orange-600">{tourTitle}</span>
        </h3>
        <p className="mt-1 md:mt-2 text-sm md:text-base text-orange-600">
          Fill in your details — get instant email & WhatsApp confirmation!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 mb-1.5 text-orange-700 text-sm">
            <User className="h-4 w-4" />
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-1.5 text-orange-700 text-sm">
            <Mail className="h-4 w-4" />
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-1.5 text-orange-700 text-sm">
            <Phone className="h-4 w-4" />
            Phone *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+254 7xx xxx xxx"
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="travelers" className="flex items-center gap-2 mb-1.5 text-orange-700 text-sm">
            <Users className="h-4 w-4" />
            {serviceType === "vehicle" ? "Days" : "Travelers"} *
          </Label>
          <Input
            id="travelers"
            name="travelers"
            type="number"
            min="1"
            max={serviceType === "vehicle" ? "30" : "20"}
            value={formData.travelers}
            onChange={handleChange}
            required
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black text-sm"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="date" className="flex items-center gap-2 mb-1.5 text-orange-700 text-sm">
          <Calendar className="h-4 w-4" />
          Preferred Start Date *
        </Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black text-sm"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="message" className="flex items-center gap-2 mb-1.5 text-orange-700 text-sm">
          <MessageSquare className="h-4 w-4" />
          Special Requests / Notes
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Dietary requirements, room preferences, accessibility needs..."
          className="min-h-[100px] md:min-h-[110px] border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black text-sm"
          disabled={isSubmitting}
        />
      </div>

      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 p-4 md:p-6 border border-orange-200">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-orange-700">
            <span>Price per person</span>
            <span className="font-semibold text-orange-800">${tourPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-orange-700">
            <span>{serviceType === "vehicle" ? "Days" : "Travelers"}</span>
            <span className="font-semibold text-orange-800">{formData.travelers} × ${tourPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t-2 border-orange-300 pt-3 text-lg md:text-xl font-bold text-orange-900">
            <span>Total Estimate</span>
            <span className="text-2xl md:text-3xl text-orange-600">${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
        disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.date}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 animate-spin" />
            Processing...
          </>
        ) : (
          `Confirm Booking - $${totalPrice.toLocaleString()}`
        )}
      </Button>

      <p className="text-center text-xs md:text-sm text-orange-600 leading-relaxed">
        🔒 Secure • 📧 Instant Confirmation • 📱 WhatsApp Updates<br />
        No payment required now — pay 30 days before departure
      </p>
    </form>
  )
}