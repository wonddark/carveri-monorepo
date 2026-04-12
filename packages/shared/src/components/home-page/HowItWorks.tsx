import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { IconBolt, IconFileText, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const STEPS = [
  { key: "step1", Icon: IconFileText },
  { key: "step2", Icon: IconSearch   },
  { key: "step3", Icon: IconBolt     },
] as const;

function HowItWorks() {
  const { t } = useTranslation("homepage");

  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        {/* Header */}
        <FadeUp>
          <div className="mx-auto mb-16 max-w-125 text-center">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
              {t("howItWorks.eyebrow")}
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight sm:text-[2.25rem]">
              {t("howItWorks.title")}{" "}
              <span className="text-primary">{t("howItWorks.titleHighlight")}</span>
            </h2>
          </div>
        </FadeUp>

        {/* Steps */}
        <div className="relative mx-auto max-w-240">
          {/* Connector line — desktop only */}
          <div className="absolute top-[2.25rem] right-[calc(16.666%+1rem)] left-[calc(16.666%+1rem)] hidden h-px bg-border lg:block" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <FadeUp key={step.key} delay={i * 0.1}>
                  <div className="relative text-center lg:text-left">
                    {/* Step number */}
                    <span className="text-primary font-[Outfit] text-5xl font-black leading-none">
                      {t(`howItWorks.${step.key}.num`)}
                    </span>

                    {/* Icon */}
                    <div className="bg-primary/10 text-primary mt-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                      <StepIcon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    {/* Copy */}
                    <p className="mt-5 font-[Outfit] text-xl font-bold">
                      {t(`howItWorks.${step.key}.title`)}
                    </p>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
                      {t(`howItWorks.${step.key}.description`)}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
