import type { ServiceDetails } from "@carveri/shared/types/vehicle-report";
import { PlaceholderView } from "./_placeholder";

interface Props { records: ServiceDetails[] }

export default function ServiceView({ records: _records }: Props) {
  return <PlaceholderView title="Servicio" />;
}
