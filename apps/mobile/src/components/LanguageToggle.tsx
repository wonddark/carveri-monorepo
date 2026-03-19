import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  variant?: "default" | "light";
}

export default function LanguageToggle({
  variant = "default",
}: Readonly<Props>) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("es") ? "es" : "en";

  const toggle = () => {
    void i18n.changeLanguage(currentLang === "en" ? "es" : "en");
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1 rounded-full border px-2 py-2 text-xs font-semibold transition-colors duration-300 ${
        variant === "light"
          ? "bg-background/20 text-foreground/80 border-transparent"
          : "text-foreground border-border bg-transparent"
      }`}
      aria-label="Toggle language"
    >
      <Globe className="size-4" />
      {currentLang.toUpperCase()}
    </button>
  );
}
