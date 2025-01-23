
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import TrackingSearch from './components/TrackingSearch'
import Features from './components/Features'
import './index.css'

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <TrackingSearch />
        <Features />
        
        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                About ShipTrack
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                We are a leading shipping company with over 20 years of experience in logistics and delivery services. 
                Our commitment to reliability and customer satisfaction has made us the preferred choice for businesses 
                and individuals worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Us
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                Have questions? Our team is here to help.
              </p>
              <a
                href="mailto:contact@shiptrack.com"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 ShipTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
