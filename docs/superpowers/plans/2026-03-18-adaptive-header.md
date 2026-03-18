# Adaptive Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `AppHeader` fully transparent over the `ImageCarousel` on the HomeTab, then transition to solid white as the user scrolls the carousel out of view.

**Architecture:** `AppHeader` becomes always-`fixed` with an optional `isTransparent` prop. `ReportPage` manages `isCarouselVisible` state and passes it down. `HomeTab` uses an `IntersectionObserver` on the carousel wrapper to notify `ReportPage` when the carousel exits the viewport. The overflow clip for the Framer Motion slide animation is moved from `<main>` to a wrapper div inside it, so the window scrolls naturally and the IntersectionObserver with `root: null` fires correctly.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, `IntersectionObserver` (native browser API)

> **Note:** This project has no automated tests. Each task uses `pnpm build` (TypeScript check + production build) as the verification step, plus manual browser inspection at `http://localhost:5173` via `pnpm dev`.

---

## File Map

| File | Change |
|---|---|
| `src/index.css` | Add `--header-height` CSS variable |
| `src/components/LanguageToggle.tsx` | Add optional `variant` prop |
| `src/components/AppHeader.tsx` | Add `isTransparent` prop, change to `fixed`, adapt styles |
| `src/pages/ReportPage.tsx` | Add `isCarouselVisible` state, fix scroll model, update HomeTab props |
| `src/components/home/HomeTab.tsx` | Remove duplicate `<AppHeader />`, add carousel observer, update layout |

---

## Task 1: Add `--header-height` CSS variable

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add the variable to `:root`**

  Open `src/index.css`. Find the `:root` block (it already exists with other CSS custom properties). Add inside it:

  ```css
  --header-height: 52px;
  ```

  If there is no existing `:root` block, add one at the top of the file:

  ```css
  :root {
    --header-height: 52px;
  }
  ```

  > **Note:** 52px is an estimate. After Task 3 is implemented, open DevTools, inspect the rendered `<header>` element, and verify its height. If it differs, update this value. Because everything that compensates for the fixed header uses `var(--header-height)`, this one change fixes all offsets.

- [ ] **Step 2: Verify build passes**

  ```bash
  pnpm build
  ```

  Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/index.css
  git commit -m "feat: add --header-height CSS variable"
  ```

---

## Task 2: Add `variant` prop to `LanguageToggle`

**Files:**
- Modify: `src/components/LanguageToggle.tsx`

The current component has hardcoded `bg-slate-100 text-slate-500` classes. It needs a `"light"` variant for when the header is transparent over a dark image.

- [ ] **Step 1: Update `LanguageToggle.tsx`**

  Replace the entire file contents with:

  ```tsx
  import { Globe } from "lucide-react";
  import { useTranslation } from "react-i18next";

  interface Props {
    variant?: "default" | "light";
  }

  export default function LanguageToggle({ variant = "default" }: Props) {
    const { i18n } = useTranslation();
    const currentLang = i18n.language.startsWith("es") ? "es" : "en";

    const toggle = () => {
      void i18n.changeLanguage(currentLang === "en" ? "es" : "en");
    };

    return (
      <button
        onClick={toggle}
        className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold ${
          variant === "light"
            ? "bg-white/15 text-white"
            : "bg-slate-100 text-slate-500"
        }`}
        aria-label="Toggle language"
      >
        <Globe size={13} />
        {currentLang.toUpperCase()}
      </button>
    );
  }
  ```

- [ ] **Step 2: Verify build passes**

  ```bash
  pnpm build
  ```

  Expected: build succeeds. No callers pass `variant` today so no other files change.

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/LanguageToggle.tsx
  git commit -m "feat(LanguageToggle): add light variant for transparent header"
  ```

---

## Task 3: Update `AppHeader` with `isTransparent` prop

**Files:**
- Modify: `src/components/AppHeader.tsx`

Current header: `sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3`

Changes:
- Always `fixed top-0 z-50 w-full` (remove `sticky`)
- Background, border, text/icon colors all driven by `isTransparent`
- Smooth CSS transition on background and color properties
- `bg-black/20` backdrop on both buttons in transparent state

- [ ] **Step 1: Rewrite `AppHeader.tsx`**

  Replace the entire file contents with:

  ```tsx
  import { useNavigate } from "react-router";
  import { ArrowLeft, Share2 } from "lucide-react";
  import LanguageToggle from "@/components/LanguageToggle";
  import { useTranslation } from "react-i18next";

  interface AppHeaderProps {
    isTransparent?: boolean;
  }

  export default function AppHeader({ isTransparent = false }: AppHeaderProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("common");

    return (
      <header
        className={`fixed top-0 z-50 w-full border-b px-4 py-3 transition-[background-color,border-color,color] duration-300 ${
          isTransparent
            ? "border-transparent bg-transparent"
            : "border-slate-100 bg-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className={`rounded-lg p-1 transition-colors duration-300 ${
              isTransparent
                ? "bg-black/20 text-white/90"
                : "bg-transparent text-slate-400 hover:text-slate-600"
            }`}
            aria-label={t("actions.goBack")}
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-black tracking-tight transition-colors duration-300 ${
                isTransparent
                  ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                  : "text-indigo-600"
              }`}
            >
              CarVeri
            </span>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle variant={isTransparent ? "light" : "default"} />
            <button
              className={`rounded-lg p-1.5 transition-colors duration-300 ${
                isTransparent
                  ? "bg-black/20 text-white"
                  : "bg-slate-100 text-slate-400 hover:text-slate-600"
              }`}
              aria-label={t("actions.share")}
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </header>
    );
  }
  ```

- [ ] **Step 2: Verify build passes**

  ```bash
  pnpm build
  ```

  Expected: build succeeds. `isTransparent` defaults to `false`, so all existing callers are unaffected.

- [ ] **Step 3: Manual check — solid state still looks correct**

  ```bash
  pnpm dev
  ```

  Open `http://localhost:5173`. Navigate to any existing route that shows `AppHeader`. Confirm it looks identical to before (white background, indigo logo, slate icons). The header will now be `fixed` instead of `sticky` — check that page content is not hidden behind it (this will be fully corrected in Task 4).

- [ ] **Step 4: Verify `--header-height` value**

  In the browser DevTools, inspect the `<header>` element and note its rendered height. If it differs from `52px`, update `src/index.css`:

  ```css
  --header-height: <actual-value>px;
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/AppHeader.tsx src/index.css
  git commit -m "feat(AppHeader): add isTransparent prop and fixed positioning"
  ```

---

## Task 4: Update `ReportPage` — scroll model and state

**Files:**
- Modify: `src/pages/ReportPage.tsx`

Four changes in this task:
1. Add `isCarouselVisible` state
2. Reset it on navigation back to the home tab
3. Pass `isTransparent` to `AppHeader` and `onCarouselVisibilityChange` to `HomeTab`
4. Fix scroll model: move `overflow-hidden` from `<main>` to an inner wrapper div; add `pt-[var(--header-height)]` to `<main>`

- [ ] **Step 1: Open `src/pages/ReportPage.tsx` and apply all changes**

  The full updated file:

  ```tsx
  import { useState } from "react";
  import { AnimatePresence, motion } from "framer-motion";
  import { cn } from "@/lib/utils";
  import AppHeader from "@/components/AppHeader";
  import BottomNavBar from "@/components/BottomNavBar";
  import HomeTab from "@/components/home/HomeTab";
  import MarketTab from "@/components/market/MarketTab";
  import NegotiateTab from "@/components/negotiate/NegotiateTab";
  import VerdictTab from "@/components/verdict/VerdictTab";
  import HistoryTab from "@/components/history/HistoryTab";
  import type { TabId } from "@/data/report";
  import { MOCK_REPORTS } from "@/data/report";
  import { useParams } from "react-router";

  const TAB_ORDER: TabId[] = [
    "home",
    "history",
    "market",
    "verdict",
    "negotiate",
  ];

  export default function ReportPage() {
    const { vin } = useParams<{ vin: string }>();
    const report = vin ? MOCK_REPORTS[vin] : null;
    const [activeTab, setActiveTab] = useState<TabId>("home");
    const [prevTab, setPrevTab] = useState<TabId>("home");
    const [isCarouselVisible, setIsCarouselVisible] = useState(true);

    const handleTabChange = (tab: TabId) => {
      setPrevTab(activeTab);
      setActiveTab(tab);
      if (tab === "home") setIsCarouselVisible(true);
    };

    const direction =
      TAB_ORDER.indexOf(activeTab) >= TAB_ORDER.indexOf(prevTab) ? 1 : -1;

    if (!report) {
      return (
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-slate-400">Report not found</p>
        </div>
      );
    }

    return (
      <div className="flex min-h-dvh flex-col bg-slate-50">
        <AppHeader isTransparent={activeTab === "home" && isCarouselVisible} />

        <main className="flex-1 pb-24 pt-[var(--header-height)]">
          {/* overflow-hidden clips the horizontal slide animation without trapping vertical scroll */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className={cn(activeTab !== "home" && "space-y-3 px-4 pt-4")}
              >
                {activeTab === "home" && (
                  <HomeTab
                    report={report}
                    onNavigate={handleTabChange}
                    onCarouselVisibilityChange={setIsCarouselVisible}
                  />
                )}

                {activeTab === "market" && <MarketTab report={report} />}

                {activeTab === "negotiate" && <NegotiateTab report={report} />}

                {activeTab === "verdict" && <VerdictTab report={report} />}

                {activeTab === "history" && <HistoryTab report={report} />}

                {activeTab !== "home" &&
                  activeTab !== "market" &&
                  activeTab !== "negotiate" &&
                  activeTab !== "verdict" &&
                  activeTab !== "history" && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                      <p className="text-sm font-semibold capitalize">
                        {activeTab} tab
                      </p>
                      <p className="mt-1 text-xs">Coming soon</p>
                    </div>
                  )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify build (TypeScript error expected)**

  ```bash
  pnpm build
  ```

  Expected: TypeScript will error on `HomeTab` receiving an unknown `onCarouselVisibilityChange` prop — this is intentional. Task 5 adds the matching prop to `HomeTab` and resolves it. To keep the build green between tasks, temporarily comment out only the `onCarouselVisibilityChange={setIsCarouselVisible}` prop line on `<HomeTab>` and proceed; uncomment it after Task 5.

- [ ] **Step 3: Commit**

  ```bash
  git add src/pages/ReportPage.tsx
  git commit -m "feat(ReportPage): add carousel visibility state and fix scroll model"
  ```

---

## Task 5: Update `HomeTab` — remove duplicate header, add IntersectionObserver

**Files:**
- Modify: `src/components/home/HomeTab.tsx`

Changes:
1. Add `onCarouselVisibilityChange` to the `Props` interface
2. Remove the `<AppHeader />` render (ReportPage owns it)
3. Add `carouselRef` and `useEffect` with `IntersectionObserver`
4. Wrap `<ImageCarousel>` with the ref div
5. Wrap remaining content in a padded `div`

- [ ] **Step 1: Update `HomeTab.tsx`**

  Replace the entire file contents with:

  ```tsx
  // src/components/home/HomeTab.tsx
  import { useEffect, useRef } from "react";
  import { LayoutDashboard } from "lucide-react";
  import { useTranslation } from "react-i18next";
  import StatsGrid from "./StatsGrid";
  import PriceEvalSection from "./PriceEvalSection";
  import VehicleDataSection from "./VehicleDataSection";
  import AISummarySection from "./AISummarySection";
  import QuickNavGrid from "./QuickNavGrid";
  import type { TabId, VehicleReport } from "@/data/report";
  import ImageCarousel from "@/components/ImageCarousel.tsx";
  import CarSummaryCard from "@/components/CarSummaryCard.tsx";

  interface Props {
    report: VehicleReport;
    onNavigate: (tab: TabId) => void;
    onCarouselVisibilityChange: (visible: boolean) => void;
  }

  export default function HomeTab({ report, onNavigate, onCarouselVisibilityChange }: Readonly<Props>) {
    const { t } = useTranslation("home");
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = carouselRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => onCarouselVisibilityChange(entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [onCarouselVisibilityChange]);

    return (
      <>
        <div ref={carouselRef}>
          <ImageCarousel images={report.images} />
        </div>

        <div className="space-y-3 px-4 pt-3">
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
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-100 p-1.5">
              <LayoutDashboard size={14} className="text-indigo-600" />
            </div>
            <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Summary
            </span>
          </div>
          <h2 className="-mt-1 text-xl font-black text-slate-900">
            {t("reportSummary")}
          </h2>
          <p className="-mt-2 text-xs text-slate-400">
            {t("overviewFor", {
              name: `${report.year} ${report.make} ${report.model}`,
            })}
          </p>
          <StatsGrid stats={report.stats} />
          <PriceEvalSection price={report.price} priceEval={report.priceEval} />
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
          <AISummarySection aiSummary={report.aiSummary} />
          <QuickNavGrid onNavigate={onNavigate} />
        </div>
      </>
    );
  }
  ```

- [ ] **Step 2: Verify build passes**

  ```bash
  pnpm build
  ```

  Expected: clean build, no TypeScript errors.

- [ ] **Step 3: Manual end-to-end verification**

  ```bash
  pnpm dev
  ```

  Navigate to `/reports-v2/<any-vin>` (check `src/data/report.ts` for a valid VIN key if unsure). Verify:

  1. **On load:** Header is transparent — no white background, logo is white, both buttons have dark backdrop
  2. **Scroll down past the carousel:** Header smoothly fades to solid white, logo turns indigo, buttons return to slate
  3. **Scroll back up:** Header returns to transparent as the carousel re-enters view
  4. **Switch to another tab (e.g. Market) and back to Home:** Header immediately starts transparent on return to Home
  5. **Other tabs (Market, History, etc.):** Header is always solid white — no transparency
  6. **Tab slide animation:** Horizontal slide still works, no content flashes outside the container

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/home/HomeTab.tsx
  git commit -m "feat(HomeTab): transparent header via IntersectionObserver on carousel"
  ```
