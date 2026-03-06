// components/FaqSection.tsx
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const FaqSection = () => {
  const faqs = [
    {
      question: "Can I do a Serengeti safari from Nairobi, Kenya?",
      answer: "Absolutely! We offer daily departures from Nairobi. You can either fly directly to Serengeti (1.5-hour flight from Wilson Airport) or take a road transfer via the Namanga border (5-6 hours). Both options include pickup from your Nairobi hotel. Many guests combine Kenya and Tanzania safaris with us."
    },
    {
      question: "Do you accept international payments?",
      answer: "Yes, we accept multiple payment methods for global clients: Credit/debit cards (Visa, Mastercard, Amex), bank wire transfers, PayPal, and even cryptocurrency (Bitcoin/Ethereum). All payments are secure and receipts provided."
    },
    {
      question: "What's included in the package price?",
      answer: "All our packages include: Private 4x4 safari vehicle, professional English-speaking guide, park entry fees (conservation fees), accommodations as specified, meals as per itinerary, airport transfers, and 24/7 support from our Nairobi office. International flights and visas are not included."
    },
    {
      question: "How far in advance should I book for 2026?",
      answer: "For peak season (July-October), we recommend booking 8-12 months in advance as luxury camps fill up quickly. For green season (January-March), 4-6 months is usually sufficient. However, we always check last-minute availability — contact us for current openings."
    },
    {
      question: "Is the Serengeti safe for international tourists?",
      answer: "Yes, Serengeti National Park is very safe for tourists. All our guides are professionally trained, first-aid certified, and have decades of experience. We follow strict safety protocols, and our vehicles are equipped with satellite phones and first-aid kits. Tanzania is a politically stable country welcoming millions of tourists annually."
    },
    {
      question: "Do you offer visas or travel assistance?",
      answer: "We provide comprehensive travel assistance including visa invitation letters, travel insurance recommendations, flight booking help, and pre-trip briefing. Our team guides you through the entire process before you arrive."
    }
  ];

  return (
    <section className="mb-32" id="faq">
      <div className="flex items-center justify-center gap-4 mb-12">
        <HelpCircle className="h-10 w-10 text-amber-600" />
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
        Everything international travelers need to know about Serengeti safaris with Jae Travel.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-start gap-3">
              <span className="text-amber-600">Q:</span>
              <span>{faq.question}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-amber-600 mr-2">A:</span>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Still have questions? Our Nairobi team responds within 2 hours.</p>
        <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
          <Link href="/contact">Ask Us Anything</Link>
        </Button>
      </div>
    </section>
  );
};

export default FaqSection;