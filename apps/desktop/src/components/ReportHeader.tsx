import { Download, Share2 } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import { cn } from "@/lib/utils";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import { IconChevronLeft } from "@tabler/icons-react";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export default function ReportHeader() {
  const { t } = useTranslation("common");
  const report = useLoaderData<TransformedReport>();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-20 mx-auto flex h-14 max-w-7xl items-center justify-between",
        "border-border bg-background border-b px-4 shadow-sm",
      )}
    >
      <div className="flex items-center gap-3">
        <Link to="/">
          <button className="cursor-pointer rounded-full p-1.5">
            <IconChevronLeft className="size-5" />
          </button>
        </Link>
        <LogoFullHorizontal className="h-8 w-auto" />
      </div>

      <span className="font-medium">
        {generateReportTitle({
          year: report.year,
          make: report.make,
          model: report.model,
          trim: report.trim,
        })}
      </span>

      {/* Right: language + actions */}
      <div className="flex items-center gap-2">
        <LanguageToggle variant="default" />
        <ThemeToggle />
        <button
          type="button"
          aria-label={t("reportHeader.shareAriaLabel")}
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">{t("reportHeader.share")}</span>
        </button>
        <button
          type="button"
          aria-label={t("reportHeader.downloadAriaLabel")}
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Download size={13} />
          <span className="hidden sm:inline">{t("reportHeader.pdf")}</span>
        </button>
      </div>
    </header>
  );
}
