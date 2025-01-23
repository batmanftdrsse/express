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
    <div className="bg-white py-8 border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Track your package
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              <p className="text-sm text-gray-500 mt-2">
                Example: SHIP123456789
              </p>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-base font-semibold"
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