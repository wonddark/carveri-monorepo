# Auction Photos Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fullscreen lightbox to `AuctionPhotosSubtab` so clicking any thumbnail opens an overlay with zoom, pan, and carousel navigation.

**Architecture:** Three files change. The two translation files get one new key each. `AuctionPhotosSubtab.tsx` gains two state variables, updated button handlers, and a `<Lightbox>` render at the bottom — no new files, no new dependencies.

**Tech Stack:** React 19, TypeScript, `yet-another-react-lightbox` v3.29.1 (already installed), react-i18next

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| Modify | `packages/shared/src/components/history/locales/en.json` | Add `auctionPhotos.openPhoto` key |
| Modify | `packages/shared/src/components/history/locales/es.json` | Add `auctionPhotos.openPhoto` key |
| Modify | `packages/shared/src/components/history/AuctionPhotosSubtab.tsx` | Add state, update buttons, add `<Lightbox>` |

---

## Task 1: Add i18n translation keys

**Files:**
- Modify: `packages/shared/src/components/history/locales/en.json`
- Modify: `packages/shared/src/components/history/locales/es.json`

- [ ] **Step 1: Add `openPhoto` to `en.json`**

In `packages/shared/src/components/history/locales/en.json`, add `"openPhoto"` to the existing `"auctionPhotos"` object:

```json
"auctionPhotos": {
  "heading": "Auction Photos",
  "countSuffix": "{{count}} auction photos — IAAI",
  "openPhoto": "Open photo {{index}}"
},
```

- [ ] **Step 2: Add `openPhoto` to `es.json`**

In `packages/shared/src/components/history/locales/es.json`, add `"openPhoto"` to the existing `"auctionPhotos"` object:

```json
"auctionPhotos": {
  "heading": "Fotos de Subasta",
  "countSuffix": "{{count}} fotos de subasta — IAAI",
  "openPhoto": "Abrir foto {{index}}"
},
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/history/locales/en.json \
        packages/shared/src/components/history/locales/es.json
git commit -m "feat(i18n): add openPhoto key to history/auctionPhotos namespace"
```

---

## Task 2: Implement lightbox in AuctionPhotosSubtab

**Files:**
- Modify: `packages/shared/src/components/history/AuctionPhotosSubtab.tsx`

**Reference:** The existing component (`AuctionPhotosSubtab.tsx`) renders a grid of `<button>` elements, each wrapping an `<img>`. The full current source is reproduced below for reference:

```tsx
import { useTranslation } from "react-i18next";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");

  return (
    <>
      <SubTabHeader title={t("auctionPhotos.heading")} subtitle="" />

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,320px))] gap-3">
          {photos.map((src, i) => (
            <button
              key={src}
              className="aspect-video w-full overflow-hidden rounded-xl"
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 1: Replace the file with the updated implementation**

Replace `packages/shared/src/components/history/AuctionPhotosSubtab.tsx` entirely with:

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = photos.map((src) => ({ src }));

  return (
    <>
      <SubTabHeader title={t("auctionPhotos.heading")} subtitle="" />

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,320px))] gap-3">
          {photos.map((src, i) => (
            <button
              key={src}
              aria-label={t("auctionPhotos.openPhoto", { index: i + 1 })}
              className="aspect-video w-full overflow-hidden rounded-xl"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
      />
    </>
  );
}
```

> **Note:** Do NOT add `import "yet-another-react-lightbox/styles.css"` — the CSS is already imported globally in both app entry points.

- [ ] **Step 2: Verify the build passes**

```bash
cd /path/to/carveri-portal
pnpm --filter @carveri/mobile build
```

Expected: TypeScript compilation succeeds with no errors. If there are type errors, they will be in `AuctionPhotosSubtab.tsx` — check the import paths and `Lightbox` prop types against the YARL v3 API.

- [ ] **Step 3: Smoke-test in the dev server**

```bash
pnpm dev:mobile
```

1. Navigate to a report page → Historial tab → Auction Photos subtab.
2. Click any thumbnail — the fullscreen lightbox overlay should open showing that photo.
3. Use left/right arrow keys or click the arrows — confirm carousel navigation works.
4. Scroll the mouse wheel over the image — confirm zoom in/out works.
5. Click and drag when zoomed — confirm pan works.
6. Press Esc or click outside the image — confirm lightbox closes.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/history/AuctionPhotosSubtab.tsx
git commit -m "feat(AuctionPhotosSubtab): add fullscreen lightbox with zoom and carousel"
```
