import { ReactNode } from 'react'

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string
  subValue?: string
  className?: string
  iconBgClass?: string
}

export function MetricCard({ 
  icon, 
  title, 
  value, 
  subValue, 
  className = '', 
  iconBgClass = 'bg-gray-50 dark:bg-gray-700' 
}: MetricCardProps) {
  return (
    <div className={`rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${iconBgClass}`}>
          {icon}
        </div>
        <div className="ml-3 sm:ml-4 flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 truncate mb-0.5">
            {title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">
            {value}
          </p>
          {subValue && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export type { MetricCardProps } 