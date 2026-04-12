# PastSalesSubtab Sales Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat card list in `PastSalesSubtab` with a vertical timeline that differentiates dealer vs. auction cycles by icon, and communicates `isActive` (blue) and `sold` (green) states through node color and card accent border.

**Architecture:** Single-component rewrite. The timeline mirrors the structure of `TimelineSubtab` — a relative container with an absolute vertical connector line, `size-10` ring nodes on the left, and `flex-1` cards on the right. A small `getNodeStyle` helper derives the three visual states (active/sold/neutral) from the `SalesCycle` flags. Dealer and auction cycles render slightly different card bodies (dealers show price history + drops + days on lot; auctions show sale price + mileage only).

**Tech Stack:** React 19, Framer Motion, Lucide React, i18next, Tailwind CSS v4, `cn()` utility

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/history/locales/en.json` |
| Modify | `packages/shared/src/components/history/locales/es.json` |
| Rewrite | `packages/shared/src/components/history/PastSalesSubtab.tsx` |

---

### Task 1: Add missing i18n keys

**Files:**
- Modify: `packages/shared/src/components/history/locales/en.json`
- Modify: `packages/shared/src/components/history/locales/es.json`

- [ ] **Step 1: Add three keys to `en.json` under `pastSales`**

Open `packages/shared/src/components/history/locales/en.json`. The `pastSales` object currently ends with `"daysOnSlot"`. Add the three new keys after `"daysOnSlot"`:

```json
"daysOnSlot": "{{count}} days on slot",
"sold": "Sold",
"typeDealer": "Dealer",
"typeAuction": "Auction"
```

- [ ] **Step 2: Add three keys to `es.json` under `pastSales`**

Open `packages/shared/src/components/history/locales/es.json`. The `pastSales` object currently ends with `"daysOnSlot"`. Add the three new keys:

```json
"daysOnSlot": "{{ count }} días en lote",
"sold": "Vendido",
"typeDealer": "Concesionario",
"typeAuction": "Subasta"
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/history/locales/en.json \
        packages/shared/src/components/history/locales/es.json
git commit -m "feat(history): add sold, typeDealer, typeAuction translation keys to pastSales"
```

---

### Task 2: Rewrite PastSalesSubtab with the timeline

**Files:**
- Rewrite: `packages/shared/src/components/history/PastSalesSubtab.tsx`

- [ ] **Step 1: Replace the file contents**

Write `packages/shared/src/components/history/PastSalesSubtab.tsx` with the following:

```tsx
import { useTranslation } from "react-i18next";
import { Gavel, Store } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { SalesCycle, TransformedReport } from "../../lib/transforms.ts";

// ── Node style helper ──────────────────────────────────────────────────────────

type NodeStyle = { bg: string; ring: string; iconColor: string };

function getNodeStyle(cycle: SalesCycle): NodeStyle {
  if (cycle.isActive) {
    return {
      bg: "bg-blue-900/30",
      ring: "ring-blue-500",
      iconColor: "text-blue-400",
    };
  }
  if (cycle.sold) {
    return {
      bg: "bg-green-900/30",
      ring: "ring-green-500",
      iconColor: "text-green-400",
    };
  }
  return {
    bg: "bg-muted",
    ring: "ring-muted-foreground/30",
    iconColor: "text-muted-foreground",
  };
}

// ── Subcomponents ──────────────────────────────────────────────────────────────

function DealerCard({ cycle }: { cycle: SalesCycle }) {
  const { t } = useTranslation("history");
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{cycle.dealerName}</p>
            {cycle.isActive && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {t("pastSales.active")}
              </span>
            )}
            <span className="text-muted-foreground rounded-full bg-muted px-2 py-0.5 text-[10px]">
              {t("pastSales.typeDealer")}
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {cycle.city}, {cycle.state} · {cycle.startDate} – {cycle.endDate}
          </p>
        </div>
        {cycle.discountPct > 0 && (
          <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
            -{cycle.discountPct}%
          </span>
        )}
      </div>

      <div className="border-border mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <div className="flex flex-wrap gap-4">
          {/* Price history */}
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
              {t("pastSales.price")}
            </span>
            <div className="text-foreground/80 flex items-center gap-1.5 text-sm font-bold">
              <span
                className="text-muted-foreground line-through"
                title={t("pastSales.initialPrice")}
              >
                {formatCurrency(cycle.startPrice)}
              </span>
              <span>→</span>
              <span title={t("pastSales.finalPrice")}>
                {formatCurrency(cycle.endPrice)}
              </span>
            </div>
          </div>

          {/* Mileage */}
          {cycle.mileage != null && (
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
                {t("pastSales.miles")}
              </span>
              <span className="text-foreground/80 text-sm font-bold">
                {cycle.mileage.toLocaleString()} mi
              </span>
            </div>
          )}
        </div>

        <span className="text-muted-foreground shrink-0 text-xs">
          {t("pastSales.daysOnSlot", { count: cycle.daysOnLot })}
        </span>
      </div>

      {/* Price drops row */}
      {cycle.priceReductions > 0 && (
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-muted-foreground">
            {t("pastSales.priceDrops", { count: cycle.priceReductions })}
          </span>
          <span className="font-semibold text-red-500">
            -{formatCurrency(cycle.priceDrop)}
          </span>
        </div>
      )}
    </>
  );
}

function AuctionCard({ cycle }: { cycle: SalesCycle }) {
  const { t } = useTranslation("history");
  const salePrice = cycle.records[0]?.Price ?? cycle.endPrice;

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{cycle.dealerName}</p>
            {cycle.sold && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {t("pastSales.sold")}
              </span>
            )}
            <span className="text-muted-foreground rounded-full bg-muted px-2 py-0.5 text-[10px]">
              {t("pastSales.typeAuction")}
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {cycle.city}, {cycle.state} · {cycle.startDate}
          </p>
        </div>
      </div>

      <div className="border-border mt-3 flex gap-4 border-t pt-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
            {t("pastSales.price")}
          </span>
          <span className="text-foreground/80 text-sm font-bold">
            {salePrice ? formatCurrency(salePrice) : "—"}
          </span>
        </div>

        {cycle.mileage != null && (
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
              {t("pastSales.miles")}
            </span>
            <span className="text-foreground/80 text-sm font-bold">
              {cycle.mileage.toLocaleString()} mi
            </span>
          </div>
        )}
      </div>
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  salesCycles: TransformedReport["saleCycles"];
}

export default function PastSalesSubtab({ salesCycles }: Readonly<Props>) {
  const { t } = useTranslation("history");

  if (salesCycles.length === 0) {
    return (
      <>
        <SubTabHeader
          title={t("pastSales.heading")}
          subtitle={t("pastSales.subtitle")}
        />
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Store className="text-muted-foreground/40 size-10" />
          <p className="text-muted-foreground text-sm">
            {t("pastSales.noPastSales")}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <SubTabHeader
        title={t("pastSales.heading")}
        subtitle={t("pastSales.subtitle")}
      />

      <div className="relative flex flex-col">
        {/* Vertical connector line */}
        <div className="absolute top-5 bottom-5 left-5 w-px bg-slate-200 dark:bg-slate-700" />

        {salesCycles.map((cycle, i) => {
          const { bg, ring, iconColor } = getNodeStyle(cycle);
          const Icon = cycle.type === "dealer" ? Store : Gavel;

          return (
            <motion.div
              key={cycle.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-4 pb-4"
            >
              {/* Circle node */}
              <div
                className={cn(
                  "ring-background relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-2",
                  bg,
                  ring,
                )}
              >
                <Icon size={18} className={iconColor} />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "border-border bg-card flex-1 rounded-xl border p-3 shadow-sm",
                  cycle.isActive && "border-l-4 border-l-blue-500",
                  cycle.sold && "border-l-4 border-l-green-500",
                )}
              >
                {cycle.type === "dealer" ? (
                  <DealerCard cycle={cycle} />
                ) : (
                  <AuctionCard cycle={cycle} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/shared exec tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 3: Run the dev server and verify visually**

```bash
pnpm dev:desktop
# or
pnpm dev:mobile
```

Navigate to any vehicle report → History → Past Sales tab. Verify:
- Vertical connector line runs through all items
- First dealer cycle (or most recent, depending on data) shows a blue node and blue left border
- Any sold auction cycle shows a green node and green left border
- Other cycles show gray nodes with no accent border
- Store icon appears on dealer nodes, Gavel icon on auction nodes
- Dealer cards show price-range row, mileage, days on lot, and price drops row (if applicable)
- Auction cards show price and mileage only (no days on lot, no drops row)
- Sold / Active badges appear correctly
- Animation staggers in from left on mount

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/history/PastSalesSubtab.tsx
git commit -m "feat(history): replace past sales card list with vertical timeline"
```
