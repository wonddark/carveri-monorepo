# Adaptive Header — Design Spec

**Date:** 2026-03-18
**Route:** `/reports-v2` → `ReportPage` → `HomeTab`

## Overview

The `AppHeader` on the HomeTab starts fully transparent so the `ImageCarousel` is visible beneath it. As the user scrolls and the carousel exits the viewport, the header transitions smoothly to a solid white background. Icon and text colors adapt between the two states.

## Affected Files

- `src/components/AppHeader.tsx`
- `src/components/home/HomeTab.tsx`
- `src/pages/ReportPage.tsx`

## AppHeader

### Props

Add an optional `isTransparent?: boolean` prop (defaults to `false`).

### Positioning

- When `isTransparent` is `false` (default): keep current `sticky top-0` behavior.
- When `isTransparent` is `true`: switch to `fixed top-0` so page content scrolls behind the header.

### Styling — Two States

| Property | Transparent state | Solid state |
|---|---|---|
| Background | `bg-transparent` | `bg-white` |
| Border | `border-transparent` | `border-slate-100` |
| Logo color | `text-white` | `text-indigo-600` |
| Back arrow color | `text-white/90` | `text-slate-400` |
| Icon button bg | `bg-black/20` | `bg-slate-100` |
| Icon button color | `text-white` | `text-slate-400` |

A `transition-all duration-300` on the `<header>` element handles the crossfade between states.

### Logo shadow

When transparent, add `drop-shadow` or `text-shadow` via a utility class on the CarVeri logo text for legibility against dark imagery.

## HomeTab

### Removed

Remove the `<AppHeader />` render currently at the top of `HomeTab`. `ReportPage` owns the single header instance.

### New prop

```ts
interface Props {
  report: VehicleReport;
  onNavigate: (tab: TabId) => void;
  onCarouselVisibilityChange: (visible: boolean) => void;
}
```

### IntersectionObserver

Wrap `<ImageCarousel>` in a `div` with a `ref`. In a `useEffect`, attach an `IntersectionObserver` to that ref with `threshold: 0`. When the carousel entry's `isIntersecting` changes, call `onCarouselVisibilityChange(entry.isIntersecting)`. Disconnect the observer on cleanup.

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

## ReportPage

### State

```ts
const [isCarouselVisible, setIsCarouselVisible] = useState(true);
```

### Reset on tab change

In `handleTabChange`, reset `isCarouselVisible` to `true` whenever the tab changes. This ensures the header is transparent again if the user navigates away and returns to the home tab.

```ts
const handleTabChange = (tab: TabId) => {
  setPrevTab(activeTab);
  setActiveTab(tab);
  if (tab === "home") setIsCarouselVisible(true);
};
```

### AppHeader prop

Pass the transparency state to `AppHeader`:

```tsx
<AppHeader isTransparent={activeTab === "home" && isCarouselVisible} />
```

### Remove duplicate AppHeader

The existing `<AppHeader />` at the top of `ReportPage`'s JSX is already the correct single instance. No second header should be added.

### motion.div padding

The `motion.div` currently applies `px-4 pt-4` to all tabs. For the home tab, the carousel must render full-bleed and flush to the very top of the viewport (behind the fixed header). Apply these classes conditionally:

```tsx
className={cn(
  "space-y-3",
  activeTab !== "home" && "px-4 pt-4"
)}
```

`HomeTab` is then responsible for applying `px-4` to its own non-carousel content sections.

### HomeTab usage

```tsx
{activeTab === "home" && (
  <HomeTab
    report={report}
    onNavigate={handleTabChange}
    onCarouselVisibilityChange={setIsCarouselVisible}
  />
)}
```

## HomeTab internal layout

Since the `motion.div` no longer provides padding when `activeTab === "home"`, `HomeTab` wraps everything below the carousel in a padded container:

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

## Behavior Summary

1. User opens HomeTab — carousel is visible, header is fixed and transparent, icons are white with dark backdrop.
2. User scrolls down — carousel exits viewport, IntersectionObserver fires, `isCarouselVisible` becomes `false`, header transitions to solid white, icons revert to normal colors.
3. User scrolls back up — carousel re-enters viewport, `isCarouselVisible` becomes `true`, header returns to transparent.
4. User switches to another tab — `isCarouselVisible` resets to `true`. AppHeader receives `isTransparent={false}` (because `activeTab !== "home"`), so it stays solid for all other tabs regardless of scroll position.
