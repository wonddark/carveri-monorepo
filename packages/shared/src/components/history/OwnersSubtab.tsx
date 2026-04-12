import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { useEffect } from "react";

interface Props {
  owners: TransformedReport["historyTab"]["owners"];
}

export default function OwnersSubtab({ owners }: Readonly<Props>) {
  const { t } = useTranslation("history");

  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SubTabHeader
        title={t("owners.heading")}
        subtitle={t("owners.registeredOwners", { count: owners.length })}
      />

      <div className="flex flex-col gap-3">
        {owners.map((owner, i) => (
          <motion.div
            key={owner.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="grid-cols-[36px_1fr]">
                <div className="bg-primary/20 text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-black">
                  #{i + 1}
                </div>
                <div className="flex flex-col">
                  <CardTitle>{owner.label}</CardTitle>
                  <CardDescription>
                    {owner.type} · {owner.state}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {[
                  {
                    label: t("owners.period"),
                    value: `${owner.periodStart} — ${owner.periodEnd} (${owner.periodMonths} mo)`,
                  },
                  {
                    label: t("owners.startMileage"),
                    value: `${owner.startMileage?.toLocaleString()} mi`,
                  },
                  {
                    label: t("owners.endMileage"),
                    value: `${owner.endMileage?.toLocaleString()} mi`,
                  },
                  {
                    label: t("owners.milesDriven"),
                    value: `${((owner.endMileage ?? 0) - (owner.startMileage ?? 0)).toLocaleString()} mi`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-1.5">
                    <span className="text-muted-foreground text-xs">
                      {label}
                    </span>
                    <span className="text-xs font-semibold">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
