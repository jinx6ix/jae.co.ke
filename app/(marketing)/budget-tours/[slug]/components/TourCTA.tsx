// app/budget-tours/[slug]/components/TourCTA.tsx
import BookingButtons from "./BookingButtons"; // Client component
import { Phone } from "lucide-react";

interface TourCTAProps {
  tour: {
    title: string;
    price: number;
    originalPrice?: number;
    bookingUrl: string;
  };
}

export default function TourCTA({ tour }: TourCTAProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 font-serif text-4xl font-bold">
          Ready for Your Adventure?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed">
          Book your {tour.title} today and secure the best price for 2026. 
          Limited spots available for this popular budget safari.
        </p>
        
        <div className="mb-10">
          <div className="inline-flex items-baseline gap-3">
            <span className="text-5xl font-bold">${tour.price}</span>
            {tour.originalPrice && (
              <span className="text-2xl text-white/70 line-through">${tour.originalPrice}</span>
            )}
          </div>
          <p className="mt-2 text-white/80">per person • All-inclusive package</p>
        </div>

        <BookingButtons tour={{ ...tour, bookingUrl: "https://example.com/booking" }} />
        <BookingButtons tour={tour} />
        
        <p className="mt-8 text-sm text-white/70">
          Free cancellation up to 30 days before departure • Best price guarantee
        </p>
      </div>
    </section>
  );
}