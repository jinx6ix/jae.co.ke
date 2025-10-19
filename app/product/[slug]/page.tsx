import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Adventure Not Found | Jae Travel Expeditions",
      description: "The journey you seek isn’t here, but let’s find your next adventure with Jae Travel Expeditions!",
      keywords: ["safari", "adventure", "East Africa", "travel"],
    };
  }

  return {
    title: `${product.metaTitle} | Jae Travel Expeditions`,
    description: product.metaDescription,
    keywords: product.keywords,
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-16 shadow-2xl">
        <Image
          src={product.heroImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 animate-in fade-in duration-1000">
          <h1 className="mb-4 font-serif text-4xl md:text-6xl font-bold text-white drop-shadow-xl animate-in slide-in-from-bottom-4">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl animate-in slide-in-from-bottom-4 delay-200">
            {product.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-white">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/50"}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="prose mx-auto max-w-4xl mb-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
          Your Adventure Awaits
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">{product.details}</p>
      </div>

      {/* Highlights Section */}
      <div className="prose mx-auto max-w-4xl mb-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          Why This Journey?
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {product.highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-muted-foreground bg-muted/30 p-6 rounded-xl shadow-md transition-all hover:bg-muted hover:shadow-lg"
            >
              <span className="text-primary text-2xl">✨</span>
              <span className="text-base font-medium">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Itinerary Section */}
      <div className="prose mx-auto max-w-4xl mb-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          Your Itinerary
        </h2>
        <ol className="space-y-4">
          {product.itinerary.map((item, index) => (
            <li
              key={index}
              className="flex gap-4 items-start bg-muted/20 p-6 rounded-xl transition-all hover:bg-muted hover:shadow-md"
            >
              <span className="text-primary font-bold text-lg">{index + 1}.</span>
              <span className="text-muted-foreground text-base">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Included/Excluded Section */}
      <div className="prose mx-auto max-w-4xl mb-16 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold mb-4 text-primary">What’s Included</h3>
          <ul className="space-y-2">
            {product.included.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✔</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold mb-4 text-primary">What’s Excluded</h3>
          <ul className="space-y-2">
            {product.excluded.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <span className="text-red-500">✘</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Details Section */}
      <div className="prose mx-auto max-w-4xl mb-16 bg-muted/50 p-8 rounded-2xl shadow-lg">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
          Trip Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <p><strong>Duration:</strong> {product.duration}</p>
          <p><strong>Difficulty:</strong> {product.difficulty}</p>
          <p><strong>Group Size:</strong> {product.groupSize}</p>
          <p><strong>Category:</strong> {product.category}</p>
          {product.price > 0 && (
            <p>
              <strong>Price:</strong> {product.currency} {product.price.toLocaleString()}
              {product.slug === "toyota-prado" ? " per day" : ""}
            </p>
          )}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="rounded-2xl bg-primary/10 p-8 md:p-12 mb-16 text-center shadow-md">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-primary">
          What Travelers Say
        </h2>
        <blockquote className="italic text-muted-foreground text-lg max-w-2xl mx-auto">
          “This was the trip of a lifetime! The landscapes, wildlife, and guides brought East Africa’s magic to life.”
        </blockquote>
        <p className="mt-4 text-sm font-semibold text-primary">— Sarah M., Adventure Seeker</p>
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 p-8 md:p-12 text-center animate-in zoom-in duration-700">
        <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-primary">
          Ready for Your {product.name} Adventure?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Don’t just dream of adventure—live it! Let our experts craft your unforgettable {product.name} experience.
        </p>
        <Button
          asChild
          size="lg"
          className="group bg-primary text-white hover:bg-primary/90 transition-all duration-300 text-lg px-8 py-3 rounded-full"
        >
          <Link href="/contact">
            {product.ctaText} <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}