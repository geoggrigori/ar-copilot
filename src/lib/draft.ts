import { formatUSD } from "./format";

export type Tone = "friendly" | "firm" | "final";

export interface DraftInput {
  customer: string;
  invoice_number: string;
  amount_cents: number;
  days_overdue: number;
  tone: Tone;
}

export interface Draft {
  subject: string;
  body: string;
  source: "llm" | "template";
}

// Sugere o tom com base em quantos dias a fatura esta vencida.
export function suggestedTone(daysOverdue: number): Tone {
  if (daysOverdue >= 45) return "final";
  if (daysOverdue >= 15) return "firm";
  return "friendly";
}

// Gerador deterministico de fallback (usado quando nao ha LLM configurado).
export function templateDraft(input: DraftInput): Draft {
  const { customer, invoice_number, amount_cents, days_overdue, tone } = input;
  const amount = formatUSD(amount_cents);

  const openings: Record<Tone, string> = {
    friendly: `Hi ${customer} team,\n\nJust a friendly reminder that invoice ${invoice_number} for ${amount} is now ${days_overdue} days past due.`,
    firm: `Hello ${customer} team,\n\nOur records show that invoice ${invoice_number} for ${amount} remains unpaid and is ${days_overdue} days past due.`,
    final: `To the ${customer} accounts payable team,\n\nThis is a final notice regarding invoice ${invoice_number} for ${amount}, which is now ${days_overdue} days past due.`,
  };

  const closings: Record<Tone, string> = {
    friendly:
      "If payment is already on its way, please disregard this note. Otherwise, we'd appreciate it being scheduled at your earliest convenience. Happy to help with any questions.",
    firm: "Please arrange payment within the next 5 business days. If there is an issue with this invoice, let us know right away so we can resolve it.",
    final:
      "Please remit payment within 48 hours to avoid a hold on your account and referral to collections. Contact us immediately if you believe this is in error.",
  };

  const subjects: Record<Tone, string> = {
    friendly: `Reminder: invoice ${invoice_number} (${amount})`,
    firm: `Past due: invoice ${invoice_number} (${amount})`,
    final: `FINAL NOTICE: invoice ${invoice_number} (${amount})`,
  };

  const body = `${openings[tone]}\n\n${closings[tone]}\n\nThank you,\nAccounts Receivable`;

  return { subject: subjects[tone], body, source: "template" };
}
