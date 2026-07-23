import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ label, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}

export const inputClasses =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
