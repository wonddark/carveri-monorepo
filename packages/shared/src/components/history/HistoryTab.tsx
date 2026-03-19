import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { VehicleReport } from "@carveri/shared/data/report";
import TimelineSubtab from "./TimelineSubtab";
import AuctionPhotosSubtab from "./AuctionPhotosSubtab";
import AccidentsSubtab from "./AccidentsSubtab";
import OwnersSubtab from "./OwnersSubtab";
import ServiceSubtab from "./ServiceSubtab";
import TitleSubtab from "./TitleSubtab";

interface Props {
  report: VehicleReport;
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
      <div className="px-4 pt-16">
        {/* Pill carousel */}
        <div className="mb-4 flex items-center gap-1">
          <button
            disabled={activeIdx === 0}
            onClick={() => selectPill(activeIdx - 1)}
            className="border-border bg-card text-card-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full border disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>

          <div
            className="relative mx-1 flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {SUBTABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => selectPill(i)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    i === activeIdx
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={activeIdx === SUBTABS.length - 1}
            onClick={() => selectPill(activeIdx + 1)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 disabled:pointer-events-none disabled:opacity-30"
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
