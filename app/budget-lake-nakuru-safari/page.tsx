// app/budget-lake-nakuru-safari/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, DollarSign, Users, Shield, Phone, Star, Clock, Award, Mail, Calendar, MapPin, Mountain, Sun, Droplets, Thermometer, Info, binoculars, Camera } from "lucide-react";
import { budgetTours } from "@/lib/budget-tours-data";
import { BASE_URL } from "@/lib/i18n/config";

const TOURS = budgetTours.filter((t) => t.slug.toLowerCase().includes("nakuru"));
const TOURS_MIN = TOURS.length > 0 ? Math.min(...TOURS.map((t) => t.price)) : 610;
const TOURS_MAX = TOURS.length > 0 ? Math.max(...TOURS.map((t) => t.price)) : 840;
const TOURS_AVG = TOURS.length > 0 ? (TOURS.reduce((s, t) => s + t.rating, 0) / TOURS.length).toFixed(1) : "4.8";
const TOTAL_REV = TOURS.reduce((s, t) => s + t.reviewCount, 0);

const ABSOLUTE_URL = `${BASE_URL}/budget-lake-nakuru-safari`;
const HERO_IMG = `${BASE_URL}/lake-nakuru-flamingos-in-red-sunset-590x390.jpg`;

export const metadata: Metadata = {
  title: "Budget Lake Nakuru Safari 2026 | Flamingo Tours from $610",
  description: "Lake Nakuru safari tours from $610. Flamingos, black/white rhinos, Big Five. Book your 2026 trip.",
  keywords: "budget Lake Nakuru safari, cheap Lake Nakuru tours 2026, affordable Lake Nakuru flamingo tours, Lake Nakuru National Park budget safari, Lake Nakuru rhino tours, flamingo safari Kenya, budget Nakuru Kenya tours, Lake Nakuru affordable packages, Nakuru National Park budget, Kenya flamingo tours from $610",
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  alternates: { canonical: ABSOLUTE_URL, languages: { en: ABSOLUTE_URL, "x-default": ABSOLUTE_URL } },
  openGraph: {
    title: "Budget Lake Nakuru Safari 2026 | Flamingo Tours from $610",
    description: "Lake Nakuru safari tours from $610. Flamingos, black/white rhinos, Big Five. Book your 2026 trip.",
    url: ABSOLUTE_URL, siteName: "JaeTravel Expeditions",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Budget Lake Nakuru Safari Kenya 2026", type: "image/jpeg" }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Lake Nakuru Safari 2026 | Flamingo Tours from $610",
    description: "Lake Nakuru safari tours from $610. Flamingos, black/white rhinos, Big Five. Book your 2026 trip.",
    images: [HERO_IMG], site: "@jaetravel", creator: "@jaetravel",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", url: ABSOLUTE_URL, name: "Budget Lake Nakuru Safari Kenya 2026", description: "Lake Nakuru safari tours from $610. Flamingos, black/white rhinos, Big Five. Book your 2026 trip.", primaryImageOfPage: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 } },
    { "@type": "TouristAttraction", name: "Lake Nakuru National Park", description: "Lake Nakuru National Park is a UNESCO Ramsar site famous for its millions of flamingos creating pink shorelines, successful rhino conservation, and Rothschild giraffe sanctuary.", image: HERO_IMG, address: { "@type": "PostalAddress", addressLocality: "Lake Nakuru", addressRegion: "Kenya", addressCountry: "KE" }, geo: { "@type": "GeoCoordinates", latitude: -0.3637, longitude: 36.082 } },
    { "@type": "Product", name: "Budget Lake Nakuru Safari Kenya 2026", description: "Lake Nakuru safari tours from $610. Flamingos, black/white rhinos, Big Five.", url: ABSOLUTE_URL, image: HERO_IMG, brand: { "@type": "Brand", name: "JaeTravel Expeditions" }, offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: TOURS_MIN.toString(), highPrice: TOURS_MAX.toString(), offerCount: TOURS.length.toString(), availability: "https://schema.org/InStock", priceValidUntil: "2026-12-31" }, aggregateRating: { "@type": "AggregateRating", ratingValue: TOURS_AVG, reviewCount: TOTAL_REV.toString(), bestRating: "5" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Why are there so many flamingos at Lake Nakuru?", acceptedAnswer: { "@type": "Answer", text: "Lake Nakuru's alkaline (high pH) waters support dense populations of blue-green algae (spirulina) that flamingos feed on. This makes it one of the most important flamingo breeding grounds in Africa, sometimes hosting over 2 million birds creating a stunning pink shoreline visible from miles away." } },
      { "@type": "Question", name: "How likely am I to see rhinos at Lake Nakuru?", acceptedAnswer: { "@type": "Answer", text: "Very likely! Lake Nakuru has one of Kenya's most successful rhino conservation programs with a protected sanctuary inside the park. Both black and white rhinos thrive here — our guides have excellent sighting records with success rates over 90%." } },
      { "@type": "Question", name: "What wildlife will I see at Lake Nakuru?", acceptedAnswer: { "@type": "Answer", text: "Beyond flamingos and rhinos, you'll find lions, leopards, Rothschild giraffes (endemic to Kenya), buffaloes, baboons, colobus monkeys, hippos, and over 450 bird species including pelicans, cormorants, African fish eagles, and kingfishers." } },
      { "@type": "Question", name: "How far is Lake Nakuru from Nairobi?", acceptedAnswer: { "@type": "Answer", text: "Lake Nakuru is approximately 160km (about 2-3 hours drive) from Nairobi, making it one of the most accessible major wildlife destinations from the capital. The scenic route passes through the Great Rift Valley with stunning views." } },
      { "@type": "Question", name: "Should I combine Lake Nakuru with Masai Mara?", acceptedAnswer: { "@type": "Answer", text: "Absolutely — our most popular packages combine both. Lake Nakuru offers different wildlife (rhinos, birds, Rothschild giraffes) and ecosystems compared to Masai Mara, making them perfectly complementary destinations for a complete Kenyan experience." } },
      { "@type": "Question", name: "What is the best time to see flamingos at Lake Nakuru?", acceptedAnswer: { "@type": "Answer", text: "Peak flamingo viewing is September to March when water levels are ideal for algae growth. However, significant flamingo populations are present year-round. The lake's color changes from pink to white depending on flamingo density." } },
      { "@type": "Question", name: "What makes Lake Nakuru a Ramsar site?", acceptedAnswer: { "@type": "Answer", text: "Lake Nakuru is a UNESCO Ramsar site (wetland of international importance) due to its ecological significance. The alkaline lake supports millions of lesser and greater flamingos, serves as a critical refuge for both rhino species, and hosts over 450 bird species." } },
      { "@type": "Question", name: "Are there lions and leopards in Lake Nakuru?", acceptedAnswer: { "@type": "Answer", text: "Yes. While Lake Nakuru is famous for rhinos and birds, it also has healthy lion and leopard populations. Lions are regularly spotted near the rhino sanctuary boundaries, and leopards inhabit the rocky outcrops and riverine forests." } },
      { "@type": "Question", name: "What is unique about the Rothschild giraffes at Lake Nakuru?", acceptedAnswer: { "@type": "Answer", text: "Lake Nakuru is home to a Rothschild giraffe sanctuary where these endangered giraffes (one of Kenya's rarest subspecies) are protected. Unlike other giraffe subspecies, Rothschild's giraffes have darker leg patterns without markings below the hocks." } },
      { "@type": "Question", name: "Is Lake Nakuru suitable for bird photography?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Lake Nakuru is a bird photographer's paradise with millions of flamingos creating pink carpets, over 450 species including rare African fish eagles, pelicans, kingfishers, and steppe eagles. The Rift Valley backdrop adds dramatic scenery to wildlife photographs." } },
    ]},
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Budget Tours", item: `${BASE_URL}/budget-tours` },
      { "@type": "ListItem", position: 3, name: "Lake Nakuru Safari", item: ABSOLUTE_URL }
    ]},
    { "@type": "Organization", name: "JaeTravel Expeditions", url: BASE_URL, telephone: "+254726485228", email: "info@jaetravel.co.ke" },
  ],
};

export default function BudgetLakeNakuruSafariPage() {
  return (
    <div className="pb-16" dir="ltr">
      <Script id="budget-lake-nakuru-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/lake-nakuru-flamingos-in-red-sunset-590x390.jpg" alt="Budget Lake Nakuru Safari Kenya 2026" fill className="object-cover brightness-50" priority sizes="100vw" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Rated {TOURS_AVG}/5 by {TOTAL_REV}+ Happy Safari Travelers</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Budget Lake Nakuru Safari 2026 <span className="text-amber-400">— From ${TOURS_MIN}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Wade through seas of pink flamingos, track endangered rhinos, and experience the unique beauty of Kenya&apos;s most accessible Rift Valley lake — all on a budget that won&apos;t break the bank.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
            <Button asChild size="lg" className="min-w-[240px] text-lg bg-green-600 hover:bg-green-700 font-semibold">
              <Link href="#tours">View {TOURS.length} Safari Packages</Link>
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
            <div><div className="text-2xl font-bold">{TOURS.length}</div><div className="opacity-80">Safari Packages</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">${TOURS_MIN}</div><div className="opacity-80">Starting From</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">160km</div><div className="opacity-80">From Nairobi</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{TOURS_AVG}★</div><div className="opacity-80">Average Rating</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{TOTAL_REV}+</div><div className="opacity-80">Happy Travelers</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">2-3h</div><div className="opacity-80">Drive Time</div></div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-5xl font-bold tracking-tight">
              Stunning Lake Nakuru Budget Safaris 2026
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Lake Nakuru National Park is a bird lover&apos;s paradise and rhino conservation success story — all within easy reach of Nairobi. Our budget Lake Nakuru safaris from <strong>${TOURS_MIN}</strong> let you witness millions of flamingos creating pink shorelines, track both black and white rhinos, and enjoy excellent predator sightings.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              This compact 188 km² UNESCO Ramsar site sits in the Great Rift Valley and offers some of the best wildlife viewing in Kenya. The park is also famous for its Rothschild giraffe sanctuary — one of the few places you can reliably see this endangered subspecies.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              Combine your Lake Nakuru safari with Masai Mara, Amboseli, or Naivasha for a diverse wildlife experience. Whether you&apos;re interested in bird photography, rhino conservation, or simply experiencing Kenya&apos;s natural beauty, Lake Nakuru delivers unforgettable moments at prices that make sense.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              <Link href="#tours">Browse Safari Packages</Link>
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
              { icon: <MapPin className="h-6 w-6" />, label: "Location", value: "160km northwest of Nairobi, Kenya" },
              { icon: <Mountain className="h-6 w-6" />, label: "Altitude", value: "1,754m above sea level (Rift Valley)" },
              { icon: <binoculars className="h-6 w-6" />, label: "Flamingos", value: "Up to 2 million at peak season" },
              { icon: <Info className="h-6 w-6" />, label: "Designation", value: "UNESCO Ramsar Wetland Site" },
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
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">Why Travelers Choose JaeTravel for Lake Nakuru</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <DollarSign className="h-8 w-8" />, title: "Best Price Guarantee", desc: `Starting from $${TOURS_MIN} per person with all-inclusive packages. No hidden costs or surprises.` },
              { icon: <Users className="h-8 w-8" />, title: "Rhino Hotspot", desc: "One of Kenya's most successful rhino sanctuaries with excellent sighting rates (90%+)." },
              { icon: <Star className="h-8 w-8" />, title: "Flamingo Spectacle", desc: "Millions of flamingos creating pink shorelines visible from miles away." },
              { icon: <Shield className="h-8 w-8" />, title: "Easy Access", desc: "Only 2-3 hours from Nairobi — perfect for combining with other parks." },
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
            <h2 className="mb-6 font-serif text-4xl font-bold">Wildlife at Lake Nakuru: What You&apos;ll See</h2>
            <p className="text-lg text-muted-foreground">
              Lake Nakuru&apos;s varied ecosystems — from alkaline lake to rocky hillsides to riverine forests — support an incredible diversity of wildlife. The park&apos;s rhino sanctuary has made it one of Kenya&apos;s most important conservation success stories.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Flamingos", emoji: "🦩", desc: "Lake Nakuru hosts up to 2 million lesser flamingos — one of the largest gatherings on Earth. Their pink-white carpet along the shoreline is a photographer's dream, especially at sunset when the lake turns crimson." },
              { title: "Black & White Rhinos", emoji: "🦏", desc: "Both rhino species thrive in Lake Nakuru's protected sanctuary. White rhinos graze openly on the plains while black rhinos prefer denser bush. Anti-poaching units ensure their safety." },
              { title: "Rothschild Giraffes", emoji: "🦒", desc: "Lake Nakuru has one of the few Rothschild giraffe sanctuaries in Kenya. This endangered subspecies is identifiable by its darker leg patterns — no markings below the hocks." },
              { title: "Lions & Leopards", emoji: "🦁", desc: "Lions are regularly spotted near the rhino sanctuary boundaries. Leopards inhabit the rocky outcrops and riverine forests. The varied terrain supports healthy predator populations." },
              { title: "Birds of Prey", emoji: "🦅", desc: "Over 450 bird species including African fish eagles, steppe eagles, pelicans, cormorants, kingfishers, and the African skimmer. The lake is a bird photographer's paradise." },
              { title: "Baboons & Colobus", emoji: "🐒", desc: "Yellow baboons and black-and-white colobus monkeys are commonly seen. The colobus monkeys are particularly photogenic against the Rift Valley backdrop and forest settings." },
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
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">Best Time to Visit Lake Nakuru</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { season: "September – March", label: "Peak Flamingo Season", color: "border-green-500", icon: <Sun className="h-8 w-8 text-green-600" />, desc: "Best flamingo viewing as water levels create ideal conditions for blue-green algae growth. The lake appears most pink. Excellent wildlife viewing overall with animals congregating near water sources.", temp: "18-28°C" },
              { season: "April – May", label: "Green Season", color: "border-blue-500", icon: <Droplets className="h-8 w-8 text-blue-500" />, desc: "Fewer tourists, lower prices, and the landscape is lush and green. Some roads may be muddy. Bird activity increases with migratory species. Not recommended for serious wildlife viewing.", temp: "16-25°C" },
              { season: "June – August", label: "Dry Season", color: "border-amber-500", icon: <Thermometer className="h-8 w-8 text-amber-500" />, desc: "Animals concentrate around remaining water sources making sightings easier. Good time for rhinos and predators. Flamingo numbers may vary based on water levels.", temp: "15-27°C" },
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
              <Info className="inline h-4 w-4 mr-1" /> Tip: Visit during sunset for the most dramatic flamingo photographs — the lake reflects crimson colors and millions of birds take flight simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* FLAMINGO PARADISE SECTION */}
      <section className="py-16 bg-gradient-to-r from-pink-700 to-rose-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold">
                Flamingo Paradise: Lake Nakuru&apos;s Pink Wonder
              </h2>
              <p className="text-lg leading-relaxed text-white/80 mb-4">
                Lake Nakuru&apos;s alkaline (high pH) waters support dense populations of spirulina — a blue-green algae that flamingos feed on. This makes the lake one of the most important flamingo breeding grounds in Africa.
              </p>
              <p className="text-lg leading-relaxed text-white/80 mb-6">
                At peak season, over 2 million lesser flamingos create a stunning pink shoreline and fill the air with their distinctive calls. The sight of thousands taking flight in unison — their pink wings creating a living curtain against the Rift Valley backdrop — is genuinely unforgettable.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">2M+</div>
                  <div className="text-sm text-white/70">Flamingos at peak</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">450+</div>
                  <div className="text-sm text-white/70">Bird species</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">UNESCO</div>
                  <div className="text-sm text-white/70">Ramsar site designation</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">Sep-Mar</div>
                  <div className="text-sm text-white/70">Peak flamingo season</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image src="/lake-nakuru-flamingos-in-red-sunset-590x390.jpg" alt="Flamingos at Lake Nakuru" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* TOURS GRID */}
      <section id="tours" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">Lake Nakuru Safari Packages 2026</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Our Lake Nakuru budget safaris combine this stunning Rift Valley lake with other iconic Kenya destinations. All packages include transport, accommodation, meals, park fees, and professional guides.
            </p>
          </div>
          {TOURS.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {TOURS.map((tour) => (
                <div key={tour.id} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={tour.image.startsWith("/") ? tour.image : `/${tour.image}`} alt={tour.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    {tour.originalPrice && tour.originalPrice > tour.price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Special Offer</div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Lake Nakuru
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
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Combined safari packages featuring Lake Nakuru are available. Contact us for custom itineraries.</p>
              <Button asChild className="mt-6 bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Ask About Custom Packages</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* RELATED DESTINATIONS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Combine Lake Nakuru with Other Destinations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Masai Mara + Lake Nakuru", desc: "Kenya's ultimate combo — flamingos and rhinos at Nakuru, Big Five and migration in the Mara.", img: "/masai-mara-safari.jpg", href: "/budget-masai-mara-safari" },
              { title: "Amboseli + Lake Nakuru", desc: "Elephants with Kilimanjaro backdrop and flamingos at Lake Nakuru. Perfect photographer's combo.", img: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg", href: "/cheap-amboseli-tours" },
              { title: "Naivasha + Lake Nakuru", desc: "Boat ride on Naivasha, hippos, and the flamingo spectacle at Nakuru. Great 3-4 day mix.", img: "/fantasticafrica-20240806-0001.jpg", href: "/budget-tours" },
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
                {["International flights and Kenya visa fees ($51 for e-visa)", "Travel insurance (strongly recommended — from $30)", "Tips for guide and camp staff ($10-20/day suggested)", "Alcoholic beverages and soft drinks", "Personal expenses and souvenirs", "Optional activities (boat safari at Naivasha $30, village visits $25-30)", "Single room supplement ($80-150 depending on package)", "Yellow fever vaccination certificate (if arriving from endemic area)"].map((item, i) => (
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
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Packing Checklist for Lake Nakuru</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Clothing", items: ["Neutral-colored long sleeves (khaki, brown, green)", "Light trousers and shorts", "Light jacket for early morning game drives", "Wide-brimmed sun hat", "Comfortable closed walking shoes"], icon: "👕" },
              { title: "Gear & Accessories", items: ["Binoculars (10x42 recommended)", "Camera with 200-400mm zoom lens for wildlife", "Telephoto lens for flamingo shots", "Sunscreen SPF 50+", "Dust-resistant bag for electronics"], icon: "📷" },
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
          <p className="text-center text-muted-foreground mb-12">Real reviews from travelers who experienced Lake Nakuru with JaeTravel</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rachel Green", location: "Sydney, Australia", text: "The flamingo spectacle at Lake Nakuru was beyond description — the entire shoreline was pink! And we saw 6 rhinos in one morning. Incredible value for money.", rating: 5, tour: "4-Day Masai Mara & Nakuru Safari" },
              { name: "Tom Baker", location: "Manchester, UK", text: "Perfect combination of lake and savannah ecosystems. The bird watching was exceptional, and the rhino sanctuary delivered exactly what we hoped for.", rating: 5, tour: "5-Day Mara Nakuru Naivasha Safari" },
              { name: "Yuki Tanaka", location: "Tokyo, Japan", text: "Lake Nakuru's flamingos and rhinos were the highlight of my Kenya trip. The budget package was excellent value and so well organized.", rating: 5, tour: "4-Day Masai Mara & Nakuru Safari" },
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
            <p className="text-muted-foreground">Everything you need to know before booking your Lake Nakuru safari</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "Why are there so many flamingos at Lake Nakuru?", a: "Lake Nakuru's alkaline (high pH) waters support dense populations of blue-green algae (spirulina) that flamingos feed on. This makes it one of the most important flamingo breeding grounds in Africa, sometimes hosting over 2 million birds creating a stunning pink shoreline visible from miles away." },
              { q: "How likely am I to see rhinos at Lake Nakuru?", a: "Very likely! Lake Nakuru has one of Kenya's most successful rhino conservation programs with a protected sanctuary inside the park. Both black and white rhinos thrive here — our guides have excellent sighting records with success rates over 90%." },
              { q: "What wildlife will I see at Lake Nakuru?", a: "Beyond flamingos and rhinos, you'll find lions, leopards, Rothschild giraffes (endemic to Kenya), buffaloes, baboons, colobus monkeys, hippos, and over 450 bird species including pelicans, cormorants, African fish eagles, and kingfishers." },
              { q: "How far is Lake Nakuru from Nairobi?", a: "Lake Nakuru is approximately 160km (about 2-3 hours drive) from Nairobi, making it one of the most accessible major wildlife destinations from the capital. The scenic route passes through the Great Rift Valley with stunning views." },
              { q: "Should I combine Lake Nakuru with Masai Mara?", a: "Absolutely — our most popular packages combine both. Lake Nakuru offers different wildlife (rhinos, birds, Rothschild giraffes) and ecosystems compared to Masai Mara, making them perfectly complementary destinations for a complete Kenyan experience." },
              { q: "What is the best time to see flamingos at Lake Nakuru?", a: "Peak flamingo viewing is September to March when water levels are ideal for algae growth. However, significant flamingo populations are present year-round. The lake's color changes from pink to white depending on flamingo density." },
              { q: "What makes Lake Nakuru a Ramsar site?", a: "Lake Nakuru is a UNESCO Ramsar site (wetland of international importance) due to its ecological significance. The alkaline lake supports millions of lesser and greater flamingos, serves as a critical refuge for both rhino species, and hosts over 450 bird species." },
              { q: "Are there lions and leopards in Lake Nakuru?", a: "Yes. While Lake Nakuru is famous for rhinos and birds, it also has healthy lion and leopard populations. Lions are regularly spotted near the rhino sanctuary boundaries, and leopards inhabit the rocky outcrops and riverine forests. The park's varied terrain supports diverse predators." },
              { q: "What is unique about the Rothschild giraffes at Lake Nakuru?", a: "Lake Nakuru is home to a Rothschild giraffe sanctuary where these endangered giraffes (one of Kenya's rarest subspecies) are protected. Unlike other giraffe subspecies, Rothschild's giraffes have darker leg patterns without markings below the hocks. You can often see them grazing near the park's acacia woodlands." },
              { q: "Is Lake Nakuru suitable for bird photography?", a: "Absolutely. Lake Nakuru is a bird photographer's paradise with millions of flamingos creating pink carpets, over 450 species including rare African fish eagles, pelicans, kingfishers, and steppe eagles. The Rift Valley backdrop adds dramatic scenery to wildlife photographs." },
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
          <h2 className="mb-6 font-serif text-5xl font-bold">Ready for Your Lake Nakuru Safari Adventure?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
            Watch millions of flamingos and track endangered rhinos. From ${TOURS_MIN} per person — all-inclusive.
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
              <Link href="/budget-masai-mara-safari">Masai Mara Safaris</Link>
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