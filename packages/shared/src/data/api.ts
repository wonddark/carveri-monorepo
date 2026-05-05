import { auth } from "@carveri/shared/lib/auth.ts";
import type { VehicleReportResponse } from "@carveri/shared/types/vehicle-report";
import type { VehicleListResponse } from "@carveri/shared/types/vehicle-list.ts";
import type {
  RegisterPayload,
  RegisterResponse,
  SendOTPPayload,
  SendOTPResponse,
  VerifyOTPPayload,
  VerifyOTPResponse,
} from "@carveri/shared/types/auth.ts";

// ---------------------------------------------------------------------------
// Authenticated fetch wrapper
// ---------------------------------------------------------------------------

export async function fetchWithAuth(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = auth.getToken();

  if (!token) {
    globalThis.window.location.assign("/login");
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
  const refreshToken = auth.getRefreshToken() ?? token;
  const refreshResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );

  if (!refreshResponse.ok) {
    auth.clearToken();
    globalThis.window.location.assign("/login");
    return new Response(null, { status: 401 });
  }

  const refreshData = (await refreshResponse.json()) as {
    token: string;
    refreshToken?: string;
  };
  auth.setToken(refreshData.token);
  if (refreshData.refreshToken) auth.setRefreshToken(refreshData.refreshToken);

  // Retry original request once with the new token
  const retryResponse = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${refreshData.token}`,
    },
  });

  if (retryResponse.status === 401) {
    auth.clearToken();
    globalThis.window.location.assign("/login");
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
    if (response.status === 404)
      throw new Response("Not Found", { status: 404 });
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
    if (response.status === 404)
      throw new Response("Not Found", { status: 404 });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json() as Promise<VehicleReportResponse>;
}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/Client/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    if (response.status === 400)
      throw new Response("Bad Request", {
        status: 400,
        statusText: await response.json(),
      });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json();
}

export async function sendOTP(
  payload: SendOTPPayload,
): Promise<SendOTPResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/Client/send-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    if (response.status === 404)
      throw new Response("Not Found", {
        status: 400,
        statusText: await response.json(),
      });
    if (response.status === 400)
      throw new Response("Bad Request", {
        status: 400,
        statusText: await response.json(),
      });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json();
}

export async function verifyOTP(
  payload: Pick<VerifyOTPPayload, "phoneNumber" | "email" | "code">,
): Promise<VerifyOTPResponse> {
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const ip = (await ipRes.json()).ip as string;
  const fullPayload: VerifyOTPPayload = {
    ...payload,
    fingerprintHash: localStorage.getItem("fingerprintHash") || "",
    ipAddress: ip,
    deviceInfo: `${navigator.platform} / ${navigator.language} / ${screen.width}x${screen.height}`,
    userAgent: navigator.userAgent,
  };
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/Client/verify-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullPayload),
    },
  );

  if (!response.ok) {
    if (response.status === 422)
      throw new Response("Invalid Input", {
        status: 422,
        statusText: await response.json(),
      });
    if (response.status === 400)
      throw new Response("Bad Request", {
        status: 400,
        statusText: await response.json(),
      });
    throw new Response("Server Error", { status: 500 });
  }

  return response.json();
}
