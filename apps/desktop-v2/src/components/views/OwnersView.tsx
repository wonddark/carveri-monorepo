import type { OwnerDetails } from "@carveri/shared/types/vehicle-report";
import { PlaceholderView } from "./_placeholder";

interface Props { owners: OwnerDetails[] }

export default function OwnersView({ owners: _owners }: Props) {
  return <PlaceholderView title="Dueños" />;
}
