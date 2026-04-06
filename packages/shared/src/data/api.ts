import { redirect } from "react-router";
import { auth } from "@carveri/shared/lib/auth.ts";
import type { VehicleReportResponse } from "@carveri/shared/types/vehicle-report";
import type { VehicleList } from "@carveri/shared/types/vehicle-list.ts";

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------

export async function login(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json() as Promise<{ token: string }>;
}

export async function register(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );
  if (!response.ok) throw new Error("Registration failed");
  return response.json() as Promise<{ token: string }>;
}

// ---------------------------------------------------------------------------
// Authenticated fetch wrapper
// ---------------------------------------------------------------------------

export async function fetchWithAuth(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = auth.getToken();

  const response = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 401) return response;

  // 401 — attempt token refresh
  const refreshResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!refreshResponse.ok) {
    auth.clearToken();
    throw redirect("/login");
  }

  const { token: newToken } = (await refreshResponse.json()) as {
    token: string;
  };
  auth.setToken(newToken);

  // Retry original request once with the new token
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${newToken}`,
    },
  });
}

// ---------------------------------------------------------------------------
// Data API
// ---------------------------------------------------------------------------

export async function getVehicleList() {
  const response = await fetchWithAuth(
    `${import.meta.env.VITE_API_URL}/Vehicle/all`,
    { headers: { Accept: "application/json" } },
  );

  if (!response.ok) {
    if (response.status === 404) throw new Response("Not Found", { status: 404 });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<{ data: VehicleList }>;
}

export async function fetchVehicleReport(
  vin: string,
): Promise<VehicleReportResponse> {
  const response = await fetchWithAuth(
    `${import.meta.env.VITE_API_URL}/Vehicle/${vin}/expediente`,
  );

  if (!response.ok) {
    if (response.status === 404) throw new Response("Not Found", { status: 404 });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<VehicleReportResponse>;
}
