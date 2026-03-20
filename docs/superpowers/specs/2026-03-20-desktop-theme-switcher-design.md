# Desktop Theme Switcher Design Spec

## Goal

Add a three-state (light / dark / system) theme switcher to the `apps/desktop` top navigation bar.

## Architecture

### Theme Provider

`next-themes` `ThemeProvider` is added to `apps/desktop/src/main.tsx` as an ancestor of `<RouterProvider>` — this ensures both `<ThemeToggle />` (inside the router) and `<Toaster />` (rendered by `RootLayout`, a router child) can call `useTheme()` successfully.

The updated render tree in `main.tsx`:

```tsx
<StrictMode>
  <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
    <RouterProvider router={router} />
  </ThemeProvider>
</StrictMode>
```

- `attribute="class"` — toggles the `.dark` class on `<html>`, matching the existing Tailwind CSS v4 dark mode setup (`@custom-variant dark (&:is(.dark *))` in `index.css`)
- `defaultTheme="system"` — follows OS preference on first visit; persisted to `localStorage` on change
- `disableTransitionOnChange` — prevents flash during theme switch
- `<StrictMode>` remains the outermost wrapper

### ThemeToggle Component

New file: `apps/desktop/src/components/ThemeToggle.tsx`

Uses `useTheme()` from `next-themes`:
- `theme` — the stored preference (`'light'`, `'dark'`, or `'system'`)
- `resolvedTheme` — the actually-rendered theme (`'light'` or `'dark'`), used to pick the trigger icon
- `setTheme` — called when user selects an option

**Trigger button icon** (based on `resolvedTheme`):
- `'dark'` → `<Moon size={15} />`
- anything else (including `undefined` during initial render) → `<Sun size={15} />`

Use a simple ternary: `resolvedTheme === 'dark' ? <Moon size={15} /> : <Sun size={15} />`

The trigger button must include `aria-label="Cambiar tema"`.

**Dropdown**: use `DropdownMenuRadioGroup` with `value={theme}` and `onValueChange={setTheme}` containing three `DropdownMenuRadioItem` entries. `DropdownMenuRadioItem` renders the active checkmark automatically via its built-in `ItemIndicator`.

Dropdown items:
| Label | Left icon | `value` |
|---|---|---|
| Claro | `<Sun size={14} />` | `'light'` |
| Oscuro | `<Moon size={14} />` | `'dark'` |
| Sistema | `<Monitor size={14} />` | `'system'` |

The `DropdownMenuContent` must use `align="end"` to prevent right-edge overflow (the trigger is in the far-right of the header).

Icons are from `lucide-react` (already used in `ReportHeader`).

### ReportHeader Integration

`apps/desktop/src/components/ReportHeader.tsx`:
- Add `<ThemeToggle />` between `<LanguageToggle />` and the Share button in the right-side controls section
- Add `dark:` variants to the header's hardcoded light-only classes so it visually responds to theme changes:
  - `bg-white` → `bg-white dark:bg-slate-900`
  - `border-slate-100` → `border-slate-100 dark:border-slate-800`
  - Text colors (`text-slate-*`) → add `dark:text-slate-*` counterparts as needed

> **Note:** Dark mode support for the other desktop components (sidebar, main content) is out of scope for this feature — only `ReportHeader` is updated since it hosts the switcher.

## Files

| File | Action |
|---|---|
| `apps/desktop/src/main.tsx` | Wrap `<RouterProvider>` with `<ThemeProvider>` (inside `<StrictMode>`) |
| `apps/desktop/src/components/ThemeToggle.tsx` | Create new component |
| `apps/desktop/src/components/ReportHeader.tsx` | Add `<ThemeToggle />` + dark mode variants to header styles |

## Constraints

- `next-themes ^0.4.6` already installed — no new dependencies
- Dark mode uses `.dark` class selector (Tailwind CSS v4, configured in `index.css`)
- Icons from `lucide-react` (already used in `ReportHeader`)
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem` from `@carveri/shared/components/ui/dropdown-menu`
- Spanish labels (`Claro`, `Oscuro`, `Sistema`) to match the rest of the UI
- No tests — verification by dev server
