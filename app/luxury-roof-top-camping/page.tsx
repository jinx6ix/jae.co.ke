import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Roof-Top Camping | JAE Travel",
  description: "Sleep under a blanket of stars in Kenya’s wilderness, where luxury roof-top tents blend adventure with indulgence.",
  keywords: ["Luxury Camping", "Kenya Adventure", "Roof-Top Tents", "Safari Glamping"],
};

export default function LuxuryCampingPage() {
  const product = products.find((p) => p.slug === "luxury-roof-top-camping");

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-12">
        <Image
          src={product.heroImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 animate-in fade-in duration-1000">
          <h1 className="mb-3 font-serif text-5xl font-bold text-white drop-shadow-lg animate-in slide-in-from-bottom-4">
            {product.name}
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl animate-in slide-in-from-bottom-4 delay-200">
            {product.description}
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="prose mx-auto max-w-3xl mb-12">
        <h2 className="font-serif text-3xl font-bold mb-6 text-center">What You’ll Experience</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {product.highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-muted-foreground bg-muted/50 p-4 rounded-lg transition-all hover:bg-muted hover:shadow-md"
            >
              <span className="text-primary">✨</span> {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Details Section */}
      <div className="prose mx-auto max-w-3xl mb-12">
        <h2 className="font-serif text-3xl font-bold mb-4">Your Adventure Awaits</h2>
        <p className="text-muted-foreground leading-relaxed">{product.details}</p>
      </div>

      {/* Testimonial Section */}
      <div className="rounded-2xl bg-muted/50 p-8 mb-12 text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">What Travelers Say</h2>
        <blockquote className="italic text-muted-foreground max-w-xl mx-auto">
          “Camping under the stars in luxury tents was pure magic. The best way to experience Kenya’s wilderness!”
        </blockquote>
        <p className="mt-2 text-sm font-semibold">— Emma L., Glamping Enthusiast</p>
      </div>

      {/* CTA Section */}
      <div className="mt-12 rounded-2xl bg-primary/10 p-8 text-center animate-in zoom-in duration-500">
        <h2 className="mb-4 font-serif text-3xl font-bold text-primary">Ready for the Journey?</h2>
        <p className="mx-auto mb-6 max-w-xl text-muted-foreground leading-relaxed">
          Don’t just dream of adventure—live it! Book your luxury roof-top camping experience today.
        </p>
        <Button
          asChild
          size="lg"
          className="group bg-primary text-white hover:bg-primary/90 transition-all duration-300"
        >
          <Link href="/contact">
            {product.ctaText} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}