"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TourFAQs({ tour }: { tour: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {tour.faqs.map((faq: any, index: number) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition"
          >
            <span className="font-semibold text-gray-900">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="p-5 pt-0 border-t border-gray-100 bg-gray-50">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}