import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { auth } from "@carveri/shared/lib/auth.ts";
import {
  fetchVehicleReport,
  getVehicleList,
} from "@carveri/shared/data/api.ts";
import { transformToSharedReport } from "../lib/transforms.ts";
import { generateReportTitle } from "../lib/formatters.ts";
import type { CheckoutLoaderData, DashboardData } from "../types/dashboard.ts";
import {
  getMockReportOverlay,
  MOCK_ACCOUNT,
  MOCK_BILLING_INFO,
  MOCK_CHECKOUT_PLANS,
  MOCK_PLAN,
  MOCK_SAVED_CARDS,
} from "./mockDashboard.ts";

/** Throws redirect to /login if no token is stored. */
export function requireAuthLoader() {
  if (!auth.isAuthenticated()) throw redirect("/login");
}

/** Throws redirect to / if the user is already authenticated.
 *  Use on /login and /register to avoid showing auth pages to logged-in users. */
export function redirectIfAuthLoader() {
  if (auth.isAuthenticated()) throw redirect("/");
}

export async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  if (!import.meta.env.VITE_API_URL)
    throw new Response("API not configured", { status: 503 });
  const raw = await fetchVehicleReport(params.id);
  return transformToSharedReport(raw.data);
}

export async function dashboardLoader(): Promise<DashboardData> {
  const vehicleListResponse = await getVehicleList();
  const reports = vehicleListResponse.data.map((item, i) => ({
    id: item.id,
    vin: item.vin,
    vehicleName: generateReportTitle({
      year: item.year,
      make: item.make,
      model: item.model,
      trim: item.trim,
    }),
    imageThumbnail: item.imageThumbnail,
    ...getMockReportOverlay(i),
  }));
  return { plan: MOCK_PLAN, reports, account: MOCK_ACCOUNT };
}

export function checkoutLoader(): CheckoutLoaderData {
  requireAuthLoader();
  return {
    plans: MOCK_CHECKOUT_PLANS,
    savedCards: MOCK_SAVED_CARDS,
    billing: MOCK_BILLING_INFO,
  };
}
