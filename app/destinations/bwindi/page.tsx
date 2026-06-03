import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tours } from "@/lib/tours-data";
import { MapPin, Clock, Star, Shield, ArrowRight, Camera, Calendar, CheckCircle, Phone, Mail } from "lucide-react";

const BASE = "https://www.jaetravel.co.ke";

export const metadata: Metadata = {
  title: "Bwindi Impenetrable Forest Gorilla Trekking | Uganda Tours",
  description: "Trek mountain gorillas in Bwindi Impenetrable Forest, Uganda. Experience life-changing encounters with endangered mountain gorillas in one of Africa's oldest rainforests.",
  keywords: ["bwindi impenetrable forest", "uganda gorilla trekking", "mountain gorillas", "bwindi tours", "uganda safari", "gorilla permit"],
  alternates: {
    canonical: `${BASE}/destinations/bwindi`,
    languages: { 'en': `${BASE}/destinations/bwindi`, 'x-default': `${BASE}/destinations/bwindi` },
  },
  openGraph: {
    title: "Bwindi Impenetrable Forest Gorilla Trekking | Uganda Tours",
    description: "Trek mountain gorillas in Bwindi Impenetrable Forest, Uganda. Experience life-changing encounters with endangered mountain gorillas.",
    url: `${BASE}/destinations/bwindi`,
    siteName: "JaeTravel Expeditions",
    type: "website",
    images: [{ url: `${BASE}/bwindi-forest-uganda-gorilla-safaris.jpg`, width: 1200, height: 630, alt: "Bwindi Impenetrable Forest" }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bwindi Impenetrable Forest Gorilla Trekking | Uganda Tours",
    description: "Trek mountain gorillas in Bwindi Impenetrable Forest, Uganda. Experience life-changing encounters with endangered mountain gorillas.",
    images: [`${BASE}/bwindi-forest-uganda-gorilla-safaris.jpg`],
  },
};

const destinationData = {
  name: "Bwindi Impenetrable Forest",
  country: "Uganda",
  tagline: "Home to Half the World's Mountain Gorillas",
  heroImage: "/bwindi-forest-uganda-gorilla-safaris.jpg",
  description: "Bwindi Impenetrable Forest is a UNESCO World Heritage Site and one of the most biologically diverse areas on Earth. Home to approximately half of the world's remaining mountain gorillas, it offers one of the most profound wildlife experiences - a gorilla trek through dense, misty forest.",
  highlights: ["Mountain gorilla trekking", "Half world's population", "UNESCO site", "15 gorilla families", "Bird watching (350+ species)", "Nature walks"],
  wildlife: ["Mountain Gorillas", "Chimpanzees", "Baboons", "Colobus Monkeys", "Forest Elephants", "350+ bird species"],
  bestTime: "June-August & December-March (dry seasons)",
  activities: ["Gorilla Trekking", "Nature Walks", "Bird Watching", "Cultural Tours", "Batwa Experience"],
  parkFees: "Gorilla permit: $700/person",
};

export default function BwindiPage() {
  const relatedTours = tours.filter(t => t.title.toLowerCase().includes("bwindi") || t.description?.toLowerCase().includes("bwindi") || t.title.toLowerCase().includes("uganda")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "TouristAttraction", name: destinationData.name, description: destinationData.description, image: `${BASE}${destinationData.heroImage}`, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "312" } };

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
        <div className="flex flex-col items-center"><MapPin className="h-6 w-6 mb-2" /><span className="text-sm">Uganda</span></div>
        <div className="flex flex-col items-center"><Clock className="h-6 w-6 mb-2" /><span className="text-sm">6-8hr treks</span></div>
        <div className="flex flex-col items-center"><Star className="h-6 w-6 mb-2" /><span className="text-sm">4.9/5</span></div>
        <div className="flex flex-col items-center"><Shield className="h-6 w-6 mb-2" /><span className="text-sm">UNESCO</span></div>
      </div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="grid md:grid-cols-2 gap-12 items-center">
        <div><h2 className="text-4xl font-bold mb-6 font-serif">About {destinationData.name}</h2><p className="text-lg text-muted-foreground leading-relaxed mb-6">{destinationData.description}</p><p className="text-lg text-muted-foreground leading-relaxed">The forest is named for its thick, almost impenetrable vegetation. Trekking through Bwindi involves navigating steep, muddy slopes covered in dense vegetation. The reward is an hour with a gorilla family - a truly life-changing experience.</p></div>
        <div className="relative h-[400px] rounded-xl overflow-hidden"><Image src={destinationData.heroImage} alt={destinationData.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Highlights</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{destinationData.highlights.map((h, i) => (<Card key={i} className="bg-card"><CardContent className="p-6 flex items-start gap-4"><CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span className="text-lg">{h}</span></CardContent></Card>))}</div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Wildlife</h2><div className="flex flex-wrap justify-center gap-4">{destinationData.wildlife.map((a, i) => (<span key={i} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-medium">{a}</span>))}</div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Safari Info</h2><div className="grid md:grid-cols-3 gap-8">
        <Card><CardContent className="p-6"><Calendar className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Best Time</h3><p className="text-muted-foreground">{destinationData.bestTime}</p></CardContent></Card>
        <Card><CardContent className="p-6"><Camera className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Activities</h3><ul className="space-y-2">{destinationData.activities.map((a, i) => (<li key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /><span>{a}</span></li>))}</ul></CardContent></Card>
        <Card><CardContent className="p-6"><Phone className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Permit Cost</h3><p className="text-muted-foreground">{destinationData.parkFees}</p></CardContent></Card>
      </div></div></section>
      {relatedTours.length > 0 && <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Bwindi Tours</h2><div className="grid md:grid-cols-3 gap-8">{relatedTours.map((tour) => (<Card key={tour.id} className="overflow-hidden hover:shadow-lg transition"><div className="relative h-[200px]"><Image src={tour.image || "/placeholder.jpg"} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-6"><h3 className="text-xl font-bold mb-2">{tour.title}</h3><div className="flex items-center justify-between"><span className="text-2xl font-bold text-primary">${tour.price}</span><Button asChild size="sm"><Link href={`/tour/${tour.slug}`}>View <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></CardContent></Card>))}</div></div></section>}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Ready for Gorilla Trekking?</h2>
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