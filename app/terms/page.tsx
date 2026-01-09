import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms and Conditions | JAE Travel Expeditions - Transportation & Safari Services Kenya & East Africa",
  description: "Read the terms and conditions for booking transportation, vehicle hire, airport transfers, and safari tours with JAE Travel Expeditions in Kenya, Tanzania, Rwanda, and Uganda.",
  keywords: [
    "terms and conditions JAE Travel",
    "booking terms Kenya safari",
    "vehicle hire terms Kenya",
    "airport transfer terms Nairobi",
    "safari tour conditions East Africa",
    "car rental agreement Kenya",
  ],
  alternates: {
    canonical: "https://www.jaetravel.co.ke/terms",
  },
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Terms and Conditions</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Please read these terms and conditions carefully before booking any services with JAE Travel Expeditions.
            Last updated: January 09, 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg mx-auto text-muted-foreground space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p>
              These Terms and Conditions govern the provision of transportation services, vehicle hire, airport transfers, safari tours, and related travel services offered by JAE Travel Expeditions ("we", "us", "our"), a company based in Nairobi, Kenya.
            </p>
            <p>
              By booking any service with us, either directly through our website, by phone, email, or in person, you ("the client", "you") agree to be bound by these Terms and Conditions.
            </p>
            <p>
              We reserve the right to update these Terms and Conditions at any time. The latest version will be available on our website at https://www.jaetravel.co.ke/terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Bookings and Payments</h2>
            <p>
              A booking is confirmed upon receipt of a deposit (typically 30-50% of the total amount, depending on the service) and written confirmation from us.
            </p>
            <p>
              Full payment is required at least 30 days prior to the commencement of services, unless otherwise agreed in writing.
            </p>
            <p>
              Payments can be made via bank transfer, mobile money (M-Pesa), credit card, or cash. Any bank fees are the responsibility of the client.
            </p>
            <p>
              Prices quoted are in USD unless specified otherwise and are subject to change due to currency fluctuations, fuel prices, or government taxes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Cancellations and Refunds</h2>
            <p>
              Cancellations must be made in writing. Cancellation fees apply as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>More than 60 days before service start: Full refund minus any administrative fees.</li>
              <li>30-60 days: 50% refund of total amount.</li>
              <li>15-29 days: 25% refund.</li>
              <li>Less than 15 days: No refund.</li>
            </ul>
            <p>
              No refunds for unused services, early departures, or no-shows.
            </p>
            <p>
              We recommend purchasing comprehensive travel insurance to cover cancellations, medical emergencies, and other unforeseen events.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Vehicle Hire and Transportation Services</h2>
            <p>
              Vehicles are provided with or without a driver/guide, as specified in the booking.
            </p>
            <p>
              The client is responsible for any damages caused by misuse, negligence, or unauthorized drivers.
            </p>
            <p>
              A valid driving license (international permit required for self-drive) and minimum age of 23 apply for self-drive rentals.
            </p>
            <p>
              Fuel is not included in self-drive rentals. Vehicles must be returned with the same fuel level.
            </p>
            <p>
              Speed limits, national park rules, and road safety regulations must be observed. Accidents in national parks may not be covered by insurance.
            </p>
            <p>
              We provide third-party insurance, but comprehensive coverage is recommended. Excess liability applies in case of claims.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Safari Tours and Transfers</h2>
            <p>
              Itineraries are subject to change due to weather, road conditions, park regulations, or safety concerns.
            </p>
            <p>
              We act as agents for accommodations, parks, and subcontractors. We are not liable for their acts or omissions.
            </p>
            <p>
              Clients must follow instructions from drivers/guides for safety, especially during game drives and wildlife encounters.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Liability and Responsibility</h2>
            <p>
              We take all reasonable care to provide safe and reliable services but are not liable for loss, damage, injury, delay, or inconvenience caused by force majeure events (e.g., weather, strikes, political unrest, pandemics).
            </p>
            <p>
              Personal belongings are the client's responsibility. We are not liable for loss or theft.
            </p>
            <p>
              Clients participate in activities at their own risk and must disclose any medical conditions that may affect their safety.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Complaints and Disputes</h2>
            <p>
              Any complaints should be reported immediately to allow us to resolve them. Formal complaints must be submitted in writing within 14 days of service end.
            </p>
            <p>
              These terms are governed by the laws of Kenya. Any disputes shall be resolved in Kenyan courts.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Contact Information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us:
            </p>
            <p>
              JAE Travel Expeditions<br />
              Nairobi, Kenya<br />
              Phone: +254 726 485 228<br />
              Email: info@jaetravel.co.ke<br />
              Website: <Link href="https://www.jaetravel.co.ke" className="text-primary underline">www.jaetravel.co.ke</Link>
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Ready to book? Contact us for your next adventure in East Africa.
          </p>
          <Link href="/contact" className="inline-block rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  )
}