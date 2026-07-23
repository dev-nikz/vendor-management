import { Clock, CreditCard, FileWarning, Star, Truck } from 'lucide-react'
import type { NotificationType } from '../types'

export const NOTIFICATION_CONFIG: Record<
  NotificationType,
  { icon: typeof Clock; iconClass: string; bgClass: string }
> = {
  'Approval Pending': {
    icon: Clock,
    iconClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-950/50',
  },
  'Document Expiring': {
    icon: FileWarning,
    iconClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-50 dark:bg-rose-950/50',
  },
  'Low Vendor Rating': {
    icon: Star,
    iconClass: 'text-red-600 dark:text-red-400',
    bgClass: 'bg-red-50 dark:bg-red-950/50',
  },
  'Delayed Delivery': {
    icon: Truck,
    iconClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-950/50',
  },
  'Payment Due': {
    icon: CreditCard,
    iconClass: 'text-indigo-600 dark:text-indigo-400',
    bgClass: 'bg-indigo-50 dark:bg-indigo-950/50',
  },
}
