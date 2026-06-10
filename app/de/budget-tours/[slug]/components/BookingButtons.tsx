"use client";

import { Phone, Calendar } from "lucide-react";

interface BookingButtonsProps {
  tour: {
    title: string;
    price: number;
    duration: string;
    bookingUrl: string;
    slug: string;
  };
}

export default function BookingButtons({ tour }: BookingButtonsProps) {
  const whatsappNumber = "+254726485228";
  const inquiryText = `Hallo! Ich interessiere mich für die Buchung von ${tour.title} für $${tour.price}. Können Sie mir Verfügbarkeit und weitere Details mitteilen?`;
  const bookingText = `🛒 BUCHUNGSANFRAGE\n\nTour: ${tour.title}\nPreis: $${tour.price}\nDauer: ${tour.duration}\n\nIch möchte diese Tour buchen. Bitte teilen Sie mir Verfügbarkeit und Zahlungsdetails mit.`;

  return (
    <div className="space-y-3">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Phone className="h-5 w-5" />
        Jetzt buchen per WhatsApp
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiryText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Calendar className="h-5 w-5" />
        Verfügbarkeit anfragen
      </a>
    </div>
  );
}