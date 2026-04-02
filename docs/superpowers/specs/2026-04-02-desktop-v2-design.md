# desktop-v2 Design Spec

**Date:** 2026-04-02
**Reference URL:** https://carcheckcub-e8jeqgfr.manus.space/reports/JA4J4VA86RZ079851

## Goal

Create `apps/desktop-v2` — a desktop-only clone of the reference vehicle report page. No responsive design. All UI components are built fresh inside `desktop-v2`; only types and data loaders are imported from `@carveri/shared`.

---

## Monorepo Scaffold

**Bootstrap:** Copy `apps/desktop` → `apps/desktop-v2`, then:

- Rename package to `@carveri/desktop-v2` in `package.json`
- Add root scripts: `dev:desktop-v2`, `build:desktop-v2`, `preview:desktop-v2`
- Delete `src/components/` and `src/pages/` — rebuild from scratch
- Delete i18n (`react-i18next`, locale files) — Spanish strings hardcoded directly
- Keep: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `src/index.css`, `src/main.tsx`, `src/lib/utils.ts`, `components.json`
- Copy `src/lib/transforms.ts` from `apps/desktop` unchanged — lives at `apps/desktop-v2/src/lib/transforms.ts` (not imported cross-app)
- Add `.superpowers/` to `.gitignore`

**Router:** single route `/reports/:vin` → `ReportPage`, loader calls `reportLoader` from `@carveri/shared/data/loaders`

**Data:** mock data only (same `MOCK_REPORTS` as `desktop`). `VITE_API_URL` not required.

---

## Layout

Fixed three-zone layout (no scroll on the outer shell):

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (fixed, full width, h-12)                       │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  SIDEBAR     │  MAIN CONTENT                            │
│  (fixed,     │  (scrollable)                            │
│   w-60,      │                                          │
│  scrollable) │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

---

## Visual Design

- **Theme:** Light mode default (no dark mode toggle in v2)
- **Primary accent:** Blue (`#2563eb` / Tailwind `blue-600`)
- **Sidebar background:** `gray-50` with `gray-200` right border
- **Main content background:** white
- **Active nav item:** `blue-50` background, `blue-600` left border (2px), `blue-600` text
- **Typography:** Geist Variable (already in shared CSS)
- **Language:** Spanish strings hardcoded (no i18n)

---

## Components

All files live in `apps/desktop-v2/src/`.

### Shell

| File | Description |
|------|-------------|
| `pages/ReportPage.tsx` | Top-level page. Uses `useLoaderData`, owns `activeSection` state, renders Header + Sidebar + MainContent |
| `components/Header.tsx` | Fixed top bar: CarVeri logo (left), vehicle year/make/model + VIN from `report` prop (center-left), language badge + "Compartir PDF" button (right) |
| `components/Sidebar.tsx` | Fixed left column: image carousel, price + mileage, score card, collapsible nav tree, VIN footer |
| `components/MainContent.tsx` | Renders the active section view based on `activeSection` prop |

### Section Views

| File | Section | Content |
|------|---------|---------|
| `components/views/ResumenView.tsx` | Resumen | 4-stat grid (título, accidentes, odómetro, precio), price gauge + book values card, vehicle specs card, AI summary block |
| `components/views/TimelineView.tsx` | Timeline | Vertical timeline of history events |
| `components/views/AuctionPhotosView.tsx` | Fotos Subasta | Grid of auction photos |
| `components/views/AccidentsView.tsx` | Accidentes | Accident count + event cards |
| `components/views/OwnersView.tsx` | Dueños | Owner history list |
| `components/views/ServiceView.tsx` | Servicio | Service record list |
| `components/views/TitleView.tsx` | Título | Title status details |
| `components/views/MarketView.tsx` | Mercado | Comparable vehicles |
| `components/views/VerdictAIView.tsx` | Veredicto IA | AI verdict text block |
| `components/views/ChecklistView.tsx` | Checklist | Inspection checklist items |
| `components/views/StrategyView.tsx` | Estrategia | Negotiation strategy tips |
| `components/views/ArgumentsView.tsx` | Argumentos | Negotiation argument cards |
| `components/views/CostsView.tsx` | Costos | Cost breakdown table |

### Navigation Sections (`SectionId` type)

```ts
type SectionId =
  | "resumen"
  | "timeline" | "fotos-subasta" | "accidentes" | "duenos" | "servicio" | "titulo"
  | "mercado"
  | "verdict-ai"
  | "checklist"
  | "estrategia" | "argumentos" | "costos";
```

### Sidebar Nav Structure

```
Resumen                        (top-level item)
▾ 🕒 Historial                 (collapsible group)
    Timeline
    Fotos Subasta
    Accidentes
    Dueños
    Servicio
    Título
Mercado                        (top-level item)
Veredicto IA                   (top-level item)
Checklist                      (top-level item)
▾ 💬 Negociación               (collapsible group)
    Estrategia
    Argumentos
    Costos
```

---

## Data Flow

```
URL /reports/:vin
  → reportLoader (from @carveri/shared/data/loaders)
    → fetchVehicleReport(vin) → MOCK_REPORTS[vin]
    → transformToSharedReport(raw.data) → VehicleReport
  → ReportPage receives VehicleReport via useLoaderData()
  → passes report prop to Sidebar + MainContent
  → MainContent passes relevant slice to active section view
```

Types imported from `@carveri/shared/types/vehicle-report`. No other shared UI components used.

---

## What Is NOT in Scope

- Responsive / mobile layout
- Dark mode
- i18n / language switching (Spanish hardcoded)
- Real API integration (mock data only)
- PDF export functionality (button present but no-op)
- Authentication
