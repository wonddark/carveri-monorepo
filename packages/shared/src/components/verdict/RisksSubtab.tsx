import { motion } from "framer-motion";
import { AlertCircle, CircleCheckBig } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MOCK_REPORTS, type VerdictRisk } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

interface Props {
  risks: VerdictRisk[];
}

export default function RisksSubtab({ risks: externalData }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const risks =
    externalData.length > 0
      ? externalData
      : MOCK_REPORTS.JA4J4VA86RZ079851.verdictTab.risks;
  return (
    <>
      <SubTabHeader title={t("risks.heading")} subtitle="" />

      <div className="flex flex-col gap-3">
        {risks.map((risk, i) => {
          const isPositive = risk.type === "positive";
          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={cn({
                  "bg-amber-50 ring-amber-100 dark:bg-amber-950 dark:ring-amber-900":
                    !isPositive,
                })}
              >
                <CardContent className="flex gap-3">
                  {isPositive ? (
                    <CircleCheckBig className="text-primary mt-0.5 size-4.5 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 size-4.5 shrink-0 text-amber-800 dark:text-amber-600" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${isPositive ? "text-primary" : "text-amber-800 dark:text-amber-600"}`}
                    >
                      {risk.title}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {risk.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
