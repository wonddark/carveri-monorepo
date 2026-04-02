import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppReport, SectionId } from "@/types/app-report";

type NavItem = { id: SectionId; label: string };
type NavEntry =
  | { type: "item"; id: SectionId; label: string }
  | { type: "group"; label: string; icon: string; children: NavItem[] };

const NAV: NavEntry[] = [
  { type: "item", id: "resumen", label: "Resumen" },
  {
    type: "group",
    label: "Historial",
    icon: "🕒",
    children: [
      { id: "timeline", label: "Timeline" },
      { id: "fotos-subasta", label: "Fotos Subasta" },
      { id: "accidentes", label: "Accidentes" },
      { id: "duenos", label: "Dueños" },
      { id: "servicio", label: "Servicio" },
      { id: "titulo", label: "Título" },
    ],
  },
  { type: "item", id: "mercado", label: "Mercado" },
  { type: "item", id: "verdict-ai", label: "Veredicto IA" },
  { type: "item", id: "checklist", label: "Checklist" },
  {
    type: "group",
    label: "Negociación",
    icon: "💬",
    children: [
      { id: "estrategia", label: "Estrategia" },
      { id: "argumentos", label: "Argumentos" },
      { id: "costos", label: "Costos" },
    ],
  },
];

interface Props {
  report: AppReport;
  activeSection: SectionId;
  onNavigate: (s: SectionId) => void;
}

export default function Sidebar({ report, activeSection, onNavigate }: Props) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Historial: true,
    "Negociación": true,
  });
  const [imgIndex, setImgIndex] = useState(0);

  const toggle = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const { images } = report;
  const prevImg = () =>
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % images.length);

  return (
    <aside className="flex h-full w-60 min-w-60 flex-col overflow-y-auto border-r border-gray-200 bg-gray-50">
      {/* Image carousel */}
      <div className="p-3">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200">
          {images.length > 0 ? (
            <>
              <img
                src={images[imgIndex]}
                alt="Vehicle"
                className="h-full w-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImg}
                    className="absolute left-1 top-1/2 -translate-y-1/2 rounded bg-black/40 px-1.5 text-sm text-white hover:bg-black/60"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={nextImg}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-black/40 px-1.5 text-sm text-white hover:bg-black/60"
                  >
                    ›
                  </button>
                  <span className="absolute bottom-1 right-2 text-xs text-white drop-shadow">
                    {imgIndex + 1}/{images.length}
                  </span>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              Sin fotos
            </div>
          )}
        </div>
      </div>

      {/* Price + mileage */}
      <div className="border-b border-gray-200 px-4 pb-3">
        <p className="text-xl font-bold text-gray-900">
          ${report.price.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">
          {report.mileage.toLocaleString()} mi
        </p>
      </div>

      {/* Score card */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {report.score.toFixed(1)}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">
              Veredicto CarVeri
            </p>
            <p className="text-xs text-gray-500">{report.verdict}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        {NAV.map((entry) => {
          if (entry.type === "item") {
            const active = activeSection === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onNavigate(entry.id)}
                className={cn(
                  "flex w-full items-center border-l-2 px-4 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {entry.label}
              </button>
            );
          }

          const isOpen = openGroups[entry.label] ?? false;
          const isChildActive = entry.children.some(
            (c) => c.id === activeSection,
          );

          return (
            <div key={entry.label}>
              <button
                type="button"
                onClick={() => toggle(entry.label)}
                className={cn(
                  "flex w-full items-center justify-between border-l-2 px-4 py-2.5 text-sm font-semibold transition-colors",
                  isChildActive && !isOpen
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-transparent text-gray-600 hover:bg-gray-100",
                )}
              >
                <span>
                  {entry.icon} {entry.label}
                </span>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              {isOpen && (
                <div>
                  {entry.children.map((child) => {
                    const active = activeSection === child.id;
                    return (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onNavigate(child.id)}
                        className={cn(
                          "flex w-full items-center border-l-2 py-1.5 pl-9 pr-4 text-xs transition-colors",
                          active
                            ? "border-blue-600 bg-blue-50 font-semibold text-blue-600"
                            : "border-transparent font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700",
                        )}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* VIN footer */}
      <div className="border-t border-gray-200 px-4 py-3">
        <p className="font-mono text-xs text-gray-400">{report.vin}</p>
      </div>
    </aside>
  );
}
