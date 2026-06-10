"use client";

import { TourCard } from "@/components/tour-card";
import { budgetTours } from "@/lib/i18n/data/de/budget-tours-data"; // Deutsche Daten
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BudgetToursClient() {
  return (
    <section id="tours" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold">
            Erschwingliche Kenia Safari Pakete 2026
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Von kurzen 3-tägigen Masai Mara Ausflügen bis zu vollständigen 8-tägigen Kenia Abenteuern — gemeinsam sparen oder private Flexibilität.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {budgetTours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/contact">Ihre Budget-Safari individuell anpassen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}