import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { auth } from "@carveri/shared/lib/auth.ts";
import { Button } from "@carveri/shared/components/ui/button.tsx";

type PreviewCtaProps = Record<string, never>;

export default function PreviewCta(_props: Readonly<PreviewCtaProps>) {
  const { t } = useTranslation("homepage");
  const to = auth.isAuthenticated() ? "/checkout" : "/login";
  return (
    <Link to={to}>
      <Button type="button" size="lg">
        {t("preview.ctaLabel")}
      </Button>
    </Link>
  );
}
