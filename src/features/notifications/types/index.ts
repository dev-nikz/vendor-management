export type NotificationType =
  | 'Approval Pending'
  | 'Document Expiring'
  | 'Low Vendor Rating'
  | 'Delayed Delivery'
  | 'Payment Due'

export interface NotificationEntry {
  id: string
  type: NotificationType
  vendorId: string
  vendorName: string
  message: string
  date: string
  isRead: boolean
}
