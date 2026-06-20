// app/wildebeest-migration-safari-packages/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar, Star, Shield, CheckCircle, MapPin, Globe,
  Phone, Mail, Clock, Users, Check, Mailbox, AlertCircle,
  ChevronRight, Bird, Car, Accessibility, Heart, Sunrise, Sunset,
  Thermometer, Droplets, DollarSign, ThumbsUp, Wheelchair, AccessibilityIcon
} from "lucide-react";
import { standardTours } from "@/lib/standard-tours-data";
import { accessibleTours } from "@/lib/accessiblemara";

const BASE_URL = "https://www.jaetravel.co.ke";
const ABSOLUTE_URL = `${BASE_URL}/wildebeest-migration-safari-packages`;
const HERO_IMG = `${BASE_URL}/masai-mara-migration.jpg`;

interface CombinedTour {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  rating: number;
  reviewCount: number;
  duration: string;
  groupSize: string;
  type: "standard" | "accessible";
  highlights: string[];
  included: string[];
  excluded: string[];
  accessibility?: {
    vehicle: string;
    accommodation: string;
    terrain?: string;
    other?: string;
  };
}

const allTours: CombinedTour[] = [
  ...standardTours
    .filter(t => t.slug.includes("masai-mara") || t.slug.includes("mara") || t.title.toLowerCase().includes("mara"))
    .map(t => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      shortDescription: t.shortDescription,
      price: t.price,
      originalPrice: t.originalPrice,
      image: t.image,
      url: t.url,
      rating: t.rating,
      reviewCount: t.reviewCount,
      duration: t.duration,
      groupSize: t.groupSize,
      type: "standard" as const,
      highlights: t.highlights,
      included: t.included,
      excluded: t.excluded,
    })),
  ...accessibleTours
    .filter(t => t.slug.includes("migration") || t.slug.includes("masai") || t.slug.includes("mara") || t.title.toLowerCase().includes("mara"))
    .map(t => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      shortDescription: t.shortDescription,
      price: t.price,
      originalPrice: t.originalPrice,
      image: t.image,
      url: t.url,
      rating: t.rating,
      reviewCount: t.reviewCount,
      duration: t.duration,
      groupSize: t.groupSize,
      type: "accessible" as const,
      highlights: t.highlights,
      included: t.included,
      excluded: t.excluded,
      accessibility: t.accessibility,
    })),
];

const STANDARD_TOURS = allTours.filter(t => t.type === "standard");
const ACCESSIBLE_TOURS = allTours.filter(t => t.type === "accessible");

const TOURS_MIN = allTours.length > 0 ? Math.min(...allTours.map(t => t.price)) : 850;
const TOURS_MAX = allTours.length > 0 ? Math.max(...allTours.map(t => t.price)) : 3500;
const TOURS_AVG = allTours.length > 0 ? (allTours.reduce((s, t) => s + t.rating, 0) / allTours.length).toFixed(1) : "4.8";
const TOTAL_REV = allTours.reduce((s, t) => s + t.reviewCount, 0);

// Title: 59 chars | Description: 87 chars
export const metadata: Metadata = {
  title: "Masai Mara Migration Safari Packages 2026 | From $850 | JaeTravel",
  description: "Masai Mara migration safari packages 2026 from $850. See wildebeest cross the Mara River. Group & accessible tours. All-inclusive. Book now.",
  keywords: [
    "masai mara migration safari", "great migration safari", "wildebeest migration safari Kenya", "masai mara migration tours",
    "migration safari packages Kenya", "great migration tours 2026", "masai mara wildebeest crossing", "migration safari Kenya from $850",
    "best migration safari Kenya", "masai mara migration river crossing", "migration safari July October", "wildebeest crossing safari",
    "masai mara migration packages", "migration budget safari Kenya", "migration luxury safari Kenya", "masai mara migration season",
    "kenya migration tour packages", "great migration kenya 2026", "masai mara migration deals", "affordable migration safari",
    "masai mara migration private safari", "masai mara migration group safari", "masai mara migration wheelchair safari",
    "accessible migration safari Kenya", "disabled migration safari", "wheelchair great migration Kenya",
    "masai mara migration for seniors", "family migration safari Kenya", "couples migration safari Kenya",
    "migration safari duration", "3 day migration safari", "5 day migration safari", "7 day migration safari Kenya"
  ].join(", "),
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: ABSOLUTE_URL,
    languages: { en: ABSOLUTE_URL, "x-default": ABSOLUTE_URL },
  },
  openGraph: {
    title: "Masai Mara Migration Safari Packages 2026 | From $850",
    description: "Masai Mara migration safari packages 2026 from $850. See wildebeest cross the Mara River. Group & accessible tours. All-inclusive.",
    url: ABSOLUTE_URL, siteName: "JaeTravel Expeditions",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Masai Mara Wildebeest Migration Safari Kenya 2026", type: "image/jpeg" }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masai Mara Migration Safari Packages 2026 | From $850",
    description: "Masai Mara migration safari packages 2026 from $850. See wildebeest cross the Mara River. Group & accessible tours. All-inclusive.",
    images: [HERO_IMG], site: "@jaetravel", creator: "@jaetravel",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", url: ABSOLUTE_URL, name: "Masai Mara Migration Safari Packages 2026 | From $850", description: "Masai Mara migration safari packages 2026 from $850. See wildebeest cross the Mara River. Group & accessible tours. All-inclusive.", primaryImageOfPage: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 } },
    { "@type": "TouristAttraction", name: "Masai Mara National Reserve", description: "Masai Mara National Reserve is the world's premier wildebeest migration destination. Each year, 1.5+ million wildebeest cross the Mara River in dramatic crocodile-infested crossings, flanked by lions, cheetahs, and Big Five wildlife.", image: HERO_IMG, address: { "@type": "PostalAddress", addressLocality: "Masai Mara", addressRegion: "Kenya", addressCountry: "KE" }, geo: { "@type": "GeoCoordinates", latitude: -1.4933, longitude: 35.1431 } },
    { "@type": "Product", name: "Masai Mara Migration Safari Packages Kenya 2026", description: "Migration safari packages to Masai Mara from $850. Witness 1.5M+ wildebeest crossing the Mara River. Group tours and wheelchair-accessible options available.", url: ABSOLUTE_URL, image: HERO_IMG, brand: { "@type": "Brand", name: "JaeTravel Expeditions" }, offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: TOURS_MIN.toString(), highPrice: TOURS_MAX.toString(), offerCount: allTours.length.toString(), availability: "https://schema.org/InStock", priceValidUntil: "2026-12-31" }, aggregateRating: { "@type": "AggregateRating", ratingValue: TOURS_AVG, reviewCount: TOTAL_REV.toString(), bestRating: "5" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "When is the Great Wildebeest Migration in Masai Mara?", acceptedAnswer: { "@type": "Answer", text: "The Great Wildebeest Migration in Masai Mara follows an annual cycle driven by rainfall patterns. The dramatic Mara River crossings peak from July to October when approximately 1.5 million wildebeest cross from Tanzania's Serengeti into Kenya's Masai Mara. The exact timing varies year to year — typically, the first crossings begin in July, with the most intense crossing activity in August and September. The migration is a continuous clockwise movement, with calving season in the Serengeti from January-March." } },
      { "@type": "Question", name: "How much does a Masai Mara migration safari cost?", acceptedAnswer: { "@type": "Answer", text: `Our Masai Mara migration safari packages start from $${TOURS_MIN} per person for budget group tours. Mid-range lodge safaris begin around $1,100, while luxury options start from $1,800. All packages include 4x4 transport from Nairobi, park fees, accommodation, meals, and professional guiding. Wheelchair-accessible migration tours are available from $850 per person.` } },
      { "@type": "Question", name: "What makes the Mara River crossings so special?", acceptedAnswer: { "@type": "Answer", text: "The Mara River crossings are considered one of the most dramatic wildlife spectacles on Earth. Hundreds of thousands of wildebeest — driven by ancient instinct — plunge into crocodile-infested waters, creating a frenzied scramble that draws predators from both banks. The dramatic tension, the splashing water, the desperate flight of the herds — it is raw nature at its most visceral. Watching a herd of 10,000+ wildebeest take the leap into the river, then fighting upstream against the current while crocodiles strike, is an experience no wildlife documentary can fully capture." } },
      { "@type": "Question", name: "Can I see the migration with a limited budget?", acceptedAnswer: { "@type": "Answer", text: `Absolutely — budget migration safari packages start from $${TOURS_MIN} per person. These shared group tours (4-12 travelers) include comfortable tented camp accommodation, all meals, park fees, and professional guiding. The wildlife viewing — including river crossings during peak season — is identical to premium packages. The difference is accommodation level and vehicle exclusivity, not guide quality or wildlife access.` } },
      { "@type": "Question", name: "Are there wheelchair-accessible migration safaris?", acceptedAnswer: { "@type": "Answer", text: "Yes — we offer fully wheelchair-accessible migration safaris starting from $850 per person. Our accessible tours feature vehicles with ramps and lifts, wheelchair-friendly camps with roll-in showers and grab rails, and guides trained in disability assistance. You will not miss any wildlife action — our accessible vehicles have pop-top roofs for unimpeded game viewing from a seated position." } },
      { "@type": "Question", name: "How many days do I need for a migration safari?", acceptedAnswer: { "@type": "Answer", text: "A minimum of 2 days allows you to witness crossing events (if timing is right), but we recommend 3-5 days for a proper migration safari. This gives you multiple crossing opportunities, time to explore different areas of the reserve, and better chances of predator action following the herds. Our 5-7 day packages combine Masai Mara with Lake Nakuru, Amboseli, or Naivasha for the complete Kenyan experience." } },
      { "@type": "Question", name: "What is the success rate for seeing river crossings?", acceptedAnswer: { "@type": "Answer", text: "During peak season (July-October), our guides achieve approximately 85-90% success rate for witnessing significant crossing events. Success depends on timing within the season, as crossings are concentrated during certain weeks when herds mass on the riverbanks. Our guides monitor crossing points in real-time and position guests for optimal viewing. Outside peak season, while the migration herds have moved south, resident wildlife (Big Five) remains excellent year-round." } },
      { "@type": "Question", name: "Is the migration safari suitable for families with children?", acceptedAnswer: { "@type": "Answer", text: "Yes — children aged 8+ can join our migration safari packages. The excitement of witnessing the migration is unmatched education for young wildlife enthusiasts. We offer family-friendly accommodation and private vehicles for families who want to set their own pace. Our guides are experienced with children and know how to make the experience engaging for all ages." } },
      { "@type": "Question", name: "What should I pack for a migration safari?", acceptedAnswer: { "@type": "Answer", text: "Pack light neutral-colored clothing (khaki, brown, green — avoid white and bright colors), layers for early morning game drives (can be cool), binoculars (10x42 recommended), a camera with 200-400mm zoom lens for wildlife, sunscreen SPF 50+, a wide-brimmed hat, comfortable walking shoes, personal medications, and a small daypack. A scarf for dust and a light rain jacket (wet season) are also useful." } },
      { "@type": "Question", name: "Why choose a group joining migration safari?", acceptedAnswer: { "@type": "Answer", text: "Group joining migration safaris offer the best value — shared costs reduce individual prices by 30-50% compared to private tours. You will meet fellow wildlife enthusiasts from around the world, share the excitement of witnessing crossings together, and build friendships that often last beyond the safari. Our group safaris (4-12 people) maintain the same professional guiding and wildlife access as private tours." } },
      { "@type": "Question", name: "What's the difference between standard and accessible migration tours?", acceptedAnswer: { "@type": "Answer", text: "Standard migration tours use traditional 4x4 Land Cruisers with pop-top roofs for game viewing. Accessible migration tours additionally feature wheelchair ramp/lift access, wider vehicle interiors, wheelchair-friendly tents with adapted bathrooms, and guides trained in disability assistance. Both use the same parks, same wildlife viewing, same expert guides — accessible tours simply remove mobility barriers." } },
      { "@type": "Question", name: "How far in advance should I book a migration safari?", acceptedAnswer: { "@type": "Answer", text: "For peak season (July-October), book 3-4 months ahead to secure your preferred dates and accommodation. Peak camps fill 6+ months in advance. For green season (November-March), 2-4 weeks is often sufficient. Our migration packages are popular — late bookers find limited availability at the best camps." } },
    ]},
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Budget Tours", item: `${BASE_URL}/budget-tours` },
      { "@type": "ListItem", position: 3, name: "Masai Mara Migration Safari", item: ABSOLUTE_URL }
    ]},
    { "@type": "Organization", name: "JaeTravel Expeditions", url: BASE_URL, telephone: "+254726485228", email: "info@jaetravel.co.ke" },
  ],
};

export default function WildebeestMigrationSafariPage() {
  return (
    <div className="pb-16" dir="ltr">
      <Script id="migration-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/masai-mara-migration.jpg" alt="Masai Mara Wildebeest Migration Safari Kenya 2026" fill className="object-cover brightness-50" priority sizes="100vw" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
            <Bird className="h-4 w-4 text-amber-400" />
            <span>Rated {TOURS_AVG}/5 by {TOTAL_REV}+ Happy Safari Travelers</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Masai Mara Migration Safari <span className="text-amber-400">— From ${TOURS_MIN}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Witness 1.5 million wildebeest cross the crocodile-infested Mara River. Our Masai Mara migration safari packages — from ${TOURS_MIN}/person. Group and wheelchair-accessible options available. All-inclusive.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
            <Button asChild size="lg" className="min-w-[240px] text-lg bg-amber-600 hover:bg-amber-700 font-semibold">
              <Link href="#tours">View {allTours.length} Migration Packages</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[240px] text-lg border-white bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <Link href="/contact">Talk to Safari Expert</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Best Price Guarantee</span>
            <span className="flex items-center gap-2"><Bird className="h-4 w-4" /> 1.5M+ Wildebeest</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4" /> {TOURS_AVG}/5 Rating</span>
            <span className="flex items-center gap-2"><Accessibility className="h-4 w-4" /> Accessible Options</span>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="bg-gradient-to-r from-amber-700 to-orange-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center text-sm font-medium">
            <div><div className="text-2xl font-bold">{allTours.length}+</div><div className="opacity-80">Migration Packages</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">${TOURS_MIN}</div><div className="opacity-80">Starting From</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">1.5M+</div><div className="opacity-80">Wildebeest</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">Jul-Oct</div><div className="opacity-80">Peak Season</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{TOURS_AVG}★</div><div className="opacity-80">Average Rating</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{TOTAL_REV}+</div><div className="opacity-80">Happy Travelers</div></div>
          </div>
        </div>
      </section>

      {/* TOUR TYPE NAVIGATION */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-1 py-3 overflow-x-auto">
            <a
              href="#tours"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-amber-600 text-white whitespace-nowrap"
            >
              <Bird className="h-4 w-4" />
              All Tours ({allTours.length})
            </a>
            <a
              href="#standard-tours"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 whitespace-nowrap transition"
            >
              <Star className="h-4 w-4" />
              Standard Tours ({STANDARD_TOURS.length})
            </a>
            <Link
              href="/accessible-migration"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 whitespace-nowrap transition"
            >
              <Accessibility className="h-4 w-4" />
              Accessible Tours ({ACCESSIBLE_TOURS.length})
            </Link>
            <Link
              href="/budget-tours"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 whitespace-nowrap transition"
            >
              <DollarSign className="h-4 w-4" />
              Budget Tours
            </Link>
          </div>
        </div>
      </div>

      {/* INTRODUCTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-5xl font-bold tracking-tight">
              Masai Mara Migration Safaris: The World&apos;s Greatest Wildlife Spectacle
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Every year, over <strong>1.5 million wildebeest</strong> make the ancient journey from Tanzania&apos;s Serengeti to Kenya&apos;s Masai Mara — one of nature&apos;s most awe-inspiring events. Called the Great Migration, this circular odyssey spans 1,800 miles and crosses predator-laden rivers where crocodiles wait in ambush. Our Masai Mara migration safari packages put you at the heart of this drama — starting from just <strong>${TOURS_MIN} per person</strong>.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Whether you&apos;re watching thousands of wildebeest plunge into the Mara River from riverbanks packed with lions and hyenas, or photographing elephants with the Great Rift Valley as a backdrop — the Masai Mara delivers wildlife experiences unmatched anywhere on Earth. Our packages range from budget group tours to fully wheelchair-accessible safaris, ensuring everyone can witness this extraordinary spectacle.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-6">
              <Link href="#tours">Browse Migration Packages</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* THE MIGRATION EXPLAINED */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">Understanding the Great Migration</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">The Great Migration is a continuous clockwise cycle driven by rainfall and grass. Here is what you need to know:</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { season: "Jan – Mar", label: "Calving Season", color: "border-amber-500", icon: <Bird className="h-8 w-8 text-amber-600" />, desc: "500,000+ calves born in the Serengeti. Predators thrive — excellent for Big Cat Week sightings. Lower prices, fewer crowds.", temp: "20-30°C" },
              { season: "Apr – May", label: "Long Rains", color: "border-blue-500", icon: <Droplets className="h-8 w-8 text-blue-500" />, desc: "Herds move north. The green season brings lush landscapes, low prices, and migratory birds. Roads can be challenging.", temp: "18-26°C" },
              { season: "Jul – Oct", label: "Peak Crossings", color: "border-red-500", icon: <Bird className="h-8 w-8 text-red-500" />, desc: "The dramatic Mara River crossings. 1.5M+ wildebeest pour into Masai Mara. Peak season — book 3-4 months ahead. Highest prices.", temp: "20-28°C" },
              { season: "Nov – Dec", label: "Short Rains", color: "border-green-500", icon: <Droplets className="h-8 w-8 text-green-500" />, desc: "Herds begin returning south. Good wildlife viewing with fewer crowds than peak. Excellent value. Lush green landscapes.", temp: "22-30°C" },
            ].map((item, i) => (
              <Card key={i} className={`border-t-4 ${item.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <div>
                      <h3 className="text-xl font-bold">{item.season}</h3>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <div className="text-sm font-medium text-amber-700">Avg temp: {item.temp}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              <AlertCircle className="h-4 w-4" /> For river crossings specifically, July-October is your window. Our guides monitor crossing points daily and position you for optimal views.
            </p>
          </div>
        </div>
      </section>

      {/* THE CROSSING DRAMATIC */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold">
                The Mara River Crossing: Nature&apos;s Most Dramatic Moment
              </h2>
              <p className="text-lg leading-relaxed text-white/80 mb-4">
                Nothing in the natural world compares to watching a wildebeest river crossing. Herds mass on the riverbanks — 50,000, 100,000, more — before a single animal triggers the plunge. Within seconds, the river erupts into chaos: thousands of hooves, desperate splashing, crocodiles lunging, and the thundering sound of a million pounds of panic.
              </p>
              <p className="text-lg leading-relaxed text-white/80 mb-6">
                Our experienced guides know the crossing points — the exact bends where crocodiles patrol, the shallow fords where hippos concede space, the high banks where lions wait. They position you for maximum drama before the plunge, then follow the crossings as they happen. You will not just witness history — you will feel it.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">1.5M+</div>
                  <div className="text-sm text-white/70">Wildebeest annually</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">Jul-Oct</div>
                  <div className="text-sm text-white/70">Peak crossing season</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">400km</div>
                  <div className="text-sm text-white/70">Distance migrated</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">1,800mi</div>
                  <div className="text-sm text-white/70">Total journey</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image src="/4-Days-Masai-Mara-Wildebeest-safari.jpg" alt="Wildebeest crossing the Mara River during the Great Migration" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Why Choose JaeTravel for Your Migration Safari
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <DollarSign className="h-8 w-8" />, title: "Best Value Packages", desc: `Migration safaris from $${TOURS_MIN}/person. All-inclusive — no hidden costs, no surprise fees. Compare our prices against booking independently and you will save hundreds.` },
              { icon: <Bird className="h-8 w-8" />, title: "Expert Migration Guides", desc: "Our guides have collectively witnessed hundreds of crossings. They know the crossing points, read the herd movements, and position you for maximum drama — every time." },
              { icon: <Accessibility className="h-8 w-8" />, title: "Accessible Options", desc: "Wheelchair-accessible migration safaris available. Adapted vehicles, accessible camps, trained staff. No one misses the Great Migration." },
              { icon: <ThumbsUp className="h-8 w-8" />, title: "18+ Years Experience", desc: "We've operated migration safaris for nearly two decades. 1,000+ happy travelers, 98% satisfaction rate, and relationships with the best camps." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition border-2 border-transparent hover:border-amber-500">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-amber-600">{item.icon}</div>
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
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">What You Will See on a Migration Safari</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">The migration is about more than wildebeest — it is a complete East African wildlife experience.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: "🦬", title: "African Elephants", desc: "Masai Mara has excellent elephant populations. Family herds of 20-50 individuals are regularly seen, particularly near the Mara River crossing points." },
              { emoji: "🦁", title: "Lions", desc: "Masai Mara has one of the highest lion densities in Africa. Prides of 10-15 are common. Lions actively follow the migration herds, leading to dramatic predator-prey action." },
              { emoji: "🐆", title: "Leopards", desc: "Leopards thrive in the riverine forests of the Mara. They are elusive but our guides know their territories well — morning game drives offer the best sighting chances." },
              { emoji: "🦏", title: "Rhinos", desc: "Masai Mara has a healthy rhino population in a protected sanctuary. Rhinos are visible year-round and provide excellent viewing opportunities." },
              { emoji: "🦛", title: "Hippos", desc: "Thousands of hippos inhabit the Mara River. At crossing time, their defensive grunts add to the chaos as wildebeest attempt to share the waterway." },
              { emoji: "🦅", title: "Birds", desc: "450+ bird species in Masai Mara including the endangered Schalow's wheatear, vultures, eagles, and the iconic African fish eagle heard throughout the park." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESSIBLE MIGRATION SECTION */}
      {ACCESSIBLE_TOURS.length > 0 && (
        <section id="accessible-tours" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="mb-4 font-serif text-4xl font-bold">Wheelchair-Accessible Migration Safaris</h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">The Great Migration is for everyone. Our accessible migration packages ensure travelers with mobility challenges can fully experience this extraordinary wildlife spectacle.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 mb-8">
              {[
                { icon: <Car className="h-8 w-8" />, title: "Accessible Vehicles", desc: "Ramps or lifts for wheelchair access, spacious interiors, and pop-top roofs for game viewing from your seat. No transfers to standing vehicles needed." },
                { icon: <Accessibility className="h-8 w-8" />, title: "Adapted Accommodation", desc: "Tents and rooms with roll-in showers, grab rails, wide doorways, and ground-floor access. Our accessible camps are verified before booking." },
                { icon: <Users className="h-8 w-8" />, title: "Trained Staff", desc: "Guides trained in disability awareness and mobility assistance. We plan every aspect around your needs — from game drives to meals to camp logistics." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-3 text-amber-600">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ACCESSIBLE_TOURS.slice(0, 3).map((tour) => (
                <div key={tour.id} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={tour.image.startsWith("/") ? tour.image : `/${tour.image}`} alt={tour.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Accessibility className="h-3 w-3" /> Accessible
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
                        <span className="text-xs text-muted-foreground block">per person</span>
                      </div>
                      <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700">
                        <Link href={tour.url}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {ACCESSIBLE_TOURS.length > 3 && (
              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link href="/accessible-migration">View All Accessible Migration Safaris ({ACCESSIBLE_TOURS.length})</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STANDARD TOURS */}
      {STANDARD_TOURS.length > 0 && (
        <section id="tours" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold">Masai Mara Migration Safari Packages 2026</h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                From quick 2-day escapes to full 8-day Kenya adventures. All packages include 4x4 transport, accommodation, meals, park fees, and expert guiding.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {STANDARD_TOURS.map((tour) => (
                <div key={tour.id} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={tour.image.startsWith("/") ? tour.image : `/${tour.image}`} alt={tour.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Bird className="h-3 w-3" /> Migration Safari
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
                      <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700">
                        <Link href={tour.url}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PACKING */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Migration Safari Packing Checklist</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Clothing", icon: "👕", items: ["Neutral colors: khaki, brown, green (no white)", "Light long-sleeve shirts for sun/mosquitoes", "Light trousers and shorts", "Light jacket (mornings are cool)", "Wide-brimmed hat", "Comfortable walking shoes"] },
              { title: "Gear", icon: "📷", items: ["Binoculars (10x42 recommended)", "Camera with 200-400mm zoom", "Extra batteries and memory cards", "Sunscreen SPF 50+", "Dust-resistant camera bag", "Daypack for game drives"] },
              { title: "Essentials", icon: "💊", items: ["Personal medications", "Reusable water bottle", "Insect repellent (DEET 30%+)", "Lip balm and moisturizer", "Basic first-aid kit", "Travel insurance details"] },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((thing, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
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

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about Masai Mara migration safaris</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "When is the Great Wildebeest Migration in Masai Mara?", a: "The dramatic Mara River crossings peak from July to October when approximately 1.5 million wildebeest cross from Tanzania's Serengeti into Kenya's Masai Mara. The exact timing varies year to year — typically the first crossings begin in July, with the most intense activity in August and September." },
              { q: "How much does a Masai Mara migration safari cost?", a: `Our Masai Mara migration safari packages start from $${TOURS_MIN} per person for budget group tours. Mid-range lodge safaris begin around $1,100, while luxury options start from $1,800. All packages include 4x4 transport from Nairobi, park fees, accommodation, meals, and professional guiding.` },
              { q: "What makes the Mara River crossings so special?", a: "The Mara River crossings are considered one of the most dramatic wildlife spectacles on Earth. Hundreds of thousands of wildebeest plunge into crocodile-infested waters, creating a frenzied scramble that draws predators from both banks. Watching a herd of 10,000+ wildebeest take the leap while crocodiles strike is raw nature at its most visceral." },
              { q: "Can I see the migration with a limited budget?", a: `Absolutely — budget migration safari packages start from $${TOURS_MIN} per person. These shared group tours (4-12 travelers) include comfortable tented camp accommodation, all meals, park fees, and professional guiding. The wildlife viewing — including river crossings — is identical to premium packages.` },
              { q: "Are there wheelchair-accessible migration safaris?", a: "Yes — we offer fully wheelchair-accessible migration safaris starting from $850 per person. Our accessible tours feature vehicles with ramps and lifts, wheelchair-friendly camps with adapted bathrooms, and guides trained in disability assistance. The wildlife viewing is identical to our standard tours." },
              { q: "How many days do I need for a migration safari?", a: "A minimum of 2 days allows you to witness crossing events if timing is right, but we recommend 3-5 days for a proper migration safari. This gives you multiple crossing opportunities, time to explore different areas, and better chances of predator action. Our 5-7 day packages combine Masai Mara with Lake Nakuru, Amboseli, or Naivasha." },
              { q: "What is the success rate for seeing river crossings?", a: "During peak season (July-October), our guides achieve approximately 85-90% success rate for witnessing significant crossing events. Success depends on timing — our guides monitor crossing points in real-time and position guests optimally." },
              { q: "Is the migration safari suitable for families with children?", a: "Yes — children aged 8+ can join our migration safari packages. The excitement of witnessing the migration is unmatched education for young wildlife enthusiasts. We offer family-friendly accommodation and private vehicles for families who want to set their own pace." },
              { q: "What's the difference between standard and accessible migration tours?", a: "Standard tours use traditional 4x4 Land Cruisers with pop-top roofs. Accessible tours additionally feature wheelchair ramp/lift access, wider interiors, adapted tents with roll-in showers, and guides trained in disability assistance. Both use the same parks, wildlife, and expert guides." },
              { q: "How far in advance should I book a migration safari?", a: "For peak season (July-October), book 3-4 months ahead to secure preferred dates and accommodation. Peak camps fill 6+ months in advance. For green season (November-March), 2-4 weeks is often sufficient." },
              { q: "What should I pack for a migration safari?", a: "Pack light neutral-colored clothing (khaki, brown, green — avoid white and bright colors), layers for cool mornings, binoculars (10x42 recommended), a camera with 200-400mm zoom, sunscreen SPF 50+, a wide-brimmed hat, comfortable walking shoes, and personal medications." },
              { q: "Why choose a group joining migration safari?", a: "Group joining migration safaris offer the best value — shared costs reduce individual prices by 30-50% compared to private tours. You will meet fellow wildlife enthusiasts, share the excitement of witnessing crossings, and build friendships that often last beyond the safari." },
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-amber-600 transition">{faq.q}</summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-700 via-orange-700 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold">Ready to Witness the World&apos;s Greatest Migration?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
            Watch 1.5 million wildebeest cross the crocodile-infested Mara River. Masai Mara migration safari packages from ${TOURS_MIN}/person — all-inclusive. Wheelchair-accessible options available.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100 text-lg px-10 py-7 font-semibold" asChild>
              <Link href="/contact">Book Your Migration Safari Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-10 py-7" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <span className="flex items-center gap-2"><Phone size={16} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={16} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Responds within 2 hours</span>
            <span className="flex items-center gap-2"><Shield size={16} /> Best Price Guarantee</span>
          </div>
        </div>
      </section>

      {/* BOTTOM LINKS */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Explore more Kenya safari options</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="sm"><Link href="/budget-tours">All Budget Safaris</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/budget-masai-mara-safari">Masai Mara Budget Tours</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/flamingo-safari-tours">Flamingo Safaris</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/accessible-migration">Accessible Migration</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/short-safaris">Short Safaris</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}