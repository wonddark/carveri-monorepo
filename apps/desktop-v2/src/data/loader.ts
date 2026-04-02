import type { LoaderFunctionArgs } from "react-router";
import { fetchVehicleReport } from "@carveri/shared/data/api";
import { transformToSharedReport } from "@/lib/transforms";

export async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  const raw = await fetchVehicleReport(params.vin);
  return transformToSharedReport(raw.data);
}
