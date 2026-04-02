import type { VehicleReport } from "@carveri/shared/types/vehicle-report";
import type { VehicleList } from "@carveri/shared/types/vehicle-list.ts";

export async function getAuthToken() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: import.meta.env.VITE_API_USER,
      password: import.meta.env.VITE_API_PASS,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<{ token: string }>;
}

export async function getVehicleList() {
  const authToken = await getAuthToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}/Vehicle/all`, {
    headers: {
      Authorization: `Bearer ${authToken.token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<{ data: VehicleList }>;
}

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
