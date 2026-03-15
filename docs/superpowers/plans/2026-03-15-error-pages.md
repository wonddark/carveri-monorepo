# Error Pages (404 & 500) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dedicated 404 and 500 error pages to the report route using React Router 7's loader + errorElement pattern.

**Architecture:** A loader on the `reports/:vin` route fetches the report and throws typed `Response` objects on failure; React Router's `errorElement` catches these and renders `ReportError`, a self-contained page component that inspects the error status and shows the appropriate variant. `report.tsx` is simplified to consume data via `useLoaderData()`.

**Tech Stack:** React 19, React Router 7 (`createBrowserRouter`), TypeScript, Tailwind CSS v4, Shadcn/UI, Tabler Icons

---

## Chunk 1: API error types + ReportError component + Router wiring

### Task 1: Update `api.ts` to throw typed `Response` objects

**Files:**
- Modify: `src/data/api.ts`

- [ ] **Step 1: Replace generic Error throw with typed Response throws**

  Open `src/data/api.ts`. Replace the entire file with:

  ```ts
  import type { VehicleReport } from "@/types/vehicle-report";

  export async function fetchVehicleReport(vin: string): Promise<VehicleReport> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${vin}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Response("Not Found", { status: 404 });
      }
      throw new Response("Server Error", { status: 500 });
    }

    return response.json() as Promise<VehicleReport>;
  }
  ```

  > Note: network-level failures (`TypeError: Failed to fetch`) are intentionally left uncaught here — they propagate to `ReportError` and are treated as the 500 fallback.

- [ ] **Step 2: Verify TypeScript compiles**

  Run: `pnpm build`
  Expected: no type errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/data/api.ts
  git commit -m "feat: throw typed Response in fetchVehicleReport for 404/500"
  ```

---

### Task 2: Create `ReportError` component

**Files:**
- Create: `src/pages/report-error.tsx`

- [ ] **Step 1: Create the file**

  Create `src/pages/report-error.tsx` with this content:

  ```tsx
  import { isRouteErrorResponse, useRouteError } from "react-router";
  import { IconChevronLeft } from "@tabler/icons-react";
  import { Button } from "@/components/ui/button";

  function ReportError() {
    const error = useRouteError();
    const is404 = isRouteErrorResponse(error) && error.status === 404;

    return (
      <div className="bg-background flex min-h-screen flex-col">
        {/* Header */}
        <header className="bg-background sticky top-0 z-50 flex h-12 items-center border-b px-4 lg:h-14 lg:border-none">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => globalThis.window.history.back()}
              className="rounded-full"
            >
              <IconChevronLeft />
            </Button>
            <span className="font-display rounded-full bg-[#042CD7]/5 px-2.5 py-1 text-[13px] font-bold text-[#042CD7]">
              CarCheck
            </span>
          </div>
        </header>

        {/* Centered error content */}
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
              is404 ? "bg-red-500/10" : "bg-yellow-500/10"
            }`}
          >
            {is404 ? "🔍" : "⚠️"}
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl font-extrabold">
              {is404 ? "Reporte no encontrado" : "Error del servidor"}
            </h1>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              {is404
                ? "No existe un reporte para este VIN. Verifica el número e intenta de nuevo."
                : "Algo salió mal al cargar el reporte. Por favor intenta de nuevo más tarde."}
            </p>
          </div>

          <div className="border-border w-full max-w-[220px] border-t" />

          <p className="text-muted-foreground/40 text-[10px] font-semibold uppercase tracking-widest">
            Código · {is404 ? "404" : "500"}
          </p>

          <Button
            onClick={() => globalThis.window.history.back()}
            className="mt-1"
          >
            ← Volver
          </Button>
        </main>
      </div>
    );
  }

  export default ReportError;
  ```

- [ ] **Step 2: Verify TypeScript compiles**

  Run: `pnpm build`
  Expected: no type errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/pages/report-error.tsx
  git commit -m "feat: add ReportError component for 404 and 500 error pages"
  ```

---

### Task 3: Add loader and errorElement to the router

**Files:**
- Modify: `src/data/router.tsx`

- [ ] **Step 1: Update the router**

  Replace the entire content of `src/data/router.tsx` with:

  ```tsx
  import { createBrowserRouter } from "react-router";
  import type { LoaderFunctionArgs } from "react-router";
  import RootLayout from "@/layout/root.tsx";
  import Report from "@/pages/report.tsx";
  import Home from "@/pages/home.tsx";
  import ReportError from "@/pages/report-error.tsx";
  import { fetchVehicleReport } from "@/data/api.ts";

  async function reportLoader({ params }: LoaderFunctionArgs) {
    if (!params.vin) throw new Response("Not Found", { status: 404 });
    return fetchVehicleReport(params.vin);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "reports/:vin",
          element: <Report />,
          loader: reportLoader,
          errorElement: <ReportError />,
        },
      ],
    },
  ]);

  export default router;
  ```

- [ ] **Step 2: Verify TypeScript compiles**

  Run: `pnpm build`
  Expected: no type errors. (`report.tsx` will have unused import warnings — those are fixed in Chunk 2.)

- [ ] **Step 3: Manually verify error pages render**

  Run: `pnpm dev`

  - Navigate to a non-existent VIN (e.g. `http://localhost:5173/reports/DOESNOTEXIST`). Expect: 404 error page with "Reporte no encontrado", 🔍 icon, "Código · 404" label, "← Volver" button.
  - If your API is unreachable or returns 500, expect: 500 error page with "Error del servidor", ⚠️ icon.
  - Click "← Volver" — expect: browser navigates back.

- [ ] **Step 4: Commit**

  ```bash
  git add src/data/router.tsx
  git commit -m "feat: add report loader and errorElement to router"
  ```

---

## Chunk 2: Refactor report.tsx to use useLoaderData

### Task 4: Refactor `report.tsx`

**Files:**
- Modify: `src/pages/report.tsx`

- [ ] **Step 1: Replace the imports block**

  Replace lines 1–26 (the imports) with:

  ```tsx
  import React, { type ReactNode, useState } from "react";
  import {
    IconChartBar,
    IconChevronLeft,
    IconDownload,
    IconFileText,
    IconHistory,
    IconShare,
    IconSparkles,
  } from "@tabler/icons-react";
  import { Button } from "@/components/ui/button";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { VehicleHero } from "@/components/vehicle-details/VehicleHero";
  import { VehicleInfoCard } from "@/components/vehicle-details/VehicleInfoCard";
  import { PriceEvaluation } from "@/components/vehicle-details/PriceEvaluation";
  import { HistorialTab } from "@/components/vehicle-details/HistorialTab";
  import { MercadoTab } from "@/components/vehicle-details/MercadoTab";
  import { IATab } from "@/components/vehicle-details/IATab";
  import { DocumentsTab } from "@/components/vehicle-details/DocumentsTab";
  import { toast } from "sonner";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
  import type { VehicleReport } from "@/types/vehicle-report";
  import type { Book, Vehicle, VehicleImage } from "@/types/vehicle-detail";
  import { useLoaderData } from "react-router";
  ```

  > Removed: `useEffect`, `useParams`, `fetchVehicleReport` import, `Skeleton` import.

- [ ] **Step 2: Replace the Report component body**

  Replace the `Report` component (lines 135–356) with:

  ```tsx
  const Report: React.FC = () => {
    const report = useLoaderData() as VehicleReport;
    const [activeTab, setActiveTab] = useState("historial");

    const handleBack = () => {
      globalThis.window.history.back();
    };

    const handleShare = async () => {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(globalThis.window.location.href);
        toast.success("Enlace copiado al portapapeles.");
      }
    };

    const handleDownload = () => {
      toast.warning("Esta funcionalidad no está definida/implementada");
    };

    const images = transformImages(report);
    const vehicle = transformVehicle(report);
    const books = transformBooks(report);

    const scrollToTarget = () => {
      const target = document.getElementById("tabs-container");
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };

    return (
      <div id="app" className="flex h-full flex-col">
        {/* --- TOP BAR --- */}
        <header className="bg-background sticky top-0 z-50 flex h-12 items-center justify-between border-b px-4 lg:h-14 lg:border-none">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="rounded-full"
              >
                <IconChevronLeft />
              </Button>
              <span className="carcheck-badge font-display rounded-full bg-[#042CD7]/5 px-2.5 py-1 text-[13px] font-bold text-[#042CD7]">
                CarCheck
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="rounded-full"
              >
                <IconShare />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDownload}>
                <IconDownload />
              </Button>
            </div>
          </div>
        </header>

        {/* --- MAIN SCROLL --- */}
        <main className="mb-10 flex-1 lg:mb-0">
          <div className="flex flex-col gap-8 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pb-8">
            <div className="lag:gap-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_37%]">
              <VehicleHero images={images} />
              <div className="flex flex-col gap-4">
                <VehicleInfoCard vehicle={vehicle} />
                <PriceEvaluation price={vehicle.price} books={books} />
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
              id="tabs-container"
            >
              {/* DESKTOP TABS LIST */}
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList>
                  <TabsTrigger
                    value="historial"
                    onClick={({ currentTarget }) => {
                      currentTarget.scrollIntoView({
                        behavior: "smooth",
                        inline: "nearest",
                        block: "nearest",
                      });
                    }}
                  >
                    <IconHistory /> Historial
                  </TabsTrigger>
                  <TabsTrigger
                    value="mercado"
                    onClick={({ currentTarget }) => {
                      currentTarget.scrollIntoView({
                        behavior: "smooth",
                        inline: "nearest",
                        block: "nearest",
                      });
                    }}
                  >
                    <IconChartBar /> Mercado
                  </TabsTrigger>
                  <TabsTrigger
                    value="ia"
                    onClick={({ currentTarget }) => {
                      currentTarget.scrollIntoView({
                        behavior: "smooth",
                        inline: "nearest",
                        block: "nearest",
                      });
                    }}
                  >
                    <IconSparkles /> Valoración IA
                  </TabsTrigger>
                  <TabsTrigger
                    value="docs"
                    onClick={({ currentTarget }) => {
                      currentTarget.scrollIntoView({
                        behavior: "smooth",
                        inline: "nearest",
                        block: "nearest",
                      });
                    }}
                  >
                    <IconFileText /> Documentos
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {/* TAB CONTENT */}
              <TabsContent value="historial">
                <HistorialTab
                  historial={report.historial}
                  currentImages={report.currentImages}
                />
              </TabsContent>
              <TabsContent value="mercado">
                <MercadoTab vehiclePrice={vehicle.price} />
              </TabsContent>
              <TabsContent value="ia">
                <IATab />
              </TabsContent>
              <TabsContent value="docs">
                <DocumentsTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* --- BOTTOM NAV (Mobile only) --- */}
        <nav className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-black/5 bg-white pt-1.5 pb-[env(safe-area-inset-bottom,8px)] lg:hidden">
          <MobileNavBtn
            active={activeTab === "historial"}
            onClick={() => {
              setActiveTab("historial");
              scrollToTarget();
            }}
            label="Historial"
            renderIcon={(className) => <IconHistory className={className} />}
          />
          <MobileNavBtn
            active={activeTab === "mercado"}
            onClick={() => {
              setActiveTab("mercado");
              scrollToTarget();
            }}
            label="Mercado"
            renderIcon={(className) => <IconChartBar className={className} />}
          />
          <MobileNavBtn
            active={activeTab === "ia"}
            onClick={() => {
              setActiveTab("ia");
              scrollToTarget();
            }}
            label="Valoración IA"
            renderIcon={(className) => <IconSparkles className={className} />}
          />
          <MobileNavBtn
            active={activeTab === "docs"}
            onClick={() => {
              setActiveTab("docs");
              scrollToTarget();
            }}
            label="Documentos"
            renderIcon={(className) => <IconFileText className={className} />}
          />
        </nav>
      </div>
    );
  };
  ```

- [ ] **Step 3: Remove the LoadingSkeleton component and MobileNavBtn stays**

  Delete the `LoadingSkeleton` component (the block starting at `const LoadingSkeleton: React.FC = () => (` through its closing `);`). Keep `MobileNavBtn` as-is.

  The end of the file should look like:

  ```tsx
  const MobileNavBtn: React.FC<{
    active: boolean;
    onClick: () => void;
    label: string;
    renderIcon: (className: string) => ReactNode;
  }> = ({ active, onClick, label, renderIcon }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-colors ${active ? "text-[#042CD7]" : "text-[#bbb]"}`}
    >
      {active && (
        <div className="absolute top-0.5 h-1 w-1 rounded-full bg-[#042CD7]" />
      )}
      {renderIcon("h-[18px] w-[18px]")}
      <span className="font-display text-[10px] font-semibold">{label}</span>
    </button>
  );

  export default Report;
  ```

- [ ] **Step 4: Verify TypeScript compiles**

  Run: `pnpm build`
  Expected: no type errors, no unused import warnings.

- [ ] **Step 5: Manually verify the report page still works**

  Run: `pnpm dev`

  - Navigate to a valid VIN report URL. Expect: report page loads normally (no skeleton, page appears after API responds).
  - Verify all tabs work (Historial, Mercado, Valoración IA, Documentos).
  - Verify mobile bottom nav tab switching works.
  - Verify share and download buttons still trigger toasts.

- [ ] **Step 6: Final commit**

  ```bash
  git add src/pages/report.tsx
  git commit -m "refactor: use useLoaderData in report page, remove loading state and skeleton"
  ```
