import { isRouteErrorResponse, useRouteError } from "react-router";
import { useTranslation } from "react-i18next";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@carveri/shared/components/ui/button";

function goBack() {
  globalThis.window.history.back();
}

function ReportError() {
  const { t } = useTranslation("common");
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background sticky top-0 z-50 flex h-12 items-center border-b px-4 lg:h-14 lg:border-none">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="rounded-full"
          >
            <IconChevronLeft />
          </Button>
          <span className="font-display rounded-full bg-[#042CD7]/5 px-2.5 py-1 text-[13px] font-bold text-[#042CD7]">
            CarVeri
          </span>
        </div>
      </header>

      {/* Centered error content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
            is404 ? "bg-red-500/10" : "bg-yellow-500/10"
          }`}
        >
          {is404 ? "🔍" : "⚠️"}
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-extrabold">
            {is404 ? t("errors.reportNotFound") : t("errors.serverError")}
          </h1>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            {is404 ? t("errors.vinNotFound") : t("errors.serverErrorMsg")}
          </p>
        </div>

        <div className="border-border w-full max-w-[220px] border-t" />

        <p className="text-muted-foreground/40 text-[10px] font-semibold tracking-widest uppercase">
          Código · {is404 ? "404" : "500"}
        </p>

        <Button onClick={goBack} className="mt-1">
          {t("errors.goBack")}
        </Button>
      </main>
    </div>
  );
}

export default ReportError;
