import { Outlet } from 'react-router-dom'
import { useDateRange } from '../contexts/DateContext'

export function DashboardLayout() {
  const { dateRange } = useDateRange()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4">
        <Outlet />
      </div>
    </div>
  )
} 