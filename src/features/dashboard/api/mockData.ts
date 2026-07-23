import type {
  CategoryDistributionSlice,
  DashboardKpis,
  PerformanceTrendPoint,
} from '../types'

export const mockDashboardKpis: DashboardKpis = {
  totalVendors: 248,
  activeVendors: 212,
  blacklistedVendors: 9,
  pendingApprovals: 14,
  averageVendorRating: 4.1,
  activePurchaseOrders: 63,
}

export const mockPerformanceTrend: PerformanceTrendPoint[] = [
  { month: 'Aug 2025', averageRating: 4.3 },
  { month: 'Sep 2025', averageRating: 4.2 },
  { month: 'Oct 2025', averageRating: 4.2 },
  { month: 'Nov 2025', averageRating: 4.0 },
  { month: 'Dec 2025', averageRating: 3.8 },
  { month: 'Jan 2026', averageRating: 3.7 },
  { month: 'Feb 2026', averageRating: 3.6 },
  { month: 'Mar 2026', averageRating: 3.8 },
  { month: 'Apr 2026', averageRating: 3.9 },
  { month: 'May 2026', averageRating: 4.0 },
  { month: 'Jun 2026', averageRating: 4.1 },
  { month: 'Jul 2026', averageRating: 4.1 },
]

export const mockCategoryDistribution: CategoryDistributionSlice[] = [
  { category: 'Civil Works', vendorCount: 68 },
  { category: 'Electrical', vendorCount: 52 },
  { category: 'Mechanical', vendorCount: 41 },
  { category: 'Logistics & Transport', vendorCount: 33 },
  { category: 'Safety & PPE', vendorCount: 21 },
  { category: 'IT & Software', vendorCount: 18 },
  { category: 'HVAC', vendorCount: 15 },
]
