import { Skeleton } from '@/shared/ui/Skeleton'

export function VendorDirectoryTableSkeleton() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}
