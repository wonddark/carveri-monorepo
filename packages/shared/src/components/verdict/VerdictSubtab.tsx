import {
  Building2,
  Gauge,
  ShieldCheck,
  TrendingDown,
  Users,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { VerdictScoreItem } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import VerdictBadge from "@carveri/shared/components/VerdictBadge.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

// ICON_MAP resolves icon name strings from mock data to lucide components.
// CheckCircle is imported separately for the recommendation chip (not via ICON_MAP).
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  TrendingDown,
  ShieldCheck,
  Gauge,
  Users,
  Wrench,
  Building2,
};

function formatDelta(delta: number): string {
  const abs = Math.abs(delta);
  const formatted = abs % 1 === 0 ? abs.toFixed(0) : abs.toFixed(1);
  return delta >= 0 ? `+${formatted}` : `-${formatted}`;
}

interface Props {
  score: number;
  recommendation: "BUY" | "CONSIDER" | "AVOID";
  summary: string;
  scoreBreakdown: VerdictScoreItem[];
}

export default function VerdictSubtab(props: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const { score, recommendation, summary, scoreBreakdown } = props;
  return (
    <>
      <SubTabHeader title={t("main.heading")} subtitle={t("main.subtitle")} />

      <div className="flex flex-col gap-3">
        {/* Score card */}
        <Card className="hidden w-fit">
          <CardContent>
            <VerdictBadge
              score={score}
              verdict={recommendation}
              aiSummary={summary}
            />
          </CardContent>
        </Card>

        {/* Score breakdown card */}
        <Card>
          <CardContent>
            {scoreBreakdown.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const isPositive = item.delta >= 0;
              return (
                <div
                  key={item.id}
                  className="border-border flex items-center gap-3 border-b py-2 last:border-0"
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${isPositive ? "bg-indigo-50 dark:bg-indigo-900/80" : "bg-amber-50 dark:bg-amber-900/80"}`}
                  >
                    {Icon && (
                      <Icon
                        size={16}
                        className={
                          isPositive
                            ? "text-indigo-500 dark:text-indigo-300"
                            : "text-amber-500 dark:text-amber-300"
                        }
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={cn("shrink-0 text-sm font-black", {
                      "text-indigo-600 dark:text-indigo-200": isPositive,
                      "text-red-500 dark:text-red-200": !isPositive,
                    })}
                  >
                    {formatDelta(item.delta)}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
