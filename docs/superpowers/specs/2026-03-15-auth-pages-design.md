---
title: Auth Pages Design — Login & Register
date: 2026-03-15
status: approved
---

## Overview

Add `/login` and `/register` pages to the CarVeri portal. Both pages use a split-panel layout (brand panel left, form right) and are placeholder-only — no auth API is connected yet.

---

## Routes

Both routes are added as **top-level entries** in `createBrowserRouter`, siblings to the existing `"/"` route. They are **not** children of `RootLayout` since they own their full-page layout.

```
/login     → Login page
/register  → Register page
```

---

## Layout

**Split panel** — two columns filling the full viewport height:

- **Left (38% width):** Solid `#042CD7` brand panel. Contains the CarVeri wordmark at the top, a page-specific tagline in the center, and a copyright notice at the bottom.
- **Right (flex-1):** White form panel. Centered vertically. Contains heading, subtitle, form fields, submit button, and a cross-link to the other page.

Both pages are self-contained components with no shared wrapper. They mount `<Sonner />` directly from the `sonner` package (not the wrapped `Toaster` from `src/components/ui/sonner.tsx`) to avoid the `next-themes` provider dependency:

```tsx
import { Toaster as Sonner } from "sonner";
// inside JSX:
<Sonner theme="light" />
```

---

## Pages

### Login (`src/pages/login.tsx`)

**Brand panel tagline:** "Análisis vehicular inteligente. / Historial, valor y riesgo en 2 minutos."

**Form fields:**
| Field | Type | Validation |
|---|---|---|
| Correo electrónico | `<Input type="email">` | Required |
| Contraseña | `<Input type="password">` | Required |

**Submit button:** "Iniciar sesión"

**On submit (placeholder):** Show `toast.success("Sesión iniciada.")` then redirect to `/`.

**Cross-link:** "¿No tienes cuenta? **Regístrate**" → navigates to `/register`.

---

### Register (`src/pages/register.tsx`)

**Brand panel tagline:** "Empieza gratis hoy. / Tu primer reporte en minutos."

**Form fields:**
| Field | Type | Validation |
|---|---|---|
| Nombre completo | `<Input type="text">` | Required |
| Correo electrónico | `<Input type="email">` | Required |
| Contraseña | `<Input type="password">` | Required |
| Confirmar contraseña | `<Input type="password">` | Required, must match password |
| Acepto los términos y condiciones | `<Checkbox>` | Must be checked |

**Submit button:** "Crear cuenta" — disabled while the T&C checkbox is unchecked.

**On submit (placeholder):** Validate that the two password fields match; if not, show `toast.error("Las contraseñas no coinciden.")` and abort. Otherwise show `toast.success("Cuenta creada. ¡Bienvenido!")` then redirect to `/`.

**Cross-link:** "¿Ya tienes cuenta? **Inicia sesión**" → navigates to `/login`.

---

## Validation

Client-side only, no library — handled in the `onSubmit` handler:

- All fields required (HTML5 `required` attribute handles empty)
- T&C checkbox: submit button is `disabled` while unchecked
- Passwords match: checked in `onSubmit`; show `toast.error("Las contraseñas no coinciden.")` and return early if they don't match

---

## Components Used

From `src/components/ui/`:
- `Button`
- `Input`
- `Label`
- `Checkbox`

Directly from the `sonner` package (bypasses `next-themes` wrapper):
- `import { Toaster as Sonner } from "sonner"`

Navigation between pages via `useNavigate` from `react-router`.

---

## Router Changes (`src/data/router.tsx`)

Add two new imports and two new top-level routes:

```tsx
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [ ... ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
```

---

## Files to Create

- `src/pages/login.tsx`
- `src/pages/register.tsx`

## Files to Modify

- `src/data/router.tsx` — add the two routes
