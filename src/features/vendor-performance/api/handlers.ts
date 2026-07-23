import { delay, http, HttpResponse } from 'msw'
import { buildVendorPerformanceOverview } from './mockData'

export const vendorPerformanceHandlers = [
  http.get('/api/vendor-performance/overview', async () => {
    await delay(500)
    return HttpResponse.json(buildVendorPerformanceOverview())
  }),
]
