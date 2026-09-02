// app/budget-tours/[slug]/components/FAQAccordion.tsx
'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQAccordionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white shadow-lg"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between p-6 text-left"
          >
            <h3 className="text-xl font-bold text-gray-900">
              {faq.question}
            </h3>
            {openIndex === index ? (
              <ChevronUp className="h-6 w-6 text-primary" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </button>
          
          {openIndex === index && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-100 pt-6">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}