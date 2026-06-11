// app/budget-masai-mara-safari/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, DollarSign, Users, Shield, Phone, Star, Clock, Award, Mail, Calendar, MapPin, Mountain, Sun, Droplets, Thermometer, Info, binoculars, Camera } from "lucide-react";
import { budgetTours } from "@/lib/budget-tours-data";
import { BASE_URL } from "@/lib/i18n/config";

const TOURS = budgetTours;
const TOURS_MIN = Math.min(...TOURS.map((t) => t.price));
const TOURS_MAX = Math.max(...TOURS.map((t) => t.price));
const TOURS_AVG = (TOURS.reduce((s, t) => s + t.rating, 0) / TOURS.length).toFixed(1);
const TOTAL_REV = TOURS.reduce((s, t) => s + t.reviewCount, 0);

const ABSOLUTE_URL = `${BASE_URL}/budget-masai-mara-safari`;
const HERO_IMG = `${BASE_URL}/masai-mara-migration.jpg`;

export const metadata: Metadata = {
  title: "Budget Masai Mara Safari 2026 | From $610/Person | JaeTravel",
  description: "Affordable Masai Mara safari tours 2026 from $610. Big Five, Great Migration, tented camps. Book now.",
  keywords: "budget Masai Mara safari, cheap Masai Mara tours 2026, affordable Masai Mara safari from $610, Masai Mara budget packages, Masai Mara group safari, Masai Mara wildlife tours, Masai Mara tented camps, Masai Mara cheap tours, Kenya budget safari, Masai Mara migration safari, budget safari Kenya 2026, Masai Mara Big Five, affordable Kenya wildlife tours",
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  alternates: {
    canonical: ABSOLUTE_URL,
    languages: { en: ABSOLUTE_URL, "x-default": ABSOLUTE_URL },
  },
  openGraph: {
    title: "Budget Masai Mara Safari 2026 | From $610/Person",
    description: "Affordable Masai Mara safari tours 2026 from $610. Big Five, Great Migration, tented camps. Book now.",
    url: ABSOLUTE_URL, siteName: "JaeTravel Expeditions",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Budget Masai Mara Safari 2026", type: "image/jpeg" }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Masai Mara Safari 2026 | From $610/Person",
    description: "Affordable Masai Mara safari tours 2026 from $610. Big Five, Great Migration, tented camps. Book now.",
    images: [HERO_IMG], site: "@jaetravel", creator: "@jaetravel",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${ABSOLUTE_URL}#webpage`, url: ABSOLUTE_URL, name: "Budget Masai Mara Safari Kenya 2026", description: "Affordable Masai Mara safari tours 2026 from $610. Big Five, Great Migration, tented camps.", isPartOf: { "@type": "WebSite", "@id": `${BASE_URL}/#website`, name: "JaeTravel Expeditions", url: BASE_URL }, primaryImageOfPage: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 } },
    { "@type": "TouristAttraction", "@id": `${BASE_URL}/destinations/masai-mara#attraction`, name: "Masai Mara National Reserve", description: "Masai Mara is Kenya's most iconic wildlife reserve, famous for the annual Great Migration, Big Five sightings, and sweeping savannah vistas with the Mara River flowing through.", image: HERO_IMG, address: { "@type": "PostalAddress", addressLocality: "Masai Mara", addressRegion: "Kenya", addressCountry: "KE" }, geo: { "@type": "GeoCoordinates", latitude: -1.5, longitude: 35.1 }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1247" } },
    { "@type": "Product", name: "Budget Masai Mara Safari Kenya 2026", description: "Affordable Masai Mara safari tours 2026 from $610. Big Five, Great Migration, tented camps.", url: ABSOLUTE_URL, image: HERO_IMG, brand: { "@type": "Brand", name: "JaeTravel Expeditions" }, offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: TOURS_MIN.toString(), highPrice: TOURS_MAX.toString(), offerCount: TOURS.length.toString(), availability: "https://schema.org/InStock", priceValidUntil: "2026-12-31" }, aggregateRating: { "@type": "AggregateRating", ratingValue: TOURS_AVG, reviewCount: TOTAL_REV.toString(), bestRating: "5" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "When is the best time for a budget Masai Mara safari?", acceptedAnswer: { "@type": "Answer", text: "July to October offers the famous Great Migration with dramatic river crossings where crocodiles wait for wildebeest. However, excellent wildlife viewing happens year-round with lower prices from November to June. January-February is prime for predator action with the grass shorter and animals easier to spot." } },
      { "@type": "Question", name: "What is the Great Migration?", acceptedAnswer: { "@type": "Answer", text: "The Great Migration is the annual movement of 1.5+ million wildebeest plus 300,000 zebra and 150,000 gazelle from Tanzania's Serengeti to Kenya's Masai Mara. It's the largest remaining overland migration on Earth, with dramatic Mara River crossings where crocodiles lie in wait." } },
      { "@type": "Question", name: "What wildlife will I see in Masai Mara?", acceptedAnswer: { "@type": "Answer", text: "Masai Mara is famous for the Big Five (lion, leopard, elephant, buffalo, rhino), plus cheetahs, hyenas, giraffes, zebras, hippos, and 450+ bird species. July-October adds millions of wildebeest and zebra during the migration. The Mara River hosts hippos and crocodiles." } },
      { "@type": "Question", name: "Are budget safaris in Masai Mara safe?", acceptedAnswer: { "@type": "Answer", text: "Yes. We use licensed operators, professional guides, and well-maintained 4x4 vehicles. Our tented camps are secure with security guards. Safari safety is our top priority — we've safely conducted 1000+ group safaris with zero major incidents." } },
      { "@type": "Question", name: "What is the difference between budget and luxury Masai Mara safaris?", acceptedAnswer: { "@type": "Answer", text: "Budget safaris use comfortable tented camps instead of luxury lodges, shared vehicles (4-12 people) instead of private, and standardized meal plans. The wildlife viewing experience is identical — same parks, same game drives, same professional guides." } },
      { "@type": "Question", name: "How do I get to Masai Mara from Nairobi?", acceptedAnswer: { "@type": "Answer", text: "We provide pick-up from Nairobi hotels/airports at 7:00 AM. The drive takes 5-6 hours through the scenic Great Rift Valley. All transport in air-conditioned 4x4 Land Cruisers is included in your package." } },
      { "@type": "Question", name: "How many days do I need for Masai Mara?", acceptedAnswer: { "@type": "Answer", text: "We recommend a minimum of 3 days to cover the main attractions. A 4-5 day safari allows you to explore different regions of the reserve and increases your chances of seeing the Big Five. Our 7+ day packages combine Masai Mara with Lake Nakuru and other parks." } },
      { "@type": "Question", name: "What makes Masai Mara different from Serengeti?", acceptedAnswer: { "@type": "Answer", text: "While the Serengeti and Masai Mara form one continuous ecosystem, Masai Mara has several advantages: better predator density (especially cheetahs), the Mara River with its dramatic crossings, and a more intimate scale that creates better wildlife viewing opportunities." } },
      { "@type": "Question", name: "Can I see the Great Migration from a budget safari?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Our budget safari packages are timed to coincide with peak migration season (July-October). You'll witness thousands of wildebeest crossing the Mara River, predator action following the herds, and the incredible spectacle of millions of animals on the move." } },
      { "@type": "Question", name: "What should I pack for a Masai Mara safari?", acceptedAnswer: { "@type": "Answer", text: "Pack light neutral-colored clothing (khaki, brown, green), a light jacket for early morning game drives, binoculars, a camera with zoom lens (200-400mm recommended for wildlife), sunscreen SPF 50+, a wide-brimmed hat, and comfortable closed walking shoes. Avoid bright colors and white clothing." } },
    ]},
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Budget Tours", item: `${BASE_URL}/budget-tours` },
      { "@type": "ListItem", position: 3, name: "Masai Mara Safari", item: ABSOLUTE_URL }
    ]},
    { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "JaeTravel Expeditions", url: BASE_URL, telephone: "+254726485228", email: "info@jaetravel.co.ke", aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", reviewCount: TOTAL_REV.toString() } },
  ],
};

export default function BudgetMasaiMaraSafariPage() {
  return (
    <div className="pb-16" dir="ltr">
      <Script id="budget-masai-mara-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/masai-mara-migration.jpg" alt="Budget Masai Mara Safari 2026" fill className="object-cover brightness-50" priority sizes="100vw" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Rated {TOURS_AVG}/5 by {TOTAL_REV}+ Happy Safari Travelers</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Budget Masai Mara Safari 2026 <span className="text-amber-400">— From ${TOURS_MIN}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Witness the Great Migration, spot the Big Five, and experience Africa&apos;s most iconic wildlife reserve — all without breaking the bank. Expert-guided group safaris with tented camps from Nairobi.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
            <Button asChild size="lg" className="min-w-[240px] text-lg bg-green-600 hover:bg-green-700 font-semibold">
              <Link href="#tours">View All {TOURS.length} Safari Packages</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[240px] text-lg border-white bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <Link href="/contact">Talk to Our Safari Experts</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Best Price Guarantee</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Small Group Safaris</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Support</span>
            <span className="flex items-center gap-2"><Award className="h-4 w-4" /> {TOTAL_REV}+ Happy Travelers</span>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-green-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center text-sm font-medium">
            <div><div className="text-2xl font-bold">{TOURS.length}+</div><div className="opacity-80">Safari Packages</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">${TOURS_MIN}</div><div className="opacity-80">Starting From</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">1,500km²</div><div className="opacity-80">Reserve Size</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{TOURS_AVG}★</div><div className="opacity-80">Average Rating</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{TOTAL_REV}+</div><div className="opacity-80">Happy Travelers</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">15+</div><div className="opacity-80">Years Experience</div></div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-5xl font-bold tracking-tight">
              Kenya&apos;s #1 Budget Masai Mara Safari Tours 2026
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Masai Mara National Reserve is Africa&apos;s most iconic wildlife destination — and you don&apos;t need a luxury budget to experience it. Our carefully crafted budget Masai Mara safari packages let you witness the Great Migration, spot the Big Five, and sleep under African stars starting from just <strong>${TOURS_MIN} per person</strong>.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Whether you&apos;re a first-time safari-goer or a seasoned wildlife enthusiast, Masai Mara delivers unparalleled predator sightings, sweeping savannah vistas, and memories that last a lifetime. The reserve spans 1,500 km² and is home to the largest concentration of wild predators in the world.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              All our tours include shared 4x4 Land Cruisers, comfortable tented camps, all meals, park fees, and professional guides who share deep knowledge of the Mara&apos;s ecosystems and wildlife behavior.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              <Link href="#tours">Browse All Safari Packages</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* PARK FACTS / QUICK INFO */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <MapPin className="h-6 w-6" />, label: "Location", value: "270km southwest of Nairobi, Kenya" },
              { icon: <Mountain className="h-6 w-6" />, label: "Altitude", value: "1,500-2,200m above sea level" },
              { icon: <binoculars className="h-6 w-6" />, label: "Wildlife", value: "Big Five + 450+ bird species" },
              { icon: <Info className="h-6 w-6" />, label: "Best Season", value: "July-Oct (Great Migration)" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
                <div className="text-green-600 flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
                  <div className="font-semibold text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Why Travelers Choose JaeTravel for Their Masai Mara Safari
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <DollarSign className="h-8 w-8" />, title: "Best Price Guarantee", desc: `Starting from $${TOURS_MIN} per person with all-inclusive packages. No hidden costs, no surprises.` },
              { icon: <Users className="h-8 w-8" />, title: "Small Group Sizes", desc: "4-12 travelers per vehicle for personalized attention and better wildlife viewing." },
              { icon: <Star className="h-8 w-8" />, title: "5-Star Rated", desc: `${TOURS_AVG}/5 average from ${TOTAL_REV}+ verified reviews. Our reputation speaks for itself.` },
              { icon: <Shield className="h-8 w-8" />, title: "Safety First", desc: "Licensed operator with comprehensive insurance and 24/7 emergency support." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition border-2 border-transparent hover:border-green-500">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-green-600">{item.icon}</div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WILDLIFE HIGHLIGHTS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-4xl font-bold">Wildlife in Masai Mara: What You&apos;ll See</h2>
            <p className="text-lg text-muted-foreground">
              Masai Mara&apos;s diverse ecosystems support the highest concentration of wild predators in Africa. The reserve is famous for the Big Five, cheetahs, and the dramatic hunting scenes that unfold across the golden savannah.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "African Elephants", emoji: "🐘", desc: "Large herds of 50+ elephants cross the savannah plains. The Mara&apos;s elephants are well-habituated and allow close observation. Family groups are led by matriarchs with decades of knowledge about water sources and seasonal movements." },
              { title: "Lions & Leopards", emoji: "🦁", desc: "The Mara has one of the highest lion densities in Africa, with prides of 10-15 regularly spotted. Tree-climbing leopards are also commonly seen in the riverine forests along the Mara River, often resting on riverbank fig trees." },
              { title: "Cheetahs", emoji: "🐆", desc: "The open plains of Masai Mara are perfect cheetah habitat. The Mara&apos;s cheetah population is one of the most studied in Africa, with individuals identifiable by their unique spot patterns. Expect high-speed chases across the golden savannah." },
              { title: "Cape Buffaloes", emoji: "🐃", desc: "Massive herds of 500+ buffalo are common near the Mara River. These formidable beasts travel together for safety, creating dramatic wall of horns when predators approach. Hyenas and lions often target weaker individuals." },
              { title: "White & Black Rhinos", emoji: "🦏", desc: "Both rhino species are found in the Mara Triangle sanctuary zones. White rhinos are more commonly seen grazing in open areas, while black rhinos prefer denser bush. Anti-poaching patrols ensure their protection." },
              { title: "Bird Species", emoji: "🦅", desc: "Over 450 bird species including the secretary bird, kori bustard (heaviest flying bird), African fish eagles, vultures, and lilac-breasted rollers. The Mara River hosts kingfishers and the African skimmer." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BEST TIME TO VISIT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">Best Time to Visit Masai Mara</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { season: "July – October", label: "Great Migration", color: "border-green-500", icon: <Sun className="h-8 w-8 text-green-600" />, desc: "Peak season for the Great Migration. Watch 1.5+ million wildebeest cross the Mara River. Predators follow the herds. Epic wildlife action. Premium pricing applies but worth every penny.", temp: "20-28°C" },
              { season: "November – March", label: "Dry Season", color: "border-blue-500", icon: <Droplets className="h-8 w-8 text-blue-500" />, desc: "Excellent wildlife viewing as animals congregate around water sources. Short grass makes sightings easier. Great for birding with migratory species. Lower prices and fewer crowds.", temp: "22-30°C" },
              { season: "April – May", label: "Long Rains", color: "border-gray-400", icon: <Thermometer className="h-8 w-8 text-gray-500" />, desc: "Green season brings lush landscapes and newborn animals. Some roads may be muddy. Park fees reduced significantly. Not recommended for those with limited safari experience.", temp: "18-25°C" },
            ].map((item, i) => (
              <Card key={i} className={`border-t-4 ${item.color}`}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <div>
                      <h3 className="text-xl font-bold">{item.season}</h3>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <div className="text-sm font-medium text-green-700">Avg temp: {item.temp}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              <Info className="inline h-4 w-4 mr-1" /> Tip: For the best river crossing views, position yourself at the Mara River during July-September when wildebeest crossings are most frequent.
            </p>
          </div>
        </div>
      </section>

      {/* THE GREAT MIGRATION SECTION */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold">
                The Great Migration: Nature&apos;s Greatest Spectacle
              </h2>
              <p className="text-lg leading-relaxed text-white/80 mb-4">
                Every year, over 1.5 million wildebeest, 300,000 zebra, and 150,000 gazelle cross from Tanzania&apos;s Serengeti into Kenya&apos;s Masai Mara in search of fresh grazing — one of the most breathtaking natural events on Earth.
              </p>
              <p className="text-lg leading-relaxed text-white/80 mb-6">
                The drama unfolds at the Mara River where thousands of wildebeest desperately plunge into crocodile-infested waters. It&apos;s survival of the fittest at its most raw and magnificent — a wildlife experience unlike any other.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">1.5M+</div>
                  <div className="text-sm text-white/70">Wildebeest migrating</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">Jul-Oct</div>
                  <div className="text-sm text-white/70">Peak crossing season</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">300K</div>
                  <div className="text-sm text-white/70">Zebra in the herd</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">450+</div>
                  <div className="text-sm text-white/70">Bird species</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image src="/masai-mara-migration.jpg" alt="The Great Migration in Masai Mara" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* TOURS GRID */}
      <section id="tours" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">Safari Packages for Every Budget and Timeline</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              From 3-day quick escapes to 10-day comprehensive adventures — all include professional guides, accommodations, meals, park fees, and transport.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TOURS.map((tour) => (
              <div key={tour.id} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tour.image.startsWith("/") ? tour.image : `/${tour.image}`}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {tour.originalPrice && tour.originalPrice > tour.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Special Offer</div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Masai Mara
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{tour.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{tour.rating} ({tour.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {tour.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-2xl font-bold text-green-700">${tour.price}</span>
                      {tour.originalPrice && tour.originalPrice > tour.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">${tour.originalPrice}</span>
                      )}
                      <span className="text-xs text-muted-foreground block">per person</span>
                    </div>
                    <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                      <Link href={tour.url}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED DESTINATIONS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Combine Masai Mara with Other Destinations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Lake Nakuru + Masai Mara", desc: "See flamingos at Lake Nakuru, track rhinos, then enjoy Big Five in Masai Mara. Perfect combination.", img: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg", href: "/budget-lake-nakuru-safari" },
              { title: "Amboseli + Masai Mara", desc: "Elephants with Kilimanjaro backdrop then the Great Migration in Mara. Kenya&apos;s ultimate combo.", img: "/masai-mara-safari.jpg", href: "/cheap-amboseli-tours" },
              { title: "Naivasha + Masai Mara", desc: "Boat ride on Naivasha, hippos, giraffes, and world-class wildlife in the Mara.", img: "/hot-air-balloon-safari-masai-mara.jpg", href: "/budget-tours" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="relative h-40 overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED / EXCLUDED */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-8 font-serif text-3xl font-bold flex items-center gap-3">
                <span className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center"><Check className="h-5 w-5" /></span>
                Everything Included
              </h2>
              <ul className="space-y-4">
                {["Professional English-speaking safari guide/driver", "Shared 4x4 Land Cruiser with pop-up roof", "All park entrance fees and conservation charges", "Comfortable budget tented camp or lodge accommodation", "Full-board meals (breakfast, lunch, dinner)", "Bottled drinking water throughout the safari", "Nairobi hotel/airport pick-up and drop-off", "All government taxes and levies"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-8 font-serif text-3xl font-bold flex items-center gap-3">
                <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">–</span>
                Not Included (Plan Ahead)
              </h2>
              <ul className="space-y-4">
                {["International flights and Kenya visa fees ($51 for e-visa)", "Travel insurance (strongly recommended — from $30)", "Tips for guide and camp staff ($10-20/day suggested)", "Alcoholic beverages and soft drinks", "Personal expenses and souvenirs", "Optional activities (balloon safari $450-500, Maasai village visit $25-30)", "Single room supplement ($80-150 depending on package)", "Yellow fever vaccination certificate (if arriving from endemic area)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-xl flex-shrink-0">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO PACK */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Packing Checklist for Masai Mara</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Clothing", items: ["Neutral-colored long sleeves (khaki, brown, green)", "Light trousers and shorts", "Light jacket for early morning game drives", "Wide-brimmed sun hat", "Comfortable closed walking shoes"], icon: "👕" },
              { title: "Gear & Accessories", items: ["Binoculars (10x42 recommended)", "Camera with 200-400mm zoom lens", "Sunscreen SPF 50+", "Dust-resistant bag for electronics", "Daypack for game drive essentials"], icon: "📷" },
              { title: "Health & Comfort", items: ["Personal medications", "Reusable water bottle", "Anti-malarial medication", "Basic first aid kit", "Lip balm and moisturizer"], icon: "💊" },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((thing, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {thing}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center font-serif text-4xl font-bold">What Our Safari Guests Say</h2>
          <p className="text-center text-muted-foreground mb-12">Real reviews from real travelers who experienced the adventure of a lifetime</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Mitchell", location: "London, UK", text: "Absolutely incredible experience! The wildlife sightings exceeded all expectations. Saw lions, leopards, elephants, and even witnessed part of the migration. JaeTravel's organization was flawless from start to finish.", rating: 5, tour: "3-Day Masai Mara Budget Safari" },
              { name: "David Chen", location: "Singapore", text: "Best money I have ever spent on travel. The group safari format meant I met amazing people from around the world while enjoying world-class wildlife viewing. The tented camps were surprisingly comfortable.", rating: 5, tour: "5-Day Three-Park Safari" },
              { name: "Emma Rodriguez", location: "Barcelona, Spain", text: "From booking to farewell, everything was perfectly orchestrated. Our guide's knowledge of wildlife and ecosystems was exceptional. The Great Rift Valley views alone were worth the trip!", rating: 5, tour: "4-Day Mara & Nakuru Safari" },
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md border">
                <div className="flex mb-3">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
                <p className="text-xs text-green-600 mt-1">Booked: {review.tour}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know before booking your Masai Mara safari</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "When is the best time for a budget Masai Mara safari?", a: "July to October offers the famous Great Migration with dramatic river crossings where crocodiles wait for wildebeest. However, excellent wildlife viewing happens year-round with lower prices from November to June. January-February is prime for predator action with shorter grass making animals easier to spot." },
              { q: "What is the Great Migration?", a: "The Great Migration is the annual movement of 1.5+ million wildebeest plus 300,000 zebra and 150,000 gazelle from Tanzania's Serengeti to Kenya's Masai Mara and back. It's the largest remaining overland migration on Earth, with dramatic Mara River crossings where Nile crocodiles lie in wait for crossing wildebeest." },
              { q: "What wildlife will I see in Masai Mara?", a: "Masai Mara is famous for the Big Five (lion, leopard, elephant, buffalo, rhino), plus cheetahs, hyenas, giraffes, zebras, hippos, and 450+ bird species. July-October adds millions of wildebeest and zebra during the migration. The Mara River hosts hippos and crocodiles." },
              { q: "Are budget safaris in Masai Mara safe?", a: "Yes. We use licensed operators, professional guides, and well-maintained 4x4 vehicles. Our tented camps are secure with security guards. Safari safety is our top priority — we've safely conducted 1000+ group safaris with zero major incidents." },
              { q: "What is the difference between budget and luxury Masai Mara safaris?", a: "Budget safaris use comfortable tented camps instead of luxury lodges, shared vehicles (4-12 people) instead of private, and standardized meal plans. The wildlife viewing experience is identical — same parks, same game drives, same professional guides." },
              { q: "How do I get to Masai Mara from Nairobi?", a: "We provide pick-up from Nairobi hotels/airports at 7:00 AM. The drive takes 5-6 hours through the scenic Great Rift Valley. All transport in air-conditioned 4x4 Land Cruisers is included in your package." },
              { q: "How many days do I need for Masai Mara?", a: "We recommend a minimum of 3 days to cover the main attractions. A 4-5 day safari allows you to explore different regions of the reserve and increases your chances of seeing the Big Five. Our 7+ day packages combine Masai Mara with Lake Nakuru and other parks." },
              { q: "What makes Masai Mara different from Serengeti?", a: "While the Serengeti and Masai Mara form one continuous ecosystem, Masai Mara has several advantages: better predator density (especially cheetahs), the Mara River with its dramatic crossings, and a more intimate scale that creates better wildlife viewing opportunities." },
              { q: "Can I see the Great Migration from a budget safari?", a: "Absolutely. Our budget safari packages are timed to coincide with peak migration season (July-October). You'll witness thousands of wildebeest crossing the Mara River, predator action following the herds, and the incredible spectacle of millions of animals on the move." },
              { q: "What should I pack for a Masai Mara safari?", a: "Pack light neutral-colored clothing (khaki, brown, green — avoid white and bright colors), a light jacket for early morning game drives, binoculars, a camera with zoom lens (200-400mm recommended for wildlife), sunscreen SPF 50+, a wide-brimmed hat, and comfortable closed walking shoes. Avoid bright colors that may disturb wildlife." },
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition">{faq.q}</summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold">Ready for Your Masai Mara Safari Adventure?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
            Join {TOTAL_REV}+ happy travelers who&apos;ve discovered the magic of Masai Mara with JaeTravel Expeditions.
            From ${TOURS_MIN} per person — all-inclusive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-10 py-7 font-semibold" asChild>
              <Link href="/contact">Book Your Safari Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-10 py-7" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <span className="flex items-center gap-2"><Phone size={16} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={16} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Responds within 2 hours</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> Free cancellation 48h before</span>
          </div>
        </div>
      </section>

      {/* BOTTOM LINKS */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Explore more Kenya safari options</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/budget-tours">All Budget Safaris</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/budget-lake-nakuru-safari">Lake Nakuru Safaris</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/cheap-amboseli-tours">Amboseli Safaris</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/group-joining-safaris-kenya">Group Joining Safaris</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}