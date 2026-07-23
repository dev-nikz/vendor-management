import { delay, http, HttpResponse } from 'msw'

export const vendorFormHandlers = [
  http.post('/api/vendors', async ({ request }) => {
    await delay(600)
    const body = (await request.json()) as Record<string, unknown>

    if (!body.vendorName || !body.gst || !body.pan) {
      return HttpResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const vendorCode = `NEW-${Math.floor(1000 + Math.random() * 8999)}`
    return HttpResponse.json(
      {
        id: `${vendorCode}-${Date.now()}`,
        vendorCode,
        status: 'Pending',
        ...body,
      },
      { status: 201 },
    )
  }),
]
