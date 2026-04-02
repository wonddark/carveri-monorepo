import type { AppReport } from "@/types/app-report";
import { PlaceholderView } from "./_placeholder";

interface Props { report: AppReport }

export default function VerdictAIView({ report: _report }: Props) {
  return <PlaceholderView title="Veredicto IA" />;
}
