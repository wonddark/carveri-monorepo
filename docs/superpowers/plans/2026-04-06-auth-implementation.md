# Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement user-facing sign in / sign up with token persistence and auto-refresh, shared across `apps/mobile` and `apps/desktop`.

**Architecture:** A module-level auth singleton in `packages/shared/src/lib/auth.ts` holds the JWT in memory and persists it to `localStorage`. All API calls go through a `fetchWithAuth()` wrapper that injects the Bearer header and transparently retries once after calling `/auth/refresh` on a 401. React Router route loaders guard protected routes and redirect to `/login` before any data is fetched.

**Tech Stack:** React 19, React Router 7 (loaders + actions + `Form` + `useActionData`), TypeScript strict mode, pnpm monorepo.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `packages/shared/src/lib/auth.ts` | **Create** | Token store singleton (get/set/clear/isAuthenticated) |
| `packages/shared/src/data/api.ts` | **Rewrite** | `login()`, `register()`, `fetchWithAuth()`; remove `getAuthToken()` |
| `packages/shared/src/data/loaders.ts` | **Modify** | Add `requireAuthLoader`, `redirectIfAuthLoader`; guard `reportLoader` |
| `apps/mobile/src/pages/login.tsx` | **Modify** | Use RR7 `Form` + exported `action`; show inline errors |
| `apps/mobile/src/pages/register.tsx` | **Modify** | Use RR7 `Form` + exported `action`; validate passwords in action |
| `apps/mobile/src/data/router.tsx` | **Modify** | Wire `action`/`loader` to `/login` and `/register` routes |
| `apps/desktop/src/pages/login.tsx` | **Create** | Same UI as mobile login |
| `apps/desktop/src/pages/register.tsx` | **Create** | Same UI as mobile register |
| `apps/desktop/src/data/router.tsx` | **Modify** | Add `/login` and `/register` routes with `action`/`loader` |

---

## Task 1: Auth store

**Files:**
- Create: `packages/shared/src/lib/auth.ts`

- [ ] **Step 1: Create the file**

```ts
// packages/shared/src/lib/auth.ts

let _token: string | null = localStorage.getItem("cv_token");

export const auth = {
  getToken: () => _token,
  setToken: (token: string) => {
    _token = token;
    localStorage.setItem("cv_token", token);
  },
  clearToken: () => {
    _token = null;
    localStorage.removeItem("cv_token");
  },
  isAuthenticated: () => _token !== null,
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from repo root:
```bash
pnpm build:mobile
```
Expected: build succeeds (or fails only on unrelated issues — auth.ts itself has no imports to break).

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/lib/auth.ts
git commit -m "feat(auth): add token store singleton"
```

---

## Task 2: Rewrite API layer

**Files:**
- Modify: `packages/shared/src/data/api.ts`

- [ ] **Step 1: Replace the entire file**

```ts
// packages/shared/src/data/api.ts

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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build:mobile
```
Expected: build succeeds. If `noUnusedLocals` fires on anything in this file, fix it.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/data/api.ts
git commit -m "feat(auth): add login/register/fetchWithAuth, remove getAuthToken"
```

---

## Task 3: Update loaders

**Files:**
- Modify: `packages/shared/src/data/loaders.ts`

- [ ] **Step 1: Replace the entire file**

```ts
// packages/shared/src/data/loaders.ts

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
  return transformToSharedReport(raw.data);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build:mobile
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/data/loaders.ts
git commit -m "feat(auth): add requireAuthLoader and redirectIfAuthLoader"
```

---

## Task 4: Wire mobile login page

**Files:**
- Modify: `apps/mobile/src/pages/login.tsx`

- [ ] **Step 1: Replace the entire file**

The key changes from the mock version:
- `<form>` → `<Form method="post">` (React Router submits to the route's action)
- Remove `useNavigate`, `toast`, `Sonner` (action handles redirect; errors shown inline)
- Export `action` function that calls `login()`, sets token, and redirects
- `useActionData()` reads any error returned by the action

```tsx
// apps/mobile/src/pages/login.tsx

import { Form, Link, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import { auth } from "@carveri/shared/lib/auth.ts";
import { login } from "@carveri/shared/data/api.ts";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { token } = await login(email, password);
    auth.setToken(token);
    return redirect("/");
  } catch {
    return { error: "Correo o contraseña incorrectos." };
  }
}

function Login() {
  const actionData = useActionData() as { error?: string } | undefined;

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <span className="text-sm font-extrabold tracking-tight text-white">
          CarVeri
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold leading-snug text-white">
            Análisis vehicular inteligente.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Historial, valor y riesgo en 2 minutos.
          </p>
        </div>
        <span className="text-[11px] text-white/30">© 2026 CarVeri</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Mobile brand badge */}
          <div className="mb-8 flex md:hidden">
            <span className="rounded-full bg-[#042CD7]/8 px-3 py-1 text-[13px] font-bold text-[#042CD7]">
              CarVeri
            </span>
          </div>

          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground text-sm">
              Ingresa tu correo y contraseña
            </p>
          </div>

          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {actionData.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="mt-2 w-full">
              Iniciar sesión
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build:mobile
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/pages/login.tsx
git commit -m "feat(auth): wire mobile login page to real API"
```

---

## Task 5: Wire mobile register page

**Files:**
- Modify: `apps/mobile/src/pages/register.tsx`

- [ ] **Step 1: Replace the entire file**

The `accepted` state stays (controls the submit button disabled state). The action validates passwords match before calling the API. The `name` field remains in the UI for UX but is not sent to the API (it doesn't accept it).

```tsx
// apps/mobile/src/pages/register.tsx

import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import { Checkbox } from "@carveri/shared/components/ui/checkbox";
import { auth } from "@carveri/shared/lib/auth.ts";
import { register } from "@carveri/shared/data/api.ts";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden." };
  }

  try {
    const result = await register(email, password);
    if (result.token) {
      auth.setToken(result.token);
      return redirect("/");
    }
    return redirect("/login");
  } catch {
    return { error: "No se pudo crear la cuenta. Intenta con otro correo." };
  }
}

function Register() {
  const actionData = useActionData() as { error?: string } | undefined;
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <span className="text-sm font-extrabold tracking-tight text-white">
          CarVeri
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold leading-snug text-white">
            Empieza gratis hoy.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Tu primer reporte en minutos.
          </p>
        </div>
        <span className="text-[11px] text-white/30">© 2026 CarVeri</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          {/* Mobile brand badge */}
          <div className="mb-8 flex md:hidden">
            <span className="rounded-full bg-[#042CD7]/8 px-3 py-1 text-[13px] font-bold text-[#042CD7]">
              CarVeri
            </span>
          </div>

          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Crear cuenta</h1>
            <p className="text-muted-foreground text-sm">
              Llena tus datos para comenzar
            </p>
          </div>

          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {actionData.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan García"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm">Confirmar contraseña</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center gap-2.5">
              <Checkbox
                id="terms"
                checked={accepted}
                onCheckedChange={(v) => setAccepted(v === true)}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                Acepto los{" "}
                <span className="font-semibold text-[#042CD7]">
                  términos y condiciones
                </span>
              </Label>
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={!accepted}>
              Crear cuenta
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build:mobile
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/pages/register.tsx
git commit -m "feat(auth): wire mobile register page to real API"
```

---

## Task 6: Update mobile router

**Files:**
- Modify: `apps/mobile/src/data/router.tsx`

- [ ] **Step 1: Replace the entire file**

Import the exported `action` functions from the pages and wire them to the routes. Add `redirectIfAuthLoader` to `/login` and `/register`. The report route is already protected via `reportLoader` (which now calls `requireAuthLoader` internally).

```tsx
// apps/mobile/src/data/router.tsx

import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Home from "@/pages/home.tsx";
import ReportError from "@/pages/report-error.tsx";
import RootError from "@/pages/root-error.tsx";
import Login, { action as loginAction } from "@/pages/login.tsx";
import Register, { action as registerAction } from "@/pages/register.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import { reportLoader, redirectIfAuthLoader } from "@carveri/shared/data/loaders.ts";
import HomeTabSection from "@/pages/report-tabs/HomeTabSection.tsx";
import HistoryTabSection from "@/pages/report-tabs/HistoryTabSection.tsx";
import MarketTabSection from "@/pages/report-tabs/MarketTabSection.tsx";
import VerdictTabSection from "@/pages/report-tabs/VerdictTabSection.tsx";
import NegotiateTabSection from "@/pages/report-tabs/NegotiateTabSection.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      {
        id: "report",
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.vin}/home`),
          },
          { path: "home", element: <HomeTabSection /> },
          { path: "history", element: <HistoryTabSection /> },
          { path: "market", element: <MarketTabSection /> },
          { path: "verdict", element: <VerdictTabSection /> },
          { path: "negotiate", element: <NegotiateTabSection /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: redirectIfAuthLoader,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    loader: redirectIfAuthLoader,
    action: registerAction,
  },
]);

export default router;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build:mobile
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add apps/mobile/src/data/router.tsx
git commit -m "feat(auth): wire loaders and actions to mobile routes"
```

---

## Task 7: Create desktop login page

**Files:**
- Create: `apps/desktop/src/pages/login.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/desktop/src/pages/login.tsx

import { Form, Link, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import { auth } from "@carveri/shared/lib/auth.ts";
import { login } from "@carveri/shared/data/api.ts";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { token } = await login(email, password);
    auth.setToken(token);
    return redirect("/");
  } catch {
    return { error: "Correo o contraseña incorrectos." };
  }
}

function Login() {
  const actionData = useActionData() as { error?: string } | undefined;

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <span className="text-sm font-extrabold tracking-tight text-white">
          CarVeri
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold leading-snug text-white">
            Análisis vehicular inteligente.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Historial, valor y riesgo en 2 minutos.
          </p>
        </div>
        <span className="text-[11px] text-white/30">© 2026 CarVeri</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground text-sm">
              Ingresa tu correo y contraseña
            </p>
          </div>

          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {actionData.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="mt-2 w-full">
              Iniciar sesión
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build:desktop
```
Expected: build succeeds (or fails only because router.tsx hasn't imported it yet — that's fixed in Task 9).

- [ ] **Step 3: Commit**

```bash
git add apps/desktop/src/pages/login.tsx
git commit -m "feat(auth): add desktop login page"
```

---

## Task 8: Create desktop register page

**Files:**
- Create: `apps/desktop/src/pages/register.tsx`

- [ ] **Step 1: Create the file**

```tsx
// apps/desktop/src/pages/register.tsx

import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import { Checkbox } from "@carveri/shared/components/ui/checkbox";
import { auth } from "@carveri/shared/lib/auth.ts";
import { register } from "@carveri/shared/data/api.ts";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden." };
  }

  try {
    const result = await register(email, password);
    if (result.token) {
      auth.setToken(result.token);
      return redirect("/");
    }
    return redirect("/login");
  } catch {
    return { error: "No se pudo crear la cuenta. Intenta con otro correo." };
  }
}

function Register() {
  const actionData = useActionData() as { error?: string } | undefined;
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <span className="text-sm font-extrabold tracking-tight text-white">
          CarVeri
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold leading-snug text-white">
            Empieza gratis hoy.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Tu primer reporte en minutos.
          </p>
        </div>
        <span className="text-[11px] text-white/30">© 2026 CarVeri</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Crear cuenta</h1>
            <p className="text-muted-foreground text-sm">
              Llena tus datos para comenzar
            </p>
          </div>

          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {actionData.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan García"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm">Confirmar contraseña</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center gap-2.5">
              <Checkbox
                id="terms"
                checked={accepted}
                onCheckedChange={(v) => setAccepted(v === true)}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                Acepto los{" "}
                <span className="font-semibold text-[#042CD7]">
                  términos y condiciones
                </span>
              </Label>
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={!accepted}>
              Crear cuenta
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
```

- [ ] **Step 2: Commit**

```bash
git add apps/desktop/src/pages/register.tsx
git commit -m "feat(auth): add desktop register page"
```

---

## Task 9: Update desktop router

**Files:**
- Modify: `apps/desktop/src/data/router.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// apps/desktop/src/data/router.tsx

import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import ReportError from "@/pages/ReportError.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import CarVeriLanding from "@/pages/home.tsx";
import Login, { action as loginAction } from "@/pages/login.tsx";
import Register, { action as registerAction } from "@/pages/register.tsx";
import { reportLoader, redirectIfAuthLoader } from "@carveri/shared/data/loaders.ts";
import ResumenSection from "@/pages/report-sections/ResumenSection.tsx";
import TimelineSection from "@/pages/report-sections/TimelineSection.tsx";
import AuctionPhotosSection from "@/pages/report-sections/AuctionPhotosSection.tsx";
import AccidentsSection from "@/pages/report-sections/AccidentsSection.tsx";
import OwnersSection from "@/pages/report-sections/OwnersSection.tsx";
import ServiceSection from "@/pages/report-sections/ServiceSection.tsx";
import TitleSection from "@/pages/report-sections/TitleSection.tsx";
import MarketSection from "@/pages/report-sections/MarketSection.tsx";
import VerdictAiSection from "@/pages/report-sections/VerdictAiSection.tsx";
import ChecklistSection from "@/pages/report-sections/ChecklistSection.tsx";
import StrategySection from "@/pages/report-sections/StrategySection.tsx";
import ArgumentsSection from "@/pages/report-sections/ArgumentsSection.tsx";
import CostsSection from "@/pages/report-sections/CostsSection.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CarVeriLanding /> },
      {
        id: "report",
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.vin}/overview`),
          },
          { path: "overview", element: <ResumenSection /> },
          { path: "timeline", element: <TimelineSection /> },
          { path: "auction-photos", element: <AuctionPhotosSection /> },
          { path: "accidents", element: <AccidentsSection /> },
          { path: "owners", element: <OwnersSection /> },
          { path: "service", element: <ServiceSection /> },
          { path: "title", element: <TitleSection /> },
          { path: "analysis", element: <MarketSection /> },
          { path: "price-dynamics", element: <MarketSection /> },
          { path: "comparables", element: <MarketSection /> },
          { path: "verdict_ai", element: <VerdictAiSection /> },
          { path: "checklist", element: <ChecklistSection /> },
          { path: "strategy", element: <StrategySection /> },
          { path: "arguments", element: <ArgumentsSection /> },
          { path: "costs", element: <CostsSection /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: redirectIfAuthLoader,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    loader: redirectIfAuthLoader,
    action: registerAction,
  },
]);

export default router;
```

- [ ] **Step 2: Verify both apps compile**

```bash
pnpm build:mobile && pnpm build:desktop
```
Expected: both builds succeed with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add apps/desktop/src/data/router.tsx
git commit -m "feat(auth): add login/register routes to desktop router"
```

---

## Self-Review Checklist

- [x] **Auth store** — `cv_token` key, in-memory + localStorage, sync `getToken()` ✓
- [x] **`login()` / `register()`** — POST with JSON body, throw on non-2xx ✓
- [x] **`fetchWithAuth()`** — injects Bearer, 401 → refresh → retry once → clearToken + redirect('/login') ✓
- [x] **`getAuthToken()` removed** — not present in new api.ts ✓
- [x] **`requireAuthLoader`** — redirects to /login if no token ✓
- [x] **`redirectIfAuthLoader`** — redirects to / if already authenticated ✓
- [x] **`reportLoader` guards** — calls `requireAuthLoader()` at top ✓
- [x] **Mobile login** — `Form` + `action` + inline error ✓
- [x] **Mobile register** — `Form` + `action` + password validation in action + inline error ✓
- [x] **Mobile router** — `action`/`loader` wired to `/login` and `/register` ✓
- [x] **Desktop login** — created ✓
- [x] **Desktop register** — created ✓
- [x] **Desktop router** — `/login` and `/register` routes with `action`/`loader` ✓
- [x] **Type consistency** — `auth.setToken`, `auth.clearToken`, `auth.isAuthenticated`, `auth.getToken` consistent across all files ✓
- [x] **`redirectIfAuthLoader` spelling** — consistent in loaders.ts, mobile router, desktop router ✓
