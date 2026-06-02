import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tours } from "@/lib/tours-data";
import { MapPin, Clock, Star, Shield, ArrowRight, Camera, Calendar, CheckCircle, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Volcanoes National Park Gorilla Trekking | Rwanda Tours",
  description: "Trek mountain gorillas in Rwanda's Volcanoes National Park, home to Dian Fossey's research center. Experience golden monkeys and unforgettable gorilla encounters in the land of a thousand hills.",
  keywords: ["volcanoes national park", "rwanda gorilla trekking", "golden monkeys", "dian fossey", "volcanoes tours", "rwanda safari"],
  openGraph: {
    title: "Volcanoes National Park Gorilla Trekking | Rwanda Tours",
    description: "Trek mountain gorillas in Rwanda's Volcanoes National Park, home to Dian Fossey's research center. Experience golden monkeys and unforgettable gorilla encounters in the land of a thousand hills.",
    url: `${BASE}/destinations/volcanoes`,
    siteName: "JaeTravel Expeditions",
    type: "website",
    images: [{ url: `${BASE}/Volcanoes-National-Park-Rwanda-Natural-World-Kenya-Safaris.jpg`, width: 1200, height: 630, alt: "Volcanoes National Park" }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volcanoes National Park Gorilla Trekking | Rwanda Tours",
    description: "Trek mountain gorillas in Rwanda's Volcanoes National Park, home to Dian Fossey's research center. Experience golden monkeys and unforgettable gorilla encounters in the land of a thousand hills.",
    images: [`${BASE}/Volcanoes-National-Park-Rwanda-Natural-World-Kenya-Safaris.jpg`],
  },
  alternates: {
    canonical: `${BASE}/destinations/volcanoes`,
    languages: { 'en': `${BASE}/destinations/volcanoes`, 'x-default': `${BASE}/destinations/volcanoes` },
  },
};

const BASE = "https://www.jaetravel.co.ke";
const destinationData = {
  name: "Volcanoes National Park",
  country: "Rwanda",
  tagline: "Where Dian Fossey Studied Gorillas - Life-Changing Encounters",
  heroImage: "/Volcanoes-National-Park-Rwanda-Natural-World-Kenya-Safaris.jpg",
  description: "Volcanoes National Park in Rwanda is the most visited gorilla trekking destination in Africa. Made famous by Dian Fossey's groundbreaking research, the park offers the chance to trek through misty volcanic mountains and spend precious time with mountain gorilla families.",
  highlights: ["Mountain gorilla trekking", "Golden monkey tracking", "Dian Fossey's legacy", "Bisoke summit hikes", "Musanze Caves", "Community tours"],
  wildlife: ["Mountain Gorillas", "Golden Monkeys", "Buffalo", "Elephants", "Hyenas", "Duikers"],
  bestTime: "June-September & December-March (dry seasons)",
  activities: ["Gorilla Trekking", "Golden Monkey Trek", "Volcano Hikes", "Cave Tours", "Cultural Experiences"],
  parkFees: "Gorilla permit: $1,500/person",
};

export default function VolcanoesPage() {
  const relatedTours = tours.filter(t => t.title.toLowerCase().includes("volcano") || t.description?.toLowerCase().includes("volcano") || t.title.toLowerCase().includes("rwanda")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "TouristAttraction", name: destinationData.name, description: destinationData.description, image: `${BASE}${destinationData.heroImage}`, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "267" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src={destinationData.heroImage} alt={destinationData.name} fill className="object-cover brightness-50" priority sizes="100vw" /></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <p className="text-sm uppercase tracking-widest mb-4 text-primary-foreground/80">{destinationData.country}</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">{destinationData.name}</h1>
          <p className="text-2xl md:text-3xl mb-8 text-primary-foreground/90">{destinationData.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg"><Link href="/tours">View Tours</Link></Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary"><Link href="/contact">Get Quote</Link></Button>
          </div>
        </div>
      </section>
      <section className="bg-primary text-primary-foreground py-6"><div className="container mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center"><MapPin className="h-6 w-6 mb-2" /><span className="text-sm">Rwanda</span></div>
        <div className="flex flex-col items-center"><Clock className="h-6 w-6 mb-2" /><span className="text-sm">4-6hr treks</span></div>
        <div className="flex flex-col items-center"><Star className="h-6 w-6 mb-2" /><span className="text-sm">4.9/5</span></div>
        <div className="flex flex-col items-center"><Shield className="h-6 w-6 mb-2" /><span className="text-sm">UNESCO</span></div>
      </div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="grid md:grid-cols-2 gap-12 items-center">
        <div><h2 className="text-4xl font-bold mb-6 font-serif">About {destinationData.name}</h2><p className="text-lg text-muted-foreground leading-relaxed mb-6">{destinationData.description}</p><p className="text-lg text-muted-foreground leading-relaxed">Covering 160 square kilometers of volcanic mountain slopes, the park is part of the Virunga Mountains range. Gorilla families here have been habituated, allowing visitors the extraordinary experience of spending one hour observing them up close.</p></div>
        <div className="relative h-[400px] rounded-xl overflow-hidden"><Image src={destinationData.heroImage} alt={destinationData.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Highlights</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{destinationData.highlights.map((h, i) => (<Card key={i} className="bg-card"><CardContent className="p-6 flex items-start gap-4"><CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span className="text-lg">{h}</span></CardContent></Card>))}</div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Wildlife</h2><div className="flex flex-wrap justify-center gap-4">{destinationData.wildlife.map((a, i) => (<span key={i} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-medium">{a}</span>))}</div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Safari Info</h2><div className="grid md:grid-cols-3 gap-8">
        <Card><CardContent className="p-6"><Calendar className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Best Time</h3><p className="text-muted-foreground">{destinationData.bestTime}</p></CardContent></Card>
        <Card><CardContent className="p-6"><Camera className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Activities</h3><ul className="space-y-2">{destinationData.activities.map((a, i) => (<li key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /><span>{a}</span></li>))}</ul></CardContent></Card>
        <Card><CardContent className="p-6"><Phone className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Permit Cost</h3><p className="text-muted-foreground">{destinationData.parkFees}</p></CardContent></Card>
      </div></div></section>
      {relatedTours.length > 0 && <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Rwanda Tours</h2><div className="grid md:grid-cols-3 gap-8">{relatedTours.map((tour) => (<Card key={tour.id} className="overflow-hidden hover:shadow-lg transition"><div className="relative h-[200px]"><Image src={tour.image || "/placeholder.jpg"} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-6"><h3 className="text-xl font-bold mb-2">{tour.title}</h3><div className="flex items-center justify-between"><span className="text-2xl font-bold text-primary">${tour.price}</span><Button asChild size="sm"><Link href={`/tour/${tour.slug}`}>View <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></CardContent></Card>))}</div></div></section>}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Ready for Rwanda Gorillas?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">Book permits early - they sell out 3-6 months in advance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg"><Link href="/tours">View Tours</Link></Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary"><a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer"><Phone className="mr-2 h-5 w-5" /> WhatsApp</a></Button>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm"><span><Phone size={16} /> +254 726 485 228</span><span><Mail size={16} /> info@jaetravel.co.ke</span></div>
        </div>
      </section>
    </>
  );
}