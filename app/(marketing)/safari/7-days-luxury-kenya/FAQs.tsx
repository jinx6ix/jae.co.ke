// app/safari/7-days-budget-kenya/FAQs.tsx
'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What's included in the 7 days budget safari?",
      answer: "All accommodations (6 nights), all activities as indicated in the itinerary, all transportation in a safari Land Cruiser on a shared basis, meals as specified (6 breakfasts, 6 lunches, 5 dinners), all park entry fees, boat ride on Lake Naivasha, guided walking safari at Crescent Island, drinking water throughout the safari, and all taxes/VAT."
    },
    {
      question: "What is the group size for this shared safari?",
      answer: "The safari operates on a shared basis with 4-8 travelers in a safari Land Cruiser. This allows for a more affordable price while still providing an excellent safari experience."
    },
    {
      question: "What type of vehicle will be used?",
      answer: "Transportation is provided in a safari Land Cruiser with a pop-up roof for optimal game viewing. The vehicle is shared among the group and includes drinking water."
    },
    {
      question: "Can I book the optional Maasai Village visit?",
      answer: "Yes, the Maasai Village visit on Day 3 is available at $30 per person. You can book this with us at any time before or during the safari."
    },
    {
      question: "What is the tipping guideline?",
      answer: "The recommended tipping guideline is $10.00 per person per day. Tips can be given to your driver-guide and camp/hotel staff separately."
    },
    {
      question: "Do I need travel insurance?",
      answer: "Yes, travel insurance is strongly recommended and is not included in the safari price. It should cover medical expenses, trip cancellation, and lost luggage."
    },
    {
      question: "What should I pack for the safari?",
      answer: "Recommended items include neutral-colored clothing (avoid white and bright colors), a warm jacket for early morning game drives, comfortable walking shoes, sunscreen, insect repellent, hat, sunglasses, binoculars, camera, and any personal medications."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-white via-green-50/20 to-orange-50/20 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <HelpCircle className="w-12 h-12 text-orange-500 mx-auto mb-3 animate-bounce-slow" />
          <h2 className="text-3xl font-bold text-green-800">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2">Everything you need to know about your safari</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 text-left flex justify-between items-center hover:bg-green-50/50 transition-colors"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-orange-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 border-t border-gray-100 text-gray-700 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </section>
  );
}