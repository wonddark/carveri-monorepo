# PastSalesSubtab — Sales Timeline Design

**Date:** 2026-04-12  
**File:** `packages/shared/src/components/history/PastSalesSubtab.tsx`

---

## Summary

Replace the current flat card list in `PastSalesSubtab` with a vertical timeline (Option A — Full Icon Node, matching `TimelineSubtab` style). The timeline must visually differentiate dealer vs. auction cycles via icon, and communicate `isActive` (blue) and `sold` (green) states through node color and card accent.

---

## Context

`PastSalesSubtab` receives the full unfiltered `TransformedReport["saleCycles"]` array, which contains cycles of both `type: "dealer"` and `type: "auction"`. The sibling `AuctionHistorySubtab` receives only auction cycles (filtered at the parent). `PastSalesSubtab` is the unified history view.

Relevant `SalesCycle` fields:
- `type: "dealer" | "auction"`
- `isActive: boolean` — true for the current active dealer listing
- `sold: boolean` — true for an auction cycle that closed as sold
- `dealerName`, `city`, `state`
- `startDate`, `endDate`
- `startPrice`, `endPrice`, `discountPct`, `priceDrop`, `priceReductions`
- `mileage: number | null`
- `daysOnLot: number`
- `records: SaleCycleRecord[]`

---

## Layout

Vertical timeline with a connector line running top-to-bottom through the left gutter, matching `TimelineSubtab` structure exactly:

```
[node]  [card]
  │
[node]  [card]
  │
[node]  [card]
```

- **Connector line:** `absolute top-5 bottom-5 left-5 w-px bg-slate-200 dark:bg-slate-700`
- **Node:** `size-10` circle, `ring-2 ring-background`, icon centered at 18px
- **Card:** `flex-1 rounded-xl border border-border bg-card p-3 shadow-sm`, with a colored left accent border for active/sold states
- **Animation:** `framer-motion` stagger, same as current implementation (`delay: i * 0.06`)

---

## Node States

| State | Node bg | Node border | Card left border | Badge |
|---|---|---|---|---|
| `isActive` | `bg-blue-900/30` | `ring-blue-500` | `border-l-4 border-l-blue-500` | "Active" in blue |
| `sold` | `bg-green-900/30` | `ring-green-500` | `border-l-4 border-l-green-500` | "Sold" in green |
| Default (past) | `bg-muted` | `ring-muted-foreground/30` | none | none |

---

## Icons

- **`type === "dealer"`:** `Store` from `lucide-react` (already imported)
- **`type === "auction"`:** `Gavel` from `lucide-react` (new import)

Icon color follows node state: blue-tinted for active, green-tinted for sold, muted for past.

---

## Card Content

### Dealer cycle
- Header: dealer name + `isActive` badge + "Dealer" type pill
- Sub-header: city, state · startDate – endDate
- Right of header: `discountPct` badge (red pill, shown only when > 0)
- Stats row (below a divider): Price (`startPrice → endPrice`), Miles, Days on lot
- Price drops row (shown only when `priceReductions > 0`): drop count left, drop amount right in red

### Auction cycle
- Header: auction name + `sold` badge + "Auction" type pill
- Sub-header: city, state · startDate (single date, auctions don't have ranges)
- Stats row: Sale price (from `records[0].Price` when available, else `endPrice`), Miles
- No price drops or daysOnLot row (less data relevant for auctions)

---

## Empty State

Unchanged from current implementation — `Store` icon centered, translated string `pastSales.noPastSales`.

---

## Files Changed

| File | Change |
|---|---|
| `packages/shared/src/components/history/PastSalesSubtab.tsx` | Full rewrite of JSX; add `Gavel` import; remove `IconArrowNarrowRight` if replaced by `→` text |

No type changes, no data layer changes. The following i18n keys already exist and will be used: `pastSales.active`, `pastSales.price`, `pastSales.miles`, `pastSales.daysOnSlot`, `pastSales.priceDrops`.

Three new keys must be added to both `en.json` and `es.json` under `pastSales`:

| Key | en | es |
|---|---|---|
| `sold` | `"Sold"` | `"Vendido"` |
| `typeDealer` | `"Dealer"` | `"Concesionario"` |
| `typeAuction` | `"Auction"` | `"Subasta"` |

---

## Out of Scope

- Filtering dealer vs. auction at the parent level — `PastSalesSubtab` continues to receive the full array
- Changes to `AuctionHistorySubtab` 
- Any data layer / transform changes
