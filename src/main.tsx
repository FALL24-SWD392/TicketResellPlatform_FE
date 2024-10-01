import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import '../src/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProvider } from './context/app.context'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
