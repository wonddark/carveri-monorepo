import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Factory,
  FileText,
  MapPin,
  Ship,
  User,
  Wrench,
} from "lucide-react";
import type { HistoryEvent } from "@carveri/shared/data/report";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

const TYPE_ICON: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  manufacture: Factory,
  import: Ship,
  owner: User,
  title: FileText,
  service: Wrench,
  auction: Building2,
  current: MapPin,
};

const TYPE_BOX: Record<string, string> = {
  manufacture: "bg-slate-100",
  import: "bg-slate-100",
  owner: "bg-indigo-50",
  title: "bg-indigo-50",
  service: "bg-green-50",
  auction: "bg-amber-50",
  current: "bg-indigo-600",
};

const TYPE_ICON_COLOR: Record<string, string> = {
  manufacture: "text-slate-500",
  import: "text-slate-500",
  owner: "text-indigo-500",
  title: "text-indigo-500",
  service: "text-green-600",
  auction: "text-amber-500",
  current: "text-white",
};

interface Props {
  timeline: HistoryEvent[];
}

export default function TimelineSubtab({ timeline }: Readonly<Props>) {
  const { t } = useTranslation("history");
  return (
    <>
      <h2 className="text-lg font-semibold">{t("timeline.heading")}</h2>
      <p className="text-muted-foreground -mt-0.5 mb-5 text-xs">
        {t("timeline.subtitle")}
      </p>

      <div className="flex flex-col gap-2">
        {timeline.map((event, i) => {
          const Icon = TYPE_ICON[event.type];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="py-2">
                <CardContent className="flex items-center gap-3 px-2">
                  <div
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-full p-2",
                      TYPE_BOX[event.type],
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn("size-4", TYPE_ICON_COLOR[event.type])}
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs font-medium">
                      {event.date}
                    </div>
                    <div className="text-sm font-medium">{event.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {event.description}
                    </div>
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
