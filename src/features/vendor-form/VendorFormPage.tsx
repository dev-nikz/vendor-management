import { CreateVendorForm } from './CreateVendorForm'

export function VendorFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create Vendor</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Onboard a new vendor. Submissions go through the approval workflow.
        </p>
      </div>
      <CreateVendorForm />
    </div>
  )
}
