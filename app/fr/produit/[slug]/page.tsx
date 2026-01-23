import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, XCircle, Clock, DollarSign, Users, MapPin } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Aventure Introuvable",
      description: "Le voyage que vous cherchez n’est pas ici, mais trouvons votre prochaine aventure !",
    };
  }

  return {
    title: product.metaTitle || `${product.name} | JAETravel Expeditions`,
    description: product.metaDescription || product.description,
    keywords: product.keywords?.join(", "),
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      images: [{ url: product.heroImage }],
    },
    alternates: {
      canonical: `https://www.jaetravel.co.ke/fr/produit/${params.slug}`,
      languages: {
        'fr-FR': `https://www.jaetravel.co.ke/fr/produit/${params.slug}`,
        'en-US': `https://www.jaetravel.co.ke/product/${params.slug}`,
        'x-default': `https://www.jaetravel.co.ke/product/${params.slug}`,
      },
    },
  };
}

export default function FrenchProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Inside your FrenchProductPage component
const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.metaDescription || product.description,
  "image": product.heroImage,
  "brand": {
    "@type": "Brand",
    "name": "JAE Travel"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": product.currency,
    "price": product.price,
    "availability": "https://schema.org/InStock",
    "url": `https://yourdomain.com/${params.slug}`
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "reviewCount": product.reviewCount
  },
  // Optional: Add 1-2 real reviews
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "author": { "@type": "Person", "name": "Sarah M." },
      "reviewBody": "Ce fut le voyage d’une vie ! Les paysages, la faune et les guides ont donné vie à la magie de l’Afrique de l’Est."
    }
  ]
};
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-12">
        <Image
          src={product.heroImage || "/placeholder.svg"}
          alt={`${product.name} - ${product.keywords?.[0] || "Safari en Afrique de l'Est"}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="mb-3 font-serif text-5xl font-bold text-white drop-shadow-lg">
            {product.name}
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
            {product.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white flex items-center gap-2">
              <Clock className="h-5 w-5" /> {product.duration}
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> À partir de {product.price} {product.currency}
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white flex items-center gap-2">
              <Users className="h-5 w-5" /> Groupe jusqu'à {product.groupSize?.split(" ")[2] || "10"} voyageurs
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats & CTA */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <div className="bg-muted/50 p-6 rounded-xl text-center">
          <h3 className="font-bold text-xl mb-2">Durée</h3>
          <p className="text-3xl font-serif">{product.duration}</p>
        </div>
        <div className="bg-muted/50 p-6 rounded-xl text-center">
          <h3 className="font-bold text-xl mb-2">Prix</h3>
          <p className="text-3xl font-serif">Dès {product.price} $US</p>
        </div>
        <div className="bg-muted/50 p-6 rounded-xl text-center">
          <h3 className="font-bold text-xl mb-2">Difficulté</h3>
          <p className="text-3xl font-serif">{product.difficulty}</p>
        </div>
        <div className="bg-muted/50 p-6 rounded-xl text-center">
          <h3 className="font-bold text-xl mb-2">Évaluation</h3>
          <p className="text-3xl font-serif">{product.rating} / 5 ({product.reviewCount} avis)</p>
        </div>
      </div>

      {/* Highlights Section */}
      <section className="mb-16">
        <h2 className="font-serif text-4xl font-bold mb-8 text-center">Ce Que Vous Vivrez</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-muted/50 p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <p className="text-lg">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Itinerary */}
      <section className="mb-16 prose max-w-none">
        <h2 className="font-serif text-4xl font-bold mb-8 text-center">Itinéraire Détaillé</h2>
        <div className="space-y-8">
          {product.itinerary.map((day, index) => (
            <div key={index} className="border-l-4 border-primary pl-6">
              <h3 className="font-serif text-2xl font-bold mb-3">{day.split(":")[0]}</h3>
              <p className="text-muted-foreground text-lg">{day.split(":")[1]?.trim() || day}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details & Description */}
      <section className="mb-16 prose max-w-none">
        <h2 className="font-serif text-4xl font-bold mb-6">Votre Aventure Vous Attend</h2>
        <p className="text-lg leading-relaxed mb-6">{product.details}</p>
        <p className="text-lg leading-relaxed">
          Ce safari {product.name} est conçu pour les amateurs de {product.category.toLowerCase()}, offrant une immersion totale dans la faune et la culture est-africaine. Avec nos guides experts, vous vivrez des moments inoubliables tout en soutenant la conservation locale.
        </p>
      </section>

      {/* Inclusions / Exclusions */}
      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-green-50 p-8 rounded-2xl">
          <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" /> Inclus
          </h2>
          <ul className="space-y-3">
            {product.included.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <CheckCircle className="h-5 w-5 text-green-600" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 p-8 rounded-2xl">
          <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-600" /> Non Inclus
          </h2>
          <ul className="space-y-3">
            {product.excluded.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <XCircle className="h-5 w-5 text-red-600" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonial + CTA */}
      <section className="rounded-2xl bg-muted/50 p-12 mb-16 text-center">
        <h2 className="font-serif text-3xl font-bold mb-6">Ce Que Disent Nos Voyageurs</h2>
        <blockquote className="italic text-xl max-w-3xl mx-auto mb-6">
          “{product.name} a dépassé toutes nos attentes ! Les paysages, la faune et l’équipe de JAE Travel ont rendu ce voyage magique.”
        </blockquote>
        <p className="font-semibold">— Voyageur satisfait</p>
        <Button asChild size="lg" className="mt-8 bg-primary text-white hover:bg-primary/90 text-lg">
          <Link href="/contact">
            {product.ctaText} <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
        </Button>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="font-serif text-4xl font-bold mb-8 text-center">Questions Fréquentes</h2>
        <div className="space-y-6">
          <details className="bg-muted/50 p-6 rounded-xl">
            <summary className="font-bold text-xl cursor-pointer">Quel est le meilleur moment pour ce safari ?</summary>
            <p className="mt-4 text-lg">Le meilleur moment dépend du produit, mais généralement de juin à octobre pour la Grande Migration.</p>
          </details>
          {/* Add 5-8 more relevant FAQs based on product */}
        </div>
      </section>

      {/* Related Products */}
      <section>
        <h2 className="font-serif text-3xl font-bold mb-8 text-center">Autres Aventures Similaires</h2>
        {/* Grid of related product cards with Links */}
      </section>
    </div>
    </>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}