// app/cheap-amboseli-tours/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, DollarSign, Users, Shield, Phone, Star, Clock, Award, Mail, Calendar, MapPin, binoculars, Mountain, Sun, Droplets, Thermometer, Info } from "lucide-react";
import { budgetTours } from "@/lib/budget-tours-data";
import { BASE_URL } from "@/lib/i18n/config";

const TOURS = budgetTours.filter((t) => t.slug.toLowerCase().includes("amboseli"));
const TOURS_MIN = TOURS.length > 0 ? Math.min(...TOURS.map((t) => t.price)) : 750;
const TOURS_MAX = TOURS.length > 0 ? Math.max(...TOURS.map((t) => t.price)) : 1290;
const TOURS_AVG = TOURS.length > 0 ? (TOURS.reduce((s, t) => s + t.rating, 0) / TOURS.length).toFixed(1) : "4.8";
const TOTAL_REV = TOURS.reduce((s, t) => s + t.reviewCount, 0);

const ABSOLUTE_URL = `${BASE_URL}/cheap-amboseli-tours`;
const HERO_IMG = `${BASE_URL}/amboseli_elephants_at_sun_set-2__1200w.jpg`;
const HERO_IMG_FALLBACK = `${BASE_URL}/fantasticafrica-20240806-0001.jpg`;

export const metadata: Metadata = {
  title: "Cheap Amboseli Tours 2026 | Budget Safaris from $750 | JaeTravel",
  description: "Book affordable Amboseli budget tours 2026 from $750. Watch elephants with Mt. Kilimanjaro backdrop, spot Big Five, flamingos at Lake Amboseli. All-inclusive group safaris from Nairobi. Free cancellation up to 48h before.",
  keywords: "cheap Amboseli tours, budget Amboseli safari 2026, affordable Amboseli tours from $750, Amboseli National Park tours, cheap Amboseli Kenya safari, Amboseli budget packages, Kilimanjaro views safari, Amboseli elephant tours, budget Kenya tours with Kilimanjaro, cheap Amboseli game drives, budget Kenya wildlife tours, Amboseli affordable tours, Amboseli from Nairobi, cheapest Amboseli safari, Amboseli tour prices, budget safari to Amboseli, Amboseli 2 day tour, Amboseli 3 day tour, Amboseli 5 day tour, Kenya safari deals, cheap Kenya safaris 2026",
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  alternates: {
    canonical: ABSOLUTE_URL,
    languages: { en: ABSOLUTE_URL, "x-default": ABSOLUTE_URL },
  },
  openGraph: {
    title: "Cheap Amboseli Tours 2026 | Budget Safaris from $750",
    description: "Book affordable Amboseli budget tours 2026 from $750. Watch elephants with Mt. Kilimanjaro backdrop, Big Five, flamingos. All-inclusive group safaris from Nairobi.",
    url: ABSOLUTE_URL, siteName: "JaeTravel Expeditions",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cheap Amboseli Tours Kenya 2026 with Kilimanjaro backdrop", type: "image/jpeg" }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheap Amboseli Tours 2026 | Budget Safaris from $750",
    description: "Book affordable Amboseli budget tours 2026 from $750. Watch elephants with Mt. Kilimanjaro backdrop, Big Five, flamingos.",
    images: [HERO_IMG], site: "@jaetravel", creator: "@jaetravel",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${ABSOLUTE_URL}#webpage`, url: ABSOLUTE_URL, name: "Cheap Amboseli Tours Kenya 2026", description: "Book affordable Amboseli budget tours 2026 from $750. Watch elephants with Mt. Kilimanjaro backdrop, spot Big Five, enjoy flamingos at Lake Amboseli.", isPartOf: { "@type": "WebSite", "@id": `${BASE_URL}/#website`, name: "JaeTravel Expeditions", url: BASE_URL }, primaryImageOfPage: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 } },
    { "@type": "Product", name: "Cheap Amboseli Tours Kenya 2026", description: "Affordable Amboseli budget tours from $750 with Kilimanjaro views, elephant herds, Big Five sightings. All-inclusive shared group safaris from Nairobi.", url: ABSOLUTE_URL, image: HERO_IMG, brand: { "@type": "Brand", name: "JaeTravel Expeditions" }, offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: TOURS_MIN.toString(), highPrice: TOURS_MAX.toString(), offerCount: TOURS.length.toString(), availability: "https://schema.org/InStock", priceValidUntil: "2026-12-31" }, aggregateRating: { "@type": "AggregateRating", ratingValue: TOURS_AVG, reviewCount: TOTAL_REV.toString(), bestRating: "5" } },
    { "@type": "TouristAttraction", "@id": `${BASE_URL}/destinations/amboseli#attraction`, name: "Amboseli National Park", description: "Amboseli National Park is Kenya's second-most popular park, famous for large elephant herds with Kilimanjaro backdrop, predator sightings, and 400+ bird species.", image: HERO_IMG, address: { "@type": "PostalAddress", addressLocality: "Amboseli", addressRegion: "Kenya", addressCountry: "KE" }, geo: { "@type": "GeoCoordinates", latitude: -2.2864, longitude: 37.2236 }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "847" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How much does an Amboseli tour cost from Nairobi?", acceptedAnswer: { "@type": "Answer", text: "Our cheapest Amboseli tours start from $750 per person for a 2-day budget safari. Multi-day packages (3-6 days) combining Amboseli with Masai Mara, Lake Nakuru, or Naivasha range from $850-$1,290. All packages include transport, park fees, accommodation, meals, and a professional guide." } },
      { "@type": "Question", name: "How far is Amboseli from Nairobi?", acceptedAnswer: { "@type": "Answer", text: "Amboseli National Park is approximately 240 km (150 miles) southeast of Nairobi, about a 4-5 hour drive. The scenic route passes through the Athi River plains and the Machakos Hills, offering beautiful views of the Great Rift Valley." } },
      { "@type": "Question", name: "What makes Amboseli famous for elephant viewing?", acceptedAnswer: { "@type": "Answer", text: "Amboseli has one of the highest concentrations of elephants in Africa, with herds of 50-100 individuals regularly seen. The long-term research by the Amboseli Elephant Research Project — the world's longest-running study of wild elephants — has documented families over multiple generations. Large 'tuskers' (elephants with massive tusks) are a particular highlight." } },
      { "@type": "Question", name: "Can you see Mt. Kilimanjaro from Amboseli?", acceptedAnswer: { "@type": "Answer", text: "Yes — Mt. Kilimanjaro (5,895m / 19,341 ft), the world's highest freestanding mountain, is visible from Amboseli on clear mornings. The snow-capped peak provides a breathtaking backdrop for wildlife photography. The best viewing is typically early morning (6-9 AM) during the dry season (June-October). Kilimanjaro is in Tanzania but its southern glaciers are visible from Kenya's Amboseli." } },
      { "@type": "Question", name: "What wildlife will I see in Amboseli?", acceptedAnswer: { "@type": "Answer", text: "Elephants (especially large herds), lions (high density), cheetahs, giraffes, zebras, wildebeest, hippos, buffaloes, wildebeest, gazelles, and 400+ bird species including pelicans, kingfishers, African fish eagles, and Greater flamingos at Lake Amboseli. Crocodiles inhabit the swamps and Lake Amboseli." } },
      { "@type": "Question", name: "What is the best time to visit Amboseli?", acceptedAnswer: { "@type": "Answer", text: "The best time for wildlife viewing in Amboseli is during the dry season (June-October) when animals congregate around water sources. This is also when Kilimanjaro is most visible. The green season (November-March) offers lower prices, fewer crowds, and excellent birding with migratory species. The long rains (April-May) can make some roads impassable." } },
      { "@type": "Question", name: "Is $750 a good price for an Amboseli safari?", acceptedAnswer: { "@type": "Answer", text: "Yes — our budget Amboseli tours from $750 represent exceptional value. Packages include shared 4x4 Land Cruiser transport from Nairobi, park entry fees ($60/day for adults), comfortable tented camp accommodation, all meals, and professional safari guiding. Compare to solo park fees of $120 for 2 days — our all-inclusive approach saves you money while ensuring a hassle-free experience." } },
      { "@type": "Question", name: "What should I pack for an Amboseli safari?", acceptedAnswer: { "@type": "Answer", text: "Pack light neutral-colored clothing (khaki, brown, green), a light jacket for early morning game drives, binoculars, a camera with zoom lens (70-200mm recommended for wildlife), sunscreen (SPF 50+), a wide-brimmed hat, comfortable closed shoes, and any personal medications. Avoid bright colors and white clothing. A small daypack and a scarf for dust are also useful." } },
      { "@type": "Question", name: "Can I combine Amboseli with Masai Mara?", acceptedAnswer: { "@type": "Answer", text: "Absolutely — our most popular packages combine Amboseli with Masai Mara, Lake Nakuru, and Lake Naivasha. These multi-park safaris offer the complete Kenyan wildlife experience, from Kilimanjaro-backed elephants in Amboseli to the Big Five in Masai Mara and flamingos at Lake Nakuru. Ask about our 5-day and 6-day combination packages starting from $940 per person." } },
      { "@type": "Question", name: "What is unique about Amboseli's ecosystem?", acceptedAnswer: { "@type": "Answer", text: "Amboseli sits in a dried lake bed (Lake Amboseli) with five distinct habitats: the arid plains, the swamp-fed wetlands, the acacia woodlands, the rolling golden grass hills (Observatory Hill), and the lake itself. This diversity supports exceptional wildlife density. The park is also part of the broader Amboseli ecosystem that includes the Kimana Conservation Trust and Maasai community lands." } },
    ]},
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Budget Tours", item: `${BASE_URL}/budget-tours` },
      { "@type": "ListItem", position: 3, name: "Cheap Amboseli Tours", item: ABSOLUTE_URL }
    ]},
    { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "JaeTravel Expeditions", url: BASE_URL, telephone: "+254726485228", email: "info@jaetravel.co.ke", aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", reviewCount: TOTAL_REV.toString() } },
  ],
};

export default function CheapAmboseliToursPage() {
  return (
    <div className="pb-16" dir="ltr">
      <Script id="cheap-amboseli-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/amboseli_elephants_at_sun_set-2__1200w.jpg" alt="Cheap Amboseli Tours Kenya 2026 with Kilimanjaro backdrop" fill className="object-cover brightness-50" priority sizes="100vw" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Rated {TOURS_AVG}/5 by {TOTAL_REV}+ Happy Safari Travelers</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Cheap Amboseli Tours 2026 <span className="text-amber-400">— From ${TOURS_MIN}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Frame wildlife shots against Africa&apos;s highest peak. Budget Amboseli safaris from ${TOURS_MIN} per person — elephant herds, Big Five, and the iconic Kilimanjaro backdrop. All-inclusive from Nairobi.
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
            <div><div className="text-2xl font-bold">240km</div><div className="opacity-80">From Nairobi</div></div>
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
              Affordable Amboseli Tours with Mt. Kilimanjaro Views
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Amboseli National Park offers one of the most photographed safari experiences in Africa — majestic elephants roaming against the snow-capped peak of Mt. Kilimanjaro (5,895m), the world&apos;s highest freestanding mountain. Our budget Amboseli tours make this iconic experience accessible from just <strong>${TOURS_MIN} per person</strong>.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Known for having some of the <strong>largest elephant herds in Africa</strong>, excellent predator sightings (including high lion density and cheetah encounters), and 400+ bird species, Amboseli delivers world-class wildlife viewing with the added bonus of breathtaking mountain scenery. The park spans 392 km² and sits at an altitude of 1,200m, with the characteristic flat terrain of a dried lake bed punctuated by wetlands, acacia woodlands, and golden savannah.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              Combine your Amboseli budget safari with Masai Mara, Lake Nakuru, or Lake Naivasha for the ultimate East African adventure. Our most popular packages let you experience multiple iconic destinations at an unbeatable price.
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
              { icon: <MapPin className="h-6 w-6" />, label: "Location", value: "240km southeast of Nairobi, Kenya" },
              { icon: <Mountain className="h-6 w-6" />, label: "Altitude", value: "1,200m above sea level" },
              { icon: <Users className="h-6 w-6" />, label: "Elephant Herds", value: "Up to 100 per family group" },
              { icon: <binoculars className="h-6 w-6" />, label: "Bird Species", value: "400+ including flamingos" },
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
            Why Travelers Choose JaeTravel for Their Amboseli Safari
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <DollarSign className="h-8 w-8" />, title: "Best Price Guarantee", desc: `Budget Amboseli tours from $${TOURS_MIN} per person with all-inclusive packages. No hidden costs or surprise fees.` },
              { icon: <Users className="h-8 w-8" />, title: "Elephant Paradise", desc: "Home to some of Africa's largest elephant herds with the world's most iconic Kilimanjaro backdrop." },
              { icon: <Star className="h-8 w-8" />, title: "Big Five Viewing", desc: "High lion density, cheetah sightings, buffaloes, and excellent predator action in open terrain." },
              { icon: <Shield className="h-8 w-8" />, title: "Easy Access", desc: "Only 4-5 hours from Nairobi via scenic Great Rift Valley route. Well-maintained roads." },
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
            <h2 className="mb-6 font-serif text-4xl font-bold">Wildlife in Amboseli: What You&apos;ll See</h2>
            <p className="text-lg text-muted-foreground">
              Amboseli&apos;s diverse ecosystems support an extraordinary concentration of wildlife. The park&apos;s long-running elephant research project has documented elephants living in family groups of 50-100 individuals — a truly remarkable sight against the Kilimanjaro backdrop.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "African Elephants", emoji: "🐘", desc: "Amboseli hosts some of the largest elephant herds in East Africa. The park is famous for 'tuskers' — bulls with extraordinarily long tusks that can weigh over 100kg each. Family groups are led by matriarchs with decades of knowledge about water sources and migration routes." },
              { title: "Lions & Cheetahs", emoji: "🦁", desc: "Lions thrive in Amboseli's open terrain, with prides of 10-15 individuals commonly spotted. Cheetahs are also frequently seen hunting on the open plains — the flat terrain provides perfect visibility for observing their incredible speed." },
              { title: "Bird Species", emoji: "🦩", desc: "Over 400 bird species including the African fish eagle, pelicans, kingfishers, Greater flamingos (pink flocks at Lake Amboseli are spectacular), vultures, and steppe eagles. The wetlands attract migratory birds November-March." },
              { title: "Giraffes & Zebras", emoji: "🦒", desc: "Masai giraffes and plains zebras are abundant throughout the park. Their silhouettes against the Kilimanjaro backdrop make for iconic safari photographs, especially during golden hour at dawn and dusk." },
              { title: "Buffaloes & Hippos", emoji: "🦬", desc: "Large buffalo herds congregate near the swamp-fed wetlands. Hippos inhabit the swamps and Lake Amboseli, emerging at dusk to graze. The lake also hosts Nile crocodiles." },
              { title: "Wildebeest & Gazelles", emoji: "🦌", desc: "Blue wildebeest migrate through Amboseli in the thousands during the rainy season. Thompson's gazelles, Grant's gazelles, and impala are also common, attracting predators throughout the year." },
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
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">Best Time to Visit Amboseli</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { season: "June – October", label: "Dry Season", color: "border-green-500", icon: <Sun className="h-8 w-8 text-green-600" />, desc: "Peak wildlife season. Animals concentrate around water sources. Kilimanjaro most visible. Best for photography and Big Five sightings. Premium pricing applies.", temp: "20-28°C" },
              { season: "November – March", label: "Green Season", color: "border-blue-500", icon: <Droplets className="h-8 w-8 text-blue-500" />, desc: "Excellent birding with migratory species. Lower prices and fewer crowds. Short rains bring lush green landscapes. Great for photography with dramatic skies.", temp: "22-30°C" },
              { season: "April – May", label: "Long Rains", color: "border-gray-400", icon: <Thermometer className="h-8 w-8 text-gray-500" />, desc: "Some roads may be impassable. Park fees reduced. Not recommended for safaris due to muddy conditions. Most lodges offer significant discounts.", temp: "18-26°C" },
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
              <Info className="inline h-4 w-4 mr-1" /> Tip: For the best Kilimanjaro photos, schedule your early morning game drive between 6-9 AM when the mountain is clearest.
            </p>
          </div>
        </div>
      </section>

      {/* KILIMANJARO SECTION */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold">
                The Kilimanjaro Backdrop: What Makes Amboseli Unique
              </h2>
              <p className="text-lg leading-relaxed text-white/80 mb-4">
                No other wildlife park in Africa offers the combination of world-class game viewing and the dramatic backdrop of a 5,895-meter snow-capped mountain. Mt. Kilimanjaro — the world&apos;s highest freestanding mountain — creates a photographic setting unlike anywhere else on earth.
              </p>
              <p className="text-lg leading-relaxed text-white/80 mb-6">
                Although Kilimanjaro sits in Tanzania, its southern face and glaciers are clearly visible from Kenya&apos;s Amboseli National Park on clear mornings. The best views occur during the dry season (June-October) when morning mists clear by 8-9 AM.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">5,895m</div>
                  <div className="text-sm text-white/70">Mt. Kilimanjaro peak</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">6-9 AM</div>
                  <div className="text-sm text-white/70">Best viewing window</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">Jun-Oct</div>
                  <div className="text-sm text-white/70">Clearest visibility</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">World&apos;s Highest</div>
                  <div className="text-sm text-white/70">Freestanding mountain</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image src="/amboseli_elephants_at_sun_set-2__1200w.jpg" alt="Elephants in Amboseli with Mt. Kilimanjaro backdrop" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* TOURS GRID */}
      <section id="tours" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">Amboseli Safari Packages 2026</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Our budget-friendly Amboseli tours combine Kilimanjaro wildlife viewing with other iconic Kenya destinations. All packages include 4x4 transport, accommodation, meals, park fees, and professional guides.
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
                      <MapPin className="h-3 w-3" /> Amboseli
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
              <p className="text-lg">Combined safari packages featuring Amboseli are available. Contact us for custom itineraries.</p>
              <Button asChild className="mt-6 bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Ask About Custom Packages</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* RELATED SAFARIS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Combine Amboseli with Other Destinations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Masai Mara + Amboseli", desc: "Kenya's ultimate wildlife combo — Big Five in Mara, elephants with Kilimanjaro in Amboseli. From $940.", img: "/fantasticafrica-20240806-0001.jpg", href: "/budget-tours" },
              { title: "Lake Nakuru + Amboseli", desc: "See flamingos at Lake Nakuru, rhinos, and the Kilimanjaro elephants. Great for photographers.", img: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg", href: "/budget-tours" },
              { title: "Lake Naivasha + Amboseli", desc: "Boat ride on Naivasha, hippos, giraffe Manor, and Amboseli's wildlife. Perfect 4-day mix.", img: "/ostrich_family_in_amboseli-2__1200w.jpg", href: "/budget-tours" },
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
                {["Professional English-speaking safari guide/driver", "Shared 4x4 Land Cruiser with pop-top roof for game viewing", "All park entrance fees and conservation charges ($60/day adult)", "Comfortable budget tented camp or lodge accommodation", "Full-board meals (breakfast, lunch, dinner daily)", "Bottled drinking water throughout the safari", "Nairobi hotel/airport pick-up and drop-off", "All government taxes and levies"].map((item, i) => (
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
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Packing Checklist for Amboseli</h2>
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
          <p className="text-center text-muted-foreground mb-12">Real reviews from travelers who experienced Amboseli with JaeTravel</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Michael Torres", location: "Austin, TX, USA", text: "The Kilimanjaro backdrop made every photo absolutely stunning. Watching a herd of 50+ elephants walk past with the mountain behind was a once-in-a-lifetime moment. JaeTravel made it affordable without compromising on quality.", rating: 5, tour: "5-Day Masai Mara Naivasha Amboseli" },
              { name: "Anna Kowalski", location: "Warsaw, Poland", text: "Amboseli surprised me with its wildlife density — we saw lions, cheetahs, and massive elephant herds all in one day. The budget package was excellent value, the camp was clean, and our guide was incredibly knowledgeable.", rating: 5, tour: "6-Day Masai Mara Nakuru Amboseli" },
              { name: "James Liu", location: "Toronto, Canada", text: "Professional operation from start to finish. The guide knew exactly where to position us for the best elephant sightings with Kilimanjaro views. We got incredible photos on our first morning.", rating: 5, tour: "5-Day Masai Mara Naivasha Amboseli" },
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
            <p className="text-muted-foreground">Everything you need to know before booking your budget Amboseli safari</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "How much does an Amboseli tour cost from Nairobi?", a: "Our cheapest Amboseli tours start from $750 per person for a 2-day budget safari. Multi-day packages combining Amboseli with Masai Mara, Lake Nakuru, or Naivasha range from $850-$1,290 per person. All packages include transport in 4x4 Land Cruiser, park fees ($60/day adult), tented camp accommodation, all meals, and professional safari guiding." },
              { q: "How far is Amboseli from Nairobi?", a: "Amboseli National Park is approximately 240 km (150 miles) southeast of Nairobi, about a 4-5 hour drive. The scenic route passes through Athi River, the Machakos Hills, and offers beautiful views of the Great Rift Valley. We collect from hotels in Nairobi starting at 7 AM." },
              { q: "What wildlife will I see in Amboseli?", a: "Expect to see large elephant herds (50-100 individuals), lions (high density with prides of 10-15), cheetahs hunting on the open plains, Masai giraffes, zebras, wildebeest, buffaloes, hippos in the swamps, Nile crocodiles, and 400+ bird species including flamingos at Lake Amboseli, African fish eagles, and steppe eagles." },
              { q: "Can I see Mt. Kilimanjaro from Amboseli?", a: "Yes — Mt. Kilimanjaro (5,895m / 19,341 ft), the world's highest freestanding mountain, is visible from Amboseli National Park on clear mornings. The best viewing window is typically 6-9 AM. The dry season (June-October) offers the clearest views. The peak is in Tanzania but its southern glaciers are clearly visible from Kenya's Amboseli." },
              { q: "Why is Amboseli famous for elephant viewing?", a: "Amboseli hosts one of the highest concentrations of elephants in Africa and is home to the world's longest-running elephant research project. The park is famous for 'tuskers' — bulls with exceptionally long tusks weighing over 100kg each. Family groups are led by matriarchs with decades of accumulated knowledge about water sources and seasonal migrations." },
              { q: "What is the best time to visit Amboseli?", a: "June-October (dry season) is peak wildlife season — animals congregate around water, Kilimanjaro is most visible, and this is the best time for Big Five sightings. November-March (green season) offers lower prices, fewer crowds, and excellent birding with migratory species. April-May rains can make some roads impassable." },
              { q: "Can I combine Amboseli with Masai Mara?", a: "Absolutely — our most popular packages combine Amboseli with Masai Mara, Lake Nakuru, and Lake Naivasha. These multi-park safaris offer the complete Kenyan wildlife experience, from Kilimanjaro-backed elephants in Amboseli to the Great Migration in Masai Mara and flamingos at Lake Nakuru. Ask about our 5-day and 6-day combination packages." },
              { q: "What should I pack for an Amboseli safari?", a: "Pack light neutral-colored clothing (khaki, brown, green — avoid white and bright colors), a light jacket for early morning game drives, binoculars, a camera with a zoom lens (70-200mm recommended for wildlife), sunscreen SPF 50+, a wide-brimmed hat, and comfortable closed walking shoes. A dust scarf and small daypack are also useful." },
              { q: "Is $750 a good price for an Amboseli safari?", a: "Yes — our budget Amboseli tours from $750 represent excellent value. Just two days of park fees ($120 per person) plus transport, accommodation, and meals would cost far more arranging independently. Our packages include shared 4x4 Land Cruiser, all park fees, comfortable tented camps, all meals, and professional guiding — everything in one price." },
              { q: "What makes Amboseli unique compared to other Kenya parks?", a: "Amboseli's unique appeal comes from three elements: (1) The Kilimanjaro backdrop — no other park offers this combination of world-class wildlife and a 5,895m mountain backdrop. (2) The elephant research program — habituated herds allow exceptionally close observations. (3) The varied ecosystems — salt flats, swamps, acacia woodlands, and open plains within a relatively compact 392 km² area." },
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
          <h2 className="mb-6 font-serif text-5xl font-bold">Ready for Your Amboseli Safari Adventure?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
            Watch elephants with Kilimanjaro as your backdrop. Budget Amboseli tours from ${TOURS_MIN} per person — all-inclusive.
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
              <Link href="/destinations/amboseli">Amboseli Destination Guide</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/amboseli-safaris">Amboseli Safari Packages</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/budget-masai-mara-safari">Masai Mara Safaris</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/budget-lake-nakuru-safari">Lake Nakuru Safaris</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}