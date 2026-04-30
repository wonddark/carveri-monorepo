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
    <header className="border-border/60 bg-card/95 fixed inset-x-0 top-0 z-20 h-14 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 lg:px-5">
        <Link to="/">
          <div className="flex items-center gap-2.5">
            <button className="hover:bg-muted/70 cursor-pointer rounded-full p-1.5 text-slate-600 transition-colors">
              <IconChevronLeft className="size-4" />
            </button>
            <LogoFullHorizontal className="h-7 w-auto" />
          </div>
        </Link>

        <span className="text-[13px] font-semibold tracking-tight text-slate-700">
          {generateReportTitle({
            year: report.year,
            make: report.make,
            model: report.model,
            trim: report.trim,
          })}
        </span>

        {/* Right: language + actions */}
        <div className="flex items-center gap-1.5">
          <LanguageToggle variant="default" />
          {import.meta.env.MODE === "development" ? <ThemeToggle /> : null}
          <button
            type="button"
            aria-label={t("reportHeader.shareAriaLabel")}
            className="text-muted-foreground hover:bg-muted/70 flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors"
          >
            <Share2 size={12} />
            <span className="hidden sm:inline">{t("reportHeader.share")}</span>
          </button>
          <button
            type="button"
            aria-label={t("reportHeader.downloadAriaLabel")}
            className="text-muted-foreground hover:bg-muted/70 flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors"
          >
            <Download size={12} />
            <span className="hidden sm:inline">{t("reportHeader.pdf")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
