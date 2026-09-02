"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AlertCircle, RefreshCw } from "lucide-react";
import {
  fetchPublicHotels,
  submitQuote,
  type PublicHotel,
  type QuoteResult,
} from "@/lib/jaedb-client";

type Step = "trip" | "budget" | "hotels" | "details" | "result";

type BudgetTier = "BUDGET" | "MID_RANGE" | "LUXURY";

interface SelectedStay {
  hotel: PublicHotel;
  nights: number;
}

const TIER_LABELS: Record<BudgetTier, { title: string; blurb: string }> = {
  BUDGET: { title: "Budget", blurb: "Comfortable, no-frills stays that keep more of the trip in the itinerary." },
  MID_RANGE: { title: "Mid-range", blurb: "A balance of comfort and value — the most-picked tier." },
  LUXURY: { title: "Luxury", blurb: "Premium lodges and camps for a fully indulgent safari." },
};

function nightsBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export default function ItineraryBuilderPage() {
  const [step, setStep] = useState<Step>("trip");

  // Step 1: trip basics
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);

  // Step 2: budget tier
  const [tier, setTier] = useState<BudgetTier>("MID_RANGE");

  // Step 3: hotel picker
  const [hotels, setHotels] = useState<PublicHotel[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [hotelError, setHotelError] = useState<string | null>(null);
  const [selectedStays, setSelectedStays] = useState<SelectedStay[]>([]);

  // Step 4: contact details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalNights = nightsBetween(startDate, endDate);

  // Wrap the fetch in a useCallback so the retry button in the
  // error UI can call it directly without re-running the
  // effect on every render. The fetch itself is owned by the
  // effect below — useCallback is just the stable handle.
  const loadHotels = useCallback(async (signal?: AbortSignal) => {
    setLoadingHotels(true);
    setHotelError(null);
    try {
      const data = await fetchPublicHotels({ tier });
      if (signal?.aborted) return;
      setHotels(data);
    } catch (e: any) {
      if (signal?.aborted) return;
      setHotelError(
        e?.message || "Could not load hotels right now. Please try again."
      );
    } finally {
      if (!signal?.aborted) setLoadingHotels(false);
    }
  }, [tier]);

  useEffect(() => {
    if (step !== "hotels") return;
    const ctrl = new AbortController();
    loadHotels(ctrl.signal);
    return () => ctrl.abort();
  }, [step, loadHotels]);

  const nightsAllocated = selectedStays.reduce((sum, s) => sum + s.nights, 0);
  const nightsRemaining = totalNights - nightsAllocated;

  function toggleHotel(hotel: PublicHotel) {
    setSelectedStays((prev) => {
      const exists = prev.find((s) => s.hotel.id === hotel.id);
      if (exists) return prev.filter((s) => s.hotel.id !== hotel.id);
      // Default new selections to whatever's left of the trip, min 1 night.
      const defaultNights = Math.max(1, nightsRemaining || totalNights || 1);
      return [...prev, { hotel, nights: defaultNights }];
    });
  }

  function updateNights(hotelId: number, nights: number) {
    setSelectedStays((prev) =>
      prev.map((s) => (s.hotel.id === hotelId ? { ...s, nights: Math.max(1, nights) } : s))
    );
  }

  const estimatedTotal = useMemo(() => {
    const numPax = numAdults + numChildren;
    return selectedStays.reduce((sum, s) => sum + (s.hotel.fromPricePerNight ?? 0) * s.nights * numPax, 0);
  }, [selectedStays, numAdults, numChildren]);

  async function handleSubmit() {
    if (!name || !email) {
      toast.error("Please add your name and email so we can send the quote.");
      return;
    }
    if (selectedStays.length === 0) {
      toast.error("Pick at least one hotel before requesting a quote.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitQuote({
        name,
        email,
        phone: phone || undefined,
        startDate,
        endDate,
        numAdults,
        numChildren,
        selections: selectedStays.map((s) => ({ hotelId: s.hotel.id, nights: s.nights })),
        notes: notes || undefined,
        website,
      });
      setQuote(result);
      setStep("result");
    } catch (e: any) {
      setSubmitError(e.message || "Something went wrong generating your quote — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight mb-1">Build your own safari</h1>
      <p className="text-muted-foreground mb-8">
        Pick your dates, choose a budget, and select the hotels you want — we&apos;ll send a real quote back.
      </p>

      <StepIndicator step={step} />

      {step === "trip" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>When are you traveling?</CardTitle>
            <CardDescription>Dates and traveler count set the pricing for every hotel below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start">Start date</Label>
                <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="end">End date</Label>
                <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adults">Adults</Label>
                <Input
                  id="adults"
                  type="number"
                  min={1}
                  value={numAdults}
                  onChange={(e) => setNumAdults(Math.max(1, Number(e.target.value)))}
                />
              </div>
              <div>
                <Label htmlFor="children">Children</Label>
                <Input
                  id="children"
                  type="number"
                  min={0}
                  value={numChildren}
                  onChange={(e) => setNumChildren(Math.max(0, Number(e.target.value)))}
                />
              </div>
            </div>
            {totalNights > 0 && (
              <p className="text-sm text-muted-foreground">{totalNights} night{totalNights === 1 ? "" : "s"} total.</p>
            )}
            <Button
              className="w-full"
              disabled={!startDate || !endDate || totalNights < 1}
              onClick={() => setStep("budget")}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "budget" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What&apos;s your budget?</CardTitle>
            <CardDescription>This filters the hotel picker next — you can always mix tiers by adjusting later.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={tier} onValueChange={(v) => setTier(v as BudgetTier)}>
              {(Object.keys(TIER_LABELS) as BudgetTier[]).map((t) => (
                <label
                  key={t}
                  className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary"
                >
                  <RadioGroupItem value={t} className="mt-1" />
                  <div>
                    <div className="font-medium">{TIER_LABELS[t].title}</div>
                    <div className="text-sm text-muted-foreground">{TIER_LABELS[t].blurb}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("trip")}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep("hotels")}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "hotels" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Pick your hotels</CardTitle>
            <CardDescription>
              {totalNights} night{totalNights === 1 ? "" : "s"} to allocate
              {nightsRemaining !== 0 && (
                <span className={nightsRemaining < 0 ? "text-destructive" : ""}>
                  {" "}
                  — {Math.abs(nightsRemaining)} {nightsRemaining < 0 ? "over" : "unallocated"}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingHotels && (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
            {hotelError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
              >
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-sm font-medium text-destructive">
                    We couldn&apos;t load the hotels.
                  </p>
                  <p className="text-sm text-muted-foreground break-words">
                    {hotelError}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    If this keeps happening, make sure{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                      NEXT_PUBLIC_JAEDB_URL
                    </code>{" "}
                    points at a running jaedb instance.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => loadHotels()}
                    disabled={loadingHotels}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${loadingHotels ? "animate-spin" : ""}`}
                      aria-hidden="true"
                    />
                    Try again
                  </Button>
                </div>
              </div>
            )}
            {!loadingHotels && !hotelError && hotels.length === 0 && (
              <p className="text-sm text-muted-foreground">No hotels found for this tier yet.</p>
            )}
            {hotels.map((hotel) => {
              const selected = selectedStays.find((s) => s.hotel.id === hotel.id);
              return (
                <div
                  key={hotel.id}
                  className={`rounded-lg border p-4 ${selected ? "border-primary bg-muted/30" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="cursor-pointer" onClick={() => toggleHotel(hotel)}>
                      <div className="font-medium flex items-center gap-2">
                        {hotel.name}
                        {hotel.stars && <Badge variant="secondary">{hotel.stars}★</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{hotel.county}</div>
                      <div className="text-sm mt-1">
                        {hotel.fromPricePerNight != null
                          ? `from ${hotel.currency} ${hotel.fromPricePerNight}/person/night`
                          : "Price on request"}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={selected ? "default" : "outline"}
                      onClick={() => toggleHotel(hotel)}
                    >
                      {selected ? "Selected" : "Add"}
                    </Button>
                  </div>
                  {selected && (
                    <div className="mt-3 flex items-center gap-2">
                      <Label htmlFor={`nights-${hotel.id}`} className="text-sm">
                        Nights here
                      </Label>
                      <Input
                        id={`nights-${hotel.id}`}
                        type="number"
                        min={1}
                        className="w-20"
                        value={selected.nights}
                        onChange={(e) => updateNights(hotel.id, Number(e.target.value))}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {selectedStays.length > 0 && (
              <p className="text-sm font-medium pt-2">
                Estimated total: {selectedStays[0]?.hotel.currency ?? "USD"} {estimatedTotal.toLocaleString()}
                <span className="font-normal text-muted-foreground"> (indicative — final quote may differ by season)</span>
              </p>
            )}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep("budget")}>
                Back
              </Button>
              <Button className="flex-1" disabled={selectedStays.length === 0} onClick={() => setStep("details")}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "details" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>We&apos;ll send the full quote to this email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="notes">Anything else we should know?</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            {/* Honeypot — hidden from real visitors via CSS, left blank; a bot filling this trips server-side detection. */}
            <div className="hidden" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("hotels")}>
                Back
              </Button>
              <Button className="flex-1" disabled={submitting} onClick={handleSubmit}>
                {submitting ? "Generating quote..." : "Get my quote"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "result" && quote && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your quote is ready</CardTitle>
            <CardDescription>Reference: {quote.bookingRef}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-semibold">
              {quote.currency} {quote.totalCost.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              {quote.currency} {quote.perPersonCost.toLocaleString()} per person
            </p>
            {quote.anyUnmatchedSeason && (
              <p className="text-sm text-amber-600">
                One or more hotels didn&apos;t have a rate on file for your exact dates — this uses their most
                recent rate as a placeholder. Our team will confirm the final price.
              </p>
            )}
            <div className="space-y-2 pt-2">
              {quote.selections.map((s) => (
                <div key={s.hotelId} className="flex justify-between text-sm border-b pb-2">
                  <span>
                    {s.hotelName} ({s.nights} night{s.nights === 1 ? "" : "s"})
                  </span>
                  <span>
                    {s.currency} {s.lineTotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              We&apos;ve emailed this to you and our team will follow up to confirm availability.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "trip", label: "Dates" },
    { key: "budget", label: "Budget" },
    { key: "hotels", label: "Hotels" },
    { key: "details", label: "Details" },
    { key: "result", label: "Quote" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === step);
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2 flex-1">
          <div
            className={`h-2 flex-1 rounded-full ${i <= currentIndex ? "bg-primary" : "bg-muted"}`}
            aria-label={s.label}
          />
        </div>
      ))}
    </div>
  );
}
