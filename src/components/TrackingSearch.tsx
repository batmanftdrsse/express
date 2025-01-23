import { Search } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function TrackingSearch() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number')
      return
    }
    toast.success('Tracking number submitted: ' + trackingNumber)
    setTrackingNumber('')
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Track Your Package
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                         placeholder-gray-500 dark:placeholder-gray-400
                         transition-colors"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Example: SHIP123456789
              </p>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                       px-8 py-3 rounded-lg flex items-center justify-center gap-2
                       transition-colors duration-200 text-base font-semibold shadow-sm
                       hover:shadow-md"
            >
              <Search className="h-5 w-5" />
              Track
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}