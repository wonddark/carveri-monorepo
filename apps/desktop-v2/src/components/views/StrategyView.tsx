import type { AppReport } from "@/types/app-report";
import { PlaceholderView } from "./_placeholder";

interface Props { strategy: AppReport["negotiate"]["strategy"] }

export default function StrategyView({ strategy: _strategy }: Props) {
  return <PlaceholderView title="Estrategia" />;
}
