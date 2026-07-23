import { apiGet } from '@/shared/api/apiClient'
import type { CategoryDistributionSlice, DashboardKpis, PerformanceTrendPoint } from '../types'

export function getDashboardKpis() {
  return apiGet<DashboardKpis>('/api/dashboard/kpis')
}

export function getPerformanceTrend() {
  return apiGet<PerformanceTrendPoint[]>('/api/dashboard/performance-trend')
}

export function getCategoryDistribution() {
  return apiGet<CategoryDistributionSlice[]>('/api/dashboard/category-distribution')
}
