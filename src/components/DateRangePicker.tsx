import { Calendar } from 'lucide-react'

interface DateRangePickerProps {
  value: { start: Date; end: Date }
  onChange: (range: { start: Date; end: Date }) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-2">
      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      <input
        type="date"
        value={value.start.toISOString().split('T')[0]}
        onChange={(e) => onChange({ ...value, start: new Date(e.target.value) })}
        className="bg-transparent border-none focus:outline-none text-sm text-gray-900 dark:text-gray-100"
      />
      <span className="text-gray-500 dark:text-gray-400">-</span>
      <input
        type="date"
        value={value.end.toISOString().split('T')[0]}
        onChange={(e) => onChange({ ...value, end: new Date(e.target.value) })}
        className="bg-transparent border-none focus:outline-none text-sm text-gray-900 dark:text-gray-100"
      />
    </div>
  )
} 