import { Card } from '@/shared/ui/Card'
import { QueryBoundary } from '@/shared/ui/QueryBoundary'
import { Skeleton } from '@/shared/ui/Skeleton'
import { KpiCardGrid } from './components/KpiCardGrid'
import { KpiCardGridSkeleton } from './components/KpiCardGridSkeleton'
import { PerformanceTrendChart } from './components/PerformanceTrendChart'
import { CategoryDistributionChart } from './components/CategoryDistributionChart'
import { useCategoryDistribution, useDashboardKpis, usePerformanceTrend } from './hooks/useDashboardData'

export function DashboardPage() {
  const kpisQuery = useDashboardKpis()
  const trendQuery = usePerformanceTrend()
  const categoryQuery = useCategoryDistribution()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Vendor Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of vendor health, performance, and sourcing composition.
        </p>
      </div>

      <QueryBoundary query={kpisQuery} loadingFallback={<KpiCardGridSkeleton />}>
        {(data) => <KpiCardGrid data={data} />}
      </QueryBoundary>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Vendor Performance Trend" subtitle="Average rating across all vendors, last 12 months">
          <QueryBoundary
            query={trendQuery}
            isEmpty={(data) => data.length === 0}
            loadingFallback={<Skeleton className="h-[280px] w-full" />}
          >
            {(data) => <PerformanceTrendChart data={data} />}
          </QueryBoundary>
        </Card>

        <Card title="Category-wise Vendor Distribution" subtitle="Vendor count by procurement category">
          <QueryBoundary
            query={categoryQuery}
            isEmpty={(data) => data.length === 0}
            loadingFallback={<Skeleton className="h-[280px] w-full" />}
          >
            {(data) => <CategoryDistributionChart data={data} />}
          </QueryBoundary>
        </Card>
      </div>
    </div>
  )
}
