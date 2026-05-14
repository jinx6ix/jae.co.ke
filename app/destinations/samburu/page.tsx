import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tours } from "@/lib/tours-data";
import { MapPin, Clock, Star, Shield, ArrowRight, Camera, Calendar, CheckCircle, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Samburu National Reserve Safari | Kenya Tours",
  description: "Discover rare wildlife in Samburu including Grevy's zebras, reticulated giraffes, and the Big Five. Experience Kenya's northern safari wilderness with unique species found nowhere else in Africa.",
  keywords: ["samburu national reserve", "kenya safari", "grevy zebra", "reticulated giraffe", "northern kenya", "samburu tours"],
};

const BASE = "https://www.jaetravel.co.ke";

const destinationData = {
  name: "Samburu National Reserve",
  country: "Kenya",
  tagline: "Northern Kenya's Wildlife Paradise - Home to Rare Species",
  heroImage: "/Samburu_National_Reserve,_Kenya-26December2012.jpg",
  description: "Samburu National Reserve offers a unique safari experience in Kenya's northern region. The reserve is famous for its rare wildlife species including Grevy's zebras, reticulated giraffes, Beisa oryx, and the gerenuk antelope - species found almost exclusively in this region.",
  highlights: [
    "Rare Grevy's zebras (endangered)",
    "Reticulated giraffes",
    "Beisa oryx (endemic)",
    "Gerenuk antelope",
    "Less crowded than southern parks",
    "Stunning Ewaso Ng'iro River",
  ],
  wildlife: ["Elephants", "Lions", "Cheetahs", "Leopards", "Grevy's Zebras", "Reticulated Giraffes", "Gerenuk", "Beisa Oryx", "Hippos"],
  bestTime: "Year-round, best June-October",
  activities: ["Game Drives", "Bird Watching", "Photography", "Cultural Visits", "River Walks"],
  parkFees: "Adults: $70/day, Children: $35/day",
};

export default function SamburuPage() {
  const relatedTours = tours.filter(t => t.title.toLowerCase().includes("samburu") || t.description?.toLowerCase().includes("samburu")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "TouristAttraction", name: destinationData.name, description: destinationData.description, image: `${BASE}${destinationData.heroImage}`, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "156" } };

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
            <Button asChild size="lg" className="text-lg"><Link href="/tours">View Samburu Tours</Link></Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary"><Link href="/contact">Get Custom Quote</Link></Button>
          </div>
        </div>
      </section>
      <section className="bg-primary text-primary-foreground py-6"><div className="container mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center"><MapPin className="h-6 w-6 mb-2" /><span className="text-sm">Kenya</span></div>
        <div className="flex flex-col items-center"><Clock className="h-6 w-6 mb-2" /><span className="text-sm">Year-round</span></div>
        <div className="flex flex-col items-center"><Star className="h-6 w-6 mb-2" /><span className="text-sm">4.9/5 Rating</span></div>
        <div className="flex flex-col items-center"><Shield className="h-6 w-6 mb-2" /><span className="text-sm">Safe Safari</span></div>
      </div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="grid md:grid-cols-2 gap-12 items-center">
        <div><h2 className="text-4xl font-bold mb-6 font-serif">About {destinationData.name}</h2><p className="text-lg text-muted-foreground leading-relaxed mb-6">{destinationData.description}</p><p className="text-lg text-muted-foreground leading-relaxed">Located in Kenya's remote north, Samburu offers an authentic safari experience away from crowds. The Ewaso Ng'iro River provides vital water for wildlife, creating excellent game viewing opportunities around its banks.</p></div>
        <div className="relative h-[400px] rounded-xl overflow-hidden"><Image src={destinationData.heroImage} alt={`${destinationData.name}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Safari Highlights</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{destinationData.highlights.map((highlight, i) => (<Card key={i} className="bg-card"><CardContent className="p-6 flex items-start gap-4"><CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span className="text-lg">{highlight}</span></CardContent></Card>))}</div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Wildlife You May See</h2><div className="flex flex-wrap justify-center gap-4">{destinationData.wildlife.map((animal, i) => (<span key={i} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-medium">{animal}</span>))}</div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Safari Information</h2><div className="grid md:grid-cols-3 gap-8">
        <Card><CardContent className="p-6"><div className="flex items-center gap-3 mb-4"><Calendar className="h-8 w-8 text-primary" /><h3 className="text-xl font-bold">Best Time</h3></div><p className="text-muted-foreground">{destinationData.bestTime}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3 mb-4"><Camera className="h-8 w-8 text-primary" /><h3 className="text-xl font-bold">Activities</h3></div><ul className="space-y-2">{destinationData.activities.map((activity, i) => (<li key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /><span>{activity}</span></li>))}</ul></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3 mb-4"><Phone className="h-8 w-8 text-primary" /><h3 className="text-xl font-bold">Park Fees</h3></div><p className="text-muted-foreground">{destinationData.parkFees}</p></CardContent></Card>
      </div></div></section>
      {relatedTours.length > 0 && <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Samburu Safari Packages</h2><div className="grid md:grid-cols-3 gap-8">{relatedTours.map((tour) => (<Card key={tour.id} className="overflow-hidden hover:shadow-lg transition"><div className="relative h-[200px]"><Image src={tour.image || "/placeholder.jpg"} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-6"><h3 className="text-xl font-bold mb-2">{tour.title}</h3><p className="text-muted-foreground mb-4 line-clamp-2">{tour.description}</p><div className="flex items-center justify-between"><span className="text-2xl font-bold text-primary">${tour.price}</span><Button asChild size="sm"><Link href={`/tour/${tour.slug}`}>View Tour <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></CardContent></Card>))}</div></div></section>}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Ready for Your Samburu Safari?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">Discover Kenya's rare wildlife with our expert guides.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg"><Link href="/tours">View All Tours</Link></Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary"><a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer"><Phone className="mr-2 h-5 w-5" /> WhatsApp Us</a></Button>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm"><span className="flex items-center gap-2"><Phone size={16} /> +254 726 485 228</span><span className="flex items-center gap-2"><Mail size={16} /> info@jaetravel.co.ke</span></div>
        </div>
      </section>
    </>
  );
}