"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AlertCircle, RefreshCw, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import {
  fetchPublicHotels,
  fetchPublicCounties,
  submitQuote,
  type PublicHotel,
  type PublicCounty,
  type PublicRoomType,
  type ChildInput,
  type RouteLegInput,
  type LegHotelInput,
  type ActivityInput,
  type QuoteResult,
} from "@/lib/jaedb-client";
import {
  TRANSPORT_RATES,
  MARKUP_PERCENT,
  isAdult,
  type Vehicle,
} from "@/lib/pricing-rules";

type Step = "trip" | "route" | "hotels" | "activities" | "review" | "details" | "result";

interface ChildState {
  id: string;          // local-only id for list management
  age: number;
  extraBed: boolean;
}

interface LegSelectionState {
  countyId: number;
  countyName: string;
  parkFee: number | null;
  parkFeeCurrency: string;
  nights: number;
  hotelId: number | null;
  hotelName: string | null;
  roomTypeId: number | null;
  roomTypeName: string | null;
  boardBasis: "FB" | "HB" | "BB" | "AI";
  matched: boolean;     // whether the rate matched a season
  ratePerPersonSharing: number | null;
  childRate: number | null;
  thirdAdultRate: number | null;
  currency: string;
  /**
   * Customer-supplied USD per person per night, used when the DB has
   * no rate row for (hotel, roomType, boardBasis). Set from the
   * client-side input on the hotels step. Server honours it as the
   * adult-sharing rate and flags the cost sheet so staff confirm.
   */
  clientRatePerPersonSharing: number | null;
  /**
   * "OK" — DB has a rate, everything good.
   * "NO_RATE" — hotel has no price on record anywhere (we surface
   *             the client-rate input).
   * "NO_ROOM_RATE" — hotel has a rate but this room type doesn't.
   * "CLIENT_SUPPLIED" — user typed in their own rate.
   */
  priceSource: "OK" | "NO_RATE" | "NO_ROOM_RATE" | "CLIENT_SUPPLIED";
}

interface ActivityState {
  id: string;
  dayIndex: number;
  description: string;
  costPerPerson: number;
}

const STORAGE_KEY = "jaetravel.quotation-builder.v2";

function nightsBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

function daysBetween(start: string, end: string): number {
  // days = nights + 1 (e.g. 3 nights = 4 calendar days)
  return nightsBetween(start, end) + 1;
}

function newId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export default function ItineraryBuilderPage() {
  const [step, setStep] = useState<Step>("trip");

  // Step 1: trip basics
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numAdults, setNumAdults] = useState(2);
  const [children, setChildren] = useState<ChildState[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle>("MINIVAN");

  // Step 2: route legs
  const [counties, setCounties] = useState<PublicCounty[]>([]);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [countiesError, setCountiesError] = useState<string | null>(null);
  const [legs, setLegs] = useState<LegSelectionState[]>([]);

  // Step 3: hotels per leg
  const [hotelsByCounty, setHotelsByCounty] = useState<Record<number, PublicHotel[]>>({});
  const [loadingHotelsFor, setLoadingHotelsFor] = useState<number | null>(null);
  const [hotelsError, setHotelsError] = useState<string | null>(null);

  // Step 4: activities
  const [activities, setActivities] = useState<ActivityState[]>([]);

  // Step 5: contact details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Derived state ───────────────────────────────────────────────
  const totalNights = nightsBetween(startDate, endDate);
  const totalDays = daysBetween(startDate, endDate);
  const childAdults = children.filter((c) => isAdult(c.age)).length;
  const childKids = children.filter((c) => !isAdult(c.age));
  const pax = numAdults + childAdults + childKids.length;
  const nightsAllocated = legs.reduce((sum, l) => sum + l.nights, 0);
  const nightsRemaining = totalNights - nightsAllocated;

  // Restore from sessionStorage on mount so a refresh doesn't lose work.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.startDate) setStartDate(s.startDate);
      if (s.endDate) setEndDate(s.endDate);
      if (s.numAdults) setNumAdults(s.numAdults);
      if (Array.isArray(s.children)) setChildren(s.children);
      if (s.vehicle) setVehicle(s.vehicle);
      if (Array.isArray(s.legs)) {
        // Defensive: older stored state (before the client-rate feature)
        // doesn't have clientRatePerPersonSharing / priceSource. Fill
        // them in so the rest of the form can read these fields safely.
        setLegs(
          s.legs.map((l: Partial<LegSelectionState>) => ({
            countyId: 0,
            countyName: "",
            parkFee: null,
            parkFeeCurrency: "USD",
            nights: 1,
            hotelId: null,
            hotelName: null,
            roomTypeId: null,
            roomTypeName: null,
            boardBasis: "FB",
            matched: false,
            ratePerPersonSharing: null,
            childRate: null,
            thirdAdultRate: null,
            currency: "USD",
            clientRatePerPersonSharing: null,
            priceSource: "OK",
            ...l,
          })),
        );
      }
      if (Array.isArray(s.activities)) setActivities(s.activities);
      if (s.name) setName(s.name);
      if (s.email) setEmail(s.email);
      if (s.phone) setPhone(s.phone);
      if (s.notes) setNotes(s.notes);
      // Don't restore step — always start on trip so the user re-confirms dates.
    } catch {
      // Ignore parse errors; sessionStorage may be unavailable in some contexts.
    }
  }, []);

  // Persist relevant state on every change. Cheap JSON; not on every
  // keystroke for the contact fields (only on step transitions) to
  // avoid hammering storage mid-edit.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          startDate,
          endDate,
          numAdults,
          children,
          vehicle,
          legs,
          activities,
        }),
      );
    } catch {
      // ignore
    }
  }, [startDate, endDate, numAdults, children, vehicle, legs, activities]);

  // ── Counties fetch (for the route step) ─────────────────────────
  const loadCounties = useCallback(async () => {
    setLoadingCounties(true);
    setCountiesError(null);
    try {
      const data = await fetchPublicCounties();
      setCounties(data);
    } catch (e: any) {
      setCountiesError(e?.message || "Could not load destinations right now.");
    } finally {
      setLoadingCounties(false);
    }
  }, []);

  useEffect(() => {
    if (step === "route" && counties.length === 0) {
      loadCounties();
    }
  }, [step, counties.length, loadCounties]);

  // ── Hotels fetch per leg (for the hotels step) ──────────────────
  const loadHotelsForCounty = useCallback(async (countyId: number) => {
    setLoadingHotelsFor(countyId);
    setHotelsError(null);
    try {
      const county = counties.find((c) => c.id === countyId);
      if (!county) throw new Error("County not found");
      const data = await fetchPublicHotels({ county: county.name });
      setHotelsByCounty((prev) => ({ ...prev, [countyId]: data }));
    } catch (e: any) {
      setHotelsError(e?.message || "Could not load hotels for this leg.");
    } finally {
      setLoadingHotelsFor(null);
    }
  }, [counties]);

  useEffect(() => {
    if (step !== "hotels") return;
    for (const leg of legs) {
      if (leg.hotelId == null && !hotelsByCounty[leg.countyId]) {
        loadHotelsForCounty(leg.countyId);
      }
    }
    // We deliberately don't re-run on every leg change — loadHotelsForCounty
    // is idempotent, but the effect re-firing is wasteful.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── Trip-step handlers ──────────────────────────────────────────
  function addChild() {
    setChildren((prev) => [...prev, { id: newId(), age: 8, extraBed: false }]);
  }
  function updateChild(id: string, patch: Partial<ChildState>) {
    setChildren((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }
  function removeChild(id: string) {
    setChildren((prev) => prev.filter((c) => c.id !== id));
  }

  function canContinueFromTrip(): boolean {
    return Boolean(startDate && endDate && totalNights >= 1 && pax >= 1);
  }

  // ── Route-step handlers ─────────────────────────────────────────
  function addLeg() {
    setLegs((prev) => [
      ...prev,
      {
        countyId: counties[0]?.id ?? 0,
        countyName: counties[0]?.name ?? "",
        parkFee: counties[0]?.parkFee ?? null,
        parkFeeCurrency: counties[0]?.parkFeeCurrency ?? "USD",
        nights: 1,
        hotelId: null,
        hotelName: null,
        roomTypeId: null,
        roomTypeName: null,
        boardBasis: "FB",
        matched: false,
        ratePerPersonSharing: null,
        childRate: null,
        thirdAdultRate: null,
        currency: "USD",
        clientRatePerPersonSharing: null,
        priceSource: "OK",
      },
    ]);
  }
  function removeLeg(idx: number) {
    setLegs((prev) => prev.filter((_, i) => i !== idx));
  }
  function moveLeg(idx: number, dir: -1 | 1) {
    setLegs((prev) => {
      const next = [...prev];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  }
  function updateLeg(idx: number, patch: Partial<LegSelectionState>) {
    setLegs((prev) =>
      prev.map((leg, i) => {
        if (i !== idx) return leg;
        // If county changed, reset hotel + room
        if (patch.countyId && patch.countyId !== leg.countyId) {
          const c = counties.find((cc) => cc.id === patch.countyId);
          return {
            ...leg,
            ...patch,
            countyName: c?.name ?? "",
            parkFee: c?.parkFee ?? null,
            parkFeeCurrency: c?.parkFeeCurrency ?? "USD",
            hotelId: null,
            hotelName: null,
            roomTypeId: null,
            roomTypeName: null,
            ratePerPersonSharing: null,
            childRate: null,
            thirdAdultRate: null,
          };
        }
        return { ...leg, ...patch };
      }),
    );
  }

  function canContinueFromRoute(): boolean {
    if (legs.length === 0) return false;
    if (nightsAllocated !== totalNights) return false;
    return legs.every((l) => l.countyId > 0 && l.nights >= 1);
  }

  // ── Hotel-step handlers ─────────────────────────────────────────
  function selectHotelForLeg(idx: number, hotel: PublicHotel, roomType: PublicRoomType) {
    setLegs((prev) =>
      prev.map((leg, i) => {
        if (i !== idx) return leg;
        // We don't have childRate/thirdAdultRate from the public hotels
        // endpoint yet — those come back from the server at quote time.
        // Set placeholders that the result page shows as "ask us".
        return {
          ...leg,
          hotelId: hotel.id,
          hotelName: hotel.name,
          roomTypeId: roomType.id,
          roomTypeName: roomType.name,
          ratePerPersonSharing: hotel.fromPricePerNight,
          currency: hotel.currency,
          // matched: false until the server resolves it; we re-render
          // after submit.
          matched: false,
          // The DB-driven rate is now in play; clear any client-supplied
          // override and mark the source as DB.
          clientRatePerPersonSharing: null,
          priceSource:
            hotel.fromPricePerNight == null ? "NO_RATE" : "OK",
        };
      }),
    );
  }

  function canContinueFromHotels(): boolean {
    // A leg is "complete" if either (a) we have a DB-backed hotel +
    // room-type selection, or (b) the user has typed a client-supplied
    // rate for a hotel that has no DB rate.
    return legs.every((l) => {
      if (l.hotelId == null) return false;
      if (l.clientRatePerPersonSharing != null && l.clientRatePerPersonSharing > 0) {
        return true; // client supplied
      }
      return l.roomTypeId != null; // DB-backed
    });
  }

  // ── Activities-step handlers ────────────────────────────────────
  // Days = nights + 1; activities can apply to any day 0..days-1.
  const activityDayCount = totalDays;
  function addActivity(dayIndex: number) {
    setActivities((prev) => [
      ...prev,
      { id: newId(), dayIndex, description: "", costPerPerson: 0 },
    ]);
  }
  function updateActivity(id: string, patch: Partial<ActivityState>) {
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }
  function removeActivity(id: string) {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  // ── Review-step derived total (uses the same math the server uses) ──
  const reviewBreakdown = useMemo(() => {
    if (legs.length === 0) return null;
    const occupants: { age: number; extraBed: boolean }[] = [
      ...Array.from({ length: numAdults }, () => ({ age: 30, extraBed: false })),
      ...children.map((c) => ({ age: c.age, extraBed: c.extraBed })),
    ];
    if (occupants.length === 0) return null;

    const accommodationPerLeg = legs.map((leg) => {
      const adults = occupants.filter((o) => isAdult(o.age));
      const kids = occupants.filter((o) => !isAdult(o.age));
      const adultRate = leg.ratePerPersonSharing ?? 0;
      const childRate = leg.childRate ?? adultRate;
      const thirdAdultRate =
        leg.thirdAdultRate != null ? leg.thirdAdultRate : adultRate;
      const roomMax =
        leg.roomTypeId != null
          ? hotelsByCounty[leg.countyId]?.find((h) => h.id === leg.hotelId)
              ?.roomTypes?.find((rt) => rt.id === leg.roomTypeId)?.maxOccupancy ?? 2
          : 2;
      // Per night: each adult at adultRate, each kid at childRate (or
      // thirdAdultRate when extraBed + triple).
      const triple = roomMax >= 3;
      const perKidRate = (extraBed: boolean) =>
        extraBed && triple ? thirdAdultRate : extraBed ? adultRate : childRate;
      const nightTotal =
        adults.length * adultRate +
        kids.reduce(
          (sum, k) => sum + perKidRate(k.extraBed),
          0,
        );
      return {
        leg,
        nightTotal,
        legAccommodation: nightTotal * leg.nights,
        legParkFees: (leg.parkFee ?? 0) * leg.nights * pax,
      };
    });

    const accommodation = accommodationPerLeg.reduce(
      (sum, l) => sum + l.legAccommodation,
      0,
    );
    const parkFees = accommodationPerLeg.reduce(
      (sum, l) => sum + l.legParkFees,
      0,
    );
    // Vehicle is hired for the trip, not per seat — days only, pax gets
    // the share naturally on the per-person line.
    const transport = TRANSPORT_RATES[vehicle] * totalDays;
    const extras =
      activities.reduce((sum, a) => sum + (a.costPerPerson || 0), 0) * pax;
    const subtotal = accommodation + parkFees + transport + extras;
    const markup = subtotal * (MARKUP_PERCENT / 100);
    const total = subtotal + markup;
    return {
      accommodation,
      parkFees,
      transport,
      extras,
      subtotal,
      markup,
      total,
      perPerson: total / pax,
      pax,
      currency: legs[0]?.currency ?? "USD",
      vehicle,
      days: totalDays,
      legs: accommodationPerLeg,
    };
  }, [legs, numAdults, children, vehicle, totalDays, pax, activities, hotelsByCounty]);

  // ── Submit ──────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!name || !email) {
      toast.error("Please add your name and email so we can send the quote.");
      return;
    }
    if (legs.length === 0 || !reviewBreakdown) {
      toast.error("Build out your route before requesting a quote.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const route: RouteLegInput[] = legs.map((l) => ({
        countyId: l.countyId,
        countyName: l.countyName,
        nights: l.nights,
      }));
      const hotels: LegHotelInput[] = legs.map((l) => ({
        countyId: l.countyId,
        hotelId: l.hotelId!,
        roomTypeId: l.roomTypeId ?? 0,
        boardBasis: l.boardBasis,
        // Only present when the user supplied their own rate (NO_RATE
        // hotel). Server ignores it when the DB has a matching rate row.
        clientRatePerPersonSharing: l.clientRatePerPersonSharing,
      }));
      const activitiesPayload: ActivityInput[] = activities
        .filter((a) => a.description.trim() && a.costPerPerson > 0)
        .map((a) => ({
          dayIndex: a.dayIndex,
          description: a.description,
          costPerPerson: a.costPerPerson,
        }));
      const childrenPayload: ChildInput[] = children.map((c) => ({
        age: c.age,
        extraBed: c.extraBed,
      }));

      const result = await submitQuote({
        name,
        email,
        phone: phone || undefined,
        startDate,
        endDate,
        numAdults,
        // Legacy field still in the payload so the server's existing
        // counter stays consistent.
        numChildren: childKids.length + childAdults,
        selections: legs.map((l) => ({ hotelId: l.hotelId!, nights: l.nights })),
        notes: notes || undefined,
        website,
        children: childrenPayload,
        route,
        hotels,
        activities: activitiesPayload,
        vehicle,
        markupPercent: MARKUP_PERCENT,
      });
      setQuote(result);
      setStep("result");
      // Clear the session so the next visitor to this browser starts
      // fresh. (Stale state from a previous run would otherwise pollute
      // the form on return.)
      try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
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
        Plan a multi-stop itinerary, choose hotels and room types, and we&apos;ll send back a real per-person quote.
      </p>

      <StepIndicator step={step} />

      {step === "trip" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>When are you traveling?</CardTitle>
            <CardDescription>Dates and traveler count set the pricing for every leg below.</CardDescription>
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
                <Label htmlFor="vehicle">Vehicle</Label>
                <select
                  id="vehicle"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value as Vehicle)}
                >
                  <option value="MINIVAN">Tour van (KES {TRANSPORT_RATES.MINIVAN}/day for the vehicle)</option>
                  <option value="LANDCRUISER">Landcruiser (KES {TRANSPORT_RATES.LANDCRUISER}/day for the vehicle)</option>
                </select>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Children</Label>
                <Button size="sm" variant="outline" onClick={addChild} type="button">
                  <Plus className="h-4 w-4 mr-1" /> Add child
                </Button>
              </div>
              {children.length === 0 && (
                <p className="text-sm text-muted-foreground">No children added. Children 13+ are usually priced as adults.</p>
              )}
              {children.map((c) => (
                <div key={c.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                  <div>
                    <Label htmlFor={`age-${c.id}`} className="text-xs">Age</Label>
                    <Input
                      id={`age-${c.id}`}
                      type="number"
                      min={0}
                      max={17}
                      value={c.age}
                      onChange={(e) => updateChild(c.id, { age: Math.max(0, Math.min(17, Number(e.target.value))) })}
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-1">
                    <input
                      id={`extra-${c.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-input"
                      checked={c.extraBed}
                      onChange={(e) => updateChild(c.id, { extraBed: e.target.checked })}
                    />
                    <Label htmlFor={`extra-${c.id}`} className="text-sm font-normal cursor-pointer">
                      Needs extra bed
                    </Label>
                    {isAdult(c.age) && (
                      <span className="text-xs text-muted-foreground">(13+ — counted as adult)</span>
                    )}
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeChild(c.id)} type="button" aria-label="Remove child">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {totalNights > 0 && (
              <p className="text-sm text-muted-foreground">
                {totalNights} night{totalNights === 1 ? "" : "s"} · {totalDays} day{totalDays === 1 ? "" : "s"} · {pax} traveler{pax === 1 ? "" : "s"}
              </p>
            )}
            <Button
              className="w-full"
              disabled={!canContinueFromTrip()}
              onClick={() => setStep("route")}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "route" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Plan your route</CardTitle>
            <CardDescription>
              Add destinations and assign nights to each. The total must match your
              trip length (sum of nights = {totalNights} night{totalNights === 1 ? "" : "s"} from your dates).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingCounties && (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {countiesError && (
              <ErrorBox message={countiesError} onRetry={loadCounties} />
            )}
            {!loadingCounties && !countiesError && (
              <>
                {legs.map((leg, idx) => {
                  // Each leg's "nights" input is capped at the nights still
                  // unallocated after subtracting the other legs' nights.
                  // This is what makes "total allocated == total trip nights"
                  // possible without forcing the user to add up mentally.
                  const otherAllocated = legs.reduce(
                    (sum, l, i) => (i === idx ? sum : sum + l.nights),
                    0,
                  );
                  const maxForThisLeg = Math.max(1, totalNights - otherAllocated);
                  return (
                    <div key={idx} className="rounded-lg border p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Leg {idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <Button size="icon" variant="ghost" onClick={() => moveLeg(idx, -1)} disabled={idx === 0} type="button" aria-label="Move up">
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => moveLeg(idx, 1)} disabled={idx === legs.length - 1} type="button" aria-label="Move down">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => removeLeg(idx)} type="button" aria-label="Remove leg">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1fr_120px] gap-2">
                        <div>
                          <Label htmlFor={`county-${idx}`} className="text-xs">Destination</Label>
                          <select
                            id={`county-${idx}`}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                            value={leg.countyId}
                            onChange={(e) => updateLeg(idx, { countyId: Number(e.target.value) })}
                          >
                            {counties.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                                {c.parkFee ? ` (park fee ${c.parkFeeCurrency} ${c.parkFee}/pp/day)` : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor={`nights-${idx}`} className="text-xs">Nights</Label>
                          <Input
                            id={`nights-${idx}`}
                            type="number"
                            min={1}
                            max={maxForThisLeg}
                            value={leg.nights}
                            onChange={(e) => updateLeg(idx, { nights: Math.max(1, Math.min(maxForThisLeg, Number(e.target.value))) })}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Button
                  variant="outline"
                  onClick={addLeg}
                  type="button"
                  className="w-full"
                  disabled={nightsAllocated >= totalNights}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add destination
                  {nightsAllocated >= totalNights && totalNights > 0 ? " (all nights allocated)" : ""}
                </Button>
                {totalNights > 0 && (
                  <p className={`text-sm ${nightsRemaining === 0 ? "text-muted-foreground" : "text-amber-600"}`}>
                    {nightsRemaining === 0
                      ? `${nightsAllocated} of ${totalNights} night${totalNights === 1 ? "" : "s"} allocated.`
                      : `${nightsAllocated} of ${totalNights} nights allocated — ${nightsRemaining > 0 ? `${nightsRemaining} to go` : `${Math.abs(nightsRemaining)} over`}.`}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setStep("trip")}>Back</Button>
                  <Button className="flex-1" disabled={!canContinueFromRoute()} onClick={() => setStep("hotels")}>
                    Continue
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {step === "hotels" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Choose hotels and room types</CardTitle>
            <CardDescription>
              One per destination. Room type is required — the per-person rate is for the room, not per bed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hotelsError && <ErrorBox message={hotelsError} onRetry={() => legs.forEach((l) => loadHotelsForCounty(l.countyId))} />}
            {legs.map((leg, idx) => {
              const hotels = hotelsByCounty[leg.countyId] ?? [];
              const loading = loadingHotelsFor === leg.countyId;
              const selectedHotel =
                hotels.find((h) => h.id === leg.hotelId) ?? null;
              const paxCount =
                numAdults + children.filter((c) => c.age < 13).length;
              const anyChildExtraBed = children.some(
                (c) => c.extraBed && c.age < 13,
              );
              const hotelHasNoRate =
                selectedHotel != null &&
                selectedHotel.fromPricePerNight == null;
              return (
                <div key={idx} className="rounded-lg border p-3 space-y-2">
                  <div className="text-sm font-medium">
                    {leg.countyName} · {leg.nights} night{leg.nights === 1 ? "" : "s"}
                    {leg.parkFee ? (
                      <span className="text-xs text-muted-foreground"> · park fee {leg.parkFeeCurrency} {leg.parkFee}/pp/day</span>
                    ) : null}
                  </div>
                  {loading && (
                    <div className="space-y-1">
                      <Skeleton className="h-9 w-full" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                  )}
                  {!loading && hotels.length === 0 && (
                    <p className="text-sm text-muted-foreground">No hotels in {leg.countyName} yet.</p>
                  )}
                  {!loading && hotels.length > 0 && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor={`hotel-${idx}`} className="text-xs">Hotel</Label>
                        <select
                          id={`hotel-${idx}`}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                          value={leg.hotelId ?? ""}
                          onChange={(e) => {
                            const newId = e.target.value ? Number(e.target.value) : null;
                            const newHotel = hotels.find((h) => h.id === newId) ?? null;
                            setLegs((prev) =>
                              prev.map((l, i) => {
                                if (i !== idx) return l;
                                if (!newHotel) {
                                  return {
                                    ...l,
                                    hotelId: null,
                                    hotelName: null,
                                    roomTypeId: null,
                                    roomTypeName: null,
                                    ratePerPersonSharing: null,
                                    currency: "",
                                    clientRatePerPersonSharing: null,
                                    priceSource: "OK",
                                  };
                                }
                                const hotelNoRate = newHotel.fromPricePerNight == null;
                                return {
                                  ...l,
                                  hotelId: newHotel.id,
                                  hotelName: newHotel.name,
                                  // Reset room type + client rate when hotel changes
                                  roomTypeId: null,
                                  roomTypeName: null,
                                  ratePerPersonSharing: newHotel.fromPricePerNight,
                                  currency: newHotel.currency,
                                  matched: false,
                                  clientRatePerPersonSharing: null,
                                  priceSource: hotelNoRate ? "NO_RATE" : "OK",
                                };
                              }),
                            );
                          }}
                        >
                          <option value="">— pick a hotel in {leg.countyName} —</option>
                          {hotels.map((h) => (
                            <option key={h.id} value={h.id}>
                              {h.name}
                              {h.stars ? ` (${h.stars}★)` : ""}
                              {h.fromPricePerNight != null
                                ? ` · from ${h.currency} ${h.fromPricePerNight}/night`
                                : " · ⚠ no rate on file (we'll ask you)"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedHotel && hotelHasNoRate && (
                        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 space-y-2">
                          <div className="flex items-start gap-2 text-sm text-amber-900">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-medium">No rate on file for {selectedHotel.name}.</p>
                              <p className="text-xs mt-0.5">
                                If you&apos;ve already been quoted a price for this hotel, enter it
                                below and we&apos;ll confirm it with you in our reply. Otherwise
                                leave it blank and we&apos;ll come back with the correct figure.
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor={`clientRate-${idx}`} className="text-xs">
                              Your quoted rate (USD / person / night, {leg.boardBasis})
                            </Label>
                            <Input
                              id={`clientRate-${idx}`}
                              type="number"
                              min={0}
                              step="0.01"
                              placeholder="e.g. 320"
                              value={leg.clientRatePerPersonSharing ?? ""}
                              onChange={(e) => {
                                const raw = e.target.value;
                                const v =
                                  raw === ""
                                    ? null
                                    : Math.max(0, Number(raw));
                                setLegs((prev) =>
                                  prev.map((l, i) =>
                                    i === idx
                                      ? {
                                          ...l,
                                          clientRatePerPersonSharing: v,
                                          priceSource:
                                            v != null && v > 0
                                              ? "CLIENT_SUPPLIED"
                                              : "NO_RATE",
                                        }
                                      : l,
                                  ),
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedHotel && !hotelHasNoRate && (
                        <div className="space-y-1">
                          <Label htmlFor={`room-${idx}`} className="text-xs">Room type</Label>
                          <select
                            id={`room-${idx}`}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                            value={leg.roomTypeId ?? ""}
                            onChange={(e) => {
                              const rtId = e.target.value ? Number(e.target.value) : null;
                              const rt = selectedHotel.roomTypes?.find((r) => r.id === rtId) ?? null;
                              if (rt) selectHotelForLeg(idx, selectedHotel, rt);
                              else {
                                setLegs((prev) =>
                                  prev.map((l, i) =>
                                    i === idx
                                      ? { ...l, roomTypeId: null, roomTypeName: null }
                                      : l,
                                  ),
                                );
                              }
                            }}
                          >
                            <option value="">— pick a room type —</option>
                            {selectedHotel.roomTypes?.map((rt) => {
                              const tooSmallForPax = rt.maxOccupancy < paxCount;
                              return (
                                <option
                                  key={rt.id}
                                  value={rt.id}
                                  disabled={tooSmallForPax}
                                >
                                  {rt.name} (sleeps {rt.maxOccupancy})
                                  {anyChildExtraBed && rt.maxOccupancy < 3
                                    ? " — child extra bed forces adult sharing rate"
                                    : ""}
                                  {tooSmallForPax ? " — too small for your group" : ""}
                                </option>
                              );
                            })}
                          </select>
                          {(selectedHotel.roomTypes?.length ?? 0) === 0 && (
                            <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                              <p className="font-medium">No room types on file for {selectedHotel.name}.</p>
                              <p className="text-xs mt-0.5">
                                Please pick a different hotel, or
                                <a className="underline ml-1" href="/contact">contact us</a>
                                {" "}and we&apos;ll add them.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-1">
                        <Label htmlFor={`board-${idx}`} className="text-xs">Board basis</Label>
                        <select
                          id={`board-${idx}`}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                          value={leg.boardBasis}
                          onChange={(e) =>
                            setLegs((prev) =>
                              prev.map((l, i) =>
                                i === idx
                                  ? { ...l, boardBasis: e.target.value as 'FB' | 'HB' | 'BB' | 'AI' }
                                  : l,
                              ),
                            )
                          }
                        >
                          <option value="FB">Full board (FB)</option>
                          <option value="HB">Half board (HB)</option>
                          <option value="BB">Bed &amp; breakfast (BB)</option>
                          <option value="AI">All inclusive (AI)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep("route")}>Back</Button>
              <Button className="flex-1" disabled={!canContinueFromHotels()} onClick={() => setStep("activities")}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "activities" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Activities (optional)</CardTitle>
            <CardDescription>
              Add per-person costs for things like game drives, sundowners, or cultural visits.
              Activities are grouped by day so you can plan each day of the trip. Leave blank
              if unsure — we&apos;ll confirm with you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityDayCount === 0 ? (
              <p className="text-sm text-muted-foreground">
                Set your trip dates first to add activities.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: activityDayCount }, (_, dayIndex) => {
                  const dayActivities = activities.filter((a) => a.dayIndex === dayIndex);
                  const dayTotal = dayActivities.reduce(
                    (sum, a) => sum + (a.costPerPerson || 0),
                    0,
                  );
                  // Find which leg this day falls in so the card header can
                  // show the destination. Days are 0-indexed; leg[0] starts
                  // on day 0 and lasts `nights` days.
                  const cumulativeDays = legs.map((l) => l.nights);
                  let running = 0;
                  let legLabel: string | null = null;
                  for (let i = 0; i < legs.length; i++) {
                    if (dayIndex < running + cumulativeDays[i]) {
                      legLabel = legs[i].countyName;
                      break;
                    }
                    running += cumulativeDays[i];
                  }
                  return (
                    <Card key={dayIndex} className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span>Day {dayIndex + 1}</span>
                          {legLabel ? (
                            <span className="text-xs font-normal text-muted-foreground">
                              {legLabel}
                            </span>
                          ) : null}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {dayActivities.length === 0 && (
                          <p className="text-xs text-muted-foreground">
                            No activities for this day.
                          </p>
                        )}
                        {dayActivities.map((a) => (
                          <div
                            key={a.id}
                            className="grid grid-cols-[1fr_120px_auto] gap-2 items-end"
                          >
                            <div>
                              <Label htmlFor={`desc-${a.id}`} className="text-xs">
                                Description
                              </Label>
                              <Input
                                id={`desc-${a.id}`}
                                value={a.description}
                                placeholder="Morning game drive"
                                onChange={(e) =>
                                  updateActivity(a.id, { description: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`cost-${a.id}`} className="text-xs">
                                Cost / person
                              </Label>
                              <Input
                                id={`cost-${a.id}`}
                                type="number"
                                min={0}
                                value={a.costPerPerson}
                                onChange={(e) =>
                                  updateActivity(a.id, {
                                    costPerPerson: Math.max(0, Number(e.target.value)),
                                  })
                                }
                              />
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeActivity(a.id)}
                              type="button"
                              aria-label="Remove activity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addActivity(dayIndex)}
                            type="button"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add activity
                          </Button>
                          {dayActivities.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {dayActivities.length} activit{dayActivities.length === 1 ? "y" : "ies"}
                              {" · "}
                              {dayTotal > 0
                                ? `USD ${dayTotal.toLocaleString()}/pp`
                                : "—"}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep("hotels")}>Back</Button>
              <Button className="flex-1" onClick={() => setStep("review")}>
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "review" && reviewBreakdown && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Review your quote</CardTitle>
            <CardDescription>Indicative total — the server will return the final number below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <SummaryRow label="Trip" value={`${startDate} → ${endDate} · ${totalNights}n · ${pax} pax`} />
            <SummaryRow label="Vehicle" value={`${vehicle} (KES ${TRANSPORT_RATES[vehicle]}/day, ${totalDays} day${totalDays === 1 ? "" : "s"})`} />
            <Separator />
            <div className="space-y-2">
              {reviewBreakdown.legs.map(({ leg, nightTotal, legAccommodation, legParkFees }, i) => (
                <div key={i} className="text-sm">
                  <div className="flex justify-between">
                    <span>
                      <span className="font-medium">{leg.countyName}</span> · {leg.nights} night{leg.nights === 1 ? "" : "s"} at {leg.hotelName ?? "(no hotel)"}
                      {leg.priceSource === "CLIENT_SUPPLIED" && (
                        <span className="ml-2 text-xs rounded-full border border-amber-300 bg-amber-50 text-amber-800 px-2 py-0.5">
                          your rate ${leg.clientRatePerPersonSharing}/pp/night — to confirm
                        </span>
                      )}
                      {leg.priceSource === "NO_RATE" && (
                        <span className="ml-2 text-xs rounded-full border border-amber-300 bg-amber-50 text-amber-800 px-2 py-0.5">
                          no rate on file — to confirm
                        </span>
                      )}
                    </span>
                    <span>{leg.currency} {legAccommodation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Per night (room): {leg.currency} {nightTotal.toLocaleString()}</span>
                    {leg.parkFee ? (
                      <span>Park fees: {leg.currency} {legParkFees.toLocaleString()}</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <SummaryRow label="Accommodation" value={`${reviewBreakdown.currency} ${reviewBreakdown.accommodation.toLocaleString()}`} />
            {reviewBreakdown.parkFees > 0 && (
              <SummaryRow label="Park fees" value={`${reviewBreakdown.currency} ${reviewBreakdown.parkFees.toLocaleString()}`} />
            )}
            <SummaryRow label="Transport" value={`${reviewBreakdown.currency} ${reviewBreakdown.transport.toLocaleString()}`} />
            {reviewBreakdown.extras > 0 && (
              <SummaryRow label="Activities" value={`${reviewBreakdown.currency} ${reviewBreakdown.extras.toLocaleString()}`} />
            )}
            <SummaryRow label={`Markup (${MARKUP_PERCENT}%)`} value={`${reviewBreakdown.currency} ${reviewBreakdown.markup.toLocaleString()}`} />
            <Separator />
            <div className="flex justify-between font-medium text-base">
              <span>Total</span>
              <span>{reviewBreakdown.currency} {reviewBreakdown.total.toLocaleString()}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {reviewBreakdown.currency} {Math.round(reviewBreakdown.perPerson).toLocaleString()} per person · transport is a baseline
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep("activities")}>Back</Button>
              <Button className="flex-1" onClick={() => setStep("details")}>
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
              <Button variant="outline" onClick={() => setStep("review")}>Back</Button>
              <Button className="flex-1" disabled={submitting} onClick={handleSubmit}>
                {submitting ? "Generating quote..." : "Get my quote"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "result" && quote && (
        <ResultPanel quote={quote} />
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "trip", label: "Dates & travelers" },
    { key: "route", label: "Route" },
    { key: "hotels", label: "Hotels" },
    { key: "activities", label: "Activities" },
    { key: "review", label: "Review" },
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0 space-y-2">
        <p className="text-sm font-medium text-destructive">Something went wrong.</p>
        <p className="text-sm text-muted-foreground break-words">{message}</p>
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" /> Try again
        </Button>
      </div>
    </div>
  );
}

function ResultPanel({ quote }: { quote: QuoteResult }) {
  const structured = quote.structuredBreakdown;
  return (
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

        {structured ? (
          <>
            <Separator />
            <div className="space-y-1 text-sm">
              <SummaryRow label="Accommodation" value={`${structured.currency} ${structured.accommodation.toLocaleString()}`} />
              {structured.parkFees > 0 && (
                <SummaryRow label="Park fees" value={`${structured.currency} ${structured.parkFees.toLocaleString()}`} />
              )}
              <SummaryRow label={`Transport (${structured.vehicle.toLowerCase()})`} value={`${structured.currency} ${structured.transport.toLocaleString()}`} />
              {structured.extras > 0 && (
                <SummaryRow label="Activities" value={`${structured.currency} ${structured.extras.toLocaleString()}`} />
              )}
              <SummaryRow label={`Markup (10%)`} value={`${structured.currency} ${structured.markup.toLocaleString()}`} />
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              {structured.byLeg.map((l) => (
                <div key={l.legIndex} className="flex justify-between">
                  <span>
                    {l.countyName} · {l.hotelName} ({l.nights} night{l.nights === 1 ? "" : "s"})
                  </span>
                  <span>
                    {l.currency ?? structured.currency} {(l.accommodation + l.parkFees).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
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
        )}

        {(quote.anyUnmatchedSeason || structured) && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-3 text-sm text-amber-800 dark:text-amber-200">
            {structured
              ? "Transport is shown at our standard rate — final per-day rate depends on the season and the route; our team will confirm."
              : "One or more hotels didn't have a rate on file for your exact dates — this uses their most recent rate as a placeholder. Our team will confirm the final price."}
          </div>
        )}
        {structured?.byLeg?.some((l) => l.clientSuppliedRate) && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-3 text-sm text-amber-800 dark:text-amber-200">
            One or more hotels didn&apos;t have a rate on our system — you supplied a
            figure, and we&apos;ve used it in this total. Our team will confirm the
            final price with you before booking.
          </div>
        )}
        <p className="text-sm text-muted-foreground pt-2">
          We&apos;ve emailed this to you and our team will follow up to confirm availability.
        </p>
      </CardContent>
    </Card>
  );
}
