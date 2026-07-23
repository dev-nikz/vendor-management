import { apiPost } from '@/shared/api/apiClient'
import type { CreateVendorFormValues } from '../schema/createVendorSchema'

export interface CreateVendorResponse {
  id: string
  vendorCode: string
  status: string
}

export function createVendor(values: CreateVendorFormValues) {
  const { documents, ...rest } = values
  return apiPost<CreateVendorResponse>('/api/vendors', {
    ...rest,
    documents: documents.map((f) => f.name),
  })
}
