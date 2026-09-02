// lib/agents/itinerary-agent.ts
import { prisma } from '@/lib/prisma';
import { extractJson } from './llm';
import { Agent, AgentContext, AgentStepResult } from './types';

export const itineraryAgent: Agent = {
  name: 'itinerary',
  description: 'Drafts day-by-day itineraries from a booking or upstream cost sheet.',
  async run(ctx: AgentContext): Promise<AgentStepResult> {
    const { bookingId, costSheetId } = ctx.context || {};
    const hist = await ctx.history();
    const upstream = hist.filter((m) => m.agent === 'cost-sheet' && m.kind === 'assistant').pop();
    const upstreamData = upstream?.payload as any;

    let booking: any = null;
    if (bookingId) {
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          client: true,
          tourPackage: {
            include: {
              days: {
                orderBy: { dayNumber: 'asc' },
                include: { destination: true },
              },
            },
          },
        },
      });
    }
    let costSheet: any = null;
    if (costSheetId) {
      costSheet = await prisma.costSheet.findUnique({ where: { id: costSheetId } });
    }

    const tourDays = booking?.tourPackage?.days || [];
    // Prefer day rows from the upstream cost-sheet agent (has hotel names already).
    const agentDayRows: any[] = upstreamData?.dayRows || [];

    const contextLines: string[] = [];
    if (booking) contextLines.push(`Booking ${booking.bookingRef} · ${booking.client?.name} · tour "${booking.tourPackage?.title}" · ${booking.numAdults} adult(s)/${booking.numChildren} child(ren) · ${new Date(booking.startDate).toDateString()} to ${new Date(booking.endDate).toDateString()}`);
    if (costSheet) contextLines.push(`Linked cost sheet: ${costSheet.tourTitle} · ${costSheet.days} days · ${costSheet.boardBasis} board`);
    if (upstream) contextLines.push(`Upstream cost-sheet says: ${upstream.content}`);
    contextLines.push(ctx.prompt);

    const brief = contextLines.filter(Boolean).join('\n');

    const skeletonRows = agentDayRows.length > 0
      ? agentDayRows.map((d: any, i: number) => ({ day: d.day ?? i + 1, destination: d.destinationName || 'TBD', hotel: d.hotelName || 'TBD' }))
      : tourDays.map((d: any) => ({ day: d.dayNumber, destination: d.destination?.name || d.title, hotel: d.accommodation || 'TBD' }));

    const userMsg = `You are a senior Kenya safari travel designer writing a guest-facing day-by-day itinerary.

Context:
${brief}

Day skeleton (destination + accommodation from cost sheet / tour package):
${JSON.stringify(skeletonRows)}

Guidelines:
- Write vivid, appealing descriptions for a paying guest — not a dry itinerary.
- Respect the supplied day count and hotel names exactly; do not invent hotels.
- Typical activities: game drives (6–10 AM, 4–7 PM), sundowners, bush walks, cultural visits.
- Meal plans: FB = all meals, HB = breakfast + dinner, BB = breakfast only.
- Use "YYYY-MM-DD" for dates when a start date is known; leave as "" otherwise.

Return strictly this JSON (no prose outside):
{
  "title": string,
  "introduction": string,
  "days": [{
    "dayNumber": number,
    "date": "YYYY-MM-DD",
    "destination": string,
    "accommodation": string,
    "mealPlan": { "breakfast": bool, "lunch": bool, "dinner": bool, "note": string },
    "activities": [{ "time": string, "description": string }],
    "notes": string
  }]
}`;

    await ctx.log({ agent: 'itinerary', kind: 'tool', content: `Context: ${tourDays.length} tour day(s), ${agentDayRows.length} agent day rows, booking=${!!booking}, costSheet=${!!costSheet}` });
    const raw = await ctx.ask(userMsg, { jsonMode: true, maxTokens: 4096 });
    const parsed = extractJson<any>(raw);
    if (!parsed) return { ok: false, summary: 'Could not parse itinerary JSON', data: { raw } };
    return {
      ok: true,
      summary: `Drafted ${parsed.days?.length || 0}-day itinerary: "${parsed.title || ''}"`,
      data: parsed,
    };
  },
};
