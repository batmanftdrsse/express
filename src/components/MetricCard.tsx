import { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface TrendProps {
  value: number
  positive: boolean
  label: string
}

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string
  subtitle?: string
  trend?: TrendProps
}

export function MetricCard({ icon, title, value, subtitle, trend }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{trend.value}%</span>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      {(subtitle || trend?.label) && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {subtitle || trend?.label}
        </p>
      )}
    </div>
  )
} 