"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "contact_form_submit", {
        event_category: "engagement",
        event_label: "Contact Form",
      })
    }

    const bookingId = `INQ${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          serviceName: "General Inquiry",
          serviceType: "inquiry",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Interested in: ${formData.country}\n\n${formData.message}`,
          totalPrice: 0,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        alert("Failed to send message. Please try again or contact us directly.")
      }
    } catch (error) {
      console.error("[v0] Contact form error:", error)
      alert("An error occurred. Please try again or contact us directly.")
    }

    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold">Message Sent Successfully!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Thank you for contacting JaeTravel Expeditions. We've received your message and will respond within 24
            hours.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Get in Touch</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
          Ready to start planning your East African safari? Our team is here to answer your questions and help create
          your perfect adventure.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-6 font-serif text-2xl font-bold">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Interested In</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kenya">Kenya Safari</SelectItem>
                        <SelectItem value="tanzania">Tanzania Safari</SelectItem>
                        <SelectItem value="rwanda">Rwanda Gorilla Trekking</SelectItem>
                        <SelectItem value="uganda">Uganda Safari</SelectItem>
                        <SelectItem value="accessible">Accessible Tours</SelectItem>
                        <SelectItem value="vehicle">Vehicle Hire</SelectItem>
                        <SelectItem value="custom">Custom Tour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="mt-2"
                    placeholder="Tell us about your dream safari..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Office Location</p>
                    <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+254726485228" className="text-sm text-muted-foreground hover:text-primary">
                      +254 726 485 228
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@jaetravel.co.ke" className="text-sm text-muted-foreground hover:text-primary">
                      info@jaetravel.co.ke
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon - Fri: 8am - 6pm EAT</p>
                    <p className="text-sm text-muted-foreground">Sat: 9am - 2pm EAT</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#25D366]/10">
            <CardContent className="p-6">
              <h3 className="mb-3 font-semibold">Quick Response via WhatsApp</h3>
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                Get instant answers to your questions. Chat with our team on WhatsApp.
              </p>
              <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
