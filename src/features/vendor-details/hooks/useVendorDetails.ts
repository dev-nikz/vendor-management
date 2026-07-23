import { useQuery } from '@tanstack/react-query'
import { getVendorDetails } from '../api/vendorDetailsApi'

export function useVendorDetails(id: string) {
  return useQuery({
    queryKey: ['vendor-details', id],
    queryFn: () => getVendorDetails(id),
  })
}
