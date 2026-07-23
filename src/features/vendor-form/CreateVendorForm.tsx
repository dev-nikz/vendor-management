import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/Card'
import { FormField, inputClasses } from './components/FormField'
import { useCreateVendor } from './hooks/useCreateVendor'
import {
  CERTIFICATION_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  VENDOR_CATEGORIES,
  createVendorSchema,
  type CreateVendorFormValues,
} from './schema/createVendorSchema'

export function CreateVendorForm() {
  const navigate = useNavigate()
  const mutation = useCreateVendor()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVendorFormValues>({
    resolver: zodResolver(createVendorSchema),
    defaultValues: { certifications: [], documents: [] },
  })

  function onSubmit(values: CreateVendorFormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        setTimeout(() => navigate('/vendors'), 1200)
      },
    })
  }

  if (mutation.isSuccess) {
    return (
      <Card>
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Vendor submitted for approval. Redirecting to the Vendor Directory…
        </p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card title="Vendor Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Vendor Name" error={errors.vendorName?.message} className="sm:col-span-2">
            <input {...register('vendorName')} className={inputClasses} placeholder="Apex Constructions" />
          </FormField>

          <FormField label="GST Number" error={errors.gst?.message}>
            <input {...register('gst')} className={inputClasses} placeholder="27ABCDE1234F1Z5" />
          </FormField>

          <FormField label="PAN Number" error={errors.pan?.message}>
            <input {...register('pan')} className={inputClasses} placeholder="ABCDE1234F" />
          </FormField>

          <FormField label="Vendor Category" error={errors.category?.message}>
            <select {...register('category')} className={inputClasses} defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              {VENDOR_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Payment Terms" error={errors.paymentTerms?.message}>
            <select {...register('paymentTerms')} className={inputClasses} defaultValue="">
              <option value="" disabled>
                Select payment terms
              </option>
              {PAYMENT_TERMS_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Address" error={errors.address?.message} className="sm:col-span-2">
            <textarea
              {...register('address')}
              className={inputClasses}
              rows={3}
              placeholder="Street, city, state, PIN code"
            />
          </FormField>
        </div>
      </Card>

      <Card title="Contact Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Contact Person" error={errors.contactPerson?.message}>
            <input {...register('contactPerson')} className={inputClasses} placeholder="Rohan Sharma" />
          </FormField>
          <FormField label="Email" error={errors.contactEmail?.message}>
            <input {...register('contactEmail')} className={inputClasses} placeholder="contact@vendor.com" />
          </FormField>
          <FormField label="Phone" error={errors.contactPhone?.message}>
            <input {...register('contactPhone')} className={inputClasses} placeholder="9876543210" />
          </FormField>
        </div>
      </Card>

      <Card title="Bank Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Account Number" error={errors.bankAccountNumber?.message}>
            <input {...register('bankAccountNumber')} className={inputClasses} placeholder="123456789012" />
          </FormField>
          <FormField label="IFSC Code" error={errors.ifscCode?.message}>
            <input {...register('ifscCode')} className={inputClasses} placeholder="HDFC0001234" />
          </FormField>
          <FormField label="Bank Name" error={errors.bankName?.message}>
            <input {...register('bankName')} className={inputClasses} placeholder="HDFC Bank" />
          </FormField>
        </div>
      </Card>

      <Card title="Certifications">
        <Controller
          control={control}
          name="certifications"
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {CERTIFICATION_OPTIONS.map((cert) => (
                <label key={cert} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={field.value?.includes(cert)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...(field.value ?? []), cert]
                        : (field.value ?? []).filter((v) => v !== cert)
                      field.onChange(next)
                    }}
                    className="rounded border-gray-300"
                  />
                  {cert}
                </label>
              ))}
            </div>
          )}
        />
      </Card>

      <Card title="Documents Upload">
        <Controller
          control={control}
          name="documents"
          render={({ field }) => (
            <div>
              <input
                type="file"
                multiple
                onChange={(e) => field.onChange(Array.from(e.target.files ?? []))}
                className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-indigo-700 dark:text-gray-300 dark:file:bg-indigo-950/50 dark:file:text-indigo-400"
              />
              {field.value?.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  {field.value.map((f: File) => (
                    <li key={f.name}>{f.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />
      </Card>

      {mutation.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Something went wrong submitting this vendor. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate('/vendors')}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {mutation.isPending ? 'Submitting…' : 'Submit for Approval'}
        </button>
      </div>
    </form>
  )
}
