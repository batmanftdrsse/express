import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import OrderStatus from './pages/OrderStatus'
import { DarkModeProvider } from './context/DarkModeContext'
import './index.css'

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Toaster position="top-right" />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/status/:trackingId" element={<OrderStatus />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App