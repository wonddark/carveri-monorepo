# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing `HeroSection.tsx` with a split-layout (desktop) / stacked (mobile) hero anchored by a static report mockup, with two scroll-based CTAs and no video embed.

**Architecture:** Single responsive component (`HeroSection.tsx`) using Tailwind `lg:` breakpoints to switch between stacked (mobile) and 2-column grid (desktop). All copy is i18n'd; the report mockup is a hardcoded static visual. Both home pages (desktop + mobile) add two new `useRef` scroll targets and pass handlers down to `HeroSection`.

**Tech Stack:** React 19, Tailwind CSS v4, framer-motion (`FadeUp` from `animations.tsx`), i18next (`homepage` namespace), `cn()` from `@carveri/shared/lib/utils`.

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Modify | `apps/desktop/src/pages/home.tsx` |
| Modify | `apps/mobile/src/pages/home.tsx` |
| Rewrite | `packages/shared/src/components/home-page/HeroSection.tsx` |

---

### Task 1: Update i18n keys

**Files:**
- Modify: `packages/shared/src/components/home-page/locales/en.json`
- Modify: `packages/shared/src/components/home-page/locales/es.json`

- [ ] **Step 1: Replace the `hero` object in `en.json`**

Open `packages/shared/src/components/home-page/locales/en.json`. Replace the entire `"hero"` block (currently 5 keys including `watchHowItWorks`) with:

```json
"hero": {
  "badge": "Vehicle Intelligence",
  "title": "Buying a used car?",
  "titleHighlight": "Know before you pay.",
  "description": "AI-powered report with Carfax, 4 valuation books, auction history and market comparables — delivered in 24 hours.",
  "descriptionMobile": "Carfax · 4 valuation books · Auction history · AI verdict. Delivered in 24h.",
  "cta_primary": "See real reports",
  "cta_secondary": "View plans",
  "trust_delivery": "24h delivery",
  "trust_carfax": "Carfax included",
  "trust_books": "4 valuation books",
  "report_verdict_label": "Verdict",
  "report_asking": "Asking",
  "report_market": "Market avg",
  "report_delta": "Below avg",
  "report_ai_label": "AI Analysis"
},
```

- [ ] **Step 2: Replace the `hero` object in `es.json`**

Open `packages/shared/src/components/home-page/locales/es.json`. Replace the entire `"hero"` block with:

```json
"hero": {
  "badge": "Inteligencia Vehicular",
  "title": "¿Comprando un auto usado?",
  "titleHighlight": "Sabe antes de pagar.",
  "description": "Reporte con IA: Carfax, 4 libros de valuación, historial de subasta y comparables de mercado — entregado en 24 horas.",
  "descriptionMobile": "Carfax · 4 libros · Historial de subasta · Veredicto con IA. En 24h.",
  "cta_primary": "Ver reportes reales",
  "cta_secondary": "Ver planes",
  "trust_delivery": "Entrega en 24h",
  "trust_carfax": "Carfax incluido",
  "trust_books": "4 libros de valuación",
  "report_verdict_label": "Veredicto",
  "report_asking": "Precio pedido",
  "report_market": "Promedio mercado",
  "report_delta": "Por debajo",
  "report_ai_label": "Análisis IA"
},
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(hero): update i18n keys for redesigned hero section"
```

---

### Task 2: Add scroll refs to both home pages

**Files:**
- Modify: `apps/desktop/src/pages/home.tsx`
- Modify: `apps/mobile/src/pages/home.tsx`

Both files are currently identical in structure. Apply the same changes to each.

- [ ] **Step 1: Update `apps/desktop/src/pages/home.tsx`**

Replace the entire file content with:

```tsx
import { useRef } from "react";
import HeroSection from "@carveri/shared/components/home-page/HeroSection.tsx";
import VinFormSection from "@carveri/shared/components/home-page/VinFormSection.tsx";
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
  const vinFormRef = useRef<HTMLElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToVinForm = () => {
    vinFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => vinFormRef.current?.focus(), 600);
  };

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

      {/* ═══ VIN FORM SECTION ═══ */}
      <VinFormSection formRef={vinFormRef} />

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
      <ReportSample scrollToVinForm={scrollToVinForm} />

      {/* ═══ PRICING ═══ */}
      <div ref={pricingRef}>
        <PricingSection />
      </div>

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCta scrollToVinForm={scrollToVinForm} />

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <StickyMobileBar scrollToVinForm={scrollToVinForm} />

      {/* ═══ WhatsApp FAB ═══ */}
      <WsFab />
    </div>
  );
}
```

- [ ] **Step 2: Update `apps/mobile/src/pages/home.tsx`**

Replace the entire file content with:

```tsx
import { useRef } from "react";
import HeroSection from "@carveri/shared/components/home-page/HeroSection.tsx";
import VinFormSection from "@carveri/shared/components/home-page/VinFormSection.tsx";
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
  const vinFormRef = useRef<HTMLElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToVinForm = () => {
    vinFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => vinFormRef.current?.focus(), 600);
  };

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

      {/* ═══ VIN FORM SECTION ═══ */}
      <VinFormSection formRef={vinFormRef} />

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
      <ReportSample scrollToVinForm={scrollToVinForm} />

      {/* ═══ PRICING ═══ */}
      <div ref={pricingRef}>
        <PricingSection />
      </div>

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCta scrollToVinForm={scrollToVinForm} />

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <StickyMobileBar scrollToVinForm={scrollToVinForm} />

      {/* ═══ WhatsApp FAB ═══ */}
      <WsFab />
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/desktop exec tsc --noEmit
pnpm --filter @carveri/mobile exec tsc --noEmit
```

Expected: errors about `HeroSection` missing required props (`scrollToExamples`, `scrollToPricing`) — those will be resolved in Task 3.

- [ ] **Step 4: Commit**

```bash
git add apps/desktop/src/pages/home.tsx apps/mobile/src/pages/home.tsx
git commit -m "feat(hero): add examples + pricing scroll refs to landing pages"
```

---

### Task 3: Rewrite HeroSection

**Files:**
- Rewrite: `packages/shared/src/components/home-page/HeroSection.tsx`

- [ ] **Step 1: Replace the file contents**

Write `packages/shared/src/components/home-page/HeroSection.tsx` with:

```tsx
import { useTranslation } from "react-i18next";
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

interface Props {
  scrollToExamples: () => void;
  scrollToPricing: () => void;
}

// Static report mockup — matches carCheckExamples[0] from data/static.tsx
const REPORT_TAGS = [
  { label: "✓ Clean Title", green: true },
  { label: "✓ No Accidents", green: true },
  { label: "✓ Verified Odometer", green: true },
  { label: "⚠ Auction Origin", green: false },
] as const;

const REPORT_BOOKS = [
  { source: "MMR", value: "$21,600" },
  { source: "KBB", value: "$22,310" },
  { source: "BB", value: "$20,925" },
  { source: "JDP", value: "$20,075" },
] as const;

const REPORT_AI_SUMMARY =
  "Price is 2.8% below market fair value. Clean Carfax history. Recommend a mechanical inspection before closing.";

export default function HeroSection({
  scrollToExamples,
  scrollToPricing,
}: Readonly<Props>) {
  const { t } = useTranslation("homepage");

  return (
    <section className="relative overflow-hidden bg-[#0A1628]">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-600/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-300 px-5 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Copy column ── */}
          <FadeUp>
            <div className="flex flex-col gap-5">
              {/* Badge */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="font-[Outfit] text-xs font-bold tracking-widest text-green-400 uppercase">
                  {t("hero.badge")}
                </span>
              </div>

              {/* H1 */}
              <h1 className="font-[Outfit] text-4xl font-black leading-[1.05] tracking-tight text-white lg:text-5xl xl:text-[3.5rem]">
                {t("hero.title")}{" "}
                <span className="text-green-400">{t("hero.titleHighlight")}</span>
              </h1>

              {/* Subtitle — shorter on mobile, longer on desktop */}
              <p className="text-base leading-relaxed text-gray-400 lg:hidden">
                {t("hero.descriptionMobile")}
              </p>
              <p className="hidden max-w-md text-lg leading-relaxed text-gray-400 lg:block">
                {t("hero.description")}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToExamples}
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-400 px-6 py-3.5 font-[Outfit] text-sm font-bold text-[#0a1628] transition-colors hover:bg-green-300 active:scale-95"
                >
                  {t("hero.cta_primary")} →
                </button>
                <button
                  onClick={scrollToPricing}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 font-[Outfit] text-sm font-semibold text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-300"
                >
                  {t("hero.cta_secondary")}
                </button>
              </div>

              {/* Trust row — desktop only */}
              <div className="hidden items-center gap-6 lg:flex">
                {(
                  [
                    t("hero.trust_delivery"),
                    t("hero.trust_carfax"),
                    t("hero.trust_books"),
                  ] as string[]
                ).map((label) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-bold text-green-400">✓</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* ── Report mockup column ── */}
          <FadeUp delay={0.12}>
            <div className="rounded-2xl border border-[#1e3a5f] bg-[#1e293b] p-6 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              {/* Card header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white">
                    2024 Mitsubishi Outlander SE
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Tampa, FL · 33,500 mi · $25,000
                  </p>
                </div>
                <div className="shrink-0 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-2 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">
                    {t("hero.report_verdict_label")}
                  </p>
                  <p className="text-xl font-black leading-none text-green-400">BUY</p>
                  <p className="text-[9px] text-green-400/60">8.2 / 10</p>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {REPORT_TAGS.map(({ label, green }) => (
                  <span
                    key={label}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                      green
                        ? "bg-green-500/10 text-green-400"
                        : "bg-amber-500/10 text-amber-400",
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="my-3 h-px bg-[#1e3a5f]" />

              {/* Stats row */}
              <div className="mb-3 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-[#0f172a] p-2.5 text-center">
                  <p className="text-sm font-bold text-white">$25,000</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-600">
                    {t("hero.report_asking")}
                  </p>
                </div>
                <div className="rounded-lg bg-[#0f172a] p-2.5 text-center">
                  <p className="text-sm font-bold text-green-400">$25,706</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-600">
                    {t("hero.report_market")}
                  </p>
                </div>
                <div className="rounded-lg bg-[#0f172a] p-2.5 text-center">
                  <p className="text-sm font-bold text-green-400">↓ 2.8%</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-600">
                    {t("hero.report_delta")}
                  </p>
                </div>
              </div>

              {/* Valuation books — desktop only */}
              <div className="mb-3 hidden grid-cols-4 gap-2 lg:grid">
                {REPORT_BOOKS.map(({ source, value }) => (
                  <div key={source} className="rounded-lg bg-[#0f172a] p-2 text-center">
                    <p className="text-[9px] font-bold text-slate-600">{source}</p>
                    <p className="mt-0.5 text-[11px] font-bold text-green-400">{value}</p>
                  </div>
                ))}
              </div>

              {/* AI analysis box — desktop only */}
              <div className="hidden rounded-lg border border-blue-500/15 bg-blue-500/8 p-3 lg:block">
                <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-blue-400">
                  {t("hero.report_ai_label")}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {REPORT_AI_SUMMARY}
                </p>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/shared exec tsc --noEmit
pnpm --filter @carveri/desktop exec tsc --noEmit
pnpm --filter @carveri/mobile exec tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 3: Start dev server and verify visually**

```bash
pnpm dev:desktop
# or
pnpm dev:mobile
```

Navigate to `/` (the landing page). Verify:

**Desktop (lg+ viewport):**
- Dark navy hero with two ambient glows (subtle)
- Left column: badge with pulse dot, large H1, subtitle, two side-by-side CTA buttons, trust row below
- Right column: report card with header (vehicle name + verdict badge), four green tags + one amber tag, three stats boxes, four book value boxes, blue-tinted AI analysis box
- Both columns fade up on load (slight delay on the right column)
- "See real reports →" button scrolls to the ExamplesSlider section
- "View plans" button scrolls to PricingSection
- Page transitions from dark hero to light background at the next section

**Mobile (< lg viewport):**
- Same dark hero, single column
- Badge → H1 → shorter subtitle → full-width primary CTA → full-width secondary outline CTA
- Thin separator → compact report card (verdict, tags, three stats — no books, no AI box)
- Trust row is hidden

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/home-page/HeroSection.tsx
git commit -m "feat(hero): replace hero section with split-layout report mockup design"
```
