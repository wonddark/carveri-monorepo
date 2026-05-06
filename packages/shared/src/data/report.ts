export interface NegotiateArgument {
  id: string;
  title: string;
  body: string;
  tip: string;
}

export interface VerdictScoreItem {
  id: string;
  label: string;
  description: string;
  delta: number; // positive or negative (e.g. 1.5, -0.3)
  icon: string; // lucide-react icon name, e.g. "TrendingDown"
}

export interface HistoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type:
    | "manufacture"
    | "import"
    | "owner"
    | "title"
    | "service"
    | "auction"
    | "current"
    | "accident";
}

export interface HistoryOwner {
  id: string;
  label: string;
  type: string;
  state: string;
  periodStart: string;
  periodEnd: string;
  periodMonths: number;
  startMileage: number;
  endMileage: number;
}

export interface HistoryServiceRecord {
  id: string;
  name: string;
  type: string;
  date: string;
  mileage: number;
  details: string[];
}

export interface HistoryTitleItem {
  id: string;
  title: string;
  description: string;
}
