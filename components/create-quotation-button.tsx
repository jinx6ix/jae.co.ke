// components/create-quotation-button.tsx
//
// Floating "Build my safari" button. Sits bottom-right on every
// marketing page and links to /itinerary-builder. The
// GooglePreferredSource button sits a bit higher (bottom-24) so
// the two don't overlap.
//
// z-index 2147483600 = max safe 32-bit int. The Google merchant
// widget and Sonner Toaster both render at very high z-indexes,
// and this button needs to stay reachable above them — it was
// being eaten by the merchant widget until the z-index was
// bumped. (Floating-buttons-fix.md in the auto-memory.)

"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export function CreateQuotationButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/itinerary-builder"
      id="create-quotation-button"
      aria-label="Build a custom safari itinerary and get a quote"
      style={{ zIndex: 2147483600 }}
      className={`fixed right-5 bottom-5 pointer-events-auto flex h-12 items-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-lg ring-1 ring-black/5 transition hover:bg-orange-600 hover:scale-105 active:scale-95 ${className}`}
    >
      <FileText className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      <span>Build my safari</span>
    </Link>
  );
}

export default CreateQuotationButton;
