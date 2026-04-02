import type { ChecklistItem } from "@/types/app-report";
import { PlaceholderView } from "./_placeholder";

interface Props { items: ChecklistItem[] }

export default function ChecklistView({ items: _items }: Props) {
  return <PlaceholderView title="Checklist" />;
}
