import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TimelineSubtab from "@carveri/shared/components/history/TimelineSubtab.tsx";
import AuctionPhotosSubtab from "@carveri/shared/components/history/AuctionPhotosSubtab.tsx";
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
    { id: "auctionPhotos", label: t("tabs.auctionPhotos") },
    { id: "accidents", label: t("tabs.accidents") },
    { id: "owners", label: t("tabs.owners") },
    { id: "service", label: t("tabs.service") },
    { id: "title", label: t("tabs.title") },
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
        {activeIdx === 0 && (
          <TimelineSubtab timeline={report.historyTab.timeline} />
        )}
        {activeIdx === 1 && (
          <AuctionPhotosSubtab photos={report.historyTab.auctionPhotos} />
        )}
        {activeIdx === 2 && (
          <AccidentsSubtab accidents={report.historyTab.accidents} />
        )}
        {activeIdx === 3 && <OwnersSubtab owners={report.historyTab.owners} />}
        {activeIdx === 4 && (
          <ServiceSubtab service={report.historyTab.service} />
        )}
        {activeIdx === 5 && <TitleSubtab title={report.historyTab.title} />}
      </div>
    </div>
  );
}
