import { Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import { cn } from "@/lib/utils";

export default function ReportHeader() {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-20 mx-auto flex h-14 max-w-7xl items-center justify-between",
        "border-border bg-background border-b px-4 shadow-sm",
      )}
    >
      {/* Left: back + logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <img
            src="/logo.svg"
            alt="CarVeri"
            className="h-6"
            onError={(e) => {
              // Fallback if logo asset missing
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="hidden text-base font-black tracking-tight text-slate-900 sm:block dark:text-slate-100">
            CarVeri
          </span>
        </button>
      </div>

      {/* Right: language + actions */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <button
          type="button"
          aria-label="Compartir vehículo"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Compartir</span>
        </button>
        <button
          type="button"
          aria-label="Descargar PDF"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Download size={13} />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </header>
  );
}
