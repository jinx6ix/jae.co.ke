import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Auteur Introuvable",
      description: "L’auteur que vous cherchez n’est pas ici, mais découvrez d’autres histoires incroyables !",
    };
  }

  return {
    title: `${product.name} | JAE Travel`,
    description: product.description,
    keywords: product.keywords,
  };
}

export default function AuthorPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

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
        <h2 className="font-serif text-3xl font-bold mb-6 text-center">Pourquoi Voyager avec Kevin</h2>
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
        <h2 className="font-serif text-3xl font-bold mb-4">L’Histoire de Ian Iraya</h2>
        <p className="text-muted-foreground leading-relaxed">{product.details}</p>
      </div>

      {/* Testimonial Section */}
      <div className="rounded-2xl bg-muted/50 p-8 mb-12 text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">Ce Que Disent les Voyageurs</h2>
        <blockquote className="italic text-muted-foreground max-w-xl mx-auto">
          “Kevin’s stories and expertise made our safari unforgettable. He’s a true East African legend!”
        </blockquote>
        <p className="mt-2 text-sm font-semibold">— Alex T., Safari Enthusiast</p>
      </div>

      {/* CTA Section */}
      <div className="mt-12 rounded-2xl bg-primary/10 p-8 text-center animate-in zoom-in duration-500">
        <h2 className="mb-4 font-serif text-3xl font-bold text-primary">Prêt à Découvrir avec Ian ?</h2>
        <p className="mx-auto mb-6 max-w-xl text-muted-foreground leading-relaxed">
          Contactez Ian pour planifier votre aventure unique en Afrique de l’Est.
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

export async function generateStaticParams() {
  return products
    .filter((product) => product.slug === "author-kevin")
    .map((product) => ({
      slug: product.slug,
    }));
}