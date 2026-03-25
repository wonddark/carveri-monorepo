# Auction Photos Lightbox — Design Spec

**Date:** 2026-03-25
**Component:** `packages/shared/src/components/history/AuctionPhotosSubtab.tsx`

---

## Overview

Add a fullscreen lightbox to `AuctionPhotosSubtab` so users can tap/click any thumbnail in the grid to open a fullscreen overlay with zoom, pan, and carousel navigation.

---

## Library

**`yet-another-react-lightbox` (YARL) v3.29.1** — already installed in the monorepo as a peer dependency of `@carveri/shared`. Already used in `HistorialTab.tsx` with the same library.

Plugins used:
- `Zoom` — zoom in/out (mouse wheel, pinch gesture, double-tap) and drag-to-pan when zoomed

Plugins explicitly excluded:
- `Thumbnails` — not wanted per spec
- `Inline` — not wanted; this is a fullscreen overlay, not an embedded viewer

---

## State

```ts
const [open, setOpen] = useState(false);
const [index, setIndex] = useState(0);
```

- `open` — whether the lightbox overlay is mounted and visible
- `index` — the slide to show first (set to the clicked thumbnail's position)

---

## Data Shape

```ts
const slides = photos.map((src) => ({ src }));
```

YARL expects `{ src: string }[]` for basic image slides.

---

## Interaction Model

| Action | Result |
|---|---|
| Click/tap a grid thumbnail | Opens lightbox at that image's index |
| Swipe left/right (touch) | Next / previous image |
| Arrow keys (keyboard) | Next / previous image |
| Mouse wheel / trackpad scroll | Zoom in/out |
| Pinch gesture (touch) | Zoom in/out |
| Drag / pan (when zoomed) | Pan the image |
| Click backdrop or press Esc | Close lightbox |

---

## Component Structure

`AuctionPhotosSubtab` changes:

1. Add `open` and `index` state.
2. Each grid `<button>` gets `onClick: () => { setIndex(i); setOpen(true); }` and `aria-label={t("auctionPhotos.openPhoto", { index: i + 1 })}`. Add the following keys to the `history` namespace translation files:
   - `packages/shared/src/components/history/locales/en.json` → `"openPhoto": "Open photo {{index}}"`
   - `packages/shared/src/components/history/locales/es.json` → `"openPhoto": "Abrir foto {{index}}"`
3. Render `<Lightbox>` at the bottom of the component with:
   - `open={open}`
   - `close={() => setOpen(false)}`
   - `index={index}`
   - `slides={slides}`
   - `plugins={[Zoom]}`

No new files needed. The change is self-contained to `AuctionPhotosSubtab.tsx`.

---

## YARL Import Pattern

Consistent with the existing usage in `HistorialTab.tsx`:

```ts
import { Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
```

> The CSS (`yet-another-react-lightbox/styles.css`) is already imported globally in both app entry points (`apps/mobile/src/main.tsx` and `apps/desktop/src/main.tsx`). Do NOT add a per-file CSS import in `AuctionPhotosSubtab.tsx`.

---

## Out of Scope

- Zoom controls buttons (zoom in/out UI buttons) — gesture-only is sufficient
- Custom lightbox styling beyond YARL defaults
- Thumbnails strip inside the lightbox
- Any changes to other components
