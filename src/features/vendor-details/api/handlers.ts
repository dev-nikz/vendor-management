import { delay, http, HttpResponse } from 'msw'
import { getMockVendorDetails } from './mockData'

export const vendorDetailsHandlers = [
  http.get('/api/vendors/:id', async ({ params }) => {
    await delay(400)
    const details = getMockVendorDetails(String(params.id))
    if (!details) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(details)
  }),
]
