import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TimelineSubtab from "@carveri/shared/components/history/TimelineSubtab.tsx";
import AuctionPhotosSubtab from "@carveri/shared/components/history/AuctionPhotosSubtab.tsx";
import AccidentsSubtab from "@carveri/shared/components/history/AccidentsSubtab.tsx";
import OwnersSubtab from "@carveri/shared/components/history/OwnersSubtab.tsx";
import ServiceSubtab from "@carveri/shared/components/history/ServiceSubtab.tsx";
import TitleSubtab from "@carveri/shared/components/history/TitleSubtab.tsx";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import SubtabButton from "@carveri/shared/components/subtab-button.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

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
        <div className="mb-4 flex items-center gap-1">
          <button
            disabled={activeIdx === 0}
            onClick={() => selectPill(activeIdx - 1)}
            className="border-border bg-card text-card-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ease-in-out active:scale-95 active:brightness-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="relative mx-1 flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {SUBTABS.map((tab, i) => (
                <SubtabButton
                  key={tab.id}
                  onClick={() => selectPill(i)}
                  active={activeIdx === i}
                >
                  {tab.label}
                </SubtabButton>
              ))}
            </div>
          </div>

          <button
            disabled={activeIdx === SUBTABS.length - 1}
            onClick={() => selectPill(activeIdx + 1)}
            className="border-border bg-card text-card-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ease-in-out active:scale-95 active:brightness-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>

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
