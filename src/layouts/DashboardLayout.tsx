import { Outlet } from 'react-router-dom'
import { useDateRange } from '../contexts/DateContext'

export function DashboardLayout() {
  const { dateRange } = useDateRange()

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
        <Outlet />
      </div>
    </div>
  )
} 