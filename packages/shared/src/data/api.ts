import type { VehicleReport } from "@/types/vehicle-report";

export async function fetchVehicleReport(vin: string): Promise<VehicleReport> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${vin}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<VehicleReport>;
}
