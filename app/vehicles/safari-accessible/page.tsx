import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Shield, Users, Car, Phone, Mail, Calendar } from "lucide-react"

// Only keep the safari vehicle + add rich content for SEO block
const safariVehicle = {
  slug: "safari-accessible",
  url: "/vehicles/safari-accessible",
  name: "Safari Accessible 4×4 Land Cruiser – Wheelchair Adapted",
  type: "Accessible Safari Tours",
  capacity: "1 wheelchair user + up to 5 companions",
  price: "$150 per day (all-inclusive safari rate)",
  image: "/2.jpeg",
  altImage: "Wheelchair-accessible safari vehicle with pop-up roof in Masai Mara, Kenya",
  description:
    "The only fully wheelchair-accessible safari vehicle in Kenya with hydraulic lift, pop-up roof, and all-terrain capability. Designed specifically for travelers with mobility impairments who want to experience the Big Five without barriers.",
  features: [
    "Hydraulic side lift (supports up to 300 kg)",
    "Full pop-up roof – wheelchair user stays seated during game drives",
    "360° viewing with camera hatches at wheelchair height",
    "4×4 all-terrain capability (Masai Mara, Amboseli, Tsavo, Samburu)",
    "Q’Straint wheelchair restraint system (international safety standard)",
    "Cooler box, charging ports, binoculars included",
    "Experienced driver-guide trained in disability assistance",
    "Raised suspension for smooth ride comfort",
  ],
  included: [
    "Unlimited game drives",
    "Professional accessible-trained guide",
    "Bottled water & snacks",
    "Park entrance fees assistance",
    "24/7 emergency support",
  ],
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (params.slug !== safariVehicle.slug) {
    return { title: "Vehicle Not Found" }
  }

  return {
    title: "Accessible Kenya Safari Vehicle | Wheelchair Friendly Safari Tours 2025/2026",
    description:
      "Experience the ultimate wheelchair accessible Kenya safari. Hydraulic lift, pop-up roof, stay seated game drives in Masai Mara, Amboseli & more. Book your inclusive Kenya safari for disabled travelers today.",
    keywords: [
      "accessible Kenya safari",
      "wheelchair accessible safari Kenya",
      "disabled safari Kenya",
      "mobility impaired safari Kenya",
      "handicap accessible Kenya safari",
      "wheelchair friendly safari Kenya",
      "inclusive safari tours Kenya",
      "adaptive safari Kenya",
      "special needs safari Kenya",
      "Kenya safari for people with disabilities",
    ].join(", "),
    openGraph: {
      title: "Accessible Kenya Safari | Wheelchair Accessible Game Drives",
      description:
        "Kenya's #1 wheelchair-accessible safari vehicle. See the Big Five without leaving your wheelchair. Masai Mara, Serengeti migration, Amboseli – fully inclusive.",
      images: ["/2.jpeg"],
      type: "website",
    },
    alternates: {
      canonical: `https://www.jaetravel.co.ke/vehicles/${safariVehicle.slug}`,
    },
    robots: "index, follow",
  }
}

export default function AccessibleSafariPage({ params }: { params: { slug: string } }) {
  if (params.slug !== safariVehicle.slug) {
    notFound()
  }

  return (
    <>
      {/* Structured Data - Tour + Vehicle + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: "Accessible Kenya Safari with Wheelchair Adapted 4x4",
            description: safariVehicle.description,
            url: `https://www.jaetravel.co.ke/vehicles/${safariVehicle.slug}`,
            image: "https://www.jaetravel.co.ke/2.jpeg",
            offers: {
              "@type": "Offer",
              price: "150",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `https://www.jaetravel.co.ke/book-now?vehicle=${safariVehicle.slug}`,
            },
            "accessibilityFeature": [
              "wheelchairAccessibleVehicle",
              "hydraulicLift",
              "accessibleViewingPlatform",
              "assistiveListeningSystems",
              "signLanguageGuideOnRequest"
            ],
            "additionalType": "http://schema.org/SafariTour",
            "touristType": "Accessible Tourism",
            "faqPage": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Can wheelchair users do safari in Kenya?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our specially modified 4x4 Land Cruisers allow wheelchair users to enjoy full game drives while remaining seated in their wheelchair thanks to the hydraulic lift and pop-up roof."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide assistance transferring into the vehicle?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. All our drivers are trained in safe manual handling and transfer techniques. We can also arrange hoists on request."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which parks are best for accessible safari in Kenya?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Masai Mara (best for Big Five & Migration), Amboseli (Kilimanjar views), Lake Nakuru, Tsavo West, and Samburu all have accessible lodges and our vehicles can access them."
                  }
                }
              ]
            }
          }),
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Back Link */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/vehicles" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Back to All Accessible Vehicles
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <div className="order-2 lg:order-1">
            <Image
              src={safariVehicle.image}
              alt={safariVehicle.altImage}
              width={800}
              height={600}
              className="rounded-2xl object-cover w-full shadow-2xl"
              priority
            />
            <p className="text-sm text-muted-foreground text-center mt-4">
              Wheelchair user enjoying pop-up roof game drive in Masai Mara National Reserve
            </p>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 mb-4">
                Fully Accessible Safari Vehicle
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                Accessible Kenya Safari Vehicle<br />
                <span className="text-primary">Wheelchair Adapted 4×4 Land Cruiser</span>
              </h1>

              <p className="mt-6 text-xl text-muted-foreground">
                Experience the real African safari <strong>without compromises</strong>. Our custom-built accessible safari vehicles let you see lions, elephants, and the Great Migration while staying comfortably seated in your wheelchair.
              </p>

              <div className="flex items-center gap-6 mt-8">
                <div className="text-3xl font-bold text-primary">{safariVehicle.price}</div>
                <div className="text-sm text-muted-foreground">per vehicle / per day<br />(park fees extra)</div>
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border bg-card p-6">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg">Capacity</h3>
                <p className="text-muted-foreground">{safariVehicle.capacity}</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg">Safety & Certification</h3>
                <p className="text-muted-foreground">Q’Straint certified · Fully insured · Trained assistants</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-5">Why This Is the Best Accessible Safari Vehicle in Kenya</h2>
              <ul className="space-y-3">
                {safariVehicle.features.map((feature, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/book-now?vehicle=${safariVehicle.slug}`}>
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Accessible Safari Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Extra SEO Content Block */}
        <section className="mt-20 max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-center">Kenya’s Most Trusted Wheelchair Accessible Safari Experience</h2>
          <div className="grid md:grid-cols-2 gap-12 text-lg leading-relaxed">
            <div>
              <p>
                For years, travelers with disabilities were told that an authentic African safari was impossible. We changed that.
              </p>
              <p className="mt-4">
                Our fleet of <strong>wheelchair-accessible safari vehicles</strong> operates daily in the Masai Mara, Amboseli, Lake Nakuru, Tsavo, and Samburu. Every vehicle is modified in-house to the highest international accessibility standards.
              </p>
              <p className="mt-4">
                You stay in your own wheelchair during the entire game drive. The hydraulic lift lifts you in seconds, the pop-up roof gives you unobstructed 360° views at eye level with giraffes, and our guides are specially trained in disability awareness and assistance.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Perfect For:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Spinal cord injury & paraplegia</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Multiple sclerosis (MS)</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Cerebral palsy</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Elderly travelers with reduced mobility</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Families with a disabled member</li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions – Accessible Kenya Safari</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              {[
                {
                  q: "Is a real safari possible in a wheelchair in Kenya?",
                  a: "Absolutely yes. Thousands of guests with mobility impairments have experienced the Masai Mara and the Great Migration with us — many say it was the highlight of their lives."
                },
                {
                  q: "Do I need to transfer out of my wheelchair?",
                  a: "No. You remain in your wheelchair throughout the game drive. The pop-up roof is designed exactly for this."
                },
                {
                  q: "Are the lodges and camps accessible too?",
                  a: "We only work with verified accessible lodges (ramps, roll-in showers, hoists on request). We’ll plan your full itinerary accordingly."
                },
                {
                  q: "What is the best time for an accessible Kenya safari?",
                  a: "Year-round, but June–October for the Great Migration and December–March for excellent wildlife and weather."
                }
              ].map((item, i) => (
                <details key={i} className="group border-b pb-6">
                  <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground text-lg">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="text-center py-12 bg-primary/5 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Ready for the Safari of a Lifetime?</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              No barriers. Just you, your wheelchair, and the wild heart of Africa.
            </p>
            <Button asChild size="lg">
              <Link href={`/book-now?vehicle=${safariVehicle.slug}`}>
                <Mail className="mr-2 h-5 w-5" />
                Reserve Your Accessible Safari Vehicle Today
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}