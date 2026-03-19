import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { HistoryOwner } from "@carveri/shared/data/report";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";

interface Props {
  owners: HistoryOwner[];
}

export default function OwnersSubtab({ owners }: Readonly<Props>) {
  const { t } = useTranslation("history");
  return (
    <>
      <h2 className="text-lg font-semibold">{t("owners.heading")}</h2>
      <p className="text-muted-foreground mb-5 text-xs">
        {t("owners.registeredOwners", { count: owners.length })}
      </p>

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
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-600">
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
                    value: `${owner.startMileage.toLocaleString()} mi`,
                  },
                  {
                    label: t("owners.endMileage"),
                    value: `${owner.endMileage.toLocaleString()} mi`,
                  },
                  {
                    label: t("owners.milesDriven"),
                    value: `${(owner.endMileage - owner.startMileage).toLocaleString()} mi`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-slate-100 py-1.5 last:border-0"
                  >
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-xs font-semibold text-slate-900">
                      {value}
                    </span>
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
