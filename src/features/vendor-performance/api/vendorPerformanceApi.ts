import { apiGet } from '@/shared/api/apiClient'
import type { VendorPerformanceOverview } from '../types'

export function getVendorPerformanceOverview() {
  return apiGet<VendorPerformanceOverview>('/api/vendor-performance/overview')
}
