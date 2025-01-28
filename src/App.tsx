import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import TrackingDetails from './pages/TrackingDetails'
import { DarkModeProvider } from './context/DarkModeContext'
import './index.css'

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Toaster position="top-right" />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tracking/:trackingNumber" element={<TrackingDetails />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  )
}

export default App