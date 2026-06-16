"use client";

import { useState } from "react";
import { suggestedTone, type Draft, type Tone } from "@/lib/draft";

const TONES: { value: Tone; label: string }[] = [
  { value: "friendly", label: "Friendly reminder" },
  { value: "firm", label: "Firm" },
  { value: "final", label: "Final notice" },
];

export default function Page() {
  const [customer, setCustomer] = useState("Northwind Distributors");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-1010");
  const [amount, setAmount] = useState("34500.00");
  const [daysOverdue, setDaysOverdue] = useState(45);
  const [tone, setTone] = useState<Tone>("final");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setDraft(null);
    setCopied(false);
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          invoice_number: invoiceNumber,
          amount_cents: Math.round(parseFloat(amount || "0") * 100),
          days_overdue: daysOverdue,
          tone,
        }),
      });
      const json = await res.json();
      setDraft(json.data);
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!draft) return;
    await navigator.clipboard.writeText(
      `Subject: ${draft.subject}\n\n${draft.body}`,
    );
    setCopied(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          AR Collections Copilot
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Generate a professional collection email for an overdue invoice. Uses
          an LLM when an API key is configured, with a deterministic template
          fallback so it always works.
        </p>
      </header>

      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Customer">
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Invoice number">
            <input
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Amount (USD)">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              className="input"
            />
          </Field>
          <Field label={`Days overdue: ${daysOverdue}`}>
            <input
              type="range"
              min={0}
              max={90}
              value={daysOverdue}
              onChange={(e) => {
                const d = Number(e.target.value);
                setDaysOverdue(d);
                setTone(suggestedTone(d));
              }}
              className="w-full"
            />
          </Field>
        </div>

        <Field label="Tone">
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`rounded-lg border px-3 py-1.5 text-sm ${
                  tone === t.value
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-slate-300 text-slate-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Field>

        <button
          onClick={generate}
          disabled={loading}
          className="w-fit rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate email"}
        </button>
      </div>

      {draft && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              source: {draft.source}
            </span>
            <button
              onClick={copy}
              className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p className="font-semibold text-slate-900">{draft.subject}</p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-slate-700">
            {draft.body}
          </pre>
        </div>
      )}

      <footer className="mt-10 text-center text-xs text-slate-400">
        Part of an accounts-receivable automation suite ·{" "}
        <a
          href="https://github.com/geoggrigori/collections-api"
          className="text-violet-600 hover:underline"
        >
          Collections API
        </a>
      </footer>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-slate-600">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
