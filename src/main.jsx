import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { AuthProvider }     from './context/AuthContext'
import { ApplicationProvider } from './context/ApplicationContext'
import { ComplaintProvider } from './context/ComplaintContext'
import { LanguageProvider } from './context/LanguageContext'
import { ToastProvider }    from './context/ToastContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApplicationProvider>
          <ComplaintProvider>
            <LanguageProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </LanguageProvider>
          </ComplaintProvider>
        </ApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
