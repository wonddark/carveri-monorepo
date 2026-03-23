import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Wrench } from "lucide-react";
import type { HistoryServiceRecord } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  service: HistoryServiceRecord[];
}

export default function ServiceSubtab({ service }: Readonly<Props>) {
  const { t } = useTranslation("history");
  return (
    <>
      <SubTabHeader
        title={t("service.heading")}
        subtitle={t("service.recordsSuffix", { count: service.length })}
      />

      <div className="flex flex-col gap-3">
        {service.map((record, i) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="bg-primary/20 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                  <Wrench size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{record.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {record.type}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs">{record.date}</div>
                  <div className="text-muted-foreground text-xs">
                    {record.mileage.toLocaleString()} mi
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
