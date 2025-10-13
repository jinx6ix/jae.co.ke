"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, Phone, User, MessageSquare } from "lucide-react"

interface VehicleBookingFormProps {
  vehicleName: string
  pricePerDay: number
  vehicleId: number
}

export function VehicleBookingForm({ vehicleName, pricePerDay, vehicleId }: VehicleBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate)
      const returnDate = new Date(formData.returnDate)
      const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24))
      return days > 0 ? days : 0
    }
    return 0
  }

  const totalPrice = calculateDays() * pricePerDay

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track vehicle booking with Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "begin_checkout", {
        event_category: "Vehicle Booking",
        event_label: vehicleName,
        value: totalPrice,
        currency: "USD",
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "purchase", {
        event_category: "Vehicle Booking",
        event_label: vehicleName,
        value: totalPrice,
        currency: "USD",
      })
    }

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold">Booking Request Received!</h3>
        <p className="mb-6 text-muted-foreground">
          Thank you for your interest in renting the {vehicleName}. Our team will contact you within 24 hours to confirm
          availability and provide payment details.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Submit Another Booking
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6">
      <div>
        <h3 className="mb-2 text-2xl font-bold">Book This Vehicle</h3>
        <p className="text-sm text-muted-foreground">
          Fill out the form below to request a booking. We'll confirm availability and send you payment details.
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

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="pickupDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pickup Date *
            </Label>
            <Input
              id="pickupDate"
              name="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              className="mt-1"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <Label htmlFor="returnDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Return Date *
            </Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={handleChange}
              required
              className="mt-1"
              min={formData.pickupDate || new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="pickupLocation">Pickup Location *</Label>
          <Input
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            placeholder="Nairobi Airport, Hotel name, etc."
            className="mt-1"
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
            placeholder="Driver needed, GPS, child seats, etc."
            className="mt-1 min-h-[100px]"
          />
        </div>
      </div>

      {calculateDays() > 0 && (
        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rental Duration:</span>
            <span className="font-semibold">{calculateDays()} days</span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price per Day:</span>
            <span className="font-semibold">${pricePerDay}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="font-semibold">Total Estimate:</span>
            <span className="text-2xl font-bold text-primary">${totalPrice}</span>
          </div>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Booking"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting this form, you agree to our terms and conditions. Final pricing will be confirmed by our team.
      </p>
    </form>
  )
}
