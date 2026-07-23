import { Card } from '@/shared/ui/Card'
import { QueryBoundary } from '@/shared/ui/QueryBoundary'
import { PerformanceTrendChart } from '@/features/dashboard/components/PerformanceTrendChart'
import { usePerformanceTrend } from '@/features/dashboard/hooks/useDashboardData'
import { PerformanceStatTile } from './components/PerformanceStatTile'
import { RecentIssuesList } from './components/RecentIssuesList'
import { VendorPerformanceSkeleton } from './components/VendorPerformanceSkeleton'
import { useVendorPerformanceOverview } from './hooks/useVendorPerformanceOverview'

export function VendorPerformancePage() {
  const overviewQuery = useVendorPerformanceOverview()
  const trendQuery = usePerformanceTrend()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Vendor Performance</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aggregate performance and risk across the entire vendor base.
        </p>
      </div>

      <QueryBoundary query={overviewQuery} loadingFallback={<VendorPerformanceSkeleton />}>
        {(overview) => (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <PerformanceStatTile label="Quality Score" value={overview.qualityScore} suffix="/100" />
              <PerformanceStatTile label="Delivery Score" value={overview.deliveryScore} suffix="/100" />
              <PerformanceStatTile label="Response Time" value={overview.responseTimeHours} suffix="hrs" />
              <PerformanceStatTile
                label="Payment History"
                value={overview.paymentHistoryScore}
                suffix="/100"
              />
              <PerformanceStatTile label="Risk Score" value={overview.riskScore} riskTone />
              <PerformanceStatTile label="Vendor Rating" value={overview.avgRating} suffix="/5" />
            </div>

            <Card title="Vendor Performance Trend" subtitle="Average rating across all vendors, last 12 months">
              <QueryBoundary
                query={trendQuery}
                isEmpty={(data) => data.length === 0}
                loadingFallback={<div className="h-[280px]" />}
              >
                {(data) => <PerformanceTrendChart data={data} />}
              </QueryBoundary>
            </Card>

            <Card title="Recent Issues">
              <RecentIssuesList issues={overview.recentIssues} />
            </Card>
          </>
        )}
      </QueryBoundary>
    </div>
  )
}
