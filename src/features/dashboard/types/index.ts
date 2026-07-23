export interface DashboardKpis {
  totalVendors: number
  activeVendors: number
  blacklistedVendors: number
  pendingApprovals: number
  averageVendorRating: number
  activePurchaseOrders: number
}

export interface PerformanceTrendPoint {
  month: string
  averageRating: number
}

export interface CategoryDistributionSlice {
  category: string
  vendorCount: number
}
