import type { AccidentsDetail } from "@carveri/shared/types/vehicle-report";
import { PlaceholderView } from "./_placeholder";

interface Props { accidents: AccidentsDetail }

export default function AccidentsView({ accidents: _accidents }: Props) {
  return <PlaceholderView title="Accidentes" />;
}
