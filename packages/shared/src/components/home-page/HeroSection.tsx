import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import { auth } from "@carveri/shared/lib/auth.ts";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";

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
  const { t: tc } = useTranslation("common");
  const isAuthenticated = auth.isAuthenticated();

  return (
    <section className="relative overflow-hidden bg-[#0A1628]">
      {/* Top navigation */}
      <nav className="relative z-10 mx-auto flex max-w-300 items-center justify-between px-5 pt-5 pb-1">
        <LogoFullHorizontal className="h-7 w-auto brightness-0 invert" />
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="rounded-xl bg-green-400 px-4 py-2 font-[Outfit] text-sm font-bold text-[#0a1628] transition-colors hover:bg-green-300"
            >
              {tc("nav.dashboard")}
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-xl border border-slate-600 px-4 py-2 font-[Outfit] text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              {tc("nav.signIn")}
            </Link>
          )}
        </div>
      </nav>

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
                    "hero.trust_delivery",
                    "hero.trust_carfax",
                    "hero.trust_books",
                  ] as const
                ).map((key) => (
                  <div key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-bold text-green-400">✓</span>
                    {t(key)}
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
