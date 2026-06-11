// app/group-joining-safaris-kenya/page.tsx
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

const ABSOLUTE_URL = `${BASE_URL}/group-joining-safaris-kenya`;
const HERO_IMG = `${BASE_URL}/fantasticafrica-20240806-0001.jpg`;

export const metadata: Metadata = {
  title: "Group Joining Safaris Kenya 2026 | Shared Tours $610+",
  description: "Join group safaris in Kenya 2026. Shared 4x4 Land Cruisers, all-inclusive, from $610. Meet fellow travelers.",
  keywords: "group joining safaris Kenya, shared safari tours Kenya, Kenya group safaris 2026, join group safari Kenya, shared Kenya tours, group wildlife tours Kenya, budget group safari Kenya, Kenya group tours from $610, joining safari Kenya, shared game drives Kenya, Kenya group travel, Kenya social safari",
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  alternates: { canonical: ABSOLUTE_URL, languages: { en: ABSOLUTE_URL, "x-default": ABSOLUTE_URL } },
  openGraph: {
    title: "Group Joining Safaris Kenya 2026 | Shared Tours $610+",
    description: "Join group safaris in Kenya 2026. Shared 4x4 Land Cruisers, all-inclusive, from $610. Meet fellow travelers.",
    url: ABSOLUTE_URL, siteName: "JaeTravel Expeditions",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Group Joining Safaris Kenya 2026", type: "image/jpeg" }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Joining Safaris Kenya 2026 | Shared Tours $610+",
    description: "Join group safaris in Kenya 2026. Shared 4x4 Land Cruisers, all-inclusive, from $610. Meet fellow travelers.",
    images: [HERO_IMG], site: "@jaetravel", creator: "@jaetravel",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${ABSOLUTE_URL}#webpage`, url: ABSOLUTE_URL, name: "Group Joining Safaris Kenya 2026", description: "Join group safaris in Kenya 2026. Shared 4x4 Land Cruisers, all-inclusive, from $610. Meet fellow travelers.", isPartOf: { "@type": "WebSite", "@id": `${BASE_URL}/#website`, name: "JaeTravel Expeditions", url: BASE_URL }, primaryImageOfPage: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 } },
    { "@type": "TouristAttraction", "@id": `${BASE_URL}/destinations/kenya#attraction`, name: "Kenya Wildlife Safari Destinations", description: "Kenya offers world-class safari experiences across iconic parks including Masai Mara, Amboseli, Lake Nakuru, and more. Group safaris provide the perfect balance of adventure, social connection, and value.", image: HERO_IMG, address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressRegion: "Kenya", addressCountry: "KE" }, geo: { "@type": "GeoCoordinates", latitude: -1.286389, longitude: 36.817223 }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1856" } },
    { "@type": "Product", name: "Group Joining Safaris Kenya 2026", description: "Join group safaris in Kenya 2026. Shared 4x4 Land Cruisers, all-inclusive, from $610.", url: ABSOLUTE_URL, image: HERO_IMG, brand: { "@type": "Brand", name: "JaeTravel Expeditions" }, offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: TOURS_MIN.toString(), highPrice: TOURS_MAX.toString(), offerCount: TOURS.length.toString(), availability: "https://schema.org/InStock", priceValidUntil: "2026-12-31" }, aggregateRating: { "@type": "AggregateRating", ratingValue: TOURS_AVG, reviewCount: TOTAL_REV.toString(), bestRating: "5" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How many people are in each group safari?", acceptedAnswer: { "@type": "Answer", text: "Our group safaris have 4-12 travelers per vehicle. This small group size ensures everyone gets personalized attention from guides, better wildlife viewing access (vehicles can go off-road in more places), and genuine connections with fellow adventurers from around the world." } },
      { "@type": "Question", name: "Is joining a group safari good for solo travelers?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! Solo travelers love our group safaris — you'll meet amazing people from around the world, share incredible wildlife experiences together, and often find travel companions for the rest of their trip. Our groups typically have a good mix of solo travelers and couples." } },
      { "@type": "Question", name: "What if I want privacy during my safari?", acceptedAnswer: { "@type": "Answer", text: "Our group safaris offer excellent value at $610+ per person. If you prefer a private experience, ask about upgrading to exclusive vehicle use — many travelers start in groups and decide to upgrade based on their preferences. Either way, you'll always get the same professional guiding and wildlife expertise." } },
      { "@type": "Question", name: "Are group safaris physically demanding?", acceptedAnswer: { "@type": "Answer", text: "Most game drives involve 3-5 hours of comfortable vehicle travel with stops for wildlife viewing, photography, and meals. The safari is accessible to anyone with normal mobility. Some short walking safaris may be available at certain parks. You don't need to be exceptionally fit — just curious and adventurous." } },
      { "@type": "Question", name: "What kind of people typically join group safaris?", acceptedAnswer: { "@type": "Answer", text: "Everyone! Our groups typically include solo travelers, couples, friends, and families aged 8-70+. What unites everyone is a sense of curiosity and adventure. We've hosted photographers, retired teachers, honeymooners, backpackers, and everyone in between. Age is just a number when wildlife is involved." } },
      { "@type": "Question", name: "How far in advance should I book my group safari?", acceptedAnswer: { "@type": "Answer", text: "We recommend booking 2-3 months ahead, especially for July-October (peak season/Great Migration). However, last-minute bookings are often possible depending on availability. For holiday seasons like Christmas and Easter, booking 3-4 months ahead is safer." } },
      { "@type": "Question", name: "What vehicles are used for group safaris?", acceptedAnswer: { "@type": "Answer", text: "All our group safaris use 4x4 Land Cruisers — the iconic safari vehicle in Africa. Each has a pop-top roof that raises for uninterrupted wildlife viewing. Air conditioning keeps you comfortable, and the vehicles are built for the rough safari roads. Everyone gets a window seat with unobstructed views." } },
      { "@type": "Question", name: "Will I still see good wildlife in a group safari?", acceptedAnswer: { "@type": "Answer", text: "Absolutely — in fact, group safaris often provide better wildlife sightings! Our guides coordinate with each other across the parks, sharing real-time wildlife sightings via radio. Smaller groups mean less noise and disturbance. Your guide's expertise matters far more than whether you're in a private or shared vehicle." } },
      { "@type": "Question", name: "What safety measures are in place for group safaris?", acceptedAnswer: { "@type": "Answer", text: "Safety is our top priority. We use licensed operators with comprehensive insurance, maintain vehicles to the highest standards, provide 24/7 emergency support, and our guides are trained in first aid and wildlife safety protocols. Safari vehicles have seatbelts, and we adhere to all park safety regulations." } },
      { "@type": "Question", name: "Can I customize or extend my group safari package?", acceptedAnswer: { "@type": "Answer", text: "Yes! Our base packages cover the main highlights, but you can extend your safari to include additional parks ( Amboseli, Lake Naivasha, etc.) or add optional activities like hot air balloon rides, village visits, or extra game drives. Contact us to build your perfect Kenyan adventure." } },
    ]},
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Budget Tours", item: `${BASE_URL}/budget-tours` },
      { "@type": "ListItem", position: 3, name: "Group Joining Safaris", item: ABSOLUTE_URL }
    ]},
    { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "JaeTravel Expeditions", url: BASE_URL, telephone: "+254726485228", email: "info@jaetravel.co.ke", aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", reviewCount: TOTAL_REV.toString() } },
  ],
};

export default function GroupJoiningSafarisPage() {
  return (
    <div className="pb-16" dir="ltr">
      <Script id="group-joining-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/fantasticafrica-20240806-0001.jpg" alt="Group Joining Safaris Kenya 2026" fill className="object-cover brightness-50" priority sizes="100vw" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Rated {TOURS_AVG}/5 by {TOTAL_REV}+ Happy Safari Travelers</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Group Joining Safaris Kenya 2026 <span className="text-amber-400">— From ${TOURS_MIN}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Share the magic of Kenya&apos;s wildlife with fellow adventurers from around the world. Small group safaris (4-12 people) that combine incredible wildlife viewing with lifelong friendships and unbeatable value.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
            <Button asChild size="lg" className="min-w-[240px] text-lg bg-green-600 hover:bg-green-700 font-semibold">
              <Link href="#tours">View All {TOURS.length} Group Safari Packages</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[240px] text-lg border-white bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <Link href="/contact">Talk to Our Safari Experts</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Best Price Guarantee</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 4-12 People Per Vehicle</span>
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
            <div><div className="text-2xl font-bold">4-12</div><div className="opacity-80">Per Vehicle</div></div>
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
              Join {TOTAL_REV}+ Happy Travelers on Group Safaris in Kenya
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Our group joining safaris in Kenya are the most popular way to experience world-class wildlife viewing while making friends from around the globe. With small groups of <strong>4-12 travelers</strong>, you&apos;ll enjoy the social atmosphere of shared adventures without sacrificing the quality of your wildlife encounters.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Starting from just <strong>${TOURS_MIN} per person</strong>, our all-inclusive group packages cover everything: transport in 4x4 Land Cruisers, comfortable accommodations, all meals, park fees, and expert guides who become your window into Kenya&apos;s extraordinary ecosystems.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              The shared safari format creates a unique dynamic — you&apos;ll celebrate sightings together, share tips with fellow photography enthusiasts, and often leave with lifelong friends. Many solo travelers say the group experience was the highlight of their trip.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              <Link href="#tours">Browse Group Safari Packages</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* GROUP SAFARI FACTS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Users className="h-6 w-6" />, label: "Group Size", value: "4-12 travelers per vehicle" },
              { icon: <MapPin className="h-6 w-6" />, label: "Destinations", value: "Masai Mara, Amboseli, Nakuru & more" },
              { icon: <DollarSign className="h-6 w-6" />, label: "Starting Price", value: "From $610 per person" },
              { icon: <binoculars className="h-6 w-6" />, label: "Wildlife Focus", value: "Big Five, migration, birds" },
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

      {/* WHY GROUP TRAVEL WINS */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold">
                Why Group Travel Wins: The Social Safari Advantage
              </h2>
              <p className="text-lg leading-relaxed text-white/80 mb-4">
                Safari experiences are amplified when shared. Our group joining format means you&apos;ll have fellow adventurers to celebrate the moment when a lioness makes a kill, when a herd of elephants crosses the road, or when a hot air balloon drifts silently over the plains at sunrise.
              </p>
              <p className="text-lg leading-relaxed text-white/80 mb-6">
                You&apos;ll share tips with photography enthusiasts, swap travel stories over dinner, and create memories with people who understand the magic of seeing a leopard in a tree or flamingos painting the horizon pink.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">4-12</div>
                  <div className="text-sm text-white/70">Travelers per vehicle</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-white/70">Countries represented</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">$610+</div>
                  <div className="text-sm text-white/70">All-inclusive per person</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/70">Same wildlife access</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image src="/fantasticafrica-20240806-0001.jpg" alt="Group Safari in Kenya" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* WHO JOINS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-4xl font-bold">Who Joins Our Group Safaris?</h2>
            <p className="text-lg text-muted-foreground">
              Our group safaris attract a wonderful diversity of travelers from around the world. Everyone shares one thing in common: a love of wildlife and adventure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { title: "Solo Travelers", desc: "Meet fellow adventurers and never feel alone. Many solo travelers leave with friends for life.", icon: "👤" },
              { title: "Couples & Friends", desc: "Share the excitement of wildlife encounters together in a social atmosphere.", icon: "💑" },
              { title: "Photography Enthusiasts", desc: "Share tips and positions for the best wildlife shots with fellow shutterbugs.", icon: "📸" },
              { title: "Families", desc: "Children aged 6+ are welcome. An incredible educational experience for all ages.", icon: "👨‍👩‍👧" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WILDLIFE HIGHLIGHTS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-4xl font-bold">Kenya Wildlife: What Awaits You</h2>
            <p className="text-lg text-muted-foreground">
              Kenya hosts some of the most spectacular wildlife viewing on Earth. From the Big Five to the Great Migration, each destination offers unique wildlife experiences that will leave you breathless.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "The Big Five", emoji: "🦁", desc: "Lions in prides of 10+, leopards in riverine forests, elephants in massive herds, buffaloes in huge herds, and both black and white rhinos in protected sanctuaries." },
              { title: "Great Migration", emoji: "🦬", desc: "July-October brings 1.5+ million wildebeest crossing the Mara River. Crocodiles wait below as millions of hooves thunder across the plains in nature's greatest spectacle." },
              { title: "Elephant Herds", emoji: "🐘", desc: "Kenya's elephants are well-habituated and allow close observation. Herds of 50-100 with experienced matriarchs lead families across ancient migration routes." },
              { title: "Bird Species", emoji: "🦅", desc: "Over 1,100 bird species in Kenya. From flamingos at Lake Nakuru to fish eagles at Naivasha, birding opportunities are exceptional across all parks." },
              { title: "Cheetahs", emoji: "🐆", desc: "Kenya has excellent cheetah populations, especially in the Masai Mara and Amboseli. Watch these elegant cats reach 70mph across the open plains." },
              { title: "Exotic Birds & More", emoji: "🦤", desc: "Pelicans, kingfishers, lilac-breasted rollers, ostriches, secretary birds — Kenya's bird diversity is staggering, with over 450 species in some parks alone." },
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
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">Best Time to Visit Kenya on a Group Safari</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { season: "June – October", label: "Peak Season", color: "border-green-500", icon: <Sun className="h-8 w-8 text-green-600" />, desc: "Peak wildlife season with animals concentrated around water. Great Migration in Masai Mara (July-October). Dry roads. Best for photography. Book 2-3 months ahead.", temp: "20-28°C" },
              { season: "November – March", label: "Green Season", color: "border-blue-500", icon: <Droplets className="h-8 w-8 text-blue-500" />, desc: "Excellent birding with migratory species. Lush landscapes. Lower prices. Fewer crowds. Baby animals born. Perfect for photographers and budget travelers.", temp: "22-30°C" },
              { season: "April – May", label: "Long Rains", color: "border-gray-400", icon: <Thermometer className="h-8 w-8 text-gray-500" />, desc: "Some roads become impassable. Landscapes are emerald green. Significant lodge discounts available. Not recommended for first-time safari travelers.", temp: "18-26°C" },
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
              <Info className="inline h-4 w-4 mr-1" /> Tip: Group safaris book up fast during peak season (July-October). Reserve your spot 2-3 months in advance to secure your preferred dates and destination combination.
            </p>
          </div>
        </div>
      </section>

      {/* TOURS GRID */}
      <section id="tours" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">Group Safari Packages for Every Traveler</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              From 3-day quick escapes to 10-day comprehensive adventures — all are shared group tours with 4-12 travelers. All packages include professional guides, accommodations, meals, and transport.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TOURS.map((tour) => (
              <div key={tour.id} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={tour.image.startsWith("/") ? tour.image : `/${tour.image}`} alt={tour.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  {tour.originalPrice && tour.originalPrice > tour.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Special Offer</div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Users className="h-3 w-3" /> Group Tour
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
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Explore Kenya&apos;s Safari Destinations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Masai Mara Safari", desc: "Kenya's premier wildlife reserve. Big Five, Great Migration, spectacular predator sightings. From $610.", img: "/masai-mara-safari.jpg", href: "/budget-masai-mara-safari" },
              { title: "Lake Nakuru Safari", desc: "Flamingos, rhinos, and Rothschild giraffes. Perfect for birders and photographers. Great value.", img: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg", href: "/budget-lake-nakuru-safari" },
              { title: "Amboseli Safari", desc: "Elephants with Kilimanjaro backdrop. Best for wildlife photography. Combine with other parks.", img: "/fantasticafrica-20240806-0001.jpg", href: "/cheap-amboseli-tours" },
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
                {["Professional English-speaking safari guide/driver", "Shared 4x4 Land Cruiser with pop-top roof", "All park entrance fees and conservation charges", "Comfortable budget tented camp or lodge accommodation", "Full-board meals (breakfast, lunch, dinner)", "Bottled drinking water throughout the safari", "Nairobi hotel/airport pick-up and drop-off", "All government taxes and levies"].map((item, i) => (
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
                {["International flights and Kenya visa fees ($51 for e-visa)", "Travel insurance (strongly recommended — from $30)", "Tips for guide and camp staff ($10-20/day suggested)", "Alcoholic beverages and soft drinks", "Personal expenses and souvenirs", "Optional activities (balloon safari $450-500, village visits $25-30)", "Single room supplement ($80-150 depending on package)", "Yellow fever vaccination certificate (if arriving from endemic area)"].map((item, i) => (
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
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Packing Checklist for Your Group Safari</h2>
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
          <p className="text-center text-muted-foreground mb-12">Real reviews from travelers who joined group safaris with JaeTravel</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Carlos Mendez", location: "Mexico City", text: "Joined as a solo traveler and left with friends for life. The shared safari format created the perfect social atmosphere for this adventure of a lifetime.", rating: 5, tour: "3-Day Masai Mara Budget Safari" },
              { name: "Priya Sharma", location: "Mumbai, India", text: "The group dynamic was fantastic — everyone shared tips, spotted wildlife, and celebrated together. Best travel experience I have ever had.", rating: 5, tour: "5-Day Three-Park Safari" },
              { name: "Hans Mueller", location: "Berlin, Germany", text: "Incredible value for money. The shared format meant lower costs but the same professional guides and wildlife encounters as much more expensive private tours.", rating: 5, tour: "4-Day Mara & Naivasha Safari" },
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
            <p className="text-muted-foreground">Everything you need to know about joining our group safaris</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "How many people are in each group safari?", a: "Our group safaris have 4-12 travelers per vehicle. This small group size ensures everyone gets personalized attention from guides, better wildlife viewing access, and genuine connections with fellow adventurers from around the world." },
              { q: "Is joining a group safari good for solo travelers?", a: "Absolutely! Solo travelers love our group safaris — you'll meet amazing people from around the world, share incredible wildlife experiences together, and often find travel companions for the rest of their trip. Our groups typically have a good mix of solo travelers and couples." },
              { q: "What if I want privacy during my safari?", a: "Our group safaris offer excellent value at $610+ per person. If you prefer a private experience, ask about upgrading to exclusive vehicle use — many travelers start in groups and decide to upgrade based on their preferences. Either way, you'll always get the same professional guiding and wildlife expertise." },
              { q: "Are group safaris physically demanding?", a: "Most game drives involve 3-5 hours of comfortable vehicle travel with stops for wildlife viewing, photography, and meals. The safari is accessible to anyone with normal mobility. You don't need to be exceptionally fit — just curious and adventurous." },
              { q: "What kind of people typically join group safaris?", a: "Everyone! Our groups typically include solo travelers, couples, friends, and families aged 8-70+. What unites everyone is a sense of curiosity and adventure. We've hosted photographers, retired teachers, honeymooners, backpackers, and everyone in between." },
              { q: "How far in advance should I book my group safari?", a: "We recommend booking 2-3 months ahead, especially for July-October (peak season/Great Migration). However, last-minute bookings are often possible depending on availability. For holiday seasons like Christmas and Easter, booking 3-4 months ahead is safer." },
              { q: "What vehicles are used for group safaris?", a: "All our group safaris use 4x4 Land Cruisers — the iconic safari vehicle in Africa. Each has a pop-top roof that raises for uninterrupted wildlife viewing. Air conditioning keeps you comfortable, and everyone gets a window seat with unobstructed views." },
              { q: "Will I still see good wildlife in a group safari?", a: "Absolutely — in fact, group safaris often provide better wildlife sightings! Our guides coordinate with each other across the parks, sharing real-time wildlife sightings via radio. Smaller groups mean less noise and disturbance. Your guide's expertise matters far more than whether you're in a private or shared vehicle." },
              { q: "What safety measures are in place for group safaris?", a: "Safety is our top priority. We use licensed operators with comprehensive insurance, maintain vehicles to the highest standards, provide 24/7 emergency support, and our guides are trained in first aid and wildlife safety protocols. Safari vehicles have seatbelts, and we adhere to all park safety regulations." },
              { q: "Can I customize or extend my group safari package?", a: "Yes! Our base packages cover the main highlights, but you can extend your safari to include additional parks (Amboseli, Lake Naivasha, etc.) or add optional activities like hot air balloon rides, village visits, or extra game drives. Contact us to build your perfect Kenyan adventure." },
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
          <h2 className="mb-6 font-serif text-5xl font-bold">Ready to Join Your Group Safari Adventure?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
            Join {TOTAL_REV}+ happy travelers who&apos;ve discovered the magic of Kenya&apos;s wildlife with new friends. From ${TOURS_MIN} per person — all-inclusive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-10 py-7 font-semibold" asChild>
              <Link href="/contact">Book Your Group Safari Now</Link>
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
              <Link href="/budget-lake-nakuru-safari">Lake Nakuru Safaris</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/cheap-amboseli-tours">Amboseli Safaris</Link>
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