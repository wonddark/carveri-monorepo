import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  aiSummary: string;
}

export default function AISummarySection({ aiSummary }: Readonly<Props>) {
  const { t } = useTranslation("home");
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-indigo-500" />
        <h3 className="text-sm font-bold text-slate-900">{t("aiSummary")}</h3>
      </div>
      <p className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
        {aiSummary}
      </p>
    </div>
  );
}
