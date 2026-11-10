// components/WebMcpProvider.tsx
// Registers client-side WebMCP / navigator.modelContext agent tools safely with feature detection

"use client"

import { useEffect } from "react"
import { tours } from "@/lib/tours-data"
import { vehicles } from "@/lib/vehicles-data"

export function WebMcpProvider() {
  useEffect(() => {
    // Feature detect navigator.modelContext
    const nav = typeof window !== "undefined" ? (window.navigator as any) : null
    if (!nav || !nav.modelContext || typeof nav.modelContext.registerTool !== "function") {
      return
    }

    try {
      // 1. searchTours
      nav.modelContext.registerTool({
        name: "searchTours",
        description: "Search East Africa safari tours by destination, duration, accessibility requirements, and budget.",
        parameters: {
          type: "object",
          properties: {
            destination: { type: "string", description: "Country or park: Kenya, Tanzania, Rwanda, Uganda, Masai Mara, Serengeti" },
            maxDays: { type: "number", description: "Maximum duration in days" },
            accessibleOnly: { type: "boolean", description: "Filter for wheelchair-accessible tours with hydraulic lift vehicles" },
            maxBudget: { type: "number", description: "Maximum price in USD" },
          },
        },
        execute: async (params: { destination?: string; maxDays?: number; accessibleOnly?: boolean; maxBudget?: number }) => {
          let results = tours

          if (params.destination) {
            const destLower = params.destination.toLowerCase()
            results = results.filter(
              (t) =>
                t.country?.toLowerCase().includes(destLower) ||
                t.title?.toLowerCase().includes(destLower) ||
                t.region?.toLowerCase().includes(destLower)
            )
          }

          if (params.accessibleOnly) {
            results = results.filter((t) => t.isAccessible || t.title.toLowerCase().includes("accessible"))
          }

          if (params.maxBudget) {
            results = results.filter((t) => t.price <= params.maxBudget!)
          }

          return results.slice(0, 5).map((t) => ({
            id: t.id,
            title: t.title,
            slug: t.slug,
            country: t.country,
            duration: t.duration,
            price: t.price,
            isAccessible: t.isAccessible,
            url: `https://www.jaetravel.co.ke/tours/${t.slug || t.id}`,
          }))
        },
      })

      // 2. getTourDetails
      nav.modelContext.registerTool({
        name: "getTourDetails",
        description: "Get detailed itinerary, inclusions, and pricing for a specific safari tour by slug.",
        parameters: {
          type: "object",
          properties: {
            slug: { type: "string", description: "Tour slug e.g. 'accessible-masai-mara-safari'" },
          },
          required: ["slug"],
        },
        execute: async ({ slug }: { slug: string }) => {
          const tour = tours.find((t) => t.slug === slug || t.id === slug)
          if (!tour) return { error: "Tour not found" }
          return {
            title: tour.title,
            country: tour.country,
            duration: tour.duration,
            price: tour.price,
            description: tour.description,
            included: tour.included,
            itinerary: tour.itinerary,
            url: `https://www.jaetravel.co.ke/tours/${tour.slug || tour.id}`,
          }
        },
      })

      // 3. listVehicles
      nav.modelContext.registerTool({
        name: "listVehicles",
        description: "List available safari vehicles for hire in Kenya with specs, passenger capacity, and daily rates.",
        parameters: { type: "object", properties: {} },
        execute: async () => {
          return vehicles.map((v) => ({
            name: v.name,
            slug: v.slug,
            type: v.type,
            capacity: v.capacity,
            pricePerDay: v.pricePerDay,
            ideal: v.ideal,
            url: `https://www.jaetravel.co.ke/vehicle-hire/${v.slug}`,
          }))
        },
      })

      // 4. requestQuote
      nav.modelContext.registerTool({
        name: "requestQuote",
        description: "Submit a safari quotation request. Handled securely through JaeTravel inquiries.",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string", description: "Client full name" },
            email: { type: "string", description: "Client email address" },
            travelDates: { type: "string", description: "Estimated travel dates or month" },
            groupSize: { type: "number", description: "Number of passengers" },
            accessibleNeeds: { type: "string", description: "Wheelchair accessibility requirements" },
          },
          required: ["name", "email"],
        },
        execute: async (data: any) => {
          const res = await fetch("/api/site-inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "quote-request",
              ...data,
            }),
          })
          if (!res.ok) return { success: false, message: "Failed to submit quote request" }
          return { success: true, message: "Quote request received. Our safari team will respond within 24 hours." }
        },
      })

      // 5. submitQuestion
      nav.modelContext.registerTool({
        name: "submitQuestion",
        description: "Submit a general inquiry or question about safari planning, accessibility, or pricing.",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string", description: "Client full name" },
            email: { type: "string", description: "Client email address" },
            question: { type: "string", description: "The question or inquiry text" },
            phone: { type: "string", description: "Contact phone number (optional)" },
          },
          required: ["name", "email", "question"],
        },
        execute: async (data: any) => {
          const res = await fetch("/api/site-inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "general-inquiry",
              ...data,
            }),
          })
          if (!res.ok) return { success: false, message: "Failed to submit question" }
          return { success: true, message: "Your question has been submitted. We will get back to you shortly." }
        },
      })

      // 6. getVehicleRate
      nav.modelContext.registerTool({
        name: "getVehicleRate",
        description: "Get the daily rental rate for a specific safari vehicle.",
        parameters: {
          type: "object",
          properties: {
            vehicleName: { type: "string", description: "Name of the vehicle, e.g., 'Toyota Land Cruiser 4x4'" },
          },
          required: ["vehicleName"],
        },
        execute: async ({ vehicleName }: { vehicleName: string }) => {
          const vehicle = vehicles.find(v => v.name.toLowerCase().includes(vehicleName.toLowerCase()))
          if (!vehicle) return { error: "Vehicle not found" }
          return {
            name: vehicle.name,
            pricePerDay: vehicle.pricePerDay,
            currency: "USD",
            capacity: vehicle.capacity,
            ideal: vehicle.ideal
          }
        },
      })

      // 7. searchFAQ
      nav.modelContext.registerTool({
        name: "searchFAQ",
        description: "Search for answers to frequently asked questions about bookings, accessibility, and safari planning.",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "The search query or question" },
          },
          required: ["query"],
        },
        execute: async ({ query }: { query: string }) => {
          const q = query.toLowerCase()
          // Since we don't have a central FAQ JSON, we use the common ones from Tours page and others
          const faqDatabase = [
            {
              q: "What safari tours does JaeTravel offer in East Africa?",
              a: "JaeTravel Expeditions offers classic wildlife safaris in the Masai Mara and Serengeti, gorilla trekking in Rwanda and Uganda, and specialized wheelchair-accessible safari tours with hydraulic lift vehicles."
            },
            {
              q: "What is included in JaeTravel safari packages?",
              a: "Packages include 4x4 safari transport with professional driver-guide, full-board accommodation, national park entry fees, bottled water on game drives, and airport transfers. International flights are excluded."
            },
            {
              q: "Do you offer wheelchair-accessible safari tours?",
              a: "Yes, we operate custom-adapted 4x4 Land Cruisers with German hydraulic wheelchair lifts (400kg capacity) and partner with audited accessible lodges across Kenya and Tanzania."
            },
            {
              q: "How far in advance should I book a safari?",
              a: "We recommend booking 3 to 6 months in advance for standard dates, and 6 to 12 months ahead for Great Migration peak season (July to October) and gorilla trekking permits."
            },
            {
              q: "Where is JaeTravel located?",
              a: "Our office is located at Karen Roundabout, Nairobi, 00100, Kenya."
            }
          ]
          const results = faqDatabase.filter(item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
          return results.length > 0 ? results : { message: "No exact match found. Please contact us for specific inquiries." }
        },
      })
    } catch (err) {
      // Quiet fail if browser doesn't support modelContext or registration throws
      console.warn("WebMCP registration skipped:", err)
    }
  }, [])

  return null
}

export default WebMcpProvider
