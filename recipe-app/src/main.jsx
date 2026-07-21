import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary' // Add this
import { registerSW } from 'virtual:pwa-register'
import ErrorFallback from './components/ErrorFallback' // Add this
import App from './App.jsx'
import './index.css'

// Register Service Worker for PWA
registerSW({ immediate: true })

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Wrap everything in the ErrorBoundary */}
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.href = '/'}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
)