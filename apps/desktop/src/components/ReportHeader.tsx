import { Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import { cn } from "@/lib/utils";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";

export default function ReportHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-20 mx-auto flex h-14 max-w-7xl items-center justify-between",
        "border-border bg-background border-b px-4 shadow-sm",
      )}
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        className="h-8 w-fit cursor-pointer"
      >
        <LogoFullHorizontal className="h-full w-auto" />
      </button>

      {/* Right: language + actions */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <button
          type="button"
          aria-label={t("reportHeader.shareAriaLabel")}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">{t("reportHeader.share")}</span>
        </button>
        <button
          type="button"
          aria-label={t("reportHeader.downloadAriaLabel")}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Download size={13} />
          <span className="hidden sm:inline">{t("reportHeader.pdf")}</span>
        </button>
      </div>
    </header>
  );
}
