import { useTranslation } from "react-i18next";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import { OtpLoginForm } from "@carveri/shared/components/auth";

type LoginProps = Record<string, never>;

function Login(props: Readonly<LoginProps>) {
  const {} = props;
  const { t } = useTranslation("common");

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <LogoFullHorizontal className="h-10 w-auto" />
        <div className="flex flex-col gap-2">
          <p className="text-lg leading-snug font-bold text-white">
            {t("auth.loginTagline")}
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            {t("auth.loginSubtitle")}
          </p>
        </div>
        <span className="text-[11px] text-white/30">{t("auth.copyright")}</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <OtpLoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
