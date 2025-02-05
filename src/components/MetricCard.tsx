import { ReactNode } from 'react'

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string
  subtitle?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  textColor?: string
  subtitleColor?: string
}

export function MetricCard({
  icon,
  title,
  value,
  subtitle,
  action,
  className = '',
  textColor = 'text-gray-900 dark:text-white',
  subtitleColor = 'text-gray-600 dark:text-gray-400'
}: MetricCardProps) {
  return (
    <div className={`rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#4B7BF5]/10 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className={subtitleColor}>{title}</h3>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        {subtitle && (
          <p className={subtitleColor}>{subtitle}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="text-[#4B7BF5] text-sm hover:underline mt-2"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
} 