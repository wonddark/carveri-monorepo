# i18n Setup Design — CarVeri Portal

**Date:** 2026-03-18
**Branch:** feature/implementing-translations
**Scope:** Setup only — install, configure, wire provider, add language toggle, populate translation files. No component refactoring in this phase.

---

## Goals

- Support English (EN) and Spanish (ES) in the CarVeri Portal SPA
- Users can manually switch languages via a toggle in the app header
- Language preference persists across sessions via localStorage
- New visitors get language auto-detected from browser settings
- English is the fallback for unsupported or undetected languages

---

## Library Stack

| Package | Purpose |
|---|---|
| `i18next` | Core i18n engine |
| `react-i18next` | React bindings (`useTranslation`, `<Trans>`) |
| `i18next-browser-languagedetector` | Detection chain: localStorage → navigator → fallback |

---

## Language Detection Order

1. **localStorage** — key: `i18nextLng`, written automatically by i18next on language change
2. **navigator.language** — browser-reported locale (e.g. `en-US` → normalized to `en`)
3. **Fallback** — `en`

Supported languages: `['en', 'es']`. Any unrecognized locale falls back to `en`.

---

## Translation File Structure

### Common keys (shared across features)

```
src/locales/
├── en.json      # common namespace
└── es.json      # common namespace
```

Common keys include: navigation labels, button text, status badges, error messages, and any string used in 2+ features.

### Feature-specific keys (co-located with components)

```
src/components/home/locales/
├── en.json
└── es.json

src/components/vehicle-details/locales/
├── en.json
└── es.json

src/components/history/locales/
├── en.json
└── es.json

src/components/market/locales/
├── en.json
└── es.json

src/components/negotiate/locales/
├── en.json
└── es.json

src/components/verdict/locales/
├── en.json
└── es.json
```

### Namespace mapping

| Namespace | Source files |
|---|---|
| `common` | `src/locales/{lang}.json` |
| `home` | `src/components/home/locales/{lang}.json` |
| `vehicle-details` | `src/components/vehicle-details/locales/{lang}.json` |
| `history` | `src/components/history/locales/{lang}.json` |
| `market` | `src/components/market/locales/{lang}.json` |
| `negotiate` | `src/components/negotiate/locales/{lang}.json` |
| `verdict` | `src/components/verdict/locales/{lang}.json` |

---

## i18n Configuration (`src/lib/i18n.ts`)

All translation files are imported statically (no dynamic backend needed for a Vite SPA). The file initializes i18next with:

- `resources` — all namespace/language bundles imported directly
- `fallbackLng: 'en'`
- `defaultNS: 'common'`
- `detection.order: ['localStorage', 'navigator']`
- `detection.caches: ['localStorage']` — persists the detected language on first visit so subsequent loads skip detection
- `interpolation.escapeValue: false` — React handles XSS
- `initImmediate: false` — forces synchronous initialization so translations are ready before first render, avoiding the need for a `<Suspense>` boundary

The plugin chain order matters. It must be:
```ts
i18next
  .use(LanguageDetector)       // 1. detector must come before React bindings
  .use(initReactI18next)       // 2. wire React bindings
  .init({ ... })
```

This file is imported as a side effect in `main.tsx` before the app root:
```ts
import '@/lib/i18n'           // must precede all component imports
import { createRoot } from 'react-dom/client'
```

---

## Language Toggle Component

A small `LanguageToggle` component added to `AppHeader`. It:

- Displays current language as `EN` / `ES` text buttons or a simple toggle
- Calls `i18next.changeLanguage(lang)` on click
- The detector plugin automatically writes to localStorage via `caches` config — no manual persistence code needed

---

## Translation Content Coverage

All hardcoded UI strings extracted from:

- `src/layout/root.tsx` → `common` namespace
- `src/components/AppHeader.tsx` → `common` namespace
- `src/components/BottomNavBar.tsx` → `common` namespace
- `src/pages/report.tsx` (tab labels) → `common` namespace
- `src/pages/home.tsx` → `home` namespace
- `src/components/home/**` → `home` namespace
- `src/components/vehicle-details/**` → `vehicle-details` namespace (including `HistorialTab.tsx` — it lives in this directory, not in `history/`)
- `src/components/history/**` → `history` namespace
- `src/components/market/**` → `market` namespace
- `src/components/negotiate/**` → `negotiate` namespace
- `src/components/verdict/**` → `verdict` namespace
- `src/components/VerdictBadge.tsx` → `verdict` namespace (contains "CarVeri Verdict" label)
- `src/components/ReportGauge.tsx` → `vehicle-details` namespace (contains "Evaluación de Precio", "Wholesale", "Retail", "Percentil" labels)

Mock data strings (service record names, owner details, dates) are **out of scope** for this phase — they are data, not UI, and will be addressed when a real API is integrated.

---

## Out of Scope

- URL-based routing per language (`/en/`, `/es/`)
- Lazy loading of translation namespaces
- Pluralization rules beyond basic i18next defaults
- Date/number locale formatting (deferred to a future phase)
- Translation of mock data content
- Component refactoring to use `useTranslation` (that is the next phase after setup)

---

## Success Criteria

- `pnpm dev` runs without errors after setup
- `pnpm build` passes TypeScript checks
- Language toggle appears in the header
- Switching language updates the UI immediately
- Selected language persists after page reload
- Browser with `es` preference defaults to Spanish on first visit
- Browser with any other language defaults to English
