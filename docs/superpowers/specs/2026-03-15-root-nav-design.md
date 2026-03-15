---
title: Root Nav — Login, Register & CTA Links
date: 2026-03-15
status: approved
---

## Overview

Update the `RootLayout` navigation bar to include links to `/login`, `/register`, and a primary CTA button "Reporte gratis" that always links to `/` (the home page where the VIN form lives). No auth state is needed at this stage.

---

## File to Modify

`src/layout/root.tsx`

---

## Nav Items (right-aligned)

| Label | Pattern | Destination |
|---|---|---|
| Iniciar sesión | `NavigationMenuLink asChild` → `NavLink` | `/login` |
| Registro | `NavigationMenuLink asChild` → `NavLink` | `/register` |
| Reporte gratis | `NavigationMenuItem` → `Button asChild` → `NavLink` | `/` |

**"Iniciar sesión" and "Registro"** follow the existing pattern already in `root.tsx`: `NavigationMenuLink asChild` wrapping a `NavLink`. No `Button` involved — `NavigationMenuLink` provides its own hover/focus styles.

**"Reporte gratis"** uses `Button` (default/primary variant) with `asChild` directly inside `NavigationMenuItem`, wrapping a `NavLink`. `NavigationMenuLink` is intentionally omitted for this item — a CTA does not need Radix active-state management, and using `Button asChild` avoids style conflicts.

```tsx
import { Button } from "@/components/ui/button.tsx";

// "Reporte gratis" item:
<NavigationMenuItem>
  <Button asChild>
    <NavLink to="/">Reporte gratis</NavLink>
  </Button>
</NavigationMenuItem>
```

**Right-alignment:** Add `className="ml-auto"` to the `<NavigationMenu>` component so it pushes to the right within the existing `max-w-380` container div.

---

## Auth State

None. "Reporte gratis" is always shown. When real auth is wired later, swapping to "Nuevo reporte" is a one-line conditional.

---

## No New Files

Only `src/layout/root.tsx` is modified.
