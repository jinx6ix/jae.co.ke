// app/budget-tours/BudgetToursClient.tsx
"use client";

import { TourCard } from "@/components/tour-card";
import { budgetTours } from "@/lib/budget-tours-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BudgetToursClient() {
    const [tours, setTours] = useState(budgetTours);
  
  // Filter tours to only show IDs 1-11
  useEffect(() => {
    // Extract numeric part of ID and filter tours 1-11
    const filteredTours = budgetTours.filter(tour => {
      // Extract numeric ID from string ID (e.g., "1", "2", "11")
      const idMatch = tour.id.match(/\d+/);
      if (idMatch) {
        const numericId = parseInt(idMatch[0], 10);
        return numericId >= 1 && numericId <= 11;
      }
      return false;
    });
    
    setTours(filteredTours);
  }, []);
  return (
    <section id="tours" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold">
            Affordable Kenya Safari Packages 2026
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From quick 3-day Masai Mara escapes to full 8-day Kenya adventures — shared group savings or private flexibility.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour}
              //showOriginalPrice={true} // Uncomment if you want to show strikethrough original prices
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/contact">Customize Your Budget Safari</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}