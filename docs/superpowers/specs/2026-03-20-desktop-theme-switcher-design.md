# Desktop Theme Switcher Design Spec

## Goal

Add a three-state (light / dark / system) theme switcher to the `apps/desktop` top navigation bar.

## Architecture

### Theme Provider

`next-themes` `ThemeProvider` is added to `apps/desktop/src/main.tsx`, wrapping `<RouterProvider>`. Configuration:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
  <RouterProvider router={router} />
</ThemeProvider>
```

- `attribute="class"` — toggles the `.dark` class on `<html>`, matching the existing Tailwind CSS v4 dark mode setup in `index.css`
- `defaultTheme="system"` — follows OS preference on first visit
- `disableTransitionOnChange` — prevents flash during theme switch

This also properly wires up `sonner.tsx`'s existing `useTheme()` call, which currently has no provider.

### ThemeToggle Component

New file: `apps/desktop/src/components/ThemeToggle.tsx`

Uses `useTheme()` from `next-themes`:
- `theme` — the stored preference (`'light'`, `'dark'`, or `'system'`)
- `resolvedTheme` — the actually-rendered theme (`'light'` or `'dark'`), used to pick the button icon when `theme === 'system'`
- `setTheme` — called when user selects an option

**Button icon** (reflects current resolved state):
- `resolvedTheme === 'light'` → `<Sun>`
- `resolvedTheme === 'dark'` → `<Moon>`

**Dropdown items** (three options, in order):
| Label | Icon | Value |
|---|---|---|
| Claro | `<Sun>` | `'light'` |
| Oscuro | `<Moon>` | `'dark'` |
| Sistema | `<Monitor>` | `'system'` |

Active item shows a `<Check>` icon on the right side. Uses `DropdownMenu` from `@carveri/shared/components/ui/dropdown-menu`.

### ReportHeader Integration

`apps/desktop/src/components/ReportHeader.tsx` — `<ThemeToggle />` added to the right-side controls section, between `<LanguageToggle />` and the Share button.

## Files

| File | Action |
|---|---|
| `apps/desktop/src/main.tsx` | Wrap `<RouterProvider>` with `<ThemeProvider>` |
| `apps/desktop/src/components/ThemeToggle.tsx` | Create new component |
| `apps/desktop/src/components/ReportHeader.tsx` | Add `<ThemeToggle />` to right controls |

## Constraints

- `next-themes ^0.4.6` already installed — no new dependencies
- Dark mode uses `.dark` class selector (Tailwind CSS v4, configured in `index.css`)
- Icons from `lucide-react` (already used in `ReportHeader`)
- `DropdownMenu` from `@carveri/shared/components/ui/dropdown-menu` (already in shared)
- Spanish labels to match the rest of the UI
- No tests — verification by dev server
