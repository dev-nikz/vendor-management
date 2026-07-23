import { mockVendorDirectory } from '@/features/vendor-directory/api/mockData'
import type { VendorStatus } from '@/features/vendor-directory/types'
import type { ApprovalAction, ApprovalComment, ApprovalDetail, ApprovalQueueEntry, ApprovalTimelineEvent } from '../types'

function seededRandom(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  return function random() {
    h = (Math.imul(h ^ (h >>> 15), 1 | h) + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 7), 61 | h)
    t = (t + Math.imul(t ^ (t >>> 14), 2246822519)) ^ t
    return ((t ^ (t >>> 16)) >>> 0) / 4294967296
  }
}

const REVIEWERS = ['Priya Sharma', 'Rohan Mehta', 'Ananya Iyer', 'Vikram Rao']

interface ApprovalState {
  timeline: ApprovalTimelineEvent[]
  comments: ApprovalComment[]
}

const approvalStateByVendorId = new Map<string, ApprovalState>()

function dateOffset(rand: () => number, maxDays: number): string {
  return new Date(Date.now() - Math.floor(rand() * maxDays) * 86_400_000).toISOString().slice(0, 10)
}

function seedApprovalState(vendorId: string, vendorName: string): ApprovalState {
  const rand = seededRandom(vendorId)
  const submittedOn = dateOffset(rand, 30)

  const timeline: ApprovalTimelineEvent[] = [
    { id: `${vendorId}-t1`, date: submittedOn, actor: vendorName, action: 'Submitted for approval' },
    {
      id: `${vendorId}-t2`,
      date: submittedOn,
      actor: 'System',
      action: 'Documents received, awaiting reviewer assignment',
    },
  ]

  const comments: ApprovalComment[] =
    rand() > 0.5
      ? [
          {
            id: `${vendorId}-c1`,
            author: REVIEWERS[Math.floor(rand() * REVIEWERS.length)],
            message: 'GST and PAN verified against government records. Awaiting bank detail confirmation.',
            createdAt: submittedOn,
          },
        ]
      : []

  const state: ApprovalState = { timeline, comments }
  approvalStateByVendorId.set(vendorId, state)
  return state
}

function getApprovalState(vendorId: string, vendorName: string): ApprovalState {
  return approvalStateByVendorId.get(vendorId) ?? seedApprovalState(vendorId, vendorName)
}

const ACTION_TO_STATUS: Record<ApprovalAction, VendorStatus> = {
  approve: 'Active',
  reject: 'Rejected',
  'request-changes': 'On Hold',
}

const ACTION_LABEL: Record<ApprovalAction, string> = {
  approve: 'Approved',
  reject: 'Rejected',
  'request-changes': 'Changes requested',
}

export function getApprovalQueue(): ApprovalQueueEntry[] {
  return mockVendorDirectory
    .filter((v) => v.status === 'Pending' || v.status === 'On Hold')
    .map((v) => {
      const state = getApprovalState(v.id, v.vendorName)
      return {
        id: v.id,
        vendorName: v.vendorName,
        vendorCode: v.vendorCode,
        category: v.category,
        city: v.city,
        status: v.status,
        submittedOn: state.timeline[0]?.date ?? v.lastTransactionDate,
      }
    })
    .sort((a, b) => a.submittedOn.localeCompare(b.submittedOn))
}

export function getApprovalDetail(vendorId: string): ApprovalDetail | undefined {
  const vendor = mockVendorDirectory.find((v) => v.id === vendorId)
  if (!vendor) return undefined

  const state = getApprovalState(vendor.id, vendor.vendorName)
  return {
    id: vendor.id,
    vendorName: vendor.vendorName,
    vendorCode: vendor.vendorCode,
    category: vendor.category,
    city: vendor.city,
    status: vendor.status,
    contactPerson: vendor.contactPerson,
    rating: vendor.rating,
    submittedOn: state.timeline[0]?.date ?? vendor.lastTransactionDate,
    timeline: state.timeline,
    comments: state.comments,
  }
}

export function applyApprovalAction(
  vendorId: string,
  action: ApprovalAction,
  comment: string,
): ApprovalDetail | undefined {
  const vendor = mockVendorDirectory.find((v) => v.id === vendorId)
  if (!vendor) return undefined

  vendor.status = ACTION_TO_STATUS[action]

  const state = getApprovalState(vendor.id, vendor.vendorName)
  const today = new Date().toISOString().slice(0, 10)
  state.timeline.push({
    id: `${vendorId}-t${state.timeline.length + 1}`,
    date: today,
    actor: 'You',
    action: ACTION_LABEL[action],
    comment,
  })

  return getApprovalDetail(vendorId)
}

export function addApprovalComment(vendorId: string, message: string): ApprovalDetail | undefined {
  const vendor = mockVendorDirectory.find((v) => v.id === vendorId)
  if (!vendor) return undefined

  const state = getApprovalState(vendor.id, vendor.vendorName)
  state.comments.push({
    id: `${vendorId}-c${state.comments.length + 1}`,
    author: 'You',
    message,
    createdAt: new Date().toISOString().slice(0, 10),
  })

  return getApprovalDetail(vendorId)
}
