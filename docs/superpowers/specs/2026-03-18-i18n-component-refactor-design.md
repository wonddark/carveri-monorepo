# i18n Component Refactor Design — CarVeri Portal

**Date:** 2026-03-18
**Branch:** feature/implementing-translations
**Scope:** Replace all hardcoded UI strings in components with `useTranslation()` calls. Updates translation JSON files where interpolation is required. No new UI or behavior changes.

---

## Goals

- Every visible UI string in every component is rendered via `t('key')` from i18next
- Dynamic strings use `{{variable}}` interpolation — no string concatenation
- The app renders correctly in both EN and ES after switching the language toggle
- `pnpm build` passes with zero TypeScript errors

---

## Implementation Order

**Step 1 — Update interpolation keys in JSON files** (must precede all component work):
The 6 keys listed in the Interpolated Keys section below must be updated in their respective `en.json` and `es.json` files before any component that uses them is edited.

**Step 2 — Refactor components** namespace by namespace (common → home → vehicle-details → history → market → negotiate → verdict).

---

## Architecture

Each component that renders translatable text gains a single `useTranslation('namespace')` call at the top. The `t()` function replaces every hardcoded string literal in JSX.

**Pattern:**
```tsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation('market');
  return <h2>{t('header.marketAnalysis')}</h2>;
}
```

**Multiple namespaces (rare):** If a component needs strings from two namespaces, pass an array:
```tsx
const { t } = useTranslation(['common', 'vehicle-details']);
// t('tabs.historial')            → common namespace
// t('vehicle-details:gauge.top') → explicit namespace prefix
```

All translation files are already populated from Phase 1. This phase only modifies component `.tsx` files and updates ~6 translation JSON keys to add interpolation syntax.

---

## Special Cases

### `BottomNavBar.tsx`
The `TABS` array is defined **outside** the component with hardcoded `label` strings. It must be moved **inside** the component body so `t()` is in scope:

```tsx
export default function BottomNavBar({ activeTab, onTabChange }: Readonly<Props>) {
  const { t } = useTranslation('common');
  const TABS = [
    { id: 'home', label: t('bottomNav.home'), icon: <Home size={20} /> },
    { id: 'history', label: t('bottomNav.history'), icon: <Clock size={20} /> },
    // ...
  ];
  // ...
}
```

### `report.tsx`
Two locations have hardcoded strings:
1. `<TabsTrigger>` labels — replace with `t('tabs.historial')` etc. from `common` namespace
2. `<MobileNavBtn label="Historial">` props — same keys

### `VerdictBadge.tsx`
A `VERDICT_CONFIG` object is defined **outside** the component with hardcoded labels `'BUY'`, `'CONSIDER'`, `'AVOID'`. Same fix as `BottomNavBar` — move it inside the component body so `t()` is in scope:

```tsx
export function VerdictBadge({ verdict }: Props) {
  const { t } = useTranslation('verdict');
  const VERDICT_CONFIG = {
    BUY:     { label: t('recommendation.buy'),     ... },
    CONSIDER: { label: t('recommendation.consider'), ... },
    AVOID:   { label: t('recommendation.avoid'),   ... },
  };
  // ...
}
```

---

## Interpolated Keys

These keys must be updated in **both** `en.json` and `es.json` before components use them:

| Namespace | Key path | EN value | ES value |
|---|---|---|---|
| `home` | `overviewFor` | `"Overview for {{name}}"` | `"Descripción general para {{name}}"` |
| `market` | `header.pricingEvaluation` | `"Pricing evaluation & comparables in {{city}}"` | `"Evaluación de precios y comparables en {{city}}"` |
| `market` | `comparables.similarVehicles` | `"Similar vehicles near {{city}}"` | `"Vehículos similares cerca de {{city}}"` |
| `history` | `owners.registeredOwners` | `"{{count}} registered owners"` | `"{{count}} propietarios registrados"` |
| `history` | `service.recordsSuffix` | `"{{count}} service records"` | `"{{count}} registros de servicio"` |
| `history` | `auctionPhotos.countSuffix` | `"{{count}} auction photos — IAAI"` | `"{{count}} fotos de subasta — IAAI"` |

---

## Component Coverage

### `common` namespace
| File | Strings |
|---|---|
| `src/layout/root.tsx` | Nav links: signIn, register, freeReport |
| `src/components/AppHeader.tsx` | aria-labels: actions.goBack, actions.share |
| `src/components/BottomNavBar.tsx` | Tab labels: home, history, market, verdict, negotiate |
| `src/pages/report.tsx` | Tab triggers + mobile nav: historial, mercado, ia, documentos |

### `home` namespace
| File |
|---|
| `src/pages/home.tsx` |
| `src/components/home/HomeTab.tsx` |
| `src/components/home/StatsGrid.tsx` |
| `src/components/home/VehicleDataSection.tsx` |
| `src/components/home/AISummarySection.tsx` |
| `src/components/home/BookValues.tsx` |
| `src/components/home/PriceEvalSection.tsx` |
| `src/components/home/QuickNavGrid.tsx` |

### `vehicle-details` namespace
| File |
|---|
| `src/components/vehicle-details/VehicleInfoCard.tsx` |
| `src/components/vehicle-details/HistorialTab.tsx` |
| `src/components/vehicle-details/MercadoTab.tsx` |
| `src/components/vehicle-details/IATab.tsx` |
| `src/components/vehicle-details/DocumentsTab.tsx` |
| `src/components/vehicle-details/PriceEvaluation.tsx` |
| `src/components/ReportGauge.tsx` |

### `history` namespace
| File |
|---|
| `src/components/history/HistoryTab.tsx` |
| `src/components/history/TimelineSubtab.tsx` |
| `src/components/history/AccidentsSubtab.tsx` |
| `src/components/history/OwnersSubtab.tsx` |
| `src/components/history/ServiceSubtab.tsx` |
| `src/components/history/TitleSubtab.tsx` |
| `src/components/history/AuctionPhotosSubtab.tsx` |

### `market` namespace
| File |
|---|
| `src/components/market/MarketTab.tsx` |
| `src/components/market/MarketPriceHeader.tsx` |
| `src/components/market/ComparablesList.tsx` |
| `src/components/market/ComparableCard.tsx` |

### `negotiate` namespace
| File |
|---|
| `src/components/negotiate/NegotiateTab.tsx` |
| `src/components/negotiate/ArgumentsSubtab.tsx` |
| `src/components/negotiate/CostsSubtab.tsx` |
| `src/components/negotiate/StrategySubtab.tsx` |
| `src/components/negotiate/ArgumentCard.tsx` |

### `verdict` namespace
| File |
|---|
| `src/components/verdict/VerdictTab.tsx` |
| `src/components/verdict/VerdictSubtab.tsx` |
| `src/components/verdict/RisksSubtab.tsx` |
| `src/components/verdict/ChecklistSubtab.tsx` |
| `src/components/VerdictBadge.tsx` |

---

## Out of Scope

- `src/pages/login.tsx` and `src/pages/register.tsx` — auth pages deferred to a future phase
- `src/components/CarSummaryCard.tsx` — contains only numeric data interpolations (`{mileage} mi`), no sentence-level translatable strings
- Adding new translation keys not already in the JSON files
- Translating mock data content (service records, owner details, dates)
- Pluralization beyond i18next's built-in `{{count}}` support
- Date/number locale formatting
- Any UI or layout changes

---

## Success Criteria

- `pnpm build` passes with zero TypeScript errors
- Switching language toggle immediately re-renders all translated strings
- No visible hardcoded EN/ES strings remain in any component listed above
- `VehicleHero.tsx` is explicitly excluded — it has no translatable UI strings
