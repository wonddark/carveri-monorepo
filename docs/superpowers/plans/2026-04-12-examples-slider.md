# Examples Slider + VinForm Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `VinFormSection` from the landing pages, update three downstream CTAs to scroll to pricing, and redesign `ExamplesSlider` with enriched cards (title badge + data hint line).

**Architecture:** Three independent tasks: i18n key updates first (ExamplesSlider depends on new keys), then VinFormSection removal with prop renames across home pages and three shared components, then the ExamplesSlider rewrite. No new dependencies — existing stack only.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, framer-motion (`FadeUp`/`FadeIn`), i18next (`homepage` namespace), `cn()` from `@carveri/shared/lib/utils`.

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Modify | `apps/desktop/src/pages/home.tsx` |
| Modify | `apps/mobile/src/pages/home.tsx` |
| Modify | `packages/shared/src/components/home-page/ReportSample.tsx` |
| Modify | `packages/shared/src/components/home-page/FinalCta.tsx` |
| Modify | `packages/shared/src/components/home-page/StickyMobileBar.tsx` |
| Rewrite | `packages/shared/src/components/home-page/ExamplesSlider.tsx` |

---

### Task 1: Update i18n keys

**Files:**
- Modify: `packages/shared/src/components/home-page/locales/en.json`
- Modify: `packages/shared/src/components/home-page/locales/es.json`

- [ ] **Step 1: Update the `examples` block and CTA keys in `en.json`**

Open `packages/shared/src/components/home-page/locales/en.json`. Make these targeted changes:

Replace the `"examples"` block:
```json
"examples": {
  "eyebrow": "Real reports",
  "title": "Browse real CarVeri reports",
  "subtitle": "Every card links to a real, full report — open and readable.",
  "dataHint": "Carfax · 4 valuation books · AI verdict",
  "viewReport": "View full report"
},
```

Change `reportSample.getFirstReport`:
```json
"getFirstReport": "View plans"
```

Change `finalCta.getReport`:
```json
"getReport": "View plans"
```

- [ ] **Step 2: Update the `examples` block and CTA keys in `es.json`**

Open `packages/shared/src/components/home-page/locales/es.json`. Make these targeted changes:

Replace the `"examples"` block:
```json
"examples": {
  "eyebrow": "Reportes reales",
  "title": "Explora reportes CarVeri reales",
  "subtitle": "Cada tarjeta enlaza a un reporte real y completo — abierto para leer.",
  "dataHint": "Carfax · 4 libros de valuación · Veredicto IA",
  "viewReport": "Ver reporte completo"
},
```

Change `reportSample.getFirstReport`:
```json
"getFirstReport": "Ver planes"
```

Change `finalCta.getReport`:
```json
"getReport": "Ver planes"
```

- [ ] **Step 3: Commit**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(examples): update i18n keys for examples slider redesign"
```

---

### Task 2: Remove VinFormSection and rename scroll props

**Files:**
- Modify: `apps/desktop/src/pages/home.tsx`
- Modify: `apps/mobile/src/pages/home.tsx`
- Modify: `packages/shared/src/components/home-page/ReportSample.tsx`
- Modify: `packages/shared/src/components/home-page/FinalCta.tsx`
- Modify: `packages/shared/src/components/home-page/StickyMobileBar.tsx`

- [ ] **Step 1: Rewrite `apps/desktop/src/pages/home.tsx`**

Replace the entire file with:

```tsx
import { useRef } from "react";
import HeroSection from "@carveri/shared/components/home-page/HeroSection.tsx";
import ExamplesSlider from "@carveri/shared/components/home-page/ExamplesSlider.tsx";
import StatsBar from "@carveri/shared/components/home-page/StatsBar.tsx";
import Features from "@carveri/shared/components/home-page/Features.tsx";
import AIAnalysis from "@carveri/shared/components/home-page/AIAnalysis.tsx";
import HowItWorks from "@carveri/shared/components/home-page/HowItWorks.tsx";
import ReportSample from "@carveri/shared/components/home-page/ReportSample.tsx";
import PricingSection from "@carveri/shared/components/home-page/PricingSection.tsx";
import FaqSection from "@carveri/shared/components/home-page/FaqSection.tsx";
import FinalCta from "@carveri/shared/components/home-page/FinalCta.tsx";
import Footer from "@carveri/shared/components/home-page/Footer.tsx";
import StickyMobileBar from "@carveri/shared/components/home-page/StickyMobileBar.tsx";
import WsFab from "@carveri/shared/components/home-page/WsFab.tsx";

export default function CarVeriLanding() {
  const examplesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToExamples = () => {
    examplesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <HeroSection
        scrollToExamples={scrollToExamples}
        scrollToPricing={scrollToPricing}
      />

      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <div ref={examplesRef}>
        <ExamplesSlider />
      </div>

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ FEATURES ═══ */}
      <Features />

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <AIAnalysis />

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorks />

      {/* ═══ REPORT SAMPLE ═══ */}
      <ReportSample scrollToPricing={scrollToPricing} />

      {/* ═══ PRICING ═══ */}
      <div ref={pricingRef}>
        <PricingSection />
      </div>

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCta scrollToPricing={scrollToPricing} />

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <StickyMobileBar scrollToPricing={scrollToPricing} />

      {/* ═══ WhatsApp FAB ═══ */}
      <WsFab />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `apps/mobile/src/pages/home.tsx`**

Replace the entire file with (identical to desktop except the root div has `bg-white`):

```tsx
import { useRef } from "react";
import HeroSection from "@carveri/shared/components/home-page/HeroSection.tsx";
import ExamplesSlider from "@carveri/shared/components/home-page/ExamplesSlider.tsx";
import StatsBar from "@carveri/shared/components/home-page/StatsBar.tsx";
import Features from "@carveri/shared/components/home-page/Features.tsx";
import AIAnalysis from "@carveri/shared/components/home-page/AIAnalysis.tsx";
import HowItWorks from "@carveri/shared/components/home-page/HowItWorks.tsx";
import ReportSample from "@carveri/shared/components/home-page/ReportSample.tsx";
import PricingSection from "@carveri/shared/components/home-page/PricingSection.tsx";
import FaqSection from "@carveri/shared/components/home-page/FaqSection.tsx";
import FinalCta from "@carveri/shared/components/home-page/FinalCta.tsx";
import Footer from "@carveri/shared/components/home-page/Footer.tsx";
import StickyMobileBar from "@carveri/shared/components/home-page/StickyMobileBar.tsx";
import WsFab from "@carveri/shared/components/home-page/WsFab.tsx";

export default function CarVeriLanding() {
  const examplesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToExamples = () => {
    examplesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* ═══ HERO ═══ */}
      <HeroSection
        scrollToExamples={scrollToExamples}
        scrollToPricing={scrollToPricing}
      />

      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <div ref={examplesRef}>
        <ExamplesSlider />
      </div>

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ FEATURES ═══ */}
      <Features />

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <AIAnalysis />

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorks />

      {/* ═══ REPORT SAMPLE ═══ */}
      <ReportSample scrollToPricing={scrollToPricing} />

      {/* ═══ PRICING ═══ */}
      <div ref={pricingRef}>
        <PricingSection />
      </div>

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCta scrollToPricing={scrollToPricing} />

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <StickyMobileBar scrollToPricing={scrollToPricing} />

      {/* ═══ WhatsApp FAB ═══ */}
      <WsFab />
    </div>
  );
}
```

- [ ] **Step 3: Update `packages/shared/src/components/home-page/ReportSample.tsx`**

Replace the entire file with (prop renamed from `scrollToVinForm` to `scrollToPricing`):

```tsx
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Activity, useState } from "react";
import VideoModal from "@carveri/shared/components/home-page/VideoModal.tsx";
import { useTranslation } from "react-i18next";

type Props = {
  scrollToPricing: () => void;
};

function ReportSample(props: Readonly<Props>) {
  const { t } = useTranslation("homepage");
  const { scrollToPricing } = props;
  const [showModal, setShowModal] = useState(false);
  const REPORT_SAMPLE =
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-report-sample-v3-bT8qCeeLfrcNjEi8eVGdpc.webp";

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <div className="relative mx-auto max-w-95 lg:mx-0">
              <img
                src={REPORT_SAMPLE}
                alt={t("reportSample.imgAlt")}
                className="w-full rounded-2xl shadow-2xl shadow-gray-200/80"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div>
              <Badge variant="secondary" className="mb-4 font-[Outfit]">
                {t("reportSample.badge")}
              </Badge>
              <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2rem]">
                {t("reportSample.title")}
              </h2>
              <p className="text-muted-foreground mt-4 text-[1.05rem] leading-relaxed">
                {t("reportSample.description")}
              </p>

              <button
                className="group relative mt-6 aspect-video cursor-pointer overflow-hidden rounded-2xl bg-gray-900"
                onClick={() => setShowModal(true)}
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#042CD7]/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <IconPlayerPlay className="ml-1 h-7 w-7 text-[#042CD7]" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm font-medium text-white/50">
                  {t("reportSample.videoComingSoon")}
                </div>
              </button>

              <Button
                onClick={scrollToPricing}
                size="lg"
                className="mt-6 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[15px] font-bold text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
              >
                {t("reportSample.getFirstReport")}
                <IconArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
      <Activity mode={showModal ? "visible" : "hidden"}>
        <VideoModal open={showModal} onOpenChange={setShowModal} />
      </Activity>
    </section>
  );
}

export default ReportSample;
```

- [ ] **Step 4: Update `packages/shared/src/components/home-page/FinalCta.tsx`**

Replace the entire file with (prop renamed from `scrollToVinForm` to `scrollToPricing`):

```tsx
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconArrowRight, IconMessageCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

type Props = {
  scrollToPricing: () => void;
};

function FinalCta(props: Readonly<Props>) {
  const { t } = useTranslation("homepage");
  const { scrollToPricing } = props;

  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-175 px-5 py-16 text-center lg:py-20">
        <FadeUp>
          <h2 className="text-primary-foreground font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2.5rem]">
            {t("finalCta.title")}
          </h2>
          <p className="text-primary-foreground/70 mx-auto mt-4 max-w-125 text-lg leading-relaxed">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={scrollToPricing}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-[Outfit] text-[16px] font-bold shadow-lg shadow-black/10 active:scale-[0.97]"
            >
              {t("finalCta.getReport")}
              <IconArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://wa.me/17866990000", "_blank")}
              className="rounded-xl border-white/20 bg-white/10 px-8 py-6 font-[Outfit] text-[16px] font-semibold text-white hover:bg-white/20 hover:text-white"
            >
              <IconMessageCircle className="mr-2 h-5 w-5" />
              {t("finalCta.whatsapp")}
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default FinalCta;
```

- [ ] **Step 5: Update `packages/shared/src/components/home-page/StickyMobileBar.tsx`**

Replace the entire file with (prop renamed, button text reuses `hero.cta_secondary` — "View plans"):

```tsx
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { useTranslation } from "react-i18next";

type Props = {
  scrollToPricing: () => void;
};

function StickyMobileBar(props: Readonly<Props>) {
  const { t } = useTranslation("homepage");
  const { scrollToPricing } = props;

  return (
    <div className="safe-area-bottom border-border bg-card/95 fixed right-0 bottom-0 left-0 z-40 border-t p-3 backdrop-blur-xl sm:hidden">
      <Button
        onClick={scrollToPricing}
        className="h-12 w-full bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[15px] font-bold text-white uppercase hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
      >
        {t("hero.cta_secondary")}
      </Button>
    </div>
  );
}

export default StickyMobileBar;
```

- [ ] **Step 6: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/desktop exec tsc --noEmit
pnpm --filter @carveri/mobile exec tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 7: Commit**

```bash
git add apps/desktop/src/pages/home.tsx \
        apps/mobile/src/pages/home.tsx \
        packages/shared/src/components/home-page/ReportSample.tsx \
        packages/shared/src/components/home-page/FinalCta.tsx \
        packages/shared/src/components/home-page/StickyMobileBar.tsx
git commit -m "feat(landing): remove VinFormSection, route CTAs to pricing"
```

---

### Task 3: Rewrite ExamplesSlider

**Files:**
- Rewrite: `packages/shared/src/components/home-page/ExamplesSlider.tsx`

- [ ] **Step 1: Replace the file contents**

Write `packages/shared/src/components/home-page/ExamplesSlider.tsx` with:

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { FadeIn, FadeUp } from "@carveri/shared/components/animations.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import { getVehicleList } from "@carveri/shared/data/api.ts";
import type { VehicleListItem } from "@carveri/shared/types/vehicle-list.ts";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";

function getTitleBadge(
  titleDetails: string | null,
): { label: string; green: boolean } | null {
  if (!titleDetails) return null;
  const isClean = titleDetails.toUpperCase().includes("CLEAN");
  return {
    label: isClean ? "✓ Clean Title" : `⚠ ${titleDetails}`,
    green: isClean,
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

type CardProps = {
  car: VehicleListItem;
  tViewReport: string;
  tDataHint: string;
};

function ExampleCard({ car, tViewReport, tDataHint }: Readonly<CardProps>) {
  const badge = getTitleBadge(car.titleDetails);
  const title = generateReportTitle({
    year: car.year ?? 0,
    make: car.make ?? "-",
    model: car.model ?? "-",
    trim: car.trim ?? "-",
  });

  return (
    <a href={`/reports/${car.id}`} className="group w-72 shrink-0 snap-start">
      <div className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        {/* Photo */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={car.imageThumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {badge && (
            <span
              className={cn(
                "absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white",
                badge.green ? "bg-green-600/90" : "bg-amber-600/90",
              )}
            >
              {badge.label}
            </span>
          )}
          {car.auction && (
            <span className="absolute right-2.5 bottom-2.5 text-[10px] font-medium text-white/55">
              {car.auction}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="truncate font-[Outfit] text-[15px] font-bold">{title}</p>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="font-[Outfit] text-lg font-black">
              {formatPrice(car.retailPrice)}
            </span>
            <span className="text-xs text-muted-foreground">{car.odometro}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{tDataHint}</p>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-primary text-xs font-semibold">{tViewReport}</span>
            <span className="text-primary text-sm">→</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function ExamplesSlider() {
  const { t } = useTranslation("homepage");
  const [examples, setExamples] = useState<VehicleListItem[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    (async () => {
      const vList = await getVehicleList();
      setExamples(vList.data);
    })();
  }, []);

  return (
    <section className="overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-primary font-[Outfit] text-xs font-bold uppercase tracking-widest">
                {t("examples.eyebrow")}
              </span>
              <h2 className="mt-1 font-[Outfit] text-[1.5rem] font-black tracking-tight sm:text-[1.75rem]">
                {t("examples.title")}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t("examples.subtitle")}
              </p>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollSlider("left")}
                className="rounded-full border-border hover:border-border/90"
              >
                <IconChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollSlider("right")}
                className="rounded-full border-border hover:border-border/90"
              >
                <IconChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </FadeUp>

        <FadeIn>
          <div
            ref={sliderRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {examples.map((car) => (
              <ExampleCard
                key={car.id}
                car={car}
                tViewReport={t("examples.viewReport")}
                tDataHint={t("examples.dataHint")}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default ExamplesSlider;
```

**Note on `ExampleCard` props:** `tViewReport` and `tDataHint` are pre-translated strings passed in from the parent so the `t()` hook is called once at the slider level, not inside every card render.

- [ ] **Step 2: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/shared exec tsc --noEmit
pnpm --filter @carveri/desktop exec tsc --noEmit
pnpm --filter @carveri/mobile exec tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Start dev server and verify visually**

```bash
pnpm dev:desktop
```

Navigate to `/`. Verify:

**All viewports:**
- ExamplesSlider section shows below the hero (no VinFormSection in between)
- Section header: "Real reports" eyebrow · "Browse real CarVeri reports" heading · subtitle line
- Cards load from the API with real vehicle photos
- Each card shows: photo with title badge and auction location overlaid, vehicle name, formatted price (`$25,000` not `25000`), mileage, "Carfax · 4 valuation books · AI verdict" hint, "View full report →" link
- Cards with clean titles show a green badge; others show amber
- Hovering a card lifts it slightly

**Desktop:**
- Arrow buttons appear top-right of section header
- 3–4 cards visible, partial 4th card hints at scrolling
- Arrow buttons scroll the strip

**Mobile:**
- Arrow buttons hidden
- Cards are finger-scrollable horizontally

**CTAs:**
- "See real reports →" on hero scrolls down to the ExamplesSlider section
- StickyMobileBar shows "View plans" and scrolls to pricing
- ReportSample "View plans" button scrolls to pricing
- FinalCta "View plans" button scrolls to pricing

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/home-page/ExamplesSlider.tsx
git commit -m "feat(examples): redesign cards with title badge and data hint"
```
