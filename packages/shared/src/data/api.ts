import { auth } from "@carveri/shared/lib/auth.ts";
import type { VehicleReportResponse } from "@carveri/shared/types/vehicle-report";
import type { VehicleListResponse } from "@carveri/shared/types/vehicle-list.ts";

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

  if (!token) {
    window.location.assign("/login");
    return new Response(null, { status: 401 });
  }

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
    window.location.assign("/login");
    return new Response(null, { status: 401 });
  }

  const { token: newToken } = (await refreshResponse.json()) as {
    token: string;
  };
  auth.setToken(newToken);

  // Retry original request once with the new token
  const retryResponse = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${newToken}`,
    },
  });

  if (retryResponse.status === 401) {
    auth.clearToken();
    window.location.assign("/login");
    return new Response(null, { status: 401 });
  }

  return retryResponse;
}

// ---------------------------------------------------------------------------
// Data API
// ---------------------------------------------------------------------------

export async function getVehicleList(): Promise<VehicleListResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/Vehicle/free-access/list?PageIndex=0&PageSize=20`,
    { headers: { Accept: "application/json" } },
  );

  if (!response.ok) {
    if (response.status === 404) throw new Response("Not Found", { status: 404 });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<VehicleListResponse>;
}

export async function fetchVehicleReport(
  id: string,
): Promise<VehicleReportResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/Vehicle/${id}/expediente`,
  );

  if (!response.ok) {
    if (response.status === 404) throw new Response("Not Found", { status: 404 });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<VehicleReportResponse>;
}
