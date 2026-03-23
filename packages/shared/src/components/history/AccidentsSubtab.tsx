import { useTranslation } from "react-i18next";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { IconCircleCheck } from "@tabler/icons-react";
import { cn } from "@carveri/shared/lib/utils.ts";

interface Props {
  accidents: { count: number; description: string };
}

export default function AccidentsSubtab({ accidents }: Readonly<Props>) {
  const { t } = useTranslation("history");
  return (
    <>
      <SubTabHeader
        title={t("accidents.heading")}
        subtitle={accidents.description}
      />

      {accidents.count === 0 && (
        <div
          className={cn(
            "mt-2 flex max-w-120 flex-col items-center gap-2",
            "rounded-2xl border border-green-100 bg-green-50 p-8",
            "dark:border-green-700/25 dark:bg-green-800/20",
          )}
        >
          <IconCircleCheck
            size={40}
            className="text-green-500 dark:text-green-400/90"
          />
          <p className="text-sm font-bold text-green-700 dark:text-green-400/90">
            {t("accidents.cleanHistory")}
          </p>
          <p className="text-center text-xs text-green-600 dark:text-green-400/75">
            {t("accidents.noAccidents")}
          </p>
        </div>
      )}
    </>
  );
}
