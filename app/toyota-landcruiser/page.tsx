import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Toyota Land Cruiser | Safari & Off-Road Vehicle Hire",
  description:
    "Hire a Toyota Land Cruiser for your safari or off-road adventure. Perfect for national parks, game reserves, and rugged terrain across East Africa.",
  keywords: [
    "Toyota Land Cruiser hire",
    "safari vehicle rental",
    "4x4 car hire Kenya",
    "off-road vehicles Africa",
    "tour transport Land Cruiser",
  ],
}

export default function ToyotaLandCruiserPage() {
  const features = [
    "Pop-up roof for game viewing",
    "Spacious seating (up to 7 passengers)",
    "Air conditioning and cooler box",
    "4x4 all-terrain capability",
    "Professional driver-guide (optional)",
    "Unlimited mileage on safaris",
  ]

  const specs = [
    { label: "Transmission", value: "Automatic / Manual" },
    { label: "Fuel Type", value: "Diesel" },
    { label: "Seating Capacity", value: "7 Passengers" },
    { label: "Drive Type", value: "4WD" },
    { label: "Daily Rate", value: "From $120/day" },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Toyota Land Cruiser Hire</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Experience ultimate comfort and reliability on your East African adventure. The Toyota Land Cruiser is built
          for safaris, off-road expeditions, and long-distance travel across all terrains.
        </p>
      </div>

      {/* Image Showcase */}
      <div className="mb-16 grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/IMG-20240807-WA0023.jpeg.340x255_q85_crop.jpg"
            alt="Toyota Land Cruiser exterior"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/toyota-prado-seats-comfort.jpg"
            alt="Toyota Land Cruiser interior"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="grid gap-12 md:grid-cols-2">
        {/* Features */}
        <div>
          <h2 className="mb-4 font-serif text-3xl font-bold">Key Features</h2>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div>
          <h2 className="mb-4 font-serif text-3xl font-bold">Vehicle Specifications</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {specs.map((spec, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none odd:bg-muted/30 even:bg-background transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{spec.label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
          Ready for Your Safari Adventure?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-pretty text-primary-foreground/90">
          Book your Toyota Land Cruiser today for an unforgettable experience across Kenya, Tanzania, Uganda, and Rwanda.
          Enjoy the best off-road performance with comfort and safety.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/book-now?vehicle=toyota-landcruiser">Book This Vehicle</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground">
            <Link href="/contact">Contact for Custom Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
