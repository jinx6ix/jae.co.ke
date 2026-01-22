// app/budget-tours/[slug]/components/TourFAQs.tsx
import FAQAccordion from "./FAQAccordion"; // Client component

interface TourFAQsProps {
  tour: {
    title: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function TourFAQs({ tour }: TourFAQsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-4xl">
          {/* Use client component for interactive FAQ */}
          <FAQAccordion faqs={tour.faqs} />
        </div>
      </div>
    </section>
  );
}