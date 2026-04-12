import { useTranslation } from "react-i18next";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import AccidentEventCard from "./AccidentEventCard.tsx";
import { IconCircleCheck } from "@tabler/icons-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { AccidentsDetail } from "@carveri/shared/types/vehicle-report";
import { useEffect } from "react";

interface Props {
  accidents: AccidentsDetail;
}

function NoAccidents() {
  const { t } = useTranslation("history");
  return (
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
  );
}

export default function AccidentsSubtab({ accidents }: Readonly<Props>) {
  const { t } = useTranslation("history");

  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SubTabHeader
        title={t("accidents.heading")}
        subtitle={accidents.description}
      />

      {accidents.count === 0 || accidents.events.length === 0 ? (
        <NoAccidents />
      ) : (
        <div className="flex flex-col gap-3">
          {accidents.events.map((event, i) => (
            <AccidentEventCard key={event.date + i} event={event} index={i} />
          ))}
        </div>
      )}
    </>
  );
}
