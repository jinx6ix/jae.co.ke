import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tours } from "@/lib/tours-data";
import { MapPin, Clock, Star, Shield, ArrowRight, Camera, Calendar, CheckCircle, Phone, Mail } from "lucide-react";

const BASE = "https://www.jaetravel.co.ke";

export const metadata: Metadata = {
  title: "Ngorongoro Conservation Area Safari | Tanzania Tours",
  description: "Explore Ngorongoro Crater, the world's largest inactive volcanic caldera. Experience incredible wildlife density and stunning views in this UNESCO World Heritage Site.",
  keywords: ["ngorongoro crater", "tanzania safari", "caldera", "big five", "ngorongoro conservation", "tanzania tours"],
  openGraph: {
    title: "Ngorongoro Conservation Area Safari | Tanzania Tours",
    description: "Explore Ngorongoro Crater, the world's largest inactive volcanic caldera. Experience incredible wildlife density and stunning views in this UNESCO World Heritage Site.",
    url: `${BASE}/destinations/ngorongoro`,
    siteName: "JaeTravel Expeditions",
    type: "website",
    images: [{ url: `${BASE}/ngorongoro-header-3.jpg`, width: 1200, height: 630, alt: "Ngorongoro Conservation Area" }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngorongoro Conservation Area Safari | Tanzania Tours",
    description: "Explore Ngorongoro Crater, the world's largest inactive volcanic caldera. Experience incredible wildlife density and stunning views in this UNESCO World Heritage Site.",
    images: [`${BASE}/ngorongoro-header-3.jpg`],
  },
  alternates: {
    canonical: `${BASE}/destinations/ngorongoro`,
    languages: { 'en': `${BASE}/destinations/ngorongoro`, 'x-default': `${BASE}/destinations/ngorongoro` },
  },
};

const destinationData = {
  name: "Ngorongoro Conservation Area",
  country: "Tanzania",
  tagline: "World's Largest Caldera - Wildlife Heaven",
  heroImage: "/ngorongoro-header-3.jpg",
  description: "Ngorongoro is a UNESCO World Heritage Site and one of Africa's natural wonders. The crater, a massive collapsed volcano, creates a unique ecosystem supporting one of the highest concentrations of wildlife in Africa. This is often called the 'Eighth Wonder of the World'.",
  highlights: ["World's largest caldera", "Highest wildlife density", "Big Five in one day", "Stunning panoramic views", "Maasai culture", "Lake Magadi flamingos"],
  wildlife: ["Lions", "Leopards", "Cheetahs", "Elephants", "Buffalo", "Rhino", "Hippo", "Flamingos", "Hyenas"],
  bestTime: "Year-round, best June-October",
  activities: ["Game Drives", "Crater Floor Safari", "Photography", "Cultural Visits", "Walking Safaris"],
  parkFees: "Adults: $70/day, Conservation fee: $35/day",
};

export default function NgorongoroPage() {
  const relatedTours = tours.filter(t => t.title.toLowerCase().includes("ngorongoro") || t.description?.toLowerCase().includes("ngorongoro")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "TouristAttraction", name: destinationData.name, description: destinationData.description, image: `${BASE}${destinationData.heroImage}`, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "423" } };

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
        <div className="flex flex-col items-center"><MapPin className="h-6 w-6 mb-2" /><span className="text-sm">Tanzania</span></div>
        <div className="flex flex-col items-center"><Clock className="h-6 w-6 mb-2" /><span className="text-sm">Year-round</span></div>
        <div className="flex flex-col items-center"><Star className="h-6 w-6 mb-2" /><span className="text-sm">4.9/5</span></div>
        <div className="flex flex-col items-center"><Shield className="h-6 w-6 mb-2" /><span className="text-sm">UNESCO</span></div>
      </div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="grid md:grid-cols-2 gap-12 items-center">
        <div><h2 className="text-4xl font-bold mb-6 font-serif">About {destinationData.name}</h2><p className="text-lg text-muted-foreground leading-relaxed mb-6">{destinationData.description}</p><p className="text-lg text-muted-foreground leading-relaxed">The crater spans 610 meters deep and 19 kilometers across. Its steep walls create a natural enclosure, concentrating wildlife in a relatively small area. You can often spot all members of the Big Five within a single game drive.</p></div>
        <div className="relative h-[400px] rounded-xl overflow-hidden"><Image src={destinationData.heroImage} alt={destinationData.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Highlights</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{destinationData.highlights.map((h, i) => (<Card key={i} className="bg-card"><CardContent className="p-6 flex items-start gap-4"><CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span className="text-lg">{h}</span></CardContent></Card>))}</div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Wildlife</h2><div className="flex flex-wrap justify-center gap-4">{destinationData.wildlife.map((a, i) => (<span key={i} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-medium">{a}</span>))}</div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Safari Info</h2><div className="grid md:grid-cols-3 gap-8">
        <Card><CardContent className="p-6"><Calendar className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Best Time</h3><p className="text-muted-foreground">{destinationData.bestTime}</p></CardContent></Card>
        <Card><CardContent className="p-6"><Camera className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Activities</h3><ul className="space-y-2">{destinationData.activities.map((a, i) => (<li key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /><span>{a}</span></li>))}</ul></CardContent></Card>
        <Card><CardContent className="p-6"><Phone className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Park Fees</h3><p className="text-muted-foreground">{destinationData.parkFees}</p></CardContent></Card>
      </div></div></section>
      {relatedTours.length > 0 && <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Ngorongoro Tours</h2><div className="grid md:grid-cols-3 gap-8">{relatedTours.map((tour) => (<Card key={tour.id} className="overflow-hidden hover:shadow-lg transition"><div className="relative h-[200px]"><Image src={tour.image || "/placeholder.jpg"} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-6"><h3 className="text-xl font-bold mb-2">{tour.title}</h3><div className="flex items-center justify-between"><span className="text-2xl font-bold text-primary">${tour.price}</span><Button asChild size="sm"><Link href={`/tour/${tour.slug}`}>View <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></CardContent></Card>))}</div></div></section>}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Ready for Ngorongoro?</h2>
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