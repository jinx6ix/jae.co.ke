// app/budget-tours/[slug]/components/TourHighlights.tsx
import { Check } from "lucide-react";

interface TourHighlightsProps {
  tour: {
    highlights: string[];
  };
}

export default function TourHighlights({ tour }: TourHighlightsProps) {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold">
          Tour Highlights
        </h2>
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {tour.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}