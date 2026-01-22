// app/budget-tours/[slug]/components/BookingButtons.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface BookingButtonsProps {
  tour: {
    price: number;
    bookingUrl: string;
  };
}

export default function BookingButtons({ tour }: BookingButtonsProps) {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);

  const handleBooking = () => {
    setIsBookingLoading(true);
    window.location.href = tour.bookingUrl;
  };

  const handleWhatsApp = () => {
    setIsWhatsAppLoading(true);
    const message = `Hello! I'm interested in booking this tour for $${tour.price}. Can you provide more details?`;
    window.open(`https://wa.me/+254726485228?text=${encodeURIComponent(message)}`, '_blank');
    setIsWhatsAppLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button
        onClick={handleBooking}
        disabled={isBookingLoading}
        size="lg"
        className="min-w-[220px] bg-white text-primary hover:bg-white/90 text-lg font-semibold"
      >
        {isBookingLoading ? 'Processing...' : `Book Now - $${tour.price}`}
      </Button>
      <Button
        onClick={handleWhatsApp}
        disabled={isWhatsAppLoading}
        size="lg"
        variant="outline"
        className="min-w-[220px] border-white text-white hover:bg-white/10"
      >
        <Phone className="mr-2 h-5 w-5" />
        {isWhatsAppLoading ? 'Opening...' : 'WhatsApp Instant Quote'}
      </Button>
    </div>
  );
}