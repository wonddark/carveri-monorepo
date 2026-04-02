import { useState } from "react";
import { Eye, FileText, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type VerdictChecklistGroup } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Field, FieldLabel } from "@carveri/shared/components/ui/field.tsx";
import { Checkbox } from "@carveri/shared/components/ui/checkbox.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

// ICON_MAP resolves categoryIcon strings from mock data to lucide components.
// Check is imported separately for the checked checkbox state (not via ICON_MAP).
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Eye,
  Wrench,
  FileText,
};

interface Props {
  checklist: VerdictChecklistGroup[];
}

export default function ChecklistSubtab({ checklist }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const [checked, setChecked] = useState<Set<string>>(() => new Set());

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

      <div className="flex flex-col gap-3">
        {checklist.map((group) => {
          const CategoryIcon = ICON_MAP[group.categoryIcon];
          return (
            <Card key={group.id}>
              <CardContent>
                <div className="flex items-center gap-2">
                  {CategoryIcon && (
                    <CategoryIcon size={16} className="text-primary" />
                  )}
                  <h3 className="font-semibold">{group.category}</h3>
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
                          id={`${group.id}-${i}`}
                          className="mt-0.75"
                          checked={isChecked}
                          onCheckedChange={() => toggle(key)}
                        />
                        <FieldLabel
                          htmlFor={`${group.id}-${i}`}
                          className={cn("font-normal", {
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
