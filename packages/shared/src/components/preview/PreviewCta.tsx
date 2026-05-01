import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type PreviewCtaProps = Record<string, never>;

export default function PreviewCta(_props: Readonly<PreviewCtaProps>) {
  const { t } = useTranslation("homepage");

  return (
    <Link
      to="/login"
      className="flex w-full items-center justify-center rounded-xl bg-green-400 px-6 py-4 font-[Outfit] text-sm font-bold text-[#0a1628] transition-colors hover:bg-green-300 active:scale-95"
    >
      {t("preview.ctaLabel")}
    </Link>
  );
}
