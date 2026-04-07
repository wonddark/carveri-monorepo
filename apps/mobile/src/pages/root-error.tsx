import { useTranslation } from "react-i18next";

function RootError() {
  const { t } = useTranslation("common");

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="rounded-full bg-[#042CD7]/5 px-2.5 py-1 text-[13px] font-bold text-[#042CD7]">
        CarVeri
      </span>

      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-extrabold">{t("errors.somethingWentWrong")}</h1>
        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
          {t("errors.unexpectedError")}
        </p>
      </div>

      <div className="border-border w-full max-w-[220px] border-t" />

      <p className="text-muted-foreground/40 text-[10px] font-semibold uppercase tracking-widest">
        {t("errors.unexpectedErrorCode")}
      </p>

      <button
        type="button"
        onClick={() => globalThis.window.location.reload()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-1 rounded-md px-4 py-2 text-sm font-semibold"
      >
        {t("errors.reload")}
      </button>
    </div>
  );
}

export default RootError;
