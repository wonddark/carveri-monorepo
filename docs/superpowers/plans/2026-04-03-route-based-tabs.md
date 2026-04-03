# Route-Based Report Tabs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `useState`-driven tab switching in both apps with React Router nested routes, caching the report loader once at the parent route.

**Architecture:** `/reports/:vin` becomes a layout route with `id: "report"` and `shouldRevalidate: () => false`. Each tab/section is a child route whose component calls `useRouteLoaderData("report")` — no props drilling, zero extra fetches on tab switch.

**Tech Stack:** React Router 7 (`NavLink`, `Outlet`, `useRouteLoaderData`, `useParams`, `useLocation`, `redirect`), Framer Motion (mobile animation)

---

### Task 1: Create desktop section components

**Files:**
- Create: `apps/desktop/src/pages/report-sections/ResumenSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/TimelineSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/AuctionPhotosSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/AccidentsSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/OwnersSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/ServiceSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/TitleSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/MarketSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/VerdictAiSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/ChecklistSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/StrategySection.tsx`
- Create: `apps/desktop/src/pages/report-sections/ArgumentsSection.tsx`
- Create: `apps/desktop/src/pages/report-sections/CostsSection.tsx`

Thin route components — read cached report via `useRouteLoaderData("report")`, render a shared component. No business logic.

- [ ] **Step 1: Create all 13 section files**

`apps/desktop/src/pages/report-sections/ResumenSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ResumenView from "@/components/ResumenView";

export default function ResumenSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ResumenView report={report} />;
}
```

`apps/desktop/src/pages/report-sections/TimelineSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import TimelineSubtab from "@carveri/shared/components/history/TimelineSubtab";

export default function TimelineSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <TimelineSubtab timeline={report.historyTab.timeline} />;
}
```

`apps/desktop/src/pages/report-sections/AuctionPhotosSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import AuctionPhotosSubtab from "@carveri/shared/components/history/AuctionPhotosSubtab";

export default function AuctionPhotosSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <AuctionPhotosSubtab photos={report.historyTab.auctionPhotos} />;
}
```

`apps/desktop/src/pages/report-sections/AccidentsSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import AccidentsSubtab from "@carveri/shared/components/history/AccidentsSubtab";

export default function AccidentsSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <AccidentsSubtab accidents={report.historyTab.accidents} />;
}
```

`apps/desktop/src/pages/report-sections/OwnersSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import OwnersSubtab from "@carveri/shared/components/history/OwnersSubtab";

export default function OwnersSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <OwnersSubtab owners={report.historyTab.owners} />;
}
```

`apps/desktop/src/pages/report-sections/ServiceSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ServiceSubtab from "@carveri/shared/components/history/ServiceSubtab";

export default function ServiceSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ServiceSubtab service={report.historyTab.service} />;
}
```

`apps/desktop/src/pages/report-sections/TitleSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import TitleSubtab from "@carveri/shared/components/history/TitleSubtab";

export default function TitleSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <TitleSubtab title={report.historyTab.title} />;
}
```

`apps/desktop/src/pages/report-sections/MarketSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import MarketTab from "@carveri/shared/components/market/MarketTab";

export default function MarketSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <MarketTab report={report} />;
}
```

`apps/desktop/src/pages/report-sections/VerdictAiSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VerdictSubtab from "@carveri/shared/components/verdict/VerdictSubtab";
import RisksSubtab from "@carveri/shared/components/verdict/RisksSubtab";

export default function VerdictAiSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  const { verdictTab } = report;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <VerdictSubtab
          score={report.score}
          recommendation={report.verdict}
          summary={report.aiSummary}
          scoreBreakdown={verdictTab.scoreBreakdown}
        />
      </div>
      <div>
        <RisksSubtab risks={verdictTab.risks} />
      </div>
    </div>
  );
}
```

`apps/desktop/src/pages/report-sections/ChecklistSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ChecklistSubtab from "@carveri/shared/components/verdict/ChecklistSubtab";

export default function ChecklistSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ChecklistSubtab checklist={report.verdictTab.checklist} />;
}
```

`apps/desktop/src/pages/report-sections/StrategySection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import StrategySubtab from "@carveri/shared/components/negotiate/StrategySubtab";

export default function StrategySection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <StrategySubtab strategy={report.negotiate.strategy} />;
}
```

`apps/desktop/src/pages/report-sections/ArgumentsSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ArgumentsSubtab from "@carveri/shared/components/negotiate/ArgumentsSubtab";

export default function ArgumentsSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ArgumentsSubtab args={report.negotiate.arguments} />;
}
```

`apps/desktop/src/pages/report-sections/CostsSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import CostsSubtab from "@carveri/shared/components/negotiate/CostsSubtab";

export default function CostsSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <CostsSubtab price={report.price} costs={report.negotiate.costs} />;
}
```

- [ ] **Step 2: Verify build**

```bash
cd apps/desktop && pnpm build
```
Expected: Clean build. New files are valid but unused until the router is updated.

- [ ] **Step 3: Commit**

```bash
git add apps/desktop/src/pages/report-sections/
git commit -m "feat(desktop): add route section components"
```

---

### Task 2: Update desktop router with child routes

**Files:**
- Modify: `apps/desktop/src/data/router.tsx`

The parent route gains `id: "report"` and `shouldRevalidate: () => false`. An index child redirects to `resumen`. One child route per section points to the components from Task 1.

- [ ] **Step 1: Replace router.tsx with the following**

```tsx
import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import ReportError from "@/pages/ReportError.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import CarVeriLanding from "@/pages/home.tsx";
import { reportLoader } from "@carveri/shared/data/loaders.ts";
import ResumenSection from "@/pages/report-sections/ResumenSection.tsx";
import TimelineSection from "@/pages/report-sections/TimelineSection.tsx";
import AuctionPhotosSection from "@/pages/report-sections/AuctionPhotosSection.tsx";
import AccidentsSection from "@/pages/report-sections/AccidentsSection.tsx";
import OwnersSection from "@/pages/report-sections/OwnersSection.tsx";
import ServiceSection from "@/pages/report-sections/ServiceSection.tsx";
import TitleSection from "@/pages/report-sections/TitleSection.tsx";
import MarketSection from "@/pages/report-sections/MarketSection.tsx";
import VerdictAiSection from "@/pages/report-sections/VerdictAiSection.tsx";
import ChecklistSection from "@/pages/report-sections/ChecklistSection.tsx";
import StrategySection from "@/pages/report-sections/StrategySection.tsx";
import ArgumentsSection from "@/pages/report-sections/ArgumentsSection.tsx";
import CostsSection from "@/pages/report-sections/CostsSection.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CarVeriLanding /> },
      {
        id: "report",
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.vin}/resumen`),
          },
          { path: "resumen", element: <ResumenSection /> },
          { path: "timeline", element: <TimelineSection /> },
          { path: "fotos-subasta", element: <AuctionPhotosSection /> },
          { path: "accidentes", element: <AccidentsSection /> },
          { path: "duenos", element: <OwnersSection /> },
          { path: "servicio", element: <ServiceSection /> },
          { path: "titulo", element: <TitleSection /> },
          { path: "mercado", element: <MarketSection /> },
          { path: "verdict_ai", element: <VerdictAiSection /> },
          { path: "checklist", element: <ChecklistSection /> },
          { path: "estrategia", element: <StrategySection /> },
          { path: "argumentos", element: <ArgumentsSection /> },
          { path: "costos", element: <CostsSection /> },
        ],
      },
    ],
  },
]);

export default router;
```

- [ ] **Step 2: Verify build**

```bash
cd apps/desktop && pnpm build
```
Expected: Clean build. `ReportPage` still renders `<ReportMainContent>` — that's fine for now.

- [ ] **Step 3: Commit**

```bash
git add apps/desktop/src/data/router.tsx
git commit -m "feat(desktop): add nested section routes with report cache"
```

---

### Task 3: Refactor desktop ReportPage + ReportSidebar, delete ReportMainContent

**Files:**
- Modify: `apps/desktop/src/pages/ReportPage.tsx`
- Modify: `apps/desktop/src/components/ReportSidebar.tsx`
- Delete: `apps/desktop/src/components/ReportMainContent.tsx`

`ReportPage` drops `activeSection` state and renders `<Outlet />`. `ReportSidebar` drops `activeSection`/`onNavigate` props, uses `NavLink` with absolute paths, and auto-expands groups when a child is the active route.

- [ ] **Step 1: Rewrite ReportPage.tsx**

```tsx
import { useLoaderData, Outlet } from "react-router";
import ReportHeader from "@/components/ReportHeader";
import ReportSidebar from "@/components/ReportSidebar";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export default function ReportPage() {
  const report = useLoaderData<TransformedReport>();

  return (
    <div className="relative mx-auto flex max-w-7xl flex-1 flex-col overflow-hidden">
      <ReportHeader />
      <div className="fixed inset-0 mx-auto flex max-w-7xl flex-1 overflow-auto pt-15">
        <ReportSidebar report={report} />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite ReportSidebar.tsx**

```tsx
import { type ReactNode, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation, useParams } from "react-router";
import ImageCarousel from "@carveri/shared/components/ImageCarousel";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import {
  IconChartHistogram,
  IconClock,
  IconHeartHandshake,
  IconHome,
  IconSparkles,
} from "@tabler/icons-react";

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  label: string;
  icon: ReactNode;
  children: NavItem[];
}

type NavEntry =
  | { type: "item"; id: string; label: string; icon: ReactNode }
  | { type: "group"; group: NavGroup };

const NAV: NavEntry[] = [
  {
    type: "item",
    id: "resumen",
    label: "pages.resume",
    icon: <IconHome className="w-5" />,
  },
  {
    type: "group",
    group: {
      label: "pages.history",
      icon: <IconClock className="w-5" />,
      children: [
        { id: "timeline", label: "pages.timeline" },
        { id: "fotos-subasta", label: "pages.auction_photos" },
        { id: "accidentes", label: "pages.accidents" },
        { id: "duenos", label: "pages.owners" },
        { id: "servicio", label: "pages.service" },
        { id: "titulo", label: "pages.title" },
      ],
    },
  },
  {
    type: "item",
    id: "mercado",
    label: "pages.market",
    icon: <IconChartHistogram className="w-5" />,
  },
  {
    type: "item",
    id: "verdict_ai",
    label: "pages.verdict_ai",
    icon: <IconSparkles className="w-5" />,
  },
  {
    type: "group",
    group: {
      label: "pages.negotiation",
      icon: <IconHeartHandshake className="w-5" />,
      children: [
        { id: "estrategia", label: "pages.strategy" },
        { id: "argumentos", label: "pages.arguments" },
        { id: "costos", label: "pages.costs" },
      ],
    },
  },
];

interface Props {
  report: TransformedReport;
}

export default function ReportSidebar({ report }: Readonly<Props>) {
  const { t } = useTranslation("common");
  const { vin } = useParams<{ vin: string }>();
  const location = useLocation();
  const currentSection = location.pathname.split("/").pop() ?? "";

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const entry of NAV) {
      if (entry.type === "group") {
        initial[entry.group.label] = entry.group.children.some(
          (c) => currentSection === c.id,
        );
      }
    }
    return initial;
  });

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      for (const entry of NAV) {
        if (entry.type === "group") {
          const hasActive = entry.group.children.some(
            (c) => currentSection === c.id,
          );
          if (hasActive) next[entry.group.label] = true;
        }
      }
      return next;
    });
  }, [currentSection]);

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="border-border bg-card/30 sticky top-15 flex w-75 min-w-60 flex-col gap-4 overflow-y-auto border-r">
      {/* Image carousel */}
      <div className="p-3">
        <div className="aspect-16/10 overflow-hidden rounded-xl">
          <ImageCarousel images={report.images} />
        </div>
      </div>

      {/* Price + mileage */}
      <div className="border-border border-b px-4 pb-3">
        <p className="text-2xl font-semibold">
          ${report.price.toLocaleString()}
        </p>
        <p className="text-muted-foreground text-xs">
          {report.mileage.toLocaleString()} mi
        </p>
      </div>

      {/* Verdict card */}
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Nav tree */}
      <nav className="flex-1 pb-4">
        {NAV.map((entry) => {
          if (entry.type === "item") {
            return (
              <NavLink
                key={entry.id}
                to={`/reports/${vin}/${entry.id}`}
                className={({ isActive }) =>
                  cn(
                    "flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium",
                    "text-foreground/70 hover:bg-card rounded-lg transition-colors",
                    isActive && "bg-primary/5 text-primary pointer-events-none",
                  )
                }
              >
                {entry.icon}
                {t(entry.label)}
              </NavLink>
            );
          }

          const { group } = entry;
          const isOpen = openGroups[group.label] ?? false;
          const isChildActive = group.children.some(
            (c) => currentSection === c.id,
          );

          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium",
                  "text-foreground/70 hover:bg-card rounded-lg transition-colors",
                  isChildActive && !isOpen && "text-primary",
                )}
              >
                <div className="flex items-center gap-2">
                  {group.icon} {t(group.label)}
                </div>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {isOpen && (
                <div className="border-border mt-0.5 ml-4 space-y-0.5 border-l pl-3">
                  {group.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={`/reports/${vin}/${child.id}`}
                      className={({ isActive }) =>
                        cn(
                          "gap-2 rounded-md px-2",
                          "text-muted-foreground flex w-full cursor-pointer items-center py-1.5 pr-4 text-xs transition-colors duration-200 ease-in-out",
                          isActive
                            ? "text-primary font-semibold"
                            : "hover:text-foreground/80 font-medium",
                        )
                      }
                    >
                      <div className="size-1.5 rounded-full bg-current/40" />
                      {t(child.label)}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* VIN footer */}
      <div className="border-border border-t px-4 py-3">
        <p className="text-muted-foreground font-mono text-xs">{report.vin}</p>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Delete ReportMainContent.tsx**

```bash
rm apps/desktop/src/components/ReportMainContent.tsx
```

- [ ] **Step 4: Verify build**

```bash
cd apps/desktop && pnpm build
```
Expected: Clean build. `SectionId` type is gone, `ReportMainContent` is gone, `activeSection`/`onNavigate` prop-drilling is gone.

- [ ] **Step 5: Commit**

```bash
git add apps/desktop/src/pages/ReportPage.tsx apps/desktop/src/components/ReportSidebar.tsx
git rm apps/desktop/src/components/ReportMainContent.tsx
git commit -m "feat(desktop): convert ReportPage to layout, sidebar to NavLink"
```

---

### Task 4: Create mobile tab section components

**Files:**
- Create: `apps/mobile/src/pages/report-tabs/HomeTabSection.tsx`
- Create: `apps/mobile/src/pages/report-tabs/HistoryTabSection.tsx`
- Create: `apps/mobile/src/pages/report-tabs/MarketTabSection.tsx`
- Create: `apps/mobile/src/pages/report-tabs/VerdictTabSection.tsx`
- Create: `apps/mobile/src/pages/report-tabs/NegotiateTabSection.tsx`

Same pattern as desktop — each reads `useRouteLoaderData("report")` and delegates to an existing mobile tab component.

- [ ] **Step 1: Create all 5 tab section files**

`apps/mobile/src/pages/report-tabs/HomeTabSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import HomeTab from "@/components/home/HomeTab";

export default function HomeTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <HomeTab report={report} />;
}
```

`apps/mobile/src/pages/report-tabs/HistoryTabSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import HistoryTab from "@/components/history/HistoryTab";

export default function HistoryTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <HistoryTab report={report} />;
}
```

`apps/mobile/src/pages/report-tabs/MarketTabSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import MarketTab from "@/components/market/MarketTab";

export default function MarketTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <MarketTab report={report} />;
}
```

`apps/mobile/src/pages/report-tabs/VerdictTabSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VerdictTab from "@/components/verdict/VerdictTab";

export default function VerdictTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <VerdictTab report={report} />;
}
```

`apps/mobile/src/pages/report-tabs/NegotiateTabSection.tsx`
```tsx
import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import NegotiateTab from "@/components/negotiate/NegotiateTab";

export default function NegotiateTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <NegotiateTab report={report} />;
}
```

- [ ] **Step 2: Verify build**

```bash
cd apps/mobile && pnpm build
```
Expected: Clean build. New files valid but unused.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/pages/report-tabs/
git commit -m "feat(mobile): add route tab section components"
```

---

### Task 5: Update mobile router with child routes

**Files:**
- Modify: `apps/mobile/src/data/router.tsx`

Same structure as desktop: parent route gets `id: "report"` and `shouldRevalidate: () => false`, index redirects to `home`, 5 child tab routes.

- [ ] **Step 1: Replace router.tsx with the following**

```tsx
import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Home from "@/pages/home.tsx";
import ReportError from "@/pages/report-error.tsx";
import RootError from "@/pages/root-error.tsx";
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import { reportLoader } from "@carveri/shared/data/loaders.ts";
import HomeTabSection from "@/pages/report-tabs/HomeTabSection.tsx";
import HistoryTabSection from "@/pages/report-tabs/HistoryTabSection.tsx";
import MarketTabSection from "@/pages/report-tabs/MarketTabSection.tsx";
import VerdictTabSection from "@/pages/report-tabs/VerdictTabSection.tsx";
import NegotiateTabSection from "@/pages/report-tabs/NegotiateTabSection.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      {
        id: "report",
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.vin}/home`),
          },
          { path: "home", element: <HomeTabSection /> },
          { path: "history", element: <HistoryTabSection /> },
          { path: "market", element: <MarketTabSection /> },
          { path: "verdict", element: <VerdictTabSection /> },
          { path: "negotiate", element: <NegotiateTabSection /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
```

- [ ] **Step 2: Verify build**

```bash
cd apps/mobile && pnpm build
```
Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/data/router.tsx
git commit -m "feat(mobile): add nested tab routes with report cache"
```

---

### Task 6: Refactor mobile ReportPage + BottomNavBar

**Files:**
- Modify: `apps/mobile/src/pages/ReportPage.tsx`
- Modify: `apps/mobile/src/components/BottomNavBar.tsx`

`ReportPage` drops `activeTab`/`prevTab` state and renders `<Outlet />` wrapped in `AnimatePresence`. Slide direction is derived from comparing current vs previous URL path segment using a `useRef`. `BottomNavBar` drops all props and uses `NavLink` + `useParams`.

- [ ] **Step 1: Rewrite ReportPage.tsx**

```tsx
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavBar from "@/components/BottomNavBar";

const TAB_ORDER = ["home", "history", "market", "verdict", "negotiate"];

function getTabFromPath(pathname: string): string {
  return pathname.split("/").pop() ?? "home";
}

export default function ReportPage() {
  const location = useLocation();
  const currentTab = getTabFromPath(location.pathname);
  const prevTabRef = useRef(currentTab);

  const direction =
    TAB_ORDER.indexOf(currentTab) >= TAB_ORDER.indexOf(prevTabRef.current)
      ? 1
      : -1;

  useEffect(() => {
    prevTabRef.current = currentTab;
  }, [currentTab]);

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 pb-24">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={location.pathname}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite BottomNavBar.tsx**

```tsx
import { BarChart2, Clock, Handshake, Home, Sparkles } from "lucide-react";
import { NavLink, useParams } from "react-router";
import { cn } from "@carveri/shared/lib/utils";
import { useTranslation } from "react-i18next";

export default function BottomNavBar() {
  const { vin } = useParams<{ vin: string }>();
  const { t } = useTranslation("common");

  const TABS = [
    { id: "home", label: t("bottomNav.home"), icon: <Home size={20} /> },
    { id: "history", label: t("bottomNav.history"), icon: <Clock size={20} /> },
    { id: "market", label: t("bottomNav.market"), icon: <BarChart2 size={20} /> },
    { id: "verdict", label: t("bottomNav.verdict"), icon: <Sparkles size={20} /> },
    { id: "negotiate", label: t("bottomNav.negotiate"), icon: <Handshake size={20} /> },
  ];

  return (
    <nav className="border-border bg-background fixed bottom-0 left-1/2 z-50 flex w-full max-w-107.5 -translate-x-1/2 justify-around border-t px-1 pt-2 pb-4">
      {TABS.map((tab) => (
        <NavLink
          key={tab.id}
          to={`/reports/${vin}/${tab.id}`}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-semibold transition-colors",
              isActive ? "text-primary" : "text-slate-400",
            )
          }
        >
          {tab.icon}
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd apps/mobile && pnpm build
```
Expected: Clean build. `TabId` in `packages/shared/src/data/report.ts` is now unused — not an error, can be removed separately.

- [ ] **Step 4: Commit**

```bash
git add apps/mobile/src/pages/ReportPage.tsx apps/mobile/src/components/BottomNavBar.tsx
git commit -m "feat(mobile): convert ReportPage to layout, BottomNavBar to NavLink"
```
