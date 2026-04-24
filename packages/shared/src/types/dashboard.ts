export type ReportStatus = "PENDING" | "PROCESSING" | "READY" | "ARCHIVED";
export type EvaluationResult = "BUY" | "NEGOTIATE" | "AVOID";

export interface UserPlan {
  name: string;
  totalReports: number;
  usedReports: number;
}

export interface ReportOrderItem {
  id: string;
  vin: string;
  vehicleName: string;
  imageThumbnail: string;
  requestedAt: string;
  deliveredAt: string | null;
  status: ReportStatus;
  evaluationResult: EvaluationResult | null;
}

export interface AccountInfo {
  name: string;
  email: string;
}

export interface DashboardData {
  plan: UserPlan;
  reports: ReportOrderItem[];
  account: AccountInfo;
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export interface CheckoutPlan {
  id: string;
  name: string;
  price: string;
  reports: number;
}

export type CardBrand = "visa" | "mastercard" | "amex";

export interface SavedCard {
  id: string;
  brand: CardBrand;
  last4: string;
  expiry: string;
  holderName: string;
}

export interface BillingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CheckoutLoaderData {
  plans: CheckoutPlan[];
  savedCards: SavedCard[];
  billing: BillingInfo;
}
