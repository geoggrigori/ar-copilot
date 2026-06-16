import type { Draft, DraftInput } from "./draft";
import { formatUSD } from "./format";

// Cliente de LLM agnostico de provedor (Anthropic ou OpenAI via env).
// Retorna null quando nao ha chave ou em caso de erro -- o chamador entao
// usa o gerador de template.
export async function llmDraft(input: DraftInput): Promise<Draft | null> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!anthropicKey && !openaiKey) return null;

  const system =
    "You write concise, professional accounts-receivable collection emails. " +
    "Respond ONLY with JSON: {\"subject\": string, \"body\": string}.";
  const prompt =
    `Customer: ${input.customer}\n` +
    `Invoice: ${input.invoice_number}\n` +
    `Amount: ${formatUSD(input.amount_cents)}\n` +
    `Days overdue: ${input.days_overdue}\n` +
    `Tone: ${input.tone}\n\n` +
    "Write the collection email.";

  try {
    const text = anthropicKey
      ? await callAnthropic(anthropicKey, system, prompt)
      : await callOpenAI(openaiKey as string, system, prompt);
    if (!text) return null;

    const json = JSON.parse(extractJson(text));
    if (!json.subject || !json.body) return null;
    return { subject: json.subject, body: json.body, source: "llm" };
  } catch {
    return null;
  }
}

async function callAnthropic(key: string, system: string, prompt: string) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL ?? "claude-sonnet-4-5",
      max_tokens: 700,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data?.content?.[0]?.text as string | undefined;
}

async function callOpenAI(key: string, system: string, prompt: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL ?? "gpt-4o-mini",
      max_tokens: 700,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    }),
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content as string | undefined;
}

function extractJson(text: string): string {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
}
