"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User, MessageSquare, Download, Send, CheckCircle, Loader2 } from "lucide-react"

interface BookingFormProps {
  tourTitle: string
  tourPrice: number          // Price per person
  tourDuration: string
  serviceType?: "tour" | "vehicle" | "package"
  slug?: string             // Optional: useful for generating download URLs
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
          slug, // useful if you want to generate tour-specific links
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
    // Fallback direct URL (you can adjust this in your API if needed)
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

    const message = `🆕 *New Booking Request*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone}\n\n` +
      `🎫 *Booking ID:* ${bookingResult?.bookingId || "Pending"}\n` +
      `🏞️ *Tour:* ${tourTitle}\n` +
      `👥 *Travelers:* ${formData.travelers}\n` +
      `💰 *Total:* $${totalPrice.toLocaleString()}\n` +
      `📅 *Start Date:* ${formData.date}\n\n` +
      `Please confirm availability & arrange payment.`

    const whatsappUrl = `https://wa.me/+254726485228?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (submitted && bookingResult) {
    return (
      <div className="rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-8 text-center shadow-sm animate-in fade-in duration-500">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <CheckCircle className="h-12 w-12 text-orange-600" />
        </div>

        <h3 className="mb-4 text-3xl font-bold text-orange-800">Booking Confirmed! 🎉</h3>

        <p className="mb-2 text-lg font-semibold text-orange-700">
          Booking ID: <code className="rounded bg-orange-100 px-2 py-1 font-mono text-sm">{bookingResult.bookingId}</code>
        </p>

        <p className="mb-8 text-orange-700">
          Thank you for booking <strong>{tourTitle}</strong>!<br />
          ✅ Confirmation email sent to <strong>{formData.email}</strong><br />
          📱 Our team will contact you within 24 hours
        </p>

        {/* Status Badges */}
        <div className="mb-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium ${
            bookingResult.customerEmailSent 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}>
            <Mail className="h-4 w-4" />
            {bookingResult.customerEmailSent ? "Email Sent" : "Email Sending..."}
          </div>
          <div className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium ${
            bookingResult.adminEmailSent 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}>
            <Users className="h-4 w-4" />
            {bookingResult.adminEmailSent ? "Admin Notified" : "Admin Notifying..."}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-md mx-auto">
          <Button
            onClick={handleDownload}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2"
            size="lg"
          >
            <Download className="h-5 w-5" />
            Download PDF Confirmation
          </Button>

          <Button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
            size="lg"
          >
            <Send className="h-5 w-5" />
            Share on WhatsApp
          </Button>

          <Button
            variant="outline"
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
            size="lg"
            onClick={() => {
              setSubmitted(false)
              setBookingResult(null)
              setFormData({ name: "", email: "", phone: "", travelers: "2", date: "", message: "" })
            }}
          >
            Book Another Tour
          </Button>
        </div>

        <div className="mt-10 pt-6 border-t border-orange-200 text-sm text-orange-600">
          <p className="mb-3">Need immediate help?</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+254726485228" className="flex items-center gap-2 hover:text-orange-800 font-medium">
              📞 +254 726 485 228
            </a>
            <a href="mailto:info@jaetravel.co.ke" className="flex items-center gap-2 hover:text-orange-800 font-medium">
              ✉️ info@jaetravel.co.ke
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-orange-200 bg-white p-8 shadow-sm">
      <div className="text-center sm:text-left">
        <h3 className="text-2xl font-bold text-orange-800">
          Book <span className="text-orange-600">{tourTitle}</span>
        </h3>
        <p className="mt-2 text-orange-600">
          Fill in your details — get instant email & WhatsApp confirmation!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 mb-1.5 text-orange-700">
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
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-1.5 text-orange-700">
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
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-1.5 text-orange-700">
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
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="travelers" className="flex items-center gap-2 mb-1.5 text-orange-700">
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
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="date" className="flex items-center gap-2 mb-1.5 text-orange-700">
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
          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="message" className="flex items-center gap-2 mb-1.5 text-orange-700">
          <MessageSquare className="h-4 w-4" />
          Special Requests / Notes
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Dietary requirements, room preferences, accessibility needs..."
          className="min-h-[110px] border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-black"
          disabled={isSubmitting}
        />
      </div>

      {/* Price Summary Card */}
      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 p-6 border border-orange-200">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-orange-700">
            <span>Price per person</span>
            <span className="font-semibold text-orange-800">${tourPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-orange-700">
            <span>{serviceType === "vehicle" ? "Days" : "Travelers"}</span>
            <span className="font-semibold text-orange-800">{formData.travelers} × ${tourPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t-2 border-orange-300 pt-4 text-xl font-bold text-orange-900">
            <span>Total Estimate</span>
            <span className="text-3xl text-orange-600">${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-xl transition-all"
        disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.date}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          `Confirm Booking - $${totalPrice.toLocaleString()}`
        )}
      </Button>

      <p className="text-center text-xs text-orange-600 leading-relaxed">
        🔒 Secure • 📧 Instant Confirmation • 📱 WhatsApp Updates<br />
        No payment required now — pay 30 days before departure
      </p>
    </form>
  )
}