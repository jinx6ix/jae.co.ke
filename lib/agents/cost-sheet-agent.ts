// lib/agents/cost-sheet-agent.ts
import { prisma } from '@/lib/prisma';
import { extractJson } from './llm';
import { Agent, AgentContext, AgentStepResult } from './types';

export const costSheetAgent: Agent = {
  name: 'cost-sheet',
  description: 'Drafts cost sheets from a booking brief, using live contract rates.',
  async run(ctx: AgentContext): Promise<AgentStepResult> {
    const { bookingId } = ctx.context || {};
    let booking: any = null;
    if (bookingId) {
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { client: true, tourPackage: { include: { days: { include: { destination: true } } } } },
      });
    }

    // Pull up to 50 hotels so the agent has real contract data to work with.
    // If we have a booking with tour days, try to match hotels in those destinations first.
    const destinationNames: string[] = booking?.tourPackage?.days
      ?.map((d: any) => d.destination?.name).filter(Boolean) ?? [];

    const hotels = await prisma.sRHotel.findMany({
      take: 50,
      where: destinationNames.length > 0
        ? { county: { name: { in: destinationNames, mode: 'insensitive' } } }
        : undefined,
      include: {
        county: true,
        roomTypes: {
          take: 3,
          include: {
            prices: {
              take: 3,
              orderBy: { season: { startDate: 'desc' } },
            },
          },
        },
      },
    });

    // If destination-filtered hotels are too few, top up with unrestricted results.
    const topUpNeeded = hotels.length < 10;
    const allHotels = topUpNeeded
      ? await prisma.sRHotel.findMany({
          take: 30,
          include: {
            county: true,
            roomTypes: { take: 2, include: { prices: { take: 2 } } },
          },
        })
      : hotels;

    const compact = allHotels.map((h) => ({
      name: h.name, destination: h.county.name,
      rooms: h.roomTypes.map((rt) => ({
        name: rt.name, max: rt.maxOccupancy,
        prices: rt.prices.map((p) => ({
          boardBasis: p.boardBasis, ppSharing: p.ratePerPersonSharing, single: p.singleRoomRate,
          child: p.childRate, thirdAdult: p.thirdAdultRate, currency: p.currency,
        })),
      })),
    }));

    const brief = booking
      ? `Booking ${booking.bookingRef} · client ${booking.client?.name} · ${booking.numAdults} adult(s) / ${booking.numChildren} child(ren) · tour "${booking.tourPackage?.title}" (${booking.tourPackage?.days?.length || 0} day(s)) · check-in ${booking.startDate ? new Date(booking.startDate).toDateString() : 'TBD'}.`
      : ctx.prompt;

    const userMsg = `You are a Kenya safari costing specialist. Draft a complete cost sheet as JSON only.

Brief:
${brief}

Available contract rates (sampled from live DB):
${JSON.stringify(compact)}

Rules:
- Use only hotels from the supplied rates where possible. Match hotels to tour day destinations.
- "ppSharing" = per person sharing rate (for 2+ adults sharing a room).
- "single" = solo traveller supplement (use this when numAdults = 1).
- "child" = child rate per child.
- Park fees: Maasai Mara ~80 USD/adult/day (non-resident), Amboseli ~80 USD, Nakuru ~60 USD, Samburu ~60 USD, Tsavo ~40 USD — use these as defaults when rates are not in the contract data.
- Transport: use 120 USD/day for a 4WD safari vehicle (group total).
- Put 0 for any field you cannot calculate; list NEEDS in the rationale.

Return strictly this JSON shape (no prose outside):
{
  "tourTitle": string,
  "days": number,
  "boardBasis": "FB|HB|BB|RO",
  "currency": "USD",
  "markupPercent": number,
  "dayRows": [{
    "day": number,
    "destinationName": string,
    "hotelName": string,
    "adultAccomTotal": number,
    "childAccomTotal": number,
    "singleRoomRate": number,
    "parkFeeAdultTotal": number,
    "parkFeeChildTotal": number,
    "transportTotal": number
  }],
  "fileHandlingFee": number,
  "ecoBottle": number,
  "evacInsurance": number,
  "arrivalTransfer": number,
  "departureTransfer": number,
  "perAdultCost": number,
  "perChildCost": number,
  "totalCost": number,
  "rationale": string
}`;

    await ctx.log({ agent: 'cost-sheet', kind: 'tool', content: `Fetched ${allHotels.length} hotels (${destinationNames.length > 0 ? `filtered to: ${destinationNames.join(', ')}` : 'unfiltered'}) + ${booking ? 'booking ' + bookingId : 'no booking'} for context` });
    const raw = await ctx.ask(userMsg, { jsonMode: true, maxTokens: 4096 });
    const parsed = extractJson<any>(raw);
    if (!parsed) {
      return { ok: false, summary: 'Could not parse JSON from LLM response', data: { raw } };
    }
    return {
      ok: true,
      summary: `Drafted ${parsed.dayRows?.length || 0}-day cost sheet · per adult ${parsed.currency || 'USD'} ${parsed.perAdultCost ?? '?'} · markup ${parsed.markupPercent}%`,
      data: parsed,
    };
  },
};
