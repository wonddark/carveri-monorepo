import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { auth } from "@carveri/shared/lib/auth.ts";
import { fetchVehicleReport } from "@carveri/shared/data/api.ts";
import { transformToSharedReport } from "../lib/transforms.ts";

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
  requireAuthLoader();
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  if (!import.meta.env.VITE_API_URL)
    throw new Response("API not configured", { status: 503 });
  const raw = await fetchVehicleReport(params.vin);
  if (raw instanceof Response) return raw;
  return transformToSharedReport(raw.data);
}
