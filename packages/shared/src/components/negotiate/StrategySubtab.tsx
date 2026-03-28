import { ArrowRight, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MOCK_REPORTS, type VehicleReport } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  strategy: VehicleReport["negotiate"]["strategy"];
}

export default function StrategySubtab({ strategy }: Readonly<Props>) {
  const { t } = useTranslation("negotiate");
  const {
    firstOffer: fo,
    midpoint: mp,
    maxRecommended: mr,
    tips: externalTips,
  } = strategy;

  const firstOffer =
    fo || MOCK_REPORTS.JA4J4VA86RZ079851.negotiate.strategy.firstOffer;
  const midpoint =
    mp || MOCK_REPORTS.JA4J4VA86RZ079851.negotiate.strategy.midpoint;
  const maxRecommended =
    mr || MOCK_REPORTS.JA4J4VA86RZ079851.negotiate.strategy.maxRecommended;
  const tips =
    externalTips.length > 0
      ? externalTips
      : MOCK_REPORTS.JA4J4VA86RZ079851.negotiate.strategy.tips;

  return (
    <>
      <SubTabHeader title={t("negotiation.strategy")} subtitle={""} />

      <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
        {/* 3-column price row */}
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          <Card className="py-3">
            <CardContent className="flex flex-col items-center gap-1.5 px-3">
              <p className="text-muted-foreground text-center text-xs font-medium">
                {t("strategy.firstOffer")}
              </p>
              <p className="text-base font-semibold">
                ${firstOffer.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="py-3">
            <CardContent className="flex flex-col items-center gap-1.5 px-3">
              <p className="text-muted-foreground text-center text-xs font-medium">
                {t("strategy.midpoint")}
              </p>
              <p className="text-base font-semibold">
                ${midpoint.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="py-3">
            <CardContent className="flex flex-col items-center gap-1.5 px-3">
              <p className="text-muted-foreground text-center text-xs font-medium">
                {t("strategy.maxRecommended")}
              </p>
              <p className="text-base font-semibold">
                ${maxRecommended.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tips card */}
        <Card>
          <CardContent>
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="text-primary size-4" />
              <h3 className="font-semibold">{t("strategy.tips")}</h3>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {tips.map((tip) => (
                <div
                  key={tip}
                  className="border-border flex items-start gap-2 border-b py-2 last:border-0"
                >
                  <ArrowRight className="text-primary mt-0.5 size-4 shrink-0" />
                  <p className="text-xs">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
