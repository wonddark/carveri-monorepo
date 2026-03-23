# Vehicle Timeline Transform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement `buildTimeline` to populate `historyTab.timeline` in `transformToSharedReport` by merging accident events, ownership changes, and maintenance records from the API response into a sorted `HistoryEvent[]`.

**Architecture:** Add `'accident'` to the `HistoryEvent.type` union in the shared package, implement a `buildTimeline` helper alongside the existing `mapOwners`/`mapService`/`mapTitle` helpers in `transforms.ts`, and wire it into `transformToSharedReport` replacing the existing `timeline: []` stub.

**Tech Stack:** TypeScript, pnpm monorepo. No test framework — verification uses `pnpm build` (tsc + vite).

---

### Task 1: Add `'accident'` to `HistoryEvent.type`

**Files:**
- Modify: `packages/shared/src/data/report.ts:57`

- [ ] **Step 1: Open the file and locate the type union**

  Read `packages/shared/src/data/report.ts`. Find line 57 — it contains:

  ```ts
  type: 'manufacture' | 'import' | 'owner' | 'title' | 'service' | 'auction' | 'current'
  ```

- [ ] **Step 2: Add `'accident'` to the union**

  Change line 57 to:

  ```ts
  type: 'manufacture' | 'import' | 'owner' | 'title' | 'service' | 'auction' | 'current' | 'accident'
  ```

  Do not touch mock data or any other line in the file.

- [ ] **Step 3: Verify the build passes**

  ```bash
  cd /home/oz/Projects/OsleyHC/carveri-portal
  pnpm build
  ```

  Expected: build exits 0 with no type errors.

- [ ] **Step 4: Commit**

  ```bash
  git add packages/shared/src/data/report.ts
  git commit -m "feat(shared): add 'accident' to HistoryEvent type union"
  ```

---

### Task 2: Implement `buildTimeline`

**Files:**
- Modify: `apps/desktop/src/lib/transforms.ts`

This task adds the `buildTimeline` function. It does not wire it in yet — that happens in Task 3.

- [ ] **Step 1: Read the current transforms file**

  Read `apps/desktop/src/lib/transforms.ts` in full so you have the current imports and function list in context before editing.

- [ ] **Step 2: Add the `HistoryEvent` import**

  The existing import at the top of `transforms.ts` is:

  ```ts
  import type {
    HistoryOwner,
    HistoryServiceRecord,
    HistoryTitleItem,
    VehicleReport as SharedReport,
  } from "@carveri/shared/data/report";
  ```

  Add `HistoryEvent` to this import:

  ```ts
  import type {
    HistoryEvent,
    HistoryOwner,
    HistoryServiceRecord,
    HistoryTitleItem,
    VehicleReport as SharedReport,
  } from "@carveri/shared/data/report";
  ```

- [ ] **Step 3: Add the `buildTimeline` function**

  Insert the following function after the existing `mapTitle` function (around line 71, before `transformToSharedReport`):

  ```ts
  function sortKey(date: string, year?: number): number {
    if (year !== undefined) return new Date(year, 0, 1).getTime();
    const parsed = new Date(date).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  export function buildTimeline(raw: ApiReport): HistoryEvent[] {
    const accidents: HistoryEvent[] = raw.historial.accidentes.eventos.map(
      (ev, i) => {
        const desc = [ev.severidad, ...(ev.detalles ?? [])]
          .filter((s) => s && s !== "-")
          .join(" · ");
        return {
          id: `acc-${i}`,
          date: ev.fecha,
          title: ev.titulo,
          description: desc || ev.titulo,
          type: "accident",
        };
      },
    );

    const owners: HistoryEvent[] = raw.historial.propietarios.map((p) => ({
      id: `own-${p.numero}`,
      date: String(p.anioPurchased),
      title: p.etiqueta,
      description: [p.tipo, p.estados]
        .filter((s) => s && s !== "-")
        .join(" · "),
      type: "owner",
    }));

    const service: HistoryEvent[] = raw.historial.mantenimiento.registros.map(
      (r, i) => {
        const desc = (r.detalles ?? [])
          .filter((s) => s && s !== "-")
          .join(" · ");
        return {
          id: `svc-${i}`,
          date: r.fecha,
          title: r.tipo,
          description: desc || r.fuente,
          type: "service",
        };
      },
    );

    return [...accidents, ...owners, ...service].sort((a, b) => {
      const aYear =
        a.type === "owner" ? Number(a.date) : undefined;
      const bYear =
        b.type === "owner" ? Number(b.date) : undefined;
      return sortKey(a.date, aYear) - sortKey(b.date, bYear);
    });
  }
  ```

  **Key notes for the implementer:**
  - `sortKey` is a module-private helper (not exported) — it is used only by `buildTimeline`.
  - `buildTimeline` is exported so it can be unit-tested or reused by the mobile app later.
  - Owner events use `anioPurchased` as the year for sort purposes (Jan 1 of that year) so they consistently sort before same-year dated events.
  - If `new Date(fecha)` fails to parse (returns `NaN`), `sortKey` returns `0` — that event sorts to the front.

- [ ] **Step 4: Verify the build passes**

  ```bash
  cd /home/oz/Projects/OsleyHC/carveri-portal
  pnpm build
  ```

  Expected: build exits 0 with no type errors. If `'accident'` is flagged as not assignable, check that Task 1 was completed first.

- [ ] **Step 5: Commit**

  ```bash
  git add apps/desktop/src/lib/transforms.ts
  git commit -m "feat(desktop): implement buildTimeline from accident, owner, and service data"
  ```

---

### Task 3: Wire `buildTimeline` into `transformToSharedReport`

**Files:**
- Modify: `apps/desktop/src/lib/transforms.ts:142` (the `timeline: []` line inside `transformToSharedReport`)

- [ ] **Step 1: Locate the stub**

  In `transformToSharedReport`, find:

  ```ts
  timeline: [], // TODO: synthesize from historial events when needed
  ```

  It is inside the `historyTab` object.

- [ ] **Step 2: Replace the stub**

  Change it to:

  ```ts
  timeline: buildTimeline(raw),
  ```

  Remove the TODO comment entirely.

- [ ] **Step 3: Verify the build passes**

  ```bash
  cd /home/oz/Projects/OsleyHC/carveri-portal
  pnpm build
  ```

  Expected: build exits 0 with no type errors.

- [ ] **Step 4: Smoke-check in the dev server (manual)**

  ```bash
  pnpm dev
  ```

  Open the report page for any VIN in the browser. Navigate to the History tab → Timeline subtab. Confirm events appear in chronological order and that accident events (if any in the data) are present. No blank screen or console errors.

- [ ] **Step 5: Commit**

  ```bash
  git add apps/desktop/src/lib/transforms.ts
  git commit -m "feat(desktop): wire buildTimeline into transformToSharedReport"
  ```
