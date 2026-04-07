import { Separator } from "@carveri/shared/components/ui/separator.tsx";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";

function Footer() {
  const { t } = useTranslation("homepage");

  return (
    <footer className="bg-[#0A1628] py-10">
      <div className="mx-auto max-w-300 px-5">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <LogoFullHorizontal className="h-6 w-auto brightness-200" />
            <Separator orientation="vertical" className="h-4 bg-gray-700" />
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} CarVeri
            </span>
          </div>
          <div className="text-muted-foreground flex gap-6 text-sm">
            <Link to="/terms" className="transition-colors hover:text-gray-300">
              {t("footer.terms")}
            </Link>
            <Link
              to="/privacy"
              className="transition-colors hover:text-gray-300"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-gray-300"
            >
              {t("footer.contact")}
            </Link>
          </div>
        </div>
        <Separator className="my-6 bg-gray-800" />
        <div className="text-center">
          <p className="text-muted-foreground mx-auto max-w-150 text-xs leading-relaxed">
            {t("footer.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
