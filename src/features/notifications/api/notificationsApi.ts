import { apiGet, apiPost } from '@/shared/api/apiClient'
import type { NotificationEntry } from '../types'

export function getNotifications() {
  return apiGet<NotificationEntry[]>('/api/notifications')
}

export function markNotificationRead(id: string) {
  return apiPost<{ ok: boolean }>(`/api/notifications/${id}/read`, {})
}

export function markAllNotificationsRead(ids: string[]) {
  return apiPost<{ ok: boolean }>('/api/notifications/mark-all-read', { ids })
}
