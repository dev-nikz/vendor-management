export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export const dateFormatter = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' })
