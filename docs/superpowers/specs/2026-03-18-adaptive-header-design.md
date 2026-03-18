# Adaptive Header — Design Spec

**Date:** 2026-03-18
**Route:** `/reports-v2` → `ReportPage` (`src/pages/ReportPage.tsx`)

## Overview

The `AppHeader` on the HomeTab starts fully transparent so the `ImageCarousel` is visible beneath it. As the user scrolls and the carousel exits the viewport, the header transitions smoothly to a solid white background. Icon and text colors adapt between the two states.

## Affected Files

- `src/components/AppHeader.tsx`
- `src/components/LanguageToggle.tsx` (minor: add `variant` prop)
- `src/components/home/HomeTab.tsx`
- `src/pages/ReportPage.tsx`
- `src/index.css` (add `--header-height` CSS variable)

## Shared component impact

`AppHeader` and `LanguageToggle` are shared components used by other routes. All changes are additive: the new props (`isTransparent`, `variant`) default to `false`/`"default"` respectively, preserving existing behavior on all other routes.

---

## CSS Variable

Add to `src/index.css`:

```css
:root {
  --header-height: 52px;
}
```

This value must match the rendered height of `AppHeader` (`py-3` padding + icon height). Use `pt-[var(--header-height)]` wherever compensation for the fixed header is needed, so a single source of truth drives both.

---

## ReportPage — Structural Changes

### Header: always fixed

`AppHeader` changes from `sticky` to `fixed top-0` (see AppHeader section). Since fixed elements are removed from document flow, `<main>` must add `pt-[var(--header-height)]` to prevent content from being hidden behind the header.

### Scroll model: window-level scrolling

The current `overflow-hidden` on `<main>` exists to clip the Framer Motion horizontal slide animation. Rather than making `<main>` the scroll container (which would require threading `root` refs into the IntersectionObserver), move the overflow clip to a dedicated wrapper div inside `<main>`. This lets the window scroll naturally, so the IntersectionObserver with `root: null` (viewport) works correctly.

```tsx
<main className="flex-1 pb-24 pt-[var(--header-height)]">
  {/* overflow-hidden wrapper clips the horizontal slide animation only */}
  <div className="overflow-hidden">
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={activeTab}
        custom={direction}
        initial={{ x: direction * 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction * -60, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className={cn(activeTab !== "home" && "space-y-3 px-4 pt-4")}
      >
        {/* tab content */}
      </motion.div>
    </AnimatePresence>
  </div>
</main>
```

Note: `space-y-3 px-4 pt-4` are removed entirely from the `motion.div` for the home tab. The home tab's carousel must be full-bleed with no top gap. Each tab is responsible for its own internal spacing.

### State

```ts
const [isCarouselVisible, setIsCarouselVisible] = useState(true);
```

### Reset on tab change — only when navigating TO home

Reset `isCarouselVisible` to `true` only when switching to the home tab, so the header is transparent again when the carousel re-appears. No reset is needed when navigating between other tabs.

```ts
const handleTabChange = (tab: TabId) => {
  setPrevTab(activeTab);
  setActiveTab(tab);
  if (tab === "home") setIsCarouselVisible(true);
};
```

### AppHeader and HomeTab usage

```tsx
<AppHeader isTransparent={activeTab === "home" && isCarouselVisible} />
...
{activeTab === "home" && (
  <HomeTab
    report={report}
    onNavigate={handleTabChange}
    onCarouselVisibilityChange={setIsCarouselVisible}
  />
)}
```

`setIsCarouselVisible` is a stable React state setter, so passing it directly as the callback is safe.

---

## AppHeader

### Props

```ts
interface AppHeaderProps {
  isTransparent?: boolean; // defaults to false
}
```

### Positioning

Always `fixed top-0 z-50 w-full`. Remove the `sticky` keyword. `ReportPage` compensates with `pt-[var(--header-height)]` on `<main>`.

### Styling — Two States

| Property | Transparent (`isTransparent=true`) | Solid (`isTransparent=false`) |
|---|---|---|
| Background | `bg-transparent` | `bg-white` |
| Border bottom | `border-transparent` | `border-slate-100` |
| Logo color | `text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]` | `text-indigo-600` |
| Back arrow button | `bg-black/20 text-white/90` | `bg-transparent text-slate-400` |
| Share button | `bg-black/20 text-white` | `bg-slate-100 text-slate-400` |
| LanguageToggle variant | `"light"` | `"default"` |

Both the back arrow button and the share button get a `bg-black/20 rounded-lg` backdrop in the transparent state, ensuring legibility against dark or light vehicle imagery.

### Transition

Use `transition-[background-color,border-color,color] duration-300` on the `<header>` element — not `transition-all`, which includes non-animatable properties.

### z-index

`z-50` is sufficient. The carousel's internal absolutely-positioned elements (counter, arrows, dots) carry no explicit z-index and stack below `z-50` by default.

---

## LanguageToggle

Add an optional `variant?: "default" | "light"` prop (defaults to `"default"`). When `"light"`: use `bg-white/15 text-white` instead of the current `bg-slate-100 text-slate-500`. `AppHeader` passes `variant={isTransparent ? "light" : "default"}`.

---

## HomeTab

### Removed

Remove the `<AppHeader />` render currently at the top of `HomeTab`. `ReportPage` is the sole owner of the header instance.

### New prop

```ts
interface Props {
  report: VehicleReport;
  onNavigate: (tab: TabId) => void;
  onCarouselVisibilityChange: (visible: boolean) => void;
}
```

### IntersectionObserver

Wrap `<ImageCarousel>` in a `div` with a `ref`. Attach an `IntersectionObserver` with `threshold: 0` and `root: null` (viewport). Since the window now scrolls (not `<main>`), the carousel physically exits the viewport as the user scrolls — `root: null` fires correctly.

Include `onCarouselVisibilityChange` in the `useEffect` dependency array. In practice, `setIsCarouselVisible` (the value passed by `ReportPage`) is a stable React state setter and will not cause the observer to reconnect on re-renders:

```tsx
const carouselRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const el = carouselRef.current;
  if (!el) return;
  const observer = new IntersectionObserver(
    ([entry]) => onCarouselVisibilityChange(entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(el);
  return () => observer.disconnect();
}, [onCarouselVisibilityChange]);
```

### Internal layout

The `motion.div` provides no padding for the home tab (see ReportPage section). `HomeTab` handles its own spacing:

```tsx
<>
  <div ref={carouselRef}>
    <ImageCarousel images={report.images} />
  </div>
  <div className="space-y-3 px-4 pt-3">
    <CarSummaryCard ... />
    {/* rest of content */}
  </div>
</>
```

---

## Behavior Summary

1. User opens HomeTab — carousel is flush at the top of the viewport, header is fixed and transparent, all icons/text are white with `bg-black/20` backdrops.
2. User scrolls down — carousel exits the viewport, IntersectionObserver fires with `isIntersecting: false`, `isCarouselVisible` becomes `false`, header transitions to solid white over ~300ms.
3. User scrolls back up — carousel re-enters the viewport, `isIntersecting: true`, header returns to transparent.
4. User switches to another tab — header is solid (because `activeTab !== "home"`). When user navigates back to home, `handleTabChange` resets `isCarouselVisible` to `true` before the tab renders, so the header immediately shows transparent.
