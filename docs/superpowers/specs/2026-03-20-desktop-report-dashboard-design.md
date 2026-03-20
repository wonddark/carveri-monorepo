# Desktop Report Dashboard — Design Spec

**Date:** 2026-03-20
**App:** `apps/desktop`
**Status:** Approved

---

## Overview

Build the desktop report dashboard for `apps/desktop`. The design replicates the reference at `https://carcheckcub-e8jeqgfr.manus.space/reports/JA4J4VA86RZ079851` — a fixed-sidebar + scrollable-main layout. All sub-tab components already exist in `@carveri/shared`; this spec covers the desktop shell, routing, the Resumen home view, and the data transform layer needed to bridge the two data models.

**Intentionally excluded:** price evaluation gauge (build price section inline using `BookValues` instead of `PriceEvalSection`, which internally renders `ReportGauge`), verdict card (use our `CarSummaryCard` from shared).

---

## Data Model Clarification

The project has **two `VehicleReport` types** — this is the most important thing to understand before implementing:

| Type | Location | Shape | Used by |
|---|---|---|---|
| `ApiVehicleReport` | `@carveri/shared/types/vehicle-report` | Nested (`vehiculo`, `historial`, `mercado`, …) | `fetchVehicleReport`, API loader, mobile subtab components |
| `SharedVehicleReport` | `@carveri/shared/data/report` | Flat (scalar fields + `stats`, `priceEval`, `historyTab`, …) | Home-tab components (`StatsGrid`, `BookValues`, `AISummarySection`, `VehicleDataSection`, `QuickNavGrid`) |

The desktop loader fetches `ApiVehicleReport` from the API. The `ResumenView` needs `SharedVehicleReport` to feed the home-tab shared components. A **transform function** bridges them.

### Transform function: `transformToSharedReport`

Create in `apps/desktop/src/lib/transforms.ts`.

**Key field mappings** (verified against `packages/shared/src/types/vehicle-report.ts`):

| SharedVehicleReport field | Source in ApiVehicleReport | Notes |
|---|---|---|
| `vin` | `vehiculo.vin` | direct |
| `year/make/model/trim` | `vehiculo.*` | direct |
| `price` | `parsePriceStr(vehiculo.precioVenta)` | |
| `mileage` | `parseInt(vehiculo.odometro)` | strip non-digits |
| `color` | `vehiculo.color` | |
| `engine` | `vehiculo.engine` | |
| `transmission` | `vehiculo.transmission` | |
| `drivetrain` | `vehiculo.drive` | field is `drive`, not `drivetrain` |
| `images` | `currentImages` | already `string[]` |
| `auction.name` | `historial.subastasAnteriores.info.subasta` | |
| `auction.price` | `parsePriceStr(historial.subastasAnteriores.info.finalBid)` | field is `finalBid` |
| `previousOwners` | `historial.propietarios.length` | field is `propietarios`, not `duenos` |
| `stats.titleStatus` | `historial.tituloOdometro.titulo` | map 'Limpio'→'Clean' |
| `stats.accidents` | `historial.accidentes.resumen.totalAccidentes` | nested under `resumen` |
| `stats.odometerVerified` | `historial.tituloOdometro.odometroEstado` | check includes 'Consist' |
| `stats.priceDeltaPct` | computed: `(price - mmrValue) / mmrValue * 100` | no API field |
| `priceEval.label` | `mercado.manheim.etiquetaPrecio` | map ES→EN label |
| `priceEval.marketAvgDeltaPct` | same computed as `stats.priceDeltaPct` | |
| `score` | **not in API** — default `0` | |
| `verdict` | **not in API** — default `'BUY'` | |
| `aiSummary` | **not in API** — default `''` | |
| `location` | **not in API** — default `'—'` | |
| `daysOnLot` | **not in API** — default `0` | |

```ts
import type { VehicleReport as ApiReport } from '@carveri/shared/types/vehicle-report'
import type { VehicleReport as SharedReport } from '@carveri/shared/data/report'

export function parsePriceStr(s: string): number {
  return Number.parseFloat(s.replaceAll(/[$,]/g, '')) || 0
}

export function transformToSharedReport(raw: ApiReport): SharedReport {
  const v = raw.vehiculo
  const manheim = raw.mercado.manheim
  const kbb = raw.mercado.kbb
  const jdp = raw.mercado.jdPower
  const bb = raw.mercado.blackBook
  const askingPrice = parsePriceStr(v.precioVenta)
  const mmrValue = parsePriceStr(manheim.baseMmr)
  const kbbValue = parsePriceStr(kbb.fairPurchasePrice)
  const jdpValue = parsePriceStr(jdp.tradeAvg.total)
  const bbValue = parsePriceStr(bb.wholesale.avg?.total ?? '$0')
  const priceDeltaPct = mmrValue > 0 ? ((askingPrice - mmrValue) / mmrValue) * 100 : 0

  return {
    vin: v.vin,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    price: askingPrice,
    mileage: Number.parseInt(v.odometro.replace(/[^0-9]/g, '')) || 0,
    location: '—',            // not available in API
    color: v.color === '-' ? '—' : v.color,
    engine: v.engine,
    transmission: v.transmission,
    drivetrain: v.drive,      // field is `drive` on Vehiculo
    daysOnLot: 0,             // not available in API
    previousOwners: raw.historial.propietarios.length,  // field is `propietarios`
    auction: {
      name: raw.historial.subastasAnteriores.info.subasta,
      price: parsePriceStr(raw.historial.subastasAnteriores.info.finalBid),  // field is `finalBid`
    },
    images: raw.currentImages,
    score: 0,                 // not available in API
    verdict: 'BUY',           // not available in API
    aiSummary: '',            // not available in API
    stats: {
      titleStatus: mapTitleStatus(raw.historial.tituloOdometro.titulo),
      accidents: raw.historial.accidentes.resumen.totalAccidentes,  // nested under `resumen`
      odometerVerified: raw.historial.tituloOdometro.odometroEstado.toLowerCase().includes('consist'),
      priceDeltaPct,
    },
    priceEval: {
      label: mapPriceLabel(manheim.etiquetaPrecio),  // field is `etiquetaPrecio` on Manheim
      marketAvgDeltaPct: priceDeltaPct,
      bookValues: [
        { source: 'MMR', value: mmrValue,  delta: mmrValue  - askingPrice },
        { source: 'KBB', value: kbbValue,  delta: kbbValue  - askingPrice },
        { source: 'JDP', value: jdpValue,  delta: jdpValue  - askingPrice },
        { source: 'BB',  value: bbValue,   delta: bbValue   - askingPrice },
      ],
    },
    // These fields feed subtab components that receive apiReport directly.
    // Provide empty shells to satisfy the SharedVehicleReport type.
    market:     { comparables: [] },
    negotiate:  { strategy: { firstOffer: 0, midpoint: 0, maxRecommended: 0, tips: [] }, arguments: [], costs: { state: '', taxRatePct: 0, tagAndTitle: 0, dealerFee: 0, monthlyEstimates: [] } },
    verdictTab: { scoreBreakdown: [], risks: [], checklist: [] },
    historyTab: { timeline: [], auctionPhotos: [], accidents: { count: 0, description: '' }, owners: [], service: [], title: [] },
  }
}

function mapTitleStatus(s: string): 'Clean' | 'Salvage' | 'Rebuilt' {
  if (s === 'Limpio' || s === 'Clean') return 'Clean'
  if (s === 'Salvage') return 'Salvage'
  return 'Rebuilt'
}

function mapPriceLabel(s: string): 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED' {
  const map: Record<string, 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED'> = {
    GANGA: 'BARGAIN', BAJO: 'LOW', JUSTO: 'FAIR', ALTO: 'HIGH', CARO: 'OVERPRICED',
  }
  return map[s?.toUpperCase() ?? ''] ?? 'FAIR'
}
```

---

## Layout Architecture

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (sticky, full width, h-14)                        │
│  Back btn | CarVeri logo | Vehicle name + VIN badge       │
│                              | LanguageToggle | Share | PDF│
├─────────────────┬────────────────────────────────────────┤
│  SIDEBAR        │  MAIN CONTENT                           │
│  (fixed, w-64,  │  (flex-1, overflow-y-auto, p-8)        │
│  overflow-y-auto│                                         │
│  h-[calc(100vh  │  Renders the active section component   │
│  - 56px)])      │  based on sidebar nav state             │
│                 │                                         │
│  • Image        │                                         │
│    carousel     │                                         │
│  • Price + mi   │                                         │
│  • CarSummaryCard│                                        │
│  • Nav tree     │                                         │
│  • VIN footer   │                                         │
└─────────────────┴────────────────────────────────────────┘
```

**Route:** Single route `/reports/:vin` (state-based). Active section stored in React state. No sub-routes.

---

## SectionId Type

```ts
export type SectionId =
  | 'resumen'
  | 'timeline' | 'fotos-subasta' | 'accidentes' | 'duenos' | 'servicio' | 'titulo'
  | 'mercado'
  | 'veredicto' | 'riesgos'
  | 'checklist'
  | 'estrategia' | 'argumentos' | 'costos'
```

### TabId → SectionId adapter (for `QuickNavGrid`)

`QuickNavGrid` from shared calls `onNavigate` with a `TabId` (`'history' | 'market' | 'verdict' | 'negotiate'`). Map this to `SectionId` in `ReportPage`:

```ts
function tabIdToSection(tab: TabId): SectionId {
  const map: Record<TabId, SectionId> = {
    home:     'resumen',
    history:  'timeline',
    market:   'mercado',
    verdict:  'veredicto',
    negotiate:'estrategia',
  }
  return map[tab]
}
```

Pass `(tab) => setActiveSection(tabIdToSection(tab))` to `QuickNavGrid`'s `onNavigate` prop.

---

## Components to Create

### 1. `apps/desktop/src/pages/ReportPage.tsx`

Top-level page component. Owns `activeSection` state. Loads data via `useLoaderData<ApiVehicleReport>()`. Runs `transformToSharedReport` once to get the flat report for home-tab components.

```tsx
const apiReport = useLoaderData<ApiVehicleReport>()
const sharedReport = transformToSharedReport(apiReport)
const [activeSection, setActiveSection] = useState<SectionId>('resumen')
```

**Layout:**
```tsx
<div className="flex h-screen flex-col overflow-hidden">
  <ReportHeader vehicle={sharedReport} />
  <div className="flex flex-1 overflow-hidden">
    <ReportSidebar
      report={sharedReport}
      activeSection={activeSection}
      onNavigate={setActiveSection}
    />
    <main className="flex-1 overflow-y-auto p-8">
      <ReportMainContent
        activeSection={activeSection}
        apiReport={apiReport}
        sharedReport={sharedReport}
        onNavigate={setActiveSection}
      />
    </main>
  </div>
</div>
```

---

### 2. `apps/desktop/src/components/ReportHeader.tsx`

Props: `vehicle: SharedVehicleReport`

**Left:** back chevron (`useNavigate(-1)`) + CarVeri logo
**Center:** `{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}` + VIN pill badge
**Right:** `<LanguageToggle />`, Share button (ghost, `IconShare`), PDF button (ghost, `IconDownload`) — both no-op for now

Height `h-14`, `sticky top-0 z-10`, white background, border-bottom.

---

### 3. `apps/desktop/src/components/ReportSidebar.tsx`

Props: `report: SharedVehicleReport`, `activeSection: SectionId`, `onNavigate: (s: SectionId) => void`

**Sections top to bottom:**

1. **Image carousel** — `<ImageCarousel images={report.images} />` — note: `images` is `string[]` on `SharedVehicleReport`, which matches `ImageCarousel`'s `images: string[]` prop exactly
2. **Price + mileage** — `${report.price.toLocaleString()}` + `{report.mileage.toLocaleString()} mi`
3. **Verdict card** — `<CarSummaryCard />` from `@carveri/shared/components/CarSummaryCard` (our version, not the reference gauge-based card)
4. **Nav tree** — see structure below
5. **VIN footer** — monospace, muted

**Nav tree** (collapsible groups, each group's open state managed locally in the sidebar with `useState`):

```
Resumen                         → 'resumen'
Historial          [expandable, default open]
  Timeline                      → 'timeline'
  Fotos Subasta                 → 'fotos-subasta'
  Accidentes                    → 'accidentes'
  Dueños                        → 'duenos'
  Servicio                      → 'servicio'
  Título                        → 'titulo'
Mercado                         → 'mercado'
Veredicto IA       [expandable, default open]
  Veredicto                     → 'veredicto'
  Riesgos                       → 'riesgos'
Checklist                       → 'checklist'
Negociación        [expandable, default open]
  Estrategia                    → 'estrategia'
  Argumentos                    → 'argumentos'
  Costos                        → 'costos'
```

Active item: blue background (`bg-blue-50`) + left border accent (`border-l-2 border-blue-600`), blue text. Parent labels are bold section headers with chevron toggle.

---

### 4. `apps/desktop/src/components/ReportMainContent.tsx`

Props: `activeSection`, `apiReport: ApiVehicleReport`, `sharedReport: SharedVehicleReport`, `onNavigate`

Renders the correct component based on `activeSection`. A simple object map:

```tsx
// Sub-tab components receive apiReport (they were built for the API type)
// ResumenView receives sharedReport (it uses home-tab shared components)
const content: Record<SectionId, ReactNode> = {
  resumen:         <ResumenView report={sharedReport} onNavigate={onNavigate} />,
  timeline:        <TimelineSubtab historial={apiReport.historial} />,
  'fotos-subasta': <AuctionPhotosSubtab currentImages={apiReport.currentImages} />,
  accidentes:      <AccidentsSubtab historial={apiReport.historial} />,
  duenos:          <OwnersSubtab historial={apiReport.historial} />,
  servicio:        <ServiceSubtab historial={apiReport.historial} />,
  titulo:          <TitleSubtab historial={apiReport.historial} />,
  mercado:         <MarketTab report={sharedReport} />,
  veredicto:       <VerdictSubtab />,
  riesgos:         <RisksSubtab />,
  checklist:       <ChecklistSubtab />,
  estrategia:      <StrategySubtab />,
  argumentos:      <ArgumentsSubtab />,
  costos:          <CostsSubtab />,
}
return content[activeSection]
```

> Verify the exact props each subtab component expects by checking their definitions in `packages/shared/src/components/history/`, `market/`, `verdict/`, and `negotiate/` at implementation time.

---

### 5. `apps/desktop/src/components/ResumenView.tsx`

Props: `report: SharedVehicleReport`, `onNavigate: (s: SectionId) => void`

**Sections in order:**

1. **Breadcrumb** — small `🏠 Resumen` label
2. **Heading** — "Resumen del Reporte" `h2` + subtitle with vehicle name/year
3. **Quick stats 2×2** — `<StatsGrid stats={report.stats} />`
4. **Price Evaluation** — built inline (not `PriceEvalSection`, which includes the gauge):
   ```tsx
   <div>
     <h3>Evaluación de Precio</h3>
     <p className="text-3xl font-black">${report.price.toLocaleString()}</p>
     <p>{LABEL_TEXT[report.priceEval.label]}</p>
     <BookValues bookValues={report.priceEval.bookValues} />
   </div>
   ```
5. **Vehicle data** — `<VehicleDataSection vin={report.vin} engine={report.engine} transmission={report.transmission} drivetrain={report.drivetrain} color={report.color} auction={report.auction} location={report.location} daysOnLot={report.daysOnLot} previousOwners={report.previousOwners} />`
6. **AI summary** — `<AISummarySection aiSummary={report.aiSummary} />`
7. **Quick-nav cards** — `<QuickNavGrid onNavigate={(tab) => onNavigate(tabIdToSection(tab))} />` — uses the `TabId → SectionId` adapter

---

## Router Update

`apps/desktop/src/data/router.tsx`:

```ts
import type { LoaderFunctionArgs } from 'react-router'
import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layout/root.tsx'
import ReportPage from '@/pages/ReportPage.tsx'
import ReportError from '@/pages/ReportError.tsx'
import { fetchVehicleReport } from '@carveri/shared/data/api'

async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response('Not Found', { status: 404 })
  return fetchVehicleReport(params.vin)
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <div className="p-8 text-lg font-semibold">CarVeri Desktop — coming soon</div> },
      { path: 'reports/:vin', element: <ReportPage />, loader: reportLoader, errorElement: <ReportError /> },
    ],
  },
])

export default router
```

---

## Files to Create / Modify

| Action | File |
|---|---|
| **Create** | `apps/desktop/src/pages/ReportPage.tsx` |
| **Create** | `apps/desktop/src/pages/ReportError.tsx` |
| **Create** | `apps/desktop/src/components/ReportHeader.tsx` |
| **Create** | `apps/desktop/src/components/ReportSidebar.tsx` |
| **Create** | `apps/desktop/src/components/ReportMainContent.tsx` |
| **Create** | `apps/desktop/src/components/ResumenView.tsx` |
| **Create** | `apps/desktop/src/lib/utils.ts` (re-export `cn` from `@carveri/shared/lib/utils`) |
| **Create** | `apps/desktop/src/lib/transforms.ts` (`transformToSharedReport`, `parsePriceStr`, label mappers) |
| **Modify** | `apps/desktop/src/data/router.tsx` |

---

## Styling Notes

- Sidebar width: `w-64` (256px)
- Header height: `h-14` (56px)
- Sidebar + main: `h-[calc(100vh-56px)]`
- No mobile breakpoints — desktop-only app
- Dark mode: `.dark` class selector
- Tailwind CSS v4 — no config file, configured in `apps/desktop/src/index.css`
- `cn()` available via `@/lib/utils` (the new local re-export file)

---

## Out of Scope

- PDF export (Share/PDF buttons are no-op UI)
- Authentication / home page beyond placeholder
- Any changes to `@carveri/shared` components
- Responsive / mobile breakpoints
