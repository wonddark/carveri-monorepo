import { Activity, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TimelineSubtab from "@carveri/shared/components/history/TimelineSubtab.tsx";
import AuctionHistorySubtab from "@carveri/shared/components/history/AuctionHistorySubtab.tsx";
import PastSalesSubtab from "@carveri/shared/components/history/PastSalesSubtab.tsx";
import AccidentsSubtab from "@carveri/shared/components/history/AccidentsSubtab.tsx";
import OwnersSubtab from "@carveri/shared/components/history/OwnersSubtab.tsx";
import ServiceSubtab from "@carveri/shared/components/history/ServiceSubtab.tsx";
import TitleSubtab from "@carveri/shared/components/history/TitleSubtab.tsx";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import TabPills from "@/components/TabPills.tsx";

interface Props {
  report: TransformedReport;
}

export default function HistoryTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const SUBTABS = [
    { id: "timeline", label: t("tabs.timeline") },
    { id: "auctionHistory", label: t("tabs.auctionHistory") },
    { id: "accidents", label: t("tabs.accidents") },
    { id: "owners", label: t("tabs.owners") },
    { id: "service", label: t("tabs.service") },
    { id: "title", label: t("tabs.title") },
    { id: "pastSales", label: t("tabs.pastSales") },
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function selectPill(idx: number) {
    setActiveIdx(idx);
    const track = trackRef.current;
    if (!track) return;
    const pill = track.children[idx] as HTMLElement;
    const trackCenter = track.clientWidth / 2;
    const pillCenter = pill.offsetLeft + pill.clientWidth / 2;
    track.scrollTo({ left: pillCenter - trackCenter, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <AppHeader
        showAppName={true}
        title={generateReportTitle({
          year: report.year,
          make: report.make,
          model: report.model,
        })}
        isTransparent={false}
      />

      <div className="px-4 pt-16">
        {/* Pill carousel */}
        <TabPills
          activeIdx={activeIdx}
          selectPill={selectPill}
          trackRef={trackRef}
          tabs={SUBTABS}
        />

        {/* Active subtab */}
        <Activity mode={activeIdx === 0 ? "visible" : "hidden"}>
          <TimelineSubtab timeline={report.historyTab.timeline} />
        </Activity>

        <Activity mode={activeIdx === 1 ? "visible" : "hidden"}>
          <AuctionHistorySubtab
            auctionSales={report.saleCycles.filter(
              ({ type }) => type === "auction",
            )}
            auctionPhotos={report.historyTab.auctionPhotos}
          />
        </Activity>

        <Activity mode={activeIdx === 2 ? "visible" : "hidden"}>
          <PastSalesSubtab salesCycles={report.saleCycles} />
        </Activity>

        <Activity mode={activeIdx === 3 ? "visible" : "hidden"}>
          <AccidentsSubtab accidents={report.historyTab.accidents} />
        </Activity>

        <Activity mode={activeIdx === 4 ? "visible" : "hidden"}>
          <OwnersSubtab owners={report.historyTab.owners} />
        </Activity>

        <Activity mode={activeIdx === 5 ? "visible" : "hidden"}>
          <ServiceSubtab service={report.historyTab.service} />
        </Activity>

        <Activity mode={activeIdx === 6 ? "visible" : "hidden"}>
          <TitleSubtab title={report.historyTab.title} />
        </Activity>
      </div>
    </div>
  );
}
