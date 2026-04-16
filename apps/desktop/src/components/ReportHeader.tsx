import { Download, Share2 } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import { IconChevronLeft } from "@tabler/icons-react";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export default function ReportHeader() {
  const { t } = useTranslation("common");
  const report = useLoaderData<TransformedReport>();

  return (
    <header className="border-border bg-card fixed inset-0 z-20 h-16 border-b">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link to="/">
            <button className="cursor-pointer rounded-full p-1.5">
              <IconChevronLeft className="size-5" />
            </button>
          </Link>
          <LogoFullHorizontal className="h-8 w-auto" />
        </div>

        <span className="text-sm font-medium">
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
            className="text-muted-foreground hover:bg-muted flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
          >
            <Share2 size={13} />
            <span className="hidden sm:inline">{t("reportHeader.share")}</span>
          </button>
          <button
            type="button"
            aria-label={t("reportHeader.downloadAriaLabel")}
            className="text-muted-foreground hover:bg-muted flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
          >
            <Download size={13} />
            <span className="hidden sm:inline">{t("reportHeader.pdf")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
