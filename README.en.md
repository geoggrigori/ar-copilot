<!-- ══════════════════════════ TITLE ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="AR Copilot"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-1987F0?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<h1 align="center">AR Collections Copilot</h1>
<p align="center"><em>Generates professional, tone-appropriate collection emails for overdue invoices</em></p>
<p align="center"><strong>Invoice data → LLM (or deterministic fallback) → ready-to-copy email</strong></p>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/LLM-Anthropic_%2F_OpenAI-8E75B2?style=flat-square" alt="llm"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#about"><img src="https://img.shields.io/badge/▸_ABOUT-1987F0?style=for-the-badge" alt="about"/></a>
<a href="#features"><img src="https://img.shields.io/badge/▸_FEATURES-000000?style=for-the-badge" alt="features"/></a>
<a href="#how-it-works"><img src="https://img.shields.io/badge/▸_HOW_IT_WORKS-1987F0?style=for-the-badge" alt="howitworks"/></a>
<a href="#usage"><img src="https://img.shields.io/badge/▸_USAGE-000000?style=for-the-badge" alt="usage"/></a>
</div>

<br/>

> 💡 **Works with or without an LLM key.** Without `ANTHROPIC_API_KEY`/`OPENAI_API_KEY`, it automatically falls back to a deterministic template generator.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="AR Copilot — collection email generator"/>
</div>

## About

**AR Collections Copilot** generates professional, tone-appropriate collection emails for overdue invoices. It calls an **LLM** (Anthropic or OpenAI) when an API key is configured, and falls back to a deterministic template generator otherwise — so it always produces a usable draft, online or offline.

## Features

- Inputs for customer, invoice number, amount and days overdue.
- Tone selection (friendly / firm / final), auto-suggested from how late the invoice is.
- One-click copy of the generated subject + body.
- Provider-agnostic LLM client with graceful fallback.

## How it works

`POST /api/draft` receives the invoice context and tone, tries `llmDraft()` (provider-agnostic fetch to Anthropic/OpenAI returning JSON), and falls back to `templateDraft()` when no key is set or the call fails.

## Usage

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

## License

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Built by <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
