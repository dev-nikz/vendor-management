import type { VendorStatus } from '@/features/vendor-directory/types'

export type ApprovalAction = 'approve' | 'reject' | 'request-changes'

export interface ApprovalTimelineEvent {
  id: string
  date: string
  actor: string
  action: string
  comment?: string
}

export interface ApprovalComment {
  id: string
  author: string
  message: string
  createdAt: string
}

export interface ApprovalQueueEntry {
  id: string
  vendorName: string
  vendorCode: string
  category: string
  city: string
  status: VendorStatus
  submittedOn: string
}

export interface ApprovalDetail extends ApprovalQueueEntry {
  contactPerson: string
  rating: number
  timeline: ApprovalTimelineEvent[]
  comments: ApprovalComment[]
}

export interface ApprovalActionRequest {
  action: ApprovalAction
  comment: string
}
