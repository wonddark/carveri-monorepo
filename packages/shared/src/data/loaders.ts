import type { LoaderFunctionArgs } from "react-router";
import { fetchVehicleReport } from "@carveri/shared/data/api.ts";
import { transformToSharedReport } from "../lib/transforms.ts";

async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  if (!import.meta.env.VITE_API_URL)
    throw new Response("API not configured", { status: 503 });
  const raw = await fetchVehicleReport(params.vin);

  return transformToSharedReport(raw.data);
}

export { reportLoader };
