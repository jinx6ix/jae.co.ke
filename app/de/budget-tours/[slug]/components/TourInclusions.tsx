"use client";

import { Check, X } from "lucide-react";

export default function TourInclusions({ tour }: { tour: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <Check className="h-5 w-5" /> Inklusive
        </h3>
        <ul className="space-y-3">
          {tour.included.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
          <X className="h-5 w-5" /> Exklusive
        </h3>
        <ul className="space-y-3">
          {tour.excluded.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}