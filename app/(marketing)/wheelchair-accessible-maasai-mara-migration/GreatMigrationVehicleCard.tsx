import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Shield, Zap, Camera, Users, Globe } from "lucide-react"

export default function GreatMigrationVehicleCard() {
  return (
    <section className="my-40 py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-serif text-5xl md:text-6xl font-bold mb-20">
          The Only Wheelchair-Accessible Great Migration Vehicle in Kenya
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <Image
              src="/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg"
              alt="Wheelchair accessible 4x4 Land Cruiser with hydraulic lift and pop-up roof at Mara River crossing during Great Migration"
              width={800}
              height={600}
              className="rounded-3xl shadow-2xl object-cover"
              priority
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-4xl font-bold mb-8">Custom Toyota Land Cruiser – Built Exclusively for 2026 River Crossings</h3>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Engineered from the ground up for wheelchair users to experience every dramatic moment of the Maasai Mara Great Migration — including multiple daily Mara River crossings — without ever leaving your wheelchair.
            </p>

            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>German hydraulic side lift</strong> – 400kg capacity, operates on steep riverbanks</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Full pop-up roof</strong> – stay seated for unobstructed 360° game viewing</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Camera hatches at wheelchair eye level</strong> (95–110cm) for perfect photography</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Q'Straint medical-grade restraints</strong> – tested to 20G impact</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>3kW inverter + 45L medical fridge</strong> – powers ventilators and keeps medication cold</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Starlink satellite internet</strong> – stay connected in remote Mara locations</span>
              </li>
            </ul>

            <Button asChild size="lg" className="w-full text-xl py-8 bg-green-600 hover:bg-green-700">
              <Link href="/tours/masai-mara-luxury-safari">
                <Calendar className="mr-3 h-7 w-7" />
                Book This Vehicle for 2026 Great Migration
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}