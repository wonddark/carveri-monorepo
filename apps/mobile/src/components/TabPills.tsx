import { type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SubtabButton from "@carveri/shared/components/subtab-button.tsx";

type Props = {
  activeIdx: number;
  selectPill: (idx: number) => void;
  trackRef: RefObject<HTMLDivElement | null>;
  tabs: { id: string; label: string }[];
};

function TabPills(props: Readonly<Props>) {
  const { activeIdx, selectPill, trackRef, tabs } = props;
  return (
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
          {tabs.map((tab, i) => (
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
        disabled={activeIdx === tabs.length - 1}
        onClick={() => selectPill(activeIdx + 1)}
        className="border-border bg-card text-card-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ease-in-out active:scale-95 active:brightness-95 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export default TabPills;
