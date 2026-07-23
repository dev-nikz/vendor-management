import { useMutation } from '@tanstack/react-query'
import { createVendor } from '../api/createVendorApi'

export function useCreateVendor() {
  return useMutation({
    mutationFn: createVendor,
  })
}
