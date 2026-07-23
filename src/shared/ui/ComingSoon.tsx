interface ComingSoonProps {
  moduleName: string
}

export function ComingSoon({ moduleName }: ComingSoonProps) {
  return (
    <div className="flex h-full min-h-96 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">{moduleName}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">This module hasn't been built yet.</p>
    </div>
  )
}
