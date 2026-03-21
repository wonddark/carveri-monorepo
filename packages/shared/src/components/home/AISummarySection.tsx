import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  aiSummary: string;
}

export default function AISummarySection({ aiSummary }: Readonly<Props>) {
  const { t } = useTranslation("home");
  return (
    <Card>
      <CardContent>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <h3 className="text-sm font-semibold">{t("aiSummary")}</h3>
        </div>
        <p className="text-xs leading-relaxed">{aiSummary}</p>
      </CardContent>
    </Card>
  );
}
