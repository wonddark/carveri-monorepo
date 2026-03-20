# Desktop Theme Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-state (light / dark / system) theme switcher dropdown to the `apps/desktop` top navigation bar.

**Architecture:** `next-themes` `ThemeProvider` wraps `RouterProvider` in `main.tsx` to provide theme context to the whole app. A new `ThemeToggle` component renders a Sun/Moon icon button that opens a `DropdownMenuRadioGroup` with three options. `ReportHeader` slots `ThemeToggle` in and gains dark mode Tailwind variants.

**Tech Stack:** React 19, `next-themes ^0.4.6` (already installed), `lucide-react`, `DropdownMenu` from `@carveri/shared/components/ui/dropdown-menu`, Tailwind CSS v4.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `apps/desktop/src/main.tsx` | Modify | Wrap `<RouterProvider>` with `<ThemeProvider>` |
| `apps/desktop/src/components/ThemeToggle.tsx` | Create | Sun/Moon trigger + Claro/Oscuro/Sistema dropdown |
| `apps/desktop/src/components/ReportHeader.tsx` | Modify | Add `<ThemeToggle />` + dark mode variants |

---

## Key Conventions

- **Path alias:** `@/` → `apps/desktop/src/`. All local imports use this.
- **Shared imports:** `@carveri/shared/components/...` or `@carveri/shared/lib/...`
- **Styling:** Tailwind CSS v4. Dark mode activates via `.dark` class on `<html>` (toggled by `next-themes`).
- **No tests** — this project has no test suite. Verification is done by running the dev server.
- **Dev server:** `pnpm dev:desktop` from the monorepo root (or `pnpm dev` inside `apps/desktop/`).

---

## Task 1: Wire ThemeProvider in main.tsx

**Files:**
- Modify: `apps/desktop/src/main.tsx`

- [ ] **Step 1: Add ThemeProvider import**

Add this import after the existing `react` imports in `apps/desktop/src/main.tsx`:

```tsx
import { ThemeProvider } from 'next-themes'
```

- [ ] **Step 2: Wrap RouterProvider**

Replace the render call body from:

```tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

To:

```tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd apps/desktop && pnpm build 2>&1 | tail -5
```

Expected: `✓ built in` with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/desktop/src/main.tsx
git commit -m "feat(desktop): wire next-themes ThemeProvider in main.tsx"
```

---

## Task 2: Create ThemeToggle component

**Files:**
- Create: `apps/desktop/src/components/ThemeToggle.tsx`

- [ ] **Step 1: Create ThemeToggle.tsx**

```tsx
// apps/desktop/src/components/ThemeToggle.tsx
import { Moon, Monitor, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@carveri/shared/components/ui/dropdown-menu'

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Cambiar tema"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          {resolvedTheme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">
            <Sun size={14} />
            Claro
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon size={14} />
            Oscuro
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Monitor size={14} />
            Sistema
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/desktop && pnpm build 2>&1 | tail -5
```

Expected: `✓ built in` with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add apps/desktop/src/components/ThemeToggle.tsx
git commit -m "feat(desktop): add ThemeToggle component with light/dark/system dropdown"
```

---

## Task 3: Integrate ThemeToggle into ReportHeader + add dark mode variants

**Files:**
- Modify: `apps/desktop/src/components/ReportHeader.tsx`

- [ ] **Step 1: Add ThemeToggle import**

Add to the imports at the top of `apps/desktop/src/components/ReportHeader.tsx`:

```tsx
import ThemeToggle from '@/components/ThemeToggle'
```

- [ ] **Step 2: Slot ThemeToggle into the right-side controls**

The current right section is:
```tsx
{/* Right: language + actions */}
<div className="flex items-center gap-2">
  <LanguageToggle />
  <button ...>Share2</button>
  <button ...>Download</button>
</div>
```

Add `<ThemeToggle />` between `<LanguageToggle />` and the Share button:

```tsx
{/* Right: language + actions */}
<div className="flex items-center gap-2">
  <LanguageToggle />
  <ThemeToggle />
  <button
    type="button"
    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
  >
    <Share2 size={13} />
    <span className="hidden sm:inline">Compartir</span>
  </button>
  <button
    type="button"
    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
  >
    <Download size={13} />
    <span className="hidden sm:inline">PDF</span>
  </button>
</div>
```

- [ ] **Step 3: Add dark mode variants to the header shell**

Update the `<header>` className from:

```tsx
<header className={cn(
  'sticky top-0 z-20 flex h-14 items-center justify-between',
  'border-b border-slate-100 bg-white px-4',
)}>
```

To:

```tsx
<header className={cn(
  'sticky top-0 z-20 flex h-14 items-center justify-between',
  'border-b border-slate-100 bg-white px-4',
  'dark:border-slate-800 dark:bg-slate-900',
)}>
```

- [ ] **Step 4: Add dark mode variants to remaining text elements**

Update the back button:
```tsx
className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
```

Update the CarVeri brand text:
```tsx
className="hidden text-base font-black tracking-tight text-slate-900 dark:text-slate-100 sm:block"
```

Update the vehicle name span:
```tsx
className="text-sm font-semibold text-slate-800 dark:text-slate-200"
```

Update the VIN badge:
```tsx
className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400"
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd apps/desktop && pnpm build 2>&1 | tail -5
```

Expected: `✓ built in` with no TypeScript errors.

- [ ] **Step 6: Start dev server and verify visually**

```bash
pnpm dev:desktop
```

Navigate to `http://localhost:5174/reports/JA4J4VA86RZ079851` (adjust port as needed).

Expected:
- Top-right of the header shows a Sun icon (in light/system-light mode) or Moon icon (in dark/system-dark mode)
- Clicking it opens a dropdown with three items: "Claro" (checked when light), "Oscuro" (checked when dark), "Sistema" (checked when system)
- Selecting "Oscuro" switches the entire page to dark mode (`.dark` class appears on `<html>`)
- The header itself changes: dark background (`bg-slate-900`), dark border, light text
- Selecting "Sistema" reverts to OS preference
- Refreshing the page preserves the selected theme (stored in `localStorage` as `theme`)

- [ ] **Step 7: Commit**

```bash
git add apps/desktop/src/components/ReportHeader.tsx
git commit -m "feat(desktop): add ThemeToggle to ReportHeader with dark mode variants"
```
