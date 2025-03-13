import { ReactNode } from 'react'

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string
  className?: string
}

export function MetricCard({ icon, title, value, className = '' }: MetricCardProps) {
  return (
    <div className={`rounded-lg p-6 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
} 