"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User, MessageSquare, Download, Send, CheckCircle, Loader2 } from "lucide-react"

interface BookingFormProps {
  tourTitle: string
  tourPrice: number
  tourDuration: string
  serviceType?: string
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

export default function BookingForm({ tourTitle, tourPrice, tourDuration, serviceType = "tour" }: BookingFormProps) {
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
    setSubmitted(false)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: tourTitle,
          serviceType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: formData.travelers,
          startDate: formData.date,
          specialRequirements: formData.message,
          totalPrice: tourPrice * Number.parseInt(formData.travelers || "1"),
          currency: "$",
          country: "Kenya",
          duration: tourDuration,
        }),
      })

      const result: BookingResponse = await response.json()

      console.log("[Booking] API Response:", result)

      if (result.success) {
        setBookingResult(result)
        setSubmitted(true)
      } else {
        throw new Error(result.message || "Booking failed")
      }
    } catch (error: any) {
      console.error("[Booking] Submission error:", error)
      alert(`Booking failed: ${error.message || "Please try again or contact us directly."}`)
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDownload = () => {
    if (bookingResult?.pdfUrl) {
      const downloadUrl = `${window.location.origin}${bookingResult.pdfUrl}`
      window.open(downloadUrl, "_blank")?.focus()
      return
    }
    
    if (bookingResult?.downloadUrl) {
      window.open(bookingResult.downloadUrl, "_blank")?.focus()
      return
    }

    const directUrl = `${window.location.origin}/api/bookings/${bookingResult?.bookingId}/download?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&service=${encodeURIComponent(tourTitle)}&startDate=${encodeURIComponent(formData.date)}&travelers=${formData.travelers}&total=${tourPrice * Number.parseInt(formData.travelers || "1")}`
    window.open(directUrl, "_blank")?.focus()
  }

  const handleWhatsApp = () => {
    if (bookingResult?.whatsappLink) {
      window.open(bookingResult.whatsappLink, "_blank")?.focus()
      return
    }

    const message = `🆕 *New Booking Confirmation*\n\n👤 ${formData.name}\n📧 ${formData.email}\n📞 ${formData.phone}\n\n🎫 *Booking ID:* ${bookingResult?.bookingId}\n🏕️ *Tour:* ${tourTitle}\n👥 *Travelers:* ${formData.travelers}\n💰 *Total:* $${tourPrice * Number.parseInt(formData.travelers || "1")}\n📅 *Date:* ${formData.date}\n\nPlease confirm details and arrange payment.`
    
    const whatsappUrl = `https://wa.me/+254726485228?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")?.focus()
  }

  if (submitted && bookingResult) {
    return (
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-8 text-center animate-in fade-in duration-500">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <CheckCircle className="h-12 w-12 text-orange-600" />
        </div>
        
        <h3 className="mb-3 text-3xl font-bold text-orange-700">Booking Confirmed! 🎉</h3>
        <p className="mb-2 text-lg font-semibold text-orange-800">
          Booking ID: <code className="bg-orange-100 px-2 py-1 rounded font-mono text-sm">{bookingResult.bookingId}</code>
        </p>
        
        <p className="mb-6 text-orange-700 text-sm leading-relaxed max-w-md mx-auto">
          Thank you for booking <strong>${tourTitle}</strong>! 
          <br />
          ✅ Confirmation email sent to {formData.email}
          <br />
          📱 Our team will contact you within 24 hours
        </p>

        {/* Status Indicators */}
        <div className="mb-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium ${
            bookingResult.customerEmailSent 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}>
            <Mail className="h-4 w-4" />
            {bookingResult.customerEmailSent ? 'Email Sent' : 'Email Sending...'}
          </div>
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium ${
            bookingResult.adminEmailSent 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}>
            <Users className="h-4 w-4" />
            {bookingResult.adminEmailSent ? 'Admin Notified' : 'Admin Notifying...'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-md mx-auto">
          <Button 
            onClick={handleDownload} 
            className="w-full justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            size="lg"
          >
            <Download className="h-5 w-5" />
            Download PDF Confirmation
          </Button>
          
          <Button 
            onClick={handleWhatsApp} 
            className="w-full justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
            size="lg"
          >
            <Send className="h-5 w-5" />
            Share on WhatsApp
          </Button>
          
          <Button 
            onClick={() => {
              setSubmitted(false)
              setBookingResult(null)
              setFormData({
                name: "",
                email: "",
                phone: "",
                travelers: "2",
                date: "",
                message: "",
              })
            }} 
            variant="outline" 
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
            size="lg"
          >
            📝 Book Another Tour
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-orange-200">
          <p className="text-xs text-orange-600 mb-2">Need immediate help?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <a 
              href="tel:+254726485228" 
              className="flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
            >
              📞 +254 726 485 228
            </a>
            <a 
              href="mailto:info@jaetravel.co.ke" 
              className="flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
            >
              ✉️ info@jaetravel.co.ke
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="mb-2 text-2xl font-bold text-orange-700">Book This {serviceType === "vehicle" ? "Vehicle" : "Tour"}</h3>
        <p className="text-sm text-orange-600">
          Fill out the form below. You'll receive instant confirmation via email and WhatsApp.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-1 text-orange-700">
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
              className="h-11 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-1 text-orange-700">
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
              className="h-11 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-1 text-orange-700">
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
              className="h-11 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="travelers" className="flex items-center gap-2 mb-1 text-orange-700">
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
              className="h-11 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date" className="flex items-center gap-2 mb-1 text-orange-700">
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
            className="h-11 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            disabled={isSubmitting}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <Label htmlFor="message" className="flex items-center gap-2 mb-1 text-orange-700">
            <MessageSquare className="h-4 w-4" />
            Special Requests
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Dietary requirements, accessibility needs, room preferences..."
            className="min-h-[100px] border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 p-6 border border-orange-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-orange-700">
              ${tourTitle}
            </span>
            <span className="font-semibold text-orange-800">${tourPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-orange-200">
            <span className="text-sm text-orange-700">
              {serviceType === "vehicle" ? "Days" : "Travelers"}: {formData.travelers}
            </span>
            <span className="font-semibold text-orange-800">× ${tourPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t-2 border-orange-300">
            <span className="text-xl font-bold text-orange-900">Total Estimate</span>
            <span className="text-3xl font-extrabold text-orange-600">
              ${(tourPrice * Number.parseInt(formData.travelers || "1")).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white"
        disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.date}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Booking...
          </>
        ) : (
          `Confirm Booking - $${(tourPrice * Number.parseInt(formData.travelers || "1")).toLocaleString()}`
        )}
      </Button>

      <p className="text-center text-xs text-orange-600 leading-relaxed">
        🔒 Secure • 📧 Instant Email Confirmation • 📱 WhatsApp Updates
        <br />
        No payment required now - Full payment 30 days before departure
      </p>
    </form>
  )
}

export { BookingForm }