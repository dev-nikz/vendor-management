import { Card } from '@/shared/ui/Card'
import { StatusBadge } from '@/features/vendor-directory/components/StatusBadge'
import type { VendorDetails } from '../types'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  )
}

export function OverviewTab({ vendor }: { vendor: VendorDetails }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card title="Vendor Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Vendor Code" value={vendor.vendorCode} />
          <Field label="Category" value={vendor.category} />
          <Field label="City" value={vendor.city} />
          <Field label="Payment Terms" value={vendor.paymentTerms} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
            <StatusBadge status={vendor.status} />
          </div>
          <Field label="Rating" value={`${vendor.rating.toFixed(1)} / 5`} />
        </div>
      </Card>

      <Card title="Registration & Banking">
        <div className="grid grid-cols-2 gap-4">
          <Field label="GST Number" value={vendor.gst} />
          <Field label="PAN Number" value={vendor.pan} />
          <Field label="Bank Account" value={vendor.bankAccountMasked} />
          <Field label="Address" value={vendor.address} />
        </div>
      </Card>

      <Card title="Certifications" className="lg:col-span-2">
        <div className="flex flex-wrap gap-2">
          {vendor.certifications.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No certifications on file.</p>
          ) : (
            vendor.certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400"
              >
                {cert}
              </span>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
