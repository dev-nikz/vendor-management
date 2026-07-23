import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getVendorDirectory } from '../api/vendorDirectoryApi'
import type { VendorDirectoryQuery } from '../types'

export function useVendorDirectory(query: VendorDirectoryQuery) {
  return useQuery({
    queryKey: ['vendor-directory', query],
    queryFn: () => getVendorDirectory(query),
    placeholderData: keepPreviousData,
  })
}
