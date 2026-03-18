import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("es") ? "es" : "en";

  const toggle = () => {
    void i18n.changeLanguage(currentLang === "en" ? "es" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-semibold text-slate-500"
      aria-label="Toggle language"
    >
      <Globe size={13} />
      {currentLang.toUpperCase()}
    </button>
  );
}
