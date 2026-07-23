export type VendorStatus = 'Active' | 'Blacklisted' | 'Pending' | 'On Hold'

export interface VendorDirectoryEntry {
  id: string
  vendorName: string
  vendorCode: string
  category: string
  contactPerson: string
  city: string
  rating: number
  status: VendorStatus
  lastTransactionDate: string
  totalPurchaseValue: number
}

export type VendorSortField =
  | 'vendorName'
  | 'vendorCode'
  | 'category'
  | 'contactPerson'
  | 'city'
  | 'rating'
  | 'status'
  | 'lastTransactionDate'
  | 'totalPurchaseValue'

export interface VendorDirectoryQuery {
  search: string
  category: string | null
  status: VendorStatus | null
  sortField: VendorSortField
  sortDirection: 'asc' | 'desc'
  page: number
  pageSize: number
}

export interface VendorDirectoryResponse {
  data: VendorDirectoryEntry[]
  total: number
  page: number
  pageSize: number
}

export type VendorColumnVisibility = Partial<Record<VendorSortField, boolean>>

export interface VendorDirectorySavedView {
  id: string
  name: string
  search: string
  category: string | null
  status: VendorStatus | null
  sortField: VendorSortField
  sortDirection: 'asc' | 'desc'
  pageSize: number
  columnVisibility: VendorColumnVisibility
}
