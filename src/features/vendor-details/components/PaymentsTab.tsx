import { Badge } from '@/shared/ui/Badge'
import { currencyFormatter, dateFormatter } from '@/shared/lib/formatters'
import type { VendorPayment } from '../types'

const STATUS_TONE: Record<VendorPayment['status'], 'success' | 'warning' | 'danger'> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'danger',
}

export function PaymentsTab({ payments }: { payments: VendorPayment[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {['Invoice Ref', 'Date', 'Amount', 'Status'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t border-gray-100 dark:border-gray-800">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{payment.invoiceRef}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {dateFormatter.format(new Date(payment.date))}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {currencyFormatter.format(payment.amount)}
              </td>
              <td className="px-4 py-3">
                <Badge tone={STATUS_TONE[payment.status]}>{payment.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
