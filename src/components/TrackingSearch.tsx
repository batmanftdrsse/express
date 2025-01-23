
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
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Track Your Shipment
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 max-w-xl px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="h-5 w-5" />
            Track
          </button>
        </form>
      </div>
    </div>
  )
}
