import { delay, http, HttpResponse } from 'msw'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from './mockData'

export const notificationsHandlers = [
  http.get('/api/notifications', async () => {
    await delay(400)
    return HttpResponse.json(getNotifications())
  }),

  http.post('/api/notifications/:id/read', async ({ params }) => {
    await delay(200)
    markNotificationRead(String(params.id))
    return HttpResponse.json({ ok: true })
  }),

  http.post('/api/notifications/mark-all-read', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as { ids: string[] }
    markAllNotificationsRead(body.ids)
    return HttpResponse.json({ ok: true })
  }),
]
