import { delay, http, HttpResponse } from 'msw'
import { addApprovalComment, applyApprovalAction, getApprovalDetail, getApprovalQueue } from './mockData'
import type { ApprovalAction } from '../types'

export const approvalWorkflowHandlers = [
  http.get('/api/approvals', async () => {
    await delay(400)
    return HttpResponse.json(getApprovalQueue())
  }),

  http.get('/api/approvals/:id', async ({ params }) => {
    await delay(400)
    const detail = getApprovalDetail(String(params.id))
    if (!detail) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(detail)
  }),

  http.post('/api/approvals/:id/action', async ({ params, request }) => {
    await delay(500)
    const body = (await request.json()) as { action: ApprovalAction; comment: string }
    const detail = applyApprovalAction(String(params.id), body.action, body.comment)
    if (!detail) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(detail)
  }),

  http.post('/api/approvals/:id/comments', async ({ params, request }) => {
    await delay(400)
    const body = (await request.json()) as { message: string }
    const detail = addApprovalComment(String(params.id), body.message)
    if (!detail) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(detail)
  }),
]
