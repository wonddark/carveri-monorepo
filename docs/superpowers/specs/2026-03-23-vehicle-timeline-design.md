# Vehicle Timeline Transform — Design Spec

**Date:** 2026-03-23
**Status:** Approved

## Problem

`transformToSharedReport` currently returns `historyTab.timeline: []`. The history tab (both mobile and desktop) needs a chronological timeline built from three sources in the API response: accident events, ownership changes, and maintenance records.

## Solution

Add a `buildTimeline` helper in `apps/desktop/src/lib/transforms.ts` that merges and sorts all three sources into `HistoryEvent[]`, then call it from `transformToSharedReport`.

## Type Change

In `packages/shared/src/data/report.ts`, extend `HistoryEvent.type`:

```ts
type: 'manufacture' | 'import' | 'owner' | 'title' | 'service' | 'auction' | 'current' | 'accident'
```

The existing mock data in that file does not use `'accident'` and remains unchanged — the new value is additive only.

## Data Mapping

### `historial.accidentes.eventos` → `type: 'accident'`

| `HistoryEvent` field | Source |
|---|---|
| `id` | `"acc-" + index` (array index, not `event.numero` — `numero` is not guaranteed unique) |
| `date` | `event.fecha` (as-is, e.g. `"08/10/2025"`) |
| `title` | `event.titulo` |
| `description` | `[event.severidad, ...(event.detalles ?? [])].filter(s => s && s !== "-").join(" · ")` — if the result is empty, fall back to `event.titulo` |

### `historial.propietarios` → `type: 'owner'`

| `HistoryEvent` field | Source |
|---|---|
| `id` | `"own-" + propietario.numero` |
| `date` | `String(propietario.anioPurchased)` (display as year only) |
| `title` | `propietario.etiqueta` |
| `description` | `[propietario.tipo, propietario.estados].filter(s => s && s !== "-").join(" · ")` |

### `historial.mantenimiento.registros` → `type: 'service'`

| `HistoryEvent` field | Source |
|---|---|
| `id` | `"svc-" + index` |
| `date` | `registro.fecha` (as-is, e.g. `"06/26/2025"`) |
| `title` | `registro.tipo` |
| `description` | `(registro.detalles ?? []).filter(s => s && s !== "-").join(" · ")` — falls back to `registro.fuente` if the result is empty |

## Sorting

All events are sorted ascending (oldest → newest) using a numeric sort key derived as follows:

- For events with a `fecha` string (`MM/DD/YYYY`): parse using `new Date(fecha)`. If the parse fails (returns `NaN`), use `0` as the sort key so the event sorts to the front.
- For owner events with only `anioPurchased` (year number): use `new Date(anioPurchased, 0, 1).getTime()` — i.e. Jan 1 of that year. This means an owner event in year 2024 will sort before any service or accident event in 2024 that has a specific date. The `date` string stored on the event remains just the year string for display purposes.
- Tie-breaking is not specified beyond the above — stable sort order of the underlying JS engine is accepted.

## Empty arrays

If any of the three source arrays is empty, that source produces zero events and no error. The resulting timeline may itself be empty if all sources are empty — this is valid and the UI must handle it.

## Integration

In `transformToSharedReport`, replace:

```ts
timeline: [], // TODO: synthesize from historial events when needed
```

with:

```ts
timeline: buildTimeline(raw),
```

## Out of Scope

- No grouping or collapsing of same-day events (UI responsibility)
- No `manufacture`, `import`, `auction`, or `current` events synthesized here — those require data not available in the current API response
- `buildTimeline` lives in `apps/desktop/src/lib/transforms.ts` for now; can be moved to `packages/shared` if the mobile app needs the same transform later
