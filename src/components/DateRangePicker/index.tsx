import { useState } from 'react'
import { DateRange } from 'react-date-range'
import { useDateRange } from '../../contexts/DateContext'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export function DateRangePicker() {
  const { dateRange, setDateRange } = useDateRange()
  
  const [ranges] = useState([
    {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      key: 'selection'
    }
  ])

  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => {
        setDateRange({
          startDate: item.selection.startDate,
          endDate: item.selection.endDate
        })
      }}
      moveRangeOnFirstSelection={false}
      ranges={ranges}
    />
  )
} 