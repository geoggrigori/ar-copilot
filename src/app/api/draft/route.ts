import { NextRequest, NextResponse } from "next/server";
import { templateDraft, type DraftInput, type Tone } from "@/lib/draft";
import { llmDraft } from "@/lib/llm";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.customer || !body.invoice_number) {
    return NextResponse.json(
      {
        error: {
          code: "bad_request",
          message: "customer and invoice_number are required",
        },
      },
      { status: 400 },
    );
  }

  const input: DraftInput = {
    customer: String(body.customer),
    invoice_number: String(body.invoice_number),
    amount_cents: Number(body.amount_cents) || 0,
    days_overdue: Number(body.days_overdue) || 0,
    tone: (body.tone as Tone) ?? "firm",
  };

  const draft = (await llmDraft(input)) ?? templateDraft(input);
  return NextResponse.json({ data: draft });
}
