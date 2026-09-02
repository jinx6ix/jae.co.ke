// lib/agents/invoice-agent.ts
import { prisma } from '@/lib/prisma';
import { extractJson } from './llm';
import { Agent, AgentContext, AgentStepResult } from './types';

export const invoiceAgent: Agent = {
  name: 'invoice',
  description: 'Verifies invoices against their linked cost sheet, flags discrepancies.',
  async run(ctx: AgentContext): Promise<AgentStepResult> {
    const { invoiceId, costSheetId } = ctx.context || {};
    let invoice: any = null;
    if (invoiceId) {
      const inv = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: { costSheet: true },
      });
      // Invoice.lineItems is a JSON string — parse it.
      let items: any[] = [];
      if (inv?.lineItems) {
        try { items = JSON.parse(inv.lineItems); } catch { items = []; }
      }
      invoice = inv ? { ...inv, items } : null;
    }
    let costSheet: any = null;
    if (!invoice && costSheetId) {
      costSheet = await prisma.costSheet.findUnique({ where: { id: costSheetId } });
    }

    if (!invoice && !costSheet) {
      return {
        ok: true,
        summary: 'No invoice/cost sheet in context — skipping verification (informational only).',
        data: { skipped: true },
      };
    }

    const subject = invoice
      ? {
          kind: 'invoice',
          ref: invoice.invoiceNo || invoice.id,
          total: invoice.totalAmount,
          subtotal: invoice.subtotal,
          tax: invoice.taxAmount ?? 0,
          deposit: invoice.depositReceived ?? 0,
          status: invoice.status,
          items: (invoice.items || []).map((i: any) => ({ desc: i.description || i.label || '', qty: i.quantity || 1, total: i.total || i.amount || 0 })),
        }
      : {
          kind: 'cost-sheet',
          ref: costSheet!.id,
          total: costSheet!.totalCost,
          subtotal: costSheet!.subtotal,
          markup: costSheet!.markupAmount,
          perAdult: costSheet!.perAdultCost,
          perChild: costSheet!.perChildCost,
        };

    const userMsg = `Verify financial integrity of this ${subject.kind}. Rules:
- totalCost = subtotal + markupAmount  (i.e. subtotal × (1 + markupPercent/100))
- markupAmount = subtotal × (markupPercent / 100)
- perAdultCost = totalCost / (numAdults + numChildren × 0.5)  — children count as 0.5 adults
- perChildCost = perAdultCost × 0.5
- line items, when present, should sum to approximately subtotal (within 1%)
- no duplicate line item descriptions
Return JSON only:
{
  "issues": [{ "severity": "warn|error", "field": string, "detail": string }],
  "suggestedFixes": [string],
  "allClear": bool
}

Subject JSON:
${JSON.stringify(subject)}`;

    await ctx.log({ agent: 'invoice', kind: 'tool', content: `Verifying ${subject.kind} ${subject.ref}` });
    const raw = await ctx.ask(userMsg, { jsonMode: true, maxTokens: 2048 });
    const parsed = extractJson<any>(raw);
    if (!parsed) return { ok: false, summary: 'Could not parse verification JSON', data: { raw } };
    const issueCount = parsed.issues?.length || 0;
    return {
      ok: true,
      summary: parsed.allClear ? 'Invoice/cost sheet verified ✓ no issues' : `${issueCount} issue(s), ${parsed.suggestedFixes?.length || 0} fix(es)`,
      data: parsed,
    };
  },
};
