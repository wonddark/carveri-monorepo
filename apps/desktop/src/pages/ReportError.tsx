import { Link, useRouteError } from "react-router";
import { useTranslation } from "react-i18next";

export default function ReportError() {
  const { t } = useTranslation("common");
  const error = useRouteError() as { status?: number };
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="text-5xl font-black">{error?.status ?? "?"}</p>
      <p className="text-base font-semibold">
        {error?.status === 404
          ? t("errors.reportNotFound")
          : t("errors.somethingWentWrong")}
      </p>
      <Link to="/" className="text-sm underline">
        {t("errors.goHome")}
      </Link>
    </div>
  );
}
