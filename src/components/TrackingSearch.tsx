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
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Track Your Shipment
        </h1>
        <p className="text-blue-100 text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
          Enter your tracking number to get real-time updates on your package location
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-lg"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-lg font-semibold shadow-lg"
          >
            <Search className="h-6 w-6" />
            Track
          </button>
        </form>
        <p className="text-blue-100 mt-6 text-sm">
          Example: Enter "SHIP123456789" to track your package
        </p>
      </div>
    </div>
  )
}