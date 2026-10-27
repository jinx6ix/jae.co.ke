import { prisma } from "@/lib/prisma";
import { getRateForPax } from "@/lib/rates";

export interface SeasonalPricingResult {
  success: boolean;
  pricePerPerson: number;
  totalPrice: number;
  season: string;
  currency: string;
  rateCardId?: string;
  matchedRateCard?: any;
  error?: string;
}

/**
 * Helper to parse a date string into a date-only (UTC midnight) object to avoid timezone shifts.
 */
function parseDateOnly(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(Date.UTC(year, month, day));
  }
  const d = new Date(dateStr);
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

/**
 * Determines the season name for a given date based on the official JaeTravel calendar rules:
 * - High: 15 June – 31 October
 * - High: 22 December – 1 January
 * - Mid: 2 January – 31 March
 * - Mid: 1 June – 14 June
 * - Mid: 1 November – 21 December
 * - Green: 1 April – 31 May
 */
export function getSeasonForDate(date: Date): string {
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();

  // High: 15 June – 31 October
  if ((month > 6 && month < 10) || (month === 6 && day >= 15) || (month === 10 && day <= 31)) {
    return 'HIGH';
  }
  // High: 22 December – 1 January
  if ((month === 12 && day >= 22) || (month === 1 && day <= 1)) {
    return 'HIGH';
  }
  // Green: 1 April – 31 May
  if (month === 4 || month === 5) {
    return 'GREEN';
  }
  // Mid: 2 January – 31 March
  if ((month === 1 && day >= 2) || (month >= 2 && month <= 3)) {
    return 'MID';
  }
  // Mid: 1 June – 14 June
  if (month === 6 && day <= 14) {
    return 'MID';
  }
  // Mid: 1 November – 21 December
  if ((month === 11) || (month === 12 && day <= 21)) {
    return 'MID';
  }

  return 'MID';
}

/**
 * Resolves the active seasonal rate card and price for a tour package on a given start date and pax count.
 */
export async function resolveTourPricing(
  tourIdentifier: string, // id, title, or slug
  startDateStr: string,
  numPax: number = 2
): Promise<SeasonalPricingResult> {
  const targetDate = parseDateOnly(startDateStr);
  const calculatedSeason = getSeasonForDate(targetDate);

  if (numPax < 1) {
    return {
      success: false,
      pricePerPerson: 0,
      totalPrice: 0,
      season: calculatedSeason,
      currency: 'USD',
      error: 'Invalid traveller count (must be at least 1)',
    };
  }

  // Find tour package by id, title, or slug
  let tourPackage = await prisma.tourPackage.findFirst({
    where: {
      OR: [
        { id: tourIdentifier },
        { title: { contains: tourIdentifier, mode: 'insensitive' } },
        { slug: tourIdentifier },
      ],
    },
    include: {
      rateCards: true,
    },
  });

  if (!tourPackage || !tourPackage.rateCards || tourPackage.rateCards.length === 0) {
    return {
      success: false,
      pricePerPerson: 0,
      totalPrice: 0,
      season: calculatedSeason,
      currency: 'USD',
      error: `No rate cards found for tour: ${tourIdentifier}`,
    };
  }

  const normalizedTargetSeason = calculatedSeason === 'GREEN' ? ['GREEN', 'LOW'] : [calculatedSeason];

  // 1. Strict match: date falls within validFrom/validTo AND season matches
  let matchedRateCard = tourPackage.rateCards.find((rc) => {
    if (!rc.validFrom || !rc.validTo) return false;
    const from = parseDateOnly(rc.validFrom.toISOString());
    const to = parseDateOnly(rc.validTo.toISOString());
    const rcSeason = (rc.season || '').toUpperCase();
    const seasonMatches = normalizedTargetSeason.includes(rcSeason) || rcSeason === 'STANDARD';
    return targetDate >= from && targetDate <= to && seasonMatches;
  });

  // 2. Fallback match: date falls within validFrom/validTo boundaries
  if (!matchedRateCard) {
    matchedRateCard = tourPackage.rateCards.find((rc) => {
      if (!rc.validFrom || !rc.validTo) return false;
      const from = parseDateOnly(rc.validFrom.toISOString());
      const to = parseDateOnly(rc.validTo.toISOString());
      return targetDate >= from && targetDate <= to;
    });
  }

  // 3. Fallback match: match strictly by season name
  if (!matchedRateCard) {
    matchedRateCard = tourPackage.rateCards.find((rc) => {
      const rcSeason = (rc.season || '').toUpperCase();
      return normalizedTargetSeason.includes(rcSeason);
    });
  }

  if (!matchedRateCard) {
    return {
      success: false,
      pricePerPerson: 0,
      totalPrice: 0,
      season: calculatedSeason,
      currency: 'USD',
      error: `No applicable rate card found for date ${startDateStr} (Season: ${calculatedSeason})`,
    };
  }

  const pricePerPerson = getRateForPax(matchedRateCard, numPax);
  const totalPrice = pricePerPerson * numPax;

  return {
    success: true,
    pricePerPerson,
    totalPrice,
    season: matchedRateCard.season || calculatedSeason,
    currency: matchedRateCard.currency || 'USD',
    rateCardId: matchedRateCard.id,
    matchedRateCard,
  };
}
