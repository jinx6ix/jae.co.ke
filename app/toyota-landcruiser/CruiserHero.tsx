// app/vehicle-hire/toyota-landcruiser/CruiserHero.tsx
'use client'

import Image from "next/image"
import { CheckCircle, Users, Fuel } from "lucide-react"

export default function CruiserHero() {
  return (
    <section className="mb-12 text-center">
      <h1 className="mb-4 font-serif text-5xl font-bold text-balance">
        Toyota Land Cruiser Safari Hire
      </h1>
      <p className="mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed">
        The <strong>legendary 4x4</strong> for <strong>East Africa safaris</strong>. 
        Pop-up roof, 7 seats, unlimited mileage — built for <strong>Maasai Mara, Serengeti, Tsavo, and beyond</strong>.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
          <CheckCircle className="h-4 w-4" /> Pop-Up Roof
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
          <Users className="h-4 w-4" /> 7 Seats
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1 text-sm font-medium text-white">
          <Fuel className="h-4 w-4" /> Diesel 4x4
        </span>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/WhatsApp Image 2025-10-14 at 21.13.25_75828e63.jpg"
            alt="Toyota Land Cruiser 4x4 on safari in Tsavo National Park, Kenya"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/waaa.jpg"
            alt="Spacious 7-seat interior of Toyota Land Cruiser with pop-up roof open"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}