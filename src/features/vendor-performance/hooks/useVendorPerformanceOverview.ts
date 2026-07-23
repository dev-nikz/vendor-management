import { useQuery } from '@tanstack/react-query'
import { getVendorPerformanceOverview } from '../api/vendorPerformanceApi'

export function useVendorPerformanceOverview() {
  return useQuery({
    queryKey: ['vendor-performance', 'overview'],
    queryFn: getVendorPerformanceOverview,
  })
}
