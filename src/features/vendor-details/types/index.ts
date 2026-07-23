import type { VendorDirectoryEntry } from '@/features/vendor-directory/types'

export interface VendorContact {
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
}

export interface VendorDocument {
  name: string
  type: string
  uploadedOn: string
  expiresOn: string | null
  status: 'Valid' | 'Expiring Soon' | 'Expired'
}

export interface VendorPayment {
  id: string
  date: string
  invoiceRef: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
}

export interface VendorProject {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string | null
  status: 'Ongoing' | 'Completed'
}

export interface VendorIssue {
  id: string
  title: string
  raisedOn: string
  severity: 'Low' | 'Medium' | 'High'
  status: 'Open' | 'Resolved'
}

export interface AuditEvent {
  id: string
  date: string
  actor: string
  action: string
}

export interface PurchaseHistoryEntry {
  id: string
  date: string
  poNumber: string
  amount: number
  status: 'Delivered' | 'In Transit' | 'Cancelled'
}

export interface VendorPerformanceSnapshot {
  qualityScore: number
  deliveryScore: number
  responseTimeHours: number
  paymentHistoryScore: number
  riskScore: number
}

export interface VendorDetails extends VendorDirectoryEntry {
  gst: string
  pan: string
  address: string
  bankAccountMasked: string
  paymentTerms: string
  certifications: string[]
  contacts: VendorContact[]
  documents: VendorDocument[]
  payments: VendorPayment[]
  projects: VendorProject[]
  issues: VendorIssue[]
  auditTimeline: AuditEvent[]
  performance: VendorPerformanceSnapshot
  purchaseHistory: PurchaseHistoryEntry[]
}
