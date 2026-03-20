# Desktop Report Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `apps/desktop` report dashboard — a fixed-sidebar + scrollable-main layout that replicates the reference at https://carcheckcub-e8jeqgfr.manus.space/reports/JA4J4VA86RZ079851.

**Architecture:** Single `/reports/:vin` route with state-based section navigation. A `transformToSharedReport` function converts the API-shaped `VehicleReport` to the flat `SharedVehicleReport` type consumed by the shared home-tab components. The desktop shell (header, sidebar, main content switcher) is all new; sub-tab content components already exist in `@carveri/shared`.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS v4, `@carveri/shared` component library.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `apps/desktop/src/lib/utils.ts` | Create | Re-exports `cn()` so `@/lib/utils` resolves inside desktop |
| `apps/desktop/src/lib/transforms.ts` | Create | `transformToSharedReport` + all data-mapping helpers |
| `apps/desktop/src/pages/ReportError.tsx` | Create | Error boundary shown when report route throws |
| `apps/desktop/src/data/router.tsx` | Modify | Add `/reports/:vin` route with loader |
| `apps/desktop/src/components/ReportHeader.tsx` | Create | Sticky top bar (logo, vehicle name/VIN, controls) |
| `apps/desktop/src/components/ResumenView.tsx` | Create | Home tab: stats grid, book values, vehicle data, AI summary, quick-nav |
| `apps/desktop/src/components/ReportSidebar.tsx` | Create | Fixed left panel: carousel, price, verdict card, collapsible nav tree |
| `apps/desktop/src/components/ReportMainContent.tsx` | Create | Section switcher — maps `SectionId` → correct shared component |
| `apps/desktop/src/pages/ReportPage.tsx` | Create | Top-level page: owns `activeSection` state, assembles all parts |

---

## Key Conventions

- **Path alias:** `@/` → `apps/desktop/src/`. All local imports use this.
- **Shared imports:** always `@carveri/shared/components/...` or `@carveri/shared/lib/...`
- **Styling:** Tailwind CSS v4 utility classes. Use `cn()` from `@/lib/utils` for conditional classes.
- **No tests** — this project has no test suite. Verification is done by running the dev server.
- **Dev server:** `pnpm dev:desktop` from the monorepo root (or `pnpm dev` inside `apps/desktop/`).
- **Type imports:** Use `import type` for type-only imports.

---

## Task 1: Foundation — utils + transforms

**Files:**
- Create: `apps/desktop/src/lib/utils.ts`
- Create: `apps/desktop/src/lib/transforms.ts`

- [ ] **Step 1: Create utils.ts**

```ts
// apps/desktop/src/lib/utils.ts
export { cn } from '@carveri/shared/lib/utils'
```

- [ ] **Step 2: Create transforms.ts**

```ts
// apps/desktop/src/lib/transforms.ts
import type { VehicleReport as ApiReport } from '@carveri/shared/types/vehicle-report'
import type {
  HistoryEvent,
  HistoryOwner,
  HistoryServiceRecord,
  HistoryTitleItem,
  VehicleReport as SharedReport,
} from '@carveri/shared/data/report'

export function parsePriceStr(s: string): number {
  return Number.parseFloat(s.replaceAll(/[$,]/g, '')) || 0
}

function mapTitleStatus(s: string): 'Clean' | 'Salvage' | 'Rebuilt' {
  const lower = s.toLowerCase()
  if (lower === 'limpio' || lower === 'clean') return 'Clean'
  if (lower === 'salvage') return 'Salvage'
  return 'Rebuilt'
}

function mapPriceLabel(s: string): 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED' {
  const map: Record<string, 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED'> = {
    GANGA: 'BARGAIN', BAJO: 'LOW', JUSTO: 'FAIR', ALTO: 'HIGH', CARO: 'OVERPRICED',
  }
  return map[s?.toUpperCase() ?? ''] ?? 'FAIR'
}

function mapOwners(raw: ApiReport): HistoryOwner[] {
  return raw.historial.propietarios.map((p) => ({
    id: String(p.numero),
    label: p.etiqueta,
    type: p.tipo,
    state: p.estados,
    periodStart: String(p.anioPurchased),
    periodEnd: '',
    periodMonths: 0,
    startMileage: 0,
    endMileage: Number.parseInt(p.ultimoOdometro.replace(/[^0-9]/g, '')) || 0,
  }))
}

function mapService(raw: ApiReport): HistoryServiceRecord[] {
  return raw.historial.mantenimiento.registros.map((r, i) => ({
    id: String(i),
    name: r.detalles[0] ?? r.tipo,
    type: r.tipo,
    date: r.fecha,
    mileage: Number.parseInt(r.odometro.replace(/[^0-9]/g, '')) || 0,
  }))
}

function mapTitle(raw: ApiReport): HistoryTitleItem[] {
  return raw.historial.tituloOdometro.historialTitulo.map((h, i) => ({
    id: String(i),
    title: h.tipo,
    description: h.detalles.join(' · ') || h.fuente,
  }))
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
    location: '—',
    color: v.color === '-' ? '—' : v.color,
    engine: v.engine,
    transmission: v.transmission,
    drivetrain: v.drive,
    daysOnLot: 0,
    previousOwners: raw.historial.propietarios.length,
    auction: {
      name: raw.historial.subastasAnteriores.info.subasta,
      price: parsePriceStr(raw.historial.subastasAnteriores.info.finalBid),
    },
    images: raw.currentImages,
    score: 0,
    verdict: 'BUY',
    aiSummary: '',
    stats: {
      titleStatus: mapTitleStatus(raw.historial.tituloOdometro.titulo),
      accidents: raw.historial.accidentes.resumen.totalAccidentes,
      odometerVerified: raw.historial.tituloOdometro.odometroEstado
        .toLowerCase()
        .includes('consist'),
      priceDeltaPct,
    },
    priceEval: {
      label: mapPriceLabel(manheim.etiquetaPrecio),
      marketAvgDeltaPct: priceDeltaPct,
      bookValues: [
        { source: 'MMR', value: mmrValue, delta: mmrValue - askingPrice },
        { source: 'KBB', value: kbbValue, delta: kbbValue - askingPrice },
        { source: 'JDP', value: jdpValue, delta: jdpValue - askingPrice },
        { source: 'BB', value: bbValue, delta: bbValue - askingPrice },
      ],
    },
    market: { comparables: [] },
    negotiate: {
      strategy: { firstOffer: 0, midpoint: 0, maxRecommended: 0, tips: [] },
      arguments: [],
      costs: { state: '', taxRatePct: 0, tagAndTitle: 0, dealerFee: 0, monthlyEstimates: [] },
    },
    verdictTab: { scoreBreakdown: [], risks: [], checklist: [] },
    historyTab: {
      timeline: [] as HistoryEvent[],
      auctionPhotos: raw.historial.subastasAnteriores.imagenes,
      accidents: {
        count: raw.historial.accidentes.resumen.totalAccidentes,
        description: raw.historial.accidentes.resumen.reparado ?? '',
      },
      owners: mapOwners(raw),
      service: mapService(raw),
      title: mapTitle(raw),
    },
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run from `apps/desktop/`:
```bash
pnpm build 2>&1 | head -40
```
Expected: no type errors in the two new files. (Other errors from missing pages are fine at this stage.)

- [ ] **Step 4: Commit**

```bash
git add apps/desktop/src/lib/utils.ts apps/desktop/src/lib/transforms.ts
git commit -m "feat(desktop): add utils re-export and API→shared report transform"
```

---

## Task 2: Error page + router wiring

**Files:**
- Create: `apps/desktop/src/pages/ReportError.tsx`
- Modify: `apps/desktop/src/data/router.tsx`

- [ ] **Step 1: Create ReportError page**

```tsx
// apps/desktop/src/pages/ReportError.tsx
import { useRouteError } from 'react-router'

export default function ReportError() {
  const error = useRouteError() as { status?: number }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="text-5xl font-black text-slate-200">
        {error?.status ?? '?'}
      </p>
      <p className="text-base font-semibold text-slate-700">
        {error?.status === 404 ? 'Report not found' : 'Something went wrong'}
      </p>
      <a href="/" className="text-sm text-blue-600 underline">
        Go home
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Update router.tsx**

Replace the entire file:

```tsx
// apps/desktop/src/data/router.tsx
import type { LoaderFunctionArgs } from 'react-router'
import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layout/root.tsx'
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
      {
        index: true,
        element: (
          <div className="p-8 text-lg font-semibold">
            CarVeri Desktop — coming soon
          </div>
        ),
      },
      {
        path: 'reports/:vin',
        // ReportPage imported lazily — add after Task 7
        element: <div className="p-8">Loading report page…</div>,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
    ],
  },
])

export default router
```

> **Note:** The `reports/:vin` element is a placeholder — it will be replaced with `<ReportPage />` in Task 7. The loader and error element are wired now so the route exists and errors are handled.

- [ ] **Step 3: Start dev server and verify the route exists**

```bash
pnpm dev:desktop
```

Navigate to `http://localhost:5174/reports/TEST123` (port may vary — check terminal output).
Expected: "Loading report page…" text displayed. If the API call fails, the `ReportError` component appears — that is correct behavior.

- [ ] **Step 4: Commit**

```bash
git add apps/desktop/src/pages/ReportError.tsx apps/desktop/src/data/router.tsx
git commit -m "feat(desktop): add report route with loader and error boundary"
```

---

## Task 3: ReportHeader

**Files:**
- Create: `apps/desktop/src/components/ReportHeader.tsx`

- [ ] **Step 1: Create ReportHeader**

```tsx
// apps/desktop/src/components/ReportHeader.tsx
import { ChevronLeft, Download, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import LanguageToggle from '@carveri/shared/components/LanguageToggle'
import { cn } from '@/lib/utils'
import type { VehicleReport } from '@carveri/shared/data/report'

interface Props {
  vehicle: Pick<VehicleReport, 'year' | 'make' | 'model' | 'trim' | 'vin'>
}

export default function ReportHeader({ vehicle }: Readonly<Props>) {
  const navigate = useNavigate()
  const { year, make, model, trim, vin } = vehicle

  return (
    <header className={cn(
      'sticky top-0 z-20 flex h-14 items-center justify-between',
      'border-b border-slate-100 bg-white px-4',
    )}>
      {/* Left: back + logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <ChevronLeft size={18} />
        </button>
        <img
          src="/logo.svg"
          alt="CarVeri"
          className="h-6"
          onError={(e) => {
            // Fallback if logo asset missing
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <span className="hidden text-base font-black tracking-tight text-slate-900 sm:block">
          CarVeri
        </span>
      </div>

      {/* Center: vehicle name + VIN */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800">
          {year} {make} {model} {trim}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] text-slate-500">
          {vin}
        </span>
      </div>

      {/* Right: language + actions */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Compartir</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          <Download size={13} />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/desktop/src/components/ReportHeader.tsx
git commit -m "feat(desktop): add ReportHeader component"
```

---

## Task 4: ResumenView

**Files:**
- Create: `apps/desktop/src/components/ResumenView.tsx`

The `ResumenView` is the home/summary tab. It uses shared home-tab components and shows the price label map inline (avoiding `PriceEvalSection` which includes the gauge).

- [ ] **Step 1: Create ResumenView**

```tsx
// apps/desktop/src/components/ResumenView.tsx
import { Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatsGrid from '@carveri/shared/components/home/StatsGrid'
import BookValues from '@carveri/shared/components/home/BookValues'
import VehicleDataSection from '@carveri/shared/components/home/VehicleDataSection'
import AISummarySection from '@carveri/shared/components/home/AISummarySection'
import QuickNavGrid from '@carveri/shared/components/home/QuickNavGrid'
import type { VehicleReport } from '@carveri/shared/data/report'
import type { TabId } from '@carveri/shared/data/report'
import type { SectionId } from '@/pages/ReportPage'

const PRICE_LABEL_TEXT: Record<string, string> = {
  BARGAIN: 'Ganga',
  LOW: 'Por debajo del mercado',
  FAIR: 'Precio justo',
  HIGH: 'Por encima del mercado',
  OVERPRICED: 'Caro',
}

function tabIdToSection(tab: TabId): SectionId {
  const map: Record<TabId, SectionId> = {
    home: 'resumen',
    history: 'timeline',
    market: 'mercado',
    verdict: 'veredicto',
    negotiate: 'estrategia',
  }
  return map[tab]
}

interface Props {
  report: VehicleReport
  onNavigate: (s: SectionId) => void
}

export default function ResumenView({ report, onNavigate }: Readonly<Props>) {
  const { t } = useTranslation('common')
  const { priceEval, stats } = report
  const isAbove = priceEval.marketAvgDeltaPct > 0
  const absPct = Math.abs(priceEval.marketAvgDeltaPct).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Home size={11} />
        <span>Resumen</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-black text-slate-900">Resumen del Reporte</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Vista general de tu CarVeri para{' '}
          <span className="font-semibold">
            {report.year} {report.make} {report.model}
          </span>
        </p>
      </div>

      {/* Quick stats 2×2 */}
      <StatsGrid stats={stats} />

      {/* Price Evaluation (no gauge) */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">$ Evaluación de Precio</span>
        </div>
        <div className="mb-1 text-center text-3xl font-black text-slate-900">
          ${report.price.toLocaleString()}
        </div>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-blue-600">
          {PRICE_LABEL_TEXT[priceEval.label]} —{' '}
          {absPct}% {isAbove ? 'por encima' : 'por debajo'} del promedio
        </p>
        <BookValues bookValues={priceEval.bookValues} />
      </div>

      {/* Vehicle data */}
      <VehicleDataSection
        vin={report.vin}
        engine={report.engine}
        transmission={report.transmission}
        drivetrain={report.drivetrain}
        color={report.color}
        auction={report.auction}
        location={report.location}
        daysOnLot={report.daysOnLot}
        previousOwners={report.previousOwners}
      />

      {/* AI summary */}
      {report.aiSummary ? (
        <AISummarySection aiSummary={report.aiSummary} />
      ) : null}

      {/* Quick-nav cards */}
      <QuickNavGrid onNavigate={(tab) => onNavigate(tabIdToSection(tab))} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/desktop/src/components/ResumenView.tsx
git commit -m "feat(desktop): add ResumenView with stats, price eval, vehicle data, and nav grid"
```

---

## Task 5: ReportSidebar

**Files:**
- Create: `apps/desktop/src/components/ReportSidebar.tsx`

The sidebar is a fixed left panel with image carousel, price/mileage, verdict card, collapsible nav tree, and VIN footer.

- [ ] **Step 1: Create ReportSidebar**

```tsx
// apps/desktop/src/components/ReportSidebar.tsx
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import ImageCarousel from '@carveri/shared/components/ImageCarousel'
import CarSummaryCard from '@carveri/shared/components/CarSummaryCard'
import { cn } from '@/lib/utils'
import type { VehicleReport } from '@carveri/shared/data/report'
import type { SectionId } from '@/pages/ReportPage'

interface NavItem {
  id: SectionId
  label: string
}

interface NavGroup {
  label: string
  icon: string
  children: NavItem[]
}

type NavEntry = { type: 'item'; id: SectionId; label: string } | { type: 'group'; group: NavGroup }

const NAV: NavEntry[] = [
  { type: 'item', id: 'resumen', label: 'Resumen' },
  {
    type: 'group',
    group: {
      label: 'Historial',
      icon: '🕒',
      children: [
        { id: 'timeline', label: 'Timeline' },
        { id: 'fotos-subasta', label: 'Fotos Subasta' },
        { id: 'accidentes', label: 'Accidentes' },
        { id: 'duenos', label: 'Dueños' },
        { id: 'servicio', label: 'Servicio' },
        { id: 'titulo', label: 'Título' },
      ],
    },
  },
  { type: 'item', id: 'mercado', label: 'Mercado' },
  {
    type: 'group',
    group: {
      label: 'Veredicto IA',
      icon: '✨',
      children: [
        { id: 'veredicto', label: 'Veredicto' },
        { id: 'riesgos', label: 'Riesgos' },
      ],
    },
  },
  { type: 'item', id: 'checklist', label: 'Checklist' },
  {
    type: 'group',
    group: {
      label: 'Negociación',
      icon: '💬',
      children: [
        { id: 'estrategia', label: 'Estrategia' },
        { id: 'argumentos', label: 'Argumentos' },
        { id: 'costos', label: 'Costos' },
      ],
    },
  },
]

interface Props {
  report: VehicleReport
  activeSection: SectionId
  onNavigate: (s: SectionId) => void
}

export default function ReportSidebar({ report, activeSection, onNavigate }: Readonly<Props>) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Historial: true,
    'Veredicto IA': true,
    Negociación: true,
  })

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }))

  return (
    <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-100 bg-slate-50">
      {/* Image carousel */}
      <div className="p-3">
        <div className="overflow-hidden rounded-xl">
          <ImageCarousel images={report.images} />
        </div>
      </div>

      {/* Price + mileage */}
      <div className="border-b border-slate-100 px-4 pb-3">
        <p className="text-2xl font-black text-slate-900">
          ${report.price.toLocaleString()}
        </p>
        <p className="text-xs text-slate-500">
          {report.mileage.toLocaleString()} mi
        </p>
      </div>

      {/* Verdict card */}
      <div className="p-3">
        <CarSummaryCard
          year={report.year}
          make={report.make}
          model={report.model}
          trim={report.trim}
          price={report.price}
          mileage={report.mileage}
          location={report.location}
          score={report.score}
          verdict={report.verdict}
          aiSummary={report.aiSummary}
        />
      </div>

      {/* Nav tree */}
      <nav className="flex-1 pb-4">
        {NAV.map((entry) => {
          if (entry.type === 'item') {
            const active = activeSection === entry.id
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onNavigate(entry.id)}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors',
                  active
                    ? 'border-l-2 border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-l-2 border-transparent text-slate-700 hover:bg-slate-100',
                )}
              >
                {entry.label}
              </button>
            )
          }

          const { group } = entry
          const isOpen = openGroups[group.label] ?? false
          const isChildActive = group.children.some((c) => c.id === activeSection)

          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-700',
                  'border-l-2 border-transparent transition-colors hover:bg-slate-100',
                  isChildActive && !isOpen && 'border-blue-600 bg-blue-50 text-blue-700',
                )}
              >
                <span>{group.icon} {group.label}</span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {isOpen && (
                <div>
                  {group.children.map((child) => {
                    const active = activeSection === child.id
                    return (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onNavigate(child.id)}
                        className={cn(
                          'flex w-full items-center py-1.5 pl-9 pr-4 text-xs transition-colors',
                          active
                            ? 'border-l-2 border-blue-600 bg-blue-50 font-semibold text-blue-700'
                            : 'border-l-2 border-transparent font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700',
                        )}
                      >
                        {child.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* VIN footer */}
      <div className="border-t border-slate-100 px-4 py-3">
        <p className="font-mono text-[10px] text-slate-400">{report.vin}</p>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/desktop/src/components/ReportSidebar.tsx
git commit -m "feat(desktop): add ReportSidebar with collapsible nav tree"
```

---

## Task 6: ReportMainContent

**Files:**
- Create: `apps/desktop/src/components/ReportMainContent.tsx`

Maps each `SectionId` to the correct shared sub-tab component, passing the right data shape for each.

- [ ] **Step 1: Create ReportMainContent**

```tsx
// apps/desktop/src/components/ReportMainContent.tsx
import TimelineSubtab from '@carveri/shared/components/history/TimelineSubtab'
import AuctionPhotosSubtab from '@carveri/shared/components/history/AuctionPhotosSubtab'
import AccidentsSubtab from '@carveri/shared/components/history/AccidentsSubtab'
import OwnersSubtab from '@carveri/shared/components/history/OwnersSubtab'
import ServiceSubtab from '@carveri/shared/components/history/ServiceSubtab'
import TitleSubtab from '@carveri/shared/components/history/TitleSubtab'
import MarketTab from '@carveri/shared/components/market/MarketTab'
import VerdictSubtab from '@carveri/shared/components/verdict/VerdictSubtab'
import RisksSubtab from '@carveri/shared/components/verdict/RisksSubtab'
import ChecklistSubtab from '@carveri/shared/components/verdict/ChecklistSubtab'
import StrategySubtab from '@carveri/shared/components/negotiate/StrategySubtab'
import ArgumentsSubtab from '@carveri/shared/components/negotiate/ArgumentsSubtab'
import CostsSubtab from '@carveri/shared/components/negotiate/CostsSubtab'
import ResumenView from '@/components/ResumenView'
import type { VehicleReport } from '@carveri/shared/data/report'
import type { SectionId } from '@/pages/ReportPage'

interface Props {
  activeSection: SectionId
  report: VehicleReport
  onNavigate: (s: SectionId) => void
}

export default function ReportMainContent({ activeSection, report, onNavigate }: Readonly<Props>) {
  const { historyTab, verdictTab, negotiate } = report

  switch (activeSection) {
    case 'resumen':
      return <ResumenView report={report} onNavigate={onNavigate} />
    case 'timeline':
      return <TimelineSubtab timeline={historyTab.timeline} />
    case 'fotos-subasta':
      return <AuctionPhotosSubtab photos={historyTab.auctionPhotos} />
    case 'accidentes':
      return <AccidentsSubtab accidents={historyTab.accidents} />
    case 'duenos':
      return <OwnersSubtab owners={historyTab.owners} />
    case 'servicio':
      return <ServiceSubtab service={historyTab.service} />
    case 'titulo':
      return <TitleSubtab title={historyTab.title} />
    case 'mercado':
      return <MarketTab report={report} />
    case 'veredicto':
      return (
        <VerdictSubtab
          score={report.score}
          recommendation={report.verdict}
          summary={report.aiSummary}
          scoreBreakdown={verdictTab.scoreBreakdown}
        />
      )
    case 'riesgos':
      return <RisksSubtab risks={verdictTab.risks} />
    case 'checklist':
      return <ChecklistSubtab checklist={verdictTab.checklist} />
    case 'estrategia':
      return <StrategySubtab strategy={negotiate.strategy} />
    case 'argumentos':
      return <ArgumentsSubtab args={negotiate.arguments} />
    case 'costos':
      return <CostsSubtab price={report.price} costs={negotiate.costs} />
    default:
      return null
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/desktop/src/components/ReportMainContent.tsx
git commit -m "feat(desktop): add ReportMainContent section switcher"
```

---

## Task 7: ReportPage + final router wiring

**Files:**
- Create: `apps/desktop/src/pages/ReportPage.tsx`
- Modify: `apps/desktop/src/data/router.tsx`

- [ ] **Step 1: Create ReportPage**

```tsx
// apps/desktop/src/pages/ReportPage.tsx
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import type { VehicleReport as ApiReport } from '@carveri/shared/types/vehicle-report'
import { transformToSharedReport } from '@/lib/transforms'
import ReportHeader from '@/components/ReportHeader'
import ReportSidebar from '@/components/ReportSidebar'
import ReportMainContent from '@/components/ReportMainContent'

export type SectionId =
  | 'resumen'
  | 'timeline'
  | 'fotos-subasta'
  | 'accidentes'
  | 'duenos'
  | 'servicio'
  | 'titulo'
  | 'mercado'
  | 'veredicto'
  | 'riesgos'
  | 'checklist'
  | 'estrategia'
  | 'argumentos'
  | 'costos'

export default function ReportPage() {
  const apiReport = useLoaderData<ApiReport>()
  const report = transformToSharedReport(apiReport)
  const [activeSection, setActiveSection] = useState<SectionId>('resumen')

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <ReportHeader vehicle={report} />
      <div className="flex flex-1 overflow-hidden">
        <ReportSidebar
          report={report}
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="flex-1 overflow-y-auto bg-white p-8">
          <ReportMainContent
            activeSection={activeSection}
            report={report}
            onNavigate={setActiveSection}
          />
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Wire ReportPage into router**

In `apps/desktop/src/data/router.tsx`, replace the placeholder element for the report route:

```tsx
// Change:
element: <div className="p-8">Loading report page…</div>,
// To:
element: <ReportPage />,
```

And add the import at the top:
```tsx
import ReportPage from '@/pages/ReportPage.tsx'
```

- [ ] **Step 3: Run dev server and verify end-to-end**

```bash
pnpm dev:desktop
```

Navigate to `http://localhost:5174/reports/JA4J4VA86RZ079851` (adjust port as needed).

Expected:
- Sticky header with "2024 MITSUBISHI Outlander SE" and VIN badge
- Fixed left sidebar with image carousel, price ($21,500), CarSummaryCard, and collapsible nav tree
- Main content shows Resumen: stats grid (Título/Accidentes/Odómetro/Precio), price evaluation with book values (MMR/KBB/JDP/BB), vehicle data grid, quick-nav cards
- Clicking sidebar items switches the main content (Timeline shows timeline, Mercado shows market tab, etc.)
- No TypeScript or console errors

> **If `VITE_API_URL` is not set:** The API call to `fetchVehicleReport` will fail. Create `apps/desktop/.env.local` with `VITE_API_URL=<api-base-url>` matching what the mobile app uses. Check `apps/mobile/.env.local` for the correct value.

- [ ] **Step 4: Run TypeScript check**

```bash
cd apps/desktop && pnpm build 2>&1 | head -50
```

Expected: TypeScript reports 0 errors. Fix any type errors before committing.

- [ ] **Step 5: Commit**

```bash
git add apps/desktop/src/pages/ReportPage.tsx apps/desktop/src/data/router.tsx
git commit -m "feat(desktop): assemble ReportPage and wire router — desktop report dashboard complete"
```
