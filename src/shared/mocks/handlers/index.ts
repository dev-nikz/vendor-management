import type { HttpHandler } from 'msw'
import { dashboardHandlers } from '@/features/dashboard/api/handlers'
import { vendorDirectoryHandlers } from '@/features/vendor-directory/api/handlers'
import { vendorDetailsHandlers } from '@/features/vendor-details/api/handlers'
import { vendorFormHandlers } from '@/features/vendor-form/api/handlers'
import { vendorPerformanceHandlers } from '@/features/vendor-performance/api/handlers'

// Each feature module contributes its own handlers here as it's built.
export const handlers: HttpHandler[] = [
  ...dashboardHandlers,
  ...vendorDirectoryHandlers,
  ...vendorDetailsHandlers,
  ...vendorFormHandlers,
  ...vendorPerformanceHandlers,
]
