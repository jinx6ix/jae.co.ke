import type { Metadata } from "next"
import Link from "next/link"
import { CmsPage } from "@/app/(marketing)/_components/CmsPage"

export const metadata: Metadata = {
  title: "Tour Operators in Kenya | Safari & Accessible Travel Experts",
  description: "Looking for the best licensed tour operators in Kenya? JaeTravel Expeditions offers expert-led safari tours, accessible travel solutions, and unforgettable adventures across East Africa.",
  keywords: [
    "tour operators in Kenya",
    "best tour operators in Kenya",
    "safari tour operators Kenya",
    "licensed tour operators Kenya",
    "JaeTravel Expeditions",
    "accessible safari Kenya",
  ],
  alternates: {
    canonical: "https://www.jaetravel.co.ke/tour-operators-in-kenya",
  },
}

export default function TourOperatorsPage() {
  return (
    <>
      <CmsPage
        slug="tour-operators-in-kenya"
        fallback={
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Header */}
            <div className="mb-16 text-center">
              <h1 className="mb-4 font-serif text-5xl font-bold text-balance">
                Tour Operators in Kenya: Expert Advice
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
                Planning your dream safari in East Africa? Choosing the right partner is the most important decision you will make. Here is why JaeTravel Expeditions is your trusted local expert.
                <br />
                Last updated: September 27, 2026
              </p>
            </div>

            {/* Content Sections */}
            <div className="prose prose-lg mx-auto text-muted-foreground space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4">What Makes a Top-Tier Tour Operator in Kenya?</h2>
                <p>
                  With so many safari companies in Kenya, navigating the options can feel overwhelming. A professional, licensed operator ensures not just a remarkable experience, but your safety and comfort throughout your journey. When comparing safari companies, look for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Authentic Licensing:</strong> Full accreditation with the Kenya Association of Tour Operators (KATO) and Kenya Wildlife Service (KWS).</li>
                  <li><strong>Safety Infrastructure:</strong> Robust safety protocols, reliable vehicles, and 24/7 support.</li>
                  <li><strong>Expertise:</strong> Experienced, certified driver-guides who know the land, the wildlife, and local cultures.</li>
                  <li><strong>Accessibility:</strong> Modern fleets capable of catering to special needs, including hydraulic lift conversions for wheelchair travelers.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Why Choose JaeTravel Expeditions?</h2>
                <p>
                  JaeTravel Expeditions stands out among Kenyan tour operators for our commitment to inclusivity, sustainability, and authentic wildlife encounters. Whether you are seeking a luxury wilderness retreat, an intense budget-friendly safari, or an accessible adventure for all mobility needs, we deliver.
                </p>
                <p>
                  Our accreditation, combined with our specialized, high-clearance accessible vehicles, means we can take you where others can’t—without compromising on comfort or safety.
                </p>
              </section>

              <div className="my-12 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2">Service Feature</th>
                      <th className="border border-gray-200 px-4 py-2">JaeTravel Expeditions</th>
                      <th className="border border-gray-200 px-4 py-2">Typical Broker</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">KATO/KWS Certified</td>
                      <td className="border border-gray-200 px-4 py-2">Yes</td>
                      <td className="border border-gray-200 px-4 py-2">Varies</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Accessible Fleet (Hydraulic)</td>
                      <td className="border border-gray-200 px-4 py-2">Yes</td>
                      <td className="border border-gray-200 px-4 py-2">No</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Direct Local Operation</td>
                      <td className="border border-gray-200 px-4 py-2">Yes</td>
                      <td className="border border-gray-200 px-4 py-2">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <section>
                <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                <p>Explore what we offer and find the perfect match for your adventure:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><Link href="/tours" className="text-primary hover:underline">Comprehensive Safari Tours</Link></li>
                  <li><Link href="/vehicle-hire" className="text-primary hover:underline">Reliable Vehicle Hire</Link></li>
                  <li><Link href="/itinerary-builder" className="text-primary hover:underline">Custom Itinerary Builder</Link></li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <details className="border-b pb-2">
                    <summary className="font-bold cursor-pointer underline">How far in advance should I book my safari?</summary>
                    <p className="mt-2 text-sm">For the Great Migration season, we recommend 6–12 months in advance to secure the best lodges and campsites.</p>
                  </details>
                  <details className="border-b pb-2">
                    <summary className="font-bold cursor-pointer underline">Can you accommodate travelers with disabilities?</summary>
                    <p className="mt-2 text-sm">Yes, we specialize in accessible safari travel with vehicles equipped with hydraulic lifts and personalized care.</p>
                  </details>
                </div>
              </section>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">
                Ready to plan your Kenya Safari adventure?
              </p>
              <Link href="/contact" className="inline-block rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90">
                Contact JaeTravel Today
              </Link>
            </div>
          </div>
        }
      />
    </>
  )
}
