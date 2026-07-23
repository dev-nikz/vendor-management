import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getApprovalDetail,
  getApprovalQueue,
  submitApprovalAction,
  submitApprovalComment,
} from '../api/approvalWorkflowApi'
import type { ApprovalActionRequest } from '../types'

export function useApprovalQueue() {
  return useQuery({
    queryKey: ['approvals', 'queue'],
    queryFn: getApprovalQueue,
  })
}

export function useApprovalDetail(id: string | null) {
  return useQuery({
    queryKey: ['approvals', 'detail', id],
    queryFn: () => getApprovalDetail(id as string),
    enabled: Boolean(id),
  })
}

export function useApprovalAction(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ApprovalActionRequest) => submitApprovalAction(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] })
      queryClient.invalidateQueries({ queryKey: ['vendor-directory'] })
    },
  })
}

export function useAddApprovalComment(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (message: string) => submitApprovalComment(id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals', 'detail', id] })
    },
  })
}
