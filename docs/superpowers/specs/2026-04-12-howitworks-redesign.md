# HowItWorks Redesign — Design Spec

## Goal

Replace the generic 3-col bordered card grid with an open stepper layout. Large step numbers act as visual anchors, a connector line links steps on desktop, and all copy moves from hardcoded Spanish in `static.tsx` to i18n keys.

---

## Layout

`bg-card` section — contrasts with the default-background Report Preview above it.

**Desktop (`lg:grid-cols-3`):** 3 columns, thin connector line between step numbers.  
**Mobile:** stacked vertically, no connector line.

```
        01 ————————————— 02 ————————————— 03
      [icon]            [icon]            [icon]
   Send the VIN      We analyze        Receive your
                     everything         CarVeri

  Just the VIN,    Carfax, 4 books,   A visual report
  asking price,    auction history,   with a clear
  and ZIP code.    comparables…       verdict and data.
```

### Step cell anatomy

```
  01                       ← large, text-primary, font-[Outfit] font-black text-5xl
  [icon circle h-12 w-12]  ← mt-4, icon in bg-primary/10 text-primary rounded-2xl
  Step 01                  ← badge, mt-6, font-[Outfit] text-xs font-black tracking-widest uppercase
  Title                    ← mt-2, font-[Outfit] text-xl font-bold
  Description              ← mt-2, text-muted-foreground text-[15px] leading-relaxed
```

### Connector line (desktop only)

Rendered as an absolute-positioned `<div>` inside a `relative` wrapper spanning the full grid. Thin `h-px bg-border` line at the vertical midpoint of the step numbers. Clipped to sit only between the numbers, not extend to edges.

Alternatively — simpler: add `after:` pseudo on each step except last:
```
lg:after:absolute lg:after:top-[2.5rem] lg:after:left-[calc(50%+2rem)] lg:after:right-[-calc(50%-2rem)] lg:after:h-px lg:after:bg-border
```

Use a relative+absolute approach on the outer grid for cleaner control.

---

## i18n Changes

Replace existing `howItWorks` keys — keep same keys, update copy and add per-step sub-keys.

### `en.json`
```json
"howItWorks": {
  "eyebrow": "How it works",
  "title": "Three steps.",
  "titleHighlight": "That simple.",
  "step1": {
    "num": "01",
    "title": "Send the VIN",
    "description": "Just the VIN, the asking price, and your ZIP code."
  },
  "step2": {
    "num": "02",
    "title": "We analyze everything",
    "description": "Carfax, 4 valuation books, auction history, market comparables and more."
  },
  "step3": {
    "num": "03",
    "title": "Receive your CarVeri",
    "description": "A visual report with a clear verdict and the data to back it up."
  }
}
```

### `es.json`
```json
"howItWorks": {
  "eyebrow": "Cómo funciona",
  "title": "Tres pasos.",
  "titleHighlight": "Así de simple.",
  "step1": {
    "num": "01",
    "title": "Envía el VIN",
    "description": "Solo el VIN, el precio que piden y tu ZIP code."
  },
  "step2": {
    "num": "02",
    "title": "Analizamos todo",
    "description": "Carfax, 4 libros de valuación, historial de subasta, comparables y más."
  },
  "step3": {
    "num": "03",
    "title": "Recibe tu CarVeri",
    "description": "Reporte visual con veredicto claro y los datos que lo respaldan."
  }
}
```

---

## Component Architecture

`HowItWorks.tsx` no longer imports from `static.tsx`. Steps defined as a local constant inside the component using icons as component references:

```ts
const STEPS = [
  { key: "step1", Icon: IconFileText },
  { key: "step2", Icon: IconSearch   },
  { key: "step3", Icon: IconBolt     },
] as const;
```

---

## Animation

Section header: `FadeUp`.  
Steps: `FadeUp` with stagger (`delay={i * 0.1}`).

---

## Files

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/HowItWorks.tsx` |
