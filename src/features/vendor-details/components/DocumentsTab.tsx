import { FileText } from 'lucide-react'
import { Badge } from '@/shared/ui/Badge'
import { dateFormatter } from '@/shared/lib/formatters'
import type { VendorDocument } from '../types'

const STATUS_TONE: Record<VendorDocument['status'], 'success' | 'warning' | 'danger'> = {
  Valid: 'success',
  'Expiring Soon': 'warning',
  Expired: 'danger',
}

export function DocumentsTab({ documents }: { documents: VendorDocument[] }) {
  return (
    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
      {documents.map((doc) => (
        <li key={doc.name} className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Uploaded {dateFormatter.format(new Date(doc.uploadedOn))}
                {doc.expiresOn && ` · Expires ${dateFormatter.format(new Date(doc.expiresOn))}`}
              </p>
            </div>
          </div>
          <Badge tone={STATUS_TONE[doc.status]}>{doc.status}</Badge>
        </li>
      ))}
    </ul>
  )
}
