import type { HttpHandler } from 'msw'
import { dashboardHandlers } from '@/features/dashboard/api/handlers'

// Each feature module contributes its own handlers here as it's built.
export const handlers: HttpHandler[] = [...dashboardHandlers]
