import { FadeUp } from "@carveri/shared/components/animations.tsx";
import {
  IconAlertTriangle,
  IconChartBar,
  IconMessageCircle,
  IconSparkles,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

const REPORT_AI_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-ai-analysis-v3-8apLrAQmFkomYzhsFG56Ex.webp";

const CALLOUTS = [
  { key: "verdict",     Icon: IconSparkles,      color: "bg-purple-500/15 text-purple-400"   },
  { key: "price",       Icon: IconChartBar,      color: "bg-emerald-500/15 text-emerald-400" },
  { key: "risk",        Icon: IconAlertTriangle, color: "bg-amber-500/15 text-amber-400"     },
  { key: "negotiation", Icon: IconMessageCircle, color: "bg-blue-500/15 text-blue-400"       },
] as const;

function AIAnalysis() {
  const { t } = useTranslation("homepage");

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <img
              src={REPORT_AI_IMAGE}
              alt={t("reportPreview.imgAlt")}
              className="w-full rounded-2xl shadow-2xl shadow-gray-200/80"
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div>
              <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
                {t("reportPreview.eyebrow")}
              </span>
              <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2.25rem]">
                {t("reportPreview.title")}{" "}
                <span className="text-primary">
                  {t("reportPreview.titleHighlight")}
                </span>
              </h2>

              <div className="mt-8 space-y-5">
                {CALLOUTS.map((c) => {
                  const CalloutIcon = c.Icon;
                  return (
                    <div key={c.key} className="flex items-start gap-4">
                      <div
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          c.color,
                        )}
                      >
                        <CalloutIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-[Outfit] text-[15px] font-bold">
                          {t(`reportPreview.${c.key}.title`)}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                          {t(`reportPreview.${c.key}.description`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default AIAnalysis;
