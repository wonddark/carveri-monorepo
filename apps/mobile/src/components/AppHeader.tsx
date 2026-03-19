import { useNavigate } from "react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

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
      className={`fixed top-0 z-50 flex h-14 w-full border-b px-4 transition-[background-color,border-color,color] duration-300 ease-in-out ${
        isTransparent
          ? "border-transparent bg-transparent"
          : "border-border bg-background"
      }`}
    >
      <div className="flex flex-auto items-center justify-between gap-2">
        <button
          onClick={() => navigate(-1)}
          className={`rounded-full border p-2 transition-colors duration-300 ${
            isTransparent
              ? "bg-background/20 text-foreground/80 border-transparent"
              : "text-foreground border-border bg-transparent"
          }`}
          aria-label={t("actions.goBack")}
        >
          <ArrowLeft className="size-4" />
        </button>
        <p
          className={cn(
            "flex-auto text-lg font-bold tracking-tight transition-colors duration-300",
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

        <div className="flex items-center gap-2">
          <LanguageToggle variant={isTransparent ? "light" : "default"} />
          <button
            className={`rounded-full border p-2 transition-colors duration-300 ${
              isTransparent
                ? "bg-background/20 text-foreground/80 border-transparent"
                : "text-foreground border-border bg-transparent"
            }`}
            aria-label={t("actions.share")}
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
