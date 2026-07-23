import { Star } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { VendorDirectoryEntry, VendorSortField } from '../types'

export interface Column {
  field: VendorSortField
  label: string
  width: string
  render?: (vendor: VendorDirectoryEntry) => React.ReactNode
  toCsv?: (vendor: VendorDirectoryEntry) => string
  align?: 'right'
}

export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export const dateFormatter = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' })

export const COLUMNS: Column[] = [
  {
    field: 'vendorName',
    label: 'Vendor Name',
    width: 'w-56',
    render: (v) => <span className="font-medium text-gray-900 dark:text-gray-100">{v.vendorName}</span>,
  },
  { field: 'vendorCode', label: 'Vendor Code', width: 'w-32' },
  { field: 'category', label: 'Category', width: 'w-44' },
  { field: 'contactPerson', label: 'Contact Person', width: 'w-40' },
  { field: 'city', label: 'City', width: 'w-32' },
  {
    field: 'rating',
    label: 'Rating',
    width: 'w-24',
    render: (v) => (
      <span className="inline-flex items-center gap-1">
        <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
        {v.rating.toFixed(1)}
      </span>
    ),
    toCsv: (v) => v.rating.toFixed(1),
  },
  {
    field: 'status',
    label: 'Status',
    width: 'w-32',
    render: (v) => <StatusBadge status={v.status} />,
  },
  {
    field: 'lastTransactionDate',
    label: 'Last Transaction',
    width: 'w-36',
    render: (v) => dateFormatter.format(new Date(v.lastTransactionDate)),
  },
  {
    field: 'totalPurchaseValue',
    label: 'Total Purchase Value',
    width: 'w-40',
    align: 'right',
    render: (v) => currencyFormatter.format(v.totalPurchaseValue),
  },
]
