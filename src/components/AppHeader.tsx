import { useNavigate } from "react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function AppHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
      <button
        onClick={() => navigate(-1)}
        className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
        aria-label={t('actions.goBack')}
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-lg font-black tracking-tight text-indigo-600">
          CarVeri
        </span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle />
        <button
          className="rounded-lg bg-slate-100 p-1.5 text-slate-400 hover:text-slate-600"
          aria-label={t('actions.share')}
        >
          <Share2 size={15} />
        </button>
      </div>
    </header>
  );
}
