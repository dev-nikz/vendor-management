import { mockVendorDirectory } from '@/features/vendor-directory/api/mockData'
import { getMockVendorDetails } from '@/features/vendor-details/api/mockData'
import type { NotificationEntry } from '../types'

const LOW_RATING_THRESHOLD = 3.0

const readIds = new Set<string>()

function buildNotifications(): NotificationEntry[] {
  const entries: NotificationEntry[] = []

  for (const vendor of mockVendorDirectory) {
    if (vendor.status === 'Pending' || vendor.status === 'On Hold') {
      entries.push({
        id: `approval-${vendor.id}`,
        type: 'Approval Pending',
        vendorId: vendor.id,
        vendorName: vendor.vendorName,
        message: `${vendor.vendorName} is awaiting approval decision.`,
        date: vendor.lastTransactionDate,
        isRead: readIds.has(`approval-${vendor.id}`),
      })
    }

    if (vendor.rating > 0 && vendor.rating < LOW_RATING_THRESHOLD) {
      entries.push({
        id: `rating-${vendor.id}`,
        type: 'Low Vendor Rating',
        vendorId: vendor.id,
        vendorName: vendor.vendorName,
        message: `${vendor.vendorName}'s rating has dropped to ${vendor.rating.toFixed(1)}.`,
        date: vendor.lastTransactionDate,
        isRead: readIds.has(`rating-${vendor.id}`),
      })
    }

    const details = getMockVendorDetails(vendor.id)
    if (!details) continue

    for (const doc of details.documents) {
      if (doc.status === 'Expired' || doc.status === 'Expiring Soon') {
        const id = `doc-${vendor.id}-${doc.name}`
        entries.push({
          id,
          type: 'Document Expiring',
          vendorId: vendor.id,
          vendorName: vendor.vendorName,
          message: `${doc.name} for ${vendor.vendorName} is ${doc.status.toLowerCase()}.`,
          date: doc.expiresOn ?? doc.uploadedOn,
          isRead: readIds.has(id),
        })
      }
    }

    for (const po of details.purchaseHistory) {
      if (po.status === 'In Transit') {
        const id = `delivery-${vendor.id}-${po.poNumber}`
        entries.push({
          id,
          type: 'Delayed Delivery',
          vendorId: vendor.id,
          vendorName: vendor.vendorName,
          message: `PO ${po.poNumber} from ${vendor.vendorName} is still in transit.`,
          date: po.date,
          isRead: readIds.has(id),
        })
      }
    }

    for (const payment of details.payments) {
      if (payment.status === 'Pending' || payment.status === 'Overdue') {
        const id = `payment-${vendor.id}-${payment.invoiceRef}`
        entries.push({
          id,
          type: 'Payment Due',
          vendorId: vendor.id,
          vendorName: vendor.vendorName,
          message: `Invoice ${payment.invoiceRef} for ${vendor.vendorName} is ${payment.status.toLowerCase()}.`,
          date: payment.date,
          isRead: readIds.has(id),
        })
      }
    }
  }

  // Cap per type (not globally) - otherwise high-volume types like Document
  // Expiring (~5 documents x 248 vendors) crowd out lower-volume types like
  // Approval Pending entirely, defeating the point of having five categories.
  const MAX_PER_TYPE = 12
  const byType = new Map<string, NotificationEntry[]>()
  for (const entry of entries) {
    const bucket = byType.get(entry.type) ?? []
    bucket.push(entry)
    byType.set(entry.type, bucket)
  }

  const capped = Array.from(byType.values()).flatMap((bucket) =>
    bucket.sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_PER_TYPE),
  )

  return capped.sort((a, b) => b.date.localeCompare(a.date))
}

export function getNotifications(): NotificationEntry[] {
  return buildNotifications()
}

export function markNotificationRead(id: string): void {
  readIds.add(id)
}

export function markAllNotificationsRead(ids: string[]): void {
  ids.forEach((id) => readIds.add(id))
}
