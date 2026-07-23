import { delay, http, HttpResponse } from 'msw'
import { mockCategoryDistribution, mockDashboardKpis, mockPerformanceTrend } from './mockData'

const NETWORK_DELAY_MS = 600

export const dashboardHandlers = [
  http.get('/api/dashboard/kpis', async () => {
    await delay(NETWORK_DELAY_MS)
    return HttpResponse.json(mockDashboardKpis)
  }),

  http.get('/api/dashboard/performance-trend', async () => {
    await delay(NETWORK_DELAY_MS)
    return HttpResponse.json(mockPerformanceTrend)
  }),

  http.get('/api/dashboard/category-distribution', async () => {
    await delay(NETWORK_DELAY_MS)
    return HttpResponse.json(mockCategoryDistribution)
  }),
]
