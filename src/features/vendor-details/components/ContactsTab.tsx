import { Mail, Phone, Star } from 'lucide-react'
import { Card } from '@/shared/ui/Card'
import type { VendorDetails } from '../types'

export function ContactsTab({ vendor }: { vendor: VendorDetails }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {vendor.contacts.map((contact) => (
        <Card key={contact.email}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{contact.role}</p>
            </div>
            {contact.isPrimary && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">
                <Star className="size-3" aria-hidden="true" />
                Primary
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <Mail className="size-3.5 text-gray-400" aria-hidden="true" />
              {contact.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-3.5 text-gray-400" aria-hidden="true" />
              {contact.phone}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
