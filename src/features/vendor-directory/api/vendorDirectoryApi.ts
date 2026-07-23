import { apiGet } from '@/shared/api/apiClient'
import type { VendorDirectoryQuery, VendorDirectoryResponse } from '../types'

export function getVendorDirectory(query: VendorDirectoryQuery) {
  const params = new URLSearchParams()
  if (query.search) params.set('search', query.search)
  if (query.category) params.set('category', query.category)
  if (query.status) params.set('status', query.status)
  params.set('sortField', query.sortField)
  params.set('sortDirection', query.sortDirection)
  params.set('page', String(query.page))
  params.set('pageSize', String(query.pageSize))

  return apiGet<VendorDirectoryResponse>(`/api/vendors?${params.toString()}`)
}
