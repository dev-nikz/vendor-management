import { mockVendorDirectory } from '@/features/vendor-directory/api/mockData'
import { getMockVendorDetails } from '@/features/vendor-details/api/mockData'
import type { VendorPerformanceOverview, RecentIssueEntry } from '../types'

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return Math.round(numbers.reduce((sum, n) => sum + n, 0) / numbers.length)
}

// Exported as a function (not a precomputed constant) and called fresh per
// request in the handler, so newly created vendors (added at runtime via the
// Create Vendor form) are reflected immediately rather than only the vendors
// present when this module first loaded.
export function buildVendorPerformanceOverview(): VendorPerformanceOverview {
  const allDetails = mockVendorDirectory
    .map((v) => getMockVendorDetails(v.id))
    .filter((d) => d !== undefined)

  const recentIssues: RecentIssueEntry[] = allDetails
    .flatMap((d) => d.issues.map((issue) => ({ ...issue, vendorName: d.vendorName, vendorId: d.id })))
    .sort((a, b) => b.raisedOn.localeCompare(a.raisedOn))
    .slice(0, 10)

  return {
    qualityScore: average(allDetails.map((d) => d.performance.qualityScore)),
    deliveryScore: average(allDetails.map((d) => d.performance.deliveryScore)),
    responseTimeHours: average(allDetails.map((d) => d.performance.responseTimeHours)),
    paymentHistoryScore: average(allDetails.map((d) => d.performance.paymentHistoryScore)),
    riskScore: average(allDetails.map((d) => d.performance.riskScore)),
    avgRating: Math.round((allDetails.reduce((sum, d) => sum + d.rating, 0) / allDetails.length) * 10) / 10,
    recentIssues,
  }
}
