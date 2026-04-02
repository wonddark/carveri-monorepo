import type { MarketAnalysis } from "@carveri/shared/types/vehicle-report";
import { PlaceholderView } from "./_placeholder";

interface Props { market: MarketAnalysis }

export default function MarketView({ market: _market }: Props) {
  return <PlaceholderView title="Mercado" />;
}
