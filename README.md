# AR Collections Copilot

**Live demo → https://ar-copilot-rose.vercel.app**

Generate professional, tone-appropriate **collection emails** for overdue
invoices. Built with **Next.js 16, React 19, TypeScript and Tailwind CSS**.

It calls an **LLM** (Anthropic or OpenAI) when an API key is configured, and
falls back to a deterministic template generator otherwise — so it always
produces a usable draft, online or offline.

## Features

- Inputs for customer, invoice number, amount and days overdue.
- Tone selection (friendly / firm / final), auto-suggested from how late the
  invoice is.
- One-click copy of the generated subject + body.
- Provider-agnostic LLM client with graceful fallback.

## Tech stack

| Concern    | Choice                       |
| ---------- | ---------------------------- |
| Framework  | Next.js 16 (App Router)      |
| UI         | React 19, Tailwind CSS       |
| Language   | TypeScript                   |
| LLM        | Anthropic / OpenAI (optional) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Optional — enable a real LLM by setting one of:

```bash
ANTHROPIC_API_KEY=...      # or OPENAI_API_KEY=...
LLM_MODEL=...              # optional model override
```

Without a key, the template generator is used.

## How it works

`POST /api/draft` receives the invoice context and tone, tries
`llmDraft()` (provider-agnostic fetch to Anthropic/OpenAI returning JSON), and
falls back to `templateDraft()` when no key is set or the call fails.

## License

MIT
