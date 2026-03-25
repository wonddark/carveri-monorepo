import VerdictBadge from "./VerdictBadge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";

interface Props {
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  location: string;
  score: number;
  verdict: "BUY" | "CONSIDER" | "AVOID";
  aiSummary: string;
}

export default function CarSummaryCard(props: Readonly<Props>) {
  const {
    year,
    make,
    model,
    trim,
    price,
    mileage,
    location,
    score,
    verdict,
    aiSummary,
  } = props;

  return (
    <div>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{generateReportTitle({ year, make, model })}</span>
          <span>${price.toLocaleString()}</span>
        </CardTitle>
        <CardDescription>
          <span>{trim}</span>
          <div className="space-x-1">
            <span>{mileage.toLocaleString()} mi</span>
            <span>·</span>
            <span>{location}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerdictBadge score={score} verdict={verdict} aiSummary={aiSummary} />
      </CardContent>
    </div>
  );
}
