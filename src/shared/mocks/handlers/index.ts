import type { HttpHandler } from 'msw'

// Each feature module contributes its own handlers here as it's built,
// e.g. `...dashboardHandlers` from `features/dashboard/api/handlers.ts`.
export const handlers: HttpHandler[] = []
