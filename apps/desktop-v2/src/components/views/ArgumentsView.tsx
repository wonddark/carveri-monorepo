import type { NegotiationArgument } from "@/types/app-report";
import { PlaceholderView } from "./_placeholder";

interface Props { args: NegotiationArgument[] }

export default function ArgumentsView({ args: _args }: Props) {
  return <PlaceholderView title="Argumentos" />;
}
