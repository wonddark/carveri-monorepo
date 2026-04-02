import type { AppReport } from "@/types/app-report";
import { PlaceholderView } from "./_placeholder";

interface Props { costs: AppReport["negotiate"]["costs"] }

export default function CostsView({ costs: _costs }: Props) {
  return <PlaceholderView title="Costos" />;
}
