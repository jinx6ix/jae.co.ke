// app/vehicle-hire/luxury-roof-top-camping/CampingTestimonials.tsx
'use client'

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Emma L.",
    role: "Glamping Enthusiast",
    text: "Camping under the stars in luxury tents was pure magic. The best way to experience Kenya’s wilderness!",
    location: "Maasai Mara"
  },
  {
    name: "James & Sarah",
    role: "Adventure Couple",
    text: "Waking up to lions roaring and coffee brewing on the fire — unforgettable. The tent was comfier than a hotel!",
    location: "Amboseli"
  },
  {
    name: "The Thompson Family",
    role: "Family of 5",
    text: "Our kids loved the rooftop tent! Safe, spacious, and the chef made gourmet meals every night.",
    location: "Laikipia"
  }
]

export default function CampingTestimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center font-serif text-4xl font-bold">
        What Travelers Say
      </h2>
      <div className="relative rounded-2xl bg-muted/50 p-8 text-center max-w-2xl mx-auto">
        <div className="transition-opacity duration-500" key={index}>
          <div className="mb-4 flex justify-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="italic text-lg text-muted-foreground mb-4">
            “{testimonials[index].text}”
          </blockquote>
          <p className="font-semibold">{testimonials[index].name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonials[index].role} · {testimonials[index].location}
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              title="Select testimonial"
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-primary w-8" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}