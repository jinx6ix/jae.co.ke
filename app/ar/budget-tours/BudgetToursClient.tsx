// app/ar/budget-tours/BudgetToursClient.tsx
"use client";

import { TourCard } from "@/components/tour-card";
import { budgetTours } from "@/lib/i18n/data/ar/budget-tours-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BudgetToursClient() {
  const [tours, setTours] = useState(budgetTours);

  // تصفية الجولات لإظهار المعرفات 1-11 فقط (مثل النسخة الإنجليزية)
  useEffect(() => {
    const filteredTours = budgetTours.filter(tour => {
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
            باقات رحلات السفاري الاقتصادية في كينيا 2026
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            من رحلات ماساي مارا السريعة لمدة 3 أيام إلى مغامرات كينيا الكاملة لمدة 8 أيام — توفير المجموعات المشتركة أو مرونة الجولات الخاصة.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              // showOriginalPrice={true} // أزل التعليق إذا أردت إظهار السعر الأصلي مشطوباً
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/ar/contact">خصّص رحلة السفاري الاقتصادية الخاصة بك</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}