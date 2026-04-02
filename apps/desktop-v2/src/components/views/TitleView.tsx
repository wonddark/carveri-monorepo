import type { TitleDetails } from "@carveri/shared/types/vehicle-report";
import { PlaceholderView } from "./_placeholder";

interface Props { title: TitleDetails[] }

export default function TitleView({ title: _title }: Props) {
  return <PlaceholderView title="Título" />;
}
