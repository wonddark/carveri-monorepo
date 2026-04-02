import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Building2,
  Factory,
  FileText,
  MapPin,
  Ship,
  User,
  Wrench,
} from "lucide-react";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";

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
  accident: AlertTriangle,
};

const TYPE_BOX: Record<string, string> = {
  manufacture: "bg-slate-100 dark:bg-slate-100/20",
  import: "bg-slate-100 dark:bg-slate-100/20",
  owner: "bg-indigo-50 dark:bg-indigo-50/20",
  title: "bg-indigo-50 dark:bg-indigo-50/20",
  service: "bg-green-50 dark:bg-green-50/20",
  auction: "bg-amber-50 dark:bg-amber-50/20",
  current: "bg-indigo-600 dark:bg-indigo-600/20",
  accident: "bg-red-50 dark:bg-red-50/20",
};

const TYPE_ICON_COLOR: Record<string, string> = {
  manufacture: "text-slate-500 dark:text-slate-500/80",
  import: "text-slate-500 dark:text-slate-500/80",
  owner: "text-indigo-500 dark:text-indigo-500/80",
  title: "text-indigo-500 dark:text-indigo-500/80",
  service: "text-green-600 dark:text-green-600/80",
  auction: "text-amber-500 dark:text-amber-500/80",
  current: "text-white dark:text-white/80",
  accident: "text-red-500 dark:text-red-500/80",
};

interface Props {
  timeline: TransformedReport["historyTab"]["timeline"];
}

export default function TimelineSubtab({ timeline }: Readonly<Props>) {
  const { t } = useTranslation("history");
  return (
    <>
      <SubTabHeader
        title={t("timeline.heading")}
        subtitle={t("timeline.subtitle")}
      />

      <div className="flex flex-col gap-2">
        {timeline.map((event, i) => {
          const Icon = TYPE_ICON[event.type ?? ""];
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
                      TYPE_BOX[event.type ?? ""],
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "size-4",
                          TYPE_ICON_COLOR[event.type ?? ""],
                        )}
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
