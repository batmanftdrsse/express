import { createContext, useContext, useState, ReactNode } from 'react'
import { subDays } from 'date-fns'

interface DateRange {
  startDate: Date
  endDate: Date
}

interface DateContextType {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

export function DateProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: subDays(new Date(), 30),
    endDate: new Date()
  })

  return (
    <DateContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateContext)
  if (!context) {
    throw new Error('useDateRange must be used within a DateProvider')
  }
  return context
} 