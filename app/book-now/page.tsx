import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Book Now | East Africa Travel & Transportation",
  description: "Book your transportation service or vehicle rental for your East Africa adventure.",
}

export default function BookNowPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="font-serif text-4xl font-bold mb-6">Book Your Service</h1>
        <p className="text-muted-foreground mb-8">
          Please contact us directly to book your vehicle or transportation service. Our team will provide 
          you with the best options and pricing for your specific needs.
        </p>

        <div className="rounded-2xl bg-muted/50 p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">+254 726 48 5228</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">info@jaetravel.co.ke</p>
            </div>
            <div>
              <h3 className="font-semibold">Office Hours</h3>
              <p className="text-muted-foreground">Monday - Sunday: 6:00 AM - 10:00 PM EAT</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contact Form</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+254726485228">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}