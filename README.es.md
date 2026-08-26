<!-- ══════════════════════════ PORTADA ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="AR Copilot"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-1987F0?style=for-the-badge" alt="Español"/></a>
</div>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/LLM-Anthropic_%2F_OpenAI-8E75B2?style=flat-square" alt="llm"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#acerca-de"><img src="https://img.shields.io/badge/▸_ACERCA_DE-1987F0?style=for-the-badge" alt="acerca"/></a>
<a href="#funcionalidades"><img src="https://img.shields.io/badge/▸_FUNCIONALIDADES-000000?style=for-the-badge" alt="func"/></a>
<a href="#cómo-funciona"><img src="https://img.shields.io/badge/▸_CÓMO_FUNCIONA-1987F0?style=for-the-badge" alt="funciona"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 💡 **Funciona con o sin clave de LLM.** Sin `ANTHROPIC_API_KEY`/`OPENAI_API_KEY`, cae automáticamente a un generador de plantilla determinístico.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="AR Copilot — generador de email de cobranza"/>
</div>

## Acerca de

**AR Collections Copilot** genera emails de cobranza profesionales y con el tono adecuado para facturas vencidas. Llama a un **LLM** (Anthropic u OpenAI) cuando hay una clave configurada, y cae a un generador de plantilla determinístico en caso contrario — así siempre produce un borrador utilizable, en línea o sin conexión.

## Funcionalidades

- Campos para cliente, número de factura, monto y días de atraso.
- Selección de tono (amigable / firme / final), auto-sugerido según el atraso de la factura.
- Copia con un clic del asunto + cuerpo generados.
- Cliente de LLM agnóstico de proveedor, con fallback elegante.

## Cómo funciona

`POST /api/draft` recibe el contexto de la factura y el tono, intenta `llmDraft()` (llamada agnóstica de proveedor a Anthropic/OpenAI devolviendo JSON), y cae a `templateDraft()` cuando no hay clave configurada o la llamada falla.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
```

Opcional — habilitar un LLM real definiendo una de estas variables:
```bash
ANTHROPIC_API_KEY=...      # o OPENAI_API_KEY=...
LLM_MODEL=...              # override opcional del modelo
```
Sin clave, se usa el generador de plantilla.

## Licencia

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desarrollado por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
