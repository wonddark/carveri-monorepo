# API Response Contract Design

**Date:** 2026-03-30
**Status:** Pending backend review
**Purpose:** Ideal API contract to negotiate with the backend team. Not yet used in production code. If approved, this replaces `packages/shared/src/types/vehicle-report.ts` and resolves all inconsistencies between the desktop and mobile data shapes.

---

## Context

The frontend currently has two conflicting `VehicleReport` type definitions:

| File | Used by | Shape |
|------|---------|-------|
| `packages/shared/src/types/vehicle-report.ts` | Desktop app API fetcher | Spanish field names, raw data |
| `packages/shared/src/data/report.ts` | Mobile app mock data | English field names, processed data |

Additionally, `packages/shared/src/types/vehicle-detail.ts` and `packages/shared/src/data/mockData.ts` contain orphaned legacy types still used in a few desktop components (`DocumentsTab`, `MercadoTab`).

The goal of this spec is to define a **single, unified, processed API response** that both apps consume, eliminating the split.

---

## Design Decisions

- **English field names** throughout (frontend-facing contract)
- **One endpoint, full processed response** — backend returns everything the UI needs including AI score, verdict, negotiation tips, and checklist. No client-side enrichment required.
- **Tab-grouped sections** — each top-level key maps to a UI tab, making the contract easy to read and negotiate field-by-field
- **Endpoint:** `GET /reports/:vin` → `VehicleReportContract`

---

## Root Shape

```
VehicleReportContract
  ├── vehicle       → core identity & listing (HomeTab hero card)
  ├── summary       → AI score, verdict, narrative (HomeTab)
  ├── stats         → 4 stat chips (HomeTab)
  ├── priceEval     → book values + price label (MarketTab)
  ├── market        → comparable listings (MarketTab)
  ├── history       → timeline, owners, service, title (HistoryTab)
  ├── negotiate     → strategy, arguments, costs (NegotiateTab)
  └── verdict       → score breakdown, risks, checklist (VerdictTab)
```

---

## Section Details

### `vehicle`
Core vehicle identity and listing metadata. Drives the hero card at the top of all tabs.

Fields: `vin`, `year`, `make`, `model`, `trim`, `color`, `engine`, `transmission`, `drivetrain`, `price`, `mileage`, `daysOnLot`, `location`, `dealer`, `images[]`, `previousOwners`

### `summary`
AI-generated analysis output. Displayed on HomeTab above the stat chips.

Fields: `score` (0–10), `verdict` ("BUY" | "CONSIDER" | "AVOID"), `aiSummary` (2–3 sentence narrative)

### `stats`
Four stat chips shown on HomeTab below the summary.

Fields: `titleStatus`, `accidents`, `odometerVerified`, `priceDeltaPct`

### `priceEval`
Price evaluation shown on MarketTab. Includes the gauge label, book values from all 4 sources, and auction acquisition data.

Fields: `label`, `marketAvgDeltaPct`, `auction { name, price }`, `bookValues[]`

### `market`
Comparable vehicle listings shown on MarketTab.

Fields: `comparables[]` — each with id, year/make/model/trim, price, mileage, distanceMi, dealer, image, priceTag

### `history`
Full vehicle history shown on HistoryTab: chronological timeline, auction photos, accident summary, owner records, service records, and title/legal status.

### `negotiate`
AI negotiation guidance shown on NegotiateTab: offer strategy, argument cards, and estimated purchase costs.

### `verdict`
AI verdict shown on VerdictTab: per-factor score breakdown, risk/positive flags, and pre-purchase inspection checklist.

---

## Implementation Plan (post-approval)

1. Replace `packages/shared/src/types/vehicle-report.ts` with `apiContract.ts` types
2. Update `packages/shared/src/data/api.ts` to use `VehicleReportContract`
3. Update mobile app to use API instead of `MOCK_REPORTS`
4. Remove `mockData.ts`, `vehicle-detail.ts` legacy types once desktop components are migrated
5. Align desktop components (`DocumentsTab`, `MercadoTab`) to new shape
