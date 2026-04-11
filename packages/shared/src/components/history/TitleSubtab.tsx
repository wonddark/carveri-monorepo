import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { type HistoryTitleItem } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { CircleCheckBig } from "lucide-react";

interface Props {
  title: HistoryTitleItem[];
}

export default function TitleSubtab({ title }: Readonly<Props>) {
  const { t } = useTranslation("history");
  return (
    <>
      <SubTabHeader
        title={t("titleStatus.heading")}
        subtitle={t("titleStatus.subtitle")}
      />

      <div className="flex flex-col gap-3">
        {title.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-700/25 dark:bg-blue-900/20">
              <CardContent className="flex gap-3">
                <CircleCheckBig className="mt-0.5 size-4.5 shrink-0 text-indigo-500 dark:text-indigo-300" />
                <div>
                  <div className="text-sm font-medium text-indigo-500 dark:text-indigo-300">
                    {item.title}
                  </div>
                  <div className="text-muted-foreground mt-0.5 text-xs">
                    {item.description}
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
