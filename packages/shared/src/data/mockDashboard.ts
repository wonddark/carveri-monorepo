import type {
  AccountInfo,
  BillingInfo,
  CheckoutPlan,
  EvaluationResult,
  ReportStatus,
  SavedCard,
  UserPlan,
} from "../types/dashboard.ts";

export const MOCK_PLAN: UserPlan = {
  name: "Pro",
  totalReports: 15,
  usedReports: 8,
};

export const MOCK_ACCOUNT: AccountInfo = {
  name: "John Smith",
  email: "john@example.com",
};

const STATUSES: ReportStatus[] = [
  "READY",
  "READY",
  "PROCESSING",
  "PENDING",
  "ARCHIVED",
  "READY",
  "PROCESSING",
  "PENDING",
];

const EVALUATIONS: (EvaluationResult | null)[] = [
  "BUY",
  "NEGOTIATE",
  null,
  null,
  "AVOID",
  "BUY",
  null,
  null,
];

const REQUESTED_DATES = [
  "2026-04-20T14:32:00Z",
  "2026-04-19T09:15:00Z",
  "2026-04-18T16:45:00Z",
  "2026-04-17T11:20:00Z",
  "2026-04-15T08:30:00Z",
  "2026-04-12T13:10:00Z",
  "2026-04-10T10:00:00Z",
  "2026-04-08T15:30:00Z",
];

const DELIVERED_DATES: (string | null)[] = [
  "2026-04-20T14:35:00Z",
  "2026-04-19T09:18:00Z",
  null,
  null,
  "2026-04-15T08:33:00Z",
  "2026-04-12T13:14:00Z",
  null,
  null,
];

export const MOCK_CHECKOUT_PLANS: CheckoutPlan[] = [
  { id: "plan-1", name: "1 Report", price: "$39", reports: 1 },
  { id: "plan-5", name: "5 Reports", price: "$179", reports: 5 },
  { id: "plan-10", name: "10 Reports", price: "$250", reports: 10 },
];

export const MOCK_SAVED_CARDS: SavedCard[] = [
  {
    id: "card-1",
    brand: "visa",
    last4: "4242",
    expiry: "12/27",
    holderName: "John Smith",
  },
  {
    id: "card-2",
    brand: "mastercard",
    last4: "5555",
    expiry: "09/26",
    holderName: "John Smith",
  },
];

export const MOCK_BILLING_INFO: BillingInfo = {
  name: "John Smith",
  email: "john@example.com",
  phone: "+1 (305) 555-0123",
  address: "1234 Elm Street, Apt 5",
  city: "Miami",
  state: "FL",
  zip: "33101",
  country: "United States",
};

export function getMockReportOverlay(index: number) {
  const i = index % STATUSES.length;
  const status = STATUSES[i];
  return {
    status,
    evaluationResult: EVALUATIONS[i],
    requestedAt: REQUESTED_DATES[i],
    deliveredAt: DELIVERED_DATES[i],
  };
}
