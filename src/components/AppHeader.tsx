import { useNavigate } from "react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils.ts";

interface AppHeaderProps {
  isTransparent?: boolean;
  showAppName?: boolean;
  title?: string;
}

export default function AppHeader(props: Readonly<AppHeaderProps>) {
  const { isTransparent = false, showAppName = true, title } = props;
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b px-4 py-3 transition-[background-color,border-color,color] duration-300 ease-in-out ${
        isTransparent
          ? "border-transparent bg-transparent"
          : "border-slate-100 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className={`rounded-lg p-1 transition-colors duration-300 ${
            isTransparent
              ? "bg-black/20 text-white/90"
              : "bg-transparent text-slate-400 hover:text-slate-600"
          }`}
          aria-label={t("actions.goBack")}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-auto items-start gap-2">
          <p
            className={cn(
              "text-lg font-bold tracking-tight transition-colors duration-300",
              {
                "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]":
                  isTransparent,
                hidden: !showAppName,
                "overflow-hidden text-sm font-medium text-nowrap text-ellipsis":
                  title,
              },
            )}
          >
            {title ?? "CarVeri"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle variant={isTransparent ? "light" : "default"} />
          <button
            className={`rounded-lg p-1.5 transition-colors duration-300 ${
              isTransparent
                ? "bg-black/20 text-white"
                : "bg-slate-100 text-slate-400 hover:text-slate-600"
            }`}
            aria-label={t("actions.share")}
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
