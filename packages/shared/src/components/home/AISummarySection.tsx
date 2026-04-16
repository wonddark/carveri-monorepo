import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  aiSummary: string;
}

export default function AISummarySection({ aiSummary }: Readonly<Props>) {
  const { t } = useTranslation("home");
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/80 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.22)]">
      <CardContent className="px-5 py-5 lg:px-6">
        <div className="mb-3 flex items-center gap-2.5">
          <Sparkles size={15} className="text-primary" />
          <h3 className="text-[13px] font-semibold tracking-tight text-slate-800">
            {t("aiSummary")}
          </h3>
        </div>
        <p className="text-[13px] leading-6 text-slate-600">
          {aiSummary || "-"}
        </p>
      </CardContent>
    </Card>
  );
}
