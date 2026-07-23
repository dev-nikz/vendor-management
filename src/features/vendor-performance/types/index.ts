import type { VendorIssue } from '@/features/vendor-details/types'

export interface RecentIssueEntry extends VendorIssue {
  vendorName: string
  vendorId: string
}

export interface VendorPerformanceOverview {
  qualityScore: number
  deliveryScore: number
  responseTimeHours: number
  paymentHistoryScore: number
  riskScore: number
  avgRating: number
  recentIssues: RecentIssueEntry[]
}
