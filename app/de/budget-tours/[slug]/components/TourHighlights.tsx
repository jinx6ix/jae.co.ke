"use client";

import { Check } from "lucide-react";

export default function TourHighlights({ tour }: { tour: any }) {
  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {tour.highlights.map((highlight: string, index: number) => (
        <li key={index} className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">{highlight}</span>
        </li>
      ))}
    </ul>
  );
}