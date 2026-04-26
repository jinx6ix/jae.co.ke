// app/ar/tours/ToursPageClient.tsx
"use client";

import { useState, useMemo } from "react";
import { tours } from "@/lib/i18n/data/ar/tours-data"; // Adjust to your Arabic tours data file
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOURS_PER_PAGE = 12;

export default function ToursPageClient() {
  const [selectedCountry, setSelectedCountry] = useState("الكل");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const countries = ["الكل", "كينيا", "تنزانيا", "رواندا", "أوغندا", "عدة دول"];

  const tourTypes = useMemo(() => {
    const types = new Set<string>();
    tours.forEach((tour) => {
      const title = tour.title.toLowerCase();
      if (title.includes("سفاري")) types.add("سفاري");
      if (title.includes("غوريلا") || title.includes("شيمبانزي")) types.add("تتبع الرئيسيات");
      if (title.includes("شاطئ") || title.includes("جزيرة")) types.add("شواطئ وجزر");
      if (title.includes("تسلق") || title.includes("مشي") || title.includes("جبال"))
        types.add("تسلق الجبال");
      if (title.includes("ثقافي") || title.includes("تراث")) types.add("جولات ثقافية");
      if (title.includes("ميسر") || title.includes("ذوي إعاقة")) types.add("جولات ميسرة");
      if (title.includes("مغامرة") || title.includes("تجديف")) types.add("مغامرات");
    });
    return Array.from(types).sort();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (selectedCountry !== "الكل" && tour.country !== selectedCountry) return false;
      if (tour.price < priceRange[0] || tour.price > priceRange[1]) return false;

      if (selectedTypes.length > 0) {
        const title = tour.title.toLowerCase();
        const matches = selectedTypes.some((type) => {
          if (type === "سفاري") return title.includes("سفاري");
          if (type === "تتبع الرئيسيات") return title.includes("غوريلا") || title.includes("شيمبانزي");
          if (type === "شواطئ وجزر") return title.includes("شاطئ") || title.includes("جزيرة");
          if (type === "تسلق الجبال") return title.includes("تسلق") || title.includes("مشي") || title.includes("جبال");
          if (type === "جولات ثقافية") return title.includes("ثقافي") || title.includes("تراث");
          if (type === "جولات ميسرة") return title.includes("ميسر");
          if (type === "مغامرات") return title.includes("مغامرة");
          return false;
        });
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCountry, priceRange, selectedTypes]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCountry, priceRange, selectedTypes]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedCountry("الكل");
    setPriceRange([0, 6000]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);
  const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
  const endIndex = startIndex + TOURS_PER_PAGE;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-12" dir="rtl">
      {/* العنوان */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">
          استكشف جولات السفاري لدينا
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          اكتشف تجارب سفاري لا تُنسى في شرق أفريقيا. من الهجرة الكبرى في ماساي مارا إلى تتبع الغوريلا في رواندا وأوغندا.
        </p>
      </div>

      {/* عوامل التصفية */}
      <div className="mb-8 rounded-2xl border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">تصفية الجولات</h2>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            إلغاء جميع التصفيات
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* البلد */}
          <div className="space-y-2">
            <Label htmlFor="country-filter">الوجهة</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger id="country-filter">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* نطاق السعر */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label>نطاق السعر (دولار أمريكي)</Label>
              <span className="text-sm font-medium text-primary">
                ${priceRange[0]} – ${priceRange[1]}
              </span>
            </div>
            <Slider
              min={0}
              max={6000}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$6,000</span>
            </div>
          </div>

          {/* أنواع الجولات */}
          <div className="space-y-3 md:col-span-3">
            <Label>نوع الجولة</Label>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {tourTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            عرض <span className="font-semibold">{startIndex + 1}</span> –{" "}
            <span className="font-semibold">{Math.min(endIndex, filteredTours.length)}</span> من{" "}
            <span className="font-semibold">{filteredTours.length}</span> جولة
          </p>
        </div>
      </div>

      {/* شبكة الجولات */}
      {currentTours.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* الترقيم */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronRight className="h-4 w-4" /> {/* عكس الاتجاه لـ RTL */}
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!showPage) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-muted-foreground">…</span>;
                    }
                    return null;
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(page)}
                      className="h-10 w-10"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronLeft className="h-4 w-4" /> {/* عكس الاتجاه لـ RTL */}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border bg-muted/50 p-12 text-center">
          <h3 className="mb-2 text-xl font-semibold">لم يتم العثور على جولات</h3>
          <p className="mb-4 text-muted-foreground">حاول تعديل عوامل التصفية.</p>
          <Button onClick={clearFilters}>إلغاء جميع التصفيات</Button>
        </div>
      )}

      {/* قسم الحث على اتخاذ إجراء */}
      <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold">ألم تجد ما تبحث عنه؟</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          نحن متخصصون في تصميم تجارب سفاري مخصصة. دعنا نصمم الرحلة المثالية لك.
        </p>
        <Button size="lg" asChild>
          <a href="/ar/contact">اتصل بنا للحصول على جولات مخصصة</a>
        </Button>
      </div>
    </div>
  );
}