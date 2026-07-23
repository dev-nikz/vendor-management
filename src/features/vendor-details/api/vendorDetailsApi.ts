import { apiGet } from '@/shared/api/apiClient'
import type { VendorDetails } from '../types'

export function getVendorDetails(id: string) {
  return apiGet<VendorDetails>(`/api/vendors/${id}`)
}
