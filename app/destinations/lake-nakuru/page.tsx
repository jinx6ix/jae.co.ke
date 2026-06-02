import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tours } from "@/lib/tours-data";
import { MapPin, Clock, Star, Shield, ArrowRight, Camera, Calendar, CheckCircle, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Lake Nakuru National Park Safari | Kenya Tours",
  description: "Witness spectacular flamingo migrations and rhino sightings at Lake Nakuru National Park. Experience one of Kenya's finest rhino conservation areas with stunning lake views.",
  keywords: ["lake nakuru national park", "kenya safari", "flamingos", "rhino sanctuary", "bird watching", "lake nakuru tours"],
  openGraph: {
    title: "Lake Nakuru National Park Safari | Kenya Tours",
    description: "Witness spectacular flamingo migrations and rhino sightings at Lake Nakuru National Park. Experience one of Kenya's finest rhino conservation areas with stunning lake views.",
    url: `${BASE}/destinations/lake-nakuru`,
    siteName: "JaeTravel Expeditions",
    type: "website",
    images: [{ url: `${BASE}/lake-nakuru-flamingos-in-red-sunset-590x390.jpg`, width: 1200, height: 630, alt: "Lake Nakuru National Park" }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lake Nakuru National Park Safari | Kenya Tours",
    description: "Witness spectacular flamingo migrations and rhino sightings at Lake Nakuru National Park. Experience one of Kenya's finest rhino conservation areas with stunning lake views.",
    images: [`${BASE}/lake-nakuru-flamingos-in-red-sunset-590x390.jpg`],
  },
  alternates: {
    canonical: `${BASE}/destinations/lake-nakuru`,
    languages: { 'en': `${BASE}/destinations/lake-nakuru`, 'x-default': `${BASE}/destinations/lake-nakuru` },
  },
};

const BASE = "https://www.jaetravel.co.ke";
const destinationData = {
  name: "Lake Nakuru National Park",
  country: "Kenya",
  tagline: "Flamingo Paradise - Kenya's Premier Rhino Sanctuary",
  heroImage: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg",
  description: "Lake Nakuru National Park is a stunning soda lake surrounded by parkland and forest, famous for its millions of flamingos that create a pink fringe along the lake's edges. The park is also one of Kenya's premier rhino conservation areas, providing sanctuary for both black and white rhinos.",
  highlights: ["Millions of flamingos", "Black & white rhinos", "Leopard sightings", "Baboon cliffs", "Makalia Falls", "Tree leopard"],
  wildlife: ["Rhinos", "Lions", "Leopards", "Buffalo", "Warthogs", "Flamingos", "Baboons", "Giraffes"],
  bestTime: "Year-round, flamingos best June-October",
  activities: ["Game Drives", "Bird Watching", "Photography", "Nature Walks"],
  parkFees: "Adults: $60/day, Children: $35/day",
};

export default function LakeNakuruPage() {
  const relatedTours = tours.filter(t => t.title.toLowerCase().includes("nakuru") || t.description?.toLowerCase().includes("nakuru")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "TouristAttraction", name: destinationData.name, description: destinationData.description, image: `${BASE}${destinationData.heroImage}`, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "287" } };

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
        <div className="flex flex-col items-center"><MapPin className="h-6 w-6 mb-2" /><span className="text-sm">Kenya</span></div>
        <div className="flex flex-col items-center"><Clock className="h-6 w-6 mb-2" /><span className="text-sm">Year-round</span></div>
        <div className="flex flex-col items-center"><Star className="h-6 w-6 mb-2" /><span className="text-sm">4.8/5</span></div>
        <div className="flex flex-col items-center"><Shield className="h-6 w-6 mb-2" /><span className="text-sm">Safe</span></div>
      </div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="grid md:grid-cols-2 gap-12 items-center">
        <div><h2 className="text-4xl font-bold mb-6 font-serif">About {destinationData.name}</h2><p className="text-lg text-muted-foreground leading-relaxed">{destinationData.description}</p></div>
        <div className="relative h-[400px] rounded-xl overflow-hidden"><Image src={destinationData.heroImage} alt={destinationData.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Highlights</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{destinationData.highlights.map((h, i) => (<Card key={i} className="bg-card"><CardContent className="p-6 flex items-start gap-4"><CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span className="text-lg">{h}</span></CardContent></Card>))}</div></div></section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Wildlife</h2><div className="flex flex-wrap justify-center gap-4">{destinationData.wildlife.map((a, i) => (<span key={i} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-medium">{a}</span>))}</div></div></section>
      <section className="py-16 bg-muted/30"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Safari Info</h2><div className="grid md:grid-cols-3 gap-8">
        <Card><CardContent className="p-6"><Calendar className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Best Time</h3><p className="text-muted-foreground">{destinationData.bestTime}</p></CardContent></Card>
        <Card><CardContent className="p-6"><Camera className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Activities</h3><ul className="space-y-2">{destinationData.activities.map((a, i) => (<li key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /><span>{a}</span></li>))}</ul></CardContent></Card>
        <Card><CardContent className="p-6"><Phone className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">Park Fees</h3><p className="text-muted-foreground">{destinationData.parkFees}</p></CardContent></Card>
      </div></div></section>
      {relatedTours.length > 0 && <section className="py-16 bg-background"><div className="container mx-auto px-4"><h2 className="text-4xl font-bold text-center mb-12 font-serif">Tours</h2><div className="grid md:grid-cols-3 gap-8">{relatedTours.map((tour) => (<Card key={tour.id} className="overflow-hidden hover:shadow-lg transition"><div className="relative h-[200px]"><Image src={tour.image || "/placeholder.jpg"} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-6"><h3 className="text-xl font-bold mb-2">{tour.title}</h3><div className="flex items-center justify-between"><span className="text-2xl font-bold text-primary">${tour.price}</span><Button asChild size="sm"><Link href={`/tour/${tour.slug}`}>View <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></CardContent></Card>))}</div></div></section>}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Ready for Lake Nakuru?</h2>
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