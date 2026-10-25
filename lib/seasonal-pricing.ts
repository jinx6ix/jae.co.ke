import { prisma } from "@/lib/prisma";
import { getRateForPax } from "@/lib/rates";

export interface SeasonalPricingResult {
  pricePerPerson: number;
  totalPrice: number;
  season: string;
  currency: string;
  rateCardId?: string;
  matchedRateCard?: any;
}

/**
 * Resolves the active seasonal rate card and price for a tour package on a given start date and pax count.
 */
export async function resolveTourPricing(
  tourIdentifier: string, // id or slug
  startDateStr: string,
  numPax: number = 2
): Promise<SeasonalPricingResult> {
  const targetDate = startDateStr ? new Date(startDateStr) : new Date();

  // Find tour package by id or title/slug
  let tourPackage = await prisma.tourPackage.findFirst({
    where: {
      OR: [
        { id: tourIdentifier },
        { title: { contains: tourIdentifier, mode: 'insensitive' } },
      ],
    },
    include: {
      rateCards: true,
    },
  });

  if (!tourPackage || !tourPackage.rateCards || tourPackage.rateCards.length === 0) {
    // Fallback default pricing if no rate card found
    return {
      pricePerPerson: 1200,
      totalPrice: 1200 * Math.max(1, numPax),
      season: 'STANDARD',
      currency: 'USD',
    };
  }

  // Find rate card where targetDate is between validFrom and validTo
  let matchedRateCard = tourPackage.rateCards.find((rc) => {
    const from = new Date(rc.validFrom);
    const to = new Date(rc.validTo);
    return targetDate >= from && targetDate <= to;
  });

  // If no date-matched rate card, fall back to the first available rate card
  if (!matchedRateCard) {
    matchedRateCard = tourPackage.rateCards[0];
  }

  const pricePerPerson = getRateForPax(matchedRateCard, numPax);
  const totalPrice = pricePerPerson * Math.max(1, numPax);

  return {
    pricePerPerson,
    totalPrice,
    season: matchedRateCard.season || 'STANDARD',
    currency: matchedRateCard.currency || 'USD',
    rateCardId: matchedRateCard.id,
    matchedRateCard,
  };
}
