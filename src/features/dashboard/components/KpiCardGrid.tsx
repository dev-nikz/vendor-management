import { memo, useMemo } from 'react'
import { Ban, CheckCircle2, ClipboardList, Clock, Star, Users } from 'lucide-react'
import { KpiCard } from './KpiCard'
import type { DashboardKpis } from '../types'

interface KpiCardGridProps {
  data: DashboardKpis
}

function KpiCardGridComponent({ data }: KpiCardGridProps) {
  const cards = useMemo(
    () => [
      { label: 'Total Vendors', value: data.totalVendors, icon: Users, accent: 'default' as const },
      {
        label: 'Active Vendors',
        value: data.activeVendors,
        icon: CheckCircle2,
        accent: 'success' as const,
      },
      {
        label: 'Blacklisted Vendors',
        value: data.blacklistedVendors,
        icon: Ban,
        accent: 'danger' as const,
      },
      {
        label: 'Pending Approvals',
        value: data.pendingApprovals,
        icon: Clock,
        accent: 'warning' as const,
      },
      {
        label: 'Average Vendor Rating',
        value: data.averageVendorRating.toFixed(1),
        icon: Star,
        accent: 'default' as const,
      },
      {
        label: 'Active Purchase Orders',
        value: data.activePurchaseOrders,
        icon: ClipboardList,
        accent: 'default' as const,
      },
    ],
    [data],
  )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  )
}

export const KpiCardGrid = memo(KpiCardGridComponent)
