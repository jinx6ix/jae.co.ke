// app/vehicle-hire/luxury-roof-top-camping/CampingHighlights.tsx
'use client'

type Product = {
  highlights: string[]
}

export default function CampingHighlights({ product }: { product: Product }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center font-serif text-4xl font-bold">
        What You’ll Experience
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {product.highlights.map((highlight, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-muted/50 p-5 transition-all hover:bg-muted hover:shadow-md"
          >
            <span className="text-2xl mt-0.5">Sparkles</span>
            <p className="text-muted-foreground leading-relaxed">{highlight}</p>
          </div>
        ))}
      </div>
    </section>
  )
}