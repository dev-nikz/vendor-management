# Vendor Management System — Master Project Spec

> This is the reference document for the entire build. Every module's build prompt
> derives from the decisions recorded here. Update this file only when a project-wide
> decision changes — module-specific detail belongs in each module's own prompt.

## 1. Purpose

An enterprise-grade Vendor Management System (VMS) for construction / mining /
industrial procurement teams to onboard, evaluate, approve, and monitor vendors.
Built with mock APIs (no real backend) but architected so swapping in a real backend
later requires no changes to component or hook code — only the MSW handlers are removed.

## 2. Tech Stack & Rationale

| Concern | Choice | Why |
|---|---|---|
| Language | TypeScript | Type safety across API contracts, forms, and component props at enterprise scale. |
| UI framework | React 18+ | Team familiarity, ecosystem maturity. |
| Bundler | Vite | Fast dev server + HMR, native code-splitting, minimal config vs CRA/webpack. |
| Styling | Tailwind CSS | Utility-first, fast to build responsive layouts (tablet/laptop/desktop) without a separate CSS architecture. |
| Server state | **TanStack Query** | Caching, loading/error/retry states, pagination, and background refetch out of the box — matches the API layer requirements directly. |
| Client/UI state | **Zustand** | Lightweight store for filters, saved views, sidebar/panel state — avoids re-render storms Context API would cause on a data-heavy dashboard. |
| Charts | **Recharts** | Best TypeScript support among composable React chart libs; good fit for line/donut/bar without fighting React's rendering model. |
| Forms | **React Hook Form + Zod** | Uncontrolled-first design minimizes re-renders on large forms (Create Vendor); Zod gives schema validation with TS types inferred directly from the schema. |
| Routing | React Router | Route-based code splitting per module via `React.lazy`. |
| Mock API | **MSW (Mock Service Worker)** | Intercepts at the network layer — component/hook code is identical to a real backend integration. Can simulate latency, 401s, 500s, retries, empty states realistically. |
| Virtualization | `@tanstack/react-virtual` | Vendor Directory (Module 2) table needs to handle large row counts without perf degradation. |
| Table primitives | `@tanstack/react-table` | Headless table logic (sorting, filtering, pagination, column visibility) pairs with virtualization and Tailwind styling. |

## 3. Folder Structure — Feature-Sliced

```
src/
  app/                      # app shell: router, providers, layout
  features/
    dashboard/              # Module 1
    vendor-directory/        # Module 2
    vendor-details/          # Module 3
    vendor-form/              # Module 4
    vendor-performance/       # Module 5
    approval-workflow/        # Module 6
    notifications/            # Module 7
      each with: components/ hooks/ api/ types/
  shared/
    ui/                      # generic reusable components (Button, Card, Table shell, etc.)
    api/                     # shared query client, base fetch wrapper, API state helpers
    lib/                     # utilities
    mocks/                   # MSW handlers + seed JSON data, organized per feature
  styles/
docs/
  PROJECT_SPEC.md            # this file
```

Rationale: each feature folder maps 1:1 to a module and a git branch — a module can be
built, tested, and merged in isolation with minimal cross-feature coupling.

## 4. API Layer Contract

Every API hook (built on TanStack Query) models these states explicitly, so every
screen handles them consistently rather than re-inventing it per component:

- **Loading** — skeleton/spinner per component, never a blank screen
- **Error (retryable)** — inline error state with a Retry action; TanStack Query retry/backoff configured at the client level
- **Unauthorized (401)** — redirect/prompt handled by a shared response interceptor, not per-hook
- **Empty** — explicit empty-state UI (not just "no error, no data")

MSW handlers simulate all four per endpoint (configurable latency + occasional
error injection) so these states are actually exercised during development, not just
theoretical.

## 5. Performance Strategy

- `React.memo` on list/row/card components; `useMemo`/`useCallback` for derived data and handlers passed to memoized children
- Route-based `React.lazy` + code splitting per feature module
- `@tanstack/react-virtual` for the Vendor Directory table
- Colocated state so unrelated UI (e.g. KPI cards) doesn't re-render on filter changes elsewhere

## 6. Modules & Build Order

| # | Module | Core requirement |
|---|---|---|
| 1 | Vendor Dashboard | 6 KPI cards + Performance Trend (line) + Category Distribution (donut), via Recharts |
| 2 | Vendor Directory | Enterprise data table: search, filters, sort, pagination, sticky header, responsive, saved views, column selection, export |
| 3 | Vendor Details | Tabbed view: Overview, Contacts, Performance, Purchase History, Documents, Payments, Projects, Issues, Audit Timeline |
| 4 | Create Vendor | Multi-section form with validation (React Hook Form + Zod), file upload for docs |
| 5 | Vendor Performance | Quality/Delivery/Response/Payment/Risk scores, rating, trend graph, recent issues |
| 6 | Approval Workflow | Status states (Pending/Approved/Rejected/On Hold), timeline, comments, approve/reject/request-changes actions |
| 7 | Notifications | Approval pending, document expiring, low rating, delayed delivery, payment due |
| 8 | Responsive Audit | Cross-cutting: final pass across all modules at tablet (≥768px) / laptop (≥1024px) / desktop (≥1280px) breakpoints — not built in isolation, verified continuously and finalized at the end |

**Note:** Payments, Documents, Projects, and Issues are tabs *within* Module 3
(Vendor Details), not standalone modules.

## 7. Incremental Build Workflow

1. Scaffold the project once (tooling, folder skeleton, providers) — committed directly to `main`.
2. For each module 1–7:
   - Generate a scoped build prompt from this spec
   - Implement the feature on a new branch `feature/module-N-<name>`
   - Test manually in-browser at tablet/laptop/desktop widths
   - On approval, merge into `main`
3. Module 8 (Responsive Audit) runs as a final pass across all merged modules, its own branch `feature/module-8-responsive-audit`, merged last.
4. After all modules: produce the final analysis/architecture report (separate deliverable).

## 8. Target Devices

Desktop, laptop, tablet (≥768px). No phone-width support required for this project —
this is a deliberate exception to default mobile-first-to-360px practice.
