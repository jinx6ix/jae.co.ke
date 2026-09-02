'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tour { id: string; title: string; durationDays: number; durationNights: number; }
interface RateCard { id: string; season: string; currency: string; basedOn2: number; basedOn4: number; basedOn6: number; basedOn8: number; basedOn9?: number|null; basedOn10?: number|null; basedOn12?: number|null; markupPercent: number; }
interface Client { id: string; name: string; agentId?: string|null; agent?: { id: string; name: string; company?: string|null }|null; }
interface Agent  { id: string; name: string; company?: string|null; }
interface Booking {
  id: string; bookingRef: string; clientId: string; client: { name: string };
  tourPackageId?: string|null;
  startDate?: string | null;
  endDate?: string | null;
  numAdults?: number | null;
  numChildren?: number | null;
}
interface Hotel { id: number; name: string; stars?: number|null; county: { id: number; name: string }; }
interface RoomPrice { id: number; ratePerPersonSharing?: number|null; singleRoomRate?: number|null; childRate?: number|null; thirdAdultRate?: number|null; currency: string; roomType: { id: number; name: string; maxOccupancy: number }; season: { id: number; name: string; startDate: string; endDate: string }; }
interface Destination { id: number; name: string; }
interface Props { tours: Tour[]; rateCards: (RateCard & { tourPackage: Tour })[]; clients?: Client[]; agents?: Agent[]; bookings?: Booking[]; hotels?: Hotel[]; destinations?: Destination[]; initialCostSheet?: any; }

interface DayRow {
  destinationId: number|null; hotelId: string; hotelName: string;
  adultAccomTotal: number; childAccomTotal: number; singleRoomRate: number; thirdPersonRate: number;
  parkFeeAdultTotal: number; parkFeeChildTotal: number; transportTotal: number;
  hasFlight: boolean; flightAdultPP: number; flightChildPP: number;
  isTriple: boolean; tripleRate: number;
  selectedRateId: number|null; availableRates: RoomPrice[]; ratesLoading: boolean; ratesMatched: boolean;
}

const BOARD_BASIS = [
  { code: 'FB', label: 'Full Board' }, { code: 'HB', label: 'Half Board' },
  { code: 'BB', label: 'Bed & Breakfast' }, { code: 'RO', label: 'Room Only' },
];

function emptyRow(): DayRow {
  return { destinationId: null, hotelId: '', hotelName: '', adultAccomTotal: 0, childAccomTotal: 0,
    singleRoomRate: 0, thirdPersonRate: 0, parkFeeAdultTotal: 0, parkFeeChildTotal: 0, transportTotal: 0,
    hasFlight: false, flightAdultPP: 0, flightChildPP: 0, isTriple: false, tripleRate: 0,
    selectedRateId: null, availableRates: [], ratesLoading: false, ratesMatched: false };
}

function fmt2(n: number) { return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtC(n: number, cur: string) { return `${cur} ${fmt2(n)}`; }

// ─── NumberInput helper ───────────────────────────────────────────────────────
function NumInput({ value, onChange, placeholder = '0', className = '' }: { value: number; onChange: (v: number) => void; placeholder?: string; className?: string }) {
  return (
    <input type="number" min={0} step="0.01" value={value || ''} onChange={e => onChange(Number(e.target.value))}
      className={`w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-mono text-right focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition ${className}`}
      placeholder={placeholder} />
  );
}

// ─── FieldLabel helper ────────────────────────────────────────────────────────
function FL({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium text-gray-500 mb-1">{children}</p>;
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionTitle({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-base">{icon}</span>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function RateCalculator({
  tours, rateCards, clients = [], agents = [], bookings = [],
  hotels: initHotels = [], destinations: initDests = [], initialCostSheet,
}: Props) {
  const [localHotels, setLocalHotels] = useState<Hotel[]>(initHotels);
  const [localDests,  setLocalDests]  = useState<Destination[]>(initDests);
  const [localClients, setLocalClients] = useState<Client[]>(clients);
  const [localBookings, setLocalBookings] = useState<Booking[]>(bookings);

  // Version management
  const [costSheetsList, setCostSheetsList] = useState<any[]>([]);
  const [currentCostSheetId, setCurrentCostSheetId] = useState<string | null>(null);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);

  // Linking
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const clientInputRef = useRef<HTMLInputElement>(null);
  const clientDropdownRef = useRef<HTMLDivElement>(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [clientId, setClientId]   = useState('');
  const [agentId,  setAgentId]    = useState('');
  const [bookingId, setBookingId] = useState('');
  const [tourId,   setTourId]     = useState('');

  // Trip settings
  const [numAdults,   setNumAdults]   = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [numDays,     setNumDays]     = useState(1);
  const [numNights,   setNumNights]   = useState(0);
  const [currency,    setCurrency]    = useState('USD');
  const [boardBasis,  setBoardBasis]  = useState('FB');
  const [startDate,   setStartDate]   = useState('');
  const [globalMarkup, setGlobalMarkup] = useState(10);
  const [notes, setNotes] = useState('');

  // Day rows
  const [dayRows, setDayRows] = useState<DayRow[]>([emptyRow()]);

  // Extras
  const [fileHandling,     setFileHandling]     = useState(0);
  const [ecoBottle,        setEcoBottle]        = useState(0);
  const [evacInsurance,    setEvacInsurance]    = useState(0);
  const [extraItems,       setExtraItems]       = useState<{ label: string; cost: number }[]>([]);
  const [maasaiVillage,    setMaasaiVillage]    = useState(false);
  const [maasaiCostTotal,  setMaasaiCostTotal]  = useState(0);
  const [arrivalTransfer,  setArrivalTransfer]  = useState(false);
  const [arrivalTotal,     setArrivalTotal]     = useState(0);
  const [departureTransfer,setDepartureTransfer]= useState(false);
  const [departureTotal,   setDepartureTotal]   = useState(0);

  // Options table
  const [options, setOptions] = useState<{ pax: number; markup: number }[]>([]);

  // UI
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [saveError, setSaveError] = useState('');
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));

  // ── Computed ─────────────────────────────────────────────────────────────
  const numPax = numAdults + numChildren;
  const maxDisplayPax = Math.min(numPax, 12);
  const filteredClients = localClients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()));
  const exactMatch = filteredClients.some(c =>
    c.name.toLowerCase() === clientSearch.toLowerCase());

  function toggleDay(i: number) {
    setExpandedDays(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(e.target as Node) &&
          clientInputRef.current && !clientInputRef.current.contains(e.target as Node))
        setShowClientDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (numPax === 0) { setOptions([]); return; }
    setOptions(prev => {
      if (prev.length === maxDisplayPax && prev.every((o, i) => o.pax === i + 1)) return prev;
      const next = [];
      for (let p = 1; p <= maxDisplayPax; p++) {
        const ex = prev.find(o => o.pax === p);
        next.push({ pax: p, markup: ex?.markup ?? globalMarkup });
      }
      return next;
    });
  }, [numPax, maxDisplayPax]);

  useEffect(() => {
    const t = tours.find(t => t.id === tourId);
    if (t) {
      setNumDays(t.durationDays);
      setNumNights(t.durationNights);
      setDayRows(Array.from({ length: t.durationDays }, () => emptyRow()));
      setExpandedDays(new Set(Array.from({ length: t.durationDays }, (_, i) => i)));
    }
  }, [tourId, tours]);

  useEffect(() => {
    setDayRows(prev => {
      if (prev.length === numDays) return prev;
      return Array.from({ length: numDays }, (_, i) => prev[i] || emptyRow());
    });
    setExpandedDays(prev => {
      const next = new Set(prev);
      for (let i = prev.size; i < numDays; i++) next.add(i);
      return next;
    });
  }, [numDays]);

  useEffect(() => {
    if (!bookingId) return;
    const b = localBookings.find(b => b.id === bookingId);
    if (!b) return;
    setClientId(b.clientId);
    setClientSearch(b.client.name);
    if (b.tourPackageId) setTourId(b.tourPackageId);
    const c = localClients.find(c => c.id === b.clientId);
    if (c?.agentId) setAgentId(c.agentId);
    if (b.startDate) setStartDate(b.startDate.split('T')[0]);
    if (typeof b.numAdults === 'number') setNumAdults(b.numAdults);
    if (typeof b.numChildren === 'number') setNumChildren(b.numChildren);
    if (b.startDate && b.endDate) {
      const days = Math.max(1, Math.round((new Date(b.endDate).getTime() - new Date(b.startDate).getTime()) / 86400000) + 1);
      setNumDays(days); setNumNights(Math.max(0, days - 1));
    }
  }, [bookingId, localBookings, localClients]);

  useEffect(() => {
    if (!clientId) return;
    const c = localClients.find(c => c.id === clientId);
    if (c?.agentId) setAgentId(c.agentId);
  }, [clientId, localClients]);

  useEffect(() => {
    if (numChildren === 0)
      setDayRows(prev => prev.map(r => ({ ...r, childAccomTotal: 0, parkFeeChildTotal: 0, flightChildPP: 0 })));
  }, [numChildren]);

  const fetchCostSheets = useCallback(async () => {
    if (!clientId && !bookingId) { setCostSheetsList([]); return; }
    const params = new URLSearchParams();
    if (clientId) params.append('clientId', clientId);
    if (bookingId) params.append('bookingId', bookingId);
    const res = await fetch(`/api/cost-sheets?${params}`);
    const data = await res.json();
    setCostSheetsList(Array.isArray(data) ? data : (data.data || []));
  }, [clientId, bookingId]);

  const loadCostSheet = useCallback(async (sheetId: string) => {
    if (!sheetId) return;
    setIsLoadingSheet(true);
    try {
      const sheet = await fetch(`/api/cost-sheets/${sheetId}`).then(r => r.json());
      if (!sheet.id) return;
      setCurrentCostSheetId(sheet.id);
      setClientId(sheet.clientId || ''); setClientSearch(sheet.client?.name || '');
      setAgentId(sheet.agentId || ''); setBookingId(sheet.bookingId || '');
      setTourId(sheet.booking?.tourPackageId || '');
      setNumAdults(sheet.numAdults || 0); setNumChildren(sheet.numChildren || 0);
      setNumDays(sheet.days || 1); setBoardBasis(sheet.boardBasis || 'FB');
      setCurrency(sheet.currency || 'USD'); setGlobalMarkup(sheet.markupPercent || 10);
      setFileHandling(sheet.fileHandlingFee || 0); setEcoBottle(sheet.ecoBottle || 0);
      setEvacInsurance(sheet.evacInsurance || 0);
      setArrivalTransfer(sheet.arrivalTransfer > 0); setArrivalTotal(sheet.arrivalTransfer || 0);
      setDepartureTransfer(sheet.departureTransfer > 0); setDepartureTotal(sheet.departureTransfer || 0);
      setMaasaiVillage(!!sheet.maasaiVillage); setMaasaiCostTotal(sheet.maasaiCost || 0);
      setNotes(sheet.notes || '');
      let extrasArr = []; try { extrasArr = JSON.parse(sheet.extras || '[]'); } catch {}
      setExtraItems(extrasArr);
      let parsedRows = []; try { parsedRows = JSON.parse(sheet.dayRows || '[]'); } catch {}
      const newRows = parsedRows.map((row: any) => ({
        ...emptyRow(), destinationId: row.destinationId ?? null, hotelId: row.hotelId || '',
        hotelName: row.hotelName || '', adultAccomTotal: row.adultAccomTotal ?? 0,
        childAccomTotal: row.childAccomTotal ?? 0, singleRoomRate: row.singleRoomRate ?? 0,
        thirdPersonRate: row.thirdPersonRate ?? 0, parkFeeAdultTotal: row.parkFeeAdultTotal ?? 0,
        parkFeeChildTotal: row.parkFeeChildTotal ?? 0, transportTotal: row.transportTotal ?? 0,
        hasFlight: !!row.hasFlight, flightAdultPP: row.flightAdultPP ?? 0,
        flightChildPP: row.flightChildPP ?? 0, isTriple: row.isTriple ?? false,
        tripleRate: row.tripleRate ?? 0, selectedRateId: row.selectedRateId ?? null,
      }));
      setDayRows(newRows);
      setExpandedDays(new Set(newRows.map((_: any, i: number) => i)));
    } catch (err) { console.error('Failed to load cost sheet', err); }
    finally { setIsLoadingSheet(false); }
  }, []);

  useEffect(() => { if (initialCostSheet) loadCostSheet(initialCostSheet.id); }, [initialCostSheet, loadCostSheet]);
  useEffect(() => { fetchCostSheets(); }, [fetchCostSheets]);

  const refreshData = async () => {
    const [h, d, c, b] = await Promise.all([
      fetch('/api/safari-rates/hotels').then(r => r.json()),
      fetch('/api/safari-rates/destinations').then(r => r.json()),
      fetch('/api/clients').then(r => r.json()),
      fetch('/api/bookings?all=1').then(r => r.json()),
    ]);
    setLocalHotels(Array.isArray(h) ? h : []);
    setLocalDests(Array.isArray(d) ? d : []);
    setLocalClients(Array.isArray(c) ? c : []);
    setLocalBookings(Array.isArray(b) ? b : []);
  };

  useEffect(() => {
    refreshData();
    const onFocus = () => refreshData();
    const onVisible = () => { if (document.visibilityState === 'visible') refreshData(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);
    return () => { window.removeEventListener('focus', onFocus); document.removeEventListener('visibilitychange', onVisible); };
  }, []);

  // ── Row helpers ───────────────────────────────────────────────────────────
  function updateRow(i: number, patch: Partial<DayRow>) {
    setDayRows(prev => prev.map((r, j) => j === i ? { ...r, ...patch } : r));
  }

  const fetchRates = useCallback(async (i: number, hotelId: string, board: string, date?: string) => {
    if (!hotelId) return;
    updateRow(i, { ratesLoading: true, availableRates: [], ratesMatched: false });
    try {
      const data = await fetch(`/api/safari-rates/lookup?hotelId=${hotelId}&boardBasis=${board}${date ? `&date=${date}` : ''}`).then(r => r.json());
      updateRow(i, { ratesLoading: false, availableRates: data.prices || [], ratesMatched: data.matched === true });
    } catch { updateRow(i, { ratesLoading: false, ratesMatched: false }); }
  }, []);

  function dayDate(i: number) {
    if (!startDate) return undefined;
    return new Date(new Date(startDate).getTime() + i * 86400000).toISOString().split('T')[0];
  }

  function onHotelChange(i: number, hotelId: string) {
    const hotel = localHotels.find(h => String(h.id) === hotelId);
    updateRow(i, { hotelId, hotelName: hotel?.name || '', destinationId: hotel?.county?.id ?? dayRows[i].destinationId,
      adultAccomTotal: 0, childAccomTotal: 0, singleRoomRate: 0, thirdPersonRate: 0,
      selectedRateId: null, isTriple: false, tripleRate: 0 });
    if (hotelId) fetchRates(i, hotelId, boardBasis, dayDate(i));
  }

  function onRoomPriceSelect(i: number, priceId: string) {
    const price = dayRows[i].availableRates.find(p => String(p.id) === priceId);
    if (!price) return;
    const tripleRate = price.thirdAdultRate && price.ratePerPersonSharing
      ? price.ratePerPersonSharing * 2 + price.thirdAdultRate : 0;
    updateRow(i, { selectedRateId: price.id, adultAccomTotal: price.ratePerPersonSharing || 0,
      childAccomTotal: numChildren > 0 ? price.childRate || 0 : 0,
      singleRoomRate: price.singleRoomRate || 0, thirdPersonRate: price.thirdAdultRate || 0, tripleRate });
  }

  useEffect(() => {
    if (!startDate) return;
    dayRows.forEach((row, i) => { if (row.hotelId) fetchRates(i, row.hotelId, boardBasis, dayDate(i)); });
  }, [startDate, boardBasis]);

  // ── Client helpers ────────────────────────────────────────────────────────
  const createClient = async (name: string) => {
    setIsCreatingClient(true);
    try {
      const res = await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, agentId: agentId || null }) });
      if (res.ok) {
        const nc = await res.json();
        setLocalClients(prev => [...prev, nc]);
        setClientId(nc.id); setClientSearch(nc.name); return nc;
      }
    } catch { alert('Could not create client. Please try again.'); }
    finally { setIsCreatingClient(false); }
    return null;
  };

  const handleClientSelect = async (client: Client | null, typedName: string) => {
    if (client) { setClientId(client.id); setClientSearch(client.name); setShowClientDropdown(false); }
    else if (typedName.trim()) {
      const nc = await createClient(typedName.trim());
      if (nc) { setClientId(nc.id); setClientSearch(nc.name); setShowClientDropdown(false); }
    }
  };

  // ── Accommodation group total ─────────────────────────────────────────────
  function getAccomGroup(row: DayRow): number {
    if (row.isTriple) return row.tripleRate;
    if (numAdults === 1 && row.singleRoomRate > 0) return row.singleRoomRate;
    if (numAdults > 1 && row.singleRoomRate > 0) return row.adultAccomTotal * (numAdults - 1) + row.singleRoomRate;
    return row.adultAccomTotal * numAdults;
  }

  function getSelectedRate(row: DayRow) {
    if (!row.selectedRateId) return undefined;
    return row.availableRates.find(r => r.id === row.selectedRateId);
  }

  // ── Rolling totals ────────────────────────────────────────────────────────
  const accomGroupTotal    = dayRows.reduce((s, r) => s + getAccomGroup(r), 0);
  const parkGroupTotal     = dayRows.reduce((s, r) => s + r.parkFeeAdultTotal + r.parkFeeChildTotal, 0);
  const transportGroupTotal = dayRows.reduce((s, r) => s + r.transportTotal, 0);
  const flightGroupTotal   = dayRows.reduce((s, r) => s + (r.hasFlight ? r.flightAdultPP * numAdults + r.flightChildPP * numChildren : 0), 0);
  const extrasGroupTotal   = extraItems.reduce((s, e) => s + e.cost, 0) + fileHandling + ecoBottle + evacInsurance
    + (maasaiVillage ? maasaiCostTotal : 0) + (arrivalTransfer ? arrivalTotal : 0) + (departureTransfer ? departureTotal : 0);
  const flightAndExtrasGroupTotal = flightGroupTotal + extrasGroupTotal;
  const subtotal = accomGroupTotal + parkGroupTotal + transportGroupTotal + flightGroupTotal + extrasGroupTotal;
  const markupAmount = subtotal * (globalMarkup / 100);
  const grandTotal = subtotal + markupAmount;
  const adultUnits = numAdults + numChildren * 0.5;
  const perAdult = adultUnits > 0 ? grandTotal / adultUnits : 0;
  const perChild = numChildren > 0 ? perAdult * 0.5 : 0;

  const optionResults = options.map(opt => {
    const pax = opt.pax;
    const accomT = dayRows.reduce((s, r) => s + getAccomGroup(r), 0);
    const transT = dayRows.reduce((s, r) => s + r.transportTotal, 0);
    const base = (accomT / pax) + (parkGroupTotal / pax) + (transT / pax) + (flightAndExtrasGroupTotal / pax);
    const markedUp = base * (1 + opt.markup / 100);
    return { ...opt, perPersonBase: base, markedUp, profit: markedUp - base };
  });

  const selectedTour    = tours.find(t => t.id === tourId);
  const selectedClientObj = localClients.find(c => c.id === clientId);
  const selectedAgent   = agents.find(a => a.id === agentId);
  const selectedBooking = localBookings.find(b => b.id === bookingId);
  const currentIndex    = costSheetsList.findIndex(s => s.id === currentCostSheetId);

  // ── Payload builder ───────────────────────────────────────────────────────
  function buildPayload() {
    const safe = (n: number) => isNaN(n) ? 0 : n;
    return {
      bookingId: bookingId || null, clientId: clientId || null, agentId: agentId || null,
      bookingRef: selectedBooking?.bookingRef || null,
      tourTitle: selectedTour?.title || 'Custom Tour',
      days: numDays, numAdults, numChildren, numPax, boardBasis, currency,
      dayRows: JSON.stringify(dayRows.map(r => ({
        destinationId: r.destinationId, hotelId: r.hotelId, hotelName: r.hotelName,
        adultAccomTotal: r.adultAccomTotal, childAccomTotal: r.childAccomTotal,
        singleRoomRate: r.singleRoomRate, thirdPersonRate: r.thirdPersonRate,
        parkFeeAdultTotal: r.parkFeeAdultTotal, parkFeeChildTotal: r.parkFeeChildTotal,
        transportTotal: r.transportTotal, hasFlight: r.hasFlight,
        flightAdultPP: r.flightAdultPP, flightChildPP: r.flightChildPP,
        isTriple: r.isTriple, tripleRate: r.tripleRate, selectedRateId: r.selectedRateId,
      }))),
      fileHandlingFee: fileHandling, ecoBottle, evacInsurance,
      arrivalTransfer: arrivalTotal, departureTransfer: departureTotal,
      extras: JSON.stringify(extraItems.filter(e => e.cost > 0)),
      maasaiVillage, maasaiCost: maasaiCostTotal,
      subtotal: safe(subtotal), markupPercent: globalMarkup,
      markupAmount: safe(markupAmount), totalCost: safe(grandTotal),
      perAdultCost: safe(perAdult), perChildCost: safe(perChild), notes,
    };
  }

  async function handleSave() {
    setSaving(true); setSaved(false); setSaveError('');
    try {
      const res = currentCostSheetId
        ? await fetch(`/api/cost-sheets/${currentCostSheetId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload()) })
        : await fetch('/api/cost-sheets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload()) });
      if (res.ok) {
        const updated = await res.json();
        setCurrentCostSheetId(updated.id); setSaved(true);
        await fetchCostSheets(); setTimeout(() => setSaved(false), 3000);
      } else { const err = await res.json(); setSaveError(err.error || `Save failed (${res.status})`); }
    } catch (err: any) { setSaveError(err.message || 'Network error'); }
    finally { setSaving(false); }
  }

  async function handleSaveAsNew() {
    setSaving(true); setSaved(false); setSaveError('');
    try {
      const res = await fetch('/api/cost-sheets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload()) });
      if (res.ok) {
        const ns = await res.json();
        setCurrentCostSheetId(ns.id); setSaved(true);
        await fetchCostSheets(); setTimeout(() => setSaved(false), 3000);
      } else { const err = await res.json(); setSaveError(err.error || `Save failed (${res.status})`); }
    } catch (err: any) { setSaveError(err.message || 'Network error'); }
    finally { setSaving(false); }
  }
}
  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <div className="space-y-4">

      {/* Header / Save bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cost Calculator</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {selectedClientObj
                ? <span className="font-medium text-orange-700">{selectedClientObj.name}</span>
                : <span className="italic text-gray-400">No client selected</span>}
              {selectedTour && <span className="text-gray-400"> · {selectedTour.title}</span>}
              {numDays > 0 && numNights > 0 && <span className="text-gray-400"> · {numDays}D/{numNights}N</span>}
              {currentCostSheetId && currentIndex >= 0 && (
                <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  v{currentIndex + 1} of {costSheetsList.length}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={refreshData}
              className="text-xs text-gray-400 hover:text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition">
              ↺ Refresh
            </button>
            {costSheetsList.length > 0 && (
              <select
                className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 max-w-xs"
                value={currentCostSheetId || ''} onChange={e => loadCostSheet(e.target.value)} disabled={isLoadingSheet}>
                <option value="">— Load version —</option>
                {costSheetsList.map((s, idx) => (
                  <option key={s.id} value={s.id}>
                    {new Date(s.createdAt).toLocaleDateString()} · v{idx + 1} · {s.tourTitle}
                  </option>
                ))}
              </select>
            )}
            {costSheetsList.length > 1 && (
              <div className="flex gap-1">
                <button onClick={() => currentIndex > 0 && loadCostSheet(costSheetsList[currentIndex - 1].id)}
                  disabled={currentIndex <= 0 || isLoadingSheet}
                  className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition">◀</button>
                <button onClick={() => currentIndex < costSheetsList.length - 1 && loadCostSheet(costSheetsList[currentIndex + 1].id)}
                  disabled={currentIndex >= costSheetsList.length - 1 || isLoadingSheet}
                  className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition">▶</button>
              </div>
            )}
            <button onClick={handleSaveAsNew} disabled={saving}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50">
              Copy
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-lg font-semibold transition disabled:opacity-50 shadow-sm">
              {saving ? 'Saving…' : currentCostSheetId ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
        {saved && <div className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">✓ Saved{selectedClientObj ? ` and linked to ${selectedClientObj.name}` : ''}.</div>}
        {saveError && <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{saveError}</div>}
      </div>

      {/* Context: Client / Booking / Tour */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Link to Client & Booking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Client autocomplete */}
          <div className="relative">
            <FL>Client *</FL>
            <input ref={clientInputRef} type="text"
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              value={clientSearch}
              onChange={e => { setClientSearch(e.target.value); setShowClientDropdown(true); if (!e.target.value) setClientId(''); }}
              onFocus={() => setShowClientDropdown(true)}
              placeholder="Type to search or create…"
              autoComplete="off" />
            {showClientDropdown && (filteredClients.length > 0 || clientSearch.trim()) && (
              <div ref={clientDropdownRef}
                className="absolute z-20 mt-1 w-full max-h-56 overflow-auto bg-white border border-gray-200 rounded-xl shadow-lg">
                {filteredClients.map(c => (
                  <div key={c.id}
                    className="px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm text-gray-800"
                    onClick={() => handleClientSelect(c, '')}>
                    {c.name}
                  </div>
                ))}
                {!exactMatch && clientSearch.trim() && (
                  <div className="px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm text-orange-600 border-t border-gray-100 font-medium"
                    onClick={() => handleClientSelect(null, clientSearch)}>
                    + Create "{clientSearch}"
                  </div>
                )}
                {isCreatingClient && <div className="px-3 py-2 text-gray-400 text-sm">Creating…</div>}
              </div>
            )}
          </div>
          {/* Agent */}
          <div>
            <FL>Agent</FL>
            <select className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition bg-white"
              value={agentId} onChange={e => setAgentId(e.target.value)}>
              <option value="">— No agent —</option>
              {agents.map(a => <option key={a.id} value={a.id}>{a.name}{a.company ? ` (${a.company})` : ''}</option>)}
            </select>
          </div>
          {/* Booking */}
          <div>
            <FL>Booking (optional)</FL>
            <select className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition bg-white"
              value={bookingId} onChange={e => setBookingId(e.target.value)}>
              <option value="">— Standalone —</option>
              {(clientId ? localBookings.filter(b => b.clientId === clientId) : localBookings).map(b => (
                <option key={b.id} value={b.id}>{b.bookingRef} · {b.client.name}</option>
              ))}
            </select>
          </div>
          {/* Tour */}
          <div>
            <FL>Tour Package</FL>
            <select className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition bg-white"
              value={tourId} onChange={e => setTourId(e.target.value)}>
              <option value="">— Manual —</option>
              {tours.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
        </div>
        {/* Context pills */}
        {(selectedClientObj || selectedAgent || selectedBooking) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedAgent && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
                🤝 {selectedAgent.name}{selectedAgent.company ? ` · ${selectedAgent.company}` : ''}
              </span>
            )}
            {selectedClientObj && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full">
                👤 {selectedClientObj.name}
              </span>
            )}
            {selectedBooking && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                📋 {selectedBooking.bookingRef}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Trip Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Trip Details</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div>
            <FL>Adults</FL>
            <input type="number" min={0} value={numAdults || ''} onChange={e => setNumAdults(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-orange-300 transition" />
          </div>
          <div>
            <FL>Children <span className="text-gray-400 font-normal">({numPax} total)</span></FL>
            <input type="number" min={0} value={numChildren || ''} onChange={e => setNumChildren(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-orange-300 transition" />
          </div>
          <div>
            <FL>Days</FL>
            <input type="number" min={1} value={numDays || ''} onChange={e => setNumDays(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-orange-300 transition" />
          </div>
          <div>
            <FL>Start Date</FL>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition" />
          </div>
          <div>
            <FL>Board</FL>
            <select value={boardBasis} onChange={e => setBoardBasis(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition">
              {BOARD_BASIS.map(b => <option key={b.code} value={b.code}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <FL>Currency</FL>
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition">
              {['USD','KES','EUR','GBP'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <FL>Markup %</FL>
            <input type="number" min={0} max={200} value={globalMarkup || ''} onChange={e => setGlobalMarkup(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-orange-300 transition" />
          </div>
        </div>
      </div>
  // __JSX_START__
