import VerdictBadge from "./VerdictBadge";

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
    <div className="border-b border-slate-100 bg-white px-4 pt-4 pb-3">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h1 className="text-lg leading-tight font-black text-slate-900">
          {year} {make} {model}
        </h1>
        <span className="text-xl font-black whitespace-nowrap text-slate-900">
          ${price.toLocaleString()}
        </span>
      </div>
      <p className="mb-1 text-xs text-slate-400">{trim}</p>
      <div className="mb-0 flex items-center gap-1 text-xs text-slate-400">
        <span>{mileage.toLocaleString()} mi</span>
        <span>·</span>
        <span>{location}</span>
      </div>
      <VerdictBadge score={score} verdict={verdict} aiSummary={aiSummary} />
    </div>
  );
}
