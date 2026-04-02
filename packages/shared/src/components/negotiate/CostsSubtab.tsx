import { useTranslation } from "react-i18next";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";

interface Props {
  price: number;
  costs: VehicleReport["negotiate"]["costs"];
}

export default function CostsSubtab({ price }: Readonly<Props>) {
  const { t } = useTranslation("negotiate");
  const costs = {
    taxRatePct: 8.75,
    tagAndTitle: 100,
    dealerFee: 100,
    state: "CA",
    monthlyEstimates: [
      {
        label: "",
        low: 0,
        high: 0,
      },
    ],
  };
  const salesTax = Math.round((price * costs.taxRatePct) / 100);
  const total = price + salesTax + costs.tagAndTitle + costs.dealerFee;

  return (
    <>
      <SubTabHeader
        title={t("costs.heading")}
        subtitle={t("costs.breakdown", { state: costs.state })}
      />

      <div className="flex grid-cols-2 flex-col gap-3 lg:grid lg:gap-6">
        {/* Purchase breakdown card */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between py-1.25">
              <span className="text-sm">{t("costs.vehiclePrice")}</span>
              <span className="text-sm font-semibold">
                ${price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.25">
              <span className="text-sm">
                {t("costs.salesTax")} ({costs.taxRatePct}%)
              </span>
              <span className="text-sm font-semibold">
                ${salesTax.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.25">
              <span className="text-sm">{t("costs.tagTitle")}</span>
              <span className="text-sm font-semibold">
                ${costs.tagAndTitle.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.25">
              <span className="text-sm">{t("costs.dealerFee")}</span>
              <span className="text-sm font-semibold">
                ${costs.dealerFee.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm font-bold">
                {t("costs.totalEstimated")}
              </span>
              <span className="text-primary text-sm font-black">
                ${total.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly estimates card */}
        <Card>
          <CardContent>
            <h3 className="mb-3 text-sm font-bold">
              {t("costs.monthlyHeading")}
            </h3>
            {costs.monthlyEstimates.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-1.5"
              >
                <span className="text-sm">{item.label}</span>
                <span className="text-sm font-semibold">
                  ${item.low} – ${item.high}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
