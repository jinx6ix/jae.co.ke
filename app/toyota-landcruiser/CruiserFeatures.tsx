// app/vehicle-hire/toyota-landcruiser/CruiserFeatures.tsx
'use client'

import { CheckCircle } from "lucide-react"

const features = [
  "Pop-up roof for 360° game viewing in national parks",
  "Spacious 7-passenger seating with ample legroom",
  "Air conditioning + built-in cooler box for refreshments",
  "Full 4x4 capability for all terrains — mud, sand, rocks",
  "Professional English-speaking driver-guide (optional)",
  "Unlimited mileage on all safari routes",
  "GPS, charging ports, and first aid kit included",
  "Free airport pickup in Nairobi, Arusha, or Entebbe"
]

export default function CruiserFeatures() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center font-serif text-4xl font-bold">
        Key Features
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted hover:shadow-md"
          >
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground leading-relaxed">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  )
}