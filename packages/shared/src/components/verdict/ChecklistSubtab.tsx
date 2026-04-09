import { useState } from "react";
import {
  Car,
  ClipboardCheck,
  Eye,
  FileText,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Field, FieldLabel } from "@carveri/shared/components/ui/field.tsx";
import { Checkbox } from "@carveri/shared/components/ui/checkbox.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { DiagnosisChecklistGroup } from "@carveri/shared/lib/transforms.ts";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Eye,
  Wrench,
  FileText,
  ShieldAlert,
  Car,
  ClipboardCheck,
};

interface Props {
  checklist: DiagnosisChecklistGroup[];
}

export default function ChecklistSubtab({ checklist }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const [checked, setChecked] = useState<Set<string>>(() => new Set());

  const totalItems = checklist.reduce((acc, g) => acc + g.items.length, 0);
  const completedItems = checked.size;
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <>
      <SubTabHeader title={t("checklist.heading")} subtitle="" />

      {/* Progress bar */}
      <div className="mb-4 rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            {completedItems} / {totalItems} {t("checklist.progress")}
          </span>
          <span className="font-bold text-primary">{progressPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {checklist.map((group) => {
          const CategoryIcon = ICON_MAP[group.categoryIcon] ?? FileText;
          const groupCompleted = group.items.filter((_, i) =>
            checked.has(`${group.id}-${i}`),
          ).length;

          return (
            <Card key={group.id}>
              <CardContent>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                      <CategoryIcon size={14} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold">{group.category}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {groupCompleted}/{group.items.length}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {group.items.map((item, i) => {
                    const key = `${group.id}-${i}`;
                    const isChecked = checked.has(key);
                    return (
                      <Field
                        key={item}
                        orientation="horizontal"
                        className="items-start"
                      >
                        <Checkbox
                          id={key}
                          className="mt-0.5"
                          checked={isChecked}
                          onCheckedChange={() => toggle(key)}
                        />
                        <FieldLabel
                          htmlFor={key}
                          className={cn("text-sm font-normal leading-snug", {
                            "text-muted-foreground line-through": isChecked,
                          })}
                        >
                          {item}
                        </FieldLabel>
                      </Field>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
