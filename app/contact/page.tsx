"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

// BULLET-PROOF CONTACT PAGE SCHEMA — MAXIMUM RICH RESULTS
const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness (shows contact info + stars)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "description": "East Africa’s leading wheelchair-accessible safari operator. Kenya, Tanzania, Rwanda & Uganda.",
      "telephone": "+254726485228",
      "email": "info@jaetravel.co.ke",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "Nairobi"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "Customer Service",
          "availableLanguage": ["English", "Swahili"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "WhatsApp",
          "url": "https://wa.me/254726485228"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 2. WebPage + Breadcrumb
    {
      "@type": "WebPage",
      "@id": "https://jaetravel.co.ke/contact/#webpage",
      "url": "https://jaetravel.co.ke/contact",
      "name": "Contact Us | JaeTravel Expeditions",
      "description": "Get in touch for safari bookings, vehicle hire, or custom accessible tours. 24/7 support."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://jaetravel.co.ke/contact" }
      ]
    },

    // 3. ContactPage
    {
      "@type": "ContactPage",
      "@id": "https://jaetravel.co.ke/contact/#contactpage",
      "url": "https://jaetravel.co.ke/contact",
      "name": "Contact JaeTravel Expeditions",
      "description": "Book your safari, inquire about wheelchair-accessible tours, or hire vehicles. We reply within 24 hours."
    },

    // 4. FAQ
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How quickly do you respond to inquiries?",
          "acceptedAnswer": { "@type": "Answer", "text": "We reply to all messages within 24 hours — often within minutes on WhatsApp." }
        },
        {
          "@type": "Question",
          "name": "Can I book a safari directly through this form?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! Use this form or WhatsApp to start your booking. We’ll send a detailed quote and itinerary." }
        },
        {
          "@type": "Question",
          "name": "Do you offer wheelchair-accessible tours?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we specialize in fully accessible safaris with hydraulic-lift vehicles and barrier-free lodges." }
        },
        {
          "@type": "Question",
          "name": "What are your office hours?",
          "acceptedAnswer": { "@type": "Answer", "text": "Monday–Friday: 8am–6pm, Saturday: 9am–2pm. Emergency support 24/7." }
        }
      ]
    }
  ]
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // GA Tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "contact_form_submit", {
        event_category: "engagement",
        event_label: "Contact Form",
      });
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact form error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <CheckCircle className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-orange-800">Message Sent!</h1>
          <p className="mb-8 text-lg text-orange-700">
            Thank you, <strong>{formData.name}</strong>! We’ve received your inquiry and will reply within <strong>24 hours</strong>.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
        {/* RICH RESULTS SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Ready to start planning your East African safari? Our team is here to help.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-orange-200">
                <CardContent className="p-8">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-orange-800">Send Us a Message</h2>

                  {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name" className="text-orange-800">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-2 border-orange-300 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-orange-800">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-2 border-orange-300 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="phone" className="text-orange-800">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-2 border-orange-300 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-orange-800">Interested In</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value })}
                        >
                          <SelectTrigger className="mt-2 border-orange-300">
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
                      <Label htmlFor="message" className="text-orange-800">Your Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="mt-2 border-orange-300 focus:border-orange-500"
                        placeholder="Tell us about your dream safari..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={isSubmitting}
                    >
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
                      <MapPin className="h-5 w-5 mt-0.5 text-orange-600" />
                      <div>
                        <p className="font-medium">Office</p>
                        <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 mt-0.5 text-orange-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+254726485228" className="text-sm text-muted-foreground hover:text-orange-600">
                          +254 726 485 228
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 mt-0.5 text-orange-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:info@jaetravel.co.ke" className="text-sm text-muted-foreground hover:text-orange-600">
                          info@jaetravel.co.ke
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 mt-0.5 text-orange-600" />
                      <div>
                        <p className="font-medium">Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 8am-6pm</p>
                        <p className="text-sm text-muted-foreground">Sat: 9am-2pm</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#25D366]/10 border-green-200">
                <CardContent className="p-6">
                  <h3 className="mb-3 font-semibold">Quick Chat</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get instant answers on WhatsApp.
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
    </>
  );
}