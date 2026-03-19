# Monorepo Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the single `carveri-portal` Vite app into a pnpm workspaces monorepo with `apps/mobile` (current app), `apps/desktop` (new scaffold), and `packages/shared` (shared source package).

**Architecture:** pnpm workspaces only — no Turborepo. Shared package (`@carveri/shared`) exports TypeScript source directly; each app's Vite resolves it via alias with no separate build step. Apps own their layout, routing, pages, and Tailwind theme; everything else lives in shared.

**Tech Stack:** pnpm workspaces, Vite 7, React 19, TypeScript, Tailwind v4, babel-plugin-react-compiler, shadcn/ui (radix-nova), i18next, React Router 7.

**Spec:** `docs/superpowers/specs/2026-03-19-monorepo-migration-design.md`

**Note:** This project has no tests. TDD steps are omitted. Each task ends with a git commit.

---

## File Map

### Files created from scratch
| Path | Purpose |
|---|---|
| `pnpm-workspace.yaml` | Declares workspace globs |
| `packages/shared/package.json` | `@carveri/shared` package manifest |
| `packages/shared/tsconfig.json` | TypeScript config for shared source |
| `packages/shared/components.json` | shadcn config pointing into shared src |
| `packages/shared/src/index.css` | Minimal CSS satisfying shadcn's CSS path requirement |
| `apps/mobile/package.json` | `@carveri/mobile` app manifest |
| `apps/desktop/package.json` | `@carveri/desktop` app manifest |
| `apps/desktop/index.html` | Desktop entry HTML |
| `apps/desktop/vite.config.ts` | Desktop Vite config with both aliases |
| `apps/desktop/tsconfig.json` | Desktop root tsconfig |
| `apps/desktop/tsconfig.app.json` | Desktop app tsconfig with paths |
| `apps/desktop/tsconfig.node.json` | Desktop node tsconfig for vite.config.ts |
| `apps/desktop/eslint.config.js` | Desktop ESLint config |
| `apps/desktop/components.json` | Desktop shadcn config |
| `apps/desktop/src/index.css` | Desktop Tailwind theme (copied from mobile initially) |
| `apps/desktop/src/main.tsx` | Desktop app entry |
| `apps/desktop/src/layout/root.tsx` | Desktop layout shell |
| `apps/desktop/src/data/router.tsx` | Desktop routes |

### Files moved (git mv)
| From | To |
|---|---|
| `src/` | `apps/mobile/src/` |
| `index.html` | `apps/mobile/index.html` |
| `vite.config.ts` | `apps/mobile/vite.config.ts` |
| `tsconfig.json` | `apps/mobile/tsconfig.json` |
| `tsconfig.app.json` | `apps/mobile/tsconfig.app.json` |
| `tsconfig.node.json` | `apps/mobile/tsconfig.node.json` |
| `components.json` | `apps/mobile/components.json` |
| `eslint.config.js` | `apps/mobile/eslint.config.js` |
| `apps/mobile/src/components/ui/` | `packages/shared/src/components/ui/` |
| `apps/mobile/src/components/home/` | `packages/shared/src/components/home/` |
| `apps/mobile/src/components/history/` | `packages/shared/src/components/history/` |
| `apps/mobile/src/components/market/` | `packages/shared/src/components/market/` |
| `apps/mobile/src/components/negotiate/` | `packages/shared/src/components/negotiate/` |
| `apps/mobile/src/components/verdict/` | `packages/shared/src/components/verdict/` |
| `apps/mobile/src/components/vehicle-details/` | `packages/shared/src/components/vehicle-details/` |
| `apps/mobile/src/components/ScoreRing.tsx` | `packages/shared/src/components/ScoreRing.tsx` |
| `apps/mobile/src/components/VerdictBadge.tsx` | `packages/shared/src/components/VerdictBadge.tsx` |
| `apps/mobile/src/components/ReportGauge.tsx` | `packages/shared/src/components/ReportGauge.tsx` |
| `apps/mobile/src/components/ImageCarousel.tsx` | `packages/shared/src/components/ImageCarousel.tsx` |
| `apps/mobile/src/components/LanguageToggle.tsx` | `packages/shared/src/components/LanguageToggle.tsx` |
| `apps/mobile/src/components/CarSummaryCard.tsx` | `packages/shared/src/components/CarSummaryCard.tsx` |
| `apps/mobile/src/data/api.ts` | `packages/shared/src/data/api.ts` |
| `apps/mobile/src/data/mockData.ts` | `packages/shared/src/data/mockData.ts` |
| `apps/mobile/src/data/report.ts` | `packages/shared/src/data/report.ts` |
| `apps/mobile/src/lib/utils.ts` | `packages/shared/src/lib/utils.ts` |
| `apps/mobile/src/lib/gauge.ts` | `packages/shared/src/lib/gauge.ts` |
| `apps/mobile/src/lib/i18n.ts` | `packages/shared/src/lib/i18n.ts` |
| `apps/mobile/src/types/` | `packages/shared/src/types/` |
| `apps/mobile/src/locales/` | `packages/shared/src/locales/` |

### Files that stay in apps/mobile/src/ (unchanged)
- `main.tsx`, `index.css`, `layout/root.tsx`, `data/router.tsx`
- `pages/` (all 7 page files)
- `components/AppHeader.tsx`, `components/BottomNavBar.tsx`

### Files modified in-place
| Path | What changes |
|---|---|
| Root `package.json` | Remove all deps/devDeps; add workspace scripts |
| `apps/mobile/vite.config.ts` | Add `@carveri/shared` alias |
| `apps/mobile/tsconfig.json` | Add `@carveri/shared/*` path mapping |
| `apps/mobile/tsconfig.app.json` | Add `@carveri/shared/*` path mapping |
| `apps/mobile/components.json` | Update `ui`/`utils`/`lib` aliases to `@carveri/shared/` |
| All `*.ts` / `*.tsx` in `packages/shared/src/` | Replace `"@/` with `"@carveri/shared/` |
| `apps/mobile/src/main.tsx` | Update `@/lib/i18n` → `@carveri/shared/lib/i18n` |
| `apps/mobile/src/layout/root.tsx` | Update `@/components/ui/*` → `@carveri/shared/components/ui/*` |
| `apps/mobile/src/pages/*.tsx` | Update all imports of moved paths to `@carveri/shared/` |
| `apps/mobile/src/components/AppHeader.tsx` | Update any `@/components/ui/*` imports to `@carveri/shared/` |
| `apps/mobile/src/components/BottomNavBar.tsx` | Update any `@/components/ui/*` imports to `@carveri/shared/` |

---

## Task 1: Configure workspace root

**Files:**
- Modify: `package.json`
- Create: `pnpm-workspace.yaml`

- [ ] **Step 1: Replace root `package.json` with a workspace root manifest**

  Replace the entire content of `package.json` with:

  ```json
  {
    "name": "carveri-portal",
    "private": true,
    "scripts": {
      "dev:mobile": "pnpm --filter @carveri/mobile dev",
      "dev:desktop": "pnpm --filter @carveri/desktop dev",
      "build:mobile": "pnpm --filter @carveri/mobile build",
      "build:desktop": "pnpm --filter @carveri/desktop build",
      "preview:mobile": "pnpm --filter @carveri/mobile preview",
      "preview:desktop": "pnpm --filter @carveri/desktop preview",
      "lint": "pnpm -r lint"
    }
  }
  ```

- [ ] **Step 2: Create `pnpm-workspace.yaml`**

  ```yaml
  packages:
    - 'apps/*'
    - 'packages/*'
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add package.json pnpm-workspace.yaml
  git commit -m "chore: configure pnpm workspace root"
  ```

---

## Task 2: Scaffold `packages/shared/`

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/components.json`
- Create: `packages/shared/src/index.css`

- [ ] **Step 1: Create the directory**

  ```bash
  mkdir -p packages/shared/src
  ```

- [ ] **Step 2: Create `packages/shared/package.json`**

  ```json
  {
    "name": "@carveri/shared",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "devDependencies": {
      "typescript": "~5.9.3"
    }
  }
  ```

  The `typescript` dev dependency ensures `pnpm exec tsc` resolves reliably without depending on pnpm hoisting from other packages.

- [ ] **Step 3: Create `packages/shared/tsconfig.json`**

  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.tsbuildinfo",
      "target": "ES2022",
      "useDefineForClassFields": true,
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
      "resolveJsonModule": true,
      "baseUrl": ".",
      "paths": {
        "@carveri/shared/*": ["./src/*"]
      }
    },
    "include": ["src"]
  }
  ```

- [ ] **Step 4: Create `packages/shared/components.json`**

  ```json
  {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "radix-nova",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/index.css",
      "baseColor": "zinc",
      "cssVariables": true,
      "prefix": ""
    },
    "iconLibrary": "tabler",
    "rtl": false,
    "aliases": {
      "components": "@carveri/shared/components",
      "utils": "@carveri/shared/lib/utils",
      "ui": "@carveri/shared/components/ui",
      "lib": "@carveri/shared/lib",
      "hooks": "@carveri/shared/hooks"
    },
    "menuColor": "default",
    "menuAccent": "subtle",
    "registries": {}
  }
  ```

- [ ] **Step 5: Create `packages/shared/src/index.css`**

  This file exists solely to satisfy shadcn's CSS path requirement. It is not imported by either app at runtime.

  ```css
  @import "tailwindcss";
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add packages/shared/
  git commit -m "chore: scaffold packages/shared workspace package"
  ```

---

## Task 3: Move current app to `apps/mobile/`

**Files:**
- Create: `apps/mobile/` directory with all existing app files via `git mv`
- Create: `apps/mobile/package.json`

- [ ] **Step 1: Create the apps/mobile directory**

  ```bash
  mkdir -p apps/mobile
  ```

- [ ] **Step 2: Move all app files into apps/mobile/ using git mv**

  `git mv src apps/mobile/src` is safe here: `apps/mobile/src` does not yet exist, so Git renames the directory directly rather than nesting it.

  ```bash
  git mv src apps/mobile/src
  git mv public apps/mobile/public
  git mv index.html apps/mobile/index.html
  git mv vite.config.ts apps/mobile/vite.config.ts
  git mv tsconfig.json apps/mobile/tsconfig.json
  git mv tsconfig.app.json apps/mobile/tsconfig.app.json
  git mv tsconfig.node.json apps/mobile/tsconfig.node.json
  git mv components.json apps/mobile/components.json
  git mv eslint.config.js apps/mobile/eslint.config.js
  ```

- [ ] **Step 3: Create `apps/mobile/package.json`**

  All production and dev dependencies from the old root `package.json` go here. Note: `@tailwindcss/vite` was listed under `dependencies` in the original root `package.json` — it is correctly placed under `devDependencies` here as it is a build tool.

  ```json
  {
    "name": "@carveri/mobile",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint .",
      "preview": "vite preview"
    },
    "dependencies": {
      "@carveri/shared": "workspace:*",
      "@base-ui/react": "^1.2.0",
      "@fontsource-variable/geist": "^5.2.8",
      "@hookform/resolvers": "^5.2.2",
      "@tabler/icons-react": "^3.38.0",
      "class-variance-authority": "^0.7.1",
      "clsx": "^2.1.1",
      "framer-motion": "^12.35.2",
      "html-react-parser": "^5.2.17",
      "i18next": "^25.8.18",
      "i18next-browser-languagedetector": "^8.2.1",
      "lucide-react": "^0.577.0",
      "next-themes": "^0.4.6",
      "radix-ui": "^1.4.3",
      "react": "^19.2.0",
      "react-dom": "^19.2.0",
      "react-hook-form": "^7.71.2",
      "react-i18next": "^16.5.8",
      "react-router": "^7.13.1",
      "shadcn": "^3.8.5",
      "sonner": "^2.0.7",
      "tailwind-merge": "^3.5.0",
      "tailwindcss": "^4.2.1",
      "tw-animate-css": "^1.4.0",
      "yet-another-react-lightbox": "^3.29.1",
      "yup": "^1.7.1"
    },
    "devDependencies": {
      "@eslint-react/eslint-plugin": "^2.13.0",
      "@eslint/js": "^9.39.1",
      "@stylistic/eslint-plugin": "^5.10.0",
      "@tailwindcss/vite": "^4.2.1",
      "@types/node": "^24.10.1",
      "@types/react": "^19.2.7",
      "@types/react-dom": "^19.2.3",
      "@vitejs/plugin-react": "^5.1.1",
      "babel-plugin-react-compiler": "^1.0.0",
      "eslint": "^9.39.1",
      "eslint-config-prettier": "^10.1.8",
      "eslint-plugin-react-hooks": "^7.0.1",
      "eslint-plugin-react-refresh": "^0.4.24",
      "globals": "^16.5.0",
      "prettier": "3.8.1",
      "prettier-plugin-tailwindcss": "^0.7.2",
      "typescript": "~5.9.3",
      "typescript-eslint": "^8.48.0",
      "vite": "^7.3.1"
    }
  }
  ```

- [ ] **Step 4: Run pnpm install to wire up the workspace**

  ```bash
  pnpm install
  ```

  Expected: installs packages for the workspace. `apps/mobile/node_modules` gets populated. `packages/shared` symlink appears under `apps/mobile/node_modules/@carveri/`.

- [ ] **Step 5: Commit**

  ```bash
  git add apps/mobile/ pnpm-lock.yaml
  git commit -m "chore: move app into apps/mobile workspace package"
  ```

---

## Task 4: Move shared source files to `packages/shared/src/`

**Files:**
- `git mv` all shared directories/files from `apps/mobile/src/` to `packages/shared/src/`

- [ ] **Step 1: Create destination directories, then move shared component directories**

  `git mv` does not create missing parent directories. Create them first:

  ```bash
  mkdir -p packages/shared/src/components

  git mv apps/mobile/src/components/ui packages/shared/src/components/ui
  git mv apps/mobile/src/components/home packages/shared/src/components/home
  git mv apps/mobile/src/components/history packages/shared/src/components/history
  git mv apps/mobile/src/components/market packages/shared/src/components/market
  git mv apps/mobile/src/components/negotiate packages/shared/src/components/negotiate
  git mv apps/mobile/src/components/verdict packages/shared/src/components/verdict
  git mv apps/mobile/src/components/vehicle-details packages/shared/src/components/vehicle-details
  ```

- [ ] **Step 2: Move standalone shared components**

  ```bash
  git mv apps/mobile/src/components/ScoreRing.tsx packages/shared/src/components/ScoreRing.tsx
  git mv apps/mobile/src/components/VerdictBadge.tsx packages/shared/src/components/VerdictBadge.tsx
  git mv apps/mobile/src/components/ReportGauge.tsx packages/shared/src/components/ReportGauge.tsx
  git mv apps/mobile/src/components/ImageCarousel.tsx packages/shared/src/components/ImageCarousel.tsx
  git mv apps/mobile/src/components/LanguageToggle.tsx packages/shared/src/components/LanguageToggle.tsx
  git mv apps/mobile/src/components/CarSummaryCard.tsx packages/shared/src/components/CarSummaryCard.tsx
  ```

- [ ] **Step 3: Move data, lib, types, locales**

  ```bash
  mkdir -p packages/shared/src/data
  mkdir -p packages/shared/src/lib

  git mv apps/mobile/src/data/api.ts packages/shared/src/data/api.ts
  git mv apps/mobile/src/data/mockData.ts packages/shared/src/data/mockData.ts
  git mv apps/mobile/src/data/report.ts packages/shared/src/data/report.ts
  git mv apps/mobile/src/lib/utils.ts packages/shared/src/lib/utils.ts
  git mv apps/mobile/src/lib/gauge.ts packages/shared/src/lib/gauge.ts
  git mv apps/mobile/src/lib/i18n.ts packages/shared/src/lib/i18n.ts
  git mv apps/mobile/src/types packages/shared/src/types
  git mv apps/mobile/src/locales packages/shared/src/locales
  ```

  Note: `apps/mobile/src/data/` still exists with `router.tsx` — that stays.
  Note: `apps/mobile/src/lib/` should now be empty — remove it:
  ```bash
  rmdir apps/mobile/src/lib
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add packages/shared/src/ apps/mobile/src/
  git commit -m "chore: move shared source files to packages/shared"
  ```

---

## Task 5: Rewrite `@/` aliases inside `packages/shared/src/`

All TypeScript/TSX files in `packages/shared/src/` currently use `@/` as their internal import prefix. Replace every occurrence with `@carveri/shared/` so that internal shared imports and external app imports use the same prefix.

**Files:**
- Modify: all `*.ts` and `*.tsx` in `packages/shared/src/` (in-place sed)

- [ ] **Step 1: Run the alias rewrite across all shared source files**

  Some files use single-quoted imports, others double-quoted. Both patterns must be matched:

  ```bash
  find packages/shared/src -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/|'@carveri/shared/|g; s|\"@/|\"@carveri/shared/|g" {} \;
  ```

- [ ] **Step 2: Verify the replacement looks correct**

  Spot-check a few files to confirm the rewrite applied correctly:

  ```bash
  grep -rn "@/" packages/shared/src --include="*.ts" --include="*.tsx"
  ```

  Expected output: **empty** (no remaining `@/` strings in shared source files).

  Also spot-check that `@carveri/shared/` appears correctly:

  ```bash
  grep -r '"@carveri/shared/' packages/shared/src --include="*.ts" --include="*.tsx" | head -10
  ```

  Expected: lines like `from "@carveri/shared/lib/utils"`, `from "@carveri/shared/components/ui/button"`, etc.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/shared/src/
  git commit -m "chore: rewrite @/ aliases to @carveri/shared/ in shared package"
  ```

---

## Task 6: Update `@/` imports in `apps/mobile/src/` app-specific files

App-specific files still use `@/` for everything. Now that shared source has moved, references to moved paths must become `@carveri/shared/`. Files that reference app-local paths (`@/layout/`, `@/data/router`, `@/pages/`) keep `@/`.

**Files:**
- Modify: `apps/mobile/src/main.tsx`
- Modify: `apps/mobile/src/layout/root.tsx`
- Modify: `apps/mobile/src/pages/*.tsx` (all 7 page files)
- Modify: `apps/mobile/src/components/AppHeader.tsx`
- Modify: `apps/mobile/src/components/BottomNavBar.tsx`

- [ ] **Step 1: Rewrite moved path prefixes in all mobile app-specific files**

  Some files use single-quoted imports. Both quote styles are handled by running each `sed` pattern twice (once per quote style), combined into a single pass per pattern group:

  ```bash
  # All source files in apps/mobile/src/
  APP_SRC="apps/mobile/src"

  # lib/ (utils, gauge, i18n all moved)
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/lib/|'@carveri/shared/lib/|g; s|\"@/lib/|\"@carveri/shared/lib/|g" {} \;

  # types/ (all moved)
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/types/|'@carveri/shared/types/|g; s|\"@/types/|\"@carveri/shared/types/|g" {} \;

  # data/ — only api, mockData, report moved; router stays
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/data/api|'@carveri/shared/data/api|g; s|\"@/data/api|\"@carveri/shared/data/api|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/data/mockData|'@carveri/shared/data/mockData|g; s|\"@/data/mockData|\"@carveri/shared/data/mockData|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/data/report|'@carveri/shared/data/report|g; s|\"@/data/report|\"@carveri/shared/data/report|g" {} \;

  # components/ — all sub-folders and standalone components moved
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/ui/|'@carveri/shared/components/ui/|g; s|\"@/components/ui/|\"@carveri/shared/components/ui/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/home/|'@carveri/shared/components/home/|g; s|\"@/components/home/|\"@carveri/shared/components/home/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/history/|'@carveri/shared/components/history/|g; s|\"@/components/history/|\"@carveri/shared/components/history/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/market/|'@carveri/shared/components/market/|g; s|\"@/components/market/|\"@carveri/shared/components/market/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/negotiate/|'@carveri/shared/components/negotiate/|g; s|\"@/components/negotiate/|\"@carveri/shared/components/negotiate/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/verdict/|'@carveri/shared/components/verdict/|g; s|\"@/components/verdict/|\"@carveri/shared/components/verdict/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/vehicle-details/|'@carveri/shared/components/vehicle-details/|g; s|\"@/components/vehicle-details/|\"@carveri/shared/components/vehicle-details/|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/ScoreRing|'@carveri/shared/components/ScoreRing|g; s|\"@/components/ScoreRing|\"@carveri/shared/components/ScoreRing|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/VerdictBadge|'@carveri/shared/components/VerdictBadge|g; s|\"@/components/VerdictBadge|\"@carveri/shared/components/VerdictBadge|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/ReportGauge|'@carveri/shared/components/ReportGauge|g; s|\"@/components/ReportGauge|\"@carveri/shared/components/ReportGauge|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/ImageCarousel|'@carveri/shared/components/ImageCarousel|g; s|\"@/components/ImageCarousel|\"@carveri/shared/components/ImageCarousel|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/LanguageToggle|'@carveri/shared/components/LanguageToggle|g; s|\"@/components/LanguageToggle|\"@carveri/shared/components/LanguageToggle|g" {} \;
  find "$APP_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -exec sed -i "s|'@/components/CarSummaryCard|'@carveri/shared/components/CarSummaryCard|g; s|\"@/components/CarSummaryCard|\"@carveri/shared/components/CarSummaryCard|g" {} \;
  ```

- [ ] **Step 2: Verify remaining `@/` imports are all app-local paths**

  ```bash
  grep -rn "@/" apps/mobile/src --include="*.ts" --include="*.tsx"
  ```

  Expected: only lines referencing paths that stayed in `apps/mobile/src/`:
  - `@/layout/...`
  - `@/data/router...`
  - `@/pages/...`

  If any other `@/` references appear, they are missed moves — fix them manually.

- [ ] **Step 3: Commit**

  ```bash
  git add apps/mobile/src/
  git commit -m "chore: update apps/mobile imports for moved shared paths"
  ```

---

## Task 7: Update `apps/mobile/` build configuration

**Files:**
- Modify: `apps/mobile/vite.config.ts`
- Modify: `apps/mobile/tsconfig.json`
- Modify: `apps/mobile/tsconfig.app.json`
- Modify: `apps/mobile/components.json`

- [ ] **Step 1: Replace `apps/mobile/vite.config.ts`**

  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";

  export default defineConfig({
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@carveri/shared": path.resolve(__dirname, "../../packages/shared/src"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
  ```

- [ ] **Step 2: Replace `apps/mobile/tsconfig.json`**

  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ],
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@carveri/shared/*": ["../../packages/shared/src/*"],
        "@/*": ["./src/*"]
      }
    }
  }
  ```

- [ ] **Step 3: Replace `apps/mobile/tsconfig.app.json`**

  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2022",
      "useDefineForClassFields": true,
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "types": ["vite/client"],
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
      "resolveJsonModule": true,
      "baseUrl": ".",
      "paths": {
        "@carveri/shared/*": ["../../packages/shared/src/*"],
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"]
  }
  ```

- [ ] **Step 4: Update `apps/mobile/components.json`**

  Update the `aliases` block to point `ui`, `utils`, and `lib` to the shared package. The `components` alias stays local (for any app-level components added later):

  ```json
  {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "radix-nova",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/index.css",
      "baseColor": "zinc",
      "cssVariables": true,
      "prefix": ""
    },
    "iconLibrary": "tabler",
    "rtl": false,
    "aliases": {
      "components": "@/components",
      "utils": "@carveri/shared/lib/utils",
      "ui": "@carveri/shared/components/ui",
      "lib": "@carveri/shared/lib",
      "hooks": "@carveri/shared/hooks"
    },
    "menuColor": "default",
    "menuAccent": "subtle",
    "registries": {}
  }
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add apps/mobile/vite.config.ts apps/mobile/tsconfig.json apps/mobile/tsconfig.app.json apps/mobile/components.json
  git commit -m "chore: update apps/mobile build config for monorepo aliases"
  ```

---

## Task 8: Wire workspace dependencies and verify mobile app

- [ ] **Step 1: Run pnpm install from repo root**

  ```bash
  pnpm install
  ```

  Expected: resolves `@carveri/shared: workspace:*` in `apps/mobile`; creates symlink at `apps/mobile/node_modules/@carveri/shared`.

- [ ] **Step 2: Run TypeScript check on shared package**

  ```bash
  cd packages/shared && pnpm exec tsc --noEmit
  ```

  Expected: no errors. If there are errors, they will be in files under `packages/shared/src/` — fix the specific import that failed.

- [ ] **Step 3: Run TypeScript check on mobile app**

  ```bash
  cd apps/mobile && pnpm exec tsc -b
  ```

  Expected: no errors. Common failures here are:
  - Any remaining `@/` that should be `@carveri/shared/` — fix manually
  - Missing type declarations — check that `packages/shared/src/types/` files are present

- [ ] **Step 4: Start the mobile dev server and verify it runs**

  ```bash
  pnpm dev:mobile
  ```

  Expected: Vite starts on `http://localhost:5173` with no errors in the terminal. Open the browser and verify the app loads and navigates correctly.

- [ ] **Step 5: Verify HMR works for shared and app-specific files**

  - Edit a string in `packages/shared/src/components/ScoreRing.tsx` (e.g. add a comment). The browser should hot-reload.
  - Edit a string in `apps/mobile/src/layout/root.tsx`. The browser should hot-reload.
  - Revert both changes.

- [ ] **Step 6: Commit**

  ```bash
  git add -A
  git commit -m "chore: verify apps/mobile works in monorepo"
  ```

---

## Task 9: Scaffold `apps/desktop/`

**Files:**
- Create all files listed under `apps/desktop/` in the file map above

- [ ] **Step 1: Create directory structure**

  ```bash
  mkdir -p apps/desktop/src/layout apps/desktop/src/data
  ```

  Note: `apps/desktop/src/pages/` is not created here — Git does not track empty directories, so creating it now would not be committed. Pages will be added alongside their commits in future tasks.

- [ ] **Step 2: Create `apps/desktop/package.json`**

  Same dependencies as mobile — the desktop app uses the full shared stack:

  ```json
  {
    "name": "@carveri/desktop",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint .",
      "preview": "vite preview"
    },
    "dependencies": {
      "@carveri/shared": "workspace:*",
      "@base-ui/react": "^1.2.0",
      "@fontsource-variable/geist": "^5.2.8",
      "@hookform/resolvers": "^5.2.2",
      "@tabler/icons-react": "^3.38.0",
      "class-variance-authority": "^0.7.1",
      "clsx": "^2.1.1",
      "framer-motion": "^12.35.2",
      "html-react-parser": "^5.2.17",
      "i18next": "^25.8.18",
      "i18next-browser-languagedetector": "^8.2.1",
      "lucide-react": "^0.577.0",
      "next-themes": "^0.4.6",
      "radix-ui": "^1.4.3",
      "react": "^19.2.0",
      "react-dom": "^19.2.0",
      "react-hook-form": "^7.71.2",
      "react-i18next": "^16.5.8",
      "react-router": "^7.13.1",
      "shadcn": "^3.8.5",
      "sonner": "^2.0.7",
      "tailwind-merge": "^3.5.0",
      "tailwindcss": "^4.2.1",
      "tw-animate-css": "^1.4.0",
      "yet-another-react-lightbox": "^3.29.1",
      "yup": "^1.7.1"
    },
    "devDependencies": {
      "@eslint-react/eslint-plugin": "^2.13.0",
      "@eslint/js": "^9.39.1",
      "@stylistic/eslint-plugin": "^5.10.0",
      "@tailwindcss/vite": "^4.2.1",
      "@types/node": "^24.10.1",
      "@types/react": "^19.2.7",
      "@types/react-dom": "^19.2.3",
      "@vitejs/plugin-react": "^5.1.1",
      "babel-plugin-react-compiler": "^1.0.0",
      "eslint": "^9.39.1",
      "eslint-config-prettier": "^10.1.8",
      "eslint-plugin-react-hooks": "^7.0.1",
      "eslint-plugin-react-refresh": "^0.4.24",
      "globals": "^16.5.0",
      "prettier": "3.8.1",
      "prettier-plugin-tailwindcss": "^0.7.2",
      "typescript": "~5.9.3",
      "typescript-eslint": "^8.48.0",
      "vite": "^7.3.1"
    }
  }
  ```

- [ ] **Step 3: Create `apps/desktop/index.html`**

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CarVeri</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  ```

- [ ] **Step 4: Create `apps/desktop/vite.config.ts`**

  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";

  export default defineConfig({
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@carveri/shared": path.resolve(__dirname, "../../packages/shared/src"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
  ```

- [ ] **Step 5: Create `apps/desktop/tsconfig.json`**

  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ],
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@carveri/shared/*": ["../../packages/shared/src/*"],
        "@/*": ["./src/*"]
      }
    }
  }
  ```

- [ ] **Step 6: Create `apps/desktop/tsconfig.app.json`**

  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2022",
      "useDefineForClassFields": true,
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "types": ["vite/client"],
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
      "resolveJsonModule": true,
      "baseUrl": ".",
      "paths": {
        "@carveri/shared/*": ["../../packages/shared/src/*"],
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"]
  }
  ```

- [ ] **Step 7: Create `apps/desktop/tsconfig.node.json`**

  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
      "target": "ES2023",
      "lib": ["ES2023"],
      "module": "ESNext",
      "types": ["node"],
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true
    },
    "include": ["vite.config.ts"]
  }
  ```

- [ ] **Step 8: Create `apps/desktop/eslint.config.js`**

  Same config as mobile — no file-path references in the current ESLint config:

  ```js
  import js from "@eslint/js";
  import globals from "globals";
  import reactHooks from "eslint-plugin-react-hooks";
  import reactRefresh from "eslint-plugin-react-refresh";
  import tseslint from "typescript-eslint";
  import { defineConfig, globalIgnores } from "eslint/config";
  import eslintConfigPrettier from "eslint-config-prettier";
  import eslintReact from "@eslint-react/eslint-plugin";
  import stylistic from "@stylistic/eslint-plugin";

  export default defineConfig([
    globalIgnores(["dist"]),
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
        eslintReact.configs["recommended-typescript"],
        eslintConfigPrettier,
      ],
      plugins: { "@stylistic": stylistic },
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      rules: {
        "@stylistic/jsx-curly-brace-presence": [
          "warn",
          { props: "never", children: "never", propElementValues: "always" },
        ],
      },
    },
  ]);
  ```

- [ ] **Step 9: Create `apps/desktop/components.json`**

  ```json
  {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "radix-nova",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/index.css",
      "baseColor": "zinc",
      "cssVariables": true,
      "prefix": ""
    },
    "iconLibrary": "tabler",
    "rtl": false,
    "aliases": {
      "components": "@/components",
      "utils": "@carveri/shared/lib/utils",
      "ui": "@carveri/shared/components/ui",
      "lib": "@carveri/shared/lib",
      "hooks": "@carveri/shared/hooks"
    },
    "menuColor": "default",
    "menuAccent": "subtle",
    "registries": {}
  }
  ```

- [ ] **Step 10: Create `apps/desktop/src/index.css`**

  Copy from `apps/mobile/src/index.css` as the starting point. The desktop app will diverge from this later.

  ```bash
  cp apps/mobile/src/index.css apps/desktop/src/index.css
  ```

- [ ] **Step 11: Create `apps/desktop/src/main.tsx`**

  ```tsx
  import "@carveri/shared/lib/i18n"; // must be first — initializes i18next synchronously
  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import { RouterProvider } from "react-router/dom";
  import router from "@/data/router.tsx";
  import "./index.css";
  import "yet-another-react-lightbox/styles.css";
  import "yet-another-react-lightbox/plugins/counter.css";
  import "yet-another-react-lightbox/plugins/thumbnails.css";

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
  ```

- [ ] **Step 12: Create `apps/desktop/src/layout/root.tsx`**

  Minimal desktop layout shell — just renders the outlet. The full desktop layout is out of scope for this migration.

  ```tsx
  import { Outlet } from "react-router";
  import { Toaster } from "@carveri/shared/components/ui/sonner.tsx";

  export default function RootLayout() {
    return (
      <div className="flex min-h-screen flex-col">
        <Outlet />
        <Toaster />
      </div>
    );
  }
  ```

- [ ] **Step 13: Create `apps/desktop/src/data/router.tsx`**

  Minimal scaffold — a single placeholder route. Real pages are out of scope for this migration.

  ```tsx
  import { createBrowserRouter } from "react-router";
  import RootLayout from "@/layout/root.tsx";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: (
            <div className="p-8 text-lg font-semibold">
              CarVeri Desktop — coming soon
            </div>
          ),
        },
      ],
    },
  ]);

  export default router;
  ```

- [ ] **Step 14: Run pnpm install to wire desktop deps**

  ```bash
  pnpm install
  ```

- [ ] **Step 15: Commit**

  ```bash
  git add apps/desktop/
  git commit -m "chore: scaffold apps/desktop workspace package"
  ```

---

## Task 10: Final verification

- [ ] **Step 1: TypeScript check — shared**

  ```bash
  cd packages/shared && pnpm exec tsc --noEmit
  ```

  Expected: exits with code 0, no output.

- [ ] **Step 2: TypeScript check — mobile**

  ```bash
  cd apps/mobile && pnpm exec tsc -b
  ```

  Expected: exits with code 0.

- [ ] **Step 3: TypeScript check — desktop**

  ```bash
  cd apps/desktop && pnpm exec tsc -b
  ```

  Expected: exits with code 0.

- [ ] **Step 4: Verify mobile production build**

  ```bash
  pnpm build:mobile
  ```

  Expected: Vite outputs to `apps/mobile/dist/` with no errors.

- [ ] **Step 5: Verify desktop production build**

  ```bash
  pnpm build:desktop
  ```

  Expected: Vite outputs to `apps/desktop/dist/` with no errors.

- [ ] **Step 6: Start both dev servers simultaneously and confirm HMR**

  In one terminal:
  ```bash
  pnpm dev:mobile
  ```

  In another terminal:
  ```bash
  pnpm dev:desktop
  ```

  Both should start (on different ports — desktop will default to 5174 if 5173 is taken).
  Edit `packages/shared/src/components/ScoreRing.tsx` — both dev servers should hot-reload.

- [ ] **Step 7: Final commit**

  ```bash
  git add -A
  git commit -m "chore: complete monorepo migration — apps/mobile and apps/desktop verified"
  ```

---

## Verification Checklist

- [ ] `pnpm dev:mobile` starts with no errors
- [ ] `pnpm dev:desktop` starts with no errors
- [ ] `pnpm --filter @carveri/shared tsc --noEmit` passes
- [ ] `pnpm build:mobile` passes (tsc + vite)
- [ ] `pnpm build:desktop` passes (tsc + vite)
- [ ] `pnpm lint` passes across all packages
- [ ] HMR works in both apps when editing a shared component
- [ ] HMR works in both apps when editing an app-specific file
