import { useQuery } from '@tanstack/react-query'
import { getCategoryDistribution, getDashboardKpis, getPerformanceTrend } from '../api/dashboardApi'

export function useDashboardKpis() {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: getDashboardKpis,
  })
}

export function usePerformanceTrend() {
  return useQuery({
    queryKey: ['dashboard', 'performance-trend'],
    queryFn: getPerformanceTrend,
  })
}

export function useCategoryDistribution() {
  return useQuery({
    queryKey: ['dashboard', 'category-distribution'],
    queryFn: getCategoryDistribution,
  })
}
