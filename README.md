<!-- ══════════════════════════ TÍTULO ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="AR Copilot"/>
</div>

<br/>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-1987F0?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<br/>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/LLM-Anthropic_%2F_OpenAI-8E75B2?style=flat-square" alt="llm"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#sobre"><img src="https://img.shields.io/badge/▸_SOBRE-1987F0?style=for-the-badge" alt="sobre"/></a>
<a href="#funcionalidades"><img src="https://img.shields.io/badge/▸_FUNCIONALIDADES-000000?style=for-the-badge" alt="func"/></a>
<a href="#como-funciona"><img src="https://img.shields.io/badge/▸_COMO_FUNCIONA-1987F0?style=for-the-badge" alt="funciona"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 💡 **Funciona com ou sem chave de LLM.** Sem `ANTHROPIC_API_KEY`/`OPENAI_API_KEY`, cai automaticamente num gerador de template determinístico.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="AR Copilot — gerador de e-mail de cobrança"/>
</div>

## Sobre

**AR Collections Copilot** gera e-mails de cobrança profissionais e com o tom apropriado para faturas em atraso. Chama um **LLM** (Anthropic ou OpenAI) quando há chave configurada, e cai para um gerador de template determinístico caso contrário — então sempre produz um rascunho utilizável, online ou offline.

## Funcionalidades

- Campos de entrada para cliente, número da fatura, valor e dias em atraso.
- Seleção de tom (amigável / firme / final), sugerido automaticamente pelo atraso da fatura.
- Cópia com um clique do assunto + corpo gerados.
- Cliente de LLM agnóstico de provedor, com fallback gracioso.

## Como Funciona

`POST /api/draft` recebe o contexto da fatura e o tom, tenta `llmDraft()` (chamada agnóstica de provedor para Anthropic/OpenAI retornando JSON), e cai para `templateDraft()` quando não há chave configurada ou a chamada falha.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
```

Opcional — habilitar um LLM de verdade definindo uma das variáveis:
```bash
ANTHROPIC_API_KEY=...      # ou OPENAI_API_KEY=...
LLM_MODEL=...              # override opcional do modelo
```
Sem chave, o gerador de template é usado.

## Licença

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desenvolvido por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
