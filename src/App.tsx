import { NextUIProvider } from '@nextui-org/react'
import { AppProvider } from './context/app.context'
import { ToastContainer } from 'react-toastify'
import useLayout from './hooks/useLayout'
import { useNavigate } from 'react-router-dom'
import NavBar from './layouts/user/NavBar'
import Router from './routes'
import Footer from './layouts/user/Footer'

function App() {
  const layout = useLayout()
  const nav = useNavigate()

  return (
    <NextUIProvider>
      <AppProvider>
        <ToastContainer autoClose={2000} style={{ padding: '20px' }} />
        {layout.includes('navbar') && <NavBar />}
        <div className=''>
          <div className='main'>
            <Router />
          </div>
        </div>
        {layout.includes('footer') && <Footer />}
        {layout.includes('chat') && <div>Chat</div>}
      </AppProvider>
    </NextUIProvider>
  )
}

export default App
