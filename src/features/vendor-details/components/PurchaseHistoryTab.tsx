import { Badge } from '@/shared/ui/Badge'
import { currencyFormatter, dateFormatter } from '@/shared/lib/formatters'
import type { PurchaseHistoryEntry } from '../types'

const STATUS_TONE: Record<PurchaseHistoryEntry['status'], 'success' | 'info' | 'danger'> = {
  Delivered: 'success',
  'In Transit': 'info',
  Cancelled: 'danger',
}

export function PurchaseHistoryTab({ purchaseHistory }: { purchaseHistory: PurchaseHistoryEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {['PO Number', 'Date', 'Amount', 'Status'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((po) => (
            <tr key={po.id} className="border-t border-gray-100 dark:border-gray-800">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{po.poNumber}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{dateFormatter.format(new Date(po.date))}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{currencyFormatter.format(po.amount)}</td>
              <td className="px-4 py-3">
                <Badge tone={STATUS_TONE[po.status]}>{po.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
