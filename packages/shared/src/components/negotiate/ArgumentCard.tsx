import { Lightbulb } from "lucide-react";
import type { NegotiateArgument } from "@carveri/shared/data/report";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  argument: NegotiateArgument;
}

export default function ArgumentCard({ argument }: Readonly<Props>) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <p className="font-semibold">{argument.title}</p>
        <p className="text-sm leading-relaxed">{argument.body}</p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 dark:border-amber-500/10 dark:bg-amber-600/10">
          <Lightbulb
            size={14}
            className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-50"
          />
          <p className="text-xs text-amber-700 dark:text-amber-50">
            {argument.tip}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
