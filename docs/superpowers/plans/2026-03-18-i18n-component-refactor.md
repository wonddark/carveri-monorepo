# i18n Component Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every hardcoded UI string in ~35 components with `useTranslation()` calls so the app renders correctly in both EN and ES.

**Architecture:** Each component receives a single `useTranslation('namespace')` call. Static arrays defined at module level that contain translatable labels (TABS, ITEMS, BADGE_CONFIG, VERDICT_CONFIG) must be moved inside the component body so `t()` is in scope. Seven translation keys need `{{variable}}` interpolation syntax added to their JSON values before the components that use them are edited (6 from the spec table + `negotiate/costs.breakdown` which needs `{{state}}` for architectural correctness — no string concatenation).

**Tech Stack:** react-i18next `useTranslation`, i18next `{{variable}}` interpolation, TypeScript strict mode, `pnpm build` for verification.

---

## File Map

**JSON files to update (interpolation keys):**
- `src/components/home/locales/en.json` + `es.json`
- `src/components/history/locales/en.json` + `es.json`
- `src/components/market/locales/en.json` + `es.json`
- `src/components/negotiate/locales/en.json` + `es.json`

**Component files to modify:**
- `src/layout/root.tsx`
- `src/components/AppHeader.tsx`
- `src/components/BottomNavBar.tsx` ← static array move
- `src/pages/report.tsx`
- `src/pages/home.tsx` ← audit only (see Task 2, Step 1)
- `src/components/home/HomeTab.tsx`
- `src/components/home/StatsGrid.tsx` ← static array move
- `src/components/home/VehicleDataSection.tsx`
- `src/components/home/AISummarySection.tsx`
- `src/components/home/PriceEvalSection.tsx` ← static array move
- `src/components/home/QuickNavGrid.tsx` ← static array move
- `src/components/home/BookValues.tsx`
- `src/components/vehicle-details/VehicleInfoCard.tsx`
- `src/components/vehicle-details/HistorialTab.tsx`
- `src/components/vehicle-details/MercadoTab.tsx`
- `src/components/vehicle-details/IATab.tsx`
- `src/components/vehicle-details/DocumentsTab.tsx`
- `src/components/vehicle-details/PriceEvaluation.tsx`
- `src/components/ReportGauge.tsx`
- `src/components/history/HistoryTab.tsx` ← static array move
- `src/components/history/TimelineSubtab.tsx`
- `src/components/history/AccidentsSubtab.tsx`
- `src/components/history/OwnersSubtab.tsx`
- `src/components/history/ServiceSubtab.tsx`
- `src/components/history/TitleSubtab.tsx`
- `src/components/history/AuctionPhotosSubtab.tsx`
- `src/components/market/MarketTab.tsx`
- `src/components/market/MarketPriceHeader.tsx` ← static array move
- `src/components/market/ComparablesList.tsx`
- `src/components/market/ComparableCard.tsx` ← static array move
- `src/components/negotiate/NegotiateTab.tsx` ← static array move
- `src/components/negotiate/StrategySubtab.tsx`
- `src/components/negotiate/CostsSubtab.tsx`
- `src/components/negotiate/ArgumentsSubtab.tsx`
- `src/components/verdict/VerdictTab.tsx` ← static array move
- `src/components/verdict/VerdictSubtab.tsx`
- `src/components/verdict/RisksSubtab.tsx`
- `src/components/verdict/ChecklistSubtab.tsx`
- `src/components/VerdictBadge.tsx` ← static object move

---

## Task 0: Update interpolation keys in JSON files

**Files:**
- Modify: `src/components/home/locales/en.json`
- Modify: `src/components/home/locales/es.json`
- Modify: `src/components/history/locales/en.json`
- Modify: `src/components/history/locales/es.json`
- Modify: `src/components/market/locales/en.json`
- Modify: `src/components/market/locales/es.json`
- Modify: `src/components/negotiate/locales/en.json`
- Modify: `src/components/negotiate/locales/es.json`

- [ ] **Step 1: Update home interpolation key in en.json**

In `src/components/home/locales/en.json`, change:
```json
"overviewFor": "Overview for"
```
to:
```json
"overviewFor": "Overview for {{name}}"
```

- [ ] **Step 2: Update home interpolation key in es.json**

In `src/components/home/locales/es.json`, change:
```json
"overviewFor": "Descripción general para"
```
to:
```json
"overviewFor": "Descripción general para {{name}}"
```

- [ ] **Step 3: Update history interpolation keys in en.json**

In `src/components/history/locales/en.json`, make these three changes:
```json
"auctionPhotos": {
  "heading": "Auction Photos",
  "countSuffix": "{{count}} auction photos — IAAI"
},
"owners": {
  "heading": "Owner History",
  "registeredOwners": "{{count}} registered owners",
  ...
},
"service": {
  "heading": "Service History",
  "recordsSuffix": "{{count}} service records"
},
```

- [ ] **Step 4: Update history interpolation keys in es.json**

In `src/components/history/locales/es.json`, apply the same three keys:
```json
"auctionPhotos": {
  "heading": "Fotos de Subasta",
  "countSuffix": "{{count}} fotos de subasta — IAAI"
},
"owners": {
  "heading": "Historial de Propietarios",
  "registeredOwners": "{{count}} propietarios registrados",
  ...
},
"service": {
  "heading": "Historial de Servicio",
  "recordsSuffix": "{{count}} registros de servicio"
},
```

- [ ] **Step 5: Update market interpolation keys in en.json**

In `src/components/market/locales/en.json`, change:
```json
"header": {
  "marketAnalysis": "Market Analysis",
  "pricingEvaluation": "Pricing evaluation & comparables in {{city}}"
},
"comparables": {
  "heading": "Comparables in Your Area",
  "similarVehicles": "Similar vehicles near {{city}}",
  ...
}
```

- [ ] **Step 6: Update market interpolation keys in es.json**

In `src/components/market/locales/es.json`, change the same keys:
```json
"header": {
  "marketAnalysis": "Análisis de Mercado",
  "pricingEvaluation": "Evaluación de precios y comparables en {{city}}"
},
"comparables": {
  "heading": "Comparables en tu Área",
  "similarVehicles": "Vehículos similares cerca de {{city}}",
  ...
}
```

- [ ] **Step 7: Update negotiate costs.breakdown interpolation key in en.json**

In `src/components/negotiate/locales/en.json`, change:
```json
"breakdown": "Complete cost breakdown in"
```
to:
```json
"breakdown": "Complete cost breakdown in {{state}}"
```

- [ ] **Step 8: Update negotiate costs.breakdown interpolation key in es.json**

In `src/components/negotiate/locales/es.json`, change:
```json
"breakdown": "Desglose completo de costos en"
```
to:
```json
"breakdown": "Desglose completo de costos en {{state}}"
```
(Read the file first to confirm the exact current ES value before editing.)

- [ ] **Step 9: Verify build still passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 10: Commit**

```bash
git add src/components/home/locales/ src/components/history/locales/ src/components/market/locales/ src/components/negotiate/locales/
git commit -m "feat(i18n): add interpolation variables to translation keys"
```

---

## Task 1: common namespace

**Files:**
- Modify: `src/layout/root.tsx`
- Modify: `src/components/AppHeader.tsx`
- Modify: `src/components/BottomNavBar.tsx`
- Modify: `src/pages/report.tsx`

- [ ] **Step 1: Update root.tsx**

Add `useTranslation` import and replace the three nav link strings:

```tsx
import { useTranslation } from 'react-i18next';

function RootLayout() {
  const { t } = useTranslation('common');
  // ...
  <NavLink to="/login">{t('nav.signIn')}</NavLink>
  <NavLink to="/register">{t('nav.register')}</NavLink>
  <NavLink to="/">{t('nav.freeReport')}</NavLink>
```

- [ ] **Step 2: Update AppHeader.tsx**

Add `useTranslation` import and replace both aria-labels:

```tsx
import { useTranslation } from 'react-i18next';

export default function AppHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  // ...
  aria-label={t('actions.goBack')}
  // ...
  aria-label={t('actions.share')}
```

- [ ] **Step 3: Update BottomNavBar.tsx — move TABS inside component**

The `TABS` const is currently at module level. Move it inside the component function body and replace label strings with `t()` calls:

```tsx
import { useTranslation } from 'react-i18next';

export default function BottomNavBar({ activeTab, onTabChange }: Readonly<Props>) {
  const { t } = useTranslation('common');
  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'home',     label: t('bottomNav.home'),     icon: <Home size={20} /> },
    { id: 'history',  label: t('bottomNav.history'),  icon: <Clock size={20} /> },
    { id: 'market',   label: t('bottomNav.market'),   icon: <BarChart2 size={20} /> },
    { id: 'verdict',  label: t('bottomNav.verdict'),  icon: <Sparkles size={20} /> },
    { id: 'negotiate',label: t('bottomNav.negotiate'),icon: <Handshake size={20} /> },
  ];
  // rest of component unchanged
```

- [ ] **Step 4: Update report.tsx**

Add `useTranslation` and replace the 4 TabsTrigger text nodes and 4 MobileNavBtn label props:

```tsx
import { useTranslation } from 'react-i18next';

const Report: React.FC = () => {
  const { t } = useTranslation('common');
  // ...
  // TabsTrigger children:
  <IconHistory /> {t('tabs.historial')}
  <IconChartBar /> {t('tabs.mercado')}
  <IconSparkles /> {t('tabs.ia')}
  <IconFileText /> {t('tabs.documentos')}
  // MobileNavBtn props:
  label={t('tabs.historial')}
  label={t('tabs.mercado')}
  label={t('tabs.ia')}
  label={t('tabs.documentos')}
```

- [ ] **Step 5: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add src/layout/root.tsx src/components/AppHeader.tsx src/components/BottomNavBar.tsx src/pages/report.tsx
git commit -m "feat(i18n): translate common namespace — nav, header, bottom nav, report tabs"
```

---

## Task 2: home namespace

**Files:**
- Modify: `src/pages/home.tsx` (audit only — translate strings matching existing keys)
- Modify: `src/components/home/HomeTab.tsx`
- Modify: `src/components/home/StatsGrid.tsx`
- Modify: `src/components/home/VehicleDataSection.tsx`
- Modify: `src/components/home/AISummarySection.tsx`
- Modify: `src/components/home/PriceEvalSection.tsx`
- Modify: `src/components/home/QuickNavGrid.tsx`
- Modify: `src/components/home/BookValues.tsx`

- [ ] **Step 1: Audit src/pages/home.tsx**

Read the file. Identify any string literals that map to **existing** keys in `src/components/home/locales/en.json`. Replace only those strings with `t()` calls using `useTranslation('home')`. Do not add any new translation keys — strings with no existing key match remain hardcoded for a future phase.

- [ ] **Step 2: Update HomeTab.tsx**

Add `useTranslation('home')` and replace strings. The overview line uses `{{name}}` interpolation with `{year} {make} {model}`:

```tsx
import { useTranslation } from 'react-i18next';

export function HomeTab({ report }: Props) {
  const { t } = useTranslation('home');
  // ...
  // Replace "Summary" heading → {t('reportSummary')}
  // Replace "Overview for {year} {make} {model}" →
  //   {t('overviewFor', { name: `${vehicle.year} ${vehicle.make} ${vehicle.model}` })}
```

- [ ] **Step 3: Update StatsGrid.tsx — move ITEMS inside component**

Move the ITEMS array inside the component body and replace label/status strings with `t()` calls:

```tsx
import { useTranslation } from 'react-i18next';

export function StatsGrid({ stats }: Props) {
  const { t } = useTranslation('home');
  const ITEMS = [
    { key: 'title',     label: t('stats.title'),     value: stats.title,
      badge: stats.title === 'Clean' ? t('stats.clean') : stats.title },
    { key: 'accidents', label: t('stats.accidents'), value: stats.accidents,
      badge: `${stats.accidents} ${t('stats.reported')}` },
    { key: 'odometer',  label: t('stats.odometer'),  value: stats.odometer,
      badge: stats.odometerStatus === 'Verified' ? t('stats.verified') : t('stats.inconsistent') },
    { key: 'price',     label: t('stats.price'),     value: stats.price },
  ];
```

Note: read the file first to see the exact shape of ITEMS and reproduce it faithfully — replace only the string literals.

- [ ] **Step 4: Update VehicleDataSection.tsx**

Add `useTranslation('home')` and replace the "Vehicle Details" heading and row labels. The rows array of `{ label, value }` pairs uses keys from `vehicleDetails.*`. Replace each label string:

```tsx
const { t } = useTranslation('home');
// Heading:
{t('vehicleDetails.title')}
// Row labels:
t('vehicleDetails.vin'), t('vehicleDetails.engine'), t('vehicleDetails.transmission'),
t('vehicleDetails.drivetrain'), t('vehicleDetails.color'), t('vehicleDetails.auction'),
t('vehicleDetails.location'), t('vehicleDetails.daysOnLot'), t('vehicleDetails.prevOwners')
// Days suffix:  `${vehicle.daysOnLot} ${t('vehicleDetails.days')}`
```

- [ ] **Step 5: Update AISummarySection.tsx**

Add `useTranslation('home')` and replace the single "AI Summary" heading:

```tsx
const { t } = useTranslation('home');
// Replace "AI Summary" → {t('aiSummary')}
```

- [ ] **Step 6: Update PriceEvalSection.tsx — move LABEL_TEXT inside component**

The `LABEL_TEXT` object (or equivalent) is defined at module level. Move inside component and replace string values:

```tsx
import { useTranslation } from 'react-i18next';

export function PriceEvalSection(props) {
  const { t } = useTranslation('home');
  const LABEL_TEXT = {
    greatDeal:   t('priceEval.greatDeal'),
    belowMarket: t('priceEval.belowMarket'),
    fairPrice:   t('priceEval.fairPrice'),
    aboveMarket: t('priceEval.aboveMarket'),
    overpriced:  t('priceEval.overpriced'),
  };
  // Replace "Price Evaluation" heading → {t('priceEval.title')}
  // Replace "above"/"below"/"average" text → t('priceEval.above') / t('priceEval.below') / t('priceEval.average')
```

- [ ] **Step 7: Update QuickNavGrid.tsx — move ITEMS inside component**

Move the ITEMS array inside the component body:

```tsx
import { useTranslation } from 'react-i18next';

export function QuickNavGrid({ onNavigate }: Props) {
  const { t } = useTranslation('home');
  const ITEMS = [
    { id: 'history',  label: t('quickNav.timeline'),  desc: t('quickNav.timelineDesc'),  ... },
    { id: 'market',   label: t('quickNav.market'),    desc: t('quickNav.marketDesc'),    ... },
    { id: 'verdict',  label: t('quickNav.aiVerdict'), desc: t('quickNav.aiVerdictDesc'), ... },
    { id: 'negotiate',label: t('quickNav.negotiate'), desc: t('quickNav.negotiateDesc'), ... },
  ];
```

Note: read the file first to confirm id values and icon fields, then reproduce them faithfully.

- [ ] **Step 8: Update BookValues.tsx**

Add `useTranslation('home')` and replace "below"/"above" strings:

```tsx
const { t } = useTranslation('home');
// Replace "below" → {t('priceEval.below')}
// Replace "above" → {t('priceEval.above')}
```

- [ ] **Step 9: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 10: Commit**

```bash
git add src/pages/home.tsx src/components/home/
git commit -m "feat(i18n): translate home namespace components"
```

---

## Task 3: vehicle-details namespace

**Files:**
- Modify: `src/components/vehicle-details/VehicleInfoCard.tsx`
- Modify: `src/components/vehicle-details/HistorialTab.tsx`
- Modify: `src/components/vehicle-details/MercadoTab.tsx`
- Modify: `src/components/vehicle-details/IATab.tsx`
- Modify: `src/components/vehicle-details/DocumentsTab.tsx`
- Modify: `src/components/vehicle-details/PriceEvaluation.tsx`
- Modify: `src/components/ReportGauge.tsx`

- [ ] **Step 1: Update VehicleInfoCard.tsx**

Add `useTranslation('vehicle-details')` and replace the Spanish strings:

```tsx
const { t } = useTranslation('vehicle-details');
// "días en lote" → {t('infoCard.daysOnLot')}
// "Precio Justo — Dentro del rango de mercado" → {t('infoCard.fairPrice')}
// "Ver listing original en {dealer}" →
//   `${t('infoCard.viewListing')} ${vehicle.dealer}`
//   (viewListing = "View original listing at")
```

- [ ] **Step 2: Update HistorialTab.tsx**

Add `useTranslation('vehicle-details')` and replace all hardcoded strings with `t()` calls using the `historial.*` keys. Key strings to replace:
- Tab labels: `"Fotos Anteriores"` → `t('historial.auctionPhotos')`, `"Accidentes"` → `t('historial.accidents')`, `"Dueños"` → NA (Spanish only — check if a key exists, otherwise this component may be deferred), `"Mantenimiento"` → check key, `"Título"` → `t('historial.titleHistory')` or similar
- Section headings: `"Fotos de Subasta"` → `t('historial.auctionPhotos')`, `"Información de Venta en Subasta"` → `t('historial.saleInfo')`
- InfoRow labels: `"Subasta"` → `t('historial.auction')`, `"Vendedor"` → `t('historial.seller')`, `"Fecha de Venta"` → `t('historial.saleDate')`, `"Oferta Final"` → `t('historial.finalBid')`, `"Odómetro"` → `t('historial.odometer')`, `"Condición"` → `t('historial.condition')`, `"Riesgo"` → `t('historial.risk')`, `"Título"` → check key, `"Rango de Precio"` → `t('historial.priceRange')`, `"Valor Retail"` → `t('historial.retailValue')`, `"Valor Reparación"` → `t('historial.repairValue')`
- StatusCard labels: `"Accidentes"` → `t('historial.accidents')`, `"Airbags"` → `t('historial.airbags')`, `"Reparado"` → `t('historial.repaired')`, `"Estructural"` → `t('historial.structural')`
- `"No reportado"` → `t('historial.notReported')`
- `"Historial de Propietarios"` → `t('historial.ownerHistory')`
- `"Sin historial de propietarios disponible."` → `t('historial.noOwnerHistory')`
- `"Comprado:"` → `t('historial.purchased')`
- `"Último odómetro:"` → `t('historial.lastOdometer')`
- `"Registros de Servicio ({count} entradas)"` → `${t('historial.serviceRecords')} (${count} ${t('historial.entries')})`
- StatusCard `"Título"` label → check key in JSON, `"Odómetro"` → `t('historial.odometer')`, `"Lemon Law"` → `t('historial.lemonLaw')`, `"Recalls"` → `t('historial.recalls')`
- `"{count} pendiente(s)"` → `${count} ${t('historial.pending')}`
- `"Historial de Título"` → `t('historial.titleHistory')`

Note: Read the current `vehicle-details/locales/en.json` to confirm all key names before editing. Some tab labels like "Dueños"/"Mantenimiento" may not have exact keys — use the closest available key or check the JSON for a `tabs.*` section.

- [ ] **Step 3: Update MercadoTab.tsx**

Add `useTranslation('vehicle-details')` and replace strings using `mercado.*` keys:
- Tab labels: `"Comparables"` → `t('mercado.comparables')`, `"Tendencia de Precio"` → `t('mercado.priceTrend')`, `"Datos del Dealer"` → `t('mercado.dealerData')`
- Section headings: `"5 Vehículos Comparables (MarketCheck)"` → `t('mercado.vehicleComparables')`, `"Tendencia de Precio — Últimos 6 Meses"` → `t('mercado.priceTrend6Months')`
- `"Resumen de Tendencia"` → `t('mercado.trendSummary')`
- InfoRow labels: `"Dirección"` → `t('mercado.address')`, `"Precio Hace 6 Meses"` → `t('mercado.price6MonthsAgo')`, `"Precio Actual Promedio"` → `t('mercado.currentAveragePrice')`, `"Cambio"` → `t('mercado.change')`, `"Proyección 30 días"` → `t('mercado.projection30Days')`
- `"Puntos Positivos"` → `t('mercado.positivePoints')`, `"Señales de Alerta"` → `t('mercado.alertSignals')`

- [ ] **Step 4: Update IATab.tsx**

Add `useTranslation('vehicle-details')` and replace strings using `ia.*` keys:
- Tab labels: `"Veredicto"` → `t('ia.verdict')` (check — this key is the verdict text; tab label may need a different approach — read the file and use the appropriate key)
- `"Desglose por Factor"` → `t('ia.factorBreakdown')`
- `"Checklist de Inspección Personalizado"` → `t('ia.inspectionChecklist')`
- `"Precio Sugerido de Oferta"` → `t('ia.offerPrice')`
- `"Argumentos de Negociación"` → `t('ia.negotiationArguments')`
- `"Script Sugerido"` → `t('ia.suggestedScript')`

Note: Tab labels in IATab (`"Veredicto"`, `"Inspección"`, `"Negociación"`) are this component's own internal tabs. There are no dedicated tab keys for them in the `ia` namespace — if missing, use the label text as-is or check if `tabs.*` keys cover them. Read the JSON to confirm.

- [ ] **Step 5: Update DocumentsTab.tsx**

Add `useTranslation('vehicle-details')` and replace strings using `documents.*` keys:
- `"Documentos del Reporte"` → `t('documents.title')`
- `"Reporte CarVeri Completo"` → `t('documents.fullReport')`, `"PDF · Incluye todos los datos del análisis"` → `t('documents.fullReportDesc')`
- `"Resumen Carfax"` → `t('documents.carfaxSummary')`, `"PDF · Historial del vehículo verificado"` → `t('documents.carfaxDesc')`
- `"Compartir Reporte"` → `t('documents.shareReport')`, `"Enviar por enlace, email o WhatsApp"` → `t('documents.shareDesc')`
- `"Información del Reporte"` → `t('documents.reportInfo')`
- `"Fecha de Generación"` → `t('documents.generationDate')`
- `"Fuentes Consultadas"` → `t('documents.sourcesConsulted')`
- `"Tipo de Reporte"` → `t('documents.reportType')`
- `"Disclaimer Legal:"` → `t('documents.legalDisclaimer')`

- [ ] **Step 6: Update PriceEvaluation.tsx**

Add `useTranslation('vehicle-details')` and replace the "Evaluación de Precio" heading. The "Close" button text has no existing key and is left as-is:

```tsx
const { t } = useTranslation('vehicle-details');
// "Evaluación de Precio" → {t('gauge.priceEvaluation')}
// "Close" button span — leave hardcoded (no key exists for it)
```

- [ ] **Step 7: Update ReportGauge.tsx**

Add `useTranslation('vehicle-details')` and replace the gauge label strings:

```tsx
const { t } = useTranslation('vehicle-details');
// "Evaluación de Precio" → t('gauge.priceEvaluation')
// "Wholesale" → t('gauge.wholesale')
// "Retail" → t('gauge.retail')
// "Percentil" → t('gauge.percentile')
// "Top {pct}%" → `${t('gauge.top')} ${pct}%`
```

- [ ] **Step 8: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 9: Commit**

```bash
git add src/components/vehicle-details/ src/components/ReportGauge.tsx
git commit -m "feat(i18n): translate vehicle-details namespace components"
```

---

## Task 4: history namespace

**Files:**
- Modify: `src/components/history/HistoryTab.tsx`
- Modify: `src/components/history/TimelineSubtab.tsx`
- Modify: `src/components/history/AccidentsSubtab.tsx`
- Modify: `src/components/history/OwnersSubtab.tsx`
- Modify: `src/components/history/ServiceSubtab.tsx`
- Modify: `src/components/history/TitleSubtab.tsx`
- Modify: `src/components/history/AuctionPhotosSubtab.tsx`

- [ ] **Step 1: Update HistoryTab.tsx — move SUBTABS inside component**

The `SUBTABS` const is defined at module level. Move it inside the component body:

```tsx
import { useTranslation } from 'react-i18next';

export function HistoryTab(props) {
  const { t } = useTranslation('history');
  const SUBTABS = [
    { id: 'timeline',     label: t('tabs.timeline') },
    { id: 'auctionPhotos',label: t('tabs.auctionPhotos') },
    { id: 'accidents',    label: t('tabs.accidents') },
    { id: 'owners',       label: t('tabs.owners') },
    { id: 'service',      label: t('tabs.service') },
    { id: 'title',        label: t('tabs.title') },
  ];
```

Note: Read the file first to confirm the exact shape of SUBTABS (it may have icon fields too — preserve them).

- [ ] **Step 2: Update TimelineSubtab.tsx**

Add `useTranslation('history')` and replace:
- `"Vehicle Timeline"` → `{t('timeline.heading')}`
- `"Everything that has happened to this vehicle"` → `{t('timeline.subtitle')}`

- [ ] **Step 3: Update AccidentsSubtab.tsx**

Add `useTranslation('history')` and replace:
- `"Accident History"` heading → check the JSON (the `accidents` section has `cleanHistory` and `noAccidents` but may be missing a heading key — read the file and JSON to confirm)
- `"Clean History"` → `{t('accidents.cleanHistory')}`
- `"No reported accidents found for this vehicle."` → `{t('accidents.noAccidents')}`

- [ ] **Step 4: Update OwnersSubtab.tsx**

Add `useTranslation('history')` and use interpolation for the count string:

```tsx
const { t } = useTranslation('history');
// Heading:
{t('owners.heading')}
// Count line (interpolation):
{t('owners.registeredOwners', { count: owners.length })}
// Row labels:
{t('owners.period')}
{t('owners.startMileage')}
{t('owners.endMileage')}
{t('owners.milesDriven')}
```

- [ ] **Step 5: Update ServiceSubtab.tsx**

Add `useTranslation('history')` and use interpolation:

```tsx
const { t } = useTranslation('history');
// Heading:
{t('service.heading')}
// Count line (interpolation):
{t('service.recordsSuffix', { count: service.length })}
```

- [ ] **Step 6: Update TitleSubtab.tsx**

Add `useTranslation('history')` and replace:
- `"Title Status"` → `{t('titleStatus.heading')}`
- `"Title and legal status for this vehicle"` → `{t('titleStatus.subtitle')}`

- [ ] **Step 7: Update AuctionPhotosSubtab.tsx**

Add `useTranslation('history')` and use interpolation for the count:

```tsx
const { t } = useTranslation('history');
// Heading:
{t('auctionPhotos.heading')}
// Count line (interpolation):
{t('auctionPhotos.countSuffix', { count: photos.length })}
```

- [ ] **Step 8: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 9: Commit**

```bash
git add src/components/history/
git commit -m "feat(i18n): translate history namespace components"
```

---

## Task 5: market namespace

**Files:**
- Modify: `src/components/market/MarketTab.tsx`
- Modify: `src/components/market/MarketPriceHeader.tsx`
- Modify: `src/components/market/ComparablesList.tsx`
- Modify: `src/components/market/ComparableCard.tsx`

- [ ] **Step 1: Update MarketTab.tsx**

Add `useTranslation('market')` and replace strings. The pricing evaluation subtitle uses interpolation:

```tsx
const { t } = useTranslation('market');
// "Market" tab heading → {t('tabs.market')}
// "Market Analysis" → {t('header.marketAnalysis')}
// "Pricing evaluation & comparables in {city}" →
//   {t('header.pricingEvaluation', { city: report.location })}
// "Book Valuations" tab → {t('tabs.bookValuations')}
```

- [ ] **Step 2: Update MarketPriceHeader.tsx — move LABEL_TEXT inside component**

The `LABEL_TEXT` map (or equivalent) is at module level. Move it inside the component and replace string values:

```tsx
import { useTranslation } from 'react-i18next';

export function MarketPriceHeader(props) {
  const { t } = useTranslation('market');
  const LABEL_TEXT = {
    greatDeal:   { label: t('comparables.cheaper') },   // check exact keys
    belowMarket: { label: ... },
    fairPrice:   { label: ... },
    aboveMarket: { label: ... },
    overpriced:  { label: ... },
  };
  // "above"/"below"/"average" text → check home vs market namespace for these keys
```

Note: The market namespace may not have above/below/average keys. Read the file to understand what strings appear; the home namespace `priceEval.*` keys cover these labels — use `useTranslation(['market', 'home'])` if needed, or check if market has dedicated keys.

- [ ] **Step 3: Update ComparablesList.tsx**

Add `useTranslation('market')` and use interpolation:

```tsx
const { t } = useTranslation('market');
// "Comparables in Your Area" → {t('comparables.heading')}
// "Similar vehicles near {location}" →
//   {t('comparables.similarVehicles', { city: location })}
```

- [ ] **Step 4: Update ComparableCard.tsx — move BADGE_CONFIG inside component**

The `BADGE_CONFIG` object is at module level. Move it inside the component:

```tsx
import { useTranslation } from 'react-i18next';

export function ComparableCard(props) {
  const { t } = useTranslation('market');
  const BADGE_CONFIG = {
    cheaper: { label: t('comparables.cheaper'), ... },
    similar: { label: t('comparables.similar'), ... },
    pricier: { label: t('comparables.pricier'), ... },
  };
```

Note: Read the file first to reproduce the full BADGE_CONFIG shape (it likely has color/style fields — preserve those).

- [ ] **Step 5: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add src/components/market/
git commit -m "feat(i18n): translate market namespace components"
```

---

## Task 6: negotiate namespace

**Files:**
- Modify: `src/components/negotiate/NegotiateTab.tsx`
- Modify: `src/components/negotiate/StrategySubtab.tsx`
- Modify: `src/components/negotiate/CostsSubtab.tsx`
- Modify: `src/components/negotiate/ArgumentsSubtab.tsx`
- Audit: `src/components/negotiate/ArgumentCard.tsx` (all strings come from props — no t() calls needed)

- [ ] **Step 1: Update NegotiateTab.tsx — move SUBTABS inside component**

```tsx
import { useTranslation } from 'react-i18next';

export function NegotiateTab(props) {
  const { t } = useTranslation('negotiate');
  const SUBTABS = [
    { id: 'strategy',  label: t('tabs.strategy') },
    { id: 'arguments', label: t('tabs.arguments') },
    { id: 'costs',     label: t('tabs.costs') },
  ];
```

Note: Read the file first to reproduce the full SUBTABS shape including any icon fields.

- [ ] **Step 2: Update StrategySubtab.tsx**

Add `useTranslation('negotiate')` and replace:
- `"Negotiation Strategy"` heading → check JSON (no heading key in `strategy` section — read the file to confirm the actual string used, then map to the closest available key or note it needs a new key)
- `"First Offer"` → `{t('strategy.firstOffer')}`
- `"Midpoint"` → `{t('strategy.midpoint')}`
- `"Max Recommended"` → `{t('strategy.maxRecommended')}`
- `"Negotiation Tips"` → `{t('strategy.tips')}`

- [ ] **Step 3: Update CostsSubtab.tsx**

Add `useTranslation('negotiate')` and use interpolation for the state name:

```tsx
const { t } = useTranslation('negotiate');
// "Estimated Purchase Costs" → {t('costs.heading')}
// "Complete cost breakdown in {state}" →
//   {t('costs.breakdown', { state: costs.state })}
//   (costs.breakdown was updated with {{state}} in Task 0)
// "Vehicle price" → {t('costs.vehiclePrice')}
// "Sales Tax" → {t('costs.salesTax')}
// "Tag & Title" → {t('costs.tagTitle')}
// "Dealer Fee" → {t('costs.dealerFee')}
// "Total Estimated" → {t('costs.totalEstimated')}
// "Estimated Monthly Costs" → {t('costs.monthlyHeading')}
```

- [ ] **Step 4: Update ArgumentsSubtab.tsx**

Add `useTranslation('negotiate')` and replace:
- `"Negotiation Arguments"` → `{t('arguments.heading')}`

- [ ] **Step 5: Confirm ArgumentCard.tsx needs no changes**

Read `src/components/negotiate/ArgumentCard.tsx`. Confirm all rendered text comes from props (no hardcoded string literals). No `useTranslation` call needed — the file is already translation-safe.

- [ ] **Step 6: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 7: Commit**

```bash
git add src/components/negotiate/
git commit -m "feat(i18n): translate negotiate namespace components"
```

---

## Task 7: verdict namespace

**Files:**
- Modify: `src/components/verdict/VerdictTab.tsx`
- Modify: `src/components/verdict/VerdictSubtab.tsx`
- Modify: `src/components/verdict/RisksSubtab.tsx`
- Modify: `src/components/verdict/ChecklistSubtab.tsx`
- Modify: `src/components/VerdictBadge.tsx`

- [ ] **Step 1: Update VerdictTab.tsx — move SUBTABS inside component**

```tsx
import { useTranslation } from 'react-i18next';

export function VerdictTab(props) {
  const { t } = useTranslation('verdict');
  const SUBTABS = [
    { id: 'verdict',   label: t('tabs.verdict') },
    { id: 'risks',     label: t('tabs.risks') },
    { id: 'checklist', label: t('tabs.checklist') },
  ];
```

Note: Read the file first to reproduce the full SUBTABS shape including any icon fields.

- [ ] **Step 2: Update VerdictSubtab.tsx**

Add `useTranslation('verdict')` and replace:
- `"CarVeri Verdict — Complete Analysis"` → `{t('main.heading')}`
- `"Intelligent analysis based on 11 data sources"` → `{t('main.subtitle')}`
- `"CarVeri Verdict"` badge/section label → `{t('badge.label')}`

- [ ] **Step 3: Update RisksSubtab.tsx**

Add `useTranslation('verdict')` and replace:
- `"Risk Analysis"` → `{t('risks.heading')}`

- [ ] **Step 4: Update ChecklistSubtab.tsx**

Add `useTranslation('verdict')` and replace:
- `"Inspection Checklist"` → `{t('checklist.heading')}`

- [ ] **Step 5: Update VerdictBadge.tsx — move VERDICT_CONFIG inside component**

The `VERDICT_CONFIG` object is at module level with hardcoded labels. Move it inside the component body:

```tsx
import { useTranslation } from 'react-i18next';

export function VerdictBadge({ verdict }: Props) {
  const { t } = useTranslation('verdict');
  const VERDICT_CONFIG = {
    BUY:     { label: t('recommendation.buy'),     ...restOfConfig },
    CONSIDER:{ label: t('recommendation.consider'), ...restOfConfig },
    AVOID:   { label: t('recommendation.avoid'),   ...restOfConfig },
  };
```

Note: Read the file first to reproduce the full config shape (colors, icons, styles — preserve all non-label fields).

- [ ] **Step 6: Verify build passes**

Run: `pnpm build`
Expected: zero TypeScript errors

- [ ] **Step 7: Commit**

```bash
git add src/components/verdict/ src/components/VerdictBadge.tsx
git commit -m "feat(i18n): translate verdict namespace components"
```

---

## Task 8: Final verification

- [ ] **Step 1: Full production build**

Run: `pnpm build`
Expected: zero TypeScript errors, build completes successfully

- [ ] **Step 2: Manual smoke test in dev server**

Run: `pnpm dev`

Open the app and verify:
1. Default language renders correctly (all strings visible)
2. Click the language toggle (EN↔ES) — all strings immediately re-render in the new language
3. Reload the page — language preference persists (localStorage)
4. Navigate to `/report` — all tabs, nav items, and section headings translate correctly

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(i18n): complete component translation refactor — all namespaces"
```
