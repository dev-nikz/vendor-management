import { apiGet, apiPost } from '@/shared/api/apiClient'
import type { ApprovalActionRequest, ApprovalDetail, ApprovalQueueEntry } from '../types'

export function getApprovalQueue() {
  return apiGet<ApprovalQueueEntry[]>('/api/approvals')
}

export function getApprovalDetail(id: string) {
  return apiGet<ApprovalDetail>(`/api/approvals/${id}`)
}

export function submitApprovalAction(id: string, body: ApprovalActionRequest) {
  return apiPost<ApprovalDetail>(`/api/approvals/${id}/action`, body)
}

export function submitApprovalComment(id: string, message: string) {
  return apiPost<ApprovalDetail>(`/api/approvals/${id}/comments`, { message })
}
