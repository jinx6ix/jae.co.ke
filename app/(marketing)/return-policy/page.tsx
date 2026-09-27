import type { Metadata } from "next"
import Link from "next/link"
import { CmsPage } from "@/app/(marketing)/_components/CmsPage"

export const metadata: Metadata = {
  title: "Return and Refund Policy | Jae Travel Expeditions",
  description: "Read our return, refund, and cancellation policies for bookings with Jae Travel Expeditions in East Africa.",
  keywords: [
    "return policy Jae Travel",
    "refund policy Kenya safari",
    "cancellation policy East Africa tours",
    "Jae Travel refund",
  ],
  alternates: {
    canonical: "https://www.jaetravel.co.ke/return-policy",
  },
}

export default function ReturnPolicyPage() {
  return (
    <>
      <CmsPage slug="return-policy" fallback={
        <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Return and Refund Policy</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            At Jae Travel Expeditions, we aim for transparency in all our booking processes.
            Last updated: September 27, 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg mx-auto text-muted-foreground space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Booking Cancellations</h2>
            <p>
              Cancellations for tours, transportation services, or vehicle rentals must be made in writing via email to info@jaetravel.co.ke.
              The date of cancellation is the date we receive your written request.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Refund Structure</h2>
            <p>
              Refunds are processed based on the timeframe between your cancellation notice and the scheduled service start date:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>More than 60 days:</strong> Full refund, minus any administrative or transaction fees incurred.</li>
              <li><strong>30-60 days:</strong> 50% refund of the total booking amount.</li>
              <li><strong>15-29 days:</strong> 25% refund of the total booking amount.</li>
              <li><strong>Less than 15 days:</strong> No refund provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Non-Refundable Situations</h2>
            <p>
              Please note that the following circumstances are generally non-refundable:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Unused services during a trip (e.g., missed game drives, skipped meals).</li>
              <li>Early departures or late arrivals.</li>
              <li>"No-show" situations where the client fails to arrive for the scheduled service.</li>
              <li>Cancellations due to force majeure events (e.g., weather, civil unrest, government restrictions), though we will make every effort to reschedule or provide credits where possible in partnership with service providers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Processing Refunds</h2>
            <p>
              Approved refunds will be processed back to the original method of payment whenever possible. Please allow 14–21 business days for the refund to reflect in your account, depending on your bank or payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Travel Insurance</h2>
            <p>
              Given the nature of travel in East Africa, we strongly recommend that all clients purchase comprehensive travel insurance at the time of booking. This insurance should cover trip cancellations, medical emergencies, and other unforeseen events to protect your investment.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Contact Us</h2>
            <p>
              If you have any questions regarding our refund policy, please contact us directly:
            </p>
            <p>
              Jae Travel Expeditions<br />
              Nairobi, Kenya<br />
              Phone: +254 726 485 228<br />
              Email: info@jaetravel.co.ke
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Have questions about a booking? We are here to help.
          </p>
          <Link href="/contact" className="inline-block rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90">
            Contact Us
          </Link>
        </div>
      </div>
      } />
    </>
  )
}
