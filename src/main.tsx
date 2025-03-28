import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    console.log('=== MSW SETUP ===')
    console.log('Iniciando MSW no ambiente de desenvolvimento')
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    console.log('MSW iniciado com sucesso!')
    console.log('==================')
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <DarkModeProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </React.StrictMode>
  )
})
