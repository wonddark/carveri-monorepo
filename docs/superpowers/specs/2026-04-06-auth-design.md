# Authentication Design

**Date:** 2026-04-06  
**Scope:** User-facing sign in / sign up with token persistence and auto-refresh, shared across `apps/mobile` and `apps/desktop`.

---

## Context

The portal is a monorepo with two React 19 SPAs (`apps/mobile`, `apps/desktop`) sharing code via `packages/shared`. Both apps use React Router 7 with loader-based data fetching.

The existing `getAuthToken()` in `packages/shared/src/data/api.ts` (which used hardcoded env-var credentials) is removed as part of this implementation — it was a temporary shortcut for API development.

---

## Auth Endpoints

| Method | URL | Body | Success | Failure |
|--------|-----|------|---------|---------|
| POST | `/auth/login` | `{ email, password }` | `{ token }` | 401 |
| POST | `/auth/register` | `{ email, password }` | `{ token }` | 401 |
| POST | `/auth/refresh` | _(none)_ | `{ token }` | 401 |

`/auth/refresh` requires `Authorization: Bearer <token>` — it issues a fresh token for the authenticated user.

---

## Approach

**Module-level auth store + localStorage persistence.**

A singleton in `packages/shared` holds the token in memory (hydrated from `localStorage` on import). All API functions and React Router loaders access it synchronously. A `fetchWithAuth()` wrapper handles 401 interception and auto-refresh transparently.

Rejected alternatives:
- **React Context**: loaders run outside the React tree and cannot read context — creates two sources of truth.
- **Session-only in-memory**: every page reload requires re-login — unacceptable UX.

---

## Section 1 — Auth Store

**File:** `packages/shared/src/lib/auth.ts`

A plain exported object. No class, no React, no hooks.

```ts
let _token: string | null = localStorage.getItem('cv_token')

export const auth = {
  getToken: () => _token,
  setToken: (token: string) => {
    _token = token
    localStorage.setItem('cv_token', token)
  },
  clearToken: () => {
    _token = null
    localStorage.removeItem('cv_token')
  },
  isAuthenticated: () => _token !== null,
}
```

- `localStorage` is read once at module import — no repeated IO in the hot path.
- Storage key `cv_token` is namespaced to avoid collisions.
- No user profile stored — only the bearer token.

---

## Section 2 — API Layer

**File:** `packages/shared/src/data/api.ts` (rewritten)

### Auth functions (called from router actions)

```ts
login(email: string, password: string): Promise<{ token: string }>
register(email: string, password: string): Promise<{ token: string }>
```

Both throw on non-2xx responses. The calling action catches errors and returns them as form error strings — the error boundary is not triggered.

> **Assumption:** `/auth/register` returns `{ token }` on success (same shape as login), enabling auto-login after registration. If the endpoint returns a different shape or requires a separate login step, the register action falls back to `redirect('/login')` instead of setting the token directly.

### `fetchWithAuth(url, init?)`

A wrapper around `fetch` that:

1. Injects `Authorization: Bearer <token>` header.
2. On 401 from the original request:
   - Calls `POST /auth/refresh` with the current token (using raw `fetch`, not `fetchWithAuth`, to avoid infinite loops).
   - On refresh success → calls `auth.setToken(newToken)`, retries the original request once.
   - On refresh failure → calls `auth.clearToken()`, throws `redirect('/login')` for React Router's error boundary to handle.
3. All existing API functions (`getVehicleList`, `fetchVehicleReport`) are updated to use `fetchWithAuth`.

`getAuthToken()` (env-var based) is deleted entirely.

---

## Section 3 — Route Protection

### Shared auth loader

**File:** `packages/shared/src/data/loaders.ts`

```ts
export function requireAuthLoader() {
  if (!auth.isAuthenticated()) throw redirect('/login')
}
```

`reportLoader` calls `requireAuthLoader()` at the top before fetching data. No wrapper components needed.

### Router structure (both apps)

| Path | Auth | Notes |
|------|------|-------|
| `/` | Public | Landing page, no change |
| `/login` | Public | Outside `RootLayout` |
| `/register` | Public | Outside `RootLayout` |
| `/reports/:vin/*` | Protected | Via `reportLoader` → `requireAuthLoader` |

Desktop currently has no `/login` or `/register` routes — both are added.

### Login / Register pages

- Mobile already has UI shells (`apps/mobile/src/pages/login.tsx`, `register.tsx`) — wired up to real API.
- Desktop gets new `/login` and `/register` page files.
- Both apps import `login()` / `register()` from `@carveri/shared/data/api`.
- Form submission uses React Router 7's `action` + `useActionData()` pattern:
  - The route defines an `action` function that reads `FormData`, calls the API, sets the token on success, and returns `redirect('/')`.
  - On failure the action returns `{ error: 'Invalid credentials' }` — the page reads it with `useActionData()` and renders an inline error message. No exception is thrown so the error boundary is not triggered.
- Login/register pages redirect to `/` if the user is already authenticated (checked in a route loader).

---

## Files Changed

| File | Change |
|------|--------|
| `packages/shared/src/lib/auth.ts` | New — auth store singleton |
| `packages/shared/src/data/api.ts` | Rewrite — remove `getAuthToken`, add `login`, `register`, `fetchWithAuth` |
| `packages/shared/src/data/loaders.ts` | Add `requireAuthLoader`, update `reportLoader` |
| `apps/mobile/src/pages/login.tsx` | Wire up to real `login()` API call |
| `apps/mobile/src/pages/register.tsx` | Wire up to real `register()` API call |
| `apps/mobile/src/data/router.tsx` | Add loader to login/register (redirect if authed) |
| `apps/desktop/src/pages/login.tsx` | New |
| `apps/desktop/src/pages/register.tsx` | New |
| `apps/desktop/src/data/router.tsx` | Add `/login`, `/register` routes |

---

## Out of Scope

- User profile / account management
- Password reset flow
- Token expiry UI (e.g. "session expired" toast before redirect) — auto-redirect to `/login` is sufficient for now
- httpOnly cookie storage — requires backend cooperation not available in this API
