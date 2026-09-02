// lib/rates.ts

export interface CostBreakdown {
  propertyPerNight: number;
  totalPropertyCost: number;
  parkFees: number;
  transport: number;
  extras: number;
  fileHandlingFee: number;
  ecoBottle: number;
  evacInsurance: number;
  subtotal: number;
  markupAmount: number;
  totalCost: number;
  perPersonCost: number;
  currency: string;
}

export interface CostInput {
  days: number;
  numPax: number;
  propertyRatePerNight: number;
  numNights?: number;
  parkFeesPerDay?: number;
  transportCost?: number;
  extras?: Array<{ description: string; cost: number }>;
  fileHandlingFee?: number;
  ecoBottle?: number;
  evacInsurance?: number;
  markupPercent?: number;
  currency?: string;
}

/**
 * Calculates tour costs based on the costing sheet structure.
 * Supports "based on N people" pricing similar to the Excel sheet.
 */
export function calculateCost(input: CostInput): CostBreakdown {
  const {
    days,
    numPax,
    propertyRatePerNight,
    numNights = days > 1 ? days - 1 : 0,
    parkFeesPerDay = 0,
    transportCost = 0,
    extras = [],
    fileHandlingFee = 0,
    ecoBottle = 0,
    evacInsurance = 0,
    markupPercent = 10,
    currency = 'USD',
  } = input;

  const totalPropertyCost = propertyRatePerNight * numNights * numPax;
  const parkFees = parkFeesPerDay * days * numPax;
  const extrasTotal = extras.reduce((sum, e) => sum + e.cost, 0);

  const subtotal =
    totalPropertyCost +
    parkFees +
    transportCost +
    extrasTotal +
    fileHandlingFee +
    ecoBottle +
    evacInsurance;

  const markupAmount = subtotal * (markupPercent / 100);
  const totalCost = subtotal + markupAmount;
  const perPersonCost = numPax > 0 ? totalCost / numPax : totalCost;

  return {
    propertyPerNight: propertyRatePerNight,
    totalPropertyCost,
    parkFees,
    transport: transportCost,
    extras: extrasTotal,
    fileHandlingFee,
    ecoBottle,
    evacInsurance,
    subtotal,
    markupAmount,
    totalCost,
    perPersonCost,
    currency,
  };
}

/**
 * Gets per-person rate from a rate card based on pax count.
 */
export function getRateForPax(
  rateCard: {
    basedOn2: number;
    basedOn4: number;
    basedOn6: number;
    basedOn8: number;
    basedOn9?: number | null;
    basedOn10?: number | null;
    basedOn12?: number | null;
    markupPercent: number;
  },
  numPax: number
): number {
  let baseRate: number;

  if (numPax <= 2) baseRate = rateCard.basedOn2;
  else if (numPax <= 4) baseRate = rateCard.basedOn4;
  else if (numPax <= 6) baseRate = rateCard.basedOn6;
  else if (numPax <= 8) baseRate = rateCard.basedOn8;
  // 9 pax: use explicit basedOn9 if present, else interpolate 8→10
  else if (numPax === 9) {
    if (rateCard.basedOn9 != null) baseRate = rateCard.basedOn9;
    else if (rateCard.basedOn10 != null) baseRate = rateCard.basedOn8 + (rateCard.basedOn10 - rateCard.basedOn8) / 2;
    else baseRate = rateCard.basedOn8;
  }
  else if (numPax <= 10 && rateCard.basedOn10 != null) baseRate = rateCard.basedOn10;
  else if (rateCard.basedOn12 != null) baseRate = rateCard.basedOn12;
  else baseRate = rateCard.basedOn8; // fallback to 8-pax rate

  // Rate card values are already per-person and include markup
  return baseRate;
}

/** Returns a 4-digit hex string from crypto.randomBytes for collision-resistant IDs. */
function cryptoSuffix(bytes = 2): string {
  if (typeof crypto !== 'undefined' && typeof (crypto as any).getRandomValues === 'function') {
    const arr = new Uint8Array(bytes);
    (crypto as any).getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  // Node.js fallback
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { randomBytes } = require('crypto') as typeof import('crypto');
    return randomBytes(bytes).toString('hex').toUpperCase();
  } catch {
    // Last-resort fallback (should never happen in practice)
    return Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase();
  }
}

/**
 * Generates a voucher number in the format JTE-DDMMYY-XXXX
 * Uses 4 hex chars (~65k combinations) instead of 2 decimal digits (~100) to minimise collisions.
 */
export function generateVoucherNo(checkInDate?: Date): string {
  const date = checkInDate ?? new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `JTE${dd}${mm}${yy}${cryptoSuffix(2)}`;
}

/**
 * Generates an invoice number in the format INV-YYYY-XXXXXXXX
 */
export function generateInvoiceNo(): string {
  const year = new Date().getFullYear();
  return `INV-${year}-${cryptoSuffix(4)}`;
}

/**
 * Generates a booking reference in the format JTE-YYYY-XXXXXXXX
 */
export function generateBookingRef(): string {
  const year = new Date().getFullYear();
  return `JTE-${year}-${cryptoSuffix(4)}`;
}
