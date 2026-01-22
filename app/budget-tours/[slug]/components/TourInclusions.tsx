// app/budget-tours/[slug]/components/TourInclusions.tsx
import { Check } from "lucide-react";

interface TourInclusionsProps {
  tour: {
    included: string[];
    excluded: string[];
  };
}

export default function TourInclusions({ tour }: TourInclusionsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* What's Included */}
          <div>
            <div className="mb-8 text-center">
              <h2 className="font-serif text-3xl font-bold">What's Included</h2>
              <p className="mt-2 text-gray-600">Everything you need for your safari</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <ul className="space-y-4">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What's Excluded */}
          <div>
            <div className="mb-8 text-center">
              <h2 className="font-serif text-3xl font-bold">What's Excluded</h2>
              <p className="mt-2 text-gray-600">Additional costs to consider</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <ul className="space-y-4">
                {tour.excluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <span className="text-red-600 font-bold">–</span>
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}