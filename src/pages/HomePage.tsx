import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TrackingSearch from '../components/TrackingSearch'
import AboutUs from '../components/AboutUs'
import Features from '../components/Features'

export default function HomePage() {
  const [trackingCode, setTrackingCode] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingCode) {
      navigate(`/tracking/${trackingCode}`)
    }
  }

  return (
    <main className="pt-16">
      <section id="track" className="scroll-mt-16">
        <TrackingSearch />
      </section>
      
      <section id="about" className="scroll-mt-16">
        <AboutUs />
      </section>
      
      <section id="features" className="scroll-mt-16">
        <Features />
      </section>
      
      <section id="help" className="py-12 bg-white dark:bg-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Help & Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Contact Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Need help? Our support team is available 24/7 to assist you.
              </p>
              <a
                href="mailto:support@shiptrack.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Get in touch →
              </a>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">FAQs</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Find answers to commonly asked questions about our services.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                View FAQs →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About ShipTrack</h3>
              <p className="text-gray-400 text-sm">
                Leading shipping solutions for businesses and individuals worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#track" className="hover:text-white">Track Package</a></li>
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#help" className="hover:text-white">Help Center</a></li>
                <li><a href="#help" className="hover:text-white">Contact Us</a></li>
                <li><a href="#help" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Shipping Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ShipTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}