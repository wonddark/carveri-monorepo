import { FadeIn, FadeUp } from "@carveri/shared/components/animations.tsx";
import {
  IconChartBar,
  IconClock,
  IconSearch,
  IconShieldFilled,
  IconSparkles,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

const SUPPORTING_FEATURES = [
  { key: "carfax",   Icon: IconShieldFilled, color: "bg-blue-500"    },
  { key: "books",    Icon: IconChartBar,     color: "bg-emerald-500" },
  { key: "auction",  Icon: IconSearch,       color: "bg-amber-500"   },
  { key: "market",   Icon: IconTrendingUp,   color: "bg-rose-500"    },
  { key: "delivery", Icon: IconClock,        color: "bg-cyan-500"    },
] as const;

const VERDICT_PILLS = [
  { key: "buy",       prefix: "✓",  classes: "border-green-500/20 bg-green-500/15 text-green-400"  },
  { key: "negotiate", prefix: "⚡", classes: "border-amber-500/20 bg-amber-500/15 text-amber-400"  },
  { key: "avoid",     prefix: "✗",  classes: "border-rose-500/20 bg-rose-500/15 text-rose-400"     },
] as const;

function Features() {
  const { t } = useTranslation("homepage");

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        {/* Section header */}
        <FadeUp>
          <div className="mx-auto mb-12 max-w-160 text-center lg:mb-16">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
              {t("features.eyebrow")}
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]">
              {t("features.title")}{" "}
              <span className="text-primary">{t("features.titleHighlight")}</span>
            </h2>
          </div>
        </FadeUp>

        {/* Bento grid */}
        <FadeIn>
          <div className="grid gap-5 lg:grid-cols-5">

            {/* AI Verdict — hero card */}
            <div className="flex flex-col justify-between rounded-2xl bg-[#0A1628] p-7 lg:col-span-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/15 px-3 py-1 font-[Outfit] text-xs font-bold tracking-wider text-blue-400">
                  <IconSparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("features.verdict.badge")}
                </span>
                <h3 className="mt-5 font-[Outfit] text-[1.75rem] font-black text-white">
                  {t("features.verdict.title")}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-300">
                  {t("features.verdict.description")}
                </p>
              </div>

              <div>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {VERDICT_PILLS.map((pill) => (
                    <span
                      key={pill.key}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 font-[Outfit] text-sm font-semibold",
                        pill.classes,
                      )}
                    >
                      {pill.prefix} {t(`features.verdict.${pill.key}`)}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-xs text-gray-500">
                  {t("features.verdict.powered")}
                </p>
              </div>
            </div>

            {/* Supporting features — 2×2 grid + delivery full-width */}
            <div className="grid grid-cols-2 gap-5 lg:col-span-3">
              {SUPPORTING_FEATURES.map((f) => {
                const FeatureIcon = f.Icon;
                return (
                <div
                  key={f.key}
                  className={cn(
                    "rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    f.key === "delivery" && "col-span-2",
                  )}
                >
                  <div
                    className={cn(
                      "mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-white",
                      f.color,
                    )}
                  >
                    <FeatureIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="font-[Outfit] text-[15px] font-bold">
                    {t(`features.${f.key}.title`)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {t(`features.${f.key}.description`)}
                  </p>
                </div>
                );
              })}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Features;
