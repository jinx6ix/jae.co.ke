"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User, MessageSquare, Download, Send } from "lucide-react"

interface BookingFormProps {
  tourTitle: string
  tourPrice: number
  tourDuration: string
  serviceType?: string
}

export function BookingForm({ tourTitle, tourPrice, tourDuration, serviceType = "tour" }: BookingFormProps) {
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
  const [bookingResult, setBookingResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const bookingId = `BK${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Track booking attempt with Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "begin_checkout", {
        event_category: "Booking",
        event_label: tourTitle,
        value: tourPrice,
        currency: "USD",
      })
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          serviceName: tourTitle,
          serviceType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: formData.travelers,
          date: formData.date,
          message: formData.message,
          totalPrice: tourPrice * Number.parseInt(formData.travelers),
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Track successful booking
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "purchase", {
            event_category: "Booking",
            event_label: tourTitle,
            value: tourPrice * Number.parseInt(formData.travelers),
            currency: "USD",
            transaction_id: bookingId,
          })
        }

        setBookingResult(result)
        setSubmitted(true)
      } else {
        alert("Booking failed. Please try again or contact us directly.")
      }
    } catch (error) {
      console.error("[v0] Booking submission error:", error)
      alert("An error occurred. Please try again or contact us directly.")
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
    if (bookingResult?.downloadUrl) {
      window.open(bookingResult.downloadUrl, "_blank")
    }
  }

  const handleWhatsApp = () => {
    if (bookingResult?.whatsappLink) {
      window.open(bookingResult.whatsappLink, "_blank")
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold">Booking Confirmed!</h3>
        <p className="mb-2 text-sm text-muted-foreground">Booking ID: {bookingResult?.bookingId}</p>
        <p className="mb-6 text-muted-foreground">
          Thank you for booking {tourTitle}! A confirmation email has been sent to {formData.email}. Our team will
          contact you within 24 hours.
        </p>

        <div className="space-y-3">
          <Button onClick={handleDownload} className="w-full bg-transparent" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Booking Confirmation
          </Button>
          <Button onClick={handleWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
            <Send className="mr-2 h-4 w-4" />
            Send to WhatsApp
          </Button>
          <Button onClick={() => setSubmitted(false)} variant="ghost" className="w-full">
            Submit Another Booking
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6">
      <div>
        <h3 className="mb-2 text-2xl font-bold">Book This {serviceType === "vehicle" ? "Vehicle" : "Tour"}</h3>
        <p className="text-sm text-muted-foreground">
          Fill out the form below. You'll receive instant confirmation via email and WhatsApp.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2">
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
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 234 567 8900"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="travelers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Number of {serviceType === "vehicle" ? "Days" : "Travelers"} *
          </Label>
          <Input
            id="travelers"
            name="travelers"
            type="number"
            min="1"
            max="20"
            value={formData.travelers}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="date" className="flex items-center gap-2">
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
            className="mt-1"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <Label htmlFor="message" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Special Requests or Questions
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any dietary requirements, accessibility needs, or special requests..."
            className="mt-1 min-h-[100px]"
          />
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {serviceType === "vehicle" ? "Daily Rate:" : "Duration:"}
          </span>
          <span className="font-semibold">{tourDuration}</span>
        </div>
        <div className="mb-2 flex items-center justify-between border-t border-border pt-2">
          <span className="text-sm text-muted-foreground">
            Price per {serviceType === "vehicle" ? "Day" : "Person"}:
          </span>
          <span className="text-xl font-bold text-primary">${tourPrice}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-semibold">Total Estimate:</span>
          <span className="text-2xl font-bold text-primary">
            ${tourPrice * Number.parseInt(formData.travelers || "1")}
          </span>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting, you'll receive instant confirmation via email and WhatsApp. No payment required now.
      </p>
    </form>
  )
}
