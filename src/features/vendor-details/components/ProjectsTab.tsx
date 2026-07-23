import { Badge } from '@/shared/ui/Badge'
import { dateFormatter } from '@/shared/lib/formatters'
import type { VendorProject } from '../types'

export function ProjectsTab({ projects }: { projects: VendorProject[] }) {
  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800"
        >
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {project.role} · Started {dateFormatter.format(new Date(project.startDate))}
              {project.endDate && ` · Ended ${dateFormatter.format(new Date(project.endDate))}`}
            </p>
          </div>
          <Badge tone={project.status === 'Ongoing' ? 'info' : 'success'}>{project.status}</Badge>
        </li>
      ))}
    </ul>
  )
}
