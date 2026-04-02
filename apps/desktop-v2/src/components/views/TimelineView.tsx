import type { Timeline } from "@carveri/shared/types/vehicle-report";
import { PlaceholderView } from "./_placeholder";

interface Props { items: Timeline }

export default function TimelineView({ items: _items }: Props) {
  return <PlaceholderView title="Timeline" />;
}
