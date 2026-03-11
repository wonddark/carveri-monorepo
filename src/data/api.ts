import type { VehicleReport } from "@/types/vehicle-report";

export async function fetchVehicleReport(vin: string): Promise<VehicleReport> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${vin}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch report for VIN ${vin}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<VehicleReport>;
}
