# Auth Pages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/login` and `/register` pages with a split-panel layout (blue brand panel left, white form right) as placeholder auth flows.

**Architecture:** Both pages are self-contained full-page components registered as top-level routes in `createBrowserRouter`, outside `RootLayout`. On submit they show a `sonner` toast and redirect to `/`. No auth API is wired.

**Tech Stack:** React 19, React Router 7 (`useNavigate`), TypeScript, Tailwind CSS v4, Shadcn/UI (`Button`, `Input`, `Label`, `Checkbox`), `sonner` (direct import, not the `next-themes` wrapper).

---

## Chunk 1: Login page, Register page, Router wiring

### Task 1: Login page

**Files:**
- Create: `src/pages/login.tsx`

- [ ] **Step 1: Create `src/pages/login.tsx`**

```tsx
import { toast } from "sonner";
import { Toaster as Sonner } from "sonner";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Sesión iniciada.");
    navigate("/");
  }

  return (
    <div className="flex min-h-screen">
      <Sonner theme="light" />

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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="mt-2 w-full">
              Iniciar sesión
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

- [ ] **Step 2: Verify in browser**

Run `pnpm dev`, navigate to `http://localhost:5173/login`. Confirm:
- Split panel visible on desktop (brand blue left, white form right)
- On mobile (< `md`) the brand panel is hidden, CarVeri badge appears above the form
- Submitting the form shows a success toast and redirects to `/`
- "Regístrate" link navigates to `/register` (will 404 until Task 3 — that's fine)

---

### Task 2: Register page

**Files:**
- Create: `src/pages/register.tsx`

- [ ] **Step 1: Create `src/pages/register.tsx`**

```tsx
import { useState } from "react";
import { toast } from "sonner";
import { Toaster as Sonner } from "sonner";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function Register() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    toast.success("Cuenta creada. ¡Bienvenido!");
    navigate("/");
  }

  return (
    <div className="flex min-h-screen">
      <Sonner theme="light" />

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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan García"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
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

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={!accepted}
            >
              Crear cuenta
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:5173/register`. Confirm:
- All five fields render correctly
- "Crear cuenta" button is disabled until checkbox is checked
- Submitting with mismatched passwords shows `toast.error("Las contraseñas no coinciden.")`
- Submitting with matching passwords + checked box shows success toast and redirects to `/`
- "Inicia sesión" link navigates to `/login`

---

### Task 3: Wire routes in router

**Files:**
- Modify: `src/data/router.tsx`

- [ ] **Step 1: Add imports and routes to `src/data/router.tsx`**

Add after the existing imports:

```tsx
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";
```

Add after the closing `}` of the `"/"` route object (inside the `createBrowserRouter` array):

```tsx
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
```

Full router array should look like:

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "reports/:vin",
        element: <Report />,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
```

- [ ] **Step 2: Verify full flow in browser**

- `/login` → form works, cross-link goes to `/register`
- `/register` → form works, cross-link goes to `/login`
- Run `pnpm build` — must complete with no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/login.tsx src/pages/register.tsx src/data/router.tsx
git commit -m "feat: add login and register placeholder pages"
```
