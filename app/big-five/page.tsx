// app/big-five/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "../TourCard" // Assuming TourCard exists from homepage
import { tours } from "@/lib/tours-data" // Assuming this exists
import { ArrowRight, Shield, Users, Award, Accessibility, Star, MapPin, Calendar, Users as UsersIcon, Globe, Heart, Zap, Search, Camera, Binoculars, Leaf, Clock } from "lucide-react"

// Enhanced Rich Schema with more entities (Organization, Breadcrumb, more FAQs, multiple TouristTrips)
const bigFiveSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "sameAs": ["https://www.facebook.com/JaeTravelExpeditions", "https://www.instagram.com/JaeTravelExpeditions"],
    },
    // WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" },
    },
    // WebPage
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/big-five/#webpage",
      "url": "https://www.jaetravel.co.ke/big-five",
      "name": "Big Five Safari Kenya | Lion, Leopard, Elephant, Rhino & Buffalo Safaris",
      "description": "Experience Africa's iconic Big Five animals on wheelchair accessible safaris in Kenya. Witness lion, leopard, elephant, rhino and buffalo in Masai Mara, Amboseli, Tsavo and more with expert guides and adapted vehicles.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/big-five/#breadcrumb" },
    },
    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/big-five/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Big Five Safari Kenya" },
      ],
    },
    // Expanded FAQPage
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What animals make up the Big Five in Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Big Five are lion, leopard, African elephant, rhinoceros (black and white), and Cape buffalo. The term originated from big-game hunting but now represents the most sought-after animals on photographic safaris." },
        },
        {
          "@type": "Question",
          "name": "Where is the best place to see the Big Five in Kenya?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Masai Mara National Reserve offers the highest chance of seeing lion, leopard, elephant and buffalo — with occasional rhino sightings. Other excellent locations include Amboseli (elephants), Tsavo (all Big Five possible), and Lake Nakuru / Laikipia (rhino strongholds)." },
        },
        {
          "@type": "Question",
          "name": "Can wheelchair users see the Big Five on safari in Kenya?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — our wheelchair accessible safari vehicles with hydraulic lifts make it possible to enjoy game drives and spot the Big Five comfortably and safely in Kenya's top parks." },
        },
        {
          "@type": "Question",
          "name": "What is the best time for Big Five safaris in Kenya?",
          "acceptedAnswer": { "@type": "Answer", "text": "Dry seasons (June-October, January-February) offer the best wildlife viewing as animals congregate around water sources. The Great Migration period (July-October) in Masai Mara enhances Big Five sightings with dramatic predator-prey interactions." },
        },
        {
          "@type": "Question",
          "name": "How much does a Big Five safari in Kenya cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Prices start from $2,850 USD per person for a 7-day accessible Big Five safari, including adapted vehicles, expert guides, accommodations in disability-friendly lodges, and all game drives." },
        },
      ],
    },
    // Multiple TouristTrip Offers
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/big-five/#masai-mara-trip",
      "name": "7-Day Big Five Masai Mara Safari – Wheelchair Accessible",
      "description": "Ultimate Big Five experience in Masai Mara with daily game drives, adapted safari vehicles, and luxury accessible lodges.",
      "image": "https://www.jaetravel.co.ke/Big-5.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/tours/big-five-masai-mara",
        "price": "2850",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01",
      },
    },
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/big-five/#amboseli-trip",
      "name": "5-Day Big Five Amboseli Adventure",
      "description": "Focus on elephant herds and other Big Five in Amboseli with Kilimanjaro views and accessible facilities.",
      "offers": {
        "@type": "Offer",
        "price": "1950",
        "priceCurrency": "USD",
      },
    },
  ],
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Big Five Safari Kenya | Lion, Leopard, Elephant, Rhino & Buffalo | JAE Travel Expeditions",
    description:
      "Discover Africa's legendary Big Five animals on wheelchair accessible safaris in Kenya. Experience thrilling game drives in Masai Mara, Amboseli, Tsavo & more. Book your inclusive Big Five safari adventure today with expert guides and adapted vehicles.",
    keywords: [
      "big five safari",
      "big five kenya",
      "big five animals",
      "lion safari kenya",
      "leopard sighting masai mara",
      "elephant amboseli",
      "rhino kenya safari",
      "cape buffalo tsavo",
      "wheelchair accessible big five",
      "accessible big five safari kenya",
      "masai mara big five",
      "kenya wildlife safari",
      "best big five safari africa",
      "big five game drives",
      "safari big five kenya",
      "african big five animals",
      "big five safari packages",
      "big five tours kenya",
      "inclusive big five safaris",
      "disability friendly big five tours",
      "big five conservation kenya",
      "best time big five kenya",
      "budget big five safari",
      "luxury big five safari kenya",
    ],
    openGraph: {
      title: "Big Five Safari Kenya | See the Iconic Lion, Leopard, Elephant, Rhino & Buffalo",
      description: "Experience the thrill of spotting Africa's Big Five in Kenya with fully accessible safari options. Expert guides, adapted vehicles, unforgettable wildlife encounters in Masai Mara and beyond.",
      images: ["/big-five-hero.jpg"],
      type: "website",
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/big-five",
      languages: {
        'en': 'https://www.jaetravel.co.ke/big-five',
        'en-US': 'https://www.jaetravel.co.ke/big-five',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Big Five Card (unchanged)
function BigFiveCard({
  name,
  description,
  icon: Icon,
  image,
  bestParks,
}: {
  name: string
  description: string
  icon: any
  image: string
  bestParks: string[]
}) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-xl">
      <div className="relative h-56">
        <Image
          src={image}
          alt={`${name} - Big Five animal on Kenya safari game drive`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 text-muted-foreground leading-relaxed">{description}</p>
        <div>
          <h4 className="mb-2 text-sm font-semibold">Best Viewing Parks:</h4>
          <ul className="list-disc pl-4 text-sm text-muted-foreground">
            {bestParks.map((park, i) => (
              <li key={i}><Link href={`/destinations/${park.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">{park}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function BigFivePage() {
  // Mock featured Big Five tours - filter from tours data or hardcode
  const featuredBigFiveTours = tours.filter(t => t.tags?.includes('big-five')).slice(0, 3) || [
    { id: 'big-five-mara', title: '7-Day Big Five Masai Mara', price: 2850, duration: '7 days', image: '/Big-5.jpg' },
    { id: 'big-five-amboseli', title: '5-Day Amboseli Elephant Focus', price: 1950, duration: '5 days', image: '/african-lions-uganda-1024x683.webp' },
    { id: 'big-five-tsavo', title: '6-Day Tsavo Big Five Adventure', price: 2450, duration: '6 days', image: '/Inverdoorn-54.jpg' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bigFiveSchema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-muted/10">
        <div className="absolute inset-0">
          <Image
            src="/Big-5.jpg"
            alt="Big Five animals Kenya safari - lion leopard elephant rhino buffalo in Masai Mara"
            fill
            className="object-cover brightness-[0.75]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-4xl md:text-6xl font-bold text-balance">
            Big Five Safari Kenya
            <br />
            <span className="text-primary">Lion · Leopard · Elephant · Rhino · Buffalo</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl md:text-2xl text-white/90 leading-relaxed">
            Experience Africa’s most iconic wildlife on thrilling <strong>game drives</strong> in Kenya’s top reserves. 
            Our <Link href="/disability-tours" className="underline">wheelchair accessible safaris</Link> ensure everyone can witness these magnificent animals up close.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tours/big-five-masai-mara">Book Your Big Five Safari</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20" asChild>
              <Link href="/disability-tours">Explore Accessible Options</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expanded Intro */}
      <section className="py-20 bg-muted/30 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-10 text-center font-serif text-4xl md:text-5xl font-bold">
            Discover the Legendary Big Five Animals in Kenya
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              The <strong>Big Five animals</strong> — lion, leopard, African elephant, rhinoceros, and Cape buffalo — represent the pinnacle of any <strong>African safari</strong>. 
              Originally coined by hunters for the most challenging game, today these icons draw wildlife enthusiasts worldwide for photographic <strong>Big Five safaris in Kenya</strong>.
            </p>
            <p>
              At JAE Travel Expeditions, we specialize in <strong>inclusive Big Five tours</strong> that make these encounters accessible to all. 
              Our fleet of <Link href="/vehicle-hire" className="text-primary hover:underline">wheelchair accessible safari vehicles</Link> with hydraulic lifts and pop-up roofs allows comfortable viewing during extended <strong>game drives</strong>, 
              while our partnerships with <strong>disability-friendly lodges</strong> ensure a seamless experience.
            </p>
            <p>
              From the predator-rich plains of the <Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara</Link> to the elephant paradises of <Link href="/tours/amboseli-safari" className="text-primary hover:underline">Amboseli</Link>, 
              our expert guides maximize your chances of spotting all five on a single trip. Whether you're seeking <strong>budget Big Five safaris</strong> or luxury experiences, 
              we craft itineraries that blend adventure, conservation, and accessibility.
            </p>
            <p>
              Kenya offers some of the <strong>best Big Five safaris in Africa</strong>, with diverse habitats supporting healthy populations. 
              Join us to witness lions on the hunt, elusive leopards in trees, massive elephant herds, rare rhinos in sanctuaries, and formidable buffalo groups — all while supporting local conservation efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Big Five */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            Why Choose JAE Travel for Your Big Five Safari Kenya
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Expert Tracking</h3>
              <p className="text-sm text-muted-foreground">Certified guides with 15+ years spotting Big Five animals in Kenya's reserves.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Accessibility className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Full Accessibility</h3>
              <p className="text-sm text-muted-foreground">Adapted vehicles and lodges for <strong>wheelchair accessible Big Five safaris</strong>.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Conservation Focus</h3>
              <p className="text-sm text-muted-foreground">Support rhino protection and anti-poaching through our sustainable tours.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Guaranteed Sightings</h3>
              <p className="text-sm text-muted-foreground">High success rates for all Big Five on multi-park itineraries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Five Members - Expanded with best parks and internal links */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-serif text-4xl md:text-5xl font-bold">
            Meet Africa's Iconic Big Five Animals
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <BigFiveCard
              name="Lion"
              description="The apex predator and symbol of strength. Prides dominate the savannah, offering dramatic hunts and family interactions during game drives."
              icon={Binoculars}
              image="/Inverdoorn-54.jpg"
              bestParks={["Kenya", "Tanzania", "Uganda"]}
            />
            <BigFiveCard
              name="Leopard"
              description="Master of stealth with stunning rosette patterns. Often spotted in trees or rocky outcrops — a highlight of nocturnal game drives."
              icon={Search}
              image="/African_leopard_male_(cropped).jpg"
              bestParks={["Kenya", "Tanzania", "Rwanda"]}
            />
            <BigFiveCard
              name="Elephant"
              description="Intelligent giants with complex social structures. Witness matriarch-led herds and calves playing — especially rewarding in large groups."
              icon={Globe}
              image="/African_Bush_Elephant.jpg"
              bestParks={["Kenya", "Tanzania", "Rwanda"]}
            />
            <BigFiveCard
              name="Rhinoceros"
              description="Ancient survivors facing conservation challenges. See protected black and white rhinos in secure sanctuaries with expert rangers."
              icon={Shield}
              image="/images (1).jpg"
              bestParks={["Kenya", "Rwanda", "Tanzania"]}
            />
            <BigFiveCard
              name="Cape Buffalo"
              description="Known for their strength and herd mentality. Often encountered in massive groups, providing intense close-up safari experiences."
              icon={UsersIcon}
              image="/images (2).jpg"
              bestParks={["Kenya", "Uganda", "Tanzania"]}
            />
          </div>
        </div>
      </section>

      {/* Best Places - Expanded with Table */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            Best Places to See the Big Five in Kenya
          </h2>
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full border-collapse border border-border bg-card">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-4 text-left">Destination</th>
                  <th className="border border-border p-4 text-left">Big Five Highlights</th>
                  <th className="border border-border p-4 text-left">Best Time</th>
                  <th className="border border-border p-4 text-left">Accessibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-4"><Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara</Link></td>
                  <td className="border border-border p-4">Lion, leopard, elephant, buffalo; rhino occasional</td>
                  <td className="border border-border p-4">July-Oct (Migration)</td>
                  <td className="border border-border p-4">Full wheelchair access with adapted vehicles</td>
                </tr>
                <tr>
                  <td className="border border-border p-4"><Link href="/tours/amboseli-safari" className="text-primary hover:underline">Amboseli</Link></td>
                  <td className="border border-border p-4">Massive elephant herds, lion, buffalo</td>
                  <td className="border border-border p-4">June-Oct</td>
                  <td className="border border-border p-4">Accessible lodges & game drives</td>
                </tr>
                <tr>
                  <td className="border border-border p-4"><Link href="/tours/tsavo-east-west-adventure" className="text-primary hover:underline">Tsavo East/West</Link></td>
                  <td className="border border-border p-4">All Big Five possible; red elephants</td>
                  <td className="border border-border p-4">Jan-Feb, June-Oct</td>
                  <td className="border border-border p-4">Rugged but adaptable with our vehicles</td>
                </tr>
                <tr>
                  <td className="border border-border p-4"><Link href="/tours/lake-nakuru" className="text-primary hover:underline">Lake Nakuru/Laikipia</Link></td>
                  <td className="border border-border p-4">Rhino sanctuaries, lion, leopard</td>
                  <td className="border border-border p-4">Year-round; best Jan-Mar</td>
                  <td className="border border-border p-4">Excellent for wheelchair users</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/destinations">Explore All Destinations <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Best Time Section - New */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            Best Time for Big Five Safaris in Kenya
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              Timing your <strong>Big Five safari Kenya</strong> maximizes sightings. Dry seasons concentrate animals around water, making spotting easier during <strong>game drives</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>June-October (Peak Dry Season):</strong> Best overall for Big Five; coincides with <Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Great Migration</Link> in Masai Mara for predator action.</li>
              <li><strong>January-February (Short Dry):</strong> Excellent visibility, fewer crowds; ideal for rhino in northern parks.</li>
              <li><strong>November-December (Short Rains):</strong> Lush landscapes, baby animals; good for elephant families in Amboseli.</li>
              <li><strong>March-May (Long Rains):</strong> Challenging but rewarding for dedicated wildlife photographers; lower prices.</li>
            </ul>
            <p>
              Our year-round <strong>accessible Big Five safaris</strong> adapt to seasons with flexible itineraries and weather-proof vehicles.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/tours">View Seasonal Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours - New */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            Featured Big Five Safari Packages
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredBigFiveTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">See All Big Five Tours <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Conservation Section - New */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            Big Five Conservation in Kenya
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              Kenya leads in <strong>Big Five conservation</strong>, with initiatives protecting these species from poaching and habitat loss. 
              Our safaris contribute to community conservancies and anti-poaching funds.
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Rhino Protection:</strong> Support sanctuaries like Ol Pejeta, home to the world's last northern white rhinos.</li>
              <li><strong>Lion Monitoring:</strong> Partner with projects tracking prides in Masai Mara to reduce human-wildlife conflict.</li>
              <li><strong>Elephant Corridors:</strong> Aid in maintaining migration routes in Tsavo-Amboseli ecosystem.</li>
              <li><strong>Community Benefits:</strong> Eco-tourism creates jobs and incentives for local wildlife protection.</li>
            </ul>
            <p>
              Choose our <strong>sustainable Big Five tours</strong> to experience wildlife while supporting its future.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Learn How You Can Help</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Accessibility CTA - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-primary p-10 md:p-16 text-primary-foreground overflow-hidden relative">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 md:w-1/2">
              <Image
                src="/accessible-game-drive.jpg"
                alt="Wheelchair user spotting Big Five on accessible safari vehicle in Kenya"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="mb-6 font-serif text-4xl md:text-5xl font-bold">
                Wheelchair Accessible Big Five Safaris in Kenya
              </h2>
              <p className="mb-6 text-lg leading-relaxed">
                Don't let mobility challenges stop you from experiencing the <strong>Big Five animals</strong>. Our custom <Link href="/vehicle-hire" className="underline hover:text-secondary">adapted safari vehicles</Link> feature hydraulic lifts, secure restraints, and panoramic views for optimal wildlife spotting.
              </p>
              <p className="mb-8 text-lg leading-relaxed">
                Stay in premium <strong>disability-friendly lodges</strong> with roll-in showers and ramp access. Our trained staff ensure a barrier-free <strong>Big Five safari Kenya</strong> adventure, from Masai Mara game drives to rhino tracking in Laikipia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/disability-tours">Explore Accessible Big Five Tours</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <Link href="/vehicle-hire">View Our Adapted Safari Vehicles</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Already expanded in schema */}
      <section className="py-20 bg-muted/20 border-b">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            Frequently Asked Questions About Big Five Safaris
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {bigFiveSchema["@graph"].find(item => item["@type"] === "FAQPage")?.mainEntity?.map((faq, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold mb-2">{faq.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - New */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
            What Our Big Five Safari Guests Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Michael Thompson", location: "USA", text: "Saw all Big Five in one trip! The accessible vehicle made it easy and comfortable.", rating: 5 },
              { name: "Anna Rodriguez", location: "Spain", text: "Incredible leopard sightings in Masai Mara. Guides knew exactly where to go.", rating: 5 },
              { name: "James Kim", location: "Canada", text: "Rhino encounter in Ol Pejeta was life-changing. Perfect for wheelchair users.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="mb-8 font-serif text-4xl md:text-5xl font-bold text-balance">
            Ready for Your Big Five Safari Adventure in Kenya?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Whether chasing lions in the <Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara</Link> or elephants in <Link href="/tours/amboseli-safari" className="text-primary hover:underline">Amboseli</Link>, 
            our <strong>Big Five safari packages</strong> deliver unforgettable wildlife encounters. Book your accessible, customized tour today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Your Custom Big Five Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us for Details
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}